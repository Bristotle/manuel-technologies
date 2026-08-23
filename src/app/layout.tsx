import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

/* --------------------------------------------------------------------------
   Typeface. Recommendation is Space Grotesk + Space Mono.
   If you pick differently from typeface-picker.html, change ONLY this block.
   Nothing else in the codebase references a font name.
   -------------------------------------------------------------------------- */
const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
});

const mono = Space_Mono({
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
    "We build websites and custom software, grow them through technical SEO and GEO, and automate the work behind them. Accra, Ghana. Clients in the UK, US and UAE.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Manuel Technologies",
    title: "Manuel Technologies | Build. Grow. Scale.",
    description:
      "Websites and custom software, technical SEO and GEO, AI automation. Built by an engineer, not a marketer.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Technologies | Build. Grow. Scale.",
    description:
      "Websites and custom software, technical SEO and GEO, AI automation.",
  },
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
    slogan: "Build. Grow. Scale.",
    description:
      "Websites, custom software, technical SEO, GEO and AI automation.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    founder: {
      "@type": "Person",
      name: "Emmanuel Akyeam",
      jobTitle: "Technical SEO Manager and Engineer",
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
    <html lang="en-GB" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
