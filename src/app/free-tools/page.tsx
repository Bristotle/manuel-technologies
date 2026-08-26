import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FREE_TOOLS } from "@/lib/free-tools";

export const metadata: Metadata = { title: "Free SEO, AI, and website tools", description: "Free practical tools for technical SEO, AI agent planning, and website ROI modelling.", alternates: { canonical: "/free-tools" } };

export default function FreeToolsPage() {
  return <main><section className="border-b border-mt-border bg-white py-24 sm:py-32"><Container><SectionLabel>Free tools</SectionLabel><h1 className="mt-6 max-w-[16ch]">Useful tools for the decisions before build.</h1><p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">Practical diagnostics and models for teams planning search, automation, and a website that earns its keep. No account required.</p></Container></section><section className="py-24 sm:py-32"><Container><div className="grid gap-5 md:grid-cols-3">{FREE_TOOLS.map((tool, index) => <Link key={tool.slug} href={`/free-tools/${tool.slug}`} className="group border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple"><span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-mt-purple">0{index + 1}</span><h2 className="mt-8 !text-2xl group-hover:text-mt-purple">{tool.name}</h2><p className="mt-4 leading-relaxed text-mt-slate">{tool.description}</p><span className="mt-8 block text-sm font-semibold text-mt-purple">Open tool</span></Link>)}</div></Container></section></main>;
}
