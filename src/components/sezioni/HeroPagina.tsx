import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";

/**
 * La hero della home, resa riutilizzabile.
 *
 * Fino al 24/09/2026 le pagine interne avevano un frontespizio tutto
 * loro: testo centrato, titolo gigante che occupava lo schermo, un solo
 * pulsante e sotto la scritta "scorri". Risultato, una schermata intera
 * prima di dire qualcosa, e un sito che cambiava faccia appena uscivi
 * dalla home.
 *
 * Qui c'e' l'impianto della home: due colonne, testo a sinistra allineato
 * al menu, foto a destra, due pulsanti con la freccia che dice dove
 * portano. Niente invito a scorrere, perche' il contenuto comincia
 * subito sotto.
 *
 * REGOLA: le pagine non si scrivono una hero per conto loro. Se serve
 * una variante, si aggiunge qui.
 *
 * Sul titolo: no-spezza tiene unite due o tre parole, non una frase.
 * La colonna del testo e' il 60 per cento di 1280px, quindi una riga
 * lunga marcata nowrap esce dalla colonna e finisce sotto la foto.
 */

type Pulsante = {
  href: string;
  testo: string;
  /** ↗ per un'altra pagina, ↓ per piu' in basso in questa. */
  freccia: "↗" | "↓";
};

type Props = {
  occhiello: string;
  titolo: ReactNode;
  testo: ReactNode;
  /** Riga di credenziale sotto il testo, come la firma dei fondatori. */
  nota?: ReactNode;
  primario: Pulsante;
  secondario?: Pulsante;
  immagine: { src: string; alt: string; didascalia?: string };
};

export default function HeroPagina({
  occhiello,
  titolo,
  testo,
  nota,
  primario,
  secondario,
  immagine,
}: Props) {
  return (
    <HeroGooeySection
      pulita
      className=""
      innerClassName="hero-split mx-auto max-w-7xl"
    >
      <div className="order-1 flex flex-col justify-center gap-5 px-4 pb-8 pt-12 sm:gap-6 sm:px-6 sm:pt-14 lg:justify-start lg:pb-0 lg:pl-8 lg:pr-14 lg:pt-20">
        <p className="hero-enter hero-enter-d1 eyebrow eyebrow-mark pillola-occhiello-corallo self-start rounded-full border px-5 py-2.5 text-xs sm:text-sm">
          {occhiello}
        </p>

        <h1 className="hero-enter hero-enter-d2 heading-display-frase text-pretty">
          {titolo}
        </h1>

        <p className="hero-enter hero-enter-d3 text-pretty text-lg leading-relaxed text-brand-grigio sm:text-xl">
          {testo}
        </p>

        {nota && (
          <p className="hero-enter hero-enter-d3 firma-fondatori">{nota}</p>
        )}

        <div className="hero-enter hero-enter-d3 mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={primario.href}
            className="btn-hero btn-hero-compatto btn-hero-caldo text-base"
          >
            <span>{primario.testo}</span>
            <span className="btn-hero-freccia" aria-hidden>
              {primario.freccia}
            </span>
          </Link>
          {secondario && (
            <Link
              href={secondario.href}
              className="btn-hero btn-hero-compatto btn-hero-freddo text-base"
            >
              <span>{secondario.testo}</span>
              <span className="btn-hero-freccia" aria-hidden>
                {secondario.freccia}
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="hero-foto order-2">
        <div className="hero-foto-cornice">
          <Image
            src={immagine.src}
            alt={immagine.alt}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
          {immagine.didascalia && (
            <p className="hero-foto-firma">
              <span aria-hidden>✳</span>
              {immagine.didascalia}
            </p>
          )}
        </div>
      </div>
    </HeroGooeySection>
  );
}
