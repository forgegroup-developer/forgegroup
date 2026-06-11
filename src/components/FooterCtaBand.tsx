"use client";

import Link from "next/link";
import HandDrawnUnderline from "@/components/HandDrawnUnderline";
import PrismBackground from "@/components/PrismBackground";

type Props = {
  isCaseStudy?: boolean;
};

export default function FooterCtaBand({ isCaseStudy = false }: Props) {
  return (
    <section className="footer-cta-band relative overflow-hidden border-t border-b border-brand-bordo">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-panna via-brand-pesca-light/60 to-brand-pesca/35"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[18%] min-h-[300px]" aria-hidden>
        <PrismBackground
          animationType="3drotate"
          transparent
          suspendWhenOffscreen
          height={4.2}
          baseWidth={6}
          glow={2.1}
          bloom={1.85}
          noise={0.06}
          scale={1.85}
          hueShift={0.08}
          colorFrequency={0.42}
          timeScale={0.32}
          warmMix={1}
          offset={{ y: 40 }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-[radial-gradient(ellipse_90%_75%_at_50%_100%,rgba(200,80,42,0.48),rgba(232,185,165,0.22)_45%,transparent_72%)]"
        aria-hidden
      />

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
                  Contattaci e parliamone davanti un{" "}
                  <HandDrawnUnderline>caffè</HandDrawnUnderline>.
                </h3>
              )}
            </div>

            <Link
              href="/contatti"
              className={
                isCaseStudy
                  ? "btn-corallo shrink-0 px-8 py-3.5 text-sm md:px-10 md:py-4 md:text-base"
                  : "btn-corallo btn-corallo-phrase shrink-0 px-7 py-3.5 text-sm md:px-9 md:py-4 md:text-base"
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
