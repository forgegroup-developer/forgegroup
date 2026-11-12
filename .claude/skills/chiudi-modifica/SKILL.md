---
name: chiudi-modifica
description: Chiude una modifica al sito come chiede REGOLE-DEL-SITO §9 e §7 BIS, fino alla PR. Controlli automatici (controlla:sito, tsc, articoli), i revisori (revisore-sito e controllore-seo-geo), l'anteprima da telefono, il commit e la PR con il riepilogo. Non unisce mai: il merge lo fa la proprietà. Argomento facoltativo: il titolo della PR.
disable-model-invocation: true
---

Chiudi la modifica che sta in questo branch secondo `REGOLE-DEL-SITO.md` §9 e §7 BIS. Argomento:
`$ARGUMENTS` (se c'è, è il titolo della PR). Fermati al primo passo che fallisce, di' cosa non va e
cosa correggere: non si apre una PR con errori.

## 0. Dove siamo

- `git branch --show-current`: se è `main`, fermati. Si lavora su un branch per ogni modifica.
- `git status --short` e `git diff --stat origin/main...HEAD`: elenca cosa cambia. Se non c'è nulla,
  fermati.
- Ricorda in una riga quali documenti del percorso di lettura hai letto per questa modifica. Se non
  li hai letti, fallo ora con la skill `percorso-lettura` e scrivi la riga.

## 1. I controlli automatici (0 errori, tutti)

```
node scripts/controlla-sito.mjs
npx tsc --noEmit
```

Se il branch tocca `content/articoli/`: anche `node scripts/controlla-articolo.mjs <file>` per ogni
articolo cambiato.

## 2. I revisori

Lancia in parallelo, con lo strumento Agent, i revisori che servono:
- `revisore-sito` se il branch tocca testi sotto `src/` fuori dal blog (pagine, blocchi, casi, mail,
  `mirrors.ts`);
- `controllore-seo-geo` se il branch tocca pagine, rotte, `next.config.ts`, sitemap, componenti con
  moduli o link WhatsApp;
- `revisore` (quello del blog) se tocca `content/articoli/`.

Riporta gli esiti per intero. Se uno è DA CORREGGERE o DA SISTEMARE, fermati: la proprietà decide se
correggere o passare oltre. Non riscrivere i testi da solo per far passare il controllo.

## 3. L'anteprima da telefono

Avvia `npm run dev` su una porta libera e, per ogni pagina toccata, fai due schermate con Chrome senza
finestra, una da computer e una da telefono:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=390,3000 --virtual-time-budget=12000 \
  --screenshot=anteprima-telefono.png http://localhost:<porta>/<pagina>
```

Guardale e di' cosa vedi: testo fuori dalle schede, pagina più larga dello schermo, immagini rotte,
pulsanti tagliati. Poi ferma il server.

## 4. Commit e PR

- Commit in italiano, una riga che dice cosa cambia per chi legge il sito (come lo storico del repo),
  niente gergo tecnico nella prima riga.
- `git push -u origin <branch>`.
- PR verso `main` con `gh pr create` (sul Mac funziona; nelle routine nel cloud si usa
  `scripts/github.mjs`). Titolo: `$ARGUMENTS` o la prima riga del commit. Nel corpo, in questo ordine:
  1. **Documenti letti** (la riga del percorso di lettura).
  2. **Cosa cambia e perché**, con il documento che regge la scelta.
  3. **Controlli**: esito di `controlla:sito`, `tsc`, dei revisori (incolla gli esiti).
  4. **Anteprima**: allega o descrivi le schermate; l'anteprima Vercel arriva da sola nella PR.
  5. **Dopo il merge**: `node scripts/indexnow.mjs <percorsi>` e Search Console per pagine nuove o
     rinominate; i fatti cambiati anche nei profili esterni.
- Non unire la PR, non chiedere di unirla: il merge lo fa la proprietà quando vuole.

Alla fine scrivi il link della PR e, in tre righe, cosa resta da decidere alla proprietà.
