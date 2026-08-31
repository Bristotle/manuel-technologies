import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { DotGrid } from "@/components/ui/DotGrid";
import { IntegrationLogo } from "@/components/ui/IntegrationLogo";
import {
  INTEGRATION_CATEGORIES,
  INTEGRATIONS,
} from "@/lib/integrations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Integrations · ${INTEGRATIONS.length} systems we build against`,
  description:
    "The CRMs, billing systems, automation platforms, AI models, data stores and ad platforms Manuel Technologies integrates and automates against.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: `Integrations | ${SITE.name}`,
    description: `${INTEGRATIONS.length} systems we connect, automate, and build middleware for.`,
    url: `${SITE.url}/integrations`,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Integrations | ${SITE.name}`,
    url: `${SITE.url}/integrations`,
    description: `${INTEGRATIONS.length} systems Manuel Technologies integrates and automates against.`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: INTEGRATIONS.length,
      itemListElement: INTEGRATIONS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32">
        <DotGrid fade="center" />
        <Container className="relative">
          <SectionLabel>Integrations</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">
            We connect to what you already run.
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-mt-slate">
            {INTEGRATIONS.length} systems across{" "}
            {INTEGRATION_CATEGORIES.length} categories. Every one of these is
            something we have built against, not a catalogue copied from an
            automation vendor. Where a connector does not exist, we write the
            middleware.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Ask about your stack</Button>
            <Button href="/scale" variant="secondary">
              See the Scale pillar
            </Button>
          </div>
        </Container>
      </section>

      {INTEGRATION_CATEGORIES.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          className={`border-b border-mt-border py-20 sm:py-24 ${
            index % 2 === 1 ? "bg-mt-surface" : "bg-white"
          }`}
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
              <div>
                <SectionLabel>{category.name}</SectionLabel>
                <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-mt-slate">
                  {category.intro}
                </p>
                <p className="mt-5 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted">
                  ( {category.items.length} systems )
                </p>
              </div>

              <ul className="grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border sm:grid-cols-2 mt-reveal-group">
                {category.items.map((item) => (
                  <li key={item.slug} className="bg-white">
                    <a
                      href={item.url}
                      rel="noopener"
                      className="flex h-full gap-4 p-5 transition-colors duration-150 hover:bg-mt-surface"
                    >
                      <span className="shrink-0">
                        <IntegrationLogo item={item} />
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="text-base font-semibold leading-snug text-mt-ink">
                          {item.name}
                        </span>
                        <span className="text-[0.875rem] leading-relaxed text-mt-slate">
                          {item.blurb}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-mt-purple py-24 text-white sm:py-32">
        <Container>
          <SectionLabel>Not listed</SectionLabel>
          <h2 className="mt-6 max-w-[20ch] text-white">
            The one you need is probably still possible.
          </h2>
          <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-white/80">
            This list is what we have built against, not the limit of what we
            can build against. Anything with a documented API, a webhook, or
            even a CSV export on a schedule can be automated. Tell us what you
            run and we will tell you honestly whether it is worth doing.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-white px-6 py-3.5 text-base font-semibold text-mt-purple transition-colors duration-150 hover:bg-mt-surface active:bg-mt-border"
            >
              Tell us your stack
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
