import React, { useState } from 'react';
import { Design } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, Eye, MessageSquare, Sparkles } from 'lucide-react';

interface DesignCardProps {
  design: Design;
  aspectClass?: string;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, aspectClass }) => {
  const {
    savedDesignIds,
    toggleSaveDesign,
    setSelectedDesignId,
    openInquiryModal,
    setSelectedDesignerId,
    setActiveView,
  } = useApp();

  const isSaved = savedDesignIds.includes(design.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine dynamic aspect ratio if not passed
  const getAspect = () => {
    if (aspectClass) return aspectClass;
    switch (design.aspectRatio) {
      case 'tall':
        return 'aspect-[3/4.6]';
      case 'wide':
        return 'aspect-[16/11]';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-[3/4]';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[#EFECE6] border border-[#E5DFD3] transition-all duration-500 hover:shadow-2xl font-sans">
      {/* Featured Badge */}
      {design.isFeatured && design.featuredBadge && (
        <div className="absolute top-3 left-3 z-20 bg-[#111111]/85 backdrop-blur-md text-[#F8F6F0] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 font-medium shadow-md">
          <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
          <span>{design.featuredBadge}</span>
        </div>
      )}

      {/* Floating Save Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSaveDesign(design.id);
        }}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isSaved
            ? 'bg-[#111111] text-[#C5A880] shadow-lg scale-105'
            : 'bg-black/35 hover:bg-black/60 text-white opacity-90 group-hover:opacity-100'
        }`}
        title={isSaved ? 'Remove from Saved' : 'Save to Moodboard'}
      >
        <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A880]' : ''}`} />
      </button>

      {/* Image Container with Editorial Zoom */}
      <div
        onClick={() => setSelectedDesignId(design.id)}
        className={`w-full overflow-hidden cursor-pointer relative ${getAspect()}`}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 animate-shimmer" />
        )}
        <img
          src={design.coverImage}
          alt={design.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-4 bottom-24 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDesignId(design.id);
            }}
            className="pointer-events-auto bg-[#F8F6F0] text-black hover:bg-[#C5A880] px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openInquiryModal(design);
            }}
            className="pointer-events-auto bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 backdrop-blur-md shadow-lg border border-white/20 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Inquire</span>
          </button>
        </div>

        {/* Bottom Metadata & Designer Signature */}
        <div className="absolute inset-x-0 bottom-0 p-4 z-10 text-white flex flex-col justify-end">
          <div className="flex items-center justify-between text-[10px] tracking-wider uppercase text-zinc-300 mb-1">
            <span className="text-[#C5A880] font-semibold">{design.category}</span>
            <span className="font-sans font-medium">
              {design.price ? `$${design.price.toLocaleString()}` : 'Bespoke Quote'}
            </span>
          </div>

          <h3
            onClick={() => setSelectedDesignId(design.id)}
            className="font-serif text-lg md:text-xl font-medium leading-snug line-clamp-2 hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            {design.title}
          </h3>

          {/* Designer Pill */}
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/15 text-xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDesignerId(design.designerId);
                setActiveView('designer-profile');
              }}
              className="flex items-center gap-2 hover:text-[#C5A880] transition-colors group/designer text-left"
            >
              <img
                src={design.designerAvatar}
                alt={design.designerName}
                className="w-5 h-5 rounded-full object-cover border border-white/30"
              />
              <span className="font-medium truncate max-w-[140px] text-zinc-200 group-hover/designer:text-white">
                {design.designerName}
              </span>
            </button>

            <span className="text-[10px] text-zinc-400">
              {design.savesCount} saves
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
