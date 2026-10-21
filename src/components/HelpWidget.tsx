"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* --------------------------------------------------------------------------
   Help panel, bottom left on every page. Modelled on the one on getfold.org:
   a launcher pill, and a panel with search, popular topics, the guides and a
   contact button.

   Why this is a client component: it holds open state and a search query,
   which CLAUDE.md section 2 counts as a reason. It stays small. The search
   index is not bundled or rendered into any page; it is fetched from
   /help-index.json the first time the panel opens.

   Every link goes somewhere that already exists. "Contact us" goes to
   /contact, never mailto, per section 8.
   -------------------------------------------------------------------------- */

type Entry = { t: string; h: string; k: string; d: string };

const POPULAR = [
  { t: "Website prices", h: "/pricing" },
  { t: "Free website audit", h: "/free-audit" },
  { t: "Our work", h: "/work" },
  { t: "Free tools", h: "/free-tools" },
];

function search(entries: Entry[], query: string): Entry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return entries
    .map((e) => {
      const title = e.t.toLowerCase();
      const all = `${title} ${e.d.toLowerCase()} ${e.k.toLowerCase()}`;
      if (!words.every((w) => all.includes(w))) return null;
      const score = words.reduce((s, w) => s + (title.includes(w) ? 2 : 0), 0) + (title.startsWith(words[0]) ? 1 : 0);
      return { e, score };
    })
    .filter((x): x is { e: Entry; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.e);
}

export function HelpWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Fetch the index once, the first time the panel opens. */
  useEffect(() => {
    if (!open || entries) return;
    fetch("/help-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Entry[]) => setEntries(data))
      .catch(() => setEntries([]));
  }, [open, entries]);

  /* Focus the search on open. Escape and a click outside both close it. */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !launcherRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const results = useMemo(() => (entries ? search(entries, query) : []), [entries, query]);
  const searching = query.trim().length > 0;
  const close = () => setOpen(false);

  return (
    <div className="print:hidden">
      {open && (
        <div
          ref={panelRef}
          id="help-panel"
          role="dialog"
          aria-label="Help"
          className="fixed bottom-20 left-4 z-50 flex max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] max-w-[22rem] flex-col overflow-hidden rounded-[18px] border border-mt-border bg-white sm:bottom-24 sm:left-6"
        >
          <div className="bg-mt-purple p-4">
            <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-white">( Help )</p>
            <label className="relative mt-3 block">
              <span className="sr-only">Search the site</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mt-muted">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How can we help?"
                className="block min-h-11 w-full rounded-[10px] border border-white bg-white pl-9 pr-3 text-base text-mt-ink placeholder:text-mt-muted"
              />
            </label>
          </div>

          <div className="flex-1 overflow-y-auto p-4" aria-live="polite">
            {searching ? (
              entries === null ? (
                <p className="text-sm text-mt-slate">Loading.</p>
              ) : results.length ? (
                <ul className="flex flex-col">
                  {results.map((r) => (
                    <li key={r.h}>
                      <Link href={r.h} onClick={close} className="block rounded-[10px] px-2 py-2 transition-colors duration-150 hover:bg-mt-surface active:bg-mt-border">
                        <span className="block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">{r.k}</span>
                        <span className="mt-1 block text-[0.9375rem] font-semibold leading-snug text-mt-ink">{r.t}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-mt-slate">
                  Nothing matched that. Ask us directly and you will hear back within one business day.
                </p>
              )
            ) : (
              <>
                <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">Popular topics</p>
                <ul className="mt-2 flex flex-col">
                  {POPULAR.map((p) => (
                    <li key={p.h}>
                      <Link href={p.h} onClick={close} className="flex min-h-11 items-center gap-3 rounded-[10px] px-2 text-[0.9375rem] text-mt-ink transition-colors duration-150 hover:bg-mt-surface hover:text-mt-purple active:bg-mt-border">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-mt-purple">
                          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5Z" />
                          <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5Z" />
                        </svg>
                        {p.t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-mt-border p-4">
            <Link href="/blog" onClick={close} className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-mt-border bg-white text-sm font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple active:bg-mt-surface">
              Browse the guides
            </Link>
            <Link href="/contact" onClick={close} className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-mt-purple text-sm font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light active:bg-mt-purple">
              Contact us
            </Link>
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls="help-panel"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 left-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-full border border-mt-border bg-white px-4 text-sm font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple active:bg-mt-surface sm:bottom-6 sm:left-6 sm:px-5"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="h-4 w-4 text-mt-purple">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 text-mt-purple">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7" />
            <path d="M12 17h.01" />
          </svg>
        )}
        {open ? "Close" : "Help"}
      </button>
    </div>
  );
}
