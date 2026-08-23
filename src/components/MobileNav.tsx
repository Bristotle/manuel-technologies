"use client";

/* The only client component in the header. State and a click handler,
   so it earns "use client". Everything around it stays server rendered. */

import Link from "next/link";
import { useState } from "react";
import { NAV, SITE } from "@/lib/site";

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
                    className="flex min-h-11 items-center border-b border-mt-border text-lg font-semibold text-mt-ink transition-colors duration-150 hover:text-mt-purple"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => setOpen(false)}
              className="mt-6 flex min-h-11 items-center justify-center rounded-[10px] bg-mt-purple px-6 text-base font-semibold text-white"
            >
              Start a conversation
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
