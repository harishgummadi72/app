import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/design/DesignCard';
import { CATEGORIES } from '../data/mockData';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Scissors,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Heart,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    designs,
    allUsers,
    setActiveView,
    setSelectedDesignerId,
    setSelectedCategory,
    setIsAuthModalOpen,
  } = useApp();

  const featuredDesigns = designs.filter((d) => d.isFeatured);
  const heroDesign = featuredDesigns[0] || designs[0];
  const designers = allUsers.filter((u) => u.role === 'designer');

  // Hero slideshow / statement index
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const heroSlides = [
    {
      subtitle: 'THE HAUTE COUTURE ARCHIVE',
      title: 'WEAR\nYOUR\nIMAGINATION.',
      desc: 'Discover independent designers, master dressmakers, and textile visionaries shaping what fashion becomes next.',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=90',
      label: 'Elena Rostova • Paris Atelier',
    },
    {
      subtitle: 'HERITAGE ROYAL EMBROIDERY',
      title: 'AN ARCHIVE\nOF TIMELESS\nPOETRY.',
      desc: 'Centuries of royal zardozi, handwoven tissue silks, and bespoke bridal heirlooms crafted directly for you.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=90',
      label: 'Aarav Kapoor • Royal Zardozi',
    },
    {
      subtitle: 'AVANT-GARDE & GEOMETRY',
      title: 'SILHOUETTES\nWITHOUT\nBOUNDARIES.',
      desc: 'Deconstructed origami folds, architectural titanium corsetry, and wearable kinetic sculptures.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90',
      label: 'Kenji Takahashi • Tokyo Lab',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="space-y-24 md:space-y-36 pb-24 font-sans text-[#111111] overflow-hidden">
      {/* =========================================================================
          SECTION 1: CINEMATIC FULL-SCREEN HERO
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#111111] text-[#F8F6F0] overflow-hidden">
        {/* Background Editorial Crossfade */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeHeroSlide === idx ? 'opacity-55 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-[#111111]/60" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-20 w-full flex flex-col justify-between min-h-[85vh]">
          {/* Top subtle badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase text-[#C5A880] border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{heroSlides[activeHeroSlide].subtitle}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-mono tracking-widest">
              <span>0{activeHeroSlide + 1}</span>
              <span className="w-8 h-[1px] bg-zinc-600"></span>
              <span>0{heroSlides.length}</span>
            </div>
          </div>

          {/* Centerpiece Typography: "WEAR YOUR IMAGINATION." */}
          <div className="my-auto max-w-4xl space-y-6 pt-12 pb-8">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[-0.03em] leading-[0.92] text-white uppercase whitespace-pre-line drop-shadow-sm">
              {heroSlides[activeHeroSlide].title}
            </h1>

            <p className="text-zinc-300 text-sm md:text-lg max-w-xl leading-relaxed font-light drop-shadow">
              {heroSlides[activeHeroSlide].desc}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveView('discover')}
                className="group bg-[#F8F6F0] text-[#111111] hover:bg-[#C5A880] px-8 py-4 rounded-full text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-3 transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Designs</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActiveView('studio')}
                className="bg-black/50 hover:bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full text-xs uppercase tracking-[0.18em] font-medium flex items-center gap-2.5 backdrop-blur-md transition-all duration-300"
              >
                <Scissors className="w-4 h-4 text-[#C5A880]" />
                <span>Showcase Your Work</span>
              </button>
            </div>
          </div>

          {/* Bottom Slide Pointers & Atelier Credit */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHeroSlide(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeHeroSlide === i ? 'w-10 bg-[#C5A880]' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                  title={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="text-[11px] text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
              <span>{heroSlides[activeHeroSlide].label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MANIFESTO & THE DUAL ECOSYSTEM
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8E735B]">
              THE CENTRAL IDEA
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05] tracking-tight">
              Where ideas become designs.
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed font-light">
              We replace mass-produced uniformity with singular couture mastery. Atelier Véra is an open stage where visionary designers chronicle their craftsmanship, and discerning patrons commission one-of-a-kind wearable art.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-6 border-t border-[#DDD6C8]">
              <div>
                <span className="font-serif text-3xl font-bold text-black">100%</span>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Independent Couturiers</p>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-black">Direct</span>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Patron-To-Atelier Access</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Persona Card 1: Designers */}
            <div className="bg-[#EFECE6] p-8 rounded-2xl border border-[#E3DDD2] space-y-4 hover:border-black transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C5A880] flex items-center justify-center">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium">For Designers & Creators</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Build a cinema-grade portfolio. Showcase technical sketches, draping narratives, and embroidery steps. Receive direct commission briefs without middleman dilution.
              </p>
              <button
                onClick={() => setActiveView('studio')}
                className="text-xs uppercase tracking-wider font-semibold text-black hover:text-[#8E735B] flex items-center gap-1.5 pt-2"
              >
                <span>Enter Creative Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Persona Card 2: Explorers */}
            <div className="bg-[#EFECE6] p-8 rounded-2xl border border-[#E3DDD2] space-y-4 hover:border-black transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#C5A880] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium">For Explorers & Patrons</h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Discover silhouettes you have never seen before. Save bespoke bridal moodboards, explore global artisan techniques, and commission garments tailored exactly to your body.
              </p>
              <button
                onClick={() => setActiveView('discover')}
                className="text-xs uppercase tracking-wider font-semibold text-black hover:text-[#8E735B] flex items-center gap-1.5 pt-2"
              >
                <span>Explore the Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CURATED EDITORIAL DROP / FEATURED PIECE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#111111] text-[#F8F6F0] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Half */}
            <div className="lg:col-span-7 relative min-h-[500px] lg:min-h-[640px] overflow-hidden group">
              <img
                src={heroDesign.coverImage}
                alt={heroDesign.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[#111111]/80 backdrop-blur-md text-[#C5A880] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 font-medium">
                {heroDesign.featuredBadge || "Editor's Masterpiece"}
              </div>
            </div>

            {/* Editorial Narrative Half */}
            <div className="lg:col-span-5 p-8 md:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                  CURATED DROP OF THE WEEK
                </span>
                <h3 className="font-serif text-3xl md:text-5xl font-light leading-tight text-white">
                  {heroDesign.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {heroDesign.description}
                </p>

                <div className="pt-4 grid grid-cols-2 gap-4 text-xs border-t border-zinc-800 text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Silhouette</span>
                    <span>{heroDesign.style}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Atelier Origin</span>
                    <span>{heroDesign.designerLocation}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Fabric</span>
                    <span>{heroDesign.fabric.split('&')[0]}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Price</span>
                    <span className="text-[#C5A880] font-semibold">
                      {heroDesign.price ? `$${heroDesign.price.toLocaleString()}` : 'Bespoke'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={heroDesign.designerAvatar}
                    alt={heroDesign.designerName}
                    className="w-10 h-10 rounded-full object-cover border border-[#C5A880]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">{heroDesign.designerName}</div>
                    <div className="text-[10px] text-zinc-400">{heroDesign.designerUsername}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('discover')}
                  className="bg-[#F8F6F0] text-black hover:bg-[#C5A880] px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Examine Piece
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXPLORE CATEGORIES (VISUAL TILES)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8E735B]">
              THE DIRECTORY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
              Explore Couture Disciplines
            </h2>
          </div>
          <button
            onClick={() => setActiveView('categories')}
            className="text-xs uppercase tracking-wider font-semibold text-black hover:text-[#8E735B] flex items-center gap-1.5"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setActiveView('discover');
              }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-[#DDD6C8] shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-semibold">
                  DISCIPLINE
                </span>
                <h4 className="font-serif text-xl font-medium mt-1 group-hover:text-[#C5A880] transition-colors leading-tight">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-zinc-300 line-clamp-2 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity font-light">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: RISING DESIGNERS (HORIZONTAL PROFILES)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8E735B]">
              THE ATELIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
              Resident Visionaries
            </h2>
          </div>
          <button
            onClick={() => setActiveView('designers')}
            className="text-xs uppercase tracking-wider font-semibold text-black hover:text-[#8E735B] flex items-center gap-1.5"
          >
            <span>All Designers Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designers.slice(0, 3).map((designer) => {
            const designerCreations = designs.filter((d) => d.designerId === designer.id);
            return (
              <div
                key={designer.id}
                onClick={() => {
                  setSelectedDesignerId(designer.id);
                  setActiveView('designer-profile');
                }}
                className="group bg-[#EFECE6] rounded-2xl p-6 border border-[#DDD6C8] hover:border-black transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Avatar & Meta */}
                  <div className="flex items-center gap-4">
                    <img
                      src={designer.avatar}
                      alt={designer.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880] shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="font-serif text-xl font-medium leading-snug group-hover:text-[#8E735B] transition-colors">
                        {designer.name}
                      </h3>
                      <p className="text-xs text-zinc-500">{designer.location}</p>
                      <p className="text-[10px] text-[#8E735B] font-semibold mt-0.5">
                        {designer.experience}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-zinc-700 line-clamp-3 leading-relaxed font-light">
                    {designer.bio}
                  </p>

                  {/* Specialties Pills */}
                  {designer.specialties && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {designer.specialties.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="text-[9px] bg-white text-zinc-800 px-2 py-0.5 rounded-full border border-[#DDD6C8]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recent works thumbnail preview strip */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {designerCreations.slice(0, 3).map((item) => (
                      <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-black/10">
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom stats & view profile */}
                <div className="mt-6 pt-4 border-t border-[#DDD6C8] flex items-center justify-between text-xs text-zinc-500">
                  <span>{designer.stats.creationsCount} Creations archived</span>
                  <span className="font-semibold text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Examine Atelier</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TRENDING DESIGNS (EDITORIAL MASONRY GALLERY)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8E735B]">
              THE ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
              Trending Singular Creations
            </h2>
          </div>
          <button
            onClick={() => setActiveView('discover')}
            className="text-xs uppercase tracking-wider font-semibold text-black hover:text-[#8E735B] flex items-center gap-1.5"
          >
            <span>Explore Entire Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.slice(0, 6).map((design, index) => (
            <DesignCard
              key={design.id}
              design={design}
              aspectClass={index % 3 === 0 ? 'aspect-[3/4.5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]'}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DESIGNER CALL TO ACTION ("SHOW THE WORLD")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-[#181614] text-white p-8 md:p-16 border border-zinc-800">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-bold">
              ATELIER PORTFOLIOS & COMMISSIONS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
              Show the world what you can create.
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
              Do not let your couture creations languish in private albums. Upload your gowns, embroidery motifs, and experimental drape studies to the global archive. Receive direct client inquiries, manage commission budgets, and build your legacy.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveView('studio')}
                className="bg-[#C5A880] text-black hover:bg-white px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-lg"
              >
                Launch Your Atelier Studio
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-transparent border border-white/30 hover:border-white text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all"
              >
                Apply for Resident Accreditation
              </button>
            </div>
          </div>

          {/* Decorative background couture silhouette */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
              alt="Couture"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL CINEMATIC CTA
          ========================================================================= */}
      <section className="text-center max-w-4xl mx-auto px-6 py-12 space-y-6">
        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8E735B]">
          THE NEXT CHAPTER
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
          Your next favorite designer is waiting.
        </h2>
        <p className="text-zinc-600 text-sm md:text-base font-light max-w-xl mx-auto">
          Immerse yourself in hundreds of singular couture creations, architectural veils, and handcrafted textiles.
        </p>
        <div className="pt-4">
          <button
            onClick={() => {
              setActiveView('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#111111] hover:bg-[#2A2723] text-white px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-2xl hover:scale-105"
          >
            Start Exploring The Archive
          </button>
        </div>
      </section>
    </div>
  );
};
