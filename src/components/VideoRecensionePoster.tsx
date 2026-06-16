import Image from "next/image";
import VideoPosterWithPlay from "@/components/VideoPosterWithPlay";
import { siteImages } from "@/data/images";

type VideoRecensionePosterProps = {
  src: string;
  label: string;
  priority?: boolean;
  videoClassName?: string;
};

export default function VideoRecensionePoster({
  src,
  label,
  priority = false,
  videoClassName = "w-full block aspect-video object-cover rounded-none",
}: VideoRecensionePosterProps) {
  return (
    <VideoPosterWithPlay
      src={src}
      poster={siteImages.videoPoster}
      label={label}
      className="relative w-full"
      videoClassName={videoClassName}
    >
      <picture className="block w-full">
        <source media="(max-width: 1023px)" srcSet={siteImages.videoPosterMobile} />
        <Image
          src={siteImages.videoPoster}
          alt={label}
          width={1280}
          height={720}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="w-full block aspect-video object-cover"
          sizes="(max-width: 1023px) 100vw, (max-width: 1024px) 574px, 574px"
        />
      </picture>
    </VideoPosterWithPlay>
  );
}
