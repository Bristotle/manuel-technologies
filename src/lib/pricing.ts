/* Pricing. The single source for every number on /pricing and in the cost
   cluster. A price that appears in a blog post is read from here, never
   typed into the post, so the cluster cannot drift from the price list.

   CURRENCY. Prices are set in Ghana cedis. The USD and GBP figures on the
   page are conversions at a pinned mid-market rate, shown to international
   visitors as a guide and labelled as such. They are not a second price
   list. Update RATES and its date together; the date renders on the page.

   MARKET COMPARISON. Every competitor figure was fetched from the named
   page on the date recorded. Nothing here is remembered, estimated, or
   taken from a third party summary. If a figure cannot be fetched directly
   it does not go in the table, which is why there are two rows and not five.
   CLAUDE.md section 9 applies: never take a factual claim on trust. */

export const RATES = {
  checked: "2026-09-11",
  source: { label: "Wise mid-market rate", href: "https://wise.com/gb/currency-converter/ghs-to-usd-rate" },
  /* GHS per unit of foreign currency */
  USD: 11.3,
  GBP: 15.5,
} as const;

export type Currency = "GHS" | "USD" | "GBP";
export const CURRENCIES: Currency[] = ["GHS", "USD", "GBP"];

export type Tier = {
  slug: string;
  name: string;
  summary: string;
  from: number;
  to: number;
  quoted?: boolean;
  timeline: string;
  revisions: string;
  includes: string[];
  /* Real work delivered at this tier. Required: CLAUDE.md section 4.
     href is a case study where one exists, otherwise the live site. */
  proof: { src: string; alt: string; client: string; href: string };
};

export const TIERS: Tier[] = [
  {
    slug: "starter",
    name: "Starter site",
    summary: "One to three pages built around one clear action.",
    from: 2000,
    to: 3500,
    timeline: "5 to 7 days",
    revisions: "2 revision rounds",
    includes: [
      "Custom layout in your brand colours, not a stock template",
      "Contact form to your inbox with spam filtering",
      "WhatsApp chat button",
      "Google Business Profile connected",
      "Free SSL and fast hosting",
      "Hand written page titles and descriptions",
      "Tested on real phones from 320px",
    ],
    proof: {
      src: "/work/cgt-experts.webp",
      alt: "Capital Gains Tax Experts website, built by Manuel Technologies",
      client: "Capital Gains Tax Experts",
      href: "/work/cgt-experts",
    },
  },
  {
    slug: "business",
    name: "Business website",
    summary: "Five to eight pages plus a blog, on a consistent design system.",
    from: 4500,
    to: 6000,
    timeline: "2 to 3 weeks",
    revisions: "3 revision rounds",
    includes: [
      "Content you edit yourself, so a typo never costs you a call out",
      "Technical SEO foundations: sitemap, canonical tags, business schema",
      "Google Analytics and Search Console set up and verified",
      "Speed tuned against Core Web Vitals",
      "30 days of support after launch",
    ],
    proof: {
      src: "/work/miyaki-beauty.webp",
      alt: "Miyaki Beauty Ghana business website, built by Manuel Technologies",
      client: "Miyaki Beauty",
      href: "/work/miyaki-beauty",
    },
  },
  {
    slug: "store",
    name: "Online store",
    summary: "Everything in Business, plus a catalogue, payments and checkout.",
    from: 6000,
    to: 9000,
    timeline: "3 to 5 weeks",
    revisions: "3 revision rounds",
    includes: [
      "Product catalogue with categories, variants and stock tracking",
      "MTN MoMo and Telecel Cash alongside card payments",
      "Cart and checkout with proper failure handling",
      "Order alerts by email and WhatsApp, and WhatsApp ordering",
      "Delivery zones and pricing",
      "Product schema for Google",
      "Admin training for your team",
    ],
    proof: {
      src: "/work/impressiful.webp",
      alt: "Impressiful online store with a catalogue past a thousand products, built by Manuel Technologies",
      client: "Impressiful",
      href: "/work/impressiful",
    },
  },
  {
    slug: "custom",
    name: "Custom build",
    summary: "Booking systems, customer portals, dashboards, calculators.",
    from: 9000,
    to: 15000,
    quoted: true,
    timeline: "Quoted after a scoping call",
    revisions: "Scoped per project",
    includes: [
      "Database design, user accounts with roles and permissions",
      "Integrations with your accounting, CRM or SMS provider",
      "Admin dashboards and reporting",
      "API work where other systems connect",
      "Automated testing, documentation and handover",
    ],
    proof: {
      src: "/work/getfold.webp",
      alt: "Fold, church management web app and PWA for Ghanaian congregations, built by Manuel Technologies",
      client: "Fold, getfold.org",
      href: "https://www.getfold.org",
    },
  },
];

export type CarePlan = {
  name: string;
  monthly: number;
  from?: boolean;
  includes: string[];
};

export const CARE_PLANS: CarePlan[] = [
  {
    name: "Essential",
    monthly: 299,
    includes: ["Hosting and SSL", "Uptime monitoring", "Security updates", "Weekly backups", "Up to 1 hour of small edits"],
  },
  {
    name: "Growth",
    monthly: 399,
    includes: ["Everything in Essential", "Monthly performance and Search Console report", "Content updates", "Up to 4 hours of changes"],
  },
  {
    name: "Partner",
    monthly: 499,
    from: true,
    includes: ["Everything in Growth", "8 reserved development hours", "Priority response", "Quarterly review"],
  },
];

export const NOT_INCLUDED = [
  "Copywriting",
  "Photography",
  "Domain registration fee",
  "Logo design",
  "Payment gateway charges",
  "Ongoing SEO or paid advertising",
];

/* Under the table. These two lines do the selling the prices cannot. */
export const PROMISES = [
  "Every site is built by the engineer you speak to. Not passed to a junior, and not abandoned at launch.",
  "Anyone can ship you a website now. The question is whether it still works, still ranks, and still has someone answering in six months.",
];

/* Payment terms. 60% to start, 40% before handover, and the site stays on
   our staging address until the balance clears. Emmanuel set these on 11
   September 2026, replacing 50/50: in this market the pressure to delay the
   final payment after the work is done is real, and the protection has to
   be in the terms rather than in a chase.

   THE WORDING IS DELIBERATE. The pricing page and the whole cost cluster
   promise that the domain, the hosting and the code are the client's. That
   promise and "we can block your website" cannot both be true, so the
   mechanism is handover rather than blocking. Nothing the client owns is
   withheld. Nothing is handed over before it is paid for. The 7 day clause
   is stated plainly, once, without a threat attached. */
export const PAYMENT_TERMS = [
  { term: "To start", detail: "60% of the agreed price, or the full amount if you prefer to settle it once. Work begins when it clears and the brief is signed off." },
  { term: "Before handover", detail: "The remaining 40%, when the finished site is approved. The site runs on our staging address until then, and goes live on your domain with every login handed over the day the balance clears." },
  { term: "Late balance", detail: "If the balance is not settled within 7 days of approval and no reason has been agreed, the site stays on staging and the launch date moves. Once it is settled, launch and handover happen the same day." },
  { term: "Custom builds", detail: "Split into milestones agreed at scoping, typically three, each paid before the next begins. Handover follows the final milestone." },
  { term: "Care plans", detail: "Monthly in advance. Cancel with 30 days notice, and the site and its code stay yours." },
  { term: "How to pay", detail: "Bank transfer, MTN MoMo, or card. International clients can pay in USD or GBP by transfer." },
  { term: "Quotes", detail: "Valid for 30 days. Prices in Ghana cedis." },
];

/* Published market rates, fetched directly on the date shown. Only firms
   whose pricing page could be fetched and read are listed. */
export const MARKET = {
  checked: "2026-09-11",
  rows: [
    {
      firm: "JobHouse Web Services",
      href: "https://jobhouse.com.gh/ghana-web-design-company/pricing/",
      starter: "GHC 990 to 1,500",
      business: "GHC 4,500",
      store: "GHC 3,500",
      custom: "From GHC 7,000",
      care: "Hosting included, no maintenance plan listed",
      note: "Online store and NGO site are both GHC 3,500, priced identically.",
    },
    {
      firm: "Faciotech (published guide)",
      href: "https://blog.faciotech.com/website-cost-in-ghana",
      starter: "GHS 800 to 2,000",
      business: "GHS 2,000 to 7,000",
      store: "GHS 7,000 to 12,000",
      custom: "GHS 12,000 to 20,000+",
      care: "GHS 1,500 a month recommended",
      note: "Ranges from their cost guide, not a fixed price list.",
    },
  ],
};

/* Real People Also Ask questions for the pillar's target queries. */
export const PRICING_FAQS = [
  {
    q: "How much does it cost to design a website in Ghana?",
    a: "Between GHS 2,000 and GHS 15,000 for most businesses, depending on what the site has to do. A one to three page site built around a single action costs GHS 2,000 to 3,500. A business site with a blog and self editing costs GHS 4,500 to 6,000. An online store with Mobile Money and card payments costs GHS 6,000 to 9,000. Anything with logins, bookings or dashboards is a custom build from GHS 9,000, quoted after a scoping call.",
  },
  {
    q: "How much should a website cost to develop?",
    a: "The honest answer is that the number depends on three things: how many distinct page types there are, whether it takes payments, and what it has to connect to. Page count alone is a poor guide. A site quoted purely on pages is usually a template with your logo on it. Ask what is included at each price and whether the person quoting will be the person building.",
  },
  {
    q: "How much does it cost to pay someone to design a website?",
    a: "In Ghana, published agency prices for a basic site run from roughly GHS 800 to GHS 3,500, and for a full business site from GHS 3,500 to GHS 7,000. Our Starter tier is GHS 2,000 to 3,500 and includes custom design, hosting, SSL and testing on real phones. The lower end of the market generally means a template, shared hosting, and nobody to call after launch.",
  },
  {
    q: "What is included in the price?",
    a: "Everything listed under the tier, with no add on charges for the items shown. Design, build, hosting, SSL, testing, the stated revision rounds, and post launch support where listed. Not included in any tier: copywriting, photography, the domain fee, logo design, payment gateway charges, and ongoing SEO or advertising. Those are stated on the page so there are no surprises on the invoice.",
  },
  {
    q: "Can I pay with MTN MoMo?",
    a: "Yes. Bank transfer, MTN MoMo and card are all accepted. Payment is 60% to start, or the full amount if you prefer, and the remaining 40% when the finished site is approved. The site goes live on your domain and the logins are handed over the day the balance clears. International clients can pay in USD or GBP by transfer.",
  },
  {
    q: "Why does a business need a website?",
    a: "Because it is the one channel you own. Strangers who search Google for what you sell find websites, not Instagram accounts or WhatsApp numbers. A stranger deciding whether to send money looks for one before they do. Payments, bookings and orders need somewhere to happen that does not depend on one person answering a chat. And a page that ranks this year still ranks next year, where a post is gone from the feed in a day. If your customers all come by referral and your orders fit in a chat, you may not need one yet. The moment strangers start searching, you do.",
  },
  {
    q: "What happens if the final balance is not paid?",
    a: "The site stays on our staging address, where it was built and approved, and the launch date moves until the balance is settled. Nothing you own is withheld: the domain is yours and the content is yours. What is not handed over is the finished work that has not yet been paid for. Once the balance clears, launch and handover happen the same day. This is stated here so it never has to be a conversation.",
  },
  {
    q: "Who owns the website when it is finished?",
    a: "You do. The code, the domain, the hosting account and every login are in your name and handed over with documentation the day the final balance clears and the site goes live. If you leave a care plan, the site and its code go with you. A site you cannot take elsewhere is a rental, not an asset.",
  },
  {
    q: "How long does a website take to build?",
    a: "A Starter site takes 5 to 7 days. A Business website takes 2 to 3 weeks. An Online store takes 3 to 5 weeks. Custom builds are scheduled at scoping. The most common cause of delay on every tier is content arriving late, which is why copy and images are agreed before design starts.",
  },
];

/* Formatting helpers. Used by the page and by the cost cluster. */
export function ghs(n: number): string {
  return `GHS ${n.toLocaleString("en-GB")}`;
}

export function convert(n: number, ccy: Currency): number {
  if (ccy === "GHS") return n;
  const v = n / RATES[ccy];
  /* Round to a sensible step so conversions never look like quotes. */
  const step = v >= 1000 ? 50 : v >= 100 ? 10 : 5;
  return Math.round(v / step) * step;
}

export function money(n: number, ccy: Currency): string {
  const v = convert(n, ccy);
  const sym = ccy === "GHS" ? "GHS " : ccy === "USD" ? "$" : "£";
  return `${sym}${v.toLocaleString("en-GB")}`;
}

export const PRICE_BAND = { from: TIERS[0].from, to: TIERS[TIERS.length - 1].to };
