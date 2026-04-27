import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, MapPin, Bug, TrendingUp, ChevronRight, 
  Receipt, Camera, Heart, Briefcase, Shovel, Trees, Leaf
} from 'lucide-react';
import { Card, Button } from '../components/ui/Base';
import { Header } from '../components/Layout';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'Farmer';

  return (
    <div className="pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-32">
      <Header />
      
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-bold text-on-background">Namaste, {userName}!</h1>
        <p className="text-on-surface-variant">Welcome back to your farm dashboard.</p>
      </div>

      {/* Weather Card - Bento Style */}
      <section className="bg-zinc-900 text-white rounded-[2rem] p-8 border border-zinc-800 shadow-xl overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-700">Weather Analysis</span>
            <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-emerald-400">
               <Sun className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mt-8 flex items-end gap-4">
            <h2 className="text-6xl font-bold tracking-tighter">32°</h2>
            <div className="mb-2">
              <p className="text-xl font-bold leading-none">Sunny</p>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">Pune, Maharashtra</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Ideal for Sowing</p>
              <p className="text-xs text-zinc-400">Perfect soil moisture detected</p>
            </div>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </section>

      {/* Quick Actions Grid - Tactile Cards */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: 'Crop Check', icon: Trees, path: '/crop-suggestion', color: 'zinc' },
          { label: 'Pest Scan', icon: Bug, path: '/scan', color: 'zinc' },
          { label: 'Markets', icon: TrendingUp, path: '/market', color: 'zinc' },
        ].map((action) => (
          <button 
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center p-6 bg-white border border-zinc-200 rounded-[2rem] gap-3 shadow-sm hover:shadow-md active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-center uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900">{action.label}</span>
          </button>
        ))}
      </section>

      {/* Explore Categories */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-on-background">Explore Categories</h2>
          <button className="text-sm font-bold text-primary hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Large Card: Farming Tips */}
          <div 
            onClick={() => navigate('/tips')}
            className="col-span-2 relative h-44 rounded-xl overflow-hidden group cursor-pointer shadow-sm"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD869Q1BDZZAqsLtdGYm4B-CUVydEG10QzK4dmYWAvocAGrguk_kybxPSJfenmHmrR70DCbFf9rhaMpvJLFTHRqUbQatPz4jXQZUEMZQS0FNlJHIcU3kj-m6JsQH17iJ3dqjucxzeLcJv6pouASEE3FBupvY1cN3203I6FN9BIvq9M9Ma5Vr-LaiY-fUhAAJdfCt8sXPD-PM_GGUn3X6iw2rqqirOyyfizhkgKB5xcN4qUbdp4msvxcuZL6Lcj19RzhbixWqoShx4h0" 
              alt="Farming Tips" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="text-xl font-bold text-white">Farming Tips</span>
              <p className="text-xs text-white/70">Boost your yield today</p>
            </div>
          </div>

          {/* Small Category Cards */}
          <div onClick={() => navigate('/livestock')} className="relative h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm group">
            <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvm1p-SnkH3zTjBge2muGl7GAwktwqYuPtrnu-KSzZ10Oyivlqc92rYkDwUiVpe0rJgfuOk_Rfaqs2N6CJVQNMU16I79zpI9bufDFkU104fDVvsuPB4B4933908m5T-WcSz0kmMfiEI3w47h1BuBcIPyLormLvR3ucMk0DqA5IrDoXDvhTtPl4GCsha2TEBNi3otOs7ePFUbuWkKYamhEkVml7xAm8xXktGfw-WLNBFJI-hyCiHQeAwHDNgKmyPXrX9w39zO9XYoWl" alt="Animals" />
            <div className="absolute inset-0 bg-black/40"></div>
            <span className="absolute bottom-3 left-3 font-bold text-white uppercase text-xs tracking-wider">Livestock</span>
          </div>

          <div className="relative h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm group">
            <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAlhlumpOJjNx_JbUuvprHnIiAfv7qhRkWKFul49k6mHRHtoYY-mQoWTPGhkIs2HG0-26kgNwr8BkIVsZcR7lI4lLHotlGr7G9XfzMpvtr72uzJyR5o0r77sqfxFfoE4iBT3YZZ9pHrLM5fDI9gVqcDYY-odGYLxhdSqwx9azzx9KWON2N4YgUZLYna1KJUd-jyeK7TqcRZlbtplCt_ryl1wplPcBI9eYMWF-1FKaIujPB3BU5aBWQlRR6RLopmzPcXSVayignBi4D" alt="Byproducts" />
            <div className="absolute inset-0 bg-black/40"></div>
            <span className="absolute bottom-3 left-3 font-bold text-white uppercase text-xs tracking-wider">Byproducts</span>
          </div>

          <div onClick={() => navigate('/gardening')} className="relative h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm group">
            <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWenRaMsYudSlPxvLyi2kx6aAVo8Pwg-d0KEyTtjNzWOOvO-IJdzVVyyvDNm2b6gShvFEclI-5jlZuMJH1yGyJbY6_t0KcAiFNiDjKX6u8kuEUxxquRwu3sFjnqmghShP3KZQj5XJgxRuVEs6TVNY7ZADewPorz5VFln5VDKrm2GD7VrZK3hQZpXvTcRIMVcPNHhgLg95t6U6r1lIv8r4n_TxBC9MJStJtu0FYke05IESHRO8z4qTUxlLia-XZ9qu7CwafSvWr54wW" alt="Gardening" />
            <div className="absolute inset-0 bg-black/40"></div>
            <span className="absolute bottom-3 left-3 font-bold text-white uppercase text-xs tracking-wider">Gardening</span>
          </div>

          <div className="relative h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm group">
            <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2_v0S3eU0mu-k9FNqKyyvmR5TQ3ANd5hKYy6WTWGNmlXJniYn5gcKnIxzZN0KmSa3mAF9n7To2GsCCjaQHN_F-unv2qE825v6lExC8IIaUZeigdU6AP3sjVxKyNPvr7OosONQbo15ZmGCc-ETvWv92Q7B2akAFpfZFdwzGILXWI_FqRXt0H40lSyCwKjIV2hAwkShOXKSLTF3CT8sLtzmYUuO2bmkAuuxPZw6uYQ0BfmKQNLzOSL_h8GrTWp9agBBsGYcaviq_VsS" alt="Tools" />
            <div className="absolute inset-0 bg-black/40"></div>
            <span className="absolute bottom-3 left-3 font-bold text-white uppercase text-xs tracking-wider">Tools</span>
          </div>
        </div>
      </section>

      {/* Recent Transaction */}
      <section className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold text-on-background">Recent Transaction</h2>
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center">
                <Receipt className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">Crop Analysis Premium</span>
                <span className="text-xs text-on-surface-variant">24 Oct, 2023 • 02:45 PM</span>
              </div>
            </div>
            <span className="font-bold text-on-surface text-lg">₹1,473.82</span>
          </div>
          <Button variant="outline" fullWidth onClick={() => navigate('/payment-status')}>
            Manage Payments
          </Button>
        </Card>
      </section>
    </div>
  );
};
