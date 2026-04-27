import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Phone, MapPin, Edit3, Settings, Languages, Bell, 
  HelpCircle, Shield, LogOut, ChevronRight, Sprout 
} from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-32">
      <Header title="Profile" showBack />

      {/* Profile Header */}
      <section className="flex flex-col items-center py-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-zinc-100">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIkqKyGP7p0LNHOj3E83tv0aap1c-_Qt031xL1AAya1xXvnX2D-pZng1ywqIz2NuV3yosorx_jXRwerxKv5wqbroR-dipe3ZNHs3--lWePPFIMi8VxbyZNwyDvPpI5g3UJkKU9n8qODBfJYbPZAtsI-TXUs85uYt7QQy33lJumxUHWGAf2vCkvugwADWZ5yCswf3v1DZYk7NtUijTq5cKnpuwhmxgtYHYwIpJumqbfuiYSvVyfR6cpS9FvDO7olRCumO97CXIutJJ1" 
              alt="Ramesh Patil" 
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-zinc-900 p-2 rounded-full border-2 border-white text-white active:scale-95 transition-transform shadow-lg">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        <h2 className="mt-4 text-3xl font-black text-zinc-900 tracking-tighter">Ramesh Patil</h2>
        <div className="flex items-center gap-1 text-zinc-400 font-bold text-[10px] uppercase tracking-widest mt-1">
          <MapPin className="w-3 h-3" />
          <span>Pune, Maharashtra</span>
        </div>
      </section>

      {/* Bento Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex flex-col gap-6 !p-8">
          <div className="flex items-center gap-2 text-zinc-400">
            <User className="w-4 h-4" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Personal Info</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Full Name</p>
              <p className="font-bold text-lg text-zinc-900">Ramesh Patil</p>
            </div>
            <div>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Mobile</p>
              <p className="font-bold text-lg text-zinc-900">+91 98765 43210</p>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-6 !p-8">
          <div className="flex items-center gap-2 text-zinc-400">
            <Sprout className="w-4 h-4" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Farm Insights</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Ownership</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-black text-zinc-900 tracking-tighter leading-none">5</span>
                <span className="bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Acres</span>
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Primary Crop</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-zinc-900 text-2xl">grass</span>
                <p className="font-bold text-lg text-zinc-900 tracking-tight">Wheat</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Preferences - Zinc Style List */}
      <Card padded={false} className="border-zinc-200">
        <div className="p-6 border-b border-zinc-100 flex items-center gap-2 text-zinc-400">
          <Settings className="w-4 h-4" />
          <h3 className="text-[10px] font-black uppercase tracking-widest">Preferences</h3>
        </div>
        <div className="divide-y divide-zinc-50">
          <button onClick={() => navigate('/security')} className="w-full flex items-center justify-between p-6 hover:bg-zinc-50 transition-colors group">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-zinc-900">Security & Privacy</p>
                <p className="text-xs text-zinc-400 font-medium">Biometric and encryption</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-300" />
          </button>
          
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400">
                <Languages className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-zinc-900">App Language</p>
                <p className="text-xs text-zinc-400 font-medium">Marathi (मराठी)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-300" />
          </div>

          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400">
                <Bell className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-zinc-900">Live Updates</p>
                <p className="text-xs text-zinc-400 font-medium">Mandi alerts & advisory</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 rounded-full relative transition-colors duration-200 border-2 ${notifications ? 'bg-zinc-900 border-zinc-900' : 'bg-zinc-200 border-zinc-200'}`}
            >
              <div className={`absolute top-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-all duration-200 ${notifications ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </Card>

      <Button 
        variant="outline" 
        fullWidth 
        className="text-red-500 border-red-100 bg-red-50/30 hover:bg-red-50 h-16 rounded-2xl uppercase tracking-widest text-[10px] font-black"
        onClick={() => {
          localStorage.removeItem('user');
          navigate('/login');
        }}
      >
        <LogOut className="w-4 h-4" />
        Terminate Session
      </Button>
    </div>
  );
};
