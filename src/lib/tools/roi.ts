/* --------------------------------------------------------------------------
   Organic traffic and ROI arithmetic.

   THIS IS ARITHMETIC, NOT A FORECAST, and the distinction is the whole design.

   The usual version of this tool tells a business owner how much revenue they
   are "leaving on the table", which quietly asserts two things it cannot know:
   that the traffic increase is achievable, and that it is achievable by the
   agency showing them the number. Neither is a fact. A prospect who works that
   out has stopped trusting everything else on the site.

   So every output here is a conditional restatement of numbers the user typed
   in: IF sessions rose by this much, THEN at your own conversion rate, close
   rate and customer value, the arithmetic gives this. No uplift is predicted,
   no timescale is implied, and the scenarios are labelled as scenarios.

   The break even calculation is the part that actually helps a buyer, and it
   is the part these tools normally leave out because it can produce an
   uncomfortable answer. It answers the real question: how much more traffic
   would have to arrive before an engagement at this price pays for itself.
   Sometimes that answer is "more than is plausible", and a buyer is better off
   knowing.
   -------------------------------------------------------------------------- */

export type RoiInput = {
  /* Organic sessions per month, today. */
  sessions: number;
  /* Percentage of sessions that become an enquiry. */
  conversionRate: number;
  /* Percentage of enquiries that become a customer. */
  closeRate: number;
  /* Average value of one customer, over the whole relationship. */
  customerValue: number;
  /* Optional. Monthly cost of the work being considered. */
  monthlyInvestment: number;
};

export type Scenario = {
  /* Percentage increase in sessions being modelled. */
  uplift: number;
  sessions: number;
  extraSessions: number;
  extraEnquiries: number;
  extraCustomers: number;
  extraMonthlyValue: number;
  extraAnnualValue: number;
  /* Null when no investment was supplied. */
  roi: number | null;
};

export type RoiResult = {
  baseline: {
    enquiries: number;
    customers: number;
    monthlyValue: number;
    annualValue: number;
    /* What one additional session is worth, at the user's own numbers. This
       is the single most useful figure the tool produces. */
    valuePerSession: number;
  };
  scenarios: Scenario[];
  /* Percentage traffic increase required for the work to pay for itself.
     Null when no investment was given, Infinity when a session is worth
     nothing so no amount of traffic covers the cost. */
  breakEvenUplift: number | null;
};

export const UPLIFTS = [20, 50, 100] as const;

function clampPercent(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 100);
}

function clampPositive(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

export function calculateRoi(input: RoiInput): RoiResult {
  const sessions = clampPositive(input.sessions);
  const conversionRate = clampPercent(input.conversionRate) / 100;
  const closeRate = clampPercent(input.closeRate) / 100;
  const customerValue = clampPositive(input.customerValue);
  const investment = clampPositive(input.monthlyInvestment);

  const enquiries = sessions * conversionRate;
  const customers = enquiries * closeRate;
  const monthlyValue = customers * customerValue;
  const valuePerSession = sessions > 0 ? monthlyValue / sessions : 0;

  const scenarios: Scenario[] = UPLIFTS.map((uplift) => {
    const extraSessions = sessions * (uplift / 100);
    const extraEnquiries = extraSessions * conversionRate;
    const extraCustomers = extraEnquiries * closeRate;
    const extraMonthlyValue = extraCustomers * customerValue;

    return {
      uplift,
      sessions: sessions + extraSessions,
      extraSessions,
      extraEnquiries,
      extraCustomers,
      extraMonthlyValue,
      extraAnnualValue: extraMonthlyValue * 12,
      /* Return on the monthly spend, as a multiple. Null rather than a
         misleading zero when no cost was entered. */
      roi: investment > 0 ? extraMonthlyValue / investment : null,
    };
  });

  let breakEvenUplift: number | null = null;
  if (investment > 0) {
    breakEvenUplift =
      valuePerSession > 0 && sessions > 0
        ? (investment / valuePerSession / sessions) * 100
        : Infinity;
  }

  return {
    baseline: {
      enquiries,
      customers,
      monthlyValue,
      annualValue: monthlyValue * 12,
      valuePerSession,
    },
    scenarios,
    breakEvenUplift,
  };
}

export function formatMoney(value: number, currency = "GBP"): string {
  if (!Number.isFinite(value)) return "n/a";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

export function formatNumber(value: number, dp = 1): string {
  if (!Number.isFinite(value)) return "n/a";
  const rounded = Number(value.toFixed(dp));
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: Number.isInteger(rounded) ? 0 : dp,
  }).format(rounded);
}

export const CURRENCIES = [
  { code: "GBP", symbol: "£" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GHS", symbol: "₵" },
  { code: "AED", symbol: "د.إ" },
] as const;
