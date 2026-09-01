/* --------------------------------------------------------------------------
   Google Business Profile checklist.

   A self assessment, and it says so. We cannot read anyone's profile: there is
   no public API that returns another business's completeness, and scraping the
   map pack would be both unreliable and against Google's terms. So this scores
   what the user tells us, which is honest, instant, free to run, and still
   genuinely useful because most of these items are things owners have simply
   never been told about.

   The weights are not decoration. They are ordered by how much each item is
   understood to move local visibility and conversion, so the action plan
   surfaces the heaviest unchecked items first rather than listing everything
   at once. Primary category outranks photo cadence, and the tool should say so
   rather than treating a checklist as a flat list.

   No email gate. The reference brief for this tool proposed sending the action
   plan to an inbox. That conflicts with what /free-audit already promises on
   this site, and a gate costs more in abandoned sessions than it earns in
   addresses.
   -------------------------------------------------------------------------- */

export type GbpItem = {
  id: string;
  group: string;
  label: string;
  /* Why it matters, in one sentence. Shown under the item. */
  why: string;
  /* 1 to 5. Higher means it moves the needle more. */
  weight: number;
};

export const GBP_ITEMS: GbpItem[] = [
  /* ---- Foundations ---------------------------------------------------- */
  {
    id: "verified",
    group: "Foundations",
    label: "The profile is verified",
    why: "An unverified profile can be edited by anyone and is heavily suppressed in the map pack.",
    weight: 5,
  },
  {
    id: "primary-category",
    group: "Foundations",
    label: "The primary category is the most specific one available",
    why: "Primary category is the single strongest relevance signal in local search. Specific beats broad.",
    weight: 5,
  },
  {
    id: "secondary-categories",
    group: "Foundations",
    label: "Relevant secondary categories are added",
    why: "Secondary categories widen the queries you are eligible for without diluting the primary one.",
    weight: 3,
  },
  {
    id: "nap",
    group: "Foundations",
    label: "Name, address and phone match your website exactly",
    why: "Inconsistent details across the web split your signals and slow verification.",
    weight: 4,
  },
  {
    id: "hours",
    group: "Foundations",
    label: "Opening hours are set, including holiday hours",
    why: "Wrong hours generate one star reviews from people who arrived to a closed door.",
    weight: 3,
  },
  {
    id: "service-area",
    group: "Foundations",
    label: "Service area or address is set correctly for how you trade",
    why: "A service area business hiding its address, or a shopfront hiding behind a service area, both underperform.",
    weight: 3,
  },

  /* ---- Content -------------------------------------------------------- */
  {
    id: "description",
    group: "Content",
    label: "The description is written and uses your real service language",
    why: "It rarely drives ranking but it is read by humans at the moment of choosing.",
    weight: 2,
  },
  {
    id: "services",
    group: "Content",
    label: "Individual services or products are listed",
    why: "Service items create matches for long tail queries that the category alone will not.",
    weight: 4,
  },
  {
    id: "attributes",
    group: "Content",
    label: "Attributes are filled in",
    why: "Accessibility, payment and amenity attributes are filter criteria, so missing them removes you from filtered results.",
    weight: 3,
  },
  {
    id: "website-link",
    group: "Content",
    label: "The website link points to a relevant page, not just the homepage",
    why: "Sending map traffic to a page that answers the query converts better than dropping everyone on the homepage.",
    weight: 3,
  },

  /* ---- Media ---------------------------------------------------------- */
  {
    id: "photos-recent",
    group: "Media",
    label: "Photos have been added in the last month",
    why: "Recency is a freshness signal and profiles with current photos see more interaction.",
    weight: 3,
  },
  {
    id: "photos-range",
    group: "Media",
    label: "Exterior, interior, team and work photos are all present",
    why: "Exterior shots help people physically find you. Work shots do the persuading.",
    weight: 2,
  },
  {
    id: "logo-cover",
    group: "Media",
    label: "Logo and cover image are set",
    why: "These are the first thing seen in the pack and an empty one reads as abandoned.",
    weight: 2,
  },

  /* ---- Reviews -------------------------------------------------------- */
  {
    id: "review-flow",
    group: "Reviews",
    label: "You have a repeatable way of asking for reviews",
    why: "Review velocity matters more than total count. A steady trickle beats a burst two years ago.",
    weight: 5,
  },
  {
    id: "review-replies",
    group: "Reviews",
    label: "Every review has a reply, including the negative ones",
    why: "Replies are visible to every future reader and are the cheapest trust signal available.",
    weight: 4,
  },
  {
    id: "review-recency",
    group: "Reviews",
    label: "You have received a review in the last month",
    why: "A profile whose newest review is a year old reads as a business that has stopped trading.",
    weight: 4,
  },

  /* ---- Activity ------------------------------------------------------- */
  {
    id: "posts",
    group: "Activity",
    label: "Posts are published at least monthly",
    why: "Posts occupy space in your listing and give returning searchers something current to see.",
    weight: 2,
  },
  {
    id: "qa",
    group: "Activity",
    label: "The questions section is seeded and monitored",
    why: "Anyone can answer a question about your business. If you do not, a competitor or a confused stranger will.",
    weight: 3,
  },
  {
    id: "messaging",
    group: "Activity",
    label: "Messaging is either enabled and answered, or switched off",
    why: "Enabled messaging that nobody answers is worse than no messaging at all.",
    weight: 2,
  },
  {
    id: "utm",
    group: "Activity",
    label: "Profile links are tagged so you can see the traffic in analytics",
    why: "Without tagging, map pack traffic is invisible and the work cannot be justified later.",
    weight: 3,
  },
];

export const GBP_GROUPS = [
  "Foundations",
  "Content",
  "Media",
  "Reviews",
  "Activity",
] as const;

export type GbpResult = {
  score: number;
  band: string;
  verdict: string;
  earned: number;
  total: number;
  /* Unchecked items, heaviest first. The action plan. */
  actions: GbpItem[];
  groups: { group: string; score: number; earned: number; total: number }[];
};

export function scoreGbp(checked: Record<string, boolean>): GbpResult {
  const total = GBP_ITEMS.reduce((a, i) => a + i.weight, 0);
  const earned = GBP_ITEMS.reduce(
    (a, i) => a + (checked[i.id] ? i.weight : 0),
    0,
  );
  const score = Math.round((earned / total) * 100);

  const groups = GBP_GROUPS.map((group) => {
    const own = GBP_ITEMS.filter((i) => i.group === group);
    const t = own.reduce((a, i) => a + i.weight, 0);
    const e = own.reduce((a, i) => a + (checked[i.id] ? i.weight : 0), 0);
    return { group, score: Math.round((e / t) * 100), earned: e, total: t };
  });

  const actions = GBP_ITEMS.filter((i) => !checked[i.id]).sort(
    (a, b) => b.weight - a.weight,
  );

  const { band, verdict } =
    score >= 90
      ? {
          band: "Well run",
          verdict:
            "Little left to fix on the profile itself. Further gains will come from the website behind it and from review velocity rather than from more checkboxes.",
        }
      : score >= 70
        ? {
            band: "Solid, with gaps",
            verdict:
              "The foundations are mostly there. The unchecked items below are ordered by weight, so working down from the top is the fastest route.",
          }
        : score >= 45
          ? {
              band: "Half built",
              verdict:
                "Enough is missing that you are losing visibility you have already paid for in other ways. The first three actions below are worth an afternoon.",
            }
          : {
              band: "Largely unattended",
              verdict:
                "This is the cheapest visibility available to a local business and almost none of it is in place. Nothing below requires a budget, only an hour and someone to own it.",
            };

  return { score, band, verdict, earned, total, actions, groups };
}
