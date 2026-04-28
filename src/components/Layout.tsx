import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Sprout, User, Bell, ChevronLeft, Camera, LayoutGrid, Search as SearchIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Header: React.FC<{ title?: string; showBack?: boolean }> = ({ title, showBack }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 h-20 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between transition-all duration-500">
      <div className="flex items-center gap-4">
        {showBack ? (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl transition-colors hover:bg-zinc-100"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-900" />
          </button>
        ) : (
          <div 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full border-2 border-agri-border overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            <img 
               src="https://images.unsplash.com/photo-1542013985851-9e797e8890ae?auto=format&fit=crop&q=80&w=100" 
               alt="Profile" 
               className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex-1 text-center">
         <h1 className="text-base font-black text-agri-primary uppercase tracking-tight">
           {title || 'Kisan Sahay'}
         </h1>
      </div>

      <div className="flex items-center">
        <button className="p-2 rounded-xl text-zinc-400 relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">1</span>
        </button>
      </div>
    </header>
  );
};

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Market', icon: TrendingUp, path: '/market' },
    { label: 'Advisory', icon: Sprout, path: '/tips' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[90] h-20 bg-white border-t border-agri-border flex items-center justify-around shadow-[0_-10px_40px_rgba(0,0,0,0.03)] px-4">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 h-16 rounded-2xl",
            path === item.path 
              ? "text-agri-primary" 
              : "text-zinc-300 hover:text-zinc-500"
          )}
        >
          <item.icon className={cn("w-6 h-6", path === item.path && "fill-agri-primary/10")} />
          <span className={cn("text-[9px] uppercase tracking-widest font-black")}>{item.label}</span>
          {path === item.path && (
            <div className="w-1 h-1 bg-agri-primary rounded-full mt-0.5" />
          )}
        </button>
      ))}
    </nav>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <BottomNav />
    </div>
  );
};
