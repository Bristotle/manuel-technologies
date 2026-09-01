/* --------------------------------------------------------------------------
   Manual task automation arithmetic, with the headcount tipping point folded
   in rather than split into a second tool. They answer the same question from
   two directions and splitting them would make both weaker.

   HONESTY CONSTRAINTS, because this is the calculator most likely to lie:

   1. Automation almost never removes 100% of a task. Exceptions, escalations
      and the reviewing of what the system did all remain. The residual share
      is an input with a sane default, not a hidden assumption, and it cannot
      be set to zero.
   2. Build cost and running cost are real and are inputs. A payback period
      that ignores what the thing costs to build is marketing, not arithmetic.
   3. Saved hours are only money if the time is actually reallocated. A team
      that keeps the same headcount and does more work has gained capacity, not
      cash, and the tool says so rather than printing a salary saving.
   -------------------------------------------------------------------------- */

export type AutomationInput = {
  /* People doing the task. */
  people: number;
  /* Hours each, per week. */
  hoursPerWeek: number;
  /* Fully loaded hourly cost, not salary divided by 2080. */
  hourlyCost: number;
  /* Share of the task that still needs a person afterwards, 0 to 100.
     Exceptions, approvals, and checking the output. */
  residual: number;
  /* One off cost to build it. */
  buildCost: number;
  /* Ongoing monthly cost: licences, tokens, hosting, maintenance. */
  monthlyRunCost: number;
};

export type AutomationResult = {
  current: {
    weeklyHours: number;
    annualHours: number;
    annualCost: number;
  };
  automated: {
    /* Hours still spent by a person after automation. */
    weeklyHours: number;
    annualHours: number;
    annualCost: number;
  };
  savings: {
    weeklyHours: number;
    annualHours: number;
    /* Gross annual saving before the cost of running it. */
    grossAnnual: number;
    /* After running costs. */
    netAnnual: number;
    /* Full time equivalents freed, at 37.5 hours a week. */
    fte: number;
  };
  /* Months until the build cost is recovered. Infinity when it never is. */
  paybackMonths: number;
  /* Return over three years, as a multiple of total cost. Null when there is
     no cost at all. */
  threeYearReturn: number | null;
  /* True when the net annual saving does not cover the running cost. */
  neverPaysBack: boolean;
};

const WORKING_WEEKS = 46; /* 52 less holiday and bank holidays */
const FTE_HOURS = 37.5;

function positive(v: number): number {
  return Number.isFinite(v) && v > 0 ? v : 0;
}

export function calculateAutomation(input: AutomationInput): AutomationResult {
  const people = positive(input.people);
  const hoursPerWeek = positive(input.hoursPerWeek);
  const hourlyCost = positive(input.hourlyCost);
  /* Floored at 5%: a workflow needing zero human involvement afterwards is
     not a workflow anyone should model. */
  const residual = Math.min(Math.max(positive(input.residual), 5), 100) / 100;
  const buildCost = positive(input.buildCost);
  const monthlyRunCost = positive(input.monthlyRunCost);

  const weeklyHours = people * hoursPerWeek;
  const annualHours = weeklyHours * WORKING_WEEKS;
  const annualCost = annualHours * hourlyCost;

  const autoWeekly = weeklyHours * residual;
  const autoAnnual = autoWeekly * WORKING_WEEKS;
  const autoCost = autoAnnual * hourlyCost;

  const savedWeekly = weeklyHours - autoWeekly;
  const savedAnnual = annualHours - autoAnnual;
  const grossAnnual = annualCost - autoCost;
  const netAnnual = grossAnnual - monthlyRunCost * 12;

  const neverPaysBack = netAnnual <= 0;
  const paybackMonths = neverPaysBack
    ? Infinity
    : buildCost === 0
      ? 0
      : buildCost / (netAnnual / 12);

  const totalThreeYearCost = buildCost + monthlyRunCost * 36;
  const threeYearReturn =
    totalThreeYearCost > 0 ? (grossAnnual * 3) / totalThreeYearCost : null;

  return {
    current: { weeklyHours, annualHours, annualCost },
    automated: { weeklyHours: autoWeekly, annualHours: autoAnnual, annualCost: autoCost },
    savings: {
      weeklyHours: savedWeekly,
      annualHours: savedAnnual,
      grossAnnual,
      netAnnual,
      fte: savedWeekly / FTE_HOURS,
    },
    paybackMonths,
    threeYearReturn,
    neverPaysBack,
  };
}

export const WORKING_WEEKS_PER_YEAR = WORKING_WEEKS;
export const HOURS_PER_FTE = FTE_HOURS;
