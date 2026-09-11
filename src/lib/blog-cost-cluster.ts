import type { BlogPost } from "@/lib/blog-posts";
import type { BlogFaq, BlogSection } from "@/lib/blog-types";
import { CARE_PLANS, MARKET, TIERS, ghs } from "@/lib/pricing";

/* The website cost cluster. Pillar: /pricing.
   ---------------------------------------------------------------------------
   Rules every post here follows, from the cluster plan:

     Links up to /pricing at least twice, once in the first 200 words
     Links sideways to two other cluster posts
     FAQPage schema from real People Also Ask questions
     Opens with a direct numeric answer, no throat clearing
     At least one screenshot of real work (CLAUDE.md section 4)
     British English, no dashes, no banned words

   EVERY PRICE IS READ FROM lib/pricing.ts. A post never types a price of
   ours. If the price list changes, the posts follow. Competitor figures come
   from MARKET, which records the page and the date each one was fetched.

   SIDEWAYS LINKS. A post may only link to a cluster post that exists. The
   plan publishes two a week, so early posts link to the siblings that are
   live and to the most relevant post outside the cluster, and get their
   third sideways link when the next sibling ships.
   -------------------------------------------------------------------------- */

const faq = (question: string, answer: string): BlogFaq => ({ question, answer });
const section = (heading: string, ...paragraphs: string[]): BlogSection => ({ heading, paragraphs });

const [starter, business, store, custom] = TIERS;
const [essential, , partner] = CARE_PLANS;
const [jobhouse, faciotech] = MARKET.rows;
const range = (t: typeof starter) => `${ghs(t.from)} to ${t.to.toLocaleString("en-GB")}`;

export const CLUSTER = "Website cost in Ghana";

export const COST_CLUSTER_POSTS: BlogPost[] = [
  /* ---------------------------------------------------------------------
     Post 1. The flagship.
     Primary: how much does a website cost in ghana
     --------------------------------------------------------------------- */
  {
    slug: "how-much-does-a-website-cost-in-ghana",
    cluster: CLUSTER,
    title: "How much does a website cost in Ghana? 2026 prices",
    description: `A website in Ghana costs ${range(starter)} for a small site, ${range(business)} for a business site and ${range(store)} for an online store. What moves the price, what the market charges, and the costs nobody quotes.`,
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "11 min read",
    lead: `A website in Ghana costs between ${ghs(starter.from)} and ${ghs(custom.to)} in 2026. A small site built around one action is ${range(starter)}. A business site with a blog is ${range(business)}. An online store with Mobile Money is ${range(store)}. Three things move the number: how many distinct page types there are, whether it takes payments, and what it has to connect to. Our full [price list is published](/pricing), with what each tier includes.`,
    heroImage: {
      src: "/work/cangaf.webp",
      alt: "Cangaf Ltd business website, an example of the business tier",
      width: 1200,
      height: 750,
      caption: `Cangaf Ltd, a business site delivered in the ${range(business)} band. [See the case study](/work/cangaf).`,
      href: "/work/cangaf",
    },
    sections: [
      section(
        "What changes the price",
        "Five things decide the number, and page count is the least important of them. It is the one most quotes are built on because it is the easiest to count.",
        "Distinct page types matter more than pages. A site with a homepage, an about page and a contact page has three page types. A site with twenty location pages built on one template has four. The second is not seven times the work of the first, because the template is built once. What costs money is each new kind of page, since each needs its own layout, its own content structure and its own testing.",
        "Custom design against a template is the second lever. A template is a layout somebody else designed, with your logo and colours dropped in. It is fast and it is cheap, and it looks like the other sites built on the same template. A custom layout is designed around what your visitor is there to do. That is the difference between the bottom of the market and the [Starter tier](/pricing#starter).",
        "Ecommerce is the third and the largest. A store is not a brochure with a buy button. It needs a product catalogue, stock that goes down when something sells, a checkout that handles the payment failing halfway through, and somebody alerted when an order lands. Every one of those is a place money goes missing if it is done badly, which is why a store costs more than a site with the same number of pages.",
        "Integrations are the fourth. A booking system that writes to your calendar, a form that creates a record in your CRM, an order that triggers an SMS. Each connection is real engineering and each one has to keep working when the other system changes.",
        "Content is the fifth and the one that delays more projects than any other. Copy, photography and product information have to exist before the site can be finished. A site quoted without content is a site that will launch late, and launching late costs more than any line on the invoice.",
      ),
      {
        heading: "Website cost in Ghana by type",
        paragraphs: [
          "These are our published prices, with what each includes. They are read from the same source as the price list, so they cannot differ from it. The care plan figures are monthly.",
        ],
        table: {
          caption: "Manuel Technologies published prices, September 2026",
          headers: ["Type", "What you get", "Price"],
          rows: [
            [starter.name, `${starter.summary} Custom layout, contact form, WhatsApp button, Google Business Profile, SSL and hosting, tested from 320px. ${starter.timeline}.`, range(starter)],
            [business.name, `${business.summary} You edit the content yourself. Sitemap, canonical tags and business schema. Analytics and Search Console verified. Speed tuned. 30 days support. ${business.timeline}.`, range(business)],
            [store.name, `${store.summary} MTN MoMo and Telecel Cash with card payments, stock tracking, checkout failure handling, WhatsApp ordering, delivery zones, admin training. ${store.timeline}.`, range(store)],
            [custom.name, `${custom.summary} Database, user roles, integrations, dashboards, testing and handover. Quoted after scoping.`, range(custom)],
            ["Care plans", `Hosting, SSL, monitoring, security updates, backups and a monthly allowance of changes. Three levels.`, `${ghs(essential.monthly)} to ${partner.monthly} a month`],
          ],
        },
        image: {
          src: "/work/miyaki-beauty.webp",
          alt: "Miyaki Beauty online store homepage with product catalogue",
          width: 1200,
          height: 750,
          caption: `Miyaki Beauty, an online store delivered in the ${range(store)} band. [See the case study](/work/miyaki-beauty).`,
          href: "/work/miyaki-beauty",
        },
      },
      {
        heading: "What the market actually charges",
        paragraphs: [
          `We checked published prices from Ghanaian web firms on ${MARKET.checked}. Only firms whose pricing pages could be opened and read are listed, and the figures are quoted as they appear. Both are linked so you can check them yourself.`,
          `[${jobhouse.firm}](${jobhouse.href}) publishes a simple site at ${jobhouse.starter}, a big business site at ${jobhouse.business}, an online store at ${jobhouse.store} and custom design ${jobhouse.custom.toLowerCase()}. ${jobhouse.note}`,
          `[${faciotech.firm.replace(" (published guide)", "")}](${faciotech.href}) publishes a cost guide rather than a price list, with a starter site at ${faciotech.starter}, business sites at ${faciotech.business}, ecommerce at ${faciotech.store} and custom builds at ${faciotech.custom}. Their guide recommends ${faciotech.care.toLowerCase()} for hosting and maintenance.`,
          `Set against those, our Starter tier at ${range(starter)} is more expensive than the cheapest published options. Our Online store at ${range(store)} is cheaper than Faciotech's range and our Custom builds start below theirs. Our care plans start at ${ghs(essential.monthly)} a month against a recommended ${faciotech.care.replace(" recommended", "")}.`,
          "The point of publishing the comparison is not to win it in every column. It is that a price you can check is worth more than a price you cannot, and that the useful question is never the number alone. It is what the number includes.",
        ],
      },
      section(
        "The hidden costs nobody quotes",
        "A website has running costs, and a quote that does not mention them is not lying so much as leaving you to find out. Here is what sits outside most quotes.",
        "Hosting. Somewhere the site has to live. Cheap shared hosting is a few cedis a month and it is slow, it goes down, and when it is hacked the host is not responsible. Proper hosting for a small business site is included in our tiers and in every care plan, and it is one of the reasons our sites load in under a second.",
        "The domain. Your address on the internet, renewed yearly. A .com is typically in the low hundreds of cedis a year at the current exchange rate, and a .com.gh varies by registrar. It is small, but it must be in your name. A domain registered by your developer in their name is a site you do not own.",
        `Maintenance. Software has updates, and updates that are not applied become the way a site gets broken into. Backups have to exist before you need them. This is the cost that decides whether the site is still working in two years, and we have written [a full breakdown of what maintenance should cost](/blog/website-maintenance-cost-ghana) because nobody else publishes one. Our care plans run from ${ghs(essential.monthly)} to ${ghs(partner.monthly)} a month.`,
        "Content. Words, photographs and product details. Most quotes assume you will provide these. Most clients assume the developer will. The gap between those two assumptions is where launch dates go to die. Ask before signing.",
        "Payment gateway fees. If the site takes money, the gateway takes a percentage of every transaction, and it is set by the provider rather than by your developer. It is not part of the build price anywhere, and it is worth reading the provider's current Ghana pricing before you launch a store.",
      ),
      section(
        `What ${ghs(800)} gets you against what ${ghs(6000)} gets you`,
        `At ${ghs(800)}, which is the bottom of the published market, you get a template with your details in it, on shared hosting, usually built in a day or two. It will exist. It will have a contact form. It may or may not load quickly on a phone, and there will not be anybody to call when it stops working, because at that price there cannot be.`,
        "That is sometimes the right purchase. If you need a page that says who you are and how to reach you, and you will replace it within a year, spending more is waste. We say this on our own price list. The mistake is not buying cheap, it is buying cheap and expecting the expensive thing.",
        `At ${ghs(6000)}, the top of our Business tier, you get a layout designed around your visitor, content you can change yourself, the technical work that lets Google find and rank the pages, analytics set up so you can see what is happening, speed tuned so it loads fast on a mid range Android on a mobile connection, and thirty days of the person who built it answering questions. It is built to still be working, and still be found, in three years.`,
        "The honest way to choose between them is to ask what the site is for. If it is a business card, buy the card. If it is where customers decide whether to trust you, the difference between the two prices is smaller than one lost customer.",
      ),
      {
        heading: "Red flags when a quote is too cheap",
        paragraphs: [
          "Cheap is not a red flag by itself. These are.",
        ],
        bullets: [
          "The quote is a page count and nothing else. Nobody asked what the site is for, so nobody has priced the work, only the pages.",
          "No mention of who owns the domain, the hosting account or the code. Ask. If the answer is unclear, the answer is not you.",
          "No mention of what happens after launch. A site with nobody responsible for it after the invoice is paid is a site with a shelf life.",
          "The online store costs the same as the brochure site. It means the store is a brochure with a buy button, and the payment, stock and checkout work has not been priced because it will not be done.",
          "No live examples you can open on your phone. Screenshots can be anything. A URL that loads is proof.",
          "The person quoting is not the person building. It is the most common way a project goes wrong, and [we have written a checklist of the questions to ask](/blog/choose-technical-seo-development-partner) before choosing anyone.",
        ],
      },
    ],
    conclusion: `A website in Ghana costs ${range(starter)} for a small site, ${range(business)} for a business site and ${range(store)} for an online store, with custom builds from ${ghs(custom.from)}. The number is decided by page types, payments and integrations, not by page count. Every price of ours is [published with what it includes](/pricing), and the two questions that matter more than the price are who owns the site and who answers when it breaks.`,
    faqs: [
      faq("How much does it cost to design a website in Ghana?", `Between ${ghs(starter.from)} and ${ghs(custom.to)} for most businesses. A one to three page site is ${range(starter)}. A business site with a blog is ${range(business)}. An online store with Mobile Money and card payments is ${range(store)}. Anything with logins, bookings or dashboards is a custom build from ${ghs(custom.from)}, quoted after a scoping call.`),
      faq("How much should a website cost to develop?", "It depends on three things: how many distinct page types the site has, whether it takes payments, and what it connects to. Page count on its own is a poor guide, and a quote based purely on pages is usually a template with your logo on it. Ask what is included at each price and whether the person quoting will be the person building."),
      faq("How much does it cost to pay someone to design a website?", `Published agency prices in Ghana for a basic site run from roughly ${jobhouse.starter.replace("GHC", "GHS")} at the cheapest listed firm to ${range(starter)} for our Starter tier, which includes custom design, hosting, SSL and testing on real phones. The bottom of the market generally means a template, shared hosting and nobody to call after launch.`),
      faq("What is the cheapest way to get a website in Ghana?", `A template site from a low cost provider, from around ${faciotech.starter.split(" to ")[0]}, or a page builder you run yourself. Both are the right answer for some businesses. They are the wrong answer if the site is where customers decide whether to trust you, because a template looks like a template and shared hosting is slow on the phones most Ghanaians browse on.`),
      faq("Do I pay everything up front?", "No. Half to start and half at launch is the standard on our tiers. Custom builds are split into milestones agreed at scoping. Bank transfer, MTN MoMo and card are all accepted, and international clients can pay by transfer in USD or GBP."),
    ],
    sources: [
      { label: `${jobhouse.firm}: pricing packages`, href: jobhouse.href },
      { label: "Faciotech: how much does a website cost in Ghana", href: faciotech.href },
      { label: "Google: helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 6. Maintenance. Nobody owns this query and it sells the retainer.
     Primary: website maintenance cost ghana, website hosting cost ghana
     --------------------------------------------------------------------- */
  {
    slug: "website-maintenance-cost-ghana",
    cluster: CLUSTER,
    title: "Website maintenance cost in Ghana: what you should pay monthly",
    description: `Website maintenance in Ghana should cost ${ghs(essential.monthly)} to ${ghs(partner.monthly)} a month for a small business site. What that includes, what happens when nobody does it, and why one published guide recommends five times as much.`,
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "8 min read",
    lead: `Website maintenance in Ghana should cost between ${ghs(essential.monthly)} and ${ghs(partner.monthly)} a month for a small business site, and that should include hosting, SSL, security updates, backups and a person who answers. One widely read guide recommends ${faciotech.care.replace(" recommended", "")}. The gap is real and this post explains it. Our care plans are on the [price list](/pricing#care-plans), with what each one includes.`,
    heroImage: {
      src: "/work/cgt-experts.webp",
      alt: "Capital Gains Tax Experts calculator suite, a site maintained under a care plan",
      width: 1200,
      height: 750,
      caption: "Capital Gains Tax Experts. Nine calculators in a regulated domain, where an unapplied update is a wrong tax figure. [See the case study](/work/cgt-experts).",
      href: "/work/cgt-experts",
    },
    sections: [
      section(
        "What maintenance actually includes",
        "Maintenance is the work that keeps a website working after the person who built it has moved on to the next one. Most of it is invisible when it is done and expensive when it is not.",
        "Hosting and SSL. The server the site runs on and the certificate that puts the padlock in the browser. Certificates expire. When one does, every visitor sees a security warning instead of your site, and most of them leave.",
        "Security updates. Every website runs on software, and software has vulnerabilities found in it every week. Updates close them. A site nobody updates is a site that will eventually be broken into, not because anyone targeted it but because automated scanners find unpatched software by the thousand.",
        "Backups. A copy of the site and its data, taken on a schedule, stored somewhere other than the server it came from, and tested so it actually restores. A backup that has never been restored is a hope, not a backup.",
        "Monitoring. Something that notices the site is down before a customer tells you on WhatsApp. Uptime checks are cheap and they turn a weekend outage into a ten minute one.",
        "Small changes. A phone number that changed, a new team member, a price update, a broken link. The allowance for these is what stops every small edit becoming a new invoice or a two week wait.",
      ),
      {
        heading: "What it should cost",
        paragraphs: [
          "Our three care plans, monthly, with what each includes. They are read from the price list so they cannot differ from it.",
        ],
        table: {
          caption: "Manuel Technologies care plans, September 2026",
          headers: ["Plan", "Includes", "Monthly"],
          rows: CARE_PLANS.map((c) => [c.name, c.includes.join(". ") + ".", `${c.from ? "From " : ""}${ghs(c.monthly)}`]),
        },
      },
      section(
        `Why one guide says ${faciotech.care.replace(" recommended", "").replace(" a month", "")} a month`,
        `[Faciotech's cost guide](${faciotech.href}) recommends ${faciotech.care.replace(" recommended", "")} for hosting and maintenance. That figure is not wrong for what it describes, which is a WordPress site with a stack of plugins, each needing its own updates and compatibility checks, on hosting that has to be managed by hand. Maintaining that is genuinely a few hours a month of somebody's time.`,
        `The reason our Essential plan is ${ghs(essential.monthly)} rather than ${faciotech.care.replace(" recommended", "").replace(" a month", "")} is that the sites we build do not need that much maintaining. A site with no plugin stack, on hosting that patches itself, with a build that fails if something is broken, takes an hour a month to keep healthy rather than five. We would rather charge for the hour than for the five.`,
        "The honest caveat is that if you already have a WordPress site with thirty plugins, the higher figure may be what it costs to keep it alive. That is also an argument for not having one, which is [part of how we price a rebuild](/pricing).",
      ),
      section(
        "What happens when nobody does it",
        "The failure is never dramatic on day one. It is a certificate that expires on a Sunday. A form that quietly stops sending, discovered a month later when somebody asks why there have been no enquiries. A plugin update that was never applied, then a scanner that found it, then a page of pharmaceutical adverts where your homepage used to be, and your domain on a blocklist.",
        "The cost of a hacked site is not the cleanup, though that is real. It is the two weeks of visitors seeing a warning, the Google ranking that dropped and takes months to recover, and the customers who searched your name, saw the warning and went elsewhere without telling you.",
        `This is the post that answers the question every business owner with a dead site eventually asks, which is where the person who built it went. The answer is that they were never paid to stay. A care plan is what paying them to stay looks like, and at ${ghs(essential.monthly)} a month it is cheaper than one rebuild.`,
      ),
      {
        heading: "Questions to ask before paying anyone for maintenance",
        paragraphs: ["Whether it is us or anyone else."],
        bullets: [
          "What exactly is included, written down. A monthly fee with no list attached is a fee for nothing in particular.",
          "Who owns the hosting account and the domain. If the answer is the maintainer, you cannot leave without losing the site.",
          "When was the last backup taken, and when was one last restored. The second question is the one that matters.",
          "What happens if the site goes down at 9pm on a Saturday. A specific answer means there is a process. A vague one means there is not.",
          "Can I cancel, and what do I keep. The right answer is thirty days notice and you keep everything.",
          `How much does a full rebuild cost if this goes wrong. It anchors the maintenance fee against the alternative. [Our rebuild prices are published](/pricing), and we wrote up [what a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) so the comparison is easy to make.`,
        ],
      },
    ],
    conclusion: `Website maintenance in Ghana should cost ${ghs(essential.monthly)} to ${ghs(partner.monthly)} a month for a small business site, and it should include hosting, SSL, security updates, tested backups, monitoring and a person who answers. A higher fee is justified for a site that genuinely needs hours of work a month, and a lower one usually means something on that list is missing. Whoever you pay, make sure the domain and hosting are in your name and that you can leave with the site intact.`,
    faqs: [
      faq("How much does website maintenance cost in Ghana?", `${ghs(essential.monthly)} to ${ghs(partner.monthly)} a month for a small business site on our care plans, including hosting, SSL, security updates, weekly backups, uptime monitoring and an allowance of changes. Published guides recommend up to ${faciotech.care.replace(" recommended", "")}, which reflects the cost of maintaining a plugin heavy WordPress site by hand.`),
      faq("How much does website hosting cost in Ghana?", `Shared hosting is a few cedis a month and is slow and unreliable for a business site. Proper managed hosting for a small business site is included in every one of our care plans from ${ghs(essential.monthly)} a month, and in the build price for the first period after launch.`),
      faq("Do I really need website maintenance?", "If the site matters to the business, yes. Certificates expire, software needs patching, and backups have to exist before you need them. A site with nobody responsible for it after launch has a shelf life, and the cost of one hacked site is more than years of a care plan."),
      faq("What happens if I stop paying for maintenance?", "On our plans, thirty days notice and the site, its code, the domain and the hosting account stay yours. Ask anyone else the same question before signing, because the wrong answer is that you lose the site when you leave."),
      faq("Can I maintain my website myself?", "Content changes, yes, and our Business tier is built so you can. Security updates, backups and hosting are worth paying someone for unless you enjoy that kind of work, because the failure mode of getting them wrong is losing the site."),
    ],
    sources: [
      { label: "Faciotech: how much does a website cost in Ghana", href: faciotech.href },
      { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
    ],
    serviceHref: "/build/website-development",
  },
];
