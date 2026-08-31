import Anthropic from "@anthropic-ai/sdk";
import { gatherFacts, scoreFacts } from "@/lib/audit/analyse";
import { normaliseInput, UnsafeUrlError } from "@/lib/audit/fetch";
import type { Advice, AuditReport } from "@/lib/audit/types";

/* --------------------------------------------------------------------------
   Free audit endpoint.

   Order matters. We crawl and score FIRST, deterministically, then hand the
   measured facts to the model for ranking and phrasing. The model never sees
   a URL to guess about and never supplies a number. If it is unreachable the
   report still renders, because the scores were never its to produce.

   Node runtime, not edge: the SSRF guard resolves DNS with node:dns.
   -------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5";

/* Crude per instance rate limit. Not a substitute for a real one at the edge,
   but it stops a single visitor holding the endpoint open, and this route
   costs money per call. */
const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

const ADVICE_SCHEMA = {
  type: "object" as const,
  properties: {
    headline: { type: "string" as const },
    summary: { type: "string" as const },
    strengths: { type: "array" as const, items: { type: "string" as const } },
    actions: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          rank: { type: "integer" as const },
          title: { type: "string" as const },
          why: { type: "string" as const },
          effort: {
            type: "string" as const,
            enum: ["Under an hour", "Half a day", "A few days", "Ongoing"],
          },
          severity: {
            type: "string" as const,
            enum: ["Critical", "High", "Medium", "Low"],
          },
        },
        required: ["rank", "title", "why", "effort", "severity"],
        additionalProperties: false,
      },
    },
  },
  required: ["headline", "summary", "strengths", "actions"],
  additionalProperties: false,
};

const SYSTEM = `You are a senior technical SEO and GEO engineer writing the advisory half of an automated site audit.

The audit has already crawled the page and measured everything. You are given those measurements. Your job is judgement, not measurement.

Hard rules:
- Never state a measurement that is not in the supplied facts. Never estimate traffic, rankings, keyword volume, domain authority, or how any AI assistant currently describes the brand. None of that was measured.
- Never claim the site appears, or fails to appear, in ChatGPT, Gemini, Perplexity or Google. That was not tested.
- Rank by what will move the result most, not by what is easiest to describe. A page that is noindex or has every AI crawler blocked has one problem and it is that one.
- Be specific to the facts given. "Improve your content" is worthless. "The page carries 180 words across two H2s, so there is no section an answer engine can quote" is useful.
- Between five and eight actions. Fewer if the site is genuinely in good shape.
- British English. No em dashes or en dashes: use a full stop, colon, comma or brackets. Do not use the words solutions, seamless, leverage, cutting-edge, revolutionary, game-changing or best-in-class.
- Address the reader as "you" and the site as "your site". Do not use the client's brand name.
- The headline is one sentence stating the single most important finding. The summary is two or three sentences.
- strengths: two to four things genuinely done well, quoting the measured evidence. If there is little to praise, return fewer rather than inventing.`;

async function getAdvice(
  facts: unknown,
  overall: number,
  pillars: unknown,
): Promise<{ advice: Advice | null; error: string | null }> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      advice: null,
      error:
        "The advisory half of this report is not configured yet. The measured results below are complete.",
    };
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM,
      thinking: { type: "adaptive" },
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: ADVICE_SCHEMA },
      },
      messages: [
        {
          role: "user",
          content: `Here is the complete measured output of the crawl. Overall score ${overall} out of 100.

Pillar scores and every individual check, including the evidence recorded for each:
${JSON.stringify(pillars, null, 1)}

Raw page facts:
${JSON.stringify(facts, null, 1)}

Write the advisory section.`,
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return { advice: null, error: "The model declined to complete this assessment." };
    }

    const block = response.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      return { advice: null, error: "The model returned an empty assessment." };
    }

    return { advice: JSON.parse(block.text) as Advice, error: null };
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return { advice: null, error: "The audit service is busy. The measured results below are complete." };
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return { advice: null, error: "The advisory service is not configured correctly." };
    }
    return {
      advice: null,
      error: "The advisory section could not be generated. The measured results below are complete.",
    };
  }
}

export async function POST(request: Request) {
  const started = Date.now();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "That is a lot of audits at once. Give it a minute." },
      { status: 429 },
    );
  }

  let target: string;
  try {
    const body = (await request.json()) as { url?: string };
    target = normaliseInput(String(body?.url ?? ""));
  } catch (error) {
    return Response.json(
      { error: error instanceof UnsafeUrlError ? error.message : "Enter a website address." },
      { status: 400 },
    );
  }

  let facts;
  try {
    facts = await gatherFacts(target);
  } catch (error) {
    if (error instanceof UnsafeUrlError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(
      { error: "We could not reach that page. Check the address and try again." },
      { status: 502 },
    );
  }

  if (facts.status >= 400) {
    return Response.json(
      { error: `That page returned HTTP ${facts.status}. Nothing can be audited until it responds.` },
      { status: 400 },
    );
  }

  const { overall, pillars } = scoreFacts(facts);
  const { advice, error: adviceError } = await getAdvice(facts, overall, pillars);

  const report: AuditReport = {
    facts,
    overall,
    pillars,
    advice,
    adviceError,
    durationMs: Date.now() - started,
  };

  return Response.json({ report });
}
