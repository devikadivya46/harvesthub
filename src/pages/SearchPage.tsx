import React, { useState } from 'react';
import { Search, ArrowLeft, TrendingUp, History, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Base';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  const recentSearches = ['Wheat Prices', 'Tomato Pest', 'Soil Moisture', 'Organic Urea'];
  const trendingSearches = ['Monsoon Forecast', 'Hybrid Corn Seeds', 'Kisan Credit Card', 'PM-Kisan Status'];

  const results = query ? [
    { type: 'Market', title: 'Wheat Quality Grade A', subtitle: 'Azadpur Mandi - ₹2,450/q', icon: 'trending_up' },
    { type: 'Pest', title: 'Leaf Rust Prevention', subtitle: 'Agricultural Guide', icon: 'bug_report' },
    { type: 'Crop', title: 'Basmati Rice Sowing', subtitle: 'Best Practices', icon: 'grass' },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Search Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-zinc-900" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input 
            autoFocus
            type="text"
            placeholder="Search crops, pests, or mandis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-11 bg-zinc-100 border-none rounded-2xl font-bold text-zinc-900 focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          )}
        </div>
      </header>

      <div className="pt-24 px-4 space-y-8">
        <AnimatePresence mode="wait">
          {!query ? (
            <motion.div 
              key="static"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Recent Searches */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-4 h-4 text-zinc-400" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Recently Searched</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button 
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              {/* Trending */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-zinc-400" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Trending Now</h3>
                </div>
                <div className="space-y-3">
                  {trendingSearches.map((s, i) => (
                    <button 
                      key={s}
                      onClick={() => setQuery(s)}
                      className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-900 hover:border-zinc-900 hover:text-white transition-all group"
                    >
                      <span className="font-bold text-sm tracking-tight">{s}</span>
                      <span className="text-[10px] font-black text-zinc-400 group-hover:text-zinc-500 px-2 py-0.5 bg-zinc-100 rounded-lg">#{i+1}</span>
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
              className="space-y-4"
            >
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Results for "{query}"</h3>
              {results.length > 0 ? (
                results.map((r, i) => (
                  <Card key={i} className="flex items-center gap-4 py-5 pr-8 group cursor-pointer hover:border-zinc-900 transition-all">
                    <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-3xl font-light">{r.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">{r.type}</p>
                      <h4 className="font-bold text-lg text-zinc-900 tracking-tight">{r.title}</h4>
                      <p className="text-xs font-bold text-zinc-500">{r.subtitle}</p>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-zinc-100 rounded-[2rem] flex items-center justify-center text-zinc-300 mx-auto mb-4">
                    <Search className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 tracking-tighter">No results found</h3>
                  <p className="text-sm text-zinc-500 font-medium max-w-[200px] mx-auto mt-2">Try searching with broader terms like 'Rice' or 'Fertilizer'.</p>
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
