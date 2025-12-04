"use client";

import { useState, useMemo } from "react";

// Full moods list with Japanese translations
const MOODS = [
  { name: "Happy", jp: "幸福" },
  { name: "Sad", jp: "悲しみ" },
  { name: "Excited", jp: "興奮" },
  { name: "Calm", jp: "平静" },
  { name: "Angry", jp: "怒り" },
  { name: "Tired", jp: "疲れた" },
  { name: "Anxious", jp: "不安" },
  { name: "Lonely", jp: "孤独" },
  { name: "Loved", jp: "愛" },
  { name: "Confident", jp: "自信" },
  { name: "Motivated", jp: "動機" },
  { name: "Bored", jp: "退屈" },
  { name: "Nostalgic", jp: "懐かしい" },
  { name: "Hopeful", jp: "希望" },
  { name: "Grateful", jp: "感謝" },
  { name: "Melancholic", jp: "哀愁" },
  { name: "Transcendent", jp: "超越" },
  { name: "Chaotic", jp: "混沌" },
  { name: "Peaceful", jp: "穏やか" },
  { name: "Ecstatic", jp: "歓喜" },
  { name: "Surreal", jp: "超現実" },
  { name: "Nostalgic_Pain", jp: "郷愁" },
  { name: "Digital_Zen", jp: "デジタル禅" },
  { name: "Fragmented", jp: "断片化" },
  { name: "Euphoric", jp: "陶酔" },
];

export default function MoodPicker({
  onSelectMood,
}: {
  onSelectMood: (mood: string) => void;
}) {
  const [search, setSearch] = useState("");

  // Filter moods by search query
  const filteredMoods = useMemo(() => {
    if (!search) return MOODS;
    const query = search.toLowerCase();
    return MOODS.filter(
      (m) => m.name.toLowerCase().includes(query) || m.jp.includes(query)
    );
  }, [search]);

  return (
    <div className="w-full space-y-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="SEARCH_MOOD_DB..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border-2 border-green-400 bg-black text-green-400 text-xs placeholder-green-400/50 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400"
      />

      {/* Mood buttons */}
      <div className="grid grid-cols-2 gap-2">
        {filteredMoods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onSelectMood(mood.name)}
            className="px-2 py-2 border-2 border-green-400 bg-black text-green-400 text-xs font-bold hover:border-pink-500 hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500 transition-all duration-200"
          >
            <div>{mood.name}</div>
            <div className="text-cyan-400 text-xs">{mood.jp}</div>
          </button>
        ))}
      </div>

      {/* Mood count */}
      <div className="text-xs text-green-400/50 border-t border-green-400/20 pt-2">
        {">> MOODS_AVAILABLE: "} {filteredMoods.length}/{MOODS.length}
      </div>
    </div>
  );
}
