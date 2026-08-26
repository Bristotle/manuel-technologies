import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const metadata: Metadata = { title: "AI agent readiness assessment", description: "Assess whether a business workflow needs deterministic automation, an AI feature, or a bounded AI agent with Grok.", alternates: { canonical: "/free-tools/ai-agent-readiness" } };

export default function AiAgentReadinessPage() { return <main><section className="border-b border-mt-border bg-white py-20 sm:py-28"><Container><SectionLabel>Free tool / Scale</SectionLabel><h1 className="mt-6 max-w-[18ch]">AI agent readiness assessment</h1><p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">Describe the workflow, systems, and cost of failure. Get an architecture recommendation grounded in the actual process.</p></Container></section><section className="py-20 sm:py-28"><Container><ToolWorkspace tool="agent-readiness" /></Container></section></main>; }
