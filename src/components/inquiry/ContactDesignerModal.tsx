import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, Calendar, DollarSign, MapPin, CheckCircle } from 'lucide-react';
import { InquiryType } from '../../types';

export const ContactDesignerModal: React.FC = () => {
  const {
    isInquiryModalOpen,
    closeInquiryModal,
    targetInquiryDesign,
    targetInquiryDesigner,
    sendInquiry,
    currentUser,
  } = useApp();

  const [inquiryType, setInquiryType] = useState<InquiryType>('custom_version');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('$3,000 - $6,000');
  const [preferredDate, setPreferredDate] = useState('');
  const [location, setLocation] = useState(currentUser.location || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isInquiryModalOpen) return null;

  const designerName = targetInquiryDesigner?.name || targetInquiryDesign?.designerName || 'The Designer';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      sendInquiry({
        designId: targetInquiryDesign?.id,
        designTitle: targetInquiryDesign?.title,
        designImage: targetInquiryDesign?.coverImage,
        designerId: targetInquiryDesigner?.id || targetInquiryDesign?.designerId || 'designer-elena',
        type: inquiryType,
        message,
        budget,
        preferredDate,
        location,
      });
      setIsSubmitting(false);
    }, 400);
  };

  const inquiryTypes: { type: InquiryType; label: string; desc: string }[] = [
    {
      type: 'custom_version',
      label: 'Custom Version',
      desc: 'Bespoke fit, alternate fabrics, palette adjustment or custom veil',
    },
    {
      type: 'purchase',
      label: 'Direct Purchase',
      desc: 'Acquire the exact runway piece or standard atelier sizing',
    },
    {
      type: 'similar_design',
      label: 'Similar Design',
      desc: 'Commission a brand-new silhouette inspired by this aesthetic',
    },
    {
      type: 'collaboration',
      label: 'Editorial / Red Carpet',
      desc: 'Stylist pull, red carpet loan, magazine feature or gallery',
    },
    {
      type: 'general',
      label: 'General Atelier Inquiry',
      desc: 'Fitting consultations, lead times, or studio visit questions',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#F8F6F0] rounded-2xl shadow-2xl border border-[#DDD6C8] overflow-hidden text-[#111111]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#DDD6C8] flex items-center justify-between bg-[#EFECE6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#111111] text-[#C5A880] flex items-center justify-center font-serif text-sm font-bold">
              AV
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium leading-none">
                Direct Atelier Inquiry
              </h3>
              <p className="text-[11px] text-zinc-500 mt-1">
                Transmitting directly to <span className="font-semibold text-black">{designerName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={closeInquiryModal}
            className="p-1.5 rounded-full hover:bg-black/10 text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Linked Design Preview if present */}
          {targetInquiryDesign && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DDD6C8]">
              <img
                src={targetInquiryDesign.coverImage}
                alt={targetInquiryDesign.title}
                className="w-12 h-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] tracking-wider uppercase text-[#8E735B] font-bold">
                  Referenced Design
                </span>
                <h4 className="font-serif text-sm font-medium truncate text-[#111111]">
                  {targetInquiryDesign.title}
                </h4>
                <p className="text-xs text-zinc-500">
                  {targetInquiryDesign.price ? `$${targetInquiryDesign.price.toLocaleString()}` : 'Bespoke Quote'} • {targetInquiryDesign.category}
                </p>
              </div>
            </div>
          )}

          {/* Inquiry Type Radio / Pill Selection */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 block">
              Nature of Inquiry
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {inquiryTypes.map((item) => (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => setInquiryType(item.type)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    inquiryType === item.type
                      ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                      : 'border-[#DDD6C8] bg-white hover:border-zinc-400 text-zinc-800'
                  }`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className={`text-[10px] line-clamp-1 mt-0.5 ${inquiryType === item.type ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message TextArea */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 block">
              Your Message & Creative Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your vision, bespoke measurements, occasion details, or questions for the atelier..."
              className="w-full bg-white border border-[#DDD6C8] rounded-xl p-3 text-xs focus:outline-none focus:border-[#111111] transition-colors resize-none text-zinc-900 placeholder-zinc-400"
            />
          </div>

          {/* Optional Meta: Budget, Date, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 block mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#8E735B]" />
                <span>Estimated Budget</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-white border border-[#DDD6C8] rounded-lg p-2 text-xs focus:outline-none focus:border-[#111111] text-zinc-800"
              >
                <option value="Under $2,000">Under $2,000</option>
                <option value="$2,000 - $4,000">$2,000 - $4,000</option>
                <option value="$4,000 - $8,000">$4,000 - $8,000</option>
                <option value="$8,000 - $15,000">$8,000 - $15,000</option>
                <option value="$15,000+">$15,000+ (High Couture)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 block mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#8E735B]" />
                <span>Target Date</span>
              </label>
              <input
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder="e.g. Oct 2026"
                className="w-full bg-white border border-[#DDD6C8] rounded-lg p-2 text-xs focus:outline-none focus:border-[#111111] text-zinc-800 placeholder-zinc-400"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 block mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#8E735B]" />
                <span>Delivery Location</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full bg-white border border-[#DDD6C8] rounded-lg p-2 text-xs focus:outline-none focus:border-[#111111] text-zinc-800 placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Customer Sender Identity Badge */}
          <div className="pt-2 text-[11px] text-zinc-500 flex items-center justify-between border-t border-[#DDD6C8]">
            <span>Inquiring as: <strong className="text-black">{currentUser.name}</strong> ({currentUser.email})</span>
            <span className="text-[10px] text-zinc-400">Direct Atelier Encryption</span>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full bg-[#111111] hover:bg-[#2A2723] text-white py-3.5 rounded-xl font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg"
            >
              <Send className="w-4 h-4 text-[#C5A880]" />
              <span>{isSubmitting ? 'Transmitting to Atelier...' : 'Transmit Inquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
