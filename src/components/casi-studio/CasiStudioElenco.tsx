import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import { Evidenzia } from "@/components/blocchi/ui";
import {
  getCaseStudyImage,
  getCaseStudyImageFit,
  getCaseStudyImagePosition,
} from "@/data/images";

/**
 * L'elenco dei casi studio della pagina /casi-studio.
 *
 * Prima qui c'era lo stesso carosello della home, quindi la pagina
 * dedicata mostrava meno di quanto prometteva il link che ci portava:
 * un caso alla volta, gli altri dietro una freccia. Su un telefono
 * due terzi della prova restavano invisibili.
 *
 * Adesso i casi stanno uno sotto l'altro e si vedono tutti. Il
 * componente non ha stato, quindi e' server-side e non manda
 * JavaScript al browser: la pagina arriva gia' scritta.
 *
 * Dal 29/09 la sezione è mattone e ogni caso è una scheda bianca
 * (card-xl superficie-chiara), con la sua frase chiave in corallo.
 *
 * Le immagini passano dagli helper di data/images.ts, come chiede la
 * regola 1. Quando arrivano le foto vere dei lavori, si cambiano li'
 * e questa pagina non si tocca.
 */
export default function CasiStudioElenco() {
  return (
    <div className="space-y-8 md:space-y-10">
      {caseStudies.map((caso, idx) => {
        const src = getCaseStudyImage(caso.slug);
        const fit = getCaseStudyImageFit(caso.slug);
        const position = getCaseStudyImagePosition(caso.slug);
        /* Solo la prima e' sopra la piega: regola 4. */
        const primo = idx === 0;

        return (
          <article
            key={caso.slug}
            className="card-xl superficie-chiara grid items-center gap-8 rounded-3xl border p-5 sm:p-8 md:gap-12 lg:grid-cols-2 lg:p-10"
          >
            {/* Su telefono la foto sta sempre sopra. Su schermo largo si
                alterna, cosi' tre casi di fila non sembrano tre volte
                la stessa scheda. */}
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco ${
                idx % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={src}
                alt={`${caso.sector}: ${caso.shortTitle}`}
                fill
                priority={primo}
                sizes="(min-width: 1024px) 48vw, 100vw"
                style={{ objectFit: fit, objectPosition: position }}
              />
            </div>

            <div>
              <p className="eyebrow mb-4">{caso.sector}</p>

              <h3 className="mb-4 text-balance font-display text-2xl font-bold leading-tight text-brand-nero md:text-3xl">
                {caso.resultHeadline.replace(/ €/g, "\u00a0€")}
              </h3>

              <p className="body-lg mb-8 text-pretty">
                <Evidenzia
                  testo={caso.hubExcerpt}
                  chiave={caso.excerptHighlights?.find((h) => caso.hubExcerpt.includes(h))}
                />
              </p>

              {/* Tutti i numeri del caso, non i primi due: sono la
                  ragione per cui uno sta leggendo questa pagina. */}
              <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-5">
                {caso.results.map((r) => (
                  <div key={r.label}>
                    <dt className="sr-only">{r.label}</dt>
                    <dd>
                      <p className="stat-number stat-number-col">{r.value}</p>
                      <p className="mt-2 text-sm font-semibold leading-snug text-brand-nero">
                        {r.label}
                      </p>
                      {r.detail && (
                        <p className="mt-1 text-xs leading-snug text-brand-grigio">
                          {r.detail}
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/casi-studio/${caso.slug}`}
                className="arrow-link text-sm md:text-base"
              >
                Come ci siamo arrivati, passo per passo
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
