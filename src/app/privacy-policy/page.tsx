import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import HeroGooeySection from "@/components/HeroGooeySection";
import { LEGAL, LEGAL_PROCESSORS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per il sito Forge Group Italia.",
  alternates: { canonical: "/privacy-policy" },
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

export default function PrivacyPolicy() {
  return (
    <>
      <HeroGooeySection innerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Privacy Policy</p>
        <h1 className="heading-section font-semibold text-brand-nero leading-tight">
          Informativa sul trattamento dei dati personali
        </h1>
      </HeroGooeySection>

      <article className="py-12 md:py-16 section-bianco">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <p className="text-brand-grigio leading-relaxed mb-6">
            Ultimo aggiornamento: {LEGAL.lastUpdated}
          </p>
          <p className="text-brand-grigio leading-relaxed mb-6">
            La presente informativa descrive come {LEGAL.controllerName} (di seguito, il «Titolare» o «noi») tratta i
            dati personali degli utenti che visitano il sito{" "}
            <a href={LEGAL.siteUrl} className="text-brand-corallo hover:underline">
              {LEGAL.siteUrl}
            </a>{" "}
            e utilizzano i servizi ivi offerti, in conformità al Regolamento (UE) 2016/679 («GDPR») e al D.Lgs. 196/2003
            come modificato dal D.Lgs. 101/2018.
          </p>

          <Section title="1. Titolare del trattamento">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il Titolare del trattamento è <strong>{LEGAL.controllerName}</strong>, con sede operativa in{" "}
              {LEGAL.controllerLocation}. Per qualsiasi richiesta relativa alla privacy è possibile contattarci all&apos;indirizzo{" "}
              <a href={`mailto:${LEGAL.controllerEmail}`} className="text-brand-corallo hover:underline">
                {LEGAL.controllerEmail}
              </a>
              .
            </p>
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il Titolare non ha nominato un Responsabile della Protezione dei Dati (DPO), in quanto non ricorrono i
              casi di obbligo previsti dall&apos;art. 37 GDPR. Resta comunque possibile rivolgersi al Titolare per
              l&apos;esercizio dei diritti e per ogni questione relativa al trattamento dei dati personali.
            </p>
          </Section>

          <Section title="2. Tipologie di dati trattati">
            <p className="text-brand-grigio leading-relaxed mb-3">
              A seconda delle interazioni con il sito, possiamo trattare le seguenti categorie di dati:
            </p>
            <BulletList
              items={[
                "Dati di navigazione e log tecnici: indirizzo IP, data e ora della richiesta, URL visitati, user agent del browser, codici di risposta HTTP, raccolti automaticamente dai sistemi di hosting per sicurezza e funzionamento del sito.",
                "Dati forniti tramite il form di prequalifica / candidatura (/contatti): nome e cognome, email, telefono, nome dell'attività o azienda, descrizione dell'attività, ostacolo principale indicato, modalità attuale di acquisizione clienti.",
                "Dati forniti tramite iscrizione alla newsletter (footer del sito): indirizzo email.",
                "Dati contenuti nelle comunicazioni inviate volontariamente al Titolare (es. email a info@forgegroup.it).",
              ]}
            />
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il sito <strong>non</strong> tratta categorie particolari di dati (art. 9 GDPR) né dati relativi a
              condanne penali (art. 10 GDPR), salvo eventuale comunicazione spontanea da parte dell&apos;interessato nei
              campi liberi del form.
            </p>
          </Section>

          <Section title="3. Finalità, base giuridica e natura del conferimento">
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-brand-bordo rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-brand-panna text-left">
                    <th className="p-3 font-semibold text-brand-nero border-b border-brand-bordo">Finalità</th>
                    <th className="p-3 font-semibold text-brand-nero border-b border-brand-bordo">Base giuridica</th>
                    <th className="p-3 font-semibold text-brand-nero border-b border-brand-bordo">Conferimento</th>
                  </tr>
                </thead>
                <tbody className="text-brand-grigio">
                  <tr className="border-b border-brand-bordo/60">
                    <td className="p-3 align-top">
                      Gestione delle richieste inviate tramite il form di prequalifica, valutazione della candidatura,
                      contatto commerciale e invio di conferma di ricezione
                    </td>
                    <td className="p-3 align-top">
                      Art. 6, par. 1, lett. b) GDPR (misure precontrattuali su richiesta dell&apos;interessato) e, ove
                      applicabile, lett. f) (legittimo interesse a gestire le richieste commerciali)
                    </td>
                    <td className="p-3 align-top">Necessario per inviare la candidatura</td>
                  </tr>
                  <tr className="border-b border-brand-bordo/60">
                    <td className="p-3 align-top">
                      Invio di comunicazioni informative e commerciali relative a {LEGAL.controllerShortName} (newsletter)
                    </td>
                    <td className="p-3 align-top">Art. 6, par. 1, lett. a) GDPR (consenso)</td>
                    <td className="p-3 align-top">Facoltativo</td>
                  </tr>
                  <tr className="border-b border-brand-bordo/60">
                    <td className="p-3 align-top">
                      Sicurezza del sito, prevenzione abusi, rate limiting e gestione tecnica dell&apos;infrastruttura
                    </td>
                    <td className="p-3 align-top">
                      Art. 6, par. 1, lett. f) GDPR (legittimo interesse alla sicurezza dei sistemi)
                    </td>
                    <td className="p-3 align-top">Automatico / necessario per la navigazione</td>
                  </tr>
                  <tr>
                    <td className="p-3 align-top">
                      Adempimento di obblighi di legge, tutela in giudizio e gestione di eventuali reclami
                    </td>
                    <td className="p-3 align-top">Art. 6, par. 1, lett. c) e lett. f) GDPR</td>
                    <td className="p-3 align-top">Necessario ove imposto dalla legge</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il mancato conferimento dei dati contrassegnati come necessari per il form di prequalifica comporta
              l&apos;impossibilità di inviare la candidatura. Il rifiuto del consenso alla newsletter non pregiudica
              l&apos;utilizzo del resto del sito.
            </p>
          </Section>

          <Section title="4. Modalità del trattamento">
            <p className="text-brand-grigio leading-relaxed mb-6">
              I dati personali sono trattati con strumenti informatici e telematici, con logiche strettamente correlate
              alle finalità indicate e, in ogni caso, in modo da garantire la sicurezza e la riservatezza dei dati. Sono
              adottate misure tecniche e organizzative adeguate, incluse connessioni cifrate (HTTPS), limitazione degli
              accessi, controllo degli invii tramite rate limiting e minimizzazione dei dati raccolti.
            </p>
          </Section>

          <Section title="5. Destinatari e responsabili del trattamento">
            <p className="text-brand-grigio leading-relaxed mb-3">
              I dati possono essere trattati da personale autorizzato del Titolare e da soggetti terzi nominati
              Responsabili del trattamento ai sensi dell&apos;art. 28 GDPR, tra cui:
            </p>
            <ul className="space-y-4 mb-6">
              {LEGAL_PROCESSORS.map((p) => (
                <li key={p.name} className="rounded-xl border border-brand-bordo bg-brand-panna p-4">
                  <p className="font-semibold text-brand-nero">{p.name}</p>
                  <p className="text-brand-grigio text-sm mt-1">{p.role}</p>
                  <p className="text-brand-grigio text-sm mt-1">Ubicazione: {p.location}</p>
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
              I dati non sono diffusi. Non vendiamo né cediamo i dati personali a terzi per finalità di marketing
              indipendenti.
            </p>
          </Section>

          <Section title="6. Trasferimenti di dati verso paesi extra UE">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Alcuni fornitori (in particolare Vercel Inc. e Resend Inc.) possono trattare dati anche negli Stati Uniti
              d&apos;America. Tali trasferimenti avvengono nel rispetto del GDPR, sulla base di decisioni di adeguatezza
              ove applicabili e/o di Clausole Contrattuali Standard approvate dalla Commissione Europea, nonché delle
              garanzie supplementari offerte dai rispettivi fornitori. Maggiori informazioni sono disponibili nelle
              informative privacy dei Responsabili del trattamento indicati al precedente paragrafo.
            </p>
          </Section>

          <Section title="7. Periodo di conservazione">
            <BulletList
              items={[
                "Dati del form di prequalifica: fino a 24 mesi dall'ultimo contatto, salvo instaurazione di un rapporto commerciale; in tal caso, per la durata del rapporto e per i termini di legge applicabili (fino a 10 anni per documenti contabili/contrattuali ove pertinenti).",
                "Dati newsletter: fino a revoca del consenso o disiscrizione; in assenza di interazioni, cancellazione entro 24 mesi dall'ultima comunicazione inviata.",
                "Log tecnici e dati di sicurezza (incluso indirizzo IP per rate limiting in memoria): per il tempo strettamente necessario alla finalità di sicurezza, di norma non oltre 30 giorni per i log di hosting e pochi minuti per i contatori anti-abuso in memoria.",
                "Comunicazioni email con il Titolare: per il tempo necessario a gestire la richiesta e, se rilevanti, per i termini di prescrizione legale.",
              ]}
            />
          </Section>

          <Section title="8. Processi decisionali automatizzati">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Non utilizziamo processi decisionali automatizzati, compresa la profilazione (art. 22 GDPR), che producano
              effetti giuridici o incidano in modo analogo significativamente sull&apos;interessato.
            </p>
          </Section>

          <Section title="9. Diritti dell'interessato">
            <p className="text-brand-grigio leading-relaxed mb-3">
              In qualità di interessato, hai diritto di chiedere al Titolare, nei casi previsti dal GDPR:
            </p>
            <BulletList
              items={[
                "accesso ai tuoi dati personali (art. 15);",
                "rettifica dei dati inesatti o integrazione di quelli incompleti (art. 16);",
                "cancellazione dei dati, nei casi previsti (art. 17);",
                "limitazione del trattamento (art. 18);",
                "portabilità dei dati, per i trattamenti basati su consenso o contratto e effettuati con mezzi automatizzati (art. 20);",
                "opposizione al trattamento basato su legittimo interesse (art. 21);",
                "revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca (art. 7, par. 3).",
              ]}
            />
            <p className="text-brand-grigio leading-relaxed mb-6">
              Per esercitare i diritti scrivi a{" "}
              <a href={`mailto:${LEGAL.controllerEmail}`} className="text-brand-corallo hover:underline">
                {LEGAL.controllerEmail}
              </a>
              , indicando l&apos;oggetto «Richiesta privacy GDPR». Risponderemo entro un mese, prorogabile di due mesi
              nei casi di complessità previsti dalla normativa.
            </p>
            <p className="text-brand-grigio leading-relaxed mb-6">
              Hai inoltre diritto di proporre reclamo all&apos;Autorità di controllo competente:{" "}
              <strong>Garante per la protezione dei dati personali</strong> (
              <a
                href={LEGAL.garanteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-corallo hover:underline"
              >
                www.garanteprivacy.it
              </a>
              ). Informazioni sulle modalità di reclamo:{" "}
              <a
                href={LEGAL.garanteReclamiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-corallo hover:underline"
              >
                come presentare reclamo
              </a>
              .
            </p>
          </Section>

          <Section title="10. Minori">
            <p className="text-brand-grigio leading-relaxed mb-6">
              I servizi del sito non sono destinati a minori di 16 anni. Se ritieni che un minore ci abbia fornito dati
              personali, contattaci: provvederemo alla cancellazione nei tempi tecnicamente possibili.
            </p>
          </Section>

          <Section title="11. Cookie e tecnologie simili">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Per informazioni su cookie e strumenti di tracciamento utilizzati sul sito, consulta la nostra{" "}
              <Link href="/cookie-policy" className="text-brand-corallo hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="12. Modifiche alla presente informativa">
            <p className="text-brand-grigio leading-relaxed mb-6">
              Il Titolare può aggiornare la presente informativa per adeguarla a modifiche normative, tecniche o
              organizzative. La versione aggiornata sarà pubblicata su questa pagina con indicazione della data di
              ultimo aggiornamento. Ti invitiamo a consultarla periodicamente.
            </p>
          </Section>

          <p className="text-sm text-brand-grigio-light mt-12 border-t border-brand-bordo pt-8">
            Documento redatto in conformità al Regolamento (UE) 2016/679. Per integrazioni relative a dati societari
            (ragione sociale completa, codice fiscale/P.IVA, sede legale) contattare{" "}
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
