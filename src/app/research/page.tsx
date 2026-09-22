import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PUBLISHED_INDUSTRIES } from "@/lib/pseo/industries";
import UK from "@/lib/research/uk-accountancy-2026.json";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description: "Original benchmarks of business websites, produced by our audit engine. Ghana law firms, hospitals, schools and real estate, plus 56 UK accountancy firms. No site named, method stated, data dated.",
  alternates: { canonical: "/research" },
  openGraph: { images: [ogCard("Research", "Research")] },
};

export default function ResearchIndex() {
  const studies = [
    ...PUBLISHED_INDUSTRIES.map((i) => ({ href: `/research/${i.slug}`, title: `State of ${i.name} websites in ${i.market}`, n: i.benchmark.measurable, date: i.benchmark.sampledAt, line: `${Math.round((i.benchmark.findings.notOneH1 / i.benchmark.measurable) * 100)}% without a single clear H1, median first byte ${(i.benchmark.findings.medianResponseMs / 1000).toFixed(1)}s.` })),
    { href: "/research/uk-accountancy-websites", title: "UK accountancy websites: an AI visibility study", n: UK.measurable, date: UK.sampledAt, line: `${UK.sampled - UK.measurable} of ${UK.sampled} could not be read by an identified crawler at all.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Research by Manuel Technologies", itemListElement: studies.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${SITE.url}${s.href}` })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <Container className="relative">
          <SectionLabel accent="pink">Research</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">Numbers nobody else in this market has.</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Every study here was produced by the same engine that powers our free audit, run across a stated sample, with the method written before the findings and no site named. They are dated, and they are re-run.</p>
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {studies.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="mt-lift mt-spot group flex h-full flex-col rounded-[18px] border border-mt-border bg-white p-7 transition-colors duration-150 hover:border-mt-pink">
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-pink-ink">( {s.n} sites · {s.date} )</span>
                  <h2 className="mt-4 !text-2xl !tracking-tight group-hover:text-mt-purple">{s.title}</h2>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-mt-slate">{s.line}</p>
                  <span className="mt-5 text-sm font-semibold text-mt-purple">Read the study →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
