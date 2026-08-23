import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PILLARS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-mt-border bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-9 w-9 text-mt-purple" />
              <span className="text-base font-extrabold tracking-tight">
                Manuel Technologies
              </span>
            </Link>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-mt-slate">
              {SITE.proof}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-block text-sm font-semibold text-mt-purple hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          {PILLARS.map((pillar) => (
            <div key={pillar.slug}>
              <Link
                href={`/${pillar.slug}`}
                className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple hover:underline"
              >
                ( {pillar.name.toUpperCase()} )
              </Link>
              <ul className="mt-5 flex flex-col gap-2.5">
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

        <div className="mt-16 flex flex-col gap-4 border-t border-mt-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mt-muted">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/cwv-drift-monitor/privacy-policy"
              className="text-sm text-mt-muted transition-colors duration-150 hover:text-mt-purple"
            >
              CWV Drift Monitor privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
