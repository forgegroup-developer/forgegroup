import Image from "next/image";
import {
  CONTENITORE,
  SEZIONE,
  STACCO,
  Chiave,
  Titolo,
} from "@/components/blocchi/ui";
import { squadra } from "@/data/blocchi";
import { teamImages } from "@/data/images";

/** I fondatori e la squadra, descritta per ruoli (i collaboratori sono esterni). */
export default function ChiSiamo({
  dopoLaChiamata = false,
}: {
  /** Sulla landing chi legge è appena stato chiamato da Gianpio. */
  dopoLaChiamata?: boolean;
}) {
  return (
    <>
      {/* 6 · Chi siamo: le facce, da dove veniamo, e chi lavora sulla tua impresa. */}
      <section className={`section-bianco border-y ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Chi siamo">
            Le persone <Chiave>dietro Forge</Chiave>
          </Titolo>

          <div
            className={`${STACCO} grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12`}
          >
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-panna">
              <Image
                src={teamImages.foundersDuo}
                alt="Marco Pio Cerbone e Gianpio Uva, i fondatori di Forge Group, al TEDx Benevento"
                fill
                sizes="(min-width: 768px) 380px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 10%" }}
              />
            </figure>
            <div>
              <p className="mb-5 font-display text-2xl font-bold leading-snug text-brand-nero">
                Siamo Marco Pio Cerbone e Gianpio Uva, i fondatori di Forge
                Group.{" "}
                <Chiave>
                  {dopoLaChiamata
                    ? "Gianpio è quello che ti ha chiamato."
                    : "Nella tua chiamata settimanale ci siamo noi."}
                </Chiave>
              </p>
              <p className="body-lg mb-5">
                Siamo entrati in contatto con centinaia di imprese edili e
                abbiamo analizzato i loro processi da vicino, scendendo sul
                campo: come arrivano le richieste, come si fanno sopralluoghi e
                preventivi, come si chiude. Abbiamo visto sempre la stessa cosa:{" "}
                <strong className="text-brand-nero">
                  il lavoro in cantiere lo sanno fare. Manca un modo per trovare
                  i clienti giusti e portarli alla firma.
                </strong>
              </p>
              <p className="body-lg">
                Per questo facciamo una cosa sola:{" "}
                <Chiave>
                  portare richieste di lavoro alle imprese edili, e seguirle
                  fino al contratto
                </Chiave>
                .
              </p>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
            <div className="md:order-2">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-panna">
                  <Image
                    src={teamImages.setVideoCliente}
                    alt="Il nostro videomaker riprende il titolare di un'azienda cliente nel suo showroom"
                    fill
                    sizes="(min-width: 768px) 380px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-brand-grigio">
                  Le riprese del video di un cliente, nel suo showroom.
                </figcaption>
              </figure>
            </div>
            <div className="md:order-1">
              <h3 className="mb-6 font-display text-2xl font-bold leading-snug text-brand-nero md:text-3xl">
                Con noi lavora una squadra che fa <Chiave>una cosa sola</Chiave>
                : portarti clienti.
              </h3>
              <ul className="space-y-5">
                {squadra.map((s) => (
                  <li key={s.chi} className="flex gap-4">
                    <span className="segno-si mt-1" aria-hidden>
                      ✓
                    </span>
                    <p className="body-lg">
                      <strong className="text-brand-nero">{s.chi}</strong>,{" "}
                      {s.cosa}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
