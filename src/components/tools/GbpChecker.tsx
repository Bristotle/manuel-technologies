"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  GBP_GROUPS,
  GBP_ITEMS,
  scoreGbp,
  type GbpItem,
} from "@/lib/tools/gbp";

/* Google Business Profile checker.

   Client component because it scores as you tick. No API call, so it costs
   nothing to run and nothing leaves the browser.

   The score is deliberately shown from the start rather than behind a submit
   button. Watching it move as you tick is the thing that makes the gaps feel
   real, and a submit step is one more place to abandon. */

function Ring({ score }: { score: number }) {
  return (
    <div
      className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-mt-purple) ${score * 3.6}deg, var(--color-mt-border) 0deg)`,
      }}
      role="img"
      aria-label={`Local dominance score ${score} out of 100`}
    >
      <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
        <span className="text-3xl font-extrabold tracking-tight text-mt-ink">
          {score}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.14em] text-mt-muted">
          out of 100
        </span>
      </div>
    </div>
  );
}

export function GbpChecker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const result = useMemo(() => scoreGbp(checked), [checked]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const top: GbpItem[] = result.actions.slice(0, 5);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      {/* Checklist */}
      <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
        <span className="mt-label">The checklist</span>
        <h2 className="mt-5 !text-2xl !tracking-tight">
          Twenty things, weighted by what actually moves local rankings
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
          Tick what is already true. The score updates as you go. Nothing is
          sent anywhere and there is no email to enter.
        </p>

        <div className="mt-8 flex flex-col gap-10">
          {GBP_GROUPS.map((group) => {
            const items = GBP_ITEMS.filter((i) => i.group === group);
            const g = result.groups.find((x) => x.group === group)!;
            return (
              <fieldset key={group}>
                <legend className="flex w-full items-baseline justify-between gap-4 border-b border-mt-border pb-3">
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                    {group}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                    {g.score}%
                  </span>
                </legend>

                <ul className="mt-2">
                  {items.map((item) => (
                    <li key={item.id} className="border-b border-mt-border">
                      <label className="flex cursor-pointer items-start gap-4 py-4">
                        <input
                          type="checkbox"
                          checked={Boolean(checked[item.id])}
                          onChange={() => toggle(item.id)}
                          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-mt-purple)]"
                        />
                        <span>
                          <span className="block text-[0.9375rem] font-semibold text-mt-ink">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-[0.8125rem] leading-relaxed text-mt-slate">
                            {item.why}
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            );
          })}
        </div>
      </div>

      {/* Score and plan */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
          <span className="mt-label">Local dominance score</span>
          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <Ring score={result.score} />
            <div>
              <p className="text-xl font-extrabold tracking-tight text-mt-ink">
                {result.band}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                {result.verdict}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-mt-border">
          <div className="border-b border-mt-border bg-mt-surface px-6 py-4">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              {result.actions.length === 0
                ? "Nothing outstanding"
                : `Do these first · ${result.actions.length} outstanding`}
            </span>
          </div>

          {result.actions.length === 0 ? (
            <p className="px-6 py-8 text-[0.9375rem] leading-relaxed text-mt-slate">
              Every item is ticked. The profile is not the constraint any more,
              so the next gain is on the pages the profile links to.
            </p>
          ) : (
            <ol className="px-6 py-2">
              {top.map((item, index) => (
                <li
                  key={item.id}
                  className="grid gap-2 border-b border-mt-border py-5 last:border-b-0 sm:grid-cols-[2rem_1fr] sm:gap-4"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-purple">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-mt-ink">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-mt-slate">
                      {item.why}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-[18px] border border-mt-border bg-mt-surface p-6 sm:p-8">
          <span className="mt-label">What this is</span>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
            A self assessment. We cannot read your profile: there is no public
            way to check another business&rsquo;s completeness, and anything
            claiming to scan it is guessing or scraping. What this does is score
            what you tell us against weights that reflect how much each item
            moves local visibility, then order the gaps so you know what to do
            on Monday.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/free-audit"
              className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light"
            >
              Now audit the website behind it
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
