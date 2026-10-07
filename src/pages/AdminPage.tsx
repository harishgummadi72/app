import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Sparkles,
  Trash2,
  CheckCircle,
  Eye,
  Layers,
  Users,
  BarChart,
  Search
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    designs,
    allUsers,
    toggleFeatureDesign,
    deleteDesign,
    setSelectedDesignId,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'curation' | 'users' | 'metrics'>('curation');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredDesigns = designs.filter((d) =>
    d.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.designerName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-10 pb-28 font-sans text-[#111111]">
      {/* Header */}
      <div className="bg-[#111111] text-white p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#C5A880] text-xs uppercase tracking-widest font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Curatorial Council & Moderation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium">
            Atelier Véra Editorial Console
          </h1>
          <p className="text-xs text-zinc-400">
            Control platform drops, featured showcases, designer verifications, and quality curation.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('curation')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'curation' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Design Curation ({designs.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'users' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ateliers & Patrons ({allUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'metrics' ? 'bg-[#C5A880] text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Global Analytics
          </button>
        </div>
      </div>

      {/* TAB 1: CURATION & FEATURE DROPS */}
      {activeTab === 'curation' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-medium">
              Archive Registry & Feature Allocation
            </h3>

            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by title or designer..."
                className="bg-[#EFECE6] border border-[#DDD6C8] rounded-xl px-4 py-2 text-xs text-black focus:outline-none focus:border-black w-64"
              />
            </div>
          </div>

          <div className="bg-[#EFECE6] rounded-2xl border border-[#DDD6C8] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#DDD6C8]/60 text-zinc-600 uppercase tracking-wider text-[10px] font-bold border-b border-[#DDD6C8]">
                <tr>
                  <th className="p-4">Creation</th>
                  <th className="p-4">Couturier</th>
                  <th className="p-4">Discipline</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD6C8]">
                {filteredDesigns.map((design) => (
                  <tr key={design.id} className="hover:bg-white/60 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={design.coverImage}
                        alt={design.title}
                        className="w-10 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold text-black line-clamp-1">{design.title}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">ID: {design.id}</div>
                      </div>
                    </td>

                    <td className="p-4 font-medium text-zinc-800">
                      {design.designerName}
                    </td>

                    <td className="p-4">
                      <span className="bg-white px-2.5 py-1 rounded-full border border-[#DDD6C8] text-[10px] font-medium">
                        {design.category}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-semibold">
                      ${design.price?.toLocaleString()}
                    </td>

                    <td className="p-4">
                      {design.isFeatured ? (
                        <span className="bg-[#111111] text-[#C5A880] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 w-fit">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured Drop</span>
                        </span>
                      ) : (
                        <span className="text-zinc-500 text-[10px] uppercase">Standard Archive</span>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedDesignId(design.id)}
                        className="p-1.5 rounded-lg hover:bg-zinc-300 text-zinc-700"
                        title="Examine Full Piece"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleFeatureDesign(design.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-colors ${
                          design.isFeatured
                            ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-900'
                            : 'bg-[#111111] text-[#C5A880] hover:bg-black'
                        }`}
                      >
                        {design.isFeatured ? 'Unfeature' : 'Feature Piece'}
                      </button>

                      <button
                        onClick={() => deleteDesign(design.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600"
                        title="Remove Design"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USER DIRECTORY */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUsers.map((u) => (
            <div key={u.id} className="bg-[#EFECE6] p-5 rounded-2xl border border-[#DDD6C8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover border border-[#C5A880]" />
                <div>
                  <h4 className="font-serif text-lg font-medium">{u.name}</h4>
                  <p className="text-[11px] text-zinc-500 capitalize">{u.role} • {u.location}</p>
                </div>
              </div>
              <span className="text-[10px] bg-black text-[#F8F6F0] px-2 py-0.5 rounded-full font-bold uppercase">
                {u.role}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PLATFORM METRICS */}
      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-[#EFECE6] p-6 rounded-2xl border border-[#DDD6C8] space-y-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">Global Archive Views</span>
            <div className="font-serif text-3xl font-bold text-black">684,200</div>
            <p className="text-[11px] text-emerald-700">+28% growth over last quarter</p>
          </div>

          <div className="bg-[#EFECE6] p-6 rounded-2xl border border-[#DDD6C8] space-y-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">Total Inquiries & Commissions</span>
            <div className="font-serif text-3xl font-bold text-black">$418,000</div>
            <p className="text-[11px] text-emerald-700">Facilitated direct to ateliers without commissions taken</p>
          </div>

          <div className="bg-[#EFECE6] p-6 rounded-2xl border border-[#DDD6C8] space-y-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">Accredited Ateliers</span>
            <div className="font-serif text-3xl font-bold text-black">48 Verified</div>
            <p className="text-[11px] text-zinc-600">Representing 14 haute couture capitals</p>
          </div>
        </div>
      )}
    </div>
  );
};
