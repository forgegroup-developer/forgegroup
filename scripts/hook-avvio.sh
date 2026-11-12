#!/bin/bash
# Hook SessionStart di Claude Code (REGOLE-DEL-SITO §10, 12/11/2026).
#
# All'avvio di ogni sessione, anche di quelle senza nessuno davanti (`claude -p`, il Redattore),
# mette in contesto il livello 0 del percorso di lettura: i due feedback e il promemoria del
# livello 1. Gli `@import` del CLAUDE.md non li caricano gli agenti automatici: questo sì.
#
# Prova a mano:  echo '{}' | bash scripts/hook-avvio.sh

R="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
BASE="$(dirname "$R")"          # ~/ForgeGroup/progetti/sito: tutte le copie di lavoro stanno qui
MAT="$BASE/materiali"           # -> cartella "SITO FORGE" su Drive
DIP="$BASE/dipendenti-ai"       # -> materiali/05 - Dipendenti AI

echo "## Promemoria di avvio (hook SessionStart, REGOLE-DEL-SITO §10)"
echo
echo "Prima di qualunque modifica al sito, ai testi, alla SEO/GEO o alle campagne: livello 0 (i feedback"
echo "qui sotto) e livello 1 di '00 - PERCORSO DI LETTURA PRIMA DI OGNI MODIFICA.md'. In apertura della"
echo "risposta scrivi in una riga quali documenti hai letto. Per un riassunto del livello 1 senza leggerlo"
echo "tutto c'è la skill percorso-lettura; prima di aprire la PR, /chiudi-modifica."
echo
echo "Tre domande di controllo (le risposte stanno in fondo al percorso di lettura):"
echo "1. Qual è la USP, e come si scrive \"CRM\" sul sito?"
echo "2. Quali numeri dei casi si possono scrivere, e dove stanno nel codice?"
echo "3. Quali sono le ultime tre correzioni della proprietà nel feedback.md?"

mostra() { # titolo, file, byte massimi
  echo
  if [ -r "$2" ]; then
    echo "### $1"
    echo "(file: $2)"
    echo
    head -c "$3" "$2"
    echo
  else
    echo "ATTENZIONE: non trovo $2."
    echo "Il collegamento ai materiali su Drive è rotto: controlla che ~/ForgeGroup/sito-materiali punti"
    echo "alla cartella 'SITO FORGE' di Drive. Senza quel file non si lavora sui testi."
  fi
}

mostra "feedback-generale.md: le preferenze di Marco" "$BASE/feedback-generale.md" 6000
mostra "feedback.md dei dipendenti AI: le correzioni della proprietà (le nuove stanno in fondo)" "$DIP/feedback.md" 40000

echo
echo "### Livello 1, da leggere prima di modificare (non incluso qui per non gonfiare il contesto)"
echo "- $MAT/01 - Comunicazione/Scheda dei fatti Forge.md"
echo "- $MAT/01 - Comunicazione/Testa aziendale Forge/TESTA AZIENDALE - FORGE GROUP.md"
echo "- $MAT/01 - Comunicazione/Regole di comunicazione Forge v2 - 2026-09-22.md"
echo "- $R/REGOLE-DEL-SITO.md"
exit 0
