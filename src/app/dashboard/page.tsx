"use client";

import { useState } from "react";
import MoodPicker from "../../../components/MoodPicker";
import MoodCard from "../../../components/MoodCard";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodboards, setMoodboards] = useState<
    { quote: string; imageUrl: string; palette: string[] }[]
  >([]);

  const generateMoodboard = async (mood: string) => {
    // Placeholder: replace with AI API call
    const fakeImage = `https://via.placeholder.com/400x300.png?text=${mood}`;
    const fakePalette = ["#F9C6D3", "#C7B7F9", "#A8E6CF"];
    const fakeQuote = `A dreamy ${mood} moodboard ✨`;

    setMoodboards([{ quote: fakeQuote, imageUrl: fakeImage, palette: fakePalette }, ...moodboards]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 p-6 font-poppins">
      {/* Header */}
      <h1 className="text-5xl text-center font-bold mb-6 text-purple-700 drop-shadow-lg">
        🎨 MoodBoard AI
      </h1>
      <p className="text-center text-purple-600 mb-8">Pick a mood and generate your anime-style palette!</p>

      {/* Mood Picker */}
      <MoodPicker
        onSelectMood={(mood) => {
          setSelectedMood(mood);
          generateMoodboard(mood);
        }}
      />

      {/* MoodBoard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {moodboards.map((board, idx) => (
          <MoodCard
            key={idx}
            quote={board.quote}
            imageUrl={board.imageUrl}
            palette={board.palette}
          />
        ))}
      </div>
    </div>
  );
}
