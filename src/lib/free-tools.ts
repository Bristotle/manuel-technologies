/* The free tools, in the order they are listed. One source for the tools
   index, the header dropdown and the footer, so a new tool appears in all
   three when it is added here. */
export type Tool = { label: string; title: string; description: string; href: string };

export const TOOLS: Tool[] = [
  { label: "Live audit", title: "Free SEO and GEO audit", description: "Enter a URL. We fetch the page, its robots.txt and its sitemap, measure twenty things, and rank what to fix.", href: "/free-audit" },
  { label: "AI crawlers", title: "AI crawler compatibility check", description: "Are GPTBot, ClaudeBot, PerplexityBot and Google-Extended allowed to read your site? A blocked crawler cannot cite you.", href: "/free-tools/ai-crawler-check" },
  { label: "ROI", title: "Organic traffic ROI calculator", description: "What one organic visit is worth at your own numbers, what a traffic increase would be worth, and the break even point.", href: "/free-tools/roi-calculator" },
  { label: "Rent or own", title: "Retainer versus building it once", description: "Cumulative cost of a monthly retainer against owning the same thing, and the month the two lines cross.", href: "/free-tools/retainer-vs-build" },
  { label: "Automation", title: "Manual task automation ROI", description: "What a repetitive workflow costs a year, what automating it saves after the share a person still does, and the payback.", href: "/free-tools/automation-roi" },
  { label: "Local", title: "Google Business Profile checker", description: "Twenty weighted checks, a local dominance score, and the gaps ordered by what moves local visibility most.", href: "/free-tools/google-business-profile" },
  { label: "Funnel", title: "Enquiry funnel friction tester", description: "Sixteen checks on the stretch between a service page visit and a signed brief, ordered by how often each is the real cause.", href: "/free-tools/funnel-friction" },
  { label: "Programmatic", title: "Programmatic SEO risk index", description: "Fifteen known failure modes for generated page sets, weighted by how badly each one damages indexation.", href: "/free-tools/programmatic-seo-risk" },
  { label: "Schema", title: "JSON-LD schema generator", description: "Organization, LocalBusiness, Service and FAQPage markup, generated as you type. No email gate to copy it.", href: "/free-tools/schema-generator" },
  { label: "SEO triage", title: "Technical SEO triage", description: "Turn the page facts you already have into prioritised crawl, indexation, content, and performance actions.", href: "/free-tools/seo-audit" },
  { label: "GEO brief", title: "GEO content brief generator", description: "Create an answer-first brief with search intent, entities, questions, internal links, and source requirements.", href: "/free-tools/geo-content-brief" },
  { label: "AI readiness", title: "AI agent readiness assessment", description: "Decide whether your workflow needs deterministic automation, an AI feature, or a bounded agent.", href: "/free-tools/ai-agent-readiness" },
];
