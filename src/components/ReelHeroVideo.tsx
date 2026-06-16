import Image from "next/image";
import VideoPosterWithPlay from "@/components/VideoPosterWithPlay";

type ReelHeroVideoProps = {
  src: string;
  label: string;
  poster: string;
  className?: string;
  priority?: boolean;
};

const shellClassName =
  "relative aspect-[9/16] w-full max-w-[min(100%,300px)] sm:max-w-[320px] lg:w-[340px] lg:max-w-none xl:w-[380px] shrink-0 mx-auto rounded-3xl overflow-hidden border border-brand-bordo shadow-2xl";

export default function ReelHeroVideo({
  src,
  label,
  poster,
  className = "",
  priority = false,
}: ReelHeroVideoProps) {
  return (
    <div className={`${shellClassName} ${className}`.trim()}>
      <VideoPosterWithPlay
        src={src}
        poster={poster}
        label={label}
        className="relative h-full w-full"
        videoClassName="absolute inset-0 block h-full w-full object-cover object-center"
      >
        <Image
          src={poster}
          alt={label}
          width={1080}
          height={1920}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 block h-full w-full object-cover object-center"
          sizes="(max-width: 1024px) 300px, 380px"
        />
      </VideoPosterWithPlay>
    </div>
  );
}
