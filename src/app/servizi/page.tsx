import Link from "next/link";
import HeroPagina from "@/components/sezioni/HeroPagina";
import StrisciaProve from "@/components/sezioni/StrisciaProve";
import type { Metadata } from "next";
import ForgeGradientBackground from "@/components/sfondi/ForgeGradientBackground";
import MetodoForge from "@/components/sezioni/MetodoForge";
import ClientiLogos from "@/components/sezioni/ClientiLogos";
import ServiziTabCard, { type ServiziTabPoint } from "@/components/sezioni/ServiziTabCard";
import RelatedBlogLinks from "@/components/blog/RelatedBlogLinks";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import { serviziSidebarImages } from "@/data/images";

type ServiziTab = {
  id: string;
  number: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  points: ServiziTabPoint[];
  sidebarImage: string;
  sidebarImageAlt: string;
};

const serviziTabs: ServiziTab[] = [
  {
    id: "acquisizione",
    number: "01",
    sidebarImage: serviziSidebarImages.acquisizione,
    sidebarImageAlt: "Illustrazione acquisizione clienti",
    title: "Acquisizione Clienti",
    intro: (
      <>
        Il lavoro nella tua zona <span>c&apos;è</span>.
        <br />
        Il problema è chi ti arriva in mezzo.
      </>
    ),
    points: [
      {
        title: (
          <>
            La pubblicità <span>la giriamo noi</span>.
          </>
        ),
        body: "Non ti diamo il manuale per farla. Apriamo il conto, scriviamo gli annunci, li mettiamo online e li correggiamo noi, ogni giorno.",
      },
      {
        title: (
          <>
            Il filtro lo mettiamo <span>prima che la richiesta ti arrivi</span>.
          </>
        ),
        body: "Passa da un modulo che chiede tipo di lavoro, entro quando vuole iniziare, che budget ha in mente e in che zona. Quelle risposte ce l’hai sul telefono prima di alzare la cornetta.",
      },
      {
        title: (
          <>
            Il viaggio lo fai <span>solo quando vale la pena farlo</span>.
          </>
        ),
        body: "Ogni sopralluogo fatto a chi non poteva pagarti non ti costa mezza giornata. Ti costa quella mezza giornata tolta a chi poteva firmare.",
      },
    ],
  },
  {
    id: "vendite",
    number: "02",
    sidebarImage: serviziSidebarImages.vendite,
    sidebarImageAlt: "Illustrazione processi di vendita",
    title: "Processi di Vendita",
    intro: (
      <>
        Il preventivo l&apos;hai mandato.
        <br />
        Da lì in poi <span>cosa succede</span>?
      </>
    ),
    points: [
      {
        title: (
          <>
            Chi risponde al telefono lo fa <span>con le stesse parole</span>, sempre quelle.
          </>
        ),
        body: "Gliele diamo scritte: cosa chiedere, in che ordine, cosa rispondere quando il cliente dice che ci deve pensare. Che sia tuo figlio, il geometra o tu stesso alle otto di sera.",
      },
      {
        title: (
          <>
            Nessuna richiesta resta ferma <span>perché ci si è dimenticati</span>.
          </>
        ),
        body: "Ogni contatto entra nel CRM con uno stato, una data e la persona che lo segue. Se una trattativa è ferma da due settimane lo vedi senza doverlo chiedere a nessuno.",
      },
      {
        title: (
          <>
            Ogni settimana le guardiamo <span>una per una</span>.
          </>
        ),
        body: "Quattro chiamate al mese, dedicate solo alle trattative aperte. Si apre il CRM e si passa in rassegna: a che punto è, chi decide, cosa gli manca per firmare, quando lo risenti.",
      },
    ],
  },
  {
    id: "consulenza",
    number: "03",
    sidebarImage: serviziSidebarImages.consulenza,
    sidebarImageAlt: "Illustrazione consulenza e formazione",
    title: (
      <>
        Consulenza <span className="whitespace-nowrap">e Formazione</span>
      </>
    ),
    intro: (
      <>
        Il lavoro lo facciamo noi.
        <br />
        Ma l&apos;azienda <span>resta tua</span>.
      </>
    ),
    points: [
      {
        title: (
          <>
            Una consulenza al mese, <span>su marketing e vendita</span>.
          </>
        ),
        body: "Di persona se sei in una zona dove abbiamo consulenti, altrimenti in videochiamata. Si guarda cosa è cambiato, cosa non ha funzionato e cosa si fa il mese dopo.",
      },
      {
        title: (
          <>
            Le cose restano <span>scritte</span>, non nella testa di qualcuno.
          </>
        ),
        body: "Il percorso che una richiesta fa da quando entra a quando firma resta in azienda tua. Vale anche per chi assumerai l’anno prossimo.",
      },
      {
        title: (
          <>
            L&apos;azienda cammina <span>anche quando tu non ci sei</span>.
          </>
        ),
        body: "Se ti fermi una settimana per un’influenza o per un cantiere fuori regione, le richieste continuano a essere lavorate lo stesso.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Servizi per imprese edili | Il Metodo FORGE",
  description:
    "Come lavoriamo con un'impresa edile: la pubblicità la giriamo noi, le richieste sono filtrate prima di arrivarti, e ogni settimana guardiamo le trattative aperte una per una.",
  alternates: { canonical: "/servizi" },
  openGraph: {
    title: "Servizi per imprese edili | Il Metodo FORGE",
    description:
      "Pubblicità gestita da noi, richieste filtrate prima di arrivarti, e quattro chiamate al mese dedicate solo alle trattative aperte.",
    url: "/servizi",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Servizi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servizi per imprese edili | Forge Group",
    description:
      "Pubblicità gestita da noi, richieste filtrate prima, trattative guardate ogni settimana.",
    images: ["/logo.png"],
  },
};

export default function ServiziHub() {
  return (
    <>
      <HeroPagina
        occhiello="Il Metodo FORGE"
        titolo={
          <>
            Le richieste le filtriamo prima. Le trattative le guardiamo{" "}
            <span className="text-brand-corallo no-spezza">ogni settimana</span>
            , una per una.
          </>
        }
        testo={
          <>
            La pubblicità la giriamo noi. Il filtro lo mettiamo prima che la
            richiesta ti arrivi. Poi una consulenza al mese in azienda, e{" "}
            <strong className="font-semibold text-brand-nero">
              quattro chiamate al mese
            </strong>{" "}
            dedicate solo alle trattative aperte.
          </>
        }
        nota={
          <>
            Le chiamate ai contatti restano tue: noi diamo le parole e il
            metodo a chi risponde al telefono in azienda.
          </>
        }
        primario={{
          href: "/contatti",
          testo: "Richiedi lo studio di fattibilità",
          freccia: "↗",
        }}
        secondario={{
          href: "#servizi-contenuto",
          testo: "Guarda le tre macroaree",
          freccia: "↓",
        }}
        /* Pagina pulita, senza fotografia: le uniche disponibili sono
           di repertorio e sotto un titolo rubano l'occhio senza dire
           niente. Stessa scelta dei casi studio, cosi' le pagine
           interne si assomigliano fra loro. */
        foto="nessuna"
      />

      <StrisciaProve />

      {/* TRE SERVIZI — layout originale, copy LP */}
      <ForgeGradientBackground
        as="section"
        id="servizi-contenuto"
        className="scroll-mt-24 py-12 md:py-16 section-coral section-coral-gradient"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="Come lavoriamo"
            title={
              <>
                Le <span>3 macroaree</span>
              </>
            }
            maxWidth="4xl"
          />

          <div className="space-y-6 md:space-y-8">
            {serviziTabs.map((tab) => (
              <ServiziTabCard key={tab.id} {...tab} />
            ))}
          </div>
        </div>
      </ForgeGradientBackground>

      {/* IL SOPRALLUOGO A PAGAMENTO.
          Dalla ricerca del 24/09/2026: il mercato e' pieno di
          "sopralluogo gratis", "due settimane gratis", "preventivo
          gratis". Nessuno degli otto operatori analizzati insegna
          all'impresa a farselo pagare. E' l'unica posizione davvero
          contraria che Forge ha, e stava sepolta dentro una FAQ.

          Si scrive come direzione di lavoro, mai come risultato
          garantito, e la cifra non si scrive mai: decisioni della
          proprieta' del 20 e del 24 settembre 2026. */}
      <section className="section-sabbia border-y py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Dove vogliamo arrivare</p>
          <h2 className="heading-section-xl mb-6 text-balance">
            Il sopralluogo, un giorno,{" "}
            <span className="text-brand-corallo-text">te lo fai pagare</span>.
          </h2>

          <p className="body-lg mb-5 max-w-2xl">
            Nel tuo settore lo regalano tutti. Tu monti in macchina, fai
            quaranta minuti di strada, prendi le misure, torni a casa e la
            sera rimetti tutto in un preventivo. Se poi quello sparisce, quel
            sabato lo hai pagato tu.
          </p>

          <p className="body-lg mb-5 max-w-2xl">
            Tetti Top, che fa coperture, oggi il sopralluogo lo fa pagare. E i
            piani dei lavori arrivano fino a{" "}
            <strong className="font-semibold text-brand-nero">175.000 euro</strong>
            . Non perché abbia alzato il prezzo: perché chi accetta di pagare
            per vederti arrivare ha già deciso che il lavoro lo vuole fare.
          </p>

          <p className="body-lg mb-8 max-w-2xl">
            Portarci un&apos;impresa è uno degli obiettivi che ci mettiamo. Non
            ci riusciamo con tutti e non dipende solo da noi: prima devi avere
            lavori da mostrare, un modo di presentarti che regga, e qualcuno
            che sappia dirlo al telefono. È esattamente quello che costruiamo
            nei mesi prima.
          </p>

          <Link href="/casi-studio/edilizia" className="arrow-link text-sm md:text-base">
            Come ci è arrivata Tetti Top
          </Link>
        </div>
      </section>

      <ClientiLogos />

      <MetodoForge />

      {/* STUDIO DI FATTIBILITA': sostituisce il blocco garanzia.
          La domanda "e se non funziona?" si chiude prima di cominciare,
          con la selezione, non dopo con un rimborso. Decisione della
          proprieta' del 24/09/2026. */}
      <section className="section-bianco border-y py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-4 flex">Prima di cominciare</p>
          <h2 className="heading-section-xl mb-6 text-balance">
            La prima domanda non è quanto costa.{" "}
            <span className="text-brand-corallo-text">
              È se ha senso lavorare insieme.
            </span>
          </h2>
          <p className="body-lg mb-6 max-w-2xl">
            Il primo passo è uno studio di fattibilità, e serve a rispondere a
            quella domanda lì. A volte la risposta è no, e te la diamo prima che
            tu abbia speso un euro in pubblicità.
          </p>

          <ol className="mb-8 space-y-5 max-w-2xl">
            <li className="body-lg">
              <span className="font-semibold text-brand-nero">
                Quanto lavoro reggi davvero oggi.
              </span>{" "}
              Con gli uomini e i mezzi che hai adesso. Se il mese prossimo ti
              arrivassero dieci sopralluoghi in più, li porteresti a casa o ne
              perderesti metà per strada? È la domanda che nessuno ti fa prima
              di venderti la pubblicità.
            </li>
            <li className="body-lg">
              <span className="font-semibold text-brand-nero">
                Come si alimenta la macchina senza mandarla in sovraccarico.
              </span>{" "}
              Il lavoro in più serve a poco se poi ti salta la consegna e ti
              bruci il cliente che avevi già.
            </li>
            <li className="body-lg">
              <span className="font-semibold text-brand-nero">
                Il tuo territorio, e la tua storia.
              </span>{" "}
              Quanto c’è da prendere nella tua zona, chi c’è già, da quanto
              tempo lavori e dove può arrivare la tua impresa.
            </li>
          </ol>

          <p className="body-lg mb-8 max-w-2xl">
            Non lavoriamo con chiunque. Prendiamo poche imprese, un territorio
            alla volta, e solo quelle che hanno una storia alle spalle e margine
            per crescere. Non è per fare i difficili: è che se la tua azienda
            non regge il lavoro che le arriva, il problema diventa di tutti e
            due.
          </p>

          <Link
            href="/contatti"
            className="btn-corallo inline-block px-8 py-4 text-sm md:text-base"
          >
            Richiedi lo studio di fattibilità
          </Link>
        </div>
      </section>

      {/* Le domande di questa pagina: quelle su come si lavora. Le altre
          stanno dove il dubbio nasce (prezzo e prova nei casi studio,
          controllo nel CRM, ingresso nei contatti). */}
      <section id="domande" className="scroll-mt-24 section-mattone py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="Domande frequenti"
            title={
              <>
                Come si lavora,{" "}
                <span className="text-brand-corallo-text">nel concreto</span>.
              </>
            }
          />
          <FAQAccordion onCoral items={faqsPagina("servizi")} />
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("servizi")} />

      <RelatedBlogLinks
        slugs={[
          "sistema-vendita-b2b-dalla-lead-al-contratto",
          "come-farsi-pagare-di-piu-prodotti-servizi",
          "quanto-costa-lead-generation-b2b",
        ]}
      />
    </>
  );
}
