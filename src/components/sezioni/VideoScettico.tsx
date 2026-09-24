"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/caseStudies";

/**
 * Il blocco per chi è scettico.
 *
 * Nelle quattro conoscitive lette, quattro imprenditori su quattro
 * avevano già provato con un'agenzia ed erano stati delusi. La domanda
 * che si portano dietro non è "funziona?" ma "perché dovrei crederci
 * un'altra volta?".
 *
 * A quella domanda non si risponde con un argomento: si risponde
 * facendo parlare uno che era nella stessa posizione. La testimonianza
 * si apre proprio con "Ero scettico all'inizio", quindi la citazione
 * non è una cornice che ci mettiamo noi — è la sua prima frase.
 *
 * Il video non parte da solo e carica solo il poster finché non lo si
 * chiede: un prospect se n'era andato perché il video si bloccava.
 */

const caso = caseStudies.find((c) => c.slug === "software-b2b")!;

export default function VideoScettico() {
  const [attivo, setAttivo] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const avvia = () => {
    setAttivo(true);
    requestAnimationFrame(() => video.current?.play());
  };

  return (
    <section id="scettico" className="section-bianco scroll-mt-24 border-y py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Per chi è scettico</span>
        </p>
        <h2 className="heading-section-xl mb-12 text-center text-balance md:mb-16">
          Hai già provato con un&apos;agenzia e non è andata?{" "}
          <span className="text-brand-corallo-text">Ascolta lui.</span>
        </h2>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="cornice-video">
            {attivo ? (
              <video
                ref={video}
                src={caso.videoUrl}
                controls
                playsInline
                preload="metadata"
                aria-label="Videorecensione del titolare"
              />
            ) : (
              <button type="button" onClick={avvia} className="avvia-video">
                <Image
                  src="/images/casi-studio/software-b2b.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
                <span className="avvia-video-tasto" aria-hidden>
                  ▶
                </span>
                <span className="sr-only">
                  Guarda la videorecensione del titolare
                </span>
              </button>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <blockquote className="mb-8">
              <p className="text-pretty font-display text-xl font-bold leading-snug text-brand-nero sm:text-2xl">
                &ldquo;{caso.quote.text}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-brand-grigio">
                <span className="font-semibold text-brand-nero">
                  {caso.quote.author}
                </span>{" "}
                — {caso.quote.role}
              </footer>
            </blockquote>

            <div className="grid grid-cols-2 gap-5 border-t border-brand-bordo pt-7">
              {caso.results.slice(0, 2).map((r) => (
                <div key={r.label}>
                  <p className="font-display text-3xl font-bold leading-none text-brand-nero sm:text-4xl">
                    {r.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-brand-nero">
                    {r.label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-brand-grigio">
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href={`/casi-studio/${caso.slug}`} className="arrow-link">
                Leggi tutto il caso studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
