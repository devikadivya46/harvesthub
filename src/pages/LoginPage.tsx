import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Button, Card } from '../components/ui/Base';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simple session storage for demo
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-900/20 rotate-3">
            <span className="material-symbols-outlined text-5xl">agriculture</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Namaste</h1>
          <p className="text-zinc-500 font-medium mt-2">Log in to Kisan Sahay</p>
        </div>

        <Card className="!p-8 !rounded-[2rem] border-agri-border">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full h-14 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-2xl font-bold text-zinc-900 focus:ring-2 focus:ring-agri-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Password</label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-agri-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-2xl font-bold text-zinc-900 focus:ring-2 focus:ring-agri-primary outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100">{error}</p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-agri-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-900/10 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Entering...' : 'Log In'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </Card>

        <p className="text-center text-sm font-bold text-zinc-500">
          New to Kisan Sahay? {' '}
          <Link to="/signup" className="text-agri-primary hover:underline font-black">Create account</Link>
        </p>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 w-full hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
