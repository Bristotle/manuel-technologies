import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const metadata: Metadata = { title: "GEO content brief generator", description: "Generate a practical SEO and GEO content brief with Grok, including search intent, entities, FAQs, internal links, and source requirements.", alternates: { canonical: "/free-tools/geo-content-brief" } };

export default function GeoContentBriefPage() { return <main><section className="border-b border-mt-border bg-white py-20 sm:py-28"><Container><SectionLabel>Free tool / GEO</SectionLabel><h1 className="mt-6 max-w-[18ch]">GEO content brief generator</h1><p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Give a page one clear search job. Generate the structure, evidence, questions, and links it needs before anyone starts drafting.</p></Container></section><section className="py-20 sm:py-28"><Container><ToolWorkspace tool="geo-brief" /></Container></section></main>; }
