import HeroPagina from "@/components/sezioni/HeroPagina";
import type { Metadata } from "next";
import CasiStudioElenco from "@/components/casi-studio/CasiStudioElenco";
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
        immagine={{
          src: "/images/casi-studio/edilizia.jpg",
          alt: "Copertura realizzata da un'impresa edile seguita da Forge Group",
          didascalia: "Tetti Top, coperture",
        }}
      />

      <section id="casi-studio-contenuto" className="scroll-mt-24 py-20 md:py-28 section-bianco">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <CasiStudioElenco />
        </div>
      </section>

      {/* Le domande che nascono proprio qui: uno ha appena letto i numeri di un altro e si chiede se valgono per lui. */}
      <section id="domande" className="scroll-mt-24 section-sabbia border-y py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Domande frequenti</p>
          <h2 className="heading-section-xl mb-10 text-balance">
            Hai visto i numeri.{" "}<span className="text-brand-corallo-text">Adesso le domande</span>.
          </h2>
          <FAQAccordion items={faqsPagina("casi-studio")} />
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("casi-studio")} />

      <RelatedBlogLinks
        slugs={[
          "agenzia-marketing-b2b-napoli",
          "agenzia-marketing-b2b-campania-checklist",
          "sistema-vendita-b2b-dalla-lead-al-contratto",
        ]}
      />
    </>
  );
}
