-- ================================================================
-- Kent 11+ Trainer - Migration v2: Data Foundation
-- ================================================================
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Safe to run multiple times (all statements are idempotent).
-- ================================================================

-- 0. Users table (must exist before FK references)
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  avatar_emoji text NOT NULL DEFAULT '🧑‍🎓',
  is_test boolean NOT NULL DEFAULT false,
  daily_goal_questions integer NOT NULL DEFAULT 20,
  daily_goal_minutes integer NOT NULL DEFAULT 15
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Allow anonymous read on users') THEN
    CREATE POLICY "Allow anonymous read on users" ON users FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Allow anonymous insert on users') THEN
    CREATE POLICY "Allow anonymous insert on users" ON users FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Allow anonymous update on users') THEN
    CREATE POLICY "Allow anonymous update on users" ON users FOR UPDATE USING (true);
  END IF;
END $$;

-- Add user_id FK to practice_sessions if missing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'practice_sessions' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE practice_sessions ADD COLUMN user_id uuid REFERENCES users(id);
  END IF;
END $$;

-- Seed default users (skips existing names due to UNIQUE constraint)
INSERT INTO users (name, avatar_emoji, is_test) VALUES
  ('TEST', '🧪', true),
  ('Ella', '🦄', false),
  ('Ari', '🚀', false)
ON CONFLICT (name) DO NOTHING;

-- 1. Question answers table (individual Q+A tracking)
CREATE TABLE IF NOT EXISTS question_answers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES practice_sessions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  mode text NOT NULL,
  topic text,
  difficulty real NOT NULL DEFAULT 3.0,
  stem text NOT NULL,
  options jsonb NOT NULL,
  correct_index smallint NOT NULL,
  selected_index smallint,
  is_correct boolean NOT NULL DEFAULT false,
  explanation text,
  time_taken_ms integer,
  review_count smallint NOT NULL DEFAULT 0,
  next_review_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qa_user ON question_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_qa_session ON question_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_qa_user_mode ON question_answers(user_id, mode);
CREATE INDEX IF NOT EXISTS idx_qa_incorrect ON question_answers(user_id, is_correct) WHERE is_correct = false;
CREATE INDEX IF NOT EXISTS idx_qa_review_due ON question_answers(user_id, next_review_at) WHERE next_review_at IS NOT NULL;

-- 2. User skill levels table (per-topic granular difficulty)
CREATE TABLE IF NOT EXISTS user_skill_levels (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  mode text NOT NULL,
  topic text NOT NULL,
  skill_level real NOT NULL DEFAULT 3.0,
  total_attempts integer NOT NULL DEFAULT 0,
  correct_attempts integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, mode, topic)
);

CREATE INDEX IF NOT EXISTS idx_skill_user ON user_skill_levels(user_id);

-- 3. Add new columns to practice_sessions
ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS is_baseline boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_mock_test boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS topic text;

-- 4. RLS policies for question_answers
ALTER TABLE question_answers ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'question_answers' AND policyname = 'Allow anonymous read on question_answers') THEN
    CREATE POLICY "Allow anonymous read on question_answers" ON question_answers FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'question_answers' AND policyname = 'Allow anonymous insert on question_answers') THEN
    CREATE POLICY "Allow anonymous insert on question_answers" ON question_answers FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'question_answers' AND policyname = 'Allow anonymous update on question_answers') THEN
    CREATE POLICY "Allow anonymous update on question_answers" ON question_answers FOR UPDATE USING (true);
  END IF;
END $$;

-- 5. RLS policies for user_skill_levels
ALTER TABLE user_skill_levels ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_skill_levels' AND policyname = 'Allow anonymous read on user_skill_levels') THEN
    CREATE POLICY "Allow anonymous read on user_skill_levels" ON user_skill_levels FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_skill_levels' AND policyname = 'Allow anonymous insert on user_skill_levels') THEN
    CREATE POLICY "Allow anonymous insert on user_skill_levels" ON user_skill_levels FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_skill_levels' AND policyname = 'Allow anonymous update on user_skill_levels') THEN
    CREATE POLICY "Allow anonymous update on user_skill_levels" ON user_skill_levels FOR UPDATE USING (true);
  END IF;
END $$;

-- ================================================================
-- Done! All tables, indexes, policies, and seed data created.
-- ================================================================
