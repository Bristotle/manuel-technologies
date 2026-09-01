"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AuditReport, Check, CheckStatus } from "@/lib/audit/types";

/* --------------------------------------------------------------------------
   The audit itself. One of the very few client components on the site, and it
   earns it: form state, a request in flight, and a result to render.

   CLAUDE.md section 4 says a free tool page must carry the tool itself, above
   the fold, working. This is that.
   -------------------------------------------------------------------------- */

const STATUS_STYLE: Record<CheckStatus, { dot: string; label: string }> = {
  pass: { dot: "bg-mt-purple", label: "Pass" },
  warn: { dot: "bg-mt-muted", label: "Review" },
  fail: { dot: "bg-mt-ink", label: "Fix" },
  info: { dot: "bg-mt-border", label: "Note" },
};

function Dial({ score }: { score: number }) {
  /* Ring drawn with conic-gradient. No chart library, no canvas, no JS at
     paint time. */
  return (
    <div
      className="relative flex h-40 w-40 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-mt-purple) ${score * 3.6}deg, var(--color-mt-border) 0deg)`,
      }}
      role="img"
      aria-label={`Overall score ${score} out of 100`}
    >
      <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
        <span className="text-4xl font-extrabold tracking-tight text-mt-ink">
          {score}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
          out of 100
        </span>
      </div>
    </div>
  );
}

function Bar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
          {label}
        </span>
        <span className="text-base font-semibold text-mt-ink">{score}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mt-border">
        <div
          className="h-full rounded-full bg-mt-purple"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function CheckRow({ check }: { check: Check }) {
  const style = STATUS_STYLE[check.status];
  return (
    <li className="grid gap-2 border-t border-mt-border py-4 sm:grid-cols-[1.5rem_11rem_1fr] sm:gap-4">
      <span className="flex items-center gap-2 sm:block sm:pt-1.5">
        <span
          className={`inline-block h-2 w-2 shrink-0 rounded-full ${style.dot}`}
          aria-hidden="true"
        />
        <span className="sr-only">{style.label}. </span>
      </span>
      <span className="text-[0.9375rem] font-semibold text-mt-ink">
        {check.label}
      </span>
      <span className="text-[0.9375rem] leading-relaxed text-mt-slate">
        {check.evidence}
      </span>
    </li>
  );
}

export function AuditForm() {
  const [url, setUrl] = useState("");
  const autoRan = useRef(false);
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);

  async function run(event: React.FormEvent) {
    event.preventDefault();
    await audit(url);
  }

  async function audit(target: string) {
    setUrl(target);
    setState("running");
    setError(null);
    setReport(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "That audit could not be completed.");
        setState("error");
        return;
      }
      setReport(data.report as AuditReport);
      setState("done");
    } catch {
      setError("The request failed. Check your connection and try again.");
      setState("error");
    }
  }

  /* Handoff from the homepage hero, which pushes /free-audit#u=<domain>.

     A fragment rather than a query string on purpose: searchParams would force
     this route to render on demand, which is exactly what made /blog dynamic
     until it was fixed. A fragment never reaches the server, so the page stays
     static and the handoff still works.

     Deferred to a microtask so no state is set synchronously inside the effect
     body, and guarded by a ref so it can only ever fire once. */
  useEffect(() => {
    if (autoRan.current) return;
    const match = window.location.hash.match(/^#u=(.+)$/);
    if (!match) return;
    autoRan.current = true;
    const incoming = decodeURIComponent(match[1]).slice(0, 300);
    /* Clear it so a refresh does not silently repeat a paid call. */
    window.history.replaceState(null, "", window.location.pathname);
    queueMicrotask(() => {
      void audit(incoming);
    });
  }, []);

  return (
    <div>
      {/* Input */}
      <form onSubmit={run} className="mt-beam rounded-[18px] border border-mt-border p-7 sm:p-8">
        <label
          htmlFor="audit-url"
          className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple"
        >
          ( Your website )
        </label>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <input
            id="audit-url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourcompany.com"
            disabled={state === "running"}
            className="min-h-12 w-full rounded-[10px] border border-mt-border bg-white px-4 py-3 text-base text-mt-ink transition-colors duration-150 placeholder:text-mt-muted hover:border-mt-purple-light focus:border-mt-purple disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={state === "running" || url.trim().length === 0}
            className="mt-sheen relative inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light active:bg-mt-purple disabled:opacity-50"
          >
            {state === "running" ? "Auditing your site" : "Audit my site"}
          </button>
        </div>

        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-mt-slate">
          We fetch the page, its robots.txt and its sitemap, then measure what
          we find. No account, no email, nothing stored. Takes about fifteen
          seconds.
        </p>

        {state === "running" && (
          <p
            aria-live="polite"
            className="mt-6 border-t border-mt-border pt-6 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-purple"
          >
            Fetching the page, reading robots.txt, checking the sitemap, scoring.
          </p>
        )}

        {state === "error" && error && (
          <p
            aria-live="polite"
            className="mt-6 border-t border-mt-border pt-6 text-[0.9375rem] leading-relaxed text-mt-ink"
          >
            {error}
          </p>
        )}
      </form>

      {/* Report */}
      {state === "done" && report && (
        <div className="mt-12">
          {/* Scores */}
          <div className="rounded-[18px] border border-mt-border bg-white p-7 sm:p-8">
            <div className="flex flex-col gap-3 border-b border-mt-border pb-6 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                ( Result )
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                {report.facts.finalUrl} · {(report.durationMs / 1000).toFixed(1)}s
              </span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
              <Dial score={report.overall} />
              <div className="grid gap-6 sm:grid-cols-2">
                {report.pillars.map((p) => (
                  <Bar key={p.pillar} label={p.label} score={p.score} />
                ))}
              </div>
            </div>
          </div>

          {/* Advice */}
          {report.advice && (
            <div className="mt-5 rounded-[18px] border border-mt-border bg-mt-surface p-7 sm:p-8">
              <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                ( What to do about it )
              </span>
              <h3 className="mt-5 max-w-[28ch] !text-2xl !tracking-tight">
                {report.advice.headline}
              </h3>
              <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
                {report.advice.summary}
              </p>

              <ol className="mt-reveal-group mt-10">
                {report.advice.actions.map((action) => (
                  <li
                    key={action.rank}
                    className="grid gap-2 border-t border-mt-border py-6 sm:grid-cols-[3rem_1fr] sm:gap-5"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-purple">
                      {String(action.rank).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="!text-lg !tracking-tight">{action.title}</h4>
                      <p className="mt-2 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
                        {action.why}
                      </p>
                      <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                        {action.severity} · {action.effort}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {report.advice.strengths.length > 0 && (
                <div className="mt-10 border-t border-mt-border pt-8">
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                    ( Already right )
                  </span>
                  <ul className="mt-5 flex flex-col gap-3">
                    {report.advice.strengths.map((s) => (
                      <li
                        key={s}
                        className="max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {report.adviceError && (
            <p className="mt-5 rounded-[18px] border border-mt-border bg-mt-surface p-7 text-[0.9375rem] leading-relaxed text-mt-slate sm:p-8">
              {report.adviceError}
            </p>
          )}

          {/* Every measured check, so nothing is taken on trust */}
          {report.pillars.map((pillar) => (
            <div
              key={pillar.pillar}
              className="mt-5 rounded-[18px] border border-mt-border bg-white p-7 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-mt-border pb-5">
                <h3 className="!text-xl !tracking-tight">{pillar.label}</h3>
                <span className="text-lg font-semibold text-mt-purple">
                  {pillar.score}
                </span>
              </div>
              <ul className="mt-2">
                {pillar.checks.map((c) => (
                  <CheckRow key={c.id} check={c} />
                ))}
              </ul>
            </div>
          ))}

          {/* AI crawler detail, the part most audits never look at */}
          <div className="mt-5 rounded-[18px] border border-mt-border bg-white p-7 sm:p-8">
            <h3 className="!text-xl !tracking-tight">AI crawler access</h3>
            <p className="mt-3 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              Read from your robots.txt. A blocked crawler cannot read the page,
              so no answer engine behind it can cite you, whatever the content
              says.
            </p>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border sm:grid-cols-2">
              {report.facts.crawlers.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between gap-4 bg-white px-5 py-4"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-mt-slate">
                    {c.name}
                  </span>
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] ${
                      c.allowed ? "text-mt-purple" : "text-mt-ink"
                    }`}
                  >
                    {c.allowed ? "Allowed" : "Blocked"}
                    {c.named ? " · named" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light active:bg-mt-purple"
            >
              Book a 15 minute call
            </Link>
            <button
              type="button"
              onClick={() => {
                setState("idle");
                setReport(null);
                setUrl("");
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-mt-border px-6 py-3.5 text-base font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple active:border-mt-purple-light"
            >
              Audit another site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
