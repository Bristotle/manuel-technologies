/* --------------------------------------------------------------------------
   Case studies. Long form content for /work/[slug].

   Keyed by Project.slug in site.ts. PROJECTS stays the index record, this
   file carries the body.

   THE EVIDENCE RULE. Every factual statement here must be checkable by a
   stranger who opens the client site. Counts were verified live on
   2026-08-31. No invented metrics, no traffic claims, no conversion claims,
   no percentages that cannot be traced. CLAUDE.md section 9 is explicit:
   borrowing or inventing proof is the fastest way to lose a deal.

   `verify` is the load bearing field. It is the list a prospect can work
   through themselves. A case study whose claims are all independently
   confirmable does more than one full of numbers nobody can audit.

   `results` is deliberately empty on every record. Commercial outcomes,
   traffic, enquiry volume and revenue are Emmanuel's to supply because only
   he has them. The block does not render while the array is empty, so the
   page reads as complete rather than half filled.

   `published` gates the sitemap and every internal link. A case study only
   goes live once it is whole. Never ship a thin URL and improve it later:
   Google files its assessment on the first crawl and re-evaluating costs far
   more time than waiting would have.
   -------------------------------------------------------------------------- */

export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
};

export type CaseStudy = {
  /* Matches Project.slug in site.ts. */
  slug: string;
  /* Real date the copy below last changed. Feeds sitemap lastmod.
     Never bump on a deploy. */
  modified: string;
  title: string;
  description: string;
  lead: string;
  sections: CaseStudySection[];
  /* Independently checkable facts. Each one is something a prospect can
     confirm by opening the client site. */
  verify: string[];
  /* Commercial outcomes. Empty until Emmanuel supplies real figures.
     Renders nothing while empty. Never fill this with an estimate. */
  results: string[];
  /* False keeps the page out of the sitemap, the index and every internal
     link, while the route still builds. Flip when the page is finished. */
  published: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "cgt-experts",
    modified: "2026-08-31",
    title: "Nine tax calculators for a regulated UK practice",
    description:
      "How Capital Gains Tax Experts got nine working tax calculators, a service architecture built around HMRC deadlines, and a site that generates enquiries rather than describing a firm.",
    lead: "Capital Gains Tax Experts needed to compete with national accountancy brands for searches where the person asking already knows what they owe is complicated. The answer was not more copy about the firm. It was software that does the arithmetic in public.",
    sections: [
      {
        heading: "The problem with a brochure in a regulated market",
        paragraphs: [
          "Someone selling a second property, disposing of shares, or working out what a crypto position costs them is not looking for a firm. They are looking for a number. Every accountancy site in the UK answers that with a contact form and a promise of a free consultation, which asks the visitor to hand over their details before they learn anything.",
          "That is a weak position in search and a weaker one in AI answers. A page that describes a service has nothing a generative engine can quote. A calculator that produces a figure under a named set of rules does.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "Nine calculators, each scoped to a genuinely different set of rules rather than one engine with the labels changed. General capital gains tax, property disposals, shares, crypto, non-resident disposals, Business Asset Disposal Relief, stamp duty, inheritance tax and income tax.",
          "The distinction matters. Non-resident CGT and BADR are not the main calculator with different wording. They carry different rate bands, different reliefs, different qualifying conditions and different reporting deadlines. Building them as one configurable tool would have produced nine pages that Google correctly reads as one, which is exactly the thin content pattern that gets a set of pages filed and forgotten.",
          "Each calculator sits on its own URL with its own explanation of the rules it applies, so the page answers the question in text as well as in the tool. That gives a search engine something to index, an AI engine something to cite, and a visitor a reason to trust the output.",
        ],
      },
      {
        heading: "Arithmetic with consequences",
        paragraphs: [
          "This is the part that separates a tax calculator from a mortgage widget. A wrong figure in a regulated domain is not a cosmetic bug. It is advice, and someone may act on it.",
          "So the rules are held as explicit, reviewable values rather than being scattered through the interface, the bands are stated on the page next to the result, and every calculator says plainly what it does not cover. The tool produces an informed estimate and tells the reader where the estimate stops. That framing is what makes it publishable in a market where the practice carries professional obligations.",
          "The 60 day HMRC reporting deadline for UK residential property disposals shapes the whole service architecture. It is the reason the site treats property CGT as its own path rather than a subheading, because the visitor who needs it is usually already against a clock.",
        ],
      },
      {
        heading: "The lead engine",
        paragraphs: [
          "A calculator earns the enquiry it receives. By the time someone has entered a disposal value, an acquisition cost and a set of dates, they have told themselves the problem is real and they have seen a figure they would like a qualified person to confirm. The enquiry that follows is warmer than anything a contact form collects cold.",
          "The service pages sit behind the calculators rather than in front of them. Property, business assets, shares and investments, non-resident, inheritance tax planning and HMRC returns each have a page, and each is reachable from the calculator that produces the number it relates to.",
        ],
      },
    ],
    verify: [
      "Nine calculators are live and reachable: capital gains tax, property CGT, shares CGT, crypto CGT, non-resident CGT, BADR, stamp duty, inheritance tax and income tax.",
      "Each calculator has its own URL and its own explanation of the rules it applies, rather than sharing one page.",
      "The site states its ACCA regulated status and the 60 day HMRC property reporting deadline on the homepage.",
      "Six service paths are published: property, business, shares and investments, non-resident, inheritance tax planning and CGT returns.",
    ],
    results: [],
    published: true,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "dementia-in-home",
    modified: "2026-08-31",
    title: "Programmatic city pages for a US caregiver service",
    description:
      "How Dementia In Home got twenty city pages carrying real local pricing, a published methodology for its own numbers, and an architecture that reaches several hundred cities without a rebuild.",
    lead: "Dementia In Home matches families with vetted in-home dementia caregivers across the United States. Local search is the whole market, and local search at national scale is where most programmatic page sets quietly fail.",
    sections: [
      {
        heading: "Why most city pages deserve to be ignored",
        paragraphs: [
          "The standard approach is a template with a place name substituted in. Ten thousand pages, one page of actual information. Google has been able to detect that for years, and the usual outcome is a set that gets crawled once, indexed thinly or not at all, and drags on the assessment of the whole domain.",
          "The test we hold to is simple. If the only difference between two pages is a place name, the set should not exist. A city page has to carry something true about that city.",
        ],
      },
      {
        heading: "What makes each page different",
        paragraphs: [
          "Every city page carries local pricing for in-home dementia care in that market. Care costs in Baltimore are not care costs in Seattle, and a family comparing options needs the local figure, not a national average with a disclaimer.",
          "Twenty cities are live, spanning most major US care markets: Baltimore, Boston, Buffalo, Charlotte, Chicago, Columbus, Dallas, Denver, Detroit, Houston, Los Angeles, Memphis, Milwaukee, New York, Philadelphia, Phoenix, San Antonio, San Diego, Seattle and Tucson.",
          "The architecture supports several hundred without a rebuild, which is the point of doing it programmatically. What limits expansion is pricing data coverage, not engineering. That is the correct constraint, and it is deliberate: the build will not publish a city it cannot describe honestly.",
        ],
      },
      {
        heading: "Publishing the methodology",
        paragraphs: [
          "The site carries a section explaining where its numbers come from. This is unusual and it is the single most valuable thing on it.",
          "A page that states a local price without saying how it was derived is asking to be trusted. A page that shows its sourcing can be checked, which is what a family making a difficult decision actually needs, and what a generative engine needs before it will treat a source as citable. It also creates an internal standard: a number that cannot be sourced does not get published.",
        ],
      },
      {
        heading: "The pages behind the pages",
        paragraphs: [
          "City pages only work when they connect to something. Six service paths sit behind them: companion care, personal care, 24-hour and live-in, respite care, memory care at home, and hospital discharge. A visitor arriving on a city page can move to the specific kind of care they need, and a visitor arriving on a service page can move to their city.",
          "The matching offer itself is concrete and time bound. Free caregiver profiles within 72 hours, real video profiles rather than stock photography, and transparent pricing. Each of those is a claim the site then has to honour, which is what stops the copy drifting into the vague register that most care marketing occupies.",
        ],
      },
    ],
    verify: [
      "Twenty city pages are live under /cities, each carrying local pricing rather than a national figure.",
      "The homepage publishes a section explaining where its pricing numbers come from.",
      "Six distinct service paths are published, from companion care through to hospital discharge.",
      "Caregiver profiles are real video profiles, viewable before any commitment.",
    ],
    results: [],
    published: true,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "impressiful",
    modified: "2026-08-31",
    title: "A 1,000 product configurable catalogue in the UAE",
    description:
      "How Impressiful sells custom branded merchandise at catalogue scale: over 1,000 configurable products across 21 categories, with sample kit and bulk order paths and WhatsApp wired into the checkout route.",
    lead: "Impressiful sells custom branded merchandise to businesses in the United Arab Emirates. Every product is configurable, every order is a quantity negotiation, and the catalogue runs past a thousand items. None of that fits the shape of a normal ecommerce build.",
    sections: [
      {
        heading: "Why a merchandise catalogue is not a shop",
        paragraphs: [
          "A standard store sells a fixed item at a fixed price. A branded merchandise business sells a blank product, a decoration method, a quantity band, and a logo the buyer has not sent yet. The price depends on all four, and the buyer usually wants to see a sample before committing to five hundred units.",
          "Build that as a conventional product listing and you get a thousand pages that cannot quote, a cart nobody completes, and a sales team retyping the same questions into email all day.",
        ],
      },
      {
        heading: "Catalogue architecture",
        paragraphs: [
          "Over 1,000 configurable products sit across 21 categories: apparel from t-shirts and polos through jackets, vests, activewear and footwear, then bags and backpacks, drinkware, caps, corporate gifts, premium gifts, gift sets, boxes and packaging, office and stationery, home and living, travel and tech, eco-friendly ranges, uniforms and work apparel, accessories, and seasonal ranges including Ramadan and Eid gifting.",
          "The category structure is doing real work. It matches how a corporate buyer actually shops, by occasion or by item type, rather than mirroring an internal product taxonomy. Seasonal categories such as Ramadan and Eid gifting matter commercially in this market in a way they would not elsewhere, and giving them their own path rather than a banner means they can rank and be found ahead of the season.",
        ],
      },
      {
        heading: "Two order paths, not one",
        paragraphs: [
          "The build separates the sample kit flow from the bulk order flow, because they are different purchases made by the same person weeks apart. A buyer evaluating quality wants one of each at any price. The same buyer approving a company-wide order wants a quantity quote and a lead time. Forcing both through one cart loses the first and frustrates the second.",
          "Multi currency pricing supports a market where buyers and budgets are not uniformly denominated.",
        ],
      },
      {
        heading: "WhatsApp as commerce infrastructure",
        paragraphs: [
          "In the UAE, business buying happens on WhatsApp. Treating it as a support channel bolted to the side of a website misreads the market. It is wired into the checkout path, so a buyer with a question about a decoration method or a deadline can ask it at the moment of hesitation, in the channel they already use, without abandoning the configuration they have built.",
          "This is the sort of decision that does not appear in a template and does not come from a best practice list. It comes from building for a specific market rather than a generic one.",
        ],
      },
    ],
    verify: [
      "Over 1,000 configurable products are listed, across 21 published categories.",
      "Category paths cover apparel, bags, drinkware, corporate and premium gifts, packaging, eco-friendly ranges, uniforms, and seasonal Ramadan and Eid gifting.",
      "A sample kit path and a bulk order path are separately available.",
      "WhatsApp contact is reachable from the product and checkout path, not only the footer.",
    ],
    results: [],
    published: true,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "miyaki-beauty",
    modified: "2026-08-31",
    title: "Ecommerce for a premium beauty retailer in Accra",
    description:
      "How Miyaki Beauty sells certified skincare, professional makeup tools and studio equipment in Accra, and why it is the site we test CWV Drift Monitor against.",
    lead: "Miyaki Beauty is a premium beauty retailer in Accra, Ghana, selling certified skincare, professional makeup tools and studio essentials. It is also the site we point our own performance extension at, which means its Core Web Vitals get watched more closely than most.",
    sections: [
      {
        heading: "Building for the market you are actually in",
        paragraphs: [
          "Ecommerce advice is written for buyers on fast connections and recent phones. That is not the Accra market. A large share of traffic arrives on mid range Android over mobile data, and a store that assumes otherwise loses the sale before the first product image resolves.",
          "That constraint shapes everything downstream. Image weight is a conversion problem before it is a performance score. A product grid that reflows while it loads costs the tap that was already in motion.",
        ],
      },
      {
        heading: "The catalogue",
        paragraphs: [
          "Five categories carry the store: skincare, makeup, tools, accessories and body wash, running from consumables through to studio equipment such as lash beds.",
          "That range is wider than it looks. A customer buying a concealer and a salon owner buying a luxury lash bed are different buyers with different price expectations and different research behaviour, arriving at the same storefront. The category structure keeps both paths short rather than optimising for one and burying the other.",
          "The store carries certified skincare and professional grade tooling, and says so, which is the distinction that matters in a market where provenance is a live concern for the customer.",
        ],
      },
      {
        heading: "Our own performance test subject",
        paragraphs: [
          "CWV Drift Monitor is the Chrome extension we built and published free. Miyaki Beauty is one of the sites we run it against.",
          "That is a deliberate arrangement rather than a coincidence. An ecommerce store with a heavy image catalogue, third party scripts and a real transactional path is a far more honest test of a performance tool than a static marketing page. If the extension is useful, it has to be useful here.",
          "It also means the store gets continuous performance attention as a side effect of us testing our own software, and that any regression shows up in a tool we are already looking at daily.",
        ],
      },
    ],
    verify: [
      "Five product categories are live: skincare, makeup, tools, accessories and body wash.",
      "The catalogue spans consumables through to studio equipment including lash beds.",
      "CWV Drift Monitor is published free on the Chrome Web Store and can be run against this site by anyone.",
    ],
    results: [],
    published: true,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "cangaf",
    modified: "2026-08-31",
    title: "Website and technical SEO for a Bolton accountancy practice",
    description:
      "How Cangaf, a certified chartered accountancy practice in Bolton, structures six service paths, a client onboarding route and a resource library that feeds its specialist CGT arm.",
    lead: "Cangaf is a certified chartered accountancy practice in Bolton and the parent firm behind Capital Gains Tax Experts. Two sites, one practice, and a deliberate decision to keep them apart.",
    sections: [
      {
        heading: "Why the specialist arm has its own domain",
        paragraphs: [
          "A general practice site and a specialist capital gains site want to rank for different things and speak to different people. Someone searching for an accountant in Bolton wants a local firm they can visit. Someone searching for what they owe on a second property disposal wants a specialist, and does not care where the office is.",
          "Folding both into one site means every page compromises. Keeping them separate lets the general practice own local intent and the specialist arm own national intent, with each free to structure itself around its own buyer. The relationship between them is stated rather than hidden, so neither is pretending to be something it is not.",
        ],
      },
      {
        heading: "Service architecture",
        paragraphs: [
          "The practice publishes six distinct service lines, covering self assessment and personal tax, accounting and bookkeeping, capital gains tax advice, cloud accounting, corporation tax and VAT returns.",
          "Each is a genuine service line with its own buyer rather than a subheading on a single services page. A sole trader needing self assessment and a limited company needing corporation tax and VAT are not the same enquiry, and giving each its own path is what allows either to be found.",
          "A three step onboarding route runs alongside them, from stating the need through to the practice taking the work on. Professional services buyers hesitate at the point where they cannot picture what happens next, and naming the steps removes that.",
        ],
      },
      {
        heading: "The conversion path for a local practice",
        paragraphs: [
          "A Bolton practice competes on being reachable, not on being the largest. The phone number sits in the header rather than buried on a contact page, and WhatsApp is available alongside it, because a small business owner with a question about a deadline will use whichever is nearest to hand.",
          "Two entry points run side by side rather than one: a free quote for someone comparing firms, and a call back request for someone who would rather talk than fill anything in. A single call to action would have lost one of those visitors, and they are not the same person.",
          "A client portal carries existing clients, which keeps the public site free to do acquisition work instead of doubling as an account area.",
        ],
      },
      {
        heading: "The resource library",
        paragraphs: [
          "The practice publishes on live UK tax and property matters, including inheritance tax and pension reform, the Renters' Rights Act, and stamp duty.",
          "This is the part that compounds. Tax changes annually, legislation lands on a schedule, and a practice that publishes on each change as it arrives builds a body of work that answers the questions clients are asking that year. It supports the specialist CGT arm at the same time, because the two sites cover adjacent ground and each strengthens the case that the practice knows the subject.",
        ],
      },
    ],
    verify: [
      "Six service paths are published: self assessment, accounting and bookkeeping, capital gains tax advice, cloud accounting, corporation tax and VAT returns.",
      "A three step client onboarding route is published on the homepage.",
      "The resource library carries current UK tax and property articles, including inheritance tax and pension reform, the Renters' Rights Act and stamp duty.",
      "The relationship to Capital Gains Tax Experts, the specialist arm, is stated rather than concealed.",
      "A client portal, a free quote path and a call back path are all reachable from the homepage.",
    ],
    results: [],
    published: true,
  },
  /* ---------------------------------------------------------------------- */
  {
    slug: "bot-properties",
    modified: "2026-08-31",
    title: "Buy and rent as two separate paths for a Ghanaian developer",
    description:
      "How BOT Properties structures luxury residential and commercial property across Accra and Kumasi, with buy and rent split into their own routes and five accommodation types published separately.",
    lead: "BOT Properties is a real estate developer and high-end rental operator working across Accra and Kumasi. Its portfolio spans luxury apartments, townhouses and commercial space, and the buyers for each are not the same person.",
    sections: [
      {
        heading: "Two transactions, two routes",
        paragraphs: [
          "Most property sites put buying and renting behind one search box with a toggle. It looks efficient and it is the wrong call. Someone renting a two bedroom apartment for a year and someone purchasing a townhouse are on different timescales, need different information, and arrive from different searches.",
          "Buy and rent each have their own route here, so each can be structured, found and linked on its own terms rather than sharing a page that serves neither properly.",
        ],
      },
      {
        heading: "Publishing the units, not just the development",
        paragraphs: [
          "Five accommodation types are published separately: Apex Luxury Apartment in three bedroom and two bedroom, and Apex Suites in two bedroom, one bedroom and studio.",
          "Each carries its own occupancy, bed and bathroom detail rather than sitting inside a single development page as a line in a table. A person searching for a one bedroom in Accra is searching for that, and a page that exists for it can answer them directly.",
          "The Apex Luxury Apartments are described concretely: a two storey residential building near Trasacco, a short distance from the airport, available furnished or unfurnished for short and long term stays. Location relative to the airport is a real decision factor for this market, and stating it beats a paragraph about quality.",
        ],
      },
      {
        heading: "Residential and commercial under one portfolio",
        paragraphs: [
          "The projects route carries both sides of the business, from named commercial buildings such as Zion House through to homes in gated communities across Accra and Kumasi.",
          "Keeping both under one portfolio while giving each its own page is what lets a commercial tenant and a residential buyer use the same site without either wading through the other's inventory.",
        ],
      },
      {
        heading: "Amenities as their own pages",
        paragraphs: [
          "Dining and wellness are published as pages rather than as bullet points on a development listing: restaurants and bars, the restaurant itself, a menu page, and spa and wellness.",
          "For a serviced luxury rental this is what the tenant is actually buying, and it is also what someone searches for. Detail that exists only as an icon in a feature list cannot be found and cannot be quoted.",
        ],
      },
    ],
    verify: [
      "Buy and rent are separate routes, not a filter on one search page.",
      "Five accommodation types are published individually, from studio through to three bedroom, each with occupancy and room detail.",
      "The projects route covers residential and commercial, including the named Zion House office building.",
      "Amenity pages are published for dining and for spa and wellness.",
      "Coverage spans Accra and Kumasi.",
    ],
    results: [],
    /* HELD BACK. Same rule as every other study: CLAUDE.md section 4 requires
       the interface, not just an account of it. The site's hero banners render
       black in headless capture, so there is no usable screenshot yet.

       TO PUBLISH. Add public/work/bot-properties.webp (120KB cap, 1600px),
       set thumb on the BOT Properties record in site.ts, then flip this to
       true. It joins the sitemap and the link graph automatically. */
    published: false,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug && c.published);
}

/* Published case studies only. Sitemap, /work and every internal link read
   from this, so an unfinished study is invisible rather than thin. */
export const PUBLISHED_CASE_STUDIES = CASE_STUDIES.filter((c) => c.published);

export function hasCaseStudy(slug: string): boolean {
  return PUBLISHED_CASE_STUDIES.some((c) => c.slug === slug);
}

/* --------------------------------------------------------------------------
   Scope label to service page. Turns the pills on a case study into real
   internal links, which is the point: /work previously sent every link
   outward to the client site and kept none.

   A label with no entry here renders as plain text rather than a dead link,
   the same rule the footer already follows for services that do not exist.
   -------------------------------------------------------------------------- */
export const SCOPE_TO_SERVICE: Record<string, string> = {
  "Website Development": "/build/website-development",
  "Web Design": "/build/web-design",
  "Custom Software": "/build/custom-software",
  "Technical SEO": "/grow/technical-seo",
  "Programmatic SEO": "/grow/programmatic-seo",
};
