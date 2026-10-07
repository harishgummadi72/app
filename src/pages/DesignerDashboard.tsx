import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Design, Inquiry, DesignCategory, OccasionType } from '../types';
import {
  LayoutDashboard,
  Layers,
  Upload,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Heart,
  TrendingUp,
  DollarSign,
  Send,
  CheckCircle,
  Clock,
  Check,
  X
} from 'lucide-react';

export const DesignerDashboard: React.FC = () => {
  const {
    currentUser,
    designs,
    inquiries,
    createDesign,
    updateDesign,
    deleteDesign,
    replyToInquiry,
    updateInquiryStatus,
    toggleFeatureDesign,
    updateCurrentUserProfile,
    setSelectedDesignId,
    addToast,
  } = useApp();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'designs' | 'upload' | 'inquiries' | 'analytics' | 'profile'>('overview');

  // Filter My Designs State
  const [designFilter, setDesignFilter] = useState<'all' | 'published' | 'featured'>('all');

  // Create Design Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCoverImage, setNewCoverImage] = useState('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85');
  const [newImages, setNewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
  ]);
  const [newCategory, setNewCategory] = useState<DesignCategory>('Western Haute Couture');
  const [newStyle, setNewStyle] = useState('Sculptural Drape');
  const [newFabric, setNewFabric] = useState('Mulberry Silk Faille');
  const [newOccasion, setNewOccasion] = useState<OccasionType>('Red Carpet & Gala');
  const [newPrice, setNewPrice] = useState<number>(3800);
  const [isCustomizable, setIsCustomizable] = useState(true);
  const [isAvailableForPurchase, setIsAvailableForPurchase] = useState(true);
  const [isAvailableForCommission, setIsAvailableForCommission] = useState(true);
  const [estimatedProductionTime, setEstimatedProductionTime] = useState('4 - 6 weeks');
  const [inspiration, setInspiration] = useState('');
  const [designerNotes, setDesignerNotes] = useState('');
  const [newTags, setNewTags] = useState('Haute Couture, Silk, Gala');

  // Active Inquiry Thread State
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Profile Edit State
  const [profileName, setProfileName] = useState(currentUser.name);
  const [profileBio, setProfileBio] = useState(currentUser.bio);
  const [profileLocation, setProfileLocation] = useState(currentUser.location);
  const [profileExperience, setProfileExperience] = useState(currentUser.experience || '');

  // Filtered designs belonging to this designer
  const myDesigns = designs.filter((d) => d.designerId === currentUser.id);

  // Inquiries directed to this designer
  const myInquiries = inquiries.filter((inq) => inq.designerId === currentUser.id);
  const activeInquiry = myInquiries.find((inq) => inq.id === selectedInquiryId) || myInquiries[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCoverImage.trim()) return;

    createDesign({
      title: newTitle,
      description: newDescription || 'Crafted with master artisanal techniques in our private atelier.',
      designerId: currentUser.id,
      designerName: currentUser.name,
      designerUsername: currentUser.username,
      designerAvatar: currentUser.avatar,
      designerLocation: currentUser.location,
      coverImage: newCoverImage,
      images: newImages.filter(Boolean),
      category: newCategory,
      style: newStyle,
      fabric: newFabric,
      colors: ['#F7F5F0', '#111111', '#C5A880'],
      occasion: newOccasion,
      price: Number(newPrice) || 0,
      isCustomizable,
      isAvailableForPurchase,
      isAvailableForCommission,
      estimatedProductionTime,
      inspiration,
      designerNotes,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      isFeatured: false,
      aspectRatio: 'tall',
      status: 'published',
    });

    // Reset Form & Switch Tab
    setNewTitle('');
    setNewDescription('');
    setInspiration('');
    setDesignerNotes('');
    setActiveTab('designs');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeInquiry) return;
    replyToInquiry(activeInquiry.id, replyText);
    setReplyText('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name: profileName,
      bio: profileBio,
      location: profileLocation,
      experience: profileExperience,
    });
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#F8F6F0] font-sans pb-28">
      {/* Studio Header Ribbon */}
      <div className="bg-[#0C0C0C] border-b border-zinc-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#222222] border border-zinc-700 flex items-center justify-center text-[#C5A880]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-medium text-white">
                {currentUser.name} Studio
              </h1>
              <span className="text-[9px] uppercase tracking-widest bg-zinc-800 text-[#C5A880] px-2 py-0.5 rounded-full font-bold">
                Couture Pro
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Atelier Management • Paris / Global Archive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('upload')}
            className="bg-[#C5A880] hover:bg-white text-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Design</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Sidebar + Active Canvas */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Studio Sidebar */}
        <aside className="lg:col-span-3 space-y-2 bg-[#1C1C1C] p-3 rounded-2xl border border-zinc-800 h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'overview' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Studio Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('designs')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'designs' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>My Designs</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'designs' ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-300'}`}>
              {myDesigns.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'upload' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Create Design</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'inquiries' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>Client Inquiries</span>
            </div>
            {myInquiries.length > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'inquiries' ? 'bg-black text-white' : 'bg-[#C5A880] text-black font-bold'}`}>
                {myInquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'analytics' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Studio Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === 'profile' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Atelier Profile</span>
          </button>
        </aside>

        {/* Studio Active Canvas */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: STUDIO OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Portfolio Views</span>
                    <Eye className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div className="font-serif text-3xl font-bold mt-2 text-white">
                    {(currentUser.stats.totalViews || 145000).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% this month</span>
                  </div>
                </div>

                <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Moodboard Saves</span>
                    <Heart className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="font-serif text-3xl font-bold mt-2 text-white">
                    {(currentUser.stats.savesCount || 8940).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+24.1% saves rate</span>
                  </div>
                </div>

                <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Active Inquiries</span>
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="font-serif text-3xl font-bold mt-2 text-white">
                    {myInquiries.length}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    Direct commission requests
                  </div>
                </div>

                <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Archived Creations</span>
                    <Layers className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="font-serif text-3xl font-bold mt-2 text-white">
                    {myDesigns.length}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    Published & live
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="bg-[#1C1C1C] p-6 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white">Recent Client Inquiries</h3>
                    <p className="text-xs text-zinc-400">Patron briefs waiting for your atelier response</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-[#C5A880] hover:underline"
                  >
                    View All Inquiries
                  </button>
                </div>

                {myInquiries.length > 0 ? (
                  <div className="space-y-3">
                    {myInquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiryId(inq.id);
                          setActiveTab('inquiries');
                        }}
                        className="p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={inq.customerAvatar}
                            alt={inq.customerName}
                            className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <div className="font-semibold text-sm text-white">{inq.customerName}</div>
                            <div className="text-xs text-zinc-400 line-clamp-1">{inq.message}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-[#C5A880] font-mono">{inq.budget || 'Quote requested'}</span>
                          <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] uppercase">
                            {inq.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-zinc-500 text-xs">
                    No pending inquiries. Your next collaboration will appear here.
                  </div>
                )}
              </div>

              {/* Recent Works Strip */}
              <div className="bg-[#1C1C1C] p-6 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white">Your Published Designs</h3>
                    <p className="text-xs text-zinc-400">Manage, edit, or feature in the public archive</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('designs')}
                    className="text-xs text-[#C5A880] hover:underline"
                  >
                    Manage Archive
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {myDesigns.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedDesignId(item.id)}
                      className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-zinc-900 border border-zinc-800 cursor-pointer"
                    >
                      <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                        <div className="text-[10px] text-[#C5A880] font-semibold">{item.category}</div>
                        <div className="font-serif text-sm font-medium line-clamp-1">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY DESIGNS MANAGER */}
          {activeTab === 'designs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-white">Atelier Archive ({myDesigns.length})</h2>
                  <p className="text-xs text-zinc-400">All couture pieces associated with your profile</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDesignFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase ${
                      designFilter === 'all' ? 'bg-[#C5A880] text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    All ({myDesigns.length})
                  </button>
                  <button
                    onClick={() => setDesignFilter('featured')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase ${
                      designFilter === 'featured' ? 'bg-[#C5A880] text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    Featured ({myDesigns.filter((d) => d.isFeatured).length})
                  </button>
                </div>
              </div>

              {/* Grid of Designs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {myDesigns
                  .filter((d) => (designFilter === 'featured' ? d.isFeatured : true))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#1C1C1C] rounded-2xl overflow-hidden border border-zinc-800 flex flex-col justify-between group"
                    >
                      <div
                        onClick={() => setSelectedDesignId(item.id)}
                        className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFeatureDesign(item.id);
                            }}
                            className={`p-1.5 rounded-full backdrop-blur-md text-xs ${
                              item.isFeatured ? 'bg-amber-500 text-black font-bold' : 'bg-black/60 text-white hover:bg-black'
                            }`}
                            title={item.isFeatured ? 'Remove from Featured' : 'Feature in Editorial Drop'}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDesign(item.id);
                            }}
                            className="p-1.5 rounded-full bg-rose-900/80 hover:bg-rose-700 text-white backdrop-blur-md"
                            title="Delete Design"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                          <span className="text-[#C5A880]">{item.category}</span>
                          <span>${item.price?.toLocaleString()}</span>
                        </div>
                        <h4 className="font-serif text-base font-medium line-clamp-1 text-white">
                          {item.title}
                        </h4>
                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                          <span>{item.viewsCount} views</span>
                          <span>{item.savesCount} saves</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: CREATE / UPLOAD DESIGN */}
          {activeTab === 'upload' && (
            <div className="bg-[#1C1C1C] p-6 md:p-10 rounded-2xl border border-zinc-800 space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="font-serif text-3xl font-medium text-white">Archive a New Creation</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Chronicle the materials, inspiration, and technical craftsmanship behind your dress.
                </p>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-6 text-xs">
                {/* Image URLs */}
                <div className="space-y-3">
                  <label className="font-bold uppercase tracking-wider text-zinc-400 block">
                    High-Resolution Cover Artwork URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="url"
                    value={newCoverImage}
                    onChange={(e) => setNewCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                  />
                  {newCoverImage && (
                    <div className="w-28 h-36 rounded-lg overflow-hidden border border-zinc-700">
                      <img src={newCoverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider text-zinc-400 block">
                    Creation Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. The Celestial Obsidian: Sculpted Raw Silk Gown"
                    className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider text-zinc-400 block">
                    Couture Description & Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe the silhouette, movement, internal corsetry, and artisan hours..."
                    className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>

                {/* Categorization Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Discipline Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as DesignCategory)}
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Bridal">Bridal</option>
                      <option value="Traditional & Ethnic">Traditional & Ethnic</option>
                      <option value="Western Haute Couture">Western Haute Couture</option>
                      <option value="Avant-Garde & Experimental">Avant-Garde & Experimental</option>
                      <option value="Evening Gowns">Evening Gowns</option>
                      <option value="Saree & Lehenga">Saree & Lehenga</option>
                      <option value="Streetwear Luxe">Streetwear Luxe</option>
                      <option value="Contemporary Minimal">Contemporary Minimal</option>
                      <option value="Men's Couture">Men's Couture</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Occasion
                    </label>
                    <select
                      value={newOccasion}
                      onChange={(e) => setNewOccasion(e.target.value as OccasionType)}
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Red Carpet & Gala">Red Carpet & Gala</option>
                      <option value="Bridal & Reception">Bridal & Reception</option>
                      <option value="Editorial & Runway">Editorial & Runway</option>
                      <option value="Cocktail & Evening">Cocktail & Evening</option>
                      <option value="High Festive">High Festive</option>
                      <option value="Modern Daily">Modern Daily</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Starting Price ($ USD)
                    </label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      placeholder="4500"
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Fabric & Silhouette */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Fabric & Weave Construction
                    </label>
                    <input
                      type="text"
                      value={newFabric}
                      onChange={(e) => setNewFabric(e.target.value)}
                      placeholder="e.g. 100% Pure Mulberry Silk Organza & French Lace"
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Silhouette Style
                    </label>
                    <input
                      type="text"
                      value={newStyle}
                      onChange={(e) => setNewStyle(e.target.value)}
                      placeholder="e.g. Architectural Mermaid Corset"
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Inspiration & Craftsmanship */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Inspiration / Creative Muse
                    </label>
                    <input
                      type="text"
                      value={inspiration}
                      onChange={(e) => setInspiration(e.target.value)}
                      placeholder="e.g. 1920s Art Deco ironwork and Parisian water lilies"
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Estimated Production Lead Time
                    </label>
                    <input
                      type="text"
                      value={estimatedProductionTime}
                      onChange={(e) => setEstimatedProductionTime(e.target.value)}
                      placeholder="e.g. 4 - 6 weeks"
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Checkboxes: Availability */}
                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCustomizable}
                      onChange={(e) => setIsCustomizable(e.target.checked)}
                      className="rounded accent-[#C5A880]"
                    />
                    <span>Made-To-Measure Customizable</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAvailableForPurchase}
                      onChange={(e) => setIsAvailableForPurchase(e.target.checked)}
                      className="rounded accent-[#C5A880]"
                    />
                    <span>Available for Direct Purchase</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAvailableForCommission}
                      onChange={(e) => setIsAvailableForCommission(e.target.checked)}
                      className="rounded accent-[#C5A880]"
                    />
                    <span>Commissions Open</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C5A880] hover:bg-white text-black py-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-xl"
                >
                  Publish Design to Global Archive
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: CLIENT INQUIRIES & MESSAGING INBOX */}
          {activeTab === 'inquiries' && (
            <div className="bg-[#1C1C1C] rounded-2xl border border-zinc-800 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] animate-in fade-in duration-200">
              {/* Inbox Left List */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-zinc-800 p-4 space-y-2 overflow-y-auto max-h-[600px]">
                <h3 className="font-serif text-lg font-medium text-white px-2 py-1">
                  Inquiries ({myInquiries.length})
                </h3>

                {myInquiries.length > 0 ? (
                  myInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiryId(inq.id)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-colors ${
                        (activeInquiry?.id === inq.id)
                          ? 'bg-zinc-800 border border-[#C5A880]'
                          : 'bg-black/30 hover:bg-zinc-800/60 border border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{inq.customerName}</span>
                        <span className="text-[10px] text-zinc-400">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1 mt-1">{inq.message}</div>
                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span className="text-[#C5A880] font-mono">{inq.budget || 'Quote req'}</span>
                        <span className="bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded capitalize">
                          {inq.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-zinc-500 text-xs">
                    No client inquiries at this time.
                  </div>
                )}
              </div>

              {/* Message Thread Right Pane */}
              <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                {activeInquiry ? (
                  <>
                    <div className="space-y-4 overflow-y-auto max-h-[460px]">
                      {/* Patron Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                        <div className="flex items-center gap-3">
                          <img
                            src={activeInquiry.customerAvatar}
                            alt={activeInquiry.customerName}
                            className="w-12 h-12 rounded-full object-cover border border-[#C5A880]"
                          />
                          <div>
                            <h4 className="font-serif text-lg font-medium text-white">
                              {activeInquiry.customerName}
                            </h4>
                            <p className="text-xs text-zinc-400">
                              {activeInquiry.customerEmail} • {activeInquiry.location || 'Client'}
                            </p>
                          </div>
                        </div>

                        {/* Status Switcher */}
                        <select
                          value={activeInquiry.status}
                          onChange={(e) =>
                            updateInquiryStatus(activeInquiry.id, e.target.value as Inquiry['status'])
                          }
                          className="bg-black border border-zinc-700 text-xs text-white rounded-lg p-2 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="accepted">Accepted Commission</option>
                          <option value="declined">Declined</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      {/* Referenced Design info if any */}
                      {activeInquiry.designTitle && (
                        <div className="p-3 bg-black/40 rounded-xl border border-zinc-800 flex items-center gap-3 text-xs">
                          {activeInquiry.designImage && (
                            <img
                              src={activeInquiry.designImage}
                              alt={activeInquiry.designTitle}
                              className="w-10 h-14 rounded object-cover"
                            />
                          )}
                          <div>
                            <span className="text-[10px] uppercase text-[#C5A880] tracking-wider block">
                              Referenced Design
                            </span>
                            <span className="font-medium text-white">{activeInquiry.designTitle}</span>
                          </div>
                        </div>
                      )}

                      {/* Brief Metadata: Budget & Date */}
                      <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-900/60 rounded-xl text-xs text-zinc-300">
                        <div>
                          <span className="text-zinc-500 block text-[10px] uppercase">Budget Target</span>
                          <span className="text-[#C5A880] font-mono">{activeInquiry.budget || 'Open'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[10px] uppercase">Desired Delivery</span>
                          <span>{activeInquiry.preferredDate || 'Flexible'}</span>
                        </div>
                      </div>

                      {/* Customer Initial Message Bubble */}
                      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold">
                          Client Inquiry Brief
                        </span>
                        <p className="text-xs text-zinc-200 leading-relaxed font-light">
                          {activeInquiry.message}
                        </p>
                      </div>

                      {/* Thread Replies */}
                      {activeInquiry.replies?.map((rep) => (
                        <div
                          key={rep.id}
                          className={`p-3.5 rounded-xl text-xs space-y-1 max-w-[85%] ${
                            rep.senderRole === 'designer'
                              ? 'ml-auto bg-[#C5A880] text-black font-medium'
                              : 'mr-auto bg-zinc-800 text-white'
                          }`}
                        >
                          <div className="text-[10px] opacity-75">{rep.senderName}</div>
                          <div>{rep.text}</div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Input Form */}
                    <form onSubmit={handleSendReply} className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Reply with fit schedule, sketch draft, or quotation..."
                        className="flex-1 bg-black border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                      <button
                        type="submit"
                        className="bg-[#C5A880] text-black hover:bg-white p-3 rounded-xl transition-colors shadow-md"
                        title="Send Reply"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                    Select an inquiry from the left to view the client brief.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: STUDIO ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-[#1C1C1C] p-6 md:p-8 rounded-2xl border border-zinc-800 space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="font-serif text-3xl font-medium text-white">Atelier Performance Analytics</h2>
                <p className="text-xs text-zinc-400 mt-1">Real-time metrics on your portfolio reach and client conversion</p>
              </div>

              {/* Graphical Simulated Bars */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block">
                  Weekly Portfolio Impressions (Last 7 Days)
                </span>
                <div className="grid grid-cols-7 gap-2 items-end h-44 bg-black/40 p-4 rounded-xl border border-zinc-800">
                  {[45, 62, 58, 85, 92, 110, 140].map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                      <div
                        className="w-full bg-[#C5A880] hover:bg-white rounded-t transition-all"
                        style={{ height: `${val}%` }}
                        title={`${val * 120} views`}
                      />
                      <span className="text-[10px] text-zinc-500">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-black/40 p-4 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block uppercase text-[10px]">Inquiry-to-Commission Rate</span>
                  <div className="font-serif text-2xl font-bold text-emerald-400 mt-1">32.8%</div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Above platform average of 18%</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block uppercase text-[10px]">Average Commission Value</span>
                  <div className="font-serif text-2xl font-bold text-[#C5A880] mt-1">$5,820</div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">High couture bracket</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block uppercase text-[10px]">Top Patron Origin</span>
                  <div className="font-serif text-2xl font-bold text-white mt-1">London & Paris</div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">42% of inquiries</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ATELIER PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="bg-[#1C1C1C] p-6 md:p-8 rounded-2xl border border-zinc-800 space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="font-serif text-3xl font-medium text-white">Atelier Profile Settings</h2>
                <p className="text-xs text-zinc-400 mt-1">Update your public biography, location, and credentials</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Atelier Location
                    </label>
                    <input
                      type="text"
                      value={profileLocation}
                      onChange={(e) => setProfileLocation(e.target.value)}
                      className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Years of Experience / Atelier Pedigree
                  </label>
                  <input
                    type="text"
                    value={profileExperience}
                    onChange={(e) => setProfileExperience(e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Biography & Creative Philosophy
                  </label>
                  <textarea
                    rows={4}
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-white text-black px-6 py-3 rounded-xl font-semibold uppercase tracking-wider transition-colors"
                >
                  Save Profile Updates
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
