export default function VideoTestimonial() {
  return (
    <div className="bg-brand-panna border border-brand-bordo rounded-3xl p-4 md:p-6">
      <video
        controls
        preload="metadata"
        playsInline
        className="w-full rounded-2xl bg-black"
      >
        <source src="/api/video-recensione" type="video/quicktime" />
        <source src="/api/video-recensione" type="video/mp4" />
      </video>
      <p className="text-sm text-brand-grigio mt-4">
        Video recensione cliente Forge Group.
      </p>
    </div>
  );
}
