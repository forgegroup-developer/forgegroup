import type { Metadata } from "next";
import Image from "next/image";
import FAQAccordion from "@/components/ui/FAQAccordion";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import Candidatura from "@/components/blocchi/Candidatura";
import ChiSiamo from "@/components/blocchi/ChiSiamo";
import ComeFunziona from "@/components/blocchi/ComeFunziona";
import Problemi from "@/components/blocchi/Problemi";
import TreCasi from "@/components/blocchi/TreCasi";
import {
  CONTENITORE,
  SEZIONE,
  STRETTO,
  Chiave,
  Stelle,
  Titolo,
} from "@/components/blocchi/ui";
import { domandeDopoLaChiamata, fondatori } from "@/data/blocchi";
import { casi } from "@/data/prove";
import { iniziaImages } from "@/data/images";

/**
 * La pagina che Gianpio manda su WhatsApp dopo la prima telefonata.
 *
 * Non è la home: arriva in un momento preciso (dieci minuti dopo la chiamata,
 * dal telefono, a un titolare diffidente) e deve rispondere in un minuto a
 * "chi sono, cosa hanno fatto, cosa succede adesso". Fuori da Google, perché
 * non serve a chi cerca: serve a chi abbiamo appena sentito.
 *
 * È una landing: il menu in alto non c'è (lo toglie Navbar su questo
 * percorso) e nella pagina non ci sono link che portano altrove. Il footer è
 * quello di tutto il sito, senza la fascia finale, come in home. Si chiude
 * col modulo, senza il suo banner, e GA4 conta a parte queste candidature
 * (sorgente "inizia"). Colori e titoli seguono la home.
 *
 * I problemi vengono dalla Testa aziendale (§3, gli otto problemi) e dalle
 * frasi dette davvero nelle call. Numeri solo dalla Scheda dei fatti.
 */

export const metadata: Metadata = {
  title: "Inizia da qui",
  description:
    "Chi siamo, cosa abbiamo fatto per tre imprese edili e come funziona dopo la prima telefonata.",
  alternates: { canonical: "/inizia" },
  robots: { index: false, follow: true },
};

export default function IniziaPage() {
  return (
    <>
      {/* 1 · Apertura. Da computer la scena fa da sfondo: il testo sta sul
          cielo a sinistra, la stretta di mano a destra, e un velo panna
          regge la lettura. Da telefono la scena scende sotto il testo, che
          sopra la foto non si leggerebbe. */}
      <HeroGooeySection
        pulita
        className=""
        innerClassName={CONTENITORE}
        before={
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src={iniziaImages.hero}
              alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-brand-panna from-35% via-brand-panna/75 via-50% to-transparent to-70%"
              aria-hidden
            />
            <span className="absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
              Immagine generata con AI
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-5 pb-20 pt-14 sm:gap-6 md:pb-28 md:pt-20 lg:max-w-[42rem]">
          {/* Le facce di chi ha chiamato, prima di tutto il resto. */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {fondatori.map((f) => (
                <div
                  key={f.nome}
                  className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-brand-bianco bg-brand-panna shadow-sm"
                >
                  <Image
                    src={f.foto}
                    alt={`Foto di ${f.nome}`}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm leading-snug text-brand-grigio">
              <strong className="font-semibold text-brand-nero">
                Marco Pio Cerbone e Gianpio Uva
              </strong>
              <br />
              fondatori di Forge Group
            </p>
          </div>
          <p className="eyebrow eyebrow-mark pillola-occhiello-corallo self-start rounded-full border px-5 py-2.5 text-xs sm:text-sm">
            Ci siamo appena sentiti al telefono
          </p>
          <h1 className="heading-section-xl text-balance">
            Portiamo richieste di lavoro alle imprese edili, e le seguiamo con
            te{" "}
            <span className="text-brand-corallo no-spezza">
              fino alla firma
            </span>
            .
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-brand-grigio sm:text-xl">
            Se vivi di passaparola, hai già pagato un&apos;agenzia senza vedere
            niente o perdi lavori per 500 euro di differenza, qui trovi in un
            minuto{" "}
            <strong className="font-semibold text-brand-nero">
              chi siamo, cosa abbiamo fatto e come lavoriamo
            </strong>
            .
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {casi.map((c) => (
              <div
                key={c.chi}
                className="rounded-2xl border border-brand-bordo bg-brand-bianco p-4"
              >
                <p className="font-display text-2xl font-bold leading-none text-brand-corallo-text">
                  {c.numero}
                </p>
                <p className="mt-2 text-xs font-semibold leading-snug text-brand-nero">
                  {c.numeroDetto}
                </p>
                <p className="mt-1.5 text-xs text-brand-grigio">{c.chi}</p>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-brand-grigio">
            <Stelle />
            <span>
              <strong className="text-brand-nero">5,0 su Google</strong>, 6
              recensioni
            </span>
          </p>
          <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#candidati"
              className="btn-hero btn-hero-compatto btn-hero-caldo text-base"
            >
              <span>Candida la tua impresa</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </a>
            <a
              href="#come-funziona"
              className="btn-hero btn-hero-compatto btn-hero-freddo text-base"
            >
              <span>Guarda come lavoriamo</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </a>
          </div>
          <figure className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
            <Image
              src={iniziaImages.hero}
              alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
              fill
              sizes="100vw"
              className="object-cover object-right"
            />
            <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
              Immagine generata con AI
            </figcaption>
          </figure>
        </div>
      </HeroGooeySection>

      <Problemi />

      <TreCasi />

      <ComeFunziona />

      {/* 5 · Per chi è: il blocco del sito, con il pulsante che porta al modulo qui sotto. */}
      <PerChiSiPerChiNo
        sfondo="mattone"
        nota="Lavoriamo con poche imprese, una per territorio."
        ctaHref="#candidati"
      />

      <ChiSiamo />

      {/* 7 · Le domande che ci fanno dopo la chiamata. */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Le domande <Chiave>che ci fate</Chiave> dopo la chiamata
          </Titolo>
          <div className={STRETTO}>
            <FAQAccordion onCoral items={domandeDopoLaChiamata} />
          </div>
        </div>
      </section>

      <Candidatura sorgente="inizia" />

      {/* Il tasto flottante di iubenda qui non serve: le preferenze cookie
          stanno nel footer, e su una landing ogni tasto fisso è un'uscita. */}
      <style>{`.iubenda-tp-btn { display: none !important; }`}</style>
    </>
  );
}
