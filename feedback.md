# Feedback & Linee Guida: Comunicazione Forge Group

> File di riferimento per le modifiche al sito e per la voce del brand.  
> Aggiornato: giugno 2026

---

## 1. Voce e Tono del Brand

**Chi siamo:**  
Forge Group è la prima realtà italiana di Growth Hacking pensata per imprese B2B.  
Non siamo un'agenzia che "fa comunicazione": siamo un partner operativo che entra nel business del cliente, costruisce un sistema di acquisizione e vendita prevedibile, e lo fa crescere con dati e metodo.

**Tono:**
- Diretto, concreto, senza gergo vuoto
- Parla all'imprenditore, non al marketing manager
- Usa la seconda persona singolare ("la tua azienda", "il tuo commerciale")
- Ogni frase deve avere un'utilità: o informa, o convince, o spinge all'azione
- Evita: "innovativo", "full-service", "a 360°", "partner affidabile", "soluzioni su misura" (cliché da agenzia)
- Usa: numeri reali, verbi d'azione, benefici concreti

**Terminologia (regola fissa):**
- **Mai scrivere "prodotto"** nel copy del sito e in questo file
- Usare invece **"prodotti e servizi"**: chi vende high ticket non vende un prodotto fisico, ma soluzioni, software, consulenza o servizi complessi
- Esempi: "quando un cliente cerca i tuoi prodotti e servizi online" (non "il tuo prodotto"); "non per i prodotti e servizi, ma per il processo" (non "per il prodotto")

**Parole chiave del brand:**
- Sistema prevedibile di acquisizione
- Dal lead al contratto firmato
- Metodo FORGE
- Growth Hacking B2B
- Risultati misurabili

**Palette testi (regola fissa):**
- Sfondo bianco/panna → testo principale **nero**, parole chiave **corallo** (mai intere frasi di un solo colore)
- Sfondo corallo → testo principale **bianco**, parole chiave **pesca chiaro**
- Non alternare frasi intere nero/corallo: evidenziare solo le keyword

**Sezioni bianche (regola fissa):**
- Tutte le **sezioni di pagina** con sfondo bianco usano la classe CSS **`section-bianco`** (`globals.css`)
- **Stessa opacità delle sezioni corallo:** `color-mix(in srgb, bianco 90%, transparent)` — il logo 3D si intravede appena, non domina
- **Niente** `backdrop-blur` sulle sezioni (come `section-coral`)
- Variante bordo sopra e sotto: **`section-bianco-y`** (es. loghi clienti)
- **Non** usare bianco pieno né trasparenza eccessiva (70% o meno) sulle sezioni di contenuto
- **Eccezione:** fascia CTA del footer (`Footer.tsx`) resta **`bg-brand-bianco`** pieno
- Card, form, navbar e pill interne restano bianco pieno dove serve contrasto

**Punteggiatura italiana (regola fissa):**
- **Mai usare il trattino** (`-` o `—`) come punteggiatura nelle frasi: è un pattern tipico dell'IA e suona innaturale in italiano
- Al suo posto: virgola, due punti, punto o parentesi (es. *"Stai crescendo, o stai solo lavorando di più?"* non *"Stai crescendo — o stai..."*)
- Vale per copy sito, FAQ, casi studio, blog e CTA
- Per titoli SEO e separatori: usare `|` (es. `Forge Group | Servizi`)
- Per elenchi numerati servizi: usare il punto medio `·` (es. `01 · Acquisizione Clienti`)
- Per intervalli: `da X a Y` o `tra X e Y` (es. `da 1.500€ a 2.500€ / mese`)

**CTA: testi consentiti**
- Footer standard (tutte le pagine tranne casi studio): titolo *"Contattaci e parliamone davanti un caffè. Scopri come possiamo esserti utile."* + bottone **"HAI UN MINUTO?"**
- Footer casi studio (`/casi-studio` e `/casi-studio/[slug]`): titolo *"Vuoi un sistema come questo per la tua azienda?"* + bottone **"OTTIENI UNA CONSULENZA GRATUITA"**
- Navbar: **"Hai un minuto?"**
- Pagina `/servizi` (hero e sezioni servizi): **"Ottieni una consulenza gratuita"**

**Footer CTA strip (regola fissa):**
- Presente su **tutte le pagine**, stesso componente `Footer.tsx`
- Sfondo: **bianco** (`bg-brand-bianco`), testo nero con keyword corallo
- Eyebrow (sempre uguale): *"✦ Pronto a smettere di improvvisare?"*
- Solo testo titolo e bottone cambiano su `/casi-studio*`

**Mai usare sul sito:** "senza impegno" (né in CTA né in microcopy)

---

## 2. Metodo FORGE: Testi definitivi (5 fasi)

Acronimo **F.O.R.G.E.** — una fase per lettera, con descrizione e pill «Per te».

| Lettera | Titolo | Takeaway |
|---------|--------|----------|
| **F** | Formazione | una strategia su misura, non un copia-incolla |
| **O** | Organizzazione | basi solide, niente più caos |
| **R** | Reputazione | i clienti ti scelgono prima ancora di chiamarti |
| **G** | Gestione | contatti che si trasformano in incassi |
| **E** | Economia | numeri reali, non vanity metrics |

**Schema visivo:** strip lettere F.O.R.G.E., righe con lettera grande + testo verticale, descrizione e pill. Footer: «rincorre → sceglie». Componente: `MetodoForge.tsx`.

---

## 3. Sezione Clienti

**Titolo:** "Imprese che hanno scelto di crescere con noi"  
**Eyebrow:** "✦ Alcuni dei nostri clienti"

**Note loghi:**  
I file PNG hanno sfondo bianco integrato. Per una versione monocromatica corallo (più coerente con la palette) servono i loghi in SVG o PNG con sfondo trasparente. Da richiedere ai clienti o estrarre manualmente.

---

## 4. Caso studio DISA SRL / SOS APPALTI (testi definitivi)

Caso studio reale, slug `software-b2b`. Cliente: **DISA SRL**, software **SOS APPALTI** (gestionale B2B di nicchia). Ticket sempre generico: **oltre 12.000€** (mai citare la cifra esatta).

**Settore:** Software B2B · **Mercato:** Italia · **Periodo:** 90 giorni (+ evoluzione)

**La sfida (prima di Forge):**  
DISA fatturava già oltre 1 milione di euro all'anno, ma trovava nuovi clienti solo con chiamate, referenze e passaparola. Nessun sistema per intercettare chi non conosceva ancora SOS APPALTI: i commerciali percorrevano anche più di 50 km per appuntamenti con persone che non sapevano cosa fosse il software né perché potesse servirgli.

**Diagnosi:**
- Nessun canale di acquisizione prevedibile oltre al passaparola
- Contatti non consapevoli del software e della sua utilità
- Appuntamenti senza reale interesse e tassi di chiusura bassi
- Mercato limitato al territorio, impossibile da scalare

**Il sistema (5 step):**
1. Comunicazione & posizionamento di SOS APPALTI
2. Contenuti professionali (video + infografiche, con videomaker)
3. Sistema di acquisizione Meta Ads (lead generation + gestione budget)
4. Form di qualifica per contatti già consapevoli
5. Lancio geolocalizzato (250 km) e poi scala in tutta Italia

**Risultati:**
- +126k di fatturato nei primi 90 giorni
- €1,48 costo per contatto (fino a max €3 nei primi mesi)
- ~550 contatti generati, già consapevoli e in target
- +350k di fatturato ad oggi (cliente ancora attivo e in crescita)

**Cosa è successo dopo:**  
I €126.500 sono arrivati nei primi 90 giorni. DISA è ancora oggi cliente e ha già superato i €350.000 di fatturato. Non dipende più dal passaparola: lavora solo con le campagne di acquisizione, i commerciali parlano con clienti già interessati, il tasso di chiusura è cresciuto. Sistema funzionante, testato, di proprietà dell'azienda e scalabile in tutta Italia.

**URL pubblici:** hub `/casi-studio` + dettaglio `/casi-studio/[slug]` (es. `software-b2b`).

**Loghi clienti (`public/images/clienti/`):**
- File canonici: `cliente-disa.png` · `cliente-tettitop.png` · `cliente-rovi.png` · `cliente-sos-appalti.png` · `cliente-eva-consulting.png` · `cliente-hotel-dream.png`
- Mappa centralizzata: `src/data/clientLogos.ts` → `caseStudyLogosBySlug` (slug → logo cliente corretto)
- Casi studio: spread `...caseStudyLogosBySlug[slug]` in `caseStudies.ts` — non duplicare path a mano
- Software B2B: anche `productLogo` SOS Appalti in sezione contesto
- Componente: `CaseStudyClientLogo.tsx` (box dimensione fissa + `fill`, **solo PNG scontornato**, nessun box/pill/sfondo dietro al logo)
- **Pagina dettaglio** `/casi-studio/[slug]`: hero corallo con badge Forge + cliente; sezione **Il Contesto** (fascia bianca) con **nome cliente grande** a sinistra, **logo grande** a destra (`CaseStudyClientLogo` size `2xl`), eyebrow `+ Il Contesto`, card contesto a griglia 3 colonne (label corallo + valore). Campo `Azienda` nel nome header, non ripetuto nelle card. Software B2B: anche `productLogo` SOS accanto al logo DISA. Hub e carousel: badge logo su foto.
- Scontorno: `scripts/remove-logo-background.py` (rimuove sfondo bianco e nero dai bordi). Asset aggiornati giugno 2026 dai PNG forniti dal cliente.

**Hub `/casi-studio` (layout card):**
- Hero: solo eyebrow + H1 *Risultati Dimostrabili* + **loghi clienti** (`clientLogo` da ogni caso: DISA, Tetti Top, ROVI). Nessun sottotitolo descrittivo.
- Card: foto 16:9 (`aspect-video`, `object-cover object-center`), badge settore, logo cliente in alto a destra, **titolo su foto in bianco** (`text-brand-bianco`).
- Corpo card: `resultHeadline` in corallo + **`hubExcerpt`** (testo breve, campo dedicato in `caseStudies.ts`, non l'`excerpt` lungo).
- CTA: pulsante **`btn-corallo`** full width *Leggi il caso studio* (Link separato, non testo inline).
- Immagini casi studio: `public/images/casi-studio/{slug}.jpg`, 1920×1080.

**Sezione prima/dopo (template obbligatorio):**
- Componente: `CaseStudyBeforeAfter.tsx`
- Dati: `beforeAfter[]` in `caseStudies.ts` (campo `aspect`, `before`, `after`)
- Layout: tabella 2 colonne (Senza sistema / Con Forge Group), stile come confronto homepage
- Intestazioni opzionali: `evolutionEyebrow`, `evolutionHeading`, `evolutionHeadingHighlight`
- Badge opzionale: `statusBadge` (progetti in corso, es. ROVI)

---

## 4b. Caso studio Edilizia B2C (testi definitivi)

Caso studio reale, slug `edilizia`. **Nome pagina:** Edilizia B2C. Cliente: **Tetti Top**, azienda a conduzione familiare.

**Settore:** Edilizia B2C · **Mercato:** locale geolocalizzato · **Modello:** passaparola → sistema organico

**La sfida (prima di Forge):**  
Azienda eccellente sul campo, ma clienti imprevedibili. Mesi pieni e mesi vuoti, risposte a chiunque chiedeva un preventivo, zero visibilità online nella zona.

**Diagnosi:**
- Flusso imprevedibile, impossibile pianificare crescita o assunzioni
- Nessuna selezione dei contatti in ingresso
- Invisibile online per chi cercava un'impresa locale
- Tempo sprecato su richieste che non chiudevano

**Il sistema (5 step):**
1. Sito web ad alte performance, geolocalizzato
2. Modulo di pre-qualifica con raccolta budget
3. Chiamate di pre-qualifica
4. Sopralluoghi qualificati con tecnico e titolare
5. Presenza online completa (social, Google Business, video recensione)

**Risultati:**
- 4 clienti qualificati al mese (media, scala da azienda di famiglia)
- 0€ investiti in advertising a pagamento
- Preventivo più alto generato: 175.000€ + IVA
- Agenda piena, lavori a calendario bloccato

**Nota sui numeri:** i 175.000€ + IVA sono il valore del preventivo più alto generato dal sistema (trasparenza sulla qualità delle trattative).

**URL:** `/casi-studio/edilizia` · Nessuna video recensione (solo testo e numeri).

---

## 4c. Caso studio ROVI (testi definitivi)

Caso studio **progetto attivo**, slug `arredo-commerciale`. **Nome pagina:** Edilizia B2B (arredamento negozi). Cliente: **ROVI Srl**.

**Settore:** Edilizia B2B · **Ticket:** ~25.000€ · **Obiettivo:** +300k fatturato aggiuntivo in 12 mesi (traguardo, non risultato chiuso)

**Hero:** 40 anni di storia. Un sistema nuovo da zero.

**Diagnosi chiave:**
- Solo passaparola, zero canali attivi
- 36 progetti gratuiti persi l'anno su lead non qualificati
- Vendita artigianale senza CRM né pipeline
- ~10 incontri per contratto, 70% lead senza budget

**Sistema (6 step):** posizionamento, 3 processi commerciali, progettazione a pagamento, prequalifica, Meta Ads, pipeline appuntamenti.

**Sezione risultati:** milestone operative (non numeri di fatturato chiuso). Badge: *Progetto attivo · aggiornamenti in arrivo*.

**URL:** `/casi-studio/arredo-commerciale` · Immagine: `arredo-commerciale.jpg` (pasticceria di lusso, 16:9). Logo: `rovi.png` su carousel, hub e pagina dettaglio.

---

## 4d. Caso studio Hospitality (testi definitivi)

Caso studio reale, slug `hotel-hospitality`. **Nome pagina:** Hospitality. Cliente **non pubblicato** (hotel sotto nuova gestione).

**Settore:** Hospitality · **Risultato:** 258+ prenotazioni in 48 ore, ~20.000€ di valore

**Hero:** 258 prenotazioni in 48 ore.

**Sistema (5 step):** consulenza, ottimizzazione OTA, contenuti/foto, sito + Google Business + recensioni, lancio OTA con ads.

**Logo cliente:** Dream Hotel (`cliente-hotel-dream.png`) in hub, carousel, hero e sezione contesto. Immagine: `hotel-hospitality.jpg`.

**URL:** `/casi-studio/hotel-hospitality`

---

## 5. Landing Page Servizi (`/servizi`)

Sotto-pagine servizi (`/servizi/acquisizione-clienti`, ecc.) **non pubblicate**: codice conservato in `src/_drafts/servizi/[slug]/`.

La pagina `/servizi` è ora una landing page conversion-focused con 4 sezioni:

### Sezione 1: Hero
- **Headline:** "La tua azienda sta perdendo clienti ogni giorno. E il problema non è il mercato."
- **Sottotitolo:** sistema che in 90 giorni ha generato 126.500€ per un cliente B2B
- **CTA:** "Ottieni una consulenza gratuita" → `/contatti`
- **Microcopy:** "Solo 3 posti disponibili questo mese."

### Sezione 2: Agitazione del dolore
- **Titolo:** "Fermati un secondo. Riconosci questa situazione?"
- 4 domande con risposta (formato Q&A)
- **Chiusura:** "Non è colpa tua. Nessuno ti ha mai costruito un sistema vero. Noi lo facciamo."

### Sezione 3: I tre servizi
- **Titolo:** "Riconosci qualcuno di questi problemi?"
- 01 Acquisizione Clienti / 02 Processi di Vendita / 03 Consulenza e Formazione
- **Sidebar card:** numero grande corallo, titolo servizio corallo, divisorio, domanda intro con keyword corallo, foto imprenditore PNG scontornato nello spazio centrale sopra CTA, pulsante glass corallo su due righe (*Ottieni* / *una consulenza gratuita*) con freccia
- **Asset sidebar:** `public/images/servizi/imprenditore-{acquisizione,vendite,consulenza}.png` (3 immagini IA distinte, stile fotografico realistico)
- Colonna destra: card domanda + reframe (pattern domanda → risposta breve)
- Anchor: `#acquisizione`, `#vendite`, `#consulenza`

### Sezione 4: Prova sociale
- **Titolo:** "Non ti chiediamo di fidarti. Ti chiediamo di guardare i numeri."
- Card con cliente B2B software, partenza, azione, risultato 126.500€ in 90 giorni
- Link: "Leggi il caso completo →" verso `/casi-studio`

### CTA finale
- Ripetizione CTA verso `/contatti`

---

## 6. Modifiche implementate (log)

- [x] Sezioni corallo con palette leggibile (bianco/nero/pesca-light per testi e keyword)
- [x] Tabelle comparative sempre a 2 colonne su mobile con ✕/✓ e separatori
- [x] Rimossa CTASection da tutte le pagine (CTA resta solo nel footer)
- [x] Footer: fascia CTA bianca + corpo link `bg-brand-corallo`; varianti testo su `/casi-studio`
- [x] Regola sezioni bianche: classe `section-bianco` applicata su tutto il sito
- [x] Navbar: pulsante "Hai un minuto?" nascosto su mobile/tablet
- [x] Hero pagine servizi: layout due colonne con pillars card
- [x] Rimossa sezione pain-points (bg-nero) da pagine servizi
- [x] Aggiunta sezione loghi clienti con marquee animato nella pagina /servizi
- [x] Loghi croppati e normalizzati per dimensione ottica uniforme
- [x] Loghi spostati sopra Metodo Forge nella pagina /servizi
- [x] Metodo FORGE: acronimo F.O.R.G.E. con strip lettere, 5 fasi descritte e pill «Per te»
- [x] Caso studio DISA/SOS APPALTI riscritto con la storia reale + sezione "Cosa è successo dopo"
- [x] Naming uniformato a "DISA SRL" + software "SOS APPALTI" (home, hub, caso studio)
- [x] Pagine servizi: sezioni "Ti riconosci in questo?" (painPoints) e "È per te" (forWho) in palette
- [x] Foto Gianpio ricentrata (object-position per-membro nella TeamSection)
- [x] Sotto-pagine servizi archiviate in `src/_drafts/` (non accessibili, redirect 301 → `/servizi`)
- [x] `/casi-studio` hub con card + `/casi-studio/[slug]` per ogni caso (DISA/SOS APPALTI su `software-b2b`)
- [x] `/servizi` trasformata in landing page a 4 sezioni + CTA
- [x] Navbar e Footer semplificati: link diretti senza sotto-menu
- [x] Sitemap aggiornata: rimosse route `/servizi/[slug]`; route `/casi-studio/[slug]` attive
- [x] Video recensione integrato nel caso studio con poster homepage
- [x] Rimossi trattini come punteggiatura da tutti i testi del sito (regola in feedback.md)

---

## 7. Modifiche da fare (backlog)

- [ ] Ripubblicare sotto-pagine servizi quando pronte (bozze in `src/_drafts/servizi/`)
- [ ] Ottenere loghi clienti in SVG/PNG con sfondo trasparente per versione monocromatica corallo
- [x] Caso studio Edilizia B2C aggiunto (`/casi-studio/edilizia`, cliente Tetti Top)
- [x] Caso studio Edilizia B2B / ROVI aggiunto (`/casi-studio/arredo-commerciale`, progetto attivo)
- [x] Hub casi studio: loghi clienti in hero, `hubExcerpt` breve, titoli foto bianchi, CTA `btn-corallo`
- [x] Loghi clienti rinominati correttamente + scontorno sfondo bianco (trasparenza PNG)
- [x] Loghi corretti in tutte le sezioni casi studio via `clientLogo` (+ `productLogo` SOS per DISA)
- [x] Caso studio Hospitality aggiunto (`/casi-studio/hotel-hospitality`, logo Dream Hotel)
- [x] Sezione contesto casi studio: template nome grande + logo + card (giugno 2026)
- [x] `/contatti`: form multi-step tipo Typeform + banner `SocialProof` sopra il questionario
- [x] Navbar: logo e wordmark leggermente ingranditi
- [ ] Aggiungere altri casi studio (quando disponibili)
- [ ] Valutare una sezione "press/menzioni" se ci sono coperture media
- [ ] Revisione SEO completa: meta title, description e structured data per ogni pagina
- [ ] Aggiungere video testimonianze aggiuntive oltre al caso DISA
- [ ] Valutare schema FAQ con markup JSON-LD per SEO
