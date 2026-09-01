"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  scoreChecklist,
  type Band,
  type ChecklistItem,
} from "@/lib/tools/checklist";

/* Shared UI for every weighted self assessment on the site.

   Client component because it scores as you tick. No API call, so it costs
   nothing to run and nothing leaves the browser.

   The score is visible from the start rather than behind a submit button.
   Watching it move as you tick is what makes the gaps feel real, and a submit
   step is one more place to abandon. */

export function ChecklistTool({
  items,
  bands,
  groups,
  invert = false,
  scoreLabel,
  actionLabel,
  emptyMessage,
  footnote,
  cta,
}: {
  items: ChecklistItem[];
  bands: Band[];
  groups: readonly string[];
  /* True when ticking a box is bad news, as in a risk index. */
  invert?: boolean;
  scoreLabel: string;
  actionLabel: string;
  emptyMessage: string;
  footnote: React.ReactNode;
  cta: { href: string; label: string };
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const result = useMemo(
    () => scoreChecklist(items, checked, bands, invert),
    [items, checked, bands, invert],
  );

  const top = result.actions.slice(0, 5);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      {/* Checklist */}
      <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
        <span className="mt-label">The checklist</span>
        <h2 className="mt-5 !text-2xl !tracking-tight">
          {items.length} checks, weighted by what actually changes the outcome
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
          {invert
            ? "Tick anything that is true of your setup. Each one counts against the score."
            : "Tick what is already true. The score updates as you go."}{" "}
          Nothing is sent anywhere and there is no email to enter.
        </p>

        <div className="mt-8 flex flex-col gap-10">
          {groups.map((group) => {
            const own = items.filter((i) => i.group === group);
            if (own.length === 0) return null;
            const g = result.groups.find((x) => x.group === group);
            return (
              <fieldset key={group}>
                <legend className="flex w-full items-baseline justify-between gap-4 border-b border-mt-border pb-3">
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                    {group}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                    {g ? g.score : 0}%
                  </span>
                </legend>

                <ul className="mt-2">
                  {own.map((item) => (
                    <li key={item.id} className="border-b border-mt-border">
                      <label className="flex cursor-pointer items-start gap-4 py-4">
                        <input
                          type="checkbox"
                          checked={Boolean(checked[item.id])}
                          onChange={() =>
                            setChecked((p) => ({ ...p, [item.id]: !p[item.id] }))
                          }
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
          <span className="mt-label">{scoreLabel}</span>
          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
            <div
              className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-mt-purple) ${result.score * 3.6}deg, var(--color-mt-border) 0deg)`,
              }}
              role="img"
              aria-label={`${scoreLabel} ${result.score} out of 100`}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-extrabold tracking-tight text-mt-ink">
                  {result.score}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.14em] text-mt-muted">
                  out of 100
                </span>
              </div>
            </div>
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
                : `${actionLabel} · ${result.actions.length} outstanding`}
            </span>
          </div>

          {result.actions.length === 0 ? (
            <p className="px-6 py-8 text-[0.9375rem] leading-relaxed text-mt-slate">
              {emptyMessage}
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
          <div className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
            {footnote}
          </div>
          <div className="mt-6">
            <Link
              href={cta.href}
              className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
