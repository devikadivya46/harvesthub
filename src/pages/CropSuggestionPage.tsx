import React, { useState } from 'react';
import { Leaf, Lightbulb, Calendar, BrainCircuit, Loader2, ChevronRight } from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';

interface Suggestion {
  name: string;
  suitability: string;
  detail: string;
  sowingTime: string;
}

export const CropSuggestionPage: React.FC = () => {
  const [ph, setPh] = useState(6.5);
  const [soilType, setSoilType] = useState('loamy');
  const [hasBorewell, setHasBorewell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/crop-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ph, soilType, hasBorewell })
      });
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-40">
      <Header title="Crop Suggestion" showBack />

      {/* Header Info */}
      <section className="mt-2">
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight">AI Advisory</h2>
        <p className="text-sm font-medium text-zinc-500 mt-1">Personalized crop recommendations based on your soil.</p>
      </section>

      {/* Input Module */}
      <section className="bg-white border border-agri-border rounded-[2rem] p-6 shadow-sm flex flex-col gap-6">
        {/* pH Control */}
        <div className="flex flex-col gap-4">
           <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-zinc-500">Soil pH Level</span>
              <span className="text-2xl font-black text-agri-primary">{ph}</span>
           </div>
           <input 
            type="range" 
            min="4" 
            max="10" 
            step="0.1" 
            value={ph} 
            onChange={(e) => setPh(parseFloat(e.target.value))}
            className="w-full h-2 bg-agri-surface rounded-full appearance-none cursor-pointer accent-agri-primary" 
           />
           <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
             <span>Acidic</span>
             <span>Neutral</span>
             <span>Alkaline</span>
           </div>
        </div>

        {/* Soil Type Select */}
        <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-zinc-500 px-1">Soil Type</label>
           <div className="grid grid-cols-2 gap-2">
              {['Loamy', 'Black', 'Red', 'Sandy'].map(type => (
                <button
                  key={type}
                  onClick={() => setSoilType(type.toLowerCase())}
                  className={cn(
                    "h-12 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all",
                    soilType === type.toLowerCase() 
                      ? "bg-agri-primary text-white border-agri-primary shadow-md shadow-emerald-900/10" 
                      : "bg-white text-zinc-400 border-agri-border"
                  )}
                >
                  {type}
                </button>
              ))}
           </div>
        </div>

        {/* Water Source Toggle */}
        <button 
          onClick={() => setHasBorewell(!hasBorewell)}
          className={cn(
            "w-full h-14 border rounded-2xl px-5 flex items-center justify-between transition-all",
            hasBorewell ? "bg-[#E3F2FD] border-[#BBDEFB] text-[#1976D2]" : "bg-white border-agri-border text-zinc-500"
          )}
        >
           <span className="text-xs font-black uppercase tracking-widest">Borewell Available</span>
           <div className={cn(
             "w-6 h-6 rounded-full border-2 flex items-center justify-center",
             hasBorewell ? "border-[#1976D2] bg-[#1976D2]" : "border-zinc-200"
           )}>
             {hasBorewell && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
           </div>
        </button>

        <button 
          disabled={loading}
          onClick={handleSuggest}
          className="w-full h-14 bg-agri-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-900/10 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Analyze & Suggest"
          )}
        </button>
      </section>

      {/* Output Feed */}
      {(suggestions.length > 0 || loading) && (
        <section className="flex flex-col gap-4">
          <h3 className="text-base font-black text-zinc-800 tracking-tight px-1">Best Matches</h3>
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="h-40 rounded-3xl bg-zinc-50 animate-pulse" />
            ) : (
              suggestions.map((crop, i) => (
                <div key={i} className="bg-white border border-agri-border p-5 rounded-3xl flex items-center gap-4 hover:border-agri-accent transition-all shadow-sm">
                   <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Leaf className="w-7 h-7" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">{crop.suitability} Match</span>
                      </div>
                      <h4 className="text-lg font-black text-zinc-800 tracking-tight">{crop.name}</h4>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5 leading-relaxed">{crop.detail}</p>
                   </div>
                   <ChevronRight className="w-5 h-5 text-zinc-300" />
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
};
