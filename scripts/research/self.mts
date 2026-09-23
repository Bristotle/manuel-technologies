/* Score manueltechnologies.com with the same engine that produced the
   industry benchmarks, so the comparison on /work is like for like. */
import { gatherFacts, scoreFacts } from "../../src/lib/audit/analyse.ts";
const f = await gatherFacts("https://manueltechnologies.com");
const { overall } = scoreFacts(f);
console.log(JSON.stringify({ score: overall, ttfbMs: f.ttfbMs, h1s: f.h1s.length, schemaTypes: f.schemaTypes.length, og: f.hasOpenGraph, sitemapUrls: f.sitemapUrlCount, words: f.wordCount }, null, 1));
