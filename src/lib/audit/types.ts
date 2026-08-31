/* Shared types for the free audit. Client and server both read these, so
   nothing secret belongs in here. */

export type Pillar = "seo" | "answerEngine" | "content" | "technical";

export type CheckStatus = "pass" | "warn" | "fail" | "info";

export type Check = {
  id: string;
  pillar: Pillar;
  label: string;
  status: CheckStatus;
  /* What we actually observed. This is measured, never inferred. */
  evidence: string;
  /* Points contributed out of `weight`. */
  score: number;
  weight: number;
};

export type PillarScore = {
  pillar: Pillar;
  label: string;
  score: number;
  checks: Check[];
};

export type CrawlerAccess = {
  name: string;
  /* True when the crawler is not disallowed for the audited path. */
  allowed: boolean;
  /* True when robots.txt names this crawler explicitly, either way. */
  named: boolean;
};

export type AuditFacts = {
  url: string;
  finalUrl: string;
  redirected: boolean;
  status: number;
  /* Milliseconds to first byte, measured. */
  ttfbMs: number;
  htmlBytes: number;
  https: boolean;
  lang: string | null;
  viewport: boolean;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  canonical: string | null;
  canonicalSelfReferencing: boolean | null;
  robotsMeta: string | null;
  noindex: boolean;
  h1s: string[];
  headingCounts: Record<string, number>;
  wordCount: number;
  textToHtmlRatio: number;
  images: number;
  imagesMissingAlt: number;
  internalLinks: number;
  externalLinks: number;
  schemaTypes: string[];
  hasOpenGraph: boolean;
  robotsTxtFound: boolean;
  sitemapDeclared: boolean;
  sitemapFound: boolean;
  sitemapUrlCount: number | null;
  crawlers: CrawlerAccess[];
  scriptCount: number;
  stylesheetCount: number;
  fetchedAt: string;
};

export type Advice = {
  headline: string;
  summary: string;
  actions: {
    rank: number;
    title: string;
    why: string;
    effort: "Under an hour" | "Half a day" | "A few days" | "Ongoing";
    severity: "Critical" | "High" | "Medium" | "Low";
  }[];
  strengths: string[];
};

export type AuditReport = {
  facts: AuditFacts;
  overall: number;
  pillars: PillarScore[];
  advice: Advice | null;
  /* Set when the model could not be reached. The measured half of the report
     still renders, because it does not depend on the model. */
  adviceError: string | null;
  durationMs: number;
};
