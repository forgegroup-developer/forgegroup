"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 px-4 section-bianco">
      <div className="max-w-xl text-center">
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Errore</span>
        </p>
        <h1 className="heading-section-xl text-balance text-brand-nero mb-4">
          Qualcosa è andato <span className="text-brand-corallo-text">storto</span>.
        </h1>
        <p className="text-base text-brand-grigio leading-relaxed mb-8">
          Si è verificato un errore imprevisto. Puoi riprovare o tornare alla home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button type="button" onClick={reset} className="btn-corallo">
            Riprova
          </button>
          <Link href="/" className="btn-ghost">
            Torna alla Home
          </Link>
        </div>
      </div>
    </section>
  );
}
