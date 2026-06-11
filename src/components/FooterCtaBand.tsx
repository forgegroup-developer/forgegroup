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
      <div className="prism-forge-coral pointer-events-none absolute inset-0 opacity-75">
        <PrismBackground
          animationType="rotate"
          transparent
          suspendWhenOffscreen
          glow={0.82}
          bloom={0.95}
          noise={0.22}
          scale={3.4}
          hueShift={2.25}
          colorFrequency={0.72}
          timeScale={0.35}
        />
      </div>

      <div className="cta-glow-bg relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="cta-glass-panel mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
            <div className="min-w-0 flex-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-corallo">
                ✦ Pronto a smettere di improvvisare?
              </p>

              {isCaseStudy ? (
                <h3 className="heading-section text-brand-nero leading-snug">
                  Vuoi un sistema come questo per la{" "}
                  <HandDrawnUnderline>tua azienda</HandDrawnUnderline>?
                </h3>
              ) : (
                <h3 className="heading-section text-brand-nero leading-snug">
                  <span className="block">
                    Contattaci e parliamone davanti un{" "}
                    <HandDrawnUnderline>caffè</HandDrawnUnderline>.
                  </span>
                  <span className="mt-1 block md:mt-1.5">
                    Scopri come possiamo{" "}
                    <HandDrawnUnderline>esserti utile</HandDrawnUnderline>.
                  </span>
                </h3>
              )}
            </div>

            <Link
              href="/contatti"
              className="btn-corallo shrink-0 px-8 py-3.5 text-sm md:px-10 md:py-4 md:text-base"
            >
              {isCaseStudy ? "OTTIENI UNA CONSULENZA GRATUITA" : "HAI UN MINUTO?"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
