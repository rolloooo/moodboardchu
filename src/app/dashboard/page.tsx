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
    <div className={`p-4 sm:p-6 md:p-8 min-h-screen flex flex-col items-center transition-all duration-500 ${textureClass}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-anime font-bold mb-4 sm:mb-6 md:mb-8 text-purple-900 text-center px-2">
        ✨ MoodBoard ✨
      </h1>
      
      <div className="w-full max-w-4xl">
        <MoodPicker onSelectMood={handleSelectMood} />
      </div>
      
      {loading && (
        <p className="text-base sm:text-lg font-anime text-purple-700 mt-6 text-center px-4">
          Creating your mood board...
        </p>
      )}
      
      {svg && (
        <div 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 my-4 sm:my-6 animate-bounce" 
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      )}
      
      {mood && (
        <div className="w-full max-w-4xl px-2 sm:px-4">
          <MoodCard quote={quote} imageUrl={image} mood={mood} />
        </div>
      )}
    </div>
  );
}