import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BenchmarkChart } from "@/components/pseo/BenchmarkChart";
import { PUBLISHED_INDUSTRIES, getIndustry } from "@/lib/pseo/industries";
import { TIERS, ghs } from "@/lib/pricing";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

/* Persona page: what a website for one industry has to do, priced against
   our tiers, with the industry's own benchmark as proof that most of its
   peers get it wrong. The needs are written per industry in
   lib/pseo/industries.ts and gated there. */

export function generateStaticParams() {
  return PUBLISHED_INDUSTRIES.map((i) => ({ slug: i.slug }));
}

const pct = (n: number, of: number) => Math.round((n / of) * 100);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  const tier = TIERS.find((t) => t.slug === i.tier.slug)!;
  const title = `Website design for ${i.name} in ${i.market}`;
  return {
    title: { absolute: title.length > 45 ? title : `${title} | ${SITE.name}` },
    description: `What a website for ${i.name} in ${i.market} has to do, what it costs (${ghs(tier.from)} to ${ghs(tier.to)}), and a benchmark of ${i.benchmark.measurable} ${i.name} sites showing where most fall short.`,
    alternates: { canonical: `/websites-for/${i.slug}` },
    openGraph: { images: [ogCard(title, "Build")] },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();
  const b = i.benchmark;
  const M = b.measurable;
  const tier = TIERS.find((t) => t.slug === i.tier.slug)!;
  const url = `${SITE.url}/websites-for/${i.slug}`;
  const title = `Website design for ${i.name} in ${i.market}`;

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Service", name: title, serviceType: "Website design and development", provider: { "@type": "Organization", name: SITE.name, url: SITE.url }, areaServed: { "@type": "Country", name: i.market }, audience: { "@type": "BusinessAudience", audienceType: i.name }, offers: { "@type": "Offer", priceCurrency: "GHS", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "GHS", minPrice: tier.from, maxPrice: tier.to } }, url },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: i.faqs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Website development", item: `${SITE.url}/build/website-development` }, { "@type": "ListItem", position: 3, name: title, item: url }] },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link><span aria-hidden="true">/</span>
            <Link href="/build/website-development" className="hover:text-mt-purple">Website development</Link><span aria-hidden="true">/</span>
            <span>{i.name}</span>
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionLabel>Websites for {i.name}</SectionLabel>
              <h1 className="mt-6 max-w-[20ch]">{i.headline}</h1>
              <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{i.intro}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact">Get a fixed price</Button>
                <Button href="/free-audit" variant="secondary">Audit our current site</Button>
              </div>
              <p className="mt-8 text-[0.9375rem] leading-relaxed text-mt-slate">
                Usually the <Link href={`/pricing#${tier.slug}`} className="text-mt-purple hover:underline">{tier.name}</Link> tier, {ghs(tier.from)} to {ghs(tier.to)}. {i.tier.why}
              </p>
            </div>

            {/* The benchmark as the proof panel. */}
            <Link href={`/research/${i.slug}`} className="mt-lift group block rounded-[18px] border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-pink lg:translate-x-8">
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-pink-ink">( Our benchmark · {b.sampledAt} )</span>
              <p className="mt-4 text-4xl font-extrabold tracking-tight text-mt-ink">{pct(b.findings.notOneH1, M)}%</p>
              <p className="mt-1 text-[0.9375rem] font-semibold text-mt-ink">of {M} {i.name} websites in {i.market} do not have a single, clear H1</p>
              <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-mt-border pt-5">
                {[[`${pct(b.findings.noStructuredData, M)}%`, "no structured data"], [`${pct(b.findings.slowerThan1s, M)}%`, "slower than 1s"], [`${pct(b.findings.noOpenGraph, M)}%`, "no share image"]].map(([v, l]) => (
                  <div key={l}><dt className="text-xl font-extrabold tracking-tight text-mt-ink">{v}</dt><dd className="mt-1 text-xs leading-snug text-mt-slate">{l}</dd></div>
                ))}
              </dl>
              <span className="mt-5 inline-flex text-sm font-semibold text-mt-pink-ink group-hover:underline">Read the full benchmark →</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionLabel>What the site has to do</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">Five things {i.singular} needs that a template will not give it.</h2>
          <ol className="mt-reveal-group mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {i.needs.map((n, idx) => (
              <li key={n.title} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">0{idx + 1}</span>
                <h3 className="mt-4 !text-lg !tracking-tight">{n.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">{n.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionLabel accent="pink">How the market measures up</SectionLabel>
              <h2 className="mt-6 max-w-[20ch]">We measured {M} of them. Most fail the basics.</h2>
              <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-mt-slate">Original data from our audit engine, sampled {b.sampledAt}. No site is named. The bar is low, which is the opportunity: {i.singular} that gets the basics right starts ahead of most of its market on launch day.</p>
              <div className="mt-8"><Button href={`/research/${i.slug}`} variant="secondary">Read the full benchmark</Button></div>
            </div>
            <BenchmarkChart b={b} />
          </div>
        </Container>
      </section>

      {i.example ? (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Link href={i.example.href} className="mt-lift block overflow-hidden rounded-[18px] border border-mt-border bg-mt-surface">
                <div className="relative aspect-[16/10]"><Image src={i.example.src} alt={i.example.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" /></div>
              </Link>
              <div>
                <SectionLabel accent="pink">Delivered</SectionLabel>
                <h2 className="mt-6 max-w-[18ch]">{i.example.client}</h2>
                <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-mt-slate">{i.example.fact}.</p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20 sm:py-28">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">What {i.name} ask us.</h2>
          <div className="mt-12 max-w-[760px] border-t border-mt-border">
            {i.faqs.map((x) => (
              <details key={x.q} className="group border-b border-mt-border py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-semibold marker:hidden"><span>{x.q}</span><span aria-hidden="true" className="shrink-0 text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">{x.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact">Get a fixed price</Button>
            <Button href="/pricing" variant="secondary">See every tier</Button>
          </div>
          <p className="mt-10 text-sm text-mt-muted">Also: {PUBLISHED_INDUSTRIES.filter((x) => x.slug !== i.slug).map((x, n) => (<span key={x.slug}>{n > 0 ? " · " : ""}<Link href={`/websites-for/${x.slug}`} className="text-mt-purple hover:underline">websites for {x.name}</Link></span>))}</p>
        </Container>
      </section>
    </main>
  );
}
