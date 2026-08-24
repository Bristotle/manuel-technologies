import { Resend } from "resend";
import { CONTACT_RECIPIENT } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !service || !message) {
      return Response.json({ error: "Please complete every field." }, { status: 400 });
    }

    if (!email.includes("@")) {
      return Response.json(
        { error: "Please enter a valid email address." },
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
        `Email: ${email}`,
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