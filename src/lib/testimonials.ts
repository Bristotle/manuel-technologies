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
  /* Confirmed permission to publish. Required. */
  permission: boolean;
};

export const TESTIMONIALS: Testimonial[] = [];

/* Only entries with confirmed permission are ever rendered. */
export const PUBLISHABLE_TESTIMONIALS = TESTIMONIALS.filter(
  (item) => item.permission,
);
