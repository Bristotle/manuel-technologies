"use client";

import { useState } from "react";

/* Footer signup. State for the three outcomes, so it earns "use client".
   The form still posts without JavaScript to /api/subscribe, which answers
   JSON either way. */

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [note, setNote] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) { setState("error"); setNote(j.error || "Could not add you just now."); return; }
      setState("done"); setNote(j.message); form.reset();
    } catch {
      setState("error"); setNote("Could not add you just now. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} action="/api/subscribe" method="post" className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={dark ? "min-h-12 w-full rounded-[10px] border border-white/15 bg-white/10 px-4 text-base text-white transition-colors duration-150 placeholder:text-white/40 hover:border-mt-purple-light focus:border-mt-purple-light" : "min-h-12 w-full rounded-[10px] border border-mt-border bg-white px-4 text-base text-mt-ink transition-colors duration-150 placeholder:text-mt-muted hover:border-mt-purple-light focus:border-mt-purple"}
        />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={state === "busy"}
          className="mt-sheen relative inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] bg-mt-purple px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light disabled:opacity-60"
        >
          {state === "busy" ? "Joining" : "Join"}
        </button>
      </div>
      <p aria-live="polite" className={`mt-3 min-h-5 text-sm ${dark ? (state === "error" ? "text-white" : "text-white/60") : state === "error" ? "text-mt-ink" : "text-mt-slate"}`}>
        {note || "One email when something ships. No list selling, unsubscribe in one click."}
      </p>
    </form>
  );
}
