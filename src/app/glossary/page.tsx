import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CLUSTER_NAMES, TERMS } from "@/lib/glossary";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossary",
  description: `${TERMS.length} plain English definitions of the terms behind websites, search visibility, AI automation and online payments, each linked to where it matters.`,
  alternates: { canonical: "/glossary" },
  openGraph: { images: [ogCard("Glossary", "Research")] },
};

export default function GlossaryIndex() {
  const clusters = Object.keys(CLUSTER_NAMES) as (keyof typeof CLUSTER_NAMES)[];
  const jsonLd = { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Manuel Technologies glossary", url: `${SITE.url}/glossary`, hasDefinedTerm: TERMS.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.short, url: `${SITE.url}/glossary/${t.slug}` })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <Container className="relative">
          <SectionLabel accent="pink">Glossary</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">The terms, in plain English.</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{TERMS.length} definitions, each one sentence first and then the part that matters for a business, with a link to where the thing is actually done on this site.</p>
        </Container>
      </section>
      {clusters.map((c) => (
        <section key={c} className="border-b border-mt-border py-16 sm:py-20">
          <Container>
            <SectionLabel accent="pink">{CLUSTER_NAMES[c]}</SectionLabel>
            <ul className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
              {TERMS.filter((t) => t.cluster === c).map((t) => (
                <li key={t.slug} className="border-t border-mt-border pt-5">
                  <Link href={`/glossary/${t.slug}`} className="group block">
                    <h2 className="!text-lg !tracking-tight group-hover:text-mt-purple">{t.term}</h2>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-mt-slate">{t.short}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}
    </main>
  );
}
