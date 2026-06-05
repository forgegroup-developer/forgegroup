import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** overlay = su foto · hero = su sfondo corallo · inline = sezioni bianche */
  variant?: "overlay" | "hero" | "inline";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const boxSizes = {
  sm: "h-10 w-28",
  md: "h-12 w-32",
  lg: "h-16 w-44 md:h-[4.5rem] md:w-52",
  xl: "h-14 w-40 md:h-[4.25rem] md:w-[13.5rem]",
};

const imageSizes = {
  sm: "(max-width: 768px) 112px, 112px",
  md: "(max-width: 768px) 128px, 160px",
  lg: "(max-width: 768px) 176px, 208px",
  xl: "(max-width: 768px) 200px, 280px",
};

export default function CaseStudyClientLogo({
  src,
  alt,
  variant = "overlay",
  className = "",
  size = "md",
}: Props) {
  const imageShadow =
    variant === "hero"
      ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      : variant === "overlay"
        ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
        : "";

  const imageBox = (
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

  if (variant === "overlay") {
    return (
      <div className="rounded-2xl bg-white/[0.96] backdrop-blur-[3px] p-2.5 md:p-3 shadow-lg shadow-black/25 ring-1 ring-black/[0.06]">
        {imageBox}
      </div>
    );
  }

  return imageBox;
}
