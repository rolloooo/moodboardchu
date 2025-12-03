"use client";
import { useState } from "react";

export default function Home() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const themes = ["dream", "earthy", "nature", "sun", "moon", "life"];

  const generateSVG = (theme: string) => {
    const colors = {
      dream: ["#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8"],
      earthy: ["#8B7355", "#A0826D", "#C9A66B", "#D4B896"],
      nature: ["#7CB342", "#8BC34A", "#AED581", "#558B2F"],
      sun: ["#FFD700", "#FFA500", "#FF8C00", "#FFE4B5"],
      moon: ["#C0C0C0", "#E6E6FA", "#B0C4DE", "#778899"],
      life: ["#FF69B4", "#87CEEB", "#98FB98", "#FFB6C1"]
    };

    const themeColors = colors[theme as keyof typeof colors];
    const svgs = [
      // Mandala/Flower
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" fill="${themeColors[0]}" opacity="0.3"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x = 100 + Math.cos(angle) * 50;
          const y = 100 + Math.sin(angle) * 50;
          return `<circle cx="${x}" cy="${y}" r="25" fill="${themeColors[1]}" opacity="0.6"/>`;
        }).join('')}
        <circle cx="100" cy="100" r="30" fill="${themeColors[2]}"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 30;
          const y1 = 100 + Math.sin(angle) * 30;
          const x2 = 100 + Math.cos(angle) * 70;
          const y2 = 100 + Math.sin(angle) * 70;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${themeColors[3]}" stroke-width="2"/>`;
        }).join('')}
      </svg>`,
      
      // Abstract Waves
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${themeColors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${themeColors[1]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z" fill="url(#grad${Date.now()})" opacity="0.7"/>
        <path d="M0,120 Q50,80 100,120 T200,120 L200,200 L0,200 Z" fill="${themeColors[2]}" opacity="0.6"/>
        <path d="M0,140 Q50,110 100,140 T200,140 L200,200 L0,200 Z" fill="${themeColors[3]}" opacity="0.5"/>
      </svg>`,
      
      // Celestial
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="${themeColors[0]}"/>
        <circle cx="60" cy="60" r="30" fill="${themeColors[1]}"/>
        ${Array.from({ length: 20 }, () => {
          const x = Math.random() * 200;
          const y = Math.random() * 200;
          const r = Math.random() * 3 + 1;
          return `<circle cx="${x}" cy="${y}" r="${r}" fill="${themeColors[3]}"/>`;
        }).join('')}
        <path d="M150,100 L155,115 L170,115 L158,125 L163,140 L150,130 L137,140 L142,125 L130,115 L145,115 Z" fill="${themeColors[2]}"/>
      </svg>`,
      
      // Organic Shapes
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="100" rx="80" ry="60" fill="${themeColors[0]}" opacity="0.6" transform="rotate(30 100 100)"/>
        <ellipse cx="100" cy="100" rx="60" ry="80" fill="${themeColors[1]}" opacity="0.6" transform="rotate(60 100 100)"/>
        <ellipse cx="100" cy="100" rx="70" ry="70" fill="${themeColors[2]}" opacity="0.5" transform="rotate(90 100 100)"/>
        <circle cx="100" cy="100" r="40" fill="${themeColors[3]}" opacity="0.7"/>
      </svg>`,
      
      // Leaf Pattern
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({ length: 6 }, (_, i) => {
          const x = 40 + (i % 3) * 60;
          const y = 40 + Math.floor(i / 3) * 80;
          return `<path d="M${x},${y} Q${x+20},${y-20} ${x+30},${y} Q${x+20},${y+20} ${x},${y}" fill="${themeColors[i % 4]}" opacity="0.8"/>`;
        }).join('')}
      </svg>`
    ];

    return svgs[Math.floor(Math.random() * svgs.length)];
  };

  const generateImage = () => {
    if (!inputPrompt) return;
    setLoading(true);
    
    setTimeout(() => {
      const theme = themes[Math.floor(Math.random() * themes.length)];
      const svgContent = generateSVG(theme);
      const base64 = btoa(unescape(encodeURIComponent(svgContent)));
      const url = `data:image/svg+xml;base64,${base64}`;
      
      setImages([url, ...images]);
      setLoading(false);
      setInputPrompt("");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 p-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-6 p-6 border-4 border-purple-400 rounded-2xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 shadow-lg mb-10">
        <h1 className="text-5xl text-center font-bold font-anime text-purple-700 drop-shadow-lg">
          🌸 MoodBoard 🌸
        </h1>
        <h1 className="text-5xl text-center font-bold font-anime text-purple-700 drop-shadow-lg">
          🫧 ムードボード 🫧
        </h1>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row justify-center mb-10 gap-4">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && generateImage()}
          placeholder="Enter your dreamy moodboard idea..."
          className="rounded-full px-6 py-3 w-80 sm:w-96 border-2 border-purple-300 focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-md placeholder-purple-500 text-purple-700"
        />
        <button
          onClick={generateImage}
          className="rounded-full px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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