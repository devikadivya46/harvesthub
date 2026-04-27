import React, { useState } from 'react';
import { MapPin, Search, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';

export const MarketPricesPage: React.FC = () => {
  const [selectedCategory, setSelectedSelectedCategory] = useState('All');

  const crops = [
    { name: 'Wheat (Kanak)', mandi: 'Azadpur Mandi', price: '2,450', change: '+₹45', status: 'up' },
    { name: 'Basmati Rice', mandi: 'Azadpur Mandi', price: '4,200', change: 'Stable', status: 'stable' },
    { name: 'Onion (Nashik)', mandi: 'Azadpur Mandi', price: '1,850', change: '-₹120', status: 'down' },
    { name: 'Cotton (Kapas)', mandi: 'Azadpur Mandi', price: '7,100', change: '+₹200', status: 'up' },
    { name: 'Soybean', mandi: 'Azadpur Mandi', price: '5,400', change: 'Stable', status: 'stable' },
  ];

  const categories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Spices'];

  return (
    <div className="pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-32">
      <Header title="Market Prices" showBack />

      {/* Mandi Selector */}
      <section>
        <Card className="flex flex-col gap-2 !p-6">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Select Delivery Hub</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-zinc-400" />
            </div>
            <select className="w-full h-14 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-2xl font-bold text-zinc-900 focus:ring-2 focus:ring-zinc-900 outline-none appearance-none transition-all cursor-pointer hover:bg-zinc-100">
              <option>Azadpur Mandi, Delhi</option>
              <option>Vashi APMC, Mumbai</option>
              <option>Koyambedu, Chennai</option>
              <option>Sardarganj Mandi, Gujarat</option>
              <option>Gultekdi Mandi, Pune</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-zinc-400">expand_more</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Market Trends Banner - Zinc Style */}
      <section>
        <div className="relative overflow-hidden rounded-[2rem] h-32 bg-zinc-900 text-white flex items-center px-8 shadow-xl border border-zinc-800">
          <div className="z-10 relative max-w-[70%]">
            <h2 className="text-xl font-bold leading-tight mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Price Rally
            </h2>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Grains have surged by 4.2% in northern hubs today.</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
            <img 
              className="object-cover h-full w-full opacity-20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC18rIy7Xr-TociFJRu47bKJWqT9cnhivhS7gfLmDsub0Q9fTniCvORtH-xZy9Uu_cuO-EnViy_knRxDpfO0MgkQI3DEKBbhfZkSItv5kji3nTFPxSsxokriwVY976AXvzHuReptmcBeW6UMsgpgG87K2sU5ZPsWR2Vnl0qavFfl9YAvoOpssrbhsdYuMgP1WxEO5DkgjCbbF4cCqNlBRtOU7nKFZJveoWeCn7Kn_DLfceObU1RRYzVFHtnB49J8RS7unH8sIDcEw0N" 
              alt="Wheat Field" 
            />
            <div className="absolute inset-0 bg-gradient-to-l from-zinc-900 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Filter Chips - Zinc Style */}
      <section className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedSelectedCategory(cat)}
            className={cn(
              "px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest whitespace-nowrap active:scale-95 transition-all shadow-sm border",
              selectedCategory === cat 
                ? "bg-zinc-900 text-white border-zinc-900" 
                : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
            )}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Live Prices List */}
      <section className="space-y-4">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">Live Tracker</h3>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded-full">Updated 10m ago</span>
        </div>

        {crops.map((crop, i) => (
          <Card key={i} className="flex items-center gap-4 py-6 pr-8 border-zinc-200 hover:border-zinc-400 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
               <span className="material-symbols-outlined text-3xl font-light">
                 {crop.name.includes('Wheat') ? 'grass' : 
                  crop.name.includes('Rice') ? 'eco' : 
                  crop.name.includes('Onion') ? 'nutrition' : 
                  crop.name.includes('Cotton') ? 'potted_plant' : 'psychiatry'}
               </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-zinc-900 truncate">{crop.name}</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">{crop.mandi}</p>
            </div>
            <div className="text-right shrink-0">
              <div className={cn(
                "text-2xl font-black tracking-tighter",
                crop.status === 'up' ? 'text-emerald-600' : crop.status === 'down' ? 'text-red-600' : 'text-zinc-900'
              )}>₹{crop.price}</div>
              <div className={cn(
                "flex items-center justify-end gap-1 font-bold text-[10px] uppercase tracking-widest",
                crop.status === 'up' ? 'text-emerald-500' : crop.status === 'down' ? 'text-red-500' : 'text-zinc-400'
              )}>
                {crop.status === 'up' ? <TrendingUp className="w-3 h-3" /> : 
                 crop.status === 'down' ? <TrendingDown className="w-3 h-3" /> : 
                 <Minus className="w-3 h-3" />}
                {crop.change}
              </div>
            </div>
          </Card>
        ))}
      </section>

      <Button fullWidth variant="primary" className="h-16 font-black uppercase tracking-widest text-xs rounded-2xl mt-4">
        <span className="material-symbols-outlined text-xl">analytics</span>
        Weekly Forecast Report
      </Button>
    </div>
  );
};
