"use client";

import { useState, useMemo } from "react";
import { MOODS } from "../lib/moods";

export default function MoodPicker({ onSelectMood }: { onSelectMood: (mood: string) => void }) {
  const [search, setSearch] = useState("");

  const filteredMoods = useMemo(() => {
    if (!search) return MOODS;
    const query = search.toLowerCase();
    return MOODS.filter((m) => m.name.toLowerCase().includes(query));
  }, [search]);

  const rarityStyles = {
    common: "bg-blue-200 hover:bg-blue-300",
    rare: "bg-purple-300 hover:bg-purple-400 border-2 border-purple-500",
    shiny: "bg-gradient-to-r from-yellow-200 to-pink-200 hover:from-yellow-300 hover:to-pink-300 border-2 border-yellow-400 shadow-lg animate-pulse",
  };

  return (
    <div className="w-full max-w-2xl">
      <input
        type="text"
        placeholder="Search moods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-lg font-anime focus:outline-none focus:border-purple-600"
      />
      <div className="flex gap-2 mb-4 flex-wrap">
        {filteredMoods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onSelectMood(mood.name)}
            className={`px-3 py-2 rounded font-anime transition text-sm ${rarityStyles[mood.rarity as keyof typeof rarityStyles]}`}
          >
            {mood.name} {mood.rarity === "shiny" && "✨"}
          </button>
        ))}
      </div>
      <p className="text-sm font-anime text-gray-600">
        Total moods: {filteredMoods.length} | Common: {filteredMoods.filter(m => m.rarity === "common").length} | Rare: {filteredMoods.filter(m => m.rarity === "rare").length} | Shiny: {filteredMoods.filter(m => m.rarity === "shiny").length}
      </p>
    </div>
  );
}
