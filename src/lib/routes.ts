import { readdirSync } from "node:fs";
import { join } from "node:path";

/* --------------------------------------------------------------------------
   Static route discovery.

   Walks src/app and returns every route that has a page.tsx and no dynamic
   segment. The sitemap reads this so a new page is listed the moment it
   exists, rather than the moment somebody remembers to add it.

   Dynamic routes are deliberately NOT discovered here. /work/[slug] and
   /blog/[slug] expand from their own data, which already carries a real
   modified date per entry, and that is a better source than anything a
   directory walk could infer.

   This runs at build time only. sitemap.ts is statically generated, so the
   filesystem is read once during `next build` and never at runtime.
   -------------------------------------------------------------------------- */

const APP_DIR = join(process.cwd(), "src", "app");

/* Routes that exist but should never appear in the sitemap. Empty today.
   A thank you page, a bare redirect target, or anything gated belongs here. */
const EXCLUDED = new Set<string>([]);

function walk(dir: string, segments: string[], found: string[]): void {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    found.push(segments.length === 0 ? "/" : `/${segments.join("/")}`);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;

    /* Skip: dynamic segments (data driven, listed separately), private
       folders, parallel and intercepting routes, and api. */
    if (name.startsWith("[") || name.startsWith("_") || name.startsWith("@")) continue;
    if (name === "api") continue;

    /* Route groups do not appear in the URL. */
    const isGroup = name.startsWith("(") && name.endsWith(")");
    walk(join(dir, name), isGroup ? segments : [...segments, name], found);
  }
}

export function discoverStaticRoutes(): string[] {
  const found: string[] = [];
  walk(APP_DIR, [], found);
  return found.filter((r) => !EXCLUDED.has(r)).sort();
}

/* Sitemap priority. Google ignores it, Bing gives it slight weight, and it
   costs nothing to be honest about relative importance. Derived from depth so
   a new page gets a sensible value with no decision required, with overrides
   for the handful where depth is the wrong signal. */
const PRIORITY_OVERRIDES: Record<string, number> = {
  "/": 1,
  "/build": 0.9,
  "/grow": 0.9,
  "/scale": 0.9,
  "/free-audit": 0.9,
  "/work": 0.8,
  "/contact": 0.8,
  "/integrations": 0.8,
  "/agency-vs-engineer": 0.8,
  "/blog": 0.6,
  "/privacy-policy": 0.3,
  "/terms-of-service": 0.3,
  "/cwv-drift-monitor/privacy-policy": 0.3,
};

export function priorityFor(route: string): number {
  if (route in PRIORITY_OVERRIDES) return PRIORITY_OVERRIDES[route];
  const depth = route === "/" ? 0 : route.split("/").filter(Boolean).length;
  return depth <= 1 ? 0.8 : 0.7;
}
