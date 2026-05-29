"use client";

import Image from "next/image";
import { siteImages } from "@/data/images";

export default function HeroVideoRecensione() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full rounded-3xl overflow-hidden border border-brand-bordo shadow-2xl bg-brand-nero">
        <video
          controls
          preload="metadata"
          playsInline
          poster={siteImages.videoPoster}
          className="w-full block aspect-video object-cover"
        >
          <source src="/api/video-recensione" type="video/quicktime" />
          <source src="/api/video-recensione" type="video/mp4" />
          Il tuo browser non supporta il video.
        </video>
      </div>

      {/* Banner recensione */}
      <div className="w-full rounded-2xl border border-brand-bordo bg-brand-panna/75 backdrop-blur-sm px-6 py-6 md:px-8 md:py-7 shadow-sm text-left">
        <div className="flex gap-1 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className="w-5 h-5 text-brand-corallo" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>

        <blockquote
          className="text-lg md:text-xl font-semibold text-brand-nero leading-snug mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &ldquo;
          <span className="text-brand-corallo">126.500€ di fatturato in 90 giorni</span>, non me lo aspettavo. Ero scettico all&apos;inizio.
          &rdquo;
        </blockquote>

        <div className="mt-5 flex items-center gap-4 rounded-xl bg-brand-bianco/70 border border-brand-bordo px-4 py-3.5">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-brand-bordo bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Image
              src="/images/logo-disa.png"
              alt="DISA SRL"
              width={44}
              height={44}
              className="object-contain w-full h-full p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-brand-nero font-bold text-sm leading-tight truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DISA SRL
            </p>
            <p className="text-brand-grigio text-xs mt-0.5 font-medium uppercase tracking-wide">
              Software B2B
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <span className="text-brand-corallo font-bold text-sm leading-none">5/5</span>
            <span className="text-brand-grigio text-[10px] uppercase tracking-widest">Recensione</span>
          </div>
        </div>
      </div>
    </div>
  );
}
