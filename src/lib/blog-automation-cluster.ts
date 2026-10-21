import type { BlogPost } from "@/lib/blog-posts";
import type { BlogFaq, BlogSection } from "@/lib/blog-types";
import { calculateAutomation } from "@/lib/tools/automation";

/* --------------------------------------------------------------------------
   AI and automation cluster, second wave. Added 21 October 2026, when the
   cluster had four posts against fifteen in the cost cluster. Pillar:
   /scale/ai-automations, which links down to every post here through
   serviceHref.

   RULES FOR THIS FILE
   1. No automation prices. The site publishes none, so no post implies one.
   2. The worked example is computed by calculateAutomation, the same
      function behind /free-tools/automation-roi, so the post and the tool
      can never disagree. Its inputs are labelled as an illustration.
   3. WhatsApp rules are taken from Meta's own documentation, checked on
      21 October 2026. Meta has changed its pricing several times since 2024,
      so the posts state the mechanism and send readers to the current page
      rather than quoting a rate that will go stale.
   4. Legal points name the law and the regulator and stop there. Not advice.
   -------------------------------------------------------------------------- */

const faq = (question: string, answer: string): BlogFaq => ({ question, answer });
const section = (heading: string, ...paragraphs: string[]): BlogSection => ({ heading, paragraphs });

export const AUTOMATION_CLUSTER = "AI and automation";
const DATE = "2026-10-21";

/* The worked example. Illustrative inputs, not a quote. */
const EXAMPLE = { people: 3, hoursPerWeek: 6, hourlyCost: 60, residual: 25, buildCost: 18000, monthlyRunCost: 600 };
const R = calculateAutomation(EXAMPLE);
const cedi = (n: number) => `GHS ${Math.round(n).toLocaleString("en-GB")}`;
const hours = (n: number) => Math.round(n).toLocaleString("en-GB");
const payback = Number.isFinite(R.paybackMonths) ? `${Math.ceil(R.paybackMonths)} months` : "never";

const SOURCES = {
  nist: { label: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
  owasp: { label: "OWASP Top 10 for LLM applications", href: "https://genai.owasp.org/llm-top-10/" },
  waApp: { label: "WhatsApp Business app", href: "https://business.whatsapp.com/products/business-app" },
  waApi: { label: "Meta: WhatsApp Cloud API", href: "https://developers.facebook.com/docs/whatsapp/cloud-api" },
  waPricing: { label: "Meta: WhatsApp Business Platform pricing", href: "https://developers.facebook.com/docs/whatsapp/pricing" },
  dpc: { label: "Data Protection Commission, Ghana", href: "https://www.dataprotection.org.gh" },
  ico: { label: "ICO: UK GDPR guidance", href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" },
};

export const AUTOMATION_CLUSTER_POSTS: BlogPost[] = [
  /* ---------------------------------------------------------------------
     Which task first. The commercial entry point to the cluster.
     --------------------------------------------------------------------- */
  {
    slug: "which-business-tasks-to-automate-first",
    cluster: AUTOMATION_CLUSTER,
    title: "Which business tasks should you automate first?",
    description: "Score each repetitive task on volume, rules, reversibility and data before automating anything. A practical way to choose the first one, with examples.",
    published: DATE,
    modified: DATE,
    readTime: "7 min read",
    lead: "Automate first the task that happens often, follows rules a person could write down, is easy to undo when it goes wrong, and already has its data in one place. Score your candidates on those four tests before spending anything. The task that annoys people most is often not the one that pays back first.",
    sections: [
      {
        ...section(
          "Four tests for a good first task",
          "Most businesses pick their first automation by frustration. A better way is to score every repetitive task against four tests, and start with the one that passes all four.",
          "A task that fails one test can still be automated later. It just should not be the first, because the first project sets how much the team trusts everything after it.",
        ),
        bullets: [
          "Volume. It happens many times a week, so small savings add up and problems show quickly.",
          "Rules. A person could write down how it is done. If the answer is usually \"it depends\", it is not ready.",
          "Reversible. A mistake can be caught and undone before it reaches a customer or a bank account.",
          "Data in reach. The inputs are already digital and in one place: a form, an inbox, a spreadsheet, a CRM.",
        ],
      },
      {
        ...section(
          "How common tasks score",
          "These are the tasks we are asked about most. The verdict is about where to start, not about what can never be automated.",
        ),
        table: {
          caption: "Common candidates, scored on the four tests",
          headers: ["Task", "Volume", "Rules", "Reversible", "Verdict"],
          rows: [
            ["Copying enquiries from a form into a CRM", "High", "Clear", "Yes", "Strong first candidate"],
            ["Appointment and payment reminders", "High", "Clear", "Yes", "Strong first candidate"],
            ["Sorting incoming enquiries by type", "High", "Mostly", "Yes", "Good, with a person checking edge cases"],
            ["Drafting replies to common questions", "Medium", "Partly", "Yes, a person sends", "Good as a draft, not an automatic send"],
            ["Approving refunds or discounts", "Low", "Partly", "No", "Leave with a person"],
            ["Paying suppliers", "Medium", "Clear", "No", "Automate the paperwork, not the payment"],
          ],
        },
      },
      section(
        "Put a number on it before you build",
        `Count the hours the task takes, at a fully loaded hourly cost, then subtract the share a person will still do afterwards for exceptions and checking. Add what it costs to build and to run. Our [automation ROI calculator](/free-tools/automation-roi) does this arithmetic and refuses to assume the task disappears completely.`,
        `As an illustration: three people spending six hours a week each on a task, at ${cedi(EXAMPLE.hourlyCost)} an hour, with a quarter of the work still needing a person, comes to ${hours(R.savings.annualHours)} hours a year handed back. With an assumed build cost of ${cedi(EXAMPLE.buildCost)} and ${cedi(EXAMPLE.monthlyRunCost)} a month to run, it pays back in ${payback}. Those inputs are assumptions for the example, not a quote. Run your own.`,
      ),
      {
        ...section(
          "Run the first one small",
          "The first automation should be boring on purpose. Its job is to prove the method, not to transform the business.",
        ),
        bullets: [
          "One task, one owner, and a written definition of what a good result looks like.",
          "Run it beside the existing process first and compare the two before switching over.",
          "Keep a way for a person to take over at any point, and make it obvious.",
          "Measure time saved, errors and manual corrections for a month before choosing the second task.",
        ],
      },
    ],
    conclusion: "The best first automation is rarely the most ambitious one. Pick the task that is frequent, rule based, reversible and already digital, put a number on it, run it small, and let the results decide what comes next.",
    faqs: [
      faq("What is the easiest thing to automate in a small business?", "Usually moving information that already exists into another system: enquiries from a website form into a CRM or spreadsheet, or reminders sent from a booking calendar. The rules are clear, the volume is steady, and mistakes are easy to spot and fix."),
      faq("Should a business start with an AI agent?", "Rarely. Most first tasks are covered by fixed rules, which are cheaper, more predictable and easier to test. An AI model earns its place where the input varies, such as reading free text to sort an enquiry, and even then a person should check the output at first."),
      faq("How do I know if automation is worth it?", "Count the hours the task takes, subtract the share a person will still do, and compare the saving with the cost to build and run it. If the saving does not cover the running cost, it never pays back, however clever the automation is."),
    ],
    sources: [SOURCES.nist, SOURCES.owasp],
    serviceHref: "/scale/ai-automations",
  },

  /* ---------------------------------------------------------------------
     WhatsApp. The channel Ghanaian businesses actually sell through.
     --------------------------------------------------------------------- */
  {
    slug: "whatsapp-business-automation-ghana",
    cluster: AUTOMATION_CLUSTER,
    title: "Automating WhatsApp enquiries for a business in Ghana: what is possible",
    metaTitle: "WhatsApp automation for businesses in Ghana",
    description: "What the free WhatsApp Business app does on its own, when you need the WhatsApp Business Platform, the 24 hour rule, and what to automate first.",
    published: DATE,
    modified: DATE,
    readTime: "8 min read",
    lead: "The free WhatsApp Business app already handles greeting messages, away messages, quick replies, labels and a product catalogue, and many small businesses need nothing more. Automation beyond that, such as routing enquiries, logging them in a CRM or sending order updates, runs on the WhatsApp Business Platform, under Meta's rules on when a business may message a customer.",
    sections: [
      {
        ...section(
          "What the free app already does",
          "Before paying for anything, set up what the WhatsApp Business app includes at no cost. For a business with one or two people answering, it covers most of what is called automation.",
        ),
        bullets: [
          "A greeting message sent automatically to anyone who messages you for the first time.",
          "An away message outside your opening hours, so nobody is left wondering.",
          "Quick replies: saved answers to common questions, sent with a shortcut.",
          "Labels to sort chats into new enquiry, awaiting payment, delivered and so on.",
          "A catalogue, so customers can see products and prices without asking.",
        ],
      },
      {
        ...section(
          "When you need the WhatsApp Business Platform",
          "The app stops being enough when several people answer from one number, when enquiries need to land in another system automatically, or when you want to message customers at scale with order or appointment updates. That is the WhatsApp Business Platform, used through its API, either directly with Meta or through a provider.",
        ),
        table: {
          caption: "WhatsApp Business app and WhatsApp Business Platform",
          headers: ["Feature", "Business app", "Business Platform"],
          rows: [
            ["Suits", "One or two people answering", "A team, or a system answering first"],
            ["Automatic replies", "Greeting, away and quick replies", "Any logic you build, including routing and AI drafting"],
            ["Connects to a CRM or website", "No", "Yes, through the API"],
            ["Messages you start", "Manual, one chat at a time", "Approved templates, sent by your system"],
            ["Cost", "Free", "Meta charges per delivered business message, plus any provider or build cost"],
          ],
        },
      },
      section(
        "The 24 hour rule shapes everything",
        "On the platform, every message a customer sends opens a 24 hour customer service window. While it is open, your business can reply freely, by a person or by your system. Once it closes, you can only reach that customer with a template message that Meta has approved in advance.",
        "This changes how an automation should be designed. Conversations the customer starts are where automation works best. Reminders and order updates you send first need approved templates and a customer who has agreed to receive them. Meta charges by message category and by the country of the number receiving it, and it has changed its pricing several times since 2024, so check its [current pricing page](https://developers.facebook.com/docs/whatsapp/pricing) before you budget.",
      ),
      {
        ...section(
          "What to automate first on WhatsApp",
          "Start with the steps that cost you enquiries today: slow first replies, lost details and no follow up. Keep a person a message away at every point.",
        ),
        bullets: [
          "An instant first reply that asks what the customer needs and routes them to the right person.",
          "Every new enquiry logged in your CRM or spreadsheet with the name, number and question, so nothing lives only in one phone.",
          "Order and appointment confirmations by approved template, to customers who opted in.",
          "A clear way to reach a person at any time. A customer who cannot escape a bot leaves.",
        ],
      },
      section(
        "Where your website fits",
        "WhatsApp is where conversations happen. A website is where a stranger decides whether you are worth messaging, and where search engines and AI assistants find you at all. We cover that trade off in [do you need a website if you sell on WhatsApp](/blog/do-you-need-a-website-if-you-sell-on-whatsapp), and taking payment by mobile money in [MoMo payment integration](/blog/momo-payment-integration-website-ghana).",
      ),
    ],
    conclusion: "Set up the free app properly first. Move to the platform when a team, a CRM or customer updates at scale demand it, design around the 24 hour window, and never trap a customer in an automated loop.",
    faqs: [
      faq("Is the WhatsApp Business app free?", "Yes. The app is free to download and use, and includes greeting messages, away messages, quick replies, labels and a catalogue."),
      faq("What is the 24 hour rule on WhatsApp?", "On the WhatsApp Business Platform, a customer's message opens a 24 hour customer service window in which the business can reply freely. After it closes, the business can only start a conversation with a template message approved by Meta."),
      faq("Can WhatsApp enquiries go straight into a CRM?", "Yes, through the WhatsApp Business Platform and its API. Each new enquiry can be logged with the customer's name, number and message, and assigned to a person, so it is not lost in one staff member's phone."),
    ],
    sources: [SOURCES.waApp, SOURCES.waApi, SOURCES.waPricing],
    serviceHref: "/scale/ai-automations",
  },

  /* ---------------------------------------------------------------------
     The cost of manual admin. The calculator, explained.
     --------------------------------------------------------------------- */
  {
    slug: "what-manual-admin-costs-your-business",
    cluster: AUTOMATION_CLUSTER,
    title: "What does manual admin cost your business? A worked example",
    metaTitle: "What manual admin costs your business",
    description: "How to put a number on repetitive admin before automating it: hours, loaded cost, the work a person still does, build and running cost, and payback.",
    published: DATE,
    modified: DATE,
    readTime: "6 min read",
    lead: `Multiply the people doing a task by their weekly hours, the working weeks in a year and a fully loaded hourly cost. Then subtract the share a person will still do after automation, and weigh what is left against the cost to build and run it. In our worked example that comes to ${hours(R.savings.annualHours)} hours a year and a payback of ${payback}.`,
    sections: [
      section(
        "Count the hours honestly",
        "Start with the people who do the task and the hours each spends on it in a typical week. Ask them, rather than estimating from a desk, and include the time spent fixing mistakes and chasing missing information.",
        "Use 46 working weeks, not 52, to allow for leave and public holidays. Use a fully loaded hourly cost, which includes employer contributions, equipment and office costs, not salary divided by the hours in a year.",
      ),
      section(
        "Subtract what a person will still do",
        "Automation almost never removes all of a task. Someone still handles exceptions, approves the unusual cases and checks what the system did. Estimate that share honestly. Our calculator will not let it fall below five per cent, because a task needing no person at all afterwards is very rare.",
      ),
      {
        ...section(
          "The worked example",
          "These inputs are illustrative, chosen to look like a typical small office task. They are not a quote and not a benchmark. Put your own numbers into the [automation ROI calculator](/free-tools/automation-roi).",
        ),
        table: {
          caption: "Worked example, computed by the same function as our free calculator",
          headers: ["Item", "Value"],
          rows: [
            ["People doing the task", String(EXAMPLE.people)],
            ["Hours each, per week", String(EXAMPLE.hoursPerWeek)],
            ["Fully loaded cost per hour", cedi(EXAMPLE.hourlyCost)],
            ["Share still done by a person", `${EXAMPLE.residual}%`],
            ["Hours a year today", hours(R.current.annualHours)],
            ["Hours a year after automation", hours(R.automated.annualHours)],
            ["Hours handed back a year", hours(R.savings.annualHours)],
            ["Assumed build cost", cedi(EXAMPLE.buildCost)],
            ["Assumed running cost a month", cedi(EXAMPLE.monthlyRunCost)],
            ["Net saving a year, after running cost", cedi(R.savings.netAnnual)],
            ["Payback", payback],
          ],
        },
      },
      section(
        "Saved hours are not always saved money",
        "The saving is only cash if the time is used for something else that earns or saves money, or if a hire is avoided. A team that keeps the same people and simply does more has gained capacity, not cash. That can be worth more, but it should be described honestly in the business case.",
        "If the net saving does not cover the running cost, the automation never pays back, however well it works. That is the most useful answer the calculation can give, because it stops a project before it starts rather than after.",
      ),
    ],
    conclusion: "Put a number on the task before anyone builds anything. Count real hours at real cost, keep the share a person still does, include the cost to build and run, and be honest about whether the saving is time or money.",
    faqs: [
      faq("How do I calculate the cost of a manual task?", "Multiply the number of people by their weekly hours on the task, by 46 working weeks, by a fully loaded hourly cost. That is the annual cost today, before any automation."),
      faq("What is a fully loaded hourly cost?", "The full cost of an hour of someone's time: salary plus employer contributions, benefits, equipment and a share of office costs. It is higher than salary divided by hours worked, and using salary alone understates the saving."),
      faq("Does automation pay for itself?", "Only when the hours it hands back, at your real hourly cost, exceed what it costs to run, and recover the build cost within a period you are comfortable with. For low volume tasks it often does not, and the calculation shows that before money is spent."),
    ],
    sources: [SOURCES.nist],
    serviceHref: "/scale/ai-automations",
  },

  /* ---------------------------------------------------------------------
     Data and privacy. The question every serious buyer asks second.
     --------------------------------------------------------------------- */
  {
    slug: "ai-automation-data-privacy",
    cluster: AUTOMATION_CLUSTER,
    title: "What data does an AI automation need, and who can see it?",
    metaTitle: "AI automation data privacy: what to settle first",
    description: "Data minimisation, model provider terms, retention and the law in Ghana and the UK: what to settle before sending customer data to an AI model.",
    published: DATE,
    modified: DATE,
    readTime: "7 min read",
    lead: "Send the model only what the task needs, remove what it does not, know which provider processes it and for how long, and write that down before launch. In Ghana the Data Protection Act, 2012 (Act 843) applies to the personal data your business processes, and customers in the UK bring UK GDPR with them.",
    sections: [
      section(
        "Start from the task, not the database",
        "List what the task actually needs to see. Sorting an enquiry by type needs the message, not the customer's phone number or payment history. Drafting a reply needs the question and your approved answers, not the full account record.",
        "Remove or mask everything else before it leaves your system. Names, phone numbers, account numbers and health details can often be replaced with placeholders and put back afterwards by your own code. The least risky data is the data the model never receives.",
      ),
      {
        ...section(
          "Know who processes it",
          "When an automation sends data to an AI model, the model provider processes it on your behalf. Ask the same questions you would ask of any supplier that handles customer data, and keep the answers.",
        ),
        table: {
          caption: "Questions to settle with any model or automation provider",
          headers: ["Question", "Why it matters"],
          rows: [
            ["Is data sent through the API used to train models?", "Major providers state that business API data is not used for training by default. Confirm it in the terms you sign."],
            ["Where is the data processed and stored?", "Data leaving Ghana or the UK may need safeguards under the law that applies to you."],
            ["How long are inputs and outputs kept?", "You cannot honour a deletion request for data a supplier keeps without limit."],
            ["Which other companies process it?", "Every sub-processor is another place the data lives."],
          ],
        },
      },
      section(
        "Decide how long anything is kept",
        "Automations create new records: logs of inputs, outputs, tool calls and reviews. Those logs are what make a system auditable, and they are personal data too. Decide how long each is kept, who can see it, and how it is deleted, before launch rather than after a request arrives.",
      ),
      section(
        "The law that applies",
        "In Ghana, the Data Protection Act, 2012 (Act 843) governs how personal data is processed, and the [Data Protection Commission](https://www.dataprotection.org.gh) is the regulator that data controllers register with. If you serve customers in the United Kingdom, [UK GDPR](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/) applies to their data, with the Information Commissioner's Office as regulator.",
        "This is a summary of what to check, not legal advice. For anything involving health, financial or children's data, take advice before launch.",
      ),
    ],
    conclusion: "Privacy in an AI automation is mostly decided before any model is chosen. Send less, mask more, know your processors and their terms, set retention for every log, and check the law that applies to the people whose data it is.",
    faqs: [
      faq("Do AI providers train on my business data?", "Major model providers state that data sent through their business APIs is not used to train their models by default. Consumer chat apps can have different terms. Check the terms of the specific service and plan you use."),
      faq("Which law covers personal data in Ghana?", "The Data Protection Act, 2012 (Act 843). The Data Protection Commission is the regulator, and organisations that process personal data register with it as data controllers."),
      faq("Can I use customer data in an AI automation?", "Usually yes, for a clear purpose and with only the data that purpose needs, processed by suppliers whose terms you have checked, and kept no longer than necessary. Sensitive categories such as health data need more care and often advice."),
    ],
    sources: [SOURCES.dpc, SOURCES.ico, SOURCES.nist, SOURCES.owasp],
    serviceHref: "/scale/ai-agents",
  },
];
