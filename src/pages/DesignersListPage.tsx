import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Sparkles, MessageSquare, ArrowRight, Search, Scissors } from 'lucide-react';

export const DesignersListPage: React.FC = () => {
  const { allUsers, designs, setSelectedDesignerId, setActiveView, openInquiryModal } = useApp();
  const [designerSearch, setDesignerSearch] = useState('');

  const designers = allUsers.filter((u) => u.role === 'designer');

  const filteredDesigners = designers.filter((d) => {
    if (!designerSearch.trim()) return true;
    const q = designerSearch.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.bio.toLowerCase().includes(q) ||
      (d.specialties && d.specialties.some((s) => s.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 pb-28 font-sans text-[#111111]">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#8E735B]">
          THE ATELIER GUILD
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#111111]">
          Resident Couturiers & Creators
        </h1>
        <p className="text-sm text-zinc-600 font-light leading-relaxed">
          Connect directly with master dressmakers, embroiderers, and architectural silhouette creators across Paris, Milan, London, Mumbai, and Tokyo.
        </p>

        {/* Search */}
        <div className="pt-2">
          <div className="relative flex items-center bg-[#EFECE6] border border-[#DDD6C8] rounded-full px-4 py-2.5 max-w-md focus-within:ring-2 focus-within:ring-black">
            <Search className="w-4 h-4 text-zinc-400 mr-2" />
            <input
              type="text"
              value={designerSearch}
              onChange={(e) => setDesignerSearch(e.target.value)}
              placeholder="Search by designer name, city, or specialty..."
              className="w-full bg-transparent text-xs focus:outline-none text-zinc-900"
            />
          </div>
        </div>
      </div>

      {/* Designers Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDesigners.map((designer) => {
          const portfolio = designs.filter((d) => d.designerId === designer.id);
          return (
            <div
              key={designer.id}
              onClick={() => {
                setSelectedDesignerId(designer.id);
                setActiveView('designer-profile');
              }}
              className="group bg-[#EFECE6] rounded-2xl p-6 border border-[#DDD6C8] hover:border-black transition-all cursor-pointer flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header Profile info */}
                <div className="flex items-start gap-4">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880] shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-medium group-hover:text-[#8E735B] transition-colors leading-snug">
                      {designer.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">@{designer.username}</p>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-600 mt-1">
                      <MapPin className="w-3 h-3 text-[#8E735B]" />
                      <span>{designer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-zinc-700 leading-relaxed font-light line-clamp-3">
                  {designer.bio}
                </p>

                {/* Specialties */}
                {designer.specialties && (
                  <div className="flex flex-wrap gap-1.5">
                    {designer.specialties.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] bg-white text-zinc-700 px-2.5 py-0.5 rounded-full border border-[#DDD6C8]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {/* Portfolio Visual Strip */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {portfolio.slice(0, 3).map((item) => (
                    <div key={item.id} className="aspect-[3/4] rounded-lg overflow-hidden bg-black/10">
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="pt-4 border-t border-[#DDD6C8] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">
                  {designer.stats.creationsCount} Creations
                </span>

                <span className="font-semibold text-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Enter Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
