import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "GEO content brief generator",
  description: "Structure a page before anyone drafts it: one primary query, answer first headings, the entities to cover, the questions to answer, and the sources it needs.",
  alternates: { canonical: "/free-tools/geo-content-brief" },
  openGraph: { title: `GEO content brief generator | ${SITE.name}`, description: "Structure a page before anyone drafts it: one primary query, answer first headings, the entities to cover, the questions to answer, and the sources it needs.", url: `${SITE.url}/free-tools/geo-content-brief` },
};

const COVERS = [
  { code: "B.01", title: "One query, one job", body: "A page written for a vague cluster of related phrases answers none of them well. The brief starts by naming the single question the page exists to answer." },
  { code: "B.02", title: "Answer first structure", body: "The direct answer near the top, then conditions, examples and exceptions. That is what a reader skims for and what a retrieval system can lift." },
  { code: "B.03", title: "Entities and sources", body: "The things that must be named, and the kind of source each claim needs. Unsupported assertions are what stop a page being quotable." },
];
const FAQS = [
  { q: "What makes a brief a GEO brief rather than an SEO brief?", a: "It plans for extraction as well as ranking. Answer first sections, named entities, and claims that carry a source. A generative engine quotes passages it can lift and attribute, so the structure has to make that possible rather than burying the answer in paragraph six." },
  { q: "Does structured content really change whether I get cited?", a: "Structure is necessary and not sufficient. It makes a page usable by a retrieval system. Whether it gets chosen still depends on whether the page is genuinely the best answer and whether the site has authority for the subject. Nobody can promise a citation, and anyone who does is selling something." },
  { q: "How many questions should a page answer?", a: "One primary question, and the handful of follow ups a reader would obviously have next. Trying to cover fifteen related queries in one page is how you end up ranking for none of them." },
  { q: "Should every claim have a source?", a: "Every claim a reader might reasonably doubt. Common knowledge does not need a citation. A figure, a statistic or a technical assertion does, and linking to the primary source rather than to someone else summarising it is what makes the page worth quoting." },
  { q: "Does it write the content for me?", a: "No. It produces the brief: the structure, the questions, the entities and the source requirements. Drafting from a brief is where the subject expertise goes in, and that part is yours." },
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "GEO content brief generator", url: `${SITE.url}/free-tools/geo-content-brief`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "Structure a page before anyone drafts it: one primary query, answer first headings, the entities to cover, the questions to answer, and the sources it needs.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "GEO content brief generator", item: `${SITE.url}/free-tools/geo-content-brief` },
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
            <span>GEO brief</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">Plan the page <span className="text-mt-purple">before anyone drafts it.</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">One primary query, answer first headings, the entities that must appear, the questions to answer, and the sources each claim needs. Structure decided before writing is what stops a page covering everything and answering nothing.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><ToolWorkspace tool="geo-brief" /></Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>What the brief contains</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">Three decisions made before the first sentence.</h2>
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
            <p className="text-lg leading-relaxed text-mt-slate">The brief is not the content. It is the set of decisions that make the content possible to write and possible to quote: what the page is for, what it must name, and what it must be able to prove. Drafting from a brief is where your subject knowledge goes in.</p>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about briefs.</h2>
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
