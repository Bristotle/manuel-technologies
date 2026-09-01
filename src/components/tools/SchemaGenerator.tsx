"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/* JSON-LD generator.

   Entirely client side. No API, no email gate. The brief for this tool
   proposed asking for an email before the code could be copied; that
   contradicts what every other tool on this site promises, and gating a code
   snippet that the visitor can read on screen anyway is theatre.

   THE RULE THE OUTPUT ENFORCES: schema describes what is visible on the page.
   Empty fields are omitted from the output rather than emitted as blanks,
   because a property asserting nothing is worse than an absent one, and
   marking up a claim a reader cannot see is how a site loses trust with search
   and answer engines at the same time. The page says so next to the output. */

type SchemaType = "Organization" | "LocalBusiness" | "Service" | "FAQPage";

type Field = {
  key: string;
  label: string;
  placeholder: string;
  hint?: string;
  multi?: boolean;
};

const FIELDS: Record<SchemaType, Field[]> = {
  Organization: [
    { key: "name", label: "Organisation name", placeholder: "Manuel Technologies" },
    { key: "url", label: "Website", placeholder: "https://example.com" },
    { key: "logo", label: "Logo URL", placeholder: "https://example.com/logo.svg" },
    { key: "description", label: "Description", placeholder: "What the organisation does, in one sentence." },
    { key: "email", label: "Contact email", placeholder: "hello@example.com" },
    { key: "sameAs", label: "Profile URLs", placeholder: "https://linkedin.com/company/...\nhttps://github.com/...", multi: true, hint: "One per line. These connect the site to a known entity." },
  ],
  LocalBusiness: [
    { key: "name", label: "Business name", placeholder: "Example Dental" },
    { key: "url", label: "Website", placeholder: "https://example.com" },
    { key: "telephone", label: "Telephone", placeholder: "+44 20 7000 0000" },
    { key: "streetAddress", label: "Street address", placeholder: "12 High Street" },
    { key: "addressLocality", label: "Town or city", placeholder: "Bolton" },
    { key: "postalCode", label: "Postcode", placeholder: "BL1 1AA" },
    { key: "addressCountry", label: "Country code", placeholder: "GB" },
    { key: "priceRange", label: "Price range", placeholder: "££" },
    { key: "openingHours", label: "Opening hours", placeholder: "Mo-Fr 09:00-17:30\nSa 10:00-14:00", multi: true, hint: "One per line, in schema.org format." },
  ],
  Service: [
    { key: "name", label: "Service name", placeholder: "Technical SEO" },
    { key: "description", label: "Description", placeholder: "What the service covers." },
    { key: "url", label: "Service page URL", placeholder: "https://example.com/services/seo" },
    { key: "providerName", label: "Provider name", placeholder: "Manuel Technologies" },
    { key: "providerUrl", label: "Provider website", placeholder: "https://example.com" },
    { key: "areaServed", label: "Area served", placeholder: "United Kingdom" },
    { key: "serviceType", label: "Service type", placeholder: "Search engine optimisation" },
  ],
  FAQPage: [
    { key: "faqs", label: "Questions and answers", placeholder: "How long does it take?\nUsually four to six weeks, depending on scope.\n\nDo you offer support?\nYes, ongoing support is available after launch.", multi: true, hint: "Question on one line, answer on the next, blank line between pairs." },
  ],
};

const NOTES: Record<SchemaType, string> = {
  Organization: "Belongs in the root layout so it appears once per site, not once per page.",
  LocalBusiness: "Use the most specific subtype you can. Dentist beats LocalBusiness, and specificity is a relevance signal.",
  Service: "One per service page. The description should match the copy on that page, not a generic version of it.",
  FAQPage: "Only mark up questions that are visibly answered on the page. Hidden FAQ markup is a manual action risk.",
};

function clean(v: string) {
  return v.trim();
}

function buildSchema(type: SchemaType, values: Record<string, string>) {
  const v = (k: string) => clean(values[k] ?? "");
  const lines = (k: string) =>
    v(k).split("\n").map((l) => l.trim()).filter(Boolean);

  if (type === "FAQPage") {
    const blocks = v("faqs").split(/\n\s*\n/).map((b) => b.split("\n").map((l) => l.trim()).filter(Boolean));
    const pairs = blocks
      .filter((b) => b.length >= 2)
      .map((b) => ({
        "@type": "Question",
        name: b[0],
        acceptedAnswer: { "@type": "Answer", text: b.slice(1).join(" ") },
      }));
    if (pairs.length === 0) return null;
    return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: pairs };
  }

  if (type === "Service") {
    if (!v("name")) return null;
    const out: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: v("name"),
    };
    if (v("serviceType")) out.serviceType = v("serviceType");
    if (v("description")) out.description = v("description");
    if (v("url")) out.url = v("url");
    if (v("areaServed")) out.areaServed = v("areaServed");
    if (v("providerName")) {
      const p: Record<string, unknown> = { "@type": "Organization", name: v("providerName") };
      if (v("providerUrl")) p.url = v("providerUrl");
      out.provider = p;
    }
    return out;
  }

  if (type === "LocalBusiness") {
    if (!v("name")) return null;
    const out: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: v("name"),
    };
    if (v("url")) out.url = v("url");
    if (v("telephone")) out.telephone = v("telephone");
    if (v("priceRange")) out.priceRange = v("priceRange");
    const addr: Record<string, unknown> = { "@type": "PostalAddress" };
    if (v("streetAddress")) addr.streetAddress = v("streetAddress");
    if (v("addressLocality")) addr.addressLocality = v("addressLocality");
    if (v("postalCode")) addr.postalCode = v("postalCode");
    if (v("addressCountry")) addr.addressCountry = v("addressCountry");
    if (Object.keys(addr).length > 1) out.address = addr;
    if (lines("openingHours").length) out.openingHours = lines("openingHours");
    return out;
  }

  if (!v("name")) return null;
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: v("name"),
  };
  if (v("url")) out.url = v("url");
  if (v("logo")) out.logo = v("logo");
  if (v("description")) out.description = v("description");
  if (v("email")) out.email = v("email");
  if (lines("sameAs").length) out.sameAs = lines("sameAs");
  return out;
}

export function SchemaGenerator() {
  const [type, setType] = useState<SchemaType>("Organization");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const schema = useMemo(() => buildSchema(type, values), [type, values]);
  const snippet = schema
    ? `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    : null;

  async function copy() {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked. The snippet is on screen and selectable anyway. */
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-[18px] border border-mt-border bg-white p-6 sm:p-8">
        <span className="mt-label">What to describe</span>
        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(FIELDS) as SchemaType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setType(t); setValues({}); }}
              className={`min-h-11 whitespace-nowrap rounded-[20px] border px-4 py-2 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.12em] transition-colors duration-150 ${
                type === t
                  ? "border-mt-purple bg-mt-surface text-mt-purple"
                  : "border-mt-border text-mt-slate hover:border-mt-purple hover:text-mt-purple"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mt-5 text-[0.8125rem] leading-relaxed text-mt-muted">{NOTES[type]}</p>

        <div className="mt-8 flex flex-col gap-6">
          {FIELDS[type].map((f) => (
            <label key={f.key} className="block text-sm font-semibold text-mt-ink">
              {f.label}
              {f.multi ? (
                <textarea
                  rows={f.key === "faqs" ? 8 : 3}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="contact-input mt-2 block w-full"
                />
              ) : (
                <input
                  type="text"
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="contact-input mt-2 block w-full"
                />
              )}
              {f.hint && (
                <span className="mt-2 block text-[0.8125rem] font-normal leading-relaxed text-mt-muted">
                  {f.hint}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="overflow-hidden rounded-[18px] border border-mt-border">
          <div className="flex items-center justify-between gap-4 border-b border-mt-border bg-mt-surface px-6 py-4">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
              Paste into the head, or anywhere in the body
            </span>
            <button
              type="button"
              onClick={copy}
              disabled={!snippet}
              className="min-h-11 whitespace-nowrap rounded-[10px] border border-mt-border bg-white px-4 py-2 text-sm font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple disabled:opacity-40"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="max-h-[32rem] overflow-auto bg-mt-ink px-6 py-6 font-[family-name:var(--font-mono)] text-[0.8125rem] leading-relaxed text-white/85">
{snippet ?? "Fill in at least the first field and the markup appears here."}
          </pre>
        </div>

        <div className="rounded-[18px] border border-mt-border bg-mt-surface p-6 sm:p-8">
          <span className="mt-label">Before you paste it</span>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-mt-slate">
            Schema is a label, not an argument. Every property here must
            describe something a visitor can actually see on the page. Marking
            up a claim that is not visible is a manual action risk and, more to
            the point, it is the fastest way to lose trust with search and
            answer engines at once.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
            Empty fields are left out of the output rather than emitted blank,
            because a property asserting nothing is worse than an absent one.
            Validate the result in Google&rsquo;s Rich Results Test, then check
            the deployed URL rather than the local build.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/free-audit" className="mt-sheen relative inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light">
              Check what schema your site already has
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
