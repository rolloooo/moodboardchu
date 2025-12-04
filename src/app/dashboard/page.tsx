"use client";

import { useState, useEffect } from "react";
import MoodPicker from "../../../components/MoodPicker";
import MoodCard from "../../../components/MoodCard";
import { playMoodSound } from "../../../lib/audioGenerator";
import { FidgetSlider, FidgetSwitch } from "../../../components/Fidgets";

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


// --- MAIN DASHBOARD ---

interface DashboardProps {
  onGlitch?: () => void;
}

const MOOD_FACES: Record<string, string> = {
  Happy: "😊",
  Sad: "😢",
  Excited: "🤩",
  Calm: "😌",
  Angry: "😠",
  Tired: "😴",
  Anxious: "😰",
  Lonely: "😔",
  Loved: "🥰",
  Confident: "😎",
  Motivated: "💪",
  Bored: "😐",
  Nostalgic: "🥹",
  Hopeful: "✨",
  Grateful: "🙏",
  Melancholic: "😞",
  Transcendent: "🌀",
  Chaotic: "🤯",
  Peaceful: "🌿",
  Ecstatic: "😆",
  Surreal: "🤯",
  Nostalgic_Pain: "💔",
  Digital_Zen: "☯️",
  Fragmented: "🧩",
  Euphoric: "🥳",
};

const moodGradients: Record<string, string> = {
  Happy: "rgba(251,191,36,1), rgba(253,186,116,1), rgba(244,114,182,1)",
  Sad: "rgba(59,130,246,1), rgba(129,140,248,1), rgba(168,85,247,1)",
  Excited: "rgba(244,114,182,1), rgba(239,68,68,1), rgba(250,204,21,1)",
  Calm: "rgba(34,211,238,1), rgba(96,165,250,1), rgba(74,222,128,1)",
  Angry: "rgba(220,38,38,1), rgba(234,88,12,1), rgba(249,115,22,1)",
  Tired: "rgba(156,163,175,1), rgba(107,114,128,1), rgba(75,85,99,1)",
  Anxious: "rgba(168,85,247,1), rgba(236,72,153,1), rgba(99,102,241,1)",
  Loved: "rgba(244,114,182,1), rgba(236,72,153,1), rgba(220,38,38,1)",
  Motivated: "rgba(74,222,128,1), rgba(163,230,53,1), rgba(250,204,21,1)",
  Default: "rgba(244,114,182,1), rgba(59,130,246,1), rgba(6,182,212,1)",
};

// --- NEW DATA MAP FOR KANJI AND DESCRIPTION ---
const MOOD_KANJI_MAP: Record<string, { kanji: string; description: string }> = {
  Happy: { kanji: "幸福", description: "soft light through digital rain" },
  Sad: { kanji: "悲しみ", description: "echoes in the empty frame" },
  Excited: { kanji: "興奮", description: "sparks along the synapse wire" },
  Calm: { kanji: "平静", description: "still circuits hum" },
  Angry: { kanji: "怒り", description: "surging static" },
  Tired: { kanji: "疲れた", description: "sleep mode engaged" },
  Anxious: { kanji: "不安", description: "system overloading" },
  Lonely: { kanji: "孤独", description: "distant signal drift" },
  Loved: { kanji: "愛", description: "warm data flow" },
  Confident: { kanji: "自信", description: "stable core command" },
  Motivated: { kanji: "やる気", description: "thrust engaging" },
  Bored: { kanji: "退屈", description: "idle loop" },
  Nostalgic: { kanji: "懐かしい", description: "ghost memory playback" },
  Hopeful: { kanji: "希望", description: "future vector projected" },
  Grateful: { kanji: "感謝", description: "resource allocation successful" },
  Melancholic: { kanji: "憂鬱", description: "faded color palette" },
  Transcendent: { kanji: "超越", description: "beyond the firewall" },
  Chaotic: { kanji: "混沌", description: "data scatter storm" },
  Peaceful: { kanji: "平和", description: "silent running mode" },
  Ecstatic: { kanji: "有頂天", description: "maximum energy burst" },
  Surreal: { kanji: "超現実的", description: "unstable reality warp" },
  Nostalgic_Pain: { kanji: "痛み", description: "corrupted memory sector" },
  Digital_Zen: { kanji: "禅", description: "pure binary stillness" },
  Fragmented: { kanji: "断片", description: "broken data stream" },
  Euphoric: { kanji: "陶酔", description: "uplink achieved" },
  Default: { kanji: "信号", description: "signal received" },
};
// --- END NEW DATA MAP ---

export default function Dashboard({ onGlitch }: DashboardProps) {
  const [mood, setMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [kanji, setKanji] = useState<string>(""); // NEW STATE for Kanji
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState("✓");

  const [env, setEnv] = useState({
    crtFilter: false,
    invertColors: false,
    breathing: false,
    glassBlur: 8,
    noiseOpacity: 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(
        Math.random() > 0.7 ? "…" : Math.random() > 0.5 ? "⟳" : "✓"
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // --- UPDATED handleSelectMood ---
  const handleSelectMood = async (selectedMood: string) => {
    setLoading(true);
    onGlitch?.();
    playMoodSound(selectedMood);

    // Get the structured data
    const data = MOOD_KANJI_MAP[selectedMood] || MOOD_KANJI_MAP.Default;

    // Set the separated values
    setKanji(data.kanji);
    setQuote(data.description); // quote is now only the description

    setHistory((prev) => [...prev, selectedMood].slice(-10));

    setTimeout(() => {
      setMood(selectedMood);
      setImage("");
      setLoading(false);
    }, 600);
  };
  // --- END UPDATED handleSelectMood ---

  return (
    <div
      className={`h-screen w-full bg-black relative overflow-hidden transition-all duration-500 ${
        env.invertColors ? "fx-invert" : ""
      }`}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .sc-green::-webkit-scrollbar-thumb {
          background: #14532d;
        }
        .sc-pink::-webkit-scrollbar-thumb {
          background: #831843;
        }
        .sc-purple::-webkit-scrollbar-thumb {
          background: #581c87;
        }

        .fx-invert {
          filter: invert(1) hue-rotate(180deg);
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.02);
            filter: brightness(1.2);
          }
        }
        .fx-breathing {
          animation: breathe 6s ease-in-out infinite;
        }

        @keyframes scan {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
        .fx-crt {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.4)
          );
          background-size: 100% 4px;
          animation: scan 0.3s linear infinite;
          pointer-events: none;
          z-index: 9999;
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 6s ease infinite;
        }
      `}</style>

      {/* FX Layers */}
      <div
        className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay"
        style={{
          opacity: env.noiseOpacity / 100,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {env.crtFilter && (
        <div className="absolute inset-0 fx-crt z-50 opacity-30" />
      )}

      {/* Main Layout */}
      <div
        className={`relative z-10 flex flex-col md:flex-row gap-4 p-4 md:p-6 h-full ${
          env.breathing ? "fx-breathing" : ""
        }`}
      >
        {/* Left Panel */}
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
              <div className="text-green-400 text-xs mb-2">◆ RECENT LOGS</div>
              {history.length === 0 ? (
                <div className="text-green-400/50 text-xs italic">
                  waiting...
                </div>
              ) : (
                <div className="space-y-1 flex flex-col-reverse">
                  {history.map((m, i) => (
                    <div
                      key={i}
                      className="text-green-400/60 text-xs border-l-2 border-green-900 pl-2"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="h-10"></div>
          </div>
        </div>

        {/* Center Panel */}
        <div className="flex-[2] flex flex-col gap-4 h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto sc-pink space-y-4 pb-10">
            <div
              className="border-2 border-pink-500 bg-black/80 p-6 relative shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300"
              style={{ backdropFilter: `blur(${env.glassBlur}px)` }}
            >
              <div className="text-center mb-4">
                <h1
                  className={`text-2xl md:text-4xl font-bold text-transparent bg-clip-text tracking-tight`}
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${
                      moodGradients[mood || "Default"]
                    })`,
                    backgroundSize: "200% 200%",
                    animation: "gradientFlow 6s ease infinite",
                  }}
                >
                  時間機械
                </h1>

                <h2 className="text-xs text-cyan-400 mt-2 tracking-[0.2em] uppercase">
                  moodboard chu~
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
                <div className="text-yellow-400 text-xs mb-2 font-bold font-mono">
                  ⟳ PROCESSING...
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-6 bg-yellow-400 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* UPDATED MOODCARD CALL */}
            {mood && !loading && (
              <div className="border-2 border-cyan-400 bg-black/80 animate-in fade-in zoom-in-95 duration-500">
                <MoodCard
                  quote={quote}
                  imageUrl={image}
                  mood={mood}
                  kanji={kanji}
                />
              </div>
            )}
            {/* END UPDATED MOODCARD CALL */}
          </div>
        </div>

        {/* Right Panel */}
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
                onToggle={() =>
                  setEnv((p) => ({ ...p, crtFilter: !p.crtFilter }))
                }
              />
              <FidgetSwitch
                label="DREAM_LOGIC"
                color="pink"
                isOn={env.invertColors}
                onToggle={() =>
                  setEnv((p) => ({ ...p, invertColors: !p.invertColors }))
                }
              />
              <FidgetSwitch
                label="BINAURAL_BEATS"
                color="purple"
                isOn={env.breathing}
                onToggle={() =>
                  setEnv((p) => ({ ...p, breathing: !p.breathing }))
                }
              />
              <div className="pt-4 space-y-4 border-t border-purple-500/10">
                <FidgetSlider
                  label="ALPHA_WAVES (BLUR)"
                  value={env.glassBlur}
                  onChange={(v) => setEnv((p) => ({ ...p, glassBlur: v }))}
                />
                <FidgetSlider
                  label="NOISE_GATE (GRAIN)"
                  value={env.noiseOpacity}
                  onChange={(v) => setEnv((p) => ({ ...p, noiseOpacity: v }))}
                />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-500/30">
              <div className="text-purple-400 text-[10px] mb-2">
                ▸ SYSTEM LOG
              </div>
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
