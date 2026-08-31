/* Single source of truth for site structure.
   Nav, footer and sitemap all read from here. Change a route once. */

export const SITE = {
  name: "Manuel Technologies",
  url: "https://manueltechnologies.com",
  email: "info@manueltechnologies.com",
  tagline: "Build. Grow. Scale.",
  proof:
    "We build our own software, ship it, get it cited in LLMs, rank in Google and AI Overviews. Yours gets the same standard.",
  /* The actual CWV Drift Monitor listing. This pointed at the store root,
     so every "View on the Chrome Web Store" button landed on a search page
     rather than the extension. */
  chromeStore:
    "https://chromewebstore.google.com/detail/cwv-drift-monitor/pkiklodchlkafnfidhhdagimgjjfdanm",
} as const;

/* Social. Only populated entries render, so an empty string hides the icon
   rather than shipping a dead link. Add the LinkedIn URL when you have it to
   hand and it appears in the footer automatically. */
export const SOCIAL = [
  { name: "GitHub", href: "https://github.com/Bristotle" },
  { name: "LinkedIn", href: "" },
] as const;

/* Where contact form submissions are delivered. Server side only.
   NEVER render this in the UI. The address shown to visitors is
   SITE.email, the business address. A personal Gmail on a contact
   page undercuts everything else on the site. */
export const CONTACT_RECIPIENT = "emmanuelakyeam@gmail.com";

export type Service = {
  name: string;
  href: string;
  blurb: string;
  /* Flip to true when the page actually exists. The footer only links
     live pages. Everything else renders as plain text, so we never ship
     a dead internal link. */
  live?: boolean;
};

export type Pillar = {
  name: string;
  slug: "build" | "grow" | "scale";
  /* Real date this hub copy last changed. Feeds sitemap lastmod.
     Never bump it for a deploy. See PAGE_MODIFIED below. */
  modified: string;
  promise: string;
  intro: string;
  services: Service[];
};

export const PILLARS: Pillar[] = [
  {
    name: "Build",
    slug: "build",
    modified: "2026-08-31",
    promise: "The thing itself, shipped and working.",
    intro:
      "Websites, applications and the systems underneath them. Built to a performance standard, not to a template.",
    services: [
      {
        name: "Website Development",
        href: "/build/website-development",
        blurb: "Marketing sites and headless builds, performance first.",
      },
      {
        name: "Web Design and UX",
        href: "/build/web-design",
        blurb: "Interface design, design systems, conversion focused layout.",
      },
      {
        name: "Custom Software",
        href: "/build/custom-software",
        blurb: "Web applications, internal tools, client portals, dashboards.",
      },
      {
        name: "Mobile Applications",
        href: "/build/mobile-apps",
        blurb: "iOS, Android, React Native and Flutter.",
      },
      {
        name: "Systems and Integrations",
        href: "/build/systems-integrations",
        blurb: "APIs, middleware, legacy connections, CRM and ERP.",
      },
    ],
  },
  {
    name: "Grow",
    slug: "grow",
    modified: "2026-08-31",
    promise: "More of the right people finding it.",
    intro:
      "Search visibility across Google and the AI engines that now answer before Google does.",
    services: [
      {
        name: "Technical SEO",
        href: "/grow/technical-seo",
        blurb: "Crawlability, indexation, Core Web Vitals, site architecture.",
      },
      {
        name: "Programmatic SEO",
        href: "/grow/programmatic-seo",
        blurb: "Page generation at scale, driven by data rather than templates.",
      },
      {
        name: "On-Page SEO",
        href: "/grow/on-page-seo",
        blurb: "Content optimisation, entity structure, schema, internal links.",
      },
      {
        name: "Link Building and Digital PR",
        href: "/grow/link-building",
        blurb: "Authority acquisition, earned mentions, backlink audits.",
      },
      {
        name: "Generative Engine Optimization",
        href: "/grow/geo",
        blurb: "Getting cited by ChatGPT, Perplexity, Gemini and AI Overviews.",
      },
      {
        name: "Content and Branding",
        href: "/grow/content-branding",
        blurb: "Editorial strategy, copywriting, brand identity.",
      },
      {
        name: "Social Media Management",
        href: "/grow/social-media",
        blurb: "Content calendars and community management.",
      },
      {
        name: "Paid Ads",
        href: "/grow/paid-ads",
        blurb: "Google, Meta, LinkedIn and TikTok.",
      },
    ],
  },
  {
    name: "Scale",
    slug: "scale",
    modified: "2026-08-28",
    promise: "Handle more without hiring more.",
    intro:
      "Automation is how a business absorbs more volume without adding headcount. That is what this pillar builds.",
    services: [
      {
        name: "AI Automations",
        href: "/scale/ai-automations",
        blurb: "Workflow automation, document processing, cross platform sync.",
      },
      {
        name: "AI Agents Development",
        href: "/scale/ai-agents",
        blurb: "Multi agent systems, custom LLM integration, retrieval pipelines.",
      },
      {
        name: "Business Insights and Analytics",
        href: "/scale/analytics",
        blurb: "Dashboards, data pipelines, attribution, reporting automation.",
      },
    ],
  },
];

export const NAV = [
  ...PILLARS.map((p) => ({ name: p.name, href: `/${p.slug}` })),
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Free tools", href: "/free-tools" },
] as const;

/* --------------------------------------------------------------------------
   Content dates for the standalone routes, ISO yyyy-mm-dd.

   These feed sitemap lastmod. Services carry their own date in
   service-pages.ts, pillars carry theirs on the Pillar record, blog posts
   carry theirs on the post. Everything else is listed here.

   THE RULE. Touch a date ONLY when the words on that page change. Never on a
   deploy, never in bulk. The sitemap previously stamped every URL with the
   build time, which told Google that 32 pages changed every time anything
   shipped. Google ignores lastmod once a site proves it unreliable, so that
   spent the strongest crawl scheduling signal available and got nothing for
   it. See CLAUDE.md section 6.
   -------------------------------------------------------------------------- */
export const PAGE_MODIFIED: Record<string, string> = {
  "/": "2026-08-31",
  "/work": "2026-08-28",
  "/agency-vs-engineer": "2026-08-31",
  "/about": "2026-08-24",
  "/contact": "2026-08-28",
  "/integrations": "2026-08-28",
  "/blog": "2026-08-28",
  "/free-tools": "2026-08-26",
  "/free-tools/seo-audit": "2026-08-26",
  "/free-tools/geo-content-brief": "2026-08-26",
  "/free-tools/ai-agent-readiness": "2026-08-26",
  "/privacy-policy": "2026-08-26",
  "/terms-of-service": "2026-08-26",
  "/cwv-drift-monitor/privacy-policy": "2026-08-24",
};

/* Marquee rail. Bracket syntax from REF-002.
   Ordered so the two commercial items, website development and ROI, sit early
   where the rail is first read, rather than buried among the technical terms.

   NOTE. Emmanuel asked for "ROI driven solutions". "Solutions" is on the banned
   word list in CLAUDE.md section 1, his own rule, so this reads "ROI DRIVEN
   BUILDS". Say the actual thing. Change it if he wants the ban lifted. */
export const CAPABILITIES = [
  "WEBSITE DEVELOPMENT",
  "ROI DRIVEN BUILDS",
  "TECHNICAL SEO",
  "GEO",
  "PROGRAMMATIC SEO",
  "AI AGENTS",
  "AI AUTOMATIONS",
  "CUSTOM SOFTWARE",
  "SYSTEMS AND INTEGRATIONS",
  "MOBILE APPS",
  "ANALYTICS",
] as const;

/* --------------------------------------------------------------------------
   Work. Only engagements where Manuel Technologies was the vendor.
   Employer work never appears here. See CLAUDE.md section 7.
   -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  client: string;
  url: string;
  market: string;
  sector: string;
  summary: string;
  scope: string[];
  thumb?: string;
  /* The pill on the card. REF-013 puts a number on every single one, and that
     is the entire reason that section reads as credible rather than confident.

     Two rules. It must be verifiable, and it must be a fact rather than a
     claim. "Eight tax calculators" is countable by anyone who opens the site.
     "Improved conversion" is not, and does not go here.

     Optional on purpose. A card without a metric renders cleanly, so nothing
     has to be invented to fill the slot. */
  metric?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "impressiful",
    client: "Impressiful",
    url: "https://impressiful.com",
    market: "United Arab Emirates",
    sector: "Ecommerce",
    summary:
      "Custom branded merchandise at catalogue scale. Over 1,000 configurable products across 21 categories, with multi currency pricing, sample kit and bulk order flows, and WhatsApp commerce wired into the checkout path.",
    scope: ["Website Development", "Ecommerce", "Technical SEO"],
    thumb: "/work/impressiful.webp",
    metric: "1,000+ products",
  },
  {
    slug: "cgt-experts",
    client: "Capital Gains Tax Experts",
    url: "https://capitalgainstaxexpert.co.uk",
    market: "United Kingdom",
    sector: "Regulated professional services",
    summary:
      "Nine bespoke tax calculators covering property, shares, crypto, non-resident disposals, BADR, stamp duty, inheritance and income tax. Functional software in a regulated domain, where the arithmetic has consequences, and a lead engine rather than a brochure.",
    scope: ["Custom Software", "Website Development", "Technical SEO"],
    thumb: "/work/cgt-experts.webp",
    metric: "9 tax calculators",
  },
  {
    slug: "dementia-in-home",
    client: "Dementia In Home",
    url: "https://www.dementiainhome.com",
    market: "United States",
    sector: "Healthcare",
    summary:
      "A national caregiver matching service built on Next.js, with programmatic city pages carrying real local pricing. Twenty city pages are live, and the page architecture is designed to reach several hundred without a rebuild.",
    scope: ["Website Development", "Programmatic SEO", "Custom Software"],
    thumb: "/work/dementia-in-home.webp",
    metric: "20 city pages",
  },
  {
    slug: "miyaki-beauty",
    client: "Miyaki Beauty",
    url: "https://miyakibeautygh.com",
    market: "Ghana",
    sector: "Beauty and retail",
    summary:
      "Ecommerce and brand presence for a premium beauty retailer. Also the site we test CWV Drift Monitor against, so its Core Web Vitals get watched more closely than most.",
    scope: ["Website Development", "Ecommerce", "Web Design"],
    thumb: "/work/miyaki-beauty.webp",
    metric: "Ecommerce build",
  },
  {
    slug: "cangaf",
    client: "Cangaf",
    url: "https://cangafltd.com",
    market: "United Kingdom",
    sector: "Accountancy",
    summary:
      "The parent practice behind Capital Gains Tax Experts. Chartered accountants in Bolton, with a client portal and a resource library.",
    scope: ["Website Development", "Technical SEO"],
    thumb: "/work/cangaf.webp",
    metric: "6 service lines",
  },
  {
    slug: "bot-properties",
    client: "BOT Properties",
    url: "https://botghana.com",
    market: "Ghana",
    sector: "Real estate",
    summary:
      "Luxury residential and commercial property across Accra and Kumasi. Separate buy and rent paths, five accommodation types from studio to three bedroom, and on-site amenity pages covering dining and spa.",
    /* SCOPE NEEDS CONFIRMING. CLAUDE.md section 7 lists BOT Properties as our
       work but does not record what the engagement covered, so this is the
       conservative reading of what is evident on the site. Emmanuel to widen
       it if the work went further. */
    scope: ["Website Development"],
    /* NO THUMB YET. The site's hero banners render black in headless capture,
       so there is no usable screenshot. Add public/work/bot-properties.webp
       and the project moves from the 'Also live' rail to a featured card. */
    metric: "5 accommodation types",
  },
];
