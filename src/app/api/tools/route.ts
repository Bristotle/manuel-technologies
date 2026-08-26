const SYSTEM_PROMPT = `You are a senior technical consultant at Manuel Technologies. Give concise, specific, practical recommendations. Use British English. Do not promise rankings, citations, revenue, or performance outcomes. Do not invent facts about a submitted website. Return plain text with: Diagnosis, Priority actions, and Next measurement. Keep under 180 words.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = String(body.tool || "").trim();
    const data = body.data && typeof body.data === "object" ? body.data : {};
    if (!["technical-seo-health-check", "ai-agent-readiness-assessment"].includes(tool)) return Response.json({ error: "This tool does not use an AI assessment." }, { status: 400 });
    if (!process.env.GROK_API_KEY) return Response.json({ error: "The local assessment is ready. Grok recommendations will be available once the tool is connected." }, { status: 503 });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${process.env.GROK_API_KEY}` },
      body: JSON.stringify({ model: process.env.GROK_MODEL || "grok-3-mini", temperature: 0.2, max_tokens: 350, messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: `Tool: ${tool}\nAssessment data: ${JSON.stringify(data)}` }] }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) return Response.json({ error: "Grok could not complete the assessment. Try again shortly." }, { status: 502 });
    const result = await response.json();
    const recommendation = result.choices?.[0]?.message?.content;
    return typeof recommendation === "string" ? Response.json({ recommendation }) : Response.json({ error: "The assessment returned no recommendation." }, { status: 502 });
  } catch {
    return Response.json({ error: "The assessment could not be completed." }, { status: 400 });
  }
}
