export type ServicePage = {
  pillar: "build" | "grow" | "scale";
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  audience: string;
  approach: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    pillar: "build",
    slug: "website-development",
    name: "Website development",
    title: "Website development that works hard after launch",
    description: "Performance focused website development for organisations that need a fast, maintainable site and a clear route to growth.",
    intro: "A website should make the business easier to understand, easier to find, and easier to choose. We build fast, accessible websites around the content, integrations, and measurement that make those outcomes possible.",
    audience: "For organisations replacing a slow site, launching a new offer, or outgrowing a page builder.",
    approach: [
      "Start with the commercial job of the site, then map the journeys, content, and technical constraints around it.",
      "Build with a small, deliberate component system, semantic HTML, responsive layouts, and performance budgets from the first commit.",
      "Ship a site your team can maintain. Structured content, predictable deployments, and analytics that answer useful questions are part of the build."
    ],
    deliverables: ["Information architecture and page planning", "Next.js or equivalent modern front end", "CMS or structured content model where it earns its place", "Technical SEO foundations, analytics, and launch checks"],
    faqs: [
      { question: "How long does website development take?", answer: "A focused marketing site can take several weeks. The real duration depends on content readiness, integrations, approval time, and whether the site needs custom software rather than presentation pages." },
      { question: "Will the website be fast on mobile?", answer: "Performance is treated as a build requirement. The work covers image handling, font loading, JavaScript weight, layout stability, and real user measurement rather than relying only on a desktop speed test." },
      { question: "Can you rebuild an existing website without losing SEO?", answer: "Yes. A rebuild should begin with an inventory of valuable URLs, queries, links, metadata, and redirects. The launch plan preserves relevant addresses and tests the new crawlable structure before release." },
      { question: "Do you provide website maintenance?", answer: "The preferred model is a maintainable codebase with documented deployments and clear ownership. Ongoing technical support can cover releases, performance monitoring, SEO changes, and improvements after launch." }
    ]
  },
  {
    pillar: "build",
    slug: "web-design",
    name: "Web design and UX",
    title: "Web design that makes the next action obvious",
    description: "Web design and UX for clear digital journeys, stronger positioning, and interfaces people can use without explanation.",
    intro: "Good web design gives every page a job. We connect positioning, information architecture, content hierarchy, and interaction design so visitors can understand the offer and move forward without friction.",
    audience: "For businesses whose website feels generic, difficult to navigate, or disconnected from how customers decide.",
    approach: [
      "Turn audience questions and business priorities into a page hierarchy that can be scanned quickly.",
      "Design the states people actually encounter: empty, loading, error, success, mobile, keyboard, and reduced motion.",
      "Use a coherent type, spacing, colour, and component system so future pages feel like part of the same product."
    ],
    deliverables: ["Content and navigation structure", "Responsive page and component design", "Accessible interaction patterns and states", "Design tokens and implementation guidance"],
    faqs: [
      { question: "What is included in web design and UX?", answer: "It can include information architecture, page hierarchy, wireframes, visual direction, responsive layouts, interaction states, accessibility decisions, and a component system ready for development." },
      { question: "Can you improve an existing design instead of starting again?", answer: "Yes. An audit can identify unclear hierarchy, weak calls to action, accessibility barriers, inconsistent components, and mobile problems before deciding which parts deserve a redesign." },
      { question: "How does UX design affect SEO?", answer: "Clear structure helps people and search engines understand a site. Useful headings, descriptive links, accessible navigation, fast rendering, and content that answers intent support both usability and organic visibility." },
      { question: "Do you design mobile first?", answer: "Mobile constraints are considered at the start, not added at the end. Layout, tap targets, content order, forms, and performance are tested at narrow widths before the design expands." }
    ]
  },
  {
    pillar: "build",
    slug: "custom-software",
    name: "Custom software",
    title: "Custom software for work your tools cannot handle",
    description: "Custom software for internal operations, customer portals, dashboards, and workflows that need more than an off the shelf tool.",
    intro: "When a process matters and the existing tools keep forcing awkward workarounds, custom software can make the operation clearer and more reliable. We design and build focused systems around the real workflow, data, and permissions.",
    audience: "For teams with repeated manual work, disconnected tools, or customer experiences that cannot be delivered by a standard product.",
    approach: [
      "Map the current process, including exceptions, ownership, data sources, and the decisions people make manually.",
      "Define a small first release with explicit roles, validation, auditability, and failure handling.",
      "Build the foundations for change: tested business rules, documented interfaces, useful logs, and deployment controls."
    ],
    deliverables: ["Technical discovery and workflow mapping", "Role based web applications and portals", "Data models, validation, and integrations", "Testing, deployment documentation, and handover"],
    faqs: [
      { question: "When is custom software worth building?", answer: "It is worth considering when a repeated process affects revenue, risk, service quality, or staff time and no existing tool fits without expensive workarounds or duplicate data entry." },
      { question: "How do you keep a custom application secure?", answer: "Security starts with least privilege, controlled access, validated input, protected secrets, sensible data retention, dependency updates, logging, and a clear boundary around external services." },
      { question: "Can custom software connect to our existing tools?", answer: "Usually. The first step is checking the available APIs, webhooks, exports, authentication methods, rate limits, and data ownership. Integrations are designed around the source of truth rather than copied blindly." },
      { question: "Do you build the whole system at once?", answer: "No. A smaller first release makes assumptions visible earlier. It should cover one valuable workflow end to end, then expand when usage and feedback justify the next part." }
    ]
  },
  {
    pillar: "build",
    slug: "mobile-apps",
    name: "Mobile applications",
    title: "Mobile applications built around the moments that matter",
    description: "Mobile application development for focused customer, field, and internal workflows across iOS and Android.",
    intro: "A useful mobile app earns its place by making a frequent or important task easier in the context where it happens. We build focused mobile experiences with a reliable data layer, clear permissions, and a practical release plan.",
    audience: "For organisations with a field workflow, member experience, customer utility, or internal process that benefits from mobile access.",
    approach: [
      "Identify the mobile moment, connectivity assumptions, device needs, and the smallest useful journey.",
      "Design for touch, readable content, interrupted sessions, permissions, loading, and offline or poor network conditions where relevant.",
      "Connect the app to a stable backend and release process so improvements do not depend on guesswork."
    ],
    deliverables: ["Mobile journey and feature definition", "iOS and Android application build", "API and account integration", "Testing, store preparation, and release support"],
    faqs: [
      { question: "Should we build a native or cross platform app?", answer: "The choice depends on device features, performance requirements, team ownership, and how much code should be shared. A focused cross platform app can be efficient, while native may be right for intensive platform specific work." },
      { question: "Can a mobile app work with an existing website?", answer: "Yes, when the website has a suitable API or a backend can be introduced. The app should not scrape presentation pages when a stable data contract can be designed instead." },
      { question: "What happens when the user loses connection?", answer: "The behaviour should be designed per workflow. Some screens can read cached data, some actions can queue safely, and some should explain that a live connection is required rather than pretending the action completed." },
      { question: "Do you help with app store submission?", answer: "Yes. Release preparation can cover build configuration, privacy information, screenshots, review requirements, and the production checklist for both major mobile platforms." }
    ]
  },
  {
    pillar: "build",
    slug: "systems-integrations",
    name: "Systems and integrations",
    title: "Systems and integrations that keep data moving correctly",
    description: "API and systems integration work for CRM, ERP, legacy, payment, and operational data flows.",
    intro: "Disconnected systems create duplicate work and unreliable reporting. We connect the tools you already use with explicit data ownership, monitored transfers, and failure handling that people can understand.",
    audience: "For teams moving data between systems, replacing spreadsheets, or inheriting integrations nobody wants to touch.",
    approach: [
      "Document the systems, records, triggers, identifiers, authentication, and direction of travel before writing an integration.",
      "Choose the least fragile connection available, with validation, idempotency, retries, rate limit handling, and clear ownership.",
      "Make failures visible. Logs, alerts, replayable jobs, and reconciliation reports matter as much as the happy path."
    ],
    deliverables: ["Integration map and data ownership review", "API, webhook, and batch connections", "Validation, retries, and reconciliation", "Operational documentation and monitoring"],
    faqs: [
      { question: "Can you integrate older or undocumented systems?", answer: "Sometimes. The first step is identifying supported exports, database access, existing middleware, authentication, and operational constraints. A controlled adapter is preferable to an undocumented dependency where possible." },
      { question: "How do you prevent duplicate records?", answer: "Integrations need stable identifiers, idempotent operations, field mapping rules, and reconciliation. The correct method depends on which system owns each record and how changes are represented." },
      { question: "What if an external API goes down?", answer: "A production integration should fail visibly and recover safely. Queues, bounded retries, backoff, dead letter handling, and an operator view can prevent a temporary outage becoming silent data loss." },
      { question: "Will we be locked into one integration provider?", answer: "The design should keep business rules and data contracts separate from provider specific transport where practical. That makes a future provider change a controlled migration rather than a full rewrite." }
    ]
  },
  {
    pillar: "grow",
    slug: "technical-seo",
    name: "Technical SEO",
    title: "Technical SEO that lets useful pages be found",
    description: "Technical SEO audits and implementation for crawlability, indexation, performance, structured data, and site architecture.",
    intro: "Technical SEO is the engineering layer beneath organic growth. We find the reasons search engines struggle to crawl, interpret, or trust a site, then implement fixes that can be measured in logs, reports, and real user data.",
    audience: "For teams with traffic declines, indexation problems, migrations, JavaScript sites, or a backlog of SEO fixes that never gets shipped.",
    approach: [
      "Establish the current state from Search Console, analytics, crawls, templates, sitemaps, redirects, and server behaviour.",
      "Prioritise issues by business effect and implementation risk rather than producing a long undifferentiated checklist.",
      "Ship fixes with developers, test rendered output and edge cases, and monitor the signals after release."
    ],
    deliverables: ["Technical audit with prioritised backlog", "Crawl and indexation remediation", "Core Web Vitals and rendering work", "Structured data, redirects, sitemaps, and measurement"],
    faqs: [
      { question: "What does a technical SEO audit include?", answer: "It can cover crawling, indexation, canonicals, redirects, internal links, rendering, Core Web Vitals, structured data, XML sitemaps, international signals, templates, and the relationship between technical issues and valuable pages." },
      { question: "How quickly can technical SEO improve results?", answer: "The timing depends on the issue and crawl demand. A blocked indexation path can change quickly after correction, while architecture, content quality, and authority work normally require longer measurement windows." },
      { question: "Do you work directly with developers?", answer: "Yes. Technical SEO is most useful when recommendations become tested code. Tickets, acceptance criteria, rendered checks, and post release verification keep the work from ending as a report." },
      { question: "Can technical SEO help an AI search presence?", answer: "It provides the foundation. Clear entities, accessible content, structured data, reliable rendering, and strong source pages make it easier for search systems and language models to retrieve and interpret information." }
    ]
  },
  {
    pillar: "grow",
    slug: "programmatic-seo",
    name: "Programmatic SEO",
    title: "Programmatic SEO built on data, not page duplication",
    description: "Programmatic SEO systems for useful, differentiated pages driven by real data, search demand, and a controlled publishing pipeline.",
    intro: "Programmatic SEO is the disciplined use of templates, structured data, and software to create valuable pages at a scale manual publishing cannot match. The hard part is not producing URLs. It is deciding which pages deserve to exist and enriching each one with information users can act on.",
    audience: "For businesses with a substantial catalogue, location set, integration network, or dataset that maps to real search demand.",
    approach: [
      "Validate the page pattern against demand, unique data, commercial value, indexation risk, and the ability to keep it current.",
      "Build a content model with required fields, source provenance, quality thresholds, internal links, metadata, and a noindex path for incomplete records.",
      "Publish in controlled batches, inspect samples, monitor indexing and engagement, and remove pages that do not earn their place."
    ],
    deliverables: ["Keyword and dataset pattern research", "Template, data model, and page rules", "Generation pipeline with QA and publishing controls", "Internal linking, schema, monitoring, and iteration plan"],
    faqs: [
      { question: "What is programmatic SEO?", answer: "Programmatic SEO uses a repeatable page system, structured data, and software to serve many specific searches. It is effective when every page adds useful information, not when a template simply swaps one keyword for another." },
      { question: "What are good examples of programmatic SEO?", answer: "Strong patterns include product catalogues with meaningful attributes, service areas with genuine local information, integration directories, property datasets, and comparison pages where the underlying data supports the comparison." },
      { question: "Can programmatic SEO create thin content?", answer: "Yes, if the dataset is weak or the template is doing all the work. Quality gates, unique evidence, useful calculations, editorial review, and excluding incomplete combinations are essential protections." },
      { question: "How is programmatic SEO different from traditional SEO?", answer: "Traditional SEO often focuses on individual pages and editorial campaigns. Programmatic SEO adds a data and engineering layer so a validated page pattern can serve many specific intents while retaining quality control." },
      { question: "Does programmatic SEO work for Google and AI search?", answer: "It can, when pages are genuinely useful, crawlable, current, and supported by clear entities and internal links. Scale does not replace relevance or evidence. Search systems still need a reason to trust each page." }
    ]
  },
  {
    pillar: "grow",
    slug: "on-page-seo",
    name: "On-page SEO",
    title: "On-page SEO that answers the search behind the keyword",
    description: "On-page SEO for clearer topical coverage, stronger page intent, useful internal links, and content people can understand.",
    intro: "On-page SEO is not sprinkling phrases into copy. It is making a page the clearest, most useful answer to a defined search intent, then connecting it to the rest of the site so users and crawlers can follow the topic.",
    audience: "For sites with good expertise but unclear pages, overlapping topics, weak briefs, or content that attracts impressions without action.",
    approach: [
      "Separate topics by intent and audience, then decide which page should own each important query.",
      "Improve the information gain, evidence, headings, examples, metadata, and internal links that help a page do its job.",
      "Measure qualified traffic and useful actions alongside rankings, because visibility without relevance is a poor target."
    ],
    deliverables: ["Content and intent mapping", "Page briefs or content revisions", "Internal linking and entity recommendations", "Metadata, headings, schema, and measurement guidance"],
    faqs: [
      { question: "What is on-page SEO?", answer: "On-page SEO improves the content and HTML signals on a page so its purpose, subject, evidence, and relationship to the site are clear to users and search engines." },
      { question: "How do you choose keywords for a page?", answer: "The starting point is the task the visitor is trying to complete. Search language, related questions, existing performance, business value, and competing page intent then shape the page target." },
      { question: "How many keywords should a page target?", answer: "A page should usually own one coherent intent and its natural variations. A list of unrelated keywords often signals that several pages or a better information architecture are needed." },
      { question: "Does updating old content help rankings?", answer: "It can when the update improves accuracy, completeness, usefulness, and intent alignment. Changing dates or adding phrases without improving the answer is unlikely to create durable value." }
    ]
  },
  {
    pillar: "grow",
    slug: "link-building",
    name: "Link building and digital PR",
    title: "Link building based on something worth citing",
    description: "Digital PR and link building built around useful evidence, original assets, relevant relationships, and a clear risk standard.",
    intro: "A link is most valuable when it is earned because a publisher or practitioner wants readers to see the source. We focus on the research, tools, data, and expertise that make a relevant mention reasonable, rather than volume for its own sake.",
    audience: "For organisations with genuine expertise or data that need stronger authority in a competitive search category.",
    approach: [
      "Assess the current link profile, competitors, audience, claim strength, and topics where the business can contribute something original.",
      "Create or refine an asset with a clear source, method, expert point of view, or usable dataset.",
      "Build targeted outreach around relevance and timing, then record outcomes and protect the brand from poor quality placements."
    ],
    deliverables: ["Authority and competitor link review", "Digital PR angle and asset planning", "Targeted outreach and relationship tracking", "Quality review and link profile monitoring"],
    faqs: [
      { question: "What makes a good backlink?", answer: "Relevance, editorial context, a real audience, a credible publisher, and a natural reason to reference the page matter more than a simple authority metric." },
      { question: "Do you buy backlinks?", answer: "The focus is earned coverage and relevant editorial links. Paid placements must be transparent and handled within search engine guidelines, with no promise that payment creates ranking value." },
      { question: "How long does link building take?", answer: "Research and asset work can begin quickly, but editorial coverage depends on the strength of the idea, publisher cycles, and relationships. It should be measured as a sustained authority programme rather than a one week tactic." },
      { question: "Can digital PR support AI search visibility?", answer: "Third party references can strengthen the broader evidence around a brand and its expertise. They work best alongside clear first party pages that explain the entity, claims, and supporting work." }
    ]
  },
  {
    pillar: "grow",
    slug: "geo",
    name: "Generative Engine Optimisation",
    title: "GEO for visibility in AI answers and search summaries",
    description: "Generative Engine Optimisation for clear entities, retrievable evidence, and content designed to be understood by modern search systems.",
    intro: "Generative Engine Optimisation is the work of making a business and its useful information easier for answer systems to identify, retrieve, interpret, and cite. It combines technical SEO, entity clarity, source quality, and content that answers real questions directly.",
    audience: "For businesses that want to be understood in AI answers as well as conventional search results.",
    approach: [
      "Define the entities, services, people, places, proof, and relationships that should be consistently understood across the site.",
      "Create source pages with direct answers, strong evidence, clear authorship, structured data, and links to supporting detail.",
      "Track representative prompts and search journeys over time without treating one answer snapshot as a ranking guarantee."
    ],
    deliverables: ["Entity and source audit", "AI search content and information architecture", "Structured data and technical retrieval improvements", "Prompt monitoring framework and authority plan"],
    faqs: [
      { question: "What is GEO?", answer: "GEO stands for Generative Engine Optimisation. It is the practice of improving how clearly a business, its expertise, and its sources can be retrieved and represented in AI generated answers." },
      { question: "Is GEO the same as SEO?", answer: "They overlap heavily in technical foundations, useful content, entities, and authority. GEO adds more attention to answer retrieval, source clarity, citations, and how information is summarised across systems." },
      { question: "Can you guarantee a brand will be cited by an AI model?", answer: "No responsible provider can guarantee a particular citation. Models, indexes, prompts, and retrieval systems change. The work improves the quality and discoverability of the sources that systems can use." },
      { question: "What content helps AI search understand a business?", answer: "Clear service pages, specific evidence, named expertise, consistent organisation details, useful FAQs, original data, descriptive links, and structured data all help establish what the business does and why it is credible." }
    ]
  },
  {
    pillar: "grow",
    slug: "content-branding",
    name: "Content and branding",
    title: "Content and branding with a point of view",
    description: "Content strategy and brand systems that make technical or complex businesses easier to recognise, understand, and trust.",
    intro: "Brand is not decoration around the work. It is the pattern people remember when they compare options. We connect positioning, language, visual rules, and useful content so the business sounds like one considered organisation everywhere it appears.",
    audience: "For technical, specialist, or growing businesses whose expertise is stronger than their current presentation.",
    approach: [
      "Find the concrete difference, audience tension, proof, and language the business can own.",
      "Turn that foundation into page structures, editorial themes, messaging rules, and a visual system that can survive daily use.",
      "Keep content tied to decisions and evidence, not a publishing calendar that produces noise."
    ],
    deliverables: ["Positioning and messaging framework", "Website and service page copy direction", "Editorial themes and content briefs", "Practical brand and content guidelines"],
    faqs: [
      { question: "What is included in content and branding work?", answer: "The scope can include positioning, audience and competitor review, messaging hierarchy, tone, key page copy, editorial themes, visual direction, and guidelines for consistent future content." },
      { question: "Can you work with an existing brand?", answer: "Yes. A useful engagement may refine the current identity rather than replace it. The aim is to remove ambiguity and make the existing strengths easier to apply across the site and content." },
      { question: "How does branding support SEO?", answer: "A clear brand gives pages a consistent entity and point of view. Better messaging also improves relevance, engagement, direct searches, links, and the usefulness of pages that search systems evaluate." },
      { question: "Do you write the content or only provide strategy?", answer: "The engagement can include page copy and detailed briefs. The right balance depends on subject expertise, approvals, source material, and who will maintain the content after launch." }
    ]
  },
  {
    pillar: "grow",
    slug: "social-media",
    name: "Social media management",
    title: "Social media management with a reason to post",
    description: "Social media planning and management for organisations that need consistent, useful communication without losing their voice.",
    intro: "Social activity should support a real business objective: trust, demand, conversation, recruitment, or retention. We help turn expertise and daily work into a manageable publishing system with clear formats and feedback loops.",
    audience: "For businesses that have something valuable to say but lack the time, structure, or consistency to say it well.",
    approach: [
      "Choose channels and formats based on audience behaviour and the organisation's ability to sustain them.",
      "Create repeatable editorial pillars from real work, customer questions, proof, and informed opinions.",
      "Review performance for meaningful signals such as qualified conversations, profile actions, and assisted demand."
    ],
    deliverables: ["Channel and audience review", "Content pillars and monthly planning", "Post copy, creative direction, and scheduling", "Reporting and refinement based on useful signals"],
    faqs: [
      { question: "Which social platforms should a business use?", answer: "The right channels depend on where the audience pays attention, what the business can demonstrate, and the format it can sustain. More platforms do not automatically create more useful reach." },
      { question: "How often should a business post?", answer: "A consistent schedule that the team can maintain is better than an ambitious burst followed by silence. Frequency should follow the channel, available material, and the objective of the programme." },
      { question: "Can social media improve SEO?", answer: "Social links are not a simple ranking lever. Social can still increase discovery, branded searches, relationships, traffic, and the reach of original material that may later earn editorial references." },
      { question: "Do you manage replies and community engagement?", answer: "Community management can be included where access, response times, escalation rules, and brand boundaries are agreed in advance." }
    ]
  },
  {
    pillar: "grow",
    slug: "paid-ads",
    name: "Paid ads",
    title: "Paid ads measured beyond the click",
    description: "Paid search and social advertising built around sound tracking, focused landing pages, and decisions based on qualified outcomes.",
    intro: "Paid media works best when the message, landing page, tracking, and commercial follow through agree. We build campaigns around the questions people ask and the actions that show whether the spend is creating useful demand.",
    audience: "For businesses with a validated offer that need controlled acquisition, testing, or better visibility into marketing performance.",
    approach: [
      "Define the conversion that matters and test whether the measurement survives consent, devices, forms, and offline follow up.",
      "Separate intent, audience, creative, landing page, and budget decisions so performance can be understood.",
      "Use search terms, lead quality, and marginal return to refine the programme rather than chasing cheap clicks."
    ],
    deliverables: ["Account and tracking review", "Campaign and landing page structure", "Ad copy and audience testing", "Reporting tied to leads, revenue, or agreed business actions"],
    faqs: [
      { question: "When should a business use paid ads?", answer: "Paid ads can help when the offer, landing page, sales process, and measurement are ready enough to learn from controlled demand. They should not hide an unclear proposition or broken conversion path." },
      { question: "Do paid ads improve organic rankings?", answer: "Buying ads does not directly purchase organic rankings. Paid campaigns can reveal language, demand, and conversion behaviour that informs organic work, while the two channels remain measured separately." },
      { question: "How much should we spend on advertising?", answer: "Budget depends on demand, margins, conversion rate, sales capacity, and the cost of a qualified outcome. A sensible test budget should buy enough evidence to make a decision, not just generate a report." },
      { question: "Can you improve campaigns we already run?", answer: "Yes. An audit can examine search terms, structure, bidding, creative, landing pages, tracking, lead quality, and the handoff after a conversion before recommending changes." }
    ]
  },
  {
    pillar: "scale",
    slug: "ai-automations",
    name: "AI automations",
    title: "AI automation for repeatable work with clear limits",
    description: "AI automation for document handling, classification, drafting, routing, and cross platform workflows with human oversight where it matters.",
    intro: "AI automation is useful when it reduces a defined queue of repetitive work without hiding important decisions. We connect models to controlled workflows, source data, validation, and human review so the result can be trusted and improved.",
    audience: "For teams with high volume text or document work, repeated triage, or slow handoffs between systems.",
    approach: [
      "Choose a process with measurable effort, stable inputs, and a clear definition of an acceptable result.",
      "Keep model output bounded with retrieval, schemas, confidence checks, permissions, and an escalation path.",
      "Measure time saved and error rates in production, then improve the workflow from real exceptions rather than demos."
    ],
    deliverables: ["Workflow and automation assessment", "Model assisted classification, extraction, or drafting", "Human review, validation, and audit trail", "Integration, monitoring, and cost controls"],
    faqs: [
      { question: "What can AI automation do well?", answer: "It can help with repeatable language and document tasks such as classification, extraction, summarisation, drafting, routing, and search when the inputs, output format, and review rules are clear." },
      { question: "Should AI make decisions without a person?", answer: "Only where the risk is low, the result is testable, and the business accepts the failure mode. Sensitive or consequential decisions should have appropriate human review and an auditable process." },
      { question: "How do you protect confidential business data?", answer: "The design should minimise data sent to models, define retention and access, use approved providers, remove unnecessary personal data, and document what is processed and where." },
      { question: "How do you measure whether an AI automation works?", answer: "Measure the original task time, quality, exception rate, review effort, cost, and downstream outcome. A faster process that creates hidden correction work is not an improvement." }
    ]
  },
  {
    pillar: "scale",
    slug: "ai-agents",
    name: "AI agent development",
    title: "AI agents that use tools within defined boundaries",
    description: "AI agent development for research, operations, and support workflows that need controlled tool use, memory, and escalation.",
    intro: "An AI agent is more than a chat box. It can plan a bounded task, use approved tools, inspect results, and ask for help when a decision exceeds its authority. We build agent workflows around explicit permissions, observable steps, and useful failure behaviour.",
    audience: "For teams exploring multi step AI workflows where a fixed prompt or simple automation is not enough.",
    approach: [
      "Define the task, tools, data boundary, success criteria, refusal conditions, and human handoff before selecting a model.",
      "Keep actions narrow and inspectable. Validate tool arguments, isolate credentials, and require confirmation for consequential operations.",
      "Evaluate with representative cases, adversarial inputs, latency, cost, and real failure logs before expanding access."
    ],
    deliverables: ["Agent workflow and tool boundary design", "Retrieval, orchestration, and structured outputs", "Permissions, evaluation set, and observability", "Human escalation and production rollout plan"],
    faqs: [
      { question: "What is an AI agent?", answer: "An AI agent is a model assisted workflow that can interpret a task, choose from approved tools or steps, inspect results, and continue or escalate within defined limits." },
      { question: "How are AI agents different from automations?", answer: "A fixed automation follows known rules. An agent can handle some variation and select the next permitted step, but that flexibility adds testing, permission, monitoring, and cost requirements." },
      { question: "Can an AI agent access our internal systems?", answer: "It can use narrowly scoped tools when the access model is designed correctly. Credentials should remain outside the model, actions should be validated, and sensitive operations should require appropriate approval." },
      { question: "How do you stop an agent from taking unsafe actions?", answer: "Use least privilege, allowlisted tools, typed inputs, step limits, data filters, confirmation gates, audit logs, evaluation cases, and a reliable human escalation route." },
      { question: "Which model should an AI agent use?", answer: "The best model depends on task difficulty, latency, cost, context, privacy, and tool use. The workflow should be evaluated against representative cases rather than choosing on brand name alone." }
    ]
  },
  {
    pillar: "scale",
    slug: "analytics",
    name: "Business insights and analytics",
    title: "Analytics that help someone make a decision",
    description: "Analytics engineering, dashboards, data pipelines, and reporting that connect activity to decisions people can take.",
    intro: "A dashboard is only useful when it changes what someone does. We build measurement systems around clear definitions, reliable sources, and the questions that matter to the operation, marketing team, or leadership group.",
    audience: "For teams reconciling reports by hand, arguing over numbers, or collecting data without a dependable decision loop.",
    approach: [
      "Define the decisions, metrics, owners, grain, source systems, and acceptable freshness before choosing a chart.",
      "Create a dependable data layer with documented transformations, tests, permissions, and a visible treatment of missing data.",
      "Present only what the audience can interpret and act on, with drill downs where investigation is genuinely needed."
    ],
    deliverables: ["Measurement plan and metric definitions", "Data ingestion and transformation pipeline", "Operational or marketing dashboards", "Data quality checks and reporting documentation"],
    faqs: [
      { question: "What is the difference between analytics and reporting?", answer: "Reporting presents information on a schedule. Analytics connects data to a question, explanation, or decision. A useful reporting system can support both, but it needs shared definitions and dependable sources." },
      { question: "Can you combine data from different tools?", answer: "Yes, after checking identifiers, grain, time zones, attribution rules, API limits, and ownership. Combining tables without resolving those details often creates a confident looking but incorrect report." },
      { question: "How do you know whether a metric is reliable?", answer: "Document its definition and source, test transformations, check freshness and completeness, compare expected totals, and make exceptions visible to the person responsible for the data." },
      { question: "Should every team have a dashboard?", answer: "Only when a recurring decision benefits from shared, timely information. Sometimes a small report, alert, or better source table is more useful than another visual dashboard." }
    ]
  }
];

export const RELATED_SERVICE_SLUGS: Record<string, string[]> = {
  "website-development": ["technical-seo", "web-design", "custom-software"],
  "web-design": ["website-development", "on-page-seo", "mobile-apps"],
  "custom-software": ["systems-integrations", "ai-agents", "analytics"],
  "mobile-apps": ["custom-software", "web-design", "systems-integrations"],
  "systems-integrations": ["custom-software", "ai-automations", "analytics"],
  "technical-seo": ["programmatic-seo", "geo", "website-development"],
  "programmatic-seo": ["technical-seo", "geo", "custom-software"],
  "on-page-seo": ["technical-seo", "content-branding", "geo"],
  "link-building": ["content-branding", "technical-seo", "geo"],
  geo: ["technical-seo", "programmatic-seo", "content-branding"],
  "content-branding": ["on-page-seo", "link-building", "website-development"],
  "social-media": ["content-branding", "paid-ads", "website-development"],
  "paid-ads": ["website-development", "analytics", "content-branding"],
  "ai-automations": ["ai-agents", "systems-integrations", "custom-software"],
  "ai-agents": ["ai-automations", "custom-software", "systems-integrations"],
  analytics: ["custom-software", "technical-seo", "ai-automations"],
};

export function getServicePage(pillar: string, slug: string) {
  return SERVICE_PAGES.find((page) => page.pillar === pillar && page.slug === slug);
}
