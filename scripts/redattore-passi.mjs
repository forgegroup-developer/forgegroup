#!/usr/bin/env node
/**
 * I passi fissi del Redattore, uguali sul Mac e nella routine cloud. Le decisioni le prende
 * questo script, non il modello.
 *
 * Uso:
 *   node scripts/redattore-passi.mjs dove
 *        dove stanno i materiali: sul Mac le cartelle di ~/ForgeGroup, nel cloud il repo privato
 *        forge-ricerca (cerca.py, mappa degli ID Drive) e il connettore Google Drive
 *   node scripts/redattore-passi.mjs prima
 *        chiude le bozze scadute (giorno di uscita passato senza approvazione) e stampa la coda
 *   node scripts/redattore-passi.mjs apri-pr --ramo articolo/<slug> --titolo "…" --corpo-file <file> [--bozza]
 *        apre la PR dell'articolo con l'etichetta "articolo" (al posto di `gh pr create`,
 *        che nel cloud non funziona) e stampa "PR: <link>"
 *   node scripts/redattore-passi.mjs dopo <n PR>
 *        controlla l'articolo della PR sul suo ramo. Se la PR è pronta e il controllo passa:
 *        silenzio-assenso, etichetta `silenzio-assenso` e merge (Vercel lo manda su Telegram con
 *        Ritira). Altrimenti etichetta `telegram-approva` (Vercel lo manda con Vai/Correggi/Scarta).
 *        L'approvazione manuale per tutti si accende con REDAZIONE_APPROVAZIONE_MANUALE=1 o con il
 *        file ~/ForgeGroup/automazioni/approvazione-manuale sul Mac.
 *
 * Su Telegram scrive Vercel (webhook GitHub → /api/github): la chiave del bot non serve qui.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { prChiudi, prCommenta, prCrea, prEtichetta, prUnisci, prVedi } from "./github.mjs";

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const node = (...a) => execFileSync("node", a, { cwd: RADICE, encoding: "utf8" });
const git = (...a) => execFileSync("git", a, { cwd: RADICE, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

function opzioni(argomenti) {
  const o = { _: [] };
  for (let i = 0; i < argomenti.length; i++) {
    if (argomenti[i].startsWith("--")) {
      const k = argomenti[i].slice(2);
      const v = argomenti[i + 1];
      if (v === undefined || v.startsWith("--")) o[k] = true;
      else (o[k] = v), i++;
    } else o._.push(argomenti[i]);
  }
  return o;
}

function dove() {
  const casa = os.homedir();
  const mac = path.join(casa, "ForgeGroup", "progetti", "sito", "materiali");
  // Nel cloud i repo stanno uno accanto all'altro.
  const ricercaCloud = [path.join(RADICE, "..", "forge-ricerca"), path.join(casa, "forge-ricerca")].find((p) => fs.existsSync(p));
  if (fs.existsSync(mac)) {
    return {
      dove: "mac",
      materiali: mac,
      dipendentiAi: path.join(casa, "ForgeGroup", "progetti", "sito", "dipendenti-ai"),
      feedbackGenerale: path.join(casa, "ForgeGroup", "progetti", "sito", "feedback-generale.md"),
      cerca: path.join(casa, "ForgeGroup", "ricerca", "concorrente-a", "cerca.py"),
      keyword: path.join(casa, "ForgeGroup", "ricerca", "keyword", "keyword.py"),
      banca: path.join(casa, "ForgeGroup", "progetti", "sito", "dipendenti-ai", "Redazione", "banca.py"),
    };
  }
  return {
    dove: "cloud",
    materiali: "Google Drive (connettore): ID dei file in " + (ricercaCloud ? path.join(ricercaCloud, "materiali-drive.md") : "forge-ricerca/materiali-drive.md (repo NON trovato)"),
    feedbackGenerale: ricercaCloud ? path.join(ricercaCloud, "feedback-generale.md") : null,
    cerca: ricercaCloud ? path.join(ricercaCloud, "concorrente-a", "cerca.py") : null,
    keyword: null,
    banca: "scarica da Drive banca.py e 'Banca del materiale vero.md', poi: BANCA_FILE=<banca .md> python3 <banca.py> <repo>",
    registro: "aggiorna su Drive il file 'dipendenti-ai/Registro/<AAAA-MM>.md' (ID nella mappa): leggi, aggiungi la riga, riscrivi",
  };
}

function coda() {
  return JSON.parse(node("scripts/coda-articoli.mjs"));
}

function prima() {
  let c = coda();
  for (const b of c.bozzeScadute) {
    prCommenta(b.pr, "Bozza non approvata prima del giorno di uscita: chiusa, l'argomento torna libero.");
    prChiudi(b.pr);
    console.error(`bozza scaduta chiusa: PR #${b.pr}`);
  }
  if (c.bozzeScadute.length) c = coda();
  console.log(JSON.stringify({ daScrivere: c.daScrivere, inCoda: c.inCoda, obiettivo: c.obiettivo, prossimoGiornoLibero: c.prossimoGiornoLibero, prossimoAutore: c.prossimoAutore, bozzeChiuse: c.bozzeScadute?.length ?? 0 }, null, 1));
}

function apriPr(o) {
  if (!/^articolo\/[a-z0-9-]+$/.test(o.ramo ?? "")) throw new Error("--ramo deve essere articolo/<slug>");
  if (!o.titolo) throw new Error("manca --titolo");
  const corpo = o["corpo-file"] ? fs.readFileSync(o["corpo-file"], "utf8") : "";
  const pr = prCrea({ ramo: o.ramo, titolo: o.titolo, corpo, bozza: Boolean(o.bozza), etichette: ["articolo"] });
  console.log(`PR: ${pr.url}`);
}

function manuale() {
  return process.env.REDAZIONE_APPROVAZIONE_MANUALE === "1" || fs.existsSync(path.join(os.homedir(), "ForgeGroup", "automazioni", "approvazione-manuale"));
}

function dopo(n) {
  const pr = prVedi(n);
  const file = pr.files.map((f) => f.path).find((p) => p.startsWith("content/articoli/") && p.endsWith(".json"));
  let controllo = false;
  if (file) {
    const partenza = git("rev-parse", "HEAD").trim();
    try {
      git("fetch", "-q", "origin", pr.headRefName);
      git("checkout", "-q", "-f", "--detach", `origin/${pr.headRefName}`);
      node("scripts/controlla-articolo.mjs", file);
      controllo = true;
    } catch {
      controllo = false;
    } finally {
      git("checkout", "-q", "-f", "--detach", partenza);
    }
  }
  const automatico = !pr.isDraft && controllo && !manuale();
  if (automatico) {
    // L'etichetta prima del merge: è quella che dice a Vercel di mandarlo con il tasto Ritira.
    prEtichetta(n, "silenzio-assenso");
    try {
      prUnisci(n);
      console.log(`PR #${n} in coda (silenzio-assenso)`);
      return;
    } catch (e) {
      console.error(`merge non riuscito: ${e.message}`);
    }
  }
  prEtichetta(n, "telegram-approva");
  console.log(`PR #${n} su Telegram con Vai/Correggi/Scarta (bozza: ${pr.isDraft}, controllo: ${controllo ? "sì" : "no"})`);
}

const [comando, ...resto] = process.argv.slice(2);
const o = opzioni(resto);
if (comando === "dove") console.log(JSON.stringify(dove(), null, 1));
else if (comando === "prima") prima();
else if (comando === "apri-pr") apriPr(o);
else if (comando === "dopo" && /^\d+$/.test(o._[0] ?? "")) dopo(o._[0]);
else {
  console.log("Uso: dove | prima | apri-pr --ramo articolo/<slug> --titolo \"…\" --corpo-file <file> [--bozza] | dopo <n PR>");
  process.exit(1);
}
