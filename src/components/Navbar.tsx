"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServizi, setMobileServizi] = useState(false);
  const [mobileCasi, setMobileCasi] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const closeMenu = () => {
    setOpen(false);
    setMobileServizi(false);
    setMobileCasi(false);
  };

  // Blocca lo scroll del body quando il menu fullscreen è aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-brand-bianco border-b border-brand-bordo shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Forge Group home">
            <Image
              src="/logo.png"
              alt="Forge Group"
              width={48}
              height={48}
              priority
              className="h-12 w-auto"
            />
            <span className="hidden sm:block font-semibold text-lg tracking-tight text-brand-nero">
              FORGE<span className="text-brand-corallo">GROUP</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`underline-grow text-sm font-medium transition-colors hover:text-brand-corallo ${
                pathname === "/" ? "text-brand-corallo active" : "text-brand-nero"
              }`}
            >
              Home
            </Link>
            <div className="nav-dropdown-trigger relative">
              <Link
                href="/servizi"
                className={`underline-grow text-sm font-medium transition-colors hover:text-brand-corallo flex items-center gap-1 ${
                  isActive("/servizi") ? "text-brand-corallo active" : "text-brand-nero"
                }`}
              >
                Servizi
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                <div className="nav-dropdown-card p-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servizi/${s.slug}`}
                      className="block px-4 py-3 rounded-md hover:bg-brand-pesca-light transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-brand-corallo mt-1 shrink-0">✦</span>
                        <div>
                          <div className="font-semibold text-brand-nero group-hover:text-brand-corallo transition-colors">
                            {s.shortTitle}
                          </div>
                          <div className="text-xs text-brand-grigio mt-0.5">{s.tagline}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-brand-bordo mt-2 pt-2">
                    <Link
                      href="/servizi"
                      className="block px-4 py-2 text-xs uppercase tracking-widest text-brand-corallo font-bold hover:bg-brand-pesca-light rounded-md"
                    >
                      Vedi tutti i servizi →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-dropdown-trigger relative">
              <Link
                href="/casi-studio"
                className={`underline-grow text-sm font-medium transition-colors hover:text-brand-corallo flex items-center gap-1 ${
                  isActive("/casi-studio") ? "text-brand-corallo active" : "text-brand-nero"
                }`}
              >
                Casi Studio
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                <div className="nav-dropdown-card p-2">
                  {caseStudies.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/casi-studio/${c.slug}`}
                      className="block px-4 py-3 rounded-md hover:bg-brand-pesca-light transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-brand-corallo mt-1 shrink-0">✦</span>
                        <div>
                          <div className="font-semibold text-brand-nero group-hover:text-brand-corallo transition-colors">
                            {c.shortTitle}
                          </div>
                          <div className="text-xs text-brand-grigio mt-0.5">{c.resultHeadline}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-brand-bordo mt-2 pt-2">
                    <Link
                      href="/casi-studio"
                      className="block px-4 py-2 text-xs uppercase tracking-widest text-brand-corallo font-bold hover:bg-brand-pesca-light rounded-md"
                    >
                      Tutti i casi studio →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              className={`underline-grow text-sm font-medium transition-colors hover:text-brand-corallo ${
                isActive("/blog") ? "text-brand-corallo active" : "text-brand-nero"
              }`}
            >
              Blog
            </Link>
          </nav>

          <Link
            href="/contatti"
            className="hidden md:inline-flex btn-corallo text-sm"
          >
            Hai un minuto?
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 text-brand-corallo"
            aria-label="Apri menu"
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-nav lg:hidden${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="flex h-full flex-col">
          {/* Header: logo + chiudi */}
          <div className="flex items-center justify-between px-5 h-20 shrink-0">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2" aria-label="Forge Group home">
              <Image src="/logo-transparent.png" alt="Forge Group" width={44} height={44} className="h-11 w-auto" />
              <span className="font-semibold text-lg tracking-tight text-brand-nero">
                FORGE<span className="text-brand-corallo">GROUP</span>
              </span>
            </Link>
            <button
              onClick={closeMenu}
              className="w-11 h-11 rounded-full border border-brand-bordo bg-brand-bianco flex items-center justify-center text-brand-nero hover:text-brand-corallo hover:border-brand-corallo transition-colors"
              aria-label="Chiudi menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Voci menu centrate */}
          <nav className="flex-1 overflow-y-auto flex flex-col justify-center px-6 py-6">
            <div className="w-full max-w-md mx-auto">
              <Link
                href="/"
                onClick={closeMenu}
                className="block w-full text-center text-[32px] font-bold leading-tight text-brand-nero hover:text-brand-corallo transition-colors py-5 border-b border-brand-bordo"
              >
                Home
              </Link>

              {/* Servizi */}
              <div className="border-b border-brand-bordo">
                <button
                  onClick={() => setMobileServizi(!mobileServizi)}
                  className="w-full flex items-center justify-center gap-3 text-[32px] font-bold leading-tight text-brand-nero hover:text-brand-corallo transition-colors py-5"
                  aria-expanded={mobileServizi}
                >
                  Servizi
                  <span className={`text-brand-corallo transition-transform duration-300 ${mobileServizi ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`accordion-content${mobileServizi ? " open" : ""}`}>
                  <div className="pb-4 space-y-1">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/servizi/${s.slug}`}
                        onClick={closeMenu}
                        className="block text-center text-lg text-brand-grigio hover:text-brand-corallo transition-colors py-2"
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                    <Link
                      href="/servizi"
                      onClick={closeMenu}
                      className="block text-center text-xs uppercase tracking-widest text-brand-corallo font-bold pt-2"
                    >
                      Vedi tutti i servizi →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Casi Studio */}
              <div className="border-b border-brand-bordo">
                <button
                  onClick={() => setMobileCasi(!mobileCasi)}
                  className="w-full flex items-center justify-center gap-3 text-[32px] font-bold leading-tight text-brand-nero hover:text-brand-corallo transition-colors py-5"
                  aria-expanded={mobileCasi}
                >
                  Casi Studio
                  <span className={`text-brand-corallo transition-transform duration-300 ${mobileCasi ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`accordion-content${mobileCasi ? " open" : ""}`}>
                  <div className="pb-4 space-y-1">
                    {caseStudies.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/casi-studio/${c.slug}`}
                        onClick={closeMenu}
                        className="block text-center text-lg text-brand-grigio hover:text-brand-corallo transition-colors py-2"
                      >
                        {c.shortTitle}
                      </Link>
                    ))}
                    <Link
                      href="/casi-studio"
                      onClick={closeMenu}
                      className="block text-center text-xs uppercase tracking-widest text-brand-corallo font-bold pt-2"
                    >
                      Tutti i casi studio →
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                onClick={closeMenu}
                className="block w-full text-center text-[32px] font-bold leading-tight text-brand-nero hover:text-brand-corallo transition-colors py-5 border-b border-brand-bordo"
              >
                Blog
              </Link>
            </div>
          </nav>

          {/* CTA full width in fondo */}
          <div className="shrink-0 px-5 pb-6 pt-2">
            <Link
              href="/contatti"
              onClick={closeMenu}
              className="block btn-corallo w-full text-center text-base py-4"
            >
              HAI UN MINUTO?
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
