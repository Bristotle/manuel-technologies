/* --------------------------------------------------------------------------
   Retainer versus building it once.

   THE TRAP THIS TOOL HAS TO AVOID. An agency building a calculator that
   compares "paying an agency" against "hiring us to build it" has an obvious
   thumb on the scale, and a buyer can feel it. So the model is deliberately
   fair to the retainer, and the page says out loud what a retainer buys that a
   build does not:

   - Ongoing attention. Somebody is looking at it every month, which a
     finished asset does not give you.
   - Flexibility. Priorities can move month to month.
   - No capital outlay and no delivery risk carried by you.

   Those are real and the arithmetic cannot capture them, so the tool states
   them rather than pretending the only variable is money.

   What the arithmetic CAN show honestly is the crossover: the month at which
   cumulative retainer spend passes the cumulative cost of building and
   maintaining the same thing. Sometimes that month is beyond any horizon the
   business cares about, and in that case the retainer is the right answer.
   The tool says so when the numbers say so.
   -------------------------------------------------------------------------- */

export type RetainerInput = {
  /* Current monthly retainer. */
  monthlyRetainer: number;
  /* Months already paid, so far. Sunk, but people want to see it. */
  monthsPaid: number;
  /* One off cost of building the equivalent as an owned asset. */
  buildCost: number;
  /* Monthly cost of keeping the built thing running: hosting, updates, the
     occasional change. Never zero in reality. */
  buildMonthlyUpkeep: number;
  /* How far ahead to model. */
  horizonMonths: number;
};

export type RetainerResult = {
  sunk: number;
  horizon: number;
  retainerTotal: number;
  buildTotal: number;
  difference: number;
  /* Month at which build becomes cheaper cumulatively. Null when it never
     does within any horizon, because upkeep meets or exceeds the retainer. */
  crossoverMonth: number | null;
  /* True when the crossover falls beyond the horizon the user chose. */
  crossoverBeyondHorizon: boolean;
  /* Per month series for the chart. */
  series: { month: number; retainer: number; build: number }[];
};

function positive(v: number): number {
  return Number.isFinite(v) && v > 0 ? v : 0;
}

export function calculateRetainer(input: RetainerInput): RetainerResult {
  const monthly = positive(input.monthlyRetainer);
  const monthsPaid = Math.round(positive(input.monthsPaid));
  const buildCost = positive(input.buildCost);
  const upkeep = positive(input.buildMonthlyUpkeep);
  const horizon = Math.max(1, Math.round(positive(input.horizonMonths) || 36));

  const series: { month: number; retainer: number; build: number }[] = [];
  let crossoverMonth: number | null = null;

  for (let m = 1; m <= horizon; m++) {
    const retainer = monthly * m;
    const build = buildCost + upkeep * m;
    series.push({ month: m, retainer, build });
    if (crossoverMonth === null && build <= retainer) crossoverMonth = m;
  }

  /* If it has not crossed inside the horizon, work out whether it ever would.
     It only can when the monthly retainer exceeds ongoing upkeep. */
  let crossoverBeyondHorizon = false;
  if (crossoverMonth === null && monthly > upkeep) {
    const m = buildCost / (monthly - upkeep);
    if (Number.isFinite(m) && m > 0) {
      crossoverMonth = Math.ceil(m);
      crossoverBeyondHorizon = true;
    }
  }

  const retainerTotal = monthly * horizon;
  const buildTotal = buildCost + upkeep * horizon;

  return {
    sunk: monthly * monthsPaid,
    horizon,
    retainerTotal,
    buildTotal,
    difference: retainerTotal - buildTotal,
    crossoverMonth,
    crossoverBeyondHorizon,
    series,
  };
}
