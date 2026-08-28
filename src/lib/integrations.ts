/* Integrations and automations. REF-005 Paperform, REF-010.
   ---------------------------------------------------------------------------
   Systems Manuel Technologies builds against, across all three pillars, not
   just Scale.

   ON LOGOS. Showing an integration logo is nominative use: a factual claim that
   we connect to that product. That is different from a client logo wall, which
   implies a customer relationship and an endorsement, and which we do not have
   permission for. Integration logos are standard practice. Client logos are not
   ours to show. See CLAUDE.md section 2.

   Rules that still apply:
   - Only list a tool we can genuinely integrate. A logo we cannot back up is a
     lie a technical buyer will catch on the first call
   - Never imply partnership, certification, or endorsement
   - Never modify a mark. No recolouring, no distortion, no effects
   - Official brand assets only, converted to WebP, never scraped screenshots

   `logo` is optional and points at /public/integrations/<slug>.webp. Where the
   file is absent the component renders a wordmark tile in the brand colour, so
   the grid is never broken by a missing asset.

   `slug` is the future programmatic route: /integrations/<slug>.
   `services` maps each tool to the service pages it is relevant to, which is
   what will drive the programmatic page generation later.
   -------------------------------------------------------------------------- */

export type Integration = {
  slug: string;
  name: string;
  url: string;
  /* Official brand hex. Used for the wordmark fallback tile. */
  brand: string;
  /* One line, concrete, what we actually do with it. */
  blurb: string;
  /* Service page hrefs this tool is relevant to. Drives programmatic pages. */
  services: string[];
  logo?: string;
  /* Surfaced in the homepage grid. Currently 14, which wraps to two rows on
     desktop and reads as breadth. The reference shows nine in one row, but it
     is a form builder listing its own connectors. We are listing what we build
     against across three pillars, so more is the honest picture. */
  featured?: boolean;
};

export type IntegrationCategory = {
  slug: string;
  name: string;
  /* Why this category matters, in the buyer's terms. */
  intro: string;
  items: Integration[];
};

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    slug: "automation-platforms",
    name: "Automation platforms",
    intro:
      "Where a workflow can be assembled rather than written, we assemble it. Faster to build, easier for your team to change without us.",
    items: [
      {
        slug: "n8n",
        name: "n8n",
        url: "https://n8n.io",
        brand: "#EA4B71",
        blurb: "Self hosted workflow automation. Our default where data cannot leave your infrastructure.",
        services: ["/scale/ai-automations", "/scale/ai-agents", "/build/systems-integrations"],
        featured: true,
      },
      {
        slug: "make",
        name: "Make",
        url: "https://make.com",
        brand: "#6D00CC",
        blurb: "Visual scenario builder. Strong for multi step branching your operations team can read.",
        services: ["/scale/ai-automations", "/build/systems-integrations"],
        featured: true,
      },
      {
        slug: "zapier",
        name: "Zapier",
        url: "https://zapier.com",
        brand: "#FF4F00",
        blurb: "The widest integration catalogue. Right answer when the connector already exists.",
        services: ["/scale/ai-automations", "/build/systems-integrations"],
        featured: true,
      },
      {
        slug: "temporal",
        name: "Temporal",
        url: "https://temporal.io",
        brand: "#127DA8",
        blurb: "Durable execution for workflows that must survive failure and resume exactly where they stopped.",
        services: ["/scale/ai-automations", "/build/custom-software"],
      },
      {
        slug: "pipedream",
        name: "Pipedream",
        url: "https://pipedream.com",
        brand: "#34D399",
        blurb: "Code level steps inside a hosted workflow. Good middle ground when no-code runs out.",
        services: ["/scale/ai-automations", "/build/systems-integrations"],
      },
      {
        slug: "workato",
        name: "Workato",
        url: "https://workato.com",
        brand: "#F03C2E",
        blurb: "Enterprise integration with governance and audit trails built in.",
        services: ["/build/systems-integrations"],
      },
    ],
  },
  {
    slug: "ai-models",
    name: "AI models and providers",
    intro:
      "Model choice is an engineering decision, not a brand preference. We pick per task on cost, latency, context window, and whether your data may leave your estate.",
    items: [
      {
        slug: "openai",
        name: "OpenAI",
        url: "https://openai.com",
        brand: "#412991",
        blurb: "GPT models for generation, extraction, and function calling.",
        services: ["/scale/ai-agents", "/scale/ai-automations"],
        featured: true,
      },
      {
        slug: "anthropic",
        name: "Anthropic",
        url: "https://anthropic.com",
        brand: "#D97757",
        blurb: "Claude models. Our usual choice for long context work and tool use.",
        services: ["/scale/ai-agents", "/scale/ai-automations"],
        featured: true,
      },
      {
        slug: "google-gemini",
        name: "Google Gemini",
        url: "https://ai.google.dev",
        brand: "#4285F4",
        blurb: "Native multimodal handling and tight integration with Google Cloud.",
        services: ["/scale/ai-agents", "/grow/geo"],
      },
      {
        slug: "xai-grok",
        name: "xAI Grok",
        url: "https://x.ai",
        brand: "#000000",
        blurb: "Real time context from X. Powers the free tools on this site.",
        services: ["/scale/ai-agents"],
      },
      {
        slug: "mistral",
        name: "Mistral",
        url: "https://mistral.ai",
        brand: "#FA520F",
        blurb: "Open weight models you can run yourself when data residency is the constraint.",
        services: ["/scale/ai-agents"],
      },
      {
        slug: "ollama",
        name: "Ollama",
        url: "https://ollama.com",
        brand: "#000000",
        blurb: "Local model hosting. Nothing leaves the machine.",
        services: ["/scale/ai-agents"],
      },
    ],
  },
  {
    slug: "crm-and-sales",
    name: "CRM and sales",
    intro:
      "Most automation value sits here, because this is where manual re-entry costs the most and errors are most expensive.",
    items: [
      {
        slug: "hubspot",
        name: "HubSpot",
        url: "https://hubspot.com",
        brand: "#FF7A59",
        blurb: "Contact sync, deal stage automation, lifecycle scoring, custom objects.",
        services: ["/scale/ai-automations", "/build/systems-integrations", "/grow/paid-ads"],
        featured: true,
      },
      {
        slug: "salesforce",
        name: "Salesforce",
        url: "https://salesforce.com",
        brand: "#00A1E0",
        blurb: "Apex and REST integration, custom objects, middleware for legacy connections.",
        services: ["/build/systems-integrations", "/scale/ai-automations"],
        featured: true,
      },
      {
        slug: "pipedrive",
        name: "Pipedrive",
        url: "https://pipedrive.com",
        brand: "#017737",
        blurb: "Pipeline automation for smaller sales teams without an admin.",
        services: ["/scale/ai-automations"],
      },
      {
        slug: "attio",
        name: "Attio",
        url: "https://attio.com",
        brand: "#3B4CCA",
        blurb: "Data model first CRM. Good fit where the sales process is unusual.",
        services: ["/scale/ai-automations"],
      },
      {
        slug: "airtable",
        name: "Airtable",
        url: "https://airtable.com",
        brand: "#18BFFF",
        blurb: "Operational database and internal tooling backend.",
        services: ["/build/custom-software", "/scale/ai-automations"],
      },
    ],
  },
  {
    slug: "communication",
    name: "Communication",
    intro:
      "An automation nobody sees is an automation nobody trusts. Output lands where the team already works.",
    items: [
      {
        slug: "slack",
        name: "Slack",
        url: "https://slack.com",
        brand: "#4A154B",
        blurb: "Alerts, approvals, and agent interfaces that live in a channel.",
        services: ["/scale/ai-automations", "/scale/ai-agents"],
        featured: true,
      },
      {
        slug: "microsoft-teams",
        name: "Microsoft Teams",
        url: "https://microsoft.com/microsoft-teams",
        brand: "#6264A7",
        blurb: "Same patterns as Slack, for organisations on Microsoft 365.",
        services: ["/scale/ai-automations"],
      },
      {
        slug: "whatsapp-business",
        name: "WhatsApp Business",
        url: "https://business.whatsapp.com",
        brand: "#25D366",
        blurb: "Commerce and support flows. Essential in African and Middle Eastern markets.",
        services: ["/scale/ai-agents", "/build/website-development"],
        featured: true,
      },
      {
        slug: "twilio",
        name: "Twilio",
        url: "https://twilio.com",
        brand: "#F22F46",
        blurb: "Programmable SMS and voice for notifications and verification.",
        services: ["/build/systems-integrations"],
      },
      {
        slug: "gmail",
        name: "Gmail",
        url: "https://workspace.google.com/products/gmail",
        brand: "#EA4335",
        blurb: "Inbox parsing, routing, and automated drafting.",
        services: ["/scale/ai-automations"],
      },
    ],
  },
  {
    slug: "commerce-and-billing",
    name: "Commerce and billing",
    intro:
      "Money movement is where correctness matters most. These integrations get reconciliation and idempotency handling, not just a webhook.",
    items: [
      {
        slug: "stripe",
        name: "Stripe",
        url: "https://stripe.com",
        brand: "#635BFF",
        blurb: "Checkout, subscriptions, webhook handling, reconciliation into your ledger.",
        services: ["/build/website-development", "/build/custom-software"],
        featured: true,
      },
      {
        slug: "shopify",
        name: "Shopify",
        url: "https://shopify.com",
        brand: "#7AB55C",
        blurb: "Headless storefronts, app integration, catalogue and order sync.",
        services: ["/build/website-development", "/grow/technical-seo"],
        featured: true,
      },
      {
        slug: "woocommerce",
        name: "WooCommerce",
        url: "https://woocommerce.com",
        brand: "#96588A",
        blurb: "WordPress commerce, performance work, and custom checkout flows.",
        services: ["/build/website-development"],
      },
      {
        slug: "paystack",
        name: "Paystack",
        url: "https://paystack.com",
        brand: "#00C3F7",
        blurb: "Payments across African markets where Stripe has no coverage.",
        services: ["/build/website-development"],
      },
      {
        slug: "quickbooks",
        name: "QuickBooks",
        url: "https://quickbooks.intuit.com",
        brand: "#2CA01C",
        blurb: "Invoice generation and reconciliation without manual entry.",
        services: ["/scale/ai-automations"],
      },
      {
        slug: "xero",
        name: "Xero",
        url: "https://xero.com",
        brand: "#13B5EA",
        blurb: "Accounting sync for UK and Commonwealth clients.",
        services: ["/scale/ai-automations"],
      },
    ],
  },
  {
    slug: "data-and-storage",
    name: "Data and storage",
    intro:
      "Every automation needs somewhere to read from and write to. These are the stores we build against directly.",
    items: [
      {
        slug: "postgresql",
        name: "PostgreSQL",
        url: "https://postgresql.org",
        brand: "#4169E1",
        blurb: "Default relational store. Schema design, migrations, query performance.",
        services: ["/build/custom-software"],
      },
      {
        slug: "supabase",
        name: "Supabase",
        url: "https://supabase.com",
        brand: "#3FCF8E",
        blurb: "Postgres with auth, storage, and row level security. Fast route to production.",
        services: ["/build/custom-software", "/build/mobile-apps"],
      },
      {
        slug: "bigquery",
        name: "BigQuery",
        url: "https://cloud.google.com/bigquery",
        brand: "#669DF6",
        blurb: "Warehouse scale analytics and attribution modelling.",
        services: ["/scale/analytics"],
      },
      {
        slug: "notion",
        name: "Notion",
        url: "https://notion.so",
        brand: "#000000",
        blurb: "Content operations, internal knowledge, and agent retrieval sources.",
        services: ["/scale/ai-agents", "/grow/content-branding"],
        featured: true,
      },
      {
        slug: "google-sheets",
        name: "Google Sheets",
        url: "https://workspace.google.com/products/sheets",
        brand: "#34A853",
        blurb: "Still the most common operational database in a small business. We treat it as one.",
        services: ["/scale/ai-automations"],
        featured: true,
      },
      {
        slug: "firebase",
        name: "Firebase",
        url: "https://firebase.google.com",
        brand: "#FFCA28",
        blurb: "Realtime data and auth for mobile builds.",
        services: ["/build/mobile-apps"],
      },
    ],
  },
  {
    slug: "cms-and-web",
    name: "CMS and web platforms",
    intro:
      "What your content team touches every day. We build on these, migrate off them, and make them fast.",
    items: [
      {
        slug: "wordpress",
        name: "WordPress",
        url: "https://wordpress.org",
        brand: "#21759B",
        blurb: "Plugin development, Core Web Vitals rescue, headless migration.",
        services: ["/build/website-development", "/grow/technical-seo"],
      },
      {
        slug: "nextjs",
        name: "Next.js",
        url: "https://nextjs.org",
        brand: "#000000",
        blurb: "Our default build stack. This site is one. So is every recent client project.",
        services: ["/build/website-development", "/grow/programmatic-seo"],
      },
      {
        slug: "webflow",
        name: "Webflow",
        url: "https://webflow.com",
        brand: "#146EF5",
        blurb: "Where marketing needs to ship pages without a developer in the loop.",
        services: ["/build/web-design"],
      },
      {
        slug: "sanity",
        name: "Sanity",
        url: "https://sanity.io",
        brand: "#F03E2F",
        blurb: "Structured content for programmatic page generation at scale.",
        services: ["/grow/programmatic-seo"],
      },
      {
        slug: "vercel",
        name: "Vercel",
        url: "https://vercel.com",
        brand: "#000000",
        blurb: "Edge deployment, image optimisation, preview environments.",
        services: ["/build/website-development"],
      },
    ],
  },
  {
    slug: "seo-and-analytics",
    name: "SEO and analytics",
    intro:
      "The measurement layer. If a change cannot be evidenced here, we do not claim it worked.",
    items: [
      {
        slug: "google-search-console",
        name: "Google Search Console",
        url: "https://search.google.com/search-console",
        brand: "#458CF5",
        blurb: "Indexation diagnosis, coverage, canonical conflicts, query data.",
        services: ["/grow/technical-seo", "/grow/on-page-seo"],
      },
      {
        slug: "google-analytics",
        name: "Google Analytics 4",
        url: "https://analytics.google.com",
        brand: "#E37400",
        blurb: "Event modelling, conversion tracking, and server side tagging.",
        services: ["/scale/analytics"],
      },
      {
        slug: "ahrefs",
        name: "Ahrefs",
        url: "https://ahrefs.com",
        brand: "#0059FF",
        blurb: "Backlink auditing, keyword research, competitor gap analysis.",
        services: ["/grow/link-building", "/grow/on-page-seo"],
      },
      {
        slug: "semrush",
        name: "Semrush",
        url: "https://semrush.com",
        brand: "#FF642D",
        blurb: "Position tracking and content gap work at scale.",
        services: ["/grow/on-page-seo"],
      },
      {
        slug: "screaming-frog",
        name: "Screaming Frog",
        url: "https://screamingfrog.co.uk",
        brand: "#4CAF50",
        blurb: "Crawl auditing. Where most technical SEO problems are actually found.",
        services: ["/grow/technical-seo"],
      },
      {
        slug: "looker-studio",
        name: "Looker Studio",
        url: "https://lookerstudio.google.com",
        brand: "#4285F4",
        blurb: "Client reporting that updates itself instead of being rebuilt monthly.",
        services: ["/scale/analytics"],
      },
      {
        slug: "posthog",
        name: "PostHog",
        url: "https://posthog.com",
        brand: "#F54E00",
        blurb: "Product analytics, session replay, and self hosted event capture.",
        services: ["/scale/analytics"],
      },
    ],
  },
  {
    slug: "ads-and-marketing",
    name: "Ads and marketing",
    intro:
      "Spend platforms and the lifecycle tools around them. Automation here is mostly about attribution and feedback loops.",
    items: [
      {
        slug: "google-ads",
        name: "Google Ads",
        url: "https://ads.google.com",
        brand: "#4285F4",
        blurb: "Search and Performance Max, with offline conversion import.",
        services: ["/grow/paid-ads"],
      },
      {
        slug: "meta-ads",
        name: "Meta Ads",
        url: "https://business.meta.com",
        brand: "#0866FF",
        blurb: "Facebook and Instagram, Conversions API for server side tracking.",
        services: ["/grow/paid-ads", "/grow/social-media"],
      },
      {
        slug: "linkedin-ads",
        name: "LinkedIn Ads",
        url: "https://business.linkedin.com/marketing-solutions/ads",
        brand: "#0A66C2",
        blurb: "B2B targeting with CRM closed loop reporting.",
        services: ["/grow/paid-ads"],
      },
      {
        slug: "klaviyo",
        name: "Klaviyo",
        url: "https://klaviyo.com",
        brand: "#000000",
        blurb: "Ecommerce lifecycle flows tied to catalogue and order data.",
        services: ["/grow/content-branding"],
      },
      {
        slug: "mailchimp",
        name: "Mailchimp",
        url: "https://mailchimp.com",
        brand: "#FFE01B",
        blurb: "List sync and campaign automation for smaller senders.",
        services: ["/scale/ai-automations"],
        featured: true,
      },
      {
        slug: "resend",
        name: "Resend",
        url: "https://resend.com",
        brand: "#000000",
        blurb: "Transactional email with proper deliverability setup. Runs this site's contact form.",
        services: ["/build/website-development"],
      },
    ],
  },
];

/* Flat list. Used by the integrations index and, later, by the programmatic
   route generator. */
export const INTEGRATIONS: Integration[] = INTEGRATION_CATEGORIES.flatMap(
  (category) => category.items,
);

/* Homepage grid. Ordered as authored, so category order controls the row. */
export const FEATURED_INTEGRATIONS: Integration[] = INTEGRATIONS.filter(
  (item) => item.featured,
);

export function integrationsForService(href: string): Integration[] {
  return INTEGRATIONS.filter((item) => item.services.includes(href));
}

export function integrationBySlug(slug: string): Integration | undefined {
  return INTEGRATIONS.find((item) => item.slug === slug);
}
