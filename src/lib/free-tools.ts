export const FREE_TOOLS = [
  {
    slug: "technical-seo-health-check",
    name: "Technical SEO health check",
    shortName: "SEO health check",
    description: "Score the technical signals that help a page get crawled, understood, and clicked.",
    intro: "Answer six checks about one important URL. Get an instant score, prioritised fixes, and a Grok-assisted action plan when the API is configured.",
  },
  {
    slug: "ai-agent-readiness-assessment",
    name: "AI agent readiness assessment",
    shortName: "Agent readiness",
    description: "Find out whether a workflow needs an AI agent, fixed automation, or better process design first.",
    intro: "Describe one workflow and its risk. Get a practical recommendation, architecture direction, and controls to consider before building.",
  },
  {
    slug: "website-roi-calculator",
    name: "Website ROI calculator",
    shortName: "Website ROI",
    description: "Model the commercial value of more qualified traffic and a better conversion rate.",
    intro: "Use your current traffic, conversion rate, lead value, and growth assumptions to estimate monthly and annual upside.",
  },
] as const;

export type FreeToolSlug = (typeof FREE_TOOLS)[number]["slug"];

export function getFreeTool(slug: string) {
  return FREE_TOOLS.find((tool) => tool.slug === slug);
}
