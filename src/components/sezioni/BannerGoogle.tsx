import { leggiRecensioniGoogle } from "@/lib/google/recensioni";

/**
 * Il piccolo banner delle recensioni ("★★★★★ 5,0 su Google, 6 recensioni"),
 * come sulla landing. Voto e numero si aggiornano da soli una volta al giorno
 * (src/lib/google/recensioni.ts); senza la chiave usa i dati di prove.ts.
 * La sezione con le recensioni intere è stata tolta dalla home il 29/09.
 */
export default async function BannerGoogle({
  className = "",
}: {
  className?: string;
}) {
  const dati = await leggiRecensioniGoogle();
  const voto = dati.voto.toLocaleString("it-IT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return (
    <p
      className={`flex items-center gap-2 text-sm text-brand-grigio ${className}`}
    >
      <span
        className="text-base leading-none text-[#f5b301]"
        aria-label={`${voto} stelle su 5`}
      >
        ★★★★★
      </span>
      <span>
        <strong className="chiave">{voto} su Google</strong>,{" "}
        {dati.totale} recensioni
      </span>
    </p>
  );
}
