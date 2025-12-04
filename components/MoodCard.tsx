interface MoodCardProps {
  quote?: string;
  imageUrl?: string;
  mood?: string;
  kanji?: string;
}

// 1. Map for the dynamic border/text classes
const MOOD_FULL_COLORS: Record<string, string> = {
  Happy: "border-yellow-400 text-yellow-400",
  Sad: "border-blue-400 text-blue-400",
  Excited: "border-pink-500 text-pink-500",
  Calm: "border-cyan-400 text-cyan-400",
  Angry: "border-red-500 text-red-500",
  Tired: "border-gray-500 text-gray-400",
  Anxious: "border-purple-500 text-purple-400",
  Lonely: "border-indigo-500 text-indigo-400",
  Loved: "border-pink-500 text-pink-400",
  Confident: "border-green-400 text-green-400",
  Motivated: "border-lime-400 text-lime-400",
  Bored: "border-gray-600 text-gray-500",
  Nostalgic: "border-amber-600 text-amber-500",
  Hopeful: "border-orange-400 text-orange-400",
  Grateful: "border-rose-400 text-rose-400",
  Melancholic: "border-violet-600 text-violet-500",
  Transcendent: "border-white text-white",
  Chaotic: "border-orange-500 text-orange-500",
  Peaceful: "border-teal-400 text-teal-400",
  Ecstatic: "border-yellow-300 text-yellow-300",
  Surreal: "border-fuchsia-500 text-fuchsia-400",
  Nostalgic_Pain: "border-amber-700 text-amber-600",
  Digital_Zen: "border-lime-500 text-lime-500",
  Fragmented: "border-cyan-500 text-cyan-500",
  Euphoric: "border-pink-400 text-pink-300",
};

// 2. Map for *only* the Kanji text color
const KANJI_TEXT_COLORS: Record<string, string> = {
  Happy: "text-yellow-400",
  Sad: "text-blue-400",
  Excited: "text-pink-500",
  Calm: "text-cyan-400",
  Angry: "text-red-500",
  Tired: "text-gray-400",
  Anxious: "text-purple-400",
  Lonely: "text-indigo-400",
  Loved: "text-pink-400",
  Confident: "text-green-400",
  Motivated: "text-lime-400",
  Bored: "text-gray-500",
  Nostalgic: "text-amber-500",
  Hopeful: "text-orange-400",
  Grateful: "text-rose-400",
  Melancholic: "text-violet-500",
  Transcendent: "text-white",
  Chaotic: "text-orange-500",
  Peaceful: "text-teal-400",
  Ecstatic: "text-yellow-300",
  Surreal: "text-fuchsia-400",
  Nostalgic_Pain: "text-amber-600",
  Digital_Zen: "text-lime-500",
  Fragmented: "text-cyan-500",
  Euphoric: "text-pink-300",
};

export default function MoodCard({ quote, imageUrl, mood, kanji }: MoodCardProps) {
  
  // Use the full color map for the container border and text-opacity elements
  const fullColorClass = mood
    ? MOOD_FULL_COLORS[mood] || "border-green-400 text-green-400"
    : "border-green-400 text-green-400";
  
  // Use the specific text color map for the Kanji
  const kanjiTextColor = mood
    ? KANJI_TEXT_COLORS[mood] || "text-green-400"
    : "text-green-400";

  return (
    <div className={`border-2 ${fullColorClass} bg-black/90 backdrop-blur p-6 space-y-4`}>
      {/* Mood header */}
      <div className="text-xs font-mono text-center opacity-50">▸ MOOD_TRANSMISSION: {mood}</div>

      {/* Kanji (New Element) - Styled with the specific kanjiTextColor */}
      {kanji && (
        <div className="flex items-center justify-center py-4">
          <h2 className={`text-6xl md:text-8xl font-extrabold ${kanjiTextColor} transition-colors duration-500`}>
            {kanji}
          </h2>
        </div>
      )}
      
      {/* Mood image */}
      {imageUrl && (
        <div className="aspect-video border-2 border-current/50 overflow-hidden bg-black">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={mood}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
          />
        </div>
      )}

      {/* Quote */}
      {quote && (
        <div className="min-h-24 flex items-center justify-center">
          <p className="text-center text-sm font-mono italic leading-relaxed opacity-90">&quot; {quote} &quot;</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-center opacity-50 pt-2 border-t border-current/30">[END_TRANSMISSION]</div>
    </div>
  );
}