import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LEGAL_UPDATED, type LegalSection } from "@/lib/legal";

/* Shared template for the two legal pages. Copy lives in lib/legal.ts. */
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">{title}</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{intro}</p>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.16em] text-mt-slate">Last updated {LEGAL_UPDATED}</p>
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[220px_1fr]">
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="mt-label">On this page</p>
              <ol className="mt-5 flex flex-col gap-3 border-l border-mt-border">
                {sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block pl-4 text-sm leading-snug text-mt-slate hover:text-mt-purple">{s.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="max-w-[680px] space-y-12">
              {sections.map((s) => (
                <section key={s.heading} id={s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-24">
                  <h2 className="!text-2xl">{s.heading}</h2>
                  {s.paragraphs.map((p) => <p key={p} className="mt-4 text-lg leading-relaxed text-mt-slate">{p}</p>)}
                  {s.bullets ? (
                    <ul className="mt-4 flex flex-col gap-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-lg leading-relaxed text-mt-slate">
                          <span aria-hidden="true" className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-mt-purple" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
              <p className="border-t border-mt-border pt-8 text-base text-mt-slate">
                Questions about this page: <Link href="/contact" className="text-mt-purple underline">contact us</Link>, or email info@manueltechnologies.com.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
