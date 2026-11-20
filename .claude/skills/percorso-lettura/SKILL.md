---
name: percorso-lettura
description: Fa il percorso di lettura prima di una modifica al sito (livello 0 e 1, più la sezione del livello 2 per il compito) in un contesto separato e torna un riassunto corto con i fatti ammessi, le regole che toccano il compito, le ultime correzioni della proprietà e la riga "documenti letti" da mettere in apertura. Argomento: la lettera della sezione del livello 2 (A testi, B pagine, C concorrenti, D SEO, E GEO, F SEM, G blog) o una descrizione del compito.
context: fork
---

Fai il percorso di lettura per questo compito: `$ARGUMENTS`. Lavori in un contesto separato: leggi
tutto quello che serve e riporta solo il riassunto qui sotto, in italiano, senza lineette lunghe.

I materiali stanno in `~/ForgeGroup/progetti/sito/materiali/` (la cartella "SITO FORGE" di Drive) e il
manuale dei dipendenti AI in `~/ForgeGroup/progetti/sito/dipendenti-ai/`. Se un percorso non esiste,
dillo subito: il collegamento `~/ForgeGroup/sito-materiali` va ripuntato alla cartella di Drive.

## Cosa leggi, in quest'ordine

1. `dipendenti-ai/feedback.md` e `~/ForgeGroup/progetti/sito/feedback-generale.md` (livello 0).
2. `materiali/00 - PERCORSO DI LETTURA PRIMA DI OGNI MODIFICA.md`, per intero: ti dice cosa leggere.
3. Il livello 1, per intero:
   - `materiali/01 - Comunicazione/Scheda dei fatti Forge.md`
   - `materiali/01 - Comunicazione/Testa aziendale Forge/TESTA AZIENDALE - FORGE GROUP.md`
   - `materiali/01 - Comunicazione/Regole di comunicazione Forge v2 - 2026-09-22.md`
   - `REGOLE-DEL-SITO.md` nel repo
4. Del livello 2, la sezione che il compito tocca (dall'argomento: la lettera, o deduci dalla
   descrizione). Per i documenti lunghi usa `materiali/00 - RIASSUNTI DEI DOCUMENTI.md` se il compito
   li tocca solo di lato.
5. `materiali/00 - REGISTRO DEI CONTRASTI.md`: i punti dove i documenti non coincidono.

Poi rispondi alle tre domande di controllo **senza riaprire i file** e confronta con le risposte in
fondo al percorso. Se ne sbagli una, rileggi.

## Cosa restituisci (al massimo 60 righe)

```
DOCUMENTI LETTI
[una riga sola, pronta per l'apertura della risposta: "Letti: ..."]

TRE DOMANDE DI CONTROLLO
1. USP e come si scrive CRM: ...
2. Numeri dei casi ammessi e dove stanno nel codice: ...
3. Ultime tre correzioni della proprietà (con la data): ...

FATTI CHE SERVONO A QUESTO COMPITO
- [fatto] → [Scheda, punto]

REGOLE CHE TOCCANO QUESTO COMPITO
- [regola] → [documento e §]

COSA NON SI SCRIVE MAI
- [l'elenco del §5 delle Regole v2 e del §5 BIS delle REGOLE, in una riga]

CONTRASTI APERTI CHE RIGUARDANO IL COMPITO
- [dal registro dei contrasti, o "nessuno"]

MODELLO DA SEGUIRE
- [la landing /inizia per le pagine; la lettera di vendita per la home; lo schema v2 per gli articoli; ...]
```
