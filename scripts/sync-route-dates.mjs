#!/usr/bin/env node
/* --------------------------------------------------------------------------
   Keeps src/lib/route-dates.json in step with the routes that actually exist.

   THE PROBLEM THIS SOLVES WITHOUT REINTRODUCING THE OLD ONE. The sitemap used
   to stamp `new Date()` on every URL, which resolved to the build time, so
   every deploy claimed 32 pages had changed when none had. Google ignores
   lastmod once a site proves it unreliable, and that is the strongest crawl
   scheduling signal a small site has.

   So route discovery is automatic, but dates are not invented at build time.
   They are captured ONCE, here, and committed. After that a page's date only
   moves when somebody moves it.

   Where a new route's date comes from, in order:
     1. The last commit that touched its page.tsx, via git. Exact.
     2. Today, when the file is not committed yet. Correct for a page being
        written right now.

   WHY THIS REFUSES TO WRITE ON VERCEL. Vercel shallow clones, so git cannot
   answer question 1 there, and falling through to "today" in CI would stamp
   the build date on anything missing. That is precisely the bug we removed.
   On Vercel this runs in check mode instead and fails the build with the
   route named, which is a loud, fixable error rather than a silent lie.

   Usage:
     node scripts/sync-route-dates.mjs           update the file
     node scripts/sync-route-dates.mjs --check   fail if it is out of date
   -------------------------------------------------------------------------- */

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, "src", "app");
const DATES_FILE = join(ROOT, "src", "lib", "route-dates.json");

const onVercel = Boolean(process.env.VERCEL);
const checkOnly = process.argv.includes("--check") || onVercel;

/* Mirrors discoverStaticRoutes in src/lib/routes.ts. Kept as a plain walk
   here so the script has no build dependency on the app. */
function walk(dir, segments, found) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    found.push({
      route: segments.length === 0 ? "/" : `/${segments.join("/")}`,
      file: join(dir, "page.tsx"),
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("[") || name.startsWith("_") || name.startsWith("@")) continue;
    if (name === "api") continue;
    const isGroup = name.startsWith("(") && name.endsWith(")");
    walk(join(dir, name), isGroup ? segments : [...segments, name], found);
  }
}

function gitDateFor(file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const routes = [];
walk(APP_DIR, [], routes);
routes.sort((a, b) => a.route.localeCompare(b.route));

let existing = {};
try {
  existing = JSON.parse(readFileSync(DATES_FILE, "utf8"));
} catch {
  /* First run. */
}

const next = {};
const added = [];
const removed = Object.keys(existing).filter(
  (r) => !routes.some((entry) => entry.route === r),
);

for (const { route, file } of routes) {
  if (existing[route]) {
    /* Never rewrite a date that is already recorded. The whole point is that
       it stays put until a human moves it. */
    next[route] = existing[route];
    continue;
  }
  const date = gitDateFor(file) ?? new Date().toISOString().slice(0, 10);
  next[route] = date;
  added.push(`${route}  ${date}`);
}

const sorted = Object.fromEntries(
  Object.keys(next)
    .sort()
    .map((k) => [k, next[k]]),
);
const serialised = `${JSON.stringify(sorted, null, 2)}\n`;
const current = (() => {
  try {
    return readFileSync(DATES_FILE, "utf8");
  } catch {
    return "";
  }
})();

if (serialised === current) {
  console.log(`route dates: up to date, ${routes.length} routes.`);
  process.exit(0);
}

if (checkOnly) {
  console.error("Route dates are out of date.\n");
  if (added.length) {
    console.error("These routes exist but have no recorded date:");
    added.forEach((a) => console.error(`  ${a.split("  ")[0]}`));
  }
  if (removed.length) {
    console.error("These recorded routes no longer exist:");
    removed.forEach((r) => console.error(`  ${r}`));
  }
  console.error(
    onVercel
      ? "\nRun `npm run routes:sync` locally and commit src/lib/route-dates.json.\nDates are not generated in CI, because a build date is not a content date."
      : "\nRun `npm run routes:sync` to fix.",
  );
  process.exit(1);
}

writeFileSync(DATES_FILE, serialised);
console.log(`route dates: updated, ${routes.length} routes.`);
added.forEach((a) => console.log(`  + ${a}`));
removed.forEach((r) => console.log(`  - ${r}`));
