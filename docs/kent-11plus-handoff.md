# Kent 11+ Trainer — Full Handoff Document

**Date:** 2026-03-10
**Project:** Kent 11+ Prep (Grammar School entrance exam trainer)
**Location:** `projects/kent-11plus-prep/`

---

## What This Is

Interactive web app for kids preparing for the Kent Grammar School 11+ entrance exam. Covers verbal reasoning, non-verbal reasoning, maths, English, comprehension, and cube nets. Features adaptive difficulty, AI-generated questions, spaced repetition for wrong answers, and a neon arcade visual theme.

Built for a family of 3 kids (Ella, Ari, plus a TEST user for development). No authentication — users are selected from a dropdown.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| UI | React | 19.2.3 |
| Language | TypeScript (strict) | 5 |
| Styling | Tailwind CSS | 4 |
| Components | shadcn/ui (Radix) | 3.8.4 |
| Charts | Recharts | 3.7.0 |
| Validation | Zod | 4.3.6 |
| Database | Supabase (PostgreSQL) | supabase-js 2.95.3 |
| AI | Claude Haiku 4.5 | anthropic-sdk 0.74.0 |

---

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

```bash
# Anthropic — powers AI question generation
ANTHROPIC_API_KEY=sk-ant-...

# Supabase — database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

- `NEXT_PUBLIC_*` vars are exposed to the browser (client-side Supabase queries)
- `SUPABASE_SERVICE_ROLE_KEY` is server-only (used in API routes)
- `ANTHROPIC_API_KEY` is server-only (used in `/api/questions/generate`)

---

## Supabase Setup

### Connection Details

- **Project URL:** `NEXT_PUBLIC_SUPABASE_URL` — find in Supabase Dashboard > Settings > API
- **Anon Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` — same location
- **Service Role Key:** `SUPABASE_SERVICE_ROLE_KEY` — same location (keep secret)
- **Auth model:** None. Uses anon key with fully permissive RLS (SELECT/INSERT/UPDATE open to all). This is intentional — it's a family app, not a public service.

### Database Schema

Run `supabase/migration-v2.sql` in Supabase SQL Editor. It's idempotent (safe to run multiple times).

**Tables:**

#### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| name | text (UNIQUE) | Display name |
| avatar_emoji | text | Default '🧑‍🎓' |
| is_test | boolean | true for TEST user |
| daily_goal_questions | integer | Default 20 |
| daily_goal_minutes | integer | Default 15 |

Seed data: TEST (🧪), Ella (🦄), Ari (🚀)

#### `practice_sessions`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| mode | text | e.g. "verbal-reasoning" |
| score | integer | Correct answers |
| total | integer | Total questions |
| time_taken_seconds | integer | Session duration |
| difficulty | integer | 1-5 |
| user_id | uuid (FK → users) | |
| topic | text | Specific topic within mode |
| is_baseline | boolean | Baseline assessment flag |
| is_mock_test | boolean | Mock test flag |
| completed_at | timestamptz | |

#### `question_answers`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| session_id | uuid (FK → practice_sessions) | CASCADE delete |
| user_id | uuid (FK → users) | |
| mode | text | |
| topic | text | |
| difficulty | real | Float 1.0-5.0 |
| stem | text | Question text |
| options | jsonb | Array of 5 strings |
| correct_index | smallint | 0-4 |
| selected_index | smallint | What kid picked |
| is_correct | boolean | |
| explanation | text | AI-generated explanation |
| time_taken_ms | integer | Per-question timing |
| review_count | smallint | Spaced rep counter |
| next_review_at | timestamptz | Leitner intervals: 1d, 3d, 7d, 14d |
| created_at | timestamptz | |

Indexes: user_id, session_id, user_id+mode, incorrect answers, review due date.

#### `user_skill_levels`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| user_id | uuid (FK → users) | CASCADE delete |
| mode | text | |
| topic | text | |
| skill_level | real | Float 1.0-5.0 (NOT integer) |
| total_attempts | integer | |
| correct_attempts | integer | |
| updated_at | timestamptz | |

UNIQUE constraint on (user_id, mode, topic).

---

## How to Run

```bash
cd projects/kent-11plus-prep
cp .env.local.example .env.local   # Fill in real values
npm install
npm run dev                         # http://localhost:3000
```

Build check: `npm run build` (no `timeout` on macOS — just run directly).

---

## Architecture

### App Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page — mode selection grid, daily goals, stats |
| `/practice/[mode]` | Practice session — questions, timer, scoring, adaptive difficulty |
| `/baseline` | Baseline test — assess all topics to set starting skill levels |
| `/review` | Review wrong answers (spaced repetition) |
| `/dashboard` | Stats — accuracy trends, mode breakdown, weekly activity |
| `/mock-test` | 50 questions, 50 minutes, Kent scoring format |
| `/parent` | Parent dashboard — compare kids, baseline vs current, topic heatmap |
| `/offline` | PWA offline fallback |

### API Routes

**POST `/api/questions/generate`**
- Input: `{ category, topic, difficulty (1-5), count (1-10), skillLevel? }`
- Categories: `verbal_reasoning`, `non_verbal_reasoning`, `mathematics`, `english`
- Uses Claude Haiku (`claude-haiku-4-5-20251001`)
- Rate limited: 10 req/min per IP (in-memory, resets on restart)
- Returns Zod-validated JSON with 5 options per question (GL Assessment format)

**POST `/api/questions/explain`**
- Input: full question + student's wrong answer
- Returns child-friendly explanation + strategy tip
- Rate limited: 20 req/min per IP

### Question Sources

| Source | Modes | Notes |
|--------|-------|-------|
| Claude Haiku API | Verbal, Maths, English, Comprehension | 1-2s latency |
| Static question banks | English, Maths, Verbal Reasoning | Instant, in `src/lib/question-banks/` |
| Client-side generators | Non-Verbal Reasoning, Cube Nets | SVG rendering, no API needed |

### Adaptive Difficulty Engine

**File:** `src/lib/adaptive.ts`

- Skill levels are **floats from 1.0 to 5.0** (not integers)
- Correct answer: `+0.15 * speedMultiplier` (1.5x for <5s, 1.0x for >30s, linear interpolation)
- Wrong answer: `-0.2`
- `skillToDifficulty()` rounds to integer 1-5 for API prompts
- Persisted per user+mode+topic in `user_skill_levels` table

### User Context

`src/contexts/user-context.tsx` — manages user selection, persists in localStorage. No auth. Hook: `useUser()`.

---

## Key File Map

```
src/
├── app/
│   ├── api/questions/
│   │   ├── generate/route.ts    # AI question generation
│   │   └── explain/route.ts     # Wrong answer explanations
│   ├── practice/[mode]/page.tsx # Main practice flow
│   ├── baseline/page.tsx        # Baseline assessment
│   ├── review/page.tsx          # Spaced repetition review
│   ├── dashboard/page.tsx       # Stats dashboard
│   ├── mock-test/page.tsx       # Full mock test
│   ├── parent/page.tsx          # Parent comparison view
│   ├── layout.tsx               # Root layout (dark theme, fonts, providers)
│   ├── globals.css              # Tailwind v4 theme + neon arcade styles
│   └── page.tsx                 # Landing page
├── lib/
│   ├── adaptive.ts              # Adaptive difficulty engine
│   ├── types.ts                 # TypeScript types
│   ├── modes.ts                 # 7 practice mode configs
│   ├── constants.ts             # Option labels (A-E)
│   ├── rate-limit.ts            # In-memory rate limiting
│   ├── passages.ts              # Curated comprehension passages
│   ├── ai/question-schemas.ts   # Zod schemas for AI responses
│   ├── supabase/
│   │   ├── client.ts            # Supabase client init
│   │   ├── users.ts             # User queries
│   │   ├── sessions.ts          # Session save/query/streaks
│   │   ├── question-answers.ts  # Individual Q+A tracking
│   │   └── skill-levels.ts      # Adaptive skill read/write
│   ├── question-banks/          # Static question JSON
│   ├── nvr-generator.ts         # Shape sequence generator (SVG)
│   └── cube-net-generator.ts    # Cube net generator (SVG)
├── components/
│   ├── nav.tsx                  # Top navigation
│   ├── nvr-question.tsx         # NVR question renderer
│   ├── cube-net-question.tsx    # Cube net renderer
│   ├── sw-register.tsx          # PWA service worker
│   └── ui/                      # shadcn components
├── contexts/
│   └── user-context.tsx         # User selection provider
└── hooks/
    ├── use-countdown.ts         # Session timer
    └── use-preload-questions.ts # Prefetch next questions
```

---

## Styling System

- **Theme:** Always dark. Neon arcade aesthetic.
- **Color space:** oklch() (modern perceptual colors)
- **Palette:** Cyan (195°), Purple (300°), Green (145°), Amber (65°), Pink (340°)
- **Effects:** `.glow-cyan`, `.glow-green`, etc. for box-shadow glows; `.text-glow-*` for text; `.grid-bg` for grid pattern; `.scanlines` for scanline overlay
- **Fonts:** Geist Sans + Geist Mono
- **Gotcha:** Dynamic Tailwind class names don't work with JIT. Use static mapping objects (see `GLOW_HOVER_CLASS` pattern in `page.tsx`).

---

## Feature Roadmap

| Wave | Feature | Status |
|------|---------|--------|
| 1 | Core practice modes, AI questions, scoring | Done |
| 2 | User selection, per-session stats, topics | Done |
| 3 | Baseline Test (adaptive assessment, all subjects) | In progress |
| 4 | Wrong Answer Review (spaced repetition, Leitner intervals) | In progress |
| 5 | Mock Test Mode (50Q, 50min, Kent scoring) | In progress |
| 6 | Parent Dashboard (compare kids, baseline vs current, heatmap) | In progress |
| 7 | Daily Goals & Streaks v2 | Planned |
| 8 | PWA & Offline | Planned |
| 9 | Curated Passage Bank | Planned |

Pages for waves 3-6 exist in the codebase but may be incomplete.

---

## Gotchas for the Next Developer

1. **Skill levels are floats, not integers.** The adaptive engine uses granular 1.0-5.0 values. Don't truncate to int.
2. **No auth.** Supabase anon key with wide-open RLS. Don't add auth unless converting to public app.
3. **Rate limiting is in-memory.** Resets on server restart. Fine for family use, needs Redis for production.
4. **Comprehension mode** injects curated passages from `src/lib/passages.ts` into AI prompts.
5. **NVR and Cube Nets** are entirely client-side SVG — no API calls needed.
6. **TypeScript strict mode** — no `any` types allowed.
7. **Tailwind v4** — uses `@theme` inline config in `globals.css`, not `tailwind.config.js`.
8. **shadcn/ui** — component style is "new-york" with CSS variables. Components in `src/components/ui/`.
9. **Question format** — always 5 options (A-E), matching GL Assessment/Kent test format.
10. **Service worker** at `public/sw.js` for PWA support. Registration in `sw-register.tsx`.

---

## Quick Verification Checklist

After setup, confirm:

- [ ] `npm run dev` starts without errors
- [ ] Landing page shows 7 mode cards with neon glow
- [ ] User dropdown shows TEST, Ella, Ari
- [ ] Starting a practice session loads AI-generated questions
- [ ] NVR mode shows SVG shape sequences (no API call)
- [ ] Scores save to Supabase after completing a session
- [ ] Dark theme applies everywhere (no white flashes)
- [ ] `npm run build` completes without TypeScript errors
