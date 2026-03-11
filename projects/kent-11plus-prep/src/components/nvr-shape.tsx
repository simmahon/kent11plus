"use client";

import { useId } from "react";
import type {
  ShapeConfig,
  ShapeType,
  FillType,
  SizeType,
} from "@/lib/nvr-generator";

/* -- Geometry helpers --------------------------------------------- */

function polygonPts(
  cx: number,
  cy: number,
  r: number,
  sides: number,
): string {
  return Array.from({ length: sides }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / sides;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function starPts(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points: number,
): string {
  return Array.from({ length: points * 2 }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / points;
    const r = i % 2 === 0 ? outer : inner;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

/* -- Shape primitives --------------------------------------------- */

const STROKE = "#c8c8c8";

function Shape({
  type,
  fill,
  stroke,
  sw,
}: {
  type: ShapeType;
  fill: string;
  stroke: string;
  sw: number;
}) {
  switch (type) {
    case "circle":
      return (
        <circle cx="50" cy="50" r="32" fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "square":
      return (
        <rect x="18" y="18" width="64" height="64" fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "triangle":
      return (
        <polygon points="50,14 86,82 14,82" fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "diamond":
      return (
        <polygon points="50,10 90,50 50,90 10,50" fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "pentagon":
      return (
        <polygon points={polygonPts(50, 50, 35, 5)} fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "hexagon":
      return (
        <polygon points={polygonPts(50, 50, 35, 6)} fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "star":
      return (
        <polygon points={starPts(50, 50, 38, 16, 5)} fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case "cross":
      return (
        <path
          d="M35,15 H65 V35 H85 V65 H65 V85 H35 V65 H15 V35 H35 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    case "arrow":
      return (
        <polygon
          points="50,10 80,45 62,45 62,90 38,90 38,45 20,45"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
  }
}

/* -- Fill colour mapping ------------------------------------------ */

const FILL_MAP: Record<FillType, string> = {
  filled: "#e0e0e0",
  empty: "none",
  grey: "#707070",
  hatched: "__HATCH__", // replaced dynamically
};

const SIZE_SCALE: Record<SizeType, number> = {
  small: 0.6,
  medium: 1.0,
  large: 1.3,
};

/* -- Public component --------------------------------------------- */

interface NVRShapeProps {
  config: ShapeConfig;
  size?: number;
  className?: string;
}

export function NVRShape({ config, size = 80, className = "" }: NVRShapeProps) {
  const uid = useId().replace(/:/g, "_");
  const hatchId = `h${uid}`;
  const scale = SIZE_SCALE[config.size];

  let fillColor = FILL_MAP[config.fill];
  if (config.fill === "hatched") fillColor = `url(#${hatchId})`;
  const sw = config.fill === "empty" ? 3 : 2.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {config.fill === "hatched" && (
        <defs>
          <pattern
            id={hatchId}
            width="6"
            height="6"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={STROKE} strokeWidth="1.5" />
          </pattern>
        </defs>
      )}

      <g
        transform={`translate(50,50) rotate(${config.rotation}) scale(${scale}) translate(-50,-50)`}
      >
        <Shape type={config.type} fill={fillColor} stroke={STROKE} sw={sw} />
      </g>
    </svg>
  );
}
