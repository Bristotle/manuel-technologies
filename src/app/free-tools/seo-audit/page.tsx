import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const metadata: Metadata = { title: "Technical SEO triage tool", description: "Turn your page facts into a prioritised technical SEO action plan with crawl, indexation, content, and performance checks.", alternates: { canonical: "/free-tools/seo-audit" } };

export default function SeoAuditPage() { return <main><section className="border-b border-mt-border bg-white py-20 sm:py-28"><Container><SectionLabel>Free tool / Grow</SectionLabel><h1 className="mt-6 max-w-[18ch]">Technical SEO triage</h1><p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Share the facts from one important page. Get a prioritised action plan without pretending a form can replace a real crawl.</p></Container></section><section className="py-20 sm:py-28"><Container><ToolWorkspace tool="seo-audit" /></Container></section></main>; }
