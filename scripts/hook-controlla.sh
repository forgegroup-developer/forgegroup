#!/bin/bash
# Hook PostToolUse (Edit|Write) di Claude Code (REGOLE-DEL-SITO §10, 12/11/2026).
#
# Dopo ogni modifica a un file sotto src/ lancia scripts/controlla-sito.mjs (parole vietate, numeri
# fuori da prove.ts, lineetta lunga). Se trova errori li rimanda al modello, che li corregge subito
# invece di scoprirli dieci minuti dopo nel Revisore in CI. Gli articoli del blog hanno il loro
# controllo (controlla-articolo.mjs) e qui si saltano.
#
# Prova a mano:
#   echo '{"tool_name":"Edit","tool_input":{"file_path":"'$PWD'/src/app/page.tsx"}}' | bash scripts/hook-controlla.sh

R="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
input="$(cat)"
f="$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)"
[ -z "$f" ] && exit 0

case "$f" in
  "$R"/src/app/blog/*|"$R"/src/components/blog/*) exit 0 ;;
  "$R"/src/*) ;;
  *) exit 0 ;;
esac
[ -f "$R/scripts/controlla-sito.mjs" ] || exit 0

out="$(cd "$R" && node scripts/controlla-sito.mjs 2>&1)"
code=$?
[ $code -eq 0 ] && exit 0

errori="$(printf '%s\n' "$out" | grep '^ERRORE' | head -20)"
rel="${f#"$R"/}"
jq -n --arg r "controlla-sito.mjs ha trovato errori dopo la modifica a $rel. Correggili prima di continuare (REGOLE-DEL-SITO §5 e §9, 0 errori prima della PR):
$errori" '{decision: "block", reason: $r}'
exit 0
