import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/* Side by side comparison. REF, higglo.io "retainer stack vs. integrated
   growth system".
   ---------------------------------------------------------------------------
   This pass takes the structure properly rather than approximately:

   - Rows read LABEL left, value right on one line. The first version stacked
     them, which is why it read as a list of headings rather than a table.
   - A real gutter between the two cards, with a continuous vertical rule and
     the vs marker sitting in it. Not a shared seam.
   - An outer border wrapping both columns and the gutter as one object.
   - Row rules inside the cards only. The gutter rule runs unbroken, so no
     horizontal ticks cross it.

   HOW THE ALIGNMENT WORKS. One grid at lg, three columns, and every row emits
   three cells: left, gutter, right. Because the pair is emitted together they
   land in the same implicit row and share a height, so SCOPE on the left sits
   level with SCOPE on the right however the text wraps. Two independent cards
   drift apart the moment one side wraps to an extra line, which is the only
   thing this layout exists to prevent. Gutter cells are hidden below lg, where
   the grid collapses to one column.

   NOT taken: their subject, their colour, their serif, and their hyphens
   between clauses. Ours carries the surface tint, because the tint belongs on
   the column being argued for. CLAUDE.md section 9.

   EVERY RIGHT HAND CLAIM IS GROUNDED, and this is the section where a site
   starts writing cheques it cannot cash. Sources:

     who writes it   the hero: "not an agency passing your work to a junior"
     operating unit  SERVICE_PAGES holds sixteen services across three pillars
     what arrives    CLIENT_RECEIVES on the homepage
     what you own    CLIENT_RECEIVES, plus the questions on /agency-vs-engineer
     performance     CLAUDE.md section 2
     seo             the service page copy
     ai search       VERIFIABLE. app/robots.ts names all five crawlers
     proof           CWV Drift Monitor on the Chrome Web Store, /free-tools

   The left column describes a widely known industry pattern and names nobody.
   A comparison that identifies a firm is a different thing legally.
   -------------------------------------------------------------------------- */

type Row = {
  label: string;
  usual: string;
  ours: string;
};

const ROWS: Row[] = [
  {
    label: "Who builds",
    usual: "Sold by a senior. Built by whoever is free that week.",
    ours: "Scoped, written and reviewed under senior engineering ownership.",
  },
  {
    label: "Structure",
    usual: "Several vendors, several invoices, no single owner.",
    ours: "Sixteen services, three pillars, one accountable owner.",
  },
  {
    label: "Deliverable",
    usual: "A report, a deck, and a list of recommendations.",
    ours: "Working code, a documented deployment path, and a handover.",
  },
  {
    label: "Ownership",
    usual: "Access through somebody else's accounts.",
    ours: "The repository, the domains, and the analytics property.",
  },
  {
    label: "Performance",
    usual: "Fast enough, measured on an office desktop.",
    ours: "Core Web Vitals as a build requirement, measured on mobile.",
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

/* Label left, value right, on one line from sm up. */
function Cell({
  label,
  children,
  struck = false,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  struck?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-1 px-6 py-5 sm:grid-cols-[7rem_1fr] sm:gap-5 sm:px-8 ${
        last ? "" : "border-b border-mt-border"
      }`}
    >
      <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-[1.8] tracking-[0.16em] text-mt-muted">
        {label}
      </dt>
      <dd
        className={`max-w-[44ch] text-[0.9375rem] leading-relaxed ${
          struck ? "text-mt-muted line-through" : "text-mt-ink"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}

/* One gutter cell per row. Carries the vertical rule and nothing else, so the
   line runs unbroken down the middle. */
function Gutter() {
  return (
    <div
      aria-hidden="true"
      className="hidden border-x border-mt-border bg-white lg:block"
    />
  );
}

export function Comparison({
  /* /agency-vs-engineer carries its own h1 and intro, so it renders the table
     without repeating them. The homepage renders the full band. */
  heading = true,
  /* The homepage links onward to the full page. The full page does not link
     to itself. */
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
              <span className="text-mt-purple">
                what senior engineering ships.
              </span>
            </h2>

            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              Most technical work is sold by one person and delivered by
              another, and the gap between those two is where budgets go. This
              is the difference, stated plainly enough to hold us to it.
            </p>
          </>
        )}

        <div className="relative mt-14 overflow-hidden rounded-t-[18px] border border-mt-border">
          {/* Gradient behind the whole right column, as the reference has it.
              It cannot go on the cells: each is its own grid item, so the
              gradient would restart on every row instead of running the height
              of the column. Width is exact for grid-cols-[1fr_4.5rem_1fr],
              where each 1fr resolves to calc(50% - 2.25rem).

              Surface to white. Both are already in the palette, so this is a
              transition between two locked values rather than a third
              background. CLAUDE.md section 4. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[calc(50%-2.25rem)] bg-gradient-to-b from-mt-surface via-mt-surface to-white lg:block"
          />

          <div className="mt-reveal relative grid lg:grid-cols-[1fr_4.5rem_1fr]">
            {/* Headers */}
            <div className="border-b border-mt-border bg-white px-6 py-8 sm:px-8">
              <span className="inline-flex rounded-[20px] border border-mt-border bg-mt-surface px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-slate">
                The usual model
              </span>
              <h3 className="mt-6 !text-2xl !tracking-tight">
                The retainer arrangement
              </h3>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-mt-slate">
                The default way technical work is bought, and the one most
                businesses are still paying for.
              </p>
            </div>
            <Gutter />
            <div className="border-b border-mt-border bg-mt-surface px-6 py-8 sm:px-8 lg:bg-transparent">
              <span className="inline-flex rounded-[20px] bg-mt-ink px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white">
                Manuel Technologies
              </span>
              <h3 className="mt-6 !text-2xl !tracking-tight">
                One engineering practice
              </h3>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-mt-slate">
                Sixteen services across Build, Grow and Scale, under senior
                engineering ownership and one accountable owner.
              </p>
            </div>

            {/* Rows */}
            {ROWS.map((row) => (
              <Fragment key={row.label}>
                <dl className="bg-white">
                  <Cell label={row.label} struck>
                    {row.usual}
                  </Cell>
                </dl>
                <Gutter />
                <dl className="bg-mt-surface lg:bg-transparent">
                  <Cell label={row.label}>{row.ours}</Cell>
                </dl>
              </Fragment>
            ))}

            {/* Results */}
            <dl className="bg-white">
              <Cell label="Result" last>
                <span className="text-mt-slate">{RESULTS.usual}</span>
              </Cell>
            </dl>
            <Gutter />
            <dl className="bg-mt-surface lg:bg-transparent">
              <Cell label="Result" last>
                <span className="font-semibold">{RESULTS.ours}</span>
              </Cell>
            </dl>
          </div>

          {/* Marker in the gutter, as the reference has it. Desktop only,
              where a gutter exists to sit in. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mt-border bg-white font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted lg:flex"
          >
            vs
          </span>
        </div>

        {/* Attached to the foot of the table rather than floated below it, so
            the page does not gain a third free standing dark band. The
            spotlight carries one and CallToAction closes with one. */}
        <div className="-mt-px rounded-b-[18px] border border-mt-border bg-mt-ink px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="max-w-[26ch] !text-xl !leading-snug !tracking-tight text-white sm:!text-2xl">
                Not sure which column your last project sat in?
              </h3>
              <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white/70">
                Fifteen minutes, no deck. Bring the site, the stack, or the last
                invoice you were unhappy with, and we will tell you which column
                it belongs in and what it would take to move it.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Book a 15 minute call</Button>
              {moreHref && (
                <Link
                  href={moreHref}
                  className="inline-flex items-center justify-center rounded-[10px] border border-white/25 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:border-white active:border-mt-purple-light"
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
