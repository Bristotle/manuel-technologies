import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Free SEO, GEO and performance tools",
  description: "Six free tools: a live SEO and GEO audit, an organic traffic ROI calculator, a Google Business Profile checker, technical SEO triage, GEO content briefs, and AI agent readiness. No account required.",
  alternates: { canonical: "/free-tools" },
};

const tools = [
  { label: "Live audit", title: "Free SEO and GEO audit", description: "Enter a URL. We fetch the page, its robots.txt and its sitemap, measure twenty things, and rank what to fix.", href: "/free-audit" },
  { label: "ROI", title: "Organic traffic ROI calculator", description: "What one organic visit is worth at your own numbers, what a traffic increase would be worth, and the break even point.", href: "/free-tools/roi-calculator" },
  { label: "Local", title: "Google Business Profile checker", description: "Twenty weighted checks, a local dominance score, and the gaps ordered by what moves local visibility most.", href: "/free-tools/google-business-profile" },
  { label: "SEO triage", title: "Technical SEO triage", description: "Turn the page facts you already have into prioritised crawl, indexation, content, and performance actions.", href: "/free-tools/seo-audit" },
  { label: "GEO brief", title: "GEO content brief generator", description: "Create an answer-first brief with search intent, entities, questions, internal links, and source requirements.", href: "/free-tools/geo-content-brief" },
  { label: "AI readiness", title: "AI agent readiness assessment", description: "Decide whether your workflow needs deterministic automation, an AI feature, or a bounded agent.", href: "/free-tools/ai-agent-readiness" },
];

export default function FreeToolsPage() {
  return <main><section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32"><DotGrid fade="bottom" /><Container className="relative"><SectionLabel>Free tools</SectionLabel><h1 className="mt-6 max-w-[16ch]">Useful tools for the work before you buy.</h1><p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">Six of them. Two run live against your site, four run in your browser. No account, no email gate, nothing stored.</p></Container></section><section className="py-24 sm:py-32"><Container><div className="mt-reveal-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <Link key={tool.href} href={tool.href} className="mt-lift mt-spot group rounded-[18px] border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple"><span className="mt-label">{tool.label}</span><h2 className="mt-5 !text-2xl group-hover:text-mt-purple">{tool.title}</h2><p className="mt-4 leading-relaxed text-mt-slate">{tool.description}</p><span className="mt-8 inline-flex text-sm font-semibold text-mt-purple">Open tool</span></Link>)}</div></Container></section></main>;
}
