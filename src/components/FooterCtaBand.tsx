"use client";

import HandDrawnUnderline from "@/components/HandDrawnUnderline";
import LightBeamButton from "@/components/LightBeamButton";

type Props = {
  isCaseStudy?: boolean;
};

export default function FooterCtaBand({ isCaseStudy = false }: Props) {
  return (
    <section className="footer-cta-band relative overflow-hidden border-t border-b border-brand-bordo bg-brand-bianco">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="cta-glass-panel mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-full">
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

            <LightBeamButton
              href="/contatti"
              size="lg"
              variant="glass"
              fullWidth
              className={`footer-cta-beam-btn${isCaseStudy ? " text-sm uppercase tracking-wide" : ""}`}
            >
              {isCaseStudy
                ? "OTTIENI UNA CONSULENZA GRATUITA"
                : "Scopri come possiamo esserti utile"}
            </LightBeamButton>
          </div>
        </div>
      </div>
    </section>
  );
}
