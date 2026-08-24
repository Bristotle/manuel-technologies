import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Marquee } from "@/components/ui/Marquee";
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

const FAQS = [
  {
    question: "What does Manuel Technologies do?",
    answer:
      "Manuel Technologies provides website development, custom software, technical SEO, GEO for AI search and language models, and AI automation services.",
  },
  {
    question: "What website development services are available?",
    answer:
      "Website development covers the creation and maintenance of websites that meet specific business requirements and function reliably across devices.",
  },
  {
    question: "Do you provide custom software?",
    answer:
      "Custom software is built to handle the operational work that off the shelf tools cannot, such as internal systems, client portals and dashboards shaped around how a business actually runs.",
  },
  {
    question: "What is technical SEO?",
    answer:
      "Technical SEO involves optimising the underlying structure of a website so that search engines can crawl, index and understand its content effectively.",
  },
  {
    question: "What is GEO for AI search and language models?",
    answer:
      "GEO for AI search and language models focuses on structuring content and data so that generative AI systems retrieve and present information accurately.",
  },
  {
    question: "What can AI automation and AI agents be used for?",
    answer:
      "AI automation applies machine learning and related techniques to handle repetitive tasks and improve workflow efficiency within an organisation.",
  },
  {
    question: "Who does Manuel Technologies work with?",
    answer:
      "Manuel Technologies works with businesses and organisations that require technical digital services to support their operations.",
  },
  {
    question: "How do I start a project with Manuel Technologies?",
    answer:
      "Projects begin with an initial discussion to understand requirements, followed by a structured plan that outlines the scope and next steps.",
  },
] as const;

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
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
                <Button href={`mailto:${SITE.email}`}>
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
            Three pillars. One engineer across all of them.
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

          <div className="mt-12 max-w-[760px] border-t border-mt-border">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-mt-border py-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-semibold marker:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12">
            <Button href="/contact">Talk about your project</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
