import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { WorkProcess } from "@/components/WorkProcess";
import { SITE } from "@/lib/site";

const FAQS = [
  {
    question: "Who leads the work at Manuel Technologies?",
    answer:
      "Manuel Technologies is led by Emmanuel Akyeam, an engineer and AI specialist working with US digital agencies. He stays close to the technical decisions, implementation, and standards that shape the work.",
  },
  {
    question: "Will senior technical expertise be directly involved?",
    answer:
      "Yes. The work is led by the people responsible for the technical decisions, rather than being sold by one team and passed to an unseen junior team. Roles, responsibilities, and the first useful deliverable are made clear at the start.",
  },
  {
    question: "Can you work with clients in different countries?",
    answer:
      "Yes. Emmanuel has led programmes for clients across the United States, Hungary, the UAE, India, Australia, the United Kingdom, Ghana, and other markets. Remote delivery works best when goals, ownership, communication, data handling, and approvals are explicit.",
  },
  {
    question: "How do you demonstrate technical credibility?",
    answer:
      "The evidence is in the work: live websites, custom software, technical SEO programmes, performance tooling, and systems built around real operational needs. CWV Drift Monitor is a public Chrome extension that lets people inspect one example of the tooling we build.",
  },
  {
    question: "How do you approach responsible AI development?",
    answer:
      "We use bounded workflows, least-privilege access, protected credentials, validation, evaluation cases, monitoring, and human escalation for consequential actions. The right approach is to start with a measurable task and use the simplest reliable system that can do it.",
  },
  {
    question: "What is your typical project process?",
    answer:
      "We understand the work, choose the right first move, build and test properly, then launch and improve from evidence. The exact timeline depends on scope, content, integrations, approvals, and the complexity of the system involved.",
  },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "Manuel Technologies is led by Emmanuel Akyeam, an engineer and AI specialist working with US digital agencies and clients worldwide.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main>
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">
            The technical team you do not have yet.
          </h1>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container size="prose">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Manuel Technologies is led by <strong className="text-mt-ink">Emmanuel Akyeam</strong>,
              an engineer and AI specialist working with US digital agencies.
            </p>
            <p>
              He has led digital programmes for clients across the United
              States, Hungary, the UAE, India, Australia, the United Kingdom,
              Ghana, and other markets. The work covers ecommerce at catalogue
              scale, regulated professional services, healthcare, and retail.
            </p>
            <p>
              He also builds the tooling he uses. CWV Drift Monitor is a Core
              Web Vitals extension published on the Chrome Web Store. It was
              built because auditing client performance through Lighthouse
              reports was slower than it needed to be. Other browser extensions
              and WordPress plugins are also available and live.
            </p>
            <p className="text-mt-ink">
              The work stays close to the people making the technical decisions.
              That means clearer accountability, fewer layers between a brief
              and a working system, and a standard that can be checked in the
              finished product.
            </p>
          </div>

          <div className="mt-14">
            <Button href={`mailto:${SITE.email}`}>Start a conversation</Button>
          </div>
        </Container>
      </section>

      <WorkProcess />

      <section className="border-t border-mt-border bg-white py-24 sm:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Container>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 max-w-[18ch]">The questions worth asking.</h2>
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
        </Container>
      </section>
    </main>
  );
}
