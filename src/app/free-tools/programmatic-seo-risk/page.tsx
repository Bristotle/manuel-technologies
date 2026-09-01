import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChecklistTool } from "@/components/tools/ChecklistTool";
import { PROGRAMMATIC_ITEMS, PROGRAMMATIC_BANDS } from "@/lib/tools/programmatic";
import { SITE } from "@/lib/site";

const GROUPS = [...new Set(PROGRAMMATIC_ITEMS.map((i) => i.group))];

export const metadata: Metadata = {
  title: "Programmatic SEO indexation risk index",
  description: "Score a programmatic page set against fifteen weighted failure modes covering uniqueness, crawl signals, architecture and data quality.",
  alternates: { canonical: "/free-tools/programmatic-seo-risk" },
  openGraph: { title: `Programmatic SEO indexation risk index | ${SITE.name}`, description: "Score a programmatic page set against fifteen weighted failure modes covering uniqueness, crawl signals, architecture and data quality.", url: `${SITE.url}/free-tools/programmatic-seo-risk` },
};

const FAQS = [
  { q: "Why is a high score bad here?", a: "This one scores risk rather than completeness. Each box describes a problem, so ticking it counts against you. A low score means few of the known failure modes are present." },
  { q: "What is the most dangerous single item?", a: "Two pages differing only by a variable, such as a place name. It is the strongest predictor of a set being crawled once and never indexed, and unlike most items on this list it cannot be fixed after launch without rewriting the template." },
  { q: "Why does sitemap lastmod matter so much?", a: "Because it is the strongest crawl scheduling signal a site has, and it is easy to destroy. A sitemap that stamps build time on every URL tells Google that thousands of pages changed when none did. Once it proves unreliable, Google ignores lastmod for the whole site." },
  { q: "Are orphan pages really that serious?", a: "Yes. A sitemap is a suggestion, not an instruction. Pages reachable only from the sitemap, with no internal links pointing at them, are the classic occupants of the discovered but not indexed bucket." },
  { q: "How many pages is too many?", a: "There is no number. The constraint is whether each page has something true and specific to say, and whether your data can keep saying it. A hundred pages with real data outperform ten thousand without, and the ten thousand can damage the assessment of the whole domain." }
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "Programmatic SEO indexation risk index", url: `${SITE.url}/free-tools/programmatic-seo-risk`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "Score a programmatic page set against fifteen weighted failure modes covering uniqueness, crawl signals, architecture and data quality.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "Programmatic SEO indexation risk index", item: `${SITE.url}/free-tools/programmatic-seo-risk` },
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
            <span>Indexation risk</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">Will your generated pages <span className="text-mt-purple">actually get indexed?</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Fifteen known failure modes for programmatic page sets, weighted by how badly each one damages indexation. Tick what is true of your setup. This one scores risk, so a low number is the good outcome.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide">
          <ChecklistTool
            items={PROGRAMMATIC_ITEMS}
            bands={PROGRAMMATIC_BANDS}
            groups={GROUPS}
            invert={true}
            scoreLabel="Risk profile"
            actionLabel="Address these first"
            emptyMessage="None of the known failure modes are present. Scale carefully and keep watching indexation per cluster as the set grows."
            footnote={<p>A self assessment against failure modes we have seen in real page sets, including on this site. It cannot see your pages, so it scores what you tell us and orders the gaps by how much each one costs.</p>}
            cta={{ href: "/grow/programmatic-seo", label: "How we build these properly" }}
          />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask before shipping at scale.</h2>
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
