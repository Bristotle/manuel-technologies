import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { WorkProcess } from "@/components/WorkProcess";
import { SITE } from "@/lib/site";

/* About.
   ---------------------------------------------------------------------------
   Rewritten from a personal profile to a practice. The page used to open
   "Manuel Technologies is led by Emmanuel Akyeam" and carried his track record
   in the first person throughout, which made a company read as one freelancer.

   WHAT THE PAGE CLAIMS AND WHAT IT DOES NOT. It describes a process: how work
   is scoped, who reviews it, and what cannot ship without a senior signing it
   off. It does NOT claim a headcount, because we cannot back one and an
   invented team is the easiest lie for a prospect to catch. "Senior
   engineering ownership" is a statement about accountability, which is true
   and checkable in how the work is run. "A team of twelve engineers" would be
   a statement about size, which is neither.

   WHY ONE NAMED ATTRIBUTION STAYS. Two reasons, both load bearing:

   1. CLAUDE.md section 7 is explicit that the Higglo, SkillCEF and ChainYacc
      engagements were staff roles and "appear on /about as personal
      experience, attributed to Emmanuel, never as company work." Rewriting
      that track record into "we have delivered across eight markets" would
      convert personal experience into a company claim, which is the exact
      thing that rule exists to prevent.
   2. Identifiable authorship is an entity signal. Google's helpful content
      guidance asks who stands behind the work, and generative engines cite
      sources they can attribute. An anonymous agency is a weaker entity than a
      named one, not a stronger one.

   So the page is company first throughout, with one clearly labelled paragraph
   attributing the prior programme record to a person rather than to the firm.
   -------------------------------------------------------------------------- */

const PIPELINE = [
  {
    step: "01",
    title: "Scoped by someone who will build it",
    body: "The person who writes the brief is accountable for delivering against it. Scoping done by someone who never touches the implementation is how a project acquires commitments nobody can keep.",
  },
  {
    step: "02",
    title: "Built to a standard set before work starts",
    body: "Performance budgets, accessibility checks and structured content rules are agreed at the start, not discovered at launch. They are written down, and they fail the build when broken rather than being noticed later.",
  },
  {
    step: "03",
    title: "Reviewed by a senior engineer, always",
    body: "Nothing reaches a client without senior review. Not a spot check on the parts that look risky: the whole change. This is the step most often skipped elsewhere, and it is where the difference shows up two years later.",
  },
  {
    step: "04",
    title: "Handed over so it survives without us",
    body: "Working code, a documented deployment path, and the next improvements written down. Work that only its author can maintain is a liability dressed as an asset.",
  },
];

const FAQS = [
  {
    question: "Who does the work at Manuel Technologies?",
    answer:
      "Senior engineers, and the same people who scoped it. Work is not sold by one group and handed to an unseen junior team. Every change is reviewed by a senior engineer before it reaches a client, which is the step most often skipped elsewhere and the one that shows up two years later.",
  },
  {
    question: "Is this a one person operation?",
    answer:
      "No. It is a practice with a defined delivery pipeline: scoped by someone accountable for building it, built to a standard agreed before work starts, reviewed by a senior engineer, and handed over documented. What we will not do is quote a headcount as a proxy for quality, because the number of people on a project says nothing about who is checking the work.",
  },
  {
    question: "Will senior technical expertise be directly involved?",
    answer:
      "Yes, and it is the point of the arrangement rather than an upgrade you pay extra for. Roles, responsibilities and the first useful deliverable are made clear at the start, so it is visible from week one whether that is actually happening.",
  },
  {
    question: "Can you work with clients in different countries?",
    answer:
      "Yes. Delivered work spans the United Kingdom, the United States, the United Arab Emirates and Ghana, across ecommerce at catalogue scale, regulated professional services, healthcare, property and retail. Remote delivery works when goals, ownership, communication, data handling and approvals are explicit, and badly when they are assumed.",
  },
  {
    question: "How do you demonstrate technical credibility?",
    answer:
      "By publishing things people can open. CWV Drift Monitor is a Chrome extension anyone can install and run against their own site. The free tools on this site run live rather than describing what they would do. Every case study lists what can be verified on the client's own site. None of that requires trusting a claim.",
  },
  {
    question: "How do you approach responsible AI development?",
    answer:
      "Bounded workflows, least privilege access, protected credentials, validation, evaluation cases, monitoring, and human approval for anything hard to reverse. The correct starting point is a measurable task and the simplest reliable system that can do it, not the most capable model available.",
  },
  {
    question: "What is your typical project process?",
    answer:
      "Understand the work, choose the right first move, build and test properly, then launch and improve from evidence. Timelines depend on scope, content readiness, integrations, approval cycles and the complexity of the system involved, and anyone quoting one before knowing those is guessing.",
  },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "An engineering practice with a senior accountable delivery pipeline. Scoped by someone building it, reviewed by a senior engineer, handed over documented.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${SITE.name}`,
    description:
      "How the work is scoped, reviewed and handed over, and why nothing ships without senior review.",
    url: `${SITE.url}/about`,
  },
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
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">
            The technical team you do not have yet.
          </h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            Manuel Technologies is an engineering practice. Websites, custom
            software, technical SEO and the automation behind them, delivered
            under senior engineering ownership rather than sold by one team and
            passed down to another.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container size="prose">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Most technical work fails in the gap between the person who sold
              it and the person who built it. The brief makes commitments the
              implementation cannot keep, nobody senior looks at the result
              closely, and the problems surface a year later when the original
              team has moved on.
            </p>
            <p>
              The practice is built to close that gap. Work is scoped by
              someone accountable for delivering it, held to standards agreed
              before anything is written, and reviewed by a senior engineer
              before a client ever sees it. Not a spot check on the parts that
              look risky. The whole change.
            </p>
            <p className="font-semibold text-mt-ink">
              We do not quote a headcount, because the number of people on a
              project tells you nothing about who is checking the work. What
              matters is whether senior review is a step in the process or a
              favour you have to ask for.
            </p>
          </div>
        </Container>
      </section>

      {/* The pipeline. This is the substance of the page: a claim about
          accountability has to describe a mechanism or it is a slogan. */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>The senior accountable pipeline</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">
            Four gates, and{" "}
            <span className="text-mt-purple">nothing skips the third.</span>
          </h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            Every engagement runs the same route. It is deliberately boring,
            because the failure modes it prevents are the expensive ones.
          </p>

          <ol className="mt-reveal-group mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((stage) => (
              <li key={stage.step} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">
                  {stage.step}
                </span>
                <h3 className="mt-4 !text-lg !tracking-tight">{stage.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>What we have delivered</SectionLabel>
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Work spans four markets and five sectors: ecommerce at catalogue
              scale, regulated professional services, healthcare, property and
              retail. Over a thousand programmatic pages, nine tax calculators
              in a regulated domain, and a product catalogue past a thousand
              configurable items.{" "}
              <Link href="/work" className="text-mt-purple hover:underline">
                Every one of them is live and listed
              </Link>
              , with what can be checked on the client&rsquo;s own site written
              out alongside.
            </p>
            <p>
              We also publish the tooling. CWV Drift Monitor is a Core Web
              Vitals extension on the Chrome Web Store, built because auditing
              client performance through Lighthouse reports was slower than it
              needed to be. The{" "}
              <Link href="/free-tools" className="text-mt-purple hover:underline">
                twelve free tools
              </Link>{" "}
              on this site run live rather than describing what they would do,
              and none of them sits behind an email form.
            </p>
            <p>
              {/* Personal experience, attributed to a person. CLAUDE.md section
                  7 requires this: those were staff roles, and rewriting them
                  into "we" would convert them into company work. */}
              The practice was founded and is technically led by{" "}
              <strong className="text-mt-ink">Emmanuel Akyeam</strong>, whose
              prior programme work in senior roles at other agencies spans the
              United States, Hungary, the UAE, India, Australia and the United
              Kingdom. That experience sets the standard the pipeline enforces.
              It was earned in staff roles, so it is his rather than the
              firm&rsquo;s, and it is written here as such.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/contact">Start a conversation</Button>
            <Button href="/agency-vs-engineer" variant="secondary">
              How this differs from a retainer
            </Button>
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
