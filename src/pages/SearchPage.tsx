import React, { useState } from 'react';
import { Search, ArrowLeft, TrendingUp, History, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Base';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  const recentSearches = ['Wheat Intelligence', 'Tomato Diagnostic', 'Watering Matrix', 'Organic Catalyst'];
  const trendingSearches = ['Monsoon Projection', 'Hybrid Corn Seeds', 'PM-Kisan Hub', 'Yield Optimization'];

  const results = query ? [
    { type: 'Intel', title: 'Wheat Quality Grade A', subtitle: 'Regional Mandi Hub - ₹2,450/q', icon: 'trending_up' },
    { type: 'Bio', title: 'Leaf Rust Prevention', subtitle: 'Pathogen Analysis', icon: 'bug_report' },
    { type: 'Flora', title: 'Basmati Rice Cycles', subtitle: 'Optimal Sowing Matrix', icon: 'grass' },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="min-h-screen bg-agri-surface pb-40">
      {/* Neural Search Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-agri-border px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center bg-agri-surface rounded-2xl hover:bg-agri-primary hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-agri-primary transition-colors" />
          <input 
            autoFocus
            type="text"
            placeholder="Query knowledge base..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-12 bg-agri-surface/50 border border-agri-border rounded-2xl font-bold text-zinc-900 focus:ring-2 focus:ring-agri-accent/20 outline-none transition-all placeholder:text-zinc-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-zinc-200 rounded-full hover:bg-agri-primary hover:text-white transition-all"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </header>

      <div className="pt-28 px-6 space-y-10">
        <AnimatePresence mode="wait">
          {!query ? (
            <motion.div 
              key="static"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* History Loop */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2 px-1">
                  <History className="w-4 h-4 text-agri-accent" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Recall Sequence</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button 
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-5 py-3 bg-white border border-agri-border rounded-2xl text-[11px] font-black uppercase tracking-widest text-zinc-600 hover:border-agri-primary hover:text-agri-primary hover:bg-agri-surface transition-all shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              {/* Pulse Feed */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2 px-1">
                  <TrendingUp className="w-4 h-4 text-agri-primary" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Global Trends</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {trendingSearches.map((s, i) => (
                    <button 
                      key={s}
                      onClick={() => setQuery(s)}
                      className="w-full flex items-center justify-between p-5 bg-white border border-agri-border rounded-3xl hover:border-agri-primary hover:bg-agri-surface transition-all group shadow-sm active:scale-[0.98]"
                    >
                      <span className="font-display font-black text-zinc-800 uppercase tracking-tight">{s}</span>
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black text-white px-2 py-1 bg-agri-accent rounded-lg shadow-lg shadow-agri-accent/20">HOT</span>
                         <span className="text-[10px] font-black text-zinc-300">#{i+1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Filtered Matrix: "{query}"</h3>
                 <span className="text-[10px] font-black text-agri-primary uppercase">{results.length} Nodes</span>
              </div>
              
              {results.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {results.map((r, i) => (
                    <div key={i} className="bg-white border border-agri-border p-5 rounded-[2.5rem] flex items-center gap-5 group cursor-pointer hover:border-agri-primary transition-all shadow-sm active:scale-98">
                      <div className="w-16 h-16 bg-agri-surface rounded-2xl flex items-center justify-center text-agri-primary group-hover:bg-agri-primary group-hover:text-white transition-all shadow-inner">
                        <span className="material-symbols-outlined text-3xl">{r.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-agri-accent mb-0.5">{r.type}</p>
                        <h4 className="font-display font-black text-xl text-zinc-800 uppercase tracking-tighter leading-tight">{r.title}</h4>
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mt-1">{r.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-32 h-32 bg-agri-surface rounded-[3rem] flex items-center justify-center text-zinc-200 mb-6 shadow-inner animate-pulse">
                    <Search className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-zinc-800 uppercase tracking-tighter">Null Result</h3>
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mt-2 max-w-[240px]">Reconfigure query parameters for expanded search horizon.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;
