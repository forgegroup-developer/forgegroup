/** Pulsante play glass — unico stile per tutti i video click-to-play del sito. */
export default function VideoPlayGlassButton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none flex h-10 w-10 items-center justify-center glass-chip transition-transform duration-200 group-hover:scale-105 ${className}`.trim()}
    >
      <svg
        className="ml-0.5 h-[18px] w-[18px] shrink-0 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}
