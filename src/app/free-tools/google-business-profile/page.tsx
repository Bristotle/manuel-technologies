import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GbpChecker } from "@/components/tools/GbpChecker";
import { GBP_ITEMS } from "@/lib/tools/gbp";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Google Business Profile optimisation checker",
  description:
    "Score your Google Business Profile against twenty weighted checks covering categories, reviews, media, services and activity, and get the gaps ordered by what moves local visibility most.",
  alternates: { canonical: "/free-tools/google-business-profile" },
  openGraph: {
    title: `Google Business Profile checker | ${SITE.name}`,
    description:
      "Twenty weighted checks, a local dominance score, and the gaps ordered by impact. No account, nothing stored.",
    url: `${SITE.url}/free-tools/google-business-profile`,
  },
};

const FAQS = [
  {
    q: "Does this read my actual profile?",
    a: "No, and nothing else can either. There is no public way to query another business's profile completeness, so any tool claiming to scan it is either guessing from the map pack or scraping. This scores what you tell us, which is honest and takes about three minutes.",
  },
  {
    q: "Why are the items weighted differently?",
    a: "Because they are not equally important. Choosing the most specific primary category moves local visibility far more than posting weekly. A flat checklist implies otherwise and sends people to spend an afternoon on the wrong thing.",
  },
  {
    q: "What is the single highest impact item?",
    a: "The primary category, if it is not already the most specific one available. It is the strongest relevance signal in local search, it takes two minutes to change, and a surprising number of businesses are sitting in a broad category their competitors have already left.",
  },
  {
    q: "Do reviews matter more than the total count suggests?",
    a: "Velocity and recency matter more than the total. A profile with two hundred reviews where the newest is eighteen months old reads worse than one with forty that gained three last month, both to a searcher and to the ranking system.",
  },
  {
    q: "Will fixing all of this get me into the map pack?",
    a: "It removes the reasons you are being held out of it, which is not the same promise. Proximity to the searcher is a factor nobody controls, and in dense categories the profile is necessary rather than sufficient. Anyone guaranteeing map pack placement is selling something.",
  },
];

export default function GbpPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Google Business Profile optimisation checker",
      url: `${SITE.url}/free-tools/google-business-profile`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description:
        "Scores a Google Business Profile self assessment against twenty weighted checks and returns the gaps ordered by impact.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to optimise a Google Business Profile",
      description:
        "Twenty weighted checks across foundations, content, media, reviews and activity.",
      step: GBP_ITEMS.slice(0, 10).map((item, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: item.label,
        text: item.why,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${SITE.url}/free-tools` },
        { "@type": "ListItem", position: 3, name: "Google Business Profile checker", item: `${SITE.url}/free-tools/google-business-profile` },
      ],
    },
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
            <span>Google Business Profile</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">
              Score your Google Business Profile in{" "}
              <span className="text-mt-purple">about three minutes.</span>
            </h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              Twenty checks, weighted by how much each one actually moves local
              visibility, so the gaps come back in the order worth doing them.
              For most local businesses this is the cheapest visibility
              available and the least attended.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><GbpChecker /></Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Why weighted</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">A flat checklist sends people to spend an afternoon on the wrong thing.</h2>
          <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                Most Google Business Profile checklists list twenty items as
                equals. They are not equals. Choosing the most specific primary
                category is the strongest relevance signal available and takes
                two minutes. Posting weekly is worth having and worth far less.
              </p>
              <p>
                So every item here carries a weight, the score reflects those
                weights, and the action list is sorted by them. The top of that
                list is where an hour is best spent.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                The profile is only half of it. A searcher who taps through to a
                slow page that does not mention the service they searched for
                has still been lost, and the profile did its job.
              </p>
              <p className="font-semibold text-mt-ink">
                Fix the profile first because it is free. Then look at the page
                it points to, which is where the enquiry is actually won.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/grow/technical-seo" className="mt-underline inline-flex items-center text-base font-semibold text-mt-purple">
              How we approach the site behind the profile
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">What people ask about local profiles.</h2>
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
