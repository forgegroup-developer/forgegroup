import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** overlay = rettangolo su foto · circle = badge tondo · hero = corallo · inline = senza sfondo · card = riquadro bianco */
  variant?: "overlay" | "circle" | "hero" | "inline" | "card";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

const boxSizes = {
  sm: "h-10 w-28",
  md: "h-12 w-32",
  lg: "h-16 w-44 md:h-[4.5rem] md:w-52",
  xl: "h-14 w-40 md:h-[4.25rem] md:w-[13.5rem]",
  "2xl": "h-24 w-52 sm:h-28 sm:w-60 md:h-32 md:w-72",
  "3xl": "h-28 w-56 sm:h-36 sm:w-72 md:h-44 md:w-[22rem] lg:h-52 lg:w-[26rem]",
};

const circleSizes = {
  sm: "h-9 w-9 md:h-10 md:w-10",
  md: "h-11 w-11 md:h-12 md:w-12",
  lg: "h-12 w-12 md:h-14 md:w-14",
  xl: "h-11 w-11 md:h-12 md:w-12",
  "2xl": "h-14 w-14 md:h-16 md:w-16",
  "3xl": "h-16 w-16 md:h-20 md:w-20",
};

const imageSizes = {
  sm: "(max-width: 768px) 112px, 112px",
  md: "(max-width: 768px) 128px, 160px",
  lg: "(max-width: 768px) 176px, 208px",
  xl: "(max-width: 768px) 200px, 280px",
  "2xl": "(max-width: 768px) 240px, 320px",
  "3xl": "(max-width: 768px) 320px, 512px",
};

const circleImageSizes = {
  sm: "40px",
  md: "48px",
  lg: "56px",
  xl: "48px",
  "2xl": "64px",
  "3xl": "80px",
};

export default function CaseStudyClientLogo({
  src,
  alt,
  variant = "overlay",
  className = "",
  size = "md",
}: Props) {
  if (variant === "circle") {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full bg-white shadow-lg shadow-black/30 ring-1 ring-black/[0.06] p-1.5 md:p-2 ${circleSizes[size]} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={95}
          className="object-contain object-center"
          sizes={circleImageSizes[size]}
        />
      </div>
    );
  }

  const imageShadow =
    variant === "hero"
      ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      : variant === "overlay"
        ? "drop-shadow-md"
        : "";

  const imageBox = (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${boxSizes[size]}`}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        className={`object-contain object-center ${imageShadow}`}
        sizes={imageSizes[size]}
      />
    </div>
  );

  if (variant === "card") {
    return (
      <div
        className={`inline-flex max-w-full shrink-0 rounded-2xl border border-brand-bordo bg-white p-4 md:p-5 lg:p-6 shadow-lg shadow-black/10 ${className}`}
      >
        <div className={`relative max-w-full ${boxSizes[size]}`}>
          <Image
            src={src}
            alt={alt}
            fill
            quality={90}
            className="object-contain object-center"
            sizes={imageSizes[size]}
          />
        </div>
      </div>
    );
  }

  return <div className={className}>{imageBox}</div>;
}
