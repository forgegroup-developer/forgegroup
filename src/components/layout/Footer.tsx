"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FooterNewsletter from "@/components/layout/FooterNewsletter";
import { caseStudies } from "@/data/caseStudies";
import { IUBENDA, LEGAL } from "@/data/legal";
import { SITE_DESCRIPTION } from "@/lib/seo/site";
import SocialLinks from "@/components/ui/SocialLinks";

type ColKey = "servizi" | "casi" | "azienda" | "contatti";


function MobileCol({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/15 md:border-none">
      <button
        onClick={onToggle}
        className="md:hidden w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-xs uppercase tracking-widest text-white font-bold">
          {title}
        </span>
        <span
          className={`text-white text-xl transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <p className="hidden md:block text-xs uppercase tracking-widest text-white font-bold mb-4">
        {title}
      </p>
      <div className={`accordion-content md:!grid-rows-[1fr] ${isOpen ? "open" : ""}`}>
        <div>
          <div className="pb-4 md:pb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [openCol, setOpenCol] = useState<ColKey | null>(null);
  const toggle = (k: ColKey) => setOpenCol(openCol === k ? null : k);
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* La fascia "Il primo passo" sopra il footer e' stata tolta dalla
          proprieta' il 29/09/2026 ("i problemi non sono reali"): ogni pagina
          chiude con la sua richiesta. Il componente resta in
          layout/FooterCtaBand.tsx per quando si decide come rifarla. */}

      {/* Corpo footer — sfondo corallo */}
      <div className="bg-brand-mattone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">

            {/* Logo + desc */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-flex mb-4" aria-label="Forge Group — Home">
                <Image src="/logo-transparent.png" alt="Forge Group" width={48} height={48} className="h-12 w-auto shrink-0" />
              </Link>
              <p className="text-sm text-white leading-relaxed">
                {SITE_DESCRIPTION}
              </p>
              <SocialLinks className="mt-5" />
            </div>

            {/* 4 colonne link */}
            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6">
              <MobileCol
                title="Servizi"
                isOpen={openCol === "servizi"}
                onToggle={() => toggle("servizi")}
              >
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/servizi"
                      className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2"
                    >
                      <span className="text-white shrink-0">✦</span>
                      <span>Il nostro sistema</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contatti"
                      className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2"
                    >
                      <span className="text-white shrink-0">✦</span>
                      <span>Richiedi lo studio di fattibilità</span>
                    </Link>
                  </li>
                </ul>
              </MobileCol>

              <MobileCol
                title="Casi Studio"
                isOpen={openCol === "casi"}
                onToggle={() => toggle("casi")}
              >
                <ul className="space-y-2">
                  {caseStudies.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/casi-studio/${c.slug}`}
                        className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2"
                      >
                        <span className="text-white shrink-0">✦</span>
                        <span>{c.shortTitle}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link href="/casi-studio" className="text-xs uppercase tracking-widest text-white font-bold hover:text-brand-pesca-light transition-colors">
                      Tutti i casi →
                    </Link>
                  </li>
                </ul>
              </MobileCol>

              <MobileCol
                title="Azienda"
                isOpen={openCol === "azienda"}
                onToggle={() => toggle("azienda")}
              >
                <ul className="space-y-2">
                  <li>
                    <Link href="/visione" className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2">
                      <span className="text-white shrink-0">✦</span>
                      <span>Lavora con noi</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/visione#entra-a-far-parte" className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2">
                      <span className="text-white shrink-0">✦</span>
                      <span>Entra a far parte</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2">
                      <span className="text-white shrink-0">✦</span>
                      <span>Blog</span>
                    </Link>
                  </li>
                </ul>
              </MobileCol>

              <MobileCol
                title="Contatti"
                isOpen={openCol === "contatti"}
                onToggle={() => toggle("contatti")}
              >
                <ul className="space-y-3">
                  <li>
                    <a href={`mailto:${LEGAL.controllerEmail}`} className="text-sm text-white hover:text-brand-pesca-light transition-colors flex items-start gap-2">
                      <span className="text-white shrink-0">✦</span>
                      <span>{LEGAL.controllerEmail}</span>
                    </a>
                  </li>
                  <li className="pt-2">
                    <Link href="/contatti" className="text-xs uppercase tracking-widest text-white font-bold hover:text-brand-pesca-light transition-colors">
                      Candida la tua azienda →
                    </Link>
                  </li>
                </ul>
              </MobileCol>
            </div>

          </div>

          <div className="mt-10 border-t border-white/20 pt-10 md:mt-14 md:pt-12">
            <FooterNewsletter variant="featured" />
          </div>
        </div>

        {/* Bottom bar — bordo superiore semitrasparente */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white">
            <div className="text-center md:text-left space-y-1">
              <p>© {year} {LEGAL.controllerTradeName}. Tutti i diritti riservati.</p>
              <p>
                P.IVA {LEGAL.siteVat}
              </p>
            </div>
            {/* Link diretti a iubenda: /privacy-policy e /cookie-policy
                restano come redirect per i link gia' in giro, ma qui non
                ha senso far fare un salto in piu' a chi clicca.

                Il tasto preferenze sta qui perche' il pallino flottante
                di iubenda e' nascosto: copriva il tasto WhatsApp. La
                classe iubenda-cs-preferences-link e' quella a cui
                iubenda aggancia l'apertura del pannello. */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
              <a
                href={IUBENDA.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-pesca-light transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href={IUBENDA.cookiePolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-pesca-light transition-colors"
              >
                Cookie Policy
              </a>
              <button
                type="button"
                className="iubenda-cs-preferences-link hover:text-brand-pesca-light transition-colors"
              >
                Preferenze cookie
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
