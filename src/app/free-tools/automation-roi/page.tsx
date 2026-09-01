import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AutomationRoi } from "@/components/tools/AutomationRoi";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manual task automation ROI calculator",
  description: "What a repetitive workflow costs a year, what automating it saves after the share a person still does, and how long the build takes to pay back.",
  alternates: { canonical: "/free-tools/automation-roi" },
  openGraph: { title: `Manual task automation ROI calculator | ${SITE.name}`, description: "What a repetitive workflow costs a year, what automating it saves after the share a person still does, and how long the build takes to pay back.", url: `${SITE.url}/free-tools/automation-roi` },
};

const FAQS = [
  { q: "Why does it ask what share still needs a person?", a: "Because automation almost never removes all of a task. Exceptions, approvals and checking the output remain. Most calculators hide that at zero and produce a flattering number. Here it is an input, floored at five percent, because a workflow needing no human involvement afterwards is not one worth modelling." },
  { q: "What hourly cost should I use?", a: "Fully loaded: salary plus employer costs, divided by hours actually worked. Using the headline salary understates it by a third or more and makes the case look weaker than it is." },
  { q: "Does saving hours really save money?", a: "Only if the time is reallocated. A team that keeps the same headcount and absorbs more work has gained capacity, which is usually the better outcome, but it is not a line in the accounts. Treat the figure as the value of what those hours do next." },
  { q: "What if it says the build never pays back?", a: "Then either the task is too small to be worth automating or the residual share is too high for automation to help much. Both are worth knowing before commissioning anything, which is why the tool says it plainly rather than hiding it." },
  { q: "Should this be an agent or a fixed workflow?", a: "Different question, and the wrong answer is expensive. A deterministic workflow is cheaper, more predictable and easier to debug. An agent earns its cost when the input varies too much to enumerate. The AI agent readiness tool works through it." }
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "Manual task automation ROI calculator", url: `${SITE.url}/free-tools/automation-roi`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "What a repetitive workflow costs a year, what automating it saves after the share a person still does, and how long the build takes to pay back.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "Manual task automation ROI calculator", item: `${SITE.url}/free-tools/automation-roi` },
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
            <span>Automation ROI</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Scale</SectionLabel>
            <h1 className="mt-6">What is that repetitive task <span className="text-mt-purple">costing you a year?</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Six inputs, and the arithmetic on what a workflow costs now, what it would cost automated, and how long the build takes to pay for itself. Including the share a person still has to do, which most calculators quietly set to zero.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><AutomationRoi /></Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about automation cases.</h2>
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
