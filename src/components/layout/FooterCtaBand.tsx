import Link from "next/link";

/**
 * La fascia sopra il footer.
 *
 * Prima diceva "Contattaci e parliamone davanti un caffè" sopra un
 * fondale animato: una frase da agenzia, che non dice niente a un
 * imprenditore edile e che gli chiede di fare una cosa senza dargli un
 * motivo. E il fondale era la stessa scena animata che avevamo tolto
 * dal resto del sito per farlo partire su rete mobile.
 *
 * Ora fa una domanda a cui il lettore sa già la risposta, e la risposta
 * fa male abbastanza da farlo scrivere.
 *
 * Sulla home non compare: lì la pagina si chiude col filtro
 * "per chi sì / per chi no", che ha già la sua richiesta.
 */

type Props = {
  isCaseStudy?: boolean;
};

export default function FooterCtaBand({ isCaseStudy = false }: Props) {
  return (
    <section className="section-sabbia border-y py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Il primo passo</span>
        </p>

        {isCaseStudy ? (
          <h2 className="heading-section-xl mb-5 text-balance">
            Vuoi gli stessi numeri{" "}
            <span className="text-brand-corallo-text">nella tua impresa</span>?
          </h2>
        ) : (
          <h2 className="heading-section-xl mb-5 text-balance">
            Quanti preventivi hai mandato questo mese?{" "}
            <span className="text-brand-corallo-text">E quanti ne hai chiusi?</span>
          </h2>
        )}

        <p className="mx-auto mb-9 max-w-2xl text-pretty text-lg leading-relaxed text-brand-grigio">
          {isCaseStudy
            ? "Partiamo da uno studio di fattibilità: guardiamo i tuoi numeri e ti diciamo se un percorso simile ha senso per te. A volte la risposta è no, e te la diciamo lo stesso."
            : "Se la seconda risposta non ti piace, il problema non è il prezzo degli altri. Partiamo da uno studio di fattibilità e guardiamo i tuoi numeri insieme."}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/contatti" className="btn-corallo">
            Voglio lo studio di fattibilità per la mia impresa
          </Link>
          <Link href="/casi-studio" className="arrow-link">
            Guarda i numeri di chi ci ha già scelto
          </Link>
        </div>
      </div>
    </section>
  );
}
