# Regole del sito forgegroup.it

**Versione 1, 29 settembre 2026.** Decise con la proprietà sulla landing `/inizia` e sull'analisi della
comunicazione del 29/09 (Drive, `01 - Comunicazione`). Valgono per ogni pagina, ogni sezione nuova e
ogni modifica, fatta da una persona o da un dipendente AI.

**Prima di aprire una PR:** `npm run controlla:sito` deve dare **0 errori**. Controlla da solo numeri,
parole vietate, lineette lunghe, titoli e descrizioni per Google. Il resto di questo file si controlla
a occhio sull'anteprima, dal telefono.

Se una regola va cambiata, si cambia qui (e nella Scheda dei fatti se è un fatto), non in una pagina sola.

---

## 1 · SPAZI E LARGHEZZE

Le misure stanno in `src/components/blocchi/ui.tsx` e si usano da lì, mai riscritte a mano.

| Nome | Valore | Dove |
|---|---|---|
| `SEZIONE` | `py-20 md:py-28` | sopra e sotto ogni sezione, tutte uguali |
| `CONTENITORE` | `mx-auto max-w-6xl px-5 sm:px-6 lg:px-8` | ogni sezione: così tutti i bordi della pagina sono allineati |
| `STRETTO` | `mx-auto max-w-4xl` | un testo che deve stare più stretto si restringe **dentro** il contenitore |
| `STACCO` | `mb-16 md:mb-20` | fra un blocco e l'altro della stessa sezione |
| sotto un titolo | `mb-12 md:mb-16` | già dentro `<Titolo>` |

- **Hero:** `pt-14 pb-20 md:pt-20 md:pb-28`, stesso contenitore delle sezioni.
- **Due colonne:** `grid gap-12 lg:grid-cols-2 lg:gap-16`. Da telefono una colonna sola, prima il testo.
- **Prima il telefono:** tutto si guarda a 375 px di larghezza, senza zoom e senza scorrere di lato.

## 2 · COLORI E SFONDI

Colori solo dai token di `globals.css`: bianco, panna, corallo (`#c8502a`), mattone (`#6f2a12`).

- **Niente nero** come colore di sfondo o di sezione.
- **Solo due sfondi in tutto il sito: bianco e mattone.** Dal 29/09 il token panna è bianco e le
  sezioni corallo sono mattone (blocco "Due soli sfondi" in fondo a `globals.css`).
- **Solo due sfondi di sezione: bianco (`section-bianco`) e mattone (`section-mattone`)**, alternati
  sotto la hero (che è panna). Niente `section-sabbia`, niente riquadri, schede o celle tinte di panna
  o di verde (proprietà, 29/09: "troppe varianti di sfondo non va bene"). Le schede sono bianche.
- Due sezioni dello stesso colore non stanno una dopo l'altra, se la struttura della pagina lo
  permette; sulle pagine esistenti si sistemano i colori **senza togliere o spostare sezioni**.
- **Schede chiare sul mattone:** `card-xl superficie-chiara`. Il testo scuro torna leggibile da solo.
- **Il verde** solo nel tasto WhatsApp e nelle spunte di "per chi è" e dello studio di fattibilità.
- **Le scene fatte con l'AI** portano sempre la scritta "Immagine generata con AI" (componente `ScenaAI`).

## 3 · PULSANTI

| Pulsante | Classe | Quando |
|---|---|---|
| Principale, corallo pieno | `btn-hero btn-hero-caldo` nella hero, `btn-corallo` altrove | **una sola volta per pagina**: è il colore del "qui si clicca" |
| Secondario | `btn-hero btn-hero-freddo` nella hero, `btn-ghost` altrove | tutti gli altri |

- **I testi dei pulsanti** dicono cosa succede: "Richiedi lo studio di fattibilità", "Candida la tua
  impresa", "Guarda come lavoriamo". Mai "Scopri di più", "Clicca qui", "Hai un minuto?".
- **La freccia** dice dove porta: ↓ più giù nella stessa pagina, ↗ un'altra pagina.
- **Sulla landing `/inizia`** nessun pulsante porta fuori dalla pagina (resta solo WhatsApp).

## 4 · TITOLI

- **Una sola H1 per pagina.**
- **Titoli di sezione: tutti `heading-section-xl`, centrati, con l'occhiello `eyebrow-rule` sopra**
  (`<Titolo occhiello="…">` o `SectionHeader`). Stessa misura e stesso grassetto ovunque: il modello è
  "Non lavoriamo con tutte le imprese. Leggi prima di candidarti.". Mai `heading-section`, mai un
  titolo spezzato in due misure (proprietà, 29/09).
- **Una frase non si spezza fra titolo e sottotitolo**: il titolo è una frase completa, il
  sottotitolo un'altra, con la maiuscola.
- **Solo la prima lettera maiuscola.** Niente titoli tutti in maiuscolo.
- **La parola chiave in `<Chiave>`**: corallo sul bianco; sul mattone diventa da sola evidenziatore.
  Una o due parole chiave per titolo, non di più.
- Sottotitoli di scheda (`h3`): `font-display text-xl font-bold`.

## 5 · TESTI E NUMERI

- **I fatti** solo dalla `Scheda dei fatti Forge`. **La costruzione** dalle `Regole di comunicazione
  v2`. **La voce** dal `Campione di voce`.
- **I numeri** solo da `src/data/prove.ts`, che copia la tabella "Numeri" della Scheda. Un numero
  nuovo si aggiunge prima alla Scheda, poi a `prove.ts`. Lo script blocca ogni cifra in euro o in
  percentuale che non viene da lì.
- **Parole vietate** (lo script le blocca): garanzia e promessa (anche negate), gratuito, CRM (si
  scrive "gestionale"), lead, funnel, pipeline, prequalifica, B2B, prevedibile, scalabile, "ti
  insegniamo", commesse (si scrive "contratti"), le parole vuote.
- **Niente lineetta lunga** "—": due punti o virgola.
- Forge **non chiama i contatti** del cliente e **non va agli incontri**: li segue *con* il titolare.
- "In tutta Italia", mai regioni che restringono. Mai prezzi.
- Ogni problema ha accanto la sua soluzione, detta come meccanismo ("Con Forge").

## 5 BIS · LE PAROLE CHIAVE (proprietà, 29/09)

- **Ogni paragrafo o scheda mette in evidenza la sua frase chiave: corallo e grassetto**, con
  `<strong className="chiave">` oppure `<Evidenzia testo={…} chiave="…" />` (da
  `src/components/blocchi/ui.tsx`). Nei titoli la parola chiave è `<Chiave>`.
- Una, al massimo due per paragrafo: la cosa che il titolare deve portarsi via se legge solo quella
  (il meccanismo, il risultato, il problema). Mai parole a caso, mai frasi intere di tre righe.
- Sul mattone la classe `chiave` diventa pesca da sola; nelle schede chiare sul mattone torna corallo.
- Servono anche a Google e alle intelligenze artificiali: dicono di cosa parla il blocco.

## 6 · IMMAGINI

Le regole complete sono in testa a `src/data/images.ts`. In breve: percorsi solo lì, sempre
`next/image` con `sizes`, una sola `priority` per pagina, rapporto fisso, file sotto i 300 KB, `alt`
che dice cosa si vede, foto vere accanto ai numeri, scene AI con la scritta.

## 7 · GOOGLE E INTELLIGENZE ARTIFICIALI

- **Titolo della pagina** entro 60 caratteri, con la parola che il titolare cerca ("imprese edili",
  "gestionale"). **Descrizione** fra 140 e 155 caratteri. Lo script lo controlla.
- `alternates.canonical` su ogni pagina. Le pagine fuori da Google (`/inizia`) hanno
  `robots: { index: false }`.
- **Le FAQ** con `JsonLdFAQ`, scritte come le domande che si fanno a Google.
- **Tre righe di sintesi in alto** sulle pagine chiave (il problema, la causa, cosa cambia).
- **Link interni:** ogni pagina porta ad almeno un caso studio; nessuna pagina orfana. Una pagina nuova
  va aggiunta a `STATIC_SEO_ROUTES` (`src/lib/seo/site.ts`) per la sitemap.
- **`/llms.txt` e le versioni `/index.md`** (`src/lib/aiSeo/mirrors.ts`) sono quello che leggono ChatGPT
  e le risposte di Google: solo fatti della Scheda, mai prezzi.

## 8 · TRACCIAMENTO

- **Google Analytics 4 si carica sempre, con Consent Mode v2** (dal 29/09/2026, PR #25): il widget
  iubenda parte prima e imposta il consenso Google a "negato" finché il visitatore non sceglie dal
  banner. Chi rifiuta viene contato solo in forma anonima. Non si aggiungono altri script di
  tracciamento senza passare da iubenda.
- **Gli eventi, e solo questi:**

| Evento | Parametri | Quando |
|---|---|---|
| `generate_lead` | `form_name` = la sorgente (`contatti`, `inizia`, …) | invio riuscito del modulo di candidatura |
| `whatsapp_click` | `posizione` (attributo `data-wa`), `pagina` | tocco su qualunque link WhatsApp |
| `newsletter_signup` | `location` | iscrizione alla newsletter |

- **Ogni modulo nuovo passa la sua `sorgente`** (`<ContattiFormLoader sorgente="…" />`), così le
  candidature si contano pagina per pagina. **Ogni link WhatsApp nuovo ha `data-wa`.**
- **Mai dati personali** negli eventi né negli indirizzi (niente nome, telefono o email nei parametri).
- In GA4 `generate_lead` è l'evento chiave.

## 9 · COME SI LAVORA

1. Un branch per ogni modifica, mai su `main`.
2. I testi nuovi con la skill ai-copywriter e il Revisore; i testi già approvati si riusano dai blocchi
   (`src/components/blocchi`, `src/data/blocchi.tsx`).
3. `npm run controlla:sito` (0 errori), `npx tsc --noEmit`, e l'anteprima guardata dal telefono.
4. PR con anteprima Vercel. Il merge lo fa la proprietà.
