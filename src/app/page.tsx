import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQTabs, FAQ_CATEGORIES } from "@/components/ui/faq-tabs";
import { ClientMarquee } from "@/components/ClientMarquee";
import { ClientSpotlight } from "@/components/ClientSpotlight";
import { HeroAudit } from "@/components/HeroAudit";
import ROUTE_DATES from "@/lib/route-dates.json";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { SelectedWork } from "@/components/SelectedWork";
import { WorkReel } from "@/components/WorkReel";
import { PillarStatement } from "@/components/PillarStatement";
import { PricingTeaser } from "@/components/PricingTeaser";
import { HOME_SEARCH } from "@/lib/pillar-statements";
import { DotGrid } from "@/components/ui/DotGrid";
import { ACCENT, PILLAR_ACCENT } from "@/lib/accent";
import { Integrations } from "@/components/Integrations";
import { PILLARS, SITE } from "@/lib/site";

/* One countable artefact per pillar, each traceable to real work.

   "9 tax calculators" was replaced because Emmanuel is right that it reads as
   though calculators are all we do. The replacement is broader but still
   countable: Impressiful alone carries over a thousand configured products,
   and the label names the range around it.

   NOT USED: "hundreds of web apps". There are six client builds. A prospect
   who counts is the prospect you least want to lose, and CLAUDE.md section 9
   is explicit that invented proof is the fastest way to lose a deal.

   The Grow figure was corrected upward. Dementia In Home's sitemap carries
   1,067 URLs, twenty city hubs at roughly fifty pages each. The previous "20"
   counted only the /cities index and badly understated the work. */
const PILLAR_PROOF: Record<string, { value: string; label: string; detail: string }> = {
  build: {
    value: "1,000+",
    label: "Products, pages and tools shipped",
    detail: "Ecommerce catalogues, tax calculators, caregiver platforms and property portals. Four markets, one standard.",
  },
  grow: {
    value: "1,067",
    label: "Programmatic pages live",
    detail: "Twenty city hubs at around fifty pages each, every one carrying real local pricing. Dementia In Home.",
  },
  scale: {
    value: "52",
    label: "Tools integrated",
    detail: "Systems we connect to, from CRMs to custom SQL, listed openly rather than described vaguely.",
  },
};

export default function Home() {
  const faqs = Object.values(FAQ_CATEGORIES).flatMap(
    (category) => category.questions,
  );
  /* WebPage carries the freshness signal. Organization does not take
     dateModified: it is not an expected property on that type, and inventing
     one would repeat the AutomationCompany mistake CLAUDE.md section 6 calls
     out. WebPage does take it, and the value comes from route-dates.json so
     there is no second date to keep in step. */
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/#webpage`,
    url: SITE.url,
    name: `${SITE.name} | ${SITE.tagline}`,
    description:
      "Websites and custom software, technical SEO and GEO, AI agents and automation, delivered under senior engineering ownership.",
    inLanguage: "en-GB",
    dateModified: (ROUTE_DATES as Record<string, string>)["/"],
    isPartOf: { "@type": "WebSite", url: SITE.url, name: SITE.name },
    about: { "@type": "Organization", name: SITE.name, url: SITE.url },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.url}/og-default.webp` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {/* Hero.

          The tagline is set as large as it can go before it breaks at 360px,
          which is what clamp() is protecting. It is the identity, so it earns
          the space.

          The four counters that sat under this are gone. Emmanuel's read was
          that they were not strong enough to make anyone reach out, and he is
          right: they described the site rather than the visitor's problem.
          The audit takes that place instead, full width, because it is the one
          thing on the page that does something for a stranger immediately.

          The right hand column is deliberately light for now. Not every
          visitor arrives for search, so it is held for something that speaks
          to the rest of them. */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <DotGrid fade="center" glow />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <SectionLabel>Working worldwide</SectionLabel>
              <h1 className="mt-reveal-display mt-8 flex flex-col !text-[clamp(4rem,19vw,7rem)] font-extrabold !leading-[0.86] !tracking-[-0.05em]">
                <span>Build.</span>
                <span>Grow.</span>
                <span className="text-mt-purple">Scale.</span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-[46ch] text-lg leading-relaxed text-mt-slate">
                Websites and custom software. SEO and GEO. AI agents and
                automation development. Built under{" "}
                <Link href="/about" className="text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
                  senior engineering ownership
                </Link>
                , not passed down to a junior.
              </p>
              <p className="mt-6 max-w-[46ch] text-lg font-semibold text-mt-ink">
                {SITE.proof}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact">Start a conversation</Button>
                <Button href="/work" variant="secondary">See our work</Button>
              </div>
              <p className="mt-6 text-[0.9375rem] text-mt-slate">
                Prices are published.{" "}
                <Link href="/pricing" className="font-semibold text-mt-purple hover:underline">
                  See the four tiers and care plans
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-mt-border pt-12">
            <HeroAudit />
          </div>
        </Container>
      </section>

      {/* Recent work, moving. REF diptell.com, 5 November 2026. */}
      <WorkReel />

      {/* What we do for search, in one sentence. REF diptell.com. */}
      <PillarStatement accent="teal" {...HOME_SEARCH} />

      {/* Pillars. The tagline doubles as the navigation.

          Rebuilt from a list of service names into a proof grid. Each pillar
          now carries one countable artefact from real client work, verifiable
          by opening the client's site, because CLAUDE.md section 4 asks every
          viewport for evidence rather than description and three cards of
          service names is a nav menu wearing a card. The service links stay,
          since they are what the section is for structurally. */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionLabel>What we do</SectionLabel>
            <h2 className="max-w-[24ch] !text-3xl sm:!text-4xl lg:text-right">
              Three pillars, and something{" "}
              <span className="text-mt-purple">shipped in each.</span>
            </h2>
          </div>

          <div className="mt-reveal-group mt-16 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => {
              const proof = PILLAR_PROOF[pillar.slug];
              const band = ACCENT[PILLAR_ACCENT[pillar.slug]];
              return (
                <Card key={pillar.slug} href={`/${pillar.slug}`} className="flex flex-col">
                  <SectionLabel accent={PILLAR_ACCENT[pillar.slug]}>{pillar.name.toUpperCase()}</SectionLabel>
                  <p className="mt-6 text-lg font-semibold leading-snug text-mt-ink">
                    {pillar.promise}
                  </p>

                  {/* The evidence, not a description of it. */}
                  <div className="mt-8 border-t border-mt-border pt-6">
                    <span className={`block text-3xl font-extrabold tracking-tight ${band.text}`}>
                      {proof.value}
                    </span>
                    <span className="mt-2 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">
                      {proof.label}
                    </span>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-mt-slate">
                      {proof.detail}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2 border-t border-mt-border pt-6">
                    {pillar.services.slice(0, 4).map((service) => (
                      <li
                        key={service.href}
                        className={`whitespace-nowrap rounded-[20px] border px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.12em] ${band.pill}`}
                      >
                        {service.name}
                      </li>
                    ))}
                    {pillar.services.length > 4 && (
                      <li className="self-center font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.12em] text-mt-muted">
                        +{pillar.services.length - 4} more
                      </li>
                    )}
                  </ul>

                  <span className={`mt-8 inline-flex text-sm font-semibold ${band.text}`}>
                    Explore {pillar.name}
                  </span>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Cut on 8 November 2026, because none of them helped a visitor
          decide: the funnel and engine diagrams (both repeated the pillars),
          the process, the 2,000px agency comparison (it has its own page,
          linked from the prices), fit and handover lists, enterprise
          standards (now on the five technical pages' remit) and the
          extension band (on /work). Components remain in the repo. */}
      <SelectedWork />

      <ClientSpotlight />

      <Integrations variant="surface" />

      <PricingTeaser />

      <section className="py-24 sm:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Container>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 max-w-[18ch]">
            What we build, grow, and scale.
          </h2>
          <p className="mt-8 max-w-[60ch] text-lg text-mt-slate">
            Clear answers about our services, technical SEO, GEO, software, and
            automation work.
          </p>

          <FAQTabs />

          <div className="mt-12">
            <Button href="/contact">Talk about your project</Button>
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* Trusted by sits here, immediately before the closing CTA. Proof is
          worth more at the point of decision than as an unearned claim four
          seconds after arrival. */}
      <ClientMarquee />

      <CallToAction />
    </main>
  );
}
