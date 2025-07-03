-- Create workout sessions table with all required columns
CREATE TABLE public.workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  phone_number TEXT,
  email TEXT NOT NULL,
  height TEXT,
  weight TEXT,
  workout_type TEXT NOT NULL, -- 'bicepcurls', 'squats', 'pushups', 'plank'
  experience TEXT NOT NULL, -- 'yes' or 'no'
  rep_count INTEGER DEFAULT 0,
  plank_duration DECIMAL DEFAULT 0,
  ideal_score INTEGER NOT NULL,
  actual_score DECIMAL NOT NULL,
  performance_rating TEXT NOT NULL, -- 'awesome', 'good', 'poor'
  extra INTEGER DEFAULT 0, -- extra reps/seconds beyond ideal
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily stats table for aggregated data
CREATE TABLE public.daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_date DATE NOT NULL,
  workout_type TEXT NOT NULL,
  total_participants INTEGER DEFAULT 0,
  average_score DECIMAL DEFAULT 0,
  best_score DECIMAL DEFAULT 0,
  winner_name TEXT,
  winner_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_date, workout_type)
);

-- Create email logs table
CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL, -- 'workout_completion', 'winner_notification'
  performance_rating TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID REFERENCES public.workout_sessions(id)
);

-- Enable Row Level Security
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public fitness app)
CREATE POLICY "Anyone can view workout sessions" 
ON public.workout_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert workout sessions" 
ON public.workout_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view daily stats" 
ON public.daily_stats 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert daily stats" 
ON public.daily_stats 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update daily stats" 
ON public.daily_stats 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can view email logs" 
ON public.email_logs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert email logs" 
ON public.email_logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_workout_sessions_updated_at
  BEFORE UPDATE ON public.workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_stats_updated_at
  BEFORE UPDATE ON public.daily_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to select daily winner
CREATE OR REPLACE FUNCTION public.select_daily_winner(
  workout_type_param TEXT, 
  target_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE(winner_name TEXT, winner_email TEXT, best_score DECIMAL, total_participants BIGINT) AS $$
BEGIN
  RETURN QUERY
  WITH session_stats AS (
    SELECT 
      ws.name,
      ws.email,
      ws.actual_score,
      COUNT(*) OVER() as total_count
    FROM public.workout_sessions ws
    WHERE ws.workout_type = workout_type_param 
      AND ws.session_date = target_date
    ORDER BY ws.actual_score DESC
    LIMIT 1
  )
  SELECT 
    session_stats.name::TEXT,
    session_stats.email::TEXT,
    session_stats.actual_score,
    session_stats.total_count
  FROM session_stats;
END;
$$ LANGUAGE plpgsql;

-- Create function to update daily stats
CREATE OR REPLACE FUNCTION public.update_daily_stats(
  p_workout_type TEXT,
  p_session_date DATE DEFAULT CURRENT_DATE
)
RETURNS void AS $$
DECLARE
  v_total_participants INTEGER;
  v_average_score DECIMAL;
  v_best_score DECIMAL;
  v_winner_name TEXT;
  v_winner_email TEXT;
BEGIN
  -- Calculate statistics
  SELECT 
    COUNT(*),
    AVG(actual_score),
    MAX(actual_score)
  INTO v_total_participants, v_average_score, v_best_score
  FROM public.workout_sessions
  WHERE workout_type = p_workout_type 
    AND session_date = p_session_date;

  -- Get winner details
  SELECT name, email
  INTO v_winner_name, v_winner_email
  FROM public.workout_sessions
  WHERE workout_type = p_workout_type 
    AND session_date = p_session_date
    AND actual_score = v_best_score
  LIMIT 1;

  -- Insert or update daily stats
  INSERT INTO public.daily_stats (
    session_date,
    workout_type,
    total_participants,
    average_score,
    best_score,
    winner_name,
    winner_email
  )
  VALUES (
    p_session_date,
    p_workout_type,
    v_total_participants,
    v_average_score,
    v_best_score,
    v_winner_name,
    v_winner_email
  )
  ON CONFLICT (session_date, workout_type)
  DO UPDATE SET
    total_participants = EXCLUDED.total_participants,
    average_score = EXCLUDED.average_score,
    best_score = EXCLUDED.best_score,
    winner_name = EXCLUDED.winner_name,
    winner_email = EXCLUDED.winner_email,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;