import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContattiFormLoader from "@/app/contatti/ContattiFormLoader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import VideoScettico from "@/components/sezioni/VideoScettico";
import { getCaseStudyImage, getCaseStudyImagePosition, teamImages } from "@/data/images";
import type { Faq } from "@/data/site";

/**
 * La pagina che Gianpio manda su WhatsApp dopo la prima telefonata.
 *
 * Non è la home: arriva in un momento preciso (dieci minuti dopo la chiamata,
 * dal telefono, a un titolare diffidente) e deve rispondere in un minuto a
 * "chi sono, cosa hanno fatto, cosa succede adesso". Fuori da Google, perché
 * non serve a chi cerca: serve a chi abbiamo appena sentito. Il modulo manda
 * a GA4 la sorgente "inizia", così le candidature di questa pagina si contano
 * a parte. Testi approvati dalla proprietà il 28/09/2026, sezione per sezione.
 * Numeri solo dalla Scheda dei fatti.
 *
 * L'ordine viene dalle pagine di vendita studiate il 28/09: le facce e i
 * numeri subito, poi le situazioni in cui il titolare si riconosce, le prove
 * con le foto vere dei lavori, il video, come funziona, per chi è, chi siamo,
 * le domande, il modulo.
 */

export const metadata: Metadata = {
  title: "Inizia da qui",
  description:
    "Chi siamo, cosa abbiamo fatto per tre imprese edili e come funziona dopo la prima telefonata.",
  alternates: { canonical: "/inizia" },
  robots: { index: false, follow: true },
};

const fondatori = [
  {
    nome: "Marco Pio Cerbone",
    foto: teamImages.marco,
    prima: "Ha fondato un'agenzia di marketing prima di Forge.",
  },
  {
    nome: "Gianpio Uva",
    foto: teamImages.gianpio,
    prima: "Vendeva software per le imprese edili.",
  },
];

const situazioni = [
  {
    fatto: "Hai fatto il sopralluogo, il preventivo e anche il progetto,",
    ma: "ma alla fine il cliente ha scelto chi costava meno?",
  },
  {
    fatto: "Hai pagato un'agenzia,",
    ma: "ma i contatti che arrivavano non erano nemmeno lavorabili?",
  },
  {
    fatto: "Hai mandato il preventivo,",
    ma: "ma dopo il “ci devo pensare” nessuno l'ha più richiamato?",
  },
];

const casi = [
  {
    slug: "software-b2b",
    chi: "DISA",
    settore: "Software per l'edilizia",
    numero: "126.500 €",
    numeroDetto: "di nuovi contratti in 90 giorni, solo dalle Meta Ads",
    prima:
      "I commerciali chiamavano a freddo imprenditori edili senza sapere chi fosse interessato, e chiedevano nomi ai clienti.",
    dopo: "A 1,48 € per contatto. In un anno circa 350.000 €, con circa 300 € al mese di pubblicità.",
    link: { href: "#scettico", testo: "Guarda la video-recensione" },
  },
  {
    slug: "edilizia",
    chi: "Tetti Top",
    settore: "Coperture e lattoneria",
    numero: "4 al mese",
    numeroDetto: "clienti qualificati, senza pubblicità",
    prima: "Viveva di passaparola, con mesi pieni e mesi vuoti, e faceva preventivi a chiunque chiedesse.",
    dopo: "Preventivi fino a 175.000 €, e il sopralluogo è diventato a pagamento.",
    link: { href: "/casi-studio/edilizia", testo: "Leggi il caso" },
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
    link: { href: "/casi-studio/arredo-commerciale", testo: "Leggi il caso" },
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
      {/* 1 · Apertura: le facce di chi ha chiamato, cosa facciamo, le prove. */}
      <section className="section-sabbia border-b border-brand-bordo pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {fondatori.map((f, i) => (
                <div
                  key={f.nome}
                  className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-brand-bianco bg-brand-panna shadow-sm"
                >
                  <Image
                    src={f.foto}
                    alt={`Foto di ${f.nome}`}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm leading-snug text-brand-grigio">
              Marco Pio Cerbone e Gianpio Uva,
              <br />
              fondatori di Forge Group
            </p>
          </div>

          <p className="eyebrow eyebrow-mark mb-4 flex">Ci siamo appena sentiti al telefono</p>
          <h1 className="heading-section-xl mb-6 max-w-3xl text-balance">
            Portiamo richieste di lavoro alle imprese edili, e le seguiamo con te fino alla firma.
          </h1>
          <p className="body-lg mb-10 max-w-2xl">
            Se vivi di passaparola, hai già pagato un&apos;agenzia senza vedere niente o perdi lavori
            per 500 euro di differenza, qui trovi in un minuto chi siamo, cosa abbiamo fatto e come
            lavoriamo.
          </p>

          <div className="mb-10 grid gap-3 sm:grid-cols-3">
            {casi.map((c) => (
              <div key={c.chi} className="rounded-2xl border border-brand-bordo bg-brand-bianco p-5">
                <p className="font-display text-3xl font-bold leading-none text-brand-corallo-text">
                  {c.numero}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-brand-nero">
                  {c.numeroDetto}
                </p>
                <p className="mt-2 text-xs text-brand-grigio">
                  {c.chi}, {c.settore.toLowerCase()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#candidati" className="btn-corallo">
              Candida la tua impresa
            </a>
            <a href="#come-funziona" className="btn-ghost">
              Guarda come lavoriamo
            </a>
          </div>
        </div>
      </section>

      {/* 2 · Le situazioni in cui si riconosce, poi "è normale" e il conto delle giornate perse. */}
      <section className="section-bianco border-b border-brand-bordo py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="heading-section-xl mb-8 text-balance">TI SUONA FAMILIARE?</h2>
          <ul className="mb-10 space-y-4">
            {situazioni.map((s) => (
              <li
                key={s.ma}
                className="rounded-r-2xl border-l-4 border-brand-corallo bg-brand-panna px-5 py-4 text-lg leading-snug text-brand-nero"
              >
                {s.fatto} <strong>{s.ma}</strong>
              </li>
            ))}
          </ul>
          <p className="body-lg mb-5">
            È normale. Succede alle imprese che vivono di passaparola: nei mesi buoni il lavoro
            arriva da solo, in quelli morti le spese corrono lo stesso, e si finisce a prendere i
            clienti per bisogno invece di sceglierli.
          </p>
          <p className="body-lg mb-10">
            <strong className="text-brand-nero">Non è la stagionalità, e non è la crisi.</strong>{" "}
            Manca un modo per far arrivare le richieste giuste e per portarle alla firma.
          </p>

          <div className="rounded-2xl bg-brand-mattone p-6 text-brand-bianco sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-bianco/80">
              Facciamo due conti, con numeri tondi
            </p>
            <p className="text-lg leading-relaxed">
              Esci per otto sopralluoghi al mese e ne chiudi uno: sono sette giornate a vuoto al
              mese, più di ottanta l&apos;anno.
            </p>
            <p className="mt-4 font-display text-2xl font-bold leading-snug">
              Più di quattro mesi di lavoro regalati a chi non avrebbe mai firmato.
            </p>
          </div>
        </div>
      </section>

      {/* 3 · I tre casi con le foto vere dei lavori: contro il "non è il mio settore". */}
      <section className="section-sabbia border-b border-brand-bordo py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="heading-section-xl mb-3 text-balance">TRE IMPRESE, TRE MESTIERI</h2>
          <p className="body-lg mb-10">Cerca quella più vicina alla tua.</p>
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
                  <p className="mb-6 text-sm leading-relaxed text-brand-grigio">
                    <strong className="text-brand-nero">Dopo.</strong> {c.dopo}
                  </p>
                  <Link href={c.link.href} className="arrow-link mt-auto">
                    {c.link.testo}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · La video-recensione di DISA, per chi è scettico. Parte solo al tocco. */}
      <VideoScettico />

      {/* 5 · "Praticamente, come funziona?": i passi come linea del tempo. */}
      <section
        id="come-funziona"
        className="section-sabbia scroll-mt-24 border-b border-brand-bordo py-14 md:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="heading-section-xl mb-10 text-balance">DA QUI IN AVANTI</h2>
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

      {/* 7 · Chi siamo, con le facce. */}
      <section className="section-sabbia border-b border-brand-bordo py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="heading-section-xl mb-8 text-balance">CHI SIAMO</h2>
          <div className="mb-10 grid grid-cols-2 gap-4 sm:gap-6">
            {fondatori.map((f) => (
              <figure key={f.nome}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-panna">
                  <Image
                    src={f.foto}
                    alt={`Foto di ${f.nome}`}
                    fill
                    sizes="(min-width: 896px) 420px, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-lg font-bold leading-tight text-brand-nero">
                    {f.nome}
                  </p>
                  <p className="mt-1 text-sm text-brand-grigio">{f.prima}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="body-lg mb-5">
            Siamo i fondatori di Forge Group, e veniamo tutti e due dal campo dell&apos;edilizia.
            Siamo entrati in contatto con tante imprese, e abbiamo visto che il lavoro in cantiere lo
            sanno fare. Quello che manca spesso è un modo per trovare i clienti giusti e portarli alla
            firma.
          </p>
          <p className="body-lg mb-5">
            Per questo facciamo una cosa sola: portare richieste di lavoro alle imprese edili, e
            seguirle fino al contratto.
          </p>
          <p className="body-lg">
            Con noi lavorano un videomaker, per i video girati in cantiere, e un&apos;azienda che
            sviluppa i nostri software e i siti.
          </p>
        </div>
      </section>

      {/* 8 · Le domande che ci fanno dopo la chiamata. */}
      <section className="section-bianco border-b border-brand-bordo py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="heading-section-xl mb-10 text-balance">LE DOMANDE CHE CI FATE</h2>
          <FAQAccordion items={domande} />
        </div>
      </section>

      {/* 9 · Il modulo, che ha già il suo titolo "Candida la tua impresa". */}
      <div id="candidati" className="scroll-mt-24">
        <ContattiFormLoader sorgente="inizia" />
      </div>
    </>
  );
}
