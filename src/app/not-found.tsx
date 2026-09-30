import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 px-4 section-bianco">
      <div className="max-w-xl text-center">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">404</span>
        </p>
        <h1 className="heading-section-xl text-balance text-brand-nero mb-4">
          Pagina non <span className="text-brand-corallo-text">trovata</span>.
        </h1>
        <p className="text-base text-brand-grigio leading-relaxed mb-8">
          Il link che hai seguito non esiste o è stato spostato. Torna alla home o contattaci.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-corallo px-8 py-4">
            Torna alla Home
          </Link>
          <Link href="/contatti" className="btn-ghost px-8 py-4">
            Contattaci
          </Link>
        </div>
      </div>
    </section>
  );
}
