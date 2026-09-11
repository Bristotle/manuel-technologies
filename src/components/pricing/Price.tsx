import { CURRENCIES, money } from "@/lib/pricing";

/* A price in three currencies, one span each, server rendered. CSS keyed on
   the nearest [data-currency] ancestor shows exactly one. Outside a
   CurrencyScope, the GHS span shows by default, so the component is safe to
   use in a blog post that has no toggle. */

type Props =
  | { value: number; per?: string; from?: boolean }
  | { from: number; to: number; per?: string };

export function Price(props: Props) {
  return (
    <>
      {CURRENCIES.map((c) => {
        const text =
          "to" in props
            ? `${money(props.from, c)} to ${money(props.to, c)}`
            : `${props.from ? "From " : ""}${money(props.value, c)}`;
        return (
          <span key={c} data-ccy={c} className="mt-price">
            {text}
            {props.per ? <span className="text-[0.7em] font-normal text-mt-muted">/{props.per}</span> : null}
          </span>
        );
      })}
    </>
  );
}
