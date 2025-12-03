"use client";

import MoodPicker from "../../../components/MoodPicker";
import MoodCard from "../../../components/MoodCard";
import { useState } from "react";
import { generateQuote } from "../../../lib/openai";
import { getImage } from "../../../lib/openai";
import { generateMoodSVG } from "../../../lib/svgGenerator";
import { playMoodSound } from "../../../lib/audioGenerator"
import { MOOD_TEXTURES } from "../../../lib/textureStyles";

export default function Dashboard() {
  const [mood, setMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSelectMood = async (selectedMood: string) => {
    setLoading(true);
    setMood(selectedMood);

    // Play sound
    playMoodSound(selectedMood);

    // Generate SVG
    const moodSVG = generateMoodSVG(selectedMood);
    setSvg(moodSVG);

    // Fetch data
    const fetchedQuote = await generateQuote(selectedMood);
    const fetchedImage = await getImage(selectedMood);
    setQuote(fetchedQuote);
    setImage(fetchedImage);
    setLoading(false);
  };

  const textureClass = mood ? MOOD_TEXTURES[mood as keyof typeof MOOD_TEXTURES] : "";

  return (
    <div className={`p-8 min-h-screen flex flex-col items-center transition-all duration-500 ${textureClass}`}>
      <h1 className="text-4xl font-anime font-bold mb-8 text-purple-900">✨ MoodBoard ✨</h1>
      <MoodPicker onSelectMood={handleSelectMood} />
      {loading && <p className="text-lg font-anime text-purple-700">Creating your mood board...</p>}
      {svg && <div className="w-48 h-48 mb-6 animate-bounce" dangerouslySetInnerHTML={{ __html: svg }} />}
      {mood && <MoodCard quote={quote} imageUrl={image} mood={mood} />}
    </div>
  );
}
