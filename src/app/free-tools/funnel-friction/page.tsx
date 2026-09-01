import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChecklistTool } from "@/components/tools/ChecklistTool";
import { FUNNEL_ITEMS, FUNNEL_BANDS } from "@/lib/tools/funnel";
import { SITE } from "@/lib/site";

const GROUPS = [...new Set(FUNNEL_ITEMS.map((i) => i.group))];

export const metadata: Metadata = {
  title: "B2B enquiry funnel friction tester",
  description: "Score the path between a service page visit and a signed brief against sixteen weighted checks, and get the leaks ordered by how often each one is the actual cause.",
  alternates: { canonical: "/free-tools/funnel-friction" },
  openGraph: { title: `B2B enquiry funnel friction tester | ${SITE.name}`, description: "Score the path between a service page visit and a signed brief against sixteen weighted checks, and get the leaks ordered by how often each one is the actual cause.", url: `${SITE.url}/free-tools/funnel-friction` },
};

const FAQS = [
  { q: "Why only the bottom of the funnel?", a: "Because it is the half nobody audits. Most teams spend on getting more people to the page and never check whether the page, the form and the reply are losing the ones who already arrived. Fixing the bottom is cheaper and the effect is immediate." },
  { q: "What is the single biggest leak?", a: "Response time. A human reply inside one working hour changes conversion more than any change you can make to the page, and it is the item most often missing. It costs nothing but an owner." },
  { q: "Do I really need a price on the page?", a: "A signal, not a price list. A range, a starting point, or a typical engagement size. Its absence is the most common reason a well qualified buyer leaves without asking, because they assume they cannot afford you or that finding out will be a sales process." },
  { q: "Is a shorter form always better?", a: "Up to a point. Fewer fields raise completion but can lower quality. The rule that holds is to ask for what you need in order to reply, not what you need in order to quote. The rest belongs in the conversation." },
  { q: "Why does deliverability appear in a funnel audit?", a: "Because a reply that lands in spam is identical to no reply, and you never find out. If SPF, DKIM and DMARC are not aligned, some share of your answers are never read." }
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "B2B enquiry funnel friction tester", url: `${SITE.url}/free-tools/funnel-friction`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "Score the path between a service page visit and a signed brief against sixteen weighted checks, and get the leaks ordered by how often each one is the actual cause.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "B2B enquiry funnel friction tester", item: `${SITE.url}/free-tools/funnel-friction` },
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
            <span>Funnel friction</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">Where do enquiries <span className="text-mt-purple">actually leak?</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Sixteen checks on the stretch between someone landing on a service page and a brief being agreed. Weighted by how often each one turns out to be the real cause, so the list comes back in the order worth fixing.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide">
          <ChecklistTool
            items={FUNNEL_ITEMS}
            bands={FUNNEL_BANDS}
            groups={GROUPS}
            invert={false}
            scoreLabel="Funnel health"
            actionLabel="Fix these first"
            emptyMessage="Every item is ticked. The path is not the constraint, so the next gain is in getting more of the right people to it."
            footnote={<p>A self assessment of your own funnel, scored against weights that reflect how often each item is the actual cause of a lost enquiry rather than a theoretical best practice.</p>}
            cta={{ href: "/free-audit", label: "Now audit the page itself" }}
          />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about funnel leaks.</h2>
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
