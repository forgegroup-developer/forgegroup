"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";

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
        <span className="text-xs uppercase tracking-widest text-white/75 font-bold">
          {title}
        </span>
        <span
          className={`text-white/60 text-xl transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <h4 className="hidden md:block text-xs uppercase tracking-widest text-white/60 font-bold mb-4">
        {title}
      </h4>
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
  const pathname = usePathname();
  const isCaseStudy = pathname?.startsWith("/casi-studio") ?? false;
  const toggle = (k: ColKey) => setOpenCol(openCol === k ? null : k);
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* CTA strip — sfondo bianco, invariato su tutte le pagine */}
      <div className="bg-brand-bianco border-t border-b border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-3">
                ✦ Pronto a smettere di improvvisare?
              </p>
              {isCaseStudy ? (
                <h3 className="heading-section text-brand-nero">
                  Vuoi un sistema come questo per la{" "}
                  <span className="text-brand-corallo">tua azienda?</span>
                </h3>
              ) : (
                <h3 className="heading-section text-brand-nero">
                  Contattaci e parliamone davanti un caffè.
                  <br />
                  <span className="text-brand-corallo">Scopri come possiamo esserti utile.</span>
                </h3>
              )}
            </div>
            <Link href="/contatti" className="btn-corallo text-base whitespace-nowrap shrink-0">
              {isCaseStudy ? "OTTIENI UNA CONSULENZA GRATUITA" : "HAI UN MINUTO?"}
            </Link>
          </div>
        </div>
      </div>

      {/* Corpo footer — sfondo corallo */}
      <div className="bg-brand-corallo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">

            {/* Logo + desc */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/logo-transparent.png" alt="Forge Group" width={48} height={48} className="h-12 w-auto" />
                <span className="font-semibold text-lg tracking-tight text-white">
                  FORGE<span className="text-brand-pesca-light">GROUP</span>
                </span>
              </Link>
              <p className="text-sm text-white/70 leading-relaxed">
                Sistemi di acquisizione clienti e crescita prevedibile per imprese B2B.
                La prima azienda di Growth Hacking in Italia.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Forge Group"
                  className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46zm6.34-8.41a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Forge Group"
                  className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Forge Group"
                  className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" />
                  </svg>
                </a>
              </div>
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
                      className="text-sm text-white/65 hover:text-white transition-colors flex items-start gap-2"
                    >
                      <span className="text-white/40 shrink-0">✦</span>
                      <span>Il nostro sistema</span>
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
                        className="text-sm text-white/65 hover:text-white transition-colors flex items-start gap-2"
                      >
                        <span className="text-white/40 shrink-0">✦</span>
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
                    <Link href="/blog" className="text-sm text-white/65 hover:text-white transition-colors flex items-start gap-2">
                      <span className="text-white/40 shrink-0">✦</span>
                      <span>Blog Intelligence</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contatti" className="text-sm text-white/65 hover:text-white transition-colors flex items-start gap-2">
                      <span className="text-white/40 shrink-0">✦</span>
                      <span>Hai un minuto?</span>
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
                    <a href="mailto:info@forgegroup.it" className="text-sm text-white/65 hover:text-white transition-colors flex items-start gap-2">
                      <span className="text-white/40 shrink-0">✦</span>
                      <span>info@forgegroup.it</span>
                    </a>
                  </li>
                  <li className="text-sm text-white/50 flex items-start gap-2">
                    <span className="text-white/40 shrink-0">✦</span>
                    <span>Italia · Campania</span>
                  </li>
                  <li className="pt-2">
                    <Link href="/contatti" className="text-xs uppercase tracking-widest text-white font-bold hover:text-brand-pesca-light transition-colors">
                      Prequalifica →
                    </Link>
                  </li>
                </ul>
              </MobileCol>
            </div>

          </div>
        </div>

        {/* Bottom bar — bordo superiore semitrasparente */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p>© {year} Forge Group. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
