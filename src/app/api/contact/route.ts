import { Resend } from "resend";
import { CONTACT_RECIPIENT } from "@/lib/site";

/* Qualification, per CLAUDE.md section 8: business email, budget range,
   company website. Free mail providers are refused with a plain message,
   because an enquiry from a Gmail address with no website and no budget is
   almost never a project. Plus a honeypot and a per IP rate limit, since a
   public form with neither is a spam funnel into the inbox. */
const FREE_MAIL = new Set(["gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "outlook.com", "hotmail.com", "hotmail.co.uk", "live.com", "icloud.com", "me.com", "aol.com", "ymail.com", "proton.me", "protonmail.com"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, { n: number; t: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const h = hits.get(ip);
    if (h && now - h.t < 600_000 && h.n >= 5) {
      return Response.json({ error: "Too many messages from this connection. Please try again in ten minutes, or email us directly." }, { status: 429 });
    }
    hits.set(ip, h && now - h.t < 600_000 ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();
    const website = String(body.website || "").trim();
    const budget = String(body.budget || "").trim();

    /* Honeypot filled: answer as if sent, deliver nothing. */
    if (String(body.company || "").trim()) {
      return Response.json({ message: "Thanks. We will get back to you within one business day." });
    }

    if (!name || !email || !service || !message || !website || !budget) {
      return Response.json({ error: "Please complete every field." }, { status: 400 });
    }

    if (!EMAIL.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const domain = email.split("@")[1];
    if (FREE_MAIL.has(domain)) {
      return Response.json(
        { error: "Please use your work email address. If your business does not have one yet, that is a good first project: mention it in the message and use your website field for a social profile." },
        { status: 400 },
      );
    }

    if (message.length < 20) {
      return Response.json({ error: "Tell us a little more about the project, a sentence or two is enough." }, { status: 400 });
    }
    if (message.length > 5000 || (message.match(/https?:\/\//g) || []).length >= 3) {
      return Response.json({ error: "That message looks like spam. If it is not, please email us directly." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "Email is not configured yet." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Manuel Technologies <noreply@manueltechnologies.com>",
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New enquiry: ${service} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Website: ${website}`,
        `Budget: ${budget}`,
        `Service: ${service}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      return Response.json({ error: "Your message could not be sent." }, { status: 502 });
    }

    return Response.json({ message: "Thanks. We will get back to you within one business day." });
  } catch {
    return Response.json({ error: "Your message could not be sent." }, { status: 400 });
  }
}