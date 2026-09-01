import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* Three motions. REF, higglo.io homepage "how we operate".
   ---------------------------------------------------------------------------
   Taken: numbered motions, each with a lead statement carrying one emphasised
   phrase, a body paragraph, discipline pills, and a bordered panel to the side
   holding a caption and three figures.

   RENDERED AS THREE STACKED BLOCKS, NOT TABS. The reference hides two thirds
   of this behind a tab bar. Ours shows all three, for two reasons. It needs no
   client component, so the section costs 0KB against a budget that is already
   over. And content a visitor has to click to reveal is content most visitors
   never read, on a site whose measured problem is thin pages. Say the word and
   it becomes tabs.

   THE PANEL FIGURES ARE OURS. The reference panels carry +402% organic
   impressions, 12x citation momentum, 99.8% entity confidence, +243%
   conversions, +315% lead velocity, -38% form drop-off, 93% retention, +693%
   organic clicks. Every one is Higglo's claimed client outcome. Copying them
   is the failure CLAUDE.md section 9 names outright.

   Ours are counts of things that exist, each verifiable by opening a page:

     Acquire    5 crawlers named in robots.ts · 1,000+ pages · 13 articles
     Convert    9 calculators · 1,000+ products · 5 case studies
     Compound   52 integrations · 4 live tools · 1 published extension

   A count is a weaker headline than a percentage and a much stronger claim,
   because it survives being checked. The panel caption says "shipped" rather
   than "results" for the same reason: these are artefacts, not outcomes, and
   the difference matters.
   -------------------------------------------------------------------------- */

type Motion = {
  number: string;
  name: string;
  lead: string;
  emphasis: string;
  body: string;
  tags: { label: string; href: string }[];
  panel: string;
  figures: { value: string; label: string }[];
};

const MOTIONS: Motion[] = [
  {
    number: "01",
    name: "Acquire",
    lead: "SEO and GEO own how people find you, across Google and the engines that answer before it.",
    emphasis: "how people find you",
    body: "We treat search and the AI answer engines as one discovery surface. Crawl access, entity clarity and structured evidence compound across every surface a buyer uses, and the work that earns a ranking is largely the work that earns a citation.",
    tags: [
      { label: "Technical SEO", href: "/grow/technical-seo" },
      { label: "GEO", href: "/grow/geo" },
      { label: "Programmatic SEO", href: "/grow/programmatic-seo" },
    ],
    panel: "Discovery surface · shipped",
    figures: [
      { value: "5", label: "AI crawlers named" },
      { value: "1,000+", label: "Programmatic pages" },
      { value: "13", label: "Articles published" },
    ],
  },
  {
    number: "02",
    name: "Convert",
    lead: "Interface and build turn a qualified visit into a conversation, by removing the reasons people leave.",
    emphasis: "into a conversation",
    body: "People decide across several visits. We build the service pages, the enquiry paths and the software behind them so nothing is lost between arriving and asking, and so the page still works on a mid range phone on mobile data.",
    tags: [
      { label: "Web design", href: "/build/web-design" },
      { label: "Website development", href: "/build/website-development" },
      { label: "Custom software", href: "/build/custom-software" },
    ],
    panel: "Conversion surface · shipped",
    figures: [
      { value: "9", label: "Calculators shipped" },
      { value: "1,000+", label: "Products configured" },
      { value: "5", label: "Case studies live" },
    ],
  },
  {
    number: "03",
    name: "Compound",
    lead: "Automation and agents let the business absorb the result without absorbing more headcount.",
    emphasis: "without absorbing more headcount",
    body: "Winning more work is only useful if the operation can carry it. Bounded agents and workflow automation take the repeatable part, connected to the systems you already run, with human approval kept on anything hard to reverse.",
    tags: [
      { label: "AI agents", href: "/scale/ai-agents" },
      { label: "AI automations", href: "/scale/ai-automations" },
      { label: "Analytics", href: "/scale/analytics" },
    ],
    panel: "Operating surface · shipped",
    figures: [
      { value: "52", label: "Tools integrated" },
      { value: "4", label: "Free tools live" },
      { value: "1", label: "Extension published" },
    ],
  },
];

function Lead({ text, emphasis }: { text: string; emphasis: string }) {
  const at = text.indexOf(emphasis);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-mt-purple">{emphasis}</span>
      {text.slice(at + emphasis.length)}
    </>
  );
}

export function Motions() {
  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container size="wide">
        <SectionLabel>How we operate</SectionLabel>
        <h2 className="mt-6 max-w-[26ch] !text-3xl !leading-[1.08] sm:!text-4xl">
          Three motions, six disciplines, one system.
        </h2>
        <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
          Search, interface, build and automation wired into one engine that
          acquires the enquiry, converts it, and lets you carry the result. Not
          three separate engagements with three separate owners.
        </p>

        {/* Motion index */}
        <ol className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-y border-mt-border py-4">
          {MOTIONS.map((m) => (
            <li key={m.number} className="flex items-baseline gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                {m.number}
              </span>
              <span className="text-base font-semibold text-mt-ink">
                {m.name}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-reveal-group mt-4">
          {MOTIONS.map((motion) => (
            <article
              key={motion.number}
              className="grid gap-10 border-b border-mt-border py-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                    Motion {motion.number}
                  </span>
                  <h3 className="!text-xl !tracking-tight">{motion.name}</h3>
                </div>

                <p className="mt-6 max-w-[42ch] text-2xl leading-[1.25] tracking-[-0.02em] text-mt-ink sm:max-w-[46ch] sm:text-[1.75rem]">
                  <Lead text={motion.lead} emphasis={motion.emphasis} />
                </p>

                <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-mt-slate">
                  {motion.body}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {motion.tags.map((tag) => (
                    <li key={tag.href}>
                      <Link
                        href={tag.href}
                        className="inline-flex whitespace-nowrap rounded-[20px] border border-mt-purple/25 bg-mt-surface px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.12em] text-mt-purple transition-colors duration-150 hover:border-mt-purple active:border-mt-purple-light"
                      >
                        {tag.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Figures panel */}
              <div className="self-start overflow-hidden rounded-[18px] border border-mt-border">
                <p className="border-b border-mt-border bg-mt-surface px-6 py-4 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                  {motion.panel}
                </p>
                <dl className="grid gap-px bg-mt-border sm:grid-cols-3">
                  {motion.figures.map((f) => (
                    <div key={f.label} className="bg-white px-5 py-6">
                      <dt className="sr-only">{f.label}</dt>
                      <dd>
                        <span className="block text-2xl font-extrabold tracking-tight text-mt-ink">
                          {f.value}
                        </span>
                        <span className="mt-2 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">
                          {f.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
            Counts, not percentages. Open a page and check any of them
          </span>
          <Link
            href="/work"
            className="mt-underline inline-flex items-center text-base font-semibold text-mt-purple"
          >
            See the work behind these
          </Link>
        </div>
      </Container>
    </section>
  );
}
