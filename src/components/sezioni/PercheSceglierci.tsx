import Image from "next/image";
import Link from "next/link";
import { iniziaImages } from "@/data/images";

/**
 * "Perché scegliere Forge Group" — impianto preso dalla sezione omonima
 * di Mirco Gasparotto.
 *
 * La sua sequenza è: occhiello con la domanda, poi il meccanismo come
 * titolo ("La chiave per la crescita aziendale: il controllo dei
 * numeri"), poi il paragrafo che dice "abbiamo eliminato tutti questi
 * problemi creando un Metodo…", e infine il pannello con la percentuale
 * e l'elenco dei modi in cui il lettore si sta facendo male da solo.
 *
 * Funziona perché l'elenco non accusa: descrive. Il lettore si conta
 * dentro da solo, e a quel punto il metodo non è una proposta, è la via
 * d'uscita da una cosa che ha appena riconosciuto.
 *
 * L'elenco è la voce della proprietà, non una lista scritta a tavolino.
 */

/*
 * I problemi detti con le parole dei titolari: frasi dalle call (Voce diretta
 * del target) e i problemi della Testa aziendale §3. Riscritto il 29/09 su
 * richiesta della proprietà: prima era un elenco di abitudini, ora sono le
 * situazioni che il titolare racconta.
 */
const abitudini = [
  "«Gli faccio sopralluogo e progetto, e poi sceglie un altro»",
  "«Per 500 euro in meno ha scelto l'altra azienda»",
  "«Mi chiamano solo per sapere quanto costa al metro quadro»",
  "«Ho mandato il preventivo, e dopo il ci devo pensare non si è più fatto sentire»",
  "«Ho pagato un'agenzia, ma i contatti non erano nemmeno lavorabili»",
  "«Nei mesi buoni non ce la faccio, in quelli morti aspetto che squilli il telefono»",
  "«Il lavoro l'ho finito, ma i soldi non arrivano»",
];

export default function PercheSceglierci() {
  return (
    <section
      id="perche"
      className="section-mattone scroll-mt-24 py-20 md:py-28"
    >
      {/* Il titolo sopra le due colonne, come tutti i titoli di sezione
          (REGOLE-DEL-SITO §4): stessa misura e stesso grassetto. */}
      <div className="mx-auto mb-12 max-w-4xl px-5 text-center sm:px-6 md:mb-16 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Perché scegliere Forge Group</span>
        </p>
        <h2 className="heading-section-xl text-balance">
          La chiave per crescere in edilizia:{" "}
          <span>il controllo della trattativa</span>
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="flex flex-col justify-center">
          <figure className="relative mb-8 aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={iniziaImages.hero}
              alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover object-right"
            />
            <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
              Immagine generata con AI
            </figcaption>
          </figure>

          <p className="text-pretty text-lg leading-relaxed">
            Per questo abbiamo costruito il Metodo FORGE: ti portiamo richieste
            già filtrate da chi il lavoro può pagarlo, scriviamo con te il
            processo di vendita e seguiamo con te ogni trattativa fino alla
            firma. Senza che tu debba rincorrere nessuno, e senza che tu debba
            diventare un esperto di pubblicità.
          </p>

          <div className="mt-9">
            <Link href="#metodo" className="btn-ghost">
              Vedi le cinque fasi del Metodo FORGE
            </Link>
          </div>
        </div>

        <div className="superficie-chiara rounded-3xl border border-brand-bordo bg-brand-bianco p-7 shadow-lg sm:p-9">
          {/* La domanda apre e chiude l'elenco: in mezzo lui si conta dentro
              da solo, e nessuna riga lo sta accusando. */}
          <p className="mb-4 font-display text-lg font-bold text-brand-corallo-text sm:text-xl">
            Sei un&apos;impresa edile?
          </p>
          <p className="mb-1 font-display text-3xl font-bold leading-none text-brand-nero sm:text-4xl">
            Ti riconosci in una di queste?
          </p>
          <p className="mb-7 text-sm text-brand-grigio">
            Sono le frasi che ci dicono i titolari al primo appuntamento.
          </p>

          <ul className="space-y-4">
            {abitudini.map((riga) => (
              <li key={riga} className="flex gap-3.5">
                <span className="segno-no" aria-hidden>
                  ✕
                </span>
                <span className="text-[0.98rem] leading-snug text-brand-nero">
                  {riga}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-brand-bordo pt-6 font-display text-lg font-bold leading-snug text-brand-nero sm:text-xl">
            È normale: succede alle imprese che vivono di passaparola. Non è
            la stagionalità e non è la crisi: manca un modo per far arrivare
            le richieste giuste e portarle alla firma.
          </p>
        </div>
      </div>
    </section>
  );
}
