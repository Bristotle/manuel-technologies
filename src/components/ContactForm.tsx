"use client";

import { FormEvent, useState } from "react";

type Status = { type: "idle" | "success" | "error"; message: string };

const INITIAL_STATUS: Status = { type: "idle", message: "" };

export function ContactForm() {
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus(INITIAL_STATUS);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent.");
      }

      form.reset();
      setStatus({ type: "success", message: result.message });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please email us directly.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Your name
          <input name="name" required className="contact-input" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Work email
          <input name="email" type="email" required className="contact-input" placeholder="you@yourcompany.com" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Company website
          <input name="website" type="url" inputMode="url" placeholder="https://" required className="contact-input" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Budget range
          <select name="budget" required className="contact-input">
            <option value="">Choose a range</option>
            <option>Under GHS 3,500</option>
            <option>GHS 3,500 to 6,000</option>
            <option>GHS 6,000 to 9,000</option>
            <option>GHS 9,000 to 15,000</option>
            <option>Over GHS 15,000, or monthly retainer</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-semibold">
        What do you need?
        <select name="service" required className="contact-input">
          <option value="">Choose a service</option>
          <option>Website development</option>
          <option>Custom software</option>
          <option>Technical SEO or GEO</option>
          <option>AI automation or agents</option>
          <option>Something else</option>
        </select>
      </label>

      {/* Honeypot. Bots fill every field; people never see this one. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <label className="flex flex-col gap-2 text-sm font-semibold">
        Tell us about the project
        <textarea name="message" required rows={6} className="contact-input resize-y" />
      </label>

      <button
        type="submit"
        disabled={isSending}
        className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-mt-purple px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-mt-purple-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? "Sending..." : "Send enquiry"}
      </button>

      {status.message && (
        <p
          role="status"
          className={status.type === "success" ? "text-mt-slate" : "font-semibold text-mt-ink"}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}