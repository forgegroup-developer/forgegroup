import type { Article } from "@/data/articles";

/**
 * Articoli programmati — pubblicazione automatica via publishAt + Vercel Cron.
 * Orari: 09:00 ora di Roma (07:00 UTC, luglio = CEST).
 */
export const scheduledArticles: Article[] = [
  {
    slug: "come-smettere-dipendere-passaparola",
    title: "Come Smettere di Dipendere dal Passaparola (Senza Bruciare il Budget)",
    description:
      "Il passaparola funziona finché funziona. Ecco come costruire un canale di acquisizione clienti prevedibile accanto al word-of-mouth.",
    category: "Acquisizione Clienti",
    date: "2026-07-11",
    publishAt: "2026-07-11T07:00:00.000Z",
    updatedDate: "2026-07-11",
    readTime: "7 min",
    excerpt:
      "Il passaparola è un regalo, non un sistema. Quando si ferma, molte aziende scoprono di non avere un piano B.",
    tags: ["passaparola", "acquisizione clienti", "marketing b2b", "crescita prevedibile"],
    faqs: [
      {
        q: "Il passaparola è sufficiente per crescere?",
        a: "Per partire sì. Per scalare in modo prevedibile no: non puoi pianificarlo, misurarlo né ottimizzarlo come un canale marketing.",
      },
      {
        q: "Devo smettere di chiedere referral ai clienti soddisfatti?",
        a: "Assolutamente no. Il passaparola resta un canale prezioso — va integrato in un sistema più ampio, non sostituito dall'ansia.",
      },
      {
        q: "Quanto tempo serve per ridurre la dipendenza dal passaparola?",
        a: "Con un sistema base (landing, ads mirate, CRM), in 60-90 giorni iniziano ad arrivare contatti da canali misurabili accanto al word-of-mouth.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Se la maggior parte dei tuoi clienti arriva dal passaparola, non sei solo. È normale nelle PMI italiane. Il problema inizia quando un trimestre buono dipende da chi ha parlato bene di te — e un trimestre cattivo non sai da dove ricominciare.",
      },
      { type: "h2", text: "Perché il passaparola non è un sistema" },
      {
        type: "ul",
        items: [
          "Non lo controlli: dipende da altri",
          "Non lo misuri: non sai quanto costa né quanto rende",
          "Non lo scalzi: non puoi 'aumentare' il passaparola come una campagna",
          "Non lo pianifichi: a fine anno non sai quanti clienti avrai",
        ],
      },
      { type: "h2", text: "Come costruire un canale parallelo (senza buttare soldi)" },
      { type: "h3", text: "1. Definisci il cliente ideale" },
      {
        type: "p",
        text: "Il passaparola ti porta clienti simili ai precedenti — a volte non è quello che vuoi. Prima di investire, chiarisci chi vuoi attrarre adesso.",
      },
      { type: "h3", text: "2. Crea un asset che converte" },
      {
        type: "p",
        text: "Una landing page con un messaggio chiaro e un form di contatto. Non serve un sito nuovo: serve una pagina che parla al problema del cliente, non della tua storia aziendale.",
      },
      { type: "h3", text: "3. Attiva un canale a budget controllato" },
      {
        type: "p",
        text: "Meta Ads o LinkedIn Ads con targeting preciso. Parti con un budget test (800-1.200€/mese) e misura costo per lead qualificato. Approfondisci in [come acquisire clienti B2B in Campania](/blog/come-acquisire-clienti-b2b-campania).",
      },
      { type: "h3", text: "4. Formalizza il referral" },
      {
        type: "p",
        text: "Programma referral semplice per clienti soddisfatti: incentivo chiaro, processo facile. Il passaparola strutturato rende di più del passaparola casuale.",
      },
      {
        type: "quote",
        text: "Il passaparola è il bonus. Il sistema è la base.",
      },
      {
        type: "p",
        text: "Per una guida passo-passo su come iniziare subito, leggi anche [come iniziare ad aumentare i clienti e smettere di dipendere dal passaparola](/blog/aumentare-clienti-smettere-passaparola).",
      },
      { type: "cta", text: "Vuoi un sistema che lavora mentre il passaparola gira?" },
    ],
  },
  {
    slug: "perche-clienti-spariscono-dopo-preventivo",
    title: "Perché i Clienti Spariscono Dopo il Preventivo (e Come Recuperarli)",
    description:
      "Il silenzio dopo un preventivo non è sempre un no. Ecco le cause reali e le azioni concrete per aumentare il tasso di chiusura.",
    category: "Vendite B2B",
    date: "2026-07-16",
    publishAt: "2026-07-16T07:00:00.000Z",
    updatedDate: "2026-07-16",
    readTime: "7 min",
    excerpt:
      "Hai fatto la call, inviato il preventivo, e poi silenzio assoluto. Non è sfortuna: è un pattern che si può interrompere.",
    tags: ["preventivo", "follow-up", "chiusura vendite", "vendita b2b"],
    faqs: [
      {
        q: "Dopo quanto tempo un preventivo si considera perso?",
        a: "Dipende dal settore. In B2B, se dopo 5-8 follow-up strutturati non c'è risposta, classifica il lead come non attivo e passa oltre.",
      },
      {
        q: "Devo fare sconto se il cliente non risponde?",
        a: "No, almeno non subito. Prima capisci se c'è un'obiezione nascosta (budget, tempistiche, competitor). Lo sconto senza diagnosi abitua il mercato a negoziare.",
      },
      {
        q: "Il preventivo via email funziona ancora?",
        a: "Sì, ma il preventivo da solo non basta. Deve essere preceduto da una call di discovery e seguito da un piano di follow-up calendarizzato.",
      },
    ],
    content: [
      {
        type: "p",
        text: "La call è andata bene. Il cliente era interessato. Hai inviato il preventivo con cura. Poi: niente. Nessuna risposta, nessun rifiuto, solo silenzio. Se ti riconosci, non sei solo — e la buona notizia è che questo pattern ha cause identificabili e soluzioni concrete.",
      },
      { type: "h2", text: "Le 5 cause più comuni del silenzio post-preventivo" },
      {
        type: "ul",
        items: [
          "Preventivo inviato senza call di allineamento: il cliente non si sente coinvolto",
          "Prezzo senza contesto di valore: vede solo un numero, non la soluzione",
          "Nessun follow-up pianificato: aspetti che ti richiamino",
          "Troppi dettagli tecnici: il decision maker non capisce cosa compra",
          "Tempistiche non definite: 'ci penso' diventa 'ho dimenticato'",
        ],
      },
      { type: "h2", text: "Cosa fare subito per recuperare preventivi" },
      { type: "h3", text: "1. Follow-up entro 48 ore" },
      {
        type: "p",
        text: "Non aspettare una settimana. Un messaggio breve: 'Hai avuto modo di vedere la proposta? C'è qualcosa da chiarire?'. Semplice, diretto, senza pressione.",
      },
      { type: "h3", text: "2. Chiedi cosa blocca la decisione" },
      {
        type: "p",
        text: "Budget? Tempistiche? Confronto con altri? Meglio un no chiaro di un silenzio che consuma energia.",
      },
      { type: "h3", text: "3. Proponi un next step concreto" },
      {
        type: "p",
        text: "Non 'fammi sapere'. Proponi una call di 15 minuti per due domande specifiche o una demo mirata.",
      },
      { type: "h3", text: "4. Struttura il processo per il prossimo preventivo" },
      {
        type: "p",
        text: "Script di invio preventivo, sequenza follow-up in CRM, template email. Il sistema evita che il problema si ripeta. Approfondisci nel [sistema di vendita B2B](/blog/sistema-vendita-b2b-dalla-lead-al-contratto).",
      },
      {
        type: "quote",
        text: "Il preventivo non chiude la vendita. Il follow-up sì.",
      },
      { type: "cta", text: "Vuoi strutturare il follow-up dei tuoi preventivi?" },
    ],
  },
  {
    slug: "smettere-contatti-solo-informazioni-gratuite",
    title: "Come Smettere di Essere Contattato Solo da Chi Vuole Informazioni Gratuite",
    description:
      "Se ricevi tante richieste ma pochi clienti paganti, il problema è la qualità del contatto. Ecco come filtrare prima che arrivino al commerciale.",
    category: "Acquisizione Clienti",
    date: "2026-07-18",
    publishAt: "2026-07-18T07:00:00.000Z",
    updatedDate: "2026-07-18",
    readTime: "7 min",
    excerpt:
      "Tante richieste, zero contratti? Probabilmente stai attirando curiosi, non clienti. Ecco come cambiare.",
    tags: ["lead qualificati", "prequalifica", "filtro clienti", "informazioni gratuite"],
    faqs: [
      {
        q: "Come capisco se un contatto vuole solo informazioni gratuite?",
        a: "Segnali tipici: non risponde a domande su budget, chiede prezzi senza contesto, scompare dopo la prima risposta, confronta solo numeri senza valutare il valore.",
      },
      {
        q: "Un form più lungo fa scappare i clienti?",
        a: "Fa scappare i curiosi. I clienti seri compilano form con domande mirate perché capiscono che stai selezionando, non raccogliendo numeri a caso.",
      },
      {
        q: "Devo mettere i prezzi sul sito?",
        a: "Dipende. Per servizi high-ticket, una fascia indicativa o un 'a partire da' filtra chi non ha budget. Nascondere tutto attrae più curiosi.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Il telefono squilla, le email arrivano, i messaggi su WhatsApp si accumulano. Ma a fine mese i contratti sono pochi. Il problema non è la quantità di contatti — è che molti non avevano intenzione di comprare. Volevano solo informazioni gratuite.",
      },
      { type: "h2", text: "Perché attiri curiosi invece di clienti" },
      {
        type: "ul",
        items: [
          "Messaggio troppo generico: 'contattaci per un preventivo gratuito' attira tutti",
          "Nessun filtro nel form: nome e email bastano per chiunque",
          "Contenuti che educano senza qualificare: utili ma non filtrano",
          "Paura di perdere contatti: più lead = meglio, anche se sbagliati",
        ],
      },
      { type: "h2", text: "Come filtrare senza perdere clienti veri" },
      { type: "h3", text: "1. Form con domande strategiche" },
      {
        type: "p",
        text: "Chiedi settore, dimensione azienda, obiettivo principale e fascia di budget. Chi è serio risponde; chi vuole solo info spesso abbandona — ed è esattamente quello che vuoi.",
      },
      { type: "h3", text: "2. Landing page che parla a un cliente specifico" },
      {
        type: "p",
        text: "Se la pagina è per tutti, attira tutti. Scrivi per il tuo cliente ideale e rendi chiaro per chi non è adatto.",
      },
      { type: "h3", text: "3. Lead magnet verticale, non generico" },
      {
        type: "p",
        text: "'Iscriviti alla newsletter' non qualifica nessuno. 'Checklist: 7 errori che fanno perdere margini alle PMI' attira imprenditori con quel problema.",
      },
      { type: "h3", text: "4. Call di prequalifica prima della vendita" },
      {
        type: "p",
        text: "15 minuti per capire fit reale. Solo chi passa questa fase arriva al commerciale. Leggi [come trovare clienti più qualificati](/blog/come-acquisire-clienti-b2b-campania).",
      },
      {
        type: "quote",
        text: "Meno contatti, più giusti. È quasi sempre più redditizio.",
      },
      { type: "cta", text: "Vuoi un sistema che filtra prima del commerciale?" },
    ],
  },
  {
    slug: "gare-appalto-vs-clienti-privati-pagano",
    title: "Non Devi Fare Gare d'Appalto Se i Tuoi Clienti Privati Non Ti Pagano Correttamente",
    description:
      "Molte aziende corrono alle gare pubbliche perché i clienti privati pagano male. Il vero problema è altrove — e costa di più.",
    category: "Pricing e Margine",
    date: "2026-07-23",
    publishAt: "2026-07-23T07:00:00.000Z",
    updatedDate: "2026-07-23",
    readTime: "7 min",
    excerpt:
      "Le gare d'appalto sembrano la soluzione quando i privati non pagano. Spesso è la scelta che ti lega a margini ancora più bassi.",
    tags: ["gare appalto", "clienti privati", "margini", "pricing", "b2b"],
    faqs: [
      {
        q: "Le gare d'appalto sono sempre una cattiva idea?",
        a: "No, se hai competenze specifiche, capacità di gestire la burocrazia e margini calcolati. Il problema è usarle come rifugio quando il problema reale è il pricing con i privati.",
      },
      {
        q: "Perché i clienti privati non pagano correttamente?",
        a: "Spesso perché non hai comunicato valore, non hai filtrato chi non ha budget, o hai abituato il mercato a sconti. È un problema di posizionamento, non di 'cattivi clienti'.",
      },
      {
        q: "Come trovo clienti privati che pagano bene?",
        a: "Posizionamento chiaro, prequalifica, offerta premium e processo commerciale strutturato. Leggi [come farsi pagare di più](/blog/come-farsi-pagare-di-piu-prodotti-servizi).",
      },
    ],
    content: [
      {
        type: "p",
        text: "I clienti privati pagano in ritardo, contrattano su tutto, spariscono dopo il preventivo. La tentazione è grande: buttarsi sulle gare d'appalto, dove almeno 'c'è il pagamento garantito'. Ma se i privati non ti pagano correttamente, il problema raramente si risolve cambiando canale.",
      },
      { type: "h2", text: "Perché le gare non sono la soluzione che sembra" },
      {
        type: "ul",
        items: [
          "Margini spesso più bassi del privato ben gestito",
          "Costi nascosti: burocrazia, garanzie, tempi lunghi",
          "Competizione sul prezzo, non sul valore",
          "Dipendenza da un ente pubblico invece che da un sistema tuo",
        ],
      },
      { type: "h2", text: "Il vero problema: non sai vendere ai privati" },
      {
        type: "p",
        text: "Se i privati non pagano, di solito manca uno di questi: posizionamento differenziato, prequalifica dei lead, offerta strutturata a livelli, processo di follow-up. Non è che i privati sono tutti cattivi pagatori — è che stai parlando con quelli sbagliati, nel modo sbagliato.",
      },
      { type: "h2", text: "Cosa fare prima di candidarti a un'altra gara" },
      { type: "h3", text: "1. Analizza i tuoi migliori clienti privati" },
      {
        type: "p",
        text: "Chi paga bene e in tempo? Che settore, dimensione, come li hai trovati? Replica quel profilo invece di inseguire chiunque.",
      },
      { type: "h3", text: "2. Alza il posizionamento" },
      {
        type: "p",
        text: "Se competi solo sul prezzo, perdi sempre contro chi costa meno. Comunica valore, risultati, garanzie. Vedi [come farsi pagare di più](/blog/come-farsi-pagare-di-piu-prodotti-servizi).",
      },
      { type: "h3", text: "3. Filtra in ingresso" },
      {
        type: "p",
        text: "Non ogni privato merita il tuo tempo. Prequalifica prima della call commerciale. [Come smettere di essere contattato solo per informazioni gratuite](/blog/smettere-contatti-solo-informazioni-gratuite).",
      },
      { type: "h3", text: "4. Costruisci un canale di acquisizione" },
      {
        type: "p",
        text: "Non aspettare che arrivino. Un sistema che porta privati in target ogni mese ti dà leve negoziali che il passaparola non ti dà. [Come acquisire clienti B2B in Campania](/blog/come-acquisire-clienti-b2b-campania).",
      },
      {
        type: "quote",
        text: "Le gare sono un canale. Non sono la risposta a un problema di vendita.",
      },
      { type: "cta", text: "Vuoi capire se il problema è il canale o il processo?" },
    ],
  },
];
