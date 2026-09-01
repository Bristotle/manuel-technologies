"use client";

import { useState } from "react";

type Tool = "geo-brief" | "agent-readiness" | "seo-audit";

type Props = { tool: Tool };

type Result = { summary?: string; findings?: unknown; actions?: unknown; assumptions?: unknown };

const config = {
  "geo-brief": {
    label: "GEO content brief",
    title: "Build a content brief with a clear search job.",
    intro: "Describe the page you want to publish. The workspace turns it into an answer-first brief for SEO and AI search.",
  },
  "agent-readiness": {
    label: "AI agent readiness",
    title: "Decide whether a workflow needs an agent.",
    intro: "Describe the process, its inputs, and the cost of failure. Get a conservative architecture recommendation before you build.",
  },
  "seo-audit": {
    label: "Technical SEO triage",
    title: "Turn page facts into a prioritised SEO plan.",
    intro: "Supply the facts you have. This tool separates known issues from assumptions and gives you a seven day starting plan.",
  },
} as const;

function initialInput(tool: Tool): Record<string, string> {
  if (tool === "geo-brief") return { topic: "", audience: "", offer: "", location: "" };
  if (tool === "agent-readiness") return { workflow: "", inputs: "", steps: "", failureCost: "", systems: "" };
  return { url: "", title: "", h1: "", description: "", indexable: "Yes", canonical: "Yes", lcp: "", inp: "", cls: "", notes: "" };
}

function pretty(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join("\n");
  if (typeof value === "object" && value !== null) return JSON.stringify(value, null, 2);
  return String(value ?? "No detail supplied.");
}

export function ToolWorkspace({ tool }: Props) {
  const [input, setInput] = useState<Record<string, string>>(initialInput(tool));
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const details = config[tool];

  function update(key: string, value: string) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/tools/claude", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool, input }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The assessment could not be completed.");
      setResult(data.result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The assessment could not be completed.");
    } finally {
      setLoading(false);
    }
  }

  const fields = tool === "geo-brief"
    ? [{ key: "topic", label: "Page topic", placeholder: "technical SEO audit" }, { key: "audience", label: "Audience", placeholder: "UK SaaS founders with a small marketing team" }, { key: "offer", label: "Offer or service", placeholder: "Technical SEO audits and implementation" }, { key: "location", label: "Market or location", placeholder: "Ghana, UK, or worldwide" }]
    : tool === "agent-readiness"
      ? [{ key: "workflow", label: "Workflow", placeholder: "Qualify inbound enquiries and route them to the right service" }, { key: "inputs", label: "Inputs", placeholder: "Website form, email, CRM record" }, { key: "steps", label: "Current steps", placeholder: "A team member reads, classifies, checks fit, and assigns an owner" }, { key: "failureCost", label: "Cost of a wrong decision", placeholder: "A missed lead costs around £500 in expected value" }, { key: "systems", label: "Systems involved", placeholder: "HubSpot, Gmail, Slack" }]
      : [{ key: "url", label: "Page URL", placeholder: "https://example.com/service" }, { key: "title", label: "Title tag", placeholder: "Technical SEO audits for growing websites" }, { key: "h1", label: "H1", placeholder: "Technical SEO audit" }, { key: "description", label: "Meta description", placeholder: "What the page tells a searcher in one sentence" }, { key: "indexable", label: "Indexable?", placeholder: "Yes or No" }, { key: "canonical", label: "Canonical correct?", placeholder: "Yes or No" }, { key: "lcp", label: "LCP", placeholder: "2.1s or unknown" }, { key: "inp", label: "INP", placeholder: "180ms or unknown" }, { key: "cls", label: "CLS", placeholder: "0.04 or unknown" }, { key: "notes", label: "Other observations", placeholder: "Duplicate pages, blocked resources, missing schema, or anything else" }];

  return <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><form onSubmit={submit} className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-10"><p className="mt-label">{details.label}</p><h2 className="mt-6 !text-3xl">{details.title}</h2><p className="mt-4 text-mt-slate">{details.intro}</p><div className="mt-8 flex flex-col gap-5">{fields.map((field) => <label key={field.key} className="text-sm font-semibold text-mt-ink">{field.label}{field.key === "notes" || field.key === "steps" ? <textarea value={input[field.key]} onChange={(event) => update(field.key, event.target.value)} className="contact-input mt-2 block min-h-28 w-full" placeholder={field.placeholder} /> : <input required={field.key !== "lcp" && field.key !== "inp" && field.key !== "cls" && field.key !== "notes"} value={input[field.key]} onChange={(event) => update(field.key, event.target.value)} className="contact-input mt-2 block w-full" placeholder={field.placeholder} />}</label>)}</div><button type="submit" disabled={loading} className="mt-sheen relative mt-8 min-h-12 rounded-[10px] bg-mt-purple px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light disabled:cursor-wait disabled:opacity-60">{loading ? "Building assessment..." : "Generate assessment"}</button>{error && <p role="alert" className="mt-4 text-sm text-mt-poor">{error}</p>}<p className="mt-6 text-xs leading-relaxed text-mt-muted">Do not submit confidential personal data. Results are planning guidance, not a substitute for professional review.</p></form><div className="rounded-[18px] border border-mt-border bg-mt-ink p-6 text-white sm:p-10" aria-live="polite"><p className="mt-label text-white">Output</p>{result ? <div className="mt-reveal-group mt-6 flex flex-col gap-8"><div><h2 className="!text-2xl text-white">Summary</h2><p className="mt-4 leading-relaxed text-white/80">{result.summary || "Assessment complete."}</p></div>{["findings", "actions", "assumptions"].map((key) => <section key={key} className="border-t border-white/20 pt-6"><h3 className="!text-xl text-white">{key}</h3><pre className="mt-4 whitespace-pre-wrap font-[family-name:var(--font-mono)] text-sm leading-relaxed text-white/80">{pretty(result[key as keyof Result])}</pre></section>)}</div> : <div className="mt-20 max-w-[38ch]"><p className="text-2xl leading-snug">Your brief, triage, or architecture recommendation will appear here.</p><p className="mt-6 leading-relaxed text-white/70">The output is designed to be copied into a planning document and reviewed by a person before implementation.</p></div>}</div></div>;
}
