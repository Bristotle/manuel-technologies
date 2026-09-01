import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Free SEO, GEO and performance tools",
  description: "Twelve free tools: a live SEO and GEO audit, an AI crawler check, ROI and automation calculators, a retainer versus build comparison, a Google Business Profile checker, funnel and programmatic SEO assessments, and a JSON-LD generator. No account, no email gate.",
  alternates: { canonical: "/free-tools" },
};

const tools = [
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

export default function FreeToolsPage() {
  return <main><section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32"><DotGrid fade="bottom" /><Container className="relative"><SectionLabel>Free tools</SectionLabel><h1 className="mt-6 max-w-[16ch]">Useful tools for the work before you buy.</h1><p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">Twelve of them. Three run live against your site, the rest run entirely in your browser. No account, no email gate, nothing stored, and none of them are behind a form.</p></Container></section><section className="py-24 sm:py-32"><Container><div className="mt-reveal-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <Link key={tool.href} href={tool.href} className="mt-lift mt-spot group rounded-[18px] border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple"><span className="mt-label">{tool.label}</span><h2 className="mt-5 !text-2xl group-hover:text-mt-purple">{tool.title}</h2><p className="mt-4 leading-relaxed text-mt-slate">{tool.description}</p><span className="mt-8 inline-flex text-sm font-semibold text-mt-purple">Open tool</span></Link>)}</div></Container></section></main>;
}
