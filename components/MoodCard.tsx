export default function MoodCard({ quote, imageUrl }: { quote: string; imageUrl: string }) {
  return (
    <div className="border p-4 rounded shadow-md w-80 text-center">
      <img src={imageUrl} alt="mood" className="w-full h-40 object-cover mb-2 rounded" />
      <p>{quote}</p>
    </div>
  );
}
