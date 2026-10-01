"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import { scenePrimaDopo } from "@/data/scenePrimaDopo";

/**
 * Le storie dei clienti, in home (proprietà, 01/10/2026: "preferirei vedere
 * delle foto con commento della situazione e raccontare storie di clienti,
 * e come hanno risolto il loro problema").
 *
 * Tre schede, una per caso. In ognuna la foto con il commento della
 * situazione e l'interruttore Prima / Dopo, accanto la storia in tre righe
 * (com'era, come l'hanno risolto, il risultato con il numero della Scheda)
 * e il link al caso intero. Testi e numeri vengono da caseStudies e da
 * scenePrimaDopo: qui non si scrive niente a mano.
 */

const storie = caseStudies.filter((c) => scenePrimaDopo[c.slug]);

function nomeCliente(slug: string) {
  const c = caseStudies.find((x) => x.slug === slug)!;
  return c.context.find((x) => x.label === "Azienda")?.value.split(",")[0].trim() ?? c.shortTitle;
}

export default function StorieClienti() {
  const [scelta, setScelta] = useState(0);
  const [dopo, setDopo] = useState(false);
  const caso = storie[scelta];
  const scene = scenePrimaDopo[caso.slug];
  const scena = dopo ? scene.dopo : scene.prima;

  return (
    <div>
      {/* Le tre storie */}
      <div className="mb-8 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Storie dei clienti">
        {storie.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            role="tab"
            aria-selected={i === scelta}
            onClick={() => {
              setScelta(i);
              setDopo(false);
            }}
            className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors ${
              i === scelta
                ? "border-brand-corallo bg-brand-corallo text-white"
                : "border-brand-bordo bg-brand-bianco text-brand-nero hover:border-brand-corallo"
            }`}
          >
            {nomeCliente(c.slug)} · {c.sector}
          </button>
        ))}
      </div>

      <article className="grid items-stretch gap-8 overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco p-5 shadow-sm md:p-8 lg:grid-cols-2 lg:gap-12">
        {/* La foto con il commento, e l'interruttore Prima / Dopo */}
        <div className="flex flex-col">
          <div className="mb-4 inline-flex w-fit rounded-full border border-brand-bordo bg-brand-bianco p-1" role="group" aria-label="Prima o dopo">
            <button
              type="button"
              onClick={() => setDopo(false)}
              aria-pressed={!dopo}
              className={`rounded-full px-5 py-2 text-sm font-bold ${!dopo ? "bg-brand-corallo text-white" : "text-brand-grigio"}`}
            >
              Prima
            </button>
            <button
              type="button"
              onClick={() => setDopo(true)}
              aria-pressed={dopo}
              className={`rounded-full px-5 py-2 text-sm font-bold ${dopo ? "bg-brand-verde text-white" : "text-brand-grigio"}`}
            >
              Dopo
            </button>
          </div>
          <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-brand-bianco">
            <Image
              key={scena.src}
              src={scena.src}
              alt={scena.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
            <span className="absolute right-2 top-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
              Immagine generata con AI
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-4 pt-10 text-[0.98rem] font-semibold leading-snug text-white">
              {scena.commento}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setDopo(!dopo)}
            className="mt-3 w-fit text-sm font-semibold text-[color:var(--color-brand-corallo-text)] hover:underline"
          >
            {dopo ? "← Guarda com'era prima" : "Guarda com'è andata dopo →"}
          </button>
        </div>

        {/* La storia */}
        <div className="flex flex-col">
          <p className="eyebrow mb-2">{caso.sector}</p>
          <h3 className="mb-6 font-display text-2xl font-bold leading-tight text-brand-nero md:text-3xl">
            {caso.resultHeadline.replace(/ €/g, " €")}
          </h3>
          <ol className="mb-6 space-y-4">
            <li className="flex gap-3.5">
              <span className="segno-no mt-0.5" aria-hidden>
                ✕
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-grigio">Com&apos;era</p>
                <p className="leading-relaxed text-brand-grigio">{caso.sintesi.problema}</p>
              </div>
            </li>
            <li className="flex gap-3.5">
              <span className="segno-si mt-0.5" aria-hidden>
                ✓
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-verde-text">Come l&apos;ha risolto</p>
                <p className="leading-relaxed text-brand-grigio">{caso.sintesi.soluzione}</p>
              </div>
            </li>
          </ol>
          <div className="mb-6 rounded-2xl bg-brand-mattone px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-pesca">Il risultato</p>
            <p className="mt-1 font-display text-lg font-bold leading-snug text-white">
              {caso.sintesi.risultato.replace(/ €/g, " €")}
            </p>
          </div>
          <Link href={`/casi-studio/${caso.slug}`} className="arrow-link mt-auto text-sm md:text-base">
            Leggi la storia intera
          </Link>
        </div>
      </article>
    </div>
  );
}
