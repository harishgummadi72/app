import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, User, Scissors, Compass, ShieldCheck } from 'lucide-react';
import { UserProfile, UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    switchUser,
    allUsers,
    addToast,
    setActiveView,
  } = useApp();

  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [role, setRole] = useState<UserRole>('designer');

  // Signup form state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [experience, setExperience] = useState('');
  const [fashionInterests, setFashionInterests] = useState('');

  if (!isAuthModalOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: UserProfile = {
      id: `user-${Date.now().toString(36)}`,
      role,
      name,
      username: username || name.toLowerCase().replace(/\s+/g, ''),
      email,
      avatar:
        role === 'designer'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      location: location || 'Paris & Global',
      bio:
        bio ||
        (role === 'designer'
          ? 'Independent haute couture creator and textile visionary.'
          : 'Collector and admirer of fine bespoke garments.'),
      specialties: specialties
        ? specialties.split(',').map((s) => s.trim())
        : ['Haute Couture', 'Bespoke Tailoring'],
      experience: experience || 'Independent Atelier',
      fashionInterests: fashionInterests
        ? fashionInterests.split(',').map((s) => s.trim())
        : ['Bridal', 'Gala', 'Avant-Garde'],
      stats: {
        followersCount: 1,
        followingCount: 1,
        creationsCount: 0,
        savesCount: 0,
        totalViews: 0,
        inquiriesReceived: 0,
      },
      createdAt: new Date().toISOString(),
    };

    switchUser(newUser);
    setIsAuthModalOpen(false);
    addToast(`Welcome to ATELIER VÉRA, ${newUser.name}!`, 'success');

    if (role === 'designer') {
      setActiveView('studio');
    } else {
      setActiveView('discover');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#F8F6F0] rounded-2xl shadow-2xl border border-[#DDD6C8] overflow-hidden text-[#111111]">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#DDD6C8] flex items-center justify-between bg-[#EFECE6]">
          <div>
            <h3 className="font-serif text-2xl font-medium tracking-wide">
              {mode === 'signup' ? 'Join Atelier Véra' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              The premier archive for couture designers and fashion explorers
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/10 text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Demo Switcher Presets */}
          <div className="p-3.5 bg-white rounded-xl border border-[#DDD6C8] space-y-2">
            <span className="text-[10px] tracking-wider uppercase font-bold text-zinc-400 block">
              Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  const elena = allUsers.find((u) => u.id === 'designer-elena');
                  if (elena) switchUser(elena);
                  setIsAuthModalOpen(false);
                  setActiveView('studio');
                }}
                className="p-2 rounded-lg bg-[#EFECE6] hover:bg-[#111111] hover:text-white text-left transition-colors text-xs"
              >
                <div className="font-bold flex items-center gap-1">
                  <Scissors className="w-3 h-3 text-[#C5A880]" />
                  <span>Elena (Designer)</span>
                </div>
                <div className="text-[10px] text-zinc-500">Paris Atelier Studio</div>
              </button>

              <button
                onClick={() => {
                  const clara = allUsers.find((u) => u.id === 'user-clara');
                  if (clara) switchUser(clara);
                  setIsAuthModalOpen(false);
                  setActiveView('discover');
                }}
                className="p-2 rounded-lg bg-[#EFECE6] hover:bg-[#111111] hover:text-white text-left transition-colors text-xs"
              >
                <div className="font-bold flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#C5A880]" />
                  <span>Clara (Explorer)</span>
                </div>
                <div className="text-[10px] text-zinc-500">Curator & Inquiries</div>
              </button>

              <button
                onClick={() => {
                  const aarav = allUsers.find((u) => u.id === 'designer-aarav');
                  if (aarav) switchUser(aarav);
                  setIsAuthModalOpen(false);
                  setActiveView('studio');
                }}
                className="p-2 rounded-lg bg-[#EFECE6] hover:bg-[#111111] hover:text-white text-left transition-colors text-xs"
              >
                <div className="font-bold flex items-center gap-1">
                  <Scissors className="w-3 h-3 text-[#C5A880]" />
                  <span>Aarav (Designer)</span>
                </div>
                <div className="text-[10px] text-zinc-500">Royal Zardozi Studio</div>
              </button>
            </div>
          </div>

          {/* Role Selector Tabs (I'm a Designer vs I'm here to Explore) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('designer')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                role === 'designer'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                  : 'bg-white text-zinc-800 border-[#DDD6C8] hover:border-zinc-400'
              }`}
            >
              <Scissors className={`w-5 h-5 ${role === 'designer' ? 'text-[#C5A880]' : 'text-zinc-600'}`} />
              <span className="font-semibold text-xs tracking-wider uppercase">I'm a Designer</span>
              <span className={`text-[10px] text-center ${role === 'designer' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                Showcase work, receive commissions & manage inquiries
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole('explorer')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                role === 'explorer'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                  : 'bg-white text-zinc-800 border-[#DDD6C8] hover:border-zinc-400'
              }`}
            >
              <Compass className={`w-5 h-5 ${role === 'explorer' ? 'text-[#C5A880]' : 'text-zinc-600'}`} />
              <span className="font-semibold text-xs tracking-wider uppercase">I'm here to Explore</span>
              <span className={`text-[10px] text-center ${role === 'explorer' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                Discover designs, save moodboards & contact ateliers
              </span>
            </button>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'designer' ? 'e.g. Vivienne Vance' : 'e.g. Aurelia Grey'}
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. vivienneatelier"
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                  Location / Atelier Base
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Milan & Paris"
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900"
                />
              </div>
            </div>

            {/* Role Specific Fields */}
            {role === 'designer' ? (
              <>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                    Design Specialties (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    placeholder="e.g. Sculptural Silk, Hand Zardozi, Haute Bridal"
                    className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                    Atelier Bio & Creative Philosophy
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your craft, materials of choice, and design heritage..."
                    className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900 resize-none"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-1">
                  Fashion Interests & Preferred Styles
                </label>
                <input
                  type="text"
                  value={fashionInterests}
                  onChange={(e) => setFashionInterests(e.target.value)}
                  placeholder="e.g. Bespoke Bridal, Avant-Garde Runway, Heirloom Silks"
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#111111] text-zinc-900"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#2A2723] text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-lg"
            >
              Create {role === 'designer' ? 'Designer Studio Profile' : 'Explorer Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
