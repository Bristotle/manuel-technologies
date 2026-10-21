/* --------------------------------------------------------------------------
   ManuelPOS, the facts this site states about it. One place, read by /mpos,
   the work index, the Scale hub and /build/custom-software.

   Source: mpos.bz and mpos.bz/pricing as published on 21 October 2026.
   Anything not on mpos.bz does not go here: no prices (it publishes none),
   no customer counts, no coverage claims, and no GRA certification, since
   what it does is calculate VAT, NHIL and GETFund on receipts.

   Documentation lives on mpos.bz, decided 21 October 2026, so that domain
   builds its own authority and the content is not split across two sites.
   -------------------------------------------------------------------------- */

export const MPOS = {
  url: "https://mpos.bz",
  pricingUrl: "https://mpos.bz/pricing",
  summary:
    "ManuelPOS is the till, bookings, stock and reports system for Ghanaian businesses. It keeps selling when the network drops, takes MoMo straight into the business's own wallet, and lets the owner check on the business from anywhere.",
  /* Countable on mpos.bz by anyone. Used as the work card's metric. */
  metric: "6 business types",
  businessTypes: [
    { name: "Shops and mini-marts", detail: "Fast scanning, suppliers and deliveries, credit customers and several tills." },
    { name: "Restaurants and chop bars", detail: "Tables, a kitchen screen, reservations and orders from the business's own menu page on WhatsApp." },
    { name: "Salons, spas and nail studios", detail: "Bookings by stylist with real service times, online booking and product sales." },
    { name: "Barbershops", detail: "Appointments by barber, a fair walk-in queue and commission worked out for every cut." },
    { name: "Beauty and cosmetics shops", detail: "Barcode checkout, shades and sizes, wholesale prices and stock that adds up." },
    { name: "Pharmacies and chemical shops", detail: "Selling by the strip or the box, expiry by batch, and VAT-exempt medicines on every receipt." },
  ],
  features: [
    { title: "Keeps selling offline", body: "Lights off, data finished, network gone: the till carries on. Sales are saved on the device and upload by themselves when the connection returns." },
    { title: "MoMo straight to the business", body: "Customers pay into the business's own MoMo number or merchant account. No payment company in the middle and no fee on takings. Each transaction ID is recorded for a monthly check against the statement." },
    { title: "Tax worked out on every receipt", body: "VAT, NHIL and GETFund calculated under the 2026 rules, with a monthly breakdown for returns. Switched off entirely for businesses that are not VAT registered." },
    { title: "A page for bookings and orders", body: "Every business gets an address like yourname.mpos.bz with QR codes, where customers see the menu or services, book, and order on WhatsApp." },
    { title: "Staff see only their own screens", body: "Each person signs in with a role. Cashiers sell, managers approve discounts and voids, and only the owner sees the reports and the money." },
    { title: "Several branches, one login", body: "Each branch keeps its own tills and stock, stock moves between branches, and the owner compares them side by side." },
  ],
  steps: [
    { title: "Try it free for 14 days", body: "Create an account, add a menu or product list, and ring up real sales. No payment details needed." },
    { title: "Agree a price", body: "Priced by size, number of tills and branches. One conversation, no surprises later." },
    { title: "Pay by MoMo, renew yearly", body: "Pay the agreed setup and licence fee and the business is switched on, usually the same day." },
  ],
} as const;
