import type { Metadata } from "next";
import Link from "next/link";
import ContattiFormLoader from "./ContattiFormLoader";

export const metadata: Metadata = {
  title: "Candida la Tua Azienda",
  description:
    "Compila il questionario di prequalifica Forge Group. Lavoriamo al meglio con imprese B2B da 350K+ di fatturato e visione di crescita. Risposta entro 48 ore.",
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
  return (
    <>
      <section className="border-b border-brand-bordo bg-brand-bianco py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm leading-relaxed text-brand-grigio md:text-base">
            Prima di candidarti, puoi leggere i nostri{" "}
            <Link href="/servizi" className="font-semibold text-brand-corallo hover:underline">
              servizi B2B
            </Link>
            , i{" "}
            <Link href="/casi-studio" className="font-semibold text-brand-corallo hover:underline">
              casi studio
            </Link>{" "}
            e la{" "}
            <Link href="/visione" className="font-semibold text-brand-corallo hover:underline">
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
