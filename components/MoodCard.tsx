import { MOOD_TEXTURES } from "../lib/textureStyles";

interface MoodCardProps {
  quote: string;
  imageUrl: string;
  mood?: string;
}

export default function MoodCard({ quote, imageUrl, mood }: MoodCardProps) {
  const textureClass = mood ? MOOD_TEXTURES[mood as keyof typeof MOOD_TEXTURES] : "bg-white";

  return (
    <div className={`rounded-lg p-6 shadow-xl max-w-md transition-all duration-500 ${textureClass}`}>
      {imageUrl && <img src={imageUrl} alt={mood} className="w-full rounded-lg mb-4" />}
      <p className="text-center font-anime text-gray-800">{quote}</p>
    </div>
  );
}
