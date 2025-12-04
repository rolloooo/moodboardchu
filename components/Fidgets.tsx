"use client";

// 1. Matrix Toy (Visual Hover Effect)
import { useState } from "react";

export const FidgetMatrix = () => {
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

// 2. Functional Toggle Switch
interface SwitchProps {
  label: string;
  color: string;
  isOn: boolean;
  onToggle: () => void;
}

export const FidgetSwitch = ({ label, color, isOn, onToggle }: SwitchProps) => {
  const activeColor = {
    cyan: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]",
    pink: "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]",
    purple: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
  }[color];

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer group flex items-center justify-between text-[10px] font-mono hover:bg-white/5 p-2 rounded select-none transition-colors border border-transparent hover:border-white/10"
    >
      <span className="text-gray-400 group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex gap-2 items-center">
        <span
          className={`text-[8px] ${
            isOn ? "opacity-30" : "opacity-100 text-white"
          }`}
        >
          OFF
        </span>
        <div
          className={`w-8 h-4 rounded-full relative transition-all duration-300 border border-gray-600 ${
            isOn ? "bg-gray-800" : "bg-transparent"
          }`}
        >
          <div
            className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isOn ? `left-4 ${activeColor}` : `left-1 bg-gray-500`
            }`}
          />
        </div>
        <span
          className={`text-[8px] ${
            isOn ? "opacity-100 text-white" : "opacity-30"
          }`}
        >
          ON
        </span>
      </div>
    </div>
  );
};

// 3. Functional Slider
interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

export const FidgetSlider = ({ label, value, onChange }: SliderProps) => {
  return (
    <div className="flex flex-col gap-1 w-full px-2 py-1">
      <div className="flex justify-between text-[10px] text-purple-400/80 mb-1">
        <span>{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 2px;
          background: #c084fc;
          cursor: pointer;
          margin-top: -4px;
          box-shadow: 0 0 10px rgba(192, 132, 252, 0.5);
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #333;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};