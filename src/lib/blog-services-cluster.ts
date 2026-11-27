import type { BlogPost } from "@/lib/blog-posts";
import type { BlogFaq, BlogSection } from "@/lib/blog-types";

/* --------------------------------------------------------------------------
   Service comparison posts. Started 25 November 2026 as the daily programme
   in docs/content-programme.md: two services a day, each with one post in a
   comparison, "best of" or decision format, so every service page has
   articles feeding it and AI answers have a page to cite for the question.

   RULES FOR THIS FILE
   1. Every fact about a tool or platform is checkable on the vendor's own
      page, which is listed in sources. No rates, prices or audience sizes
      that will go stale: state the mechanism and link the current page.
   2. Our own work is named only where it is true and on /work or a product
      we run. Fold is a PWA; that is the evidence the mobile post uses.
   3. Hero photos may come from Unsplash, credited in the caption and
      linked to the photo's page. A stock photo is never captioned or
      described as our work; the evidence stays in the body.
   4. Comparisons name a winner per situation, never an overall winner. A
      buyer who reads "it depends" and nothing else learns nothing.
   -------------------------------------------------------------------------- */

const faq = (question: string, answer: string): BlogFaq => ({ question, answer });
const section = (heading: string, ...paragraphs: string[]): BlogSection => ({ heading, paragraphs });

export const ADS_CLUSTER = "Ads and social";
const WEB_CLUSTER = "Web and software";

const SOURCES = {
  flutter: { label: "Flutter documentation", href: "https://docs.flutter.dev" },
  reactNative: { label: "React Native documentation", href: "https://reactnative.dev/docs/getting-started" },
  pwa: { label: "web.dev: Progressive Web Apps", href: "https://web.dev/explore/progressive-web-apps" },
  iosPush: { label: "WebKit: Web Push for web apps on iOS and iPadOS", href: "https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/" },
  appleProgram: { label: "Apple Developer Program", href: "https://developer.apple.com/programs/" },
  googlePlay: { label: "Google Play Console: get started", href: "https://support.google.com/googleplay/android-developer/answer/6112435" },
  googleAds: { label: "Google Ads Help: about Search ads", href: "https://support.google.com/google-ads/answer/1722047" },
  googleConversions: { label: "Google Ads Help: about conversion tracking", href: "https://support.google.com/google-ads/answer/1722022" },
  metaPixel: { label: "Meta: Meta Pixel", href: "https://www.facebook.com/business/tools/meta-pixel" },
  metaCapi: { label: "Meta for Developers: Conversions API", href: "https://developers.facebook.com/docs/marketing-api/conversions-api" },
  metaLearning: { label: "Meta Business Help: about the learning phase", href: "https://www.facebook.com/business/help/112167992830700" },
  ctwa: { label: "Meta: ads that click to WhatsApp", href: "https://www.facebook.com/business/ads/ad-objectives/click-to-whatsapp" },
  wordpress: { label: "WordPress.org: about WordPress", href: "https://wordpress.org/about/" },
  woocommerce: { label: "WooCommerce", href: "https://woocommerce.com" },
  paystackWoo: { label: "WordPress.org: Paystack WooCommerce Payment Gateway", href: "https://wordpress.org/plugins/woo-paystack/" },
  webflowPricing: { label: "Webflow: pricing", href: "https://webflow.com/pricing" },
  webflowEcommerce: { label: "Webflow: Ecommerce", href: "https://webflow.com/ecommerce" },
  stripeGlobal: { label: "Stripe: supported countries", href: "https://stripe.com/global" },
  nextjs: { label: "Next.js documentation", href: "https://nextjs.org/docs" },
  instagramBusiness: { label: "Instagram for Business", href: "https://business.instagram.com" },
  metaSuite: { label: "Meta Business Suite", href: "https://www.facebook.com/business/tools/meta-business-suite" },
  tiktokBusiness: { label: "TikTok for Business", href: "https://www.tiktok.com/business/en" },
  tiktokForYou: { label: "TikTok: how TikTok recommends videos #ForYou", href: "https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you" },
  linkedinPages: { label: "LinkedIn Pages", href: "https://business.linkedin.com/marketing-solutions/linkedin-pages" },
  whatsappBusiness: { label: "WhatsApp Business", href: "https://business.whatsapp.com" },
  terms: { label: "Manuel Technologies: terms of service", href: "https://manueltechnologies.com/terms-of-service" },
  rankingSystems: { label: "Google Search Central: guide to ranking systems", href: "https://developers.google.com/search/docs/appearance/ranking-systems-guide" },
  mpos: { label: "MPOS", href: "https://mpos.bz" },
  spamPolicies: { label: "Google Search Central: spam policies", href: "https://developers.google.com/search/docs/essentials/spam-policies" },
  qualifyLinks: { label: "Google Search Central: qualify your outbound links", href: "https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links" },
  howSearchWorks: { label: "Google Search Central: how Search works", href: "https://developers.google.com/search/docs/fundamentals/how-search-works" },
  businessProfile: { label: "Google Business Profile Help: add or claim your profile", href: "https://support.google.com/business/answer/7091" },
};

export const SERVICES_CLUSTER_POSTS: BlogPost[] = [
  /* ---------------------------------------------------------------------
     Mobile applications. Day 1, 25 November 2026.
     --------------------------------------------------------------------- */
  {
    slug: "flutter-vs-react-native-vs-pwa",
    cluster: WEB_CLUSTER,
    title: "Flutter vs React Native vs a PWA: which should your business app be?",
    metaTitle: "Flutter vs React Native vs PWA for a business app",
    description: "When a business app should be a progressive web app, when it needs Flutter or React Native, and what each costs to ship and keep running. With a worked example.",
    published: "2026-11-25",
    modified: "2026-11-25",
    readTime: "8 min read",
    lead: "Build a progressive web app (PWA) when your users will arrive from a link, the app is mostly forms, lists and payments, and you want one thing to maintain. Choose Flutter or React Native when the app must be in the App Store and Google Play, or needs deep device access such as Bluetooth printers or background location. Between those two, pick the one your team can hire for and support, because both ship good apps.",
    sections: [
      {
        ...section(
          "The three options in one paragraph each",
          "Flutter is Google's open source toolkit. You write the app once in a language called Dart, and Flutter draws every button and screen itself, so the app looks the same on iPhone and Android. It produces real app store apps, and can also target the web and desktop.",
          "React Native is the open source framework created by Meta. You write the app in JavaScript or TypeScript, the same language as most websites, and it uses each phone's own native controls. It also produces real app store apps, and a web team can usually pick it up quickly.",
          "A progressive web app is a website built to behave like an app. It can be installed to the home screen, open full screen, work offline through a service worker, and send notifications. It needs no app store: you share a link, and the user taps install.",
        ),
      },
      {
        ...section(
          "How they compare on the things that decide it",
          "This is the comparison we walk clients through. No column wins every row, which is why the decision starts from what the app has to do.",
        ),
        table: {
          caption: "Flutter, React Native and a PWA compared for a business app",
          headers: ["Question", "Flutter", "React Native", "PWA"],
          rows: [
            ["In the App Store and Google Play", "Yes", "Yes", "No, installed from a link"],
            ["One codebase for iPhone and Android", "Yes", "Yes", "Yes, and the same code is the website"],
            ["Language", "Dart", "JavaScript or TypeScript", "JavaScript or TypeScript"],
            ["Works offline", "Yes", "Yes", "Yes, through a service worker"],
            ["Push notifications on iPhone", "Yes", "Yes", "Yes, once installed to the home screen (iOS 16.4 and later)"],
            ["Bluetooth printers, NFC, background location", "Full access", "Full access", "Limited, and weakest on iPhone"],
            ["Store fees", "Apple USD 99 a year, Google USD 25 once", "Apple USD 99 a year, Google USD 25 once", "None"],
            ["Store review before each update", "Yes", "Yes", "No, updates are live on deploy"],
            ["Download before first use", "Full app download", "Full app download", "Opens from the link, installs in seconds"],
          ],
        },
      },
      {
        ...section(
          "When a PWA is the right answer",
          "For most business apps we are asked to build in Ghana, a PWA is the better first version. The users arrive from a WhatsApp message, an SMS or a QR code, not from browsing an app store. Asking them to download a large app on mobile data before they can do anything loses a share of them at the first step.",
          "A PWA removes that step. The link opens the app, it works on a cheap Android phone and an iPhone alike, and every update reaches everyone the moment it is deployed, with no store review and no users stuck on an old version.",
        ),
        bullets: [
          "Members, customers or staff will be sent a link rather than search a store.",
          "The app is mostly sign in, forms, lists, bookings, records and payments.",
          "Mobile Money or card payments run through a gateway's web checkout.",
          "You want one codebase that is also your website, maintained by one team.",
        ],
      },
      {
        ...section(
          "Worked example: Fold",
          "Fold, our church management product at getfold.org, is a PWA, and the reasoning above is why. A congregation's members are invited by a link from their church administrator. They need to see their giving history, attendance and class, and to give by Mobile Money. None of that needs an app store, and every one of those members would otherwise have had to find and download an app first.",
          "As a PWA, a member taps the link, signs in, and can add Fold to the home screen. When we ship a fix, every church has it the same day. The trade off we accepted: Fold is not listed in the App Store, so a church cannot be discovered there. For a product sold to administrators who then invite members, that costs almost nothing.",
        ),
        image: {
          src: "/work/getfold.webp",
          alt: "Fold, a church management PWA for Ghanaian congregations, built by Manuel Technologies",
          width: 1200,
          height: 750,
          caption: "Fold, a church management PWA at getfold.org, built and run by Manuel Technologies. [Open the live product](https://www.getfold.org).",
        },
      },
      {
        ...section(
          "When you need Flutter or React Native",
          "Go native through one of the two frameworks when the store listing or the device itself is the point.",
        ),
        bullets: [
          "Customers will look for you in the App Store or Google Play, or a client requires a store listing.",
          "The app drives hardware: Bluetooth receipt printers, card readers, NFC, or scanners beyond the camera.",
          "It must track location in the background, as a delivery or field staff app does.",
          "It needs heavy offline work on large data sets, or graphics a browser handles badly.",
        ],
      },
      section(
        "Flutter or React Native, if you go native",
        "Both are mature and both ship good apps, so the deciding question is who will maintain it. React Native uses JavaScript and TypeScript, so a team that already builds websites in React can share skills and some code with the app. Flutter uses Dart, which fewer developers know, but it gives very consistent screens across devices because it draws everything itself.",
        "Our default: if the business already has a React website or web app, React Native. If the app stands alone and pixel identical screens on every phone matter most, Flutter. Either way, ask the developer who will be able to update it in two years, because an app nobody can maintain is the most expensive kind.",
      ),
      section(
        "A PWA first does not lock you in",
        "A common path is to launch as a PWA, learn what users actually do, and build a store app later only if the evidence calls for it. The server, database and payment integration behind a PWA are the same ones a native app would use, so that work carries over. What gets rebuilt is the screens.",
        "If you are unsure, start there. Tell us what the app has to do on our [mobile apps page](/build/mobile-apps), and we will say plainly which of the three it should be.",
      ),
    ],
    conclusion: "Choose by what the app must do, not by which technology sounds most serious. A PWA suits apps people reach by link and use for forms, records and payments. Flutter or React Native suits apps that must sit in the stores or drive hardware. Between those two, choose the one your team can maintain.",
    faqs: [
      faq("Is a PWA a real app?", "Yes, in the ways users notice. It installs to the home screen, opens full screen without a browser bar, works offline and can send notifications. What it does not have is a listing in the App Store or Google Play, and it has more limited access to device hardware, particularly on iPhone."),
      faq("Can a PWA send push notifications on iPhone?", "Yes, since iOS 16.4, once the user has added the web app to their home screen. Notifications do not work for a page that is only open in Safari, so the app should prompt users to install it."),
      faq("Is Flutter better than React Native?", "Neither is better overall. Flutter draws its own interface and gives very consistent screens across devices. React Native uses JavaScript and the phone's native controls, and fits teams that already build in React. Choose the one your developers can maintain."),
      faq("How much does it cost to publish an app in the stores?", "Apple charges USD 99 a year for its Developer Program and Google charges a one time USD 25 registration fee for Google Play, at the time of writing. A PWA has no store fee. Check the current rates on Apple's and Google's own pages, linked below."),
      faq("Can a PWA take Mobile Money payments?", "Yes. Mobile Money and card payments run through a payment gateway's checkout, which works in a PWA the same way it works on a website. A native app uses the same gateway."),
    ],
    sources: [SOURCES.flutter, SOURCES.reactNative, SOURCES.pwa, SOURCES.iosPush, SOURCES.appleProgram, SOURCES.googlePlay],
    serviceHref: "/build/mobile-apps",
    heroImage: {
      src: "/blog/flutter-vs-react-native-vs-pwa.webp",
      alt: "A young man smiling as he uses an app on his smartphone",
      width: 1200,
      height: 750,
      caption: "Photo by Francisco Venâncio on [Unsplash](https://unsplash.com/photos/G_ov3T7WCZg). Our own PWA, Fold, is shown further down.",
      href: "https://unsplash.com/photos/G_ov3T7WCZg",
    },
  },

  /* ---------------------------------------------------------------------
     Paid ads. Day 1, 25 November 2026.
     --------------------------------------------------------------------- */
  {
    slug: "google-ads-vs-meta-ads-ghana",
    cluster: ADS_CLUSTER,
    title: "Google Ads vs Meta ads: which should a Ghanaian business run first?",
    metaTitle: "Google Ads vs Meta ads for a Ghanaian business",
    description: "Google Ads reaches people already searching; Meta ads on Facebook, Instagram and WhatsApp reach people who are not. How to choose, and the tracking to set up first.",
    published: "2026-11-25",
    modified: "2026-11-25",
    readTime: "7 min read",
    lead: "Run Google Ads first if people already search for what you sell, such as a plumber, a lawyer or a car rental in a named town. Run Meta ads first if they do not search for it yet, or if it sells on looks, such as food, fashion, beauty and events. Whichever you choose, set up conversion tracking before spending anything, or you will be paying for clicks with no way to tell which ones became customers.",
    sections: [
      {
        ...section(
          "The difference in one sentence each",
          "Google Ads on Search shows your advert to someone at the moment they type a query, so it captures demand that already exists. You usually pay when they click.",
          "Meta ads show your advert on Facebook, Instagram, Messenger and WhatsApp to people chosen by location, age, interests and behaviour, whether or not they are looking. They create demand, which is why the advert itself has to stop someone scrolling.",
        ),
      },
      {
        ...section(
          "Which to start with, by business type",
          "These are starting points, not rules. The test is the same each time: does your customer already search for you, or do they need to see you first?",
        ),
        table: {
          caption: "Where to start, by what the business sells",
          headers: ["Business", "Start with", "Why"],
          rows: [
            ["Plumber, electrician, mechanic, cleaner", "Google Ads", "Urgent need, searched with a place name"],
            ["Law firm, accountant, clinic", "Google Ads", "People search the service and compare"],
            ["Car rental, freight, airport transfer", "Google Ads", "Searched close to the decision"],
            ["Restaurant, bakery, catering", "Meta ads", "Sells on photos, decided on impulse"],
            ["Fashion, beauty, salon", "Meta ads", "Visual, and Instagram is where it is browsed"],
            ["Events, launches, a new product", "Meta ads", "Nobody can search for what they have not heard of"],
            ["Schools, real estate", "Both", "Search for intent, Meta for reach and reminders"],
          ],
        },
      },
      section(
        "Why WhatsApp changes the Meta side in Ghana",
        "Most Ghanaian customers would rather send a WhatsApp message than fill in a form. Meta offers adverts whose button opens a WhatsApp chat with the business directly, so the person who taps lands in a conversation, not on a page they might leave.",
        "That suits businesses that close sales in conversation. The cost is that someone has to answer quickly. A chat that waits a day for a reply is a lead lost, however cheap the click was. If replies are the bottleneck, fix that first, and look at [WhatsApp automation](/blog/whatsapp-business-automation-ghana) for the routine questions.",
      ),
      section(
        "Set up tracking before the first cedi",
        "Both platforms optimise toward whatever you tell them counts as success. If you only track clicks, the system finds people who click. If you track enquiries, it finds people who enquire. That is the single largest difference between adverts that pay and adverts that do not.",
        "For Google Ads, that means conversion tracking: a tag, or key events imported from Google Analytics, that fires when a form is sent or a call button is tapped. For Meta, it means the Meta Pixel on the website, ideally with the Conversions API sending the same events from the server, so fewer are lost to browsers that block scripts.",
        "Meta also needs volume to learn. Its own guidance is that an ad set leaves its learning phase after about 50 optimisation events in a week. A small budget aimed at a rare event, such as a signed contract, may never get there. Aim it at an earlier step, such as an enquiry or a WhatsApp chat started, and judge the result on what those enquiries become.",
      ),
      {
        ...section(
          "How we track our own adverts",
          "This is the setup on manueltechnologies.com, which is what we install for clients. The website sends each platform a named event at each step that matters, and nothing else.",
        ),
        bullets: [
          "A contact form sent is recorded as a Lead, in Meta and in Google Analytics.",
          "A newsletter sign up is recorded as CompleteRegistration.",
          "A tap on the call button or WhatsApp button is recorded as Contact.",
          "Visitors in the United Kingdom and Europe do not load the Meta Pixel at all, because the site asks for no cookie consent. That is a choice about privacy law, and it is stated in our privacy policy.",
        ],
      },
      {
        ...section(
          "Judge it after four weeks, not four days",
          "The first days of any campaign are noisy. Give a campaign a fixed budget and about four weeks, then judge it on cost per enquiry and on how many of those enquiries became customers, not on clicks or likes.",
        ),
        bullets: [
          "Cost per enquiry: total spend divided by tracked enquiries.",
          "Enquiry to customer rate: from your own records, not from the ad platform.",
          "Cost per customer: the number that decides whether to continue.",
          "Which adverts and search terms produced the customers, so the budget moves toward them.",
        ],
      },
      section(
        "Getting help",
        "We set up and run Google and Meta campaigns with the tracking above in place from day one, and report on enquiries and customers rather than reach. See our [paid ads service](/grow/paid-ads), or tell us what you sell and we will say which platform we would start on.",
      ),
    ],
    conclusion: "Google Ads catches people already looking; Meta ads put you in front of people who are not. Start where your customer already is, track enquiries rather than clicks from the first day, and judge the result on cost per customer after a month.",
    faqs: [
      faq("Is Google Ads or Facebook ads cheaper in Ghana?", "Neither is reliably cheaper, because both are auctions and the price depends on the industry, the location and the competition. The useful comparison is cost per customer, which you only get by tracking enquiries and recording which ones became sales."),
      faq("Can I run Facebook ads that open WhatsApp?", "Yes. Meta offers adverts on Facebook and Instagram whose button opens a WhatsApp chat with your business. They suit businesses that close sales in conversation, as long as someone replies quickly."),
      faq("Do I need a website to run Google Ads?", "For Search adverts, in practice yes: the advert sends people to a page, and the page is where the enquiry happens and where conversions are tracked. A slow or unclear page wastes the click you paid for."),
      faq("What is the Meta Pixel?", "A short piece of code from Meta placed on a website. It tells Meta when a visitor from an advert does something you care about, such as sending an enquiry, so Meta can measure the advert and show it to more people likely to do the same."),
      faq("How long before ads show results?", "Expect a noisy first week while the platforms learn. Judge a campaign after about four weeks on a fixed budget, using cost per enquiry and cost per customer."),
    ],
    sources: [SOURCES.googleAds, SOURCES.googleConversions, SOURCES.metaPixel, SOURCES.metaCapi, SOURCES.metaLearning, SOURCES.ctwa],
    serviceHref: "/grow/paid-ads",
    heroImage: {
      src: "/blog/google-ads-vs-meta-ads-ghana.webp",
      alt: "A shopkeeper behind the counter of her provision shop, her phone on the counter",
      width: 1200,
      height: 750,
      caption: "Photo by Ali Mkumbwa on [Unsplash](https://unsplash.com/photos/EOkN2pRjFsg).",
      href: "https://unsplash.com/photos/EOkN2pRjFsg",
    },
  },

  /* ---------------------------------------------------------------------
     Website development. Day 2, 26 November 2026. Sits beside the older
     wordpress-vs-custom-website-ghana post and links to it: that one is
     about maintenance, this one adds Webflow and the checkout question.
     --------------------------------------------------------------------- */
  {
    slug: "wordpress-vs-webflow-vs-custom-website",
    cluster: WEB_CLUSTER,
    title: "WordPress vs Webflow vs a custom build: which should your website be?",
    metaTitle: "WordPress vs Webflow vs a custom website build",
    description: "When a business website should be WordPress, when Webflow, and when a custom build. Compared on editing, payments in Ghana, speed, upkeep and ownership.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readTime: "8 min read",
    lead: "Choose WordPress if you publish often, want a large choice of plugins, and will pay someone to keep them updated. Choose Webflow if the site is a design led marketing site, your team wants to edit it visually, and you do not need to take Mobile Money on it. Choose a custom build when the site has to do something: take payments, calculate, book, connect to other systems, or run to hundreds of pages while staying fast on a phone.",
    sections: [
      {
        ...section(
          "The three options in one paragraph each",
          "WordPress is free, open source software that runs a large share of the world's websites. You host it yourself, choose a theme, and add features with plugins. WooCommerce, a free plugin, turns it into an online store. The software costs nothing. Hosting, premium themes and plugins, and the work to keep them all updated do.",
          "Webflow is a hosted website builder for designers. You lay out pages visually, with far more control than a template builder, and Webflow hosts the result. Its CMS handles blogs and other collections, and editors can change text on the live page. It is a subscription, billed per site, and the site lives on Webflow's platform.",
          "A custom build is a website written in code for your business, by a developer or an agency. We build on Next.js, the framework this site runs on. There is no plugin stack to patch, the pages are generated ahead of time so they load fast, and the site can do anything the business needs, because nothing is limited to what a plugin or a builder offers.",
        ),
      },
      {
        ...section(
          "How they compare on the things that decide it",
          "No column wins every row. The decision starts from what the website has to do, then who will look after it.",
        ),
        table: {
          caption: "WordPress, Webflow and a custom build compared for a business website",
          headers: ["Question", "WordPress", "Webflow", "Custom build"],
          rows: [
            ["Who edits the content", "You, in the WordPress dashboard", "You, visually on the page", "You, through a CMS or editor the developer sets up"],
            ["Hosting", "You choose and pay for it", "Included, on Webflow only", "You choose, often Vercel or similar"],
            ["Running cost shape", "Hosting, plugins and maintenance", "Subscription per site, in US dollars", "Hosting and an optional care plan"],
            ["Mobile Money and card checkout in Ghana", "Yes, Paystack has a WooCommerce plugin", "Not in the built in checkout, which uses Stripe and PayPal", "Yes, any gateway's API"],
            ["Speed on a mid range phone", "Slow by default, fast with work", "Good", "Fast by default"],
            ["Security upkeep", "Core, theme and every plugin need updates", "Handled by Webflow", "Small, no plugin stack"],
            ["Hundreds or thousands of pages from data", "Possible, gets heavy", "Limited by the plan's CMS item cap", "Built for it"],
            ["Leaving later", "Easy, it is open source", "Hard, the CMS and forms depend on Webflow hosting", "Easy, you own the code"],
          ],
        },
      },
      section(
        "The Mobile Money question settles it for many Ghanaian stores",
        "If the website will sell, check the checkout first. Webflow's built in ecommerce takes payments through Stripe and PayPal. Stripe does not onboard businesses in Ghana directly: on its own list of supported countries, Ghana links to Paystack, the payment gateway Stripe owns. So a Ghanaian store on Webflow cannot take Mobile Money through Webflow's checkout, and ends up sending buyers to a separate payment page.",
        "WordPress handles this well. Paystack publishes a WooCommerce plugin, so MoMo and card payments sit inside the store. A custom build connects to Paystack, Hubtel or any other gateway through its API, and can do things a plugin cannot, such as splitting a payment or confirming an order on WhatsApp.",
      ),
      {
        ...section(
          "When WordPress is right",
          "WordPress is the right answer more often than agencies that only build custom like to admit. We wrote a full post on [WordPress or a custom build](/blog/wordpress-vs-custom-website-ghana), and the short version is this.",
        ),
        bullets: [
          "You publish articles or news often and want to do it yourself.",
          "The budget is tight, and what you need is something a mature plugin already does well.",
          "You want a WooCommerce store with Paystack, and a standard checkout is enough.",
          "Someone is paid to update the core, theme and plugins every month. If nobody is, WordPress is the wrong choice.",
        ],
      },
      {
        ...section(
          "When Webflow is right",
          "Webflow is a strong tool for a particular kind of site, and a poor fit outside it.",
        ),
        bullets: [
          "A marketing site where the design is the selling point, such as a studio, a launch or a portfolio.",
          "A marketing team that wants to build and change pages without a developer.",
          "No payments in Ghana, or payments handled elsewhere.",
          "You are comfortable paying a US dollar subscription per site, and with the site living on Webflow.",
        ],
      },
      {
        ...section(
          "When a custom build is right",
          "Build custom when the website is part of how the business works, not only how it looks.",
        ),
        bullets: [
          "It takes payments, bookings or quotes, or runs calculators, as our tax clients' sites do.",
          "It connects to other systems, such as a CRM, stock, accounting, or WhatsApp.",
          "It must be fast on a cheap Android phone on mobile data, because that is how the customers arrive.",
          "It will grow to hundreds or thousands of pages generated from data, each one useful.",
        ],
      },
      {
        ...section(
          "Worked example: Dementia In Home",
          "Dementia In Home is a caregiver matching service in the United States, built by us on Next.js. It has over a thousand pages across twenty cities, each carrying real local pricing, generated from data rather than written one by one.",
          "On WordPress, a thousand data driven pages means a heavy page builder or custom code inside WordPress anyway. On Webflow, it runs into the CMS item limits on each plan. As a custom build, the pages are generated ahead of time, load fast, and the next twenty cities are a data change, not a rebuild.",
        ),
        image: {
          src: "/work/dementia-in-home.webp",
          alt: "The Dementia In Home website, a caregiver matching service built by Manuel Technologies on Next.js",
          width: 1200,
          height: 750,
          caption: "Dementia In Home, built on Next.js by Manuel Technologies. Over a thousand pages across twenty cities. [See the project](/work/dementia-in-home).",
          href: "/work/dementia-in-home",
        },
      },
      section(
        "What it costs, and where to start",
        "A WordPress template site is the cheapest to launch and can be the most expensive to keep, because the plugin upkeep never stops. Webflow is predictable but billed in dollars every year, per site. A custom build costs more on day one and least to run, and you own every line of it.",
        "Our published prices for custom websites and stores in Ghana cedis are on the [pricing page](/pricing). Tell us what the site has to do on our [website development page](/build/website-development), and we will say plainly which of the three it should be, including when the answer is WordPress.",
      ),
    ],
    conclusion: "WordPress suits frequent publishing on a small budget, with maintenance paid for. Webflow suits design led marketing sites that take no payments in Ghana. A custom build suits a website that has to do something, stay fast, and grow. Decide by what the site must do, then by who will look after it.",
    faqs: [
      faq("Is Webflow better than WordPress?", "For a design led marketing site edited by a marketing team, often yes, because hosting and security are handled and the editing is visual. For frequent publishing, a large plugin choice, or a store taking Mobile Money in Ghana, WordPress is usually the better fit."),
      faq("Can Webflow take Mobile Money in Ghana?", "Not through its built in checkout, which uses Stripe and PayPal. Stripe does not onboard businesses in Ghana directly and points them to Paystack instead. A Webflow site can link out to a separate payment page, but the payment is no longer part of the store."),
      faq("Is a custom website more expensive than WordPress?", "To launch, usually yes. To run, usually no, because there is no plugin stack to update and no per site subscription. Compare the cost over three years, not the launch price."),
      faq("Can I move my site off Webflow later?", "Webflow can export the HTML and CSS of a site, but CMS content, forms and other features depend on its hosting. In practice, moving off Webflow means rebuilding the site elsewhere."),
      faq("Can I update a custom built website myself?", "Yes, if it is built that way. A custom site can have a content editor for pages, posts and products, so text and images change without a developer. Ask for this at the start."),
    ],
    sources: [SOURCES.wordpress, SOURCES.woocommerce, SOURCES.paystackWoo, SOURCES.webflowPricing, SOURCES.webflowEcommerce, SOURCES.stripeGlobal, SOURCES.nextjs],
    serviceHref: "/build/website-development",
    heroImage: {
      src: "/blog/wordpress-vs-webflow-vs-custom-website.webp",
      alt: "A woman with long braids working on a laptop at a desk by a window",
      width: 1200,
      height: 750,
      caption: "Photo by Daniel Thomas on [Unsplash](https://unsplash.com/photos/HA-0i0E7sq4). Our own build, Dementia In Home, is shown further down.",
      href: "https://unsplash.com/photos/HA-0i0E7sq4",
    },
  },

  /* ---------------------------------------------------------------------
     Social media. Day 2, 26 November 2026. No screenshot of client social
     work exists, so the evidence is the diagram of our own programme in
     blog-visuals.ts. Never claim we ran a client's social accounts.
     --------------------------------------------------------------------- */
  {
    slug: "instagram-vs-tiktok-vs-linkedin-ghana",
    cluster: ADS_CLUSTER,
    title: "Instagram vs TikTok vs LinkedIn: where should a Ghanaian business post?",
    metaTitle: "Instagram vs TikTok vs LinkedIn for a Ghana business",
    description: "Which social platform a Ghanaian business should put its time into, by who it sells to. What each one takes every week, and how to turn posts into enquiries.",
    published: "2026-11-26",
    modified: "2026-11-26",
    readTime: "7 min read",
    lead: "Post on Instagram if you sell to consumers and your product sells on how it looks, such as food, fashion, beauty, property and events. Post on TikTok if you can make short videos every week and want to reach people who do not follow you yet. Post on LinkedIn if you sell to other businesses, professionals or institutions. Pick one as your main platform and do it properly before adding a second, and make every post lead to a WhatsApp chat or a page that can turn into an enquiry.",
    sections: [
      {
        ...section(
          "The three platforms in one paragraph each",
          "Instagram is Meta's photo and video app. It is where people browse products, check a business looks real, and message it. A professional account adds insights, contact buttons and a shop. Because Meta owns Instagram, Facebook and WhatsApp, one tool, Meta Business Suite, schedules posts to Instagram and Facebook together.",
          "TikTok is short video. Its For You feed recommends videos based on what each viewer watches, not only on who they follow, so a new account with no followers can still reach a large audience with one good video. The cost is that it rewards frequent, native video, made for TikTok rather than reposted.",
          "LinkedIn is the professional network. People use it as themselves, in their work role, which makes it the one platform where you can reach a finance director or a school owner with a post. A company has a LinkedIn Page, but people tend to engage more with posts from a person, so the founder posting matters.",
        ),
      },
      {
        ...section(
          "Which to choose, by what you sell",
          "Start with who buys from you, not with which platform is popular. These are starting points we give clients.",
        ),
        table: {
          caption: "Where to post first, by business type",
          headers: ["Business", "Main platform", "Why"],
          rows: [
            ["Restaurant, bakery, catering", "Instagram", "Sells on photos, ordered by message"],
            ["Fashion, beauty, salon", "Instagram, then TikTok", "Visual, and video shows the result"],
            ["Events, entertainment, a new product", "TikTok", "Reach beyond followers, made for discovery"],
            ["Real estate, car sales", "Instagram", "Buyers browse listings and message"],
            ["Accountant, lawyer, consultant", "LinkedIn", "Buyers are professionals, trust is built by expertise"],
            ["Software, B2B services, recruitment", "LinkedIn", "Decision makers are reachable there"],
            ["School, clinic, church", "Facebook and Instagram", "Parents and members are already there"],
          ],
        },
      },
      {
        ...section(
          "What each one takes every week",
          "The platform you can keep up with beats the platform that suits you on paper. An account that posted daily for a month and then stopped looks closed.",
        ),
        table: {
          caption: "The weekly effort each platform needs to work",
          headers: ["Platform", "Format that works", "Rough weekly effort"],
          rows: [
            ["Instagram", "Photos, carousels, short Reels, Stories", "Three posts and daily Stories"],
            ["TikTok", "Vertical video, made for TikTok", "Three to five short videos"],
            ["LinkedIn", "Text posts with a point of view, documents, photos of real work", "Two or three posts, plus comments on others"],
          ],
        },
      },
      section(
        "Do not drop Facebook and WhatsApp",
        "Facebook is not in this title, but for many Ghanaian customers it is still where they find a business and read its reviews. Since Meta Business Suite posts to Facebook and Instagram at once, keeping a Facebook Page alive costs very little once Instagram is running.",
        "WhatsApp is where the sale usually happens. Whichever platform you choose, put a WhatsApp link in the profile and in the posts, use WhatsApp Business so you have a catalogue and quick replies, and post to your WhatsApp Status, which your existing customers already watch.",
      ),
      {
        ...section(
          "How we run our own",
          "This is the routine behind the articles on this site, and it is the same one we set up for clients. Social posts are not the product. They are the way people find an article that answers their question and then message us.",
        ),
        bullets: [
          "Every article becomes a LinkedIn and Facebook post, a short post for X, and a line for WhatsApp Status.",
          "Every post links to the article itself, never to the homepage, so the reader lands on the answer.",
          "Every article ends with a WhatsApp button that opens a chat pre filled with the article's title, so we know which post brought the conversation.",
          "Each tap on that button is recorded by page in Google Analytics, so we judge posts by the conversations they start, not by likes.",
        ],
      },
      section(
        "Measure conversations, not followers",
        "Followers and likes are easy to count and loosely connected to sales. What matters is how many people messaged, called or sent a form, and which posts they came from. Use a link per platform, or a pre filled WhatsApp message per campaign, so every enquiry can be traced to where it started.",
        "Give a platform about three months of steady posting before judging it. If it has produced conversations, keep going. If not, change the content before changing the platform.",
      ),
      section(
        "Getting help",
        "We plan and run social content for businesses, tied to a website that turns attention into enquiries and to tracking that shows which posts worked. See our [social media service](/grow/social-media), or message us with what you sell and we will tell you which platform we would start on.",
      ),
    ],
    conclusion: "Instagram suits consumer businesses that sell on looks. TikTok suits businesses that can make video weekly and want reach beyond their followers. LinkedIn suits anyone selling to other businesses or professionals. Choose one main platform, post on a schedule you can keep, send every post toward WhatsApp or an article, and judge it on the conversations it starts.",
    faqs: [
      faq("Which social media platform is best for business in Ghana?", "It depends on who buys from you, and there is a clear answer for each case. Instagram for consumer products that sell on looks, TikTok for reach through short video, LinkedIn for selling to businesses and professionals, and Facebook alongside Instagram for broad local reach."),
      faq("Should my business be on TikTok?", "If you can make three or more short videos a week, and your customers are consumers, it is worth testing, because its For You feed shows videos to people who do not follow you. If you cannot keep up with video, put the time into Instagram or LinkedIn instead."),
      faq("Is LinkedIn useful for a small business in Ghana?", "Yes, if you sell to other businesses, professionals or institutions. It is the most direct way to reach decision makers. It is not the right place to sell food or fashion to the public."),
      faq("How often should a business post on social media?", "As often as you can keep up for a year. For most small businesses that is two or three good posts a week on the main platform, plus Stories or WhatsApp Status. A steady schedule beats a burst followed by silence."),
      faq("How do I get enquiries from social media, not just likes?", "Give every post a next step, usually a WhatsApp link or a link to a page that answers the question. Use WhatsApp Business for quick replies, reply quickly, and track which posts start conversations."),
    ],
    sources: [SOURCES.instagramBusiness, SOURCES.metaSuite, SOURCES.tiktokBusiness, SOURCES.tiktokForYou, SOURCES.linkedinPages, SOURCES.whatsappBusiness],
    serviceHref: "/grow/social-media",
    heroImage: {
      src: "/blog/instagram-vs-tiktok-vs-linkedin-ghana.webp",
      alt: "A smiling woman in an Ankara print dress waving at her phone as she films herself",
      width: 1200,
      height: 750,
      caption: "Photo by Ahmed Nasiru on [Unsplash](https://unsplash.com/photos/Sl-LrWJNXV8).",
      href: "https://unsplash.com/photos/Sl-LrWJNXV8",
    },
  },

  /* ---------------------------------------------------------------------
     Custom software. Day 3, 27 November 2026. Sits beside the older
     when-to-build-custom-software post and links to it: that one is the
     general framework, this one starts from the spreadsheet most
     businesses actually run on. Evidence is MPOS, facts from lib/mpos.ts.
     --------------------------------------------------------------------- */
  {
    slug: "spreadsheet-vs-custom-software",
    cluster: WEB_CLUSTER,
    title: "Spreadsheet vs custom software: when should a business switch?",
    metaTitle: "Spreadsheet vs custom software: when to switch",
    description: "The signs a business has outgrown Excel or Google Sheets, what to try before custom software, and when building your own system pays for itself.",
    published: "2026-11-27",
    modified: "2026-11-27",
    readTime: "7 min read",
    lead: "Keep the spreadsheet while one or two people use it, the data is mostly typed in once, and a mistake is cheap to fix. Switch to off the shelf software when a product already does the job, such as accounting or a point of sale. Build custom software when several people depend on the same sheet every day, the same data is typed into more than one place, mistakes cost real money, and no product fits how you work.",
    sections: [
      {
        ...section(
          "Why spreadsheets are the right start",
          "Excel and Google Sheets are the most successful business software ever made, for good reason. They cost little or nothing, everyone can use them, and you can change how they work in a minute without asking anyone. For a new process, a spreadsheet is the fastest way to find out what you actually need.",
          "The problem is not the spreadsheet. It is what happens when a sheet built for one person becomes the system a whole business runs on.",
        ),
      },
      {
        ...section(
          "Seven signs you have outgrown the spreadsheet",
          "One of these is normal. Three or more, every week, means the spreadsheet is now costing more than it saves.",
        ),
        bullets: [
          "Several people edit the same sheet, and someone has overwritten someone else's work.",
          "Nobody is sure which copy is the latest: \"stock FINAL v3\" exists.",
          "The same information is typed twice, into the sheet and into an invoice, a WhatsApp message or another sheet.",
          "A wrong formula or a pasted row has cost money: a wrong price, a missed payment, stock that was not there.",
          "Only one person understands how it works, and the business stops when they travel.",
          "Staff can see figures they should not, such as takings or salaries, because a sheet has no real roles.",
          "Reports take hours at the end of each month because the data has to be cleaned before it can be added up.",
        ],
      },
      {
        ...section(
          "The three options compared",
          "There is a step between a spreadsheet and custom software, and it is often the right one.",
        ),
        table: {
          caption: "A spreadsheet, off the shelf software and custom software compared",
          headers: ["Question", "Spreadsheet", "Off the shelf software", "Custom software"],
          rows: [
            ["Cost to start", "Little or nothing", "A monthly or yearly subscription", "A build fee, then hosting"],
            ["Fits how you work", "Exactly, you built it", "You adapt to it", "Exactly, built for it"],
            ["Several people at once", "Fragile", "Yes, with roles", "Yes, with the roles you define"],
            ["Stops wrong data going in", "Only if someone sets up validation", "Yes, for what it covers", "Yes, every rule you need"],
            ["Talks to MoMo, WhatsApp, other systems", "No, or by hand", "Only the integrations it offers", "Whatever you need"],
            ["Audit trail of who changed what", "Limited", "Usually", "Yes, built in"],
            ["Who you depend on", "The person who built the sheet", "The vendor", "The developer, unless the code and documentation are handed over"],
          ],
        },
      },
      section(
        "Try off the shelf first",
        "If a product already does what your sheet does, use it. Accounting, payroll, a point of sale, a CRM and booking systems are all solved problems, and a subscription costs far less than building the same thing. Configure it properly, move your data in once, and retire the sheet.",
        "Off the shelf stops working when you bend your business around the software: workarounds in a second spreadsheet, a step done by hand because the product cannot do it, or three products that do not share data. That is the point to consider building, and our older post on [when to build custom software](/blog/when-to-build-custom-software) sets out the full test.",
      ),
      {
        ...section(
          "Worked example: MPOS",
          "MPOS, our own point of sale, bookings and stock system, exists because the shops, salons and pharmacies it serves were running on the pattern above: a notebook or a sheet for stock, a separate record of MoMo payments, and tax worked out by hand at the end of the month.",
          "It replaces each of those with something a spreadsheet cannot do safely. Every person signs in with a role, so cashiers sell and only the owner sees the money. Each MoMo transaction ID is recorded for a monthly check against the statement. VAT, NHIL and GETFund are worked out on every receipt. And the till keeps selling when the network drops, then uploads when it returns, which no shared sheet does.",
        ),
        image: {
          src: "/work/manuelpos.webp",
          alt: "MPOS, the point of sale, bookings and stock system for Ghanaian businesses, built and run by Manuel Technologies",
          width: 1200,
          height: 750,
          caption: "MPOS, our own point of sale and stock system for Ghanaian businesses. [See the project](/work/manuelpos).",
          href: "/work/manuelpos",
        },
      },
      section(
        "Start with the one process that hurts",
        "Custom software does not have to replace every sheet at once. The best first build takes the single process that costs the most, usually the one with money in it, and turns it into a small system with proper roles, validation and a record of changes. The rest of the sheets carry on until the evidence says the next one is worth it.",
        "Before any build, write down the steps the sheet handles today, who touches it, and what went wrong in the last three months. That list is the brief, and it is what lets a developer give you a fixed price.",
      ),
      section(
        "Getting help",
        "We build focused business systems that replace the spreadsheet a business has outgrown, and we hand over the code and documentation so you are not tied to us. Send us the sheet you are worried about on our [custom software page](/build/custom-software), and we will tell you plainly whether it needs a product, a build, or just a better spreadsheet.",
      ),
    ],
    conclusion: "A spreadsheet is the right start and the wrong system for a growing team. Move to off the shelf software when a product fits, and build custom software when several people rely on the same data daily, mistakes cost money, and no product fits how you work. Start with the one process that hurts most.",
    faqs: [
      faq("When should a business stop using Excel?", "When several people depend on the same sheet every day, data is typed into more than one place, and mistakes have started to cost money. One person keeping their own records in Excel is fine indefinitely."),
      faq("Is Google Sheets better than Excel for a team?", "For several people editing at once, Google Sheets is usually easier, because everyone works on the same live copy. Neither gives you real roles, so staff who can open the sheet can usually see all of it."),
      faq("Is custom software expensive?", "More than a subscription, less than many expect when it is kept to one process. The right comparison is the build cost against what the spreadsheet costs each year in staff time and mistakes."),
      faq("Can custom software import my existing spreadsheets?", "Yes. Moving the existing data in is a normal part of the build, and cleaning it at the same time is often one of the most valuable steps."),
      faq("What if the developer disappears?", "Insist on owning the code, the hosting account and the documentation from day one. Our terms hand all three over when the final payment clears."),
    ],
    sources: [SOURCES.mpos, SOURCES.terms],
    serviceHref: "/build/custom-software",
    heroImage: {
      src: "/blog/spreadsheet-vs-custom-software.webp",
      alt: "A man in a checked shirt working on a laptop at a wooden table, a printer and papers beside him",
      width: 1200,
      height: 750,
      caption: "Photo by LinkedIn Sales Solutions on [Unsplash](https://unsplash.com/photos/c-xZktTrmJ0). Our own system, MPOS, is shown further down.",
      href: "https://unsplash.com/photos/c-xZktTrmJ0",
    },
  },

  /* ---------------------------------------------------------------------
     Link building. Day 3, 27 November 2026. Evidence is our own research
     benchmarks, described as what we publish. Never claim links earned.
     --------------------------------------------------------------------- */
  {
    slug: "guest-posts-vs-digital-pr-vs-directories",
    cluster: "Search and GEO",
    title: "Guest posts vs digital PR vs directories: which links are worth it?",
    metaTitle: "Guest posts vs digital PR vs directories for links",
    description: "Which kinds of backlinks help a business rank, which ones Google treats as spam, and where a Ghanaian business should spend its link building effort.",
    published: "2026-11-27",
    modified: "2026-11-27",
    readTime: "7 min read",
    lead: "Spend most of your effort on digital PR: publishing something genuinely useful, such as original data or a free tool, and telling journalists and industry sites about it. Use directories only for the few that customers actually use, such as Google Business Profile and your trade association, and treat them as listings, not ranking tricks. Write guest posts only for audiences you want to reach, never to buy keyword links, because Google's own spam policy names links with optimised anchor text in guest posts.",
    sections: [
      {
        ...section(
          "Why links still matter, and which ones",
          "Google finds new pages largely by following links, and its own guide to its ranking systems says it uses how pages link to each other to work out what they are about and which are most helpful. PageRank, one of those systems, has been part of Google since it launched.",
          "Not all links are equal. A single link from a respected news site or industry body in your field is worth more than hundreds from directories nobody visits. And some links count against you: Google's spam policies treat links built to manipulate rankings as link spam.",
        ),
      },
      {
        ...section(
          "The three approaches compared",
          "Each approach has a place. The question is what you get for the effort, and the risk you take on.",
        ),
        table: {
          caption: "Guest posts, digital PR and directories compared",
          headers: ["Question", "Guest posts", "Digital PR", "Directories"],
          rows: [
            ["What it is", "Writing an article for someone else's site", "Publishing something newsworthy and pitching it", "Listing the business on directory sites"],
            ["Link quality", "Varies widely", "Highest: news, industry and education sites", "Mostly low"],
            ["Spam risk", "High when done for keyword links", "Low, the links are given freely", "High for paid or bulk directories"],
            ["Effort", "One article per link", "A large piece of work, then many links from it", "Low"],
            ["Brings customers directly", "Sometimes, if the audience fits", "Yes, through coverage", "Only the directories customers use"],
            ["Lasts", "As long as the article stays up", "Years, if the asset stays useful", "Until the directory goes away"],
          ],
        },
      },
      section(
        "Guest posts: for an audience, not for a link",
        "Google's spam policy lists links with optimised anchor text in guest posts as an example of link spam. A guest post written to place \"best accountant in Accra\" as a link on a blog with no real readers is exactly that, and a site full of them risks being ignored or penalised.",
        "A guest post is still worth writing when the site's readers are your customers. An article for a trade association's newsletter or a respected industry publication puts you in front of the right people, and if the site adds a link, it is a natural one. Google also asks that sponsored links be marked with rel=\"sponsored\" or rel=\"nofollow\", so a site that sells guest posts with followed links is one to avoid.",
      ),
      section(
        "Directories: a handful, chosen by customers",
        "The directories that matter are the ones your customers actually search. For almost every local business that starts with Google Business Profile, which is what appears in Google Maps. After that: your professional body or trade association, the main local business directories, and any industry listing your buyers use.",
        "Keep the name, address and phone number identical on every one, because inconsistent details confuse both customers and search engines. Skip anything that offers hundreds of directory links for a fee. Those links carry almost no value and are the kind Google's spam team targets.",
      ),
      {
        ...section(
          "Digital PR: give people something worth linking to",
          "Journalists, bloggers and industry sites link to things that help their readers: original data, a useful tool, an expert answer. Make one of those, then tell the people who write about your field. One good asset can earn links for years, because people keep finding and citing it.",
          "This is how we build our own. Our [research pages](/research) benchmark the websites of Ghanaian law firms, private hospitals, private schools and real estate firms, measured by us, with the method published. Our [free tools](/free-tools), such as the payment gateway fee calculator, answer questions people ask every day. Both are made to be useful enough that a writer would cite them.",
        ),
        bullets: [
          "Original data: a survey, a benchmark or prices you collect that nobody else publishes.",
          "A free tool or calculator that answers a real question in your field.",
          "An expert answer to a current story, sent quickly to the journalist covering it.",
          "A clear guide that becomes the reference other sites point to.",
        ],
      },
      section(
        "What to do this quarter",
        "Claim and complete Google Business Profile. Add the business to your trade association and two or three directories customers use, with identical details. Then put the rest of the effort into one useful asset in your field, and spend a week telling the right people about it.",
        "We plan and build link earning assets, from research to free tools, and handle the outreach. See our [link building service](/grow/link-building), or tell us your field and we will suggest the asset we would build first.",
      ),
    ],
    conclusion: "Digital PR earns the links that matter, from sites people trust, by giving them something worth citing. Directories are for being found where customers look, not for ranking. Guest posts are for reaching an audience, and become spam the moment they exist only to place a keyword link.",
    faqs: [
      faq("Are guest posts bad for SEO?", "Not in themselves. Guest posts written mainly to place links with optimised anchor text are named in Google's spam policy as link spam. A guest post written for a real audience, with a natural or no link, is fine."),
      faq("Do directory links help SEO?", "A few do, mainly as listings customers use, such as Google Business Profile and trade associations. Bulk or paid directory links carry little value and can count as link spam."),
      faq("What is digital PR?", "Earning coverage and links by publishing something newsworthy or useful, such as original data or a free tool, and pitching it to journalists and industry sites. The links are given freely, which is why they are the most valuable kind."),
      faq("Should I buy backlinks?", "No. Google's spam policies treat buying or selling links that pass ranking credit as link spam. Paid placements should be marked rel=\"sponsored\", which means they do not pass ranking credit anyway."),
      faq("How many backlinks does my business need?", "There is no number. A handful of links from respected sites in your field is worth more than hundreds from irrelevant ones. Focus on whether each link would bring you a customer on its own."),
    ],
    sources: [SOURCES.spamPolicies, SOURCES.qualifyLinks, SOURCES.rankingSystems, SOURCES.howSearchWorks, SOURCES.businessProfile],
    serviceHref: "/grow/link-building",
    heroImage: {
      src: "/blog/guest-posts-vs-digital-pr-vs-directories.webp",
      alt: "A smiling young reporter in glasses holding a microphone on a residential street",
      width: 1200,
      height: 750,
      caption: "Photo by Iwaria Inc. on [Unsplash](https://unsplash.com/photos/1jsk7RhVg-U).",
      href: "https://unsplash.com/photos/1jsk7RhVg-U",
    },
  },
];
