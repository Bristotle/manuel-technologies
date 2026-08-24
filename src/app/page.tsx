import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Marquee } from "@/components/ui/Marquee";
import { FAQTabs, FAQ_CATEGORIES } from "@/components/ui/faq-tabs";
import { WorkProcess } from "@/components/WorkProcess";
import { CAPABILITIES, PILLARS, SITE } from "@/lib/site";

const STANDARDS = [
  {
    title: "Data security",
    body: "Your data stays yours. Private infrastructure and secure API protocols, so nothing leaks to public models.",
  },
  {
    title: "Legacy compatibility",
    body: "Agents plug into what you already run. Salesforce, HubSpot, custom SQL, internal ERPs, via custom middleware.",
  },
  {
    title: "Built to scale",
    body: "No brittle no-code templates. Production grade code, designed to handle real traffic without breaking.",
  },
];

export default function Home() {
  const faqs = Object.values(FAQ_CATEGORIES).flatMap(
    (category) => category.questions,
  );
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
      {/* Hero. The tagline is the H1. Nothing restates it underneath. */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <SectionLabel>Working worldwide</SectionLabel>
              <h1 className="mt-8 flex flex-col leading-[0.92] tracking-[-0.04em]">
                <span>Build.</span>
                <span>Grow.</span>
                <span className="text-mt-purple">Scale.</span>
              </h1>
            </div>

            <div className="lg:pb-3">
              <p className="max-w-[52ch] text-lg leading-relaxed text-mt-slate">
                Websites and custom software. SEO and GEO. AI agents and
                automation development. Built by an engineer who does this
                professionally, not an agency passing your work to a junior.
              </p>
              <p className="mt-6 max-w-[52ch] text-lg font-semibold text-mt-ink">
                {SITE.proof}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact">
                  Start a conversation
                </Button>
                <Button href="/work" variant="secondary">
                  See our work
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Marquee items={CAPABILITIES} />

      {/* Pillars. The tagline doubles as the navigation. */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>What we do</SectionLabel>
          <h2 className="mt-6 max-w-[18ch]">
            Three pillars. Professional engineering across all of them.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <Card key={pillar.slug} href={`/${pillar.slug}`}>
                <SectionLabel>{pillar.name.toUpperCase()}</SectionLabel>
                <p className="mt-4 text-base font-semibold leading-snug">
                  {pillar.promise}
                </p>
                <ul className="mt-5 flex flex-col gap-2 text-[0.9375rem] text-mt-slate">
                  {pillar.services.slice(0, 4).map((s) => (
                    <li key={s.href}>{s.name}</li>
                  ))}
                  {pillar.services.length > 4 && (
                    <li className="text-mt-muted">
                      and {pillar.services.length - 4} more
                    </li>
                  )}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <WorkProcess />

      {/* Enterprise reassurance. The objection nobody says out loud. */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Standards</SectionLabel>
          <h2 className="mt-6 max-w-[16ch]">Built for enterprise standards.</h2>
          <p className="mt-8 max-w-[60ch] text-lg text-mt-slate">
            Most buyers will not ask these questions out loud. They decide on
            them anyway.
          </p>

          <dl className="mt-12 grid gap-10 md:grid-cols-3">
            {STANDARDS.map((s) => (
              <div key={s.title}>
                <dt className="text-base font-semibold">{s.title}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                  {s.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Proof */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Proof</SectionLabel>
          <h2 className="mt-6 max-w-[20ch]">
            We use what we build, before you do.
          </h2>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">
            CWV Drift Monitor is a Core Web Vitals tool we shipped to the Chrome
            Web Store. Free, no API key, no account. It exists because we needed
            it, and it is public so you can check the work rather than take our
            word for it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={SITE.chromeStore} external>
              View the extension
            </Button>
            <Link
              href="/cwv-drift-monitor/privacy-policy"
              className="inline-flex items-center text-base font-semibold text-mt-purple hover:underline"
            >
              Read its privacy policy
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-mt-border bg-white py-24 sm:py-32">
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
    </main>
  );
}
