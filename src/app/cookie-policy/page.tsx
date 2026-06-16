import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import HeroGooeySection from "@/components/HeroGooeySection";
import { LEGAL, LEGAL_PROCESSORS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa estesa sui cookie e sulle tecnologie simili utilizzate dal sito Forge Group Italia, ai sensi del GDPR e della normativa ePrivacy.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false, follow: true },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-brand-nero">
          <span className="text-brand-corallo shrink-0">✦</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CookiePolicy() {
  return (
    <>
      <HeroGooeySection innerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Cookie Policy</p>
        <h1 className="heading-section font-semibold text-brand-nero leading-tight">
          Informativa sui cookie e tecnologie simili
        </h1>
      </HeroGooeySection>

      <article className="py-12 md:py-16 section-bianco">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-grigio leading-relaxed mb-6">
            Ultimo aggiornamento: {LEGAL.lastUpdated}
          </p>
          <p className="text-brand-grigio leading-relaxed mb-6">
            La presente Cookie Policy integra la{" "}
            <Link href="/privacy-policy" className="text-brand-corallo hover:underline">
              Privacy Policy
            </Link>{" "}
            di {LEGAL.controllerName} e descrive le modalità di utilizzo di cookie e tecnologie simili sul sito{" "}
            <a href={LEGAL.siteUrl} className="text-brand-corallo hover:underline">
              {LEGAL.siteUrl}
            </a>
            .
          </p>

          <Section title="1. Titolare">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Titolare del trattamento: <strong>{LEGAL.controllerName}</strong>, {LEGAL.controllerLocation}. Email:{" "}
              <a href={`mailto:${LEGAL.controllerEmail}`} className="text-brand-corallo hover:underline">
                {LEGAL.controllerEmail}
              </a>
              .
            </p>
          </Section>

          <Section title="2. Cosa sono i cookie">
            <p className="text-brand-grigio leading-relaxed mb-6">
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell&apos;utente (computer,
              tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita
              successiva. Esistono anche tecnologie simili (es. local storage, session storage, pixel, identificatori
              del dispositivo) con funzioni analoghe: per semplicità, in questa informativa facciamo riferimento a
              «cookie» anche per tali strumenti, ove rilevanti.
            </p>
          </Section>

          <Section title="3. Cookie utilizzati su questo sito">
            <p className="text-brand-grigio leading-relaxed mb-4">
              <strong>Situazione attuale ({LEGAL.lastUpdated}):</strong> il sito{" "}
              <strong>non utilizza cookie di profilazione o marketing</strong> e{" "}
              <strong>non utilizza strumenti di analytics di terze parti</strong> (es. Google Analytics, Meta Pixel,
              Hotjar) che richiedano tracciamento dell&apos;utente.
            </p>
            <p className="text-brand-grigio leading-relaxed mb-3">
              Possono essere utilizzati esclusivamente cookie e storage tecnici, strettamente necessari a:
            </p>
            <BulletList
              items={[
                "garantire la corretta erogazione delle pagine e la sicurezza del sito (es. cookie di bilanciamento del carico o di protezione da attacchi, ove attivati dall'infrastruttura di hosting);",
                "memorizzare preferenze tecniche essenziali per la navigazione;",
                "gestire richieste inviate tramite form (es. protezione anti-spam e rate limiting lato server).",
              ]}
            />
            <p className="text-brand-grigio leading-relaxed mb-6">
              Tali cookie rientrano nella categoria dei <strong>cookie tecnici</strong> e, ai sensi della normativa
              applicabile e delle linee guida del Garante Privacy, <strong>non richiedono consenso</strong> preventivo
              dell&apos;utente, in quanto necessari al funzionamento del servizio esplicitamente richiesto.
            </p>
          </Section>

          <Section title="4. Cookie di terze parti e fornitori">
            <p className="text-brand-grigio leading-relaxed mb-3">
              L&apos;infrastruttura del sito può comportare il trattamento di dati di navigazione da parte dei seguenti
              fornitori, anche mediante cookie tecnici o log di sistema:
            </p>
            <ul className="space-y-4 mb-6">
              {LEGAL_PROCESSORS.map((p) => (
                <li key={p.name} className="rounded-xl border border-brand-bordo bg-brand-panna p-4">
                  <p className="font-semibold text-brand-nero">{p.name}</p>
                  <p className="text-brand-grigio text-sm mt-1">{p.role}</p>
                  <a
                    href={p.privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-corallo text-sm hover:underline mt-2 inline-block"
                  >
                    Informativa privacy del fornitore →
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-brand-grigio leading-relaxed mb-6">
              I link a profili social (Facebook, Instagram, LinkedIn) presenti nel footer reindirizzano a piattaforme
              esterne: eventuali cookie impostati da tali siti sono gestiti esclusivamente dai rispettivi titolari e
              non sono controllati da {LEGAL.controllerShortName}.
            </p>
          </Section>

          <Section title="5. Cookie analitici e di profilazione">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Al momento <strong>non sono attivi</strong> cookie analitici né cookie di profilazione sul dominio{" "}
              {LEGAL.siteUrl.replace("https://", "")}. Qualora in futuro fossero introdotti strumenti di analytics o
              marketing (es. per misurare l&apos;efficacia delle campagne o personalizzare contenuti), la presente
              informativa sarà aggiornata e, ove richiesto dalla legge, verrà implementato un sistema di raccolta del
              consenso (cookie banner) prima dell&apos;installazione di cookie non tecnici.
            </p>
          </Section>

          <Section title="6. Durata dei cookie">
            <BulletList
              items={[
                "Cookie di sessione: vengono cancellati alla chiusura del browser.",
                "Cookie persistenti tecnici dell'infrastruttura: durata variabile, generalmente limitata e definita dal fornitore di hosting (consultare l'informativa del fornitore).",
                "Storage locale del browser: eventuali preferenze tecniche possono persistere fino a cancellazione manuale da parte dell'utente.",
              ]}
            />
          </Section>

          <Section title="7. Come gestire cookie e preferenze">
            <p className="text-brand-grigio leading-relaxed mb-3">
              Puoi gestire i cookie attraverso le impostazioni del browser. Di seguito i link alle istruzioni dei
              browser più diffusi:
            </p>
            <BulletList
              items={[
                "Google Chrome: Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti",
                "Mozilla Firefox: Impostazioni → Privacy e sicurezza → Cookie e dati dei siti web",
                "Apple Safari: Preferenze → Privacy → Gestisci dati siti web",
                "Microsoft Edge: Impostazioni → Cookie e autorizzazioni sito",
              ]}
            />
            <p className="text-brand-grigio leading-relaxed mb-6">
              La disabilitazione dei cookie tecnici può compromettere il corretto funzionamento di alcune parti del
              sito. La disabilitazione dei cookie di terze parti non gestiti da noi va effettuata dalle impostazioni
              del browser o dalle preferenze delle singole piattaforme esterne.
            </p>
          </Section>

          <Section title="8. Base giuridica e diritti">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il trattamento dei dati raccolti tramite cookie tecnici si basa sul legittimo interesse del Titolare e/o
              sulla necessità di esecuzione del servizio richiesto dall&apos;utente. Per i trattamenti basati su
              consenso (eventuali cookie non tecnici futuri), la base giuridica sarà il consenso ex art. 6, par. 1,
              lett. a) GDPR. Per l&apos;esercizio dei diritti previsti dagli artt. 15-22 GDPR e per maggiori
              informazioni sul trattamento dei dati personali, consulta la{" "}
              <Link href="/privacy-policy" className="text-brand-corallo hover:underline">
                Privacy Policy
              </Link>{" "}
              o scrivi a{" "}
              <a href={`mailto:${LEGAL.controllerEmail}`} className="text-brand-corallo hover:underline">
                {LEGAL.controllerEmail}
              </a>
              .
            </p>
          </Section>

          <Section title="9. Aggiornamenti">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il Titolare si riserva di modificare la presente Cookie Policy in qualsiasi momento, in particolare
              qualora vengano aggiunti nuovi strumenti di tracciamento o modificati i fornitori. La data di ultimo
              aggiornamento è indicata in alto.
            </p>
          </Section>

          <p className="text-sm text-brand-grigio-light mt-12 border-t border-brand-bordo pt-8">
            Per domande su cookie e privacy:{" "}
            <a href={`mailto:${LEGAL.controllerEmail}`} className="text-brand-corallo hover:underline">
              {LEGAL.controllerEmail}
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
