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

export function track(event: string, params: Params = {}): void {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, params);
  } catch {
    /* Analytics is never allowed to break the page. */
  }
}
