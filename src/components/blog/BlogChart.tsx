import type { BlogChart as Chart } from "@/lib/blog-types";

/* Horizontal bar chart. Server rendered, no JavaScript, no layout shift:
   every bar is a fixed height row and its width is a percentage of the
   track. The value is printed beside each bar, so the chart reads without
   colour and needs no separate data table for screen readers. */
function format(value: number, unit: Chart["unit"]) {
  if (unit === "%") return `${value}%`;
  if (unit === "s") return `${value.toFixed(1)}s`;
  return value.toLocaleString("en-GB");
}

export function BlogChartFigure({ chart }: { chart: Chart }) {
  const max = Math.max(...chart.bars.map((b) => b.value), chart.unit === "%" ? 100 : 0);
  return (
    <figure className="mt-8 rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
      <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">( Data )</p>
      <p className="mt-3 text-lg font-semibold leading-snug text-mt-ink">{chart.title}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {chart.bars.map((bar) => (
          <li key={bar.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2">
            <span className="text-sm leading-snug text-mt-slate">
              {bar.label}
              {bar.note ? <span className="text-mt-muted"> ({bar.note})</span> : null}
            </span>
            <span className={`font-[family-name:var(--font-mono)] text-sm ${bar.highlight ? "font-semibold text-mt-purple" : "text-mt-ink"}`}>{format(bar.value, chart.unit)}</span>
            <span aria-hidden="true" className="col-span-2 block h-2 overflow-hidden rounded-full bg-mt-surface">
              <span className={`block h-full rounded-full ${bar.highlight ? "bg-mt-purple" : "bg-mt-lilac"}`} style={{ width: `${Math.max(2, (bar.value / max) * 100)}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 border-t border-mt-border pt-4 text-sm leading-relaxed text-mt-muted">
        Source: <a href={chart.sourceHref} className="text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">{chart.source}</a>
      </figcaption>
    </figure>
  );
}
