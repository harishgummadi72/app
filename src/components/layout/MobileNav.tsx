import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Heart, Sparkles, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    savedDesignIds,
    setSelectedDesignerId,
  } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8F6F0]/90 backdrop-blur-xl border-t border-[#E3DDD2] px-4 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase font-sans ${
          activeView === 'home' ? 'text-black font-semibold' : 'text-zinc-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveView('discover')}
        className={`flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase font-sans ${
          activeView === 'discover' ? 'text-black font-semibold' : 'text-zinc-500'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Discover</span>
      </button>

      <button
        onClick={() => setActiveView('saved')}
        className={`relative flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase font-sans ${
          activeView === 'saved' ? 'text-black font-semibold' : 'text-zinc-500'
        }`}
      >
        <Heart className={`w-5 h-5 ${savedDesignIds.length > 0 ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
        {savedDesignIds.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {savedDesignIds.length}
          </span>
        )}
        <span>Saved</span>
      </button>

      {currentUser.role === 'designer' ? (
        <button
          onClick={() => setActiveView('studio')}
          className={`flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase font-sans ${
            activeView === 'studio' ? 'text-[#8E735B] font-bold' : 'text-zinc-500'
          }`}
        >
          <Sparkles className="w-5 h-5 text-[#8E735B]" />
          <span>Studio</span>
        </button>
      ) : (
        <button
          onClick={() => setActiveView('collections')}
          className={`flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase font-sans ${
            activeView === 'collections' ? 'text-black font-semibold' : 'text-zinc-500'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Curate</span>
        </button>
      )}

      <button
        onClick={() => {
          if (currentUser.role === 'designer') {
            setSelectedDesignerId(currentUser.id);
            setActiveView('designer-profile');
          } else {
            setActiveView('saved');
          }
        }}
        className={`flex flex-col items-center gap-1 text-[10px] tracking-wider uppercase font-sans ${
          activeView === 'designer-profile' ? 'text-black font-semibold' : 'text-zinc-500'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>
    </div>
  );
};
