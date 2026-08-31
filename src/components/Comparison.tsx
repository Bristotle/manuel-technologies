import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/* Side by side comparison. REF, higglo.io "retainer stack vs. integrated
   growth system".
   ---------------------------------------------------------------------------
   Taken: the two card side by side, a tag on each, a shared set of row labels
   so the columns read across rather than down, the struck through left column,
   the "vs." marker between them, and a RESULT line closing each card.

   NOT taken:

   - Their subject. Higglo sells a retainer alternative to behavioural health
     brands. That is their positioning and none of it is ours. The contrast
     here is the one this site already makes in its own hero: an engineer who
     does the work, against an agency that sells it and hands it down.
   - Their colour and typeface. Left card is --mt-surface, right is white,
     which is the two tone relationship CLAUDE.md section 4 locks. No third
     background. Purple appears exactly once in this viewport, on the second
     clause of the headline, so the tags are ink and border instead.
   - Their punctuation. The reference uses hyphens between clauses throughout.
     Banned here.

   EVERY RIGHT HAND CLAIM IS GROUNDED. This is a competitive section, which is
   exactly where a site starts writing cheques it cannot cash. Sources:

     who writes it   the hero already says "an engineer who does this
                     professionally, not an agency passing your work to a junior"
     what arrives    CLIENT_RECEIVES: "Working code and a documented deployment
                     path", "A practical handover"
     scope           the three pillars, Build, Grow and Scale
     performance     CLAUDE.md section 2 treats Core Web Vitals as a build
                     requirement and measures on mobile
     seo             the service copy: crawlability, indexation, architecture
     ai search       VERIFIABLE. app/robots.ts names GPTBot, ClaudeBot,
                     PerplexityBot, Google-Extended and Applebot-Extended
     proof           CWV Drift Monitor is on the Chrome Web Store and the three
                     tools at /free-tools run in the browser

   The left column describes a widely known industry pattern and names nobody.
   Keep it that way. A competitor comparison that identifies a firm is a
   different thing legally and reputationally.
   -------------------------------------------------------------------------- */

type Row = {
  label: string;
  usual: string;
  ours: string;
};

const ROWS: Row[] = [
  {
    label: "Who writes it",
    usual: "Sold by a senior. Built by whoever is free that week.",
    ours: "Scoped, written and reviewed under senior engineering ownership. Never passed down to a junior.",
  },
  {
    label: "What arrives",
    usual: "A report, a deck, and a list of recommendations.",
    ours: "Working code, a documented deployment path, and a handover.",
  },
  {
    label: "Scope",
    usual: "The site, or the SEO, or the automation. One slice each.",
    ours: "Build, Grow and Scale, under a single point of accountability.",
  },
  {
    label: "Performance",
    usual: "Fast enough, measured on an office desktop.",
    ours: "Core Web Vitals treated as a build requirement, measured on mobile.",
  },
  {
    label: "SEO",
    usual: "Rankings and traffic, summarised monthly.",
    ours: "Crawlability, indexation, and the code that causes both.",
  },
  {
    label: "AI search",
    usual: "An add on line item, when it is mentioned at all.",
    ours: "GPTBot, ClaudeBot, PerplexityBot and Google-Extended, allowed by name.",
  },
  {
    label: "Proof",
    usual: "Case studies you cannot open and screenshots you cannot check.",
    ours: "Software you can install today, and tools you can run on this page.",
  },
];

const RESULTS = {
  usual: "Advice in a folder, and an invoice that repeats.",
  ours: "A system in production, senior review behind it, and the means to maintain it.",
};

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
      {children}
    </span>
  );
}

export function Comparison({
  /* The /agency-vs-engineer page carries its own h1 and intro, so it renders
     the table without repeating them. Homepage renders the full band. */
  heading = true,
  /* Homepage links onward to the full page. The full page does not link to
     itself. */
  moreHref,
}: {
  heading?: boolean;
  moreHref?: string;
} = {}) {
  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container>
        {heading && (
          <>
            <SectionLabel>Side by side</SectionLabel>

            <h2 className="mt-6 max-w-[20ch] !text-3xl sm:!text-4xl">
              What an agency hands over,{" "}
              <span className="text-mt-purple">what senior engineering ships.</span>
            </h2>

            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              Most technical work is sold by one person and delivered by
              another, and the gap between those two is where budgets go. This
              is the difference, stated plainly enough to hold us to it.
            </p>
          </>
        )}

        {/* One grid, not two cards. Each row emits its left cell then its right
            cell, so the pair lands in the same implicit grid row and the two
            share a height. Two independent columns drift apart as soon as one
            side wraps to a different number of lines, which loses the only
            thing this layout is for: reading across. */}
        <div className="relative mt-14 grid overflow-hidden rounded-t-[18px] border border-mt-border lg:grid-cols-2">
          {/* Headers */}
          <div className="border-b border-mt-border bg-white p-7 sm:p-8">
            <span className="inline-flex rounded-[20px] border border-mt-border bg-mt-surface px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-slate">
              The usual model
            </span>
            <h3 className="mt-6 !text-2xl !tracking-tight">
              Sold, then handed down
            </h3>
            <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              The default arrangement, and the one most businesses are still
              paying for.
            </p>
          </div>
          <div className="border-b border-mt-border bg-mt-surface p-7 sm:p-8 lg:border-l">
            <span className="inline-flex rounded-[20px] bg-mt-ink px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white">
              Manuel Technologies
            </span>
            <h3 className="mt-6 !text-2xl !tracking-tight">
              Senior engineering, end to end
            </h3>
            <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              Senior ownership across the build, the search work, and the
              automation behind it, with one point of accountability for the
              result.
            </p>
          </div>

          {/* Rows */}
          {ROWS.map((row) => (
            <Fragment key={row.label}>
              <div className="border-b border-mt-border bg-white px-7 py-6 sm:px-8">
                <RowLabel>{row.label}</RowLabel>
                {/* Struck through as the reference does. The column heading and
                    the result line say the same thing in words, so nothing
                    depends on the styling alone. */}
                <p className="max-w-[42ch] text-base leading-relaxed text-mt-muted line-through">
                  {row.usual}
                </p>
              </div>
              <div className="border-b border-mt-border bg-mt-surface px-7 py-6 sm:px-8 lg:border-l">
                <RowLabel>{row.label}</RowLabel>
                <p className="max-w-[42ch] text-base leading-relaxed text-mt-ink">
                  {row.ours}
                </p>
              </div>
            </Fragment>
          ))}

          {/* Results */}
          <div className="bg-white px-7 py-7 sm:px-8 sm:py-8">
            <RowLabel>Result</RowLabel>
            <p className="max-w-[46ch] text-base leading-relaxed text-mt-slate">
              {RESULTS.usual}
            </p>
          </div>
          <div className="bg-mt-surface px-7 py-7 sm:px-8 sm:py-8 lg:border-l lg:border-mt-border">
            <RowLabel>Result</RowLabel>
            <p className="max-w-[46ch] text-base font-semibold leading-relaxed text-mt-ink">
              {RESULTS.ours}
            </p>
          </div>

          {/* The marker sitting on the seam, as the reference has it. Desktop
              only, where a seam exists to sit on. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mt-border bg-white font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted lg:flex"
          >
            vs
          </span>
        </div>

        {/* Attached to the foot of the table, not floated below it, so the
            page does not gain a third free standing dark band. The spotlight
            carries one and CallToAction closes with one. */}
        <div className="-mt-px rounded-b-[18px] border border-mt-border bg-mt-ink px-7 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="max-w-[24ch] !text-xl !leading-snug !tracking-tight text-white sm:!text-2xl">
                Not sure which column your last project sat in?
              </h3>
              <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white/70">
                Fifteen minutes, no deck. Bring the site, the stack, or the
                last invoice you were unhappy with, and we will tell you which
                column it belongs in and what it would take to move it.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Book a 15 minute call</Button>
              {moreHref && (
                <Link
                  href={moreHref}
                  className="inline-flex items-center justify-center rounded-[10px] border border-white/25 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:border-white hover:text-white active:border-mt-purple-light"
                >
                  Read the full comparison
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
