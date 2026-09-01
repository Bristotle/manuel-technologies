import type { Band, ChecklistItem } from "@/lib/tools/checklist";

/* Programmatic SEO indexation risk.
   ---------------------------------------------------------------------------
   This one scores RISK, so it runs the shared engine inverted: every box
   describes a problem, and ticking it counts against you. A high score here is
   a warning, not an achievement, and the bands say so.

   The subject matter is first hand. This site's own diagnosis found a sitemap
   stamping build time on every URL, and the rule that a page set differing
   only by a place name should not exist is the one stated on our own
   programmatic SEO page. Every item below is a failure seen in the wild.
   -------------------------------------------------------------------------- */

export const PROGRAMMATIC_ITEMS: ChecklistItem[] = [
  /* ---- The pages themselves ------------------------------------------- */
  {
    id: "only-variable",
    group: "The pages",
    label: "Two pages can differ only by a place name or a product name",
    why: "This is the single strongest predictor of a set being crawled once and never indexed. If the variable is the only difference, the set should not exist.",
    weight: 5,
  },
  {
    id: "thin",
    group: "The pages",
    label: "Some generated pages carry under 300 words of unique content",
    why: "Google evaluates the template, not the page. A thin minority drags the assessment of the whole set.",
    weight: 4,
  },
  {
    id: "no-unique-data",
    group: "The pages",
    label: "There is no unique data point per page, only rearranged copy",
    why: "A real local price, a real count, a real availability figure. Without one, there is nothing for the page to be the best answer to.",
    weight: 5,
  },
  {
    id: "no-gate",
    group: "The pages",
    label: "Incomplete records still publish a page",
    why: "A completeness threshold enforced in the build is the difference between a page set and a liability. It should fail the build, not a policy document.",
    weight: 4,
  },

  /* ---- Crawl and index ------------------------------------------------ */
  {
    id: "lastmod-build",
    group: "Crawl and index",
    label: "Sitemap lastmod changes on every deploy",
    why: "Telling Google that thousands of pages changed when none did is how a site loses the one crawl scheduling signal it has. Google stops trusting lastmod entirely.",
    weight: 5,
  },
  {
    id: "one-sitemap",
    group: "Crawl and index",
    label: "Everything sits in one flat sitemap file",
    why: "Above a few thousand URLs you need one sitemap per cluster, or coverage reporting gives you a single number and no diagnosis.",
    weight: 3,
  },
  {
    id: "no-monitoring",
    group: "Crawl and index",
    label: "Indexation is not tracked per cluster",
    why: "Without it you cannot tell which segment is working, so you keep adding to the one that is not.",
    weight: 4,
  },
  {
    id: "ssr-on-demand",
    group: "Crawl and index",
    label: "Generated pages render on demand rather than being static or ISR",
    why: "Slow server rendering across thousands of URLs burns crawl budget that is already limited on a young domain.",
    weight: 3,
  },

  /* ---- Architecture --------------------------------------------------- */
  {
    id: "orphans",
    group: "Architecture",
    label: "Generated pages are reachable only from the sitemap",
    why: "A sitemap is a suggestion. Pages with no internal links pointing at them land in \"discovered, currently not indexed\" and stay there.",
    weight: 5,
  },
  {
    id: "no-hub",
    group: "Architecture",
    label: "There is no hub page grouping the set",
    why: "A hub gives the cluster a parent, distributes authority into it, and gives a human somewhere to land.",
    weight: 3,
  },
  {
    id: "no-cross-links",
    group: "Architecture",
    label: "Generated pages do not link to each other",
    why: "Nearby alternatives and related records make the set navigable for a person and traversable for a crawler.",
    weight: 3,
  },
  {
    id: "canonical-unclear",
    group: "Architecture",
    label: "Near duplicate variants exist without a clear canonical",
    why: "Filter and sort parameters generating crawlable variants is how a thousand page set becomes a hundred thousand page problem.",
    weight: 4,
  },

  /* ---- Data ----------------------------------------------------------- */
  {
    id: "no-provenance",
    group: "Data",
    label: "You cannot say where each field came from or when it was refreshed",
    why: "Unsourced figures are the ones that turn out to be wrong in public, and stale data is worse than no data.",
    weight: 4,
  },
  {
    id: "invented-fills",
    group: "Data",
    label: "Gaps in the data are filled with generated prose",
    why: "Writing around a missing number is how a page set stops being useful and starts being noise.",
    weight: 5,
  },
  {
    id: "no-owner",
    group: "Data",
    label: "Nobody owns the dataset after launch",
    why: "Programmatic pages are a maintenance commitment. Without an owner the set decays quietly and takes the domain's assessment with it.",
    weight: 3,
  },
];

export const PROGRAMMATIC_BANDS: Band[] = [
  {
    min: 85,
    label: "Low risk",
    verdict:
      "The foundations are in place. Scale carefully and keep watching indexation per cluster as the set grows.",
  },
  {
    min: 60,
    label: "Publishable, with fixes first",
    verdict:
      "Nothing here is fatal, but the items below will limit how much of the set gets indexed. Fix them before adding volume, not after.",
  },
  {
    min: 35,
    label: "High risk",
    verdict:
      "Shipping at scale in this state will likely produce a set that is crawled once and largely ignored, and that verdict is hard to reverse once given.",
  },
  {
    min: 0,
    label: "Do not ship yet",
    verdict:
      "Enough of the failure modes are present that volume will make the whole domain harder to index, not just the new pages. Fix the top five below first.",
  },
];
