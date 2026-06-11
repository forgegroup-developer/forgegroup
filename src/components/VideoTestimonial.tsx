import GlowingEdgeCard from "@/components/GlowingEdgeCard";

export default function VideoTestimonial() {
  return (
    <GlowingEdgeCard
      className="rounded-3xl"
      innerClassName="bg-brand-panna p-4 md:p-6"
    >
      <video
        controls
        preload="metadata"
        playsInline
        className="w-full rounded-2xl bg-black"
      >
        <source src="/video-recensione.mp4" type="video/mp4" />
      </video>
      <p className="text-sm text-brand-grigio mt-4">
        Video recensione cliente Forge Group.
      </p>
    </GlowingEdgeCard>
  );
}
