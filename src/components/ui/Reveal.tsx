"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 0-3: sfalsa l'entrata delle schede affiancate. */
  delay?: number;
  /** Accettati per compatibilita' con le chiamate esistenti: il movimento
      ora e' fissato nel CSS, quindi non vengono usati. */
  y?: number;
  duration?: number;
  stagger?: number;
};

/**
 * L'entrata in scena dei blocchi: salgono di poco mentre compaiono.
 *
 * Prima girava su GSAP caricato al volo: l'osservatore scattava, poi si
 * aspettava la libreria dalla rete, e solo dopo il blocco veniva portato a
 * opacita' zero per farlo rientrare. Fra i due momenti il contenuto era gia'
 * a schermo, quindi spariva e ricompariva; e se la libreria arrivava tardi —
 * o il blocco era gia' oltre il punto di innesco, cosa che qui succede
 * spesso perche' le sezioni si montano da sole scorrendo — restava a zero
 * per sempre. Erano le schede del Metodo che non comparivano.
 *
 * Adesso e' solo CSS piu' un osservatore: niente rete, niente attesa,
 * nessuno stato da cui non si torna indietro. E se JavaScript non parte, il
 * contenuto resta visibile invece di sparire.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armato, setArmato] = useState(false);
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const menoMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (menoMovimento || typeof IntersectionObserver === "undefined") {
      setVisibile(true);
      return;
    }

    // Da qui in poi il blocco parte nascosto: lo diciamo solo ora, cosi' chi
    // non ha JavaScript se lo tiene visibile.
    setArmato(true);

    const osservatore = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisibile(true);
        osservatore.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    osservatore.observe(el);

    // Rete di sicurezza: se per qualunque motivo l'osservatore non scatta,
    // dopo un secondo e mezzo il blocco si mostra lo stesso.
    const salvagente = window.setTimeout(() => setVisibile(true), 1500);

    return () => {
      osservatore.disconnect();
      window.clearTimeout(salvagente);
    };
  }, []);

  const stato = armato ? (visibile ? "reveal is-visible" : "reveal") : "";

  return (
    <div
      ref={ref}
      className={`${stato} ${className}`.trim()}
      style={armato && !visibile ? { transitionDelay: `${delay * 90}ms` } : undefined}
    >
      {children}
    </div>
  );
}
