import type { BlogPost } from "@/lib/blog-posts";
import type { BlogFaq, BlogSection } from "@/lib/blog-types";
import { CARE_PLANS, TIERS, ghs } from "@/lib/pricing";
import AGENCIES from "@/lib/research/ghana-agencies-2026.json";
import UK from "@/lib/research/uk-accountancy-2026.json";

/* The technical cluster. Nobody in the SERP writes these, and they are the
   moat. Pillar: /pricing. Same rules as blog-cost-cluster.ts.

   GATEWAY FEES. Paystack's figure is from Paystack's own support page,
   Flutterwave's from Flutterwave's own Ghana pricing page, both fetched on
   11 September 2026. Hubtel publishes no rate card, which is itself stated.
   The Hubtel onboarding steps are from Hubtel's own merchant onboarding
   message. Nothing is remembered or taken from a third party roundup. */

const faq = (question: string, answer: string): BlogFaq => ({ question, answer });
const section = (heading: string, ...paragraphs: string[]): BlogSection => ({ heading, paragraphs });

const [starter, business, store] = TIERS;
const [essential] = CARE_PLANS;
const range = (t: typeof starter) => `${ghs(t.from)} to ${t.to.toLocaleString("en-GB")}`;

export const TECHNICAL_CLUSTER = "Website cost in Ghana";

type Agency = { name: string; domain: string; ttfbMs: number; htmlKb: number; score?: number };
const agencies = (AGENCIES.agencies as Agency[]).filter((a) => typeof a.score === "number");
const ttfbs = agencies.map((a) => a.ttfbMs).sort((a, b) => a - b);
const medianAgencyTtfb = ttfbs[Math.floor(ttfbs.length / 2)];
const slowestAgency = [...agencies].sort((a, b) => b.ttfbMs - a.ttfbMs)[0];
const heaviestAgency = [...agencies].sort((a, b) => b.htmlKb - a.htmlKb)[0];
const CWV_STORE = "https://chromewebstore.google.com/detail/cwv-drift-monitor/pkiklodchlkafnfidhhdagimgjjfdanm";

export const TECHNICAL_CLUSTER_POSTS: BlogPost[] = [
  /* ---------------------------------------------------------------------
     Post 13. MoMo integration. Anyone searching this has a live project.
     Primary: momo payment integration website ghana, mobile money
     website integration
     --------------------------------------------------------------------- */
  {
    slug: "momo-payment-integration-website-ghana",
    cluster: TECHNICAL_CLUSTER,
    title: "How to accept MTN MoMo and Telecel Cash on your website",
    metaTitle: "Accept MTN MoMo and Telecel Cash on your website",
    description: "The gateways that take Mobile Money in Ghana, their published fees, what onboarding asks for, and the pending state that catches stores out.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "10 min read",
    lead: `To accept MTN MoMo and Telecel Cash on a website in Ghana you connect the site to a payment gateway, and the gateway talks to the networks. Paystack publishes 1.95% per local transaction, Flutterwave publishes 2% for Mobile Money, and Hubtel publishes no rate card. The integration itself is included in our [Online store tier at ${range(store)}](/pricing#store), and this guide explains what it involves, what onboarding asks for, and the one state that most stores handle wrongly.`,
    heroImage: {
      src: "/work/impressiful.webp",
      alt: "Impressiful online store checkout with Mobile Money",
      width: 1200,
      height: 750,
      caption: "Impressiful. Mobile Money and card checkout across a catalogue past a thousand products. [See the case study](/work/impressiful).",
      href: "/work/impressiful",
    },
    sections: [
      section(
        "You do not integrate with MTN. You integrate with a gateway.",
        "MTN and Telecel do offer direct merchant APIs, but for almost every business the practical route is a payment gateway: one integration that gives you MTN MoMo, Telecel Cash, AirtelTigo Money and cards through a single connection, with settlement to your bank account. The gateway carries the network relationships, the compliance and the reconciliation. You carry one integration.",
        "The three gateways most Ghanaian stores use are Paystack, Flutterwave and Hubtel. All three support Mobile Money. They differ on published fees, settlement timing and how much of the process is visible before you sign up.",
      ),
      {
        heading: "Published fees, checked directly",
        paragraphs: [
          "Fees are set by the provider and change. These were read from each provider's own page on 11 September 2026, and you should read the current page before launch. A third party roundup is not a source for a fee you will pay on every sale.",
        ],
        table: {
          caption: "Gateway fees published for Ghana, from each provider's own page, 11 September 2026",
          headers: ["Gateway", "Mobile Money", "Local cards", "International cards", "Settlement", "Source"],
          rows: [
            ["Paystack", "1.95%", "1.95%", "Not on the Ghana row", "Not stated on that page", "[Paystack support](https://support.paystack.com/en/articles/2130306)"],
            ["Flutterwave", "2%", "2.6%", "4.8%", "Next day, local", "[Flutterwave Ghana pricing](https://flutterwave.com/gh/pricing)"],
            ["Hubtel", "Not published", "Not published", "Not published", "Not published", "Pricing page asks for a phone number first"],
          ],
        },
      },
      section(
        "What merchant onboarding asks for",
        "A gateway account is a merchant account, and merchant accounts require paperwork. Hubtel's onboarding, for example, assigns an account manager within a working day, confirms by SMS, operates on business days only, and can ask for a business registration document, a business operating permit and a district assembly licence.",
        "The practical advice is to start onboarding the day the build starts, not the day it finishes. A finished store that cannot take money is a brochure, and the paperwork takes longer than the last week of a build.",
        "Flutterwave's pricing page also notes two things worth deciding early: prices exclude VAT, and by default the customer bears the transaction charge. Whether you pass the fee on or absorb it is a business decision, and the checkout has to be built for whichever you choose.",
      ),
      section(
        "How the integration works",
        "The shape is the same on every gateway. The customer chooses Mobile Money at checkout and enters their number. The site asks the gateway to request payment. The customer's phone prompts them to approve, with their PIN. The gateway tells the site the result, usually by a callback to a URL on your server called a webhook, and the site records the order and tells the customer.",
        "Two things make the difference between an integration that works and one that loses money. The webhook must be verified, so that the site only trusts a payment confirmation that genuinely came from the gateway and not from anyone who found the URL. And the site must handle every outcome, not just success.",
      ),
      section(
        "The pending state, which is where stores go wrong",
        "A card payment succeeds or fails. A Mobile Money payment has a third outcome: pending. The customer has approved on their phone, but the network has not yet confirmed, and that can take seconds or, on a bad day, minutes.",
        "A store that treats pending as failed shows the customer an error, the customer tries again, and now they have paid twice or given up. A store that treats pending as paid ships an unpaid order. The correct behaviour is to tell the customer honestly that the payment is being confirmed, keep checking with the gateway, and complete the order only on confirmation, with a timeout after which the customer is told what to do.",
        `That logic is engineering, and it is the reason an online store costs more than a brochure with a buy button. It is inside our Online store tier, and [what an online store really costs](/blog/ecommerce-website-price-ghana) explains the rest of the difference.`,
      ),
      section(
        "What to ask whoever builds it",
        "Which gateway, and why. Whether webhooks are verified. What the customer sees when a payment is pending. What happens when the same order is paid twice. Whether refunds are handled through the site or by hand. Where settlement lands and how it is reconciled against orders.",
        `A builder with specific answers has done this before. [The price list](/pricing) states what our store tier includes on each of those, and [the ten questions to ask any web design company](/blog/how-to-choose-web-design-company-ghana) cover the rest.`,
      ),
    ],
    conclusion: "Accepting MTN MoMo and Telecel Cash on a website means one gateway integration, with published fees of roughly 2% per local transaction at the providers that publish them, merchant paperwork that should start on day one, a verified webhook, and correct handling of the pending state. The last item is where most stores lose money and it is the part worth paying for.",
    faqs: [
      faq("How do I add MTN MoMo to my website?", "Through a payment gateway such as Paystack, Flutterwave or Hubtel. The gateway provides MTN MoMo, Telecel Cash and cards through one integration. The site requests a payment, the customer approves on their phone, and the gateway confirms to the site by a verified webhook."),
      faq("What are Mobile Money transaction fees for websites in Ghana?", "Paystack publishes 1.95% per local transaction including Mobile Money. Flutterwave publishes 2% for Mobile Money and 2.6% for local cards. Hubtel does not publish a rate card. Fees change, so read the provider's own current page before launch."),
      faq("How long does Mobile Money settlement take?", "Flutterwave states next day for local payments. Paystack's country pricing page does not state settlement timing. Confirm with the provider, because settlement timing affects your cash flow more than the fee does."),
      faq("What documents do I need for a payment gateway in Ghana?", "It varies by gateway. Hubtel, for example, can ask for a business registration document, a business operating permit and a district assembly licence, and assigns an account manager within a working day. Start the process when the build starts."),
      faq("Why did my customer's MoMo payment show as failed when they paid?", "Almost always because the site treated the pending state as a failure. Mobile Money payments can sit in pending while the network confirms, and a correctly built store waits, checks with the gateway and completes the order only on confirmation."),
    ],
    sources: [
      { label: "Paystack: pricing by country", href: "https://support.paystack.com/en/articles/2130306" },
      { label: "Flutterwave: Ghana pricing", href: "https://flutterwave.com/gh/pricing" },
      { label: "OWASP API Security Top 10", href: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/" },
    ],
    serviceHref: "/build/systems-integrations",
  },

  /* ---------------------------------------------------------------------
     Post 14. Slow site. Strongest lead magnet: reader runs the free tool.
     Primary: website speed ghana, core web vitals ghana
     --------------------------------------------------------------------- */
  {
    slug: "why-your-ghana-business-website-is-slow",
    cluster: TECHNICAL_CLUSTER,
    title: "Why your Ghana business website is slow, and what it costs you",
    metaTitle: "Why your Ghana website is slow, and what it costs",
    description: "Most Ghanaian sites are slow for four reasons: shared hosting, template code, unsized images, no measurement. How to measure yours free.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "9 min read",
    lead: `Your website is probably slow for one of four reasons: shared hosting, template code the page does not need, oversized images with no reserved space, and nobody measuring. Every tier on our [price list](/pricing) is tuned against Google's thresholds before launch: largest paint under 2.5 seconds, interaction under 200 milliseconds, layout shift under 0.1. Most sites in Ghana miss at least one on a phone. You can measure yours in a minute with [a free tool we built](${CWV_STORE}).`,
    heroImage: {
      src: "/work/miyaki-beauty.webp",
      alt: "Miyaki Beauty Ghana, a site built to a Core Web Vitals budget",
      width: 1200,
      height: 750,
      caption: "Miyaki Beauty. Built to a performance budget, which is the difference between a site that is fast on launch day and one that stays fast. [See the case study](/work/miyaki-beauty).",
      href: "/work/miyaki-beauty",
    },
    sections: [
      section(
        "What slow costs",
        "A visitor on a mid range Android on a mobile connection, which is most of your visitors, waits about three seconds before deciding the page is broken. Every second after the first costs a share of them. That is the direct cost: people who would have called, and did not.",
        "The indirect cost is ranking. Google measures speed on real phones through Core Web Vitals and uses the result. A slow site is not merely unpleasant, it is harder to find, and the competitor whose site loads in a second is easier to find, for the same search, on the same phone.",
      ),
      section(
        "The three numbers Google measures",
        "Largest Contentful Paint, which is how long until the biggest thing on the screen has appeared. Good is under 2.5 seconds. Interaction to Next Paint, which is how long the page takes to respond when someone taps. Good is under 200 milliseconds. Cumulative Layout Shift, which is how much the page jumps around while loading. Good is under 0.1, and the target on every site we build is zero.",
        "These are measured on real visitors' devices, not in a lab, and they are reported in Google Search Console under Core Web Vitals. If you have never looked, that report is the first place to go.",
      ),
      {
        heading: "What we measured in Ghana",
        paragraphs: [
          `We ran our own audit engine against the homepages of ${agencies.length} Ghanaian web design agencies on ${AGENCIES.measured}, three fetches each, median time to first byte. The median was ${medianAgencyTtfb} milliseconds, the fastest was ${ttfbs[0]}, the slowest was ${slowestAgency.ttfbMs}. HTML weight before any images or scripts ranged from ${Math.min(...agencies.map((a) => a.htmlKb))}KB to ${heaviestAgency.htmlKb}KB. Those are the firms selling websites. Their clients' sites are, on average, slower.`,
          `For a wider comparison, the same tool across [${UK.sampled} UK accountancy websites](/research/uk-accountancy-websites) found a median first byte of ${UK.findings.medianResponseMs.toLocaleString("en-GB")} milliseconds and ${UK.findings.slowerThan3s} of ${UK.measurable} slower than three seconds to the first byte, before a single pixel could be painted.`,
        ],
        table: {
          caption: `Time to first byte and HTML weight, ${agencies.length} Ghanaian agency homepages, ${AGENCIES.measured}`,
          headers: ["Homepage", "TTFB (median of 3)", "HTML weight"],
          rows: [...agencies].sort((a, b) => a.ttfbMs - b.ttfbMs).map((a) => [`[${a.name}](https://${a.domain})`, `${a.ttfbMs} ms`, `${a.htmlKb} KB`]),
        },
      },
      section(
        "The four causes, in order of how often we find them",
        "Shared hosting. The server answers slowly because it is serving hundreds of other sites. Nothing on the page can start until the server has answered, so a slow first byte makes everything else late. This is the cause when the first byte alone is over a second.",
        "Template code. A template ships the code for every feature it supports, on every page, whether the page uses it or not. Sliders, animations, font libraries, tracking scripts. Each one is a download and a delay on a phone. This is the cause when the page weighs several megabytes.",
        "Unsized images. A photograph uploaded at four thousand pixels wide and displayed at four hundred is ten times the download it needs to be. An image with no width and height reserved makes the page jump when it arrives, which is the layout shift score. This is the most common cause and the cheapest to fix.",
        "No measurement. A site launched fast and got slow, one plugin and one upload at a time, and nobody was watching. This is the cause on almost every site that was fast once.",
      ),
      section(
        "How to measure yours, free, now",
        `Install [CWV Drift Monitor](${CWV_STORE}), a Chrome extension we built, open your site, and it reports the three numbers live, from the browser's own measurement, with no account and nothing sent anywhere. Then run the site through [our free audit](/free-audit), which measures the first byte, the HTML weight and eighteen other things from outside.`,
        "Between the two you will know which of the four causes you have before you speak to anyone. That is the point of both tools: the diagnosis is free and the reader owns it.",
      ),
      section(
        "What to fix first",
        "If the first byte is over a second, the hosting. Nothing else matters until the server answers. If the page weighs megabytes, the template and the plugins. If the layout jumps, image sizes. And whichever it is, set up the Search Console report and look at it monthly, because speed is something you keep rather than something you buy once.",
        `A rebuild on our [Business tier at ${range(business)}](/pricing#business) is speed tuned against all three thresholds before launch and tested from 320 pixels. A care plan from ${ghs(essential.monthly)} a month keeps it that way. [What a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) puts that in context, and [why cheap sites are slow](/blog/cheap-website-design-ghana) explains how they got that way.`,
      ),
    ],
    conclusion: `Most slow websites in Ghana have one of four causes: shared hosting, template code, unsized images, or nobody measuring. Google's thresholds are 2.5 seconds, 200 milliseconds and 0.1, measured on real phones. The median agency homepage we measured answered in ${medianAgencyTtfb} milliseconds and the slowest in ${slowestAgency.ttfbMs}. Measure yours free with CWV Drift Monitor and the free audit, fix the hosting first if the first byte is slow, and keep watching.`,
    faqs: [
      faq("Why is my website so slow in Ghana?", "Usually shared hosting that answers slowly, template code the page does not need, images that are far larger than displayed, or a site that was fast once and got slower with nobody watching. Measure the first byte and the page weight and the cause is usually obvious."),
      faq("What is a good Core Web Vitals score?", "Largest Contentful Paint under 2.5 seconds, Interaction to Next Paint under 200 milliseconds, and Cumulative Layout Shift under 0.1, all measured on real visitors' devices. The report is in Google Search Console under Core Web Vitals."),
      faq("How can I test my website speed for free?", "CWV Drift Monitor, a free Chrome extension, reports the three Core Web Vitals live on any page you open. Our free audit measures time to first byte, HTML weight and eighteen other checks from outside. Google's PageSpeed Insights runs a lab test. All three are free and need no account."),
      faq("Does website speed affect Google ranking?", "Yes. Core Web Vitals are measured on real phones and used in ranking. A slow site is harder to find as well as more likely to be abandoned, and the competitor whose page loads in a second wins the same search on the same phone."),
      faq("How much does it cost to make a website faster?", `It depends on the cause. Resizing images is cheap. Moving off shared hosting is a care plan from ${ghs(essential.monthly)} a month. Removing template bloat usually means a rebuild, which is ${range(starter)} to ${range(business)} depending on the site.`),
    ],
    sources: [
      { label: "web.dev: Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "web.dev: avoiding layout shifts", href: "https://web.dev/articles/optimize-cls" },
      { label: "Google: PageSpeed Insights", href: "https://pagespeed.web.dev/" },
      { label: "CWV Drift Monitor on the Chrome Web Store", href: CWV_STORE },
    ],
    serviceHref: "/grow/technical-seo",
  },

  /* ---------------------------------------------------------------------
     Post 15. WhatsApp and Instagram. Honest: sometimes no.
     Primary: do i need a website for my business ghana
     --------------------------------------------------------------------- */
  {
    slug: "do-you-need-a-website-if-you-sell-on-whatsapp",
    cluster: TECHNICAL_CLUSTER,
    title: "Do you still need a website if you sell on WhatsApp and Instagram?",
    metaTitle: "Do you need a website if you sell on WhatsApp?",
    description: "Sometimes no, and here is when. Then the case for owning a channel rather than renting one: search, trust, payments, and the day the rules change.",
    published: "2026-09-11",
    modified: "2026-09-11",
    readTime: "7 min read",
    lead: `Sometimes no. If your customers come by referral, orders fit in a WhatsApp chat and strangers are not searching for you, a website is a cost with no return. For everyone else, yes, and a [Starter site at ${range(starter)}](/pricing#starter) is the smallest version worth having. The reason is not that websites beat Instagram. It is that you rent Instagram and you own a website, and this post is about when that difference is worth paying for.`,
    heroImage: {
      src: "/work/miyaki-beauty.webp",
      alt: "Miyaki Beauty Ghana, a beauty brand with an Instagram audience and a website of its own",
      width: 1200,
      height: 750,
      caption: "Miyaki Beauty. A beauty brand that sells on Instagram and owns a site of its own, because the two do different jobs. [See the case study](/work/miyaki-beauty).",
      href: "/work/miyaki-beauty",
    },
    sections: [
      section(
        "When you genuinely do not need one",
        "When every customer comes by referral or by walking past. When an order is a message, a price and a MoMo transfer, and there are few enough that one person handles them. When nobody is searching for what you do, or they are searching and you are already full.",
        "That describes a lot of good businesses. A website would cost them money and give them a page nobody visits. The honest advice is to keep the WhatsApp number on the shop sign and spend the money on stock.",
      ),
      section(
        "When you do, and why",
        "When strangers search for what you sell. A search on Google for a product or a service in your town does not show Instagram accounts and cannot see inside WhatsApp. It shows websites. If you are not there, the customer who searched finds someone who is. That is the whole case, and it is a large one, because searchers are people who already want the thing.",
        "When trust decides the sale. A stranger deciding whether to send money to a business they found on Instagram looks for the website. Not because websites are trustworthy, but because a business that bothered to have one has usually been around longer and is easier to find again if something goes wrong.",
        "When you take money online. A store that takes MoMo and cards at checkout, with stock and delivery zones, is a website. A WhatsApp chat is a person taking orders by hand, which stops scaling the day that person is busy.",
      ),
      section(
        "Renting against owning",
        "Instagram and WhatsApp are excellent and you should use both. They are also somebody else's property. The algorithm decides who sees your posts, and it changes. An account can be restricted or lost, and there is nobody to call. The customer list lives on the platform, not with you. The rules on business messaging change, and you find out when a message stops sending.",
        "A website is the opposite. Your domain, your pages, your customer emails, your search rankings. Nobody can change the rules on it, and it compounds: a page that ranks this year ranks next year, and every post on Instagram is gone from the feed in a day.",
        "The businesses that do best use both. The platform for reach and conversation, the site for being found by strangers, being trusted, and taking money. The site does not replace the WhatsApp number. It is where the WhatsApp number lives when a stranger is looking for it.",
      ),
      section(
        "The smallest version worth having",
        `One page. Who you are, what you do, where you are, a WhatsApp button and a map. Built properly, fast on a phone, findable for your name and your town. That is our [Starter tier at ${range(starter)}](/pricing) and it is the least you can own that still does the job. Grow it when the searches you want to be found for outgrow one page, and not before. [How much a one page website costs](/blog/one-page-website-cost-ghana) covers exactly that.`,
        `If the answer to every question in the first section was yes, do not buy it. If any answer in the second section was yes, read [what a website costs in Ghana](/blog/how-much-does-a-website-cost-in-ghana) and decide with the numbers in front of you.`,
      ),
    ],
    conclusion: `You do not need a website if your customers come by referral and your orders fit in a chat. You do need one the moment strangers search for what you sell, trust decides the sale, or you take money online, because you rent Instagram and WhatsApp and you own a website. The smallest version worth having is a one page site at ${range(starter)}, and the two channels do different jobs.`,
    faqs: [
      faq("Do I need a website if I have Instagram?", "Not if your customers come by referral and you are not trying to be found by strangers. Yes if people search Google for what you sell, because search does not show Instagram accounts, and yes if trust or online payment decides the sale."),
      faq("Can I run a business in Ghana on WhatsApp only?", "Many do, and well. The limits are that nobody can find you by searching, one person has to handle every order by hand, and the platform can change its rules or restrict the account with nobody to call. A website removes all three."),
      faq("What is the cheapest website for a small business in Ghana?", `A one page site with a WhatsApp button, your location and what you do. Built properly it is ${range(starter)} on our Starter tier. As a template from the bottom of the market it is a few hundred cedis, with the trade offs that price implies.`),
      faq("Should I have a website and Instagram?", "Yes, and most successful small businesses do. Instagram for reach and conversation, the website for being found by strangers, being trusted and taking payments. The site is where the WhatsApp number lives when someone who has never heard of you is looking."),
    ],
    sources: [
      { label: "Google: helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "Manuel Technologies: published price list", href: "https://manueltechnologies.com/pricing" },
    ],
    serviceHref: "/build/website-development",
  },
];
