import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CrawlerCheck } from "@/components/tools/CrawlerCheck";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI crawler compatibility checker",
  description: "Check whether GPTBot, ClaudeBot, PerplexityBot and Google-Extended can read your site. We fetch your robots.txt and resolve the rules live.",
  alternates: { canonical: "/free-tools/ai-crawler-check" },
  openGraph: { title: `AI crawler compatibility checker | ${SITE.name}`, description: "Check whether GPTBot, ClaudeBot, PerplexityBot and Google-Extended can read your site. We fetch your robots.txt and resolve the rules live.", url: `${SITE.url}/free-tools/ai-crawler-check` },
};

const FAQS = [
  { q: "Why does this matter?", a: "A blocked crawler cannot read your pages, so the engine behind it cannot cite you, whatever your content says. It is the first thing to check before spending anything on being visible in AI answers, and it is a one line fix when it is wrong." },
  { q: "Which crawler belongs to which engine?", a: "GPTBot is ChatGPT and OpenAI training. ClaudeBot is Claude. PerplexityBot is Perplexity. Google-Extended controls whether your content grounds Gemini and AI Overviews. Applebot-Extended covers Apple Intelligence. CCBot is Common Crawl, which feeds many models indirectly." },
  { q: "I have no robots.txt. Is that a problem?", a: "Not for access, because everything is allowed by default. An explicit file is still better: it removes ambiguity, lets you name crawlers deliberately, and gives you somewhere to declare your sitemap." },
  { q: "Should I block AI crawlers?", a: "It is a real business decision, not an obvious yes or no. Blocking protects content from being used as training data. It also removes you from the answers those systems give, at a point where more buyers start there. Publishers often block. Service businesses selling expertise usually should not." },
  { q: "Does allowing them guarantee I get cited?", a: "No, and anyone who tells you otherwise is selling something. Access is necessary and nowhere near sufficient. The page still has to be worth quoting, which is a content and structure problem rather than a robots.txt one." }
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "AI crawler compatibility checker", url: `${SITE.url}/free-tools/ai-crawler-check`, applicationCategory: "DeveloperApplication", operatingSystem: "Any", description: "Check whether GPTBot, ClaudeBot, PerplexityBot and Google-Extended can read your site. We fetch your robots.txt and resolve the rules live.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "AI crawler compatibility checker", item: `${SITE.url}/free-tools/ai-crawler-check` },
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
            <span>AI crawlers</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">Is your site <span className="text-mt-purple">invisible to AI answers?</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">We fetch your robots.txt and resolve the rules that apply to six named AI crawlers, wildcards included. It takes about a second, and a blocked crawler is usually a one line fix nobody knew about.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><CrawlerCheck /></Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about AI crawlers.</h2>
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
