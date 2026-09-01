import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RetainerVsBuild } from "@/components/tools/RetainerVsBuild";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Retainer versus building it once",
  description: "Compare what an ongoing monthly retainer costs against building and maintaining the same thing as an asset you own, and find the month the two cross over.",
  alternates: { canonical: "/free-tools/retainer-vs-build" },
  openGraph: { title: `Retainer versus building it once | ${SITE.name}`, description: "Compare what an ongoing monthly retainer costs against building and maintaining the same thing as an asset you own, and find the month the two cross over.", url: `${SITE.url}/free-tools/retainer-vs-build` },
};

const FAQS = [
  { q: "Is this not just an argument for hiring you?", a: "It would be, if the model were rigged. It is not. When upkeep meets or exceeds the retainer the tool says building never pays back, and when the crossover falls beyond your planning horizon it says the retainer is the sensible choice. Both outcomes are common with small retainers." },
  { q: "What does a retainer buy that this does not count?", a: "Ongoing attention, flexibility to move priorities month to month, no capital outlay, and delivery risk sitting with the supplier rather than you. All real, none of them priceable by arithmetic, and all listed on the page rather than left out." },
  { q: "Why does upkeep have to be above zero?", a: "Because nothing runs unattended forever. Hosting, dependency updates, the occasional change. A build quoted with zero ongoing cost is being undersold, and the true figure will surface later as an unbudgeted surprise." },
  { q: "Should the months already paid affect my decision?", a: "No. That money is spent either way, and the only question that matters is what happens from here. It is shown because people want to see it, not because it belongs in the maths." },
  { q: "What is a fair horizon to compare over?", a: "However far the business actually plans. Three years is a reasonable default for a website or an internal system. If you genuinely do not know whether the company will want this in eighteen months, that argues for renting rather than owning." }
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "Retainer versus building it once", url: `${SITE.url}/free-tools/retainer-vs-build`, applicationCategory: "BusinessApplication", operatingSystem: "Any", description: "Compare what an ongoing monthly retainer costs against building and maintaining the same thing as an asset you own, and find the month the two cross over.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "Retainer versus building it once", item: `${SITE.url}/free-tools/retainer-vs-build` },
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
            <span>Retainer vs build</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Build</SectionLabel>
            <h1 className="mt-6">Rent it monthly, or <span className="text-mt-purple">own it outright?</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Cumulative cost of a monthly retainer against building and maintaining the same thing, and the month the two lines cross. Written to be fair to the retainer, and it will tell you when keeping yours is the right call.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><RetainerVsBuild /></Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask before switching.</h2>
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
