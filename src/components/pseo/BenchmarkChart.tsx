import type { Benchmark } from "@/lib/pseo/industries";

/* The findings as horizontal bars, inline SVG, no library. Ordered by
   what each costs the business, not by size. Same device as the UK study. */
export function benchmarkBars(b: Benchmark) {
  const f = b.findings;
  return [
    { label: "More than one H1, or none", value: f.notOneH1, note: "Nothing tells a crawler what the page is about" },
    { label: "Slower than 1 second to first byte", value: f.slowerThan1s, note: "Measured from one location, one attempt" },
    { label: "No structured data at all", value: f.noStructuredData, note: "No JSON-LD anywhere on the homepage" },
    { label: "No share image", value: f.noOpenGraph, note: "Every WhatsApp and LinkedIn share is a blank card" },
    { label: "No XML sitemap", value: f.noSitemap, note: "Discovery left to internal links" },
    { label: "No meta description", value: f.noMetaDescription, note: "Google writes its own, usually worse" },
    { label: "Images without alt text", value: f.imagesMissingAlt, note: "At least one image a screen reader cannot describe" },
    { label: "Blocking an AI crawler", value: f.blockingAiCrawlers, note: "Explicit Disallow for GPTBot, ClaudeBot or others" },
  ];
}

export function BenchmarkChart({ b }: { b: Benchmark }) {
  const bars = benchmarkBars(b);
  const M = b.measurable;
  const W = 640, rowH = 44, labelW = 250, top = 8;
  const H = top + bars.length * rowH;
  return (
    <figure className="overflow-x-auto rounded-[18px] border border-mt-border bg-white p-6">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Share of ${M} measurable ${b.industryPlural} failing each check`} className="h-auto w-full min-w-[560px]">
        {bars.map((bar, i) => {
          const y = top + i * rowH;
          const pct = bar.value / M;
          const w = Math.max(2, Math.round((W - labelW - 70) * pct));
          return (
            <g key={bar.label}>
              <text x="0" y={y + 17} fontSize="13" fontWeight="600" fill="currentColor" className="text-mt-ink">{bar.label}</text>
              <text x="0" y={y + 33} fontSize="11" fill="#6E6590">{bar.note}</text>
              <rect x={labelW} y={y + 8} width={W - labelW - 70} height="12" rx="6" fill="#F5F2FC" />
              <rect x={labelW} y={y + 8} width={w} height="12" rx="6" fill={pct >= 0.5 ? "#B84D71" : "#6B2FD9"} />
              <text x={W - 62} y={y + 19} fontSize="12" fontFamily="ui-monospace, monospace" fill="#3D3560">{bar.value} / {M}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 text-sm leading-relaxed text-mt-muted">Each bar is the share of the {M} measurable sites failing that check. Pink where half or more fail. Sampled {b.sampledAt}.</figcaption>
    </figure>
  );
}
