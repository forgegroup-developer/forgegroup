# Google & AI SEO — Forge Group

Guida operativa derivata dal playbook *The AI SEO Playbook* (Brycen Wood, 2026), adattata al sito Next.js su Vercel.

## Verifica sicurezza

Il playbook contiene 11 sistemi. **Sul sito abbiamo implementato solo i sistemi 1–3** (visibilità AI + Google). I sistemi 4–11 (YouTube autopilot, CRM GHL, Twilio, Cloudflare Workers con API key) **non sono stati integrati** nel codice del sito: richiedono credenziali esterne e non appartengono al repository pubblico.

**Protezioni mantenute:**
- `/api/` resta bloccato in `robots.txt` (form, mirror interni non indicizzati per path API)
- Nessuna API key nel codice o in `llms.txt`
- Security headers invariati (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- Markdown mirrors serviti solo da whitelist path (no path traversal)

---

## Cosa è live sul sito

### 1. `llms.txt` (Sistema 1)
- URL: https://www.forgegroup.it/llms.txt
- File generato dinamicamente da `src/lib/aiSeo/mirrors.ts`
- Contiene: servizi, pricing indicativo, area geografica, FAQ, elenco mirror

### 2. Markdown mirrors (Sistema 2)
- Pattern: aggiungi `/index.md` a ogni URL pagina
- Esempi:
  - https://www.forgegroup.it/index.md
  - https://www.forgegroup.it/servizi/index.md
  - https://www.forgegroup.it/contatti/index.md
  - https://www.forgegroup.it/casi-studio/software-b2b/index.md
- Content-Type: `text/plain; charset=utf-8`
- Implementazione: rewrite in `next.config.ts` → `src/app/api/ai-mirror/[[...path]]/route.ts`

### 3. Sitemap + robots (Sistema 3)
- Sitemap: https://www.forgegroup.it/sitemap.xml (`src/app/sitemap.ts`)
- Robots: https://www.forgegroup.it/robots.txt (`src/app/robots.ts`)
- AI crawlers esplicitamente ammessi: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot
- `/api/` disallowed per tutti i bot

### 4. Schema markup
- Organization + LocalBusiness: `src/app/layout.tsx`
- FAQPage: `src/components/JsonLdFAQ.tsx` (homepage)
- BreadcrumbList: blog e casi studio

---

## Google Search Console — setup manuale

1. Vai su https://search.google.com/search-console
2. **Aggiungi proprietà** → tipo **Dominio** → `forgegroup.it` (senza https/www)
3. Aggiungi il record TXT DNS che Google fornisce (su Vercel DNS o registrar)
4. Clicca **Verifica** (propagazione DNS: fino a 24–48h)
5. Menu **Sitemap** → invia: `https://www.forgegroup.it/sitemap.xml`
6. Dopo 2–3 giorni: **Prestazioni** → analizza query, impressioni, CTR, posizione media

### Quick win (dal playbook)
Cerca keyword con **posizione 5–15** e **impressioni alte** → ottimizza title/description della pagina corrispondente.

---

## Test AI visibility (dopo 3–7 giorni dal deploy)

1. ChatGPT: *"Chi fa acquisizione clienti B2B in Campania?"*
2. Perplexity: stessa domanda
3. Claude: stessa domanda
4. Google AI Overview: ricerca normale su Google

Verifica che citi Forge Group o che possa leggere `llms.txt` e i mirror.

### Test tecnici immediati
```bash
curl -I https://www.forgegroup.it/llms.txt
curl -I https://www.forgegroup.it/servizi/index.md
curl https://www.forgegroup.it/robots.txt
```

---

## Manutenzione

| Quando | Azione |
|--------|--------|
| Nuova pagina | Aggiungi mirror in `src/lib/aiSeo/mirrors.ts` + voce in `sitemap.ts` |
| Nuovo servizio/prezzo | Aggiorna sezione Services in `mirrors.ts` (rigenera `llms.txt` automaticamente) |
| Nuovo articolo blog | Mirror generato automaticamente da `articles.ts` |
| Nuovo caso studio | Mirror generato automaticamente da `caseStudies.ts` |

---

## Cosa NON fare (sicurezza / privacy)

- Non inserire API key Resend o altri secret in `llms.txt` o mirror
- Non rimuovere `disallow: /api/` da robots.txt
- Non esporre endpoint admin o pannelli senza autenticazione
- Non implementare integrazioni CRM/Twilio nel frontend senza review sicurezza dedicata

---

*Ultimo aggiornamento: giugno 2026*
