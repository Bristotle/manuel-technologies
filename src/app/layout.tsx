import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT, SOCIAL } from "@/lib/site";
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
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body-face",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
