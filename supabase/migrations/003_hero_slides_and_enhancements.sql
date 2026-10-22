-- Migration 003: Hero Slides, Healthy Living Articles, and Clinic Settings Enhancements
-- Shri Krishna Physiotherapy Clinic

-- 1. Add logo and additional settings to clinic_settings
ALTER TABLE clinic_settings 
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS logo_alt TEXT,
ADD COLUMN IF NOT EXISTS hero_autoplay_interval INTEGER DEFAULT 6500,
ADD COLUMN IF NOT EXISTS social_facebook TEXT,
ADD COLUMN IF NOT EXISTS social_instagram TEXT,
ADD COLUMN IF NOT EXISTS social_youtube TEXT,
ADD COLUMN IF NOT EXISTS footer_note TEXT;

-- 2. Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  heading TEXT NOT NULL,
  description TEXT NOT NULL,
  badge_label TEXT,
  cta_text TEXT NOT NULL DEFAULT 'Enquire via WhatsApp',
  cta_link TEXT NOT NULL DEFAULT 'whatsapp',
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enhance Testimonials Table
ALTER TABLE testimonials
ADD COLUMN IF NOT EXISTS condition_treated TEXT,
ADD COLUMN IF NOT EXISTS consent_received BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- 4. Healthy Living Articles Table
CREATE TABLE IF NOT EXISTS healthy_living_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General Wellness',
  image_url TEXT,
  alt_text TEXT,
  is_published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Row Level Security (RLS) Policies
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthy_living_articles ENABLE ROW LEVEL SECURITY;

-- Hero Slides: Public read access for active slides, admin write access
CREATE POLICY "Active hero slides are publicly viewable"
  ON hero_slides FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Only authenticated users can manage hero slides"
  ON hero_slides FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Healthy Living Articles: Public read access for published articles, admin write access
CREATE POLICY "Published healthy living articles are publicly viewable"
  ON healthy_living_articles FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Only authenticated users can manage healthy living articles"
  ON healthy_living_articles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );
