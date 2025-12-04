"use client"
import { useState } from "react"
import Dashboard from "./dashboard/page"

export default function Home() {
  const [glitch, setGlitch] = useState(false)

  const triggerGlitch = () => {
    setGlitch(true)
    setTimeout(() => setGlitch(false), 200)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* CRT Border Frame */}
      <div className="fixed inset-0 border-8 border-gray-800 pointer-events-none z-50">
        <div className="absolute top-2 left-2 text-xs text-green-400 opacity-50">▸ SONY TRINITRON CRT</div>
        <div className="absolute top-2 right-4 text-xs text-green-400 opacity-50">時間:Y2K ░ 100% ░ 60Hz</div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-200 ${glitch ? "animate-glitch" : ""}`}>
        <Dashboard onGlitch={triggerGlitch} />
      </div>

      {/* Time Glitch Artifacts */}
      <div className="fixed bottom-4 right-4 text-xs text-pink-500 opacity-40 font-mono">ERR: TEMPORAL_ANOMALY_001</div>
    </div>
  )
}
