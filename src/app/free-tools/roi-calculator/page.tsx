import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RoiCalculator } from "@/components/tools/RoiCalculator";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Organic traffic and SEO ROI calculator",
  description:
    "What an organic session is worth to your business, what a traffic increase would be worth at your own conversion rate, and the break even point.",
  alternates: { canonical: "/free-tools/roi-calculator" },
  openGraph: {
    title: `SEO ROI calculator | ${SITE.name}`,
    description:
      "Turn a traffic conversation into a money conversation. Runs in your browser, no account, nothing stored.",
    url: `${SITE.url}/free-tools/roi-calculator`,
  },
};

const FAQS = [
  {
    q: "Is this a prediction of what SEO will do for me?",
    a: "No, and be wary of any calculator that says it is. This is arithmetic on five numbers you supply. It shows what a given traffic increase would be worth at your own conversion rate, close rate and customer value. It does not claim that increase is achievable, or say how long it would take, because no tool that has never seen your site can know either.",
  },
  {
    q: "Which traffic number should I enter?",
    a: "Organic sessions a month, from Search Console or your analytics, not total traffic. Mixing paid and direct traffic in makes every figure below it wrong, usually in a flattering direction.",
  },
  {
    q: "What if I do not know my conversion rate?",
    a: "Divide the enquiries you got last month by the sessions you got last month. If you cannot get either number, that is the first problem to fix, and it is a measurement problem rather than a traffic one.",
  },
  {
    q: "Should customer value be the first invoice or the lifetime value?",
    a: "The whole relationship. Using the first invoice understates everything and makes almost any marketing look unaffordable. Using an optimistic lifetime figure does the opposite, so be conservative if you are unsure.",
  },
  {
    q: "Why does it show a break even number?",
    a: "Because it is the question a buyer actually has, and most calculators leave it out because the answer is sometimes uncomfortable. If the traffic increase needed to cover the cost is implausible for your market, you are better off knowing that before you commission anything.",
  },
];

export default function RoiCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Organic traffic and SEO ROI calculator",
      url: `${SITE.url}/free-tools/roi-calculator`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description:
        "Calculates the value of an organic session and the arithmetic value of a traffic increase, from figures the user supplies.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
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
        { "@type": "ListItem", position: 3, name: "ROI calculator", item: `${SITE.url}/free-tools/roi-calculator` },
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
            <span>ROI calculator</span>
          </div>
          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free tool / Grow</SectionLabel>
            <h1 className="mt-6">
              What is one organic visit{" "}
              <span className="text-mt-purple">actually worth to you?</span>
            </h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              Five numbers you already have, and the arithmetic that turns a
              traffic conversation into a money conversation. It runs in your
              browser, sends nothing anywhere, and tells you the break even
              point as well as the upside.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container size="wide"><RoiCalculator /></Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>How to read it</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">The figure that matters is the value of one session.</h2>
          <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                Most people arrive at SEO thinking about rankings, then traffic,
                then eventually revenue. That order makes the work impossible to
                judge, because a ranking has no price attached to it.
              </p>
              <p>
                Running the arithmetic backwards fixes it. Once you know what a
                single organic visit is worth at your own conversion and close
                rates, every decision below it becomes arithmetic rather than
                faith.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                The break even figure is the honest half. It says how much more
                traffic would have to arrive before a given monthly spend covers
                itself. If that number is small, the case is easy. If it is
                large, you have learned something valuable for free.
              </p>
              <p className="font-semibold text-mt-ink">
                A calculator that only ever produces an encouraging answer is a
                sales tool, not a calculator.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">What people ask about this calculator.</h2>
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
