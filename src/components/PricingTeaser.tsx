import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TIERS, ghs } from "@/lib/pricing";

/* --------------------------------------------------------------------------
   Pricing teaser, homepage. Replaced "Start with the right level of work",
   three text blocks that described engagement types without a number, on
   8 November 2026.

   Published prices are the most persuasive thing an agency in this market
   can put on its homepage, because almost none of them do. Every figure is
   read from lib/pricing.ts, so this can never disagree with /pricing.

   Each tier names a real build delivered at that level, which is the
   evidence: a price next to work you can open.
   -------------------------------------------------------------------------- */

export function PricingTeaser() {
  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <SectionLabel>Prices</SectionLabel>
            <h2 className="mt-6 max-w-[16ch]">Published prices, before you ask.</h2>
          </div>
          <p className="max-w-[52ch] text-lg leading-relaxed text-mt-slate lg:justify-self-end">
            Four starting points, each with a real build delivered at that level. Know the range before the first call.
          </p>
        </div>

        <ol className="mt-reveal-group mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/pricing#${t.slug}`}
                className="flex h-full flex-col rounded-[18px] border border-mt-border bg-mt-surface p-6 transition-colors duration-150 hover:border-mt-purple active:bg-white"
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted">
                  {t.name}
                </span>
                <span className="mt-6 block text-[0.9375rem] text-mt-slate">From</span>
                <span className="block text-3xl font-extrabold tracking-tight text-mt-ink">{ghs(t.from)}</span>
                <span className="mt-2 block text-sm text-mt-slate">{t.timeline}</span>
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-mt-slate">{t.summary}</p>
                <span className="mt-auto block pt-6">
                  <span className="block border-t border-mt-border pt-4 text-sm text-mt-slate">
                    Built at this level: <span className="font-semibold text-mt-ink">{t.proof.client}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/pricing">See everything each price includes</Button>
          <Link href="/agency-vs-engineer" className="text-base font-semibold text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
            Agency or engineer: which one you need
          </Link>
        </div>
      </Container>
    </section>
  );
}
