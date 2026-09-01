/* --------------------------------------------------------------------------
   Shared weighted checklist engine.

   Three tools score a self assessment: the Google Business Profile checker,
   the enquiry funnel friction tester, and the programmatic SEO risk index.
   They differ only in their items, their weights and their bands, so the
   scoring lives here once.

   WHY WEIGHTED RATHER THAN A COUNT. A flat checklist tells someone that
   choosing the right primary category and posting weekly are the same size of
   job. They are not, and a tool that implies otherwise sends people to spend
   an afternoon on the wrong item. The weight is the useful part: it is what
   lets the action list come back in the order worth doing.

   Some checklists score RISK rather than completeness, where ticking an item
   is bad news. `invert` handles that, so the programmatic SEO index can share
   this engine without pretending a high score is a good score.
   -------------------------------------------------------------------------- */

export type ChecklistItem = {
  id: string;
  group: string;
  label: string;
  /* One sentence on why it matters. Shown under the item, and it is most of
     the value of these tools: people have often never been told. */
  why: string;
  /* 1 to 5. Higher moves the outcome more. */
  weight: number;
};

export type Band = {
  /* Minimum score for this band, inclusive. Order does not matter. */
  min: number;
  label: string;
  verdict: string;
};

export type ChecklistResult = {
  score: number;
  band: string;
  verdict: string;
  earned: number;
  total: number;
  /* Outstanding items, heaviest first. The action plan. */
  actions: ChecklistItem[];
  groups: { group: string; score: number; earned: number; total: number }[];
};

export function scoreChecklist(
  items: ChecklistItem[],
  checked: Record<string, boolean>,
  bands: Band[],
  /* When true, a ticked box counts against the score. Used by risk indexes,
     where the boxes describe problems rather than achievements. */
  invert = false,
): ChecklistResult {
  const counts = (item: ChecklistItem) => {
    const ticked = Boolean(checked[item.id]);
    return invert ? !ticked : ticked;
  };

  const total = items.reduce((a, i) => a + i.weight, 0);
  const earned = items.reduce((a, i) => a + (counts(i) ? i.weight : 0), 0);
  const score = total === 0 ? 0 : Math.round((earned / total) * 100);

  const groupNames = [...new Set(items.map((i) => i.group))];
  const groups = groupNames.map((group) => {
    const own = items.filter((i) => i.group === group);
    const t = own.reduce((a, i) => a + i.weight, 0);
    const e = own.reduce((a, i) => a + (counts(i) ? i.weight : 0), 0);
    return { group, score: t === 0 ? 0 : Math.round((e / t) * 100), earned: e, total: t };
  });

  const actions = items
    .filter((i) => !counts(i))
    .sort((a, b) => b.weight - a.weight);

  const band =
    [...bands].sort((a, b) => b.min - a.min).find((b) => score >= b.min) ??
    bands[bands.length - 1];

  return {
    score,
    band: band.label,
    verdict: band.verdict,
    earned,
    total,
    actions,
    groups,
  };
}
