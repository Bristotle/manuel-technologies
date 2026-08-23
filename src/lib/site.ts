/* Single source of truth for site structure.
   Nav, footer and sitemap all read from here. Change a route once. */

export const SITE = {
  name: "Manuel Technologies",
  url: "https://manueltechnologies.com",
  email: "info@manueltechnologies.com",
  tagline: "Build. Grow. Scale.",
  proof: "We ship our own software. Yours gets the same standard.",
  location: "Accra, Ghana",
  chromeStore: "https://chromewebstore.google.com/",
} as const;

export type Service = { name: string; href: string; blurb: string };

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
