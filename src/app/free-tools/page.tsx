import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/free-tools";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ogCard } from "@/lib/og";

export const metadata: Metadata = {
  openGraph: { images: [ogCard("Thirteen free tools, no email required", "Free tools")] },
  title: "Free SEO, GEO and performance tools",
  description: "Thirteen free tools: a live SEO and GEO audit, an AI crawler check, a gateway fee calculator, ROI and automation calculators, and four assessments. No account, no email gate.",
  alternates: { canonical: "/free-tools" },
};

const tools = TOOLS;

export default function FreeToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free tools",
    url: `${SITE.url}/free-tools`,
    description: metadata.description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: `${SITE.url}${t.href}` })),
    },
  };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32"><DotGrid fade="bottom" glowColor="#FF6B9D" /><Container className="relative"><SectionLabel accent="pink">Free tools</SectionLabel><h1 className="mt-6 max-w-[16ch]">Useful tools for the work before you buy.</h1><p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">Thirteen of them. Three run live against your site, the rest run entirely in your browser. No account, no email gate, nothing stored, and none of them are behind a form.</p></Container></section><section className="py-24 sm:py-32"><Container><div className="mt-reveal-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <Link key={tool.href} href={tool.href} className="mt-lift mt-spot group rounded-[18px] border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple"><span className="mt-label">{tool.label}</span><h2 className="mt-5 !text-2xl group-hover:text-mt-purple">{tool.title}</h2><p className="mt-4 leading-relaxed text-mt-slate">{tool.description}</p><span className="mt-8 inline-flex text-sm font-semibold text-mt-purple">Open tool</span></Link>)}</div></Container></section></main>;
}
