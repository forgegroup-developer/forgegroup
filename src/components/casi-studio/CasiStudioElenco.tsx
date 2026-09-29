import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import { Evidenzia } from "@/components/blocchi/ui";
import CaseStudyClientLogo from "@/components/casi-studio/CaseStudyClientLogo";
import {
  getCaseStudyImage,
  getCaseStudyImageFit,
  getCaseStudyImagePosition,
} from "@/data/images";

/**
 * L'elenco dei casi studio della pagina /casi-studio.
 *
 * I casi stanno uno sotto l'altro e si vedono tutti; il componente non ha
 * stato, quindi arriva già scritto e non manda JavaScript al browser.
 *
 * Schede rifatte il 29/09/2026 (proprietà: "migliorare a livello
 * grafico"): la foto a tutta altezza su un lato, senza cornice, con il
 * mestiere sopra; dall'altro lato logo, risultato, frase chiave, i numeri
 * in riquadri e il pulsante per leggere il caso. Tutta la scheda porta al
 * caso.
 *
 * Le immagini passano dagli helper di data/images.ts: quando arrivano le
 * foto vere dei lavori si cambiano lì e questa pagina non si tocca.
 */
const unito = (t: string) => t.replace(/ €/g, " €");

export default function CasiStudioElenco() {
  return (
    <div className="space-y-8 md:space-y-10">
      {caseStudies.map((caso, idx) => {
        /* Solo la prima e' sopra la piega. */
        const primo = idx === 0;
        const destra = idx % 2 === 1;

        return (
          <article
            key={caso.slug}
            className="card-xl superficie-chiara group relative grid overflow-hidden rounded-3xl border lg:grid-cols-[5fr_7fr]"
          >
            {/* La foto: sopra da telefono, a lato da computer, alternata. */}
            <div className={`relative min-h-[240px] sm:min-h-[320px] ${destra ? "lg:order-2" : ""}`}>
              <Image
                src={getCaseStudyImage(caso.slug)}
                alt={`${caso.sector}: ${caso.shortTitle}`}
                fill
                priority={primo}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-[1.03]"
                style={{
                  objectFit: getCaseStudyImageFit(caso.slug),
                  objectPosition: getCaseStudyImagePosition(caso.slug),
                }}
              />
              {/* Un <p> e non uno span: dentro le schede chiare sul mattone gli
                  span perdono lo sfondo. */}
              <p className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider !text-brand-nero shadow">
                {caso.sector}
              </p>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              {caso.clientLogo && (
                <div className="mb-5">
                  <CaseStudyClientLogo
                    src={caso.clientLogo}
                    alt={caso.clientLogoAlt ?? caso.shortTitle}
                    variant="inline"
                    size="lg"
                  />
                </div>
              )}

              <h3 className="mb-3 text-balance font-display text-2xl font-bold leading-tight text-brand-nero md:text-3xl">
                {unito(caso.resultHeadline)}
              </h3>

              <p className="mb-6 text-pretty leading-relaxed">
                <Evidenzia
                  testo={unito(caso.hubExcerpt)}
                  chiave={caso.excerptHighlights?.map(unito).find((h) => unito(caso.hubExcerpt).includes(h))}
                />
              </p>

              <dl
                className={`mb-8 grid gap-3 ${
                  caso.results.length === 4 ? "grid-cols-2 xl:grid-cols-4" : caso.results.length === 2 ? "grid-cols-2" : "grid-cols-3"
                }`}
              >
                {caso.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col-reverse rounded-xl border border-brand-bordo px-3 py-3 text-center"
                  >
                    <dt className="mt-1 text-xs font-semibold leading-snug text-brand-nero">{r.label}</dt>
                    <dd className="font-display text-xl font-bold leading-tight text-brand-corallo-text md:text-2xl">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto">
                {/* Il link copre tutta la scheda; il colore scritto per
                    esteso perche' sul mattone la classe del corallo diventa
                    evidenziatore. */}
                <Link
                  href={`/casi-studio/${caso.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-corallo px-5 py-2.5 text-sm font-bold text-[color:var(--color-brand-corallo-text)] transition-colors after:absolute after:inset-0 after:content-[''] group-hover:bg-brand-corallo/10"
                >
                  Leggi com&apos;è andata ↗
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
