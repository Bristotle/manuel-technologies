import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* Closing CTA. REF-012, hero-section-dark.
   ---------------------------------------------------------------------------
   Taken from the reference: dark ground, a perspective grid floor converging
   at a vanishing point, a two tone headline where the second clause carries the
   accent, and a single pill CTA with a soft glow.

   Rejected from the reference: the product screenshot below the fold, which
   belongs in a hero and not in a closing band, and the multi stop rainbow
   gradient on the headline, which fights a locked single accent palette.

   Everything here is CSS. The reference implements the grid as a component with
   angle and opacity props and the glow as a blurred absolutely positioned div.
   Both are gradients and one transform, so neither needs JavaScript.

   This is the last thing on the page. It used to carry the only dark ground on
   the site. ClientSpotlight now carries one too, at Emmanuel's direction, to
   match the higglo.io reference. Two dark bands is the deliberate state: this
   one still closes the page, the spotlight punctuates the middle of it. Do not
   add a third without deciding what the rhythm is.
   -------------------------------------------------------------------------- */

export function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-mt-ink py-24 text-white sm:py-32">
      {/* Grid floor, anchored to the bottom edge */}
      <div
        aria-hidden="true"
        className="mt-grid-floor pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]"
      />
      {/* Bloom behind the headline */}
      <div
        aria-hidden="true"
        className="mt-bloom pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%]"
      />

      <Container>
        <div className="mx-auto max-w-[46ch] text-center">
          <SectionLabel>Start here</SectionLabel>

          <h2 className="mt-6 !text-4xl leading-[1.05] text-white sm:!text-5xl">
            Have a problem worth{" "}
            <span className="text-mt-purple-light">building around?</span>
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-white/70">
            Tell us what is happening, what you have tried, and what a useful
            result would look like. We will tell you the right first move, even
            when that is not hiring us.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="mt-lift inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-mt-ink transition-colors duration-150 hover:bg-mt-surface active:bg-mt-border"
            >
              Start a conversation
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:border-white/60 active:border-white"
            >
              See the work
            </Link>
          </div>

          <p className="mt-8 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-white/40">
            ( Replies come from an engineer, not a sales team )
          </p>
        </div>
      </Container>
    </section>
  );
}
