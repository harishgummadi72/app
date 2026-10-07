import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/design/DesignCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  Check,
  ChevronDown,
  Layers
} from 'lucide-react';
import { DesignCategory } from '../types';

export const DiscoverPage: React.FC = () => {
  const { designs, selectedCategory, setSelectedCategory } = useApp();

  // Search & Filter State
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'All');
  const [activeOccasion, setActiveOccasion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('trending');
  const [onlyCustomizable, setOnlyCustomizable] = useState(false);
  const [onlyCommission, setOnlyCommission] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = [
    'All',
    'Bridal',
    'Traditional & Ethnic',
    'Western Haute Couture',
    'Avant-Garde & Experimental',
    'Evening Gowns',
    'Saree & Lehenga',
    'Streetwear Luxe',
    'Contemporary Minimal',
    "Men's Couture",
  ];

  const occasions = [
    'All',
    'Red Carpet & Gala',
    'Bridal & Reception',
    'Editorial & Runway',
    'Cocktail & Evening',
    'High Festive',
  ];

  // Live Filter & Search Logic
  const filteredDesigns = useMemo(() => {
    return designs.filter((item) => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      // Occasion filter
      if (activeOccasion !== 'All' && item.occasion !== activeOccasion) {
        return false;
      }

      // Feature toggles
      if (onlyCustomizable && !item.isCustomizable) return false;
      if (onlyCommission && !item.isAvailableForCommission) return false;
      if (onlyFeatured && !item.isFeatured) return false;

      // Text Search query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesigner = item.designerName.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchFabric = item.fabric.toLowerCase().includes(q);
        const matchStyle = item.style.toLowerCase().includes(q);
        const matchLocation = item.designerLocation.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchTitle && !matchDesigner && !matchDesc && !matchFabric && !matchStyle && !matchLocation && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') return b.viewsCount - a.viewsCount;
      if (sortBy === 'most_saved') return b.savesCount - a.savesCount;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      return 0;
    });
  }, [designs, activeCategory, activeOccasion, onlyCustomizable, onlyCommission, onlyFeatured, query, sortBy]);

  return (
    <div className="space-y-10 pb-28 font-sans text-[#111111]">
      {/* Top Editorial Hero */}
      <section className="bg-[#EFECE6] border-b border-[#DDD6C8] py-14 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#8E735B]">
            DISCOVERY & ARCHIVAL EXPLORATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#111111]">
            Find something you’ve never seen before.
          </h1>
          <p className="text-zinc-600 text-sm md:text-base font-light max-w-xl mx-auto">
            Search hundreds of artisanal silhouettes by master atelier, fabric weave, architectural cut, or bespoke commission readiness.
          </p>

          {/* Animated Search Bar */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full border border-[#DDD6C8] shadow-md focus-within:ring-2 focus-within:ring-[#111111] transition-all px-4 py-2.5">
              <Search className="w-5 h-5 text-zinc-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by gown title, designer, mulberry silk, zardozi, Paris..."
                className="w-full bg-transparent text-sm focus:outline-none placeholder-zinc-400 text-zinc-900"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-black mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`p-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  isFilterDrawerOpen || onlyCustomizable || onlyCommission || onlyFeatured
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#EFECE6] text-zinc-700 hover:bg-[#E5DFD3]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedCategory(cat === 'All' ? null : cat);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#EFECE6] text-zinc-700 hover:bg-[#E5DFD3] border border-[#DDD6C8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Drawer / Accordion */}
        {isFilterDrawerOpen && (
          <div className="bg-[#EFECE6] p-6 rounded-2xl border border-[#DDD6C8] space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD6C8]">
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-600 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8E735B]" />
                <span>Refine Archival Search</span>
              </span>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                  setActiveOccasion('All');
                  setOnlyCustomizable(false);
                  setOnlyCommission(false);
                  setOnlyFeatured(false);
                  setSortBy('trending');
                }}
                className="text-xs text-zinc-500 hover:text-black underline"
              >
                Reset All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              {/* Occasion */}
              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider text-zinc-500 block">Occasion</label>
                <select
                  value={activeOccasion}
                  onChange={(e) => setActiveOccasion(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-xl border border-[#DDD6C8] focus:outline-none"
                >
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider text-zinc-500 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-xl border border-[#DDD6C8] focus:outline-none"
                >
                  <option value="trending">Most Trending</option>
                  <option value="most_saved">Most Saved to Moodboards</option>
                  <option value="newest">Recently Archived</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

              {/* Checkbox Options */}
              <div className="sm:col-span-2 space-y-2">
                <label className="font-bold uppercase tracking-wider text-zinc-500 block">Atelier Terms</label>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyCustomizable}
                      onChange={(e) => setOnlyCustomizable(e.target.checked)}
                      className="rounded accent-black"
                    />
                    <span>Made-To-Measure Customizable</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyCommission}
                      onChange={(e) => setOnlyCommission(e.target.checked)}
                      className="rounded accent-black"
                    />
                    <span>Commissions Open</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyFeatured}
                      onChange={(e) => setOnlyFeatured(e.target.checked)}
                      className="rounded accent-black"
                    />
                    <span>Curator Featured Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-[#DDD6C8]">
          <div>
            Showing <strong className="text-black">{filteredDesigns.length}</strong> creations in the archive
            {activeCategory !== 'All' && <span> under <strong className="text-black">{activeCategory}</strong></span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Ordered by:</span>
            <span className="capitalize font-semibold text-black">{sortBy.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Asymmetric Pinterest / Behance Style Editorial Masonry */}
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design, index) => {
              // Create dynamic rhythm across columns
              let aspect: string = 'aspect-[3/4]';
              if (index % 5 === 0) aspect = 'aspect-[3/4.6]'; // tall
              else if (index % 5 === 2) aspect = 'aspect-square'; // square
              else if (index % 5 === 4) aspect = 'aspect-[16/11]'; // wide

              return (
                <DesignCard
                  key={design.id}
                  design={design}
                  aspectClass={aspect}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#EFECE6] border border-[#DDD6C8] flex items-center justify-center mx-auto text-zinc-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-medium">No matching couture designs</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              We couldn't find designs matching your search parameters. Try adjusting the category or clearing the search keywords.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
                setActiveOccasion('All');
                setOnlyCustomizable(false);
                setOnlyCommission(false);
                setOnlyFeatured(false);
              }}
              className="bg-[#111111] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
