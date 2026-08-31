import Anthropic from "@anthropic-ai/sdk";

/* The three free tools at /free-tools. Migrated from Grok to Claude, so the
   project carries one model provider rather than two.

   These tools reason about facts the visitor supplies. They do not crawl, so
   the rule against inventing measurements is stricter here than it is for
   /free-audit, which measures for itself. */

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5";

type ToolName = "geo-brief" | "agent-readiness" | "seo-audit";

type ToolRequest = {
  tool: ToolName;
  input: Record<string, string | number | boolean>;
};

const INSTRUCTIONS: Record<ToolName, string> = {
  "geo-brief":
    "Create a concise GEO and SEO content brief. Cover: primary query, search intent, audience, an answer-first H1, six H2s, entities to cover, five FAQ questions, internal link suggestions, and the kinds of authoritative source to cite.",
  "agent-readiness":
    "Assess whether this workflow needs deterministic automation, an AI feature, or a bounded AI agent. Cover: the recommendation, a score from 0 to 100, the reasons, the risks, a minimum viable architecture, the human approval points, evaluation metrics, and the first implementation step. Be conservative wherever an action is hard to reverse.",
  "seo-audit":
    "Triage the supplied page facts. Cover: severity ranked findings, what to fix first, crawl and indexation risks, content and intent risks, Core Web Vitals risks, structured data checks, and a seven day action plan.",
};

const SYSTEM = `You are a senior technical SEO, GEO and automation consultant.

Hard rules:
- You have NOT visited any URL. Reason only from the facts the person supplied. Never claim to have crawled, fetched or measured anything.
- Never invent search volume, rankings, traffic figures, or quotes.
- Where you are assuming something, say so in the assumptions list rather than presenting it as fact.
- British English. No em dashes or en dashes: use a full stop, colon, comma or brackets. Do not use the words solutions, seamless, leverage, cutting-edge, revolutionary, game-changing or best-in-class.
- Be specific and practical. Name the mechanism rather than describing a benefit.`;

const SCHEMA = {
  type: "object" as const,
  properties: {
    summary: { type: "string" as const },
    findings: { type: "array" as const, items: { type: "string" as const } },
    actions: { type: "array" as const, items: { type: "string" as const } },
    assumptions: { type: "array" as const, items: { type: "string" as const } },
  },
  required: ["summary", "findings", "actions", "assumptions"],
  additionalProperties: false,
};

function clean(value: unknown) {
  return String(value ?? "").trim().slice(0, 4000);
}

export async function POST(request: Request) {
  let body: ToolRequest;
  try {
    body = (await request.json()) as ToolRequest;
  } catch {
    return Response.json({ error: "Please check the details and try again." }, { status: 400 });
  }

  if (!body || !INSTRUCTIONS[body.tool]) {
    return Response.json({ error: "Unknown tool." }, { status: 400 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "This tool is not configured yet." }, { status: 503 });
  }

  const supplied = Object.entries(body.input ?? {})
    .map(([key, value]) => `${key}: ${clean(value)}`)
    .join("\n");

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
      messages: [
        {
          role: "user",
          content: `${INSTRUCTIONS[body.tool]}\n\nFacts supplied by the person asking:\n${supplied}`,
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ error: "That request could not be completed." }, { status: 422 });
    }

    const block = response.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      return Response.json({ error: "The assessment came back empty." }, { status: 502 });
    }

    return Response.json({ result: JSON.parse(block.text) });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "Busy right now. Try again shortly." }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return Response.json({ error: "This tool is not configured correctly." }, { status: 503 });
    }
    return Response.json({ error: "That assessment could not be completed." }, { status: 502 });
  }
}
