/* Trusted by. Organisations Manuel Technologies has delivered work for.
   -------------------------------------------------------------------------
   RULE, see CLAUDE.md section 7: this list is COMPANY work only. Anything
   delivered as an employee of another agency belongs on /about as personal
   experience, attributed to Emmanuel, never here.

   `logo` is optional. Where a real SVG exists in /public/clients it is used.
   Where it does not, the name renders as a wordmark, which is honest and
   costs nothing. Never scrape a client logo from their site.
   ------------------------------------------------------------------------- */

export type Client = {
  name: string;
  /* Shorter form for the rail where the full name is long. */
  display?: string;
  sector?: string;
  logo?: string;
};

export const CLIENTS: Client[] = [
  { name: "MEST Africa", sector: "Technology training" },
  { name: "Ipsos", sector: "Market research" },
  {
    name: "Ghana Communication Technology University",
    display: "GCTU",
    sector: "Higher education",
  },
  { name: "Ghana AI Summit", sector: "Events" },
  { name: "Impressiful", sector: "Ecommerce" },
  { name: "Miyaki Beauty GH", display: "Miyaki Beauty", sector: "Beauty retail" },
  { name: "Dementia Companions", sector: "Healthcare" },
  { name: "BOT Properties", sector: "Property" },
  { name: "The Equator", sector: "Property" },
  { name: "Texoconnect", sector: "Technology" },
  { name: "Sizanid Staffing", sector: "Recruitment" },
  { name: "Sarat Cosmetics", sector: "Beauty" },
];

/* HELD BACK pending classification. See CLAUDE.md section 7.
   Higglo Digital was confirmed as a staff role, not a Manuel Technologies
   engagement, so it cannot appear here. Strouse Growth Partners needs the
   same check. Both belong on /about if they were employment.

   const PENDING = ["Higglo Digital", "Strouse Growth Partners"]; */
