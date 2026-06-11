"use client";

import Link from "next/link";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";
import PrismBackground from "@/components/PrismBackground";

type Props = {
  isCaseStudy?: boolean;
};

export default function FooterCtaBand({ isCaseStudy = false }: Props) {
  return (
    <section className="relative overflow-hidden border-t border-b border-brand-bordo bg-brand-panna">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <PrismBackground
          animationType="rotate"
          transparent
          suspendWhenOffscreen
          glow={0.75}
          bloom={0.85}
          noise={0.28}
          scale={3.4}
          hueShift={0.42}
          colorFrequency={0.9}
          timeScale={0.35}
        />
      </div>

      <div className="cta-glow-bg relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="cta-glass-panel mx-auto max-w-4xl px-8 py-12 text-center md:px-14 md:py-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-brand-corallo">
            ✦ Pronto a smettere di improvvisare?
          </p>

          {isCaseStudy ? (
            <h3 className="heading-section mx-auto max-w-3xl text-brand-nero">
              Vuoi un sistema come questo per la{" "}
              <HandDrawnUnderline>tua azienda?</HandDrawnUnderline>
            </h3>
          ) : (
            <h3 className="heading-section mx-auto max-w-3xl text-brand-nero">
              Contattaci e parliamone davanti un caffè.
              <br />
              <HandDrawnUnderline>
                Scopri come possiamo esserti utile.
              </HandDrawnUnderline>
            </h3>
          )}

          <div className="mt-10 flex justify-center">
            <Link href="/contatti" className="btn-corallo px-10 py-4 text-sm md:text-base">
              {isCaseStudy ? "OTTIENI UNA CONSULENZA GRATUITA" : "HAI UN MINUTO?"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
