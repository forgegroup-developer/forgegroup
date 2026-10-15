import { createHmac, timingSafeEqual } from "node:crypto";
import { after, NextResponse } from "next/server";
import { avvisaUnita, inviaArticolo } from "@/lib/redazione/telegram";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * Webhook di GitHub (evento "Pull requests"): manda gli articoli su Telegram al posto del Mac.
 * La routine del Redattore nel cloud non ha la chiave di Telegram: mette un'etichetta e basta.
 *
 * - etichetta `telegram-approva` aggiunta → l'articolo con Vai, Correggi, Scarta;
 * - PR unita con l'etichetta `silenzio-assenso` → l'articolo "già in coda" con Ritira.
 *
 * GitHub firma il corpo con GITHUB_WEBHOOK_SECRET (header X-Hub-Signature-256); senza, 401.
 */
function firmaValida(corpo: string, firma: string | null) {
  const segreto = process.env.GITHUB_WEBHOOK_SECRET?.trim();
  if (!segreto || !firma) return false;
  const attesa = Buffer.from(`sha256=${createHmac("sha256", segreto).update(corpo).digest("hex")}`);
  const ricevuta = Buffer.from(firma);
  return attesa.length === ricevuta.length && timingSafeEqual(attesa, ricevuta);
}

type Evento = {
  action?: string;
  label?: { name?: string };
  pull_request?: { number: number; merged?: boolean; labels?: { name: string }[] };
};

export async function POST(request: Request) {
  const corpo = await request.text();
  if (!firmaValida(corpo, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (request.headers.get("x-github-event") !== "pull_request") return NextResponse.json({ ignorato: true });

  const e = JSON.parse(corpo) as Evento;
  const pr = e.pull_request;
  if (!pr) return NextResponse.json({ ignorato: true });
  const etichette = (pr.labels ?? []).map((l) => l.name);

  let lavoro: (() => Promise<void>) | null = null;
  if (e.action === "labeled" && e.label?.name === "telegram-approva") {
    lavoro = () => inviaArticolo(pr.number);
  } else if (e.action === "closed" && pr.merged && etichette.includes("silenzio-assenso")) {
    lavoro = () => avvisaUnita(pr.number);
  }
  if (!lavoro) return NextResponse.json({ ignorato: true });

  const fai = lavoro;
  after(async () => {
    try {
      await fai();
    } catch (err) {
      console.error(`github → telegram PR #${pr.number}:`, err instanceof Error ? err.message : err);
    }
  });
  return NextResponse.json({ ok: true });
}
