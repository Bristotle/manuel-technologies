/* Single source of truth for site structure.
   Nav, footer and sitemap all read from here. Change a route once. */

export const SITE = {
  name: "Manuel Technologies",
  url: "https://manueltechnologies.com",
  email: "info@manueltechnologies.com",
  tagline: "Build. Grow. Scale.",
  proof: "We ship our own software. Yours gets the same standard.",
  chromeStore: "https://chromewebstore.google.com/",
} as const;

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
  promise: string;
  intro: string;
  services: Service[];
};

export const PILLARS: Pillar[] = [
  {
    name: "Build",
    slug: "build",
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
] as const;

/* Marquee rail. Bracket syntax from REF-002. */
export const CAPABILITIES = [
  "TECHNICAL SEO",
  "GEO",
  "PROGRAMMATIC SEO",
  "AI AGENTS",
  "AI AUTOMATIONS",
  "CUSTOM SOFTWARE",
  "SYSTEMS AND INTEGRATIONS",
  "CORE WEB VITALS",
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
};

export const PROJECTS: Project[] = [
  {
    slug: "impressiful",
    client: "Impressiful",
    url: "https://impressiful.com",
    market: "United Arab Emirates",
    sector: "Ecommerce",
    summary:
      "Custom branded merchandise at catalogue scale. Over 1,000 configurable products across 15 categories, with multi currency pricing, sample kit and bulk order flows, and WhatsApp commerce wired into the checkout path.",
    scope: ["Website Development", "Ecommerce", "Technical SEO"],
    thumb: "/work/impressiful.webp",
  },
  {
    slug: "cgt-experts",
    client: "Capital Gains Tax Experts",
    url: "https://capitalgainstaxexpert.co.uk",
    market: "United Kingdom",
    sector: "Regulated professional services",
    summary:
      "Eight bespoke tax calculators covering property, shares, crypto, non-resident disposals, BADR, stamp duty, inheritance and income tax. Functional software in a regulated domain, where the arithmetic has consequences, and a lead engine rather than a brochure.",
    scope: ["Custom Software", "Website Development", "Technical SEO"],
    thumb: "/work/cgt-experts.webp",
  },
  {
    slug: "dementia-in-home",
    client: "Dementia In Home",
    url: "https://www.dementiainhome.com",
    market: "United States",
    sector: "Healthcare",
    summary:
      "A national caregiver matching service built on Next.js, with programmatic city pages carrying real local pricing. The page architecture is designed to scale from five cities to several hundred without a rebuild.",
    scope: ["Website Development", "Programmatic SEO", "Custom Software"],
    thumb: "/work/dementia-in-home.webp",
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
  },
];
