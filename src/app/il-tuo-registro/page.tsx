import Link from "next/link";
import type { Metadata } from "next";
import RegistroContatti from "@/components/sezioni/RegistroContatti";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { SITE_NAME } from "@/lib/seo/site";

/**
 * La pagina del registro dei contatti — il CRM che diamo a chi lavora con
 * noi.
 *
 * Nasce da una decisione presa in revisione: in home il registro si nomina
 * e basta, perche' la home deve reggere su un telefono in dieci secondi.
 * Qui invece c'e' spazio per farlo vedere per intero, e questa e' la
 * pagina da mandare a chi in chiamata dice "non so come lavorate davvero".
 */

export const metadata: Metadata = {
  title: "Il registro dei tuoi contatti",
  description:
    "Il registro dove finiscono tutte le richieste della tua impresa: stato, data e persona che la segue. Lo apri dal telefono quando vuoi. È compreso nel Metodo FORGE.",
  alternates: { canonical: "/il-tuo-registro" },
  openGraph: {
    title: "Il registro dei tuoi contatti | Forge Group",
    description:
      "Ogni richiesta con uno stato, una data e una persona che la segue. Lo apri quando vuoi e vedi a che punto sta la trattativa.",
    url: "/il-tuo-registro",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: SITE_NAME }],
  },
};

const fasi = [
  {
    n: "F",
    nome: "Formazione",
    testo:
      "Ti mostriamo come si legge il registro e come si porta avanti una trattativa scritta lì dentro. Non serve essere pratici di computer: le fasi sono cinque e si imparano in un pomeriggio.",
  },
  {
    n: "O",
    nome: "Organizzazione",
    testo:
      "Qui il registro nasce. Ogni richiesta che arriva — dalla pubblicità, dal passaparola, dal cartello in cantiere — entra con budget, tempi e chi decide.",
  },
  {
    n: "R",
    nome: "Reputazione",
    testo:
      "Le richieste che chiudono diventano lavori da mostrare. Dal registro sai quali clienti hanno finito contenti e a chi si può chiedere una recensione.",
  },
  {
    n: "G",
    nome: "Gestione",
    testo:
      "È la parte che vedi ogni giorno: chi va richiamato oggi, chi aspetta un preventivo, chi è fermo da due settimane. Il registro te lo dice senza che tu debba chiederlo a nessuno.",
  },
  {
    n: "E",
    nome: "Economia",
    testo:
      "A fine mese sai quante richieste sono arrivate, quante sono diventate contratti e quanto è stato speso in pubblicità. Separato dal nostro compenso.",
  },
];

export default function IlTuoRegistroPage() {
  return (
    <>
      <div className="section-sabbia border-b pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Il tuo registro" },
            ]}
          />
          <p className="eyebrow eyebrow-mark mb-5 mt-6 flex">
            Compreso nel Metodo FORGE
          </p>
          <h1 className="heading-display-frase mb-6 text-balance">
            Il registro dei tuoi contatti.{" "}
            <span className="text-brand-corallo">
              Lo apri tu, quando vuoi.
            </span>
          </h1>
          <p className="body-lg max-w-2xl">
            Quasi tutte le imprese con cui parliamo non hanno un posto solo
            dove stanno scritte le richieste. Stanno sul quaderno, su WhatsApp,
            nella testa di chi ha risposto al telefono. Il registro è la prima
            cosa che mettiamo in piedi, prima ancora della pubblicità.
          </p>
        </div>
      </div>

      <RegistroContatti />

      <section className="section-bianco border-y py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Dove sta, nel metodo</p>
          <h2 className="heading-section-xl mb-6 text-balance">
            Il registro tiene insieme{" "}
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
    </>
  );
}
