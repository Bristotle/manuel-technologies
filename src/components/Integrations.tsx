import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DotGrid } from "@/components/ui/DotGrid";
import { IntegrationLogo } from "@/components/ui/IntegrationLogo";
import { FEATURED_INTEGRATIONS, INTEGRATIONS } from "@/lib/integrations";

/* Integrations section. REF-005 Paperform.
   ---------------------------------------------------------------------------
   Structure from the reference: label, headline, one paragraph, a row of logo
   tiles, a qualifying line, one CTA. Centred, which is the one place on this
   site where centring beats the usual left alignment, because a logo row has
   no reading direction.

   The tiles link out. A logo that is not clickable in a grid like this reads as
   a claim; one that goes to the product reads as a fact.
   -------------------------------------------------------------------------- */

export function Integrations({
  variant = "default",
}: {
  variant?: "default" | "surface";
}) {
  const background = variant === "surface" ? "bg-mt-surface" : "bg-white";

  return (
    <section
      className={`relative overflow-hidden border-y border-mt-border ${background} py-24 sm:py-32`}
    >
      <DotGrid fade="center" />

      <Container className="relative">
        <div className="mx-auto max-w-[52ch] text-center">
          <SectionLabel>Integrations and automations</SectionLabel>
          <h2 className="mt-6 !text-3xl sm:!text-4xl">
            It has to work with what you already run.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-mt-slate">
            Your CRM, your billing, your inbox, your spreadsheets. We connect
            them so data moves on its own, and we build the middleware where a
            connector does not already exist.
          </p>
        </div>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-4">
          {FEATURED_INTEGRATIONS.map((item) => (
            <li key={item.slug}>
              <a
                href={item.url}
                rel="noopener"
                title={item.name}
                className="mt-lift flex h-20 w-20 items-center justify-center rounded-[18px] border border-mt-border bg-white transition-colors duration-150 hover:border-mt-purple-light"
              >
                <IntegrationLogo item={item} />
                <span className="sr-only">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-[56ch] text-center text-[0.9375rem] leading-relaxed text-mt-slate">
          Native APIs, webhooks, or automation platforms like n8n, Make and
          Zapier. If a system exposes an API, it can be automated. Where one does
          not, we build the middleware that makes it behave as though it does.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/integrations"
            className="mt-lift inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-ink px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple"
          >
            All {INTEGRATIONS.length} integrations
          </Link>
        </div>
      </Container>
    </section>
  );
}
