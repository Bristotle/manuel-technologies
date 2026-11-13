/* --------------------------------------------------------------------------
   Conversion events for Google Analytics. Added 21 October 2026, so the site
   is measured on leads, not only visits.

   gtag is defined by the consent script in layout.tsx before anything else
   runs, and it queues into the data layer, so an event fired before gtag.js
   has loaded is still sent once it arrives. Never throws: analytics must
   never break a form.

   In GA, mark generate_lead, sign_up, click_call and click_whatsapp as key
   events. Admin, Data display, Events, then the star beside each.
   -------------------------------------------------------------------------- */

type Params = Record<string, string | number | boolean | undefined>;

/* Meta Pixel standard events, 13 November 2026, so Facebook and Instagram
   ads can optimise for enquiries rather than page views. A form send is a
   Lead, a newsletter sign up is CompleteRegistration, a call or WhatsApp
   tap is Contact. fbq only exists outside the UK and Europe (layout.tsx),
   so elsewhere this is a no op. */
const META: Record<string, string> = {
  generate_lead: "Lead",
  sign_up: "CompleteRegistration",
  click_call: "Contact",
  click_whatsapp: "Contact",
};

export function track(event: string, params: Params = {}): void {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };
    w.gtag?.("event", event, params);
    const meta = META[event];
    if (meta) w.fbq?.("track", meta, params);
  } catch {
    /* Analytics is never allowed to break the page. */
  }
}
