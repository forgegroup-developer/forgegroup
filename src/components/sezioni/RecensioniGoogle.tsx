import { CONTENITORE, SEZIONE, Chiave, Titolo } from "@/components/blocchi/ui";
import { leggiRecensioniGoogle } from "@/lib/google/recensioni";

/**
 * Le recensioni Google, aggiornate da sole una volta al giorno
 * (src/lib/google/recensioni.ts). Prima quelle con il testo. Il nome
 * dell'autore e il rimando a Google restano visibili: li chiede Google.
 */
function Stelle({ voto }: { voto: number }) {
  const piene = Math.round(voto);
  return (
    <span
      className="text-base leading-none text-[#f5b301]"
      aria-label={`${voto} stelle su 5`}
    >
      {"★".repeat(piene)}
      <span className="text-brand-bordo">{"★".repeat(5 - piene)}</span>
    </span>
  );
}

export default async function RecensioniGoogle({
  sfondo = "bianco",
}: {
  sfondo?: "bianco" | "mattone";
}) {
  const dati = await leggiRecensioniGoogle();
  const conTesto = dati.recensioni.filter((r) => r.testo);
  const voto = dati.voto.toLocaleString("it-IT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const link =
    dati.linkScheda ?? "https://www.google.com/maps/search/Forge+Group+Italia";

  /* Il layout si adatta da solo a quante recensioni con testo ci sono:
     fino a due, il voto a sinistra e le citazioni grandi a destra; da tre
     in su, una griglia di schede. Così non resta mai una scheda sola in
     mezzo a una griglia vuota (proprietà, 29/09). */
  const griglia = conTesto.length >= 3;

  const riquadroVoto = (
    <div className="superficie-chiara flex flex-col items-center justify-center gap-3 rounded-3xl border border-brand-bordo bg-brand-bianco p-8 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-grigio">
        Google
      </p>
      <p className="font-display text-7xl font-bold leading-none text-brand-nero">
        {voto}
      </p>
      <Stelle voto={dati.voto} />
      <p className="text-sm text-brand-grigio">su {dati.totale} recensioni</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex rounded-full border-2 border-brand-corallo px-5 py-2.5 text-sm font-bold text-[color:var(--color-brand-corallo-text)] transition-colors hover:bg-brand-corallo/10"
      >
        Leggile su Google ↗
      </a>
    </div>
  );

  const scheda = (r: (typeof conTesto)[number], grande: boolean, i: number) => (
    <figure
      key={`${r.autore}-${i}`}
      className="superficie-chiara flex h-full flex-col gap-4 rounded-3xl border border-brand-bordo bg-brand-bianco p-8"
    >
      <Stelle voto={r.voto} />
      <blockquote
        className={`font-display font-bold leading-snug text-brand-nero ${grande ? "text-2xl md:text-3xl" : "text-lg"}`}
      >
        &ldquo;{r.testo}&rdquo;
      </blockquote>
      <figcaption className="mt-auto text-sm text-brand-grigio">
        <strong className="text-brand-nero">{r.autore}</strong>
        {r.quando ? ` · ${r.quando}` : ""} · recensione su Google
      </figcaption>
    </figure>
  );

  return (
    <section
      id="recensioni"
      className={`${sfondo === "mattone" ? "section-mattone" : "section-bianco border-y"} ${SEZIONE}`}
    >
      <div className={CONTENITORE}>
        <Titolo occhiello="Le recensioni su Google">
          Cosa dicono di noi <Chiave>le imprese</Chiave>
        </Titolo>

        {griglia ? (
          <div className="grid gap-5 lg:grid-cols-4">
            {riquadroVoto}
            {conTesto.slice(0, 3).map((r, i) => scheda(r, false, i))}
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_2fr]">
            {riquadroVoto}
            <div className="grid gap-6">
              {conTesto.length
                ? conTesto.map((r, i) => scheda(r, true, i))
                : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
