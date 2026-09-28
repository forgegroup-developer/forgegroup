"use client";

import dynamic from "next/dynamic";

const ContattiForm = dynamic(() => import("./ContattiForm"), {
  ssr: false,
  loading: () => (
    <section className="min-h-[50vh] flex items-center justify-center py-20 section-bianco">
      <p className="text-brand-grigio">Caricamento modulo...</p>
    </section>
  ),
});

/** sorgente: da quale pagina arriva la candidatura, per contarle a parte in GA4. */
export default function ContattiFormLoader(props: { sorgente?: string; senzaBanner?: boolean }) {
  return <ContattiForm {...props} />;
}
