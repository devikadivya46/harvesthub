import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Phone, MapPin, Edit3, Settings, Languages, Bell, 
  HelpCircle, Shield, LogOut, ChevronRight, Sprout, TrendingUp 
} from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';
import { cn } from '../lib/utils';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen pt-20 px-6 flex flex-col gap-8 max-w-2xl mx-auto pb-40">
      <Header title="Identity" showBack />

      {/* Identity Core */}
      <section className="flex flex-col items-center text-center gap-6 py-4">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[3rem] overflow-hidden bg-agri-surface ring-4 ring-white shadow-2xl relative z-10">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1542013985851-9e797e8890ae?auto=format&fit=crop&q=80&w=400" 
              alt="Ramesh Patil" 
            />
          </div>
          <button className="absolute -bottom-2 -right-2 z-20 bg-agri-primary p-3 rounded-2xl border-4 border-white text-white shadow-xl hover:bg-agri-accent active:scale-90 transition-all">
            <Edit3 className="w-5 h-5" />
          </button>
          <div className="absolute top-0 right-0 w-32 h-32 bg-agri-accent/20 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>
        
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-display font-black text-zinc-800 tracking-tighter uppercase">Ramesh Patil</h2>
          <div className="flex items-center justify-center gap-2">
             <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-agri-primary bg-agri-primary/5 px-2 py-0.5 rounded-lg border border-agri-primary/10">
                <Shield className="w-3 h-3" />
                Verified Farmer
             </div>
             <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <MapPin className="w-3 h-3" />
                Pune District
             </div>
          </div>
        </div>
      </section>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-agri-border p-6 rounded-[2.5rem] shadow-sm flex flex-col gap-3 group hover:border-agri-primary transition-all">
           <div className="w-10 h-10 rounded-xl bg-agri-surface flex items-center justify-center text-agri-primary group-hover:bg-agri-primary group-hover:text-white transition-all">
              <Sprout className="w-5 h-5" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">Estate Area</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-display font-black text-zinc-800">12.5</span>
                 <span className="text-[10px] font-black uppercase text-zinc-400">Ha</span>
              </div>
           </div>
        </div>

        <div className="bg-white border border-agri-border p-6 rounded-[2.5rem] shadow-sm flex flex-col gap-3 group hover:border-agri-accent transition-all">
           <div className="w-10 h-10 rounded-xl bg-agri-surface flex items-center justify-center text-agri-accent group-hover:bg-agri-accent group-hover:text-white transition-all">
              <TrendingUp className="w-5 h-5" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">Efficiency</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-display font-black text-zinc-800">94</span>
                 <span className="text-[10px] font-black uppercase text-zinc-400">%</span>
              </div>
           </div>
        </div>
      </div>

      {/* Control Systems */}
      <section className="bg-white border border-agri-border rounded-[3rem] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-agri-surface flex items-center gap-3">
           <Settings className="w-4 h-4 text-zinc-400" />
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Settings Hub</h3>
        </div>
        <div className="flex flex-col">
          {[
            { icon: Languages, label: 'Linguistic Interface', value: 'Marathi (मराठी)', desc: 'Primary application dialect' },
            { icon: Bell, label: 'Neural Alerts', value: 'Active', desc: 'Push notifications & advisory', toggle: true },
            { icon: HelpCircle, label: 'Support Module', desc: 'Global assistance network' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center justify-between p-6 hover:bg-agri-surface/50 transition-all group cursor-pointer">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 rounded-2xl bg-agri-surface flex items-center justify-center text-zinc-400 group-hover:bg-agri-primary group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                   </div>
                   <div className="flex flex-col">
                      <p className="text-sm font-black text-zinc-800 uppercase tracking-tight">{item.label}</p>
                      <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{item.value || item.desc}</p>
                   </div>
                </div>
                {item.toggle ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setNotifications(!notifications); }}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all border-2",
                      notifications ? "bg-agri-primary border-agri-primary" : "bg-zinc-200 border-zinc-200"
                    )}
                  >
                    <div className={cn("absolute top-0.5 bg-white w-4 h-4 rounded-full shadow-sm transition-all", notifications ? "right-1" : "left-1")} />
                  </button>
                ) : (
                  <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-agri-primary transition-colors" />
                )}
              </div>
              {i < 2 && <div className="mx-6 h-[1px] bg-agri-surface" />}
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Action */}
      <button 
        onClick={() => {
          localStorage.removeItem('user');
          navigate('/login');
        }}
        className="w-full h-20 bg-red-50 border border-red-100 rounded-[2.5rem] flex items-center justify-center gap-4 text-red-500 hover:bg-red-500 hover:text-white transition-all group shadow-sm shadow-red-500/5 active:scale-95"
      >
        <LogOut className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
        <div className="text-left">
           <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-60">System Security</p>
           <p className="text-lg font-display font-black uppercase tracking-tighter">Terminate Session</p>
        </div>
      </button>
    </div>
  );
};
