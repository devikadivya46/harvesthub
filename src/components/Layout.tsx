import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Sprout, User, Bell, ChevronLeft, Camera, LayoutGrid, Search as SearchIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Header: React.FC<{ title?: string; showBack?: boolean }> = ({ title, showBack }) => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-900" />
          </button>
        )}
        <div className="flex items-center gap-2">
          {!showBack && (
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center">
               <span className="material-symbols-outlined text-white text-2xl">agriculture</span>
            </div>
          )}
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Kisan Sahay</h1>
        </div>
        {title && <h2 className="text-lg font-semibold text-zinc-500 line-clamp-1">{title}</h2>}
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/search')}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative">
          <Bell className="w-6 h-6 text-zinc-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
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
    <nav className="fixed bottom-0 left-0 w-full z-50 h-20 bg-white/80 backdrop-blur-md border-t border-zinc-200 rounded-t-[2rem] px-2 flex items-center justify-around shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {navItems.slice(0, 2).map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 transition-all duration-200 p-2",
            path === item.path ? "text-zinc-900 font-bold" : "text-zinc-400"
          )}
        >
          <item.icon className={cn("w-6 h-6", path === item.path && "fill-zinc-900/10")} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
        </button>
      ))}

      <div className="relative -top-8">
        <button 
          onClick={() => navigate('/scan')}
          className="w-16 h-16 bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center text-white active:scale-95 transition-transform border-4 border-white"
        >
          <Camera className="w-8 h-8" />
        </button>
      </div>

      {navItems.slice(2).map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 transition-all duration-200 p-2",
            path === item.path ? "text-zinc-900 font-bold" : "text-zinc-400"
          )}
        >
          <item.icon className={cn("w-6 h-6", path === item.path && "fill-zinc-900/10")} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
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
