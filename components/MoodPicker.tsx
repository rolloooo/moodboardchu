export default function MoodPicker({ onSelectMood }: { onSelectMood: (mood: string) => void }) {
  const moods = ["Happy", "Chill", "Excited"];
  return (
    <div className="flex gap-4 mb-4">
      {moods.map((m) => (
        <button
          key={m}
          onClick={() => onSelectMood(m)}
          className="px-4 py-2 bg-blue-200 rounded"
        >
          {m}
        </button>
      ))}
    </div>
  );
}
