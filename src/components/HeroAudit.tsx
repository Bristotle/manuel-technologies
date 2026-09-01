"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* The live tool in the hero.

   CLAUDE.md section 4: "Live beats static. A working tool on the page
   outperforms any screenshot, because the prospect experiences the competence
   rather than reading a claim about it." The homepage had no visual evidence
   at all, which is the failure that section opens by naming.

   WHY IT HANDS OFF RATHER THAN RENDERING THE REPORT HERE. The full report is
   long, and duplicating it in the hero would mean two copies of the same UI
   drifting apart. Instead this navigates to /free-audit with the domain in the
   URL fragment, and the audit runs on arrival.

   THE FRAGMENT IS DELIBERATE. A query string would make /free-audit read
   searchParams, which forces the whole route to render on demand. That is
   exactly what made /blog dynamic and cost it CDN caching until it was fixed.
   A fragment is never sent to the server, so the page stays static and the
   handoff still works. */

export function HeroAudit() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  function go(event: React.FormEvent) {
    event.preventDefault();
    const value = url.trim();
    if (!value) return;
    router.push(`/free-audit#u=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={go} className="mt-beam rounded-[18px] border border-mt-border p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="mt-label">( Try it on your own site )</span>
        <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
          ~15s · free
        </span>
      </div>

      <label htmlFor="hero-audit" className="sr-only">
        Your website address
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          id="hero-audit"
          type="text"
          inputMode="url"
          autoComplete="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourcompany.com"
          className="min-h-12 w-full rounded-[10px] border border-mt-border bg-white px-4 py-3 text-base text-mt-ink transition-colors duration-150 placeholder:text-mt-muted hover:border-mt-purple-light focus:border-mt-purple"
        />
        <button
          type="submit"
          disabled={url.trim().length === 0}
          className="mt-sheen relative inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light disabled:opacity-50"
        >
          Audit my site
        </button>
      </div>

      <p className="mt-4 text-[0.875rem] leading-relaxed text-mt-slate">
        We fetch your page, your robots.txt and your sitemap, then score twenty
        things. No account, no email, nothing stored.
      </p>
    </form>
  );
}
