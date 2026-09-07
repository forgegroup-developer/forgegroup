import Link from "next/link";

/**
 * Il confronto fra come si acquisiscono clienti oggi e come li acquisiamo
 * noi, disegnato invece che scritto.
 *
 * A sinistra il groviglio: ogni bolla e' una frase sentita davvero nelle
 * conoscitive, e i fili che le legano dicono che nessuna di quelle cose sta
 * in un posto solo. A destra tre passi in fila, con la freccia che va giu':
 * la stessa materia, messa in ordine.
 *
 * Sostituisce la tabella che stava qui prima. Una tabella si legge per
 * colonne, e per colonne il caos non si vede: si vede solo se lo disegni.
 *
 * Il disegno e' un SVG inline, non un'immagine: resta nitido su ogni
 * schermo, pesa nulla e i testi restano testo — quindi leggibili anche
 * dallo screen reader e trovabili da Google.
 */

/** Ogni nodo: posizione nel viewBox 640×560 e testo su piu' righe. */
const nodi = [
  { x: 120, y: 78, righe: ["Quanti preventivi", "ho fatto questo mese?"], anc: "start", tx: 22, ty: -4 },
  { x: 330, y: 52, righe: ["Quello di marzo", "l'ho richiamato?"], anc: "start", tx: 22, ty: -4 },
  { x: 528, y: 138, righe: ["Sta sul quaderno", "o su WhatsApp?"], anc: "end", tx: -22, ty: -4 },
  { x: 92, y: 250, righe: ["Il numero ce l'ha", "qualcuno in ufficio"], anc: "start", tx: 22, ty: 6 },
  { x: 300, y: 224, righe: ["Aveva un budget", "o guardava e basta?"], anc: "start", tx: 22, ty: -4 },
  { x: 500, y: 320, righe: ["Tanto se è interessato", "richiama lui"], anc: "end", tx: -22, ty: -4 },
  { x: 176, y: 412, righe: ["Lo richiamo appena", "scendo dal cantiere"], anc: "start", tx: 22, ty: 4 },
  { x: 388, y: 470, righe: ["Sabato gli faccio", "il sopralluogo"], anc: "start", tx: 22, ty: 4 },
] as const;

/** I fili: nessuna informazione ha una casa sola, e ognuna rimanda a un'altra. */
const fili: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [0, 3], [0, 4], [1, 2], [1, 4], [2, 5], [3, 4], [3, 6],
  [4, 5], [4, 6], [4, 7], [5, 7], [6, 7], [1, 5], [0, 6], [2, 4],
];

const passi = [
  {
    t: "Ti portiamo richieste da chi il lavoro può pagarlo",
    d: "Le intercettiamo noi, non aspettiamo il passaparola. E prima di passartele le sentiamo al telefono.",
  },
  {
    t: "Chi non comprerà mai lo fermiamo prima del furgone",
    d: "Budget, tempi e chi decide si chiedono in chiamata. Se manca uno dei tre, il sopralluogo non si fissa.",
  },
  {
    t: "Restiamo in trattativa con te fino alla firma",
    d: "Ogni richiesta ha una data, uno stato e una persona che la segue. Lo apri quando vuoi e vedi a che punto è.",
  },
];

export default function ConfrontoCaos() {
  return (
    <section id="confronto-caos" className="section-bianco scroll-mt-24 border-y py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="eyebrow-rule mb-6">Controllo del lavoro</p>
        <h2 className="heading-section-xl mb-14 max-w-4xl text-balance">
          Ecco perché il{" "}
          <span className="text-brand-corallo-text">Metodo FORGE</span> cambia
          la tua azienda
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* ── Come va adesso ─────────────────────────────── */}
          <div className="flex flex-col">
            <p className="etichetta-confronto etichetta-confronto-no">L&apos;impresa che rincorre</p>
            <div className="pannello-confronto flex-1">
              <svg
                viewBox="0 0 640 560"
                role="img"
                aria-label="Otto domande che un imprenditore si fa sulle proprie richieste, collegate fra loro da un groviglio di fili: nessuna informazione sta in un posto solo."
                className="h-auto w-full"
              >
                <g stroke="#c8502a" strokeWidth="1.6" opacity="0.55">
                  {fili.map(([a, b]) => (
                    <line
                      key={`${a}-${b}`}
                      x1={nodi[a].x}
                      y1={nodi[a].y}
                      x2={nodi[b].x}
                      y2={nodi[b].y}
                    />
                  ))}
                </g>
                {nodi.map((n) => (
                  <g key={n.righe.join()}>
                    <circle cx={n.x} cy={n.y} r="15" fill="#c8502a" />
                    <text
                      x={n.x}
                      y={n.y + 6}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="18"
                      fontWeight="700"
                    >
                      ?
                    </text>
                    <text
                      x={n.x + n.tx}
                      y={n.y + n.ty}
                      textAnchor={n.anc}
                      fill="#1c1917"
                      fontSize="15.5"
                      fontWeight="600"
                    >
                      {n.righe.map((r, i) => (
                        <tspan key={r} x={n.x + n.tx} dy={i === 0 ? 0 : 18}>
                          {r}
                        </tspan>
                      ))}
                    </text>
                  </g>
                ))}
              </svg>
              <p className="mt-2 text-sm leading-snug text-brand-grigio">
                Nessuna di queste risposte sta in un posto solo. Stanno nel
                quaderno, su WhatsApp, nella testa di chi ha risposto al
                telefono.
              </p>
            </div>

            <span className="freccia-esito" aria-hidden>
              ↓
            </span>

            <div className="esito-confronto esito-confronto-no">
              <p className="mb-1 font-display font-bold">
                Risultato se continui così:
              </p>
              <p className="text-pretty italic leading-relaxed">
                &ldquo;Faccio preventivi tutto il giorno e a fine anno non so
                nemmeno quanti ne ho chiusi.&rdquo;
              </p>
            </div>
          </div>

          {/* ── Come va con noi ────────────────────────────── */}
          <div className="flex flex-col">
            <p className="etichetta-confronto etichetta-confronto-si">L&apos;impresa che sceglie</p>
            <div className="pannello-confronto flex-1">
              <ol className="flex h-full flex-col justify-center gap-9 py-4">
                {passi.map((p, i) => (
                  <li key={p.t} className="relative flex gap-5">
                    <span className="passo-numero">{i + 1}</span>
                    {i < passi.length - 1 && <span className="passo-filo" aria-hidden />}
                    <div>
                      <p className="font-display text-base font-bold leading-snug text-brand-nero sm:text-lg">
                        {p.t}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-brand-grigio">
                        {p.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <span className="freccia-esito" aria-hidden>
              ↓
            </span>

            <div className="esito-confronto esito-confronto-si">
              <p className="mb-1 font-display font-bold">
                Risultato col Metodo FORGE:
              </p>
              <p className="text-pretty italic leading-relaxed">
                &ldquo;So quante richieste ho, a che punto sta ognuna e quali
                valgono il viaggio. In cantiere ci vado per lavorare.&rdquo;
              </p>
            </div>
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
