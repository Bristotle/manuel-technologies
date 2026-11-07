import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Accent } from "@/lib/accent";

/* --------------------------------------------------------------------------
   Pillar statement. One centred sentence, flanked by tilted pills that link
   to the services behind it. From diptell.com, 7 November 2026; first used
   as the search section on the homepage, then made the hero of each pillar
   hub on 7 November, because it was the clearest section on the site.

   Adapted, not copied. Every pill is a real link to a real page, so the
   section works for the visitor and for crawlers. No box-shadow (CLAUDE.md
   section 3): a border and a static tilt, which is a transform, not motion.
   The pills carry the pillar's band and nothing else in the section does,
   so there is one accent in the viewport.

   Below lg the pills drop under the sentence as a wrapped row, untilted.
   -------------------------------------------------------------------------- */

export type PillIcon = "code" | "page" | "grid" | "link" | "search" | "pen" | "layout" | "app" | "phone" | "plug" | "bolt" | "bot" | "chart" | "share" | "ad" | "till";

export type StatementPill = { label: string; href: string; icon: PillIcon };

const PATHS: Record<PillIcon, React.ReactNode> = {
  code: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /></>,
  page: <><path d="M5 4h10l4 4v12H5Z" /><path d="M9 12h6M9 16h4" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /><path d="M11 8v6M8 11h6" /></>,
  pen: <><path d="M4 20h4L19 9l-4-4L4 16Z" /><path d="m13 7 4 4" /></>,
  layout: <><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M3.5 9h17M9 9v10.5" /></>,
  app: <><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="m8 11 2 2-2 2M12.5 15h3.5" /></>,
  phone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
  plug: <><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0Z" /><path d="M12 17v4" /></>,
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6Z" />,
  bot: <><rect x="5" y="8" width="14" height="11" rx="2" /><path d="M12 4v4M9 13h.01M15 13h.01" /></>,
  chart: <><path d="M4 20h16" /><path d="M7 16v-5M12 16V7M17 16v-8" /></>,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="m8.2 10.9 6.6-3.6M8.2 13.1l6.6 3.6" /></>,
  ad: <><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m7.5 15 2-6 2 6M8.2 13h2.6M14 9v6h1.2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" /></>,
  till: <><rect x="4" y="10" width="16" height="10" rx="1.5" /><path d="M7 10V4h10v6M8 14h2M12 14h2M16 14h.01M8 17h8" /></>,
};

/* Literal class strings, so Tailwind sees them. Pink is the proof layer and
   never a pillar, so it is not offered here. */
const TONE: Record<Exclude<Accent, "pink">, { icon: string; hover: string }> = {
  purple: { icon: "bg-mt-purple/10 text-mt-purple", hover: "hover:border-mt-purple hover:text-mt-purple" },
  teal: { icon: "bg-mt-teal/10 text-mt-teal-ink", hover: "hover:border-mt-teal hover:text-mt-teal-ink" },
  amber: { icon: "bg-mt-amber/10 text-mt-amber-ink", hover: "hover:border-mt-amber hover:text-mt-amber-ink" },
};

/* A loose, hand placed scatter. Index by position in the column. */
const TILT_LEFT = ["lg:-rotate-3 lg:-translate-x-4", "lg:rotate-2 lg:translate-x-8", "lg:-rotate-2", "lg:rotate-3 lg:translate-x-4"];
const TILT_RIGHT = ["lg:-rotate-3 lg:translate-x-4", "lg:-rotate-2 lg:-translate-x-8", "lg:rotate-3", "lg:-rotate-2 lg:-translate-x-4"];

function PillLink({ pill, tilt, accent }: { pill: StatementPill; tilt: string; accent: Exclude<Accent, "pink"> }) {
  return (
    <li className={tilt}>
      <Link
        href={pill.href}
        className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-mt-border bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-mt-ink transition-colors duration-150 active:bg-mt-surface sm:min-h-12 sm:gap-3 sm:py-2 sm:pl-2 sm:pr-5 sm:text-[0.9375rem] ${TONE[accent].hover}`}
      >
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TONE[accent].icon}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
            {PATHS[pill.icon]}
          </svg>
        </span>
        {pill.label}
      </Link>
    </li>
  );
}

export function PillarStatement({
  label,
  accent,
  heading,
  muted,
  intro,
  pills,
  as: Heading = "h2",
  className = "bg-white pb-24 sm:pb-32",
}: {
  label: string;
  accent: Exclude<Accent, "pink">;
  heading: string;
  /* The tail of the sentence, set in muted ink. */
  muted?: string;
  intro?: string;
  pills: StatementPill[];
  as?: "h1" | "h2";
  className?: string;
}) {
  const half = Math.ceil(pills.length / 2);
  const left = pills.slice(0, half);
  const right = pills.slice(half);

  return (
    <section className={`overflow-hidden ${className}`}>
      <Container>
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-12 bg-mt-border sm:w-24" />
          <SectionLabel accent={accent}>{label}</SectionLabel>
          <span aria-hidden="true" className="h-px w-12 bg-mt-border sm:w-24" />
        </div>

        <div className="mt-12 grid gap-2 sm:gap-3 lg:grid-cols-[1fr_minmax(0,30rem)_1fr] lg:items-center lg:gap-8">
          <div className="mb-8 text-center lg:order-2 lg:mb-0">
            <Heading className="mt-reveal !text-[clamp(1.75rem,4vw,2.5rem)] !leading-[1.12]">
              {heading}
              {muted && (
                <>
                  {" "}
                  <span className="text-mt-muted">{muted}</span>
                </>
              )}
            </Heading>
            {intro && <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-mt-slate">{intro}</p>}
          </div>

          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:order-1 lg:flex-col lg:items-end lg:gap-8">
            {left.map((p, i) => (
              <PillLink key={p.href} pill={p} tilt={TILT_LEFT[i % TILT_LEFT.length]} accent={accent} />
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:order-3 lg:flex-col lg:items-start lg:gap-8">
            {right.map((p, i) => (
              <PillLink key={p.href} pill={p} tilt={TILT_RIGHT[i % TILT_RIGHT.length]} accent={accent} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
