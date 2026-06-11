import type { Metadata } from "next";
import ContattiFormLoader from "./ContattiFormLoader";

export const metadata: Metadata = {
  title: "Candida la Tua Azienda",
  description:
    "Compila il questionario di prequalifica Forge Group. Accettiamo solo imprese B2B con fatturato 350K+ e visione di crescita. Risposta entro 48 ore.",
  alternates: { canonical: "/contatti" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Candida la Tua Azienda | Forge Group",
    description:
      "Compila il questionario di prequalifica Forge Group. Risposta entro 48 ore lavorative.",
    url: "/contatti",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candida la Tua Azienda | Forge Group",
    description: "Prequalifica strategica per imprese B2B in crescita.",
    images: ["/logo.png"],
  },
};

export default function ContattiPage() {
  return <ContattiFormLoader />;
}
