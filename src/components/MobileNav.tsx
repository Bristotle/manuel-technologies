"use client";

/* The only client component in the header. State and a click handler,
   so it earns "use client". Everything around it stays server rendered. */

import Link from "next/link";
import { useState } from "react";
import { NAV } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
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
          className="absolute inset-x-0 top-full border-b border-mt-border bg-white"
        >
          <nav className="mx-auto w-full max-w-5xl px-6 py-6">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center border-b border-mt-border text-lg font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Free audit is a header button on desktop rather than a NAV
                entry, so it has to be added here explicitly or it disappears
                on mobile. */}
            <Link
              href="/free-audit"
              onClick={() => setOpen(false)}
              className="mt-6 flex min-h-11 items-center justify-center rounded-[10px] border border-mt-border px-6 text-base font-semibold text-mt-ink"
            >
              Free audit
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-11 items-center justify-center rounded-[10px] bg-mt-purple px-6 text-base font-semibold text-white"
            >
              Start a conversation
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
