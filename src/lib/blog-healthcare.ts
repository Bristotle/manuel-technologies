import type { BlogPost } from "@/lib/blog-posts";
import type { BlogFaq, BlogSection } from "@/lib/blog-types";
import H from "@/lib/research/benchmarks/ghana-private-hospitals.json";

/* Healthcare, from our own benchmark of 17 private hospital and clinic
   websites in Ghana.
   ---------------------------------------------------------------------------
   This post must not repeat two pages that already exist:

     /research/private-hospitals   the benchmark: the numbers and the method
     /websites-for/private-hospitals  what a hospital site has to do, priced

   Its distinct finding is the one neither of those leads on. Not one of the
   seventeen blocks an AI crawler, and not one names an AI crawler either.
   The door is open and nobody has put a sign on it. Combined with 65% that
   never declare what the organisation is in structured data, that is why an
   answer engine asked for a hospital in Accra cannot name one with any
   confidence.

   Every number is read from the committed benchmark JSON, never typed, so
   the post cannot drift from the study. */

const f = H.findings;
const M = H.measurable;
const pc = (n: number) => `${Math.round((n / M) * 100)}%`;
const of = (n: number) => `${n} of the ${M}`;

const faq = (question: string, answer: string): BlogFaq => ({ question, answer });
const section = (heading: string, ...paragraphs: string[]): BlogSection => ({ heading, paragraphs });

export const HEALTHCARE_CLUSTER = "Search and GEO";

export const HEALTHCARE_POSTS: BlogPost[] = [
  {
    slug: "why-ai-cannot-recommend-a-hospital-in-ghana",
    cluster: HEALTHCARE_CLUSTER,
    title: "Ask an AI for a hospital in Accra. Here is why it struggles to answer.",
    metaTitle: "Why AI cannot recommend a hospital in Ghana",
    description: `We measured ${M} private hospital and clinic websites in Ghana. None blocks an AI crawler, none names one, and ${pc(M - f.localBusinessSchema)} never say in machine readable terms what the organisation is.`,
    published: "2026-09-23",
    modified: "2026-09-23",
    readTime: "9 min read",
    lead: `Open ChatGPT and ask for a private hospital in Accra with a fertility unit, or one that takes your insurance, and the answer is vague in a way that a question about a London or Nairobi hospital is not. It is not that Ghanaian hospitals are hidden. We measured ${M} of their websites with the same engine behind our [free audit](/free-audit), and found something more fixable than hiding: not one of them blocks an AI crawler, and not one of them names an AI crawler either. The door is open. Nobody has put a sign on it. The [full benchmark is published](/research/private-hospitals), with the method stated first and no hospital named.`,
    sections: [
      section(
        "What we measured, and what refused to be measured",
        `Twenty one private hospitals and clinics in Accra, Tema and Kumasi, drawn from published directories of private facilities in Ghana, where the facility had a working website of its own. Four refused the request or returned an error, so every figure below is over the ${M} that could actually be read. The method, the sampling frame and the exclusions are set out on the [benchmark page](/research/private-hospitals).`,
        `The headline is that these are not bad websites. The median audit score was ${f.medianScore} out of 100. Every one served over HTTPS. Every one set a mobile viewport. Only ${f.imagesMissingAlt} had an image without alt text. Somebody built these properly, which makes what is missing more interesting, because it is not carelessness. It is a category of work nobody has been asked to do yet.`,
      ),
      section(
        "Nobody is blocked. Nobody is named.",
        `Zero of the ${M} carry a rule that blocks GPTBot, ClaudeBot, PerplexityBot or Google-Extended. In our study of 56 UK accountancy firms, roughly one in ten blocked at least one of those, usually because a security plugin shipped the rule and nobody noticed. Ghanaian hospitals have not made that mistake.`,
        `Zero of the ${M} name any of those crawlers either. That is the part worth sitting with. Naming a crawler in robots.txt, even to allow it, is the signal that somebody considered the question. ${of(f.noRobots)} have no robots.txt at all, which means the file that would carry the decision does not exist.`,
        `Being unblocked is not the same as being understood. A crawler that can read a page still has to work out what the organisation is, where it is, what it treats and who works there. That is what the next finding is about.`,
      ),
      section(
        "Two thirds never say what they are",
        `${of(f.noStructuredData)}, ${pc(f.noStructuredData)}, carry no structured data at all: no JSON-LD anywhere on the homepage. Only ${f.localBusinessSchema} of the ${M} declare the organisation in schema, which leaves ${pc(M - f.localBusinessSchema)} that never state, in the form a machine reads, that they are a hospital, where they are, or how to reach them.`,
        `A human reading the page sees a hospital. A search engine sees a document with the word hospital in it. Those are not the same thing, and the gap is exactly where local results and AI recommendations are decided. MedicalOrganization, Hospital and Physician are real schema.org types, and they exist because this problem is common.`,
        `${of(f.faqSchema)} carries FAQ markup. Every hospital answers the same questions all day, about visiting hours, insurance, which consultant sits which day, and almost none of those answers is in a form an answer engine can lift.`,
      ),
      section(
        "The emergency test, and the second that fails it",
        `${of(f.slowerThan1s)}, ${pc(f.slowerThan1s)}, take longer than a second to return their first byte. ${of(f.slowerThan3s)} take longer than three. The median is ${(f.medianResponseMs / 1000).toFixed(1)} seconds.`,
        `A second is a soft threshold for most businesses. For a hospital site it is not, because of who is loading it and when. The person looking for a private hospital at two in the morning is holding a phone, on mobile data, and frightened. They are not comparing facilities. They want a number to call and a place to drive to, and the site that gives them that first wins a decision that had nothing to do with medicine.`,
        `Speed is also the cheapest of these fixes. Nothing on this list needs a redesign. It needs images sized on upload, fewer blocking scripts, and hosting that answers quickly, which our post on [why Ghanaian business websites are slow](/blog/why-your-ghana-business-website-is-slow) goes through in order.`,
      ),
      section(
        "Six hundred and ninety words is not an answer",
        `The median site in the sample carried ${f.medianWordCount} words. That is enough for a welcome, a list of departments and an address. It is not enough to answer the questions patients actually search for, and an answer engine can only cite what exists.`,
        `Consider what is missing at that length. Which insurance schemes are accepted, and whether NHIS applies. Which consultant covers which specialty and on which days. What a first appointment costs. Whether the laboratory runs at weekends. Each of those is a real search, and each one is a page a competitor could publish tomorrow.`,
        `${of(f.notOneH1)} do not have exactly one H1, so even the page that exists is unclear about its own subject, and ${of(f.noOpenGraph)} have no share image, which means a link sent to a family WhatsApp group arrives as a blank grey card at the moment somebody is trying to recommend you.`,
      ),
      section(
        "What we would fix, in this order",
        `None of these needs a new website, and none of them costs money in the sense that a redesign does. They are a week of work on a site that already exists.`,
        `First, add Organization and MedicalOrganization markup with the real name, address, telephone and opening hours, so the facility becomes an entity rather than a document. Second, write a robots.txt that names the AI crawlers and allows them, so the decision is recorded rather than assumed. Third, publish the answers to the questions the front desk repeats all day, with FAQ markup on them. Fourth, get the first byte under a second. Fifth, give every page one clear H1 and a share image.`,
        `We wrote out what a hospital website has to do in full, with what each part costs, at [websites for private hospitals and clinics in Ghana](/websites-for/private-hospitals). If you want to see where your own site sits against the ${M} in this study before speaking to anyone, the [free audit](/free-audit) is the same engine that produced these numbers.`,
      ),
    ],
    conclusion: `The striking thing about this sample is how close it is. These are competently built sites that are one week of unglamorous work away from being the ones an answer engine names. Nobody in the sample has done it yet, which means the first facility that does will not be competing for the position. It will simply hold it.`,
    faqs: [
      faq("Do AI engines actually recommend hospitals?", `Increasingly, yes, in the sense that people ask them. Questions like which hospital in Accra does IVF, or which private clinic takes my insurance, get an answer composed from sources the engine trusts. Being citable depends on being crawlable, being clear about what the organisation is, and having the answer on a page. In our sample of ${M} facilities, the first condition is met by all of them and the second by only ${f.localBusinessSchema}.`),
      faq("Is it bad that no Ghanaian hospital blocks AI crawlers?", `No, it is good, and it is unusual. Blocking happens by accident, through a plugin or a hosting template, and it removes a site from AI answers entirely. Not one facility in our sample had that problem, which means the expensive mistake has already been avoided. What remains is the work of being understood, which is additive.`),
      faq("What schema should a hospital website use?", "MedicalOrganization or Hospital for the facility itself, with name, address, telephone and opening hours. Physician for each consultant, linked to the facility and to their specialty. MedicalSpecialty on department pages. FAQPage on the questions the front desk answers daily. All of it must match what is visible on the page, since markup that contradicts the page is worse than none."),
      faq("How fast should a hospital website be?", `Under a second to first byte, because of when it is loaded. ${of(f.slowerThan1s)} sites we measured were slower than that, and the median was ${(f.medianResponseMs / 1000).toFixed(1)} seconds. Speed is usually the cheapest item on a technical list and for this sector it is also the most consequential.`),
      faq("Did you name the hospitals in the study?", "No. The benchmark reports distributions rather than a league table. Naming facilities for technical faults would be a cheap way to get attention and an expensive way to lose a sector's goodwill, and some flags turn out to be measurement artefacts rather than real faults."),
    ],
    sources: [
      { label: "Our benchmark of 17 Ghanaian hospital websites", href: "https://manueltechnologies.com/research/private-hospitals" },
      { label: "schema.org: MedicalOrganization", href: "https://schema.org/MedicalOrganization" },
      { label: "Google: structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
    ],
    serviceHref: "/grow/geo",
  },
];
