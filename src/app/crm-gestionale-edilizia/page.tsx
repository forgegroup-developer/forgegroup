import Link from "next/link";
import type { Metadata } from "next";
import CrmGestionale from "@/components/sezioni/CrmGestionale";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";
import RelatedBlogLinks from "@/components/blog/RelatedBlogLinks";
import { SITE_NAME } from "@/lib/seo/site";

/**
 * La pagina del CRM gestionale che diamo a chi lavora con noi.
 *
 * Nasce da una decisione presa in revisione: in home il CRM si nomina
 * e basta, perche' la home deve reggere su un telefono in dieci secondi.
 * Qui invece c'e' spazio per farlo vedere per intero, e questa e' la
 * pagina da mandare a chi in chiamata dice "non so come lavorate davvero".
 */

export const metadata: Metadata = {
  title: "CRM per imprese edili: dove finiscono le richieste",
  description:
    "Un gestionale tiene il cantiere. Questo tiene la trattativa: ogni richiesta della tua impresa edile con stato, data e persona che la segue. Lo apri dal telefono, in cantiere.",
  alternates: { canonical: "/crm-gestionale-edilizia" },
  openGraph: {
    title: "CRM per imprese edili | Forge Group",
    description:
      "I gestionali tengono il cantiere. Questo tiene la trattativa che deve diventare cantiere: stato, data e persona che la segue.",
    url: "/crm-gestionale-edilizia",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: SITE_NAME }],
  },
};

const fasi = [
  {
    n: "F",
    nome: "Formazione",
    testo:
      "Ti mostriamo come si legge il CRM e come si porta avanti una trattativa scritta lì dentro. Non serve essere pratici di computer: le fasi sono cinque e si imparano in un pomeriggio.",
  },
  {
    n: "O",
    nome: "Organizzazione",
    testo:
      "Qui il CRM nasce. Ogni richiesta che arriva, dalla pubblicità, dal passaparola o dal cartello in cantiere, entra con budget, tempi e chi decide.",
  },
  {
    n: "R",
    nome: "Reputazione",
    testo:
      "Le richieste che chiudono diventano lavori da mostrare. Dal CRM sai quali clienti hanno finito contenti e a chi si può chiedere una recensione.",
  },
  {
    n: "G",
    nome: "Gestione",
    testo:
      "È la parte che vedi ogni giorno: chi va richiamato oggi, chi aspetta un preventivo, chi è fermo da due settimane. Il CRM te lo dice senza che tu debba chiederlo a nessuno.",
  },
  {
    n: "E",
    nome: "Economia",
    testo:
      "A fine mese sai quante richieste sono arrivate, quante sono diventate contratti e quanto è stato speso in pubblicità. Separato dal nostro compenso.",
  },
];

export default function CrmGestionalePage() {
  return (
    <>
      <div className="section-sabbia border-b pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CRM gestionale" },
            ]}
          />
          <p className="eyebrow eyebrow-mark mb-5 mt-6 flex">
            Compreso nel Metodo FORGE
          </p>
          <h1 className="heading-display-frase mb-6 text-balance">
            Il CRM gestionale della tua impresa.{" "}
            <span className="text-brand-corallo">
              Lo apri tu, quando vuoi.
            </span>
          </h1>
          <p className="body-lg max-w-2xl">
            Quasi tutte le imprese con cui parliamo non hanno un posto solo
            dove stanno scritte le richieste. Stanno sul quaderno, su WhatsApp,
            nella testa di chi ha risposto al telefono. Poi arriva la settimana
            storta, tre cantieri aperti e un fornitore che sbaglia la consegna,
            e il preventivo da 60.000 euro resta in fondo a una chat. Il CRM
            gestionale è la prima cosa che mettiamo in piedi, prima ancora della
            pubblicità.
          </p>
        </div>
      </div>

      <CrmGestionale />

      {/* POSIZIONAMENTO CONTRO I GESTIONALI DI CANTIERE.
          Dalla ricerca del 24/09/2026: i gestionali del settore presidiano
          costi, ore e marginalita' di commessa, cioe' il dopo-firma. La
          trattativa prima della firma non la tiene nessuno. */}
      {/* Mattone: e' il blocco che dice dove sta questo strumento
          rispetto agli altri, quindi merita la spina dorsale scura come
          in home. Prima erano tre sezioni panna di fila e scorrendo
          sembravano la stessa cosa ripetuta. */}
      <section className="section-mattone border-y py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">
            Se hai già un gestionale
          </p>
          <h2 className="heading-section-xl mb-6 text-balance">
            Questo non te lo sostituisce.{" "}
            <span className="text-brand-pesca-light">
              Tiene la parte che quello non guarda.
            </span>
          </h2>
          <p className="body-lg mb-5 max-w-2xl">
            I gestionali per l’edilizia servono a tenere il cantiere: i costi,
            le ore, le bolle, i rapportini, quanto ti è rimasto su quella
            commessa. Guardano quello che succede dopo che il cliente ha
            firmato. Se ne hai uno e ti trovi bene, tienilo.
          </p>
          <p className="body-lg mb-5 max-w-2xl">
            Questo tiene quello che viene prima. La richiesta arrivata martedì.
            Il sopralluogo fissato per sabato. Il piano dei lavori mandato a
            marzo e mai più richiamato. È la parte dove i soldi si perdono senza
            che nessuno se ne accorga.
          </p>
          <p className="body-lg max-w-2xl font-semibold !text-white">
            Un cantiere che va male lo vedi nei numeri a fine lavori. Una
            trattativa persa non la vedi mai.
          </p>
        </div>
      </section>

      <section className="section-bianco border-y py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Dove sta, nel metodo</p>
          <h2 className="heading-section-xl mb-6 text-balance">
            Il CRM gestionale tiene insieme{" "}
            <span className="text-brand-corallo-text">le cinque fasi</span> del
            Metodo FORGE.
          </h2>
          <p className="body-lg mb-12 max-w-2xl">
            Non è un programma in più da comprare. È il posto dove passa tutto
            quello che facciamo insieme, ed è il motivo per cui in qualunque
            momento puoi controllarci senza dover chiedere un report.
          </p>

          <ol className="space-y-7">
            {fasi.map((f) => (
              <li key={f.nome} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-corallo font-display text-lg font-bold text-brand-corallo-text">
                  {f.n}
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-brand-nero">
                    {f.nome}
                  </p>
                  <p className="body-lg mt-1.5">{f.testo}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contatti"
              className="btn-corallo px-8 py-4 text-center text-sm sm:whitespace-nowrap md:text-base"
            >
              Richiedi lo studio di fattibilità
            </Link>
            <Link href="/servizi" className="arrow-link text-sm md:text-base">
              Vedi il Metodo FORGE per intero
            </Link>
          </div>
        </div>
      </section>

      {/* Le domande che nascono proprio qui: controllare il lavoro, e quanto costa lo strumento. */}
      <section id="domande" className="scroll-mt-24 section-mattone py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Domande frequenti</p>
          <h2 className="heading-section-xl mb-10 text-balance">
            Sul gestionale, <span className="text-brand-corallo-text">quello che ci chiedono</span>.
          </h2>
          <FAQAccordion onCoral items={faqsPagina("crm")} />
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("crm")} />

      {/* Questa pagina non rimandava a niente: era un vicolo cieco. */}
      <RelatedBlogLinks
        slugs={[
          "perche-clienti-spariscono-dopo-preventivo",
          "aumentare-clienti-smettere-passaparola",
          "come-aumentare-numero-clienti-attivita",
        ]}
      />
    </>
  );
}
