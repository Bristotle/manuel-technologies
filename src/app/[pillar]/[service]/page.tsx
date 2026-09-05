import type { Metadata } from "next";
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

type PageProps = {
  params: Promise<{ pillar: string; service: string }>;
};

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ pillar, slug }) => ({ pillar, service: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pillar, service } = await params;
  const page = getServicePage(pillar, service);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.pillar}/${page.slug}` },
    openGraph: {
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

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${page.pillar}`} className="hover:text-mt-purple">{page.pillar}</Link>
            <span aria-hidden="true">/</span>
            <span>{page.name}</span>
          </div>
          <div className="mt-12 max-w-[760px]">
            <SectionLabel>{page.pillar.toUpperCase()}</SectionLabel>
            <h1 className="mt-6">{page.title}</h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{page.intro}</p>
            <p className="mt-6 max-w-[65ch] font-semibold text-mt-ink">{page.audience}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/work" variant="secondary">See the work</Button>
            </div>
            <p className="mt-8 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              Related reading:{" "}
              <Link href="/research/uk-accountancy-websites" className="text-mt-purple hover:underline">
                our study of 56 UK accountancy websites
              </Link>
              , covering AI crawler access, structured data and response times.
            </p>
          </div>
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
