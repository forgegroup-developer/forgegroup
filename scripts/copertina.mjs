#!/usr/bin/env node
/**
 * La copertina di un articolo, scelta dal Redattore su Pexels (licenza libera anche per uso
 * commerciale, senza obbligo di citare l'autore).
 *
 * Uso:
 *   node scripts/copertina.mjs cerca "parole in inglese o italiano"   10 foto orizzontali
 *   node scripts/copertina.mjs scarica <id foto> <slug articolo>      la scarica, la comprime
 *        sotto i 300 KB in public/images/blog/<slug>.jpg e stampa i campi da mettere nel file
 *        dell'articolo (featuredImage, featuredImageAlt da scrivere, copertina con la fonte)
 *
 * La chiave di Pexels sta nel Portachiavi del Mac (servizio "forge-pexels"), mai nel repo.
 * Le regole su cosa scegliere sono nel comando /scrivi-articolo, passo 4 bis.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const MAX_BYTE = 300 * 1024;

function chiave() {
  try {
    return execFileSync("security", ["find-generic-password", "-s", "forge-pexels", "-w"], { encoding: "utf8" }).trim();
  } catch {
    console.error("Manca la chiave di Pexels nel Portachiavi (servizio forge-pexels): copertina non scelta.");
    process.exit(2);
  }
}

async function pexels(percorso) {
  const r = await fetch(`https://api.pexels.com/v1/${percorso}`, { headers: { Authorization: chiave() } });
  if (!r.ok) throw new Error(`Pexels risponde ${r.status}`);
  return r.json();
}

async function cerca(parole) {
  const q = new URLSearchParams({ query: parole, orientation: "landscape", per_page: "10", locale: "it-IT" });
  const j = await pexels(`search?${q}`);
  const foto = j.photos.map((f) => ({
    id: f.id,
    descrizione: f.alt,
    autore: f.photographer,
    pagina: f.url,
    anteprima: f.src.medium,
    misure: `${f.width}x${f.height}`,
  }));
  console.log(JSON.stringify(foto, null, 1));
}

async function scarica(id, slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("slug non valido");
  const f = await pexels(`photos/${Number(id)}`);
  const tmp = path.join(os.tmpdir(), `copertina-${id}.jpg`);
  const r = await fetch(f.src.large2x);
  if (!r.ok) throw new Error(`download non riuscito (${r.status})`);
  fs.writeFileSync(tmp, Buffer.from(await r.arrayBuffer()));

  const dest = path.join(RADICE, "public", "images", "blog", `${slug}.jpg`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  // Larghezza 1600 e qualità che scende finché il file sta sotto i 300 KB (regola 6 delle immagini).
  for (const qualita of [72, 65, 58, 50, 42]) {
    execFileSync("sips", ["-Z", "1600", "-s", "format", "jpeg", "-s", "formatOptions", String(qualita), tmp, "--out", dest], { stdio: "ignore" });
    if (fs.statSync(dest).size <= MAX_BYTE) break;
  }
  const kb = Math.round(fs.statSync(dest).size / 1024);
  if (kb > 300) throw new Error(`il file resta di ${kb} KB: scegli un'altra foto`);
  console.log(
    JSON.stringify(
      {
        featuredImage: `/images/blog/${slug}.jpg`,
        featuredImageAlt: "[scrivi in italiano cosa si vede nella foto]",
        copertina: { fonte: "Pexels", autore: f.photographer, pagina: f.url, licenza: "Licenza Pexels (uso commerciale libero)" },
        kb,
        descrizioneOriginale: f.alt,
      },
      null,
      1
    )
  );
}

const [comando, ...resto] = process.argv.slice(2);
if (comando === "cerca") await cerca(resto.join(" "));
else if (comando === "scarica") await scarica(resto[0], resto[1]);
else {
  console.log('Uso: cerca "parole" | scarica <id> <slug>');
  process.exit(1);
}
