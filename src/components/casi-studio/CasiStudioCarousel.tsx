"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

/**
 * I casi studio, uno alla volta.
 *
 * Prima stavano in una pila che scorreva: si vedevano tutti e non si
 * leggeva nessuno. Qui ne resta uno solo in campo — titolo col risultato,
 * due righe di contesto, i due numeri che contano e la prova visiva di
 * fianco — e per vedere il successivo bisogna chiederlo. È la stessa
 * logica del carosello di Gasparotto: meno cose in pagina, piu' lettura.
 *
 * Tutto quello che si legge qui viene da `caseStudies`: nessun numero
 * scritto a mano dentro il componente.
 */

const media: Record<string, { src: string; video?: boolean; alt: string }> = {
  edilizia: {
    src: "/images/casi-studio/edilizia.jpg",
    alt: "Coperture e lattoneria",
  },
  "arredo-commerciale": {
    src: "/images/casi-studio/arredo-commerciale.jpg",
    alt: "Arredamento negozi",
  },
  "software-b2b": {
    src: "/video-recensione.mp4",
    video: true,
    alt: "Videorecensione del titolare",
  },
};

export default function CasiStudioCarousel() {
  const [i, setI] = useState(0);
  const totale = caseStudies.length;
  const caso = caseStudies[i];
  const m = media[caso.slug];
  const regione = useRef<HTMLDivElement>(null);

  const vai = useCallback(
    (d: number) => setI((c) => (c + d + totale) % totale),
    [totale],
  );

  /* Frecce della tastiera: il carosello e' un gruppo navigabile, non
     due bottoni scollegati. */
  useEffect(() => {
    const el = regione.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") vai(-1);
      if (e.key === "ArrowRight") vai(1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [vai]);

  return (
    <section
      id="casi-studio"
      className="section-mattone scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Casi studio</span>
        </p>
        <h2 className="heading-section-xl mb-14 text-center text-balance md:mb-16">
          <span>Numeri veri</span>, di imprese vere, nel tuo settore
        </h2>

        <div
          ref={regione}
          tabIndex={-1}
          role="group"
          aria-roledescription="carosello"
          aria-label="Casi studio"
          className="carosello"
        >
          <button
            type="button"
            onClick={() => vai(-1)}
            aria-label="Caso studio precedente"
            className="carosello-freccia carosello-freccia-sx"
          >
            ‹
          </button>

          <div className="carosello-scheda" aria-live="polite">
            <div className="flex flex-col justify-center gap-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/85">
                {caso.sector}
              </p>

              <h3 className="heading-display-frase !text-white">
                {caso.resultHeadline}
              </h3>

              <p className="text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
                {caso.excerpt}
              </p>

              <div className="mt-1 grid grid-cols-2 gap-6">
                {caso.results.slice(0, 2).map((r) => (
                  <div key={r.label} className="carosello-numero">
                    <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">
                      {r.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-snug text-white">
                      {r.label}
                    </p>
                    {r.detail && (
                      <p className="mt-1 text-xs leading-snug text-white/65">
                        {r.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href={`/casi-studio/${caso.slug}`}
                className="arrow-link mt-1 self-start !text-white"
              >
                Leggi tutto il caso studio
              </Link>
            </div>

            <div className="carosello-media">
              {m?.video ? (
                <video
                  key={caso.slug}
                  src={m.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={m.alt}
                />
              ) : (
                m && (
                  <Image
                    key={caso.slug}
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, 100vw"
                  />
                )
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => vai(1)}
            aria-label="Caso studio successivo"
            className="carosello-freccia carosello-freccia-dx"
          >
            ›
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {caseStudies.map((c, idx) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Vai al caso ${c.shortTitle}`}
              aria-current={idx === i}
              className={`carosello-punto${idx === i ? " carosello-punto-attivo" : ""}`}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contatti"
            className="btn-hero btn-hero-chiaro px-8 py-4 text-center text-sm md:text-base"
          >
            Voglio lo studio di fattibilità per la mia impresa
          </Link>
          <Link href="/casi-studio" className="arrow-link !text-white">
            → Scopri tutti i casi studio
          </Link>
        </div>
      </div>
    </section>
  );
}
