import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { setSelectedCategory, setActiveView, designs } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12 pb-28 font-sans text-[#111111]">
      <div className="max-w-2xl space-y-3">
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#8E735B]">
          THE TAXONOMY OF STYLE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#111111]">
          Couture Disciplines
        </h1>
        <p className="text-sm text-zinc-600 font-light leading-relaxed">
          From architectural bridal structures to centuries-old Benarasi weaves and avant-garde kinetic fashion, explore by distinct disciplinary craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => {
          const count = designs.filter((d) => d.category === cat.name).length;
          return (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setActiveView('discover');
              }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-[#DDD6C8] shadow-md hover:shadow-2xl transition-all flex flex-col justify-end p-8"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity group-hover:from-black/95" />

              <div className="relative z-10 text-white space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  {count} {count === 1 ? 'Creation' : 'Creations'} Archived
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium leading-snug group-hover:text-[#C5A880] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Discipline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
