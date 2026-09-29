import type { ReactNode } from "react";
import Image from "next/image";

/*
 * LE REGOLE DI SPAZIATURA DEI BLOCCHI (richiesta della proprietà, 28/09).
 * Sono le misure dei blocchi della home, valgono per ogni pagina che usa i blocchi.
 *
 * 1. Ogni sezione ha lo stesso respiro sopra e sotto: SEZIONE. La hero usa
 *    la stessa misura sotto; il modulo in fondo chiude con la sua, uguale.
 * 2. Ogni sezione usa lo stesso contenitore: CONTENITORE. Quando un testo
 *    deve stare più stretto si restringe DENTRO (STRETTO), senza cambiare i
 *    margini laterali: così tutti i bordi della pagina sono allineati.
 * 3. Sotto ogni titolo lo stesso spazio (dentro <Titolo>), e tra un blocco e
 *    l'altro della stessa sezione sempre STACCO.
 * La sezione che viene da un componente del sito ("per chi è") usa già
 * queste misure.
 */
export const SEZIONE = "py-20 md:py-28";
export const CONTENITORE = "mx-auto max-w-6xl px-5 sm:px-6 lg:px-8";
export const STRETTO = "mx-auto max-w-4xl";
export const STACCO = "mb-16 md:mb-20";

/**
 * Il titolo di sezione, nello stile di "Per chi sì, per chi no": occhiello
 * con la riga sotto e titolo pieno e compatto. Scelto dalla proprietà per
 * tutti i titoli di questa pagina.
 */
export function Titolo({
  occhiello,
  children,
  sottotitolo,
}: {
  occhiello: string;
  children: ReactNode;
  sottotitolo?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
      <p className="mb-6 flex justify-center">
        <span className="eyebrow-rule">{occhiello}</span>
      </p>
      <h2 className="heading-section-xl text-balance">{children}</h2>
      {sottotitolo && (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-brand-grigio">
          {sottotitolo}
        </p>
      )}
    </div>
  );
}

/** La parola chiave, nello stesso corallo che usa il resto del sito. */
export function Chiave({ children }: { children: ReactNode }) {
  return <span className="text-brand-corallo-text">{children}</span>;
}

/** Cinque stelle, come su Google. Colore del segnale, non della marca. */
export function Stelle() {
  return (
    <span
      className="inline-flex gap-0.5 text-base leading-none text-[#f5b301]"
      aria-label="5 stelle su 5"
    >
      ★★★★★
    </span>
  );
}

/**
 * Le scene dei problemi sono generate con AI, con persone non reali: la
 * scritta sull'immagine non si toglie (AI Act).
 */
export function ScenaAI({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-brand-panna">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
        Immagine generata con AI
      </figcaption>
    </figure>
  );
}

/** Il riquadro "Con Forge" sotto ogni problema. */
export function ConForge({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-brand-corallo bg-brand-panna px-5 py-4">
      <p className="eyebrow mb-1.5">Con Forge</p>
      <p className="text-[0.98rem] leading-relaxed text-brand-nero">
        {children}
      </p>
    </div>
  );
}
