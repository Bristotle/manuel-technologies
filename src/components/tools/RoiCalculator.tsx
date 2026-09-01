"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateRoi,
  CURRENCIES,
  formatMoney,
  formatNumber,
  type RoiInput,
} from "@/lib/tools/roi";

/* Organic traffic and ROI calculator.

   Client component because it recalculates as you type. No API call, so it
   costs nothing to run and there is no rate limit, unlike the Claude backed
   tools. Everything happens in the browser and nothing is sent anywhere.

   The framing rule: every figure is presented as arithmetic on the numbers
   the visitor typed, never as a prediction. See the note in lib/tools/roi.ts.
   The copy says "if" and "at your own numbers" deliberately and often. */

const DEFAULTS: RoiInput = {
  sessions: 2000,
  conversionRate: 2,
  closeRate: 25,
  customerValue: 3000,
  monthlyInvestment: 2500,
};

const FIELDS: {
  key: keyof RoiInput;
  label: string;
  hint: string;
  suffix?: string;
  money?: boolean;
  step?: number;
}[] = [
  {
    key: "sessions",
    label: "Organic sessions a month",
    hint: "From Search Console or analytics. Organic only, not total traffic.",
  },
  {
    key: "conversionRate",
    label: "Visit to enquiry rate",
    hint: "What share of visits become an enquiry. Two percent is a common starting point.",
    suffix: "%",
    step: 0.1,
  },
  {
    key: "closeRate",
    label: "Enquiry to customer rate",
    hint: "What share of enquiries you actually win. Most people overestimate this.",
    suffix: "%",
    step: 1,
  },
  {
    key: "customerValue",
    label: "Average customer value",
    hint: "Over the whole relationship, not the first invoice.",
    money: true,
  },
  {
    key: "monthlyInvestment",
    label: "Monthly cost being considered",
    hint: "Optional. Leave at zero to skip the return and break even figures.",
    money: true,
  },
];

export function RoiCalculator() {
  const [input, setInput] = useState<RoiInput>(DEFAULTS);
  const [currency, setCurrency] = useState<string>("GBP");

  const result = useMemo(() => calculateRoi(input), [input]);
  const symbol =
    CURRENCIES.find((c) => c.code === currency)?.symbol ?? "£";
  const money = (v: number) => formatMoney(v, currency);

  function update(key: keyof RoiInput, raw: string) {
    const value = raw === "" ? 0 : Number(raw);
    setInput((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }));
  }

  const hasTraffic = input.sessions > 0 && result.baseline.valuePerSession > 0;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      {/* Inputs */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8"
      >
        <span className="mt-label">Your numbers</span>
        <h2 className="mt-5 !text-2xl !tracking-tight">
          Five figures you already have
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
          Nothing is sent anywhere. The maths runs in your browser and updates
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
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </label>

          {FIELDS.map((field) => (
            <label
              key={field.key}
              className="block text-sm font-semibold text-mt-ink"
            >
              {field.label}
              {field.money ? ` (${symbol})` : field.suffix ? ` (${field.suffix})` : ""}
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={field.step ?? 1}
                value={String(input[field.key])}
                onChange={(e) => update(field.key, e.target.value)}
                className="contact-input mt-2 block w-full"
              />
              <span className="mt-2 block text-[0.8125rem] font-normal leading-relaxed text-mt-muted">
                {field.hint}
              </span>
            </label>
          ))}
        </div>
      </form>

      {/* Results */}
      <div className="flex flex-col gap-5">
        {/* Baseline */}
        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">Where you are now</span>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ["Enquiries a month", formatNumber(result.baseline.enquiries)],
              ["Customers a month", formatNumber(result.baseline.customers)],
              ["Value a month", money(result.baseline.monthlyValue)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">
                  {label}
                </dt>
                <dd className="mt-2 text-2xl font-extrabold tracking-tight text-mt-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 border-t border-mt-border pt-6">
            <p className="text-[0.9375rem] leading-relaxed text-mt-slate">
              At your own numbers, one organic session is worth{" "}
              <strong className="font-semibold text-mt-purple">
                {money(result.baseline.valuePerSession)}
              </strong>
              . That single figure is the one worth writing down, because it
              turns every traffic decision into a money decision.
            </p>
          </div>
        </div>

        {/* Scenarios */}
        <div className="overflow-hidden rounded-[18px] border border-mt-border">
          <div className="border-b border-mt-border bg-mt-surface px-6 py-4">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              If organic sessions rose by
            </span>
          </div>
          <div className="grid gap-px bg-mt-border sm:grid-cols-3">
            {result.scenarios.map((s) => (
              <div key={s.uplift} className="bg-white px-6 py-6">
                <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-purple">
                  +{s.uplift}%
                </span>
                <p className="mt-4 text-2xl font-extrabold tracking-tight text-mt-ink">
                  {money(s.extraMonthlyValue)}
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                  extra a month
                </p>
                <dl className="mt-5 flex flex-col gap-2 border-t border-mt-border pt-4 text-[0.8125rem] text-mt-slate">
                  <div className="flex justify-between gap-3">
                    <dt>Extra enquiries</dt>
                    <dd className="font-semibold text-mt-ink">
                      {formatNumber(s.extraEnquiries)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Extra customers</dt>
                    <dd className="font-semibold text-mt-ink">
                      {formatNumber(s.extraCustomers)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Over a year</dt>
                    <dd className="font-semibold text-mt-ink">
                      {money(s.extraAnnualValue)}
                    </dd>
                  </div>
                  {s.roi !== null && (
                    <div className="flex justify-between gap-3">
                      <dt>Return on spend</dt>
                      <dd className="font-semibold text-mt-purple">
                        {s.roi >= 100
                          ? "over 100x"
                          : `${formatNumber(s.roi, 2)}x`}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
        </div>

        {/* Break even, the honest half */}
        <div className="rounded-[18px] border border-mt-border bg-mt-surface p-6 sm:p-8">
          <span className="mt-label">The question that actually matters</span>
          {result.breakEvenUplift === null ? (
            <p className="mt-5 text-lg leading-relaxed text-mt-slate">
              Enter a monthly cost above and this shows how much extra traffic
              it would take before that spend pays for itself.
            </p>
          ) : !Number.isFinite(result.breakEvenUplift) || !hasTraffic ? (
            <p className="mt-5 text-lg leading-relaxed text-mt-slate">
              With the numbers as entered, a session is worth nothing, so no
              amount of extra traffic covers the cost. Check the conversion
              rate, close rate and customer value before reading anything else
              on this page.
            </p>
          ) : (
            <>
              <p className="mt-5 text-2xl leading-snug text-mt-ink">
                Organic sessions would need to rise{" "}
                <strong className="font-extrabold text-mt-purple">
                  {formatNumber(result.breakEvenUplift, 1)}%
                </strong>{" "}
                before {money(input.monthlyInvestment)} a month pays for itself.
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
                That is{" "}
                {formatNumber(
                  input.sessions * (result.breakEvenUplift / 100),
                  0,
                )}{" "}
                more sessions a month. Whether that is realistic depends on your
                market, your starting position and how long you give it. Anyone
                who tells you the number without asking those questions is
                guessing.
              </p>
            </>
          )}
        </div>

        {/* The disclaimer that makes the rest credible */}
        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">What this is not</span>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
            This is arithmetic on the five numbers you entered, not a forecast.
            It does not predict that traffic will rise, or say how long that
            would take, and no tool that has never seen your site can tell you
            either. What it does is turn a traffic conversation into a money
            conversation, so you can judge whether the work is worth
            commissioning at all.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/free-audit"
              className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light"
            >
              Audit the site these numbers come from
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-mt-border px-6 py-3.5 text-base font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple"
            >
              Talk it through
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
