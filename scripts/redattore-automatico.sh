#!/bin/zsh
# Il Redattore che lavora da solo. Lo lancia il Mac ogni mattina (LaunchAgent it.forgegroup.redattore).
#
# 1. aggiorna la sua copia di lavoro (repo-redattore) all'ultimo main
# 2. guarda la coda: se ci sono già 7 articoli pronti, oggi non scrive
# 3. lancia /scrivi-articolo senza nessuno davanti, con i soli permessi che servono
# 4. manda l'articolo su Telegram con i tasti Vai, Correggi, Scarta (o un avviso se qualcosa non va)
#
# Log in ~/ForgeGroup/logs/redattore/. REDATTORE_REF=<ramo> per provare un ramo diverso da main.

export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
BASE="$HOME/ForgeGroup/progetti/sito"
WT="$BASE/repo-redattore"
REF="${REDATTORE_REF:-origin/main}"
LOG="$HOME/ForgeGroup/logs/redattore"
OGGI="$(date +%F)"
mkdir -p "$LOG"
exec >>"$LOG/$OGGI.log" 2>&1
echo "=== $(date '+%F %T') avvio ($REF)"

# Un solo Redattore alla volta.
if ! mkdir "$LOG/.in-corso" 2>/dev/null; then echo "già in corso, esco"; exit 0; fi
trap 'rmdir "$LOG/.in-corso"' EXIT

avvisa() { node "$WT/scripts/telegram.mjs" messaggio "$1" || osascript -e "display notification \"$1\" with title \"Redattore Forge\""; }

[ -d "$WT" ] || git -C "$BASE/repo" worktree add --detach "$WT" origin/main
cd "$WT" || exit 1
git fetch -q origin || { echo "fetch fallito"; exit 1; }
git checkout -q --detach "$REF" || { avvisa "Redattore: non riesco ad aggiornare la copia di lavoro. Guarda il log del $OGGI."; exit 1; }

DA_SCRIVERE="$(node scripts/coda-articoli.mjs | python3 -c 'import json,sys; print(json.load(sys.stdin)["daScrivere"])')"
echo "da scrivere: $DA_SCRIVERE"
if [ "$DA_SCRIVERE" = "0" ]; then echo "coda piena, oggi non scrivo"; exit 0; fi

MATERIALI="$HOME/Library/CloudStorage/GoogleDrive-info@forgegroup.it/Drive condivisi/FORGE GROUP/www.forgegroup.it"
USCITA="$LOG/$OGGI-redattore.txt"
claude -p "/scrivi-articolo" \
  --permission-mode acceptEdits \
  --add-dir "$MATERIALI" "$HOME/ForgeGroup/ricerca" "$HOME/ForgeGroup/progetti/sito/materiali" "$HOME/ForgeGroup/progetti/sito/dipendenti-ai" "$HOME/Desktop/Claude Code Forge Group" \
  --allowedTools "Read" "Write" "Edit" "Glob" "Grep" "WebSearch" "WebFetch" "Agent" "Task" \
    "Bash(git:*)" "Bash(gh pr create:*)" "Bash(gh pr list:*)" "Bash(gh pr view:*)" \
    "Bash(node scripts/coda-articoli.mjs:*)" "Bash(node scripts/controlla-articolo.mjs:*)" \
    "Bash(python3 $HOME/ForgeGroup/ricerca/concorrente-a/cerca.py:*)" "Bash(python3 $HOME/ForgeGroup/ricerca/keyword/keyword.py:*)" \
    "Bash(python3 $HOME/ForgeGroup/progetti/sito/dipendenti-ai/Redazione/banca.py:*)" \
    "Bash(ls:*)" "Bash(date:*)" "Bash(wc:*)" \
  > "$USCITA" 2>&1
echo "claude uscito con codice $?"
# Il Redattore ha lavorato su un ramo dell'articolo: si torna al ramo di partenza prima di usare gli script.
git checkout -q --detach "$REF"

PR_URL="$(grep -oE 'PR: https://github.com/[^ ]+/pull/[0-9]+' "$USCITA" | tail -1 | sed 's/^PR: //')"
if [ -n "$PR_URL" ]; then
  node scripts/telegram.mjs articolo "${PR_URL##*/}" || osascript -e "display notification \"Articolo pronto: $PR_URL\" with title \"Redattore Forge\""
else
  avvisa "Redattore: oggi non ho aperto la PR dell'articolo. Il motivo è in fondo al log del $OGGI ($USCITA)."
fi
echo "=== $(date '+%F %T') fine"
