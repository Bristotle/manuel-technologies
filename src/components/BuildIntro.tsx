import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/* Sits directly under the Build hero, the counterpart to ScaleIntro.
   ---------------------------------------------------------------------------
   WHY THIS EXISTS. /build carried 81 words of main content. It is a pillar hub
   at sitemap priority 0.9, second only to the homepage in the architecture,
   and it was a label, a promise line, five one line service blurbs and two
   buttons. /scale had ScaleIntro and sat at 402. This closes that gap.

   Same structure as ScaleIntro so the three hubs read as one system: a two
   column statement of what the pillar is, a three up band of concrete
   contrasts, then the two services worth clicking first.

   Every claim traces to something already on the site. The performance line is
   CLAUDE.md section 2. The ownership line is CLIENT_RECEIVES on the homepage.
   Nothing here promises a capability the service pages do not describe. */

const DECISIONS = [
  {
    label: "Page builder",
    body: "Fast to launch, then slow forever. The template decides what is possible and every exception fights it.",
    ours: "A component system built for the content that actually exists, so the second year is cheaper than the first.",
  },
  {
    label: "Performance later",
    body: "Speed treated as a launch week task, measured once on a desktop connection, then left to drift.",
    ours: "Core Web Vitals as a build requirement, measured on mid range mobile, checked on every release.",
  },
  {
    label: "Handover as a formality",
    body: "A login, a zip file, and a developer who has moved on. Nobody can explain the code a year later.",
    ours: "Working code, a documented deployment path, and the next improvements written down.",
  },
] as const;

export function BuildIntro() {
  return (
    <section className="border-b border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionLabel>What this pillar is</SectionLabel>
            <h2 className="mt-6 !text-3xl !leading-[1.05] sm:!text-4xl">
              The thing itself, built to survive contact with the real world.
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Most websites are assembled rather than built. A theme is bought,
              plugins are added until the requirements are covered, and the
              result works until the first thing changes. Then every change
              costs more than the last one, because nothing underneath was
              designed for it.
            </p>
            <p>
              We build the other way. The content model comes first, the
              components follow it, and the performance budget is set before
              anything is written rather than measured after launch. That
              applies whether the output is a marketing site, a web
              application, an internal tool, or the integration layer holding
              two systems together.
            </p>
            <p className="font-semibold text-mt-ink">
              The test is whether the second year is cheaper than the first. If
              every change still needs the person who built it, the build was
              not finished.
            </p>
          </div>
        </div>

        <div className="mt-20 mt-reveal-group">
          <SectionLabel>What we do differently</SectionLabel>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border md:grid-cols-3">
            {DECISIONS.map((item) => (
              <div key={item.label} className="flex flex-col gap-5 bg-white p-7">
                <div>
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                    ( {item.label} )
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                    {item.body}
                  </dd>
                </div>
                <div className="border-t border-mt-border pt-5">
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                    ( INSTEAD )
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] font-medium leading-relaxed text-mt-ink">
                    {item.ours}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button href="/build/website-development">Website development</Button>
          <Button href="/build/custom-software" variant="secondary">
            Custom software
          </Button>
        </div>
      </Container>
    </section>
  );
}
