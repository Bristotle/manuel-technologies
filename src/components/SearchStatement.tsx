import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* --------------------------------------------------------------------------
   Search statement, homepage, under the work reel. From diptell.com,
   7 November 2026: one centred sentence, flanked by tilted pills naming
   the services.

   Adapted, not copied. The pills are real links, one to each SEO service
   under /grow, so the section does a job for the visitor and for crawlers:
   six internal links from the strongest page on the site. No box-shadow,
   per section 3 of CLAUDE.md, so the pills float on a border and a tilt.
   The tilt is a static transform, not motion. Teal, because this is the
   Grow pillar, and it is the only band in the viewport.

   Below lg the pills drop under the sentence as a wrapped row, untilted,
   so nothing overlaps at 360px.
   -------------------------------------------------------------------------- */

type Pill = { label: string; href: string; icon: React.ReactNode; tilt: string };

const icon = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
    {d}
  </svg>
);

const LEFT: Pill[] = [
  { label: "Technical SEO", href: "/grow/technical-seo", tilt: "lg:-rotate-3 lg:-translate-x-4", icon: icon(<><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /></>) },
  { label: "On-page SEO", href: "/grow/on-page-seo", tilt: "lg:rotate-2 lg:translate-x-8", icon: icon(<><path d="M5 4h10l4 4v12H5Z" /><path d="M9 12h6M9 16h4" /></>) },
  { label: "Programmatic SEO", href: "/grow/programmatic-seo", tilt: "lg:-rotate-2", icon: icon(<><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>) },
];

const RIGHT: Pill[] = [
  { label: "Link building", href: "/grow/link-building", tilt: "lg:-rotate-3 lg:translate-x-4", icon: icon(<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>) },
  { label: "AI search (GEO)", href: "/grow/geo", tilt: "lg:-rotate-2 lg:-translate-x-8", icon: icon(<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /><path d="M11 8v6M8 11h6" /></>) },
  { label: "Content", href: "/grow/content-branding", tilt: "lg:rotate-3", icon: icon(<><path d="M4 20h4L19 9l-4-4L4 16Z" /><path d="m13 7 4 4" /></>) },
];

function PillLink({ pill }: { pill: Pill }) {
  return (
    <li className={pill.tilt}>
      <Link
        href={pill.href}
        className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-mt-border bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold sm:min-h-12 sm:gap-3 sm:py-2 sm:pl-2 sm:pr-5 sm:text-[0.9375rem] text-mt-ink transition-colors duration-150 hover:border-mt-teal hover:text-mt-teal-ink active:bg-mt-surface"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mt-teal/10 text-mt-teal-ink">
          {pill.icon}
        </span>
        {pill.label}
      </Link>
    </li>
  );
}

export function SearchStatement() {
  return (
    <section className="overflow-hidden bg-white pb-24 sm:pb-32">
      <Container>
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-12 bg-mt-border sm:w-24" />
          <SectionLabel accent="teal">Search</SectionLabel>
          <span aria-hidden="true" className="h-px w-12 bg-mt-border sm:w-24" />
        </div>

        <div className="mt-12 grid gap-2 sm:gap-3 lg:grid-cols-[1fr_minmax(0,30rem)_1fr] lg:items-center lg:gap-8">
          <h2 className="mt-reveal mb-8 text-center lg:mb-0 !text-[clamp(1.75rem,4vw,2.5rem)] !leading-[1.12] lg:order-2">
            We get businesses found on Google and named by AI search, from the
            code crawlers read to{" "}
            <span className="text-mt-muted">the pages people click.</span>
          </h2>

          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:order-1 lg:flex-col lg:items-end lg:gap-8">
            {LEFT.map((p) => (
              <PillLink key={p.href} pill={p} />
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:order-3 lg:mt-0 lg:flex-col lg:items-start lg:gap-8">
            {RIGHT.map((p) => (
              <PillLink key={p.href} pill={p} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
