const XAI_ENDPOINT = "https://api.x.ai/v1/chat/completions";

type ToolRequest = {
  tool: "geo-brief" | "agent-readiness" | "seo-audit";
  input: Record<string, string | number | boolean>;
};

function clean(value: unknown) {
  return String(value ?? "").trim().slice(0, 4000);
}

function promptFor(request: ToolRequest) {
  const input = Object.entries(request.input)
    .map(([key, value]) => `${key}: ${clean(value)}`)
    .join("\n");
  const instructions = {
    "geo-brief": "Create a concise GEO and SEO content brief. Return: primary query, search intent, audience, answer-first H1, six H2s, entities to cover, five FAQ questions, internal link suggestions, and authoritative source types. Do not invent search volume, rankings, or quotes. Mark assumptions.",
    "agent-readiness": "Assess whether this workflow needs deterministic automation, an AI feature, or an AI agent. Return: recommendation, score from 0 to 100, reasons, risks, minimum viable architecture, human approval points, evaluation metrics, and first implementation step. Be conservative with high impact actions.",
    "seo-audit": "Review the supplied page facts as a technical SEO triage. Return: severity ranked findings, what to fix first, crawl and index risks, content and intent risks, Core Web Vitals risks, structured data checks, and a seven day action plan. Do not claim to have crawled a URL or invent measurements.",
  }[request.tool];
  return `${instructions}\n\nSupplied facts:\n${input}\n\nUse plain British English. Keep the answer practical and specific. Return valid JSON with keys: summary, findings, actions, assumptions.`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ToolRequest;
    if (!body || !["geo-brief", "agent-readiness", "seo-audit"].includes(body.tool)) {
      return Response.json({ error: "Unknown tool." }, { status: 400 });
    }
    const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
    if (!apiKey) return Response.json({ error: "Grok enrichment is not configured yet." }, { status: 503 });

    const response = await fetch(XAI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: process.env.XAI_MODEL || "grok-3-mini", temperature: 0.2, response_format: { type: "json_object" }, messages: [{ role: "system", content: "You are a senior technical SEO, GEO, and automation consultant. Never present assumptions as measured facts." }, { role: "user", content: promptFor(body) }] }),
    });
    if (!response.ok) return Response.json({ error: "Grok could not complete this assessment." }, { status: 502 });
    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    if (!content) return Response.json({ error: "Grok returned an empty assessment." }, { status: 502 });
    return Response.json({ result: JSON.parse(content) });
  } catch {
    return Response.json({ error: "Please check the details and try again." }, { status: 400 });
  }
}
