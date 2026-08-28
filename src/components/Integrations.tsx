import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { INTEGRATIONS } from "@/lib/integrations";

/* Server component. Zero JavaScript, zero images.
   Reveal animation is CSS scroll-driven, see globals.css. */

export function Integrations({
  variant = "default",
}: {
  variant?: "default" | "surface";
}) {
  return (
    <section
      className={
        variant === "surface"
          ? "border-y border-mt-border bg-mt-surface py-24 sm:py-32"
          : "border-y border-mt-border bg-white py-24 sm:py-32"
      }
    >
      <Container>
        <SectionLabel>Integrations and automations</SectionLabel>
        <h2 className="mt-6 max-w-[20ch]">
          It has to work with what you already run.
        </h2>
        <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-mt-slate">
          Automation fails when it sits beside the business rather than inside
          it. We connect agents and workflows directly to the systems your team
          already uses, so data moves where it needs to go without anyone
          copying it across.
        </p>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-reveal-group">
          {INTEGRATIONS.map((group) => (
            <div key={group.category} className="border-t border-mt-border pt-6">
              <h3 className="!text-base !tracking-tight">{group.category}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                {group.note}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.systems.map((system) => (
                  <li
                    key={system}
                    className="rounded-[20px] border border-mt-border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.13em] text-mt-purple"
                  >
                    {system}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-[62ch] text-base leading-relaxed text-mt-slate">
          If a system exposes an API, it can be automated. Where one does not,
          we build the middleware that makes it behave as though it does.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/scale/ai-automations">See how automation works</Button>
          <Button href="/contact" variant="secondary">
            Ask about your stack
          </Button>
        </div>
      </Container>
    </section>
  );
}
