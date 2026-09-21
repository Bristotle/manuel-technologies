import lawFirms from "@/lib/research/benchmarks/ghana-law-firms.json";
import hospitals from "@/lib/research/benchmarks/ghana-private-hospitals.json";
import schools from "@/lib/research/benchmarks/ghana-private-schools.json";
import realEstate from "@/lib/research/benchmarks/ghana-real-estate.json";

/* Programmatic pages: one industry, one market, two pages.

     /research/[slug]        the benchmark: original numbers from our engine
     /websites-for/[slug]    the persona page: what that industry's site must
                             do, priced against our tiers, with the benchmark
                             as proof that most of its peers get it wrong

   THE GATE. A page is generated only when its record passes publishable():
   a benchmark with at least 12 measurable sites, at least three needs that
   are specific to the industry, and at least three FAQs. CLAUDE.md section 6:
   three unique sentences or do not generate the page. The build fails on a
   record that does not pass, so a thin page cannot ship by accident.

   NOTHING HERE IS A TEMPLATE WITH THE NOUN SWAPPED. Every needs list was
   written for that industry. If a new industry's list could be pasted onto
   another industry unchanged, it is not ready. */

export type Benchmark = typeof lawFirms;

export type IndustryFaq = { q: string; a: string };

export type Industry = {
  slug: string;
  name: string;            /* "law firms" */
  singular: string;        /* "a law firm" */
  market: string;
  benchmark: Benchmark;
  headline: string;        /* the H1 on the persona page */
  intro: string;
  /* What the website has to do for this industry specifically. */
  needs: { title: string; body: string }[];
  /* Which pricing tier this usually lands in, and why. */
  tier: { slug: "starter" | "business" | "store" | "custom"; name: string; why: string };
  /* A delivered example, only where one exists. Never borrowed. */
  example?: { client: string; href: string; src: string; alt: string; fact: string };
  faqs: IndustryFaq[];
  modified: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "law-firms",
    name: "law firms",
    singular: "a law firm",
    market: "Ghana",
    benchmark: lawFirms,
    headline: "Websites for law firms in Ghana that bring the right client to the right lawyer.",
    intro: "A law firm's website is judged by a client who is worried and in a hurry, and by a corporate counsel checking whether the firm looks like one they could instruct. It has to carry both. Most firm sites in Ghana were built once, years ago, and it shows in the numbers.",
    needs: [
      { title: "A page per practice area, not a list", body: "Someone searching for a property lawyer in Accra does not want the firm's history. They want the property page: what the firm handles, who does it, and how to start. One page per practice area, each with its own title and its own lawyer, is what ranks and what converts." },
      { title: "Lawyer profiles that are the reason to call", body: "Clients instruct people, not brands. Each lawyer needs a profile with a photograph, admission year, practice areas, notable work that can be described, and a direct way to reach them. Profiles also carry Person schema, which is how search engines connect the lawyer to the firm." },
      { title: "A confidential first contact", body: "A matter described in a contact form is sensitive. The form should say what happens to it, deliver to a monitored inbox, and never sit in a third party marketing tool. A WhatsApp option matters in Ghana, and it needs a business account, not a partner's personal number." },
      { title: "Client resources that earn links", body: "Plain English guides to the things clients ask about, such as land title registration or company incorporation, are what other sites link to and what AI answers cite. They are also the cheapest way for a firm to demonstrate expertise before a meeting." },
      { title: "Speed on a phone", body: "More than half of the firm websites we measured took over a second to return their first byte. A client on a mid range phone on mobile data is gone by then." },
    ],
    tier: { slug: "business", name: "Business website", why: "Five to eight pages, one per practice area, with profiles, a blog for guides, and content the firm edits itself. Firms with a client portal or document intake move to a custom build." },
    faqs: [
      { q: "How much does a law firm website cost in Ghana?", a: "Most firms land in the Business tier at GHS 4,500 to 6,000, which covers practice area pages, lawyer profiles, a resources section the firm updates itself, and technical SEO foundations. A firm that wants secure document intake or a client portal is a custom build, quoted after scoping." },
      { q: "Can we take client enquiries without a form?", a: "Yes, and many firms prefer a WhatsApp Business number alongside the form. The form still matters because it captures the matter type and creates a record, and because some clients will not use WhatsApp for legal matters." },
      { q: "Do lawyer profiles really affect search results?", a: "Yes. A profile with a name, photograph, practice areas and Person schema is what lets search engines and AI answer engines connect a lawyer to the firm and the firm to a practice area. Firms without them are anonymous to the machine that ranks them." },
      { q: "How do we compare to other Ghanaian law firm websites?", a: "Run yours through the free audit on this site and compare the result with the benchmark on this page. The benchmark was produced by the same tool, so the numbers are directly comparable." },
    ],
    modified: "2026-09-21",
  },
  {
    slug: "private-hospitals",
    name: "private hospitals and clinics",
    singular: "a private hospital or clinic",
    market: "Ghana",
    benchmark: hospitals,
    headline: "Websites for private hospitals and clinics in Ghana that work at 2am.",
    intro: "A hospital website is used by people at their worst moment, often on a phone, often at night. It has one job before any other: get the right number, the right location and the right doctor in front of them fast. Everything else is secondary, and most sites we measured had it backwards.",
    needs: [
      { title: "The emergency number on every screen", body: "Not in the footer. A fixed call button on mobile that dials the emergency line, and the physical address with a map link, visible without scrolling on every page. This is the one feature that can matter more than all the others combined." },
      { title: "Departments and doctors people can actually find", body: "A page per department with the doctors who work in it, their specialty and their consulting days. Physician schema on each profile. Patients search for a specialist by name and by problem, and a site that only lists departments loses both." },
      { title: "Appointment booking that confirms", body: "A request form is not booking. A booking system holds a slot, confirms by SMS or WhatsApp, and lets reception see the day. For clinics that means an integration with the practice management system, or a simple scheduler where none exists." },
      { title: "Insurance and payment, stated plainly", body: "Which schemes are accepted, whether NHIS applies, which private insurers, and whether Mobile Money is taken at the desk. This is the second most searched question after opening hours and it is missing from most sites." },
      { title: "Accessible by default", body: "Patients include the elderly, the visually impaired and people in pain. Large touch targets, real contrast, no carousels, and every image described. This is a legal expectation in some markets and a decency in all of them." },
    ],
    tier: { slug: "custom", name: "Custom build", why: "Departments and profiles fit the Business tier, but real appointment booking, patient records integration and multi location management make most hospitals a custom build. Single clinics without booking fit Business." },
    faqs: [
      { q: "How much does a hospital website cost in Ghana?", a: "A single clinic with departments, doctor profiles and a request form fits the Business tier at GHS 4,500 to 6,000. A hospital with confirmed booking, multiple locations or integration with a patient system is a custom build from GHS 9,000, quoted after a scoping call." },
      { q: "Can patients book appointments online?", a: "Yes, and the difference between a form and a booking system matters. A form sends a message someone has to answer. A booking system holds a slot, confirms by SMS or WhatsApp, and shows reception the day. We build either, and we say which one you actually need." },
      { q: "Can the site list which insurance schemes we accept?", a: "It should, prominently. Insurance and NHIS acceptance is one of the most searched questions about any facility and one of the most often missing from the site." },
      { q: "How fast should a hospital website be?", a: "First byte under a second on a phone, because the person loading it may be in an emergency. Eleven of the seventeen hospital sites we measured were slower than that." },
    ],
    modified: "2026-09-21",
  },
  {
    slug: "private-schools",
    name: "private schools",
    singular: "a private school",
    market: "Ghana",
    benchmark: schools,
    headline: "Websites for private schools in Ghana that turn a parent's search into an admissions enquiry.",
    intro: "A parent choosing a school reads the website the way they would walk the corridors: looking for what the children are doing, what it costs, and whether anyone will answer. The school sites we measured were often handsome and almost always hard to act on.",
    needs: [
      { title: "Admissions as a process, not a page", body: "Requirements, dates, fees, the application itself, and what happens after it is submitted. Parents compare four or five schools; the one that makes the next step obvious gets the enquiry. Fee schedules published as a table, not a PDF." },
      { title: "Fees paid online, by Mobile Money", body: "A parent who can pay a deposit or a term's fees from their phone does not have to visit the bursar. MTN MoMo and Telecel Cash alongside card, with a receipt by SMS and a record the school can reconcile." },
      { title: "A calendar and news that stay current", body: "A school site with last year's calendar signals a school that is not paying attention. The calendar, term dates and news must be something a member of staff updates in minutes without calling anyone." },
      { title: "The curriculum, explained for parents", body: "Cambridge, IB, GES, or a mix: what it means, what the exams are, where leavers go. Parents searching for a school by curriculum are the highest intent visitors a school site gets." },
      { title: "Photographs that are the school's own", body: "Stock imagery on a school site is instantly recognisable and quietly damaging. Real classrooms, real events, with consent handled properly, and sized so they do not slow the site down." },
    ],
    tier: { slug: "custom", name: "Custom build", why: "Curriculum, calendar and news fit the Business tier. Online applications, fee payment by Mobile Money and a parent portal are what most schools actually want, and those are a custom build." },
    example: { client: "Fold", href: "https://www.getfold.org", src: "/work/getfold.webp", alt: "Fold, membership and giving software built by Manuel Technologies", fact: "Membership, records and Mobile Money giving for congregations, the same foundations a school portal needs" },
    faqs: [
      { q: "How much does a school website cost in Ghana?", a: "A school site with admissions information, curriculum pages, a calendar and news the school edits itself fits the Business tier at GHS 4,500 to 6,000. Online applications, fee payment by Mobile Money and a parent portal make it a custom build from GHS 9,000." },
      { q: "Can parents pay school fees through the website?", a: "Yes. MTN MoMo, Telecel Cash and card, with an SMS receipt and a record the bursar can reconcile against. Gateway charges apply and are explained before launch." },
      { q: "Can staff update the calendar and news themselves?", a: "That is the point. Term dates, events and news are edited by the school in minutes, without a developer. A site the school cannot update goes stale within a term." },
      { q: "How do we compare to other school websites in Ghana?", a: "Run yours through the free audit and compare against the benchmark on this page. Fourteen of the sixteen school sites we measured did not have a single, clear H1, which is the most basic signal of what a page is about." },
    ],
    modified: "2026-09-21",
  },
  {
    slug: "real-estate",
    name: "real estate developers and agencies",
    singular: "a real estate company",
    market: "Ghana",
    benchmark: realEstate,
    headline: "Websites for real estate companies in Ghana where every listing is a page that ranks.",
    intro: "Property is searched one listing at a time: two bedroom in East Legon, land at Oyarifa, office space in Airport City. A developer's site that presents a brochure and a phone number is invisible to all of those searches. The one that gives each property its own page, with its own data, owns them.",
    needs: [
      { title: "A page per property, generated from data", body: "Price, location, size, bedrooms, amenities, status, photographs, and a map, each on its own URL with property schema, built from one record so that adding a listing is a form and not a developer. This is programmatic SEO applied to a catalogue, and it is where property sites win or lose." },
      { title: "Enquiry on the listing, not on a contact page", body: "The enquiry belongs beside the property: a form that carries the listing reference, and a WhatsApp button that opens with it pre filled. An agent should never have to ask which property the message was about." },
      { title: "Payment plans made clear", body: "Off plan sales in Ghana run on instalments. A listing that shows the deposit, the schedule and what is included removes the first three questions from every call. Currency toggling matters for diaspora buyers pricing in dollars or pounds." },
      { title: "Filters that match how people search", body: "Buy or rent, location, type, price band, bedrooms. Filters are also landing pages: two bedroom apartments to rent in Cantonments is a search, and it should be a URL." },
      { title: "Speed with a lot of photographs", body: "Property sites are image heavy and most are slow because of it. Images sized and converted on upload, lazy loaded below the fold, and served from a CDN, so the twentieth listing loads as fast as the first." },
    ],
    tier: { slug: "custom", name: "Custom build", why: "A listing catalogue with filters, per property pages, enquiry routing and payment plans is a custom build. A small agency with a handful of properties can start on the Business tier and grow into it." },
    faqs: [
      { q: "How much does a real estate website cost in Ghana?", a: "A listing site with filters, a page per property, enquiry on each listing and payment plans is a custom build, typically GHS 9,000 to 15,000 and quoted after scoping. A small agency with a few properties can start on the Business tier at GHS 4,500 to 6,000." },
      { q: "Can we add and remove listings ourselves?", a: "Yes. A listing is a record with photographs, and adding one is a form. The page, its schema and its place in the filters are generated from the record." },
      { q: "Can buyers abroad see prices in dollars or pounds?", a: "Yes, with a currency toggle at a rate the company sets, labelled as a guide. The price of record stays in cedis or whichever currency the contract uses." },
      { q: "Do individual property pages really rank?", a: "They are the only pages that rank for property searches, because those searches are for a specific type in a specific place. A site with one listings page competes for nothing. Of the twenty five real estate sites we measured, fifteen had no structured data at all, which means none of their properties can appear as a rich result." },
    ],
    modified: "2026-09-21",
  },
];

/* The publish gate. Throws, so the build fails, rather than shipping thin. */
export function publishable(i: Industry): Industry {
  const problems: string[] = [];
  if (i.benchmark.measurable < 12) problems.push(`benchmark has ${i.benchmark.measurable} measurable sites, minimum 12`);
  if (i.needs.length < 3) problems.push(`${i.needs.length} needs, minimum 3`);
  if (i.faqs.length < 3) problems.push(`${i.faqs.length} FAQs, minimum 3`);
  if (i.intro.split(/\s+/).length < 40) problems.push("intro under 40 words");
  if (problems.length) throw new Error(`pseo: /websites-for/${i.slug} is not publishable: ${problems.join("; ")}`);
  return i;
}

export const PUBLISHED_INDUSTRIES = INDUSTRIES.map(publishable);
export const getIndustry = (slug: string) => PUBLISHED_INDUSTRIES.find((i) => i.slug === slug);
