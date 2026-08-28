import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/* Sits directly under the Scale hero.
   Register taken from enterprise AI positioning: declarative, specific,
   no hedging. Every claim is one we can stand behind. */

const CAPABILITY_SHIFT = [
  {
    from: "A person copies data between four systems every morning",
    to: "An agent reads the source, applies the rules, and writes the result",
  },
  {
    from: "Support answers the same forty questions each week",
    to: "An agent resolves them and escalates only what is genuinely new",
  },
  {
    from: "Reports get assembled by hand the day before the meeting",
    to: "The pipeline runs on a schedule and the report is already there",
  },
] as const;

export function ScaleIntro() {
  return (
    <section className="border-b border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionLabel>What this pillar is</SectionLabel>
            <h2 className="mt-6 !text-3xl !leading-[1.05] sm:!text-4xl">
              Software that does the work, not software that reminds you to.
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Most business software is a place to record work after a person
              has done it. Agentic systems are different. They read the request,
              decide what it needs, act across the systems involved, and hand
              back a result. The person moves from doing the task to approving
              the outcome.
            </p>
            <p>
              We build those systems for specific operational problems rather
              than as a general platform. That means an agent that reconciles
              your invoices against your bank feed, or one that qualifies
              inbound leads against your actual criteria, or a pipeline that
              turns a folder of documents into something searchable. Narrow,
              measurable, and connected to the tools you already run.
            </p>
            <p className="font-semibold text-mt-ink">
              The test is simple. If the work still needs a person to move data
              from one screen to another, it is not automated. It is just
              logged.
            </p>
          </div>
        </div>

        <div className="mt-20 mt-reveal-group">
          <SectionLabel>What changes</SectionLabel>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border md:grid-cols-3">
            {CAPABILITY_SHIFT.map((shift) => (
              <div key={shift.from} className="flex flex-col gap-5 bg-white p-7">
                <div>
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                    ( BEFORE )
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                    {shift.from}
                  </dd>
                </div>
                <div className="border-t border-mt-border pt-5">
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                    ( AFTER )
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] font-medium leading-relaxed text-mt-ink">
                    {shift.to}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button href="/scale/ai-agents">AI agents development</Button>
          <Button href="/scale/ai-automations" variant="secondary">
            AI automations
          </Button>
        </div>
      </Container>
    </section>
  );
}
