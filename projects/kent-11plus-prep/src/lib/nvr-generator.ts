/* ------------------------------------------------------------------ */
/*  NVR (Non-Verbal Reasoning) question generator                     */
/*  Generates visual pattern-sequence questions programmatically.     */
/* ------------------------------------------------------------------ */

export const SHAPE_TYPES = [
  "circle", "square", "triangle", "diamond", "pentagon",
  "hexagon", "star", "cross", "arrow",
] as const;
export type ShapeType = (typeof SHAPE_TYPES)[number];

export const FILL_TYPES = ["filled", "empty", "grey", "hatched"] as const;
export type FillType = (typeof FILL_TYPES)[number];

export const SIZE_TYPES = ["small", "medium", "large"] as const;
export type SizeType = (typeof SIZE_TYPES)[number];

export interface ShapeConfig {
  type: ShapeType;
  fill: FillType;
  rotation: number;
  size: SizeType;
}

export interface NVRQuestion {
  sequence: ShapeConfig[];
  options: ShapeConfig[];
  correctIndex: number;
  explanation: string;
  difficulty: number;
  patternType: string;
}

/* -- Utilities ---------------------------------------------------- */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shapeEqual(a: ShapeConfig, b: ShapeConfig): boolean {
  return (
    a.type === b.type &&
    a.fill === b.fill &&
    a.rotation === b.rotation &&
    a.size === b.size
  );
}

/**
 * Rotational symmetry order for each shape.
 * A shape with symmetry N looks identical every (360/N) degrees.
 * e.g. a square has 4-fold symmetry: 0°, 90°, 180°, 270° all look the same.
 */
const SHAPE_SYMMETRY: Record<ShapeType, number> = {
  circle: 360,   // infinite symmetry -- every angle looks the same
  square: 4,     // 90° symmetry
  triangle: 3,   // 120° symmetry
  diamond: 2,    // 180° symmetry
  pentagon: 5,   // 72° symmetry
  hexagon: 6,    // 60° symmetry
  star: 5,       // 72° symmetry (5-pointed)
  cross: 4,      // 90° symmetry
  arrow: 1,      // no symmetry -- every angle is unique
};

/** Normalize rotation to canonical form accounting for visual symmetry. */
function canonicalRotation(type: ShapeType, rotation: number): number {
  const sym = SHAPE_SYMMETRY[type];
  const period = 360 / sym;
  return ((rotation % 360) + 360) % period;
}

/** Two shapes look identical on screen (accounts for rotational symmetry). */
function visuallyEqual(a: ShapeConfig, b: ShapeConfig): boolean {
  return (
    a.type === b.type &&
    a.fill === b.fill &&
    canonicalRotation(a.type, a.rotation) ===
      canonicalRotation(b.type, b.rotation) &&
    a.size === b.size
  );
}

function buildOptions(
  correct: ShapeConfig,
  wrongs: ShapeConfig[],
): { options: ShapeConfig[]; correctIndex: number } {
  const deduped: ShapeConfig[] = [];
  for (const w of wrongs) {
    if (
      !visuallyEqual(w, correct) &&
      !deduped.some((d) => visuallyEqual(d, w))
    ) {
      deduped.push(w);
    }
  }
  while (deduped.length < 4) {
    const r: ShapeConfig = {
      type: pick(SHAPE_TYPES),
      fill: pick(FILL_TYPES),
      rotation: pick([0, 45, 90, 135, 180, 225, 270, 315]),
      size: pick(SIZE_TYPES),
    };
    if (
      !visuallyEqual(r, correct) &&
      !deduped.some((d) => visuallyEqual(d, r))
    ) {
      deduped.push(r);
    }
  }

  const all = [...deduped.slice(0, 4), correct];
  const shuffled = shuffle(all);
  return {
    options: shuffled,
    correctIndex: shuffled.findIndex((s) => shapeEqual(s, correct)),
  };
}

/* -- Shapes that visually show rotation --------------------------- */
const ROTATABLE = SHAPE_TYPES.filter((s) => s !== "circle");

/**
 * Filter rotation increments to only those that produce visually distinct
 * steps for a given shape. e.g. a square rotated 90° looks identical,
 * so 90° is not a useful increment for squares.
 */
function validRotationIncrements(
  shape: ShapeType,
  candidates: number[],
): number[] {
  const period = 360 / SHAPE_SYMMETRY[shape];
  const valid = candidates.filter((inc) => inc % period !== 0);
  // If no valid increments exist (shape is too symmetric), exclude this shape
  // by returning [candidates[0]] as a safe fallback -- the buildOptions dedup
  // will ensure options are still visually distinct.
  return valid.length > 0 ? valid : [candidates[0]];
}

/* ================================================================ */
/*  Pattern generators                                              */
/* ================================================================ */

function rotationPattern(difficulty: number): NVRQuestion {
  const shape = pick(ROTATABLE);
  const fill = pick(FILL_TYPES);
  const rawIncrements =
    difficulty <= 2 ? [90, 45] : [30, 45, 60, 72, 120];
  const inc = pick(validRotationIncrements(shape, rawIncrements));
  const start = Math.floor(Math.random() * 8) * 45;

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shape,
    fill,
    rotation: (start + i * inc) % 360,
    size: "medium" as SizeType,
  }));

  const correct: ShapeConfig = {
    type: shape,
    fill,
    rotation: (start + 4 * inc) % 360,
    size: "medium",
  };

  const wrongs: ShapeConfig[] = [
    { ...correct, rotation: (correct.rotation + inc) % 360 },
    { ...correct, rotation: (correct.rotation + 180) % 360 },
    { ...correct, rotation: start % 360 },
    { ...correct, rotation: (correct.rotation - inc + 360) % 360 },
  ];

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `The ${shape} rotates by ${inc}\u00B0 each step. Following the pattern, the next shape is rotated to ${correct.rotation}\u00B0.`,
    difficulty,
    patternType: "rotation",
  };
}

function shapeCyclePattern(difficulty: number): NVRQuestion {
  const cycleLen = difficulty <= 2 ? 3 : 4;
  const shapes = shuffle([...SHAPE_TYPES]).slice(0, cycleLen);
  const fill = pick(FILL_TYPES);

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shapes[i % cycleLen],
    fill,
    rotation: 0,
    size: "medium" as SizeType,
  }));

  const correct: ShapeConfig = {
    type: shapes[4 % cycleLen],
    fill,
    rotation: 0,
    size: "medium",
  };

  const unused = SHAPE_TYPES.filter((s) => s !== correct.type);
  const wrongs: ShapeConfig[] = shuffle([...unused])
    .slice(0, 4)
    .map((s) => ({
      type: s,
      fill,
      rotation: 0,
      size: "medium" as SizeType,
    }));

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `The shapes follow a repeating cycle: ${shapes.join(" \u2192 ")}. The next shape in the cycle is a ${correct.type}.`,
    difficulty,
    patternType: "shape_cycle",
  };
}

function fillCyclePattern(difficulty: number): NVRQuestion {
  const shape = pick(SHAPE_TYPES);
  const cycleLen = difficulty <= 2 ? 3 : 4;
  const fills = shuffle([...FILL_TYPES]).slice(0, cycleLen);

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shape,
    fill: fills[i % cycleLen],
    rotation: 0,
    size: "medium" as SizeType,
  }));

  const correct: ShapeConfig = {
    type: shape,
    fill: fills[4 % cycleLen],
    rotation: 0,
    size: "medium",
  };

  const wrongFills = FILL_TYPES.filter((f) => f !== correct.fill);
  const wrongs: ShapeConfig[] = [...wrongFills, wrongFills[0]]
    .slice(0, 4)
    .map((f) => ({
      type: shape,
      fill: f,
      rotation: 0,
      size: "medium" as SizeType,
    }));

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `The shading pattern follows a cycle: ${fills.join(" \u2192 ")}. The next shape should have ${correct.fill} shading.`,
    difficulty,
    patternType: "fill_cycle",
  };
}

function sizePattern(difficulty: number): NVRQuestion {
  const shape = pick(SHAPE_TYPES);
  const fill = pick(FILL_TYPES);
  const cycle: SizeType[] = ["small", "medium", "large"];

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shape,
    fill,
    rotation: 0,
    size: cycle[i % 3],
  }));

  const correct: ShapeConfig = {
    type: shape,
    fill,
    rotation: 0,
    size: cycle[4 % 3],
  };

  const wrongSizes = SIZE_TYPES.filter((s) => s !== correct.size);
  const wrongs: ShapeConfig[] = [
    { ...correct, size: wrongSizes[0] },
    { ...correct, size: wrongSizes[1] },
    {
      ...correct,
      size: wrongSizes[0],
      fill: pick(FILL_TYPES.filter((f) => f !== fill)),
    },
    {
      ...correct,
      size: wrongSizes[1],
      type: pick(SHAPE_TYPES.filter((s) => s !== shape)),
    },
  ];

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `The size follows a repeating pattern: ${cycle.join(" \u2192 ")}. The next size should be ${correct.size}.`,
    difficulty,
    patternType: "size_change",
  };
}

function combinedPattern(difficulty: number): NVRQuestion {
  const shape = pick(ROTATABLE);
  const inc = pick(validRotationIncrements(shape, [45, 60, 90]));
  const fillCycle = shuffle([...FILL_TYPES]).slice(0, 3);
  const cycleLen = fillCycle.length;

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shape,
    fill: fillCycle[i % cycleLen],
    rotation: (i * inc) % 360,
    size: "medium" as SizeType,
  }));

  const correct: ShapeConfig = {
    type: shape,
    fill: fillCycle[4 % cycleLen],
    rotation: (4 * inc) % 360,
    size: "medium",
  };

  const wrongs: ShapeConfig[] = [
    {
      ...correct,
      fill: pick(FILL_TYPES.filter((f) => f !== correct.fill)),
    },
    { ...correct, rotation: (correct.rotation + inc) % 360 },
    {
      ...correct,
      fill: pick(FILL_TYPES.filter((f) => f !== correct.fill)),
      rotation: (correct.rotation + inc) % 360,
    },
    { ...correct, rotation: (correct.rotation + 180) % 360 },
  ];

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `Two patterns change together: the ${shape} rotates ${inc}\u00B0 each step, and the shading cycles through ${fillCycle.join(" \u2192 ")}. The correct answer has ${correct.fill} shading at ${correct.rotation}\u00B0.`,
    difficulty,
    patternType: "combined",
  };
}

function shapeAndSizePattern(difficulty: number): NVRQuestion {
  const shapes = shuffle([...SHAPE_TYPES]).slice(0, 3);
  const fill = pick(FILL_TYPES);
  const sizes: SizeType[] = ["small", "medium", "large"];

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shapes[i % 3],
    fill,
    rotation: 0,
    size: sizes[i % 3],
  }));

  const correct: ShapeConfig = {
    type: shapes[4 % 3],
    fill,
    rotation: 0,
    size: sizes[4 % 3],
  };

  const wrongs: ShapeConfig[] = [
    { ...correct, type: pick(SHAPE_TYPES.filter((s) => s !== correct.type)) },
    { ...correct, size: pick(SIZE_TYPES.filter((s) => s !== correct.size)) },
    {
      ...correct,
      type: pick(SHAPE_TYPES.filter((s) => s !== correct.type)),
      size: pick(SIZE_TYPES.filter((s) => s !== correct.size)),
    },
    { ...correct, fill: pick(FILL_TYPES.filter((f) => f !== fill)) },
  ];

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `Both the shape and size change together: ${shapes.join(" \u2192 ")} with sizes ${sizes.join(" \u2192 ")}. The next should be a ${correct.size} ${correct.type}.`,
    difficulty,
    patternType: "shape_and_size",
  };
}

function tripleChangePattern(difficulty: number): NVRQuestion {
  // Shape + fill + rotation all change -- hardest pattern type
  const shapes = shuffle([...ROTATABLE]).slice(0, 3);
  const fills = shuffle([...FILL_TYPES]).slice(0, 3);
  // Use the first shape in cycle to filter valid increments (all shapes rotate the same amount)
  const inc = pick(validRotationIncrements(shapes[0], [45, 60, 90]));

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: shapes[i % 3],
    fill: fills[i % 3],
    rotation: (i * inc) % 360,
    size: "medium" as SizeType,
  }));

  const correct: ShapeConfig = {
    type: shapes[4 % 3],
    fill: fills[4 % 3],
    rotation: (4 * inc) % 360,
    size: "medium",
  };

  // Near-miss distractors: each one gets exactly ONE property wrong
  const wrongs: ShapeConfig[] = [
    { ...correct, type: pick(SHAPE_TYPES.filter((s) => s !== correct.type)) },
    { ...correct, fill: pick(FILL_TYPES.filter((f) => f !== correct.fill)) },
    { ...correct, rotation: (correct.rotation + inc) % 360 },
    {
      ...correct,
      type: pick(SHAPE_TYPES.filter((s) => s !== correct.type)),
      fill: pick(FILL_TYPES.filter((f) => f !== correct.fill)),
    },
  ];

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `Three patterns change at once: the shape cycles ${shapes.join(" \u2192 ")}, the shading cycles ${fills.join(" \u2192 ")}, and the rotation increases by ${inc}\u00B0. The answer needs all three correct: a ${correct.fill} ${correct.type} at ${correct.rotation}\u00B0.`,
    difficulty,
    patternType: "triple_change",
  };
}

function alternatingPattern(difficulty: number): NVRQuestion {
  // Two shapes alternate, with a property changing each step
  const shapeA = pick(SHAPE_TYPES);
  const shapeB = pick(SHAPE_TYPES.filter((s) => s !== shapeA));
  const inc = pick(validRotationIncrements(shapeA, [45, 90]));

  const seq: ShapeConfig[] = Array.from({ length: 4 }, (_, i) => ({
    type: i % 2 === 0 ? shapeA : shapeB,
    fill: pick(["filled", "empty"] as const),
    rotation: (i * inc) % 360,
    size: "medium" as SizeType,
  }));
  // Fix fills to show a pattern: e.g. filled/empty alternating
  seq[0].fill = "filled";
  seq[1].fill = "empty";
  seq[2].fill = "filled";
  seq[3].fill = "empty";

  const correct: ShapeConfig = {
    type: shapeA, // index 4 is even, so shapeA
    fill: "filled",
    rotation: (4 * inc) % 360,
    size: "medium",
  };

  const wrongs: ShapeConfig[] = [
    { ...correct, type: shapeB }, // wrong shape (odd pattern)
    { ...correct, fill: "empty" }, // wrong fill
    { ...correct, rotation: (correct.rotation + inc) % 360 }, // wrong rotation
    { ...correct, type: shapeB, fill: "empty" }, // both wrong
  ];

  const { options, correctIndex } = buildOptions(correct, wrongs);
  return {
    sequence: seq,
    options,
    correctIndex,
    explanation: `The pattern alternates between ${shapeA} (filled) and ${shapeB} (empty), with rotation increasing by ${inc}\u00B0 each step. Position 5 follows the same pattern as positions 1 and 3, so it\u2019s a filled ${shapeA} at ${correct.rotation}\u00B0.`,
    difficulty,
    patternType: "alternating",
  };
}

/* ================================================================ */
/*  Main export                                                     */
/* ================================================================ */

export function generateNVRQuestions(
  count: number,
  difficulty: number,
): NVRQuestion[] {
  const generators =
    difficulty <= 2
      ? [rotationPattern, shapeCyclePattern, fillCyclePattern, sizePattern]
      : difficulty <= 3
        ? [
            rotationPattern,
            shapeCyclePattern,
            fillCyclePattern,
            combinedPattern,
            combinedPattern,
            shapeAndSizePattern,
          ]
        : [
            // Difficulty 4+: heavily weighted toward multi-property patterns
            combinedPattern,
            combinedPattern,
            shapeAndSizePattern,
            tripleChangePattern,
            tripleChangePattern,
            alternatingPattern,
          ];

  return Array.from({ length: count }, () => pick(generators)(difficulty));
}
