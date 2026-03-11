/* ------------------------------------------------------------------ */
/*  Cube Net Question Generator                                        */
/*  Generates "which cube does this net make?" questions with          */
/*  programmatic SVG-ready data structures.                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** Simple symbols drawn on each cube face. */
export type CubeSymbol =
  | "circle"
  | "triangle"
  | "star"
  | "cross"
  | "heart"
  | "diamond"
  | "dots"
  | "stripes";

const ALL_SYMBOLS: CubeSymbol[] = [
  "circle",
  "triangle",
  "star",
  "cross",
  "heart",
  "diamond",
  "dots",
  "stripes",
];

/** The 6 faces of the cube, keyed by spatial position. */
export interface CubeFaces {
  front: CubeSymbol;
  back: CubeSymbol;
  top: CubeSymbol;
  bottom: CubeSymbol;
  left: CubeSymbol;
  right: CubeSymbol;
}

/** A view of 3 visible faces in isometric projection. */
export interface CubeView {
  top: CubeSymbol;
  frontLeft: CubeSymbol;
  frontRight: CubeSymbol;
}

/** Grid position for each face in the flat net. */
export interface NetLayout {
  name: string;
  positions: Record<keyof CubeFaces, [number, number]>; // [row, col]
  gridRows: number;
  gridCols: number;
}

export interface CubeNetQuestion {
  faces: CubeFaces;
  layout: NetLayout;
  options: CubeView[];
  correctIndex: number;
  explanation: string;
  difficulty: number;
  patternType: "cube_net";
}

/* ------------------------------------------------------------------ */
/*  Net layouts                                                        */
/* ------------------------------------------------------------------ */

const NET_LAYOUTS: NetLayout[] = [
  {
    // Classic cross:
    //      [T]
    // [L] [F] [R] [Bk]
    //      [Bo]
    name: "cross",
    positions: {
      top: [0, 1],
      left: [1, 0],
      front: [1, 1],
      right: [1, 2],
      back: [1, 3],
      bottom: [2, 1],
    },
    gridRows: 3,
    gridCols: 4,
  },
  {
    // T-shape:
    // [L] [T] [R]
    //     [F]
    //     [Bo]
    //     [Bk]
    name: "t-shape",
    positions: {
      left: [0, 0],
      top: [0, 1],
      right: [0, 2],
      front: [1, 1],
      bottom: [2, 1],
      back: [3, 1],
    },
    gridRows: 4,
    gridCols: 3,
  },
  {
    // L-shape:
    // [T]
    // [F]
    // [Bo] [R]
    // [Bk] [L]
    name: "l-shape",
    positions: {
      top: [0, 0],
      front: [1, 0],
      bottom: [2, 0],
      right: [2, 1],
      back: [3, 0],
      left: [3, 1],
    },
    gridRows: 4,
    gridCols: 2,
  },
  {
    // Z-shape:
    // [T] [L]
    //     [F]
    //     [R] [Bk]
    //     [Bo]
    name: "z-shape",
    positions: {
      top: [0, 0],
      left: [0, 1],
      front: [1, 1],
      right: [2, 1],
      back: [2, 2],
      bottom: [3, 1],
    },
    gridRows: 4,
    gridCols: 3,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

/** Pick N unique symbols from the pool. */
function pickUniqueSymbols(n: number): CubeSymbol[] {
  return shuffle([...ALL_SYMBOLS]).slice(0, n);
}

/* ------------------------------------------------------------------ */
/*  Opposite face pairs                                                */
/* ------------------------------------------------------------------ */

const OPPOSITE: Record<keyof CubeFaces, keyof CubeFaces> = {
  front: "back",
  back: "front",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

/* ------------------------------------------------------------------ */
/*  Viewing angles                                                     */
/* ------------------------------------------------------------------ */

/**
 * Each viewing angle defines which 3 faces are visible.
 * The array order is [top, frontLeft, frontRight] in isometric.
 */
type ViewAngle = [keyof CubeFaces, keyof CubeFaces, keyof CubeFaces];

const VIEW_ANGLES: ViewAngle[] = [
  ["top", "front", "right"],
  ["top", "left", "front"],
  ["top", "back", "left"],
  ["top", "right", "back"],
];

function getCorrectView(faces: CubeFaces, angle: ViewAngle): CubeView {
  return {
    top: faces[angle[0]],
    frontLeft: faces[angle[1]],
    frontRight: faces[angle[2]],
  };
}

/* ------------------------------------------------------------------ */
/*  Wrong answer generators                                            */
/* ------------------------------------------------------------------ */

function viewsEqual(a: CubeView, b: CubeView): boolean {
  return (
    a.top === b.top &&
    a.frontLeft === b.frontLeft &&
    a.frontRight === b.frontRight
  );
}

/**
 * Generate a plausible wrong cube view from the correct faces.
 * Each strategy exploits a different spatial reasoning mistake.
 */
function generateWrongView(
  faces: CubeFaces,
  angle: ViewAngle,
  strategy: number,
): CubeView {
  const correct = getCorrectView(faces, angle);

  switch (strategy) {
    case 0: {
      // Show the OPPOSITE face instead of one visible face
      // (common mistake: thinking a face is visible when it's on the back)
      const faceToReplace = pick([0, 1, 2] as const);
      const replacedKey = angle[faceToReplace];
      const oppositeKey = OPPOSITE[replacedKey];
      const view = { ...correct };
      if (faceToReplace === 0) view.top = faces[oppositeKey];
      else if (faceToReplace === 1) view.frontLeft = faces[oppositeKey];
      else view.frontRight = faces[oppositeKey];
      return view;
    }
    case 1: {
      // Swap two visible faces (left/right confusion)
      return {
        top: correct.top,
        frontLeft: correct.frontRight,
        frontRight: correct.frontLeft,
      };
    }
    case 2: {
      // Replace one face with a random other face from the cube
      const allFaceKeys = Object.keys(faces) as (keyof CubeFaces)[];
      const hiddenFaces = allFaceKeys.filter((k) => !angle.includes(k));
      const replacement = faces[pick(hiddenFaces)];
      const slot = pick([0, 1, 2] as const);
      const view = { ...correct };
      if (slot === 0) view.top = replacement;
      else if (slot === 1) view.frontLeft = replacement;
      else view.frontRight = replacement;
      return view;
    }
    case 3: {
      // Show a completely different viewing angle
      const otherAngles = VIEW_ANGLES.filter((a) => a !== angle);
      const otherAngle = pick(otherAngles);
      return getCorrectView(faces, otherAngle);
    }
    default: {
      // Rotate the visible faces (top→left→right→top)
      return {
        top: correct.frontRight,
        frontLeft: correct.top,
        frontRight: correct.frontLeft,
      };
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Question generator                                                 */
/* ------------------------------------------------------------------ */

function generateCubeNetQuestion(difficulty: number): CubeNetQuestion {
  // Pick 6 unique symbols for the cube faces
  const symbols = pickUniqueSymbols(6);
  const faces: CubeFaces = {
    front: symbols[0],
    back: symbols[1],
    top: symbols[2],
    bottom: symbols[3],
    left: symbols[4],
    right: symbols[5],
  };

  // Pick net layout based on difficulty
  const layoutPool =
    difficulty <= 2
      ? NET_LAYOUTS.slice(0, 1) // cross only
      : difficulty <= 3
        ? NET_LAYOUTS.slice(0, 2) // cross + T
        : NET_LAYOUTS; // all layouts
  const layout = pick(layoutPool);

  // Pick a viewing angle
  const angle = pick(VIEW_ANGLES);
  const correctView = getCorrectView(faces, angle);

  // Generate 4 unique wrong answers
  const wrongs: CubeView[] = [];
  const strategies = shuffle([0, 1, 2, 3, 4]);
  for (const strategy of strategies) {
    if (wrongs.length >= 4) break;
    const wrong = generateWrongView(faces, angle, strategy);
    if (
      !viewsEqual(wrong, correctView) &&
      !wrongs.some((w) => viewsEqual(w, wrong))
    ) {
      wrongs.push(wrong);
    }
  }

  // Fill remaining if needed (rare edge case)
  while (wrongs.length < 4) {
    const syms = pickUniqueSymbols(3);
    const filler: CubeView = {
      top: syms[0],
      frontLeft: syms[1],
      frontRight: syms[2],
    };
    if (
      !viewsEqual(filler, correctView) &&
      !wrongs.some((w) => viewsEqual(w, filler))
    ) {
      wrongs.push(filler);
    }
  }

  // Shuffle correct answer into options
  const allOptions = [...wrongs.slice(0, 4), correctView];
  const shuffled = shuffle(allOptions);
  const correctIndex = shuffled.findIndex((v) => viewsEqual(v, correctView));

  // Build explanation
  const [topFace, leftFace, rightFace] = angle;
  const explanation =
    `When you fold this net, the ${faces[topFace]} symbol ends up on top, ` +
    `the ${faces[leftFace]} symbol faces the left, and the ${faces[rightFace]} ` +
    `symbol faces the right. The ${faces[OPPOSITE[topFace]]} symbol is hidden on the bottom.`;

  return {
    faces,
    layout,
    options: shuffled,
    correctIndex,
    explanation,
    difficulty,
    patternType: "cube_net",
  };
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function generateCubeNetQuestions(
  count: number,
  difficulty: number,
): CubeNetQuestion[] {
  return Array.from({ length: count }, () =>
    generateCubeNetQuestion(difficulty),
  );
}
