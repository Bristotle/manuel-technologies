import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { NAV, SITE } from "@/lib/site";

/* Server component. Only MobileNav ships JavaScript. */

export function Header() {
  return (
    <header className="relative border-b border-mt-border bg-white">
      <div className="border-b border-mt-border bg-mt-ink px-6 py-2 text-center font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white">AI agents and automation, SEO and GEO, ROI-focused websites, and custom software built around your business.</div>
      <div className="mx-auto flex w-full max-w-5xl items-center gap-8 px-6 py-4">
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
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative inline-flex min-h-11 items-center border-b-2 border-transparent font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-slate transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-2 after:bg-mt-purple after:content-[''] hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          className="ml-auto hidden rounded-[10px] bg-mt-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light md:ml-0 md:inline-flex"
        >
          Get in touch
        </Link>

        <div className="ml-auto md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
