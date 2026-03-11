"use client";

import { useId } from "react";
import type {
  CubeNetQuestion,
  CubeView,
  CubeSymbol,
  NetLayout,
  CubeFaces,
} from "@/lib/cube-net-generator";
import { OPTION_LABELS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Symbol renderer (draws a symbol inside a given area)               */
/* ------------------------------------------------------------------ */

function SymbolSVG({
  symbol,
  cx,
  cy,
  size,
  color = "#e0e0e0",
}: {
  symbol: CubeSymbol;
  cx: number;
  cy: number;
  size: number;
  color?: string;
}) {
  const r = size * 0.35;

  switch (symbol) {
    case "circle":
      return (
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={color}
          stroke="none"
        />
      );
    case "triangle":
      return (
        <polygon
          points={`${cx},${cy - r} ${cx + r * 0.87},${cy + r * 0.5} ${cx - r * 0.87},${cy + r * 0.5}`}
          fill={color}
          stroke="none"
        />
      );
    case "star": {
      const outer = r;
      const inner = r * 0.4;
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (Math.PI * i) / 5;
        const rad = i % 2 === 0 ? outer : inner;
        return `${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} fill={color} stroke="none" />;
    }
    case "cross":
      return (
        <path
          d={`M${cx - r * 0.3},${cy - r} H${cx + r * 0.3} V${cy - r * 0.3} H${cx + r} V${cy + r * 0.3} H${cx + r * 0.3} V${cy + r} H${cx - r * 0.3} V${cy + r * 0.3} H${cx - r} V${cy - r * 0.3} H${cx - r * 0.3} Z`}
          fill={color}
          stroke="none"
        />
      );
    case "heart": {
      const s = r * 0.8;
      return (
        <path
          d={`M${cx},${cy + s * 0.8} C${cx - s * 1.5},${cy - s * 0.2} ${cx - s * 0.8},${cy - s * 1.2} ${cx},${cy - s * 0.4} C${cx + s * 0.8},${cy - s * 1.2} ${cx + s * 1.5},${cy - s * 0.2} ${cx},${cy + s * 0.8}Z`}
          fill={color}
          stroke="none"
        />
      );
    }
    case "diamond":
      return (
        <polygon
          points={`${cx},${cy - r} ${cx + r * 0.6},${cy} ${cx},${cy + r} ${cx - r * 0.6},${cy}`}
          fill={color}
          stroke="none"
        />
      );
    case "dots":
      return (
        <g>
          <circle cx={cx - r * 0.4} cy={cy - r * 0.4} r={r * 0.2} fill={color} />
          <circle cx={cx + r * 0.4} cy={cy - r * 0.4} r={r * 0.2} fill={color} />
          <circle cx={cx} cy={cy + r * 0.3} r={r * 0.2} fill={color} />
        </g>
      );
    case "stripes":
      return (
        <g>
          <line
            x1={cx - r * 0.7}
            y1={cy - r * 0.5}
            x2={cx + r * 0.7}
            y2={cy - r * 0.5}
            stroke={color}
            strokeWidth={r * 0.15}
          />
          <line
            x1={cx - r * 0.7}
            y1={cy}
            x2={cx + r * 0.7}
            y2={cy}
            stroke={color}
            strokeWidth={r * 0.15}
          />
          <line
            x1={cx - r * 0.7}
            y1={cy + r * 0.5}
            x2={cx + r * 0.7}
            y2={cy + r * 0.5}
            stroke={color}
            strokeWidth={r * 0.15}
          />
        </g>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Face colours (each symbol gets a distinct accent colour)           */
/* ------------------------------------------------------------------ */

const SYMBOL_COLORS: Record<CubeSymbol, string> = {
  circle: "oklch(0.78 0.18 195)",    // cyan
  triangle: "oklch(0.75 0.2 340)",   // pink
  star: "oklch(0.8 0.18 85)",        // amber
  cross: "oklch(0.8 0.2 145)",       // green
  heart: "oklch(0.7 0.2 15)",        // red
  diamond: "oklch(0.72 0.2 300)",    // purple
  dots: "oklch(0.75 0.15 230)",      // blue
  stripes: "oklch(0.7 0.12 60)",     // orange
};

/* ------------------------------------------------------------------ */
/*  Flat net renderer                                                  */
/* ------------------------------------------------------------------ */

function FlatNet({
  faces,
  layout,
  size = 220,
}: {
  faces: CubeFaces;
  layout: NetLayout;
  size?: number;
}) {
  const cellSize = size / Math.max(layout.gridRows, layout.gridCols);
  const svgW = layout.gridCols * cellSize;
  const svgH = layout.gridRows * cellSize;
  const pad = 2;

  const faceKeys = Object.keys(layout.positions) as (keyof CubeFaces)[];

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      aria-label="Cube net - flat unfolded shape"
    >
      {faceKeys.map((face) => {
        const [row, col] = layout.positions[face];
        const x = col * cellSize + pad;
        const y = row * cellSize + pad;
        const s = cellSize - pad * 2;
        const cx = x + s / 2;
        const cy = y + s / 2;
        const symbol = faces[face];

        return (
          <g key={face}>
            <rect
              x={x}
              y={y}
              width={s}
              height={s}
              fill="oklch(0.15 0.015 270)"
              stroke="oklch(0.35 0.03 270)"
              strokeWidth={1.5}
              rx={3}
            />
            <SymbolSVG
              symbol={symbol}
              cx={cx}
              cy={cy}
              size={s}
              color={SYMBOL_COLORS[symbol]}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Isometric cube renderer                                            */
/* ------------------------------------------------------------------ */

function IsometricCube({
  view,
  size = 80,
}: {
  view: CubeView;
  size?: number;
}) {
  const uid = useId().replace(/:/g, "_");
  const s = size * 0.42;
  const cx = size / 2;
  const cy = size / 2;

  const dx = s * 0.866; // cos(30°)
  const dy = s * 0.5;   // sin(30°)

  // Vertices of the isometric hex
  const top = { x: cx, y: cy - s };
  const topRight = { x: cx + dx, y: cy - dy };
  const topLeft = { x: cx - dx, y: cy - dy };
  const center = { x: cx, y: cy };
  const bottomRight = { x: cx + dx, y: cy + dy };
  const bottomLeft = { x: cx - dx, y: cy + dy };
  const bottom = { x: cx, y: cy + s };

  const poly = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(" ");

  // Face centroids (for placing symbols)
  const topCenter = {
    x: (top.x + topRight.x + center.x + topLeft.x) / 4,
    y: (top.y + topRight.y + center.y + topLeft.y) / 4,
  };
  const leftCenter = {
    x: (center.x + topLeft.x + bottomLeft.x + bottom.x) / 4,
    y: (center.y + topLeft.y + bottomLeft.y + bottom.y) / 4,
  };
  const rightCenter = {
    x: (center.x + topRight.x + bottomRight.x + bottom.x) / 4,
    y: (center.y + topRight.y + bottomRight.y + bottom.y) / 4,
  };

  const symbolSize = s * 0.7;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle lighting gradients */}
        <linearGradient id={`top_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.22 0.015 270)" />
          <stop offset="100%" stopColor="oklch(0.18 0.015 270)" />
        </linearGradient>
        <linearGradient id={`left_${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.14 0.015 270)" />
          <stop offset="100%" stopColor="oklch(0.16 0.015 270)" />
        </linearGradient>
        <linearGradient id={`right_${uid}`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.12 0.015 270)" />
          <stop offset="100%" stopColor="oklch(0.15 0.015 270)" />
        </linearGradient>
      </defs>

      {/* Top face */}
      <polygon
        points={poly([top, topRight, center, topLeft])}
        fill={`url(#top_${uid})`}
        stroke="oklch(0.35 0.03 270)"
        strokeWidth={1}
      />
      {/* Left face */}
      <polygon
        points={poly([topLeft, center, bottom, bottomLeft])}
        fill={`url(#left_${uid})`}
        stroke="oklch(0.35 0.03 270)"
        strokeWidth={1}
      />
      {/* Right face */}
      <polygon
        points={poly([center, topRight, bottomRight, bottom])}
        fill={`url(#right_${uid})`}
        stroke="oklch(0.35 0.03 270)"
        strokeWidth={1}
      />

      {/* Symbols on each face */}
      <SymbolSVG
        symbol={view.top}
        cx={topCenter.x}
        cy={topCenter.y}
        size={symbolSize}
        color={SYMBOL_COLORS[view.top]}
      />
      <SymbolSVG
        symbol={view.frontLeft}
        cx={leftCenter.x}
        cy={leftCenter.y}
        size={symbolSize}
        color={SYMBOL_COLORS[view.frontLeft]}
      />
      <SymbolSVG
        symbol={view.frontRight}
        cx={rightCenter.x}
        cy={rightCenter.y}
        size={symbolSize}
        color={SYMBOL_COLORS[view.frontRight]}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Full question display                                              */
/* ------------------------------------------------------------------ */

interface Props {
  question: CubeNetQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

export function CubeNetQuestionDisplay({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="flex flex-col gap-6">
      {/* Prompt */}
      <p className="text-center text-lg font-medium leading-relaxed sm:text-xl">
        Which cube can be made from this net?
      </p>

      {/* ---- Flat net ---- */}
      <div className="flex justify-center">
        <div className="rounded-xl border border-border/60 bg-muted/10 p-4">
          <FlatNet faces={question.faces} layout={question.layout} />
        </div>
      </div>

      {/* ---- Cube options ---- */}
      <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
        {question.options.map((view, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrectOption = idx === question.correctIndex;

          let ring =
            "border-border/60 bg-surface hover:bg-surface-hover hover:border-border/80";
          if (hasAnswered) {
            if (isSelected && isCorrectOption) {
              ring = "border-neon-green/60 bg-neon-green/10 glow-green";
            } else if (isSelected && !isCorrectOption) {
              ring = "border-neon-amber/60 bg-neon-amber/10 glow-amber";
            } else if (isCorrectOption) {
              ring = "border-neon-green/40 bg-neon-green/5";
            } else {
              ring = "border-border/40 bg-surface opacity-50";
            }
          }

          return (
            <button
              key={idx}
              disabled={hasAnswered}
              onClick={() => onSelectAnswer(idx)}
              className={[
                "flex flex-col items-center gap-1 rounded-lg border p-2 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:cursor-default",
                ring,
              ].join(" ")}
            >
              <span
                className={[
                  "font-mono text-xs font-bold",
                  hasAnswered && isSelected && isCorrectOption
                    ? "text-neon-green"
                    : hasAnswered && isSelected && !isCorrectOption
                      ? "text-neon-amber"
                      : "text-muted-foreground",
                ].join(" ")}
              >
                {OPTION_LABELS[idx]}
              </span>
              <IsometricCube view={view} size={80} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
