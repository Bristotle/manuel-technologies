import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SchemaGenerator } from "@/components/tools/SchemaGenerator";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "JSON-LD schema generator",
  description: "Generate clean, valid JSON-LD for Organization, LocalBusiness, Service and FAQPage markup. Empty fields are omitted rather than emitted blank. No account, no email to copy the code.",
  alternates: { canonical: "/free-tools/schema-generator" },
  openGraph: { title: `JSON-LD schema generator | ${SITE.name}`, description: "Generate clean, valid JSON-LD for Organization, LocalBusiness, Service and FAQPage markup. Empty fields are omitted rather than emitted blank. No account, no email to copy the code.", url: `${SITE.url}/free-tools/schema-generator` },
};

const FAQS = [
  { q: "Do I have to give an email to copy the code?", a: "No. Gating a snippet that is already visible on screen is theatre, and every other tool on this site is ungated too. Copy it and go." },
  { q: "Why are empty fields left out of the output?", a: "Because a property asserting nothing is worse than an absent one. Blank values in structured data are noise at best, and at worst they contradict what is on the page." },
  { q: "Where does the script tag go?", a: "The head is conventional but anywhere in the body works and Google reads both. What matters more is that it appears once per page and describes that page rather than the site in general." },
  { q: "Can schema make a thin page rank?", a: "No. Schema is a label, not an argument. It clarifies what a page is; it cannot make an empty page worth returning. Marking up claims that are not visible to a reader is also a manual action risk." },
  { q: "Which LocalBusiness type should I use?", a: "The most specific subtype that fits. Dentist, Plumber and Accountant all exist and all beat the generic LocalBusiness, because specificity is itself a relevance signal in local search." }
];

export default function Page() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "JSON-LD schema generator", url: `${SITE.url}/free-tools/schema-generator`, applicationCategory: "DeveloperApplication", operatingSystem: "Any", description: "Generate clean, valid JSON-LD for Organization, LocalBusiness, Service and FAQPage markup. Empty fields are omitted rather than emitted blank. No account, no email to copy the code.", offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, provider: { "@type": "Organization", name: SITE.name, url: SITE.url } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
      { "@type": "ListItem", position: 3, name: "JSON-LD schema generator", item: `${SITE.url}/free-tools/schema-generator` },
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
            <span>Schema generator</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">Clean JSON-LD, <span className="text-mt-purple">without the email gate.</span></h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Organization, LocalBusiness, Service and FAQPage markup, generated as you type. Empty fields are omitted rather than emitted blank, and nothing is sent anywhere.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><SchemaGenerator /></Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about structured data.</h2>
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
