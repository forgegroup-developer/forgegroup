import type { Metadata } from "next";
import { Inter, Stack_Sans_Notch } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  absoluteUrl,
  getIndexableStaticRoutes,
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
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog/cerca?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pagine principali Forge Group",
  itemListElement: getIndexableStaticRoutes().map((route, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: route.label,
    url: absoluteUrl(route.path),
  })),
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
        <script id="ld-org" type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <script id="ld-localbusiness" type="application/ld+json">
          {JSON.stringify(localBusinessJsonLd)}
        </script>
        <script id="ld-website" type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
        <script id="ld-site-nav" type="application/ld+json">
          {JSON.stringify(siteNavigationJsonLd)}
        </script>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
