import { motion } from "framer-motion";

interface MoodCardProps {
  quote: string;
  imageUrl: string;
  palette: string[];
}

export default function MoodCard({ quote, imageUrl, palette }: MoodCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-8 p-6 rounded-3xl shadow-lg bg-white/30 backdrop-blur-md border-2 border-pastelPink"
    >
      <img
        src={imageUrl}
        alt="Mood"
        className="w-full h-48 object-cover rounded-2xl mb-4"
      />
      <p className="text-center font-anime text-lg text-pastelBlue mb-4">{quote}</p>
      <div className="flex justify-center gap-2">
        {palette.map((color, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: color }}
            className="w-8 h-8 rounded-full border-2 border-white/40"
          />
        ))}
      </div>
    </motion.div>
  );
}
