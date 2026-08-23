import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PILLARS, SITE, type Pillar } from "@/lib/site";

function get(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

export function pillarMetadata(slug: string): Metadata {
  const pillar = get(slug);
  if (!pillar) return {};
  return {
    title: `${pillar.name} · ${pillar.promise}`,
    description: pillar.intro,
    alternates: { canonical: `/${pillar.slug}` },
    openGraph: {
      title: `${pillar.name} | ${SITE.name}`,
      description: pillar.intro,
      url: `${SITE.url}/${pillar.slug}`,
    },
  };
}

export function PillarHub({ slug }: { slug: string }) {
  const pillar = get(slug);
  if (!pillar) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pillar.name,
        item: `${SITE.url}/${pillar.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>{pillar.name.toUpperCase()}</SectionLabel>
          <h1 className="mt-6 max-w-[16ch]">{pillar.promise}</h1>
          <p className="mt-8 max-w-[60ch] text-lg text-mt-slate">
            {pillar.intro}
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Services</SectionLabel>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillar.services.map((s) => (
              <Card key={s.href} href={s.href}>
                <h2 className="!text-base !tracking-tight">{s.name}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                  {s.blurb}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Button href={`mailto:${SITE.email}`}>Start a conversation</Button>
            <Button href="/work" variant="secondary">
              See the work
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
