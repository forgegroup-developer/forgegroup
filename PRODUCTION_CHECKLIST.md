# Production Checklist — Forge Group

Report per il deploy su `https://www.forgegroup.it`.

---

## Fase 1 — Responsive Design

### Modifiche applicate

| Area | File | Intervento |
|------|------|------------|
| Tipografia base | `src/app/globals.css` | Body 16px, line-height 1.6, `overflow-x: clip`, `.heading-card` con `clamp()`, utility `.touch-target`, `.btn-corallo` min-height 44px |
| Home hero | `src/app/page.tsx` | Padding laterale `px-4 sm:px-6 lg:px-8` |
| Case study stack | `src/components/CaseStudyStack.tsx` | Rimossa altezza fissa mobile, testo 16px, CTA min-h 44px |
| Service cards | `src/components/ServiceCard.tsx` | `min-h` responsive, titoli con `clamp()` |
| Hero marquee | `src/components/HeroBento.tsx` | Altezza scalata 300px → 520px |
| Navbar mobile | `src/components/Navbar.tsx` | Touch target 44px su hamburger e chiudi |
| Carousel | `src/components/CaseStudyCarousel.tsx` | Dot indicator con touch target 44px |
| Before/After | `src/components/CaseStudyBeforeAfter.tsx` | Stack 1 colonna su mobile, testo min 14–16px |
| Form newsletter | `src/components/FooterNewsletter.tsx` | Input `text-base`, bottone touch target |
| Form contatti | `src/app/contatti/ContattiForm.tsx` | Bottone Indietro touch target, `aria-live` errori |

### Breakpoint verificati (audit codice)

320px, 375px, 414px, 768px, 1024px, 1440px — tutte le 9 route.

---

## Fase 2 — Pulizia codice e bug fixing

### Build e lint

- `npm run build` — **verde** (20 pagine statiche/generate)
- `npm run lint` — permesso negato su `node_modules/.bin/eslint` in ambiente locale; nessun errore TypeScript in build

### Pagine errore

| File | Descrizione |
|------|-------------|
| `src/app/not-found.tsx` | 404 branded con link Home e Contatti |
| `src/app/error.tsx` | Error boundary con retry |
| `src/app/global-error.tsx` | Fallback errori root layout |

### Dead code rimosso

| Elemento | Azione |
|----------|--------|
| `src/components/PrismBackground.tsx` | Eliminato (non importato) |
| `ogl` + `src/types/ogl.d.ts` | Rimossi da `package.json` |

### Link interni

- Navbar, Footer, CTA: route valide
- `/casi-studio` → hub dedicato (redirect legacy rimosso da `next.config.ts`)
- **Non esiste** `/lavora-con-noi` — form unico su `/contatti`

### Form

- `ContattiForm`: stati loading/success/error verificati, `aria-live` su errori
- `FooterNewsletter`: stati idle/loading/success/error ok
- API contact/newsletter: validazione campi, risposte HTTP chiare

### useEffect cleanup

- `Navbar`, `CaseStudyCarousel`, `Logo3DBackground`, `IntroLoader`, `CaseStudyStack` — listener e RAF con cleanup verificati

---

## Fase 3 — Performance optimization

### Lighthouse mobile (dopo ottimizzazioni, build production locale)

| Pagina | Performance | LCP | CLS | Obiettivo ≥90 |
|--------|-------------|-----|-----|---------------|
| `/` | **40** | 13.8s | 0 | Non raggiunto |
| `/servizi` | **51** | 6.4s | — | Non raggiunto |
| `/contatti` | **63** | 6.1s | — | Non raggiunto |

**Nota:** baseline "prima" non catturata in questa sessione. I punteggi riflettono lo stato post-ottimizzazione.

### Cause principali del gap Lighthouse

1. **Three.js + GSAP globali** (`ClientSceneEffects`) su ogni pagina — scelta confermata dal cliente
2. **Intro loader** con animazione iniziale
3. Asset PNG servizi ancora >400KB–1.2MB (icon-* non usati in produzione?)
4. Video recensione (`.mov` ~97MB, gitignored) — poster compresso a 270KB

### Ottimizzazioni implementate

| Intervento | File |
|------------|------|
| Font via `next/font` (Inter + Stack Sans Notch), rimosso `@import` CSS | `layout.tsx`, `globals.css` |
| Dynamic import 3D/intro | `ClientSceneEffects.tsx` |
| Dynamic import case study stack | `LazyCaseStudyStack.tsx` |
| Dynamic import form contatti (Framer Motion) | `ContattiFormLoader.tsx` |
| DPR cap mobile (1.0) su 3D | `Logo3DBackground.tsx` |
| `prefers-reduced-motion` globale | `globals.css` |
| Rimosso `unoptimized` su immagini case study | `CaseStudyStack`, `Carousel`, `Detail` |
| Formati AVIF/WebP in config | `next.config.ts` |
| Compressione JPEG blog/hero/poster | `public/images/blog/*.jpg`, `hero-growth.jpg`, `video-recensione-poster.jpg` |

### Asset compressi (>200KB → sotto o vicino soglia)

| File | Prima | Dopo |
|------|-------|------|
| `blog/agenzia-marketing-b2b-napoli.jpg` | 2.5MB | 429KB |
| `blog/come-acquisire-clienti-b2b-campania.jpg` | 1.9MB | 228KB |
| `blog/sistema-vendita-b2b-dalla-lead-al-contratto.jpg` | 1.8MB | 236KB |
| `hero/hero-growth.jpg` | 1.7MB | 206KB |
| `video-recensione-poster.jpg` | 2.2MB | 270KB |

### Mitigazioni future (non implementate)

- Disabilitare 3D su mobile/tablet (stimato +25–35 punti Lighthouse)
- Convertire PNG servizi/imprenditori in WebP
- Poster statico al posto del video su mobile

---

## Fase 4 — SEO, accessibilità e produzione

### SEO tecnico

| Task | Stato |
|------|-------|
| Metadata + OG/Twitter per pagina | Fatto su tutte le route statiche e `generateMetadata` su blog/casi studio |
| Canonical | `metadataBase` in layout + `alternates.canonical` per pagina |
| `sitemap.xml` | Hub `/casi-studio`, `/chi-siamo-e-manifesto`, blog, casi slug, articoli — config in `src/lib/seo/site.ts` |
| `robots.ts` | Già presente |
| JSON-LD Organization + LocalBusiness + WebSite | Layout |
| BreadcrumbList | Blog articoli + casi studio |
| Alt text immagini | Audit; fix hero case study detail |

### Accessibilità

- Contrasto: coral su bianco verificato su CTA e link principali
- Focus visible: `*:focus-visible` in `globals.css`
- Form: label newsletter, `aria-live` errori stepper, honeypot nascosto
- Touch target ≥44px su controlli principali

### Sicurezza e config produzione

| Task | File |
|------|------|
| Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | `next.config.ts` |
| `.env.example` | Root progetto |
| Honeypot `website` | `ContattiForm`, `FooterNewsletter`, API routes |
| Rate limiting (5 req/min contact, 8 req/min newsletter per IP) | `src/lib/rateLimit.ts`, API routes |
| Secrets | Solo env vars, nessuna API key hardcoded |

---

## File toccati (riepilogo)

`globals.css`, `layout.tsx`, `page.tsx`, `not-found.tsx`, `error.tsx`, `global-error.tsx`, `sitemap.ts`, `next.config.ts`, `package.json`, `.env.example`, `Navbar.tsx`, `CaseStudyStack.tsx`, `CaseStudyCarousel.tsx`, `CaseStudyDetail.tsx`, `CaseStudyBeforeAfter.tsx`, `ServiceCard.tsx`, `HeroBento.tsx`, `FooterNewsletter.tsx`, `Logo3DBackground.tsx`, `ClientSceneEffects.tsx`, `LazyCaseStudyStack.tsx`, `ContattiForm.tsx`, `ContattiFormLoader.tsx`, `contatti/page.tsx`, `servizi/page.tsx`, `chi-siamo-e-manifesto/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `casi-studio/[slug]/page.tsx`, `api/contact/route.ts`, `api/newsletter/route.ts`, `lib/rateLimit.ts`, immagini blog/hero/poster.

**Rimossi:** `PrismBackground.tsx`, `ogl.d.ts`, dipendenza `ogl`.

---

## AI SEO (playbook Brycen Wood — sistemi 1–3)

| Asset | URL |
|-------|-----|
| llms.txt | `/llms.txt` |
| Markdown mirror (es.) | `/servizi/index.md`, `/index.md` |
| Guida Google + GSC | `docs/GOOGLE_AI_SEO.md` |

- FAQPage JSON-LD aggiunto in homepage
- robots.txt: AI crawlers ammessi, `/api/` ancora bloccato
- Sistemi 4–11 del playbook (CRM, Twilio, YouTube bot) **non implementati** — fuori scope sito

---

## Cose da fare manualmente prima del deploy

1. **DNS** — Puntare `forgegroup.it` e `www.forgegroup.it` a Vercel
2. **Env vars su Vercel** — `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO` (vedi `.env.example`)
3. **Dominio canonical** — Verificare redirect apex → `www` se necessario
4. **Test form reale** — Invio candidatura da mobile e desktop con email Resend attiva
5. **Giro manuale** — Ogni pagina, ogni link, menu mobile, carousel, stepper contatti
6. **Lighthouse su preview Vercel** — Confrontare con numeri locali; CDN può migliorare LCP
7. **Asset residui** — Valutare compressione PNG servizi (`imprenditore-*.png` 1MB+) e video recensione per produzione
8. **npm install** su CI/Vercel dopo rimozione `ogl`
9. **Google Search Console** — verifica `www.forgegroup.it` + sitemap `https://www.forgegroup.it/sitemap.xml` (checklist completa in `docs/GOOGLE_AI_SEO.md`)
10. **Test SEO post-DNS** — robots, sitemap, llms.txt, `/casi-studio` (200), mirror `/casi-studio/index.md`
11. **Bing Webmaster** (opzionale) — stessa sitemap

---

*Generato il 11 giugno 2026 — Forge Group production readiness.*
