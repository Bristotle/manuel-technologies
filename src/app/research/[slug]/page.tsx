import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BenchmarkChart, benchmarkBars } from "@/components/pseo/BenchmarkChart";
import { PUBLISHED_INDUSTRIES, getIndustry } from "@/lib/pseo/industries";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

/* Benchmark page. Every number is read from the committed JSON the engine
   wrote; nothing is typed here, so the page cannot drift from the study.
   No site is named. The method is stated before the findings, because a
   study that hides its method is a press release. */

export function generateStaticParams() {
  return PUBLISHED_INDUSTRIES.map((i) => ({ slug: i.slug }));
}

const pct = (n: number, of: number) => Math.round((n / of) * 100);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  const b = i.benchmark;
  const title = `State of ${i.name} websites in ${i.market}, ${b.sampledAt.slice(0, 4)}`;
  return {
    title: { absolute: `${title} | ${SITE.name}`.length > 60 ? title : `${title} | ${SITE.name}` },
    description: `We measured ${b.measurable} ${i.name} websites in ${i.market}: ${pct(b.findings.notOneH1, b.measurable)}% without a single clear H1, ${pct(b.findings.noStructuredData, b.measurable)}% with no structured data, median first byte ${(b.findings.medianResponseMs / 1000).toFixed(1)}s. Original data, sampled ${b.sampledAt}.`,
    alternates: { canonical: `/research/${i.slug}` },
    openGraph: { type: "article", images: [ogCard(title, "Research")] },
  };
}

export default async function BenchmarkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();
  const b = i.benchmark;
  const f = b.findings;
  const M = b.measurable;
  const url = `${SITE.url}/research/${i.slug}`;
  const title = `State of ${i.name} websites in ${i.market}, ${b.sampledAt.slice(0, 4)}`;
  const bars = benchmarkBars(b);
  const worst = [...bars].sort((a, c) => c.value - a.value)[0];

  const faqs = [
    { q: `How were the ${b.sampled} ${i.name} chosen?`, a: b.frame },
    { q: "Why are percentages over measurable sites rather than all sampled?", a: `${b.sampled - M} of ${b.sampled} could not be measured: ${b.refused} refused the request or returned an error and ${b.challenged} served a bot protection page instead of the site. Reporting a site as failing a check we could not run would be dishonest, so every percentage is over the ${M} that could be read.` },
    { q: "Are the response times reliable?", a: "Each is time to first byte from one location on one attempt, including DNS, TLS and redirects. It is not a lab benchmark and a second run would move individual numbers. The distribution is stable enough to say how many sites are slow, which is the claim being made." },
    { q: "Why are no companies named?", a: "The study reports distributions, not a league table. Naming businesses for technical faults would be a cheap way to get attention and an expensive way to lose an industry's goodwill, and some flags are measurement artefacts rather than faults." },
    { q: "Can I check my own site against this?", a: "Yes. The free audit on this site is the same engine that produced these numbers, so the result is directly comparable." },
  ];

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, url, datePublished: b.sampledAt, dateModified: i.modified, author: { "@type": "Organization", name: SITE.name, url: SITE.url }, publisher: { "@type": "Organization", name: SITE.name, url: SITE.url }, isBasedOn: { "@type": "Dataset", name: `${i.name} website benchmark, ${i.market}, ${b.sampledAt}`, description: `Technical audit of ${b.sampled} ${i.name} websites in ${i.market} covering crawler access, structured data, discovery and response time.`, temporalCoverage: b.sampledAt, creator: { "@type": "Organization", name: SITE.name } } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Research", item: `${SITE.url}/research` }, { "@type": "ListItem", position: 3, name: title, item: url }] },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <DotGrid fade="bottom" glowColor="#FF6B9D" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link><span aria-hidden="true">/</span>
            <Link href="/research" className="hover:text-mt-purple">Research</Link><span aria-hidden="true">/</span>
            <span>{i.name}</span>
          </div>
          <div className="mt-10 max-w-[820px]">
            <SectionLabel accent="pink">Original research · sampled {b.sampledAt}</SectionLabel>
            <h1 className="mt-6">
              We measured {M} {i.name} websites in {i.market}.{" "}
              <span className="text-mt-purple">{pct(worst.value, M)}% fail the most basic check.</span>
            </h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              {worst.value} of {M} {worst.label.toLowerCase().startsWith("more") ? "do not have a single, clear H1" : worst.label.toLowerCase()}. {f.noStructuredData} have no structured data at all, so nothing on them can appear as a rich result. Median time to first byte is {(f.medianResponseMs / 1000).toFixed(1)} seconds. Every number below comes from our audit engine, and the method is stated before the findings.
            </p>
          </div>
          <dl className="mt-14 grid gap-8 border-t border-mt-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[[String(b.sampled), "Sites sampled"], [String(M), "Could be measured"], [`${(f.medianResponseMs / 1000).toFixed(1)}s`, "Median first byte"], [String(f.medianScore), "Median audit score"]].map(([v, l]) => (
              <div key={l}>
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">{l}</dt>
                <dd className="mt-2 text-3xl font-extrabold tracking-tight text-mt-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container size="prose">
          <SectionLabel accent="pink">Method</SectionLabel>
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>{b.frame}</p>
            <p>Each site was fetched once by an identified crawler that obeys robots.txt, and its homepage, robots.txt and sitemap were measured by the same engine that powers our <Link href="/free-audit" className="text-mt-purple hover:underline">free audit</Link>. {b.sampled - M > 0 ? `${b.sampled - M} of ${b.sampled} could not be measured: ${b.refused} refused or errored and ${b.challenged} served a bot protection page. ` : `All ${b.sampled} could be measured. `}Every percentage is over the {M} measurable sites. No site is named.</p>
          </div>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-20 sm:py-24">
        <Container>
          <SectionLabel accent="pink">What we found</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">Eight checks, none of which need a budget to pass.</h2>
          <div className="mt-10"><BenchmarkChart b={b} /></div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { k: "Structure", v: `${f.notOneH1} of ${M} do not have exactly one H1. ${f.noMetaDescription} have no meta description and ${f.noCanonical} no canonical tag. These are the cheapest signals a page can send about what it is, and most sites are not sending them.` },
              { k: "Discovery", v: `${f.noSitemap} have no XML sitemap and ${f.noRobots} no robots.txt. ${f.noStructuredData} carry no structured data, and only ${f.localBusinessSchema} declare the organisation in schema, so ${M - f.localBusinessSchema} are anonymous to an answer engine.` },
              { k: "Speed and sharing", v: `${f.slowerThan1s} take over a second to return their first byte and ${f.slowerThan3s} over three. ${f.noOpenGraph} have no share image, so every link posted to WhatsApp or LinkedIn arrives as a blank card. Median page is ${f.medianHtmlKb}KB of HTML carrying ${f.medianWordCount} words.` },
            ].map((x) => (
              <div key={x.k} className="border-t border-mt-border pt-6">
                <span className="mt-label">( {x.k} )</span>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">{x.v}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container size="prose">
          <SectionLabel accent="pink">What it means for {i.singular}</SectionLabel>
          <h2 className="mt-6">The bar is low, which is the opportunity.</h2>
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>None of the eight checks costs money to pass. They are the difference between a site that was built and a site that was built properly, and in this sample the properly built ones are the minority. {i.singular.charAt(0).toUpperCase() + i.singular.slice(1)} that fixes the basics starts ahead of most of its market on the day it launches.</p>
            <p>We wrote out what a website for {i.name} in {i.market} actually has to do, and what it costs, at{" "}
              <Link href={`/websites-for/${i.slug}`} className="text-mt-purple hover:underline">websites for {i.name}</Link>. Or run your own site through the <Link href="/free-audit" className="text-mt-purple hover:underline">free audit</Link> and compare it to these numbers directly.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/free-audit">Audit my site against this</Button>
            <Button href={`/websites-for/${i.slug}`} variant="secondary">What {i.name} need</Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-mt-border bg-white py-20 sm:py-24">
        <Container>
          <SectionLabel accent="pink">Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">About the method.</h2>
          <div className="mt-12 max-w-[760px] border-t border-mt-border">
            {faqs.map((x) => (
              <details key={x.q} className="group border-b border-mt-border py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-semibold marker:hidden"><span>{x.q}</span><span aria-hidden="true" className="shrink-0 text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">{x.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-sm text-mt-muted">Other benchmarks: {PUBLISHED_INDUSTRIES.filter((x) => x.slug !== i.slug).map((x, n) => (<span key={x.slug}>{n > 0 ? " · " : ""}<Link href={`/research/${x.slug}`} className="text-mt-purple hover:underline">{x.name}</Link></span>))} · <Link href="/research/uk-accountancy-websites" className="text-mt-purple hover:underline">UK accountancy firms</Link></p>
        </Container>
      </section>
    </main>
  );
}
