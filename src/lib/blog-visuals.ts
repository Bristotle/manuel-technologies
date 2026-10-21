import lawFirms from "@/lib/research/benchmarks/ghana-law-firms.json";
import hospitals from "@/lib/research/benchmarks/ghana-private-hospitals.json";
import schools from "@/lib/research/benchmarks/ghana-private-schools.json";
import realEstate from "@/lib/research/benchmarks/ghana-real-estate.json";
import UK from "@/lib/research/uk-accountancy-2026.json";
import type { BlogChart, BlogDiagram } from "@/lib/blog-types";

/* --------------------------------------------------------------------------
   One visual per post, placed after the section it illustrates. Added 21
   October 2026, when 14 of 29 posts were text only.

   CHARTS use only our own measurements. Every value is computed here from
   the benchmark files, so a chart always matches the study it cites and
   updates when the study is re-run. Nothing is typed in by hand.

   DIAGRAMS summarise the method the post already describes, step for step.
   They add no claim the text does not make.
   -------------------------------------------------------------------------- */

export type PostVisual = { after: string } & ({ chart: BlogChart } | { diagram: BlogDiagram });

const pct = (n: number, of: number) => Math.round((n / of) * 100);
const secs = (ms: number) => Math.round(ms / 100) / 10;

const SECTORS = [
  { label: "Ghana law firms", b: lawFirms },
  { label: "Ghana private hospitals", b: hospitals },
  { label: "Ghana private schools", b: schools },
  { label: "Ghana real estate", b: realEstate },
];
const ghanaSource = { source: "Manuel Technologies benchmarks of Ghana business websites, September 2026", sourceHref: "/research" };

export const POST_VISUALS: Record<string, PostVisual> = {
  /* ---------------------------------------------------------------- charts */

  "why-ai-cannot-recommend-a-hospital-in-ghana": {
    after: "What we measured, and what refused to be measured",
    chart: {
      title: `What ${hospitals.measurable} private hospital and clinic websites in Ghana are missing`,
      source: `Manuel Technologies benchmark, ${hospitals.measurable} measurable sites of ${hospitals.sampled} sampled, ${hospitals.sampledAt}`,
      sourceHref: "/research/private-hospitals",
      unit: "%",
      bars: [
        { label: "No LocalBusiness or medical organisation schema", value: pct(hospitals.measurable - hospitals.findings.localBusinessSchema, hospitals.measurable), highlight: true },
        { label: "First byte slower than one second", value: pct(hospitals.findings.slowerThan1s, hospitals.measurable) },
        { label: "No structured data of any kind", value: pct(hospitals.findings.noStructuredData, hospitals.measurable) },
        { label: "Not exactly one clear H1", value: pct(hospitals.findings.notOneH1, hospitals.measurable) },
        { label: "No Open Graph tags for sharing", value: pct(hospitals.findings.noOpenGraph, hospitals.measurable) },
        { label: "No XML sitemap", value: pct(hospitals.findings.noSitemap, hospitals.measurable) },
      ],
    },
  },

  "optimise-uk-website-google-ai-overviews": {
    after: "Build the retrieval layer",
    chart: {
      title: `What we found across ${UK.sampled} UK accountancy firm websites`,
      source: `Manuel Technologies study of UK accountancy websites, ${UK.sampledAt}`,
      sourceHref: "/research/uk-accountancy-websites",
      unit: "%",
      bars: [
        { label: "First byte slower than three seconds", value: pct(UK.findings.slowerThan3s, UK.measurable), note: `of ${UK.measurable} measurable` },
        { label: "Not exactly one clear H1", value: pct(UK.findings.notOneH1, UK.measurable), note: `of ${UK.measurable}` },
        { label: "Could not be read by an identified crawler at all", value: pct(UK.refused + UK.challenged, UK.sampled), note: `of ${UK.sampled} sampled`, highlight: true },
        { label: "Name any AI crawler in robots.txt", value: pct(UK.findings.namingAiCrawlers, UK.measurable), note: `of ${UK.measurable}` },
        { label: "No structured data", value: pct(UK.findings.noStructuredData, UK.measurable), note: `of ${UK.measurable}` },
      ],
    },
  },

  "technical-foundations-for-geo": {
    after: "Use structured data as a label",
    chart: {
      title: "Websites with no structured data at all, by sector",
      ...ghanaSource,
      unit: "%",
      bars: [
        ...SECTORS.map((s) => ({ label: s.label, value: pct(s.b.findings.noStructuredData, s.b.measurable), note: `${s.b.measurable} sites` })),
        { label: "UK accountancy firms", value: pct(UK.findings.noStructuredData, UK.measurable), note: `${UK.measurable} sites`, highlight: true },
      ],
    },
  },

  "technical-seo-ai-search-audit": {
    after: "Trace access to understanding",
    chart: {
      title: "Median time to first byte, by sector. web.dev rates 0.8s or less as good",
      ...ghanaSource,
      unit: "s",
      bars: [
        ...SECTORS.map((s) => ({ label: s.label, value: secs(s.b.findings.medianResponseMs), note: `${s.b.measurable} sites` })),
        { label: "UK accountancy firms", value: secs(UK.findings.medianResponseMs), note: `${UK.measurable} sites`, highlight: true },
      ],
    },
  },

  "seo-writing-guide": {
    after: "10. Make the page easy for agents to parse",
    chart: {
      title: "Homepages without exactly one clear H1, by sector",
      ...ghanaSource,
      unit: "%",
      bars: [
        ...SECTORS.map((s) => ({ label: s.label, value: pct(s.b.findings.notOneH1, s.b.measurable), note: `${s.b.measurable} sites`, highlight: s.b === schools })),
        { label: "UK accountancy firms", value: pct(UK.findings.notOneH1, UK.measurable), note: `${UK.measurable} sites` },
      ],
    },
  },

  /* -------------------------------------------------------------- diagrams */

  "programmatic-seo-without-thin-content": {
    after: "Put data quality ahead of volume",
    diagram: {
      title: "A publishing gate for generated pages",
      caption: "Every record passes the gate before it becomes a page. A smaller set of strong pages beats a large set of thin ones.",
      steps: [
        { label: "Define the page job", detail: "Audience, query intent, source data and the decision the page helps someone make." },
        { label: "Check the record", detail: "Source, refresh date, coverage and missing values for every field." },
        { label: "Gate it", detail: "A record below minimum completeness is held or set to noindex, never padded with prose." },
        { label: "Link it", detail: "To a hub, the relevant service page, nearby alternatives and the method page." },
      ],
      loop: "Monitor indexation and duplication. Stop expanding when review cannot keep pace",
    },
  },

  "secure-accessible-website-build-checklist": {
    after: "Ship a maintainable system",
    diagram: {
      title: "The four layers a build is checked against",
      caption: "Each layer is tested on the real flows, not only by an automated scan.",
      steps: [
        { label: "Operable interface", detail: "Semantic markup, keyboard access, visible focus, contrast, reserved space for media." },
        { label: "Smaller attack surface", detail: "Server validation, secrets kept server side, least privilege, secure headers." },
        { label: "Maintainable system", detail: "Clear ownership, reusable components, automated checks on every build." },
        { label: "Measured in the field", detail: "Real-user performance after launch, not only a lab score." },
      ],
    },
  },

  "when-to-build-custom-software": {
    after: "Compare the three paths",
    diagram: {
      title: "Three paths, in order of risk",
      caption: "Take the first path that genuinely fits. Custom software earns its place only when the workflow itself is what sets the business apart.",
      steps: [
        { label: "Configure", detail: "The process is common and an existing product fits. Usually the lowest risk." },
        { label: "Integrate", detail: "The systems are right but the handoff between them is missing." },
        { label: "Build", detail: "The workflow, data model or user experience is genuinely differentiating." },
      ],
      loop: "Whichever path: one complete workflow first, then measure completion time, errors and manual touches",
    },
  },

  "connect-crm-erp-systems-safely": {
    after: "Make every request safe to repeat",
    diagram: {
      title: "A safe sync between two systems",
      caption: "An integration is operational software. It needs an owner, a runbook and a recovery path.",
      steps: [
        { label: "Source of truth", detail: "For each field: the owner, permitted direction and format. Stable external IDs, not names." },
        { label: "Repeatable requests", detail: "Idempotency keys, bounded retries with backoff, timeouts and a dead-letter queue." },
        { label: "Checked boundary", detail: "Validate on arrival, least-privilege credentials, only the data the workflow needs." },
        { label: "Reconciliation", detail: "Scheduled comparisons, with alerts on age, volume, failure rate and drift." },
      ],
      loop: "Rehearse duplicates, partial outages, expired tokens and schema changes",
    },
  },

  "ai-agent-or-fixed-automation": {
    after: "Classify the workflow first",
    diagram: {
      title: "Classify the workflow before choosing the tool",
      caption: "Most workflows a business wants to automate are the second case, and need no model at all.",
      steps: [
        { label: "Write it down", detail: "Trigger, inputs, decisions, tools, output and the cost of a failure." },
        { label: "A decision table covers it", detail: "Fixed automation. More predictable, cheaper and easier to test." },
        { label: "Controlled ambiguity", detail: "A bounded agent: limited tools, validated output, approval for high-impact actions." },
        { label: "Unbounded and irreversible", detail: "Not a fit for an agent. The decision stays with a person." },
      ],
    },
  },

  "introduce-ai-automation-with-control": {
    after: "Roll out with evidence",
    diagram: {
      title: "Introducing automation with a way back at every step",
      caption: "The model may propose an action. Application code decides whether it is allowed.",
      steps: [
        { label: "Reversible first task", detail: "Summarise, classify, route or draft, with a person deciding." },
        { label: "Controlled layer", detail: "Identity, permissions, validation and side effects in code, not in the prompt." },
        { label: "Shadow mode", detail: "Run beside the existing process and compare outputs." },
        { label: "Small live share", detail: "Review errors by category. An owner can pause it at once." },
      ],
      loop: "Monitor drift, output quality, cost and the human override rate",
    },
  },

  "production-ready-ai-agent-architecture": {
    after: "Give tools narrow contracts",
    diagram: {
      title: "Where a production agent's controls sit",
      caption: "Production readiness includes the day two plan, not just the first successful run.",
      steps: [
        { label: "Narrow tools", detail: "Small input schema, a permission boundary, a timeout and a clear error." },
        { label: "Policy layer", detail: "Side effects confirmed, identifiers validated, never assumed." },
        { label: "Accountable retrieval", detail: "Approved sources, access-aware, cited, and able to say the evidence is thin." },
        { label: "Operations", detail: "Traces, a versioned evaluation set, budgets and a fallback workflow." },
      ],
    },
  },

  "measure-ai-automation-performance": {
    after: "Set the baseline first",
    diagram: {
      title: "Three layers of measurement",
      caption: "Count the full workflow, not only how fast the model responds.",
      steps: [
        { label: "Baseline", detail: "Completion time, error rate, manual touches, queue age and cost, before launch." },
        { label: "Quality and friction", detail: "Accepted output, corrections, escalations, reviewer time, cost per completed task." },
        { label: "Business outcome", detail: "Conversion, retention, resolution or margin, against a comparison group where possible." },
      ],
      loop: "Review by version and input mix. Roll back past the agreed threshold",
    },
  },

  "choose-technical-seo-development-partner": {
    after: "Ask to see the mechanism",
    diagram: {
      title: "What to test a partner on, in order",
      caption: "A portfolio image shows an outcome. A working method shows whether it can be repeated.",
      steps: [
        { label: "The mechanism", detail: "Real findings, briefs, release checks, performance traces or runbooks." },
        { label: "Ownership", detail: "Who does the work, who reviews it, who owns the repositories, accounts and data." },
        { label: "Measurement plan", detail: "Baseline, target pages, validation method, leading and lagging indicators." },
        { label: "Working relationship", detail: "Decisions recorded, risks escalated, access protected." },
      ],
    },
  },
};
