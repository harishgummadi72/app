import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Sparkles, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-[#111111] text-[#F8F6F0] pt-20 pb-24 md:pb-16 border-t border-zinc-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-800">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-5">
            <h3 className="font-serif text-3xl md:text-4xl tracking-wider text-white">
              ATELIER VÉRA
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              The premier editorial archive and commission marketplace connecting independent couturiers, bespoke dressmakers, and fashion explorers shaping what clothing becomes next.
            </p>
            <div className="flex items-center gap-2 text-xs tracking-widest text-[#C5A880] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Paris • Milan • Mumbai • Tokyo • New York</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-300">
              Curation
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => setActiveView('discover')} className="hover:text-white transition-colors">
                  Discover All
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('categories')} className="hover:text-white transition-colors">
                  Couture Categories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('designers')} className="hover:text-white transition-colors">
                  Resident Ateliers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('collections')} className="hover:text-white transition-colors">
                  Curated Moodboards
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-300">
              For Designers
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => setActiveView('studio')} className="hover:text-white transition-colors">
                  Creative Studio
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Portfolio Verification</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Bespoke Inquiries Guide</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Atelier Standards</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Private Salons */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-300">
              The Private Salon
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receive private previews of newly archived bridal heirlooms and runway commissions before public release.
            </p>
            <div className="flex items-center border border-zinc-700 bg-zinc-900/60 rounded-full px-3 py-1.5 focus-within:border-[#C5A880] transition-colors">
              <Mail className="w-3.5 h-3.5 text-zinc-500 mr-2" />
              <input
                type="email"
                placeholder="salon@haute.com"
                className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none flex-1"
              />
              <button className="text-[10px] uppercase tracking-wider font-semibold bg-[#F8F6F0] text-black px-3 py-1 rounded-full hover:bg-[#C5A880] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} ATELIER VÉRA ARCHIVE. All Rights Reserved. Crafted for Haute Couture Visionaries.
          </div>
          <div className="flex gap-6 tracking-wider uppercase text-[10px]">
            <span className="hover:text-white cursor-pointer">Artisan Code of Ethics</span>
            <span className="hover:text-white cursor-pointer">Privacy & Provenance</span>
            <span className="hover:text-white cursor-pointer">Terms of Commission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
