import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth, 
  className, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-zinc-900 text-white shadow-tactile hover:bg-zinc-800 active:scale-[0.98]',
    secondary: 'bg-white text-zinc-900 border border-zinc-200 shadow-sm hover:bg-zinc-50 active:scale-[0.98]',
    outline: 'border border-zinc-300 text-zinc-900 shadow-sm hover:bg-zinc-50 active:scale-[0.98]',
    ghost: 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 active:scale-[0.98]',
    error: 'bg-red-600 text-white shadow-tactile hover:bg-red-700 active:scale-[0.98]',
  };

  return (
    <button 
      className={cn(
        'h-12 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2',
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  padded = true, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden',
        padded && 'p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
