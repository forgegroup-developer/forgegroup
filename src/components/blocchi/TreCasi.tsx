import Image from "next/image";
import {
  CONTENITORE,
  SEZIONE,
  Chiave,
  Stelle,
  Titolo,
} from "@/components/blocchi/ui";
import { casi } from "@/data/prove";
import { getCaseStudyImage, getCaseStudyImagePosition } from "@/data/images";

/** I tre casi con le foto dei lavori e la recensione Google. Sul mattone. */
export default function TreCasi() {
  return (
    <>
      {/* 3 · I tre casi con le foto vere dei lavori: contro il "non è il mio settore". */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="I risultati"
            sottotitolo="Cerca quella più vicina alla tua."
          >
            Tre imprese, <Chiave>tre mestieri</Chiave>
          </Titolo>
          <div className="grid gap-6 md:grid-cols-3">
            {casi.map((c) => (
              <article
                key={c.slug}
                className="card-xl superficie-chiara flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/9] bg-brand-panna">
                  <Image
                    src={getCaseStudyImage(c.slug)}
                    alt={`Un lavoro di ${c.chi}`}
                    fill
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover"
                    style={{
                      objectPosition: getCaseStudyImagePosition(c.slug),
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow mb-1">{c.settore}</p>
                  <h3 className="mb-4 font-display text-xl font-bold text-brand-nero">
                    {c.chi}
                  </h3>
                  <p className="font-display text-3xl font-bold leading-none text-brand-corallo-text">
                    {c.numero}
                  </p>
                  <p className="mb-5 mt-1 text-sm font-semibold leading-snug text-brand-nero">
                    {c.numeroDetto}
                  </p>
                  <p className="mb-2 text-sm leading-relaxed text-brand-grigio">
                    <strong className="text-brand-nero">Prima.</strong>{" "}
                    {c.prima}
                  </p>
                  <p className="text-sm leading-relaxed text-brand-grigio">
                    <strong className="text-brand-nero">Dopo.</strong> {c.dopo}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* La recensione su Google, senza link: sulla landing niente uscite. */}
          <figure className="card-xl superficie-chiara mx-auto mt-10 max-w-2xl p-6 text-center sm:p-8">
            <p className="mb-3 flex justify-center">
              <Stelle />
            </p>
            <blockquote className="font-display text-xl font-bold leading-snug text-brand-nero sm:text-2xl">
              &ldquo;Mi sono trovato benissimo, fanno davvero la
              differenza!&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-sm text-brand-grigio">
              Fabio Dell&apos;Erario, recensione su Google · 5,0 su 6 recensioni
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
