"use client";

import MoodPicker from "../../../components/MoodPicker";
import MoodCard from "../../../components/MoodCard";
import { useState } from "react";
import { generateQuote } from "../../../lib/openai";
import { getImage } from "../../../lib/openai";

export default function Dashboard() {
  const [mood, setMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleSelectMood = async (selectedMood: string) => {
    setMood(selectedMood);
    const fetchedQuote = await generateQuote(selectedMood);
    const fetchedImage = await getImage(selectedMood);
    setQuote(fetchedQuote);
    setImage(fetchedImage);
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl mb-6">MoodBoard</h1>
      <MoodPicker onSelectMood={handleSelectMood} />
      {mood && <MoodCard quote={quote} imageUrl={image} />}
    </div>
  );
}
