import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpWidget } from "@/components/HelpWidget";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CONTACT, SITE as SITE_CONFIG, SOCIAL } from "@/lib/site";
import "./globals.css";

/* --------------------------------------------------------------------------
   Typeface, chosen 22 September 2026. Bricolage Grotesque for display, IBM
   Plex Sans for body, IBM Plex Mono for the bracket labels. Replaces Space
   Grotesk and Space Mono, which had been the placeholder since launch and
   are the single most recognisable tell of a template built site. Nothing
   else in the codebase references a font name.
   -------------------------------------------------------------------------- */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
  weight: ["800"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-body-face",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-mono-face",
});

const SITE = "https://manueltechnologies.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Manuel Technologies | Build. Grow. Scale.",
    template: "%s | Manuel Technologies",
  },
  description:
    "We build websites and custom software, grow them through technical SEO and GEO, and automate the work behind them. Working with clients worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Manuel Technologies",
    title: "Manuel Technologies | Build. Grow. Scale.",
    description:
      "Websites and custom software, technical SEO and GEO, AI automation. Built by an engineer, not a marketer.",
    locale: "en_GB",
    images: [
      {
        url: "/og-default.webp",
        width: 1000,
        height: 1000,
        alt: "Manuel Technologies",
      },
    ],
  },
  /* Card type only. Title, description and image fall through from each
     page's openGraph block. Hardcoding them here sent the homepage title
     and a blank image on every shared service page and article. */
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/* --------------------------------------------------------------------------
   Google Analytics consent defaults. Must reach the data layer before gtag.js
   loads, so this runs as an
   inline script in the server rendered body.

   UK, EU, EEA and Switzerland: analytics storage denied by default. GA gets
   cookieless pings and no cookie is set, which is why the site needs no
   cookie banner. Everywhere else: analytics storage granted. Advertising
   storage is denied everywhere, because the site runs no ads. The privacy
   policy states exactly this; change both together.
   -------------------------------------------------------------------------- */
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "CH", "GB",
];

const GA_CONSENT_DEFAULTS = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',region:${JSON.stringify(CONSENT_REGIONS)}});
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('set','ads_data_redaction',true);`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* Organization schema. NOT "AutomationCompany", which is not a real
     schema.org type and would be silently ignored. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Manuel Technologies",
    url: SITE,
    logo: `${SITE}/logo.svg`,
    email: "info@manueltechnologies.com",
    telephone: CONTACT.tel,
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: CONTACT.hoursSchema.days,
      opens: CONTACT.hoursSchema.opens,
      closes: CONTACT.hoursSchema.closes,
    },
    slogan: "Build. Grow. Scale.",
    description:
      "Websites, custom software, technical SEO, GEO and AI automation.",
    areaServed: [{ "@type": "Country", name: "Ghana" }, { "@type": "Country", name: "United Kingdom" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "United Arab Emirates" }],
    founder: {
      "@type": "Person",
      name: "Emmanuel Akyeam",
      jobTitle: "Founder and Technical Lead",
    },
    /* Every profile that verifiably belongs to the company. Google uses
       these to connect the site to a known entity rather than treating it as
       an unattached domain.

       LinkedIn, Facebook, X and GitHub, from SOCIAL in src/lib/site.ts. */
    sameAs: SOCIAL.filter((s) => s.href).map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@manueltechnologies.com",
      telephone: CONTACT.tel,
      areaServed: [{ "@type": "Country", name: "Ghana" }, { "@type": "Country", name: "United Kingdom" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "United Arab Emirates" }],
      availableLanguage: "English",
    },
    knowsAbout: [
      "Technical SEO",
      "Programmatic SEO",
      "Generative Engine Optimization",
      "Web Development",
      "Custom Software",
      "AI Automation",
      "AI Agent Development",
    ],
  };

  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: GA_CONSENT_DEFAULTS }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        {/* Floating help panel bottom left and WhatsApp bottom right, as on
            getfold.org. The WhatsApp link ships no JavaScript. */}
        <HelpWidget />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
      {/* gtag.js is 166KB and runs a long task. Loaded after the page has
          finished and the browser is idle, never at hydration, where it took
          the homepage from 95 to 86 on mobile and blocking time from 40ms to
          380ms. The page view is queued in the data layer first, so a visit
          is still counted once the script arrives. */}
      <Script id="ga-config" strategy="lazyOnload">
        {`gtag('js', new Date()); gtag('config', '${SITE_CONFIG.gaId}');`}
      </Script>
      <Script
        id="ga"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`}
      />
    </html>
  );
}
