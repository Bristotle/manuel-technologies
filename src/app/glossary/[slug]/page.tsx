import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CLUSTER_NAMES, TERMS, getTerm } from "@/lib/glossary";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTerm(slug);
  if (!t) return {};
  const title = `What is ${t.term.replace(/ \(.*\)$/, "")}?`;
  return {
    title: { absolute: title.length > 45 ? title : `${title} | ${SITE.name}` },
    description: t.short.length > 158 ? t.short.slice(0, 155).replace(/\s\S*$/, "") + "." : t.short,
    alternates: { canonical: `/glossary/${t.slug}` },
    openGraph: { images: [ogCard(title, "Glossary")] },
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTerm(slug);
  if (!t) notFound();
  const url = `${SITE.url}/glossary/${t.slug}`;
  const question = `What is ${t.term.replace(/ \(.*\)$/, "")}?`;
  const related = t.related.map(getTerm).filter(Boolean) as typeof TERMS;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "DefinedTerm", name: t.term, description: t.short, url, inDefinedTermSet: { "@type": "DefinedTermSet", name: "Manuel Technologies glossary", url: `${SITE.url}/glossary` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: `${t.short} ${t.body[0]}` } }] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE.url}/glossary` }, { "@type": "ListItem", position: 3, name: t.term, item: url }] },
  ];
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <DotGrid fade="bottom" glowColor="#FF6B9D" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link><span aria-hidden="true">/</span>
            <Link href="/glossary" className="hover:text-mt-purple">Glossary</Link><span aria-hidden="true">/</span>
            <span>{CLUSTER_NAMES[t.cluster]}</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel accent="pink">{CLUSTER_NAMES[t.cluster]}</SectionLabel>
            <h1 className="mt-6">{question}</h1>
            <p className="mt-8 max-w-[65ch] text-xl leading-relaxed text-mt-ink">{t.short}</p>
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,680px)_280px]">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              {t.body.map((p) => <p key={p}>{p}</p>)}
              <div className="mt-4 flex flex-wrap gap-4">
                <Button href={t.where.href}>{t.where.label}</Button>
              </div>
            </div>
            <aside className="lg:sticky lg:top-24">
              <div className="border-l border-mt-border pl-6">
                <p className="mt-label">Related terms</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {related.map((r) => <li key={r.slug}><Link href={`/glossary/${r.slug}`} className="text-sm leading-snug text-mt-slate hover:text-mt-purple">{r.term}</Link></li>)}
                  <li><Link href="/glossary" className="text-sm font-semibold text-mt-purple">All {TERMS.length} terms</Link></li>
                </ul>
              </div>
              <div className="mt-10 rounded-[18px] border border-mt-border bg-white p-6">
                <span className="mt-label">( Check your own site )</span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">Twenty checks in about fifteen seconds. No account, nothing stored.</p>
                <div className="mt-4"><Button href="/free-audit" variant="secondary">Run the free audit</Button></div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
