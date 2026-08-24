import { Resend } from "resend";
import { CONTACT_RECIPIENT } from "@/lib/site";

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
]);

function isValidEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return Boolean(domain && !PERSONAL_EMAIL_DOMAINS.has(domain));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const website = String(body.website || "").trim();
    const service = String(body.service || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !website || !service || !budget || !message) {
      return Response.json({ error: "Please complete every field." }, { status: 400 });
    }

    if (!email.includes("@") || !isValidEmail(email)) {
      return Response.json(
        { error: "Please use your business email address." },
        { status: 400 },
      );
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
        `Business email: ${email}`,
        `Company website: ${website}`,
        `Service: ${service}`,
        `Budget: ${budget}`,
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