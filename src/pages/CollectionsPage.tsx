import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/design/DesignCard';
import {
  Heart,
  FolderPlus,
  Compass,
  Sparkles,
  Layers,
  UserCheck,
  Plus,
  Trash2,
  Lock,
  Globe
} from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const {
    savedDesignIds,
    designs,
    collections,
    createCollection,
    followedDesignerIds,
    allUsers,
    setActiveView,
    setSelectedDesignerId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'boards' | 'following'>('saved');
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');

  // Saved Designs
  const savedDesigns = designs.filter((d) => savedDesignIds.includes(d.id));

  // Followed Designers
  const followedDesigners = allUsers.filter((u) => followedDesignerIds.includes(u.id));

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    createCollection(newBoardName, newBoardDesc);
    setNewBoardName('');
    setNewBoardDesc('');
    setIsCreateBoardModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-10 pb-28 font-sans text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#DDD6C8] gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#8E735B]">
            PRIVATE CURATION & SALON
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#111111]">
            My Fashion Archive
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'saved' ? 'bg-[#111111] text-white shadow-md' : 'bg-[#EFECE6] text-zinc-700 hover:bg-[#E5DFD3]'
            }`}
          >
            Saved Creations ({savedDesignIds.length})
          </button>

          <button
            onClick={() => setActiveTab('boards')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'boards' ? 'bg-[#111111] text-white shadow-md' : 'bg-[#EFECE6] text-zinc-700 hover:bg-[#E5DFD3]'
            }`}
          >
            Moodboards ({collections.length})
          </button>

          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'following' ? 'bg-[#111111] text-white shadow-md' : 'bg-[#EFECE6] text-zinc-700 hover:bg-[#E5DFD3]'
            }`}
          >
            Followed Ateliers ({followedDesignerIds.length})
          </button>
        </div>
      </div>

      {/* TAB 1: SAVED MASTERPIECES */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedDesigns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDesigns.map((design, index) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  aspectClass={index % 3 === 0 ? 'aspect-[3/4.5]' : 'aspect-square'}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] border border-[#DDD6C8] flex items-center justify-center mx-auto text-zinc-400">
                <Heart className="w-8 h-8 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-3xl font-light">
                Your collection is waiting for its first masterpiece.
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Explore the archive and tap the heart icon on any gown, saree, or avant-garde sculpture to preserve it in your private salon.
              </p>
              <button
                onClick={() => setActiveView('discover')}
                className="bg-[#111111] hover:bg-[#2A2723] text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                Discover Designs
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MOODBOARDS */}
      {activeTab === 'boards' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Curate custom moodboards for weddings, gala appearances, or seasonal commissions.
            </p>
            <button
              onClick={() => setIsCreateBoardModalOpen(true)}
              className="bg-[#111111] hover:bg-[#2A2723] text-white px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Moodboard</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => {
              const count = col.designIds.length;
              return (
                <div
                  key={col.id}
                  className="group bg-[#EFECE6] rounded-2xl overflow-hidden border border-[#DDD6C8] hover:border-black transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={col.coverImage}
                      alt={col.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="text-[10px] uppercase tracking-wider font-mono text-[#C5A880]">
                        {count} {count === 1 ? 'Design' : 'Designs'} Curated
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-xl font-medium leading-snug group-hover:text-[#8E735B] transition-colors">
                      {col.name}
                    </h3>
                    {col.description && (
                      <p className="text-xs text-zinc-600 line-clamp-2 font-light">
                        {col.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FOLLOWED ATELIERS */}
      {activeTab === 'following' && (
        <div className="space-y-6">
          {followedDesigners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {followedDesigners.map((designer) => (
                <div
                  key={designer.id}
                  onClick={() => {
                    setSelectedDesignerId(designer.id);
                    setActiveView('designer-profile');
                  }}
                  className="bg-[#EFECE6] p-6 rounded-2xl border border-[#DDD6C8] hover:border-black transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={designer.avatar}
                      alt={designer.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A880]"
                    />
                    <div>
                      <h4 className="font-serif text-lg font-medium">{designer.name}</h4>
                      <p className="text-xs text-zinc-500">{designer.location}</p>
                      <p className="text-[10px] text-[#8E735B] font-semibold mt-0.5">
                        {designer.stats.creationsCount} Creations
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EFECE6] border border-[#DDD6C8] flex items-center justify-center mx-auto text-zinc-400">
                <UserCheck className="w-8 h-8 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-3xl font-light">
                Follow your favorite couturiers.
              </h3>
              <p className="text-xs text-zinc-500 font-light">
                Keep up with new editorial drops and runway releases from resident ateliers worldwide.
              </p>
              <button
                onClick={() => setActiveView('designers')}
                className="bg-[#111111] hover:bg-[#2A2723] text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                Browse Designers
              </button>
            </div>
          )}
        </div>
      )}

      {/* Create Board Modal */}
      {isCreateBoardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#F8F6F0] rounded-2xl p-6 border border-[#DDD6C8] space-y-5 text-[#111111]">
            <div>
              <h3 className="font-serif text-2xl font-medium">New Moodboard</h3>
              <p className="text-xs text-zinc-500">Group inspirations for bridal, gala, or custom commissions</p>
            </div>

            <form onSubmit={handleCreateBoard} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Moodboard Name <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="e.g. Summer Gala & Lake Como Wedding"
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-3 focus:outline-none focus:border-black text-zinc-900"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newBoardDesc}
                  onChange={(e) => setNewBoardDesc(e.target.value)}
                  placeholder="Notes on textures, colors, or atelier notes..."
                  className="w-full bg-white border border-[#DDD6C8] rounded-xl p-3 focus:outline-none focus:border-black text-zinc-900 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateBoardModalOpen(false)}
                  className="flex-1 border border-[#DDD6C8] py-3 rounded-xl uppercase tracking-wider font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#111111] text-white py-3 rounded-xl uppercase tracking-wider font-semibold hover:bg-[#2A2723]"
                >
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
