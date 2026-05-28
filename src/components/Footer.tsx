"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/data/services";
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
    <div className="border-b border-brand-bordo md:border-none">
      <button
        onClick={onToggle}
        className="md:hidden w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-xs uppercase tracking-widest text-brand-corallo font-bold">
          {title}
        </span>
        <span
          className={`text-brand-corallo text-xl transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <h4 className="hidden md:block text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">
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
  const toggle = (k: ColKey) => setOpenCol(openCol === k ? null : k);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-panna border-t border-brand-bordo">
      {/* CTA strip */}
      <div className="border-b border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-3">
                ✦ Pronto a costruire un sistema?
              </p>
              <h3 className="heading-section text-brand-nero">
                Candida la tua azienda.
                <br />
                <span className="text-brand-corallo">Selezioniamo solo chi è in target.</span>
              </h3>
            </div>
            <Link href="/contatti" className="btn-corallo text-base whitespace-nowrap">
              HAI UN MINUTO?
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">

          {/* Logo + desc */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Forge Group" width={48} height={48} className="h-12 w-auto" />
              <span className="font-semibold text-lg tracking-tight text-brand-nero">
                FORGE<span className="text-brand-corallo">GROUP</span>
              </span>
            </Link>
            <p className="text-sm text-brand-grigio leading-relaxed">
              Sistemi di acquisizione clienti e crescita prevedibile per imprese B2B.
              Da aziende disorganizzate a macchine di vendita.
            </p>
          </div>

          {/* 4 colonne link */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6">
            <MobileCol
              title="Servizi"
              isOpen={openCol === "servizi"}
              onToggle={() => toggle("servizi")}
            >
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servizi/${s.slug}`}
                      className="text-sm text-brand-grigio hover:text-brand-corallo transition-colors flex items-start gap-2"
                    >
                      <span className="text-brand-corallo">✦</span>
                      <span>{s.shortTitle}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/servizi" className="text-xs uppercase tracking-widest text-brand-corallo font-bold hover:underline">
                    Vedi tutti →
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
                      className="text-sm text-brand-grigio hover:text-brand-corallo transition-colors flex items-start gap-2"
                    >
                      <span className="text-brand-corallo">✦</span>
                      <span>{c.shortTitle}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/casi-studio" className="text-xs uppercase tracking-widest text-brand-corallo font-bold hover:underline">
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
                  <Link href="/blog" className="text-sm text-brand-grigio hover:text-brand-corallo transition-colors flex items-start gap-2">
                    <span className="text-brand-corallo">✦</span>
                    <span>Blog Intelligence</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contatti" className="text-sm text-brand-grigio hover:text-brand-corallo transition-colors flex items-start gap-2">
                    <span className="text-brand-corallo">✦</span>
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
                  <a href="mailto:info@forgegroup.it" className="text-sm text-brand-grigio hover:text-brand-corallo transition-colors flex items-start gap-2">
                    <span className="text-brand-corallo">✦</span>
                    <span>info@forgegroup.it</span>
                  </a>
                </li>
                <li className="text-sm text-brand-grigio flex items-start gap-2">
                  <span className="text-brand-corallo">✦</span>
                  <span>Italia · Campania</span>
                </li>
                <li className="pt-2">
                  <Link href="/contatti" className="text-xs uppercase tracking-widest text-brand-corallo font-bold hover:underline">
                    Prequalifica →
                  </Link>
                </li>
              </ul>
            </MobileCol>
          </div>

        </div>
      </div>

      <div className="bg-brand-bianco border-t border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-grigio">
          <p>© {year} Forge Group. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-brand-corallo">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-brand-corallo">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
