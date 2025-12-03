import React, { useMemo } from "react";
import { hashStringToSeed, mulberry32 } from "../lib/seed";

type Shape = {
  type: "circle" | "rect" | "polygon" | "line";
  props: Record<string, number | string | undefined>;
};

type LetterBox = {
  char: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  text: string;
  width?: number;
  height?: number;
  fontSize?: number;
  shinyRarity?: number;
  className?: string;
  circleCount?: number; // NEW: target total number of shapes (optional)
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);
const ROUND = new Set(["o", "c", "s", "u", "q", "g", "a", "e"]);
const VERTICAL = new Set(["l", "i", "t", "j", "k", "b", "d", "h", "m", "n"]);
const ANGULAR = new Set(["v", "w", "x", "y", "z", "k", "r", "f", "p"]);

function pickPalette(rng: () => number) {
  const hue = Math.floor(rng() * 360);
  return [
    `hsl(${hue}, 78%, ${62 + Math.floor(rng() * 8)}%)`,
    `hsl(${(hue + 20) % 360}, 80%, ${54 + Math.floor(rng() * 10)}%)`,
    `hsl(${(hue + 45) % 360}, 82%, ${46 + Math.floor(rng() * 10)}%)`,
  ];
}

export default function MoodSVG({
  text,
  width = 520,
  height = 180,
  fontSize = 96,
  shinyRarity = 0.01,
  className,
  circleCount, // optional total number of shapes to render
}: Props) {
  const seed = useMemo(() => hashStringToSeed(text || ""), [text]);
  const seedHex = seed.toString(16);
  const baseRng = useMemo(() => mulberry32(seed), [seed]);
  const palette = useMemo(() => pickPalette(baseRng), [baseRng]);

  // compute letter boxes synchronously during render (useMemo) to avoid setState in effects
  const letterBoxes = useMemo<LetterBox[] | null>(() => {
    if (typeof window === "undefined") return null; // SSR: skip measurement
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const fontFamily =
      "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
    const fontWeight = 800;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    const chars = text.split("");
    const widths = chars.map((c) => {
      const m = ctx.measureText(c || " ");
      // fallback heuristics
      return m.width || fontSize * 0.6;
    });

    const totalWidth = widths.reduce((s, w) => s + w, 0);
    let startX = Math.max(8, (width - totalWidth) / 2);

    const boxes: LetterBox[] = [];
    for (let i = 0; i < chars.length; i++) {
      const w = widths[i];
      const box: LetterBox = {
        char: chars[i],
        x: startX,
        y: (height - fontSize) / 2,
        width: Math.max(4, w),
        height: fontSize,
      };
      boxes.push(box);
      startX += w;
    }
    return boxes;
  }, [text, width, height, fontSize, seedHex]);

  // generate shapes deterministically based on letterBoxes
  const { shapes, isShiny } = useMemo(() => {
    if (!letterBoxes) return { shapes: [] as Shape[], isShiny: false };
    const rng = mulberry32(seed); // fresh RNG consumed in exact same order
    const shapesAcc: Shape[] = [];

    // Determine total shapes to place
    const totalShapes =
      typeof circleCount === "number" && circleCount > 0
        ? Math.max(1, Math.floor(circleCount))
        : null; // when null, revert to per-letter randomized counts

    const letters = letterBoxes.length;
    let basePerLetter = 0;
    let leftover = 0;
    if (totalShapes !== null) {
      basePerLetter = Math.floor(totalShapes / Math.max(1, letters));
      leftover = totalShapes - basePerLetter * letters;
    }

    for (let li = 0; li < letterBoxes.length; li++) {
      const box = letterBoxes[li];
      const ch = box.char.toLowerCase();
      let motif: "soft" | "stripes" | "spikes" | "dots" = "soft";
      if (VOWELS.has(ch)) motif = "soft";
      else if (ROUND.has(ch)) motif = "soft";
      else if (VERTICAL.has(ch)) motif = "stripes";
      else if (ANGULAR.has(ch)) motif = "spikes";
      else motif = "dots";

      // decide number of shapes for this letter
      let n = 3 + Math.floor(rng() * 6); // default old behavior
      if (totalShapes !== null) {
        // deterministic distribution: base + maybe one extra depending on RNG consumption
        const extra = Math.floor(rng() * (leftover + 1)); // some randomness but deterministic
        n = Math.max(1, basePerLetter + extra);
      }

      for (let i = 0; i < n; i++) {
        const px = box.x + 4 + Math.floor(rng() * Math.max(0, box.width - 8));
        const py = box.y + 4 + Math.floor(rng() * Math.max(0, box.height - 8));
        const size = Math.max(2, Math.floor((Math.min(box.width, box.height) * (0.08 + rng() * 0.28))));
        const color = palette[Math.floor(rng() * palette.length)];
        if (motif === "soft") {
          shapesAcc.push({
            type: "circle",
            props: { cx: px, cy: py, r: size, fill: color, opacity: 0.6 + rng() * 0.35 },
          });
        } else if (motif === "stripes") {
          const wRect = size * (1 + rng() * 2);
          shapesAcc.push({
            type: "rect",
            props: {
              x: Math.max(box.x + 2, px - wRect / 2),
              y: Math.max(box.y + 2, py - size / 2),
              width: wRect,
              height: Math.max(2, Math.floor(size / 3)),
              fill: color,
              opacity: 0.55 + rng() * 0.35,
              rx: Math.floor(Math.max(0, size * 0.2)),
              transform: `rotate(${Math.floor(-30 + rng() * 60)} ${px} ${py})`,
            },
          });
        } else if (motif === "spikes") {
          const s = size;
          const pts = [
            `${px},${py - s}`,
            `${px + s * 0.7},${py + s * 0.5}`,
            `${px - s * 0.7},${py + s * 0.5}`,
          ].join(" ");
          shapesAcc.push({
            type: "polygon",
            props: { points: pts, fill: color, opacity: 0.65 + rng() * 0.3 },
          });
        } else {
          shapesAcc.push({
            type: "circle",
            props: { cx: px, cy: py, r: Math.max(1, Math.floor(size * 0.5)), fill: color, opacity: 0.6 + rng() * 0.3 },
          });
        }
      }
    }

    const shinyRoll = rng() < shinyRarity;
    return { shapes: shapesAcc, isShiny: shinyRoll };
  }, [letterBoxes, palette, seed, shinyRarity, circleCount]);

  const maskId = `mask-${seedHex}`;
  const gradId = `grad-${seedHex}`;

  // fallback (SSR or measurement missing) shows just the stroked text for readability
  if (!letterBoxes) {
    return (
      <div className={className} aria-hidden>
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Visual for ${text}`}>
          <rect width="100%" height="100%" fill="transparent" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="'Inter', system-ui, sans-serif"
            fontWeight={800}
            fontSize={fontSize}
            fill="transparent"
            stroke={palette[2] || "#000"}
            strokeWidth={2}
          >
            {text}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={className} aria-hidden>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={`Visual for ${text}`}>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={width} height={height} fill="black" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="'Inter', system-ui, sans-serif"
              fontWeight={800}
              fontSize={fontSize}
              fill="white"
            >
              {text}
            </text>
          </mask>

          <linearGradient id={gradId} x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.96)" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="transparent" />

        <g mask={`url(#${maskId})`}>
          {shapes.map((s, i) => {
            if (s.type === "circle") {
              return (
                <circle
                  key={i}
                  cx={s.props.cx}
                  cy={s.props.cy}
                  r={s.props.r}
                  fill={s.props.fill as string}
                  opacity={s.props.opacity}
                  style={{ filter: `blur(${Math.max(0.5, (s.props.r as number) * 0.18)}px)` }}
                />
              );
            }
            if (s.type === "rect") {
              return (
                <rect
                  key={i}
                  x={s.props.x}
                  y={s.props.y}
                  width={s.props.width}
                  height={s.props.height}
                  fill={s.props.fill as string}
                  opacity={s.props.opacity}
                  rx={s.props.rx}
                  transform={s.props.transform as string}
                />
              );
            }
            if (s.type === "polygon") {
              return <polygon key={i} points={s.props.points as string} fill={s.props.fill as string} opacity={s.props.opacity as number} />;
            }
            if (s.type === "line") {
              return <line key={i} {...(s.props as React.SVGProps<SVGLineElement>)} />;
            }
            return null;
          })}

          {isShiny && (
            <g pointerEvents="none" opacity={0.95}>
              <rect
                x="-40%"
                y="-10%"
                width="200%"
                height="120%"
                fill={`url(#${gradId})`}
                style={{ transform: "translateX(-60%) skewX(-12deg)", animation: "shineMove 3.8s linear infinite", mixBlendMode: "screen" }}
              />
              {[...Array(8)].map((_, i) => {
                const rng = mulberry32(seed + 100 + i);
                const xa = Math.floor(rng() * width);
                const ya = Math.floor(rng() * height);
                const size = 2 + Math.floor(rng() * 4);
                return (
                  <g key={i} transform={`translate(${xa}, ${ya})`} style={{ animation: `sparkle-${i % 4} ${1.6 + (i % 3)}s linear infinite` }}>
                    <polygon points={`0,-${size} ${size / 3},0 0,${size} -${size / 3},0`} fill="white" opacity={0.95} />
                  </g>
                );
              })}
            </g>
          )}
        </g>

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight={800}
          fontSize={fontSize}
          fill="transparent"
          stroke={palette[2] || "#000"}
          strokeWidth={2}
        >
          {text}
        </text>

        <style jsx>{`
          @keyframes shineMove {
            0% { transform: translateX(-60%) skewX(-12deg); }
            100% { transform: translateX(60%) skewX(-12deg); }
          }
          ${[0, 1, 2, 3].map(
            (k) => `
            @keyframes sparkle-${k} {
              0% { transform: scale(1) rotate(0deg); opacity: 0.5; }
              50% { transform: scale(1.6) rotate(12deg); opacity: 1; }
              100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
            }`
          ).join("\n")}
        `}</style>
      </svg>
    </div>
  );
}