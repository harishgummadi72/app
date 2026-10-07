import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Heart,
  Search,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ShieldAlert,
  User,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    allUsers,
    savedDesignIds,
    activeView,
    setActiveView,
    switchUser,
    setIsAuthModalOpen,
    setSelectedDesignerId,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Editorial Ribbon */}
      <div className="bg-[#111111] text-[#F8F6F0] text-[11px] tracking-[0.2em] uppercase py-1.5 px-4 text-center font-sans font-medium flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
        <span>HAUTE COUTURE ARCHIVE 2026 — CURATED BESPOKE CREATIONS</span>
        <span className="hidden md:inline text-zinc-500">•</span>
        <span className="hidden md:inline text-[#C5A880]">DIRECT ATELIER INQUIRIES & COMMISSIONS OPEN</span>
      </div>

      {/* Main Frosted Glass Navbar */}
      <nav className="glass-panel border-b border-[#E7E2D6] px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col text-left focus:outline-none"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.08em] font-semibold text-[#111111] group-hover:text-[#8E735B] transition-colors leading-none">
              ATELIER VÉRA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 font-sans mt-0.5">
              Haute Couture & Design Archive
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-[0.12em] uppercase text-[#2A2723]">
            <button
              onClick={() => setActiveView('discover')}
              className={`hover:text-[#8E735B] transition-colors pb-0.5 ${
                activeView === 'discover' ? 'text-[#111111] border-b border-[#111111] font-semibold' : ''
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveView('designers')}
              className={`hover:text-[#8E735B] transition-colors pb-0.5 ${
                activeView === 'designers' ? 'text-[#111111] border-b border-[#111111] font-semibold' : ''
              }`}
            >
              Designers
            </button>
            <button
              onClick={() => setActiveView('categories')}
              className={`hover:text-[#8E735B] transition-colors pb-0.5 ${
                activeView === 'categories' ? 'text-[#111111] border-b border-[#111111] font-semibold' : ''
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveView('collections')}
              className={`hover:text-[#8E735B] transition-colors pb-0.5 ${
                activeView === 'collections' ? 'text-[#111111] border-b border-[#111111] font-semibold' : ''
              }`}
            >
              Curation & Moodboards
            </button>
          </div>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setActiveView('discover')}
            className="p-2 text-zinc-700 hover:text-black rounded-full hover:bg-black/5 transition-colors focus:outline-none"
            title="Search Archive"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Saved Designs Heart Badge */}
          <button
            onClick={() => setActiveView('saved')}
            className="relative p-2 text-zinc-700 hover:text-black rounded-full hover:bg-black/5 transition-colors focus:outline-none"
            title="My Saved Collections"
          >
            <Heart className={`w-4 h-4 ${savedDesignIds.length > 0 ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
            {savedDesignIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#111111] text-[#F8F6F0] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                {savedDesignIds.length}
              </span>
            )}
          </button>

          {/* Role Quick Switcher Pill (Critical for Reviewing Both Sides) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="hidden sm:flex items-center gap-2 bg-[#EFECE6] hover:bg-[#E5DFD3] border border-[#DDD6C8] px-3 py-1.5 rounded-full text-xs font-sans text-zinc-800 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium truncate max-w-[110px]">{currentUser.name}</span>
              <span className="text-[10px] bg-black text-[#F8F6F0] px-1.5 py-0.2 rounded uppercase font-semibold">
                {currentUser.role}
              </span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>

            {isRoleDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-[#F8F6F0] border border-[#DDD6C8] rounded-xl shadow-2xl p-2 z-50 text-left font-sans"
                onMouseLeave={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#DDD6C8] mb-1">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Switch Active Persona</p>
                  <p className="text-xs text-zinc-600">Review platform as different roles:</p>
                </div>

                <div className="space-y-1">
                  {allUsers.slice(0, 4).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchUser(user);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                        currentUser.id === user.id ? 'bg-[#111111] text-white' : 'hover:bg-[#EFECE6] text-zinc-800'
                      }`}
                    >
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{user.name}</div>
                        <div className="text-[10px] opacity-70 capitalize">{user.role} • {user.location.split('&')[0]}</div>
                      </div>
                      {currentUser.id === user.id && (
                        <span className="text-[10px] font-bold text-[#C5A880]">Active</span>
                      )}
                    </button>
                  ))}

                  {/* Admin Persona */}
                  {allUsers.find((u) => u.role === 'admin') && (
                    <button
                      onClick={() => {
                        const admin = allUsers.find((u) => u.role === 'admin');
                        if (admin) switchUser(admin);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs hover:bg-[#EFECE6] text-zinc-800 border-t border-[#DDD6C8] mt-1 pt-2"
                    >
                      <ShieldAlert className="w-5 h-5 text-amber-700" />
                      <div className="flex-1">
                        <div className="font-medium">Editorial Admin</div>
                        <div className="text-[10px] text-zinc-500">Curate Drops & Mod Tools</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Designer Studio CTA or Explorer Join */}
          {currentUser.role === 'designer' ? (
            <button
              onClick={() => setActiveView('studio')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all duration-300 ${
                activeView === 'studio'
                  ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                  : 'bg-[#111111] text-[#F8F6F0] hover:bg-[#2A2723]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Creative Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>
          ) : currentUser.role === 'admin' ? (
            <button
              onClick={() => setActiveView('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all ${
                activeView === 'admin'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-[#111111] text-[#F8F6F0] hover:bg-zinc-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              <span>Curation Hub</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-[#111111] hover:bg-[#2A2723] text-[#F8F6F0] px-4 py-1.5 rounded-full text-xs font-sans tracking-wide uppercase transition-colors"
            >
              <span>Join as Designer</span>
            </button>
          )}

          {/* User Profile Avatar / Trigger */}
          <button
            onClick={() => {
              if (currentUser.role === 'designer') {
                setSelectedDesignerId(currentUser.id);
                setActiveView('designer-profile');
              } else {
                setActiveView('saved');
              }
            }}
            className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A880] focus:outline-none hover:ring-2 hover:ring-[#C5A880]/50 transition-all"
            title={`${currentUser.name} (${currentUser.role})`}
          >
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-[#E7E2D6] px-6 py-6 font-sans space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase">
            <button
              onClick={() => {
                setActiveView('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-black/5"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveView('discover');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-black/5"
            >
              Discover Designs
            </button>
            <button
              onClick={() => {
                setActiveView('designers');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-black/5"
            >
              Featured Designers
            </button>
            <button
              onClick={() => {
                setActiveView('categories');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-black/5"
            >
              Couture Categories
            </button>
            <button
              onClick={() => {
                setActiveView('collections');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-black/5"
            >
              Moodboards & Collections
            </button>
            <button
              onClick={() => {
                setActiveView('saved');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-black/5 text-[#8E735B] font-semibold"
            >
              Saved Archive ({savedDesignIds.length})
            </button>
          </div>

          <div className="pt-2 border-t border-black/10">
            <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Switch Role</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const elena = allUsers.find((u) => u.id === 'designer-elena');
                  if (elena) switchUser(elena);
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 bg-[#EFECE6] text-xs rounded-lg text-left"
              >
                Elena (Designer)
              </button>
              <button
                onClick={() => {
                  const clara = allUsers.find((u) => u.id === 'user-clara');
                  if (clara) switchUser(clara);
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-2 bg-[#EFECE6] text-xs rounded-lg text-left"
              >
                Clara (Explorer)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
