import chroma from "chroma-js";

// Define the type for mood styles
type MoodStyle = {
  color: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
};

// Mood categories with synonyms and related words
const MOOD_MAPPING: Record<string, string[]> = {
  Happy: ["happy", "joyful", "cheerful", "delighted", "pleased", "content", "glad", "merry"],
  Sad: ["sad", "unhappy", "sorrowful", "gloomy", "melancholy", "downcast", "dejected", "depressed"],
  Excited: ["excited", "thrilled", "enthusiastic", "eager", "pumped", "hyped", "energized"],
  Calm: ["calm", "peaceful", "tranquil", "relaxed", "serene", "composed", "quiet"],
  Angry: ["angry", "furious", "mad", "irritated", "annoyed", "enraged", "upset"],
  Tired: ["tired", "exhausted", "weary", "sleepy", "fatigued", "drained", "worn"],
  Anxious: ["anxious", "nervous", "worried", "stressed", "tense", "uneasy", "restless"],
  Lonely: ["lonely", "isolated", "alone", "solitary", "abandoned", "forlorn"],
  Loved: ["loved", "cherished", "adored", "appreciated", "valued", "treasured"],
  Confident: ["confident", "assured", "bold", "self-assured", "certain", "secure"],
  Motivated: ["motivated", "driven", "determined", "inspired", "ambitious"],
  Bored: ["bored", "uninterested", "apathetic", "indifferent", "listless"],
  Nostalgic: ["nostalgic", "reminiscent", "sentimental", "wistful", "longing"],
  Hopeful: ["hopeful", "optimistic", "positive", "expectant", "encouraging"],
  Grateful: ["grateful", "thankful", "appreciative", "blessed"],
};

// Calculate similarity using Levenshtein distance
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Find the best matching mood
function findBestMoodMatch(input: string): string {
  const normalizedInput = input.toLowerCase().trim();
  
  // First, check for exact matches
  for (const [mood, synonyms] of Object.entries(MOOD_MAPPING)) {
    if (synonyms.includes(normalizedInput)) {
      return mood;
    }
  }
  
  // Then, use fuzzy matching
  let bestMatch = "Happy";
  let bestScore = Infinity;
  
  for (const [mood, synonyms] of Object.entries(MOOD_MAPPING)) {
    for (const synonym of synonyms) {
      const distance = levenshteinDistance(normalizedInput, synonym);
      const similarity = distance / Math.max(normalizedInput.length, synonym.length);
      
      if (distance < bestScore && similarity < 0.4) {
        bestScore = distance;
        bestMatch = mood;
      }
    }
  }
  
  return bestMatch;
}

// Generate illustrative SVG based on mood
function generateMoodIllustration(mood: string, style: MoodStyle): string {
  const { primaryColor, secondaryColor, accentColor } = style;
  
  switch (mood) {
    case "Happy":
      // Smiling sun
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunGlow">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.5" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="#FFF9E6"/>
        <!-- Sun rays -->
        ${Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = 100 + Math.cos(angle) * 50;
          const y1 = 100 + Math.sin(angle) * 50;
          const x2 = 100 + Math.cos(angle) * 70;
          const y2 = 100 + Math.sin(angle) * 70;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${accentColor}" stroke-width="4" stroke-linecap="round"/>`;
        }).join("")}
        <!-- Sun face -->
        <circle cx="100" cy="100" r="45" fill="url(#sunGlow)"/>
        <circle cx="85" cy="90" r="5" fill="#333"/>
        <circle cx="115" cy="90" r="5" fill="#333"/>
        <path d="M 80,105 Q 100,120 120,105" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>`;
      
    case "Sad":
      // Gloomy tree with rain
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gloomySky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#gloomySky)"/>
        <!-- Rain -->
        ${Array.from({ length: 20 }, (_, i) => {
          const x = (i * 23 + 10) % 200;
          const y = (i * 37) % 120 + 20;
          return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 12}" stroke="${accentColor}" stroke-width="1.5" opacity="0.5"/>`;
        }).join("")}
        <!-- Ground -->
        <rect y="150" width="200" height="50" fill="#2D3748" opacity="0.6"/>
        <!-- Tree trunk -->
        <rect x="90" y="100" width="20" height="50" fill="#3E2723" rx="2"/>
        <!-- Bare branches -->
        <line x1="100" y1="110" x2="70" y2="90" stroke="#3E2723" stroke-width="3"/>
        <line x1="100" y1="115" x2="130" y2="95" stroke="#3E2723" stroke-width="3"/>
        <line x1="70" y1="90" x2="60" y2="80" stroke="#3E2723" stroke-width="2"/>
        <line x1="130" y1="95" x2="140" y2="85" stroke="#3E2723" stroke-width="2"/>
      </svg>`;
      
    case "Excited":
      // Fireworks/sparkles
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#1A1A2E"/>
        <!-- Firework bursts -->
        ${Array.from({ length: 3 }, (_, burst) => {
          const cx = 50 + burst * 50;
          const cy = 50 + burst * 30;
          return Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = cx;
            const y1 = cy;
            const x2 = cx + Math.cos(angle) * 30;
            const y2 = cy + Math.sin(angle) * 30;
            const colors = [primaryColor, secondaryColor, accentColor];
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors[burst % 3]}" stroke-width="2" stroke-linecap="round"/>`;
          }).join("");
        }).join("")}
        <!-- Stars -->
        ${Array.from({ length: 15 }, (_, i) => {
          const x = Math.random() * 200;
          const y = Math.random() * 200;
          return `<circle cx="${x}" cy="${y}" r="2" fill="${accentColor}" opacity="0.8"/>`;
        }).join("")}
      </svg>`;
      
    case "Calm":
      // Peaceful water with moon
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="calmSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#calmSky)"/>
        <!-- Moon -->
        <circle cx="150" cy="50" r="25" fill="${accentColor}" opacity="0.9"/>
        <!-- Water waves -->
        <path d="M 0,120 Q 50,115 100,120 T 200,120" stroke="${secondaryColor}" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M 0,135 Q 50,130 100,135 T 200,135" stroke="${secondaryColor}" stroke-width="2" fill="none" opacity="0.5"/>
        <path d="M 0,150 Q 50,145 100,150 T 200,150" stroke="${secondaryColor}" stroke-width="2" fill="none" opacity="0.4"/>
        <rect y="160" width="200" height="40" fill="${secondaryColor}" opacity="0.3"/>
      </svg>`;
      
    case "Angry":
      // Storm with lightning
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#2D1B1B"/>
        <!-- Dark clouds -->
        <ellipse cx="60" cy="40" rx="40" ry="25" fill="${primaryColor}" opacity="0.8"/>
        <ellipse cx="100" cy="35" rx="45" ry="28" fill="${primaryColor}" opacity="0.8"/>
        <ellipse cx="140" cy="40" rx="40" ry="25" fill="${primaryColor}" opacity="0.8"/>
        <!-- Lightning bolts -->
        <polygon points="95,50 100,80 90,85 100,120" fill="${accentColor}" opacity="0.9"/>
        <polygon points="130,60 135,90 125,95 135,130" fill="${accentColor}" opacity="0.7"/>
        <!-- Heavy rain -->
        ${Array.from({ length: 30 }, (_, i) => {
          const x = (i * 15) % 200;
          const y = (i * 23) % 120 + 60;
          return `<line x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 18}" stroke="${secondaryColor}" stroke-width="2" opacity="0.6"/>`;
        }).join("")}
      </svg>`;
      
    case "Tired":
      // Sleepy moon/person
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#1A1A3E;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0F0F1E;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#nightSky)"/>
        <!-- Sleepy moon -->
        <circle cx="100" cy="90" r="40" fill="${primaryColor}" opacity="0.8"/>
        <!-- Closed eyes -->
        <path d="M 80,85 Q 90,90 85,90" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 105,85 Q 115,90 110,90" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Sleepy mouth -->
        <ellipse cx="100" cy="105" rx="8" ry="6" fill="#333" opacity="0.6"/>
        <!-- Zzz -->
        <text x="145" y="60" font-family="Arial" font-size="20" fill="${accentColor}" opacity="0.7">Z</text>
        <text x="155" y="45" font-family="Arial" font-size="16" fill="${accentColor}" opacity="0.6">z</text>
        <text x="165" y="35" font-family="Arial" font-size="12" fill="${accentColor}" opacity="0.5">z</text>
      </svg>`;
      
    case "Anxious":
      // Chaotic swirls and sharp angles
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#2A2A3E"/>
        <!-- Chaotic lines -->
        ${Array.from({ length: 20 }, (_, i) => {
          const x1 = Math.random() * 200;
          const y1 = Math.random() * 200;
          const x2 = Math.random() * 200;
          const y2 = Math.random() * 200;
          const colors = [primaryColor, secondaryColor, accentColor];
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors[i % 3]}" stroke-width="1.5" opacity="0.4"/>`;
        }).join("")}
        <!-- Zigzag patterns -->
        <polyline points="20,50 40,30 60,50 80,30 100,50" stroke="${accentColor}" stroke-width="2" fill="none"/>
        <polyline points="100,100 120,80 140,100 160,80 180,100" stroke="${primaryColor}" stroke-width="2" fill="none"/>
        <polyline points="30,150 50,130 70,150 90,130 110,150" stroke="${secondaryColor}" stroke-width="2" fill="none"/>
      </svg>`;
      
    case "Lonely":
      // Single figure in vast space
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lonelySky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#lonelySky)"/>
        <!-- Horizon -->
        <line x1="0" y1="150" x2="200" y2="150" stroke="${accentColor}" stroke-width="1" opacity="0.3"/>
        <!-- Small lone figure -->
        <circle cx="100" cy="135" r="8" fill="${accentColor}" opacity="0.6"/>
        <line x1="100" y1="143" x2="100" y2="160" stroke="${accentColor}" stroke-width="3" opacity="0.6"/>
        <line x1="100" y1="148" x2="90" y2="158" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
        <line x1="100" y1="148" x2="110" y2="158" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      </svg>`;
      
    case "Loved":
      // Hearts and warmth
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="loveGlow">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.3" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="#FFF5F5"/>
        <circle cx="100" cy="100" r="90" fill="url(#loveGlow)"/>
        <!-- Multiple hearts -->
        ${[
          { x: 100, y: 80, size: 1.2 },
          { x: 70, y: 110, size: 0.8 },
          { x: 130, y: 115, size: 0.9 },
          { x: 85, y: 140, size: 0.7 },
          { x: 115, y: 135, size: 0.75 }
        ].map(h => {
          const scale = h.size;
          return `<path d="M ${h.x},${h.y + 20 * scale} 
            C ${h.x - 30 * scale},${h.y} ${h.x - 30 * scale},${h.y - 10 * scale} ${h.x - 15 * scale},${h.y - 10 * scale} 
            C ${h.x - 10 * scale},${h.y - 15 * scale} ${h.x - 5 * scale},${h.y - 10 * scale} ${h.x},${h.y} 
            C ${h.x + 5 * scale},${h.y - 10 * scale} ${h.x + 10 * scale},${h.y - 15 * scale} ${h.x + 15 * scale},${h.y - 10 * scale} 
            C ${h.x + 30 * scale},${h.y - 10 * scale} ${h.x + 30 * scale},${h.y} ${h.x},${h.y + 20 * scale} Z" 
            fill="${accentColor}" opacity="0.7"/>`;
        }).join("")}
      </svg>`;
      
    case "Confident":
      // Strong mountain peak
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="confidentSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#confidentSky)"/>
        <!-- Mountain -->
        <polygon points="100,40 160,140 40,140" fill="${accentColor}" opacity="0.8"/>
        <polygon points="100,40 130,90 70,90" fill="${primaryColor}" opacity="0.6"/>
        <!-- Flag on peak -->
        <line x1="100" y1="40" x2="100" y2="25" stroke="#FFF" stroke-width="2"/>
        <polygon points="100,25 115,28 100,31" fill="#FFF" opacity="0.9"/>
        <!-- Sun behind -->
        <circle cx="150" cy="60" r="20" fill="#FFD700" opacity="0.6"/>
      </svg>`;
      
    case "Motivated":
      // Upward arrow with energy
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="motivatedBg" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style="stop-color:${secondaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#motivatedBg)"/>
        <!-- Large upward arrow -->
        <polygon points="100,30 140,80 115,80 115,150 85,150 85,80 60,80" fill="${accentColor}" opacity="0.9"/>
        <!-- Energy lines -->
        ${Array.from({ length: 8 }, (_, i) => {
          const y = 160 - i * 15;
          return `<line x1="40" y1="${y}" x2="160" y2="${y}" stroke="${primaryColor}" stroke-width="2" opacity="${0.3 + i * 0.08}" stroke-dasharray="5,5"/>`;
        }).join("")}
      </svg>`;
      
    case "Bored":
      // Empty clock/waiting
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#E8E8E8"/>
        <!-- Clock face -->
        <circle cx="100" cy="100" r="60" fill="none" stroke="${primaryColor}" stroke-width="3" opacity="0.5"/>
        <!-- Hour marks -->
        ${Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180;
          const x1 = 100 + Math.cos(angle) * 50;
          const y1 = 100 + Math.sin(angle) * 50;
          const x2 = 100 + Math.cos(angle) * 55;
          const y2 = 100 + Math.sin(angle) * 55;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${secondaryColor}" stroke-width="2" opacity="0.4"/>`;
        }).join("")}
        <!-- Clock hands -->
        <line x1="100" y1="100" x2="100" y2="60" stroke="${accentColor}" stroke-width="3" opacity="0.5"/>
        <line x1="100" y1="100" x2="130" y2="100" stroke="${accentColor}" stroke-width="2" opacity="0.5"/>
        <circle cx="100" cy="100" r="5" fill="${accentColor}" opacity="0.5"/>
      </svg>`;
      
    case "Nostalgic":
      // Old photo frame with sepia tones
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#F4E4C1"/>
        <!-- Photo frame -->
        <rect x="30" y="40" width="140" height="120" fill="${primaryColor}" opacity="0.3"/>
        <rect x="35" y="45" width="130" height="110" fill="none" stroke="${accentColor}" stroke-width="3"/>
        <!-- Simple landscape silhouette -->
        <path d="M 35,130 L 60,110 L 80,120 L 100,100 L 120,115 L 140,105 L 165,120 L 165,155 L 35,155 Z" 
          fill="${secondaryColor}" opacity="0.5"/>
        <!-- Sun/moon in memory -->
        <circle cx="140" cy="70" r="15" fill="${accentColor}" opacity="0.4"/>
        <!-- Corner wear marks -->
        <path d="M 35,45 L 45,45 L 35,55" fill="#8B7355" opacity="0.3"/>
        <path d="M 165,45 L 155,45 L 165,55" fill="#8B7355" opacity="0.3"/>
      </svg>`;
      
    case "Hopeful":
      // Sunrise/dawn breaking
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hopefulSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#hopefulSky)"/>
        <!-- Horizon -->
        <line x1="0" y1="140" x2="200" y2="140" stroke="#2D3748" stroke-width="2" opacity="0.3"/>
        <!-- Rising sun -->
        <circle cx="100" cy="140" r="35" fill="${accentColor}" opacity="0.9"/>
        <!-- Sun rays -->
        ${Array.from({ length: 16 }, (_, i) => {
          const angle = (i * 22.5 - 90) * Math.PI / 180;
          const x1 = 100 + Math.cos(angle) * 40;
          const y1 = 140 + Math.sin(angle) * 40;
          const x2 = 100 + Math.cos(angle) * 60;
          const y2 = 140 + Math.sin(angle) * 60;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${accentColor}" stroke-width="2" opacity="0.6" stroke-linecap="round"/>`;
        }).join("")}
        <!-- Birds -->
        <path d="M 60,70 Q 65,65 70,70" stroke="#333" stroke-width="2" fill="none"/>
        <path d="M 130,80 Q 135,75 140,80" stroke="#333" stroke-width="2" fill="none"/>
      </svg>`;
      
    case "Grateful":
      // Hands holding/praying or giving
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gratefulGlow">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:0.3" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="#FFF8E7"/>
        <circle cx="100" cy="100" r="80" fill="url(#gratefulGlow)"/>
        <!-- Praying/grateful hands -->
        <path d="M 85,80 L 85,130 Q 85,140 90,145 L 95,150" 
          stroke="${accentColor}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M 115,80 L 115,130 Q 115,140 110,145 L 105,150" 
          stroke="${accentColor}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Light rays from hands -->
        ${Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 30 - 60) * Math.PI / 180;
          const x1 = 100;
          const y1 = 80;
          const x2 = 100 + Math.sin(angle) * 40;
          const y2 = 80 - Math.cos(angle) * 40;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${accentColor}" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>`;
        }).join("")}
      </svg>`;
      
    default:
      // Generic peaceful scene
      return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="${primaryColor}" opacity="0.3"/>
        <circle cx="100" cy="100" r="60" fill="${secondaryColor}" opacity="0.5"/>
        <circle cx="100" cy="100" r="40" fill="${accentColor}" opacity="0.4"/>
      </svg>`;
  }
}

export function generateMoodSVG(userInput: string): string {
  const matchedMood = findBestMoodMatch(userInput);
  
  const moodStyles: Record<string, MoodStyle> = {
    Happy: { color: "#FFD700", primaryColor: "#FFD700", secondaryColor: "#FFA500", accentColor: "#FF8C00" },
    Sad: { color: "#4A5568", primaryColor: "#4A5568", secondaryColor: "#2D3748", accentColor: "#718096" },
    Excited: { color: "#FF1493", primaryColor: "#FF1493", secondaryColor: "#FF69B4", accentColor: "#FFD700" },
    Calm: { color: "#87CEEB", primaryColor: "#87CEEB", secondaryColor: "#4682B4", accentColor: "#F0F8FF" },
    Angry: { color: "#DC143C", primaryColor: "#8B0000", secondaryColor: "#DC143C", accentColor: "#FFD700" },
    Tired: { color: "#696969", primaryColor: "#C0C0C0", secondaryColor: "#696969", accentColor: "#D3D3D3" },
    Anxious: { color: "#FFD700", primaryColor: "#FFD700", secondaryColor: "#FFA500", accentColor: "#FF4500" },
    Lonely: { color: "#4B0082", primaryColor: "#4B0082", secondaryColor: "#483D8B", accentColor: "#6A5ACD" },
    Loved: { color: "#FF69B4", primaryColor: "#FF1493", secondaryColor: "#FFB6C1", accentColor: "#FF69B4" },
    Confident: { color: "#4169E1", primaryColor: "#4169E1", secondaryColor: "#1E90FF", accentColor: "#00BFFF" },
    Motivated: { color: "#32CD32", primaryColor: "#00FF00", secondaryColor: "#32CD32", accentColor: "#ADFF2F" },
    Bored: { color: "#A9A9A9", primaryColor: "#A9A9A9", secondaryColor: "#808080", accentColor: "#696969" },
    Nostalgic: { color: "#DAA520", primaryColor: "#DAA520", secondaryColor: "#B8860B", accentColor: "#CD853F" },
    Hopeful: { color: "#87CEEB", primaryColor: "#FFD700", secondaryColor: "#FFA500", accentColor: "#FF8C00" },
    Grateful: { color: "#FF8C00", primaryColor: "#FFA500", secondaryColor: "#FFD700", accentColor: "#FF8C00" },
  };

  const style = moodStyles[matchedMood] || {
    color: "#C6EEFF",
    primaryColor: "#C6EEFF",
    secondaryColor: "#87CEEB",
    accentColor: "#4682B4"
  };

  return generateMoodIllustration(matchedMood, style);
}