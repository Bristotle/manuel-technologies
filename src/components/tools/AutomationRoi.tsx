"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateAutomation,
  HOURS_PER_FTE,
  WORKING_WEEKS_PER_YEAR,
  type AutomationInput,
} from "@/lib/tools/automation";
import { CURRENCIES, formatMoney, formatNumber } from "@/lib/tools/roi";

/* Manual task automation ROI, with the headcount tipping point folded in.
   Pure arithmetic in the browser, no API call.

   The residual field is the honest core of this tool. Automation almost never
   removes all of a task: exceptions, approvals and checking the output remain.
   Most calculators hide that assumption at zero and produce a flattering
   number. Here it is an input, floored at five percent. */

const DEFAULTS: AutomationInput = {
  people: 3,
  hoursPerWeek: 6,
  hourlyCost: 28,
  residual: 20,
  buildCost: 12000,
  monthlyRunCost: 150,
};

const FIELDS: {
  key: keyof AutomationInput;
  label: string;
  hint: string;
  money?: boolean;
  suffix?: string;
}[] = [
  { key: "people", label: "People doing this task", hint: "Anyone who touches it in a normal week." },
  { key: "hoursPerWeek", label: "Hours each, per week", hint: "Be honest rather than generous. Count the interruptions too." },
  { key: "hourlyCost", label: "Fully loaded hourly cost", hint: "Salary plus employer costs, divided by actual working hours. Not the headline salary.", money: true },
  { key: "residual", label: "Share still needing a person after", hint: "Exceptions, approvals and checking the output. Rarely below 10 percent in practice.", suffix: "%" },
  { key: "buildCost", label: "One off cost to build it", hint: "What the automation itself costs to design, build and test.", money: true },
  { key: "monthlyRunCost", label: "Monthly running cost", hint: "Licences, model usage, hosting and the maintenance nobody budgets for.", money: true },
];

export function AutomationRoi() {
  const [input, setInput] = useState<AutomationInput>(DEFAULTS);
  const [currency, setCurrency] = useState("GBP");
  const result = useMemo(() => calculateAutomation(input), [input]);
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "£";
  const money = (v: number) => formatMoney(v, currency);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8"
      >
        <span className="mt-label">The workflow</span>
        <h2 className="mt-5 !text-2xl !tracking-tight">Describe one repetitive task</h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
          One workflow at a time. Nothing is sent anywhere and the maths updates
          as you type.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <label className="block text-sm font-semibold text-mt-ink">
            Currency
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="contact-input mt-2 block w-full"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
              ))}
            </select>
          </label>

          {FIELDS.map((f) => (
            <label key={f.key} className="block text-sm font-semibold text-mt-ink">
              {f.label}
              {f.money ? ` (${symbol})` : f.suffix ? ` (${f.suffix})` : ""}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={f.key === "hoursPerWeek" ? 0.5 : 1}
                value={String(input[f.key])}
                onChange={(e) =>
                  setInput((p) => ({
                    ...p,
                    [f.key]: e.target.value === "" ? 0 : Number(e.target.value),
                  }))
                }
                className="contact-input mt-2 block w-full"
              />
              <span className="mt-2 block text-[0.8125rem] font-normal leading-relaxed text-mt-muted">
                {f.hint}
              </span>
            </label>
          ))}
        </div>
      </form>

      <div className="flex flex-col gap-5">
        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">What it costs you now</span>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ["Hours a week", formatNumber(result.current.weeklyHours)],
              ["Hours a year", formatNumber(result.current.annualHours, 0)],
              ["Cost a year", money(result.current.annualCost)],
            ].map(([l, v]) => (
              <div key={l}>
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">{l}</dt>
                <dd className="mt-2 text-2xl font-extrabold tracking-tight text-mt-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 border-t border-mt-border pt-6 text-[0.8125rem] leading-relaxed text-mt-muted">
            Based on {WORKING_WEEKS_PER_YEAR} working weeks, allowing for holiday.
          </p>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-mt-border">
          <div className="border-b border-mt-border bg-mt-surface px-6 py-4">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              After automating, with {formatNumber(input.residual, 0)}% still done by a person
            </span>
          </div>
          <div className="grid gap-px bg-mt-border sm:grid-cols-3">
            {[
              ["Hours freed a year", formatNumber(result.savings.annualHours, 0)],
              ["Gross saving a year", money(result.savings.grossAnnual)],
              ["Net of running cost", money(result.savings.netAnnual)],
            ].map(([l, v]) => (
              <div key={l} className="bg-white px-6 py-6">
                <span className="block text-2xl font-extrabold tracking-tight text-mt-ink">{v}</span>
                <span className="mt-2 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-mt-border bg-mt-surface p-6 sm:p-8">
          <span className="mt-label">Payback</span>
          {result.neverPaysBack ? (
            <p className="mt-5 text-lg leading-relaxed text-mt-slate">
              At these numbers the running cost meets or exceeds the saving, so
              the build never pays for itself. Either the task is too small to
              automate, or the residual share is too high for automation to help
              much. Both are worth knowing before commissioning anything.
            </p>
          ) : (
            <>
              <p className="mt-5 text-2xl leading-snug text-mt-ink">
                The build pays for itself in{" "}
                <strong className="font-extrabold text-mt-purple">
                  {result.paybackMonths < 1
                    ? "under a month"
                    : `${formatNumber(result.paybackMonths, 1)} months`}
                </strong>
                .
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
                That frees{" "}
                <strong className="font-semibold text-mt-ink">
                  {formatNumber(result.savings.fte, 2)} full time equivalents
                </strong>{" "}
                at {HOURS_PER_FTE} hours a week
                {result.threeYearReturn !== null && (
                  <>
                    , and returns{" "}
                    <strong className="font-semibold text-mt-ink">
                      {formatNumber(result.threeYearReturn, 1)}x
                    </strong>{" "}
                    on total cost over three years
                  </>
                )}
                .
              </p>
            </>
          )}
        </div>

        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">The part calculators leave out</span>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
            Freed hours are only money if the time is actually reallocated. A
            team that keeps the same headcount and absorbs more work has gained
            capacity, which is usually the better outcome but is not a line in
            the accounts. Treat the saving as the value of what those hours do
            next, not as a salary you stop paying.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/scale/ai-automations" className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light">
              How we build these
            </Link>
            <Link href="/free-tools/ai-agent-readiness" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-mt-border px-6 py-3.5 text-base font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple">
              Should it be an agent?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
