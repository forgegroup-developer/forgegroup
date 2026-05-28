import type { Metadata } from "next";
import ContattiForm from "./ContattiForm";

export const metadata: Metadata = {
  title: "Candida la Tua Azienda",
  description:
    "Compila il questionario di prequalifica Forge Group. Accettiamo solo imprese B2B con fatturato 350K+ e visione di crescita. Risposta entro 48 ore.",
  alternates: { canonical: "/contatti" },
  robots: { index: true, follow: true },
};

export default function ContattiPage() {
  return <ContattiForm />;
}
