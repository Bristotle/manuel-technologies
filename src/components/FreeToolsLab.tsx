"use client";

import { useState } from "react";

const tools = [
  { id: "meta", label: "Meta preview", description: "Check title and description length before you publish." },
  { id: "brief", label: "SEO brief builder", description: "Turn a topic into a focused page brief." },
  { id: "vitals", label: "Core Web Vitals budget", description: "Set a practical performance budget for a page." },
] as const;

type ToolId = (typeof tools)[number]["id"];

export function FreeToolsLab() {
  const [active, setActive] = useState<ToolId>("meta");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [visits, setVisits] = useState(1000);
  const [leads, setLeads] = useState(30);
  const [budget, setBudget] = useState(2500);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <nav className="flex gap-3 overflow-x-auto lg:flex-col lg:gap-4" aria-label="Free tools">
        {tools.map((tool) => <button key={tool.id} type="button" onClick={() => setActive(tool.id)} className={`min-w-52 border p-4 text-left transition-colors duration-150 lg:min-w-0 ${active === tool.id ? "border-mt-purple bg-white" : "border-mt-border hover:border-mt-purple"}`}><span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-mt-purple">{tool.label}</span><span className="mt-2 block text-sm leading-relaxed text-mt-slate">{tool.description}</span></button>)}
      </nav>
      <div className="border border-mt-border bg-white p-6 sm:p-10">
        {active === "meta" && <div><h2 className="!text-3xl">Search snippet preview</h2><p className="mt-4 text-mt-slate">Write the result a searcher should see. The preview is a guide, not a promise of how Google will display the page.</p><label className="mt-8 block text-sm font-semibold">Title tag<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={70} className="contact-input mt-2 block w-full" placeholder="Technical SEO for growing websites" /></label><p className="mt-2 text-sm text-mt-muted">{title.length}/60 recommended characters</p><label className="mt-6 block text-sm font-semibold">Meta description<textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={180} className="contact-input mt-2 block min-h-32 w-full" placeholder="A practical guide to crawlability, indexation, and Core Web Vitals." /></label><p className="mt-2 text-sm text-mt-muted">{description.length}/155 recommended characters</p><div className="mt-8 border-t border-mt-border pt-6"><p className="text-sm text-mt-slate">{title || "Your page title"}</p><p className="mt-2 text-sm leading-relaxed text-mt-slate">{description || "Your description will appear here."}</p></div></div>}
  {active === "brief" && <div><h2 className="!text-3xl">SEO brief builder</h2><p className="mt-4 text-mt-slate">Start with one topic. The output keeps the page focused on a single search job.</p><label className="mt-8 block text-sm font-semibold">Topic<input value={topic} onChange={(event) => setTopic(event.target.value)} className="contact-input mt-2 block w-full" placeholder="technical SEO audit" /></label><div className="mt-8 border-t border-mt-border pt-6"><p className="font-semibold">Suggested brief</p><ul className="mt-4 flex flex-col gap-3 text-mt-slate"><li>Primary query: {topic || "your primary query"}</li><li>Intent: informational or commercial investigation</li><li>H1: a direct answer containing the topic</li><li>Sections: definition, process, example, risks, next step</li><li>Evidence: one first-hand observation and two primary sources</li><li>Internal links: one service page and two supporting articles</li></ul></div></div>}
  {active === "vitals" && <div><h2 className="!text-3xl">Core Web Vitals budget</h2><p className="mt-4 text-mt-slate">Model the conversion value of improving a page. Replace these sample values with your own baseline data.</p><label className="mt-8 block text-sm font-semibold">Monthly visits<input type="number" min="0" value={visits} onChange={(event) => setVisits(Number(event.target.value))} className="contact-input mt-2 block w-full" /></label><label className="mt-6 block text-sm font-semibold">Monthly leads<input type="number" min="0" value={leads} onChange={(event) => setLeads(Number(event.target.value))} className="contact-input mt-2 block w-full" /></label><label className="mt-6 block text-sm font-semibold">Average lead value<input type="number" min="0" value={budget} onChange={(event) => setBudget(Number(event.target.value))} className="contact-input mt-2 block w-full" /></label><div className="mt-8 grid gap-4 border-t border-mt-border pt-6 sm:grid-cols-3"><div><p className="text-sm text-mt-muted">Conversion rate</p><p className="mt-2 text-2xl font-bold">{visits ? ((leads / visits) * 100).toFixed(2) : "0.00"}%</p></div><div><p className="text-sm text-mt-muted">Estimated value</p><p className="mt-2 text-2xl font-bold">£{(leads * budget).toLocaleString()}</p></div><div><p className="text-sm text-mt-muted">Good CWV targets</p><p className="mt-2 text-base font-bold">LCP 2.5s<br />INP 200ms<br />CLS 0.1</p></div></div></div>}
      </div>
    </div>
  );
}
