"use client";

/* The only client component in the header. State and a click handler,
   so it earns "use client". Everything around it stays server rendered.

   THE BUG THIS FILE HAD. The panel is absolutely positioned inside a
   header that was position relative with no z-index. Every page's hero
   section is also position relative, comes later in the DOM, and painted
   over the open panel. Fixed with z-50 here and z-40 on the header.

   The four menus with children are <details>, so expanding a pillar on a
   phone costs no state and no handler. */

import Link from "next/link";
import { useEffect, useState } from "react";
import { MENUS, PLAIN } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  /* Escape closes it, and the body does not scroll behind an open panel. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex h-11 w-11 items-center justify-center rounded-[10px] font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-mt-purple transition-colors duration-150 hover:bg-mt-surface"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-100%)] overflow-y-auto border-b border-mt-border bg-white"
        >
          <nav className="mx-auto w-full max-w-5xl px-6 py-6" aria-label="Primary">
            <ul className="flex flex-col">
              {MENUS.map((menu) => (
                <li key={menu.href} className="border-b border-mt-border">
                  <details className="group">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-lg font-semibold text-mt-ink marker:hidden">
                      {menu.name}
                      <span aria-hidden="true" className="text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45">+</span>
                    </summary>
                    <ul className="flex flex-col pb-3 pl-4">
                      <li>
                        <Link href={menu.href} onClick={close} className="flex min-h-11 items-center font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-purple">
                          {menu.footer.label}
                        </Link>
                      </li>
                      {menu.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={close} className="flex min-h-11 items-center text-base text-mt-slate hover:text-mt-purple">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
              {PLAIN.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-11 items-center border-b border-mt-border text-lg font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/free-audit" onClick={close} className="mt-6 flex min-h-11 items-center justify-center rounded-[10px] border border-mt-border px-6 text-base font-semibold text-mt-ink">
              Free audit
            </Link>
            <Link href="/contact" onClick={close} className="mt-3 flex min-h-11 items-center justify-center rounded-[10px] bg-mt-purple px-6 text-base font-semibold text-white">
              Start a conversation
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
