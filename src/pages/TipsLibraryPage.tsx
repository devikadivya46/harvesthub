import React from 'react';
import { Search, ChevronRight, Volume2, Star, Clock } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';

export const TipsLibraryPage: React.FC = () => {
  const articles = [
    { title: 'Natural Fertilizer Prep', time: '5 min read', category: 'Organic', image: 'https://images.unsplash.com/photo-1592911299951-e5f884633211?auto=format&fit=crop&q=80&w=400' },
    { title: 'Drip Irrigation Basics', time: '8 min read', category: 'Irrigation', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400' },
    { title: 'Companion Planting', time: '6 min read', category: 'Soil Health', image: 'https://images.unsplash.com/photo-1622383529984-754f9a562867?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="min-h-screen pt-20 px-6 flex flex-col gap-8 max-w-2xl mx-auto pb-40">
      <Header title="Knowledge" showBack />

      {/* Editorial Header */}
      <section className="flex flex-col gap-2">
         <h2 className="text-3xl font-display font-black text-agri-primary tracking-tighter uppercase">Agri-Intelligence</h2>
         <p className="text-sm font-medium text-zinc-500 uppercase tracking-tight">Curated insights from global agricultural laboratories.</p>
      </section>

      {/* Feature Search */}
      <section>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-agri-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Query library..." 
            className="w-full h-14 pl-12 pr-4 bg-white border border-agri-border rounded-2xl text-sm font-bold focus:ring-2 focus:ring-agri-accent/20 outline-none transition-all shadow-sm"
          />
        </div>
      </section>

      {/* Filter Matrix */}
      <section className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
        {['Latest', 'Soil Health', 'Irrigation', 'Bio-Control', 'Harvesting'].map((cat, i) => (
          <button 
            key={cat}
            className={cn(
              "px-5 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all border",
              i === 0 ? "bg-agri-accent text-white border-agri-accent shadow-lg shadow-agri-accent/20" : "bg-white text-zinc-500 border-agri-border hover:border-agri-accent"
            )}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Hero Insight */}
      <section className="flex flex-col gap-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Curated Selection</h3>
        <div className="bg-white border border-agri-border rounded-[2.5rem] overflow-hidden shadow-xl shadow-agri-primary/5 hover:border-agri-accent transition-all group cursor-pointer">
           <div className="relative h-56 overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://images.unsplash.com/photo-1560493676-04071c5f4b52?auto=format&fit=crop&q=80&w=600" 
                alt="Expert recommendation" 
              />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                 <div className="bg-agri-primary/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20">Essential Reading</div>
              </div>
           </div>
           <div className="p-8">
              <h4 className="text-2xl font-display font-black text-zinc-800 uppercase tracking-tighter mb-2 group-hover:text-agri-primary transition-colors">Precision Soil Diagnostics</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed line-clamp-2">Learn techniques to balance microbial activity with mineral supplements for 30% yield optimization.</p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-agri-surface">
                 <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-agri-accent" />
                    <span className="text-[10px] font-black uppercase text-zinc-400">12m Read</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Volume2 className="w-3 h-3 text-agri-primary" />
                    <span className="text-[10px] font-black uppercase text-agri-primary">Listen Audio</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Article Feed */}
      <section className="flex flex-col gap-4 pb-12">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Research Papers</h3>
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article, i) => (
            <div key={i} className="bg-white border border-agri-border p-4 rounded-3xl flex items-center gap-5 hover:border-agri-primary transition-all group cursor-pointer shadow-sm">
               <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black text-agri-accent uppercase tracking-widest">{article.category}</span>
                  <h4 className="text-lg font-display font-black text-zinc-800 uppercase tracking-tighter truncate leading-tight group-hover:text-agri-primary transition-colors">{article.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{article.time}</span>
                     <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-1 group-hover:text-agri-primary transition-all" />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
