import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROJECTS } from "@/lib/site";

/* Businesses we have worked with.
   Names and markets, set as type rather than logos.

   Deliberate choice: we do not hold licence to reproduce client logos, a
   logo wall of five reads thin next to an agency with forty, and each logo
   would be an image request for no added information. Set as type with the
   market underneath, five clients across four countries reads as reach
   rather than as a short list. */

export function ClientStrip() {
  const markets = Array.from(new Set(PROJECTS.map((p) => p.market)));

  return (
    <section className="border-y border-mt-border bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Businesses we have worked with</SectionLabel>
            <h2 className="mt-5 max-w-[22ch] !text-2xl sm:!text-3xl">
              Live systems in {markets.length} markets.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-mt-slate">
            Ecommerce at catalogue scale, regulated tax software, healthcare
            matching, and retail. Every one of them is running right now.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border sm:grid-cols-2 lg:grid-cols-5 mt-reveal-group">
          {PROJECTS.map((project) => (
            <li key={project.slug} className="bg-white">
              <a
                href={project.url}
                rel="noopener"
                className="flex h-full flex-col justify-between gap-6 p-6 transition-colors duration-150 hover:bg-mt-surface"
              >
                <span className="text-lg font-extrabold leading-tight tracking-tight text-mt-ink">
                  {project.client}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.16em] text-mt-muted">
                  {project.market}
                  <br />
                  {project.sector}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
