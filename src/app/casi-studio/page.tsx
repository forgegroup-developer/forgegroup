import HeroPagina from "@/components/sezioni/HeroPagina";
import type { Metadata } from "next";
import CasiStudioGriglia from "@/components/casi-studio/CasiStudioGriglia";
import RelatedBlogLinks from "@/components/blog/RelatedBlogLinks";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";

export const metadata: Metadata = {
  title: "Casi studio: imprese edili, con i numeri e il nome sotto",
  description:
    "Coperture, arredamento negozi, software per l'edilizia. Per ognuna: com'era prima, cosa abbiamo messo in piedi e quanto è entrato. Numeri veri, con il nome dell'impresa sotto.",
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
            Cerca l&apos;impresa che fa il tuo mestiere. I numeri sono{" "}
            <span className="text-brand-corallo no-spezza">veri</span>, con il
            nome sotto.
          </>
        }
        testo={
          <>
            Coperture, arredamento negozi, software per l&apos;edilizia. Per
            ognuna c&apos;è com&apos;era prima, cosa abbiamo messo in piedi e{" "}
            <strong className="font-semibold text-brand-nero">
              quanto è entrato
            </strong>
            .
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
        /* Niente foto: le uniche disponibili sono due volti in primo
           piano che rubano l'occhio al titolo, e uno screenshot del
           gestionale pieno di riquadri. E poco sotto ci sono gia' le
           immagini dei tre casi, che devono essere loro a farsi
           guardare. */
        foto="nessuna"
      />

      <section id="casi-studio-contenuto" className="scroll-mt-24 py-14 md:py-20 section-bianco">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CasiStudioGriglia />
        </div>
      </section>

      {/* Le domande che nascono proprio qui: uno ha appena letto i numeri di un altro e si chiede se valgono per lui. */}
      <section id="domande" className="scroll-mt-24 section-mattone py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Domande frequenti</p>
          <h2 className="heading-section-xl mb-10 text-balance">
            Hai visto i numeri.{" "}<span className="text-brand-corallo-text">Adesso le domande</span>.
          </h2>
          <FAQAccordion onCoral items={faqsPagina("casi-studio")} />
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("casi-studio")} />

      <RelatedBlogLinks
        /* Chi ha appena letto i numeri di qualcun altro si chiede perche'
           a lui non succede. Questi tre rispondono a quello, e fino a
           oggi non ricevevano nessun link da fuori il blog. */
        slugs={[
          "perche-clienti-spariscono-dopo-preventivo",
          "gare-appalto-vs-clienti-privati-pagano",
          "come-smettere-dipendere-passaparola",
        ]}
      />
    </>
  );
}
