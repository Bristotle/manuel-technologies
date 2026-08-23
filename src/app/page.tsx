import { Logo } from "@/components/Logo";

/* Ship 1 homepage. Deliberately minimal, deliberately not a countdown timer.
   Everything on it is true. Replaced properly in Ship 3.

   The tagline IS the hero. It does not get restated in different words
   underneath, and it does not compete with a second headline. */

const PILLARS = [
  {
    name: "Build",
    promise: "The thing itself, shipped and working.",
    items: [
      "Website development",
      "Custom software",
      "Mobile applications",
      "Systems and integrations",
    ],
  },
  {
    name: "Grow",
    promise: "More of the right people finding it.",
    items: [
      "Technical SEO",
      "Programmatic SEO",
      "Generative Engine Optimization",
      "Content and paid",
    ],
  },
  {
    name: "Scale",
    promise: "Handle more without hiring more.",
    items: ["AI automations", "AI agent development", "Analytics and insights"],
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh bg-mt-surface text-mt-ink">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        {/* Mark and wordmark */}
        <header className="flex items-center gap-4">
          <Logo className="h-11 w-11 text-mt-purple" />
          <span className="text-lg font-extrabold tracking-tight">
            Manuel Technologies
          </span>
        </header>

        {/* Hero. The tagline is the H1. */}
        <section className="mt-24 sm:mt-32">
          <h1 className="flex flex-col leading-[0.92] tracking-[-0.04em]">
            <span>Build.</span>
            <span>Grow.</span>
            <span className="text-mt-purple">Scale.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg text-mt-slate">
            Websites and custom software. Technical SEO and GEO. AI automation.
            Built by an engineer who does this professionally, not an agency
            passing your work to a junior.
          </p>

          <p className="mt-5 max-w-2xl text-lg font-semibold text-mt-ink">
            We ship our own software. Yours gets the same standard.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:info@manueltechnologies.com"
              className="rounded-[--radius-input] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-mt-purple-light"
            >
              Start a conversation
            </a>
            <a
              href="https://chromewebstore.google.com/"
              rel="noopener"
              className="rounded-[--radius-input] border border-mt-border px-6 py-3.5 text-base font-semibold text-mt-ink transition-colors hover:border-mt-purple hover:text-mt-purple"
            >
              See CWV Drift Monitor
            </a>
          </div>
        </section>

        {/* Pillars. The tagline doubles as the navigation. */}
        <section className="mt-24 grid gap-5 sm:mt-32 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.name}
              className="rounded-[--radius-card] border border-mt-border bg-white p-7"
            >
              <span className="mt-label">( {p.name.toUpperCase()} )</span>
              <p className="mt-4 text-base font-semibold">{p.promise}</p>
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-mt-slate">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-mt-border pt-10 sm:mt-32">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-mt-muted">
              Manuel Technologies · Accra, Ghana
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="mailto:info@manueltechnologies.com"
                className="text-mt-purple hover:underline"
              >
                info@manueltechnologies.com
              </a>
              <a
                href="/cwv-drift-monitor/privacy-policy"
                className="text-mt-muted hover:text-mt-purple"
              >
                CWV Drift Monitor privacy policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
