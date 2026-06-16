import Image from "next/image";

type PhoneScreenshotMockupProps = {
  src: string;
  alt: string;
  className?: string;
  /** Offset verticale immagine (nasconde status bar iOS) */
  imageObjectPosition?: string;
};

export default function PhoneScreenshotMockup({
  src,
  alt,
  className = "",
  imageObjectPosition = "center 11%",
}: PhoneScreenshotMockupProps) {
  return (
    <div className={`relative mx-auto w-[min(100%,270px)] shrink-0 ${className}`}>
      <div className="rounded-[2.35rem] border-[11px] border-brand-nero bg-brand-nero shadow-[0_28px_70px_-16px_rgba(17,17,17,0.38)]">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-brand-bianco aspect-[9/19.2]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            style={{ objectPosition: imageObjectPosition }}
            sizes="270px"
            quality={90}
          />
          {/* Notch + mascherina superiore: nasconde ora e batteria */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[52px] bg-gradient-to-b from-brand-bianco via-brand-bianco/95 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[11px] z-20 h-[21px] w-[74px] -translate-x-1/2 rounded-full bg-brand-nero"
            aria-hidden
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-[7px] left-1/2 z-10 h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-white/25"
        aria-hidden
      />
    </div>
  );
}
