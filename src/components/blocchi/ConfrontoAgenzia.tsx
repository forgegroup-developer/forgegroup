import { Chiave, Titolo } from "@/components/blocchi/ui";

/**
 * Il messaggio centrale in una tabella: dove si ferma un'agenzia, dove
 * arriviamo noi. Va dentro una sezione bianca (in home, in fondo ai
 * problemi, dopo la svolta). Righe corrette il 29/09: niente "restiamo in
 * trattativa", "ti addestriamo", "in cantiere ci veniamo".
 */
export default function ConfrontoAgenzia() {
  return (
    <div className="mt-16 md:mt-20">
      <Titolo occhiello="Il confronto">
        Dove si ferma un&apos;agenzia. <Chiave>Dove arriviamo noi.</Chiave>
      </Titolo>
      <div className="max-w-5xl mx-auto rounded-2xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
        {/* Intestazioni colonne — sempre 2 colonne anche su mobile */}
        <div className="grid grid-cols-2 divide-x divide-brand-bordo border-b border-brand-bordo">
          <div className="px-4 py-3 md:px-8 md:py-5 bg-brand-panna">
            <p className="text-xs md:text-base font-bold text-brand-corallo-text uppercase tracking-wide leading-snug">
              L&apos;agenzia che ti consegna il contatto
            </p>
          </div>
          <div className="px-4 py-3 md:px-8 md:py-5 bg-[color-mix(in_srgb,var(--color-brand-verde)_10%,var(--color-brand-bianco))]">
            <p className="text-xs md:text-base font-bold text-brand-verde-text uppercase tracking-wide leading-snug">
              Forge Group
            </p>
          </div>
        </div>

        {/* Righe allineate — sempre 2 colonne */}
        {[
          {
            other: "Ti consegna il contatto e il suo lavoro finisce lì",
            forge:
              "Seguiamo con te ogni trattativa fino alla firma del contratto",
          },
          {
            other: "Ti manda chiunque abbia lasciato un numero",
            forge:
              "Filtriamo prima del sopralluogo: chi non può comprare non ci arriva",
          },
          {
            other: "Il preventivo mandato è affare tuo",
            forge:
              "Scriviamo con te il processo di vendita, e ogni settimana guardiamo insieme le trattative",
          },
          {
            other: "Report su visualizzazioni, clic e copertura",
            forge: "Si contano i contratti firmati e il margine che lasciano",
          },
          {
            other: "Non ha mai visto un cantiere del tuo settore",
            forge:
              "Lavoriamo solo con imprese edili, con i numeri e il nome dell'impresa sotto",
          },
        ].map((row, idx) => (
          <div
            key={row.other}
            className={`grid grid-cols-2 divide-x divide-brand-bordo/60 ${idx > 0 ? "border-t border-brand-bordo/60" : ""}`}
          >
            <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-brand-panna/70 hover:bg-brand-panna transition-colors">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-corallo"
                aria-hidden
              />
              <span className="text-xs md:text-sm leading-snug text-brand-grigio font-medium pt-0.5">
                {row.other}
              </span>
            </div>
            <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-[color-mix(in_srgb,var(--color-brand-verde)_8%,var(--color-brand-bianco))] hover:bg-[color-mix(in_srgb,var(--color-brand-verde)_14%,var(--color-brand-bianco))] transition-colors">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-verde"
                aria-hidden
              />
              <span className="text-xs md:text-sm leading-snug font-semibold text-brand-nero pt-0.5">
                {row.forge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
