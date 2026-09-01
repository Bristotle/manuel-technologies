import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* The engine. REF, higglo.io homepage section 02, "Six disciplines. One
   engine."
   ---------------------------------------------------------------------------
   Taken: the drawing-office register. A figure number, a revision stamp, a
   caption rail, a legend, and three numbered axioms beneath. The schematic
   itself runs six discipline nodes into one engine and out to a single
   output, with a compound loop returning.

   This is the most on brand thing on the reference, because CLAUDE.md section
   4 already asks for exactly it: "Connector lines. Thin 1px rules running off
   canvas into pill shaped labels. Reads as a technical schematic." The
   reference commits to that register harder than we had, which is the useful
   part to take.

   NOT TAKEN: their drag to pan interaction. It needs client JavaScript to do
   something a responsive viewBox does for free, and the whole diagram fits.
   Inline SVG, no library, no client component, so this section ships 0KB.

   NOT TAKEN: their subject and their numbers. No pipeline percentages, no
   retention figures. The axioms are our own positions, each one already
   stated elsewhere on this site.
   -------------------------------------------------------------------------- */

const DISCIPLINES = [
  { short: "SEO", href: "/grow/technical-seo" },
  { short: "GEO", href: "/grow/geo" },
  { short: "UX", href: "/build/web-design" },
  { short: "Web dev", href: "/build/website-development" },
  { short: "AI agents", href: "/scale/ai-agents" },
  { short: "Automation", href: "/scale/ai-automations" },
];

const AXIOMS = [
  {
    code: "Ax.01",
    title: "Disciplines are not separate retainers.",
    body: "Search, interface, build and automation are nodes in one system. Run as six programmes they compete for budget, and the seams between them are where the work is lost.",
  },
  {
    code: "Ax.02",
    title: "Shipped is the only state that counts.",
    body: "A recommendation nobody deploys is a cost with no result attached. Rankings and reports are intermediate signals. The measure is whether the thing is live and doing its job.",
  },
  {
    code: "Ax.03",
    title: "It keeps working after handover.",
    body: "Working code, a documented deployment path, and the next improvements written down. The system does not reset when the engagement ends, which is the entire argument for building rather than renting.",
  },
];

/* Node geometry. Six on the left, engine in the middle, output right.
   Coordinates are plain numbers so the wires can be derived from them rather
   than hand drawn twice. */
const NODE_W = 132;
const NODE_H = 38;
const LEFT_X = 8;
const ENGINE_X = 372;
const ENGINE_W = 216;
const ENGINE_Y = 88;
const ENGINE_H = 148;
const OUT_X = 660;
const OUT_W = 172;
const ROW_GAP = 46;
const TOP = 22;

function nodeY(index: number) {
  return TOP + index * ROW_GAP;
}

export function Engine() {
  const engineCentreY = ENGINE_Y + ENGINE_H / 2;

  return (
    <section className="border-b border-mt-border bg-mt-surface py-24 sm:py-32">
      <Container size="wide">
        {/* Header rail, drawing office register */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-mt-border pb-5">
          <SectionLabel>The engine</SectionLabel>
          <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
            Schematic · integrated delivery
          </span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <h2 className="!text-3xl !leading-[1.08] sm:!text-4xl">
            Six disciplines. One engine.{" "}
            <span className="text-mt-purple">Accountable to shipped work.</span>
          </h2>
          <p className="max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            This is what we mean by a system. Search, AI visibility, interface,
            the build underneath, and the automation behind it, wired together
            so the disciplines compound instead of competing for budget. One
            roadmap, one owner, one set of decisions.
          </p>
        </div>

        {/* Figure */}
        <figure className="mt-reveal mt-14 overflow-hidden rounded-[18px] border border-mt-border bg-white">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-mt-border px-6 py-4">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
              Fig. 01
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              Six disciplines → one engine → shipped work
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              Rev. 26.08
            </span>
          </div>

          <div className="px-4 py-8 sm:px-8 sm:py-10">
            <svg
              viewBox="0 0 840 320"
              className="h-auto w-full"
              role="img"
              aria-labelledby="engine-figure-title engine-figure-desc"
            >
              <title id="engine-figure-title">
                Integrated delivery schematic
              </title>
              <desc id="engine-figure-desc">
                Six disciplines, SEO, GEO, UX, web development, AI agents and
                automation, feed into one engine, which outputs shipped work.
                A compound loop returns from the output back into the engine.
              </desc>

              {/* Discipline wires into the engine */}
              {DISCIPLINES.map((d, i) => {
                const y = nodeY(i) + NODE_H / 2;
                const startX = LEFT_X + NODE_W;
                const midX = (startX + ENGINE_X) / 2;
                return (
                  <path
                    key={d.short}
                    d={`M ${startX} ${y} C ${midX} ${y}, ${midX} ${engineCentreY}, ${ENGINE_X} ${engineCentreY}`}
                    fill="none"
                    stroke="var(--color-mt-border)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Primary feed, engine to output */}
              <path
                d={`M ${ENGINE_X + ENGINE_W} ${engineCentreY} H ${OUT_X}`}
                fill="none"
                stroke="var(--color-mt-purple)"
                strokeWidth="2"
              />
              <path
                d={`M ${OUT_X - 12} ${engineCentreY - 5} L ${OUT_X} ${engineCentreY} L ${OUT_X - 12} ${engineCentreY + 5}`}
                fill="none"
                stroke="var(--color-mt-purple)"
                strokeWidth="2"
              />

              {/* Compound loop, output back into the engine */}
              <path
                d={`M ${OUT_X + OUT_W / 2} ${engineCentreY + 34} C ${OUT_X + OUT_W / 2} 300, ${ENGINE_X + ENGINE_W / 2} 300, ${ENGINE_X + ENGINE_W / 2} ${ENGINE_Y + ENGINE_H}`}
                fill="none"
                stroke="var(--color-mt-purple-light)"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />

              {/* Discipline nodes */}
              {DISCIPLINES.map((d, i) => (
                <g key={d.short}>
                  <rect
                    x={LEFT_X}
                    y={nodeY(i)}
                    width={NODE_W}
                    height={NODE_H}
                    rx="10"
                    fill="#FFFFFF"
                    stroke="var(--color-mt-border)"
                  />
                  <text
                    x={LEFT_X + NODE_W / 2}
                    y={nodeY(i) + NODE_H / 2 + 4}
                    textAnchor="middle"
                    className="fill-mt-slate font-[family-name:var(--font-mono)]"
                    fontSize="11"
                    letterSpacing="1.2"
                  >
                    {d.short.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Engine */}
              <rect
                x={ENGINE_X}
                y={ENGINE_Y}
                width={ENGINE_W}
                height={ENGINE_H}
                rx="16"
                fill="var(--color-mt-ink)"
              />
              <text
                x={ENGINE_X + ENGINE_W / 2}
                y={ENGINE_Y + 56}
                textAnchor="middle"
                className="fill-white font-[family-name:var(--font-mono)]"
                fontSize="10"
                letterSpacing="1.6"
                opacity="0.6"
              >
                ONE ROADMAP
              </text>
              <text
                x={ENGINE_X + ENGINE_W / 2}
                y={ENGINE_Y + 88}
                textAnchor="middle"
                className="fill-white"
                fontSize="26"
                fontWeight="800"
                letterSpacing="-0.5"
              >
                The engine
              </text>
              <text
                x={ENGINE_X + ENGINE_W / 2}
                y={ENGINE_Y + 116}
                textAnchor="middle"
                className="fill-white font-[family-name:var(--font-mono)]"
                fontSize="10"
                letterSpacing="1.6"
                opacity="0.6"
              >
                ONE OWNER
              </text>

              {/* Output */}
              <rect
                x={OUT_X}
                y={engineCentreY - 34}
                width={OUT_W}
                height="68"
                rx="14"
                fill="#FFFFFF"
                stroke="var(--color-mt-purple)"
              />
              <text
                x={OUT_X + OUT_W / 2}
                y={engineCentreY - 8}
                textAnchor="middle"
                className="fill-mt-muted font-[family-name:var(--font-mono)]"
                fontSize="9"
                letterSpacing="1.4"
              >
                OUTPUT
              </text>
              <text
                x={OUT_X + OUT_W / 2}
                y={engineCentreY + 14}
                textAnchor="middle"
                className="fill-mt-ink"
                fontSize="16"
                fontWeight="800"
              >
                Shipped work
              </text>
              <text
                x={OUT_X + OUT_W / 2}
                y={296}
                textAnchor="middle"
                className="fill-mt-muted font-[family-name:var(--font-mono)]"
                fontSize="9"
                letterSpacing="1.4"
              >
                COMPOUND LOOP
              </text>
            </svg>
          </div>

          {/* Legend */}
          <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-mt-border px-6 py-4">
            {[
              ["Discipline wire", "h-px w-6 bg-mt-border"],
              ["Primary feed", "h-0.5 w-6 bg-mt-purple"],
              ["Compound loop", "h-px w-6 bg-mt-purple-light"],
            ].map(([label, bar]) => (
              <li key={label} className="flex items-center gap-2">
                <span aria-hidden="true" className={bar} />
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-mt-border px-6 py-4">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              Fig. 01 · MT/26 · six disciplines, one owner
            </span>
            <Link
              href="/agency-vs-engineer"
              className="mt-underline inline-flex items-center text-sm font-semibold text-mt-purple"
            >
              Inspect how this differs from a retainer
            </Link>
          </figcaption>
        </figure>

        {/* Axioms */}
        <ol className="mt-reveal-group mt-14 grid gap-8 md:grid-cols-3">
          {AXIOMS.map((a) => (
            <li key={a.code} className="border-t border-mt-border pt-6">
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                {a.code}
              </span>
              <h3 className="mt-4 !text-lg !tracking-tight">{a.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                {a.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
