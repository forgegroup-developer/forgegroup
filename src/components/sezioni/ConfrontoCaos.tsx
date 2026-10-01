import Link from "next/link";
import { Evidenzia } from "@/components/blocchi/ui";

/**
 * "Ecco perché il Metodo FORGE cambia la tua azienda", come prima e dopo.
 *
 * Quattro situazioni vere, poche ma reali (proprietà, 29/09): a sinistra
 * quello che il titolare vive o dice, a destra come lo risolviamo. Le
 * situazioni sono diverse da quelle della tabella del confronto più in
 * basso: qui il tema è il controllo del lavoro, cioè dove finiscono le
 * richieste e le trattative. Fonti: la frase di un cliente già sul sito, la
 * consulenza ROVI (Voce diretta del target), la lettera di vendita (blocco
 * 4), il trigger "se ti fermi una settimana" (Trigger di settore §9). Le
 * soluzioni sono il meccanismo della Scheda dei fatti.
 */
const coppie = [
  {
    prima:
      "«Faccio preventivi tutto il giorno e a fine anno non so nemmeno quanti ne ho chiusi»",
    chiave: "sai quante trattative hai aperte e a che punto sono",
    dopo: "Nel gestionale ogni richiesta ha uno stato, una data e chi la segue: in ogni momento sai quante trattative hai aperte e a che punto sono.",
  },
  {
    prima: "«Tutti questi qua non rispondono, non rispondono, non rispondono»",
    chiave: "richiami chi ha già detto cosa vuole",
    dopo: "Il modulo chiede tipo di lavoro, tempi, budget e zona prima che la richiesta ti arrivi: richiami chi ha già detto cosa vuole, con le parole che scriviamo insieme.",
  },
  {
    prima:
      "Il preventivo da 60.000 euro finisce in fondo a una chat di WhatsApp",
    chiave: "Tutte le richieste stanno in un posto solo",
    dopo: "Tutte le richieste stanno in un posto solo, anche quelle del passaparola, e il gestionale ti dice chi va richiamato oggi.",
  },
  {
    prima: "Se ti fermi una settimana, si ferma tutto",
    chiave: "Il processo di vendita è scritto",
    dopo: "Il processo di vendita è scritto: chi risponde al telefono sa cosa chiedere e quando richiamare. E ogni settimana lo guardiamo insieme.",
  },
];

export default function ConfrontoCaos() {
  return (
    <section
      id="confronto-caos"
      className="section-bianco scroll-mt-24 border-y py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Controllo del lavoro</span>
        </p>
        <h2 className="heading-section-xl mx-auto mb-12 max-w-4xl text-center text-balance md:mb-16">
          Ecco perché il{" "}
          <span className="text-brand-corallo-text">Metodo FORGE</span> cambia
          la tua azienda
        </h2>

        {/* Le intestazioni una volta sola, sopra le coppie. */}
        <div className="mb-4 hidden grid-cols-2 gap-10 md:grid">
          <p className="etichetta-confronto etichetta-confronto-no">
            L&apos;impresa che rincorre
          </p>
          <p className="etichetta-confronto etichetta-confronto-si">
            L&apos;impresa che sceglie
          </p>
        </div>

        <ol className="space-y-5">
          {coppie.map((c) => (
            <li
              key={c.prima}
              className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4"
            >
              <div className="flex items-start gap-3.5 rounded-2xl border border-brand-bordo bg-brand-bianco p-6">
                <span className="segno-no mt-0.5" aria-hidden>
                  ✕
                </span>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-corallo-text md:hidden">
                    Prima
                  </p>
                  <p className="font-display text-lg font-bold leading-snug text-brand-nero">
                    {c.prima}
                  </p>
                </div>
              </div>
              <span
                className="flex items-center justify-center text-2xl font-bold text-brand-corallo-text"
                aria-hidden
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
              <div className="flex items-start gap-3.5 rounded-2xl border-2 border-brand-verde/40 bg-brand-bianco p-6">
                <span className="segno-si mt-0.5" aria-hidden>
                  ✓
                </span>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-verde-text md:hidden">
                    Con il Metodo FORGE
                  </p>
                  <p className="text-[1.02rem] leading-relaxed text-brand-grigio">
                    <Evidenzia testo={c.dopo} chiave={c.chiave} />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-10">
          <div className="esito-confronto esito-confronto-no">
            <p className="mb-1 font-display font-bold">Se continui così:</p>
            <p className="text-pretty italic leading-relaxed">
              Le richieste restano sul quaderno, su WhatsApp e nella testa di
              chi ha risposto al telefono.
            </p>
          </div>
          <div className="esito-confronto esito-confronto-si">
            <p className="mb-1 font-display font-bold">Col Metodo FORGE:</p>
            <p className="text-pretty italic leading-relaxed">
              &ldquo;So quante richieste ho, a che punto sta ognuna e quali
              valgono il viaggio. In cantiere ci vado per lavorare.&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contatti"
            className="btn-corallo text-center sm:whitespace-nowrap"
          >
            Voglio lo studio di fattibilità per la mia impresa
          </Link>
          <Link href="#metodo" className="arrow-link text-sm md:text-base">
            Vedi il Metodo FORGE
          </Link>
        </div>
      </div>
    </section>
  );
}
