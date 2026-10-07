-- ====================================================================
-- ATELIER VÉRA — SUPABASE POSTGRESQL ARCHITECTURE & RLS SCHEMA
-- ====================================================================
-- Production schema supporting role-based access, luxury portfolios,
-- editorial masonry drops, inquiries messaging, and collections.
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('designer', 'explorer', 'admin');
CREATE TYPE design_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE inquiry_type AS ENUM ('purchase', 'custom_version', 'similar_design', 'collaboration', 'general');
CREATE TYPE inquiry_status AS ENUM ('pending', 'in_discussion', 'accepted', 'declined', 'completed');

-- 3. PROFILES TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(ON DELETE CASCADE),
    role user_role NOT NULL DEFAULT 'explorer',
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    cover_image_url TEXT,
    location TEXT,
    bio TEXT,
    fashion_interests TEXT[],
    preferred_categories TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DESIGNER PROFILES (Detailed studio credentials)
CREATE TABLE IF NOT EXISTS public.designer_profiles (
    designer_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialties TEXT[] DEFAULT '{}',
    experience_years TEXT,
    atelier_address TEXT,
    instagram_handle TEXT,
    website_url TEXT,
    behance_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    total_views BIGINT DEFAULT 0,
    total_saves BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DESIGNS TABLE
CREATE TABLE IF NOT EXISTS public.designs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    designer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    style TEXT,
    fabric TEXT,
    colors TEXT[] DEFAULT '{}',
    occasion TEXT,
    price NUMERIC(10, 2),
    is_customizable BOOLEAN DEFAULT TRUE,
    is_available_for_purchase BOOLEAN DEFAULT TRUE,
    is_available_for_commission BOOLEAN DEFAULT TRUE,
    estimated_production_time TEXT,
    inspiration TEXT,
    designer_notes TEXT,
    cover_image TEXT NOT NULL,
    aspect_ratio TEXT DEFAULT 'portrait',
    status design_status DEFAULT 'published',
    views_count BIGINT DEFAULT 0,
    saves_count BIGINT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    featured_badge TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. DESIGN IMAGES TABLE (Multi-image gallery)
CREATE TABLE IF NOT EXISTS public.design_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    design_id UUID NOT NULL REFERENCES public.designs(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TAGS & DESIGN_TAGS
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.design_tags (
    design_id UUID REFERENCES public.designs(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (design_id, tag_id)
);

-- 9. FAVORITES / SAVES
CREATE TABLE IF NOT EXISTS public.favorites (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    design_id UUID REFERENCES public.designs(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, design_id)
);

-- 10. COLLECTIONS / MOODBOARDS
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.collection_items (
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    design_id UUID REFERENCES public.designs(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (collection_id, design_id)
);

-- 11. FOLLOWS
CREATE TABLE IF NOT EXISTS public.follows (
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    designer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, designer_id)
);

-- 12. INQUIRIES & MESSAGING
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    design_id UUID REFERENCES public.designs(id) ON DELETE SET NULL,
    designer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type inquiry_type NOT NULL DEFAULT 'general',
    message TEXT NOT NULL,
    budget TEXT,
    preferred_date TEXT,
    location TEXT,
    status inquiry_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inquiry_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. PLATFORM ANALYTICS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    design_id UUID REFERENCES public.designs(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, self write
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Designs: Published designs viewable by all, designers manage their own
CREATE POLICY "Published designs viewable by everyone" ON public.designs FOR SELECT USING (status = 'published' OR auth.uid() = designer_id);
CREATE POLICY "Designers can insert own designs" ON public.designs FOR INSERT WITH CHECK (auth.uid() = designer_id);
CREATE POLICY "Designers can update own designs" ON public.designs FOR UPDATE USING (auth.uid() = designer_id);
CREATE POLICY "Designers can delete own designs" ON public.designs FOR DELETE USING (auth.uid() = designer_id);

-- Inquiries: Only customer or assigned designer can view & interact
CREATE POLICY "Inquiry participants can view" ON public.inquiries FOR SELECT USING (auth.uid() = customer_id OR auth.uid() = designer_id);
CREATE POLICY "Authenticated users can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Designers can update inquiry status" ON public.inquiries FOR UPDATE USING (auth.uid() = designer_id);
