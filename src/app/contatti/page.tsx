import type { Metadata } from "next";
import Link from "next/link";
import ContattiFormLoader from "./ContattiFormLoader";

export const metadata: Metadata = {
  title: "Candida la Tua Azienda",
  description:
    "Richiedi lo studio di fattibilità per la tua impresa edile: poche domande, e ti rispondiamo entro 48 ore lavorative.",
  alternates: { canonical: "/contatti" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Candida la Tua Azienda | Forge Group",
    description:
      "Richiedi lo studio di fattibilità per la tua impresa edile. Risposta entro 48 ore lavorative.",
    url: "/contatti",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candida la Tua Azienda | Forge Group",
    description: "Lo studio di fattibilità per la tua impresa edile.",
    images: ["/logo.png"],
  },
};

export default function ContattiPage() {
  return (
    <>
      <section className="border-b border-brand-bordo bg-brand-bianco py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm leading-relaxed text-brand-grigio md:text-base">
            Prima di candidarti, puoi leggere i nostri{" "}
            <Link href="/servizi" className="font-semibold text-brand-corallo-text hover:underline">
              servizi
            </Link>
            , i{" "}
            <Link href="/casi-studio" className="font-semibold text-brand-corallo-text hover:underline">
              casi studio
            </Link>{" "}
            e la{" "}
            <Link href="/visione" className="font-semibold text-brand-corallo-text hover:underline">
              visione
            </Link>{" "}
            di Forge Group.
          </p>
        </div>
      </section>
      <ContattiFormLoader />
    </>
  );
}
