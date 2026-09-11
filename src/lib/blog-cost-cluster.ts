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
    description: "A website in Ghana costs GHS 2,000 to 15,000 in 2026. What moves the price, what the market charges, the hidden costs, and when cheap is right.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "11 min read",
    lead: `A website in Ghana costs between ${ghs(starter.from)} and ${ghs(custom.to)} in 2026. A small site built around one action is ${range(starter)}. A business site with a blog is ${range(business)}. An online store with Mobile Money is ${range(store)}. Three things move the number: how many distinct page types there are, whether it takes payments, and what it has to connect to. Our full [price list is published](/pricing), with what each tier includes.`,
    heroImage: {
      src: "/work/miyaki-beauty.webp",
      alt: "Miyaki Beauty Ghana website, an example of the business tier",
      width: 1200,
      height: 750,
      caption: `Miyaki Beauty, a business site delivered in the ${range(business)} band. [See the case study](/work/miyaki-beauty).`,
      href: "/work/miyaki-beauty",
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
          src: "/work/impressiful.webp",
          alt: "Impressiful online store with a catalogue past a thousand products",
          width: 1200,
          height: 750,
          caption: `Impressiful, an online store delivered in the ${range(store)} band, with a catalogue past a thousand configurable products. [See the case study](/work/impressiful).`,
          href: "/work/impressiful",
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
      faq("Do I pay everything up front?", "You can, and some clients prefer to. The standard is 60% to start and 40% when the finished site is approved, with the site going live on your domain and every login handed over the day the balance clears. Custom builds are split into milestones agreed at scoping. Bank transfer, MTN MoMo and card are all accepted, and international clients can pay by transfer in USD or GBP."),
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
    metaTitle: "Website maintenance cost in Ghana, monthly",
    description: "Website maintenance in Ghana should cost GHS 299 to 499 a month including hosting, SSL, updates and backups. Why one guide says five times that.",
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

  /* ---------------------------------------------------------------------
     Post 2. Breakdown by type. Narrower and more table led than post 1.
     Primary: website development price in ghana, website development
     price in ghana cedis
     --------------------------------------------------------------------- */
  {
    slug: "website-development-price-in-ghana",
    cluster: CLUSTER,
    title: "Website development price in Ghana: a full breakdown by type",
    description: "Website development prices in Ghana by type, from GHS 2,000 starter sites to GHS 15,000 custom builds, with a real example at each level.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "9 min read",
    lead: `Website development in Ghana costs ${range(starter)} for a starter site, ${range(business)} for a business website, ${range(store)} for an online store and ${range(custom)} for a custom build, in cedis, from our [published price list](/pricing). This post takes each type in turn: what it is for, what is inside the price, a real site delivered at that level, and when it is the wrong choice.`,
    heroImage: {
      src: "/work/cgt-experts.webp",
      alt: "Capital Gains Tax Experts, a starter tier site built around one action",
      width: 1200,
      height: 750,
      caption: `Capital Gains Tax Experts, delivered at the Starter level, ${range(starter)}. A site built around one action, with nine calculators added over time. [See the case study](/work/cgt-experts).`,
      href: "/work/cgt-experts",
    },
    sections: [
      section(
        "How to read these prices",
        "Each type below has a price band rather than a single figure. The bottom of the band is the site with the fewest distinct page types, content ready on day one and no integrations beyond a contact form. The top is the same type with more page types, more revision rounds used, or a connection to another system. Nothing outside the band is quoted without a scoping call, which is stated on the price list.",
        "All prices are in Ghana cedis. Payment is 60% to start and 40% when the finished site is approved, and the site goes live on your domain when the balance clears. Copywriting, photography, the domain, logo design and payment gateway charges are not included at any level, and [the full list of exclusions is published](/pricing) so nothing arrives as a surprise.",
      ),
      {
        heading: `Starter site: ${range(starter)}`,
        paragraphs: [
          `${starter.summary} This is the right purchase when the site has one job: get someone to call, message or book. A clinic, a consultant, a tradesperson, a restaurant with one location.`,
          `Inside the price: ${starter.includes.join(", ").replace(/, ([^,]*)$/, " and $1").toLowerCase()}. ${starter.timeline}, ${starter.revisions.toLowerCase()}.`,
          "Worked example. A dental clinic in Kumasi needs a homepage, a services page and a contact page with WhatsApp and a map. Content is supplied. That is the bottom of the band. Add a fourth page for the team with photographs and a booking form connected to a calendar, and it moves toward the top.",
          "When it is the wrong choice: if you will need to add pages yourself every month, or the site has to sell anything. Both are Business tier problems and a Starter site stretched into them costs more in the end.",
        ],
      },
      {
        heading: `Business website: ${range(business)}`,
        paragraphs: [
          `${business.summary} The site for a company with more than one service, a team, and a reason to publish. It is the tier most Ghanaian businesses with an office actually need.`,
          `Inside the price: ${business.includes.join(", ").replace(/, ([^,]*)$/, " and $1").toLowerCase()}. ${business.timeline}, ${business.revisions.toLowerCase()}.`,
          "Worked example. A law firm in Accra with four practice areas, six lawyers and a wish to publish articles. Homepage, about, four practice pages on one template, a team page, a blog and contact. Seven page types, self editing, the technical work that gets the practice pages found for their terms. That is the middle of the band.",
          "The difference from a Starter site is not page count. It is that the owner can change things without calling anyone, and that Google can find and rank the pages because the sitemap, canonical tags and schema were built in rather than bolted on.",
        ],
        image: {
          src: "/work/miyaki-beauty.webp",
          alt: "Miyaki Beauty Ghana, a business tier website",
          width: 1200,
          height: 750,
          caption: `Miyaki Beauty, delivered at the Business level, ${range(business)}. [See the case study](/work/miyaki-beauty).`,
          href: "/work/miyaki-beauty",
        },
      },
      {
        heading: `Online store: ${range(store)}`,
        paragraphs: [
          `${store.summary} A store is priced above a business site with the same page count because the expensive work is invisible: what happens when a payment fails halfway, when two people buy the last item at once, when an order lands at midnight.`,
          `Inside the price: ${store.includes.join(", ").replace(/, ([^,]*)$/, " and $1").toLowerCase()}. ${store.timeline}, ${store.revisions.toLowerCase()}.`,
          "Worked example. A fashion retailer with 80 products in three sizes and four colours, selling across Accra with two delivery zones and nationwide by courier. Catalogue with variants and stock, MoMo and card checkout, WhatsApp order alerts, delivery pricing by zone. That is the middle of the band. A catalogue past a few hundred products with supplier feeds moves to the top.",
          `We have written separately about [what an online store really costs](/blog/ecommerce-website-price-ghana), including the gateway fees and Mobile Money setup that no price list includes.`,
        ],
        image: {
          src: "/work/impressiful.webp",
          alt: "Impressiful online store with a catalogue past a thousand products",
          width: 1200,
          height: 750,
          caption: `Impressiful, delivered at the Online store level, ${range(store)}, with a catalogue past a thousand configurable products. [See the case study](/work/impressiful).`,
          href: "/work/impressiful",
        },
      },
      {
        heading: `Custom build: ${range(custom)}`,
        paragraphs: [
          `${custom.summary} Anything where users log in, data is stored per person, or the site has to talk to another system. The price is a typical range and every custom build is quoted after a scoping call, because the range is wide and a number given before scoping is a guess dressed as a price.`,
          `Inside the price: ${custom.includes.join(", ").replace(/, ([^,]*)$/, " and $1").toLowerCase()}. ${custom.timeline.toLowerCase()}.`,
          "Worked example. A church management application: members, Bible classes, attendance and giving, with roles for administrators and class leaders, a statistical return generated from the data, and Mobile Money for giving. Database design, accounts and permissions, reporting, a payment integration, testing and handover. That is Fold, below, and it sits at the top of the band.",
          "When it is the wrong choice: when an existing product does 90% of the job. A custom build you did not need is the most expensive website there is.",
        ],
        image: {
          src: "/work/getfold.webp",
          alt: "Fold, church management web app and PWA built for Ghanaian congregations",
          width: 1200,
          height: 750,
          caption: `Fold, a church management PWA at getfold.org, delivered at the Custom level. [Open the live product](https://www.getfold.org).`,
        },
      },
      {
        heading: "Care plans, monthly",
        paragraphs: ["Every site above needs hosting, updates and backups after launch. The care plans are priced separately so you can see exactly what the recurring cost is before you commit to the build."],
        table: {
          caption: "Care plans, monthly, in cedis",
          headers: ["Plan", "Includes", "Monthly"],
          rows: CARE_PLANS.map((c) => [c.name, c.includes.join(". ") + ".", `${c.from ? "From " : ""}${ghs(c.monthly)}`]),
        },
      },
    ],
    conclusion: `Website development in Ghana costs ${range(starter)} for a starter site, ${range(business)} for a business site, ${range(store)} for a store and ${range(custom)} for a custom build. Choose the type by what the site has to do, not by how many pages you think you need. [The full price list](/pricing) has every inclusion written out, and [the flagship guide to website cost](/blog/how-much-does-a-website-cost-in-ghana) explains what moves a price within its band.`,
    faqs: [
      faq("What is the website development price in Ghana in cedis?", `${range(starter)} for a starter site, ${range(business)} for a business website, ${range(store)} for an online store and ${range(custom)} for a custom build. Care plans run ${ghs(essential.monthly)} to ${ghs(partner.monthly)} a month.`),
      faq("Why is an online store more expensive than a business site with the same pages?", "Because the expensive work in a store is invisible. Payment failure handling, stock that updates when something sells, order alerts, delivery pricing and checkout testing are engineering, and none of it shows up as a page."),
      faq("Do you charge per page?", "No. Prices are by type, and within a type the band moves with the number of distinct page types, not the page count. Twenty pages on one template cost far less than five pages that are each different."),
      faq("What does a custom build cost in Ghana?", `${range(custom)} as a typical range, quoted after a scoping call. The range is wide because custom means the requirements are yours, and a price given before understanding them is a guess.`),
    ],
    sources: [
      { label: "Manuel Technologies: published price list", href: "https://manueltechnologies.com/pricing" },
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 3. Ecommerce. The JobHouse argument, MoMo and gateway fees.
     Primary: e-commerce website price in ghana
     --------------------------------------------------------------------- */
  {
    slug: "ecommerce-website-price-ghana",
    cluster: CLUSTER,
    title: "E-commerce website price in Ghana: what an online store really costs",
    metaTitle: "E-commerce website price in Ghana: the real cost",
    description: "An online store in Ghana costs GHS 6,000 to 9,000 built properly, plus about 2% per sale in gateway fees. Why a store priced as a brochure is one.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "10 min read",
    lead: `An e-commerce website in Ghana costs ${range(store)} to build properly, from our [published price list](/pricing#store), plus a payment gateway fee on every sale of roughly 2% for Mobile Money and local cards. One widely quoted agency lists an online store at ${jobhouse.store}, which is the same price as their NGO site. This post explains why that number cannot include the work that makes a store a store, and lists the running costs that no price list mentions.`,
    heroImage: {
      src: "/work/impressiful.webp",
      alt: "Impressiful online store, catalogue and checkout",
      width: 1200,
      height: 750,
      caption: "Impressiful. A catalogue past a thousand configurable products, built to survive checkout failure and stock collisions. [See the case study](/work/impressiful).",
      href: "/work/impressiful",
    },
    sections: [
      section(
        "A store is not a brochure with a buy button",
        `[${jobhouse.firm}](${jobhouse.href}) publishes an online store at ${jobhouse.store} and an NGO website at the same price. That is not an accusation, it is a published fact, and it is useful because it shows exactly what the bottom of the market means by a store: a brochure site with a product page template and a payment button.`,
        "The things that make a store a store are the things that go wrong. A customer pays and the connection drops before the order is recorded. Two people buy the last unit in the same minute. An order lands at 2am and nobody is told until Monday. A delivery to Tamale is charged at the Accra rate. A customer pays by MoMo, the payment is pending, and the site shows it as failed. Every one of those is a place money leaves the business, and handling them is engineering, not design.",
        "That engineering is what the difference between a brochure price and a store price pays for. A store quoted at a brochure price has not priced it because it will not do it, and you find out on the first busy Saturday.",
      ),
      {
        heading: `What ${range(store)} includes`,
        paragraphs: [
          "Everything in the Business tier, plus the parts that make it a store. Written out, because a store price without an inclusions list is the first warning sign.",
        ],
        bullets: store.includes.map((x) => x + "."),
        image: {
          src: "/work/miyaki-beauty.webp",
          alt: "Miyaki Beauty Ghana, a beauty brand website",
          width: 1200,
          height: 750,
          caption: "Miyaki Beauty. A beauty brand with an Instagram audience and a site of its own. [See the case study](/work/miyaki-beauty).",
          href: "/work/miyaki-beauty",
        },
      },
      {
        heading: "The running costs no price list mentions",
        paragraphs: [
          "The build price is the smaller number. A store has costs on every sale and every month, and they are set by other companies, not by whoever builds the site. These are the ones that matter, with the published figures where a provider publishes them.",
        ],
        table: {
          caption: "Payment gateway fees published for Ghana, checked 11 September 2026",
          headers: ["Provider", "Mobile Money", "Local cards", "International cards", "Settlement"],
          rows: [
            ["[Paystack](https://support.paystack.com/en/articles/2130306)", "1.95%", "1.95%", "Not listed on the Ghana row", "Not stated on that page"],
            ["[Flutterwave](https://flutterwave.com/gh/pricing)", "2%", "2.6%", "4.8%", "Next day for local payments"],
            ["Hubtel", "No public rate card", "No public rate card", "No public rate card", "Pricing page asks for a phone number before showing fees"],
          ],
        },
      },
      section(
        "What those percentages mean in cedis",
        "On a GHS 300 order paid by MoMo, the gateway keeps roughly GHS 6. On GHS 50,000 of monthly sales, that is about GHS 1,000 a month going to the gateway before anything else. It is a normal cost of taking payments online, and it is larger than the care plan for the site itself, which is why it belongs in the decision before the build and not after.",
        "Flutterwave's pricing page states that by default the customer bears the transaction charge and that prices exclude VAT. Whether you pass the fee on or absorb it is a business decision. The site has to be built to do whichever you choose, and switching later is a change, not a setting.",
        "Merchant onboarding is a cost in time rather than money. Hubtel, for example, assigns an account manager within a working day and can ask for a business registration document, a business operating permit and a district assembly licence. Have those ready before the store is finished, because a finished store that cannot take money is a brochure.",
      ),
      section(
        "Mobile Money specifically",
        "MTN MoMo and Telecel Cash are not optional in Ghana. A store that only takes cards is a store that turns away most of its customers. Every gateway above supports them, and the integration is the same work regardless of provider: a payment is requested, the customer approves it on their phone, the gateway tells the site whether it succeeded, and the site has to handle all three outcomes, which are success, failure, and the one that catches people out, which is pending.",
        "Pending is the case where the customer has approved but the network has not confirmed. A store that treats pending as failed loses the sale and the customer. A store that treats it as paid ships an unpaid order. Handling it correctly means the site waits, checks, and tells the customer honestly what is happening. That is inside our Online store tier and it is not inside a brochure price.",
        `We have written a separate technical guide to [accepting MTN MoMo and Telecel Cash on a website](/blog/momo-payment-integration-website-ghana) for anyone with a live project.`,
      ),
      section(
        "When a cheap store is the right call",
        "If you sell a handful of items, take orders on WhatsApp and want a catalogue people can browse, you may not need a store at all. A Business site with a product catalogue and a WhatsApp order button is cheaper and it is honest about what it is. A store is worth its price when the volume is high enough that a human cannot take every order, or when the business is the store.",
        `[The full price list](/pricing) has both options with what each includes, and [how much a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) covers the general case.`,
      ),
    ],
    conclusion: `An e-commerce website in Ghana costs ${range(store)} to build properly, plus roughly 2% of every sale to the payment gateway and a monthly care plan. A store priced at a brochure price is a brochure with a buy button, and the difference shows up as lost orders rather than as a line on an invoice. Get the gateway paperwork moving before the build finishes.`,
    faqs: [
      faq("How much does an e-commerce website cost in Ghana?", `${range(store)} for a properly built store with a catalogue, stock tracking, MTN MoMo and Telecel Cash alongside card payments, checkout failure handling, order alerts and delivery zones. Published market prices run from ${jobhouse.store.replace("GHC", "GHS")} at the cheapest listed firm to ${faciotech.store} in one published guide.`),
      faq("What are the payment gateway fees in Ghana?", "Paystack publishes 1.95% for local cards, mobile money and bank transfer in Ghana. Flutterwave publishes 2% for mobile money, 2.6% for local cards and 4.8% for international cards, with next day settlement for local payments. Hubtel does not publish a rate card. Fees are set by the provider and change, so check the provider's own page before launch."),
      faq("Can my online store accept MTN MoMo?", "Yes, and it should. Every major gateway operating in Ghana supports MTN MoMo and Telecel Cash. The work is in handling the pending state correctly, where the customer has approved but the network has not confirmed, so that the store neither loses the sale nor ships an unpaid order."),
      faq("Why is an online store the same price as a normal website at some agencies?", "Because at that price it is a normal website with a product template and a payment button. The work that makes a store a store, which is payment failure handling, stock updates, order alerts and delivery logic, has not been priced because it will not be done."),
      faq("Do I need an online store or just a catalogue?", "If a person can take every order on WhatsApp, a catalogue with an order button is cheaper and honest. A store earns its price when orders outrun a human, or when the store is the business."),
    ],
    sources: [
      { label: "Paystack: pricing by country", href: "https://support.paystack.com/en/articles/2130306" },
      { label: "Flutterwave: Ghana pricing", href: "https://flutterwave.com/gh/pricing" },
      { label: `${jobhouse.firm}: pricing packages`, href: jobhouse.href },
      { label: "Faciotech: how much does a website cost in Ghana", href: faciotech.href },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 4. One page site. Straight PAA capture, converts to Starter.
     Primary: how much does a 1 page website cost
     --------------------------------------------------------------------- */
  {
    slug: "one-page-website-cost-ghana",
    cluster: CLUSTER,
    title: "How much does a one page website cost in Ghana?",
    description: "A one page website in Ghana costs GHS 2,000 to 3,500 built properly, or a few hundred cedis as a template. When one page is exactly right.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "5 min read",
    lead: `A one page website in Ghana costs ${range(starter)} built to order, which is our [Starter tier](/pricing#starter), and from around ${faciotech.starter.split(" to ")[0]} as a template at the bottom of the published market. One page is the right purchase more often than agencies admit, and this post says when.`,
    heroImage: {
      src: "/work/cgt-experts.webp",
      alt: "Capital Gains Tax Experts, a site that began as a single focused page",
      width: 1200,
      height: 750,
      caption: "Capital Gains Tax Experts began as one focused page and grew a calculator at a time. [See the case study](/work/cgt-experts).",
      href: "/work/cgt-experts",
    },
    sections: [
      section(
        "What a one page site is for",
        "One job. A visitor arrives, understands what you do in a few seconds, and does the one thing you want: calls, messages on WhatsApp, books, or fills in a form. Everything on the page exists to move them toward that action. Nothing on the page exists because a template had a slot for it.",
        "That describes most consultants, most tradespeople, most clinics and most restaurants with one location. It also describes any business launching something and needing a place to send people before the full site exists.",
      ),
      section(
        `What ${range(starter)} buys`,
        `Our Starter tier is one to three pages, so a single page sits at the bottom of the band. It includes ${starter.includes.slice(0, 5).join(", ").toLowerCase()}, ${starter.includes.slice(5).join(" and ").toLowerCase()}. ${starter.timeline}.`,
        "The two things that matter most on a single page are that it loads fast on a mid range phone, because that is where the visitor is, and that the action is impossible to miss. A page that does both, with a WhatsApp button that works, outperforms a ten page site that does neither.",
      ),
      section(
        "When one page is the wrong choice",
        "When you have more than one audience. A clinic that serves patients and recruits doctors needs two pages, because the two visitors want different things and a single page serving both serves neither.",
        "When you need to be found for more than one search. One page ranks for one thing. A firm with four services that wants to be found for each of them needs a page for each, and that is the Business tier.",
        `When you will need to change it often. A Starter site is built to be finished. If you expect to add pages every month, buy the tier where you edit it yourself. The [breakdown by website type](/blog/website-development-price-in-ghana) explains where the line falls.`,
      ),
      section(
        "The template alternative, honestly",
        `A template one pager from the bottom of the market, at ${faciotech.starter.split(" to ")[0]} or so, exists and works. It will look like the template. It will be on shared hosting. There will not be anyone to call. If the page is a placeholder you will replace within a year, that is fine and you should buy it. If it is where customers decide whether to trust you, [the difference in price](/blog/how-much-does-a-website-cost-in-ghana) is smaller than one lost customer.`,
      ),
    ],
    conclusion: `A one page website in Ghana costs ${range(starter)} built properly, and it is the right purchase whenever the site has exactly one job. [Our Starter tier](/pricing) is priced for it. Buy more pages when you have more audiences or more searches to be found for, not before.`,
    faqs: [
      faq("How much does a one page website cost?", `${range(starter)} built to order in Ghana, with custom design, hosting, SSL, a contact form, a WhatsApp button and testing on real phones. Template one pagers from the bottom of the market start around ${faciotech.starter.split(" to ")[0]}.`),
      faq("Is a one page website good for SEO?", "For one search, yes. A single page can rank well for the one thing it is about. It cannot rank for four different services, because Google ranks pages, not sites. If you need to be found for several things, you need several pages."),
      faq("How long does a one page website take?", `${starter.timeline} on our Starter tier, assuming the content is ready. Content arriving late is the most common cause of delay on every tier.`),
      faq("Can a one page website take payments?", "It can take a single payment, such as a deposit or a booking fee, through a payment link or a simple form. It cannot be a store. A catalogue with stock and checkout is the Online store tier."),
    ],
    sources: [
      { label: "Manuel Technologies: published price list", href: "https://manueltechnologies.com/pricing" },
      { label: "Faciotech: how much does a website cost in Ghana", href: faciotech.href },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 5. 20 pages. Answer, then reframe. Sets up programmatic SEO.
     Primary: how much is a 20 page website
     --------------------------------------------------------------------- */
  {
    slug: "how-much-is-a-20-page-website",
    cluster: CLUSTER,
    title: "How much is a 20 page website? Why page count is the wrong question",
    metaTitle: "How much is a 20 page website? The wrong question",
    description: "A 20 page site costs from GHS 6,000 when pages share a template, more when each is distinct. Then the better question: what are the pages for?",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "7 min read",
    lead: `A 20 page website in Ghana costs from around ${ghs(business.to)}, the top of our [Business tier](/pricing#business), when most of the twenty share a template, and is quoted after scoping when each page is genuinely different. That is the direct answer. The better answer is that twenty thin pages are worth less than six good ones, Google says so in its own guidance, and the useful question is what each page is for.`,
    heroImage: {
      src: "/work/dementia-in-home.webp",
      alt: "Dementia In Home, a site with over a thousand pages each carrying its own data",
      width: 1200,
      height: 750,
      caption: "Dementia In Home. Over a thousand pages, and every one carries data specific to its city. Page count works when each page earns its place. [See the case study](/work/dementia-in-home).",
      href: "/work/dementia-in-home",
    },
    sections: [
      section(
        "The honest answer first",
        `Twenty pages built on two or three templates, such as a homepage, a services template used fifteen times and a handful of standard pages, sits at the top of our Business tier or just above it, and ${ghs(business.to)} is the figure to plan around. The template is built once and filled twenty times, so the twentieth page costs a fraction of the first.`,
        `Twenty pages that are each genuinely different, with their own layout and their own content structure, are a custom build and are quoted after scoping, because the work is twenty designs rather than one. [The price list](/pricing) explains how the tiers are drawn.`,
        "Any quote that gives you a single firm price for twenty pages without asking which of those two cases you are in has priced the pages and not the work.",
      ),
      section(
        "Why page count is the wrong question",
        "Google does not rank websites. It ranks pages. Each page competes on its own for the searches it is about, and a page that is thin, generic or duplicated across the site does not merely fail to rank, it can pull the rest of the site down with it. Google's own guidance on scaled content is explicit that many pages generated to fill a count rather than to serve a reader is a problem, not a strategy.",
        "So twenty pages where fourteen say almost the same thing about a slightly different service are worth less than six pages that each answer one question completely. They cost more to build, more to maintain, and they dilute the site's signal rather than strengthening it.",
        "The question to ask instead is: what would a person searching for each of these pages want, and do I have something specific to say to them? If the answer is yes twenty times, build twenty. If it is yes six times, build six and spend the difference making them excellent.",
      ),
      section(
        "When many pages is exactly right",
        "The screenshot at the top of this post is a site with over a thousand pages. It works because every page carries data that is specific to its city: real figures a reader in that place cannot get from the page for the city next door. That is programmatic SEO done properly, and it is the opposite of twenty thin service pages.",
        "The rule we use is three unique sentences minimum per page, differentiated on data rather than adjectives, or the page is not generated. A city page that only swaps the city name is not a page, it is a duplicate with a different address.",
        `If your business genuinely has fifty locations, or a thousand products, or a catalogue of anything with real differences between the items, then many pages is right and it is a different service from a twenty page brochure site. It is [programmatic SEO](/grow/programmatic-seo), it is priced differently, and we have written about [how to do it without creating thin content](/blog/programmatic-seo-without-thin-content).`,
      ),
      section(
        "How to decide how many pages you need",
        "List the searches you want to be found for. Not the pages you think a website should have, the searches. For each one, write the first sentence of what that page would say to the person searching. If two searches produce the same first sentence, they are one page. If a search produces no sentence, it is not a page yet.",
        `The list you end up with is the number of pages you need. For most businesses it is between four and eight, which is why our Business tier is drawn where it is. [The full guide to what a website costs](/blog/how-much-does-a-website-cost-in-ghana) goes into what moves the price within a tier.`,
      ),
    ],
    conclusion: `A 20 page website costs from around ${ghs(business.to)} when the pages share templates and is a custom quote when they do not. But the count is the wrong question. Build a page for every search you have something specific to say to, and no page for anything else. Six excellent pages beat twenty thin ones, and a thousand data driven pages beat both when the data is real.`,
    faqs: [
      faq("How much does a 20 page website cost?", `From around ${ghs(business.to)} in Ghana when most pages share a template, which is the top of our Business tier. Twenty genuinely distinct pages are a custom build quoted after scoping. A single firm price for twenty pages without that question being asked is a price for pages rather than for work.`),
      faq("Is it better to have more pages on a website?", "Only if each page has something specific to say to the person who would search for it. Google ranks pages individually, and thin or duplicated pages can weaken the whole site. Six complete pages outperform twenty thin ones."),
      faq("How many pages should a small business website have?", "Usually four to eight. List the searches you want to be found for, write the first sentence each page would say, and merge any that say the same thing. The pages that remain are the pages you need."),
      faq("What about a site with hundreds of location pages?", "That is programmatic SEO and it works when every page carries real data specific to its location. It fails when the pages only swap the place name. It is a different service from a brochure site and priced differently."),
    ],
    sources: [
      { label: "Google: spam policies, scaled content abuse", href: "https://developers.google.com/search/docs/essentials/spam-policies#scaled-content-abuse" },
      { label: "Google: helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ],
    serviceHref: "/grow/programmatic-seo",
  },

  /* ---------------------------------------------------------------------
     Post 7. Cheap. Fair rather than sneering.
     Primary: cheap website design ghana, affordable web design ghana
     --------------------------------------------------------------------- */
  {
    slug: "cheap-website-design-ghana",
    cluster: CLUSTER,
    title: `Cheap website design in Ghana: what ${ghs(500)} actually gets you`,
    metaTitle: "Cheap website design in Ghana: what GHS 500 gets you",
    description: "Cheap website design in Ghana runs from about GHS 500. What it buys, when it is the right call, what breaks, and what a rebuild costs later.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "8 min read",
    lead: `Cheap website design in Ghana costs from about ${ghs(500)} for a template with your details in it to ${faciotech.starter.split(" to ")[1]} at the top of the published starter market. Our own [Starter tier](/pricing#starter) is ${range(starter)}, so we are not the cheap option and this post is not going to pretend cheap is always wrong. Sometimes it is exactly right. It explains what you get, what you do not, and what it costs when it goes wrong.`,
    heroImage: {
      src: "/work/cangaf.webp",
      alt: "Cangaf Ltd website, built to a fixed performance budget",
      width: 1200,
      height: 750,
      caption: "Cangaf Ltd. Built to a performance budget rather than to a template, which is most of the difference cheap and not cheap. [See the case study](/work/cangaf).",
      href: "/work/cangaf",
    },
    sections: [
      section(
        `What ${ghs(500)} buys`,
        "A template, chosen from a library, with your logo, your colours and your text placed into its slots. Shared hosting, meaning your site is on a server with hundreds of others and shares their traffic and their problems. A contact form. Usually a domain for the first year. Built in a day or two by someone who will build several more that week.",
        "It will exist, it will have your phone number on it, and for some businesses that is the whole job. It is a genuine product and it is dishonest to pretend otherwise.",
      ),
      section(
        "When cheap is the right call",
        "When the site is a placeholder. You are launching, you need somewhere to send people, and you will replace it in a year when you know what the business is. Spend as little as possible.",
        "When the site is a business card. A tradesperson whose work comes by referral, who needs to be findable by name and have a number on a page. The site is not where customers decide. Spend as little as possible.",
        `When the alternative is nothing. A cheap site that exists beats an expensive site that is still being planned. Buy the cheap one, and read [what a website costs](/blog/how-much-does-a-website-cost-in-ghana) when you are ready for the next one.`,
      ),
      section(
        "What breaks, and when",
        "Speed, first. Templates carry code for every feature the template supports, whether you use it or not, and shared hosting responds slowly under load. On a mid range Android on a mobile connection, which is where most of your visitors are, a template site on shared hosting commonly takes several seconds to show anything. Visitors leave. Google measures this and ranks accordingly.",
        "Security, second. Templates run on software that needs updating, usually WordPress with a stack of plugins, and at the cheap price nobody is paid to update it. Automated scanners find unpatched software by the thousand. The site is eventually broken into, not because anyone targeted it but because it was there.",
        "Ownership, third. At the cheap end it is common for the domain and the hosting to be registered by the developer. When you want to move, or they stop trading, the site is not yours to take. Always ask whose name the domain is in.",
        `Support, last. There is no support at ${ghs(500)}, because there cannot be. When the form stops sending, you find out from a customer, and the person who built it has built two hundred since. [What maintenance should cost](/blog/website-maintenance-cost-ghana) explains what you are not getting.`,
      ),
      section(
        "What it costs to rebuild later",
        `A cheap site that has to be replaced costs the cheap price plus the rebuild price plus whatever the cheap site cost the business while it was slow, hacked or down. If the rebuild is a ${range(starter)} Starter site, the cheap site was a ${ghs(500)} deposit on a ${ghs(starter.from)} purchase, and the year in between was the expensive part.`,
        "That is the honest arithmetic. It does not say never buy cheap. It says buy cheap when the site is a placeholder or a business card, and buy properly when the site is where customers decide whether to trust you.",
      ),
      section(
        "How to buy cheap without getting burned",
        "If cheap is the right call, three questions protect you. Whose name will the domain be in. Can I have the login to the hosting. What happens if I want to move it. The answers you want are yours, yes, and you take everything with you. A cheap site with those three answers is a fair purchase. A cheap site without them is a rental.",
        `[Our price list](/pricing) is not the cheap option, and it says so. It is the option for when the site has to still be working, and still be found, in three years.`,
      ),
    ],
    conclusion: `Cheap website design in Ghana, from about ${ghs(500)}, buys a template on shared hosting with no support, and that is exactly right for a placeholder or a business card. It is wrong for a site customers judge you by, because what breaks is speed, security and ownership, and the rebuild costs more than buying properly once. Whichever you buy, make sure the domain is in your name.`,
    faqs: [
      faq("How much is a cheap website in Ghana?", `From about ${ghs(500)} for a template with your details, to ${faciotech.starter.split(" to ")[1]} at the top of the published starter market. Our Starter tier is ${range(starter)} and is not the cheap option.`),
      faq("Is a cheap website worth it?", "Yes when the site is a placeholder or a business card and you will replace it or never rely on it. No when customers decide whether to trust you from it, because speed, security and support are what the low price leaves out."),
      faq("What is the difference between a cheap website and an expensive one?", "Custom design rather than a template, hosting that is fast and patched rather than shared, testing on real phones, technical work that lets Google find the pages, and someone who answers after launch. The pages may look similar in a screenshot. They behave very differently on a phone in Kumasi."),
      faq("Can I upgrade a cheap website later?", "Usually not. A template site is rebuilt rather than upgraded, so the cheap price is a deposit rather than a first instalment. Buy it knowing that."),
    ],
    sources: [
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
      { label: "Faciotech: how much does a website cost in Ghana", href: faciotech.href },
    ],
    serviceHref: "/build/website-development",
  },

  /* ---------------------------------------------------------------------
     Post 8. Design vs development. Definitional, explains 5x quotes.
     Primary: difference between web design and web development
     --------------------------------------------------------------------- */
  {
    slug: "website-design-vs-website-development",
    cluster: CLUSTER,
    title: "Website design vs website development: what you are paying for",
    metaTitle: "Web design vs web development: what you pay for",
    description: "Design decides what a visitor sees and does. Development builds it to load, rank and keep working. Why two quotes can differ five times over.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "6 min read",
    lead: `Web design decides what a visitor sees and does. Web development builds it so that it loads fast, can be found, takes payments and keeps working. Two quotes for the same site can differ by five times because one includes both and the other includes a template and a logo. On our [price list](/pricing), every tier includes both, and this post explains what each half is so you can see which half a quote is missing.`,
    heroImage: {
      src: "/work/miyaki-beauty.webp",
      alt: "Miyaki Beauty Ghana, design and development delivered together",
      width: 1200,
      height: 750,
      caption: "Miyaki Beauty. The design is what you see. The development is why it loads in under a second on a phone. [See the case study](/work/miyaki-beauty).",
      href: "/work/miyaki-beauty",
    },
    sections: [
      section(
        "What web design is",
        "Design is every decision about what a visitor sees and what they do. Where the action button sits. How the services are grouped. What the visitor reads first. How the page looks at 360 pixels wide on a phone, which is where most Ghanaian visitors are. Whether the site looks like your business or like a template.",
        "Good design is mostly invisible. A visitor does not notice that the button was placed where their thumb already was. They notice when it was not.",
      ),
      section(
        "What web development is",
        "Development is building what the design describes so that it actually works. Code that loads fast on a slow connection. A sitemap, canonical tags and structured data so Google can find and understand the pages. A contact form that reaches your inbox and filters spam. A checkout that handles a payment failing halfway. Hosting that stays up. Testing on real devices.",
        "Good development is also invisible, until it is missing. Then the site is slow, cannot be found, and the form stopped working in March.",
      ),
      section(
        "Why quotes differ five times over",
        `The bottom of the market sells design only, and a thin version of it: a template chosen from a library, your logo and colours placed in. There is almost no development, because the template's code is what it is and the hosting is shared. That is what ${faciotech.starter.split(" to ")[0]} or ${jobhouse.starter.split(" to ")[0].replace("GHC", "GHS")} buys, and it is why those numbers exist.`,
        `The other quote includes a custom design and the development that makes it perform: speed tuned against Core Web Vitals, the technical SEO foundations, the form and the hosting, and testing from 320 pixels up. That is what our [Business tier at ${range(business)}](/pricing#business) is, and the difference in price is the development half.`,
        "Neither quote is dishonest. They are quotes for different things that happen to both be called a website. The mistake is comparing them as if they were the same product.",
      ),
      section(
        "How to tell which half a quote includes",
        "Ask three questions. Will the design be built for my business or chosen from a library. What will the site score on Google's page speed test on a phone. Who sets up the sitemap, Search Console and structured data. A quote that includes development can answer all three specifically. A quote that does not will answer with adjectives.",
        `[Choosing a web design company](/blog/how-to-choose-web-design-company-ghana) has the full list of questions, and [what a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) puts the numbers to each answer.`,
      ),
    ],
    conclusion: "Web design is what the visitor sees and does. Web development is why it works, loads and can be found. A quote five times cheaper than another is usually a quote for design only, and a thin version of it. Every tier on our price list includes both, and any quote you compare against it should be checked for which half is missing.",
    faqs: [
      faq("What is the difference between web design and web development?", "Design is deciding what a visitor sees and does: layout, hierarchy, the action, how it works on a phone. Development is building it so it loads fast, can be found by Google, takes payments correctly and keeps working. A finished website needs both."),
      faq("Do I need a web designer or a web developer?", "Both, and ideally the same firm doing both so nothing falls between them. A design nobody can build well is a drawing. A build with no design is a template. Our tiers include both because separating them is how projects go wrong."),
      faq("Why is one website quote so much cheaper than another?", "Usually because the cheap one is a template with your logo in it and almost no development, while the other includes custom design plus the engineering that makes it fast, findable and reliable. They are different products with the same name."),
      faq("Is web development more expensive than web design?", "For a small business site the two halves are roughly comparable. For a store or a custom build, development dominates, because payments, stock, accounts and integrations are engineering rather than design."),
    ],
    sources: [
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "Google: structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
    ],
    serviceHref: "/build/web-design",
  },
];
