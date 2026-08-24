"use client";

import { useState } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES: Record<string, { label: string; questions: FAQItem[] }> = {
  "website-development": {
    label: "Website development",
    questions: [
      {
        question: "What makes a website effective for search and users?",
        answer:
          "An effective website has a clear information structure, useful content, descriptive URLs, accessible navigation, and a reliable experience across devices. Those fundamentals help people understand the offer and help search engines crawl and interpret the important pages.",
      },
      {
        question: "Why does mobile-first website development matter?",
        answer:
          "Google uses mobile-first indexing, so the mobile version should contain the same important content, metadata, structured data, and links as the desktop version. We design and test narrow layouts, touch targets, rendering, and performance from the start.",
      },
      {
        question: "How do you build a website that can grow?",
        answer:
          "We separate content, components, and data so new pages do not require a new design each time. A documented component system, sensible content model, stable URLs, and measured performance make future growth less fragile.",
      },
      {
        question: "Can you rebuild a website without losing its SEO?",
        answer:
          "Yes. We begin with a URL, content, redirect, indexation, and analytics review. Valuable addresses are preserved where possible, redirects are mapped where necessary, and the new rendered site is checked before and after launch.",
      },
    ],
  },
  "seo-geo": {
    label: "SEO and GEO",
    questions: [
      {
        question: "What is the relationship between SEO and GEO?",
        answer:
          "Generative Engine Optimisation builds on technical SEO, useful content, clear entities, and trustworthy sources. Google says its generative search features use the same fundamental SEO guidance, so GEO is not a replacement for crawlability, relevance, or quality.",
      },
      {
        question: "What content helps a business appear in AI answers?",
        answer:
          "Useful source pages should answer a defined question directly, show specific expertise and evidence, use clear headings and descriptive links, and explain the organisation and its services consistently. The aim is to make the source easy to retrieve and represent accurately.",
      },
      {
        question: "Do we need special schema or an llms.txt file for GEO?",
        answer:
          "There is no Google requirement for a special GEO schema or llms.txt file. We prioritise supported technical SEO, structured data where it describes the page accurately, people-first content, and evidence that earns attention rather than chasing unproven hacks.",
      },
      {
        question: "Can you guarantee citations in Google AI Overviews or LLMs?",
        answer:
          "No responsible provider can guarantee a particular citation. Search indexes, retrieval systems, models, prompts, and results change. We improve the clarity, accessibility, authority, and usefulness of the sources those systems can evaluate.",
      },
    ],
  },
  "ai-agents": {
    label: "AI agents and automation",
    questions: [
      {
        question: "What is the difference between an AI agent and an automation?",
        answer:
          "A fixed automation follows predefined rules. An agent can interpret a task, choose from approved tools, inspect results, and continue within limits. That flexibility can help with variable work, but it also brings greater testing, latency, cost, and failure risks.",
      },
      {
        question: "When should a business use an AI agent?",
        answer:
          "An agent is worth considering when the task has meaningful variation and a person currently has to choose the next step. We start with simpler rules where they are enough, then introduce bounded agent behaviour only where it adds measurable value.",
      },
      {
        question: "How do you keep AI agents from taking unsafe actions?",
        answer:
          "We use least-privilege access, allowlisted tools, typed inputs, step limits, validation, confirmation gates, audit logs, evaluation cases, and human escalation. Model credentials stay outside the model, and consequential actions require appropriate approval.",
      },
      {
        question: "How do you measure whether an AI automation works?",
        answer:
          "We compare the original task time, output quality, exception rate, review effort, model cost, and downstream result. A system is not an improvement if it finishes faster but creates hidden correction work or unreliable decisions.",
      },
    ],
  },
  "custom-software": {
    label: "Custom software and applications",
    questions: [
      {
        question: "When is custom software worth building?",
        answer:
          "Custom software is worth considering when a repeated process affects revenue, risk, service quality, or staff time and existing tools force expensive workarounds. We first test whether configuration or integration can solve the problem before proposing a new application.",
      },
      {
        question: "What is included in a custom software project?",
        answer:
          "A project can include discovery, workflow mapping, data modelling, interface design, application development, integrations, testing, deployment, documentation, and support. The first release is shaped around one valuable workflow rather than an oversized feature list.",
      },
      {
        question: "How do you build secure custom applications?",
        answer:
          "Security is considered throughout development: least-privilege access, input validation, protected secrets, dependency updates, secure deployment, logging, data minimisation, and review of external services. The NCSC Developers Collection is a useful reference for secure development practice.",
      },
      {
        question: "Can custom software integrate with our existing systems?",
        answer:
          "Usually, after checking APIs, webhooks, exports, authentication, rate limits, identifiers, and data ownership. We design explicit contracts, validation, retries, and reconciliation so a temporary failure does not become silent data loss.",
      },
    ],
  },
};

export function FAQTabs() {
  const categories = Object.entries(FAQ_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(categories[0][0]);
  const selected = FAQ_CATEGORIES[selectedCategory as keyof typeof FAQ_CATEGORIES];

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Service FAQs">
        {categories.map(([key, category]) => {
          const isSelected = selectedCategory === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`faq-panel-${key}`}
              onClick={() => setSelectedCategory(key)}
              className={`min-h-11 border-b-2 px-1 text-left text-sm font-semibold transition-colors duration-150 ${
                isSelected
                  ? "border-mt-purple text-mt-ink"
                  : "border-transparent text-mt-slate hover:border-mt-purple-light hover:text-mt-purple active:border-mt-purple"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        id={`faq-panel-${selectedCategory}`}
        role="tabpanel"
        aria-label={selected.label}
        className="mt-8 max-w-[760px] border-t border-mt-border"
      >
        {selected.questions.map((faq) => (
          <details key={faq.question} className="group border-b border-mt-border py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-lg font-semibold marker:hidden">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl font-normal leading-none text-mt-purple transition-transform duration-150 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
