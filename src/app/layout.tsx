import type { Metadata } from "next";
import { Inter, Stack_Sans_Notch } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientSceneEffects from "@/components/ClientSceneEffects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const stackSansNotch = Stack_Sans_Notch({
  variable: "--font-stack",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.forgegroup.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Forge Group | Agenzia Marketing B2B Italia",
    template: "%s | Forge Group",
  },
  description:
    "Sistemi di acquisizione clienti e vendita B2B high-ticket. Oltre 30 clienti soddisfatti, €350K+ generati in 12 mesi, recensioni a 5 stelle.",
  keywords: [
    "agenzia marketing b2b",
    "acquisizione clienti b2b",
    "marketing a risposta diretta",
    "sistemi di vendita b2b",
    "agenzia marketing campania",
    "agenzia marketing napoli",
    "lead generation b2b italia",
  ],
  authors: [{ name: "Forge Group" }],
  creator: "Forge Group",
  publisher: "Forge Group",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Forge Group",
    title: "Forge Group | Agenzia Marketing B2B Italia",
    description:
      "Sistemi di acquisizione clienti e vendita B2B high-ticket. 30+ clienti soddisfatti, €350K+ generati in 12 mesi.",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Group | Agenzia Marketing B2B Italia",
    description:
      "Sistemi di acquisizione clienti e vendita B2B high-ticket per imprenditori che vogliono crescere davvero.",
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
  name: "Forge Group",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: "info@forgegroup.it",
  description:
    "Agenzia di marketing a risposta diretta e sistemi di acquisizione clienti B2B high-ticket.",
  sameAs: [],
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
  name: "Forge Group",
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  email: "info@forgegroup.it",
  priceRange: "€€€",
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
  name: "Forge Group",
  description:
    "Sistemi di acquisizione clienti e vendita B2B high-ticket per imprese in Italia.",
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
        <ClientSceneEffects />
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
