import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/* --------------------------------------------------------------------------
   Safe outbound fetching for the free audit.

   THIS ENDPOINT TAKES A URL FROM THE PUBLIC INTERNET AND FETCHES IT. That is
   a server side request forgery primitive unless it is fenced properly, and
   the consequences are not theoretical: on a cloud host an unguarded fetcher
   will happily read the instance metadata service and hand back credentials.

   The fence, in order:

   1. Scheme must be http or https. No file:, gopher:, data:.
   2. The hostname is resolved, and the RESOLVED ADDRESS is range checked, not
      the string. Checking the hostname alone is defeated by any domain with
      an A record pointing at 127.0.0.1 or 169.254.169.254.
   3. Every redirect hop is re-resolved and re-checked. Redirects are followed
      manually for exactly that reason: `redirect: "follow"` would let hop two
      land somewhere hop one was not allowed to.
   4. Response size is capped while streaming, so a multi gigabyte body cannot
      exhaust memory.
   5. Wall clock timeout on the whole operation.

   Ports are restricted to the usual web ports. There is no legitimate reason
   for a public website audit to reach 22, 3306, 6379 or 11211.
   -------------------------------------------------------------------------- */

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);
const ALLOWED_PORTS = new Set(["", "80", "443", "8080", "8443"]);
const MAX_REDIRECTS = 5;
const MAX_BYTES = 2_500_000;
const TIMEOUT_MS = 12_000;

export class UnsafeUrlError extends Error {}

function ipv4ToInt(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

/* Ranges that must never be reachable from a public endpoint. */
const BLOCKED_V4: [string, number][] = [
  ["0.0.0.0", 8], // this network
  ["10.0.0.0", 8], // private
  ["100.64.0.0", 10], // carrier grade NAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link local, includes the cloud metadata endpoint
  ["172.16.0.0", 12], // private
  ["192.0.0.0", 24], // IETF protocol assignments
  ["192.168.0.0", 16], // private
  ["198.18.0.0", 15], // benchmarking
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved
];

function isBlockedAddress(address: string): boolean {
  let ip = address;

  /* Unwrap IPv4 mapped IPv6, ::ffff:127.0.0.1 and friends. */
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) ip = mapped[1];

  const version = isIP(ip);

  if (version === 4) {
    const value = ipv4ToInt(ip);
    return BLOCKED_V4.some(([base, bits]) => {
      const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
      return (value & mask) === (ipv4ToInt(base) & mask);
    });
  }

  if (version === 6) {
    const lower = ip.toLowerCase();
    if (lower === "::" || lower === "::1") return true;
    /* fc00::/7 unique local, fe80::/10 link local. */
    if (/^f[cd]/.test(lower)) return true;
    if (/^fe[89ab]/.test(lower)) return true;
    return false;
  }

  /* Unparseable means we do not trust it. */
  return true;
}

async function assertSafeUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new UnsafeUrlError("That does not look like a valid URL.");
  }

  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    throw new UnsafeUrlError("Only http and https addresses can be audited.");
  }
  if (!ALLOWED_PORTS.has(url.port)) {
    throw new UnsafeUrlError("That port is not supported.");
  }

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal")) {
    throw new UnsafeUrlError("That address is not publicly reachable.");
  }

  /* Resolve and check the address, not the name. A hostname is not evidence
     of where it points. */
  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true, verbatim: true });
  } catch {
    throw new UnsafeUrlError("That domain could not be resolved.");
  }

  if (addresses.length === 0 || addresses.some((a) => isBlockedAddress(a.address))) {
    throw new UnsafeUrlError("That address is not publicly reachable.");
  }

  return url;
}

export type SafeResponse = {
  finalUrl: string;
  status: number;
  redirected: boolean;
  ttfbMs: number;
  body: string;
  bytes: number;
  headers: Headers;
};

/* Follows redirects by hand so every hop gets the same treatment as the
   first. Returns the decoded body, capped. */
export async function safeFetch(
  rawUrl: string,
  { accept = "text/html,*/*" }: { accept?: string } = {},
): Promise<SafeResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();

  try {
    let current = rawUrl;
    let redirected = false;

    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const url = await assertSafeUrl(current);

      const response = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
          /* Identify honestly. A tool that lies about who it is has no
             business lecturing anyone about trust signals. */
          "User-Agent":
            "ManuelTechnologiesAudit/1.0 (+https://manueltechnologies.com/free-audit)",
          Accept: accept,
        },
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location) {
          throw new UnsafeUrlError("That page redirects without a destination.");
        }
        current = new URL(location, url).toString();
        redirected = true;
        continue;
      }

      const ttfbMs = Date.now() - started;

      /* Read with a cap rather than calling .text() on an unbounded body. */
      const reader = response.body?.getReader();
      let bytes = 0;
      const chunks: Uint8Array[] = [];
      if (reader) {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.length;
          if (bytes > MAX_BYTES) {
            await reader.cancel();
            break;
          }
          chunks.push(value);
        }
      }

      const buffer = Buffer.concat(chunks.map((c) => Buffer.from(c)));
      return {
        finalUrl: url.toString(),
        status: response.status,
        redirected,
        ttfbMs,
        body: buffer.toString("utf8"),
        bytes,
        headers: response.headers,
      };
    }

    throw new UnsafeUrlError("That page redirects too many times.");
  } finally {
    clearTimeout(timer);
  }
}

/* Normalises what a person types into the box. "example.com" is a URL as far
   as they are concerned, and being pedantic about it just loses the lead. */
export function normaliseInput(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) throw new UnsafeUrlError("Enter a website address.");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  /* Reject any other scheme by name rather than prefixing https:// onto it,
     which would turn file:///etc/passwd into a confusing DNS failure instead
     of a clear refusal. */
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    throw new UnsafeUrlError("Only http and https addresses can be audited.");
  }
  return `https://${trimmed.replace(/^\/+/, "")}`;
}
