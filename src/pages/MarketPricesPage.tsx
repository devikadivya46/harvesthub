import React, { useState, useEffect } from 'react';
import { MapPin, Search, ChevronRight, TrendingUp, TrendingDown, Minus, Loader2, X } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CropPrice {
  name: string;
  mandi: string;
  price: string;
  change: string;
  status: string;
}

export const MarketPricesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMandi, setSelectedMandi] = useState('All India (Latest)');
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<string | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFallback, setIsFallback] = useState(false);

  const getCategory = (name: string): string => {
    const n = name.toLowerCase();
    const categoriesMap: { [key: string]: string[] } = {
      'Vegetables': ['onion', 'potato', 'tomato', 'brinjal', 'cauliflower', 'cabbage', 'cucumber', 'carrot', 'radish', 'gourd', 'bhindi', 'okra', 'peas', 'lemon', 'bitter', 'bottle', 'capsicum', 'drumstick', 'garlic', 'chilli', 'ginger', 'beans', 'pumpkin', 'raddish', 'beetroot', 'tinda', 'peas', 'coriander', 'mint', 'methi', 'spinach', 'arvi', 'colocasia', 'yam'],
      'Grains': ['wheat', 'rice', 'paddy', 'maize', 'jowar', 'bajra', 'ragi', 'gram', 'arhar', 'tur', 'moong', 'urad', 'masoor', 'soyabean', 'mustard', 'sesamum', 'lentil', 'millet', 'barley', 'groundnut', 'corn', 'sunflower', 'canola', 'dhal', 'pulses', 'mung'],
      'Fruits': ['apple', 'banana', 'mango', 'orange', 'grape', 'papaya', 'pomegranate', 'guava', 'watermelon', 'pineapple', 'mosambi', 'lime', 'grapes', 'sapota', 'pear', 'plum', 'kiwi', 'musk', 'melon', 'custard', 'litchi', 'strawberry'],
      'Spices': ['turmeric', 'cumin', 'cardamom', 'pepper', 'coriander', 'fennel', 'clove', 'ajwain', 'isabgol', 'tamarind', 'methi', 'suva', 'cinnamon', 'jeera', 'dry', 'chillies', 'nutmeg', 'mace', 'aniseed']
    };
    for (const [cat, keywords] of Object.entries(categoriesMap)) {
      if (keywords.some(k => n.includes(k))) return cat;
    }
    return 'Other';
  };

  const filteredCrops = crops.filter(crop => {
    const matchesCategory = selectedCategory === 'All' || getCategory(crop.name) === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchText.toLowerCase()) || 
                         crop.mandi.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fetchPrices = async () => {
    setLoading(true);
    try {
      let url = '/api/market-prices';
      if (selectedMandi !== 'All India (Latest)') {
        const mandiParts = selectedMandi.split(', ');
        const marketName = mandiParts[0].replace(' Mandi', '').replace(' APMC', '');
        const stateName = mandiParts[1];
        url += `?market=${encodeURIComponent(marketName)}&state=${encodeURIComponent(stateName)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error && !data.isFallback) {
        setError(data.error);
        setCrops([]);
        setIsFallback(false);
      } else {
        setError(null);
        setCrops(data.records || data);
        setIsFallback(!!data.isFallback);
      }
    } catch (err: any) {
      setError('Connection error. Using predictive pricing.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [selectedMandi]);

  const getForecast = async () => {
    if (crops.length === 0) return;
    setLoadingForecast(true);
    setShowForecast(true);
    try {
      const response = await fetch('/api/market-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crops })
      });
      const data = await response.json();
      setForecast(data.forecast);
    } catch (err: any) {
      setForecast('### ⚠️ Forecast System Offline\n\nPlease check your internet connection or API settings.');
    } finally {
      setLoadingForecast(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 flex flex-col gap-6 max-w-2xl mx-auto pb-40">
      <Header title="Market Intelligence" showBack />

      {/* Hero Stats Card */}
      <section className="bg-agri-primary rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-agri-primary/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
             <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
                <TrendingUp className="w-4 h-4 text-white" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Live Market Overview</span>
          </div>
          <div className="flex justify-between items-end">
             <div>
                <p className="text-3xl font-display font-black tracking-tight">Agri-Hub</p>
                <p className="text-sm text-white/70 font-medium">{selectedMandi.split(',')[0]}</p>
             </div>
             <button 
              onClick={getForecast}
              className="bg-white text-agri-primary px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-agri-accent hover:text-white transition-all shadow-sm active:scale-95"
             >
                Get AI Forecast
             </button>
          </div>
        </div>
      </section>

      {/* Select Location Scroller */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Select Active Mandi</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['All India (Latest)', 'Azadpur Mandi, Delhi', 'Vashi APMC, Mumbai', 'Koyambedu, Tamil Nadu', 'Indore APMC, Madhya Pradesh', 'Gultekdi Mandi, Maharashtra'].map(m => (
            <button
              key={m}
              onClick={() => setSelectedMandi(m)}
              className={cn(
                "px-5 py-3 rounded-2xl whitespace-nowrap text-xs font-bold transition-all border shrink-0 shadow-sm",
                selectedMandi === m 
                  ? "bg-agri-primary text-white border-agri-primary" 
                  : "bg-white text-zinc-500 border-agri-border hover:border-agri-accent"
              )}
            >
              {m.split(',')[0]}
            </button>
          ))}
        </div>
      </section>
      
      {/* Search & Filter */}
      <section className="flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search crop or grade..." 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white border border-agri-border rounded-2xl text-sm font-medium focus:ring-2 focus:ring-agri-accent/20 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Grains', 'Vegetables', 'Fruits', 'Spices'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border",
                selectedCategory === cat 
                  ? "bg-agri-accent text-white border-agri-accent" 
                  : "bg-agri-surface text-zinc-400 border-agri-border"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Prices List */}
      <section className="flex flex-col gap-3 min-h-[400px]">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4 opacity-50">
             <div className="w-12 h-12 border-4 border-agri-border border-t-agri-primary rounded-full animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Synchronizing Live Data</p>
          </div>
        ) : error ? (
           <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center">
              <p className="text-red-600 font-bold text-sm">{error}</p>
              <button onClick={fetchPrices} className="mt-4 text-xs font-black uppercase tracking-widest text-red-500 underline">Retry Connection</button>
           </div>
        ) : filteredCrops.length > 0 ? (
          filteredCrops.map((crop, i) => (
            <div key={i} className="bg-white border border-agri-border p-4 rounded-2xl flex items-center gap-4 hover:border-agri-accent transition-all group cursor-pointer shadow-sm">
               <div className="w-12 h-12 rounded-xl bg-agri-surface flex items-center justify-center text-agri-primary group-hover:bg-agri-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">
                    {crop.name.toLowerCase().includes('wheat') ? 'grass' : 
                     crop.name.toLowerCase().includes('rice') || crop.name.toLowerCase().includes('paddy') ? 'eco' : 
                     crop.name.toLowerCase().includes('onion') || crop.name.toLowerCase().includes('potato') || crop.name.toLowerCase().includes('tomato') ? 'nutrition' : 'psychiatry'}
                  </span>
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-display font-black text-zinc-800 truncate leading-tight uppercase tracking-tight">{crop.name.split('(')[0]}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{crop.mandi.split(',')[0]} / {crop.state || 'Local'}</p>
               </div>
               <div className="text-right">
                  <p className="text-lg font-display font-black text-agri-primary">₹{crop.price}</p>
                  <div className={cn(
                    "flex items-center justify-end gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-lg border",
                    crop.status === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    crop.status === 'down' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-zinc-50 text-zinc-400 border-zinc-100'
                  )}>
                    {crop.status === 'up' ? '↗' : crop.status === 'down' ? '↘' : '—'} 
                    <span>{crop.status === 'neutral' ? 'STABLE' : 'WATCH'}</span>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-30 grayscale">
             <span className="material-symbols-outlined text-6xl">search_off</span>
             <p className="text-xs font-bold mt-4">No results found for your filters</p>
          </div>
        )}
      </section>

      {/* Forecast Modal */}
      {showForecast && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto px-6 py-12 flex flex-col">
           <div className="flex justify-between items-center mb-8 border-b border-agri-border pb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-agri-primary text-white flex items-center justify-center shadow-lg shadow-agri-primary/20">
                    <TrendingUp className="w-6 h-6" />
                 </div>
                 <h2 className="text-xl font-display font-black text-agri-primary uppercase">Market Forecast</h2>
              </div>
              <button 
                onClick={() => setShowForecast(false)}
                className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center"
              >
                 <X className="w-5 h-5 text-zinc-500" />
              </button>
           </div>
           
           {loadingForecast ? (
             <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 border-4 border-agri-surface border-t-agri-accent rounded-full animate-spin" />
                <div className="text-center">
                   <p className="text-lg font-display font-black text-zinc-800 uppercase">Generating Report</p>
                   <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Analyzing historical patterns...</p>
                </div>
             </div>
           ) : (
             <div className="flex-1">
                <div className="markdown-body">
                   <Markdown remarkPlugins={[remarkGfm]}>{forecast}</Markdown>
                </div>
                <button 
                  onClick={() => setShowForecast(false)}
                  className="w-full h-14 bg-agri-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs mt-12 mb-8 shadow-xl"
                >
                  Close Analysis
                </button>
             </div>
           )}
        </div>
      )}
    </div>
  );
};
