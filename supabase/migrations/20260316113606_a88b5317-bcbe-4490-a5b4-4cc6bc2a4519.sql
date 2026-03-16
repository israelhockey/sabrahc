-- Signups table for founding member interest and newsletter subscribers
CREATE TABLE public.signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('founders', 'fans', 'newsletter')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Prevent duplicate emails per source
CREATE UNIQUE INDEX idx_signups_email_source ON public.signups (email, source);

-- Enable RLS
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public signup forms)
CREATE POLICY "Anyone can sign up" ON public.signups
  FOR INSERT WITH CHECK (true);

-- No public reads - only accessible via service role key (admin edge function)
CREATE POLICY "No public reads" ON public.signups
  FOR SELECT USING (false);