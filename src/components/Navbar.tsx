"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-brand-bianco border border-brand-bordo rounded-lg shadow-lg p-2">
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
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-brand-bianco border border-brand-bordo rounded-lg shadow-lg p-2">
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
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-brand-corallo"
            aria-label="Apri menu"
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Glassmorphism overlay mobile menu */}
      <div
        className={`glass-nav-overlay lg:hidden${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className="glass-nav-panel pt-5 pb-6 px-5 space-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header overlay */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-grigio">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-brand-bordo flex items-center justify-center hover:bg-brand-pesca transition-colors"
              aria-label="Chiudi menu"
            >
              <svg className="w-3.5 h-3.5 text-brand-nero" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-brand-nero hover:bg-brand-pesca-light hover:text-brand-corallo font-medium transition-colors text-sm"
          >
            <span className="text-brand-corallo text-xs">✦</span> Home
          </Link>

          {/* Servizi expandable */}
          <div>
            <button
              onClick={() => setMobileServizi(!mobileServizi)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-brand-nero hover:bg-brand-pesca-light font-medium transition-colors text-sm"
              aria-expanded={mobileServizi}
            >
              <span className="flex items-center gap-2"><span className="text-brand-corallo text-xs">✦</span> Servizi</span>
              <span className={`text-brand-corallo font-bold transition-transform duration-200 ${mobileServizi ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`accordion-content${mobileServizi ? " open" : ""}`}>
              <div className="pl-5 pt-1 space-y-0.5">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servizi/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-xs text-brand-grigio hover:text-brand-corallo rounded-lg hover:bg-brand-pesca-light transition-colors"
                  >
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Casi Studio expandable */}
          <div>
            <button
              onClick={() => setMobileCasi(!mobileCasi)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-brand-nero hover:bg-brand-pesca-light font-medium transition-colors text-sm"
              aria-expanded={mobileCasi}
            >
              <span className="flex items-center gap-2"><span className="text-brand-corallo text-xs">✦</span> Casi Studio</span>
              <span className={`text-brand-corallo font-bold transition-transform duration-200 ${mobileCasi ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`accordion-content${mobileCasi ? " open" : ""}`}>
              <div className="pl-5 pt-1 space-y-0.5">
                {caseStudies.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/casi-studio/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-xs text-brand-grigio hover:text-brand-corallo rounded-lg hover:bg-brand-pesca-light transition-colors"
                  >
                    {c.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-brand-nero hover:bg-brand-pesca-light hover:text-brand-corallo font-medium transition-colors text-sm"
          >
            <span className="text-brand-corallo text-xs">✦</span> Blog
          </Link>

          <div className="pt-3 border-t border-brand-bordo">
            <Link
              href="/contatti"
              onClick={() => setOpen(false)}
              className="block btn-corallo text-center text-sm"
            >
              HAI UN MINUTO?
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
