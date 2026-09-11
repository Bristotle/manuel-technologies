import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CurrencyScope } from "@/components/pricing/CurrencyScope";
import { Price } from "@/components/pricing/Price";
import {
  CARE_PLANS,
  MARKET,
  NOT_INCLUDED,
  PAYMENT_TERMS,
  PRICE_BAND,
  PRICING_FAQS,
  PROMISES,
  RATES,
  TIERS,
  ghs,
} from "@/lib/pricing";
import { SITE } from "@/lib/site";
import { ogCard } from "@/lib/og";

/* /pricing. The pillar of the website cost cluster.
   ---------------------------------------------------------------------------
   Targets: website development price in ghana, cost of website design in
   ghana, website design prices in ghana, website development packages.

   THE H1 CARRIES THE PRICE BAND. Someone searching a price query wants the
   number, and a slogan in its place is the first reason to hit back. The
   band is read from the tier data so it cannot drift.

   EVERY NUMBER COMES FROM lib/pricing.ts. Tiers, care plans, exclusions,
   terms, competitor figures and the exchange rate. Nothing is typed here.

   THE COMPARISON IS HONEST OR IT IS NOTHING. Only firms whose pricing page
   was fetched directly on the recorded date are listed, with a link to the
   page. Where they are cheaper, the table says so. A comparison a prospect
   can check and finds selective is worse than no comparison.

   PROOF PER TIER. Every tier shows a real site delivered at that tier,
   assigned by Emmanuel: Starter is Capital Gains Tax Experts, Business is
   Miyaki Beauty, Online store is Impressiful, Custom is Fold (getfold.org),
   a church management PWA. Fold links to the live site until it has a case
   study. CLAUDE.md section 4.
   -------------------------------------------------------------------------- */

const TITLE = `Website design and development prices in Ghana, ${ghs(PRICE_BAND.from)} to ${ghs(PRICE_BAND.to)}`;

export const metadata: Metadata = {
  title: { absolute: `Website prices in Ghana, ${ghs(PRICE_BAND.from)} to ${ghs(PRICE_BAND.to)}` },
  description: `Published website prices in Ghana. Four tiers from ${ghs(PRICE_BAND.from)}, care plans from GHS 299 a month, what is excluded, and a comparison against market rates.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `${TITLE} | ${SITE.name}`,
    description: `Four tiers, care plans, what is excluded, and how the prices compare to published market rates.`,
    url: `${SITE.url}/pricing`,
    images: [ogCard(TITLE, "Pricing"), { url: `${SITE.url}/work/miyaki-beauty.webp`, width: 1200, height: 750, alt: "Miyaki Beauty online store, built by Manuel Technologies" }],
  },
};

export default function Pricing() {
  const url = `${SITE.url}/pricing`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: TITLE,
      url,
      description: metadata.description,
      dateModified: "2026-09-11",
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website design and development",
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
      areaServed: { "@type": "Country", name: "Ghana" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website packages",
        itemListElement: TIERS.map((t) => ({
          "@type": "Offer",
          name: t.name,
          description: t.summary,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "GHS",
            minPrice: t.from,
            maxPrice: t.to,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PRICING_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Pricing", item: url },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero. The H1 is the price band. */}
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <h1 className="max-w-[24ch]">
            Pro level website developments and design prices ranging from{" "}
            <span className="text-mt-purple">
              {ghs(PRICE_BAND.from)} to {ghs(PRICE_BAND.to)}.
            </span>
          </h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            Four tiers, each with what is included written out. Care plans
            from GHS 299 a month. What is not included, so it never appears on
            an invoice as a surprise. And a comparison against published market
            rates, with links, so you can check it.
          </p>
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-24 sm:py-32">
        <Container>
          <CurrencyScope>
            <div className="mt-reveal-group mt-12 grid gap-6 md:grid-cols-2">
              {TIERS.map((t) => (
                <article
                  key={t.slug}
                  id={t.slug}
                  className="mt-lift flex flex-col overflow-hidden rounded-[18px] border border-mt-border bg-white transition-colors duration-150 hover:border-mt-purple-light"
                >
                  {t.proof.href.startsWith("http") ? (
                    <a href={t.proof.href} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[16/10] overflow-hidden bg-mt-surface">
                      <Image src={t.proof.src} alt={t.proof.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                      <span className="absolute left-4 top-4 rounded-full bg-mt-ink/85 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                        Built at this tier: {t.proof.client}
                      </span>
                    </a>
                  ) : (
                    <Link href={t.proof.href} className="group relative block aspect-[16/10] overflow-hidden bg-mt-surface">
                      <Image
                        src={t.proof.src}
                        alt={t.proof.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-mt-ink/85 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                        Built at this tier: {t.proof.client}
                      </span>
                    </Link>
                  )}

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <span className="mt-label">( {t.name} )</span>
                    <p className="mt-4 text-2xl font-extrabold tracking-tight text-mt-ink sm:text-3xl">
                      <Price from={t.from} to={t.to} />
                    </p>
                    {t.quoted ? (
                      <p className="mt-1 text-sm text-mt-muted">Typical range. Quoted after a scoping call.</p>
                    ) : null}
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">{t.summary}</p>

                    <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                      {t.includes.map((line) => (
                        <li key={line} className="flex gap-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                          <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-mt-purple" />
                          {line}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-mt-border pt-5">
                      <div>
                        <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Timeline</dt>
                        <dd className="mt-1 text-sm text-mt-ink">{t.timeline}</dd>
                      </div>
                      <div>
                        <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Revisions</dt>
                        <dd className="mt-1 text-sm text-mt-ink">{t.revisions}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>

            {/* The two lines that do the selling */}
            <div className="mt-12 flex flex-col gap-4 border-l-4 border-mt-purple pl-6">
              {PROMISES.map((p) => (
                <p key={p} className="max-w-[65ch] text-lg font-semibold leading-relaxed text-mt-ink">{p}</p>
              ))}
            </div>

            {/* Care plans */}
            <div id="care-plans" className="mt-24 scroll-mt-8">
              <SectionLabel>Care plans</SectionLabel>
              <h2 className="mt-6 max-w-[24ch]">
                What it costs to keep it{" "}
                <span className="text-mt-purple">working, ranking and answered.</span>
              </h2>
              <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
                A website is not finished at launch. Software gets patched, backups
                get taken, and somebody answers when a form stops sending. Monthly,
                cancel with 30 days notice, and the site is yours either way.
              </p>
              <div className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border md:grid-cols-3">
                {CARE_PLANS.map((c) => (
                  <div key={c.name} className="flex flex-col bg-white p-6 sm:p-8">
                    <span className="mt-label">( {c.name} )</span>
                    <p className="mt-4 text-2xl font-extrabold tracking-tight text-mt-ink">
                      <Price value={c.monthly} per="mo" from={c.from} />
                    </p>
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {c.includes.map((line) => (
                        <li key={line} className="flex gap-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                          <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-mt-purple" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CurrencyScope>
        </Container>
      </section>

      {/* Not included + payment terms */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel>Not included</SectionLabel>
              <h2 className="mt-6 max-w-[20ch]">Stated here so it never surprises you on an invoice.</h2>
              <ul className="mt-10 flex flex-col divide-y divide-mt-border border-y border-mt-border">
                {NOT_INCLUDED.map((x) => (
                  <li key={x} className="py-3.5 text-[0.9375rem] text-mt-slate">{x}</li>
                ))}
              </ul>
              <p className="mt-6 max-w-[55ch] text-[0.9375rem] leading-relaxed text-mt-muted">
                Copywriting and photography can be quoted separately. Gateway
                charges are set by the payment provider, not by us, and are
                explained before a store goes live.
              </p>
            </div>
            <div>
              <SectionLabel>Payment terms</SectionLabel>
              <h2 className="mt-6 max-w-[20ch]">Half to start, half at launch.</h2>
              <dl className="mt-10 flex flex-col divide-y divide-mt-border border-y border-mt-border">
                {PAYMENT_TERMS.map((p) => (
                  <div key={p.term} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                    <dt className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-mt-purple">{p.term}</dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-mt-slate">{p.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* How we compare */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>How we compare</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">
            Against published market rates,{" "}
            <span className="text-mt-purple">with the links so you can check.</span>
          </h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            Only firms whose pricing pages could be fetched and read on{" "}
            {MARKET.checked} are listed, and the figures are quoted as published.
            Where they are cheaper, the table says so. The difference is in what
            each price includes, which is why ours are written out above.
          </p>

          <div className="mt-12 overflow-x-auto rounded-[18px] border border-mt-border bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-mt-border">
                  {["Firm", "Starter", "Business site", "Online store", "Custom", "Care or maintenance"].map((h) => (
                    <th key={h} className="px-5 py-4 font-[family-name:var(--font-mono)] text-[0.625rem] font-bold uppercase tracking-[0.14em] text-mt-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-mt-border">
                <tr className="bg-mt-surface">
                  <td className="px-5 py-4 font-semibold text-mt-ink">Manuel Technologies</td>
                  <td className="px-5 py-4 text-mt-ink">{ghs(TIERS[0].from)} to {TIERS[0].to.toLocaleString("en-GB")}</td>
                  <td className="px-5 py-4 text-mt-ink">{ghs(TIERS[1].from)} to {TIERS[1].to.toLocaleString("en-GB")}</td>
                  <td className="px-5 py-4 text-mt-ink">{ghs(TIERS[2].from)} to {TIERS[2].to.toLocaleString("en-GB")}</td>
                  <td className="px-5 py-4 text-mt-ink">{ghs(TIERS[3].from)} to {TIERS[3].to.toLocaleString("en-GB")}</td>
                  <td className="px-5 py-4 text-mt-ink">GHS 299 to 499 a month</td>
                </tr>
                {MARKET.rows.map((r) => (
                  <tr key={r.firm}>
                    <td className="px-5 py-4 align-top">
                      <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-mt-ink underline decoration-mt-border underline-offset-4 hover:text-mt-purple">{r.firm}</a>
                      <span className="mt-1 block max-w-[28ch] text-xs leading-relaxed text-mt-muted">{r.note}</span>
                    </td>
                    <td className="px-5 py-4 align-top text-mt-slate">{r.starter}</td>
                    <td className="px-5 py-4 align-top text-mt-slate">{r.business}</td>
                    <td className="px-5 py-4 align-top text-mt-slate">{r.store}</td>
                    <td className="px-5 py-4 align-top text-mt-slate">{r.custom}</td>
                    <td className="px-5 py-4 align-top text-mt-slate">{r.care}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex max-w-[65ch] flex-col gap-4 text-[0.9375rem] leading-relaxed text-mt-slate">
            <p>
              <strong className="text-mt-ink">Where we are more expensive.</strong> Our
              Starter tier is above JobHouse&rsquo;s two simple sites and above the
              bottom of Faciotech&rsquo;s starter range. What the difference buys is
              a custom layout rather than a template, testing on real phones from
              320px, and the same engineer before and after launch.
            </p>
            <p>
              <strong className="text-mt-ink">Where we are cheaper.</strong> Our Online
              store range starts below Faciotech&rsquo;s and our Custom range starts
              below theirs. Our care plans are a fifth of the GHS 1,500 a month their
              guide recommends, because hosting a well built site does not cost
              that much and we would rather say so.
            </p>
            <p>
              <strong className="text-mt-ink">The one worth noticing.</strong> A
              published online store price identical to a brochure site price means
              the store is a brochure with a buy button. Payments, stock, checkout
              failure and order handling are the expensive part of a store, and
              they are what our{" "}
              <Link href="#store" className="text-mt-purple hover:underline">Online store tier</Link>{" "}
              is priced for.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions people ask</SectionLabel>
          <h2 className="mt-6 max-w-[18ch]">The pricing questions, answered directly.</h2>
          <div className="mt-12 max-w-[760px] border-t border-mt-border">
            {PRICING_FAQS.map((f) => (
              <details key={f.q} className="group border-b border-mt-border py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-semibold marker:hidden">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0 text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">{f.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-10 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-muted">
            For the longer version, read{" "}
            <Link href="/blog/how-much-does-a-website-cost-in-ghana" className="text-mt-purple hover:underline">
              how much a website costs in Ghana in 2026
            </Link>{" "}
            and{" "}
            <Link href="/blog/website-maintenance-cost-ghana" className="text-mt-purple hover:underline">
              what you should pay monthly to maintain one
            </Link>
            . Currency guide rates from {RATES.source.label}, {RATES.checked}.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>Next step</SectionLabel>
          <h2 className="mt-6">Tell us what the site has to do. You will get a fixed price back.</h2>
          <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-mt-slate">
            Not an estimate that grows. A price, what it includes, a timeline,
            and the name of the engineer who will build it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Get a fixed price</Button>
            <Button href="/work" variant="secondary">See the work first</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
