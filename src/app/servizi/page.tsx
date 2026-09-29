import Link from "next/link";
import HeroPagina from "@/components/sezioni/HeroPagina";
import type { Metadata } from "next";
import MetodoForge from "@/components/sezioni/MetodoForge";
import ClientiLogos from "@/components/sezioni/ClientiLogos";
import ServiziTabCard, { type ServiziTabPoint } from "@/components/sezioni/ServiziTabCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";
import { CONTENITORE, SEZIONE, STRETTO, Chiave, Evidenzia, Titolo } from "@/components/blocchi/ui";
import { altriProblemi, problemiConScena, type Problema } from "@/data/blocchi";

type ServiziTab = {
  id: string;
  scena: { src: string; alt: string };
  problemi: Problema[];
  pratica?: { titolo: string; voci: string[] };
  extra?: React.ReactNode;
  number: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  points: ServiziTabPoint[];
};

/* I problemi sono quelli della landing /inizia, con le stesse parole:
   chi arriva da lì ritrova le sue frasi, e un testo cambia in un posto solo. */
const tutti = [...problemiConScena, ...altriProblemi];
const problemi = (...temi: string[]) =>
  temi.map((t) => {
    const p = tutti.find((x) => x.tema === t);
    if (!p) throw new Error(`Problema non trovato: ${t}`);
    return p;
  });
const scena = (tema: string) => {
  const p = problemiConScena.find((x) => x.tema === tema)!;
  return { src: p.src, alt: p.alt };
};

/* Il conto della landing, disegnato: riquadri uniti dalla freccia. */
function ContoSopralluoghi() {
  const passi = [
    "Esci per otto sopralluoghi al mese",
    "Ne chiudi uno",
    "Sono sette giornate a vuoto al mese, più di ottanta l'anno",
  ];
  return (
    // Dentro la scheda chiara il testo diventa scuro da solo: qui il fondo e'
    // mattone, quindi il bianco e' forzato.
    <div className="rounded-2xl bg-brand-mattone p-6 md:p-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide !text-white/80">
        Facciamo due conti, con numeri tondi
      </p>
      {/* Da computer i riquadri stanno in fila con la freccia a destra,
          da telefono uno sotto l'altro con la freccia in basso. */}
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {passi.map((p, i) => (
          <li key={p} className="flex flex-col md:flex-1 md:flex-row md:items-center">
            <p className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-4 font-medium !text-white md:h-full">
              {p}
            </p>
            {i < passi.length - 1 && (
              <p className="py-1 text-center text-xl font-bold !text-white/80 md:px-3 md:py-0" aria-hidden>
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </p>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center font-display text-xl font-bold leading-snug !text-white md:text-2xl">
        Più di quattro mesi di lavoro regalati a chi non avrebbe mai firmato.
      </p>
    </div>
  );
}

const serviziTabs: ServiziTab[] = [
  {
    id: "acquisizione",
    number: "01",
    scena: scena("Sopralluoghi regalati"),
    problemi: problemi("Sopralluoghi regalati", "I mesi morti", "L'agenzia di prima"),
    extra: <ContoSopralluoghi />,
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
    pratica: {
      titolo: "Le regole del processo di vendita che scriviamo con te:",
      voci: [
        "Al primo incontro si capisce chi decide e chi paga, prima di progettare.",
        "La cifra si dice presto: se è sostenibile, si fissa il sopralluogo.",
        "Non è più un preventivo ma un piano dei lavori, presentato di persona e mai su WhatsApp.",
        "Ogni incontro finisce con una data, scritta nel gestionale prima di salutarsi.",
        "Come e quando si paga si decide prima di iniziare, per iscritto.",
      ],
    },
    scena: scena("La guerra dei prezzi"),
    problemi: problemi(
      "La guerra dei prezzi",
      "Il preventivo e poi il silenzio",
      "La paura di vendere",
      "I soldi che non entrano",
    ),
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
        body: "Ogni contatto entra nel gestionale con uno stato, una data e la persona che lo segue. Se una trattativa è ferma da due settimane lo vedi senza doverlo chiedere a nessuno.",
      },
      {
        title: (
          <>
            Ogni settimana le guardiamo <span>una per una</span>.
          </>
        ),
        body: "Quattro chiamate al mese, dedicate solo alle trattative aperte. Si apre il gestionale e si passa in rassegna: a che punto è, chi decide, cosa gli manca per firmare, quando lo risenti.",
      },
    ],
  },
  {
    id: "consulenza",
    number: "03",
    scena: scena("Il titolare dentro il cantiere"),
    problemi: problemi("Il titolare dentro il cantiere"),
    title: (
      <>
        Consulenza <span className="whitespace-nowrap">e metodo</span>
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

/* Le tre domande dello studio di fattibilità (Scheda dei fatti). */
const studio = [
  {
    titolo: "Quanto lavoro reggi davvero oggi.",
    testo:
      "Con gli uomini e i mezzi che hai adesso: se il mese prossimo arrivassero dieci sopralluoghi in più, li porteresti a casa o ne perderesti metà per strada?",
    chiave: "dieci sopralluoghi in più",
  },
  {
    titolo: "Come si alimenta la macchina senza sovraccaricarla.",
    testo:
      "Il lavoro in più serve a poco se poi salta una consegna e ti bruci il cliente che avevi già.",
    chiave: "ti bruci il cliente che avevi già",
  },
  {
    titolo: "Il tuo territorio e la tua storia.",
    testo:
      "Quanto c'è da prendere nella tua zona, chi c'è già, da quanto tempo lavori e dove può arrivare la tua impresa.",
    chiave: "Quanto c'è da prendere nella tua zona",
  },
];

export const metadata: Metadata = {
  title: "Servizi per imprese edili | Il Metodo FORGE",
  description:
    "Come lavoriamo con un'impresa edile: la pubblicità la gestiamo noi, le richieste arrivano filtrate, e ogni settimana guardiamo insieme le trattative.",
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
            richiesta ti arrivi. Poi una consulenza al mese, di persona o in videochiamata, e{" "}
            <strong className="chiave">
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
        foto="sfondo"
        immagine={{
          src: "/images/hero/scrivania-progetto.webp",
          alt: "Disegni, squadra e livella sul tavolo di un'impresa edile",
        }}
      />

      {/* TRE MACROAREE · mattone. Ognuna parte dal suo problema. */}
      <section id="servizi-contenuto" className={`scroll-mt-24 section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="Come lavoriamo"
            sottotitolo="Ognuna parte dai problemi che ci raccontano i titolari al primo appuntamento, con le loro parole, e accanto c'è cosa facciamo per risolverli."
          >
            Tre macroaree, dal <Chiave>primo contatto</Chiave> alla firma.
          </Titolo>

          <div className="space-y-6 md:space-y-8">
            {serviziTabs.map((tab) => (
              <ServiziTabCard key={tab.id} {...tab} />
            ))}
          </div>
        </div>
      </section>

      <ClientiLogos />

      <MetodoForge className="section-mattone" />

      {/* STUDIO DI FATTIBILITA': sostituisce il blocco garanzia.
          La domanda "e se non funziona?" si chiude prima di cominciare,
          con la selezione, non dopo con un rimborso. Decisione della
          proprieta' del 24/09/2026. */}
      <section className={`section-bianco ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="Prima di cominciare"
            sottotitolo="Il primo passo è uno studio di fattibilità, e serve a rispondere a quella domanda. A volte la risposta è no, e te la diamo prima che tu abbia speso un euro in pubblicità."
          >
            La prima domanda non è quanto costa, ma se ha senso <Chiave>lavorare insieme</Chiave>.
          </Titolo>

          <ol className={`${STRETTO} mb-10 grid gap-5 md:grid-cols-3`}>
            {studio.map((voce, i) => (
              <li key={voce.titolo} className="rounded-2xl border border-brand-bordo bg-brand-bianco p-6">
                <p className="eyebrow mb-2">Domanda #{i + 1}</p>
                <h3 className="mb-2 font-display text-xl font-bold leading-snug text-brand-nero">
                  {voce.titolo}
                </h3>
                <p className="leading-relaxed text-brand-grigio">
                  <Evidenzia testo={voce.testo} chiave={voce.chiave} />
                </p>
              </li>
            ))}
          </ol>

          <p className={`${STRETTO} body-lg mb-10 text-pretty text-center`}>
            Non lavoriamo con chiunque. Prendiamo poche imprese,{" "}
            <strong className="chiave">un territorio alla volta</strong>, e solo quelle che
            hanno una storia alle spalle e margine per crescere. Se la tua azienda non regge il
            lavoro che le arriva, il problema diventa di tutti e due.
          </p>

          <div className="flex justify-center">
            <Link href="/contatti" className="btn-ghost text-center">
              Richiedi lo studio di fattibilità ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Le domande di questa pagina: quelle su come si lavora. Le altre
          stanno dove il dubbio nasce (prezzo e prova nei casi studio,
          controllo nel CRM, ingresso nei contatti). */}
      <section id="domande" className={`scroll-mt-24 section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Come si lavora, <Chiave>nel concreto</Chiave>.
          </Titolo>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqsPagina("servizi")} />
          </div>
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("servizi")} />

      {/* I link agli articoli tornano quando ci sono quelli nuovi sulle
          imprese edili: i vecchi (B2B, Campania) si ritirano. */}
    </>
  );
}
