import type { Metadata } from "next";
import Link from "next/link";
import { AuditForm } from "@/components/audit/AuditForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/site";

/* Free audit. REF, higglo.io/free-seo-audit.
   ---------------------------------------------------------------------------
   Taken: the page's job and its shape. A URL box high on the page, a headline
   score with pillar sub scores, a ranked action list, an explanation of what
   the report covers, a numbered how it works band, and an FAQ.

   NOT TAKEN, and this is the important part. The reference promises to show
   "how ChatGPT, Claude, Gemini and Perplexity perceive your brand", an AI
   Share of Voice against named competitors, and per model citation tracking.
   We cannot measure any of that, so we do not claim it. Doing so would be the
   exact failure CLAUDE.md section 9 warns about: borrowing another firm's
   claims along with their layout.

   What we do instead is measure what actually governs whether an answer engine
   can use a page: whether its crawler is admitted in robots.txt, whether the
   markup says what the page is, whether there are sections worth quoting, and
   whether the page is reachable and fast. All of it is fetched live, and every
   individual check is shown with its evidence so nothing has to be taken on
   trust.

   The tool is above the fold and works before any of the marketing copy is
   read, which is the point of a free tool page. */

export const metadata: Metadata = {
  title: "Free SEO and GEO audit",
  description:
    "Audit any live page in fifteen seconds. Real measurements of crawlability, indexation, structured data and AI crawler access, with a ranked plan.",
  alternates: { canonical: "/free-audit" },
  openGraph: {
    title: `Free SEO and GEO audit | ${SITE.name}`,
    description:
      "We fetch your page, its robots.txt and its sitemap, measure what we find, and rank what to fix.",
    url: `${SITE.url}/free-audit`,
  },
};

const COVERAGE = [
  {
    code: "R.01",
    title: "Crawl and indexation",
    body: "Status, redirects, canonical, meta robots, and whether the page can be indexed at all.",
    points: ["Self referencing canonical check", "noindex detection", "Redirect chain"],
  },
  {
    code: "R.02",
    title: "AI crawler access",
    body: "Your robots.txt parsed against six named AI crawlers, because a blocked crawler cannot cite you.",
    points: ["GPTBot, ClaudeBot, PerplexityBot", "Google-Extended, Applebot-Extended, CCBot", "Wildcard rules resolved"],
  },
  {
    code: "R.03",
    title: "Structured data",
    body: "Every JSON-LD block parsed, with the schema types it declares listed back to you.",
    points: ["Types actually found", "Open Graph presence", "Markup versus visible content"],
  },
  {
    code: "R.04",
    title: "Content depth",
    body: "Word count, heading structure, text to markup ratio, and image alt coverage.",
    points: ["Body word count", "H2 and H3 structure", "Alt text coverage"],
  },
  {
    code: "R.05",
    title: "Technical health",
    body: "Measured server response, HTML weight, HTTPS, viewport, and declared language.",
    points: ["Time to first byte, measured", "HTML payload size", "Mobile viewport"],
  },
  {
    code: "R.06",
    title: "Discovery",
    body: "robots.txt and XML sitemap located, fetched and counted, plus internal link volume.",
    points: ["Sitemap found and counted", "Declared in robots.txt", "Internal link count"],
  },
];

const STEPS = [
  {
    step: "01",
    title: "Drop in your URL",
    body: "No account and no email. We normalise what you type, so yourcompany.com is enough.",
    time: "Instant",
  },
  {
    step: "02",
    title: "We fetch it live",
    body: "The page, its robots.txt and its sitemap are fetched from our servers and parsed.",
    time: "About 5 seconds",
  },
  {
    step: "03",
    title: "Everything is measured",
    body: "Twenty checks across four pillars, each scored from what was actually observed rather than estimated.",
    time: "Immediate",
  },
  {
    step: "04",
    title: "Claude ranks the fixes",
    body: "The measurements go to Claude, which orders them by what will move the result most. It reads the data; it never supplies a number.",
    time: "About 10 seconds",
  },
];

const FAQS = [
  {
    q: "Is it actually free?",
    a: "Yes, and there is no email gate. You get the full report on screen, including every individual check and the evidence behind it. We would rather show the work than describe it.",
  },
  {
    q: "Do you store my site or my results?",
    a: "No. The page is fetched, measured, scored and returned to your browser. Nothing about your site is written to a database, and there is no account to create.",
  },
  {
    q: "Can you tell me how ChatGPT or Gemini describe my brand?",
    a: "No, and be careful of any tool that says it can. We do not query those systems, so we do not report on them. What we do measure is whether their crawlers are allowed to read your page at all, which is the part you control and the part that has to be right first.",
  },
  {
    q: "Are the scores real, or generated by the model?",
    a: "Real. Every score comes from a measurement taken during the crawl, calculated in code. The model is given those measurements and asked to rank the fixes. It cannot change a score and it is never asked to guess at one.",
  },
  {
    q: "Why does it only audit one page?",
    a: "Because a single page can be measured honestly in fifteen seconds, and most problems show up on the homepage anyway. A full site crawl is a different job with a different cost, and we would rather do the small thing properly than the big thing vaguely.",
  },
  {
    q: "What if my score is bad?",
    a: "Then you have a ranked list of what to fix and can work through it yourself. Everything in the report is something your own developer can action. If you would rather we did it, the call is fifteen minutes.",
  },
];

export default function FreeAudit() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Free SEO and GEO audit",
      url: `${SITE.url}/free-audit`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      description:
        "Audits a live page for crawlability, indexation, structured data, AI crawler access, content depth and technical health.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Free audit", item: `${SITE.url}/free-audit` },
      ],
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero, with the tool in it */}
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        {/* Aurora, palette locked. The tool is the product demo, so this is
            the one hero that earns a moving background. */}
        <div aria-hidden="true" className="mt-aurora pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span>Free audit</span>
          </div>

          <div className="mt-10 max-w-[760px]">
            <SectionLabel>Free SEO and GEO audit</SectionLabel>
            <h1 className="mt-6">
              Audit any live page in{" "}
              <span className="text-mt-purple">about fifteen seconds.</span>
            </h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              We fetch your page, your robots.txt and your sitemap, measure
              twenty things across crawlability, structured data, AI crawler
              access, content and technical health, then rank what to fix. Every
              check shows the evidence behind it. No account, no email, nothing
              stored.
            </p>
          </div>

          <div className="mt-12">
            <AuditForm />
          </div>

          <dl className="mt-12 grid gap-8 border-t border-mt-border pt-8 sm:grid-cols-4">
            {[
              ["20", "Checks run"],
              ["6", "AI crawlers read"],
              ["~15s", "Turnaround"],
              ["£0", "Always"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                  {label}
                </dt>
                <dd className="mt-2 text-2xl font-extrabold tracking-tight text-mt-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* What it covers */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>What the report covers</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">
            Six layers, and every one of them{" "}
            <span className="text-mt-purple">measured, not guessed.</span>
          </h2>

          <div className="mt-reveal-group mt-14 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border md:grid-cols-2 lg:grid-cols-3">
            {COVERAGE.map((item) => (
              <div key={item.code} className="flex flex-col gap-4 bg-white p-7">
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                  {item.code}
                </span>
                <h3 className="!text-xl !tracking-tight">{item.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-mt-slate">
                  {item.body}
                </p>
                <ul className="mt-2 flex flex-col gap-2 border-t border-mt-border pt-4">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="text-[0.875rem] leading-relaxed text-mt-muted"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">Four steps. No email gate.</h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            The scoring runs in code, from what the crawl actually observed.
            Claude reads those measurements and ranks the fixes. It is never
            asked to supply a number, because a score a model invented is not a
            score.
          </p>

          <div className="mt-reveal-group mt-14 grid gap-8 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">
                  STEP {s.step}
                </span>
                <h3 className="mt-4 !text-lg !tracking-tight">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                  {s.body}
                </p>
                <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                  {s.time}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Honesty band */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>What this does not do</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">
            We will not tell you what ChatGPT thinks of you.
          </h2>
          <div className="mt-10 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                Plenty of audit tools now report an AI visibility score across
                four assistants, a share of voice against your competitors, and
                a count of how often each model cites you. Ask how it was
                measured and the answer is usually that it was not.
              </p>
              <p>
                We do not query those systems, so we do not report on them. What
                we measure instead is the part you actually control and the part
                that has to be right before any of it matters.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                If GPTBot is disallowed in your robots.txt, no amount of content
                strategy will get you quoted, and that is a one line fix most
                sites have never checked. If your page carries no structured
                data and two headings, there is nothing for a retrieval system
                to lift.
              </p>
              <p className="font-semibold text-mt-ink">
                Every number in your report came from a request we made to your
                site while you waited. You can check any of them yourself, and
                we show you the evidence so you can.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">What people ask about the audit.</h2>

          <div className="mt-reveal-group mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {FAQS.map((f) => (
              <article key={f.q} className="border-t border-mt-border pt-6">
                <h3 className="!text-lg !tracking-tight">{f.q}</h3>
                <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-mt-slate">
                  {f.a}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-mt-border pt-8">
            <p className="max-w-[65ch] text-lg leading-relaxed">
              Want the fixes done rather than listed?
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/contact">Book a 15 minute call</Button>
              <Button href="/agency-vs-engineer" variant="secondary">
                How we work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
