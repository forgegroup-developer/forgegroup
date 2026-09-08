// Backup completo del DB Neon in JSON.
// Uso: node scripts/backup-db.mjs   → salva in ~/ForgeGroup/backup/db/<timestamp>/
// Automatico: LaunchAgent it.forgegroup.backup-db (lunedì 09:00), vedi ~/ForgeGroup/backup/
import { neon } from '@neondatabase/serverless';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const KEEP = 12; // backup da conservare (≈3 mesi con cadenza settimanale)

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const url = env.match(/^DATABASE_URL=["']?(.+?)["']?$/m)?.[1];
if (!url) throw new Error('DATABASE_URL non trovata in .env.local');

const sql = neon(url);
const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
const root = join(homedir(), 'ForgeGroup', 'backup', 'db');
const dir = join(root, stamp);
mkdirSync(dir, { recursive: true });

console.log(`\n=== ${new Date().toLocaleString('it-IT')} ===`);

const tables = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name`;

for (const { table_name } of tables) {
  const rows = await sql.query(`SELECT * FROM "${table_name}"`);
  writeFileSync(join(dir, `${table_name}.json`), JSON.stringify(rows, null, 2));
  console.log(`${String(rows.length).padStart(6)} righe  ${table_name}`);
}
console.log(`Backup salvato in: ${dir}`);

// Rotazione: tiene solo gli ultimi KEEP backup
const vecchi = readdirSync(root, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort()
  .slice(0, -KEEP);
for (const v of vecchi) {
  rmSync(join(root, v), { recursive: true, force: true });
  console.log(`rimosso backup vecchio: ${v}`);
}
