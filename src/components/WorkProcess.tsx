import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    number: "01",
    title: "Understand the work",
    body: "We start with the goal, audience, constraints, existing stack, and the result that would make the project worthwhile.",
  },
  {
    number: "02",
    title: "Choose the right first move",
    body: "We turn the brief into a focused plan, with clear priorities, technical decisions, responsibilities, and measures of progress.",
  },
  {
    number: "03",
    title: "Build and test properly",
    body: "We design, implement, and test the work against real devices, real data, accessibility requirements, and the edge cases that matter.",
  },
  {
    number: "04",
    title: "Launch and improve",
    body: "We release carefully, watch the evidence, and use what we learn to improve performance, visibility, and the next useful iteration.",
  },
] as const;

export function WorkProcess({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`border-y border-mt-border ${compact ? "py-24" : "py-24 sm:py-32"}`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionLabel>How we work</SectionLabel>
            <h2 className="mt-6 max-w-[14ch]">Clear work. Properly shipped.</h2>
            <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-mt-slate">
              A good process makes the work easier to understand, easier to measure, and easier to improve.
            </p>
          </div>

          <ol className="mt-reveal-group grid gap-8 sm:grid-cols-2">
            {STEPS.map((step) => (
              <li key={step.number} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">
                  {step.number}
                </span>
                <h3 className="mt-4 !text-xl !tracking-tight">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-mt-slate">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
