import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* Full funnel coverage. REF, higglo.io homepage "full-funnel coverage" band.
   ---------------------------------------------------------------------------
   Taken: the asymmetric header with the headline set right and the label left,
   four numbered stage cards carrying tag pills and a footer rail, connector
   lines running out of each card into an arrow label, a divided metric bar
   beneath, a six across discipline grid numbered D.01 to D.06, and a closing
   rule with one link.

   The connector lines are not a borrowed flourish. CLAUDE.md section 4 already
   specifies them: thin 1px rules running off canvas into pill shaped labels,
   reading as a technical schematic. The reference just happens to use the same
   device, which is why it transfers cleanly.

   THE METRICS ARE NOT THEIRS AND COULD NOT BE. The reference bar reads +402%
   impressions, 12x citations, +243% conversions, 93% retention. Those are
   Higglo's claimed client results. CLAUDE.md section 9 is explicit that a
   reference changes what a section does, never what it claims, and that
   borrowing another firm's proof is both dishonest and the fastest way to lose
   a deal when a prospect checks.

   So the bar keeps its shape and takes numbers that are ours and countable:

     20 city pages     Dementia In Home, live under /cities
     5 case studies    published at /work on this site
     9 calculators     Capital Gains Tax Experts, each on its own URL
     52 tools          listed at /integrations

   Every one can be verified by opening a page. None of them is a percentage
   nobody can audit, which is the point.

   Stage four is AI agents and AI automation rather than the reference's CRO
   and digital PR, at Emmanuel's direction. That is also the honest mapping:
   those are real services with real pages, and PR is not something we sell.
   -------------------------------------------------------------------------- */

type Stage = {
  number: string;
  title: string;
  body: string;
  tags: string[];
  rail: string;
  connector: string;
};

const STAGES: Stage[] = [
  {
    number: "01",
    title: "Discover",
    body: "Buyers find you across Google, ChatGPT, Claude, Perplexity, and Gemini.",
    tags: ["SEO", "GEO"],
    rail: "Top of funnel · Awareness",
    connector: "Search and AI visibility",
  },
  {
    number: "02",
    title: "Consider",
    body: "The site has to survive the click. Fast on a mid range phone, clear about what you do.",
    tags: ["Web design", "Web dev"],
    rail: "Mid funnel · Trust",
    connector: "Trust and speed",
  },
  {
    number: "03",
    title: "Convert",
    body: "Enquiry paths, forms, and decision moments built to turn a visit into a conversation.",
    tags: ["UX", "Custom software"],
    rail: "Bottom funnel · Enquiry",
    connector: "Enquiry conversion",
  },
  {
    number: "04",
    title: "Compound",
    body: "Systems that absorb new volume, new lines, and new markets without new headcount.",
    tags: ["AI agents", "Automation"],
    rail: "Post convert · Scale",
    connector: "Operational scale",
  },
];

/* One countable fact per stage. Each is checkable by opening a page. */
const IMPACT = [
  { value: "20", label: "City pages", stage: "Stage 01" },
  { value: "5", label: "Case studies", stage: "Stage 02" },
  { value: "9", label: "Calculators", stage: "Stage 03" },
  { value: "52", label: "Integrations", stage: "Stage 04" },
];

/* Six disciplines, ordered along the funnel, each linked to the service page
   that delivers it. The links matter as much as the copy: this section adds
   six in content routes into the service tier. */
const DISCIPLINES = [
  {
    code: "D.01",
    name: "SEO",
    body: "Crawlability, indexation, and the architecture underneath both.",
    href: "/grow/technical-seo",
  },
  {
    code: "D.02",
    name: "GEO",
    body: "Entity clarity and source quality for ChatGPT, Claude, Perplexity, and AI Overviews.",
    href: "/grow/geo",
  },
  {
    code: "D.03",
    name: "UX",
    body: "Interface and journey design, built around the decision being made.",
    href: "/build/web-design",
  },
  {
    code: "D.04",
    name: "Web dev",
    body: "The build the other five run on, to a budget set before launch.",
    href: "/build/website-development",
  },
  {
    code: "D.05",
    name: "AI agents",
    body: "Bounded agents with typed tools, retrieval, and human approval points.",
    href: "/scale/ai-agents",
  },
  {
    code: "D.06",
    name: "AI automation",
    body: "Workflow automation across the systems you already run.",
    href: "/scale/ai-automations",
  },
];

export function FunnelCoverage() {
  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container size="wide">
        {/* Asymmetric header, as the reference has it: headline set right,
            label sitting left beneath it. CLAUDE.md section 4, asymmetry beats
            centring. */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-end">
          <div className="order-2 lg:order-1">
            <SectionLabel>Full funnel coverage</SectionLabel>
          </div>
          <h2 className="order-1 !text-3xl !leading-[1.08] sm:!text-4xl lg:order-2 lg:text-right">
            From the first search to the signed brief,{" "}
            <span className="text-mt-purple">one system, end to end.</span>
          </h2>
        </div>

        <p className="mt-10 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
          Most firms own a slice. We own the whole path: discovery across Google
          and the AI answer engines, the build that has to hold up when someone
          arrives, the enquiry route that turns a visit into a conversation, and
          the automation that lets you handle the result.
        </p>

        {/* Stage cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <div
              key={stage.number}
              className="flex flex-col rounded-[18px] border border-mt-border bg-white p-6"
            >
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                Stage {stage.number}
              </span>
              <h3 className="mt-5 !text-2xl !tracking-tight">{stage.title}</h3>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-mt-slate">
                {stage.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {stage.tags.map((tag) => (
                  <li
                    key={tag}
                    className="whitespace-nowrap rounded-[20px] border border-mt-purple/25 bg-mt-surface px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.12em] text-mt-purple"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="mt-6 whitespace-nowrap border-t border-mt-border pt-4 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                {stage.rail}
              </p>
            </div>
          ))}
        </div>

        {/* Connector rails. Thin rule running into a label, per CLAUDE.md
            section 4. Hidden below lg, where four columns become one and the
            rails would read as noise rather than as a schematic. */}
        <ul
          aria-hidden="true"
          className="mt-4 hidden gap-5 lg:grid lg:grid-cols-4"
        >
          {STAGES.map((stage) => (
            <li key={stage.number} className="flex items-center gap-3">
              <span className="h-px flex-1 bg-mt-border" />
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                {stage.connector} →
              </span>
            </li>
          ))}
        </ul>

        {/* Countable facts, one per stage */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border lg:grid-cols-[auto_repeat(4,1fr)]">
          <div className="flex items-center bg-white px-6 py-6">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.16em] text-mt-muted">
              Shipped, and checkable
            </span>
          </div>
          {IMPACT.map((item) => (
            <div key={item.label} className="bg-white px-6 py-6">
              <span className="block text-3xl font-extrabold tracking-tight text-mt-ink">
                {item.value}
              </span>
              <span className="mt-2 block whitespace-nowrap font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-ink">
                {item.label}
              </span>
              <span className="mt-1 block whitespace-nowrap font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                {item.stage}
              </span>
            </div>
          ))}
        </div>

        {/* Six disciplines */}
        <div className="mt-20 border-t border-mt-border">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {DISCIPLINES.map((d) => (
              <li key={d.code} className="border-b border-mt-border sm:border-r">
                <Link
                  href={d.href}
                  className="group flex h-full flex-col p-6 transition-colors duration-150 hover:bg-mt-surface"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                    {d.code}
                  </span>
                  <span className="mt-5 text-xl font-extrabold tracking-tight text-mt-ink group-hover:text-mt-purple">
                    {d.name}
                  </span>
                  <span className="mt-4 text-[0.875rem] leading-relaxed text-mt-slate">
                    {d.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
            Six disciplines, one roadmap
          </span>
          <Link
            href="/contact"
            className="mt-underline inline-flex items-center text-base font-semibold text-mt-purple"
          >
            See how this maps to your business
          </Link>
        </div>
      </Container>
    </section>
  );
}
