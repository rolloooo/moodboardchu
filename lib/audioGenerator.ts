export const MOOD_SOUNDS = {
  Happy: { frequency: 523.25, type: "sine", duration: 0.5 },
  Chill: { frequency: 196.0, type: "sine", duration: 1.0 },
  Excited: { frequency: 659.25, type: "square", duration: 0.3 },
  Sad: { frequency: 146.83, type: "sine", duration: 1.5 },
  Angry: { frequency: 880.0, type: "square", duration: 0.2 },
  Tired: { frequency: 110.0, type: "sine", duration: 2.0 },
  Calm: { frequency: 261.63, type: "sine", duration: 1.2 },
  Energetic: { frequency: 783.99, type: "square", duration: 0.4 },
  Peaceful: { frequency: 164.81, type: "sine", duration: 1.8 },
  Anxious: { frequency: 523.25, type: "square", duration: 0.1 },
  Confident: { frequency: 329.63, type: "sine", duration: 0.6 },
  Lonely: { frequency: 130.81, type: "sine", duration: 2.0 },
  Loved: { frequency: 440.0, type: "sine", duration: 1.0 },
  Motivated: { frequency: 659.25, type: "square", duration: 0.5 },
  Bored: { frequency: 220.0, type: "sine", duration: 3.0 },
  Nostalgic: { frequency: 293.66, type: "sine", duration: 1.5 },
  Contemplative: { frequency: 196.0, type: "sine", duration: 2.0 },
  Whimsical: { frequency: 587.33, type: "sine", duration: 0.4 },
  Melancholic: { frequency: 146.83, type: "sine", duration: 2.5 },
  Inspired: { frequency: 659.25, type: "sine", duration: 0.7 },
  Hopeful: { frequency: 523.25, type: "sine", duration: 1.0 },
  Playful: { frequency: 523.25, type: "sine", duration: 0.3 },
  Grateful: { frequency: 392.0, type: "sine", duration: 1.2 },
  Adventurous: { frequency: 783.99, type: "sine", duration: 0.6 },
  Sentimental: { frequency: 349.23, type: "sine", duration: 1.5 },
  Curious: { frequency: 587.33, type: "sine", duration: 0.5 },
  Serene: { frequency: 174.61, type: "sine", duration: 2.0 },
  Daring: { frequency: 880.0, type: "sine", duration: 0.4 },
  Thoughtful: { frequency: 261.63, type: "sine", duration: 1.8 },
  Transcendent: { frequency: 528.0, type: "sine", duration: 2.0 },
  Ethereal: { frequency: 741.0, type: "sine", duration: 1.5 },
  Euphoric: { frequency: 852.0, type: "sine", duration: 1.0 },
  Luminous: { frequency: 963.0, type: "sine", duration: 1.2 },
  Celestial: { frequency: 741.0, type: "sine", duration: 2.0 },
  Blissful: { frequency: 528.0, type: "sine", duration: 1.8 },
  Enchanted: { frequency: 639.0, type: "sine", duration: 1.5 },
  Magical: { frequency: 714.0, type: "sine", duration: 1.3 },
  Cosmic: { frequency: 432.0, type: "sine", duration: 2.0 },
  Infinite: { frequency: 852.0, type: "sine", duration: 2.5 },
  Awakened: { frequency: 963.0, type: "sine", duration: 1.5 },
};

export function playMoodSound(mood: string) {
  try {
    const audioContext = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    const moodData = MOOD_SOUNDS[mood as keyof typeof MOOD_SOUNDS];

    if (!moodData) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = moodData.type as OscillatorType;
    oscillator.frequency.value = moodData.frequency;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + moodData.duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + moodData.duration);
  } catch (error) {
    console.error("Audio playback error:", error);
  }
}