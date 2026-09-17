import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { CONTACT, PILLARS, SITE, SOCIAL } from "@/lib/site";

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

   The newsletter posts to /api/subscribe, which files the address as a
   Resend contact. No database.

   Icons are inline SVG, from Simple Icons paths. No icon dependency.
   -------------------------------------------------------------------------- */

const PILLAR_COLUMNS = PILLARS.map((pillar) => ({
  heading: pillar.name,
  headingHref: `/${pillar.slug}` as string | null,
  links: pillar.services.map((service) => ({ name: service.name, href: service.href })),
}));

const COMPANY_COLUMN = {
  heading: "Company",
  headingHref: null as string | null,
  links: [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Pricing", href: "/pricing" },
    { name: "Free tools", href: "/free-tools" },
    { name: "Integrations", href: "/integrations" },
    { name: "Research", href: "/research/uk-accountancy-websites" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
};

const COLUMNS = [...PILLAR_COLUMNS, COMPANY_COLUMN];

const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />,
  Facebook: <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />,
  X: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />,
  GitHub: <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />,
};

/* Heading with the short rule under it, as the reference has it. */
function Heading({ children, href }: { children: React.ReactNode; href: string | null }) {
  const cls = "font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple";
  return (
    <div className="flex flex-col gap-3">
      {href ? (
        <Link href={href} className={`${cls} transition-colors duration-150 hover:text-mt-purple-light`}>{children}</Link>
      ) : (
        <p className={cls}>{children}</p>
      )}
      <span aria-hidden="true" className="block h-0.5 w-6 bg-mt-purple" />
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-[0.4em] h-2.5 w-2.5 shrink-0 text-mt-muted transition-colors duration-150 group-hover:text-mt-purple">
      <path d="M4 2.5 7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  const social = SOCIAL.filter((s) => s.href);

  return (
    <footer className="border-t border-mt-border bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)_1.25fr]">
          {/* Brand block: line, then socials under it */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo className="h-8 w-8 text-mt-purple" />
              <span className="text-base font-extrabold tracking-tight">{SITE.name}</span>
            </Link>
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              Websites, custom software, search visibility, and automation.
              Built and shipped by an engineer.
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={item.name}
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-mt-border text-mt-slate transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple"
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
                <Heading href={column.headingHref}>{column.heading}</Heading>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group flex items-start gap-1.5 text-[0.875rem] leading-snug text-mt-slate transition-colors duration-150 hover:text-mt-purple">
                        <Arrow />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
          ))}

          {/* Get in touch */}
          <div>
            <Heading href="/contact">Get in touch</Heading>
            <dl className="mt-5 flex flex-col gap-4 text-[0.875rem] leading-snug">
              <div className="flex flex-col gap-1">
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Phone</dt>
                <dd><a href={`tel:${CONTACT.tel}`} className="font-semibold text-mt-ink transition-colors duration-150 hover:text-mt-purple">{CONTACT.phone}</a></dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Email</dt>
                <dd><a href={`mailto:${SITE.email}`} className="font-semibold text-mt-ink transition-colors duration-150 hover:text-mt-purple">{SITE.email}</a></dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Office</dt>
                <dd className="text-mt-slate">{CONTACT.office}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Hours</dt>
                <dd className="text-mt-slate">{CONTACT.hours}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Newsletter band */}
        <div className="mt-16 grid gap-6 rounded-[18px] border border-mt-border bg-mt-surface p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <span className="mt-label">( Newsletter )</span>
            <p className="mt-3 max-w-[36ch] text-lg font-semibold leading-snug text-mt-ink">
              Free updates on new products, features and AI, straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-mt-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mt-muted">
            &copy; {new Date().getFullYear()} {SITE.name}. {CONTACT.office}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="text-sm text-mt-muted transition-colors duration-150 hover:text-mt-purple">Privacy policy</Link>
            <Link href="/terms-of-service" className="text-sm text-mt-muted transition-colors duration-150 hover:text-mt-purple">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
