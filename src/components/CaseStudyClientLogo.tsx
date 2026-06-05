import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** overlay = rettangolo su foto · circle = badge tondo · hero = corallo · inline = sezioni bianche */
  variant?: "overlay" | "circle" | "hero" | "inline";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const boxSizes = {
  sm: "h-10 w-28",
  md: "h-12 w-32",
  lg: "h-16 w-44 md:h-[4.5rem] md:w-52",
  xl: "h-14 w-40 md:h-[4.25rem] md:w-[13.5rem]",
};

const circleSizes = {
  sm: "h-9 w-9 md:h-10 md:w-10",
  md: "h-11 w-11 md:h-12 md:w-12",
  lg: "h-12 w-12 md:h-14 md:w-14",
  xl: "h-11 w-11 md:h-12 md:w-12",
};

const imageSizes = {
  sm: "(max-width: 768px) 112px, 112px",
  md: "(max-width: 768px) 128px, 160px",
  lg: "(max-width: 768px) 176px, 208px",
  xl: "(max-width: 768px) 200px, 280px",
};

const circleImageSizes = {
  sm: "40px",
  md: "48px",
  lg: "56px",
  xl: "48px",
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
        className={`relative shrink-0 rounded-full bg-white shadow-lg shadow-black/30 ring-1 ring-black/[0.06] p-1 md:p-1.5 ${circleSizes[size]} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={95}
          className="object-contain object-center scale-[1.14]"
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

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${boxSizes[size]} ${className}`}
    >
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
}
