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
];
