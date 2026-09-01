import type { Band, ChecklistItem } from "@/lib/tools/checklist";

/* B2B enquiry funnel friction.
   ---------------------------------------------------------------------------
   Bottom of funnel only. Everything here is about the stretch between someone
   arriving on a service page and a brief being agreed, which is where high
   ticket sites lose people quietly and never find out.

   Weighted by how often each one is the actual cause. Response time inside an
   hour outranks nearly everything else on this list and is the item most
   often missing. */

export const FUNNEL_ITEMS: ChecklistItem[] = [
  /* ---- The page ------------------------------------------------------- */
  {
    id: "one-action",
    group: "The page",
    label: "Each service page has one obvious next action",
    why: "Three competing calls to action perform worse than one. A visitor choosing between them usually chooses none.",
    weight: 4,
  },
  {
    id: "price-signal",
    group: "The page",
    label: "There is a price signal somewhere before the form",
    why: "A range, a starting point, or a typical engagement size. Its absence is the single most common reason a qualified buyer leaves without asking.",
    weight: 5,
  },
  {
    id: "proof-adjacent",
    group: "The page",
    label: "Proof sits next to the ask, not on a separate page",
    why: "A case study one click away is a case study most people never open. The evidence has to be where the decision happens.",
    weight: 4,
  },
  {
    id: "who-its-for",
    group: "The page",
    label: "The page says who it is not for",
    why: "Disqualifying badly matched enquiries raises close rate and makes the ones you do get easier to price.",
    weight: 3,
  },

  /* ---- The form ------------------------------------------------------- */
  {
    id: "field-count",
    group: "The form",
    label: "The form asks for six fields or fewer",
    why: "Every field past the sixth measurably reduces completion. Ask for what you need to reply, not what you need to quote.",
    weight: 4,
  },
  {
    id: "no-phone-required",
    group: "The form",
    label: "Phone number is optional, or you explain why it is required",
    why: "A required phone field on a first enquiry reads as a commitment to being called, and a large share of buyers will not make it.",
    weight: 3,
  },
  {
    id: "error-handling",
    group: "The form",
    label: "Validation errors are specific and appear next to the field",
    why: "A generic failure message at the top of a long form is where a completed enquiry dies.",
    weight: 3,
  },
  {
    id: "mobile-form",
    group: "The form",
    label: "The form has been completed on a real phone, recently",
    why: "Most B2B forms are tested on the machine they were built on. The keyboard covering the submit button is not visible from there.",
    weight: 4,
  },
  {
    id: "confirmation",
    group: "The form",
    label: "The confirmation says what happens next and when",
    why: "\"Thanks, we will be in touch\" starts an anxious wait. A named person and a timeframe does not.",
    weight: 3,
  },

  /* ---- The reply ------------------------------------------------------ */
  {
    id: "response-time",
    group: "The reply",
    label: "Enquiries get a human reply within one working hour",
    why: "This is the highest impact item on the list by a distance. Response time inside an hour changes conversion more than any page change.",
    weight: 5,
  },
  {
    id: "reply-deliverable",
    group: "The reply",
    label: "Replies land in the inbox, not in spam",
    why: "If SPF, DKIM and DMARC are not aligned, some share of your answers are never read and you will never hear about it.",
    weight: 4,
  },
  {
    id: "owner",
    group: "The reply",
    label: "One named person owns unanswered enquiries",
    why: "Shared inboxes with no owner are where enquiries go when everyone assumes somebody else replied.",
    weight: 4,
  },
  {
    id: "no-dead-end",
    group: "The reply",
    label: "A no is still answered",
    why: "The people you decline talk to the people you want. It costs one paragraph.",
    weight: 2,
  },

  /* ---- The evidence --------------------------------------------------- */
  {
    id: "tracking",
    group: "The evidence",
    label: "You can say how many enquiries came from organic search last month",
    why: "Without this the whole funnel is opinion, and no change to it can be judged.",
    weight: 5,
  },
  {
    id: "drop-off",
    group: "The evidence",
    label: "You know how many people start the form and do not finish",
    why: "Starts versus completions is the cheapest diagnostic available and almost nobody measures it.",
    weight: 4,
  },
  {
    id: "source-quality",
    group: "The evidence",
    label: "Enquiry quality is tracked by source, not just volume",
    why: "A channel producing many bad enquiries looks like a win in a volume report and a loss in the sales team.",
    weight: 3,
  },
];

export const FUNNEL_BANDS: Band[] = [
  {
    min: 88,
    label: "Tight",
    verdict:
      "Little friction left in the path itself. Further gains will come from getting more of the right people to it rather than from changing it.",
  },
  {
    min: 68,
    label: "Working, with leaks",
    verdict:
      "The path holds up but there are gaps worth closing. The items below are ordered by how often each is the actual cause.",
  },
  {
    min: 42,
    label: "Leaking",
    verdict:
      "Enough is missing that you are losing enquiries you have already paid to attract. The top three below are usually a day's work between them.",
  },
  {
    min: 0,
    label: "Losing most of them",
    verdict:
      "The traffic is probably not the problem. Fix the bottom of this funnel before spending anything on the top of it.",
  },
];
