import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../components/ui/Base';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 h-16 w-full sticky top-0 z-50 flex items-center shadow-sm">
        <div className="flex items-center gap-3 px-4 w-full max-w-7xl mx-auto">
          <Shield className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-primary tracking-tight">Kisan Sahay Admin</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract Decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary-container rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-organic border border-outline-variant/30 z-10">
          {/* Left Side: Context */}
          <div className="hidden md:flex flex-col justify-center p-8 bg-primary-container text-on-primary-container relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-4 leading-tight">Management Dashboard Access</h1>
              <p className="opacity-90 mb-8">Centralized control for regional agricultural data, market monitoring, and system security.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                  <span className="font-semibold">MFA Required</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <span className="material-symbols-outlined text-2xl">monitoring</span>
                  <span className="font-semibold">Real-time Monitoring</span>
                </div>
              </div>
            </div>
            
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGyIvsQvu_5SgxXeenhSHwOiuCYTBPbcUy9w_tBhAaIZLQ1f-CQcjRG4xyezba2NI47X_VyRFuxl7DF0U_vMeVwVQIgQfwdTGjUn9XIqsf_EdhXtGmk8d33p1p5An_ETaLEGdSd6z7ZNqYgkh-xXACk8-r9nNutTUxtJVPLUBKYiGS9fRS_A-yPwzifgrRAOtb1ixoGDiujAIf1Q6pQhVZE-VqLLKUHpQGuIUKgmImOcbkaj4ltRx3QSERcobjg00R9Db6noZUvpPo" 
              alt="Farm Grid" 
            />
          </div>

          {/* Right Side: Form */}
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-on-surface mb-1">Admin Login</h2>
              <p className="text-on-surface-variant">Please enter your credentials to access the console.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/admin'); }}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-on-surface-variant">Admin Email / ID</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  <input 
                    type="email" 
                    placeholder="admin@kisansahay.gov" 
                    className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-on-surface-variant">Password</label>
                  <button type="button" className="text-xs font-semibold text-primary hover:underline">Forgot Password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <Button fullWidth>
                <span className="material-symbols-outlined text-xl">verified_user</span>
                Admin Secure Login
              </Button>

              <div className="relative py-2 opacity-30">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-surface-container-lowest px-2">Navigation</span></div>
              </div>

              <Button variant="outline" fullWidth onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
                Back to User Login
              </Button>
            </form>

            {/* Security Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 grayscale opacity-40">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-xl">gpp_maybe</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">AES-256</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-xl">security_update_good</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">SSL Verified</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-xl">encrypted</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">2FA Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low py-8 border-t border-outline-variant/30 mt-auto">
        <div className="flex flex-col md:row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold">© 2024 Kisan Sahay Admin Portal</p>
            <p className="text-on-surface-variant text-xs">V 2.4.1 Build 2024-AD-09</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="#" className="text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm">support_agent</span> Technical Support
            </Link>
            <Link to="#" className="text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm">policy</span> Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};
