import { Resend } from "resend";

/* Newsletter signup. Adds the address as a Resend contact. Resend 6 keeps
   contacts at account level, so this needs only RESEND_API_KEY, which the
   contact form already uses. RESEND_SEGMENT_ID is optional and files new
   subscribers into a segment when set.

   No database, per CLAUDE.md section 7. Resend is the list. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, { n: number; t: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const h = hits.get(ip);
    if (h && now - h.t < 60_000 && h.n >= 5) {
      return Response.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
    }
    hits.set(ip, h && now - h.t < 60_000 ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    /* Honeypot. Bots fill every field; people never see this one. */
    if (String(body.company || "").trim()) {
      return Response.json({ message: "Thanks. You are on the list." });
    }
    if (!EMAIL.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "Signup is not configured yet." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const segment = process.env.RESEND_SEGMENT_ID;
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(segment ? { segments: [{ id: segment }] } : {}),
    });
    /* An address that already exists is a success from the reader's side. */
    if (error && !/exist|duplicate|already/i.test(error.message || "")) {
      return Response.json({ error: "Could not add you just now. Please try again." }, { status: 502 });
    }
    return Response.json({ message: "Thanks. You are on the list." });
  } catch {
    return Response.json({ error: "Could not add you just now. Please try again." }, { status: 500 });
  }
}
