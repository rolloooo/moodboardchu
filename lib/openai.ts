// src/lib/openai.ts
export async function generateQuote(mood: string): Promise<string> {
  return `Your day will be magical! ✨ (${mood})`;
}
export async function getImage(mood: string): Promise<string> {
  return "https://source.unsplash.com/400x200/?pastel,anime";
}
