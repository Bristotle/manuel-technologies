/* Benchmark engine. One run produces the original numbers behind a stat page
   and a persona page for one industry in one market.

     npx tsx scripts/research/benchmark.mts <slug>

   Reads the seed at src/lib/research/seeds/<slug>.json:
     { "industry": "law firms", "industryPlural": "law firm websites",
       "market": "Ghana", "city": null, "frame": "how the sample was drawn",
       "sites": ["a.com", "b.com", ...] }

   Writes src/lib/research/benchmarks/<slug>.json with the aggregate only.
   No individual site is named in the output, by design: the pages report
   distributions, never a league table. CLAUDE.md section 6 and the UK
   accountancy study set that rule.

   WHAT COUNTS AS MEASURABLE. A site is "refused" if the request failed or
   returned a non 200 status, "challenged" if the body is a bot protection
   interstitial (near identical small HTML carrying noindex, the lesson from
   the UK study), and "measurable" otherwise. Every percentage on the page is
   over measurable sites only. The page says so.

   THE GATE. A benchmark with fewer than 12 measurable sites does not get
   written. A page built on nine sites is an anecdote with a percentage sign.
   Raise the seed list instead. */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { gatherFacts, scoreFacts } from "../../src/lib/audit/analyse.ts";
import type { AuditFacts } from "../../src/lib/audit/types.ts";

const slug = process.argv[2];
if (!slug) { console.error("usage: benchmark.mts <seed-slug>"); process.exit(1); }

type Seed = { industry: string; industryPlural: string; market: string; city: string | null; frame: string; sites: string[] };
const seed: Seed = JSON.parse(readFileSync(`src/lib/research/seeds/${slug}.json`, "utf8"));
const MIN_MEASURABLE = 12;
const CONCURRENCY = 4;

type Row = { domain: string; state: "ok" | "refused" | "challenged"; facts?: AuditFacts; score?: number };

function looksChallenged(f: AuditFacts): boolean {
  /* Cloudflare and similar: tiny body, noindex, next to no words. */
  return f.noindex && f.htmlBytes < 12_000 && f.wordCount < 120;
}

async function one(domain: string): Promise<Row> {
  try {
    const facts = await gatherFacts(`https://${domain}`);
    if (facts.status !== 200) return { domain, state: "refused" };
    if (looksChallenged(facts)) return { domain, state: "challenged" };
    const { overall } = scoreFacts(facts);
    return { domain, state: "ok", facts, score: overall };
  } catch {
    return { domain, state: "refused" };
  }
}

const rows: Row[] = [];
const queue = [...new Set(seed.sites)];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  for (;;) {
    const d = queue.shift();
    if (!d) return;
    const r = await one(d);
    rows.push(r);
    process.stderr.write(`${r.state.padEnd(10)} ${d}\n`);
  }
}));

const ok = rows.filter((r) => r.state === "ok" && r.facts) as (Row & { facts: AuditFacts; score: number })[];
const M = ok.length;
if (M < MIN_MEASURABLE) {
  console.error(`\nOnly ${M} measurable sites (minimum ${MIN_MEASURABLE}). Not writing a benchmark. Add sites to the seed.`);
  process.exit(2);
}

const median = (xs: number[]) => { const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); };
const count = (p: (f: AuditFacts) => boolean) => ok.filter((r) => p(r.facts)).length;
const AI = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

const out = {
  slug,
  industry: seed.industry,
  industryPlural: seed.industryPlural,
  market: seed.market,
  city: seed.city,
  frame: seed.frame,
  sampledAt: new Date().toISOString().slice(0, 10),
  sampled: rows.length,
  refused: rows.filter((r) => r.state === "refused").length,
  challenged: rows.filter((r) => r.state === "challenged").length,
  measurable: M,
  findings: {
    blockingAiCrawlers: count((f) => f.crawlers.some((c) => AI.includes(c.name) && !c.allowed)),
    namingAiCrawlers: count((f) => f.crawlers.some((c) => AI.includes(c.name) && c.named)),
    noStructuredData: count((f) => f.schemaTypes.length === 0),
    localBusinessSchema: count((f) => f.schemaTypes.some((t) => /LocalBusiness|Organization/i.test(t))),
    faqSchema: count((f) => f.schemaTypes.some((t) => /FAQPage/i.test(t))),
    noSitemap: count((f) => !f.sitemapFound),
    noRobots: count((f) => !f.robotsTxtFound),
    notOneH1: count((f) => f.h1s.length !== 1),
    noMetaDescription: count((f) => !f.metaDescription),
    noCanonical: count((f) => !f.canonical),
    noOpenGraph: count((f) => !f.hasOpenGraph),
    noViewport: count((f) => !f.viewport),
    notHttps: count((f) => !f.https),
    imagesMissingAlt: count((f) => f.imagesMissingAlt > 0),
    slowerThan3s: count((f) => f.ttfbMs > 3000),
    slowerThan1s: count((f) => f.ttfbMs > 1000),
    medianResponseMs: median(ok.map((r) => r.facts.ttfbMs)),
    medianHtmlKb: Math.round(median(ok.map((r) => r.facts.htmlBytes)) / 1024),
    medianWordCount: median(ok.map((r) => r.facts.wordCount)),
    medianScore: median(ok.map((r) => r.score)),
    scoreUnder50: count(() => false) + ok.filter((r) => r.score < 50).length,
  },
};

mkdirSync("src/lib/research/benchmarks", { recursive: true });
writeFileSync(`src/lib/research/benchmarks/${slug}.json`, JSON.stringify(out, null, 1) + "\n");
console.error(`\nwrote src/lib/research/benchmarks/${slug}.json  (${M} measurable of ${rows.length})`);
