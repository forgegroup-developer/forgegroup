import type { Metadata } from "next";
import HeroGooeySection from "@/components/HeroGooeySection";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy del sito Forge Group: tipologie di cookie usati e modalità di gestione del consenso.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false, follow: true },
};

export default function CookiePolicy() {
  return (
    <>
      <HeroGooeySection innerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Cookie Policy</p>
        <h1 className="heading-section font-semibold text-brand-nero leading-tight">Cookie Policy</h1>
      </HeroGooeySection>

      <article className="py-12 md:py-16 section-bianco">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-grigio leading-relaxed mb-6">Ultimo aggiornamento: 27 maggio 2026</p>

          <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">Cosa sono i cookie</h2>
          <p className="text-brand-grigio leading-relaxed mb-6">
            I cookie sono piccoli file di testo che i siti web visitati inviano al dispositivo dell&apos;utente per essere
            memorizzati e ritrasmessi al sito in occasione di successive visite.
          </p>

          <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
            Tipologie di cookie utilizzati
          </h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-brand-nero">
              <span className="text-brand-corallo">✦</span>
              <span>
                <strong>Cookie tecnici:</strong> necessari al corretto funzionamento del sito e alla navigazione.
              </span>
            </li>
            <li className="flex items-start gap-3 text-brand-nero">
              <span className="text-brand-corallo">✦</span>
              <span>
                <strong>Cookie analitici:</strong> raccolgono informazioni in forma aggregata sul numero di visitatori e su
                come visitano il sito.
              </span>
            </li>
            <li className="flex items-start gap-3 text-brand-nero">
              <span className="text-brand-corallo">✦</span>
              <span>
                <strong>Cookie di profilazione:</strong> creano profili relativi all&apos;utente e vengono utilizzati per
                inviare messaggi pubblicitari in linea con le preferenze manifestate.
              </span>
            </li>
          </ul>

          <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
            Gestione delle preferenze
          </h2>
          <p className="text-brand-grigio leading-relaxed mb-6">
            L&apos;utente può gestire le proprie preferenze sui cookie direttamente dal proprio browser o tramite il banner
            presente all&apos;ingresso del sito. La disattivazione dei cookie tecnici potrebbe compromettere il corretto
            funzionamento del sito.
          </p>

          <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">Contatti</h2>
          <p className="text-brand-grigio leading-relaxed">
            Per qualsiasi domanda relativa alla gestione dei cookie scrivici a{" "}
            <a href="mailto:info@forgegroup.it" className="text-brand-corallo hover:underline">
              info@forgegroup.it
            </a>
            .
          </p>

          <p className="text-sm text-brand-grigio-light mt-12">
            Questa è una versione preliminare. Una versione completa e legalmente vincolante verrà pubblicata
            contestualmente al lancio del sito in produzione.
          </p>
        </div>
      </article>
    </>
  );
}
