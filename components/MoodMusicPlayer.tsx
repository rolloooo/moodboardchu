"use client";

interface YouTubePlayerProps {
  src: string; // full iframe src URL
}

export default function YouTubePlayer({ src }: YouTubePlayerProps) {
  return (
    <div className="relative mt-4 w-full border-2 border-green-500 bg-black/80 rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.5)] overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px",
        }}
      />
      {/* Top label */}
      <div className="absolute top-1 left-2 text-green-400 text-[10px] font-mono animate-pulse z-10">
        ▸ MOOD MUSIC
      </div>
      {/* YouTube iframe */}
      <div className="aspect-video w-full relative z-0">
        <iframe
          className="w-full h-full rounded-sm"
          src={src}
          title="YouTube playlist"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {/* Optional flicker overlay */}
      <div className="absolute inset-0 pointer-events-none animate-[pulse_3s_ease-in-out_infinite] mix-blend-overlay opacity-10" />
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
