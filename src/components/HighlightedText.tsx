export type TextSegment = { text: string; highlight?: boolean };

export default function HighlightedText({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        segment.highlight ? (
          <span key={i} className="text-brand-corallo">
            {segment.text}
          </span>
        ) : (
          <span key={i}>{segment.text}</span>
        )
      )}
    </>
  );
}
