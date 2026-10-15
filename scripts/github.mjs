/**
 * Le operazioni sulle PR fatte con l'API REST di GitHub (`gh api`), al posto di `gh pr ...`.
 *
 * Perché: nelle routine di Claude Code nel cloud `gh pr` non funziona (GitHub GraphQL è bloccato,
 * prova del 15/10/2026), mentre `gh api repos/...` sì. Sul Mac `gh api` funziona allo stesso modo,
 * quindi gli script usano solo queste funzioni e girano uguali nei due posti.
 *
 * Il passaggio da bozza a pronta per la revisione non esiste in REST: nel cloud passa dalla rotta
 * `.../ccr/ready_for_review` del proxy di Claude Code, sul Mac da `gh pr ready`.
 */
import { execFileSync } from "node:child_process";

export const REPO = process.env.GITHUB_REPOSITORY || "forgegroup-developer/forgegroup";

function api(percorso, { metodo = "GET", campi } = {}) {
  const argomenti = ["api", "-X", metodo, percorso, "-H", "Accept: application/vnd.github+json"];
  let input;
  if (campi) {
    argomenti.push("--input", "-");
    input = JSON.stringify(campi);
  }
  const uscita = execFileSync("gh", argomenti, { encoding: "utf8", input, stdio: ["pipe", "pipe", "pipe"] });
  return uscita.trim() ? JSON.parse(uscita) : null;
}

function tuttiIFile(n) {
  const file = [];
  for (let pagina = 1; ; pagina++) {
    const blocco = api(`repos/${REPO}/pulls/${n}/files?per_page=100&page=${pagina}`);
    file.push(...blocco.map((f) => ({ path: f.filename })));
    if (blocco.length < 100) return file;
  }
}

/** Una PR con gli stessi nomi di campo di `gh pr view --json` usati negli script. */
export function prVedi(n) {
  const p = api(`repos/${REPO}/pulls/${n}`);
  return {
    number: p.number,
    title: p.title,
    url: p.html_url,
    body: p.body || "",
    isDraft: p.draft,
    state: p.merged_at ? "MERGED" : p.state === "open" ? "OPEN" : "CLOSED",
    headRefName: p.head.ref,
    createdAt: p.created_at,
    files: tuttiIFile(n),
  };
}

/** Le PR aperte con un'etichetta; `bozze`: true solo bozze, false solo pronte, undefined tutte. */
export function prElenco({ etichetta, bozze } = {}) {
  const aperte = [];
  for (let pagina = 1; ; pagina++) {
    const blocco = api(`repos/${REPO}/pulls?state=open&per_page=100&page=${pagina}`);
    aperte.push(...blocco);
    if (blocco.length < 100) break;
  }
  return aperte
    .filter((p) => !etichetta || p.labels.some((l) => l.name === etichetta))
    .filter((p) => bozze === undefined || p.draft === bozze)
    .map((p) => ({
      number: p.number,
      title: p.title,
      isDraft: p.draft,
      headRefName: p.head.ref,
      createdAt: p.created_at,
      files: tuttiIFile(p.number),
    }));
}

export function prCommenta(n, testo) {
  api(`repos/${REPO}/issues/${n}/comments`, { metodo: "POST", campi: { body: testo } });
}

export function cancellaRamo(ramo) {
  try {
    api(`repos/${REPO}/git/refs/heads/${ramo}`, { metodo: "DELETE" });
  } catch {
    // il ramo può essere già stato cancellato
  }
}

export function prChiudi(n, { cancella = true } = {}) {
  const p = api(`repos/${REPO}/pulls/${n}`, { metodo: "PATCH", campi: { state: "closed" } });
  if (cancella) cancellaRamo(p.head.ref);
}

export function prUnisci(n, { cancella = true } = {}) {
  const p = api(`repos/${REPO}/pulls/${n}`);
  api(`repos/${REPO}/pulls/${n}/merge`, { metodo: "PUT", campi: { merge_method: "squash" } });
  if (cancella) cancellaRamo(p.head.ref);
}

export function prCrea({ ramo, titolo, corpo, bozza = false, etichette = [] }) {
  const p = api(`repos/${REPO}/pulls`, {
    metodo: "POST",
    campi: { base: "main", head: ramo, title: titolo, body: corpo, draft: bozza },
  });
  if (etichette.length) api(`repos/${REPO}/issues/${p.number}/labels`, { metodo: "POST", campi: { labels: etichette } });
  return { number: p.number, url: p.html_url };
}

/** Bozza → pronta per la revisione. */
export function prPronta(n) {
  if (process.env.CLAUDE_CODE_REMOTE) {
    api(`repos/${REPO}/pulls/${n}/ccr/ready_for_review`, { metodo: "POST" });
  } else {
    execFileSync("gh", ["pr", "ready", String(n), "--repo", REPO], { stdio: "ignore" });
  }
}
