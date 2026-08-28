/* Systems we integrate against. Rendered as names in the bracket style,
   never as third party logos. Logos imply partnership or endorsement we
   do not have, and they would cost image weight for zero information.
   Names carry the same signal at 0KB. */

export type IntegrationGroup = {
  category: string;
  note: string;
  systems: readonly string[];
};

export const INTEGRATIONS: IntegrationGroup[] = [
  {
    category: "Automation platforms",
    note: "Orchestration where a managed runner is the right call, and custom code where it is not.",
    systems: ["n8n", "Make", "Zapier", "Temporal", "Custom workflow engines"],
  },
  {
    category: "Language models",
    note: "Model choice is a cost and latency decision, not a loyalty one. We route per task.",
    systems: ["OpenAI", "Anthropic", "Google Gemini", "xAI Grok", "Self hosted open weights"],
  },
  {
    category: "CRM and sales",
    note: "Agents read and write against the record your team already works in.",
    systems: ["HubSpot", "Salesforce", "Pipedrive", "Close", "Airtable"],
  },
  {
    category: "Communication",
    note: "Where the work actually gets requested, approved and escalated.",
    systems: ["Slack", "Microsoft Teams", "WhatsApp Business API", "Gmail", "Outlook"],
  },
  {
    category: "Commerce and billing",
    note: "Order, invoice and subscription events as automation triggers.",
    systems: ["Stripe", "Shopify", "WooCommerce", "Xero", "QuickBooks"],
  },
  {
    category: "Data and storage",
    note: "Direct connections, not exports. The pipeline reads the source of truth.",
    systems: ["PostgreSQL", "MySQL", "BigQuery", "Google Sheets", "Notion", "S3"],
  },
];
