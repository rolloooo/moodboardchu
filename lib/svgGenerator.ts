import chroma from "chroma-js";

export function generateMoodSVG(mood: string): string {
  const moodStyles: Record<string, { color: string; shape: string; texture: string }> = {
    Happy: { color: "#FFC6FF", shape: "circle", texture: "dots" },
    Chill: { color: "#C6EEFF", shape: "wave", texture: "lines" },
    Excited: { color: "#FFE6C6", shape: "star", texture: "sparkle" },
    Sad: { color: "#B0C4DE", shape: "drop", texture: "soft" },
    Angry: { color: "#FF6B6B", shape: "spike", texture: "harsh" },
    Tired: { color: "#D3D3D3", shape: "circle", texture: "blur" },
    Calm: { color: "#98FF98", shape: "wave", texture: "smooth" },
    Energetic: { color: "#FFFF00", shape: "star", texture: "sparkle" },
    Peaceful: { color: "#90EE90", shape: "circle", texture: "soft" },
    Anxious: { color: "#FFD700", shape: "spike", texture: "zigzag" },
    Confident: { color: "#DDA0DD", shape: "star", texture: "bold" },
    Lonely: { color: "#4B0082", shape: "drop", texture: "soft" },
    Loved: { color: "#FFB6C1", shape: "heart", texture: "glow" },
    Motivated: { color: "#32CD32", shape: "star", texture: "sparkle" },
    Bored: { color: "#A9A9A9", shape: "circle", texture: "flat" },
    Nostalgic: { color: "#FFD700", shape: "wave", texture: "vintage" },
    Contemplative: { color: "#708090", shape: "circle", texture: "soft" },
    Whimsical: { color: "#FF69B4", shape: "star", texture: "swirl" },
    Melancholic: { color: "#4169E1", shape: "drop", texture: "soft" },
    Inspired: { color: "#FFD700", shape: "star", texture: "sparkle" },
    Hopeful: { color: "#87CEEB", shape: "circle", texture: "glow" },
    Playful: { color: "#FF1493", shape: "star", texture: "dots" },
    Grateful: { color: "#FFA500", shape: "circle", texture: "warm" },
    Adventurous: { color: "#FF4500", shape: "star", texture: "bold" },
    Sentimental: { color: "#FF69B4", shape: "heart", texture: "glow" },
    Curious: { color: "#00CED1", shape: "star", texture: "zigzag" },
    Serene: { color: "#00BFFF", shape: "wave", texture: "smooth" },
    Daring: { color: "#FF0000", shape: "spike", texture: "harsh" },
    Thoughtful: { color: "#778899", shape: "circle", texture: "soft" },
    Transcendent: { color: "#9370DB", shape: "star", texture: "glow" },
    Ethereal: { color: "#E0FFFF", shape: "wave", texture: "soft" },
    Euphoric: { color: "#FFD700", shape: "star", texture: "sparkle" },
    Luminous: { color: "#FFFF00", shape: "circle", texture: "glow" },
    Celestial: { color: "#4B0082", shape: "star", texture: "sparkle" },
    Blissful: { color: "#FF69B4", shape: "heart", texture: "glow" },
    Enchanted: { color: "#9370DB", shape: "star", texture: "swirl" },
    Magical: { color: "#9370DB", shape: "star", texture: "sparkle" },
    Cosmic: { color: "#191970", shape: "circle", texture: "stars" },
    Infinite: { color: "#4B0082", shape: "wave", texture: "soft" },
    Awakened: { color: "#FFD700", shape: "star", texture: "glow" },
  };

  const style = moodStyles[mood] || { color: "#FFFAC6", shape: "circle", texture: "soft" };
  const palette = chroma.scale([style.color, chroma(style.color).darken(2)]).colors(3);

  // Define pattern/texture ID
  const patternId = `pattern-${mood.replace(/\s+/g, "-")}`;

  // Generate texture pattern
  const texturePattern = getTexturePattern(patternId, style.texture, palette);

  if (style.shape === "circle") {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>${texturePattern}</defs>
      <circle cx="100" cy="100" r="80" fill="url(#${patternId})" opacity="0.9"/>
      <circle cx="100" cy="100" r="60" fill="${palette[1]}" opacity="0.6"/>
      <circle cx="100" cy="100" r="40" fill="${palette[2]}" opacity="0.4"/>
    </svg>`;
  }

  if (style.shape === "star") {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>${texturePattern}</defs>
      <polygon points="100,20 140,80 200,80 150,130 170,190 100,150 30,190 50,130 0,80 60,80" 
        fill="url(#${patternId})" opacity="0.9"/>
      <polygon points="100,50 120,90 160,90 130,120 145,160 100,130 55,160 70,120 40,90 80,90" 
        fill="${palette[2]}" opacity="0.6"/>
    </svg>`;
  }

  if (style.shape === "heart") {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>${texturePattern}</defs>
      <path d="M100,170 C30,130 10,90 10,65 C10,40 30,25 50,25 C70,25 85,35 100,50 C115,35 130,25 150,25 C170,25 190,40 190,65 C190,90 170,130 100,170 Z" 
        fill="url(#${patternId})" opacity="0.9"/>
    </svg>`;
  }

  if (style.shape === "spike") {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>${texturePattern}</defs>
      <polygon points="100,10 120,80 190,80 140,130 160,200 100,150 40,200 60,130 10,80 80,80" 
        fill="url(#${patternId})" opacity="0.9"/>
      <polygon points="100,40 110,90 160,90 120,130 140,180 100,140 60,180 80,130 40,90 90,90" 
        fill="${palette[2]}" opacity="0.6"/>
    </svg>`;
  }

  if (style.shape === "drop") {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>${texturePattern}</defs>
      <path d="M100,20 C100,20 60,80 60,110 C60,140 75,160 100,160 C125,160 140,140 140,110 C140,80 100,20 100,20 Z" 
        fill="url(#${patternId})" opacity="0.9"/>
      <path d="M100,50 C90,70 80,90 80,110 C80,125 90,140 100,140 C110,140 120,125 120,110 C120,90 110,70 100,50 Z" 
        fill="${palette[2]}" opacity="0.6"/>
    </svg>`;
  }

  // wave shape (default)
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>${texturePattern}</defs>
    <path d="M 0,100 Q 50,50 100,100 T 200,100" stroke="url(#${patternId})" stroke-width="8" fill="none"/>
    <path d="M 0,120 Q 50,70 100,120 T 200,120" stroke="${palette[1]}" stroke-width="6" fill="none" opacity="0.7"/>
    <path d="M 0,140 Q 50,90 100,140 T 200,140" stroke="${palette[2]}" stroke-width="4" fill="none" opacity="0.5"/>
  </svg>`;
}

function getTexturePattern(id: string, texture: string, palette: string[]): string {
  const [color1, color2, color3] = palette;

  switch (texture) {
    case "dots":
      return `<pattern id="${id}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="${color1}"/>
        <circle cx="10" cy="10" r="3" fill="${color3}"/>
      </pattern>`;
    case "lines":
      return `<pattern id="${id}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="${color1}"/>
        <line x1="0" y1="0" x2="10" y2="10" stroke="${color3}" stroke-width="1"/>
      </pattern>`;
    case "sparkle":
      return `<pattern id="${id}" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="${color1}"/>
        <polygon points="15,5 18,12 25,12 20,17 22,24 15,20 8,24 10,17 5,12 12,12" fill="${color3}"/>
      </pattern>`;
    case "smooth":
      return `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>`;
    case "glow":
      return `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color3};stop-opacity:0.5" />
      </radialGradient>`;
    case "zigzag":
      return `<pattern id="${id}" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
        <rect width="15" height="15" fill="${color1}"/>
        <polyline points="0,0 7.5,7.5 15,0" stroke="${color3}" stroke-width="1" fill="none"/>
      </pattern>`;
    case "swirl":
      return `<pattern id="${id}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="${color1}"/>
        <path d="M 20,5 Q 30,20 20,35 Q 10,20 20,5" stroke="${color3}" stroke-width="1.5" fill="none"/>
      </pattern>`;
    case "stars":
      return `<pattern id="${id}" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="${color1}"/>
        <polygon points="25,5 30,20 45,20 33,30 38,45 25,35 12,45 17,30 5,20 20,20" fill="${color3}"/>
      </pattern>`;
    default:
      return `<pattern id="${id}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="${color1}"/>
      </pattern>`;
  }
}