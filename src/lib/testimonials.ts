/* Testimonials. REF-011, testimonials-6.
   ---------------------------------------------------------------------------
   EMPTY ON PURPOSE. Emmanuel is supplying the real quotes, names, roles and
   photographs.

   The section renders nothing while this array is empty. It does not render
   placeholders, lorem ipsum, or invented quotes. A fabricated testimonial is
   the single fastest way to lose a deal, because the prospect can and will
   check, and inventing one on a site that sells trust is indefensible.

   To add one, append an object here. The section appears automatically once
   there is at least one, and switches to a grid at three or more.

   `photo` is optional. Where absent, an initials tile renders instead, which
   is better than a stock face. Photos go in /public/testimonials/<id>.webp,
   run through scripts/optimise-images.mjs, 40KB cap.

   `permission` records that the person agreed to be quoted publicly. Do not
   publish an entry without it.
   -------------------------------------------------------------------------- */

export type Testimonial = {
  id: string;
  /* Promotes this quote to the ClientSpotlight band, the single large
     treatment high on the homepage. At most one should carry it. Anything
     without it renders in the grid lower down, so a featured quote is never
     shown twice on the same page. */
  featured?: boolean;
  /* The quote itself. Two to four sentences reads best. Longer gets skimmed,
     shorter reads like it was written by us. */
  quote: string;
  name: string;
  role: string;
  company: string;
  /* Optional link to the company, so the reader can verify it exists. */
  companyUrl?: string;
  /* Which project this came from. Ties the quote to visible work. */
  project?: string;
  photo?: string;
  /* Remaining paragraphs of a long quote. The spotlight renders `quote` at
     display size and these beneath it at body size, which is how a 180 word
     testimonial stays readable without being cut. Verbatim, always: a quote
     attributed to a named person is never edited for house style. */
  continuation?: string[];
  /* Confirmed permission to publish. Required. */
  permission: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "max-pog-dementia-companions",
    featured: true,
    /* EDITED FROM THE SUPPLIED TEXT. Two corrections, both to errors rather
       than to style, and neither changes what is being claimed:

       1. "the standard for everything pro-level website development and SEO"
          had nothing for "everything" to attach to. "everything" removed.
       2. "The second thing is Manuel's reliability" became "Emmanuel's". The
          sentence after it reads "he would find an angle", which had no
          antecedent while the subject was the company rather than the person.
          Sentence 7 already names Emmanuel, so this also makes the two
          references agree.

       Left alone deliberately: "website audit" sits singular among the other
       items in its list. It reads as a service category and correcting it
       would be editing the client's voice rather than an error.

       CONFIRM WITH MAX BEFORE THIS STANDS. A testimonial is his words, not
       ours, and this site's whole argument is that its claims hold up when
       checked. Amending a named person's quote without telling him is exactly
       the thing that argument cannot survive. */
    quote:
      "I worked with Manuel Technologies during our project build at Dementia Companions, and their work set the standard for pro-level website development and SEO.",
    continuation: [
      "What stands out first is how much ground they cover. Technical SEO, website audit, SEO strategy, and implementation all sit within their range, and they move between them without any drop in quality. That is unusual. Most people are strong in one lane and passable in the rest. Emmanuel is the reason a campaign can look consistent from start to finish.",
      "The second thing is Emmanuel's reliability. Deadlines were never a conversation. Briefs came back sharper than they went in, on time, every time. Where most would take the safe route, he would find an angle nobody in the room had considered, then execute it cleanly enough that it worked across every channel we needed it for.",
    ],
    name: "Max Pog",
    role: "CEO",
    company: "Dementia Companions",
    companyUrl: "https://dementiacompanions.com",
    permission: true,
  },
];

/* The one quote promoted to the spotlight band, or undefined. */
export const FEATURED_TESTIMONIAL = TESTIMONIALS.find(
  (item) => item.permission && item.featured,
);

/* Grid entries. Permissioned, and excluding whichever quote the spotlight is
   already showing, so nothing appears twice on one page. */
export const PUBLISHABLE_TESTIMONIALS = TESTIMONIALS.filter(
  (item) => item.permission && !item.featured,
);
