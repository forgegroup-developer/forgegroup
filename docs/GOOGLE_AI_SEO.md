# Google & AI SEO — Forge Group

Guida operativa per il lancio su `https://www.forgegroup.it` (dominio + Google Search Console).

Configurazione centralizzata: `src/lib/seo/site.ts`

**Titolo sito:** Forge Group Italia | Acquisizione Clienti B2B & Growth Hacking  
**Meta description:** Aiutiamo imprese a migliorare i processi, acquisire clienti ed organizzare le vendite per crescere in modo prevedibile.

---

## Stato piano SEO

| Voce | Stato |
|------|--------|
| Sitemap + robots.txt + llms.txt | ✅ Fatto |
| Schema Organization / LocalBusiness / WebSite / FAQ | ✅ Fatto |
| Mirror AI (`/index.md`) | ✅ Fatto |
| Titolo + description centralizzati (`site.ts`) | ✅ Fatto |
| Favicon logo figurativo | ✅ Fatto |
| Dominio live su `www.forgegroup.it` | ✅ Fatto |
| Env Resend su Vercel | ✅ Fatto |
| DNS Resend su OVH | ✅ Fatto |
| Google Search Console + sitemap | ✅ Fatto |
| Bing Webmaster Tools | ✅ Fatto |
| Google Business Profile | ✅ Fatto |
| Social `sameAs` in schema (URL reali) | ✅ Fatto |

---

## Inventario URL indicizzabili (sitemap)

| URL | Priorità | Note |
|-----|----------|------|
| `/` | 1.0 | Homepage |
| `/servizi` | 0.9 | Hub servizi |
| `/casi-studio` | 0.9 | Hub casi studio |
| `/contatti` | 0.9 | Prequalifica |
| `/blog` | 0.8 | Hub articoli |
| `/chi-siamo-e-manifesto` | 0.7 | Manifesto |
| `/casi-studio/software-b2b` | 0.8 | Caso DISA |
| `/casi-studio/edilizia` | 0.8 | |
| `/casi-studio/arredo-commerciale` | 0.8 | |
| `/casi-studio/hotel-hospitality` | 0.8 | |
| `/blog/come-acquisire-clienti-b2b-campania` | 0.7 | |
| `/privacy-policy` | 0.3 | noindex in metadata |
| `/cookie-policy` | 0.3 | noindex in metadata |

**Sitemap:** https://www.forgegroup.it/sitemap.xml  
**Robots:** https://www.forgegroup.it/robots.txt  
**llms.txt:** https://www.forgegroup.it/llms.txt

---

## Asset SEO implementati

### 1. `llms.txt`
- Generato da `src/lib/aiSeo/mirrors.ts`
- Include: servizi, pricing, area geografica, FAQ, pagine principali, sitemap, mirror markdown

### 2. Markdown mirrors (AI-readable)
- Pattern: `{url}/index.md` (rewrite → API mirror)
- Esempi:
  - https://www.forgegroup.it/index.md
  - https://www.forgegroup.it/servizi/index.md
  - https://www.forgegroup.it/casi-studio/index.md
  - https://www.forgegroup.it/casi-studio/software-b2b/index.md

### 3. Schema markup (JSON-LD)
| Tipo | Dove |
|------|------|
| Organization | `layout.tsx` |
| LocalBusiness | `layout.tsx` |
| WebSite | `layout.tsx` |
| FAQPage | Homepage (`JsonLdFAQ.tsx`) |
| BlogPosting | Articoli blog |
| BreadcrumbList | Blog + casi studio |

### 4. Metadata
- `metadataBase` + canonical per pagina
- Open Graph + Twitter Card
- `robots: noindex` su privacy/cookie

### 5. AI crawlers
Ammessi in `robots.ts`: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot  
Bloccato: `/api/`

---

## Checklist pre-lancio dominio

### A. Vercel + DNS
1. Dominio `forgegroup.it` collegato al progetto Vercel
2. `www.forgegroup.it` come dominio primario (consigliato)
3. Redirect apex `forgegroup.it` → `www.forgegroup.it` attivo
4. HTTPS attivo (certificato Let's Encrypt automatico)
5. Env vars produzione: `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`

### B. Verifica tecnica SEO (dopo DNS live)
```bash
curl -I https://www.forgegroup.it/
curl https://www.forgegroup.it/robots.txt
curl https://www.forgegroup.it/sitemap.xml
curl -I https://www.forgegroup.it/llms.txt
curl -I https://www.forgegroup.it/casi-studio/index.md
curl -I https://www.forgegroup.it/casi-studio
```
- `/casi-studio` deve rispondere **200** (non redirect a `/#casi-studio`)

### C. Google Search Console
1. https://search.google.com/search-console
2. **Aggiungi proprietà** → **Prefisso URL** `https://www.forgegroup.it`  
   (oppure **Dominio** `forgegroup.it` se gestite DNS centralizzato)
3. Verifica via record DNS TXT o file HTML (Vercel supporta entrambi)
4. **Sitemap** → Aggiungi: `https://www.forgegroup.it/sitemap.xml`
5. **Impostazioni** → Paese di destinazione: **Italia**
6. Dopo 48–72h: **Copertura** / **Pagine** → verificare indicizzazione
7. **Prestazioni** → monitorare query brand e keyword B2B Campania

### D. Bing Webmaster Tools (opzionale)
1. https://www.bing.com/webmasters
2. Importa da Google Search Console o verifica separatamente
3. Invia la stessa sitemap

### E. Google Business Profile (se applicabile)
Profilo attività collegato a Campania / area servita.

---

## Manutenzione

| Quando | Azione |
|--------|--------|
| Nuova pagina statica | Aggiungi in `src/lib/seo/site.ts` + mirror in `mirrors.ts` |
| Nuovo articolo | Automatico da `articles.ts` |
| Nuovo caso studio | Automatico da `caseStudies.ts` |
| Cambio servizi/prezzi | Aggiorna `mirrors.ts` (rigenera `llms.txt`) |

---

## Sicurezza

- Nessuna API key in `llms.txt` o mirror
- `/api/` disallowed in robots
- Mirror solo da whitelist path

---

*Ultimo aggiornamento: 11 giugno 2026 — titolo, description e checklist stato.*
