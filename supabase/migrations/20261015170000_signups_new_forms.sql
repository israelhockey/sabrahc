-- New site forms: partners, investors, contact, try-outs, ticket alerts and Pride memberships.

-- Allow the new form types (keep the old ones so existing rows stay valid).
ALTER TABLE public.signups DROP CONSTRAINT IF EXISTS signups_source_check;
ALTER TABLE public.signups ADD CONSTRAINT signups_source_check CHECK (
  source IN (
    'founders', 'fans', 'newsletter',
    'pride', 'partner', 'investor', 'contact', 'tryout', 'tickets'
  )
);

-- Extra contact fields; anything form-specific goes into `details`.
ALTER TABLE public.signups ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.signups ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.signups ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.signups ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.signups ADD COLUMN IF NOT EXISTS details JSONB;

-- One email per list for mailing lists only; messages and applications can repeat.
DROP INDEX IF EXISTS public.idx_signups_email_source;
CREATE UNIQUE INDEX IF NOT EXISTS idx_signups_email_source_lists
  ON public.signups (email, source)
  WHERE source IN ('founders', 'fans', 'newsletter', 'pride', 'tickets');

-- Basic size limits to keep spam out.
ALTER TABLE public.signups DROP CONSTRAINT IF EXISTS signups_lengths_check;
ALTER TABLE public.signups ADD CONSTRAINT signups_lengths_check CHECK (
  char_length(email) <= 320
  AND (name IS NULL OR char_length(name) <= 200)
  AND (message IS NULL OR char_length(message) <= 5000)
);
