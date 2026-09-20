/* Legal copy for /privacy-policy and /terms-of-service, kept as data so the
   two pages share one template and the dates are one edit.

   Written on 20 September 2026 to replace two pages of under 130 words.
   Everything here describes what the site actually does: the contact form
   through Resend, the newsletter as Resend contacts, Vercel Analytics
   without cookies, the free audit fetching a URL the visitor typed and
   storing nothing, and the payment and handover terms published on
   /pricing. When one of those changes, this file changes with it.

   Plain English, no dashes, British spelling. Not a substitute for a
   lawyer's review before a large engagement, and it does not claim to be. */

export const LEGAL_UPDATED = "2026-09-20";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export const PRIVACY: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Manuel Technologies is a software and digital services business based in Accra, Ghana, reachable at info@manueltechnologies.com. This policy explains what information the website collects, why, and what happens to it. It applies to manueltechnologies.com and the free tools on it. Client projects are covered by their own agreements.",
    ],
  },
  {
    heading: "What we collect, and why",
    paragraphs: ["We collect only what a feature needs to work."],
    bullets: [
      "Contact form: your name, work email, company website, budget range, the service you are asking about, and your message. Used to reply to you and assess the enquiry. Delivered to our inbox by Resend, our email provider, and kept for as long as the conversation and any resulting work are live.",
      "Newsletter: your email address, stored as a contact with Resend and used only to send the updates you asked for. Every email carries an unsubscribe link, and unsubscribing removes you from the list.",
      "Free audit and crawler check: the website address you type. Our server fetches that page, its robots.txt and its sitemap to produce the report. The address and the report are not stored, and no account is created.",
      "Analytics: page views and referrers through Vercel Web Analytics, which does not use cookies or track you across sites and does not identify you personally.",
      "Server logs: the hosting provider records requests, including IP address and browser type, for security and to keep the site running. These are kept briefly and not used to profile visitors.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "The website does not set tracking cookies and does not run advertising pixels. That is why there is no cookie banner. If that changes, this page and the site will be updated before it does.",
    ],
  },
  {
    heading: "Who else sees your information",
    paragraphs: [
      "We do not sell personal information and we do not share it for marketing. The providers that process it on our behalf are Vercel, which hosts the site and serves it from its network, and Resend, which delivers email and holds the newsletter list. Each processes information only to provide its service to us. We may disclose information if the law requires it.",
    ],
  },
  {
    heading: "Where it is processed",
    paragraphs: [
      "Our providers operate servers outside Ghana, including in the United States and the European Union. By using the site you accept that information may be processed there under those providers' safeguards.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask what we hold about you, ask for it to be corrected or deleted, and withdraw consent to the newsletter at any time. Email info@manueltechnologies.com and we will respond within 30 days. If you are in the United Kingdom or the European Union you have the rights set out in the UK GDPR and the GDPR, and in Ghana the rights set out in the Data Protection Act, 2012 (Act 843).",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "The site is served over HTTPS only, secrets are kept on the server and never in the browser, and form submissions are rate limited and checked for automated abuse. No system is perfect, and if we learn of a breach affecting your information we will tell you.",
    ],
  },
  {
    heading: "Children",
    paragraphs: ["The site is for businesses and is not directed at children under 16. We do not knowingly collect their information."],
  },
  {
    heading: "Changes",
    paragraphs: [`This policy was last updated on ${LEGAL_UPDATED}. Material changes will be dated here. Continued use of the site after a change means you accept it.`],
  },
];

export const TERMS: LegalSection[] = [
  {
    heading: "What these terms cover",
    paragraphs: [
      "These terms govern your use of manueltechnologies.com, its free tools, and the newsletter. They also set out the commercial terms that apply when you engage Manuel Technologies for work, unless a signed proposal or contract says otherwise, in which case that document takes priority.",
    ],
  },
  {
    heading: "Using the website and free tools",
    paragraphs: [
      "The tools and articles are provided free, as general information and planning aids. They are not legal, financial, tax or professional advice, and a tool's output is a measurement or an estimate, not a guarantee. Check important decisions with a suitably qualified adviser.",
      "You may run the free audit and crawler check against websites you own or have permission to test. Do not use them to probe sites you have no right to, and do not attempt to overload them, bypass their limits, or access any part of the site you are not meant to. We may block access from any connection that abuses the tools.",
      "Content on this site, including copy, research, code samples and design, belongs to Manuel Technologies unless stated. You may quote it with attribution and a link. You may not republish it as your own.",
    ],
  },
  {
    heading: "Engaging us for work",
    paragraphs: [
      "Every engagement starts with a written scope: what will be built, what it includes, the timeline, and the price. Work begins when the scope is agreed and the first payment has cleared. Anything outside the scope is quoted separately before it is started.",
    ],
    bullets: [
      "Prices are in Ghana cedis unless agreed otherwise. Published prices on the pricing page are for the tiers as described there, and a quote is valid for 30 days.",
      "Payment is 60% to start, or the full amount if you prefer, and the remaining 40% when the finished work is approved. Custom builds are split into milestones agreed at scoping, each paid before the next begins.",
      "The finished site runs on our staging address until the final balance clears, then goes live on your domain with every login handed over the same day. If the balance is not settled within 7 days of approval and no reason has been agreed, the site stays on staging and the launch date moves.",
      "Revision rounds are as stated for the tier. Additional rounds, and changes to the agreed scope after design is approved, are quoted as extra work.",
      "Timelines depend on you as much as us. The most common cause of delay is content arriving late, so copy, images and access are agreed before design starts, and the timeline pauses while we wait for them.",
    ],
  },
  {
    heading: "Ownership and handover",
    paragraphs: [
      "When the final payment clears, you own the website, its content, its code, the domain and the hosting account, and every login is handed over with documentation. We keep the right to show the work in our portfolio and to describe it in case studies, without disclosing confidential information, unless you ask us not to in writing before launch.",
      "Third party components, such as fonts, libraries, themes and payment gateways, remain under their own licences. Gateway charges are set by the provider, not by us.",
    ],
  },
  {
    heading: "Care plans",
    paragraphs: [
      "Care plans are billed monthly in advance and can be cancelled with 30 days notice. On cancellation, hosting continues to the end of the paid period, after which you are responsible for hosting the site elsewhere. The site and its code stay yours.",
    ],
  },
  {
    heading: "What we are not responsible for",
    paragraphs: [
      "We build to the agreed scope with reasonable skill and care. We do not guarantee search rankings, AI answer engine citations, traffic, sales or any particular business result, because those depend on factors outside the work. We are not responsible for losses caused by third party services, by changes you or others make to the work after handover, or by content you supply.",
      "To the extent the law allows, our total liability for any engagement is limited to the amount you paid for that engagement, and we are not liable for indirect or consequential loss. Nothing here limits liability for fraud or for anything that cannot be limited by law.",
    ],
  },
  {
    heading: "Confidentiality",
    paragraphs: ["Information you share with us about your business is treated as confidential and used only for the work. We ask the same of you regarding pricing, proposals and unreleased work we show you."],
  },
  {
    heading: "Ending an engagement",
    paragraphs: ["Either side can end an engagement in writing. You pay for work completed to that point at the agreed rates, and we hand over what has been built and paid for. Deposits cover work already done and are not refunded once work has started."],
  },
  {
    heading: "Governing law",
    paragraphs: ["These terms are governed by the laws of Ghana, and disputes are subject to the courts of Ghana, unless a signed agreement for a specific engagement says otherwise. If any part of these terms is found unenforceable, the rest still applies."],
  },
  {
    heading: "Changes and contact",
    paragraphs: [`These terms were last updated on ${LEGAL_UPDATED}. Questions go to info@manueltechnologies.com or the contact page.`],
  },
];
