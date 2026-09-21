/* Payment gateways in Ghana: the directory, the comparison and the fee
   calculator all read from here.

   VERIFICATION RULE. A fee appears as a number only if it was read from the
   provider's own page on the date recorded. Anything else is marked as not
   published, with a note on why. On 21 September 2026 Paystack's pricing
   page and support centre both sat behind a bot challenge that a real
   browser could not pass, and Hubtel's fees sit behind a merchant login.
   Third party reviews quote figures for both; we do not repeat them as
   fact. CLAUDE.md section 9: never take a factual claim on trust. */

export type Fee = { rate: number; note?: string } | { rate: null; note: string };

export type Gateway = {
  slug: string;
  name: string;
  href: string;
  checked: string;
  source: string;
  summary: string;
  momo: Fee;
  localCard: Fee;
  intlCard: Fee;
  settlement: string;
  monthly: string;
  momoPayout: string;
  bestFor: string;
  watch: string;
};

export const GATEWAYS: Gateway[] = [
  {
    slug: "flutterwave",
    name: "Flutterwave",
    href: "https://flutterwave.com/gh/pricing",
    checked: "2026-09-21",
    source: "flutterwave.com/gh/pricing",
    summary: "The only one of the three that publishes every fee on a public page.",
    momo: { rate: 2.0, note: "Wallets and Mobile Money, per transaction" },
    localCard: { rate: 2.6, note: "Mastercard and Visa issued in Ghana" },
    intlCard: { rate: 4.8, note: "Mastercard, Visa, AMEX and Discover from abroad" },
    settlement: "Next day for local payments. International varies by region.",
    monthly: "None published",
    momoPayout: "1.5% per transfer to Mobile Money; GHS 10 per bank transfer",
    bestFor: "A store selling to Ghana and abroad that wants one gateway for cards and MoMo, with published pricing to plan against.",
    watch: "The international card rate is the highest of the three, so a diaspora heavy store should model it.",
  },
  {
    slug: "paystack",
    name: "Paystack",
    href: "https://paystack.com/gh/pricing",
    checked: "2026-09-21",
    source: "support.paystack.com (Mobile Money and USSD articles)",
    summary: "Publishes its Mobile Money fee in its support centre. The pricing page could not be read by an automated check on the date recorded.",
    momo: { rate: 1.95, note: "Per Mobile Money transaction, from Paystack's support article. USSD adds GHS 0.05 per session." },
    localCard: { rate: null, note: "Published on paystack.com/gh/pricing, which served a bot challenge to our check. Confirm on the page." },
    intlCard: { rate: null, note: "As above. Confirm on the page before modelling." },
    settlement: "Payout to a bank account or a Mobile Money wallet. No minimum for MoMo payouts; GHS 50 minimum for bank payouts, per Paystack's support centre.",
    monthly: "None published",
    momoPayout: "No minimum threshold for payouts to a Mobile Money wallet",
    bestFor: "A developer led build. Paystack's API and documentation are the most widely used in the region, and most Ghanaian ecommerce platforms support it out of the box.",
    watch: "Read the card fees on the pricing page yourself; we will not quote what we could not read.",
  },
  {
    slug: "hubtel",
    name: "Hubtel",
    href: "https://hubtel.com",
    checked: "2026-09-21",
    source: "hubtel.com, fees behind merchant login",
    summary: "The largest local player, with fees that are not published on a public page.",
    momo: { rate: null, note: "Not published publicly. Third party reviews quote a percentage with a cap; we do not repeat figures we could not verify. Ask Hubtel for the current schedule." },
    localCard: { rate: null, note: "Not published publicly." },
    intlCard: { rate: null, note: "Not published publicly." },
    settlement: "Not published publicly",
    monthly: "Not published publicly. Reviews mention a monthly fee; confirm with Hubtel.",
    momoPayout: "Not published publicly",
    bestFor: "A business that also wants Hubtel's point of sale, USSD and merchant tools, where the gateway is part of a wider Hubtel setup.",
    watch: "Ask for the fee schedule in writing before committing. A cap on Mobile Money fees, if it applies, changes the maths for high value orders.",
  },
];

/* The calculator runs only on verified rates. */
export const CALCULABLE = GATEWAYS.flatMap((g) =>
  (["momo", "localCard", "intlCard"] as const)
    .filter((k) => g[k].rate !== null)
    .map((k) => ({ gateway: g.name, slug: g.slug, method: k, rate: g[k].rate as number })),
);

export const METHOD_NAMES = { momo: "Mobile Money", localCard: "Local card", intlCard: "International card" } as const;
