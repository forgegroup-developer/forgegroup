type ReelHeroVideoProps = {
  src: string;
  label: string;
  poster?: string;
  className?: string;
};

export default function ReelHeroVideo({ src, label, poster, className = "" }: ReelHeroVideoProps) {
  return (
    <div
      className={`relative aspect-[9/16] w-full max-w-[min(100%,300px)] sm:max-w-[320px] lg:w-[340px] lg:max-w-none xl:w-[380px] shrink-0 mx-auto rounded-3xl overflow-hidden border border-brand-bordo shadow-2xl ${className}`}
    >
      <video
        controls
        preload="metadata"
        playsInline
        poster={poster}
        className="absolute inset-0 block h-full w-full object-cover object-center"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
        Il tuo browser non supporta il video.
      </video>
    </div>
  );
}
