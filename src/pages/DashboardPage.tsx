import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, MapPin, Bug, TrendingUp, ChevronRight, 
  Receipt, Camera, Heart, Briefcase, Shovel, Trees, Leaf, Cloud, CloudRain, CloudLightning, Loader2,
  Sprout, Moon
} from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';

interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  isDemo: boolean;
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'Ramesh';

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const fetchWeather = async () => {
      try {
        const userLocation = user.location || 'Pune';
        const response = await fetch(`/api/weather?city=${encodeURIComponent(userLocation)}`);
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const formattedTime = currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-40">
      <Header />
      
      {/* Greeting Section */}
      <section className="mt-2 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight">
            Namaste, {userName}!
          </h1>
          <p className="text-sm font-medium text-zinc-500 mt-1 italic opacity-80">Welcome back to your farm dashboard.</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-display font-black text-agri-primary leading-none uppercase tracking-tighter">
            {formattedTime}
          </p>
          <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest leading-none">
            {formattedDate}
          </p>
        </div>
      </section>

      {/* Main Weather Card */}
      <section className="relative">
        <div className="bg-white border border-agri-border p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
          {/* Decorative Grid Line */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{weather?.location || 'Pune Network Hub'}</span>
              </div>
              {weather?.isDemo && (
                <span className="text-[8px] font-black bg-zinc-100 text-zinc-400 px-2 py-1 rounded-full uppercase tracking-tighter">Simulation Mode</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-display font-black text-agri-primary tracking-tighter leading-none">
                  {loadingWeather ? '--' : `${weather?.temp || 32}°`}
                </span>
                <span className="text-xl font-display font-black text-zinc-300">C</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-zinc-800 uppercase tracking-tight">
                  {weather?.condition || 'Clear Sky'}
                </p>
                <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-[0.2em] leading-none">Hydrometric: 42%</p>
              </div>
            </div>

            {/* Advisory Alert */}
            <div className="bg-agri-secondary/30 border border-agri-primary/10 p-4 rounded-2xl flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-agri-primary text-white flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-agri-primary uppercase tracking-widest leading-none mb-1">Agricultural Advisory</p>
                 <p className="text-xs font-bold text-zinc-600">Optimal thermal window for Kharif irrigation detected.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Bento Grid */}
      <section className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => navigate('/crop-suggestion')}
          className="flex flex-col items-center justify-center gap-3 bg-agri-primary p-4 py-8 rounded-3xl text-white active:scale-95 transition-all shadow-md shadow-emerald-900/10"
        >
          <Sprout className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest text-center leading-none">Crop <br/>Advisory</span>
        </button>

        <button 
          onClick={() => navigate('/scan')}
          className="flex flex-col items-center justify-center gap-3 bg-white border border-agri-border p-4 py-8 rounded-3xl text-agri-primary active:scale-95 transition-all shadow-sm"
        >
          <Bug className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest text-center leading-none">Diagnostics</span>
        </button>

        <button 
          onClick={() => navigate('/market')}
          className="flex flex-col items-center justify-center gap-3 bg-agri-accent p-4 py-8 rounded-3xl text-white active:scale-95 transition-all shadow-md shadow-emerald-900/10"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest text-center leading-none">Market <br/>Intel</span>
        </button>
      </section>

      {/* Explore Categories */}
      <section className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-end px-1">
           <h3 className="text-base font-black text-zinc-800 tracking-tight">Explore Categories</h3>
           <button className="text-xs font-bold text-agri-primary">View All</button>
        </div>

        {/* Featured Tip Card */}
        <div className="relative group cursor-pointer overflow-hidden rounded-3xl h-48 border border-agri-border">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&q=80&w=600" 
            alt="Tractor" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
             <h4 className="text-lg font-black text-white hover:underline">Farming Tips</h4>
             <p className="text-xs text-white/80 font-medium font-serif italic mt-0.5">Boost your yield today</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Livestock', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400' },
            { label: 'Dairy', image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=400' },
            { label: 'Gardening', image: 'https://images.unsplash.com/photo-1416870230247-d0e99dfa0194?auto=format&fit=crop&q=80&w=400' },
            { label: 'Infrastructure', image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=400' },
          ].map((cat, i) => (
            <div key={i} className="relative h-28 rounded-2xl overflow-hidden border border-agri-border group active:scale-[0.98] transition-all">
               <img className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" src={cat.image} alt={cat.label} />
               <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                  <span className="text-xs font-black text-white uppercase tracking-tight">{cat.label}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transaction */}
      <section className="flex flex-col gap-4 mb-10">
        <h3 className="text-base font-black text-zinc-800 tracking-tight px-1">Recent Transaction</h3>
        <div className="bg-white border border-agri-border rounded-3xl p-5 shadow-sm">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#F1F8E9] rounded-xl flex items-center justify-center text-agri-primary">
                 <Receipt className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                 <h4 className="text-sm font-black text-zinc-800 truncate uppercase">Crop Analysis Premium</h4>
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">24 Oct, 2023 • 02:45 PM</p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-black text-zinc-800 tracking-tight">₹1,473.82</p>
              </div>
           </div>
           
           <button className="w-full h-12 border border-agri-border rounded-2xl text-[11px] font-black text-agri-primary uppercase tracking-widest hover:bg-agri-surface transition-all active:scale-95">
              Manage Payments
           </button>
        </div>
      </section>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/scan')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-agri-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-900/20 active:scale-90 transition-all z-[100]"
      >
        <Camera className="w-7 h-7" />
      </button>
    </div>
  );
};
