import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PUBLISHED_INDUSTRIES } from "@/lib/pseo/industries";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Websites by industry",
  description: "What a website has to do for law firms, hospitals, schools and real estate companies in Ghana, what it costs, and how each industry's sites measure up.",
  alternates: { canonical: "/websites-for" },
  openGraph: { images: [ogCard("Websites by industry", "Build")] },
};

export default function IndustriesIndex() {
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Websites by industry", itemListElement: PUBLISHED_INDUSTRIES.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: `Websites for ${i.name} in ${i.market}`, url: `${SITE.url}/websites-for/${i.slug}` })) };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <Container className="relative">
          <SectionLabel>Websites by industry</SectionLabel>
          <h1 className="mt-6 max-w-[20ch]">The same craft, pointed at what your industry actually needs.</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">A hospital site and a law firm site are not the same site with different words. Each page here says what the industry&rsquo;s website has to do, what that costs on our published tiers, and how its peers in Ghana measure up on our benchmark.</p>
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {PUBLISHED_INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link href={`/websites-for/${i.slug}`} className="mt-lift mt-spot group flex h-full flex-col rounded-[18px] border border-mt-border bg-white p-7 transition-colors duration-150 hover:border-mt-purple-light">
                  <span className="mt-label">( {i.name} · {i.market} )</span>
                  <h2 className="mt-4 !text-2xl !tracking-tight group-hover:text-mt-purple">{i.headline}</h2>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-mt-slate">{i.needs.slice(0, 3).map((n) => n.title).join(". ")}.</p>
                  <span className="mt-5 text-sm font-semibold text-mt-purple">What it needs and what it costs →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
