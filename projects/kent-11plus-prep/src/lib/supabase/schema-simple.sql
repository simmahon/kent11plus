/* ================================================================== */
/*  Kent 11+ Prep -- Simplified Schema (no auth required)             */
/*  Run this in Supabase SQL Editor: https://supabase.com/dashboard   */
/* ================================================================== */

-- Single table tracks every completed practice session.
-- Dashboard stats, streaks, and charts are all derived from this.

CREATE TABLE IF NOT EXISTS practice_sessions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mode                TEXT NOT NULL,
    score               INT NOT NULL CHECK (score >= 0),
    total               INT NOT NULL CHECK (total > 0),
    time_taken_seconds  INT,
    difficulty          INT NOT NULL DEFAULT 4 CHECK (difficulty >= 1 AND difficulty <= 5),
    completed_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_completed_at ON practice_sessions (completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_mode ON practice_sessions (mode);

-- Allow anonymous reads and inserts (family app, no login needed)
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read"
    ON practice_sessions FOR SELECT
    USING (true);

CREATE POLICY "Allow anonymous insert"
    ON practice_sessions FOR INSERT
    WITH CHECK (true);
