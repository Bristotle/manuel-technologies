import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = { title: "Privacy policy", description: "How Manuel Technologies handles information submitted through this website.", alternates: { canonical: "/privacy-policy" } };

export default function PrivacyPage() {
  return <main><section className="border-b border-mt-border bg-white py-24 sm:py-32"><Container><SectionLabel>Legal</SectionLabel><h1 className="mt-6">Privacy policy</h1><p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">This page explains what information may be collected when you contact Manuel Technologies.</p></Container></section><section className="py-24"><Container><div className="max-w-[680px] space-y-12"><section><h2 className="!text-2xl">Information you provide</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">If you use the contact form, we use the details you submit to respond to your enquiry and assess the requested work. We do not sell your information.</p></section><section><h2 className="!text-2xl">Service providers</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">We may use trusted hosting, analytics, email, and security providers to operate the website. They process information only as needed to provide those services.</p></section><section><h2 className="!text-2xl">Contact</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">For a privacy question, use the <Link href="/contact" className="text-mt-purple underline">contact page</Link>.</p></section></div></Container></section></main>;
}