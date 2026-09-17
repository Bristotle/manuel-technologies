import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { MENUS, PLAIN } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { ACCENT } from "@/lib/accent";

/* Server component. Only MobileNav ships JavaScript.

   DROPDOWNS WITHOUT JAVASCRIPT. Build, Grow, Scale and Free tools open a
   panel on hover and on keyboard focus. The trigger is a real link to the
   hub page, so a click still goes somewhere, and the panel opens through
   :hover and :focus-within on the wrapper. Tabbing into the trigger opens
   it, tabbing through the items keeps it open, tabbing out closes it. No
   state, no client boundary, no bundle cost. REF capitalgainstaxexpert.co.uk
   for the pattern; the layout and copy are ours.

   The header is z-40 and the panels z-50 so they sit above every hero
   section, which is position relative and later in the DOM. That stacking
   was the mobile menu bug.

   BREAKPOINT IS lg, NOT md. Eight items plus two buttons overflowed at
   800px: Contact was cut and both buttons were pushed off screen. Below lg
   the mobile panel carries everything. Panels position against the nav
   rail rather than their own trigger: Build and Grow open from the rail's
   left end, Scale and Free tools from its right end, so a wide panel can
   never leave the viewport at any width the rail itself fits. */

const trigger =
  "relative inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-slate transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-2 after:bg-mt-purple after:content-[''] hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple";

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="h-2.5 w-2.5 transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180">
      <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  return (
    <>
    <div className="bg-mt-ink px-6 py-2 text-center font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white">AI agents and automation, SEO and GEO, ROI-focused websites, and custom software built around your business.</div>
    {/* Sticky, with the page blurring through it. The announcement bar
        above scrolls away so the sticky part is 72px, not 113. */}
    <header className="sticky top-0 z-40 border-b border-mt-border bg-white/85 backdrop-blur-md">
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

        <nav className="relative ml-auto hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-5 lg:gap-6">
            {MENUS.map((menu, index) => (
              <li key={menu.href} className="group">
                <Link href={menu.href} className={trigger} aria-haspopup="true">
                  {menu.name}
                  <Chevron />
                </Link>

                {/* The panel. Sits in the header's stacking context above the
                    page. A transparent pt-3 bridge keeps hover alive across
                    the gap between trigger and panel. */}
                <div className={`invisible absolute top-full z-50 w-max pt-3 opacity-0 ${index < 2 ? "left-0" : "right-0"} transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100`}>
                  <div className={`grid overflow-hidden rounded-[18px] border border-mt-border bg-white grid-cols-[15rem_1fr]`}>
                    {menu.feature ? (
                      <Link href={menu.feature.href} className="group/feat relative flex flex-col justify-end overflow-hidden border-r border-mt-border bg-mt-surface">
                        <div className="relative min-h-[10rem] w-full flex-1 overflow-hidden">
                          <Image src={menu.feature.src} alt={menu.feature.alt} fill sizes="240px" className="object-cover object-left-top transition-transform duration-300 group-hover/feat:scale-[1.03]" />
                        </div>
                        <div className="p-4">
                          <span className={`font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] ${ACCENT[menu.accent].text}`}>( {menu.feature.eyebrow} )</span>
                          <p className="mt-2 text-[0.9375rem] font-semibold leading-snug text-mt-ink">{menu.feature.title}</p>
                          <p className="mt-1 text-[0.8125rem] leading-snug text-mt-slate">{menu.feature.body}</p>
                        </div>
                      </Link>
                    ) : (
                      <Link href="/free-audit" className="relative flex flex-col justify-end overflow-hidden border-r border-mt-border bg-mt-ink p-5 text-white">
                        <div aria-hidden="true" className="mt-bg mt-glow-dark" />
                        <span className="relative font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-pink">( Start here )</span>
                        <p className="relative mt-2 text-lg font-bold leading-snug">Run the free audit on your own site.</p>
                        <p className="relative mt-2 text-[0.8125rem] leading-snug text-white/70">Twenty checks in about fifteen seconds. No account, nothing stored.</p>
                        <span className="relative mt-4 inline-flex text-sm font-semibold text-white">Audit my site →</span>
                      </Link>
                    )}
                    <div className="p-2">
                    <ul className={`grid gap-0.5 ${menu.items.length > 6 ? "grid-cols-2" : "grid-cols-1"} ${menu.items.length > 6 ? "w-[34rem]" : "w-[19rem]"}`}>
                      {menu.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex flex-col gap-0.5 rounded-[10px] px-4 py-3 transition-colors duration-150 hover:bg-mt-surface focus-visible:bg-mt-surface"
                          >
                            <span className="text-[0.9375rem] font-semibold text-mt-ink">{item.name}</span>
                            <span className="text-[0.8125rem] leading-snug text-mt-slate">{item.blurb}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={menu.footer.href}
                      className="mt-1 flex min-h-11 items-center justify-between rounded-[10px] border-t border-mt-border px-4 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-purple transition-colors duration-150 hover:bg-mt-surface"
                    >
                      {menu.footer.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {PLAIN.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={trigger}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Free audit sits beside the primary CTA rather than inside the
            menus. As a paired button it reads at a glance. */}
        <div className="ml-auto hidden items-center gap-3 lg:ml-0 lg:flex">
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

        <div className="ml-auto lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
    </>
  );
}
