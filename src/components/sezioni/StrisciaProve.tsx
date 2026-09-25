/**
 * La striscia di prove sotto la hero.
 *
 * Impianto preso dal sito indicato dalla proprieta' come riferimento
 * (24/09/2026): quattro voci in fila, numero grande e didascalia
 * piccola, subito sotto il titolo. Serve a mettere i fatti prima del
 * racconto, che e' quello che la ricerca dice di questo mercato: gli
 * annunci che durano portano tutti una cifra davanti.
 *
 * Differenza voluta rispetto al riferimento: loro ci mettono una
 * garanzia ("30 giorni lavoriamo gratis"). Qui no. Le parole garanzia
 * e promessa non si scrivono, e "gratis" nemmeno: decisioni della
 * proprieta'. Al loro posto c'e' il ritmo di lavoro, che e' l'unica
 * cosa che nessun concorrente dichiara.
 *
 * Ogni voce e' un fatto della Scheda dei fatti. Non si aggiunge una
 * quinta voce con un numero che non sta li' dentro.
 */
const prove = [
  {
    numero: "3",
    testo: "imprese raccontate per intero, con il nome sotto",
  },
  {
    numero: "126.500 €",
    testo: "di nuovi contratti in 90 giorni, solo dalle Meta Ads",
  },
  {
    numero: "4 al mese",
    testo: "le chiamate dedicate solo alle tue trattative aperte",
  },
  {
    numero: "1,48 €",
    testo: "il costo per contatto del caso DISA",
  },
];

export default function StrisciaProve() {
  return (
    <section className="section-bianco border-y py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {prove.map((p) => (
            <div key={p.testo} className="flex flex-col gap-1.5">
              <dt className="font-display text-2xl font-bold leading-none text-brand-nero md:text-3xl">
                {p.numero}
              </dt>
              <dd className="text-sm leading-snug text-brand-grigio">
                {p.testo}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
