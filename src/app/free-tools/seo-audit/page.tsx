import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technical SEO triage tool",
  description: "Turn the page facts you already have into a severity ranked action plan covering crawl, indexation, content and Core Web Vitals risks. For pages a crawler cannot reach.",
  alternates: { canonical: "/free-tools/seo-audit" },
  openGraph: { title: `Technical SEO triage tool | ${SITE.name}`, description: "Turn the page facts you already have into a severity ranked action plan covering crawl, indexation, content and Core Web Vitals risks. For pages a crawler cannot reach.", url: `${SITE.url}/free-tools/seo-audit` },
};

const COVERS = [
  { code: "T.01", title: "Crawl and indexation", body: "Status, canonical, robots directives and whether anything is stopping the page being indexed at all." },
  { code: "T.02", title: "Content and intent", body: "Whether the page answers one query well, and whether the structure matches how that query gets answered." },
  { code: "T.03", title: "Core Web Vitals", body: "Where the numbers you supply put you against the thresholds, and which of them is actually costing you." },
];
const FAQS = [
  { q: "How is this different from the free audit?", a: "The free audit fetches your page and measures it. This one reasons about facts you supply, which is what you need when the page cannot be fetched: behind a login, on staging, not published yet, or on a client site you do not control. Use the audit when the URL is public. Use this when it is not." },
  { q: "Does it visit my URL?", a: "No, and it says so throughout. It reasons only from what you type in. Anything claiming to have crawled a page it was never given access to is guessing." },
  { q: "What should I gather first?", a: "Title, H1, meta description, whether the page is indexable, whether the canonical is correct, and your LCP, INP and CLS if you have them. Leave the ones you do not know blank rather than guessing, because a wrong number produces confident wrong advice." },
  { q: "Where do I get the Core Web Vitals numbers?", a: "Search Console gives you field data from real users, which is the number that counts. PageSpeed Insights gives you both field and lab. Lab data from your own laptop is the least useful of the three." },
  { q: "Will it tell me what to do first?", a: "Yes, ranked by severity. Access problems outrank content problems, because a page that cannot be indexed cannot be improved into ranking." },
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "Technical SEO triage tool", url: `${SITE.url}/free-tools/seo-audit`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "Turn the page facts you already have into a severity ranked action plan covering crawl, indexation, content and Core Web Vitals risks. For pages a crawler cannot reach.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "Technical SEO triage tool", item: `${SITE.url}/free-tools/seo-audit` },
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
            <span>SEO triage</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">Triage a page a crawler <span className="text-mt-purple">cannot reach.</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Staging builds, pages behind a login, client sites you do not control. Supply the facts you have and get a severity ranked plan. For anything public, the live audit measures it properly instead.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><ToolWorkspace tool="seo-audit" /></Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>What it covers</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">Three layers, ranked by what blocks what.</h2>
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
            <p className="text-lg leading-relaxed text-mt-slate">Access problems are always first. A page carrying a noindex directive cannot be improved into ranking, so the content work behind it is wasted until that is fixed. The plan reflects that ordering rather than listing everything as equally urgent.</p>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about triage.</h2>
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
