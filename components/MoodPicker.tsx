"use client";

import { useState, useMemo } from "react";

// --- NEW DATA MAP FOR KANJI AND DESCRIPTION ---
const MOOD_KANJI_MAP: Record<
  string,
  { kanji: string; description: string }
> = {
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

  // Page 2
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

  // Page 3
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

// Convert map -> array for rendering
const MOODS = Object.keys(MOOD_KANJI_MAP);

export default function MoodPicker({
  onSelectMood,
}: {
  onSelectMood: (mood: string) => void;
}) {
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);

  // Filter moods
  const filteredMoods = useMemo(() => {
    const q = search.toLowerCase();
    return MOODS.filter(
      (m) =>
        m.toLowerCase().includes(q) ||
        MOOD_KANJI_MAP[m].kanji.includes(q) ||
        MOOD_KANJI_MAP[m].description.toLowerCase().includes(q)
    );
  }, [search]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredMoods.slice(start, start + ITEMS_PER_PAGE);
  }, [page, filteredMoods]);

  const totalPages = Math.ceil(filteredMoods.length / ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="SEARCH_MOOD_DB..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-3 py-2 border-2 border-green-400 bg-black text-green-400 text-xs placeholder-green-400/50 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400"
      />

      {/* Mood buttons */}
      <div className="grid grid-cols-2 gap-2">
        {paginated.map((mood) => {
          const data = MOOD_KANJI_MAP[mood];
          return (
            <button
              key={mood}
              onClick={() => onSelectMood(mood)}
              className="px-2 py-2 border-2 border-green-400 bg-black text-green-400 text-xs font-bold hover:border-pink-500 hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500 transition-all duration-200 text-left"
            >
              <div className="font-bold">{mood}</div>
              <div className="text-cyan-400 text-xs">{data.kanji}</div>
              <div className="text-green-400/60 text-[10px] italic">
                {data.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Count */}
      <div className="text-xs text-green-400/50 border-t border-green-400/20 pt-2">
        {">> MOODS_AVAILABLE: "} {filteredMoods.length}/{MOODS.length}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2 text-green-400 text-xs">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="disabled:opacity-20 hover:text-pink-400"
        >
          {"<< PREV"}
        </button>

        <div>
          PAGE {page}/{totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="disabled:opacity-20 hover:text-pink-400"
        >
          {"NEXT >>"}
        </button>
      </div>
    </div>
  );
}
