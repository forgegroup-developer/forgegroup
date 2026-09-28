# Coda degli articoli del blog

Ogni articolo è un file `<slug>.json` in questa cartella. Il nome del file deve essere
uguale allo slug, altrimenti la build si ferma.

## Come entra un articolo

1. Il Redattore scrive il file e apre una PR.
2. Nell'anteprima Vercel della PR l'articolo si vede già su `/blog/<slug>`, con una
   scritta che dice quando esce.
3. Il merge della PR è l'approvazione.
4. In produzione l'articolo compare da solo quando arriva `publishAt`, entro un'ora
   (le pagine del blog si rigenerano ogni ora; il cron delle 08:05 UTC la forza).

Per ritirare un articolo in coda prima che esca: si cancella il file con una PR.

## Formato

Gli stessi campi del tipo `Article` in `src/data/articles.ts`:

```json
{
  "slug": "cinque-appuntamenti-nessuna-firma",
  "title": "…",
  "description": "… (140-155 caratteri)",
  "category": "Trattative e vendita",
  "date": "2026-10-02",
  "publishAt": "2026-10-02T09:00:00+02:00",
  "readTime": "6 min",
  "excerpt": "…",
  "tags": ["…"],
  "faqs": [{ "q": "…", "a": "…" }],
  "content": [
    { "type": "p", "text": "Testo con [un link interno](/servizi)." },
    { "type": "h2", "text": "…" },
    { "type": "ul", "items": ["…", "…"] },
    { "type": "quote", "text": "…" },
    { "type": "cta", "text": "…" }
  ]
}
```

`publishAt` porta sempre il fuso di Roma: `+02:00` con l'ora legale (dall'ultima
domenica di marzo all'ultima domenica di ottobre), `+01:00` il resto dell'anno.

Le regole di scrittura non stanno nel repo: sono nel manuale dei dipendenti AI su Drive,
`www.forgegroup.it/05 - Dipendenti AI/` (da qui: `../dipendenti-ai/`).
