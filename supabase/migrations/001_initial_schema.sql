-- Initial Schema for TCHAK FREE Onboarding

-- Table: Artists (Core profile)
CREATE TABLE IF NOT EXISTS public.artists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    art_type TEXT,
    bio TEXT,
    signature_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Installations (Tracking app distribution)
CREATE TABLE IF NOT EXISTS public.installations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID REFERENCES public.artists(id),
    os_type TEXT,
    version TEXT,
    seed_hash TEXT,
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies (Public Onboarding)
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable public orientation" ON public.artists FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable public read for analytics" ON public.artists FOR SELECT USING (true);

ALTER TABLE public.installations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable public tracking" ON public.installations FOR INSERT WITH CHECK (true);
