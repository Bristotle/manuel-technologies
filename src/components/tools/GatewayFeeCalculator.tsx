"use client";

import { useState } from "react";
import { CALCULABLE, METHOD_NAMES } from "@/lib/gateways";

/* Fee calculator. State for the inputs, so it earns "use client". It runs
   only on rates read from a provider's own page; unverified gateways are
   not in the list at all rather than guessed. */

export function GatewayFeeCalculator() {
  const [amount, setAmount] = useState(500);
  const [orders, setOrders] = useState(100);
  const rows = CALCULABLE.map((c) => {
    const fee = (amount * c.rate) / 100;
    return { ...c, fee, net: amount - fee, monthly: fee * orders };
  }).sort((a, b) => a.fee - b.fee);
  const f = (n: number) => `GHS ${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Typical order value, GHS
          <input type="number" min={1} step={10} value={amount} onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 0))} className="contact-input" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Orders a month
          <input type="number" min={1} step={10} value={orders} onChange={(e) => setOrders(Math.max(1, Number(e.target.value) || 0))} className="contact-input" />
        </label>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead><tr className="border-b border-mt-border">{["Gateway", "Method", "Rate", "Fee per order", "You receive", "Fees a month"].map((h) => <th key={h} className="px-3 py-3 font-[family-name:var(--font-mono)] text-[0.625rem] font-bold uppercase tracking-[0.14em] text-mt-muted">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-mt-border">
            {rows.map((r) => (
              <tr key={r.slug + r.method}>
                <td className="px-3 py-3 font-semibold text-mt-ink">{r.gateway}</td>
                <td className="px-3 py-3 text-mt-slate">{METHOD_NAMES[r.method]}</td>
                <td className="px-3 py-3 font-[family-name:var(--font-mono)] text-mt-slate">{r.rate}%</td>
                <td className="px-3 py-3 font-[family-name:var(--font-mono)] text-mt-slate">{f(r.fee)}</td>
                <td className="px-3 py-3 font-[family-name:var(--font-mono)] text-mt-ink">{f(r.net)}</td>
                <td className="px-3 py-3 font-[family-name:var(--font-mono)] text-mt-ink">{f(r.monthly)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-mt-muted">Percentage fees only, at the published rate. Excludes any per session USSD charge, payout transfer fees, and gateways whose rates are not published. Nothing is stored.</p>
    </div>
  );
}
