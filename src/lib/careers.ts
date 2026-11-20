/* --------------------------------------------------------------------------
   Open roles. One place, read by /careers and each role page, and the
   source of every role's JobPosting schema.

   Added 20 November 2026. The first hires sell in the Western, Central and
   Western North regions, where the business is growing first, so candidates
   living there are given favourable consideration. Other regions follow.

   Facts only. No commission rates, allowances or contract terms appear here
   until Emmanuel confirms them: a job advert that promises a perk the
   business then withholds is worse than one that never mentioned it.

   Numbering in candidate facing steps is in Roman numerals (house rule for
   posted content, 19 November 2026).
   -------------------------------------------------------------------------- */

export type Role = {
  slug: string;
  title: string;
  summary: string;
  pay: { amount: number; currency: "GHS"; unit: "MONTH"; label: string };
  type: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
  regions: readonly string[];
  posted: string;
  closes: string;
  open: boolean;
};

export const ROLES: readonly Role[] = [
  {
    slug: "tech-sales-representative",
    title: "Tech Sales Representative",
    summary:
      "Sell MPOS and our websites to shops, restaurants, salons and pharmacies in the Western, Central and Western North regions. Training is on the job.",
    pay: { amount: 2000, currency: "GHS", unit: "MONTH", label: "GHS 2,000 a month" },
    type: "Full time, field sales",
    employmentType: "FULL_TIME",
    regions: ["Western", "Central", "Western North"],
    posted: "2026-11-20",
    closes: "2026-12-31",
    open: true,
  },
] as const;

export const roleBySlug = (slug: string) => ROLES.find((r) => r.slug === slug);

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;
