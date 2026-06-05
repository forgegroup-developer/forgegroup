import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** overlay = su foto · hero = su sfondo corallo · inline = sezioni bianche */
  variant?: "overlay" | "hero" | "inline";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const boxSizes = {
  sm: "h-10 w-24",
  md: "h-11 w-28",
  lg: "h-14 w-36 md:h-16 md:w-40",
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
        className={`object-contain object-center ${imageShadow}`}
        sizes="(max-width: 768px) 112px, 160px"
      />
    </div>
  );
}
