import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { NAV, SITE } from "@/lib/site";

/* Server component. Only MobileNav ships JavaScript. */

export function Header() {
  return (
    <header className="relative border-b border-mt-border bg-white">
      <div className="border-b border-mt-border bg-mt-ink px-6 py-2 text-center font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white">AI agents and automation, SEO and GEO, ROI-focused websites, and custom software built around your business.</div>
      <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors duration-150 hover:text-mt-purple-light"
          aria-label={`${SITE.name} home`}
        >
          <Logo className="h-9 w-9 text-mt-purple" />
          <span className="text-base font-extrabold tracking-tight text-mt-ink">
            Manuel Technologies
          </span>
        </Link>

        <nav className="ml-auto hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative inline-flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-slate transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-2 after:bg-mt-purple after:content-[''] hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Free audit sits beside the primary CTA rather than inside NAV.
            Eight nav items wrapped onto two lines and buried the tool; as a
            paired button it reads at a glance and keeps the rail clean. */}
        <div className="ml-auto hidden items-center gap-3 md:ml-0 md:flex">
          <Link
            href="/free-audit"
            className="whitespace-nowrap rounded-[10px] border border-mt-border px-4 py-2.5 text-sm font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple active:border-mt-purple-light"
          >
            Free audit
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-[10px] bg-mt-purple px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light"
          >
            Get in touch
          </Link>
        </div>

        <div className="ml-auto md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
