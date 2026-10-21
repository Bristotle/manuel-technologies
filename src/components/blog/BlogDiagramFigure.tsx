import type { BlogDiagram } from "@/lib/blog-types";

/* A method schematic in the site's connector line language: numbered nodes
   joined by a 1px rule, stacked on a phone and in a row from 640px. Server
   rendered, no JavaScript, real text throughout so it reads as an ordered
   list to a screen reader. */
export function BlogDiagramFigure({ diagram }: { diagram: BlogDiagram }) {
  const cols = diagram.steps.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";
  return (
    <figure className="mt-8 rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
      <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">( Method )</p>
      <p className="mt-3 text-lg font-semibold leading-snug text-mt-ink">{diagram.title}</p>
      <ol className={`relative mt-6 grid gap-4 ${cols}`}>
        {/* The connector: vertical on a phone, horizontal from 640px. */}
        <span aria-hidden="true" className="absolute bottom-4 left-4 top-4 w-px bg-mt-border sm:bottom-auto sm:left-4 sm:right-4 sm:top-4 sm:h-px sm:w-auto" />
        {diagram.steps.map((step, i) => (
          <li key={step.label} className="relative flex gap-4 sm:flex-col sm:gap-3">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mt-purple bg-white font-[family-name:var(--font-mono)] text-xs text-mt-purple">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="block">
              <span className="block text-[0.9375rem] font-semibold leading-snug text-mt-ink">{step.label}</span>
              <span className="mt-1 block text-sm leading-relaxed text-mt-slate">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      {diagram.loop ? (
        <p className="mt-6 rounded-[10px] border border-dashed border-mt-purple/40 px-4 py-3 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-mt-purple">
          ↻ {diagram.loop}
        </p>
      ) : null}
      <figcaption className="mt-6 border-t border-mt-border pt-4 text-sm leading-relaxed text-mt-muted">{diagram.caption}</figcaption>
    </figure>
  );
}
