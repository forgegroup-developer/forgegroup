#!/usr/bin/env node
/**
 * Il bot Telegram del Redattore: manda gli articoli alla proprietà e riceve Vai, Correggi, Scarta.
 *
 * Uso:
 *   node scripts/telegram.mjs collega               salva la chat della proprietà (dopo /start al bot)
 *   node scripts/telegram.mjs messaggio "testo"     manda un messaggio semplice
 *   node scripts/telegram.mjs articolo <n PR>       manda l'articolo della PR con i tre tasti
 *   node scripts/telegram.mjs ricevi                legge i tasti premuti e i messaggi (lo lancia
 *                                                   il Mac ogni minuto) e fa quello che chiedono
 *
 * La chiave del bot sta nel Portachiavi del Mac (servizio "forge-telegram-redattore"), mai nel
 * repo. Il bot obbedisce solo alla chat salvata con "collega": gli altri messaggi li ignora.
 * Vai = merge della PR (l'articolo entra in coda), Scarta = PR chiusa, Correggi = la correzione
 * scritta finisce come commento nella PR, e si applica in sessione con /correggi-articolo.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CARTELLA = path.join(os.homedir(), "ForgeGroup", "logs", "telegram");
const FILE_CHAT = path.join(CARTELLA, "chat-id");
const FILE_OFFSET = path.join(CARTELLA, "offset");
const FILE_ATTESA = path.join(CARTELLA, "correzione-in-attesa.json");
const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
fs.mkdirSync(CARTELLA, { recursive: true });

function chiave() {
  try {
    return execFileSync("security", ["find-generic-password", "-s", "forge-telegram-redattore", "-w"], { encoding: "utf8" }).trim();
  } catch {
    console.error("Manca la chiave del bot nel Portachiavi (servizio forge-telegram-redattore).");
    process.exit(2);
  }
}
const API = `https://api.telegram.org/bot${chiave()}`;

async function chiama(metodo, dati = {}) {
  const r = await fetch(`${API}/${metodo}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dati) });
  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram ${metodo}: ${j.description}`);
  return j.result;
}

const leggi = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").trim() : "");
const chat = () => leggi(FILE_CHAT);
const gh = (...a) => execFileSync("gh", a, { cwd: RADICE, encoding: "utf8" });

async function messaggio(testo, tasti) {
  if (!chat()) throw new Error("Chat non collegata: scrivi /start al bot e lancia `node scripts/telegram.mjs collega`.");
  return chiama("sendMessage", {
    chat_id: chat(),
    text: testo.slice(0, 4000),
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(tasti ? { reply_markup: { inline_keyboard: [tasti] } } : {}),
  });
}

const html = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function articolo(n) {
  const pr = JSON.parse(gh("pr", "view", String(n), "--json", "title,url,isDraft,headRefName,files,body"));
  const file = pr.files.map((f) => f.path).find((p) => p.startsWith("content/articoli/") && p.endsWith(".json"));
  let a = {};
  if (file) {
    execFileSync("git", ["fetch", "-q", "origin", pr.headRefName], { cwd: RADICE });
    a = JSON.parse(execFileSync("git", ["show", `origin/${pr.headRefName}:${file}`], { cwd: RADICE, encoding: "utf8" }));
  }
  const esito = (pr.body.match(/ESITO:\s*([A-Z ]+)/) || [])[1]?.trim() ?? "vedi la PR";
  const testo = [
    pr.isDraft ? "⚠️ <b>BOZZA: il Revisore ha dei dubbi, leggili nella PR</b>" : "📝 <b>Articolo nuovo</b>",
    "",
    `<b>${html(a.title ?? pr.title)}</b>`,
    a.date ? `Esce il ${html(a.date)} alle 09:00 · livello ${html(a.livello)} · firma ${html(a.autore)}` : "",
    a.seo ? `Parola chiave: <i>${html(a.seo.parolaChiave)}</i>` : "",
    "",
    a.inBreve ? `<b>Il problema:</b> ${html(a.inBreve.problema)}\n<b>La causa:</b> ${html(a.inBreve.causa)}\n<b>Cosa cambia:</b> ${html(a.inBreve.cambia)}` : "",
    "",
    `Revisore: ${html(esito)}`,
    `Leggilo intero (anteprima nella PR): ${pr.url}`,
  ].filter((r) => r !== undefined).join("\n");
  const tasti = pr.isDraft
    ? [{ text: "✏️ Correggi", callback_data: `correggi:${n}` }, { text: "🗑 Scarta", callback_data: `scarta:${n}` }]
    : [{ text: "✅ Vai", callback_data: `vai:${n}` }, { text: "✏️ Correggi", callback_data: `correggi:${n}` }, { text: "🗑 Scarta", callback_data: `scarta:${n}` }];
  await messaggio(testo, tasti);
}

async function collega() {
  const agg = await chiama("getUpdates", { timeout: 0 });
  const ultimo = [...agg].reverse().find((u) => u.message?.chat?.type === "private");
  if (!ultimo) {
    console.log("Nessun messaggio trovato: apri il bot su Telegram, premi Avvia (/start) e rilancia.");
    process.exit(1);
  }
  fs.writeFileSync(FILE_CHAT, String(ultimo.message.chat.id));
  fs.writeFileSync(FILE_OFFSET, String(ultimo.update_id + 1));
  await messaggio("Collegato. Da qui riceverai gli articoli del Redattore, con i tasti Vai, Correggi e Scarta.");
  console.log(`Chat collegata (${ultimo.message.from?.first_name ?? "proprietà"}).`);
}

async function ricevi() {
  const offset = Number(leggi(FILE_OFFSET) || 0);
  const agg = await chiama("getUpdates", { offset, timeout: 0 });
  for (const u of agg) {
    fs.writeFileSync(FILE_OFFSET, String(u.update_id + 1));
    const daChi = String(u.callback_query?.message?.chat?.id ?? u.message?.chat?.id ?? "");
    if (!chat() || daChi !== chat()) continue; // solo la proprietà

    if (u.callback_query) {
      const [azione, n] = u.callback_query.data.split(":");
      await chiama("answerCallbackQuery", { callback_query_id: u.callback_query.id });
      try {
        if (azione === "vai") {
          gh("pr", "merge", n, "--squash", "--delete-branch");
          await messaggio(`✅ PR #${n} unita: l'articolo è in coda ed esce nel suo giorno.`);
        } else if (azione === "scarta") {
          gh("pr", "close", n, "--delete-branch");
          await messaggio(`🗑 PR #${n} chiusa. L'argomento torna libero.`);
        } else if (azione === "correggi") {
          fs.writeFileSync(FILE_ATTESA, JSON.stringify({ pr: n, quando: Date.now() }));
          await messaggio(`✏️ Scrivimi (o detta) cosa cambiare nell'articolo della PR #${n}.`);
        }
      } catch (e) {
        await messaggio(`Non ci sono riuscito: ${html(e.message).slice(0, 500)}`);
      }
      continue;
    }

    const testo = u.message?.text?.trim();
    if (!testo || testo.startsWith("/")) continue;
    const attesa = leggi(FILE_ATTESA);
    if (!attesa) {
      await messaggio("Ricevuto. Per correggere un articolo premi prima ✏️ Correggi sotto l'articolo.");
      continue;
    }
    const { pr } = JSON.parse(attesa);
    fs.rmSync(FILE_ATTESA);
    // La correzione resta scritta nella PR: la applica il Redattore in una sessione con la proprietà
    // (/correggi-articolo). Nessun agente parte da solo su un messaggio arrivato da Telegram.
    gh("pr", "comment", String(pr), "--body", `**Correzione della proprietà (da Telegram):**\n\n${testo}`);
    await messaggio(`Correzione salvata nella PR #${pr}. La applichiamo con /correggi-articolo ${pr} in una sessione.`);
  }
}

const [comando, ...resto] = process.argv.slice(2);
if (comando === "collega") await collega();
else if (comando === "messaggio") await messaggio(html(resto.join(" ")));
else if (comando === "articolo") await articolo(resto[0]);
else if (comando === "ricevi") await ricevi();
else {
  console.log("Uso: collega | messaggio \"testo\" | articolo <n PR> | ricevi");
  process.exit(1);
}
