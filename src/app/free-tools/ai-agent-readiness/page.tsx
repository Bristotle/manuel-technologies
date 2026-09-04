import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI agent readiness assessment",
  description: "Decide whether a workflow needs deterministic automation, a narrow AI feature, or a bounded agent, and what it would take to run it safely in production.",
  alternates: { canonical: "/free-tools/ai-agent-readiness" },
  openGraph: { title: `AI agent readiness assessment | ${SITE.name}`, description: "Decide whether a workflow needs deterministic automation, a narrow AI feature, or a bounded agent, and what it would take to run it safely in production.", url: `${SITE.url}/free-tools/ai-agent-readiness` },
};

const COVERS = [
  { code: "A.01", title: "Classify the workflow", body: "How much the input varies decides everything downstream. Enumerable inputs want deterministic code, which is cheaper, faster and easier to debug." },
  { code: "A.02", title: "Cost of a wrong answer", body: "A misfiled document and a mispriced invoice are not the same risk. The harder an action is to reverse, the more approval it needs." },
  { code: "A.03", title: "What production actually needs", body: "Typed tool contracts, retrieval you can inspect, human approval points, evaluation cases and cost logging. Agents fail in production for want of these, not for want of a better model." },
];
const FAQS = [
  { q: "When is an agent the wrong answer?", a: "Most of the time, and that is not a fashionable thing to say. If the inputs can be enumerated, deterministic code is cheaper to run, faster, easier to debug and does not fail in novel ways. An agent earns its cost when the input varies too much to write rules for." },
  { q: "What is the difference between an AI feature and an agent?", a: "A feature makes one call and returns a result: classify this, summarise that. An agent decides which steps to take and calls tools in a loop to get there. The loop is the expensive part, in cost and in failure modes, so it should be justified rather than assumed." },
  { q: "How do I stop it doing something expensive?", a: "Keep permissions outside the model. The agent should not hold credentials or be able to take a consequential action directly. Give it typed tools with narrow scopes, put a human approval step in front of anything hard to reverse, and log every call with its cost." },
  { q: "What does an evaluation set actually look like?", a: "Real anonymised cases with known correct outcomes, including the awkward ones. Twenty realistic examples catch more than a hundred synthetic ones, and without them you cannot tell whether a change improved the system or just changed it." },
  { q: "Should I run it in shadow mode first?", a: "Yes, if the workflow allows it. Let the system produce its answer alongside the human doing the work, and compare. It costs one sprint and it is the cheapest way to find out whether the thing works before anyone depends on it." },
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "AI agent readiness assessment", url: `${SITE.url}/free-tools/ai-agent-readiness`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "Decide whether a workflow needs deterministic automation, a narrow AI feature, or a bounded agent, and what it would take to run it safely in production.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "AI agent readiness assessment", item: `${SITE.url}/free-tools/ai-agent-readiness` },
    ] },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/free-tools" className="hover:text-mt-purple">Free tools</Link>
            <span aria-hidden="true">/</span>
            <span>AI readiness</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Scale</SectionLabel>
            <h1 className="mt-6">Automation, feature, or <span className="text-mt-purple">a real agent?</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Three different answers with three different costs, and the wrong one is expensive. Describe the workflow and get a recommendation, the risks, a minimum architecture, and the approval points it would need.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><ToolWorkspace tool="agent-readiness" /></Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>How the decision is made</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">Three questions, in this order.</h2>
          <div className="mt-reveal-group mt-14 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border md:grid-cols-3">
            {COVERS.map((c) => (
              <div key={c.title} className="flex flex-col gap-4 bg-white p-7">
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">{c.code}</span>
                <h3 className="!text-xl !tracking-tight">{c.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-mt-slate">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 max-w-[65ch] border-t border-mt-border pt-8">
            <p className="text-lg leading-relaxed text-mt-slate">The order matters. Classify the workflow before pricing the technology, because a workflow with enumerable inputs does not need a model at all, and discovering that after the build is the expensive way to learn it.</p>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask before building agents.</h2>
          <div className="mt-reveal-group mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {FAQS.map((f) => (
              <article key={f.q} className="border-t border-mt-border pt-6">
                <h3 className="!text-lg !tracking-tight">{f.q}</h3>
                <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-mt-slate">{f.a}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
