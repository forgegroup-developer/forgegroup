import type { Article } from "@/data/articles";

/**
 * Articoli programmati — pubblicazione automatica via publishAt + Vercel Cron.
 * Orari: 09:00 ora di Roma (07:00 UTC, luglio = CEST).
 */
export const scheduledArticles: Article[] = [
  {
    slug: "come-farsi-pagare-di-piu-prodotti-servizi",
    title: "Come Farsi Pagare di Più per Prodotti e Servizi (Senza Perdere Clienti)",
    description:
      "Strategie concrete per aumentare prezzi e margini senza spaventare i clienti: posizionamento, packaging dell'offerta e processo commerciale.",
    category: "Pricing e Margine",
    date: "2026-07-09",
    publishAt: "2026-07-09T07:00:00.000Z",
    updatedDate: "2026-07-09",
    readTime: "8 min",
    excerpt:
      "Se lavori tanto ma il fatturato non cresce come vorresti, il problema spesso non è il volume: è quanto ti pagano per ogni cliente.",
    tags: ["pricing", "margini", "aumentare prezzi", "vendita b2b", "posizionamento"],
    faqs: [
      {
        q: "Posso alzare i prezzi senza perdere clienti?",
        a: "Sì, se lo fai con un posizionamento più chiaro e un'offerta che comunica valore percepito, non solo costo. L'aumento improvviso senza contesto è quello che fa scappare i clienti.",
      },
      {
        q: "Ogni quanto posso rivedere i listini?",
        a: "Per servizi B2B, una revisione annuale è normale. Per nuovi clienti puoi applicare subito il nuovo pricing; per quelli esistenti conviene una transizione graduale.",
      },
      {
        q: "Come giustifico un prezzo più alto al cliente?",
        a: "Con risultati misurabili, casi studio, garanzie chiare e un processo che riduce il rischio percepito. Il cliente paga per il problema che risolvi, non per le ore che lavori.",
      },
      {
        q: "Meglio scontare o aggiungere un servizio premium?",
        a: "Quasi sempre meglio un tier premium. Lo sconto abitua il mercato a chiedere sempre meno; il premium educa il cliente a scegliere valore.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Lavori bene, consegni in tempo, i clienti sono soddisfatti — ma a fine mese i numeri non tornano. Il problema non è sempre che devi trovare più clienti. Spesso è che ti pagano meno di quanto vale quello che fai. In questo articolo vediamo come aumentare prezzi e margini senza bruciare la reputazione.",
      },
      { type: "h2", text: "Perché ti pagano poco (anche se sei bravo)" },
      {
        type: "ul",
        items: [
          "Offerta generica: sembri uguale ai concorrenti e il cliente confronta solo il prezzo",
          "Preventivi senza contesto di valore: invii un numero, non una soluzione",
          "Paura di perdere il cliente: ogni trattativa finisce con uno sconto",
          "Nessun tier premium: vendi solo la versione base del tuo servizio",
        ],
      },
      { type: "h2", text: "5 leve per farsi pagare di più" },
      { type: "h3", text: "1. Ridisegna il packaging dell'offerta" },
      {
        type: "p",
        text: "Invece di un unico listino, crea 2-3 livelli (Base, Pro, Premium). Il cliente medio sceglierà il livello intermedio; chi vuole il massimo pagherà di più senza che tu debba negoziare.",
      },
      { type: "h3", text: "2. Ancora il prezzo al risultato, non alle ore" },
      {
        type: "p",
        text: "Un preventivo che dice '40 ore a 80€/ora' invita al confronto. Un preventivo che dice 'sistema che porta 15 appuntamenti qualificati al mese' invita alla conversazione sul valore.",
      },
      { type: "h3", text: "3. Filtra i clienti che cercano solo il prezzo più basso" },
      {
        type: "p",
        text: "Comunicazione chiara fin dall'inizio: per chi è il tuo servizio e per chi no. Meno lead, ma più clienti disposti a pagare il giusto. Approfondisci in [come smettere di essere contattato solo per informazioni gratuite](/blog/smettere-contatti-solo-informazioni-gratuite).",
      },
      { type: "h3", text: "4. Mostra prove, non promesse" },
      {
        type: "p",
        text: "Casi studio con numeri, testimonianze, prima/dopo. Un cliente che vede risultati concreti accetta un prezzo più alto con meno resistenza. Guarda i nostri [casi studio verificati](/casi-studio).",
      },
      { type: "h3", text: "5. Struttura un follow-up che non lascia il preventivo morire" },
      {
        type: "p",
        text: "Molti preventivi non vengono rifiutati: vengono dimenticati. Un processo di follow-up strutturato recupera vendite che oggi perdi in silenzio. Leggi [perché i clienti spariscono dopo il preventivo](/blog/perche-clienti-spariscono-dopo-preventivo).",
      },
      {
        type: "quote",
        text: "Il cliente non paga per quello che fai. Paga per il problema che non avrà più.",
      },
      {
        type: "p",
        text: "Se vuoi costruire un sistema che porta clienti disposti a pagare il giusto — non solo più contatti — scopri i nostri [servizi di acquisizione e vendita B2B](/servizi).",
      },
      { type: "cta", text: "Vuoi capire quanto margine stai lasciando sul tavolo?" },
    ],
  },
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
    slug: "come-aumentare-numero-clienti-attivita",
    title: "Come Aumentare il Numero di Clienti della Tua Attività",
    description:
      "Guida pratica per PMI e professionisti che vogliono più clienti ogni mese con metodo, non con tentativi casuali.",
    category: "Acquisizione Clienti",
    date: "2026-07-14",
    publishAt: "2026-07-14T07:00:00.000Z",
    updatedDate: "2026-07-14",
    readTime: "8 min",
    excerpt:
      "Più clienti non significa più sforzo casuale. Significa un sistema che porta ogni mese nuove opportunità commerciali misurabili.",
    tags: ["aumentare clienti", "crescita aziendale", "lead generation", "pmi"],
    faqs: [
      {
        q: "Quanti clienti nuovi al mese sono un buon obiettivo?",
        a: "Dipende dal ticket medio e dalla capacità del team commerciale. L'obiettivo giusto è avere abbastanza clienti qualificati da raggiungere il target di fatturato con un tasso di chiusura sostenibile.",
      },
      {
        q: "Meglio più clienti o clienti che pagano di più?",
        a: "Idealmente entrambi, ma se devi scegliere: meno clienti che pagano bene battono molti clienti a basso margine. Leggi [come farsi pagare di più](/blog/come-farsi-pagare-di-piu-prodotti-servizi).",
      },
      {
        q: "Serve un sito web nuovo per avere più clienti?",
        a: "No. Serve una pagina di atterraggio efficace e un sistema che porti traffico qualificato su quella pagina. Il sito vetrina da solo non basta.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Vuoi più clienti. È l'obiettivo di quasi ogni imprenditore. Ma 'più clienti' senza metodo significa più ore spese, più preventivi persi e più frustrazione. La differenza la fa un sistema che genera contatti qualificati con regolarità.",
      },
      { type: "h2", text: "I 3 errori che impediscono di crescere" },
      {
        type: "ul",
        items: [
          "Confondere visibilità con acquisizione: like e visualizzazioni non sono clienti",
          "Non misurare: senza numeri non sai cosa funziona",
          "Improvvisare: ogni mese un canale diverso senza dare tempo a nessuno di rendere",
        ],
      },
      { type: "h2", text: "Il sistema in 4 passi" },
      { type: "h3", text: "1. Messaggio chiaro per un cliente specifico" },
      {
        type: "p",
        text: "Smetti di parlare a tutti. Scegli un segmento (settore, dimensione, problema) e costruisci tutta la comunicazione intorno a quello.",
      },
      { type: "h3", text: "2. Canale di acquisizione attivo" },
      {
        type: "p",
        text: "Passaparola + ads mirate + contenuti che attraggono il cliente giusto. Non uno solo: un mix controllato.",
      },
      { type: "h3", text: "3. Prequalifica prima della vendita" },
      {
        type: "p",
        text: "Non ogni contatto merita una call. Form con domande strategiche, call di discovery breve, lead scoring. Il commerciale parla solo con chi ha potenziale reale.",
      },
      { type: "h3", text: "4. Processo commerciale che chiude" },
      {
        type: "p",
        text: "Script, follow-up, CRM. Un lead che non viene richiamato entro 5 minuti ha il 80% di probabilità in meno di convertire. Vedi il [sistema di vendita B2B in 7 passi](/blog/sistema-vendita-b2b-dalla-lead-al-contratto).",
      },
      {
        type: "quote",
        text: "Non servono più clienti a caso. Servono più clienti giusti, ogni mese, con un costo sostenibile.",
      },
      { type: "cta", text: "Vuoi capire quanti clienti ti servono per il tuo obiettivo di fatturato?" },
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
    slug: "aumentare-clienti-smettere-passaparola",
    title: "Come Iniziare ad Aumentare i Clienti e Smettere di Dipendere dal Passaparola",
    description:
      "Primi passi concreti per costruire un flusso di clienti misurabile accanto al word-of-mouth, senza partire da zero.",
    category: "Acquisizione Clienti",
    date: "2026-07-21",
    publishAt: "2026-07-21T07:00:00.000Z",
    updatedDate: "2026-07-21",
    readTime: "6 min",
    excerpt:
      "Non devi scegliere tra passaparola e marketing. Devi aggiungere un canale che puoi misurare e scalare.",
    tags: ["passaparola", "primi passi", "acquisizione clienti", "crescita"],
    faqs: [
      {
        q: "Da dove inizio se non ho mai fatto marketing?",
        a: "Da tre cose: messaggio chiaro per un cliente specifico, una landing page, un canale test (Meta o LinkedIn) con budget contenuto. Non serve fare tutto insieme.",
      },
      {
        q: "Posso continuare a usare il passaparola mentre costruisco il sistema?",
        a: "Sì, anzi è consigliato. Il passaparola resta attivo; il nuovo canale si aggiunge gradualmente fino a diventare prevedibile.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Se oggi dipendi dal passaparola, non devi smettere da un giorno all'altro. Devi iniziare a costruire qualcosa accanto — un canale che puoi accendere, spegnere, misurare e migliorare. Ecco i primi passi concreti.",
      },
      { type: "h2", text: "Settimana 1: chiarezza" },
      {
        type: "p",
        text: "Rispondi a tre domande: chi è il cliente ideale oggi? Quale problema risolvi meglio di chiunque altro? Quanto può spendere? Senza queste risposte, ogni azione marketing è un tiro al buio.",
      },
      { type: "h2", text: "Settimana 2: asset minimo" },
      {
        type: "p",
        text: "Una landing page con headline chiara, 3 benefici, form di contatto con 3-4 domande di qualifica. Non un sito nuovo: una pagina che converte.",
      },
      { type: "h2", text: "Settimana 3-4: primo test a budget" },
      {
        type: "p",
        text: "Campagna Meta o LinkedIn con 500-800€ di test. Obiettivo: capire costo per lead e qualità. Se i lead non sono in target, il problema è messaggio o targeting — non il canale. Guida completa: [come smettere di dipendere dal passaparola](/blog/come-smettere-dipendere-passaparola).",
      },
      { type: "h2", text: "Mese 2-3: sistema e ottimizzazione" },
      {
        type: "p",
        text: "CRM, follow-up, script. Collega marketing e commerciale sugli stessi KPI. A questo punto hai due canali: passaparola + acquisizione attiva. Leggi [come aumentare il numero di clienti](/blog/come-aumentare-numero-clienti-attivita) per il quadro completo.",
      },
      {
        type: "quote",
        text: "Il primo cliente da marketing non arriva dal giorno alla notte. Ma arriva — e poi arriva di nuovo.",
      },
      { type: "cta", text: "Vuoi un piano su misura per la tua azienda?" },
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
