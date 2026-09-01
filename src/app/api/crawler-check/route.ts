import { AI_CRAWLERS, parseRobots } from "@/lib/audit/analyse";
import { normaliseInput, safeFetch, UnsafeUrlError } from "@/lib/audit/fetch";

/* Focused robots.txt check for AI crawlers.

   Shares the fetch guard and the parser with /api/audit rather than growing a
   second implementation that can drift from it. Same SSRF fence: scheme and
   port allowlists, DNS resolution with the resolved address range checked,
   every redirect hop rechecked, byte cap and timeout.

   No model call, so this one is free to run and the rate limit is only there
   to stop someone using us as a scanner. */

export const runtime = "nodejs";
export const maxDuration = 30;

const RATE_LIMIT = 12;
const WINDOW = 60_000;
const hits = new Map<string, number[]>();

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  if (limited(ip)) {
    return Response.json({ error: "Give it a minute." }, { status: 429 });
  }

  let target: string;
  try {
    const body = (await request.json()) as { url?: string };
    target = normaliseInput(String(body?.url ?? ""));
  } catch (error) {
    return Response.json(
      { error: error instanceof UnsafeUrlError ? error.message : "Enter a website address." },
      { status: 400 },
    );
  }

  let origin: string;
  let path: string;
  try {
    const u = new URL(target);
    origin = u.origin;
    path = u.pathname || "/";
  } catch {
    return Response.json({ error: "That does not look like a valid URL." }, { status: 400 });
  }

  try {
    const robots = await safeFetch(`${origin}/robots.txt`, { accept: "text/plain" });

    /* No robots.txt is a valid, and permissive, outcome. Everything is allowed
       by default, so report that rather than treating it as an error. */
    if (robots.status === 404) {
      return Response.json({
        result: {
          origin,
          robotsFound: false,
          robotsUrl: `${origin}/robots.txt`,
          sitemapDeclared: false,
          crawlers: AI_CRAWLERS.map((name) => ({ name, allowed: true, named: false })),
          raw: null,
        },
      });
    }

    if (robots.status !== 200) {
      return Response.json(
        { error: `robots.txt returned HTTP ${robots.status}. Nothing can be checked until it responds.` },
        { status: 400 },
      );
    }

    const sitemapDeclared = /^\s*sitemap:\s*\S+/im.test(robots.body);

    return Response.json({
      result: {
        origin,
        robotsFound: true,
        robotsUrl: `${origin}/robots.txt`,
        sitemapDeclared,
        crawlers: parseRobots(robots.body, path),
        /* Capped, so a hostile robots.txt cannot be used to push a large
           payload back through us into someone's browser. */
        raw: robots.body.slice(0, 4000),
      },
    });
  } catch (error) {
    if (error instanceof UnsafeUrlError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "We could not reach that domain." }, { status: 502 });
  }
}
