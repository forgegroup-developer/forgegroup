import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import ContattiFormLoader from "@/app/contatti/ContattiFormLoader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import VideoScettico from "@/components/sezioni/VideoScettico";
import {
  getCaseStudyImage,
  getCaseStudyImagePosition,
  iniziaImages,
  teamImages,
} from "@/data/images";
import type { Faq } from "@/data/site";

/**
 * La pagina che Gianpio manda su WhatsApp dopo la prima telefonata.
 *
 * Non è la home: arriva in un momento preciso (dieci minuti dopo la chiamata,
 * dal telefono, a un titolare diffidente) e deve rispondere in un minuto a
 * "chi sono, cosa hanno fatto, cosa succede adesso". Fuori da Google, perché
 * non serve a chi cerca: serve a chi abbiamo appena sentito.
 *
 * È una landing: il menu in alto non c'è (lo toglie Navbar su questo
 * percorso) e nella pagina non ci sono link che portano altrove. Il footer è
 * quello di tutto il sito, senza la fascia finale, come in home. Si chiude
 * col modulo, senza il suo banner, e GA4 conta a parte queste candidature
 * (sorgente "inizia"). Colori e titoli seguono la home.
 *
 * I problemi vengono dalla Testa aziendale (§3, gli otto problemi) e dalle
 * frasi dette davvero nelle call. Numeri solo dalla Scheda dei fatti.
 */

export const metadata: Metadata = {
  title: "Inizia da qui",
  description:
    "Chi siamo, cosa abbiamo fatto per tre imprese edili e come funziona dopo la prima telefonata.",
  alternates: { canonical: "/inizia" },
  robots: { index: false, follow: true },
};

/**
 * Il titolo di sezione, nello stile di "Per chi sì, per chi no": occhiello
 * con la riga sotto e titolo pieno e compatto. Scelto dalla proprietà per
 * tutti i titoli di questa pagina.
 */
function Titolo({
  occhiello,
  children,
  sottotitolo,
}: {
  occhiello: string;
  children: ReactNode;
  sottotitolo?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
      <p className="mb-6 flex justify-center">
        <span className="eyebrow-rule">{occhiello}</span>
      </p>
      <h2 className="heading-section-xl text-balance">{children}</h2>
      {sottotitolo && (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-brand-grigio">
          {sottotitolo}
        </p>
      )}
    </div>
  );
}

/** La parola chiave, nello stesso corallo che usa il resto del sito. */
function Chiave({ children }: { children: ReactNode }) {
  return <span className="text-brand-corallo-text">{children}</span>;
}

/**
 * Le scene dei problemi sono generate con AI, con persone non reali: la
 * scritta sull'immagine non si toglie (AI Act).
 */
function ScenaAI({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-brand-panna">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
        Immagine generata con AI
      </figcaption>
    </figure>
  );
}

type Problema = { tema: string; frase: string; testo: ReactNode };

/** I tre problemi con la scena accanto. */
const problemiConScena: (Problema & { src: string; alt: string })[] = [
  {
    tema: "Sopralluoghi regalati",
    frase: "Mi metto a disposizione, gli faccio anche il progetto, e poi sceglie un altro.",
    testo: (
      <>
        Esci per chiunque chiami, perché non sai chi ha un budget e chi vuole solo un prezzo da
        confrontare. <strong>Le giornate a vuoto non te le paga nessuno.</strong>
      </>
    ),
    src: iniziaImages.sopralluogoAVuoto,
    alt: "Durante un sopralluogo il tecnico prende le misure mentre la cliente guarda il telefono",
  },
  {
    tema: "La guerra dei prezzi",
    frase: "Per 500 euro in meno ha scelto l'altra azienda.",
    testo: (
      <>
        Lavori meglio, ma dal preventivo non si vede.{" "}
        <strong>Se l&apos;unica differenza che il cliente vede è il totale, vince chi costa meno</strong>
        , e i soldi li regali ai concorrenti della tua zona.
      </>
    ),
    src: iniziaImages.prezzoPiuBasso,
    alt: "Un titolare guarda due preventivi affiancati sul tavolo: il cliente indica quello più basso",
  },
  {
    tema: "Il titolare dentro il cantiere",
    frase: "Dalle 8 alle 20 sto in cantiere, e il resto lo faccio io.",
    testo: (
      <>
        Fai tutto tu e non sai dire di no. Crescere vorrebbe dire assumere, e fa paura.{" "}
        <strong>Così l&apos;impresa resta piccola</strong>, o si ridimensiona.
      </>
    ),
    src: iniziaImages.cantiereAlle20,
    alt: "Un imprenditore edile seduto sul cassone del furgone al tramonto, al telefono davanti al cantiere",
  },
];

/**
 * Gli altri cinque, come domande ("hai fatto X, ma Y?"): e' la forma che
 * nelle pagine studiate regge meglio un elenco, e non suona come un'accusa.
 */
const altriProblemi: Problema[] = [
  {
    tema: "I mesi morti",
    frase: "Nei mesi buoni non ce la fai, e in quelli morti aspetti che squilli il telefono?",
    testo: (
      <>
        Le spese e gli stipendi corrono lo stesso, e i fornitori li paghi quando pagano i clienti.{" "}
        <strong>Non è la stagionalità: manca un sistema.</strong>
      </>
    ),
  },
  {
    tema: "Il preventivo e poi il silenzio",
    frase: "Hai mandato il preventivo, ma dopo il «ci devo pensare» nessuno si è più fatto sentire?",
    testo: (
      <>
        Ti chiedi cosa hai sbagliato, e non richiami per non sembrare insistente.{" "}
        <strong>Intanto firma con chi l&apos;ha messo in condizione di decidere.</strong>
      </>
    ),
  },
  {
    tema: "L'agenzia di prima",
    frase: "Hai pagato un'agenzia, ma i contatti che arrivavano non erano nemmeno lavorabili?",
    testo: (
      <>
        Il canone lo pagavi comunque, e non avevi modo di vedere dove finivano i soldi.{" "}
        <strong>Il problema non erano pochi contatti: erano contatti sprecati.</strong>
      </>
    ),
  },
  {
    tema: "La paura di vendere",
    frase: "Sai che dovresti richiamare, ma non vuoi sembrare insistente?",
    testo: (
      <>
        Richiamare ti sembra insistere, e quando parli di soldi ti senti sotto il cliente.{" "}
        <strong>Così le trattative restano appese, e decide sempre lui.</strong>
      </>
    ),
  },
  {
    tema: "I soldi che non entrano",
    frase: "Il lavoro l'hai finito, ma i soldi non arrivano?",
    testo: (
      <>
        Sembra colpa dei clienti o della crisi. Ma se acconti e pagamenti non li hai fissati per
        iscritto prima di iniziare, a fine lavoro arrivano contestazioni e ritardi.{" "}
        <strong>E chi prende i clienti per bisogno non se li sceglie.</strong>
      </>
    ),
  },
];

const casi = [
  {
    slug: "software-b2b",
    chi: "DISA",
    settore: "Software per l'edilizia",
    numero: "350.000 €",
    numeroDetto: "in 12 mesi, solo dalle Meta Ads",
    prima:
      "I commerciali chiamavano a freddo imprenditori edili senza sapere chi fosse interessato, e chiedevano nomi ai clienti.",
    dopo: "Circa 350.000 € in un anno con circa 300 € al mese di pubblicità. Nei primi 90 giorni 126.500 € di nuovi contratti, a 1,48 € per contatto.",
  },
  {
    slug: "edilizia",
    chi: "Tetti Top",
    settore: "Coperture e lattoneria",
    numero: "4 al mese",
    numeroDetto: "clienti qualificati, senza pubblicità",
    prima: "Viveva di passaparola, con mesi pieni e mesi vuoti, e faceva preventivi a chiunque chiedesse.",
    dopo: "Preventivi fino a 175.000 €, e il sopralluogo è diventato a pagamento.",
  },
  {
    slug: "arredo-commerciale",
    chi: "ROVI",
    settore: "Azienda che lavora in edilizia",
    numero: "25.000 €",
    numeroDetto: "chiusi in quattro mesi, e oltre 200.000 € di trattative aperte",
    prima:
      "Tutto dal passaparola, sopralluoghi e progetti per chiunque chiedesse, trattative che saltavano sul prezzo.",
    dopo: "Oggi conosce il budget del cliente prima dell'appuntamento.",
  },
];

const squadra = [
  {
    chi: "Consulenti esperti del settore",
    cosa: "per il marketing e per la vendita: costruiscono con te il percorso che porta ogni richiesta fino alla firma.",
  },
  {
    chi: "Videomaker professionisti",
    cosa: "che girano i video nei tuoi cantieri: fanno vedere il tuo lavoro vero a chi sta cercando un'impresa.",
  },
  {
    chi: "Esperti di Meta Ads e Google Ads",
    cosa: "che gestiscono la pubblicità e la regolano sui numeri veri, non sulle impressioni.",
  },
];

/** Cosa c'è nello studio di fattibilità (Testa aziendale §6, Scheda dei fatti). */
const studio = [
  {
    cosa: "Quanto lavoro c'è nella tua zona,",
    dettaglio: "contato da fonti ufficiali come ISTAT, GSE ed ENEA.",
  },
  {
    cosa: "Chi intercettare,",
    dettaglio: "e su quali linee di prodotto conviene puntare.",
  },
  {
    cosa: "Quanto lavoro regge oggi la tua impresa,",
    dettaglio: "con le persone e i mezzi che ha, per non mandarla in sovraccarico.",
  },
  {
    cosa: "Il tuo modo di vendere di oggi,",
    dettaglio: "con i suoi numeri: preventivi, sopralluoghi, contratti.",
  },
  {
    cosa: "Una risposta: ha senso lavorare insieme?",
    dettaglio: "Può essere no, e te la diamo prima che tu spenda un euro in pubblicità.",
  },
];

const passi = [
  {
    titolo: "Un appuntamento per conoscerci",
    testo: "Di persona se sei vicino ai nostri consulenti, altrimenti in videochiamata.",
  },
  {
    titolo: "Lo studio di fattibilità",
    testo:
      "Contiamo quanti lavori produce ogni anno la tua zona, da fonti ufficiali, e guardiamo quanto lavoro regge oggi la tua impresa. La risposta può essere no, e te la diamo prima che tu spenda un euro in pubblicità.",
  },
  {
    titolo: "Se si parte",
    testo:
      "Due incontri per conoscere l'azienda e il modo in cui vendete oggi. Poi i video girati in cantiere e le campagne.",
  },
  {
    titolo: "Ogni settimana",
    testo:
      "Una chiamata solo sulle trattative, e ogni mese una consulenza con te e la tua squadra. Le richieste le richiama la tua impresa, con il metodo e le parole che costruiamo insieme.",
  },
  {
    titolo: "I numeri",
    testo:
      "Dopo 60 giorni rivediamo insieme le stime sui dati veri. Dopo 90 giorni hai il primo report: contatti, appuntamenti, contratti, e quanto ha reso ogni euro.",
  },
];

const domande: Pick<Faq, "q" | "a">[] = [
  {
    q: "Quanto costa lavorare con Forge?",
    a: "Lo definiamo dopo lo studio di fattibilità, perché dipende da cosa serve alla tua impresa. Una parte del nostro compenso è legata al fatturato che generiamo insieme: se non vendi tu, guadagniamo meno anche noi.",
  },
  {
    q: "E se poi non funziona?",
    a: "Prima di iniziare, lo studio di fattibilità ci dice se ci sono i presupposti, e può dire di no. Se si parte, ogni settimana guardiamo le trattative, e dopo 60 giorni rivediamo le stime sui dati veri. Se i numeri non si muovono, cambiamo strategia, campagne o budget.",
  },
  {
    q: "Ho già provato con un'agenzia. Cosa cambia?",
    a: "Se mangi male in un ristorante non smetti di andare al ristorante: guardi chi è specializzato e chi ha casi veri. Noi lavoriamo solo con imprese edili, e con il CRM vedi tu, contratto per contratto, quanto ti rende ogni euro.",
  },
  {
    q: "Chi richiama le richieste che arrivano?",
    a: "La tua impresa: tu, chi risponde al telefono o un commerciale. Il filtro lo mettiamo noi, con un modulo che chiede tipo di lavoro, tempi, budget e zona. Il metodo e le parole per richiamare li costruiamo insieme.",
  },
  {
    q: "E se non riesco a reggere il lavoro in più?",
    a: "È una delle cose che guarda lo studio di fattibilità: quanto lavoro regge oggi la tua impresa, con le persone e i mezzi che ha. Le campagne si regolano su quello.",
  },
  {
    q: "Quanto dura?",
    a: "Il contratto è annuale. Dopo 60 giorni rivediamo le stime, dopo 90 hai il primo report, e ogni settimana guardiamo insieme le trattative.",
  },
];

export default function IniziaPage() {
  return (
    <>
      {/* 1 · Apertura. Da computer la scena fa da sfondo: il testo sta sul
          cielo a sinistra, la stretta di mano a destra, e un velo panna
          regge la lettura. Da telefono la scena scende sotto il testo, che
          sopra la foto non si leggerebbe. */}
      <HeroGooeySection
        pulita
        className=""
        innerClassName="mx-auto max-w-7xl"
        before={
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src={iniziaImages.hero}
              alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-brand-panna from-35% via-brand-panna/75 via-50% to-transparent to-70%"
              aria-hidden
            />
            <span className="absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
              Immagine generata con AI
            </span>
          </div>
        }
      >
        <div className="flex flex-col gap-5 px-4 pb-14 pt-12 sm:gap-6 sm:px-6 sm:pt-14 lg:max-w-[44rem] lg:pb-24 lg:pl-8 lg:pt-20">
          <p className="eyebrow eyebrow-mark pillola-occhiello-corallo self-start rounded-full border px-5 py-2.5 text-xs sm:text-sm">
            Ci siamo appena sentiti al telefono
          </p>
          <h1 className="heading-section-xl text-balance">
            Portiamo richieste di lavoro alle imprese edili, e le seguiamo con te{" "}
            <span className="text-brand-corallo no-spezza">fino alla firma</span>.
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-brand-grigio sm:text-xl">
            Se vivi di passaparola, hai già pagato un&apos;agenzia senza vedere niente o perdi lavori
            per 500 euro di differenza, qui trovi in un minuto{" "}
            <strong className="font-semibold text-brand-nero">
              chi siamo, cosa abbiamo fatto e come lavoriamo
            </strong>
            .
          </p>
          <p className="firma-fondatori">
            <strong className="font-semibold text-brand-nero">Marco Pio Cerbone e Gianpio Uva</strong>
            , fondatori di Forge Group
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {casi.map((c) => (
              <div key={c.chi} className="rounded-2xl border border-brand-bordo bg-brand-bianco p-4">
                <p className="font-display text-2xl font-bold leading-none text-brand-corallo-text">
                  {c.numero}
                </p>
                <p className="mt-2 text-xs font-semibold leading-snug text-brand-nero">
                  {c.numeroDetto}
                </p>
                <p className="mt-1.5 text-xs text-brand-grigio">{c.chi}</p>
              </div>
            ))}
          </div>
          <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#candidati" className="btn-hero btn-hero-compatto btn-hero-caldo text-base">
              <span>Candida la tua impresa</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </a>
            <a href="#come-funziona" className="btn-hero btn-hero-compatto btn-hero-freddo text-base">
              <span>Guarda come lavoriamo</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </a>
          </div>
          <figure className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
            <Image
              src={iniziaImages.hero}
              alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
              fill
              sizes="100vw"
              className="object-cover object-right"
            />
            <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
              Immagine generata con AI
            </figcaption>
          </figure>
        </div>
      </HeroGooeySection>

      {/* 2 · I problemi, con le parole dei titolari. Poi "è normale" e il conto. */}
      <section className="section-bianco border-y py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Titolo occhiello="Prima di tutto" sottotitolo="Sono le cose che ci raccontano i titolari al primo appuntamento. Se ne riconosci anche solo una, questa pagina è per te.">
            Ti suona <Chiave>familiare?</Chiave>
          </Titolo>

          <div className="mb-14 space-y-12 md:space-y-16">
            {problemiConScena.map((p, i) => (
              <article key={p.tema} className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
                <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                  <ScenaAI src={p.src} alt={p.alt} sizes="(min-width: 768px) 460px, 100vw" />
                </div>
                <div>
                  <p className="eyebrow mb-3">{p.tema}</p>
                  <p className="mb-4 font-display text-2xl font-bold leading-snug text-brand-nero md:text-3xl">
                    <Chiave>&laquo;</Chiave>
                    {p.frase}
                    <Chiave>&raquo;</Chiave>
                  </p>
                  <p className="body-lg">{p.testo}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mb-14 rounded-2xl border border-brand-bordo bg-brand-bianco px-5 sm:px-8">
            <p className="border-b border-brand-bordo py-5 font-display text-lg font-bold text-brand-nero">
              Oppure ti riconosci in una di queste?
            </p>
            <ol>
              {altriProblemi.map((p, i) => (
                <li
                  key={p.tema}
                  className="grid gap-2 border-b border-brand-bordo py-6 last:border-b-0 md:grid-cols-[3rem_1fr_1fr] md:gap-8"
                >
                  <span
                    className="font-display text-2xl font-bold leading-none text-brand-corallo-text"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow mb-1">{p.tema}</p>
                    <p className="font-display text-lg font-bold leading-snug text-brand-nero">
                      {p.frase}
                    </p>
                  </div>
                  <p className="text-[0.98rem] leading-relaxed text-brand-grigio">{p.testo}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mx-auto mb-12 max-w-3xl">
            <p className="body-lg mb-5">
              È normale. Succede alle imprese che vivono di passaparola: nei mesi buoni il lavoro
              arriva da solo, in quelli morti le spese corrono lo stesso, e si finisce a prendere i
              clienti <strong className="text-brand-nero">per bisogno invece di sceglierli</strong>.
            </p>
            <p className="body-lg">
              <strong className="text-brand-nero">Non è la stagionalità, e non è la crisi.</strong>{" "}
              Manca un modo per far arrivare{" "}
              <Chiave>le richieste giuste</Chiave> e per <Chiave>portarle alla firma</Chiave>.
            </p>
          </div>

          <div className="section-mattone mx-auto max-w-3xl rounded-2xl bg-brand-mattone p-6 sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
              Facciamo due conti, con numeri tondi
            </p>
            <p className="mb-5 text-lg leading-relaxed">
              Esci per otto sopralluoghi al mese e ne chiudi uno: sono sette giornate a vuoto al
              mese, più di ottanta l&apos;anno.
            </p>
            <h3 className="font-display text-2xl font-bold leading-snug md:text-3xl">
              <span>Più di quattro mesi di lavoro</span> regalati a chi non avrebbe mai firmato.
            </h3>
          </div>
        </div>
      </section>

      {/* 3 · I tre casi con le foto vere dei lavori: contro il "non è il mio settore". */}
      <section className="section-sabbia border-y py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Titolo occhiello="I risultati" sottotitolo="Cerca quella più vicina alla tua.">
            Tre imprese, <Chiave>tre mestieri</Chiave>
          </Titolo>
          <div className="grid gap-6 md:grid-cols-3">
            {casi.map((c) => (
              <article key={c.slug} className="card-xl flex flex-col overflow-hidden">
                <div className="relative aspect-[16/9] bg-brand-panna">
                  <Image
                    src={getCaseStudyImage(c.slug)}
                    alt={`Un lavoro di ${c.chi}`}
                    fill
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: getCaseStudyImagePosition(c.slug) }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow mb-1">{c.settore}</p>
                  <h3 className="mb-4 font-display text-xl font-bold text-brand-nero">{c.chi}</h3>
                  <p className="font-display text-3xl font-bold leading-none text-brand-corallo-text">
                    {c.numero}
                  </p>
                  <p className="mb-5 mt-1 text-sm font-semibold leading-snug text-brand-nero">
                    {c.numeroDetto}
                  </p>
                  <p className="mb-2 text-sm leading-relaxed text-brand-grigio">
                    <strong className="text-brand-nero">Prima.</strong> {c.prima}
                  </p>
                  <p className="text-sm leading-relaxed text-brand-grigio">
                    <strong className="text-brand-nero">Dopo.</strong> {c.dopo}
                  </p>
                  {c.slug === "software-b2b" && (
                    <a href="#scettico" className="arrow-link mt-6">
                      Guarda la video-recensione
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · La video-recensione di DISA, per chi è scettico. Parte solo al tocco. */}
      <VideoScettico senzaLinkCaso />

      {/* 5 · "Praticamente, come funziona?": i passi come linea del tempo. */}
      <section
        id="come-funziona"
        className="section-sabbia scroll-mt-24 border-y py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <Titolo occhiello="Come funziona">
            Da qui <Chiave>in avanti</Chiave>
          </Titolo>
          <ol className="ml-5 space-y-9 border-l-2 border-brand-bordo pl-9">
            {passi.map((p, i) => (
              <li key={p.titolo} className="relative">
                <span
                  className="absolute -left-[3.45rem] top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-corallo bg-brand-bianco font-display text-lg font-bold text-brand-corallo-text"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="mb-1 pt-1.5 font-display text-xl font-bold text-brand-nero">
                  {p.titolo}
                </h3>
                <p className="body-lg">{p.testo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 · Per chi è: il blocco del sito, con il pulsante che porta al modulo qui sotto. */}
      <PerChiSiPerChiNo nota="Lavoriamo con poche imprese, una per territorio." ctaHref="#candidati" />

      {/* 7 · Chi siamo: le facce, da dove veniamo, e chi lavora sulla tua impresa. */}
      <section className="section-sabbia border-y py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Titolo occhiello="Chi siamo">
            Le persone <Chiave>dietro Forge</Chiave>
          </Titolo>

          <div className="mb-14 grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-panna">
              <Image
                src={teamImages.foundersDuo}
                alt="Marco Pio Cerbone e Gianpio Uva, i fondatori di Forge Group, al TEDx Benevento"
                fill
                sizes="(min-width: 768px) 380px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 10%" }}
              />
            </figure>
            <div>
              <p className="mb-5 font-display text-2xl font-bold leading-snug text-brand-nero">
                Siamo Marco Pio Cerbone e Gianpio Uva, i fondatori di Forge Group.{" "}
                <Chiave>Gianpio è quello che ti ha chiamato.</Chiave>
              </p>
              <p className="body-lg mb-5">
                Veniamo tutti e due dal campo dell&apos;edilizia: Gianpio vendeva software, Marco
                prima di Forge ha fondato un&apos;agenzia di marketing. Abbiamo parlato con tante
                imprese, e abbiamo visto sempre la stessa cosa:{" "}
                <strong className="text-brand-nero">
                  il lavoro in cantiere lo sanno fare. Manca un modo per trovare i clienti giusti e
                  portarli alla firma.
                </strong>
              </p>
              <p className="body-lg">
                Per questo facciamo una cosa sola:{" "}
                <Chiave>
                  portare richieste di lavoro alle imprese edili, e seguirle fino al contratto
                </Chiave>
                .
              </p>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
            <div className="md:order-2">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-panna">
                  <Image
                    src={teamImages.setVideoCliente}
                    alt="Il nostro videomaker riprende il titolare di un'azienda cliente nel suo showroom"
                    fill
                    sizes="(min-width: 768px) 380px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-brand-grigio">
                  Le riprese del video di un cliente, nel suo showroom.
                </figcaption>
              </figure>
            </div>
            <div className="md:order-1">
              <h3 className="mb-6 font-display text-2xl font-bold leading-snug text-brand-nero md:text-3xl">
                Con noi lavora una squadra che fa <Chiave>una cosa sola</Chiave>: portarti
                clienti.
              </h3>
              <ul className="space-y-5">
                {squadra.map((s) => (
                  <li key={s.chi} className="flex gap-4">
                    <span className="segno-si mt-1" aria-hidden>
                      ✓
                    </span>
                    <p className="body-lg">
                      <strong className="text-brand-nero">{s.chi}</strong>, {s.cosa}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Le domande che ci fanno dopo la chiamata. */}
      <section className="section-mattone py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Titolo occhiello="Domande frequenti">
            Le domande <Chiave>che ci fate</Chiave> dopo la chiamata
          </Titolo>
          <FAQAccordion onCoral items={domande} />
        </div>
      </section>

      {/* 9 · Cosa riceve chi si candida, poi il modulo senza il suo banner. */}
      <section id="candidati" className="section-sabbia scroll-mt-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Titolo occhiello="Il primo passo">
            Candida la tua impresa e ricevi <Chiave>lo studio di fattibilità</Chiave>
          </Titolo>
          <p className="body-lg mb-6">
            Prima di parlare di pubblicità, facciamo i conti sulla tua impresa e sulla tua zona.
            Nello studio di fattibilità trovi:
          </p>
          <ul className="mb-8 space-y-4">
            {studio.map((riga) => (
              <li key={riga.cosa} className="flex gap-3.5">
                <span className="segno-si mt-1" aria-hidden>
                  ✓
                </span>
                <p className="body-lg">
                  <strong className="text-brand-nero">{riga.cosa}</strong> {riga.dettaglio}
                </p>
              </li>
            ))}
          </ul>
          <p className="body-lg">
            Compili il modulo in due minuti.{" "}
            <strong className="text-brand-nero">Ti chiamiamo entro 48 ore lavorative</strong>{" "}
            e fissiamo l&apos;appuntamento in cui te lo presentiamo.
          </p>
        </div>
        <ContattiFormLoader sorgente="inizia" senzaBanner />
      </section>
    </>
  );
}
