"use client";

import Link from "next/link";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";
import PrismBackground from "@/components/PrismBackground";

type Props = {
  isCaseStudy?: boolean;
};

export default function FooterCtaBand({ isCaseStudy = false }: Props) {
  return (
    <section className="footer-cta-band relative overflow-hidden border-t border-b border-brand-bordo bg-brand-panna">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <PrismBackground
          animationType="rotate"
          transparent
          suspendWhenOffscreen
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
          bloom={1}
          timeScale={0.5}
        />
      </div>

      <div className="cta-glow-bg relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="cta-glass-panel mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
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
                  Contattaci e parliamone davanti un{" "}
                  <HandDrawnUnderline>caffè</HandDrawnUnderline>.
                </h3>
              )}
            </div>

            <Link
              href="/contatti"
              className={
                isCaseStudy
                  ? "btn-glass-pill btn-glass-pill-lg shrink-0 text-sm uppercase tracking-wide"
                  : "btn-glass-pill btn-glass-pill-lg shrink-0"
              }
            >
              {isCaseStudy
                ? "OTTIENI UNA CONSULENZA GRATUITA"
                : "Scopri come possiamo esserti utile"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
