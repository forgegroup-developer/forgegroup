#!/bin/zsh
# Il Redattore che lavora da solo. Lo lancia il Mac (LaunchAgent it.forgegroup.redattore) alle
# 09:30, 12:30, 17:30 e all'accensione, tramite ~/ForgeGroup/automazioni/avvia-redattore.sh, che
# prima aspetta che la rete sia pronta. Lavora una volta sola al giorno.
#
# 1. prende il blocco (con il suo PID: un blocco di un processo morto si toglie)
# 2. aggiorna la sua copia di lavoro (repo-redattore) all'ultimo main
# 3. chiude le bozze scadute; se la coda è piena, oggi non scrive
# 4. lancia /scrivi-articolo senza nessuno davanti, con i soli permessi che servono (max 90 minuti)
# 5. controlla solo l'articolo nuovo; se il Revisore l'ha approvato, lo mette in coda da solo
#    (silenzio-assenso) e lo manda su Telegram con il tasto Ritira; altrimenti con Vai/Correggi/Scarta
#
# "Fatto oggi" si scrive solo se il lavoro è riuscito: se fallisce, riprova al giro successivo;
# al terzo fallimento del giorno avvisa su Telegram e riprova domani.
# Log in ~/ForgeGroup/logs/redattore/. REDATTORE_REF=<ramo> per provare un ramo diverso da main,
# REDATTORE_FORZA=1 per lavorare anche se oggi ha già lavorato; REDATTORE_CLAUDE=<script> solo per le prove.

export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
BASE="$HOME/ForgeGroup/progetti/sito"
WT="$BASE/repo-redattore"
REF="${REDATTORE_REF:-origin/main}"
LOG="$HOME/ForgeGroup/logs/redattore"
OGGI="$(date +%F)"
FATTO="$LOG/fatto-$OGGI"
mkdir -p "$LOG"
exec >>"$LOG/$OGGI.log" 2>&1
echo "=== $(date '+%F %T') avvio ($REF, pid $$)"

avvisa() { node "$WT/scripts/telegram.mjs" messaggio "$1" || osascript -e "display notification \"$1\" with title \"Redattore Forge\""; }

if [ -f "$FATTO" ] && [ -z "${REDATTORE_FORZA:-}" ]; then echo "oggi ho già lavorato"; exit 0; fi

# Il blocco: una cartella con il PID. Se il processo non c'è più, o il blocco ha più di 3 ore
# (Mac spento a metà lavoro), si toglie.
BLOCCO="$LOG/.in-corso"
prendi_blocco() {
  if mkdir "$BLOCCO" 2>/dev/null; then echo $$ > "$BLOCCO/pid"; return 0; fi
  local pid="$(cat "$BLOCCO/pid" 2>/dev/null)"
  local eta=$(( $(date +%s) - $(stat -f %m "$BLOCCO") ))
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null && [ "$eta" -lt 10800 ]; then return 1; fi
  echo "blocco vecchio (pid ${pid:-?}, $eta secondi): lo tolgo"
  rm -rf "$BLOCCO"
  mkdir "$BLOCCO" 2>/dev/null && echo $$ > "$BLOCCO/pid"
}
prendi_blocco || { echo "già in corso, esco"; exit 0; }
trap 'rm -rf "$BLOCCO"' EXIT

fallito() {
  local n=$(( $(cat "$LOG/tentativi-$OGGI" 2>/dev/null || echo 0) + 1 ))
  echo "$n" > "$LOG/tentativi-$OGGI"
  echo "tentativo $n fallito: $1"
  if [ "$n" -ge 3 ]; then
    avvisa "Redattore: oggi non sono riuscito a scrivere l'articolo dopo tre tentativi ($1). Riprovo domani; i dettagli sono nel log del $OGGI."
    touch "$FATTO"
  fi
  exit 1
}

[ -d "$WT" ] || git -C "$BASE/repo" worktree add --detach "$WT" origin/main
cd "$WT" || fallito "copia di lavoro mancante"
git fetch -q origin || fallito "rete non disponibile"
git checkout -q -f --detach "$REF" || fallito "copia di lavoro non aggiornabile"

# Le bozze il cui giorno di uscita è passato senza approvazione si chiudono.
coda() { node scripts/coda-articoli.mjs > "$LOG/coda.json" || fallito "calcolo della coda"; }
campo() { python3 -c "import json; d=json.load(open('$LOG/coda.json')); print($1)"; }
coda
for PR in $(campo '" ".join(str(b["pr"]) for b in d["bozzeScadute"])'); do
  gh pr close "$PR" --delete-branch --comment "Bozza non approvata prima del giorno di uscita: chiusa, l'argomento torna libero." \
    && avvisa "La bozza della PR #$PR non è stata approvata in tempo: l'ho chiusa e l'argomento torna libero."
done
coda
DA_SCRIVERE="$(campo 'd["daScrivere"]')"
echo "da scrivere: $DA_SCRIVERE (bozze aperte: $(campo 'len(d["bozze"])'))"
if [ "$DA_SCRIVERE" = "0" ]; then echo "coda piena o troppe bozze, oggi non scrivo"; touch "$FATTO"; exit 0; fi

MATERIALI="$HOME/Library/CloudStorage/GoogleDrive-info@forgegroup.it/Drive condivisi/FORGE GROUP/www.forgegroup.it"
USCITA="$LOG/$OGGI-redattore.txt"
# Al massimo 90 minuti (macOS non ha "timeout": lo fa perl con un allarme, codice di uscita 142).
perl -e 'alarm shift; exec @ARGV' 5400 "${REDATTORE_CLAUDE:-claude}" -p "/scrivi-articolo" \
  --permission-mode acceptEdits \
  --add-dir "$MATERIALI" "$HOME/ForgeGroup/ricerca" "$HOME/ForgeGroup/progetti/sito/materiali" "$HOME/ForgeGroup/progetti/sito/dipendenti-ai" "$HOME/Desktop/Claude Code Forge Group" \
  --allowedTools "Read" "Write" "Edit" "Glob" "Grep" "WebSearch" "WebFetch" "Agent" "Task" \
    "Bash(git status:*)" "Bash(git diff:*)" "Bash(git log:*)" "Bash(git show:*)" "Bash(git fetch:*)" \
    "Bash(git switch -c articolo/:*)" "Bash(git add:*)" "Bash(git commit:*)" "Bash(git push -u origin articolo/:*)" \
    "Bash(gh pr create:*)" "Bash(gh pr list:*)" "Bash(gh pr view:*)" \
    "Bash(node scripts/coda-articoli.mjs:*)" "Bash(node scripts/copertina.mjs:*)" "Bash(node scripts/controlla-articolo.mjs:*)" \
    "Bash(python3 $HOME/ForgeGroup/ricerca/concorrente-a/cerca.py:*)" "Bash(python3 $HOME/ForgeGroup/ricerca/keyword/keyword.py:*)" \
    "Bash(python3 $HOME/ForgeGroup/progetti/sito/dipendenti-ai/Redazione/banca.py:*)" \
    "Bash(ls:*)" "Bash(date:*)" "Bash(wc:*)" \
  > "$USCITA" 2>&1
ESITO=$?
echo "claude uscito con codice $ESITO"
# Il Redattore ha lavorato su un ramo dell'articolo: si torna al ramo di partenza prima di usare gli script.
git checkout -q -f --detach "$REF"
[ "$ESITO" = "142" ] && fallito "Claude ha superato i 90 minuti"

PR_URL="$(grep -oE 'PR: https://github.com/[^ ]+/pull/[0-9]+' "$USCITA" | tail -1 | sed 's/^PR: //')"
[ -n "$PR_URL" ] || fallito "nessuna PR aperta (il motivo è in fondo a $USCITA)"
PR="${PR_URL##*/}"

# Si controlla solo l'articolo nuovo, sul suo ramo (con la sua copertina).
INFO="$(gh pr view "$PR" --json isDraft,headRefName,files --jq '[(.isDraft|tostring), .headRefName, ([.files[].path | select(startswith("content/articoli/") and endswith(".json"))][0] // "")] | @tsv')"
BOZZA="$(echo "$INFO" | cut -f1)"; RAMO="$(echo "$INFO" | cut -f2)"; FILE="$(echo "$INFO" | cut -f3)"
CONTROLLO="no"
if [ -n "$FILE" ] && git fetch -q origin "$RAMO" && git checkout -q -f --detach "origin/$RAMO"; then
  node scripts/controlla-articolo.mjs "$FILE" && CONTROLLO="sì"
fi
git checkout -q -f --detach "$REF"
echo "PR #$PR · bozza: $BOZZA · controllo: $CONTROLLO"

# Silenzio-assenso (decisione della proprietà, 01/10/2026). Il file "approvazione-manuale"
# riporta tutto al tasto Vai.
if [ "$BOZZA" = "false" ] && [ "$CONTROLLO" = "sì" ] && [ ! -f "$HOME/ForgeGroup/automazioni/approvazione-manuale" ]; then
  node scripts/telegram.mjs automatico "$PR" && echo "PR #$PR in coda (silenzio-assenso)"
else
  node scripts/telegram.mjs articolo "$PR" || osascript -e "display notification \"Articolo pronto: $PR_URL\" with title \"Redattore Forge\""
fi

touch "$FATTO"
rm -f "$LOG/tentativi-$OGGI"
node scripts/telegram.mjs promemoria || true
coda
IN_CODA="$(campo 'd["inCoda"]')"
[ "$IN_CODA" -lt 3 ] && avvisa "Attenzione: in coda restano solo $IN_CODA articoli pronti. Se il Mac resta spento, fra $IN_CODA giorni le uscite si fermano."
echo "=== $(date '+%F %T') fine"
