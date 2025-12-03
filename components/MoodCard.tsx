import { MOOD_TEXTURES } from "../lib/textureStyles";
import MoodSVG from "./MoodSVG";

interface MoodCardProps {
  quote?: string;
  imageUrl?: string;
  mood?: string;
  // optional svg props bag to forward to MoodSVG when callers want a generated visual
  svgProps?: {
    text?: string;
    width?: number;
    height?: number;
    circleCount?: number;
    shinyRarity?: number;
    className?: string;
  };
}

export default function MoodCard({ quote, imageUrl, mood, svgProps }: MoodCardProps) {
  const textureClass = mood ? MOOD_TEXTURES[mood as keyof typeof MOOD_TEXTURES] : "bg-white";

  // Use mood string if available, otherwise fall back to quote (trimmed)
  const visualText = svgProps?.text ?? mood ?? (quote ? quote.slice(0, 24) : "mood");

  return (
    <div className={`rounded-lg p-6 shadow-xl max-w-md transition-all duration-500 ${textureClass}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={mood} className="w-full rounded-lg mb-4" />
      ) : (
        // deterministic SVG based on the mood/quote text
        <div className="w-full rounded-lg mb-4 overflow-hidden">
          <MoodSVG
            text={visualText}
            width={svgProps?.width ?? 520}
            height={svgProps?.height ?? 200}
            circleCount={svgProps?.circleCount ?? 16}
            shinyRarity={svgProps?.shinyRarity ?? 0.012}
            className={svgProps?.className}
          />
        </div>
      )}
      <p className="text-center font-anime text-gray-800">{quote}</p>
    </div>
  );
}