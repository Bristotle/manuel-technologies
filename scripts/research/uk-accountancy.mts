/* Original research: AI crawler access and technical health across UK
   accountancy firm websites.

   SAMPLING FRAME, stated so the result is reproducible and criticisable:
   top organic results for "accountants in {city}" across eight UK cities
   (Manchester, Birmingham, Leeds, Bristol, Nottingham, Liverpool, Glasgow and
   Edinburgh, London), plus two national firms. Directories, ICAEW listings and
   aggregator pages excluded, since they are not firm websites.

   This is not a random sample of the profession. It is a sample of the firms a
   searcher actually finds, which is the population that matters for a study
   about visibility. Say so in the write up rather than implying otherwise. */

import { gatherFacts, scoreFacts } from "../../src/lib/audit/analyse.ts";

const SITES = [
  "menzies.co.uk","championgroup.co.uk","alexander.co.uk","ac-accounts.co.uk","hurst.co.uk","dunhamsaccountants.co.uk",
  "braccountants.co.uk","jwhinks.co.uk","brindleys.co.uk","naseems.co.uk","bcdaccountants.co.uk","hcaacct.co.uk","hhmaccountants.co.uk","sigmachartered.co.uk","feltonsbham.co.uk",
  "bhp.co.uk","rsaccountancy.co.uk","leonandcompany.co.uk","yahyaaccountancy.co.uk","oand.co.uk","wyattandco.net",
  "pkf-francisclark.co.uk","streets.uk","albertgoodman.co.uk","oakensen.co.uk","dunkleys.accountants","milstedlangdon.co.uk","evanspartners.co.uk","prwsbristol.co.uk",
  "rwbca.co.uk","wrightvigar.co.uk","pagekirk.co.uk","rogers-spencer.co.uk","higson-accountants.co.uk","lemans.co.uk","claytonandbrewill.com",
  "mjfaccountancy.co.uk","johnkerraccountants.co.uk","langtons.uk.com","accountantinliverpool.co.uk","williamsoncroft.co.uk","jondaviesaccountants.co.uk","coburnmckenna.co.uk",
  "johnstoncarmichael.com","hlca.co.uk","factsandfigures.co.uk","whitelawwells.co.uk","kppca.co.uk","gillespieandanderson.co.uk",
  "accotax.co.uk","fusionaccountants.co.uk","hayes-accountants.co.uk","londonaccountants.co","elantax.com",
  "uhy-uk.com","mha.co.uk",
];

const CONCURRENCY = 4;

async function auditOne(domain: string) {
  try {
    const facts = await gatherFacts(`https://${domain}`);
    const { overall, pillars } = scoreFacts(facts);
    return { domain, ok: true as const, facts, overall, pillars };
  } catch (error) {
    return { domain, ok: false as const, error: (error as Error).message };
  }
}

const results: Awaited<ReturnType<typeof auditOne>>[] = [];
const queue = [...SITES];

await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (;;) {
      const domain = queue.shift();
      if (!domain) return;
      const r = await auditOne(domain);
      results.push(r);
      process.stderr.write(`${r.ok ? "ok  " : "FAIL"} ${domain}\n`);
    }
  }),
);

console.log(JSON.stringify({ sampledAt: new Date().toISOString(), results }, null, 1));
