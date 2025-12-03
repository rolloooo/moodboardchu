import { useState } from "react";
import { motion } from "framer-motion";

interface MoodPickerProps {
  onSelectMood: (mood: string) => void;
}

const moods = [
  { emoji: "🌸", label: "Happy" },
  { emoji: "🌙", label: "Dreamy" },
  { emoji: "✨", label: "Excited" },
  { emoji: "☁️", label: "Calm" },
  { emoji: "💖", label: "Loved" },
];

export default function MoodPicker({ onSelectMood }: MoodPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex justify-center gap-4 mt-8">
      {moods.map((mood) => (
        <motion.button
          key={mood.label}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setSelected(mood.label);
            onSelectMood(mood.label);
          }}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 border-pastelPink bg-pastelPink/30 text-2xl font-anime transition-colors ${
            selected === mood.label ? "bg-pastelPink/60" : ""
          }`}
        >
          <span>{mood.emoji}</span>
          <span className="text-sm mt-1">{mood.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
