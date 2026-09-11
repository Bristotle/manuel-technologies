"use client";

import { useState, type ReactNode } from "react";
import { CURRENCIES, RATES, type Currency } from "@/lib/pricing";

/* The currency toggle, and the only client component on /pricing.

   HOW IT WORKS WITHOUT RE-RENDERING THE PRICE LIST. Every price on the page
   is rendered on the server in all three currencies at once, as three spans
   (see <Price />). This component holds one piece of state and stamps it on
   a wrapper as data-currency. CSS in globals.css shows the matching span and
   hides the other two. The tables, the tier cards and the FAQ stay server
   components; the toggle adds under 1KB and never touches them.

   The children prop is how server rendered content passes through a client
   boundary untouched. Nothing inside it becomes client code. */

export function CurrencyScope({ children }: { children: ReactNode }) {
  const [ccy, setCcy] = useState<Currency>("GHS");

  return (
    <div data-currency={ccy}>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div
          role="group"
          aria-label="Show prices in"
          className="inline-flex rounded-[10px] border border-mt-border bg-white p-1"
        >
          {CURRENCIES.map((c) => {
            const on = c === ccy;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCcy(c)}
                className={`min-h-10 rounded-[7px] px-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] transition-colors duration-150 ${
                  on ? "bg-mt-purple text-white" : "text-mt-slate hover:bg-mt-surface hover:text-mt-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-mt-muted">
          {ccy === "GHS"
            ? "Prices are set in Ghana cedis."
            : `Guide conversion at ${RATES.source.label}, ${RATES.checked}. You are invoiced in cedis or by agreement.`}
        </p>
      </div>
      {children}
    </div>
  );
}
