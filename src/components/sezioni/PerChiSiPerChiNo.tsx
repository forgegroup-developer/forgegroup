import Image from "next/image";
import Link from "next/link";
import { iniziaImages } from "@/data/images";
import { studio } from "@/data/blocchi";

/**
 * Il filtro finale: per chi è questo lavoro e per chi non lo è.
 *
 * Sostituisce la CTA generica che stava sopra il footer. Una richiesta
 * che qualifica vale più di una che raccoglie: chi si riconosce nella
 * colonna sinistra scrive già convinto, chi si riconosce nella destra
 * non ci fa perdere una conoscitiva. È anche l'unico modo onesto di
 * dire "non lavoriamo con tutti" senza sembrare arroganti — lo si dice
 * elencando, non dichiarando.
 *
 * I criteri vengono dalle conoscitive vere: il tempo di incubazione di
 * 3-4 mesi, la velocità di risposta, il fatto che il processo di
 * vendita vada toccato.
 */

const si = [
  "Hai un'impresa che lavora già (edile, serramenti, impianti, fotovoltaico, arredo) e vuoi crescere",
  "Mandi preventivi ma a fine anno non sai quanti ne hai chiusi",
  "Sei stanco di prendere lavori a ribasso solo per tenere pieno il calendario",
  "In azienda c'è qualcuno che può richiamare una richiesta in giornata",
  "Sei disposto a cambiare il modo in cui gestisci le richieste, non solo a fare pubblicità",
];

const no = [
  "Cerchi contatti da chiamare quando hai tempo, e basta",
  "Vuoi risultati in due settimane: in edilizia fra la prima richiesta e la firma passano tre o quattro mesi",
  "Non vuoi che nessuno metta mano al tuo modo di vendere",
  "Sei convinto che l'unico problema sia il prezzo degli altri",
];

type Props = {
  /** Una riga in più sotto l'introduzione, per le pagine che la vogliono. */
  nota?: string;
  /** Dove porta il pulsante: /contatti di solito, il modulo della pagina se ce l'ha. */
  ctaHref?: string;
  /** Mostra cosa c'è nello studio di fattibilità, come nella landing (home). */
  studio?: boolean;
  /** Il fondo della sezione: bianco di solito, mattone dove la pagina alterna. */
  sfondo?: "bianco" | "mattone";
};

export default function PerChiSiPerChiNo({
  nota,
  ctaHref = "/contatti",
  sfondo = "bianco",
  studio: conStudio = false,
}: Props) {
  return (
    <section
      id="per-chi"
      className={`${sfondo === "mattone" ? "section-mattone" : "section-bianco border-y"} scroll-mt-24 py-20 md:py-28`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Prima di scriverci</span>
        </p>
        <h2 className="heading-section-xl mb-5 text-center text-balance">
          Non lavoriamo con tutte le imprese.{" "}
          <span className="text-brand-corallo-text">
            Leggi prima di candidarti.
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-pretty text-lg leading-relaxed text-brand-grigio md:mb-14">
          Facciamo pochi progetti per volta perché in ognuno ci mettiamo dei
          consulenti dedicati. Se ti riconosci nella colonna di destra,
          risparmiamo tempo tutti e due.
        </p>
        {nota && (
          <p className="-mt-6 mb-12 text-center font-semibold text-brand-nero md:-mt-8 md:mb-14">
            {nota}
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="card-xl superficie-chiara p-7 sm:p-9">
            <p className="mb-6 font-display text-2xl font-bold text-brand-nero">
              È il lavoro giusto per te se…
            </p>
            <ul className="space-y-4">
              {si.map((riga) => (
                <li key={riga} className="flex gap-3.5">
                  <span className="segno-si" aria-hidden>
                    ✓
                  </span>
                  <span className="text-[0.98rem] leading-snug text-brand-nero">
                    {riga}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-xl superficie-chiara p-7 sm:p-9">
            <p className="mb-6 font-display text-2xl font-bold text-brand-nero">
              Lascia perdere se…
            </p>
            <ul className="space-y-4">
              {no.map((riga) => (
                <li key={riga} className="flex gap-3.5">
                  <span className="segno-no" aria-hidden>
                    ✕
                  </span>
                  <span className="text-[0.98rem] leading-snug text-brand-grigio">
                    {riga}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          {conStudio ? (
            <div className="mx-auto mb-10 grid max-w-5xl items-center gap-8 text-left md:grid-cols-2 md:gap-12">
              <figure className="superficie-chiara relative aspect-[3/2] overflow-hidden rounded-2xl">
                <Image
                  src={iniziaImages.studioDiFattibilita}
                  alt="Un consulente mostra a un imprenditore edile lo studio di fattibilità, con la cartina della zona sul tavolo"
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
                  Immagine generata con AI
                </figcaption>
              </figure>
              <div>
                <p className="mb-5 text-lg leading-relaxed text-brand-nero">
                  Se sei nella colonna di sinistra, il primo passo è lo studio
                  di fattibilità. Prima di parlare di pubblicità facciamo i
                  conti sulla tua impresa e sulla tua zona. Dentro trovi:
                </p>
                <ul className="space-y-4">
                  {studio.map((riga) => (
                    <li key={riga.cosa} className="flex gap-3.5">
                      <span className="segno-si mt-1" aria-hidden>
                        ✓
                      </span>
                      <p className="text-[1.02rem] leading-relaxed text-brand-grigio">
                        <strong className="chiave">{riga.cosa}</strong>{" "}
                        {riga.dettaglio}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="mx-auto mb-7 max-w-2xl text-pretty text-lg leading-relaxed text-brand-nero">
              Se sei nella colonna di sinistra, il primo passo è uno studio di
              fattibilità: guardiamo quanti preventivi fai, quanti ne chiudi e
              quanto vale ognuno di quelli che perdi. Se i numeri dicono che non
              ha senso, te lo diciamo noi per primi.
            </p>
          )}
          <Link href={ctaHref} className="btn-corallo">
            Voglio lo studio di fattibilità per la mia impresa
          </Link>
        </div>
      </div>
    </section>
  );
}
