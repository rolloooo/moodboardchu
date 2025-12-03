"use client";

import { useState } from "react";

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!inputPrompt) return;

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setImages([data.imageUrl, ...images]);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
      setInputPrompt("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 p-6 font-poppins">
      {/* Header */}
      <h1 className="text-5xl text-center font-bold mb-10 text-purple-700 drop-shadow-lg">
        🎨 MoodBoard AI
      </h1>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row justify-center mb-10 gap-4">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Enter your dreamy moodboard idea..."
          className="rounded-full px-6 py-3 w-80 sm:w-96 border-2 border-purple-300 focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-md placeholder-purple-500 text-purple-700"
        />
        <button
          onClick={generateImage}
          className="rounded-full px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition-transform"
          disabled={loading}
        >
          {loading ? "✨ Creating..." : "Generate ✨"}
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-transform bg-white/30 backdrop-blur-md"
          >
            <img
              src={img}
              alt={`Generated ${idx}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
