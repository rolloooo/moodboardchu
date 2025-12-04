// MoodCard.tsx
interface MoodCardProps {
  quote?: string;
  imageUrl?: string;
  mood?: string;
}

// --- MOOD_KANJI_MAP ---
const MOOD_KANJI_MAP: Record<string, { kanji: string; description: string }> = {
  Happy: { kanji: "幸福", description: "soft light through digital rain" },
  Sad: { kanji: "悲しみ", description: "echoes in the empty frame" },
  Excited: { kanji: "興奮", description: "sparks along the synapse wire" },
  Calm: { kanji: "平静", description: "still circuits hum" },
  Angry: { kanji: "怒り", description: "surging static" },
  Tired: { kanji: "疲れた", description: "sleep mode engaged" },
  Anxious: { kanji: "不安", description: "system overloading" },
  Lonely: { kanji: "孤独", description: "distant signal drift" },
  Loved: { kanji: "愛", description: "warm data flow" },
  Confident: { kanji: "自信", description: "stable core command" },
  Motivated: { kanji: "やる気", description: "thrust engaging" },
  Bored: { kanji: "退屈", description: "idle loop" },
  Nostalgic: { kanji: "懐かしい", description: "ghost memory playback" },
  Hopeful: { kanji: "希望", description: "future vector projected" },
  Grateful: { kanji: "感謝", description: "resource allocation successful" },
  Melancholic: { kanji: "憂鬱", description: "faded color palette" },
  Transcendent: { kanji: "超越", description: "beyond the firewall" },
  Chaotic: { kanji: "混沌", description: "data scatter storm" },
  Peaceful: { kanji: "平和", description: "silent running mode" },
  Ecstatic: { kanji: "有頂天", description: "maximum energy burst" },
  Surreal: { kanji: "超現実的", description: "unstable reality warp" },
  Nostalgic_Pain: { kanji: "痛み", description: "corrupted memory sector" },
  Digital_Zen: { kanji: "禅", description: "pure binary stillness" },
  Fragmented: { kanji: "断片", description: "broken data stream" },
  Euphoric: { kanji: "陶酔", description: "uplink achieved" },
  Dramatic: { kanji: "劇的", description: "spotlight on the mindstage" },
  Electric: { kanji: "電気", description: "charged thought coil" },
  Frozen: { kanji: "凍結", description: "emotion in standby mode" },
  Dreamy: { kanji: "夢幻", description: "cloud-soft rendering" },
  Wired: { kanji: "接続", description: "nerves plugged into neon" },
  Ghostly: { kanji: "幽霊", description: "faint afterimage in memory" },
  Vaporwave: { kanji: "蒸気波", description: "retro gradients shifting" },
  Neon_Drip: { kanji: "滴光", description: "color leaking through pixels" },
  Cosmic: { kanji: "宇宙", description: "infinite background process" },
  Synthetic: { kanji: "合成", description: "artificial calm loaded" },
  Analog_Warm: { kanji: "温帯", description: "magnetic hiss of nostalgia" },
  Overclocked: { kanji: "加速", description: "CPU overheating" },
  Underwater: { kanji: "水中", description: "muffled emotion layers" },
  Glitched: { kanji: "故障", description: "pattern mismatch detected" },
  Foggy: { kanji: "霧", description: "low visibility thoughts" },
  Bittersweet: { kanji: "甘苦", description: "sweet static on the tongue" },
  Restless: { kanji: "落ち着かない", description: "oscillating signal" },
  Hollow: { kanji: "空虚", description: "echo inside the shell" },
  Feral: { kanji: "野生", description: "raw instinct flashing" },
  Kinetic: { kanji: "動力", description: "constant motion memory" },
  Terminal_Bliss: { kanji: "端末喜", description: "OS smiling silently" },
  Electric_Melancholy: { kanji: "電憂", description: "charged sadness" },
  Crimson_Mood: { kanji: "深紅", description: "deep red pulse" },
  Softcore_Zen: { kanji: "柔禅", description: "pillow-soft quiet" },
  Burnout: { kanji: "消耗", description: "battery drained to zero" },
  Static_Dream: { kanji: "雑夢", description: "dreams made of noise" },
  Bio_Luminescent: { kanji: "発光", description: "living light rising" },
  Vapor_Sadness: { kanji: "泣気", description: "sadness dissolving" },
  Monochrome: { kanji: "単色", description: "grayscale emotion output" },
  Lucid: { kanji: "明晰", description: "awareness initializing" },
  Overstimulated: { kanji: "過負荷", description: "sensory overflow" },
  Quiet_Anger: { kanji: "静怒", description: "fire behind glass" },
  Echo: { kanji: "反響", description: "reverberating memories" },
  Drifting: { kanji: "漂流", description: "mind untethered" },
  Default: { kanji: "信号", description: "signal received" },
};

// --- COLORS ---
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
  // fallback color for any new moods
  Default: "border-green-400 text-green-400",
};

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
  Default: "text-green-400",
};

// --- COMPONENT ---
export default function MoodCard({ quote, imageUrl, mood }: MoodCardProps) {
  const data = mood ? MOOD_KANJI_MAP[mood] || MOOD_KANJI_MAP["Default"] : MOOD_KANJI_MAP["Default"];
const moodKey = mood ?? "Default"; // fallback to "Default" if mood is undefined
const fullColorClass = MOOD_FULL_COLORS[moodKey];
const kanjiTextColor = KANJI_TEXT_COLORS[moodKey];


  return (
    <div className={`border-2 ${fullColorClass} bg-black/90 backdrop-blur p-6 space-y-4 transition-colors duration-500`}>
      <div className="text-xs font-mono text-center opacity-50">
        ▸ MOOD_TRANSMISSION: {mood || "Unknown"}
      </div>

      {/* Kanji */}
      <div className="flex items-center justify-center py-4">
        <h2 className={`text-6xl md:text-8xl font-extrabold ${kanjiTextColor}`}>
          {data.kanji}
        </h2>
      </div>

      {/* Mood image */}
      {imageUrl && (
        <div className="aspect-video border-2 border-current/50 overflow-hidden bg-black">
          <img
            src={imageUrl}
            alt={mood}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
          />
        </div>
      )}

      {/* Quote or description */}
      <div className="min-h-24 flex flex-col items-center justify-center text-center">
        {quote ? (
          <p className="text-sm font-mono italic leading-relaxed opacity-90">&quot; {quote} &quot;</p>
        ) : (
          <p className="text-xs text-green-400/70 italic">{data.description}</p>
        )}
      </div>

      <div className="text-xs text-center opacity-50 pt-2 border-t border-current/30">[END_TRANSMISSION]</div>
    </div>
  );
}
