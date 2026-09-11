/* Measured comparison of Ghanaian web design agencies for the post
   "Web design companies in Ghana: how to compare them properly".
   Same engine as /free-audit. Criteria are things a reader can check by
   running the same tool, not opinions. Manuel Technologies is measured on
   exactly the same terms and placed wherever the criteria put it. */
import { writeFileSync } from "node:fs";
import { gatherFacts, scoreFacts } from "../../src/lib/audit/analyse.ts";

const AGENCIES = [
  { name: "Manuel Technologies", domain: "manueltechnologies.com", pricingUrl: "https://manueltechnologies.com/pricing" },
  { name: "JobHouse Web Services", domain: "jobhouse.com.gh", pricingUrl: "https://jobhouse.com.gh/ghana-web-design-company/pricing/" },
  { name: "Faciotech", domain: "faciotech.com", pricingUrl: "https://blog.faciotech.com/website-cost-in-ghana" },
  { name: "Websys Ghana", domain: "websysgh.com", pricingUrl: "https://websysgh.com/website-design-prices-ghana/" },
  { name: "Ghana Web Designs", domain: "ghanawebdesigns.com", pricingUrl: "https://ghanawebdesigns.com/2020/05/10/cost-website-design-ghana-2021-guide-web-design-prices-ghana/" },
  { name: "ClinchTechPro", domain: "clinchtechpro.com", pricingUrl: "https://clinchtechpro.com/website-design-prices-in-ghana-real-cost/" },
  { name: "Sobiaonline", domain: "sobiaonline.com", pricingUrl: "https://sobiaonline.com/how-much-does-a-website-cost-in-ghana/" },
  { name: "EnspireFX", domain: "enspirefx.com", pricingUrl: "https://enspirefx.com/cost-of-website-design-in-ghana/" },
];

const out: unknown[] = [];
for (const a of AGENCIES) {
  const t0 = Date.now();
  try {
    const runs = [];
    for (let i = 0; i < 3; i++) runs.push(await gatherFacts(`https://${a.domain}`));
    const ttfbs = runs.map((r) => r.ttfbMs).sort((x, y) => x - y);
    const f = { ...runs[0], ttfbMs: ttfbs[1] };
    const { overall } = scoreFacts(f);
    const rec = {
      name: a.name, domain: a.domain, pricingUrl: a.pricingUrl,
      status: f.status, ttfbMs: f.ttfbMs, htmlKb: Math.round(f.htmlBytes / 1024),
      https: f.https, viewport: f.viewport, h1Count: f.headingCounts["h1"] ?? f.headingCounts["1"] ?? 0,
      metaDescription: !!f.metaDescription, canonical: !!f.canonical,
      schemaTypes: f.schemaTypes, sitemap: f.sitemapFound,
      blockedCrawlers: f.crawlers.filter((c: { allowed: boolean }) => !c.allowed).map((c: { name: string }) => c.name),
      score: overall, took: Date.now() - t0,
    };
    out.push(rec);
    console.error(`${a.name.padEnd(24)} ${f.status} ${f.ttfbMs}ms ${rec.htmlKb}KB h1=${f.h1Count} score=${overall}`);
  } catch (e) {
    out.push({ name: a.name, domain: a.domain, error: String(e) });
    console.error(`${a.name.padEnd(24)} ERROR ${String(e).slice(0, 80)}`);
  }
}
writeFileSync("src/lib/research/ghana-agencies-2026.json", JSON.stringify({ measured: "2026-09-11", method: "gatherFacts + scoreFacts from src/lib/audit/analyse.ts, three fetches each from a single location, median time to first byte, other facts from the first fetch", agencies: out }, null, 2));
