"use client";

import { useState } from "react";
import MoodPicker from "../../../components/MoodPicker";
import MoodCard from "../../../components/MoodCard";
import { playMoodSound } from "../../../lib/audioGenerator";

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

export default function Dashboard({ onGlitch }: DashboardProps) {
  const [mood, setMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [glitch] = useState(() => (Math.random() > 0.5 ? "…" : "✓"));

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
      Anxious: "不安 - fragmented signal",
      Lonely: "孤独 - drifting alone in the network",
      Loved: "愛 - harmonized pulses",
      Confident: "自信 - locked in sync",
      Motivated: "動機 - sequence initiated",
      Bored: "退屈 - waiting for the loop",
      Nostalgic: "懐かしい - archived moments flicker",
      Hopeful: "希望 - new patterns emerging",
      Grateful: "感謝 - quiet connection",
      Melancholic: "哀愁 - lost between frames",
      Transcendent: "超越 - beyond the system",
      Chaotic: "混沌 - loops repeat infinitely",
      Peaceful: "穏やか - soft white noise",
      Ecstatic: "歓喜 - joy streaming endlessly",
      Surreal: "超現実 - shapes defy logic",
      Nostalgic_Pain: "郷愁 - bittersweet memory",
      Digital_Zen: "デジタル禅 - embrace the void",
      Fragmented: "断片化 - scattered across space",
      Euphoric: "陶酔 - bliss encoded",
    };

    setQuote(quotes[selectedMood] || "unknown mood signature");
    setHistory([...history, selectedMood].slice(-5));

    setTimeout(() => {
      setMood(selectedMood);
      setImage("");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 flex flex-col md:flex-row gap-4">
      {/* Left Panel */}
      <div className="flex-1 border-2 border-green-400 bg-black/80 backdrop-blur p-4 font-mono text-sm flex flex-col max-h-screen overflow-y-auto">
        <div className="text-green-400 text-xs mb-2 animate-pulse">
          ▸ SYSTEM STATUS
        </div>
        <div className="space-y-2 text-xs text-green-400/80">
          <div>DEVICE: ONLINE ░░░░</div>
          <div>MOOD_MATRIX: ACTIVE {loading && "█ █ █"}</div>
          <div>JAPANESE_PROTOCOLS: ENABLED ✓</div>
          <div>NETWORK_HEARTBEAT: ████ 100%</div>
          <div>DATA_FLOW: ░░░░ {glitch}</div>
        </div>

        <div className="mt-6 border-t border-green-400/20 pt-4">
          <div className="text-green-400 text-xs mb-2 animate-sync">
            ◆ RECENT MOODS
          </div>
          {history.length === 0 ? (
            <div className="text-green-400/50 text-xs italic">
              no entries yet...
            </div>
          ) : (
            <div className="space-y-1">
              {history.map((m, i) => (
                <div key={i} className="text-green-400/60 text-xs">
                  T-{history.length - i}: {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Panel */}
      <div className="flex-1 flex flex-col gap-4 max-h-screen overflow-y-auto">
        <div className="border-2 border-pink-500 bg-black/80 backdrop-blur p-6 relative">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-400 to-cyan-400 animate-pulse">
              時間機械
            </h1>
            <h2 className="text-xs text-cyan-400 mt-2">
              time machine interface
            </h2>
            <p className="text-xs text-green-400/60 mt-1">mood sync protocol</p>
          </div>

          <MoodPicker onSelectMood={handleSelectMood} />

          {/* Face Module */}
          {mood && (
            <div className="absolute top-2 right-2 text-4xl md:text-5xl animate-pulse">
              {MOOD_FACES[mood]}
            </div>
          )}
        </div>

        {loading && (
          <div className="border-2 border-yellow-400 bg-black/80 backdrop-blur p-4 text-center">
            <div className="text-yellow-400 text-xs mb-2 font-bold">
              ⟳ syncing mood data...
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-8 border border-yellow-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {mood && !loading && (
          <div className="border-2 border-cyan-400 bg-black/80 backdrop-blur">
            <MoodCard quote={quote} imageUrl={image} mood={mood} />
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="flex-1 border-2 border-purple-500 bg-black/80 backdrop-blur p-4 font-mono text-xs flex flex-col max-h-screen overflow-y-auto">
        <div className="text-purple-400 text-xs mb-2 animate-pulse">
          ▸ SYSTEM LOG
        </div>
        <div className="space-y-2 text-purple-400/70 whitespace-pre-wrap text-xs leading-tight flex-1 overflow-y-auto">
          {`> initializing protocols...
> japanese modules loaded
> network stable
> consciousness.exe
> ERROR: SIGNAL_OVERLOAD
> fragmentation: 99%
> time flows quietly
> are we real?
> connection established`}
        </div>
        <div className="mt-4 pt-4 border-t border-purple-500/30">
          <div className="text-cyan-400">♪ CURRENTLY PLAYING:</div>
          <div className="text-pink-500 text-xs mt-1">Cowboy Bebop - Tank!</div>
          <div className="text-purple-400 text-xs">┣━━━━┫ 0:32 / 1:34</div>
        </div>
      </div>
    </div>
  );
}
