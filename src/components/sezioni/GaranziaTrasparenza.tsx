import Link from "next/link";

/**
 * La garanzia di trasparenza, costruita intorno al CRM.
 *
 * È la risposta all'obiezione che ferma più trattative di ogni altra.
 * Nelle quattro conoscitive nessuno ha detto "il marketing non
 * funziona": hanno detto "non sai come realmente lavorano" e "non c'è
 * stata la serietà di dirmi che non stava andando". Il dolore non è il
 * risultato mancato, è il canone pagato al buio.
 *
 * A quella obiezione non si risponde promettendo risultati — si
 * risponde dicendo cosa vede e quando. Il CRM è l'unica cosa che lo
 * dimostra invece di dichiararlo, ed è già nostro: lo diamo a ogni
 * impresa che lavora con noi.
 *
 * Sta subito dopo il Metodo e prima dei servizi: è il punto esatto in
 * cui il lettore si chiede "sì, ma come faccio a controllarvi".
 */

const garanzie = [
  {
    t: "Il CRM gestionale è tuo",
    d: "Ogni richiesta che entra ha uno stato, una data e una persona che la segue. Lo apri tu dal telefono, quando vuoi, e vedi a che punto sta. Non è un report che arriva a fine mese: è il CRM, aperto.",
  },
  {
    t: "Sai dove finiscono i tuoi soldi",
    d: "Quanto va in pubblicità e quanto resta a noi, separato, ogni mese. Senza doverlo chiedere.",
  },
  {
    t: "Non parli con dieci persone diverse",
    d: "Hai i tuoi consulenti dedicati, e restano gli stessi per tutta la durata del lavoro.",
  },
  {
    t: "Prima di partire sai se ha senso",
    d: "Si comincia da uno studio di fattibilità sui tuoi numeri. A volte la risposta è no, e te la diciamo lo stesso.",
  },
];

export default function GaranziaTrasparenza() {
  return (
    <section id="trasparenza" className="section-bianco scroll-mt-24 border-y py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">La garanzia di trasparenza</span>
        </p>
        <h2 className="heading-section-xl mb-6 text-center text-balance">
          Non ti chiediamo di fidarti.{" "}
          <span className="text-brand-corallo-text">Ti diamo le chiavi.</span>
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-pretty text-lg leading-relaxed text-brand-grigio md:mb-16">
          Quasi nessuno degli imprenditori con cui parliamo è al primo
          tentativo. E quasi nessuno si lamenta dei risultati: si lamenta di
          aver pagato un canone senza poter vedere niente. Ecco cosa vedi tu,
          e quando.
        </p>

        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {garanzie.map((g) => (
            <div key={g.t} className="border-t-2 border-brand-corallo pt-5">
              <p className="mb-2 font-display text-lg font-bold leading-snug text-brand-nero">
                {g.t}
              </p>
              <p className="text-[0.97rem] leading-relaxed text-brand-grigio">
                {g.d}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-brand-panna p-7 text-center sm:p-9">
          <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-brand-nero">
            Il <strong className="font-semibold">CRM lo diamo a ogni impresa</strong>{" "}
            che decide di lavorare con noi. Non è un extra da comprare a parte:
            è la parte del Metodo FORGE che ti fa vedere quello che sta
            succedendo, richiesta per richiesta.
          </p>
          <div className="mt-7">
            <Link href="#metodo" className="btn-ghost">
              Vedi il Metodo FORGE, i 5 step
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
