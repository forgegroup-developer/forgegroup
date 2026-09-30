import type { ReactNode } from "react";
import { iniziaImages, teamImages } from "@/data/images";
import type { Faq } from "@/data/site";

/**
 * I testi dei blocchi condivisi (landing /inizia, home e le altre pagine).
 * Approvati dalla proprietà sulla landing il 28-29/09/2026: se cambia un
 * testo qui, cambia ovunque. I fatti vengono dalla Scheda dei fatti; i
 * numeri dei casi stanno in `prove.ts`.
 */

export const fondatori = [
  { nome: "Marco Pio Cerbone", foto: teamImages.marco },
  { nome: "Gianpio Uva", foto: teamImages.gianpio },
];

/**
 * Ogni problema ha accanto la sua soluzione, "Con Forge": il dolore, il
 * perché, e subito cosa facciamo noi (problema, aggravamento, soluzione).
 * La soluzione è sempre il meccanismo, mai una promessa di risultato.
 */
export type Problema = {
  tema: string;
  frase: string;
  testo: ReactNode;
  soluzione: ReactNode;
};

/** I quattro problemi con la scena accanto. */
export const problemiConScena: (Problema & { src: string; alt: string })[] = [
  {
    tema: "Sopralluoghi regalati",
    frase:
      "Mi metto a disposizione, gli faccio anche il progetto, e poi sceglie un altro.",
    testo: (
      <>
        Esci per chiunque chiami, perché non sai chi ha un budget e chi vuole
        solo un prezzo da confrontare.{" "}
        <strong>Le giornate a vuoto non te le paga nessuno.</strong>
      </>
    ),
    soluzione: (
      <>
        Il modulo chiede a ogni richiesta tipo di lavoro, tempi, budget e zona:{" "}
        <strong>esci solo per chi ha un lavoro vero da fare.</strong> E
        lavoriamo con te perché il sopralluogo diventi a pagamento, come con
        Tetti Top.
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
        <strong>
          Se l&apos;unica differenza che il cliente vede è il totale, vince chi
          costa meno
        </strong>
        , e i soldi li regali ai concorrenti della tua zona.
      </>
    ),
    soluzione: (
      <>
        Al posto del solito preventivo costruiamo con te il piano dei lavori e
        il materiale per presentarlo:{" "}
        <strong>
          il cliente vede cosa compra prima di guardare il totale.
        </strong>{" "}
        E il suo budget lo conosci prima dell&apos;appuntamento, come oggi ROVI.
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
        Fai tutto tu e non sai dire di no. Crescere vorrebbe dire assumere, e fa
        paura. <strong>Così l&apos;impresa resta piccola</strong>, o si
        ridimensiona.
      </>
    ),
    soluzione: (
      <>
        La pubblicità la gestiamo noi, le richieste arrivano già filtrate nel
        gestionale, e il modo di vendere lo mettiamo per iscritto,{" "}
        <strong>così può seguirlo anche chi risponde al telefono.</strong> Tu
        guardi i numeri, anche dal cantiere.
      </>
    ),
    src: iniziaImages.cantiereAlle20,
    alt: "Un imprenditore edile seduto sul cassone del furgone al tramonto, al telefono davanti al cantiere",
  },
  {
    tema: "I soldi che non entrano",
    frase: "Il lavoro l'ho finito, ma i soldi non arrivano.",
    testo: (
      <>
        Sembra colpa dei clienti o della crisi. Ma se acconti e pagamenti non li
        hai fissati per iscritto prima di iniziare, a fine lavoro arrivano
        contestazioni e ritardi.{" "}
        <strong>E chi prende i clienti per bisogno non se li sceglie.</strong>
      </>
    ),
    soluzione: (
      <>
        Nel processo di vendita che scriviamo con te,{" "}
        <strong>
          come e quando ti pagano si decide prima di iniziare, per iscritto
        </strong>
        : acconto, saldo, bonifico. E quando le richieste non dipendono più solo
        dal passaparola, i clienti torni a sceglierli tu.
      </>
    ),
    src: iniziaImages.fattureScadute,
    alt: "Un imprenditore edile al tavolo con pile di fatture timbrate come scadute, preoccupato, guarda il telefono",
  },
];

/**
 * Gli altri quattro, come domande ("hai fatto X, ma Y?"): e' la forma che
 * nelle pagine studiate regge meglio un elenco, e non suona come un'accusa.
 */
export const altriProblemi: Problema[] = [
  {
    tema: "I mesi morti",
    frase:
      "Nei mesi buoni non ce la fai, e in quelli morti aspetti che squilli il telefono?",
    testo: (
      <>
        Le spese e gli stipendi corrono lo stesso, e i fornitori li paghi quando
        pagano i clienti.{" "}
        <strong>Non è la stagionalità: manca un sistema.</strong>
      </>
    ),
    soluzione: (
      <>
        Le campagne lavorano anche quando il passaparola si ferma, e lo studio
        di fattibilità ti dice prima{" "}
        <strong>quanto lavoro c&apos;è nella tua zona</strong> e quanto ne regge
        la tua impresa.
      </>
    ),
  },
  {
    tema: "Il preventivo e poi il silenzio",
    frase:
      "Hai mandato il preventivo, ma dopo il «ci devo pensare» nessuno si è più fatto sentire?",
    testo: (
      <>
        Ti chiedi cosa hai sbagliato, e non richiami per non sembrare
        insistente.{" "}
        <strong>
          Intanto firma con chi l&apos;ha messo in condizione di decidere.
        </strong>
      </>
    ),
    soluzione: (
      <>
        Nel gestionale ogni preventivo ha una data per richiamare, e nelle
        consulenze passiamo con te le trattative aperte una per una.{" "}
        <strong>Nessuna resta lì.</strong>
      </>
    ),
  },
  {
    tema: "L'agenzia di prima",
    frase:
      "Hai pagato un'agenzia, ma i contatti che arrivavano non erano nemmeno lavorabili?",
    testo: (
      <>
        Il canone lo pagavi comunque, e non avevi modo di vedere dove finivano i
        soldi.{" "}
        <strong>
          Il problema non erano pochi contatti: erano contatti sprecati.
        </strong>
      </>
    ),
    soluzione: (
      <>
        Il filtro lo mettiamo noi, con il modulo, e nel gestionale vedi{" "}
        <strong>contratto per contratto quanto ti rende ogni euro.</strong> Se
        dopo 60 giorni i numeri non si muovono, cambiamo strategia, campagne o
        budget.
      </>
    ),
  },
  {
    tema: "La paura di vendere",
    frase: "Sai che dovresti richiamare, ma non vuoi sembrare insistente?",
    testo: (
      <>
        Richiamare ti sembra insistere, e quando parli di soldi ti senti sotto
        il cliente.{" "}
        <strong>Così le trattative restano appese, e decide sempre lui.</strong>
      </>
    ),
    soluzione: (
      <>
        Il metodo e le parole per richiamare li scriviamo insieme, e ogni
        settimana guardiamo con te le trattative.{" "}
        <strong>Richiami con un motivo</strong>, non «per sentire», e la cifra
        la dici presto.
      </>
    ),
  },
];

export const squadra = [
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
export const studio = [
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
    dettaglio:
      "con le persone e i mezzi che ha, per non mandarla in sovraccarico.",
  },
  {
    cosa: "Il tuo modo di vendere di oggi,",
    dettaglio: "con i suoi numeri: preventivi, sopralluoghi, contratti.",
  },
  {
    cosa: "Una risposta: ha senso lavorare insieme?",
    dettaglio:
      "Può essere no, e te la diamo prima che tu spenda un euro in pubblicità.",
  },
];

export const passi = [
  {
    titolo: "Un appuntamento per conoscerci",
    testo:
      "Di persona se sei vicino ai nostri consulenti, altrimenti in videochiamata.",
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
    titolo: "Al tuo fianco",
    testo:
      "Le consulenze con te e la tua squadra, sulle trattative fino alla firma. Le richieste le richiama la tua impresa, con il metodo e le parole che costruiamo insieme.",
  },
  {
    titolo: "I numeri",
    testo:
      "Dopo 60 giorni rivediamo insieme le stime sui dati veri. Dopo 90 giorni hai il primo report: contatti, appuntamenti, contratti, e quanto ha reso ogni euro.",
  },
];

/** Cosa si vede nel gestionale, in parole del titolare. Sul sito si dice "gestionale", mai "CRM" (proprietà, 28/09). */
export const crm = [
  {
    titolo: "Chi ti ha scritto, prima di richiamarlo",
    testo:
      "Ogni richiesta arriva nel gestionale con nome, telefono, zona, tipo di lavoro, tempi e budget. Quando richiami sai già con chi parli, e chi cercava solo un prezzo lo vedi subito.",
  },
  {
    titolo: "A che punto è ogni trattativa",
    testo:
      "Sopralluogo, preventivo, piano dei lavori, firma: ogni cliente ha la sua fase, e ogni incontro finisce con una data. Nessuna richiesta resta lì senza che nessuno la richiami.",
  },
  {
    titolo: "Quanto ti rende ogni euro",
    testo:
      "Contatti, appuntamenti, contratti e costo per contatto, per ogni linea di lavoro. Vedi dove vanno i soldi della pubblicità e quanti tornano indietro, contratto per contratto.",
  },
  {
    titolo: "Lo guardiamo insieme",
    testo:
      "Nelle consulenze apriamo il gestionale con te e passiamo le trattative una per una. Ogni tre mesi hai il report con tutti i numeri.",
  },
];

/** Le domande che fanno dopo la prima chiamata. */
export const domandeDopoLaChiamata: Pick<Faq, "q" | "a">[] = [
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
    a: "Se mangi male in un ristorante non smetti di andare al ristorante: guardi chi è specializzato e chi ha casi veri. Noi lavoriamo solo con imprese edili, e con il gestionale vedi tu, contratto per contratto, quanto ti rende ogni euro.",
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
