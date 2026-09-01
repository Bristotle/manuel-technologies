# Reserved tools

Three tools from the brief are not built because each needs something that is
not in the environment yet. Everything else from that list shipped.

Kept here so the next build picks them up rather than rediscovering them.

---

## 1. AI engine visibility check

**Blocked on:** `ANTHROPIC_API_KEY`, which is also blocking the advisory half
of `/free-audit`.

**Do not build it as briefed.** The brief says the tool should show whether a
business "is currently cited by ChatGPT, Claude, Perplexity, and Gemini". We
can only call Claude. Asking Claude what ChatGPT does produces a fabricated
answer about three systems that were never queried, and that is the same claim
refused on `/free-audit` and in the `FunnelCoverage` metrics.

**Build this instead.** Ask Claude what it actually knows about the brand,
unprompted, and show the answer verbatim:

- One engine, named honestly. "Here is what Claude knows about you" is true.
  "Here is your AI visibility score across four engines" is not.
- An empty or wrong answer is the finding. A business the model has never
  heard of has a real, demonstrable blind spot, and seeing it stated plainly
  is more persuasive than any invented score.
- Pair the result with the crawler check at `/free-tools/ai-crawler-check`,
  which already measures the access half of the same problem.

Cost note: this is a paid call on a public endpoint. Rate limit it at least as
hard as `/api/audit` does, and set a spend cap in the Anthropic console.

---

## 2. Core Web Vitals real world mobile test

**Blocked on:** a Google PageSpeed Insights API key.

Free to obtain, rate limited per key. The endpoint returns both lab and field
data, and the field data is the valuable half because it is real Chrome user
measurement rather than a simulation.

**Design note.** Report field data where CrUX has it and say plainly when it
does not, rather than silently falling back to lab numbers and presenting them
as real world. A site with too little traffic for field data is a common case
and the honest answer is "not enough real users to measure yet".

Mobile only, throttled, since that is the position this site takes everywhere
else.

---

## 3. Rendered versus raw HTML delta

**Blocked on:** a headless browser running server side.

The full version needs Playwright in a Vercel function: a real cost, a real
cold start, and a package size that pushes against the function limit. Worth
doing, but it is a deliberate decision rather than an afternoon.

**Cheap version available now.** `gatherFacts` in `lib/audit/analyse.ts`
already measures raw HTML word count, link count, script count and the text to
markup ratio. A page whose raw HTML carries almost no text while loading many
scripts is very likely client rendered, and that can be reported as a strong
signal without rendering anything. It is not the same as measuring the delta,
so it must not be described as though it were.
