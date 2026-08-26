"use client";

import { useState } from "react";
import type { FreeToolSlug } from "@/lib/free-tools";

type Props = { slug: FreeToolSlug };

const inputClass = "contact-input mt-2 block w-full";

export function FreeToolApp({ slug }: Props) {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [url, setUrl] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visits, setVisits] = useState(5000);
  const [conversion, setConversion] = useState(2);
  const [leadValue, setLeadValue] = useState(500);
  const [targetConversion, setTargetConversion] = useState(3);

  const setAnswer = (key: string, value: string) => setAnswers((current) => ({ ...current, [key]: value }));
  const seoChecks = ["title", "h1", "canonical", "indexable", "sitemap", "performance"];
  const seoScore = seoChecks.filter((key) => answers[key] === "yes").length * 16.67;
  const currentLeads = visits * (conversion / 100);
  const targetLeads = visits * (targetConversion / 100);
  const monthlyUpside = Math.max(0, targetLeads - currentLeads) * leadValue;

  async function askGrok(tool: string, data: Record<string, unknown>) {
    setLoading(true);
    setRecommendation("");
    try {
      const response = await fetch("/api/tools", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tool, data }) });
      const result = await response.json();
      setRecommendation(result.recommendation || result.error || "Complete the assessment to receive a recommendation.");
    } catch {
      setRecommendation("The local score is ready. Grok recommendations are unavailable right now.");
    } finally { setLoading(false); }
  }

  if (slug === "website-roi-calculator") return <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]"><div className="flex flex-col gap-6"><label className="text-sm font-semibold">Monthly qualified visits<input type="number" min="0" value={visits} onChange={(event) => setVisits(Number(event.target.value))} className={inputClass} /></label><label className="text-sm font-semibold">Current conversion rate (%)<input type="number" min="0" step="0.1" value={conversion} onChange={(event) => setConversion(Number(event.target.value))} className={inputClass} /></label><label className="text-sm font-semibold">Average lead value (£)<input type="number" min="0" value={leadValue} onChange={(event) => setLeadValue(Number(event.target.value))} className={inputClass} /></label><label className="text-sm font-semibold">Target conversion rate (%)<input type="number" min="0" step="0.1" value={targetConversion} onChange={(event) => setTargetConversion(Number(event.target.value))} className={inputClass} /></label></div><div className="border-l border-mt-border pl-6"><p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-mt-purple">Your estimate</p><p className="mt-6 text-4xl font-bold">£{Math.round(monthlyUpside).toLocaleString()}</p><p className="mt-2 text-mt-slate">estimated monthly upside</p><dl className="mt-8 flex flex-col gap-4 border-t border-mt-border pt-6 text-sm"><div className="flex justify-between gap-4"><dt className="text-mt-slate">Current monthly value</dt><dd className="font-semibold">£{Math.round(currentLeads * leadValue).toLocaleString()}</dd></div><div className="flex justify-between gap-4"><dt className="text-mt-slate">Target monthly value</dt><dd className="font-semibold">£{Math.round(targetLeads * leadValue).toLocaleString()}</dd></div><div className="flex justify-between gap-4"><dt className="text-mt-slate">Annual upside</dt><dd className="font-semibold">£{Math.round(monthlyUpside * 12).toLocaleString()}</dd></div></dl></div></div>;

  if (slug === "technical-seo-health-check") return <div><label className="text-sm font-semibold">Page URL<input type="url" value={url} onChange={(event) => setUrl(event.target.value)} className={inputClass} placeholder="https://example.com/important-page" /></label><div className="mt-8 grid gap-4 sm:grid-cols-2">{[["title", "Has a unique title tag"], ["h1", "Has one descriptive H1"], ["canonical", "Has a self-referencing canonical"], ["indexable", "Can be indexed"], ["sitemap", "Is in the XML sitemap"], ["performance", "Passes Core Web Vitals"]].map(([key, label]) => <label key={key} className="flex items-center gap-3 border border-mt-border p-4 text-sm text-mt-slate"><input type="checkbox" checked={answers[key] === "yes"} onChange={(event) => setAnswer(key, event.target.checked ? "yes" : "no")} />{label}</label>)}</div><div className="mt-8 flex flex-wrap items-center gap-6 border-t border-mt-border pt-6"><p className="text-3xl font-bold">{Math.round(seoScore)}<span className="text-base text-mt-muted">/100</span></p><button type="button" disabled={loading || !url} onClick={() => askGrok("technical-seo-health-check", { url, answers, score: Math.round(seoScore) })} className="rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-mt-purple-light disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Preparing plan..." : "Get prioritised fixes"}</button></div>{recommendation && <div className="mt-8 border-l-4 border-mt-purple bg-mt-surface p-6 whitespace-pre-line text-mt-slate">{recommendation}</div>}</div>;

  return <div><p className="text-mt-slate">Describe the workflow you want to improve. This first pass is deliberately short so the recommendation stays about one real process.</p><label className="mt-8 block text-sm font-semibold">Workflow<input value={answers.workflow || ""} onChange={(event) => setAnswer("workflow", event.target.value)} className={inputClass} placeholder="Qualify inbound website enquiries" /></label><label className="mt-6 block text-sm font-semibold">How variable are the inputs?<select value={answers.variance || ""} onChange={(event) => setAnswer("variance", event.target.value)} className={inputClass}><option value="">Choose one</option><option value="low">Mostly fixed fields and rules</option><option value="high">Different wording and context each time</option></select></label><label className="mt-6 block text-sm font-semibold">What happens if it fails?<select value={answers.risk || ""} onChange={(event) => setAnswer("risk", event.target.value)} className={inputClass}><option value="">Choose one</option><option value="low">A person can correct it easily</option><option value="high">It could create financial, legal, or customer harm</option></select></label><button type="button" disabled={loading || !answers.workflow || !answers.variance || !answers.risk} onClick={() => askGrok("ai-agent-readiness-assessment", answers)} className="mt-8 rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-mt-purple-light disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Assessing workflow..." : "Assess my workflow"}</button>{recommendation && <div className="mt-8 border-l-4 border-mt-purple bg-mt-surface p-6 whitespace-pre-line text-mt-slate">{recommendation}</div>}</div>;
}
