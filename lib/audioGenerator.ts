/**
 * Generates and plays a retro-futuristic mood sound effect
 * Matches the mood with specific frequencies and audio patterns
 */
export function playMoodSound(mood: string): void {
  try {
    // Use Web Audio API for retro-futuristic beeps and tones
    const audioContext = new (window.AudioContext ?? window.AudioContext!)();

    // Mood-to-frequency mapping with Y2K/anime vibes
    const moodFrequencies: Record<string, { freq: number; duration: number; type: OscillatorType }> = {
      Happy: { freq: 800, duration: 0.1, type: "sine" },
      Sad: { freq: 200, duration: 0.3, type: "sine" },
      Excited: { freq: 1200, duration: 0.05, type: "square" },
      Calm: { freq: 400, duration: 0.5, type: "sine" },
      Angry: { freq: 600, duration: 0.15, type: "triangle" },
      Tired: { freq: 150, duration: 0.4, type: "sine" },
      Anxious: { freq: 900, duration: 0.08, type: "sawtooth" },
      Lonely: { freq: 300, duration: 0.6, type: "sine" },
      Loved: { freq: 500, duration: 0.2, type: "sine" },
      Confident: { freq: 700, duration: 0.12, type: "square" },
      Motivated: { freq: 1000, duration: 0.1, type: "square" },
      Bored: { freq: 250, duration: 0.8, type: "sine" },
      Nostalgic: { freq: 350, duration: 0.25, type: "triangle" },
      Hopeful: { freq: 850, duration: 0.15, type: "sine" },
      Grateful: { freq: 650, duration: 0.2, type: "sine" },
      Melancholic: { freq: 220, duration: 0.35, type: "sine" },
      Transcendent: { freq: 1100, duration: 0.2, type: "sine" },
      Chaotic: { freq: 950, duration: 0.06, type: "sawtooth" },
      Peaceful: { freq: 380, duration: 0.6, type: "sine" },
      Ecstatic: { freq: 1300, duration: 0.08, type: "square" },
      Surreal: { freq: 440, duration: 0.15, type: "triangle" },
      Nostalgic_Pain: { freq: 320, duration: 0.4, type: "sine" },
      Digital_Zen: { freq: 528, duration: 0.3, type: "sine" },
      Fragmented: { freq: 1050, duration: 0.07, type: "sawtooth" },
      Euphoric: { freq: 950, duration: 0.12, type: "sine" },
    }

    const soundConfig = moodFrequencies[mood] || moodFrequencies.Happy

    // Create oscillator for retro beep
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = soundConfig.type
    oscillator.frequency.value = soundConfig.freq

    // Exponential fade-out for retro effect
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + soundConfig.duration)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + soundConfig.duration)
  } catch (error) {
    // Silently fail if Web Audio API not available
    console.debug("Audio API unavailable, mood sound skipped")
  }
}
