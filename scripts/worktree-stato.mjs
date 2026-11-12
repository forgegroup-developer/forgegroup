#!/usr/bin/env node
/**
 * Lo stato delle copie di lavoro (git worktree) del sito.
 *
 *   node scripts/worktree-stato.mjs
 *
 * Per ognuna: branch, data dell'ultimo commit, commit avanti e indietro rispetto a origin/main,
 * se il lavoro è già dentro main, se ci sono modifiche non salvate. Non cancella niente.
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const git = (args, cwd = RADICE) => {
  try {
    return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
};

try {
  execFileSync("git", ["fetch", "--quiet", "origin", "main"], { cwd: RADICE, stdio: "ignore", timeout: 20000 });
} catch {
  console.log("(non riesco ad aggiornare origin/main: uso quello che c'è in locale)\n");
}

const blocchi = git(["worktree", "list", "--porcelain"]).split("\n\n").filter(Boolean);
const righe = [];
for (const b of blocchi) {
  const percorso = (b.match(/^worktree (.+)$/m) || [])[1];
  if (!percorso) continue;
  const branch = (b.match(/^branch refs\/heads\/(.+)$/m) || [])[1] || "(detached)";
  const data = git(["log", "-1", "--format=%cs", "HEAD"], percorso) || "?";
  const conta = git(["rev-list", "--left-right", "--count", "origin/main...HEAD"], percorso);
  const [indietro, avanti] = conta ? conta.split(/\s+/).map(Number) : ["?", "?"];
  // git cherry: "+" = commit non ancora in main, "-" = già in main (anche se unito con squash o rebase)
  const daUnire = git(["cherry", "origin/main", "HEAD"], percorso).split("\n").filter((l) => l.startsWith("+")).length;
  const unito = daUnire === 0 ? "sì" : "no";
  const sporco = git(["status", "--porcelain"], percorso).split("\n").filter(Boolean).length;
  righe.push({ percorso: path.basename(percorso), branch, data, avanti: daUnire, indietro, unito, sporco });
}

righe.sort((a, b) => (a.unito === b.unito ? a.data.localeCompare(b.data) : a.unito === "sì" ? -1 : 1));

const col = (s, n) => String(s).padEnd(n);
console.log(`${col("copia", 20)} ${col("branch", 44)} ${col("ultimo", 11)} ${col("da unire", 9)} ${col("indietro", 9)} ${col("in main", 8)} non salvati`);
console.log("-".repeat(112));
for (const r of righe) {
  console.log(`${col(r.percorso, 20)} ${col(r.branch, 44)} ${col(r.data, 11)} ${col(r.avanti, 9)} ${col(r.indietro, 9)} ${col(r.unito, 8)} ${r.sporco}`);
}

const chiudibili = righe.filter((r) => r.unito === "sì" && r.sporco === 0 && r.branch !== "main" && r.percorso !== "repo");
console.log(`\n${righe.length} copie. ${chiudibili.length} già dentro main e pulite (si possono chiudere, decide la proprietà).`);
