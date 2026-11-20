/* --------------------------------------------------------------------------
   Open roles. One place, read by /careers and each role page, and the
   source of every role's JobPosting schema.

   Added 20 November 2026. The first hires sell in the Western, Central and
   Western North regions, where the business is growing first, so candidates
   living there are given favourable consideration. Other regions follow.

   Facts only. Pay, commission, allowance and contract terms were set by
   Emmanuel on 20 November 2026 (GHS 1,500 base, 10% commission on clients
   who pay in full, a data bundle and airtime paid every two weeks, 6 month
   contract extended on performance). The role sells MPOS only, not websites. Nothing else is promised: an advert that offers a perk the
   business then withholds is worse than one that never mentioned it.

   Numbering in candidate facing steps is in Roman numerals (house rule for
   posted content, 19 November 2026).
   -------------------------------------------------------------------------- */

export type Role = {
  slug: string;
  title: string;
  summary: string;
  pay: { amount: number; currency: "GHS"; unit: "MONTH"; label: string };
  commission: string;
  allowances: string;
  contract: string;
  type: string;
  employmentType: readonly ("FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY")[];
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
      "Sell MPOS, our point of sale system, to shops, restaurants, salons and pharmacies in the Western, Central and Western North regions. Training is on the job.",
    pay: { amount: 1500, currency: "GHS", unit: "MONTH", label: "GHS 1,500 a month" },
    commission: "10% commission on every client who pays in full",
    allowances: "Data bundle and airtime, paid every two weeks",
    contract: "6 month contract, extended on performance",
    type: "Full time, 6 month contract",
    employmentType: ["FULL_TIME", "TEMPORARY"],
    regions: ["Western", "Central", "Western North"],
    posted: "2026-11-20",
    closes: "2026-12-31",
    open: true,
  },
] as const;

export const roleBySlug = (slug: string) => ROLES.find((r) => r.slug === slug);

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;
