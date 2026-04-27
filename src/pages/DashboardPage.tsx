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
  const userName = user.name || 'Farmer';

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [theme, setTheme] = useState<'morning' | 'afternoon' | 'night'>('morning');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const updateTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTheme('morning');
      } else if (hour >= 12 && hour < 18) {
        setTheme('afternoon');
      } else {
        setTheme('night');
      }
    };
    updateTheme();
    
    const fetchWeather = async () => {
      try {
        let queryParams = '';
        const userLocation = user.location || 'Pune';
        
        // Try to get browser location first
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            queryParams = `?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
            const response = await fetch(`/api/weather${queryParams}`);
            const data = await response.json();
            setWeather(data);
            setLoadingWeather(false);
          }, async (error) => {
            // Fallback to profile location if GPS denied or fails
            queryParams = `?city=${encodeURIComponent(userLocation)}`;
            const response = await fetch(`/api/weather${queryParams}`);
            const data = await response.json();
            setWeather(data);
            setLoadingWeather(false);
          });
        } else {
          // Fallback if geolocation is not supported
          queryParams = `?city=${encodeURIComponent(userLocation)}`;
          const response = await fetch(`/api/weather${queryParams}`);
          const data = await response.json();
          setWeather(data);
          setLoadingWeather(false);
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        setLoadingWeather(false);
      }
    };
    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  const themeConfig = {
    morning: {
      bg: 'bg-amber-50',
      text: 'text-zinc-900',
      cardBg: 'bg-white',
      accent: 'text-amber-600',
      welcome: 'text-zinc-600',
      cardBorder: 'border-zinc-200'
    },
    afternoon: {
      bg: 'bg-sky-50',
      text: 'text-zinc-900',
      cardBg: 'bg-white',
      accent: 'text-sky-600',
      welcome: 'text-zinc-600',
      cardBorder: 'border-zinc-200'
    },
    night: {
      bg: 'bg-zinc-950',
      text: 'text-zinc-50',
      cardBg: 'bg-zinc-900',
      accent: 'text-zinc-400',
      welcome: 'text-zinc-400',
      cardBorder: 'border-zinc-800'
    }
  };

  const currentTheme = themeConfig[theme];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'rain': return <CloudRain className="w-5 h-5" />;
      case 'clouds': return <Cloud className="w-5 h-5" />;
      case 'thunderstorm': return <CloudLightning className="w-5 h-5" />;
      default: return <Sun className="w-5 h-5" />;
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div className={cn("min-h-screen pt-20 px-4 flex flex-col gap-6 max-w-2xl mx-auto pb-32 transition-colors duration-1000", currentTheme.bg)}>
      <Header />
      
      {/* Welcome & Time Section */}
      <div className="flex flex-col gap-6 px-2 mb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className={cn("text-4xl font-black tracking-tighter", currentTheme.text)}>Namaste,</h1>
            <h2 className={cn("text-3xl font-bold tracking-tight opacity-80", currentTheme.text)}>{userName}</h2>
          </div>
          <div className="text-right flex flex-col items-end pt-1">
            <span className={cn("text-4xl font-black tracking-tighter leading-none tabular-nums", currentTheme.text)}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-2", currentTheme.text)}>
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Weather Section - Dedicated White Card */}
      <section className={cn(
        "rounded-2xl p-6 border shadow-sm relative overflow-hidden transition-all duration-1000",
        theme === 'night' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'
      )}>
        {/* Subtle Watermark Icon */}
        <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
          {theme === 'night' ? <Moon className="w-24 h-24" /> : <Sun className="w-24 h-24" />}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-sm font-bold text-zinc-500 uppercase tracking-wide">
              {weather?.location || user.location}, India
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            {loadingWeather ? (
              <div className="h-16 w-32 bg-zinc-100 animate-pulse rounded-lg"></div>
            ) : (
              <div className="flex items-end gap-3">
                <h2 className="text-6xl font-black tracking-tighter text-emerald-600 leading-none">
                  {weather?.temp}°C
                </h2>
                <div className="flex flex-col mb-1 pt-2">
                  <span className={cn("font-black tracking-tight", theme === 'night' ? 'text-zinc-100' : 'text-zinc-900')}>
                    {weather?.condition}
                  </span>
                  <span className="text-xs font-bold text-zinc-400">
                    H: {weather?.temp + 2}° L: {weather?.temp - 4}°
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Recommendation Bar */}
          <div className={cn(
            "rounded-xl p-4 flex items-center gap-3 border",
            theme === 'night' ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'
          )}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600">
              <Sprout className="w-5 h-5" />
            </div>
            <p className={cn("text-sm font-bold tracking-tight", theme === 'night' ? 'text-emerald-400' : 'text-emerald-700')}>
              Perfect day for sowing wheat
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions - Colored Box Grid */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { 
            label: 'Crop Suggestion', 
            icon: Sprout, 
            path: '/crop-suggestion', 
            style: 'bg-emerald-700 active:bg-emerald-800' 
          },
          { 
            label: 'Identify Pest', 
            icon: Bug, 
            path: '/scan', 
            style: 'bg-orange-200 active:bg-orange-300' 
          },
          { 
            label: 'Market Prices', 
            icon: TrendingUp, 
            path: '/market', 
            style: 'bg-sky-600 active:bg-sky-700' 
          },
        ].map((action) => (
          <button 
            key={action.label}
            onClick={() => navigate(action.path)}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-2xl gap-3 shadow-sm active:scale-95 transition-all text-white h-32",
              action.style,
              action.label === 'Identify Pest' && 'text-zinc-800'
            )}
          >
            <action.icon className="w-8 h-8" />
            <span className="text-[10px] font-black text-center uppercase tracking-widest leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </section>

      {/* Explore Categories */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h2 className={cn("text-xl font-bold", currentTheme.text)}>Explore Categories</h2>
          <button className="text-sm font-bold text-primary hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Large Card: Farming Tips */}
          <div 
            onClick={() => navigate('/tips')}
            className="col-span-2 relative h-44 rounded-xl overflow-hidden group cursor-pointer shadow-sm border border-transparent hover:border-zinc-400 transition-all"
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

          {[
            { label: 'Livestock', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvm1p-SnkH3zTjBge2muGl7GAwktwqYuPtrnu-KSzZ10Oyivlqc92rYkDwUiVpe0rJgfuOk_Rfaqs2N6CJVQNMU16I79zpI9bufDFkU104fDVvsuPB4B4933908m5T-WcSz0kmMfiEI3w47h1BuBcIPyLormLvR3ucMk0DqA5IrDoXDvhTtPl4GCsha2TEBNi3otOs7ePFUbuWkKYamhEkVml7xAm8xXktGfw-WLNBFJI-hyCiHQeAwHDNgKmyPXrX9w39zO9XYoWl', path: '/livestock' },
            { label: 'Byproducts', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAlhlumpOJjNx_JbUuvprHnIiAfv7qhRkWKFul49k6mHRHtoYY-mQoWTPGhkIs2HG0-26kgNwr8BkIVsZcR7lI4lLHotlGr7G9XfzMpvtr72uzJyR5o0r77sqfxFfoE4iBT3YZZ9pHrLM5fDI9gVqcDYY-odGYLxhdSqwx9azzx9KWON2N4YgUZLYna1KJUd-jyeK7TqcRZlbtplCt_ryl1wplPcBI9eYMWF-1FKaIujPB3BU5aBWQlRR6RLopmzPcXSVayignBi4D', path: '/byproducts' },
            { label: 'Gardening', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWenRaMsYudSlPxvLyi2kx6aAVo8Pwg-d0KEyTtjNzWOOvO-IJdzVVyyvDNm2b6gShvFEclI-5jlZuMJH1yGyJbY6_t0KcAiFNiDjKX6u8kuEUxxquRwu3sFjnqmghShP3KZQj5XJgxRuVEs6TVNY7ZADewPorz5VFln5VDKrm2GD7VrZK3hQZpXvTcRIMVcPNHhgLg95t6U6r1lIv8r4n_TxBC9MJStJtu0FYke05IESHRO8z4qTUxlLia-XZ9qu7CwafSvWr54wW', path: '/gardening' },
            { label: 'Tools', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2_v0S3eU0mu-k9FNqKyyvmR5TQ3ANd5hKYy6WTWGNmlXJniYn5gcKnIxzZN0KmSa3mAF9n7To2GsCCjaQHN_F-unv2qE825v6lExC8IIaUZeigdU6AP3sjVxKyNPvr7OosONQbo15ZmGCc-ETvWv92Q7B2akAFpfZFdwzGILXWI_FqRXt0H40lSyCwKjIV2hAwkShOXKSLTF3CT8sLtzmYUuO2bmkAuuxPZw6uYQ0BfmKQNLzOSL_h8GrTWp9agBBsGYcaviq_VsS', path: '/tools' },
          ].map((cat) => (
            <div key={cat.label} onClick={() => navigate(cat.path)} className="relative h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm group border border-transparent hover:border-zinc-400">
              <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform" src={cat.img} alt={cat.label} />
              <div className="absolute inset-0 bg-black/40"></div>
              <span className="absolute bottom-3 left-3 font-bold text-white uppercase text-[10px] tracking-widest">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transaction */}
      <section className="flex flex-col gap-4 mb-4">
        <h2 className={cn("text-xl font-bold", currentTheme.text)}>Recent Transaction</h2>
        <Card className={cn("flex flex-col gap-4 transition-colors", currentTheme.cardBg, currentTheme.cardBorder)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", theme === 'night' ? 'bg-zinc-800' : 'bg-zinc-50')}>
                <Receipt className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col text-left">
                <span className={cn("font-bold", currentTheme.text)}>Crop Analysis Premium</span>
                <span className="text-xs text-zinc-500">24 Oct, 2023 • 02:45 PM</span>
              </div>
            </div>
            <span className={cn("font-bold text-lg", currentTheme.text)}>₹1,473.82</span>
          </div>
          <Button variant={theme === 'night' ? 'primary' : 'outline'} fullWidth onClick={() => navigate('/payment-status')}>
            Manage Payments
          </Button>
        </Card>
      </section>
    </div>
  );
};
