import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { CONTACT, PILLARS, SITE, SOCIAL } from "@/lib/site";
import { ACCENT, PILLAR_ACCENT, type Accent } from "@/lib/accent";

/* Footer. REF capitalgainstaxexpert.co.uk, 17 September 2026, at
   Emmanuel's direction, replacing REF-009.
   ---------------------------------------------------------------------------
   Taken: a short rule under each column heading, a small arrow beside every
   link, the social icons sitting under the brand line, a "Get in touch"
   column with phone, email, office and hours on labelled rows, and a
   newsletter band beneath the columns. Colour, type, brackets and copy ours.

   Columns are Build, Grow, Scale and Company, then Get in touch. Each pillar
   lists its own services, which keeps a sitewide link to all sixteen service
   pages. Grow carries eight against Scale's three, and that asymmetry is
   honest.

   DARK, SINCE 17 SEPTEMBER 2026. The first pass was the same structure on
   white and Emmanuel's verdict was that it had no weight next to the
   reference. Ink is a brand colour and already grounds the top bar, the
   client spotlight and the closing CTA, so the footer joining them is a
   rhythm decision, not a new colour. Light lines and a purple bloom give it
   depth without a shadow.

   The newsletter posts to /api/subscribe, which files the address as a
   Resend contact. No database.

   Icons are inline SVG, from Simple Icons paths. No icon dependency.
   -------------------------------------------------------------------------- */

const PILLAR_COLUMNS = PILLARS.map((pillar) => ({
  heading: pillar.name,
  headingHref: `/${pillar.slug}` as string | null,
  accent: PILLAR_ACCENT[pillar.slug] as Accent,
  links: pillar.services.map((service) => ({ name: service.name, href: service.href })),
}));

const COMPANY_COLUMN = {
  heading: "Company",
  headingHref: null as string | null,
  accent: "purple" as Accent,
  links: [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Pricing", href: "/pricing" },
    { name: "Free tools", href: "/free-tools" },
    { name: "Integrations", href: "/integrations" },
    { name: "Research", href: "/research" },
    { name: "By industry", href: "/websites-for" },
    { name: "Glossary", href: "/glossary" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
};

const COLUMNS = [...PILLAR_COLUMNS, COMPANY_COLUMN];

/* Countable, and each one links to where it can be checked. */
const PILLS = [
  { label: "13 free tools", href: "/free-tools" },
  { label: "Chrome Web Store developer", href: SITE.chromeStore, external: true },
  { label: "Prices published", href: "/pricing" },
];

const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />,
  Facebook: <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />,
  X: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />,
  GitHub: <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />,
};

/* Heading with the short rule under it, as the reference has it. */
function Heading({ children, href, accent = "purple" }: { children: React.ReactNode; href: string | null; accent?: Accent }) {
  const band = ACCENT[accent];
  const cls = `font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] ${band.onDark}`;
  return (
    <div className="flex flex-col gap-3">
      {href ? (
        <Link href={href} className={`${cls} transition-colors duration-150 hover:text-white`}>{children}</Link>
      ) : (
        <p className={cls}>{children}</p>
      )}
      <span aria-hidden="true" className={`block h-0.5 w-6 ${band.rule}`} />
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-[0.4em] h-2.5 w-2.5 shrink-0 text-mt-lilac transition-colors duration-150 group-hover:text-white">
      <path d="M4 2.5 7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  const social = SOCIAL.filter((s) => s.href);

  return (
    <footer className="relative isolate overflow-hidden bg-mt-ink text-white">
      <div aria-hidden="true" className="mt-bg mt-grid-dark -z-10" />
      <div aria-hidden="true" className="mt-bg mt-glow-dark -z-10" />
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)_1.25fr]">
          {/* Brand block: wordmark, line, proof pills, socials */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo className="h-8 w-8 text-mt-lilac" />
              <span className="text-base font-extrabold tracking-tight text-white">{SITE.name}</span>
            </Link>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.22em] text-mt-lilac">Build. Grow. Scale.</p>
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-white/70">
              Websites, custom software, search visibility, and automation.
              Built and shipped by an engineer.
            </p>
            {/* Three countable facts as pills. Each is checkable. */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {PILLS.map((pill) => {
                const cls = "inline-flex min-h-8 items-center rounded-[20px] border border-white/15 px-3 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.12em] text-white/80 transition-colors duration-150 hover:border-mt-purple-light hover:text-white";
                return (
                  <li key={pill.label}>
                    {"external" in pill ? (
                      <a href={pill.href} target="_blank" rel="noopener noreferrer" className={cls}>{pill.label}</a>
                    ) : (
                      <Link href={pill.href} className={cls}>{pill.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="mt-6 flex items-center gap-2">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={item.name}
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 text-white/80 transition-colors duration-150 hover:border-mt-purple-light hover:bg-white/5 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
                      {ICONS[item.name]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Build, Grow, Scale, Company */}
          {COLUMNS.map((column) => (
              <div key={column.heading}>
                <Heading href={column.headingHref} accent={column.accent}>{column.heading}</Heading>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group flex items-start gap-1.5 text-[0.875rem] leading-snug text-white/70 transition-colors duration-150 hover:text-white">
                        <Arrow />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
          ))}

          {/* Get in touch: icon tile, label, value, then the newsletter card */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Heading href="/contact" accent="pink">Get in touch</Heading>
            <dl className="mt-5 flex flex-col gap-4 text-[0.875rem] leading-snug">
              {[
                { k: "Phone", v: <a href={`tel:${CONTACT.tel}`} className="text-white/85 hover:text-white">{CONTACT.phone}</a>, icon: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /> },
                { k: "Email", v: <a href={`mailto:${SITE.email}`} className="text-white/85 hover:text-white">{SITE.email}</a>, icon: <><path d="M3 6h18v12H3z" /><path d="m3 7 9 6 9-6" /></> },
                { k: "Where", v: <span className="text-white/85">{CONTACT.office}</span>, icon: <><path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11Z" /><circle cx="12" cy="10" r="2.2" /></> },
                { k: "Hours", v: <span className="text-white/85">{CONTACT.hours}</span>, icon: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></> },
              ].map((row) => (
                <div key={row.k} className="grid grid-cols-[36px_1fr] gap-x-3 gap-y-0.5">
                  <dt className="col-start-1 row-span-2 flex items-start">
                    <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 text-mt-lilac">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">{row.icon}</svg>
                    </span>
                    <span className="sr-only">{row.k}</span>
                  </dt>
                  <dd className="col-start-2 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-white/60" aria-hidden="true">{row.k}</dd>
                  <dd className="col-start-2 font-semibold">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Newsletter card */}
        <div className="mt-14 grid gap-6 rounded-[18px] border border-white/12 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-pink">( Newsletter )</span>
            <p className="mt-3 max-w-[36ch] text-lg font-semibold leading-snug text-white">
              Free updates on new products, features and AI, straight to your inbox.
            </p>
          </div>
          <NewsletterForm dark />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="text-sm text-white/50 transition-colors duration-150 hover:text-white">Privacy policy</Link>
            <Link href="/terms-of-service" className="text-sm text-white/50 transition-colors duration-150 hover:text-white">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
