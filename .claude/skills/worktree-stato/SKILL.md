---
name: worktree-stato
description: Elenca le copie di lavoro (git worktree) del sito con il branch, l'ultimo commit, se il lavoro è già dentro main e se ci sono modifiche non salvate. Propone quali si possono chiudere, ma non ne cancella nessuna: lo fa la proprietà con i comandi che la skill stampa.
disable-model-invocation: true
---

Esegui `node scripts/worktree-stato.mjs` dalla radice del repo e riporta la tabella così com'è.

Poi, in italiano e senza lineette lunghe:
1. Dividi le copie in tre gruppi: **già unite a main e pulite** (si possono chiudere), **con lavoro
   non unito** (da finire o da decidere), **con modifiche non salvate** (prima si guardano).
2. Per il primo gruppo stampa i comandi `git worktree remove <percorso>` e `git branch -d <branch>`,
   uno per riga, pronti da copiare. **Non eseguirli**: la cancellazione la fa la proprietà.
3. Per il secondo gruppo di' in una riga cosa c'è dentro (dal nome del branch e dall'ultimo commit) e
   quanti commit mancano a main.
4. Segnala se la copia `repo/` non è su `main`: il CLAUDE.md la chiama "unica copia di lavoro".
