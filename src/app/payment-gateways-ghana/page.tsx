import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GatewayFeeCalculator } from "@/components/tools/GatewayFeeCalculator";
import { GATEWAYS, type Fee } from "@/lib/gateways";
import { ogCard } from "@/lib/og";
import { SITE } from "@/lib/site";

/* Directory, comparison and calculator on one page, all from lib/gateways.
   Three patterns from one dataset. The honesty is the feature: a fee is a
   number only when it was read from the provider's own page. */

export const metadata: Metadata = {
  title: { absolute: "Payment gateways in Ghana: fees compared" },
  description: "Flutterwave, Paystack and Hubtel for accepting MTN MoMo, Telecel Cash and cards on a Ghanaian website. Published fees, what each does not publish, settlement, and a fee calculator.",
  alternates: { canonical: "/payment-gateways-ghana" },
  openGraph: { images: [ogCard("Payment gateways in Ghana", "Build")] },
};

const cell = (fee: Fee) => (fee.rate !== null ? `${fee.rate}%` : "Not published");

const FAQS = [
  { q: "Which payment gateway is cheapest in Ghana?", a: "On published rates, Paystack's Mobile Money fee of 1.95% is the lowest number we could verify, against Flutterwave's 2%. For cards, Flutterwave publishes 2.6% local and 4.8% international; Paystack's card rates are on its pricing page, which our automated check could not read, and Hubtel does not publish fees publicly. Cheapest depends on your mix of MoMo and card, and on caps and monthly fees that only a quote will confirm." },
  { q: "Do I need a payment gateway to accept MoMo on my website?", a: "Yes. A gateway prompts the customer's phone for approval, reports the result to your site, and settles the money to you. A merchant MoMo number on a page is not online payment: it is a bank transfer with extra steps and no confirmation, and it does not update an order." },
  { q: "How fast is settlement?", a: "Flutterwave publishes next day for local payments. Paystack pays out to a bank account or a Mobile Money wallet, with no minimum for MoMo wallets. Hubtel does not publish settlement terms publicly. Confirm the schedule in writing before launch, since it affects cash flow more than the fee does." },
  { q: "Why are some fees marked not published?", a: "Because we only print a number we read from the provider's own page on the date recorded. Paystack's pricing page served a bot challenge to our check and Hubtel's fees sit behind a merchant login. Third party reviews quote figures for both; repeating them as fact would be guessing with a percentage sign." },
  { q: "What does the gateway integration cost to build?", a: "It is included in the Online store tier on our pricing page, GHS 6,000 to 9,000, which covers cart, checkout, MoMo and card payment, failure handling and order alerts. Adding a gateway to an existing site is quoted after a look at the site." },
];

export default function GatewaysPage() {
  const url = `${SITE.url}/payment-gateways-ghana`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "ItemList", name: "Payment gateways in Ghana", url, itemListElement: GATEWAYS.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.name, url: g.href })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Payment gateways in Ghana", item: url }] },
  ];
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <Container className="relative">
          <SectionLabel accent="pink">Payment gateways in Ghana</SectionLabel>
          <h1 className="mt-6 max-w-[22ch]">Flutterwave, Paystack and Hubtel: what each one charges, and what it does not say.</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Accepting MTN MoMo, Telecel Cash and cards on a website goes through one of three gateways. A fee below is a number only where we read it from the provider&rsquo;s own page on {GATEWAYS[0].checked}. Where a provider does not publish, the table says so rather than repeating a figure from a review.</p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionLabel accent="pink">Compared</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">Published rates, side by side.</h2>
          <div className="mt-10 overflow-x-auto rounded-[18px] border border-mt-border bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead><tr className="border-b border-mt-border">{["Gateway", "Mobile Money", "Local card", "International card", "Settlement", "Monthly fee", "Source"].map((h) => <th key={h} className="px-5 py-4 font-[family-name:var(--font-mono)] text-[0.625rem] font-bold uppercase tracking-[0.14em] text-mt-muted">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-mt-border">
                {GATEWAYS.map((g) => (
                  <tr key={g.slug}>
                    <td className="px-5 py-4 align-top font-semibold text-mt-ink">{g.name}</td>
                    <td className="px-5 py-4 align-top text-mt-slate"><span className={g.momo.rate === null ? "text-mt-muted" : "font-semibold text-mt-ink"}>{cell(g.momo)}</span>{g.momo.note ? <span className="mt-1 block max-w-[24ch] text-xs leading-snug text-mt-muted">{g.momo.note}</span> : null}</td>
                    <td className="px-5 py-4 align-top text-mt-slate"><span className={g.localCard.rate === null ? "text-mt-muted" : "font-semibold text-mt-ink"}>{cell(g.localCard)}</span>{g.localCard.note ? <span className="mt-1 block max-w-[24ch] text-xs leading-snug text-mt-muted">{g.localCard.note}</span> : null}</td>
                    <td className="px-5 py-4 align-top text-mt-slate"><span className={g.intlCard.rate === null ? "text-mt-muted" : "font-semibold text-mt-ink"}>{cell(g.intlCard)}</span>{g.intlCard.note ? <span className="mt-1 block max-w-[24ch] text-xs leading-snug text-mt-muted">{g.intlCard.note}</span> : null}</td>
                    <td className="px-5 py-4 align-top text-mt-slate max-w-[26ch]">{g.settlement}</td>
                    <td className="px-5 py-4 align-top text-mt-slate">{g.monthly}</td>
                    <td className="px-5 py-4 align-top"><a href={g.href} target="_blank" rel="noopener noreferrer" className="text-mt-purple underline decoration-mt-border underline-offset-4 hover:decoration-mt-purple">{g.source}</a><span className="mt-1 block text-xs text-mt-muted">checked {g.checked}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-20 sm:py-28">
        <Container>
          <SectionLabel accent="pink">Fee calculator</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">What the fees come to at your order value.</h2>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Only verified rates are in the table. A gateway that does not publish is not guessed.</p>
          <div className="mt-10"><GatewayFeeCalculator /></div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionLabel accent="pink">Who each is for</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">The honest version of a recommendation.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {GATEWAYS.map((g) => (
              <article key={g.slug} className="flex flex-col rounded-[18px] border border-mt-border bg-white p-6">
                <span className="mt-label">( {g.name} )</span>
                <p className="mt-4 text-[0.9375rem] font-semibold leading-relaxed text-mt-ink">{g.summary}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate"><strong className="text-mt-ink">Best for.</strong> {g.bestFor}</p>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-mt-slate"><strong className="text-mt-ink">Watch.</strong> {g.watch}</p>
                <p className="mt-4 text-xs text-mt-muted">MoMo payouts: {g.momoPayout}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 max-w-[65ch] text-[0.9375rem] leading-relaxed text-mt-slate">
            <p><strong className="text-mt-ink">Our pick, and why.</strong> For a new Ghanaian store we usually integrate Paystack first, because its developer tooling is the most mature and its Mobile Money rate is the lowest we could verify, with Flutterwave where international cards are a large share of sales. We say that as the people who build the integration, and the choice is yours after reading the fee schedules yourself. The integration is included in our <Link href="/pricing#store" className="text-mt-purple hover:underline">Online store tier</Link>, and the mechanics are in <Link href="/blog/momo-payment-integration-website-ghana" className="text-mt-purple hover:underline">how to accept MoMo on your website</Link>.</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-mt-border bg-white py-20 sm:py-28">
        <Container>
          <SectionLabel accent="pink">Questions</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">Asked before every store build.</h2>
          <div className="mt-12 max-w-[760px] border-t border-mt-border">
            {FAQS.map((x) => (
              <details key={x.q} className="group border-b border-mt-border py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-semibold marker:hidden"><span>{x.q}</span><span aria-hidden="true" className="shrink-0 text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">{x.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4"><Button href="/contact">Get a fixed price for a store</Button><Button href="/glossary/payment-gateway" variant="secondary">What a gateway is</Button></div>
        </Container>
      </section>
    </main>
  );
}
