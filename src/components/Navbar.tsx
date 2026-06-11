"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LightBeamButton from "@/components/LightBeamButton";
import { caseStudies } from "@/data/caseStudies";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileCasi, setMobileCasi] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const isCaseStudyActive = pathname?.startsWith("/casi-studio") ?? false;

  const closeMenu = () => {
    setOpen(false);
    setMobileCasi(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMobileCasi(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[100] isolate bg-brand-bianco border-b border-brand-bordo shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Forge Group home">
            <Image
              src="/logo.png"
              alt="Forge Group"
              width={56}
              height={56}
              priority
              className="h-14 w-auto"
            />
            <span className="hidden sm:block font-semibold text-xl tracking-tight text-brand-nero">
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
            <Link
              href="/servizi"
              className={`underline-grow text-sm font-medium transition-colors hover:text-brand-corallo ${
                isActive("/servizi") ? "text-brand-corallo active" : "text-brand-nero"
              }`}
            >
              Servizi
            </Link>
            <div className="nav-dropdown-trigger relative">
              <Link
                href="/#casi-studio"
                className={`underline-grow text-sm font-medium transition-colors hover:text-brand-corallo flex items-center gap-1 ${
                  isCaseStudyActive ? "text-brand-corallo active" : "text-brand-nero"
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
                        <div className="font-semibold text-brand-nero group-hover:text-brand-corallo transition-colors">
                          {c.shortTitle}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-brand-bordo mt-2 pt-2">
                    <Link
                      href="/#casi-studio"
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

          <div className="hidden lg:block">
            <LightBeamButton href="/contatti" size="sm">
              Hai un minuto?
            </LightBeamButton>
          </div>

          <button
            onClick={() => {
              setMobileCasi(false);
              setOpen(true);
            }}
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
        <div className="flex h-full flex-col bg-brand-nero">
          <div className="flex items-center justify-between px-6 pt-8 pb-6 shrink-0">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3" aria-label="Forge Group home">
              <Image src="/logo-transparent.png" alt="Forge Group" width={44} height={44} className="h-10 w-auto" />
              <div>
                <div className="font-semibold text-base tracking-tight text-white leading-none">
                  FORGE<span className="text-brand-corallo">GROUP</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                  Growth Hacking Italia
                </div>
              </div>
            </Link>
            <button
              onClick={closeMenu}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
              aria-label="Chiudi menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center justify-between py-5 border-b border-white/10 group"
            >
              <span className="text-[28px] font-bold uppercase tracking-tight text-white group-hover:text-brand-corallo transition-colors">Home</span>
              <span className="text-white/30 group-hover:text-brand-corallo transition-colors text-xl">→</span>
            </Link>

            <Link
              href="/servizi"
              onClick={closeMenu}
              className="flex items-center justify-between py-5 border-b border-white/10 group"
            >
              <span className="text-[28px] font-bold uppercase tracking-tight text-white group-hover:text-brand-corallo transition-colors">Servizi</span>
              <span className="text-white/30 group-hover:text-brand-corallo transition-colors text-xl">→</span>
            </Link>

            <div className="border-b border-white/10">
              <button
                onClick={() => setMobileCasi(!mobileCasi)}
                className="w-full flex items-center justify-between py-5 group"
                aria-expanded={mobileCasi}
              >
                <span className="text-[28px] font-bold uppercase tracking-tight text-white group-hover:text-brand-corallo transition-colors">Casi Studio</span>
                <span className={`text-brand-corallo text-2xl font-light transition-transform duration-300 ${mobileCasi ? "rotate-45" : ""}`}>+</span>
              </button>
              <div
                className={`accordion-content${mobileCasi ? " open" : ""}`}
                aria-hidden={!mobileCasi}
                inert={!mobileCasi ? true : undefined}
              >
                <div className="pb-4 pl-2 space-y-0">
                  {caseStudies.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/casi-studio/${c.slug}`}
                      onClick={closeMenu}
                      className="flex items-center gap-2 py-2.5 text-base font-medium text-white/60 hover:text-brand-corallo transition-colors"
                    >
                      <span className="text-brand-corallo text-xs">✦</span>
                      {c.shortTitle}
                    </Link>
                  ))}
                  <Link
                    href="/#casi-studio"
                    onClick={closeMenu}
                    className="block text-xs uppercase tracking-widest text-brand-corallo font-bold pt-2 pb-1"
                  >
                    Tutti i casi →
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              onClick={closeMenu}
              className="flex items-center justify-between py-5 border-b border-white/10 group"
            >
              <span className="text-[28px] font-bold uppercase tracking-tight text-white group-hover:text-brand-corallo transition-colors">Blog</span>
              <span className="text-white/30 group-hover:text-brand-corallo transition-colors text-xl">→</span>
            </Link>

            <div className="pt-8 pb-4">
              <a href="mailto:info@forgegroup.it" className="block text-sm text-white/40 hover:text-white/70 transition-colors">
                info@forgegroup.it
              </a>
            </div>
          </nav>

          <div className="shrink-0 px-6 pb-8 pt-4">
            <LightBeamButton href="/contatti" size="lg" fullWidth onClick={closeMenu}>
              HAI UN MINUTO?
            </LightBeamButton>
          </div>
        </div>
      </div>
    </header>
  );
}
