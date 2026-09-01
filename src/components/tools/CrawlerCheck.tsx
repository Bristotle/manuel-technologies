"use client";

import { useState } from "react";
import Link from "next/link";

/* AI crawler compatibility check.

   Calls our own endpoint, which fetches the target's robots.txt behind the
   same SSRF fence as the full audit. No model call, so it is free to run and
   returns in about a second. */

type Crawler = { name: string; allowed: boolean; named: boolean };
type Result = {
  origin: string;
  robotsFound: boolean;
  robotsUrl: string;
  sitemapDeclared: boolean;
  crawlers: Crawler[];
  raw: string | null;
};

const WHO: Record<string, string> = {
  GPTBot: "ChatGPT and OpenAI training",
  ClaudeBot: "Claude",
  PerplexityBot: "Perplexity",
  "Google-Extended": "Gemini and AI Overviews grounding",
  "Applebot-Extended": "Apple Intelligence",
  CCBot: "Common Crawl, which feeds many models",
};

export function CrawlerCheck() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function run(event: React.FormEvent) {
    event.preventDefault();
    setState("running");
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/crawler-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "That check could not be completed.");
        setState("error");
        return;
      }
      setResult(data.result as Result);
      setState("done");
    } catch {
      setError("The request failed. Check your connection and try again.");
      setState("error");
    }
  }

  const blocked = result?.crawlers.filter((c) => !c.allowed) ?? [];

  return (
    <div>
      <form onSubmit={run} className="mt-beam rounded-[18px] border border-mt-border p-7 sm:p-8">
        <label htmlFor="crawler-url" className="mt-label">
          ( Domain to check )
        </label>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <input
            id="crawler-url"
            type="text"
            inputMode="url"
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
            className="mt-sheen relative inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light disabled:opacity-50"
          >
            {state === "running" ? "Reading robots.txt" : "Check my robots.txt"}
          </button>
        </div>
        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-mt-slate">
          We fetch your robots.txt and resolve the rules that apply to six named
          AI crawlers, including wildcard rules. Nothing is stored.
        </p>
        {state === "error" && error && (
          <p aria-live="polite" className="mt-6 border-t border-mt-border pt-6 text-[0.9375rem] text-mt-ink">
            {error}
          </p>
        )}
      </form>

      {state === "done" && result && (
        <div className="mt-10 flex flex-col gap-5">
          <div
            className={`rounded-[18px] border p-7 sm:p-8 ${
              blocked.length === 0 ? "border-mt-border bg-white" : "border-mt-purple bg-mt-surface"
            }`}
          >
            <span className="mt-label">Verdict</span>
            <h2 className="mt-5 max-w-[30ch] !text-2xl !tracking-tight sm:!text-3xl">
              {blocked.length === 0
                ? "Every checked AI crawler can read this site."
                : blocked.length === result.crawlers.length
                  ? "Every checked AI crawler is blocked."
                  : `${blocked.length} of ${result.crawlers.length} AI crawlers are blocked.`}
            </h2>
            <p className="mt-5 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
              {blocked.length === 0
                ? result.robotsFound
                  ? "Nothing in your robots.txt stops an answer engine fetching your pages. That is the floor, not the finish line: being readable is necessary before anything else matters."
                  : "There is no robots.txt at this domain, so everything is allowed by default. That works, though an explicit file is better because it removes the ambiguity and can point at your sitemap."
                : `A blocked crawler cannot read your pages, so the engine behind it cannot cite you, whatever your content says. Blocked here: ${blocked.map((c) => c.name).join(", ")}.`}
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border sm:grid-cols-2">
            {result.crawlers.map((c) => (
              <li key={c.name} className="bg-white px-6 py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-mt-ink">
                    {c.name}
                  </span>
                  <span
                    className={`font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] ${
                      c.allowed ? "text-mt-purple" : "text-mt-ink"
                    }`}
                  >
                    {c.allowed ? "Allowed" : "Blocked"}
                  </span>
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-mt-muted">
                  {WHO[c.name]}
                  {c.named ? " · named explicitly in your robots.txt" : " · inherits the wildcard rule"}
                </p>
              </li>
            ))}
          </ul>

          <div className="rounded-[18px] border border-mt-border bg-white p-7 sm:p-8">
            <span className="mt-label">Also worth knowing</span>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
              {result.robotsFound ? (
                <>
                  Your robots.txt is at{" "}
                  <a href={result.robotsUrl} rel="noopener" className="text-mt-purple underline decoration-mt-border underline-offset-4">
                    {result.robotsUrl}
                  </a>
                  , and it {result.sitemapDeclared ? "declares a sitemap, which is correct." : "does not declare a sitemap. Adding a Sitemap: line costs nothing and helps discovery."}
                </>
              ) : (
                <>No robots.txt was found at {result.origin}. Adding one lets you name crawlers explicitly and point at your sitemap.</>
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/free-audit" className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light">
                Run the full audit on this site
              </Link>
              <button
                type="button"
                onClick={() => { setState("idle"); setResult(null); setUrl(""); }}
                className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-mt-border px-6 py-3.5 text-base font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple"
              >
                Check another
              </button>
            </div>
          </div>

          {result.raw && (
            <details className="rounded-[18px] border border-mt-border bg-white p-7 sm:p-8">
              <summary className="cursor-pointer text-[0.9375rem] font-semibold text-mt-ink">
                Show the robots.txt we read
              </summary>
              <pre className="mt-5 overflow-x-auto whitespace-pre-wrap font-[family-name:var(--font-mono)] text-[0.8125rem] leading-relaxed text-mt-slate">
                {result.raw}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
