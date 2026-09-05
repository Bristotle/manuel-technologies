import { safeFetch } from "@/lib/audit/fetch";
import type {
  AuditFacts,
  Check,
  CrawlerAccess,
  Pillar,
  PillarScore,
} from "@/lib/audit/types";

/* --------------------------------------------------------------------------
   Audit engine.

   THE RULE THIS FILE EXISTS TO ENFORCE. Every number in the report is derived
   from something we actually fetched and measured. The model interprets these
   facts and ranks the fixes. It never supplies a score, a measurement, or a
   claim about a page it has not been shown.

   That distinction is the whole product. Our own blog says a tool must not
   claim to have crawled a URL or invent measurements, and the free tools were
   built to that rule. This one genuinely crawls, so it can genuinely measure,
   and the model's job is judgement rather than invention.

   WHAT WE DELIBERATELY DO NOT CLAIM. The reference site this page is modelled
   on reports how ChatGPT, Gemini and Perplexity "perceive your brand", plus an
   AI share of voice against competitors. We cannot measure any of that, so we
   do not report it. What we can measure, and what actually governs whether an
   answer engine can use a page at all, is access and structure: which AI
   crawlers robots.txt admits, whether the markup describes what is visible,
   and whether the page answers anything. That is what the answer engine
   pillar scores.
   -------------------------------------------------------------------------- */

export const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

const PILLAR_LABELS: Record<Pillar, string> = {
  seo: "SEO signals",
  answerEngine: "Answer engine",
  content: "Content depth",
  technical: "Technical health",
};

function textOf(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1].trim() : null;
}

function metaContent(html: string, nameOrProperty: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)\\s*=\\s*["']${nameOrProperty}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re);
  return tag ? attr(tag[0], "content") : null;
}

/* Is this actually a robots.txt, or something else wearing its URL?

   Found while running a study across 56 accountancy sites: five of them sat
   behind a Cloudflare challenge, so /robots.txt returned the "Just a moment..."
   interstitial as HTML. The parser below splits lines on ":" and looks for
   user-agent and disallow, and an HTML document full of CSS and CSP directives
   produced phantom rules. Every one of those five was reported as blocking
   GPTBot, ClaudeBot, Google-Extended, Applebot-Extended and CCBot. None of
   them was. The tool was confidently wrong about five real companies.

   So the body is checked before it is parsed. A robots.txt is plain text and
   opens with a directive or a comment. Anything containing markup is not one,
   and the honest answer there is "we could not read it", not a fabricated list
   of blocked crawlers. */
function looksLikeRobotsTxt(body: string): boolean {
  const head = body.slice(0, 2000).toLowerCase();
  if (head.includes("<html") || head.includes("<!doctype") || head.includes("<script")) {
    return false;
  }
  /* A real robots.txt has at least one directive we recognise. An empty file
     is legal and means everything is allowed, so treat blank as valid. */
  if (body.trim() === "") return true;
  return /^\s*(user-agent|disallow|allow|sitemap|crawl-delay)\s*:/im.test(body);
}

/* robots.txt, parsed only as far as we need: does a named agent get a blanket
   disallow. Deliberately conservative, because reporting a site as blocked
   when it is not would be worse than saying nothing. */
export { looksLikeRobotsTxt };

export function parseRobots(robotsTxt: string, path: string): CrawlerAccess[] {
  const lines = robotsTxt
    .split("\n")
    .map((l) => l.replace(/#.*$/, "").trim())
    .filter(Boolean);

  const groups: { agents: string[]; disallow: string[] }[] = [];
  let current: { agents: string[]; disallow: string[] } | null = null;
  let lastWasAgent = false;

  for (const line of lines) {
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(":").trim();

    if (key === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (key === "disallow" && current) {
      current.disallow.push(value);
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }

  const blockedFor = (agent: string) => {
    const lower = agent.toLowerCase();
    const specific = groups.find((g) => g.agents.includes(lower));
    const wildcard = groups.find((g) => g.agents.includes("*"));
    const group = specific ?? wildcard;
    if (!group) return false;
    return group.disallow.some((rule) => rule === "/" || (rule && path.startsWith(rule)));
  };

  return AI_CRAWLERS.map((name) => ({
    name,
    allowed: !blockedFor(name),
    named: groups.some((g) => g.agents.includes(name.toLowerCase())),
  }));
}

export async function gatherFacts(inputUrl: string): Promise<AuditFacts> {
  const page = await safeFetch(inputUrl);
  const html = page.body;
  const final = new URL(page.finalUrl);
  const origin = final.origin;

  const text = textOf(html);
  const words = text ? text.split(" ").filter(Boolean).length : 0;

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : null;

  const canonicalTag = html.match(/<link[^>]+rel\s*=\s*["']canonical["'][^>]*>/i);
  const canonical = canonicalTag ? attr(canonicalTag[0], "href") : null;

  const robotsMeta = metaContent(html, "robots");

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );

  const headingCounts: Record<string, number> = {};
  for (const level of ["h1", "h2", "h3", "h4"]) {
    headingCounts[level] = (
      html.match(new RegExp(`<${level}[\\s>]`, "gi")) || []
    ).length;
  }

  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imagesMissingAlt = imgTags.filter((t) => attr(t, "alt") === null).length;

  const hrefs = [...html.matchAll(/<a\b[^>]+href\s*=\s*["']([^"']+)["']/gi)].map(
    (m) => m[1],
  );
  let internalLinks = 0;
  let externalLinks = 0;
  for (const href of hrefs) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const resolved = new URL(href, origin);
      if (resolved.origin === origin) internalLinks++;
      else externalLinks++;
    } catch {
      /* Unparseable href, ignore rather than guess. */
    }
  }

  const schemaTypes = [
    ...new Set(
      [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
        .flatMap((m) => {
          try {
            const parsed = JSON.parse(m[1].trim());
            const nodes = Array.isArray(parsed)
              ? parsed
              : parsed["@graph"] && Array.isArray(parsed["@graph"])
                ? parsed["@graph"]
                : [parsed];
            return nodes
              .map((n: unknown) =>
                typeof n === "object" && n !== null
                  ? (n as Record<string, unknown>)["@type"]
                  : null,
              )
              .flat();
          } catch {
            return [];
          }
        })
        .filter((t): t is string => typeof t === "string"),
    ),
  ];

  /* robots.txt and sitemap, best effort. A failure here is a finding, not an
     error, so neither is allowed to abort the audit. */
  let robotsTxtFound = false;
  let sitemapDeclared = false;
  let crawlers: CrawlerAccess[] = AI_CRAWLERS.map((name) => ({
    name,
    allowed: true,
    named: false,
  }));
  let sitemapUrl = `${origin}/sitemap.xml`;

  try {
    const robots = await safeFetch(`${origin}/robots.txt`, { accept: "text/plain" });
    if (
      robots.status === 200 &&
      robots.body.length < 500_000 &&
      looksLikeRobotsTxt(robots.body)
    ) {
      robotsTxtFound = true;
      crawlers = parseRobots(robots.body, final.pathname || "/");
      const declared = robots.body.match(/^\s*sitemap:\s*(\S+)/im);
      if (declared) {
        sitemapDeclared = true;
        sitemapUrl = declared[1];
      }
    }
  } catch {
    /* Treated as "no robots.txt", which is what a crawler would conclude. */
  }

  let sitemapFound = false;
  let sitemapUrlCount: number | null = null;
  try {
    const sitemap = await safeFetch(sitemapUrl, { accept: "application/xml,text/xml" });
    if (sitemap.status === 200 && /<(urlset|sitemapindex)/i.test(sitemap.body)) {
      sitemapFound = true;
      sitemapUrlCount = (sitemap.body.match(/<loc>/gi) || []).length;
    }
  } catch {
    /* Same. */
  }

  const canonicalSelfReferencing = canonical
    ? (() => {
        try {
          const c = new URL(canonical, origin);
          return (
            c.origin === final.origin &&
            c.pathname.replace(/\/$/, "") === final.pathname.replace(/\/$/, "")
          );
        } catch {
          return false;
        }
      })()
    : null;

  const metaDescription = metaContent(html, "description");

  return {
    url: inputUrl,
    finalUrl: page.finalUrl,
    redirected: page.redirected,
    status: page.status,
    ttfbMs: page.ttfbMs,
    htmlBytes: page.bytes,
    https: final.protocol === "https:",
    lang: (html.match(/<html[^>]*\blang\s*=\s*["']([^"']+)["']/i) || [, null])[1],
    viewport: metaContent(html, "viewport") !== null,
    title,
    titleLength: title?.length ?? 0,
    metaDescription,
    metaDescriptionLength: metaDescription?.length ?? 0,
    canonical,
    canonicalSelfReferencing,
    robotsMeta,
    noindex: /noindex/i.test(robotsMeta ?? ""),
    h1s,
    headingCounts,
    wordCount: words,
    textToHtmlRatio: page.bytes > 0 ? text.length / page.bytes : 0,
    images: imgTags.length,
    imagesMissingAlt,
    internalLinks,
    externalLinks,
    schemaTypes,
    hasOpenGraph: /property\s*=\s*["']og:/i.test(html),
    robotsTxtFound,
    sitemapDeclared,
    sitemapFound,
    sitemapUrlCount,
    crawlers,
    scriptCount: (html.match(/<script\b/gi) || []).length,
    stylesheetCount: (html.match(/<link[^>]+rel\s*=\s*["']stylesheet["']/gi) || []).length,
    fetchedAt: new Date().toISOString(),
  };
}

function check(
  id: string,
  pillar: Pillar,
  label: string,
  weight: number,
  outcome: { status: Check["status"]; score: number; evidence: string },
): Check {
  return { id, pillar, label, weight, ...outcome };
}

export function scoreFacts(f: AuditFacts): {
  overall: number;
  pillars: PillarScore[];
} {
  const checks: Check[] = [];

  /* ---- SEO signals ------------------------------------------------------ */
  checks.push(
    check("title", "seo", "Title tag", 10, !f.title
      ? { status: "fail", score: 0, evidence: "No title tag found." }
      : f.titleLength < 15 || f.titleLength > 65
        ? { status: "warn", score: 5, evidence: `Title is ${f.titleLength} characters. Aim for 15 to 65.` }
        : { status: "pass", score: 10, evidence: `${f.titleLength} characters: "${f.title}"` }),
  );

  checks.push(
    check("description", "seo", "Meta description", 8, !f.metaDescription
      ? { status: "fail", score: 0, evidence: "No meta description." }
      : f.metaDescriptionLength < 70 || f.metaDescriptionLength > 165
        ? { status: "warn", score: 4, evidence: `${f.metaDescriptionLength} characters. Aim for 70 to 165.` }
        : { status: "pass", score: 8, evidence: `${f.metaDescriptionLength} characters.` }),
  );

  checks.push(
    check("h1", "seo", "Single H1", 8, f.h1s.length === 1
      ? { status: "pass", score: 8, evidence: `One H1: "${f.h1s[0].slice(0, 90)}"` }
      : f.h1s.length === 0
        ? { status: "fail", score: 0, evidence: "No H1 on the page." }
        : { status: "warn", score: 3, evidence: `${f.h1s.length} H1 elements. Use one.` }),
  );

  checks.push(
    check("canonical", "seo", "Canonical tag", 8, f.canonical === null
      ? { status: "warn", score: 3, evidence: "No canonical tag. Duplicates cannot be resolved." }
      : f.canonicalSelfReferencing
        ? { status: "pass", score: 8, evidence: `Self referencing: ${f.canonical}` }
        : { status: "warn", score: 3, evidence: `Points elsewhere: ${f.canonical}` }),
  );

  checks.push(
    check("indexable", "seo", "Indexable", 10, f.noindex
      ? { status: "fail", score: 0, evidence: `Meta robots says "${f.robotsMeta}". This page cannot rank.` }
      : { status: "pass", score: 10, evidence: "No noindex directive." }),
  );

  checks.push(
    check("internal-links", "seo", "Internal linking", 6, f.internalLinks >= 10
      ? { status: "pass", score: 6, evidence: `${f.internalLinks} internal links.` }
      : f.internalLinks >= 4
        ? { status: "warn", score: 3, evidence: `${f.internalLinks} internal links. Thin for discovery.` }
        : { status: "fail", score: 0, evidence: `${f.internalLinks} internal links. Crawlers cannot travel.` }),
  );

  /* ---- Answer engine ---------------------------------------------------- */
  const allowedCrawlers = f.crawlers.filter((c) => c.allowed);
  const namedCrawlers = f.crawlers.filter((c) => c.named);

  checks.push(
    check("ai-access", "answerEngine", "AI crawler access", 14, allowedCrawlers.length === f.crawlers.length
      ? { status: "pass", score: 14, evidence: `All ${f.crawlers.length} checked AI crawlers may fetch this page.` }
      : allowedCrawlers.length === 0
        ? { status: "fail", score: 0, evidence: "Every checked AI crawler is blocked. No answer engine can cite this page." }
        : { status: "warn", score: 6, evidence: `Blocked: ${f.crawlers.filter((c) => !c.allowed).map((c) => c.name).join(", ")}.` }),
  );

  checks.push(
    check("ai-named", "answerEngine", "Crawlers named explicitly", 6, namedCrawlers.length > 0
      ? { status: "pass", score: 6, evidence: `robots.txt names ${namedCrawlers.map((c) => c.name).join(", ")}.` }
      : { status: "info", score: 3, evidence: "No AI crawler is named in robots.txt, so all inherit the wildcard rule." }),
  );

  checks.push(
    check("schema", "answerEngine", "Structured data", 10, f.schemaTypes.length === 0
      ? { status: "fail", score: 0, evidence: "No JSON-LD found. Nothing tells an engine what this page is." }
      : { status: "pass", score: 10, evidence: `Types found: ${f.schemaTypes.slice(0, 6).join(", ")}.` }),
  );

  checks.push(
    check("answerable", "answerEngine", "Answerable structure", 8, (f.headingCounts.h2 ?? 0) >= 3 && f.wordCount >= 300
      ? { status: "pass", score: 8, evidence: `${f.headingCounts.h2} H2 sections across ${f.wordCount} words.` }
      : { status: "warn", score: 3, evidence: `${f.headingCounts.h2 ?? 0} H2 sections and ${f.wordCount} words. Answer engines quote sections, so give them sections.` }),
  );

  checks.push(
    check("og", "answerEngine", "Open Graph", 4, f.hasOpenGraph
      ? { status: "pass", score: 4, evidence: "Open Graph tags present." }
      : { status: "warn", score: 1, evidence: "No Open Graph tags. Shared links render bare." }),
  );

  /* ---- Content depth ---------------------------------------------------- */
  checks.push(
    check("words", "content", "Content volume", 12, f.wordCount >= 600
      ? { status: "pass", score: 12, evidence: `${f.wordCount} words of body copy.` }
      : f.wordCount >= 300
        ? { status: "warn", score: 6, evidence: `${f.wordCount} words. Thin for a commercial page.` }
        : { status: "fail", score: 0, evidence: `${f.wordCount} words. Too thin to rank or be quoted.` }),
  );

  checks.push(
    check("headings", "content", "Heading structure", 8, (f.headingCounts.h2 ?? 0) + (f.headingCounts.h3 ?? 0) >= 3
      ? { status: "pass", score: 8, evidence: `${f.headingCounts.h2} H2 and ${f.headingCounts.h3} H3 elements.` }
      : { status: "warn", score: 3, evidence: "Little heading structure. The page reads as one block." }),
  );

  checks.push(
    check("ratio", "content", "Text to HTML ratio", 6, f.textToHtmlRatio >= 0.05
      ? { status: "pass", score: 6, evidence: `${(f.textToHtmlRatio * 100).toFixed(1)}% of the payload is readable text.` }
      : { status: "warn", score: 2, evidence: `${(f.textToHtmlRatio * 100).toFixed(1)}% of the payload is readable text. Heavy markup for the content served.` }),
  );

  checks.push(
    check("alt", "content", "Image alt text", 6, f.images === 0
      ? { status: "info", score: 3, evidence: "No images on the page." }
      : f.imagesMissingAlt === 0
        ? { status: "pass", score: 6, evidence: `All ${f.images} images have alt attributes.` }
        : { status: "warn", score: 2, evidence: `${f.imagesMissingAlt} of ${f.images} images have no alt attribute.` }),
  );

  /* ---- Technical health -------------------------------------------------- */
  checks.push(
    check("https", "technical", "HTTPS", 8, f.https
      ? { status: "pass", score: 8, evidence: "Served over HTTPS." }
      : { status: "fail", score: 0, evidence: "Not served over HTTPS." }),
  );

  checks.push(
    check("ttfb", "technical", "Server response", 10, f.ttfbMs <= 600
      ? { status: "pass", score: 10, evidence: `${f.ttfbMs}ms to first byte.` }
      : f.ttfbMs <= 1400
        ? { status: "warn", score: 5, evidence: `${f.ttfbMs}ms to first byte. Slow enough to cost you crawl budget.` }
        : { status: "fail", score: 0, evidence: `${f.ttfbMs}ms to first byte.` }),
  );

  checks.push(
    check("weight", "technical", "HTML weight", 6, f.htmlBytes <= 150_000
      ? { status: "pass", score: 6, evidence: `${(f.htmlBytes / 1024).toFixed(0)}KB of HTML.` }
      : { status: "warn", score: 2, evidence: `${(f.htmlBytes / 1024).toFixed(0)}KB of HTML before assets.` }),
  );

  checks.push(
    check("viewport", "technical", "Mobile viewport", 6, f.viewport
      ? { status: "pass", score: 6, evidence: "Viewport meta tag present." }
      : { status: "fail", score: 0, evidence: "No viewport meta tag. The page will not lay out on a phone." }),
  );

  checks.push(
    check("lang", "technical", "Language declared", 4, f.lang
      ? { status: "pass", score: 4, evidence: `lang="${f.lang}"` }
      : { status: "warn", score: 1, evidence: "No lang attribute on the html element." }),
  );

  checks.push(
    check("robots-txt", "technical", "robots.txt", 5, f.robotsTxtFound
      ? { status: "pass", score: 5, evidence: "robots.txt found and parsed." }
      : { status: "warn", score: 2, evidence: "No robots.txt. Crawl rules are undefined." }),
  );

  checks.push(
    check("sitemap", "technical", "XML sitemap", 7, f.sitemapFound
      ? { status: "pass", score: 7, evidence: `Sitemap found with ${f.sitemapUrlCount} URLs${f.sitemapDeclared ? ", declared in robots.txt" : ", but not declared in robots.txt"}.` }
      : { status: "fail", score: 0, evidence: "No XML sitemap found." }),
  );

  const pillars: PillarScore[] = (
    ["seo", "answerEngine", "content", "technical"] as Pillar[]
  ).map((pillar) => {
    const own = checks.filter((c) => c.pillar === pillar);
    const earned = own.reduce((a, c) => a + c.score, 0);
    const total = own.reduce((a, c) => a + c.weight, 0);
    return {
      pillar,
      label: PILLAR_LABELS[pillar],
      score: total === 0 ? 0 : Math.round((earned / total) * 100),
      checks: own,
    };
  });

  const earned = checks.reduce((a, c) => a + c.score, 0);
  const total = checks.reduce((a, c) => a + c.weight, 0);

  return { overall: Math.round((earned / total) * 100), pillars };
}
