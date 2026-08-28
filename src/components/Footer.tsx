import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PILLARS, SITE, SOCIAL } from "@/lib/site";

/* Footer. REF-009, shadcnblocks footer-7.
   ---------------------------------------------------------------------------
   Structure taken from the reference: brand block on the left with a short
   line and social row, three link columns on the right, a rule, then a bottom
   bar with copyright and legal. Colour, type and the bracket labels are ours.

   The previous footer listed all sixteen service pages across four columns,
   twenty one links in total. That is a sitemap, not a footer, and it was the
   heaviest block on every page. The reference caps each column at four, which
   is the actual lesson here.

   Nothing is orphaned by the change: each pillar hub links to all of its own
   services, so every service page keeps an internal link and a crawl path.

   Icons are inline SVG. The reference pulls react-icons for these, which is a
   dependency for four glyphs.
   -------------------------------------------------------------------------- */

const COLUMNS = [
  {
    heading: "Services",
    links: [
      ...PILLARS.map((p) => ({ name: p.name, href: `/${p.slug}` })),
      { name: "Free tools", href: "/free-tools" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Work", href: "/work" },
      { name: "Integrations", href: "/integrations" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "SEO audit", href: "/free-tools/seo-audit" },
      { name: "GEO content brief", href: "/free-tools/geo-content-brief" },
      { name: "AI agent readiness", href: "/free-tools/ai-agent-readiness" },
    ],
  },
] as const;

const ICONS: Record<string, React.ReactNode> = {
  GitHub: (
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  ),
  LinkedIn: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
  ),
};

export function Footer() {
  const social = SOCIAL.filter((s) => s.href);

  return (
    <footer className="border-t border-mt-border bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1.4fr] md:gap-16">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo className="h-8 w-8 text-mt-purple" />
              <span className="text-base font-extrabold tracking-tight">
                {SITE.name}
              </span>
            </Link>

            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              Websites, custom software, search visibility, and automation.
              Built and shipped by an engineer.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-mt-ink transition-colors duration-150 hover:text-mt-purple"
            >
              {SITE.email}
            </a>

            {social.length > 0 && (
              <ul className="mt-6 flex items-center gap-5">
                {social.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      rel="noopener"
                      aria-label={item.name}
                      className="flex h-11 w-11 items-center justify-center text-mt-muted transition-colors duration-150 hover:text-mt-purple"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        {ICONS[item.name]}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Three columns, four links each. Never more. */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple">
                  {column.heading}
                </p>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] leading-snug text-mt-slate transition-colors duration-150 hover:text-mt-purple"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-mt-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mt-muted">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-mt-muted transition-colors duration-150 hover:text-mt-purple"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-mt-muted transition-colors duration-150 hover:text-mt-purple"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
