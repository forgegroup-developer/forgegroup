import HeroPagina from "@/components/sezioni/HeroPagina";
import type { Metadata } from "next";
import CasiStudioCarousel from "@/components/casi-studio/CasiStudioCarousel";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";
import { iniziaImages } from "@/data/images";
import { CONTENITORE, SEZIONE, Chiave, Titolo } from "@/components/blocchi/ui";

export const metadata: Metadata = {
  title: "Casi studio: imprese edili, con i numeri e il nome sotto",
  description:
    "Tre imprese edili: com'era prima, cosa abbiamo messo in piedi e quanto è entrato. Numeri veri, con il nome dell'impresa sotto, da chiedere a loro.",
  alternates: { canonical: "/casi-studio" },
  openGraph: {
    title: "Casi studio imprese edili | Forge Group",
    description:
      "Coperture, arredamento negozi, software per l'edilizia: com'era prima, cosa è cambiato, quanto è entrato.",
    url: "/casi-studio",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Casi Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casi studio imprese edili | Forge Group",
    description: "Tre imprese, tre mestieri, i numeri con il nome sotto.",
    images: ["/logo.png"],
  },
};

export default function CasiStudioHub() {
  return (
    <>
      <HeroPagina
        occhiello="Casi studio"
        titolo={
          <>
            Sopralluoghi regalati, preventivi senza risposta, trattative perse
            sul prezzo:{" "}
            <span className="text-brand-corallo">come ne sono uscite</span> tre
            imprese.
          </>
        }
        testo={
          <>
            Tetti Top usciva per chiunque chiamasse, ROVI perdeva le trattative
            sul prezzo, DISA cercava clienti con le chiamate a freddo. Per
            ognuna trovi com&apos;era prima, cosa abbiamo costruito insieme e{" "}
            <strong className="chiave">quanto è entrato</strong>.
          </>
        }
        nota={
          <>
            Se un numero ti sembra strano, il nome dell&apos;impresa è lì
            sotto: si può chiedere a loro.
          </>
        }
        primario={{
          href: "/contatti",
          testo: "Richiedi lo studio di fattibilità",
          freccia: "↗",
        }}
        secondario={{
          href: "#casi-studio-contenuto",
          testo: "Guarda i tre casi",
          freccia: "↓",
        }}
        foto="sfondo"
        immagine={{
          src: iniziaImages.hero,
          alt: "",
          didascalia: "Immagine generata con AI",
        }}
      />

      {/* La stessa sezione della home (proprietà, 29/09: "era molto meglio
          a livello grafico"): un caso alla volta, con la prova accanto. */}
      <div id="casi-studio-contenuto" className="scroll-mt-24">
        <CasiStudioCarousel senzaLinkElenco />
      </div>

      {/* Le domande che nascono proprio qui: uno ha appena letto i numeri di un altro e si chiede se valgono per lui. */}
      <section id="domande" className={`scroll-mt-24 section-bianco ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Hai visto i numeri, adesso <Chiave>le domande</Chiave>.
          </Titolo>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqsPagina("casi-studio")} />
          </div>
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("casi-studio")} />

      {/* I link agli articoli tornano quando ci sono quelli nuovi sulle
          imprese edili: i vecchi (B2B, Campania) si ritirano. */}
    </>
  );
}
