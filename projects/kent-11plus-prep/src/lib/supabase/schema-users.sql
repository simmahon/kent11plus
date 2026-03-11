/* ================================================================== */
/*  Kent 11+ Prep -- Add Users                                        */
/*  Run this in Supabase SQL Editor AFTER schema-simple.sql            */
/* ================================================================== */

-- Simple users table (no auth -- just a name picker for the family)
CREATE TABLE IF NOT EXISTS users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           TEXT NOT NULL,
    avatar_emoji   TEXT NOT NULL DEFAULT '🚀',
    is_test        BOOLEAN NOT NULL DEFAULT false,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read users"
    ON users FOR SELECT USING (true);

-- Add user_id to practice_sessions
ALTER TABLE practice_sessions
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON practice_sessions (user_id);

-- Seed the three users
INSERT INTO users (name, avatar_emoji, is_test) VALUES
    ('TEST',  '🧪', true),
    ('Ella',  '⭐', false),
    ('Ari',   '🚀', false)
ON CONFLICT DO NOTHING;

-- Assign any existing sessions (from before users existed) to TEST
UPDATE practice_sessions
SET user_id = (SELECT id FROM users WHERE is_test = true LIMIT 1)
WHERE user_id IS NULL;
