# Feedback & Linee Guida — Comunicazione Forge Group

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

**Parole chiave del brand:**
- Sistema prevedibile di acquisizione
- Dal lead al contratto firmato
- Metodo FORGE
- Growth Hacking B2B
- Risultati misurabili

---

## 2. Metodo FORGE — Testi definitivi (5 fasi)

Il metodo deve trasmettere: chiarezza operativa, sequenzialità logica, concretezza.  
Ogni fase ha un titolo forte e una micro-descrizione di supporto.

| # | Titolo | Micro-descrizione |
|---|--------|-------------------|
| 01 | **Analisi & Audit** | Capiamo dove sei, dove vuoi andare e cosa ti blocca oggi. |
| 02 | **Strategia & Piano** | Priorità, budget e sequenza operativa. Nessuna mossa senza un perché misurabile. |
| 03 | **Acquisizione Clienti** | Campagne, funnel e posizionamento per portare contatti già qualificati. |
| 04 | **Vendita & Chiusura** | CRM, script e processo commerciale per convertire più opportunità in contratti. |
| 05 | **Crescita & Scala** | Report, revisione KPI e affiancamento strategico per crescere con metodo. |

**Schema visivo (implementato):** 5 pallini numerati su riga orizzontale con solo il titolo — senza descrizione estesa. Pulito e immediato.

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
- €126.500 di fatturato nei primi 90 giorni
- €1,48 costo per contatto (fino a max €3 nei primi mesi)
- ~550 contatti generati, già consapevoli e in target
- €350.000+ di fatturato ad oggi (cliente ancora attivo e in crescita)

**Cosa è successo dopo:**  
I €126.500 sono arrivati nei primi 90 giorni. DISA è ancora oggi cliente e ha già superato i €350.000 di fatturato. Non dipende più dal passaparola: lavora solo con le campagne di acquisizione, i commerciali parlano con clienti già interessati, il tasso di chiusura è cresciuto. Sistema funzionante, testato, di proprietà dell'azienda e scalabile in tutta Italia.

**Asset mancante:** video recensione professionale del caso (campo `videoUrl` predisposto in `caseStudies.ts`, da agganciare quando il file è disponibile).

---

## 5. Modifiche implementate (log)

- [x] Sezioni corallo con palette leggibile (bianco/nero/pesca-light per testi e keyword)
- [x] Tabelle comparative sempre a 2 colonne su mobile con ✕/✓ e separatori
- [x] Rimossa CTASection da tutte le pagine (CTA resta solo nel footer)
- [x] Footer tutto corallo con testi bianchi
- [x] Navbar: pulsante "Hai un minuto?" nascosto su mobile/tablet
- [x] Hero pagine servizi: layout due colonne con pillars card
- [x] Rimossa sezione pain-points (bg-nero) da pagine servizi
- [x] Aggiunta sezione loghi clienti con marquee animato nella pagina /servizi
- [x] Loghi croppati e normalizzati per dimensione ottica uniforme
- [x] Loghi spostati sopra Metodo Forge nella pagina /servizi
- [x] Metodo FORGE: schema a 5 pallini con solo titolo (no descrizione estesa)
- [x] Caso studio DISA/SOS APPALTI riscritto con la storia reale + sezione "Cosa è successo dopo"
- [x] Naming uniformato a "DISA SRL" + software "SOS APPALTI" (home, hub, caso studio)
- [x] Pagine servizi: sezioni "Ti riconosci in questo?" (painPoints) e "È per te" (forWho) in palette
- [x] Foto Gianpio ricentrata (object-position per-membro nella TeamSection)

---

## 6. Modifiche da fare (backlog)

- [ ] Fornire la video recensione del caso DISA da agganciare al campo `videoUrl`
- [ ] Ottenere loghi clienti in SVG/PNG con sfondo trasparente per versione monocromatica corallo
- [ ] Aggiungere più casi studio nella sezione dedicata
- [ ] Valutare una sezione "press/menzioni" se ci sono coperture media
- [ ] Revisione SEO completa: meta title, description e structured data per ogni pagina
- [ ] Aggiungere video testimonianze aggiuntive oltre al caso DISA
- [ ] Valutare schema FAQ con markup JSON-LD per SEO
