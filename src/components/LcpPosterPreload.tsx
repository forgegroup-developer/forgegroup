import { siteImages } from "@/data/images";

/** Preload LCP poster con media query — mobile vs desktop. */
export default function LcpPosterPreload() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={siteImages.videoPosterMobile}
        media="(max-width: 1023px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={siteImages.videoPoster}
        media="(min-width: 1024px)"
        fetchPriority="high"
      />
    </>
  );
}
