import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkProcess } from "@/components/WorkProcess";
import {
  getServicePage,
  RELATED_SERVICE_SLUGS,
  SERVICE_PAGES,
} from "@/lib/service-pages";
import { SITE } from "@/lib/site";
import { ACCENT, PILLAR_ACCENT } from "@/lib/accent";
import { ogCard } from "@/lib/og";

type PageProps = {
  params: Promise<{ pillar: string; service: string }>;
};

/* One delivered site per pillar, shown in every service hero under it.
   Each is checkable by opening the case study. */
const PROOF = {
  build: { src: "/work/impressiful.webp", alt: "Impressiful online store, built by Manuel Technologies", client: "Impressiful", fact: "1,000+ products", href: "/work/impressiful" },
  grow: { src: "/work/dementia-in-home.webp", alt: "Dementia In Home programmatic city pages, built by Manuel Technologies", client: "Dementia In Home", fact: "1,067 pages live", href: "/work/dementia-in-home" },
  scale: { src: "/work/cgt-experts.webp", alt: "Capital Gains Tax Experts calculator suite, built by Manuel Technologies", client: "Capital Gains Tax Experts", fact: "9 calculators", href: "/work/cgt-experts" },
} as const;

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ pillar, slug }) => ({ pillar, service: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pillar, service } = await params;
  const page = getServicePage(pillar, service);
  if (!page) return {};

  return {
    title: page.title.length > 38 ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: `/${page.pillar}/${page.slug}` },
    openGraph: {
      images: [ogCard(page.title, page.pillar.charAt(0).toUpperCase() + page.pillar.slice(1))],
      title: `${page.title} | ${SITE.name}`,
      description: page.description,
      url: `${SITE.url}/${page.pillar}/${page.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { pillar, service } = await params;
  const page = getServicePage(pillar, service);
  if (!page) notFound();

  const relatedServices = (RELATED_SERVICE_SLUGS[page.slug] || [])
    .map((slug) => SERVICE_PAGES.find((servicePage) => servicePage.slug === slug))
    .filter((servicePage) => servicePage !== undefined);

  const pageUrl = `${SITE.url}/${page.pillar}/${page.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.name,
      serviceType: page.name,
      description: page.description,
      provider: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
      areaServed: "Worldwide",
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: page.pillar, item: `${SITE.url}/${page.pillar}` },
        { "@type": "ListItem", position: 3, name: page.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  const proof = PROOF[page.pillar];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32">
        <DotGrid fade="bottom" glowColor={ACCENT[PILLAR_ACCENT[page.pillar]].glow} />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${page.pillar}`} className="hover:text-mt-purple">{page.pillar}</Link>
            <span aria-hidden="true">/</span>
            <span>{page.name}</span>
          </div>
          <div className="mt-12 max-w-[760px]">
            <SectionLabel accent={PILLAR_ACCENT[page.pillar]}>{page.pillar.toUpperCase()}</SectionLabel>
            <h1 className="mt-6">{page.title}</h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{page.intro}</p>
            <p className="mt-6 max-w-[65ch] font-semibold text-mt-ink">{page.audience}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/work" variant="secondary">See the work</Button>
            </div>
            {page.pillar === "build" ? (
              <p className="mt-8 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
                Prices are published.{" "}
                <Link href="/pricing" className="text-mt-purple hover:underline">
                  Four tiers from GHS 2,000, with what each includes
                </Link>
                , and a comparison against market rates.
              </p>
            ) : null}
            <p className="mt-8 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              Related reading:{" "}
              <Link href="/research/uk-accountancy-websites" className="text-mt-purple hover:underline">
                our study of 56 UK accountancy websites
              </Link>
              , covering AI crawler access, structured data and response times.
            </p>
          </div>
          </div>

          {/* Proof. A real site delivered under this pillar, the rule CLAUDE.md
              section 4 puts first and that all sixteen service pages broke
              until 17 September 2026. The card overlaps the hero edge on
              large screens: layer stacking, no shadow. */}
          <Link
            href={proof.href}
            className="mt-lift group relative block overflow-hidden rounded-[18px] border border-mt-border bg-white transition-colors duration-150 hover:border-mt-purple-light lg:translate-x-8"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-mt-surface">
              <Image src={proof.src} alt={proof.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-top" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-mt-border px-5 py-4">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-pink-ink">Delivered</span>
                <p className="mt-1 text-[0.9375rem] font-semibold text-mt-ink">{proof.client}</p>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted group-hover:text-mt-purple">{proof.fact} →</span>
            </div>
          </Link>
          </div>
        </Container>
      </section>

      {/* Who needs this and why. Written per service in service-pages.ts,
          and repeated as a question in the FAQ so answer engines can lift
          it. Sits before the process, because the reader has to decide
          they need the thing before they care how it is delivered. */}
      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel accent={PILLAR_ACCENT[page.pillar]}>Who this is for, and why</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">{page.audience}</h2>
          <ol className="mt-reveal-group mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {page.why.map((reason, index) => (
              <li key={reason} className="border-t border-mt-border pt-6">
                <span className={`font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] ${ACCENT[PILLAR_ACCENT[page.pillar]].text}`}>0{index + 1}</span>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-mt-slate">{reason}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionLabel>How the work runs</SectionLabel>
              <div className="mt-8 flex flex-col gap-8">
                {page.approach.map((step, index) => (
                  <div key={step} className="border-t border-mt-border pt-6">
                    <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">0{index + 1}</span>
                    <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>What you get</SectionLabel>
              <ul className="mt-8 flex flex-col gap-4 border-t border-mt-border pt-6">
                {page.deliverables.map((deliverable) => (
                  <li key={deliverable} className="border-b border-mt-border pb-4 text-base leading-relaxed">{deliverable}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <WorkProcess compact />

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Related services</SectionLabel>
          <h2 className="mt-6 max-w-[18ch]">Continue with the part that matters next.</h2>
          <div className="mt-reveal-group mt-10 grid gap-5 md:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/${related.pillar}/${related.slug}`}
                className="group border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple"
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple">
                  {related.name}
                </span>
                <p className="mt-4 text-base leading-relaxed text-mt-slate group-hover:text-mt-ink">
                  {related.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-mt-purple">
                  Explore the service
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Frequently asked questions</SectionLabel>
          <div className="mt-reveal-group mt-8 grid gap-8 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="border-t border-mt-border pt-6">
                <h2 className="!text-xl !tracking-tight">{faq.question}</h2>
                <p className="mt-4 text-mt-slate">{faq.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 border-t border-mt-border pt-8">
            <p className="max-w-[65ch] text-lg leading-relaxed">Have a specific brief, dataset, or existing system in mind?</p>
            <div className="mt-6"><Button href="/contact">Tell us what you are building</Button></div>
          </div>
        </Container>
      </section>
    </main>
  );
}
