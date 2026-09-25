import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import {
  getCaseStudyImage,
  getCaseStudyImageFit,
  getCaseStudyImagePosition,
} from "@/data/images";

/**
 * La griglia dei casi studio: schede a tre colonne, foto sopra e titolo
 * sotto.
 *
 * Impianto ripreso da un sito indicato dalla proprieta' come
 * riferimento (24/09/2026), perche' risolve il problema del carosello:
 * li' si vedeva un caso alla volta e gli altri stavano dietro una
 * freccia. La pagina promette "cerca l'impresa che fa il tuo mestiere",
 * e per cercare bisogna prima vedere.
 *
 * Della loro scheda prendo la struttura: fotografia in alto con
 * un'etichetta sopra, titolo sotto e la freccia obliqua a destra. I
 * colori restano i nostri: scheda bianca su panna, bordo e corallo
 * come in home.
 *
 * Niente filtro per settore finche' i casi sono tre: filtrare tre voci
 * e' una cerimonia che lascia una scheda sola per filtro. Si aggiunge
 * quando i casi saranno abbastanza da rendere utile scegliere.
 */
export default function CasiStudioGriglia() {
  return (
    <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {caseStudies.map((caso, idx) => (
        <li key={caso.slug}>
          <Link
            href={`/casi-studio/${caso.slug}`}
            className="scheda-caso group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={getCaseStudyImage(caso.slug)}
                alt={`${caso.sector}: ${caso.shortTitle}`}
                fill
                /* Solo la prima e' sopra la piega: regola 4 delle
                   immagini. */
                priority={idx === 0}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                style={{
                  objectFit: getCaseStudyImageFit(caso.slug),
                  objectPosition: getCaseStudyImagePosition(caso.slug),
                }}
              />
              <span className="etichetta-caso">{caso.sector}</span>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-6 py-6">
              <p className="heading-card text-balance">{caso.resultHeadline}</p>
              <p className="mt-auto flex items-end justify-between gap-4 text-sm leading-snug text-brand-grigio">
                <span>{caso.hubExcerpt}</span>
                <span className="freccia-caso" aria-hidden>
                  ↗
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
