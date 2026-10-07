import React from 'react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/design/DesignCard';
import {
  MapPin,
  Sparkles,
  MessageSquare,
  Globe,
  Eye,
  Heart,
  Scissors,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const DesignerProfilePage: React.FC = () => {
  const {
    selectedDesignerId,
    allUsers,
    designs,
    followedDesignerIds,
    toggleFollowDesigner,
    openInquiryModal,
    setActiveView,
    currentUser,
  } = useApp();

  const designer = allUsers.find((u) => u.id === selectedDesignerId) || allUsers[0];
  const designerCreations = designs.filter((d) => d.designerId === designer.id);
  const isFollowed = followedDesignerIds.includes(designer.id);
  const isSelf = currentUser.id === designer.id;

  return (
    <div className="space-y-12 pb-28 font-sans text-[#111111]">
      {/* Back Button Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <button
          onClick={() => setActiveView('discover')}
          className="text-xs uppercase tracking-wider font-semibold text-zinc-500 hover:text-black flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Archive</span>
        </button>
      </div>

      {/* Cinematic Hero Cover */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden border border-[#DDD6C8] bg-zinc-900 shadow-xl">
          <img
            src={designer.coverImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80'}
            alt={designer.name}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Profile Details Card Floated Over Cover */}
        <div className="relative -mt-20 md:-mt-24 max-w-5xl mx-auto bg-[#F8F6F0] rounded-2xl border border-[#DDD6C8] p-6 md:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DDD6C8]">
            {/* Avatar & Identification */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#F8F6F0] shadow-xl shrink-0">
                <img
                  src={designer.avatar}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-3xl sm:text-4xl font-medium text-black">
                    {designer.name}
                  </h1>
                  <span className="bg-[#111111] text-[#C5A880] text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                    Resident Atelier
                  </span>
                </div>

                <p className="text-xs text-zinc-500 font-mono">@{designer.username}</p>

                <div className="flex items-center gap-4 text-xs text-zinc-600 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8E735B]" />
                    {designer.location}
                  </span>
                  <span>•</span>
                  <span className="text-[#8E735B] font-semibold">{designer.experience}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openInquiryModal(undefined, designer)}
                className="bg-[#111111] hover:bg-[#2A2723] text-white px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                <span>Contact Atelier</span>
              </button>

              {!isSelf && (
                <button
                  onClick={() => toggleFollowDesigner(designer.id)}
                  className={`px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold border transition-all ${
                    isFollowed
                      ? 'bg-[#EFECE6] border-black text-black'
                      : 'border-[#DDD6C8] hover:border-black text-zinc-800'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              )}

              {isSelf && (
                <button
                  onClick={() => setActiveView('studio')}
                  className="bg-[#C5A880] text-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold"
                >
                  Edit Studio
                </button>
              )}
            </div>
          </div>

          {/* Bio & Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <p className="text-sm text-zinc-700 leading-relaxed font-light">
                {designer.bio}
              </p>

              {/* Specialties Pills */}
              {designer.specialties && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block">
                    Atelier Specialties
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {designer.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs bg-[#EFECE6] border border-[#DDD6C8] text-zinc-800 px-3 py-1 rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Statistics */}
            <div className="md:col-span-4 bg-[#EFECE6] p-5 rounded-xl border border-[#DDD6C8] grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="font-serif text-2xl font-bold text-black">
                  {designer.stats.creationsCount}
                </span>
                <p className="text-[10px] uppercase text-zinc-500 tracking-wider mt-0.5">Creations</p>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-black">
                  {(designer.stats.followersCount || 1200).toLocaleString()}
                </span>
                <p className="text-[10px] uppercase text-zinc-500 tracking-wider mt-0.5">Patrons</p>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-black">
                  {(designer.stats.totalViews || 14000).toLocaleString()}
                </span>
                <p className="text-[10px] uppercase text-zinc-500 tracking-wider mt-0.5">Views</p>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-black">
                  {(designer.stats.savesCount || 2300).toLocaleString()}
                </span>
                <p className="text-[10px] uppercase text-zinc-500 tracking-wider mt-0.5">Saves</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Designer's Creations Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 pt-6">
        <div className="flex items-center justify-between border-b border-[#DDD6C8] pb-4">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-bold">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-serif text-3xl font-medium text-black">
              Signature Creations ({designerCreations.length})
            </h2>
          </div>
          <span className="text-xs text-zinc-500">Every design is crafted by {designer.name}</span>
        </div>

        {designerCreations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designerCreations.map((design, index) => (
              <DesignCard
                key={design.id}
                design={design}
                aspectClass={index % 2 === 0 ? 'aspect-[3/4.5]' : 'aspect-square'}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-[#EFECE6] rounded-2xl border border-[#DDD6C8]">
            <Scissors className="w-8 h-8 text-zinc-400 mx-auto" />
            <h4 className="font-serif text-xl">Portfolio is being curated</h4>
            <p className="text-xs text-zinc-500">
              This designer is currently preparing new haute couture drops for the archive.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
