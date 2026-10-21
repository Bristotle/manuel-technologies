import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MPOS } from "@/lib/mpos";
import { SITE } from "@/lib/site";
import { ogCard } from "@/lib/og";

/* --------------------------------------------------------------------------
   ManuelPOS, introduced, not duplicated. The product has its own site at
   mpos.bz, which is where people sign up, read the docs and see pricing.
   This page says what it is and who it is for, as proof that Manuel
   Technologies ships production software, and sends every action there.

   Every fact here is taken from mpos.bz as published on 21 October 2026.
   Two things are deliberately absent. There is no price, because ManuelPOS
   agrees each price with the business and publishes none. And there is no
   claim of GRA certification: ManuelPOS calculates VAT, NHIL and GETFund on
   receipts under the 2026 rules, which is a feature, not an approval.
   -------------------------------------------------------------------------- */

const TITLE = "ManuelPOS: point of sale for Ghanaian businesses";

export const metadata: Metadata = {
  title: { absolute: "ManuelPOS: point of sale built in Ghana | Manuel Technologies" },
  description: "ManuelPOS is our till, bookings and stock system for shops, salons, restaurants and pharmacies in Ghana. Works offline, takes MoMo to your own wallet.",
  alternates: { canonical: "/mpos" },
  openGraph: { images: [{ url: "/work/manuelpos.webp", width: 1200, height: 750, alt: "ManuelPOS point of sale" }, ogCard(TITLE, "Product")] },
};

export default function MposPage() {
  const url = `${SITE.url}/mpos`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ManuelPOS",
      url: MPOS.url,
      sameAs: [url],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, Web",
      description: MPOS.summary,
      image: `${SITE.url}/work/manuelpos.webp`,
      audience: { "@type": "BusinessAudience", audienceType: MPOS.businessTypes.map((b) => b.name).join(", ") },
      featureList: MPOS.features.map((f) => f.title),
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "ManuelPOS", item: url },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero, with the product itself as the evidence. */}
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
              <li><Link href="/" className="hover:text-mt-purple">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/work" className="hover:text-mt-purple">Work</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">ManuelPOS</li>
            </ol>
          </nav>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionLabel>Our product</SectionLabel>
              <h1 className="mt-6 max-w-[16ch]">A till that keeps selling when the network drops.</h1>
              <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{MPOS.summary}</p>
              <div className="mt-12 flex flex-wrap gap-4">
                <Button href={MPOS.url} external>Start the 14 day free trial</Button>
                <Button href={MPOS.pricingUrl} external variant="secondary">How pricing works</Button>
              </div>
              <p className="mt-6 text-sm text-mt-slate">Sign up, pricing and support all live at mpos.bz.</p>
            </div>
            <a href={MPOS.url} className="block overflow-hidden rounded-[18px] border border-mt-border bg-mt-surface transition-colors duration-150 hover:border-mt-purple">
              <Image src="/work/manuelpos.webp" alt="The ManuelPOS homepage, showing the till and the appointments screen" width={1200} height={750} priority sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
            </a>
          </div>
        </Container>
      </section>

      {/* Who it is for. Six business types: two rows of three. */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Who it is for</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">Set up for the way six kinds of business work.</h2>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            A business picks its type when it signs up, and ManuelPOS loads the screens and words for it.
          </p>
          <ul className="mt-reveal-group mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MPOS.businessTypes.map((b) => (
              <li key={b.name} className="rounded-[18px] border border-mt-border bg-white p-6">
                <h3 className="!text-xl !tracking-tight">{b.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">{b.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What it does, the parts that are hard to build. */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>What it does</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">Built for the conditions Ghanaian businesses actually trade in.</h2>
          <div className="mt-reveal-group mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {MPOS.features.map((f, i) => (
              <div key={f.title} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 !text-xl !tracking-tight">{f.title}</h3>
                <p className="mt-3 max-w-[65ch] leading-relaxed text-mt-slate">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How paying works. No price, because ManuelPOS publishes none. */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionLabel>How paying works</SectionLabel>
              <h2 className="mt-6 max-w-[18ch]">Pay once to own it. Renew yearly to stay connected.</h2>
              <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
                There is no price list and no monthly bill. Each business agrees one fee for setup and the licence, based on its size, tills and branches, paid by MoMo. A yearly renewal keeps the cloud, backups and support running. If a renewal is late, the till keeps selling.
              </p>
              <div className="mt-8">
                <Button href={MPOS.pricingUrl} external variant="secondary">Read how pricing works</Button>
              </div>
            </div>
            <ol className="flex flex-col gap-6">
              {MPOS.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-[18px] border border-mt-border bg-white p-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mt-purple font-[family-name:var(--font-mono)] text-xs text-mt-purple">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-mt-ink">{s.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-mt-slate">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Why it is on this site. */}
      <section className="border-t border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Why it is here</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">The same engineering, on software we run ourselves.</h2>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            ManuelPOS is designed, built and operated by Manuel Technologies. Offline sync, per-business data separation, role based access and tax worked out on every receipt are the same problems we solve in{" "}
            <Link href="/build/custom-software" className="text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">custom software</Link>{" "}
            for clients.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={MPOS.url} external>Try ManuelPOS free</Button>
            <Button href="/contact" variant="secondary">Talk to us about your own software</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
