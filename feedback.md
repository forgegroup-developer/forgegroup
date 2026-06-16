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
- **Eccezione:** fascia CTA del footer (`FooterCtaBand`) usa **`bg-brand-bianco`** (sfondo bianco semplice, senza prism), non `section-coral`
- Card, form, navbar e pill interne restano bianco pieno dove serve contrasto

**Punteggiatura italiana (regola fissa):**
- **Mai usare il trattino** (`-` o `—`) come punteggiatura nelle frasi: è un pattern tipico dell'IA e suona innaturale in italiano
- Al suo posto: virgola, due punti, punto o parentesi (es. *"Stai crescendo, o stai solo lavorando di più?"* non *"Stai crescendo — o stai..."*)
- Vale per copy sito, FAQ, casi studio, blog e CTA
- Per titoli SEO e separatori: usare `|` (es. `Forge Group | Servizi`)
- Per elenchi numerati servizi: usare il punto medio `·` (es. `01 · Acquisizione Clienti`)
- Per intervalli: `da X a Y` o `tra X e Y` (es. `da 1.500€ a 2.500€ / mese`)

**CTA: testi consentiti**
- Footer standard (tutte le pagine tranne casi studio e `/contatti`):
  - Titolo: *"Contattaci e parliamone davanti un caffè."* (keyword: **caffè**)
  - Bottone: **"Scopri come possiamo esserti utile"** (`LightBeamButton` glass lg, alone bianco/corallo rotante)
- Footer casi studio (`/casi-studio` e `/casi-studio/[slug]`): *"Vuoi un sistema come questo per la tua azienda?"* + bottone **"OTTIENI UNA CONSULENZA GRATUITA"**
- Navbar: **"Hai un minuto?"**
- Pagina `/servizi` (hero e sezioni servizi): **"Ottieni una consulenza gratuita"**

**Footer CTA band (regola fissa):**
- Componente: `FooterCtaBand.tsx` (in `Footer.tsx`), nascosta su `/contatti`
- Sfondo: **`bg-brand-bianco`** semplice (nessun prism WebGL)
- Pannello CTA: card bianca con bordo (`footer-cta-band .cta-glass-panel`)
- Eyebrow (sempre uguale, corallo): *"✦ Pronto a smettere di improvvisare?"*
- **Titolo CTA:** `<h2>` (sezione principale del footer, non `<h3>`)
- **Layout:** titolo sopra, bottone **sotto** a tutta larghezza; testo pulsante su **una riga** (`whitespace-nowrap`)
- **Colori titolo:** testo **nero**; corallo **solo sulla keyword** (mai intere frasi corallo):
  - Standard keyword: **caffè**
  - Casi studio keyword: **tua azienda**
- Sottolineatura hand-drawn (`HandDrawnUnderline`) sulle keyword al scroll
- Bottone: `LightBeamButton` (`variant="glass"`, `size="lg"`, `fullWidth`); casi studio uppercase

**Pulsanti primari (regola fissa):**
- **Tutto il sito:** `btn-corallo` (hero, navbar, form, servizi, blog, recensioni)
- **Solo footer CTA:** `LightBeamButton` glass lg con contorno bianco-corallo rotante
- Sidebar servizi (`ServiziTabCard`): pill outline corallo (non `LightBeamButton`)

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
- CTA: pulsante **`LightBeamButton`** full width *Leggi il caso studio* (Link separato, non testo inline).
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

Sotto-pagine servizi (`/servizi/acquisizione-clienti`, ecc.) **non pubblicate**: redirect 301 → `/servizi` (contenuto rimosso dal repo, giugno 2026).

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
- **Asset sidebar:** PNG scontornati in `public/images/servizi/` (`imprenditore-acquisizione`, `imprenditore-vendite`, `imprenditrice-consulenza`). Ogni immagine deve rispecchiare la domanda intro sopra (es. consulenza: imprenditrice stanca, «stai crescendo o lavorando di più?»). Sfondo piatto uniforme in generazione, niente oggetti che sovrappongono il corpo, per facilitare rembg.
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
- [x] Footer: fascia CTA `FooterCtaBand` (prism originale + `LightBeamButton` alone rotante) + corpo link `bg-brand-corallo`
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
- [x] Sotto-pagine servizi rimosse dal repo; redirect 301 → `/servizi`
- [x] `/casi-studio` hub con card + `/casi-studio/[slug]` per ogni caso (DISA/SOS APPALTI su `software-b2b`)
- [x] `/servizi` trasformata in landing page a 4 sezioni + CTA
- [x] Navbar e Footer semplificati: link diretti senza sotto-menu
- [x] Sitemap aggiornata: rimosse route `/servizi/[slug]`; route `/casi-studio/[slug]` attive
- [x] Video recensione integrato nel caso studio con poster homepage
- [x] Rimossi trattini come punteggiatura da tutti i testi del sito (regola in feedback.md)
- [x] Gerarchia heading accessibile: footer CTA `h2`, FAQ `h3`, tab confronto con `<p>`, footer nav senza heading (giugno 2026)

---

## 8. Gerarchia heading e accessibilità (regola fissa)

Lighthouse e gli screen reader richiedono che i titoli **non saltino livelli** (es. `h1 → h3` senza un `h2` intermedio). Una struttura corretta facilita la navigazione con tastiera e tecnologie assistive.

### Schema per pagina

| Livello | Uso | Componenti / esempi |
|---------|-----|---------------------|
| **h1** | Un solo titolo per pagina (hero) | `page.tsx`, hero servizi/casi studio/contatti/blog |
| **h2** | Sezioni principali | `SectionHeader`, `MetodoForge`, `ClientiLogos`, `FooterCtaBand`, sezioni casi studio |
| **h3** | Sottosezioni dentro una h2 | `ServiceCard`, `ServiziTabCard`, fasi FORGE, nomi team, domande FAQ, step casi studio |
| **Non heading** | Etichette UI, nav footer, colonne tabella | Footer link columns (`<p>`), confronto prima/dopo (`<p>`) |

### Regole operative

1. **Una sola `h1` per pagina** — mai duplicarla nel footer o nella navbar.
2. **Non saltare livelli** — dopo `h2` puoi usare `h3`, non `h4`. Dopo `h1` serve almeno un `h2` prima di qualsiasi `h3`.
3. **`SectionHeader`** — resta sempre `h2` per i titoli di sezione.
4. **`FooterCtaBand`** — titolo CTA in `h2` (sezione autonoma prima del footer link).
5. **Footer colonne link** — titoli colonna in `<p>` stilizzato, **non** `h4` (evita `h2 → h4` su `/contatti` dove la CTA band è nascosta).
6. **Tabelle confronto** (home + casi studio) — intestazioni colonna *Senza sistema / Con Forge Group* in `<p>`, non `h3`: non sono sezioni del documento.
7. **`ServiziTabCard`** — titolo servizio in `h3` sotto l'`h2` «Le 3 macroaree».
8. **`FAQAccordion`** — ogni domanda in `h3` > `button` (sotto l'`h2` della sezione FAQ).
9. **Blog** — contenuto articolo: `h2` capitoli, `h3` sotto-capitoli; non iniziare un articolo con `h3` senza un `h2` precedente.
10. **Form contatti** — `h1` hero + `h2` per ogni step (`AnimatedStepper` > `Step`).

### Checklist prima di pubblicare una nuova pagina

- [ ] Esiste una sola `h1`?
- [ ] Ogni sezione visibile ha un `h2` (o è sotto-sezione `h3` di un `h2` esistente)?
- [ ] Nessun salto `h2 → h4` o `h1 → h3`?
- [ ] Etichette decorative (tabella, pill, nav) non usano tag heading?
- [ ] Lighthouse Accessibility → audit «heading-order» verde?

### Pagine di riferimento (outline corretto)

- **Home:** h1 hero → h2 clienti/servizi/casi/confronto/team/FAQ → h3 card servizi, card casi, membri team, domande FAQ
- **Servizi:** h1 → h2 macroaree + loghi + metodo FORGE → h3 tab servizi + fasi FORGE
- **Casi studio hub:** h1 → h2 portfolio → h3 titoli card
- **Caso studio dettaglio:** h1 risultato → h2 cliente/sfida/sistema/risultati/video/prima-dopo/a chi serve → h3 step e diagnosi
- **Contatti:** h1 → h2 step form (footer senza heading)
- **Chi siamo e manifesto:** h1 hero → h2 Chi siamo / Valori / Chi NON accettiamo → h3 card valori
- **Visione:** h1 manifesto unico in `VisionSection` (nessun h2 intermedio)

---

## 9. Pagina Visione (`/visione`)

**URL:** `/visione` — pagina autonoma nel menu principale (dopo Casi Studio).

**Redirect legacy:** `/chi-siamo-e-manifesto` → `/visione` (301).

**Menu:** voce **Visione** subito dopo **Casi Studio** (navbar desktop e mobile). Link anche nel footer colonna Azienda.

**Copy:** testo manifesto Visione approvato dal cliente — non modificare (eccezione alla regola «prodotto» e ai trattini: il testo è vincolante così com'è).

**Sfondo sezione contenuto:** classe `section-visione` (`#FAECE7` al 92%, bordo come le altre sezioni).

**Layout pagina:**
- **Hero atmosferica** (`vision-hero-atmosphere`): immagine di sfondo + gradienti pesca, titolo e domanda centrati (testi e colori brand invariati)
- **Titolo sezione h2** centrato: *Costruiamo con chi ha il coraggio di crescere sul serio* (keyword corallo in corsivo)
- **Blocco 2 colonne:** sinistra manifesto (sticky su desktop) · destra card stile Superdesign (aspect 4/5, corallo/nero alternati, icona + badge numero + **solo foto** + divider; **zero** titoli/descrizioni testo team)
- **Founders:** foto duo grande full width, **senza** nomi/ruoli sotto

**Componenti:** `src/app/visione/page.tsx`, `VisionSection.tsx`.

**Heading:** h1 in hero · h2 titolo sezione card · card editoriali e foto founders senza heading

---

## 7. Modifiche da fare (backlog)

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
- [x] Gerarchia heading accessibile su tutte le pagine (regola §8)
