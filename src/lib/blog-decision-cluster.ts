import type { BlogPost } from "@/lib/blog-posts";
import type { BlogFaq, BlogSection } from "@/lib/blog-types";
import { CARE_PLANS, MARKET, TIERS, ghs } from "@/lib/pricing";
import AGENCIES from "@/lib/research/ghana-agencies-2026.json";

/* The decision cluster. Comparison and choosing. Pillar: /pricing.
   Same rules as the cost cluster, see blog-cost-cluster.ts.

   POST 10 IS MEASURED, NOT WRITTEN. The agency comparison reads from
   research/ghana-agencies-2026.json, produced by scripts/research/
   ghana-agencies.mts running the same engine as /free-audit against each
   firm's homepage. Manuel Technologies is measured on identical terms and
   placed wherever the numbers put it. Where this site loses a column, the
   post says so. A listicle with ourselves at number one is the version
   every reader sees through. */

const faq = (question: string, answer: string): BlogFaq => ({ question, answer });
const section = (heading: string, ...paragraphs: string[]): BlogSection => ({ heading, paragraphs });

const [starter, business] = TIERS;
const [essential] = CARE_PLANS;
const [, faciotech] = MARKET.rows;
const range = (t: typeof starter) => `${ghs(t.from)} to ${t.to.toLocaleString("en-GB")}`;

export const DECISION_CLUSTER = "Website cost in Ghana";

type Agency = {
  name: string; domain: string; pricingUrl: string; ttfbMs: number; htmlKb: number;
  https: boolean; viewport: boolean; h1Count: number; metaDescription: boolean;
  canonical: boolean; schemaTypes: string[]; sitemap: boolean; blockedCrawlers: string[]; score: number;
};
const measured = (AGENCIES.agencies as Agency[]).filter((a) => typeof a.score === "number");

/* Criteria a reader can check. One point each, published pricing included
   because every firm in the sample publishes prices, which is how they were
   found. */
function criteria(a: Agency) {
  return {
    https: a.https,
    viewport: a.viewport,
    oneH1: a.h1Count === 1,
    description: a.metaDescription,
    canonical: a.canonical,
    schema: a.schemaTypes.length > 0,
    sitemap: a.sitemap,
    lightHtml: a.htmlKb <= 150,
    aiCrawlers: a.blockedCrawlers.length === 0,
    fastTtfb: a.ttfbMs <= 600,
  };
}
const ranked = measured
  .map((a) => {
    const c = criteria(a);
    const passed = Object.values(c).filter(Boolean).length;
    return { ...a, c, passed };
  })
  .sort((x, y) => y.passed - x.passed || y.score - x.score);

const mt = ranked.find((a) => a.domain === "manueltechnologies.com")!;
const mtRank = ranked.indexOf(mt) + 1;
const ttfbs = measured.map((a) => a.ttfbMs).sort((a, b) => a - b);
const medianTtfb = ttfbs[Math.floor(ttfbs.length / 2)];
const heaviest = [...measured].sort((a, b) => b.htmlKb - a.htmlKb)[0];
const mtHtmlRank = [...measured].sort((a, b) => b.htmlKb - a.htmlKb).findIndex((a) => a.domain === mt.domain) + 1;
const tick = (b: boolean) => (b ? "Yes" : "No");

export const DECISION_CLUSTER_POSTS: BlogPost[] = [
  /* ---------------------------------------------------------------------
     Post 9. Ten questions. The questions do the selling.
     Primary: how to choose a web design company
     --------------------------------------------------------------------- */
  {
    slug: "how-to-choose-web-design-company-ghana",
    cluster: DECISION_CLUSTER,
    title: "How to choose a web design company in Ghana: 10 questions to ask",
    metaTitle: "How to choose a web design company in Ghana",
    description: "Ten questions that separate a web design company that will still answer in two years from one that will not. Take the list to every firm.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "8 min read",
    lead: `Choosing a web design company in Ghana comes down to ten questions, and the answers matter more than the price. Ask every one of them to every firm you speak to, including us. Our answers are on the [price list](/pricing) and in the work, and a firm that cannot answer all ten specifically is telling you something the quote does not.`,
    heroImage: {
      src: "/work/cangaf.webp",
      alt: "Cangaf Ltd website, an example of the work to ask to see",
      width: 1200,
      height: 750,
      caption: "Ask to see live work, not screenshots. A URL that loads on your own phone is the only proof that counts. [See the case study](/work/cangaf).",
      href: "/work/cangaf",
    },
    sections: [
      {
        heading: "The ten questions",
        paragraphs: ["Each one has a good answer and a bad answer. The bad answer is usually vague."],
        bullets: [
          "Can I see three live sites you built, and open them on my phone right now? Screenshots can be anything. A URL that loads is proof. If they hesitate, the work is not theirs or it is not live.",
          "What will my site score on Google's PageSpeed test on mobile, and will you commit to it in writing? A firm that builds for speed knows the number. A firm that does not will change the subject.",
          "Who will own the domain, the hosting account and the code? The only acceptable answer is you, in your name, with the logins handed over at launch. Anything else is a rental.",
          "Is the person quoting the person who will build it? The most common way a project fails is a salesperson promising what a builder cannot deliver. Ask to speak to the builder before signing.",
          "What exactly is included, written down? Design, build, hosting, SSL, revisions, testing, post launch support. A price without an inclusions list is a price for nothing in particular.",
          "What is not included? The honest firms tell you before you ask: copywriting, photography, the domain, gateway fees. The others let you find out on the invoice.",
          "What happens after launch, and what does it cost? A site nobody is responsible for after the invoice has a shelf life. Ask for the care plan and what it includes.",
          "What happens if you stop trading? You want the answer to be that everything is in your name and documented, so any competent developer can take over. If the answer is silence, the site dies with the firm.",
          "Will you set up Google Search Console and Analytics in my account, not yours? Data in the agency's account leaves with the agency. Yours should be yours from day one.",
          "Can you show me a site you built that still ranks two years later? Anyone can launch. The question is whether the work holds. A firm that cannot point to one has not been doing this long enough or has not been doing it well.",
        ],
      },
      section(
        "Why the questions do the selling",
        "Notice that none of the ten is about price. A firm that answers all ten specifically will usually not be the cheapest, and it will usually be the right choice, because each question is really about whether the site will still be working and still be yours in two years.",
        `We can answer all ten, which is why we publish the list. [Every price and every inclusion is on the price list](/pricing). Every site under [our work](/work) is live and opens on a phone. The person you speak to builds the site. The domain, the hosting and the code are yours. And there is a care plan from ${ghs(essential.monthly)} a month for after launch.`,
      ),
      section(
        "The one question to ask yourself",
        `What is the site for? A placeholder, a business card, or the place customers decide whether to trust you. The answer decides whether [cheap is the right call](/blog/cheap-website-design-ghana) or whether the ten questions above are worth the time. [What a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) puts numbers to each answer.`,
      ),
    ],
    conclusion: "Choose a web design company in Ghana by asking ten specific questions about ownership, speed, inclusions, support and live work, and by weighting the answers above the price. A firm that answers all ten will rarely be the cheapest and will usually be right. Take the list with you.",
    faqs: [
      faq("How do I choose a web design company in Ghana?", "Ask ten specific questions: live sites you can open on your phone, a committed page speed score, who owns the domain and code, whether the quoter is the builder, what is included and excluded in writing, what happens after launch, what happens if they stop trading, whose accounts the analytics sit in, and a site that still ranks two years on. Weight the answers above the price."),
      faq("What should I look for in a web design company?", "Live work you can open, specific answers, ownership in your name, a care plan, and the same person before and after launch. What to avoid: screenshots instead of URLs, adjectives instead of numbers, and any hesitation about who owns the domain."),
      faq("Should I choose the cheapest web design company?", "Only when the site is a placeholder or a business card. When customers judge you by it, the cheapest quote is usually a template with no support, and the rebuild costs more than buying properly once."),
      faq("What questions should I ask a web designer before hiring?", "The ten in this post. If you only ask three: who owns the domain and code, can I open three of your live sites on my phone now, and what happens after launch."),
    ],
    sources: [
      { label: "Google: PageSpeed Insights", href: "https://pagespeed.web.dev/" },
      { label: "Google: Search Console", href: "https://search.google.com/search-console" },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 10. Compare agencies. Criteria first, then scores, MT placed
     wherever the numbers put it.
     Primary: top 10 web design companies in ghana, best web design
     company in ghana, list of web design companies in ghana
     --------------------------------------------------------------------- */
  {
    slug: "web-design-companies-in-ghana-compared",
    cluster: DECISION_CLUSTER,
    title: "Web design companies in Ghana: how to compare them properly",
    metaTitle: "Web design companies in Ghana, measured",
    description: `${measured.length} Ghanaian web design companies measured on ten checkable criteria with one tool on one day. Criteria published first, scores second.`,
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "9 min read",
    lead: `The usual version of this post is a list of ten agencies with the author at number one, and every reader sees through it. This is the other version. We measured ${measured.length} Ghanaian web design companies, including ourselves, on ten criteria anyone can check with a free tool, on ${AGENCIES.measured}, and published the criteria before the scores. Manuel Technologies came ${mtRank === 1 ? "first" : `number ${mtRank}`}, and it lost a column, which is stated below. Our prices are [published](/pricing) so the comparison can include them.`,
    heroImage: {
      src: "/work/impressiful.webp",
      alt: "Impressiful online store, live work that can be opened and measured",
      width: 1200,
      height: 750,
      caption: "The only comparison that survives checking is one made with a tool the reader can run. Every site below, and every site under our work, can be measured by anyone. [See the case study](/work/impressiful).",
      href: "/work/impressiful",
    },
    sections: [
      section(
        "The criteria, published first",
        "Ten checks, one point each, all measurable from outside with no access to the agency. They are the checks our free audit runs, and the reason they matter is simple: a web design company's own homepage is the one site it had complete control over. If it is slow, has no H1 or blocks the crawlers that feed AI answers, that is the ceiling of what it will do for you.",
        "HTTPS. A mobile viewport tag, without which the page does not lay out on a phone. Exactly one H1. A meta description. A canonical tag. Any structured data. An XML sitemap. HTML under 150KB before assets. No AI crawlers blocked in robots.txt. Time to first byte under 600 milliseconds, as the median of three fetches.",
        "What is not measured: design taste, client results, years active and whether the site ranks. All of those matter and none can be measured from outside without either opinion or data we do not have. The list is deliberately limited to what a reader can reproduce.",
      ),
      {
        heading: "The scores",
        paragraphs: [
          `Ranked by criteria passed, ties broken by the audit's overall score. Every firm was found by searching for website design prices in Ghana, which is why each publishes pricing. Measured ${AGENCIES.measured}, one location, three fetches each. Run the same check on any of them with [our free audit](/free-audit) and you will get the same measurements, though time to first byte varies by network and by hour.`,
        ],
        table: {
          caption: `${measured.length} agencies on ten criteria, ${AGENCIES.measured}`,
          headers: ["Rank", "Company", "Passed", "TTFB", "HTML", "One H1", "Schema", "Sitemap", "AI crawlers"],
          rows: ranked.map((a, i) => [
            String(i + 1),
            `[${a.name}](https://${a.domain})`,
            `${a.passed} / 10`,
            `${a.ttfbMs} ms`,
            `${a.htmlKb} KB`,
            tick(a.c.oneH1),
            tick(a.c.schema),
            tick(a.c.sitemap),
            a.c.aiCrawlers ? "Open" : `${a.blockedCrawlers.length} blocked`,
          ]),
        },
      },
      section(
        "Where we lost",
        `Manuel Technologies passed ${mt.passed} of ten and placed ${mtRank === 1 ? "first" : `number ${mtRank}`}. The column it lost is HTML weight: our homepage is ${mt.htmlKb}KB of HTML before assets, which is ${mtHtmlRank === 1 ? "the heaviest" : `the ${["", "", "second", "third", "fourth", "fifth"][mtHtmlRank] || mtHtmlRank + "th"} heaviest`} of the ${measured.length}, against a 150KB threshold. The weight is structured data, inline content and the framework's rendering payload, and it is a real cost on a slow connection. It is on our list to reduce, and it stays in this table until it is.`,
        `The lightest homepage in the sample, [${ranked.find((a) => a.htmlKb === Math.min(...measured.map((x) => x.htmlKb)))!.name}](https://${ranked.find((a) => a.htmlKb === Math.min(...measured.map((x) => x.htmlKb)))!.domain}), is ${Math.min(...measured.map((x) => x.htmlKb))}KB. The heaviest, ${heaviest.name}, is ${heaviest.htmlKb}KB. Median time to first byte across the ${measured.length} was ${medianTtfb} milliseconds, which is respectable and considerably better than the 3,497 millisecond median we measured across [56 UK accountancy firms](/research/uk-accountancy-websites) with the same tool.`,
      ),
      section(
        "What the table does not tell you",
        "That a firm's homepage passes ten technical checks says it knows how to build a site that passes them. It does not say the firm will be pleasant to work with, that it will deliver on time, or that its designs suit your business. Those are found by speaking to the firm and to its clients, and by opening its live work on your own phone.",
        `It also does not say which firm is right for your budget. Prices in the sample run from under ${ghs(1000)} to over ${faciotech.custom.split(" to ")[1]}, and the cheapest firm in the table is not the worst and the most expensive is not the best. [What a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) explains what the bands buy, and [the ten questions to ask](/blog/how-to-choose-web-design-company-ghana) cover the part no table can.`,
      ),
      section(
        "How to use this",
        "Pick the three firms whose work you like the look of. Run each through the free audit. Ask each the ten questions. Then compare prices, last, against [a published price list](/pricing) wherever one exists. A firm that passes the checks, answers the questions and shows you live work is a safe choice at any of the prices in the sample. A firm that fails the checks on its own homepage is telling you what it will do with yours.",
      ),
    ],
    conclusion: `${measured.length} Ghanaian web design companies were measured on ten checkable criteria with one tool on one day, criteria published before scores. Manuel Technologies placed ${mtRank === 1 ? "first" : `number ${mtRank}`} and lost the HTML weight column, which is stated rather than hidden. Use the table to shortlist, the free audit to verify, the ten questions to decide, and the price last.`,
    faqs: [
      faq("Which is the best web design company in Ghana?", `There is no honest single answer, because the best firm depends on what the site is for and what you can spend. On ten checkable technical criteria measured ${AGENCIES.measured}, Manuel Technologies passed ${mt.passed} of ten and placed ${mtRank === 1 ? "first" : `number ${mtRank}`} of ${measured.length}, and lost the HTML weight check. Run the same check on any firm before choosing.`),
      faq("How do I compare web design companies in Ghana?", "Publish the criteria before the scores. Measure each firm's own homepage on things you can check from outside: HTTPS, viewport, one H1, meta description, canonical, schema, sitemap, HTML weight, AI crawler access and response time. Then open their live work on your phone and ask the ten questions. Compare price last."),
      faq("Are the top 10 web design company lists reliable?", "Rarely. Most are written by an agency with itself at number one, or are paid placements, and none publish criteria. A list you can reproduce with a free tool is the only kind worth reading, which is why this one includes the method and the date."),
      faq("Why does an agency's own website matter?", "It is the one site the agency had complete control over, with no client constraints. If it is slow, missing basics or blocking the crawlers that feed AI answers, that is the ceiling of what the agency will build for you."),
    ],
    sources: [
      { label: "Manuel Technologies: free website audit", href: "https://manueltechnologies.com/free-audit" },
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "Google: structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
    ],
    serviceHref: "/grow/technical-seo",
  },

  /* ---------------------------------------------------------------------
     Post 11. WordPress or custom. Honest that WordPress is often right.
     Primary: wordpress vs custom website
     --------------------------------------------------------------------- */
  {
    slug: "wordpress-vs-custom-website-ghana",
    cluster: DECISION_CLUSTER,
    title: "WordPress or custom build: which does your Ghana business need?",
    metaTitle: "WordPress or custom build for a Ghana business?",
    description: "WordPress is right for many Ghanaian businesses and wrong for a specific few. The honest test, what each costs to run, and the deciding factor.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "8 min read",
    lead: `WordPress is right for a business that publishes often, has a small budget and will pay around ${faciotech.care.replace(" recommended", "")} to keep a plugin stack patched. A custom build, which is every tier on our [price list](/pricing), is right when the site has to do something specific, be fast on a phone in Kumasi, or still work in three years without a plugin breaking it. This post is honest about when custom is not what you need.`,
    heroImage: {
      src: "/work/getfold.webp",
      alt: "Fold, a custom built church management PWA",
      width: 1200,
      height: 750,
      caption: "Fold, at getfold.org. A custom build because no existing product spoke the language of a Ghanaian circuit's statistical return. That is the test: does something off the shelf already do the job. [Open the live product](https://www.getfold.org).",
    },
    sections: [
      section(
        "When WordPress is right",
        "When you publish often and want to do it yourself, and the site is mostly pages and posts. WordPress is the most widely used content management system in the world for a reason: the editing experience is good, the ecosystem is enormous, and any developer in Accra can work on it.",
        "When the budget is at the bottom of the market. A WordPress template with your details is what most cheap sites are, and it is a real product for a placeholder or a business card.",
        "When you need a feature that a mature plugin already does well and you do not need it to do anything unusual. A booking form, a simple gallery, a newsletter signup. Reinventing those is waste.",
      ),
      section(
        "When WordPress is wrong",
        "When speed on a phone matters. A WordPress site can be made fast, but its default state is slow, because every plugin adds code to every page and shared hosting adds latency. Making it fast is ongoing work, not a setting.",
        "When the site has to do something specific. Custom pricing logic, a member portal, a dashboard, an integration with your accounting system. This can be done with plugins, and it usually ends as a stack of plugins from different authors that stop cooperating on the next update.",
        `When nobody will maintain it. This is the deciding factor and it is why the maintenance question comes before the build question. A plugin heavy WordPress site genuinely needs the ${faciotech.care.replace(" recommended", "")} that one published guide recommends, because updates break things and things need patching weekly. A site nobody maintains gets hacked, not eventually but predictably. [What maintenance should cost](/blog/website-maintenance-cost-ghana) covers this in full.`,
      ),
      section(
        "What custom means, and what it does not",
        "Custom does not mean expensive by default and it does not mean building everything from nothing. It means the site is built for what it has to do, with no code it does not need, on hosting that patches itself, with a build that fails if something is broken rather than a plugin that silently stops working.",
        `Our Starter and Business tiers, ${range(starter)} and ${range(business)}, are custom builds. They cost more than a WordPress template and less than a WordPress site maintained properly for a year, and the difference in what they cost to run each month is the whole argument: our care plans start at ${ghs(essential.monthly)} because a site with no plugin stack takes an hour a month to keep healthy rather than five.`,
        "The honest caveat is that content editing on a custom build has to be designed in. On our Business tier it is, and you edit your own pages. On a Starter site, which is built to be finished, it is not, and that is stated on the price list.",
      ),
      section(
        "The test",
        "Write down what the site has to do that a brochure does not. If the list is empty, or it is all things a mature plugin does well, and you will pay for maintenance, WordPress is right. If the list has anything specific to your business, or speed on a phone decides whether visitors stay, or nobody will maintain a plugin stack, build custom.",
        `Then look at [the price list](/pricing) with the list in hand, and [what a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) if you want the full picture before you do.`,
      ),
    ],
    conclusion: "WordPress is right when you publish often, the budget is tight and you will pay to keep a plugin stack maintained. A custom build is right when the site has to do something specific, has to be fast on a phone, or has to survive without a plugin breaking it. The maintenance bill is the deciding factor, and a custom build is usually cheaper to run than to buy.",
    faqs: [
      faq("Is WordPress or a custom website better?", "Neither, in general. WordPress is better for frequent publishing on a small budget with maintenance paid for. A custom build is better when the site has to do something specific, must be fast on a phone, or must keep working without ongoing plugin maintenance."),
      faq("Is WordPress free?", `The software is. Hosting, a theme, plugins, and the maintenance to keep them patched are not, and a plugin heavy site can genuinely need ${faciotech.care.replace(" recommended", "")} in upkeep. The build price is the smaller number either way.`),
      faq("Can a custom website be edited without a developer?", "Yes, when editing is designed in. Our Business tier includes content you edit yourself. A Starter site is built to be finished and is not, which is stated on the price list."),
      faq("Is WordPress secure?", "It can be kept secure with disciplined updates. Left alone, a plugin heavy WordPress site is the most commonly compromised kind of website there is, because automated scanners find unpatched plugins by the thousand."),
    ],
    sources: [
      { label: "WordPress.org", href: "https://wordpress.org" },
      { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
      { label: "Faciotech: how much does a website cost in Ghana", href: faciotech.href },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 12. Freelancer or agency. Neither: continuity.
     Primary: freelance web designer ghana vs agency
     --------------------------------------------------------------------- */
  {
    slug: "freelancer-or-agency-ghana",
    cluster: DECISION_CLUSTER,
    title: "Freelancer or agency in Ghana: which should you hire?",
    description: "Freelancers are cheaper and direct. Agencies have cover and overhead. Neither label predicts whether the site survives two years. Continuity does.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "6 min read",
    lead: `A freelance web designer in Ghana is usually cheaper and you deal with the builder directly. An agency usually costs more and has more people, and the person you speak to is often not the person who builds. Neither label predicts the thing that matters, which is whether someone is still answering in two years. This post is about how to buy that from either, and it is why the [price list](/pricing) has care plans on it.`,
    heroImage: {
      src: "/work/dementia-in-home.webp",
      alt: "Dementia In Home, over a thousand pages maintained over time",
      width: 1200,
      height: 750,
      caption: "Dementia In Home. Over a thousand pages, maintained and grown over time. Continuity is what a site this size depends on. [See the case study](/work/dementia-in-home).",
      href: "/work/dementia-in-home",
    },
    sections: [
      section(
        "What you get from a freelancer",
        "Lower overhead, so a lower price for the same work. Direct contact with the person building, so nothing is lost between a salesperson and a builder. Often faster, because there is no queue.",
        "What you risk: one person. If they are ill, busy, abroad or gone, the site has nobody. If the domain and hosting are in their name, which is common, the site is not yours to move. Most of the stories that begin with a junior who disappeared are freelancer stories, and most of them were preventable by asking whose name the domain is in.",
      ),
      section(
        "What you get from an agency",
        "More than one person, so there is cover. A process, usually. Sometimes a design team and a build team, which can mean better design and can also mean the person who promised the thing is not the person building it.",
        "What you risk: overhead you pay for, a salesperson between you and the builder, and a queue. And the same ownership question, because an agency that registers your domain in its name is no better than a freelancer who does. The label does not protect you.",
      ),
      section(
        "The thing that actually matters",
        "Continuity. Will there be someone responsible for the site next year, and the year after, who knows how it was built, has the documentation, and answers when the form stops sending. That is not a property of freelancers or agencies. It is a property of how the engagement is set up.",
        "Buy continuity by asking four things of either. Whose name is the domain and hosting in. Is there written documentation of how the site is built. Is there a care plan, with a price, that keeps someone responsible after launch. And what happens if you stop trading, with a specific answer.",
        `A freelancer with good answers to those four is a safer choice than an agency with vague ones. [The ten questions to ask any web design company](/blog/how-to-choose-web-design-company-ghana) cover the rest.`,
      ),
      section(
        "How we are set up",
        `The person you speak to builds the site, which is the freelancer's advantage. There is documentation and a handover at every tier, and a care plan from ${ghs(essential.monthly)} a month that keeps someone responsible after launch, which is what the agency label is supposed to mean and often does not. The domain, the hosting and the code are in your name. [Every price is published](/pricing) so the comparison with either a freelancer or an agency is easy to make, and [what a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) puts the numbers in context.`,
      ),
    ],
    conclusion: "Freelancer or agency is the wrong question. Continuity is the right one. Buy it from whichever you choose by making sure the domain and hosting are in your name, the build is documented, there is a care plan with a price, and there is a specific answer to what happens if they stop trading.",
    faqs: [
      faq("Should I hire a freelancer or an agency for my website?", "Either can be right. A freelancer is cheaper and direct but is one person. An agency has cover but overhead and often a salesperson between you and the builder. Choose on continuity: ownership in your name, documentation, a care plan and a clear answer to what happens if they stop trading."),
      faq("Are freelance web designers in Ghana cheaper than agencies?", "Usually, because overhead is lower. The saving is real. The risk is that one person is the whole operation, which is fine if the domain is yours and the build is documented, and a problem if neither is true."),
      faq("What happens to my website if my web designer disappears?", "If the domain and hosting are in your name and the build is documented, any competent developer takes over. If they are in the designer's name, you may lose the site. Ask before signing, not after."),
      faq("How do I make sure my website is maintained after launch?", `A care plan with a price and an inclusions list, from whoever builds it or from someone else. Ours start at ${ghs(essential.monthly)} a month and cover hosting, SSL, security updates, backups and monitoring.`),
    ],
    sources: [
      { label: "Manuel Technologies: published price list", href: "https://manueltechnologies.com/pricing" },
    ],
    serviceHref: "/agency-vs-engineer",
  },
];
