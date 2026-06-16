import type { Metadata } from "next";
import { Inter, Stack_Sans_Notch } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_TITLE_TEMPLATE,
  SITE_URL,
  SOCIAL_SAME_AS,
} from "@/lib/seo/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const stackSansNotch = Stack_Sans_Notch({
  variable: "--font-stack",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  icons: {
    icon: [{ url: "/icon-forge.png", type: "image/png" }],
    apple: [{ url: "/icon-forge.png", type: "image/png" }],
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}#organization`,
  name: SITE_NAME,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: "info@forgegroup.it",
  description: SITE_DESCRIPTION,
  sameAs: [...SOCIAL_SAME_AS],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@forgegroup.it",
    contactType: "customer service",
    areaServed: "IT",
    availableLanguage: ["it"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#localbusiness`,
  name: SITE_NAME,
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  email: "info@forgegroup.it",
  priceRange: "€€€",
  sameAs: [...SOCIAL_SAME_AS],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Campania",
    addressCountry: "IT",
  },
  areaServed: [
    { "@type": "Country", name: "Italia" },
    { "@type": "AdministrativeArea", name: "Campania" },
    { "@type": "City", name: "Napoli" },
    { "@type": "City", name: "Salerno" },
    { "@type": "City", name: "Caserta" },
    { "@type": "City", name: "Avellino" },
    { "@type": "City", name: "Benevento" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  url: siteUrl,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${siteUrl}#organization` },
  inLanguage: "it-IT",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${stackSansNotch.variable} antialiased`}>
      <body
        className="min-h-screen flex flex-col text-brand-nero"
        style={{ backgroundColor: "transparent" }}
      >
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(localBusinessJsonLd)}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
