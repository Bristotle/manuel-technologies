"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calculateRetainer, type RetainerInput } from "@/lib/tools/retainer";
import { CURRENCIES, formatMoney, formatNumber } from "@/lib/tools/roi";

/* Retainer versus building it once.

   An agency writing this calculator has an obvious thumb on the scale, so the
   model is deliberately fair to the retainer and the page says out loud what a
   retainer buys that a build does not. When the numbers favour the retainer,
   the tool says so. See the note in lib/tools/retainer.ts. */

const DEFAULTS: RetainerInput = {
  monthlyRetainer: 2500,
  monthsPaid: 14,
  buildCost: 28000,
  buildMonthlyUpkeep: 400,
  horizonMonths: 36,
};

const FIELDS: {
  key: keyof RetainerInput;
  label: string;
  hint: string;
  money?: boolean;
}[] = [
  { key: "monthlyRetainer", label: "Current monthly retainer", hint: "What you pay now, every month, for the work in question.", money: true },
  { key: "monthsPaid", label: "Months paid so far", hint: "Sunk, and it does not affect the decision ahead. Shown because people want to see it." },
  { key: "buildCost", label: "One off cost to build it", hint: "Designing and building the equivalent as something you own.", money: true },
  { key: "buildMonthlyUpkeep", label: "Monthly upkeep after", hint: "Hosting, updates and changes. Never zero, and a build that claims zero is being undersold.", money: true },
  { key: "horizonMonths", label: "Months to compare over", hint: "How far ahead the business actually plans. Three years is a fair default." },
];

export function RetainerVsBuild() {
  const [input, setInput] = useState<RetainerInput>(DEFAULTS);
  const [currency, setCurrency] = useState("GBP");
  const r = useMemo(() => calculateRetainer(input), [input]);
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "£";
  const money = (v: number) => formatMoney(v, currency);

  const meaningful = input.monthlyRetainer > 0 || input.buildCost > 0;
  const max = Math.max(r.retainerTotal, r.buildTotal, 1);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <form onSubmit={(e) => e.preventDefault()} className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
        <span className="mt-label">Your position</span>
        <h2 className="mt-5 !text-2xl !tracking-tight">What you pay, and what owning it would cost</h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
          Runs in your browser. Nothing is sent anywhere.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <label className="block text-sm font-semibold text-mt-ink">
            Currency
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="contact-input mt-2 block w-full">
              {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}
            </select>
          </label>

          {FIELDS.map((f) => (
            <label key={f.key} className="block text-sm font-semibold text-mt-ink">
              {f.label}{f.money ? ` (${symbol})` : ""}
              <input
                type="number" inputMode="decimal" min={0}
                value={String(input[f.key])}
                onChange={(e) => setInput((p) => ({ ...p, [f.key]: e.target.value === "" ? 0 : Number(e.target.value) }))}
                className="contact-input mt-2 block w-full"
              />
              <span className="mt-2 block text-[0.8125rem] font-normal leading-relaxed text-mt-muted">{f.hint}</span>
            </label>
          ))}
        </div>
      </form>

      <div className="flex flex-col gap-5">
        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">Over {r.horizon} months</span>
          <div className="mt-8 flex flex-col gap-6">
            {[
              { label: "Keep the retainer", value: r.retainerTotal, tone: "bg-mt-muted" },
              { label: "Build and maintain it", value: r.buildTotal, tone: "bg-mt-purple" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.9375rem] font-semibold text-mt-ink">{row.label}</span>
                  <span className="text-xl font-extrabold tracking-tight text-mt-ink">{money(row.value)}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mt-border">
                  <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${(row.value / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {meaningful && (
            <p className="mt-8 border-t border-mt-border pt-6 text-[0.9375rem] leading-relaxed text-mt-slate">
              {r.difference > 0 ? (
                <>Building costs <strong className="font-semibold text-mt-purple">{money(Math.abs(r.difference))} less</strong> over this horizon, and you own the result at the end of it.</>
              ) : r.difference < 0 ? (
                <>The retainer costs <strong className="font-semibold text-mt-ink">{money(Math.abs(r.difference))} less</strong> over this horizon. On money alone, keeping it is the right call.</>
              ) : (
                <>The two come out level over this horizon.</>
              )}
            </p>
          )}
        </div>

        <div className="rounded-[18px] border border-mt-border bg-mt-surface p-6 sm:p-8">
          <span className="mt-label">Crossover</span>
          {!meaningful ? (
            <p className="mt-5 text-lg leading-relaxed text-mt-slate">Enter your retainer and a build cost to see where the two lines cross.</p>
          ) : r.crossoverMonth === null ? (
            <p className="mt-5 text-lg leading-relaxed text-mt-slate">
              Upkeep meets or exceeds the retainer, so building never becomes
              cheaper. At these numbers the retainer is the right answer and no
              amount of time changes that.
            </p>
          ) : r.crossoverBeyondHorizon ? (
            <>
              <p className="mt-5 text-2xl leading-snug text-mt-ink">
                Building overtakes the retainer at month{" "}
                <strong className="font-extrabold text-mt-purple">{formatNumber(r.crossoverMonth, 0)}</strong>, beyond the {r.horizon} you are comparing.
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
                That is {formatNumber(r.crossoverMonth / 12, 1)} years. If the business does not plan that far ahead, the retainer is the sensible choice and this calculator has just told you not to hire us for it.
              </p>
            </>
          ) : (
            <>
              <p className="mt-5 text-2xl leading-snug text-mt-ink">
                Building costs less from month{" "}
                <strong className="font-extrabold text-mt-purple">{formatNumber(r.crossoverMonth, 0)}</strong> onward.
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
                Every month after that is {money(Math.max(0, input.monthlyRetainer - input.buildMonthlyUpkeep))} that stays in the business, and you hold the asset rather than renting access to it.
                {r.sunk > 0 && <> You have already paid {money(r.sunk)} on the retainer, which is spent either way and should not affect the decision ahead.</>}
              </p>
            </>
          )}
        </div>

        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">What a retainer buys that this does not count</span>
          <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-mt-slate">
            <li>Ongoing attention. Somebody is looking at it every month, which a finished asset does not give you.</li>
            <li>Flexibility. Priorities can move month to month without a new scope.</li>
            <li>No capital outlay, and the delivery risk sits with them rather than you.</li>
          </ul>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
            Those are real and arithmetic cannot price them. If what you need is
            continuous attention rather than a thing that exists, a retainer is
            the correct purchase and the crossover month is beside the point.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/agency-vs-engineer" className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light">
              Read the full comparison
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
