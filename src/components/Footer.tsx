import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PILLARS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-mt-border bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 border-b border-mt-border pb-16 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-9 w-9 text-mt-purple" />
              <span className="text-base font-extrabold tracking-tight">
                Manuel Technologies
              </span>
            </Link>
            <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-mt-slate">
              {SITE.proof}
            </p>
          </div>

          <div className="border-t border-mt-border pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple">
              Start a conversation
            </p>
            <p className="mt-4 max-w-[32ch] text-base leading-relaxed text-mt-slate">
              Tell us what you are building, growing, or scaling.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex min-h-11 items-center border-b-2 border-mt-purple text-base font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="grid gap-12 border-b border-mt-border py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple">
              Explore
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {[
                ["Blog", "/blog"],
                ["About", "/about"],
                ["Work", "/work"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm leading-snug text-mt-slate transition-colors duration-150 hover:text-mt-purple"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {PILLARS.map((pillar) => (
            <div key={pillar.slug}>
              <Link
                href={`/${pillar.slug}`}
                className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple transition-colors duration-150 hover:text-mt-purple-light"
              >
                {pillar.name}
              </Link>
              <ul className="mt-6 flex flex-col gap-4">
                {pillar.services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-sm leading-snug text-mt-slate transition-colors duration-150 hover:text-mt-purple"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mt-muted">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/cwv-drift-monitor/privacy-policy"
              className="text-sm text-mt-muted transition-colors duration-150 hover:text-mt-purple"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
