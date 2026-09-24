import type { Metadata } from "next";
import Link from "next/link";
import ContattiFormLoader from "./ContattiFormLoader";

export const metadata: Metadata = {
  title: "Candida la tua impresa edile",
  description:
    "Lo studio di fattibilità dice se ha senso lavorare insieme, e a volte la risposta è no. Prendiamo poche imprese per territorio. Rispondi a poche domande e ti chiamiamo entro 48 ore lavorative.",
  alternates: { canonical: "/contatti" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Candida la tua impresa edile | Forge Group",
    description:
      "Lo studio di fattibilità dice se ha senso lavorare insieme. Prendiamo poche imprese per territorio. Ti chiamiamo entro 48 ore lavorative.",
    url: "/contatti",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candida la tua impresa edile | Forge Group",
    description: "Lo studio di fattibilità dice se ha senso lavorare insieme.",
    images: ["/logo.png"],
  },
};

export default function ContattiPage() {
  return (
    <>
      {/* Perche' si parla di candidatura e non di contatto: Forge seleziona,
          un territorio alla volta. Decisione della proprieta' del 24/09/2026. */}
      <section className="border-b border-brand-bordo section-sabbia py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow eyebrow-mark mb-4 flex">Perché si chiama così</p>
          <h2 className="heading-section-xl mb-6 text-balance">
            Qui non compri niente.{" "}
            <span className="text-brand-corallo-text">
              Qui vediamo se ha senso lavorare insieme.
            </span>
          </h2>
          <p className="body-lg mb-5">
            Quello che c’è sotto è uno studio di fattibilità. Serve a capire
            quanto lavoro la tua impresa regge davvero oggi, con gli uomini e i
            mezzi che hai, cosa c’è da prendere nella tua zona e come si può
            crescere senza che ti salti la consegna.
          </p>
          <p className="body-lg mb-5">
            A volte da lì esce un no, e te lo diciamo prima che tu abbia speso
            un euro in pubblicità. Lavoriamo con poche imprese per territorio, e
            preferiamo dirti subito che non è il caso piuttosto che scoprirlo
            fra sei mesi tutti e due.
          </p>
          <p className="body-lg mb-8">
            Le domande qui sotto sono quelle che servono a rispondere. Poi ti
            chiamiamo noi, entro 48 ore lavorative, e da lì si capisce se
            fissare un appuntamento.
          </p>
        </div>
      </section>

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
