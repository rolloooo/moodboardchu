"use client";

import { useState, useEffect } from "react";
import MoodPicker from "../../../components/MoodPicker";
import MoodCard from "../../../components/MoodCard";
import { playMoodSound } from "../../../lib/audioGenerator";

// --- COMPONENTS ---

// 1. Matrix Toy (Visual Hover Effect)
const FidgetMatrix = () => {
  const [activeCells, setActiveCells] = useState<number[]>([]);

  const handleHover = (index: number) => {
    setActiveCells((prev) => [...prev, index]);
    setTimeout(() => {
      setActiveCells((prev) => prev.filter((i) => i !== index));
    }, 400);
  };

  return (
    <div className="grid grid-cols-8 gap-1 p-2 border border-green-500/30 bg-black/50 select-none">
      {[...Array(32)].map((_, i) => (
        <div
          key={i}
          onMouseEnter={() => handleHover(i)}
          className={`h-2 w-2 rounded-sm transition-all duration-300 ${
            activeCells.includes(i)
              ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] scale-125"
              : "bg-green-900/20"
          }`}
        />
      ))}
    </div>
  );
};

// 2. Functional Toggle Switch
interface SwitchProps {
  label: string;
  color: string;
  isOn: boolean;
  onToggle: () => void;
}

const FidgetSwitch = ({ label, color, isOn, onToggle }: SwitchProps) => {
  // Map color strings to specific tailwind classes safely
  const activeColor = {
    cyan: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]",
    pink: "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]",
    purple: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
  }[color];

  const dotColor = {
    cyan: "bg-cyan-300",
    pink: "bg-pink-300",
    purple: "bg-purple-300",
  }[color];

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer group flex items-center justify-between text-[10px] font-mono hover:bg-white/5 p-2 rounded select-none transition-colors border border-transparent hover:border-white/10"
    >
      <span className="text-gray-400 group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex gap-2 items-center">
        <span className={`text-[8px] ${isOn ? "opacity-30" : "opacity-100 text-white"}`}>OFF</span>
        
        {/* Switch Track */}
        <div className={`w-8 h-4 rounded-full relative transition-all duration-300 border border-gray-600 ${isOn ? "bg-gray-800" : "bg-transparent"}`}>
          {/* Switch Dot */}
          <div
            className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isOn 
                ? `left-4 ${activeColor}` 
                : `left-1 bg-gray-500`
            }`}
          />
        </div>
        
        <span className={`text-[8px] ${isOn ? "opacity-100 text-white" : "opacity-30"}`}>ON</span>
      </div>
    </div>
  );
};

// 3. Functional Slider
interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

const FidgetSlider = ({ label, value, onChange }: SliderProps) => {
  return (
    <div className="flex flex-col gap-1 w-full px-2 py-1">
      <div className="flex justify-between text-[10px] text-purple-400/80 mb-1">
        <span>{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <style jsx>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 2px;
          background: #c084fc;
          cursor: pointer;
          margin-top: -4px;
          box-shadow: 0 0 10px rgba(192,132,252,0.5);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #333;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

// --- MAIN DASHBOARD ---

interface DashboardProps {
  onGlitch?: () => void;
}

const MOOD_FACES: Record<string, string> = {
  Happy: "😊", Sad: "😢", Excited: "🤩", Calm: "😌", Angry: "😠",
  Tired: "😴", Anxious: "😰", Lonely: "😔", Loved: "🥰", Confident: "😎",
  Motivated: "💪", Bored: "😐", Nostalgic: "🥹", Hopeful: "✨",
  Grateful: "🙏", Melancholic: "😞", Transcendent: "🌀", Chaotic: "🤯",
  Peaceful: "🌿", Ecstatic: "😆", Surreal: "🤯", Nostalgic_Pain: "💔",
  Digital_Zen: "☯️", Fragmented: "🧩", Euphoric: "🥳",
};

export default function Dashboard({ onGlitch }: DashboardProps) {
  const [mood, setMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState("✓");

  // --- ENVIRONMENT STATE ---
  const [env, setEnv] = useState({
    crtFilter: false,      // Toggles CRT Lines
    invertColors: false,   // Toggles Negative Mode
    breathing: false,      // Toggles Pulse Animation
    glassBlur: 8,          // Slider: Blur amount
    noiseOpacity: 5,       // Slider: Noise amount
  });

  // Glitch Text Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(Math.random() > 0.7 ? "…" : Math.random() > 0.5 ? "⟳" : "✓");
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleSelectMood = async (selectedMood: string) => {
    setLoading(true);
    onGlitch?.();
    playMoodSound(selectedMood);

    const quotes: Record<string, string> = {
      Happy: "幸福 - soft light through digital rain",
      Sad: "悲しみ - echoes in the empty frame",
      Excited: "興奮 - sparks along the synapse wire",
      Calm: "平静 - still circuits hum",
      Angry: "怒り - surging static",
      Tired: "疲れた - sleep mode engaged",
      Default: "信号 - signal received"
    };

    setQuote(quotes[selectedMood] || quotes.Default);
    setHistory((prev) => [...prev, selectedMood].slice(-10));

    setTimeout(() => {
      setMood(selectedMood);
      setImage("");
      setLoading(false);
    }, 600);
  };

  // --- RENDER ---
  return (
    <div className={`h-screen w-full bg-black relative overflow-hidden transition-all duration-500 ${env.invertColors ? "fx-invert" : ""}`}>
      
      {/* --- GLOBAL CSS & ANIMATIONS --- */}
      <style jsx global>{`
        /* 1. Custom Scrollbars */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        .sc-green::-webkit-scrollbar-thumb { background: #14532d; }
        .sc-pink::-webkit-scrollbar-thumb { background: #831843; }
        .sc-purple::-webkit-scrollbar-thumb { background: #581c87; }

        /* 2. Invert Mode */
        .fx-invert {
          filter: invert(1) hue-rotate(180deg);
        }

        /* 3. Breathing Animation */
        @keyframes breathe {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.02); filter: brightness(1.2); }
        }
        .fx-breathing {
          animation: breathe 6s ease-in-out infinite;
        }

        /* 4. CRT Scanline Animation */
        @keyframes scan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .fx-crt {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
          );
          background-size: 100% 4px;
          animation: scan 0.3s linear infinite;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>

      {/* --- FX LAYERS --- */}
      
      {/* Noise Grain Layer */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay"
        style={{ 
          opacity: env.noiseOpacity / 100,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* CRT Scanlines Layer */}
      {env.crtFilter && (
        <div className="absolute inset-0 fx-crt mix-blend-multiply opacity-50" />
      )}

      {/* --- MAIN CONTENT LAYOUT --- */}
      {/* We apply the breathing animation to this wrapper so the UI pulses */}
      <div className={`relative z-10 flex flex-col md:flex-row gap-4 p-4 md:p-6 h-full ${env.breathing ? "fx-breathing" : ""}`}>

        {/* --- LEFT PANEL --- */}
        <div 
          className="flex-1 border-2 border-green-400 bg-black/80 flex flex-col overflow-hidden shadow-[0_0_15px_rgba(74,222,128,0.1)] transition-all duration-300"
          style={{ backdropFilter: `blur(${env.glassBlur}px)` }}
        >
          <div className="p-4 border-b border-green-400/20 bg-black/50">
            <div className="text-green-400 text-xs animate-pulse font-mono font-bold">
              ▸ SYSTEM STATUS
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-4 font-mono sc-green relative">
            <div className="space-y-2 text-xs text-green-400/80 mb-6">
              <div>DEVICE: ONLINE ░░░░</div>
              <div>MOOD_MATRIX: ACTIVE {loading && "█ █ █"}</div>
              <div>DATA_FLOW: ░░░░ {glitchText}</div>
            </div>
            <div className="mb-6">
              <div className="text-[10px] text-green-600 mb-2 uppercase tracking-widest">
                Tactile Matrix
              </div>
              <FidgetMatrix />
            </div>
            <div className="border-t border-green-400/20 pt-4">
              <div className="text-green-400 text-xs mb-2">
                ◆ RECENT LOGS
              </div>
              {history.length === 0 ? (
                <div className="text-green-400/50 text-xs italic">waiting...</div>
              ) : (
                <div className="space-y-1 flex flex-col-reverse">
                  {history.map((m, i) => (
                    <div key={i} className="text-green-400/60 text-xs border-l-2 border-green-900 pl-2">
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="h-10"></div>
          </div>
        </div>

        {/* --- CENTER PANEL --- */}
        <div className="flex-[2] flex flex-col gap-4 h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto sc-pink space-y-4 pb-10">
            <div 
              className="border-2 border-pink-500 bg-black/80 p-6 relative shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300"
              style={{ backdropFilter: `blur(${env.glassBlur}px)` }}
            >
              <div className="text-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-400 to-cyan-400 animate-pulse tracking-tight">
                  時間機械
                </h1>
                <h2 className="text-xs text-cyan-400 mt-2 tracking-[0.2em] uppercase">
                  time machine interface
                </h2>
              </div>
              {mood && (
                <div className="absolute top-2 right-2 text-5xl md:text-6xl animate-bounce">
                  {MOOD_FACES[mood]}
                </div>
              )}
            </div>

            <MoodPicker onSelectMood={handleSelectMood} />

            {loading && (
              <div className="border-2 border-yellow-400 bg-black/80 p-4 text-center">
                <div className="text-yellow-400 text-xs mb-2 font-bold font-mono">⟳ PROCESSING...</div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-6 bg-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            )}

            {mood && !loading && (
              <div className="border-2 border-cyan-400 bg-black/80 animate-in fade-in zoom-in-95 duration-500">
                <MoodCard quote={quote} imageUrl={image} mood={mood} />
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT PANEL (CONTROLS) --- */}
        <div 
          className="flex-1 border-2 border-purple-500 bg-black/80 flex flex-col overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300"
          style={{ backdropFilter: `blur(${env.glassBlur}px)` }}
        >
          <div className="p-4 border-b border-purple-500/20 bg-black/50">
            <div className="text-purple-400 text-xs animate-pulse font-mono font-bold">
              ▸ CONTROL DECK
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-4 font-mono sc-purple">
            <div className="space-y-4 mb-6">
              <div className="text-[10px] text-purple-400/50 uppercase border-b border-purple-500/20 pb-1">
                Visual Environment
              </div>
              
              <FidgetSwitch 
                label="REALITY_FILTER" 
                color="cyan" 
                isOn={env.crtFilter} 
                onToggle={() => setEnv(p => ({...p, crtFilter: !p.crtFilter}))}
              />
              <FidgetSwitch 
                label="DREAM_LOGIC" 
                color="pink" 
                isOn={env.invertColors} 
                onToggle={() => setEnv(p => ({...p, invertColors: !p.invertColors}))}
              />
              <FidgetSwitch 
                label="BINAURAL_BEATS" 
                color="purple" 
                isOn={env.breathing} 
                onToggle={() => setEnv(p => ({...p, breathing: !p.breathing}))}
              />

              <div className="pt-4 space-y-4 border-t border-purple-500/10">
                <FidgetSlider 
                  label="ALPHA_WAVES (BLUR)" 
                  value={env.glassBlur} 
                  onChange={(v) => setEnv(p => ({...p, glassBlur: v}))}
                />
                <FidgetSlider 
                  label="NOISE_GATE (GRAIN)" 
                  value={env.noiseOpacity} 
                  onChange={(v) => setEnv(p => ({...p, noiseOpacity: v}))}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-500/30">
              <div className="text-purple-400 text-[10px] mb-2">▸ SYSTEM LOG</div>
              <div className="space-y-1 text-purple-300/60 text-[10px] font-mono">
                {`> env variables updated
> reality: ${env.crtFilter ? "SCANNING" : "NORMAL"}
> color_mode: ${env.invertColors ? "INVERTED" : "STANDARD"}
> system stable`}
              </div>
            </div>
            <div className="h-10"></div>
          </div>
        </div>

      </div>
    </div>
  );
}