import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Heart,
  MessageSquare,
  Sparkles,
  Share2,
  Clock,
  Layers,
  Palette,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { DesignCard } from './DesignCard';

export const DesignDetailModal: React.FC = () => {
  const {
    selectedDesignId,
    setSelectedDesignId,
    designs,
    allUsers,
    savedDesignIds,
    toggleSaveDesign,
    openInquiryModal,
    setSelectedDesignerId,
    setActiveView,
    followedDesignerIds,
    toggleFollowDesigner,
    addToast,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!selectedDesignId) return null;

  const design = designs.find((d) => d.id === selectedDesignId);
  if (!design) return null;

  const designer = allUsers.find((u) => u.id === design.designerId);
  const isSaved = savedDesignIds.includes(design.id);
  const isFollowed = designer ? followedDesignerIds.includes(designer.id) : false;

  const moreFromDesigner = designs.filter(
    (d) => d.designerId === design.designerId && d.id !== design.id
  );

  const relatedDesigns = designs.filter(
    (d) => (d.category === design.category || d.occasion === design.occasion) && d.id !== design.id
  ).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    addToast('Atelier link copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl font-sans flex items-start justify-center p-0 md:p-6 lg:p-10 animate-in fade-in duration-300">
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-[#F8F6F0] text-[#111111] md:rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#E0D9CB]">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 glass-panel border-b border-[#E0D9CB]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500">
              ATELIER ARCHIVE NO. {design.id.toUpperCase()}
            </span>
            {design.isFeatured && (
              <span className="hidden sm:inline-block bg-[#111111] text-[#C5A880] text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-medium">
                {design.featuredBadge || 'Curated'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-black/5 text-zinc-700 hover:text-black transition-colors"
              title="Share Design"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => toggleSaveDesign(design.id)}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'text-[#C5A880] bg-black/5' : 'hover:bg-black/5 text-zinc-700'
              }`}
              title="Save to Collection"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A880]' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedDesignId(null)}
              className="p-2 rounded-full hover:bg-black/10 text-zinc-800 transition-colors ml-2"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Artwork & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
          {/* Left Column: Visual Artwork Gallery */}
          <div className="lg:col-span-7 bg-[#EFECE6] p-4 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E0D9CB]">
            {/* Primary Display */}
            <div className="relative overflow-hidden rounded-xl bg-black/5 aspect-[3/4] max-h-[640px] flex items-center justify-center group">
              <img
                src={design.images[activeImageIndex] || design.coverImage}
                alt={design.title}
                className={`w-full h-full object-cover transition-all duration-700 cursor-zoom-in ${
                  isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Zoom Toggle Pill */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                title={isZoomed ? 'Reset Zoom' : 'High-Res Zoom'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev / Next Arrows */}
              {design.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : design.images.length - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < design.images.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {design.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {design.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#111111] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Couture Narrative, Specifications & Actions */}
          <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div className="space-y-6">
              {/* Category & Availability */}
              <div className="flex items-center justify-between text-xs tracking-wider uppercase">
                <span className="text-[#8E735B] font-semibold">{design.category}</span>
                <span className="text-zinc-500 font-medium">{design.occasion}</span>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-medium leading-tight text-[#111111]">
                  {design.title}
                </h1>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-serif font-bold text-[#111111]">
                    {design.price ? `$${design.price.toLocaleString()}` : 'Custom Quote'}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {design.isCustomizable ? '• Made-to-measure customizable' : '• Edition size 1 of 1'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => openInquiryModal(design)}
                  className="bg-[#111111] hover:bg-[#2A2723] text-[#F8F6F0] py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                  <span>Request Custom / Inquire</span>
                </button>

                <button
                  onClick={() => toggleSaveDesign(design.id)}
                  className={`py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border transition-all ${
                    isSaved
                      ? 'bg-[#EFECE6] border-[#111111] text-[#111111]'
                      : 'border-[#DDD6C8] hover:border-black text-zinc-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
                  <span>{isSaved ? 'Saved to Archive' : 'Save to Moodboard'}</span>
                </button>
              </div>

              {/* Couture Narrative / Description */}
              <div className="space-y-2 pt-2 border-t border-[#E5DFD3]">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400">
                  The Creation
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed font-light">
                  {design.description}
                </p>
              </div>

              {/* Inspiration */}
              {design.inspiration && (
                <div className="space-y-1.5 p-4 rounded-xl bg-[#EFECE6]/70 border border-[#E5DFD3]">
                  <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#8E735B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Muse & Inspiration</span>
                  </h4>
                  <p className="text-xs text-zinc-700 italic leading-relaxed">
                    "{design.inspiration}"
                  </p>
                </div>
              )}

              {/* Technical Specifications */}
              <div className="space-y-3 pt-3 border-t border-[#E5DFD3]">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400">
                  Atelier Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">Fabric & Weave</span>
                    <span className="font-medium text-zinc-800">{design.fabric}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">Silhouette & Cut</span>
                    <span className="font-medium text-zinc-800">{design.style}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">Production Timeline</span>
                    <span className="font-medium text-zinc-800 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8E735B]" />
                      {design.estimatedProductionTime || '4 - 6 weeks'}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase">Availability</span>
                    <span className="font-medium text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {design.isAvailableForCommission ? 'Commissions Accepted' : 'Inquire for Replica'}
                    </span>
                  </div>
                </div>

                {/* Color Swatches */}
                {design.colors && design.colors.length > 0 && (
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[10px] uppercase text-zinc-400 mr-1">Palette:</span>
                    {design.colors.map((hex, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Designer Craftsmanship Notes */}
              {design.designerNotes && (
                <div className="pt-3 border-t border-[#E5DFD3]">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-1">
                    Atelier Craftsmanship Notes
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed font-light">
                    {design.designerNotes}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {design.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#EFECE6] text-zinc-700 px-2.5 py-1 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* About Designer Card at Bottom */}
            {designer && (
              <div className="mt-8 pt-6 border-t border-[#E0D9CB] flex items-center justify-between">
                <div
                  onClick={() => {
                    setSelectedDesignId(null);
                    setSelectedDesignerId(designer.id);
                    setActiveView('designer-profile');
                  }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#C5A880]"
                  />
                  <div>
                    <h5 className="font-serif text-base font-semibold group-hover:text-[#8E735B] transition-colors">
                      {designer.name}
                    </h5>
                    <p className="text-[11px] text-zinc-500">{designer.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFollowDesigner(designer.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                      isFollowed
                        ? 'bg-[#111111] text-white'
                        : 'border border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111]'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow Atelier'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Below Section: More from this Designer */}
        {moreFromDesigner.length > 0 && (
          <div className="p-8 md:p-12 border-t border-[#E0D9CB] bg-[#F3EFE7]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-bold">
                  PORTFOLIO ARCHIVE
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#111111]">
                  More from {design.designerName}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedDesignId(null);
                  setSelectedDesignerId(design.designerId);
                  setActiveView('designer-profile');
                }}
                className="text-xs font-semibold tracking-wider uppercase hover:text-[#8E735B] flex items-center gap-1 transition-colors"
              >
                <span>View Full Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreFromDesigner.slice(0, 3).map((item) => (
                <DesignCard key={item.id} design={item} />
              ))}
            </div>
          </div>
        )}

        {/* Below Section: You May Also Like */}
        {relatedDesigns.length > 0 && (
          <div className="p-8 md:p-12 border-t border-[#E0D9CB]">
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-bold">
                CURATORIAL RECOMMENDATIONS
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#111111]">
                You May Also Admire
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDesigns.map((item) => (
                <DesignCard key={item.id} design={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
