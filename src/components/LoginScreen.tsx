import React, { useState, useEffect } from 'react';
import { useAppState } from '../context/AppContext';
import { UserRole } from '../types';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, ShieldAlert, Library } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useAppState();
  const [role, setRole] = useState<UserRole | ''>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-fill credentials based on role selection to make testing exceptionally convenient
  useEffect(() => {
    if (!role) {
      setEmail('');
      setPassword('');
      return;
    }
    const emailMap: Record<UserRole, string> = {
      student: 'alex.johnson@university.edu',
      parent: 'mrs.sharma@gmail.com',
      warden: 'warden.blockb@university.edu',
      staff: 'alex.rivera@university.edu',
      admin: 'admin.doe@university.edu'
    };
    setEmail(emailMap[role]);
    setPassword('••••••••');
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !email) return;

    setIsLoading(true);
    setTimeout(() => {
      login(role, email);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#f8f9ff] relative overflow-hidden">
      {/* Decorative Radial Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-80"
        style={{
          backgroundImage: 
            'radial-gradient(at 0% 0%, hsla(210,100%,95%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(220,100%,98%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(210,100%,95%,1) 0, transparent 50%)',
          backgroundSize: '100% 100%'
        }}
      />
      
      {/* Micro Grid Pattern Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#d3e4fe 0.5px, transparent 0.5px), radial-gradient(#d3e4fe 0.5px, #f8f9ff 0.5px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />

      <main className="w-full max-w-[440px] z-10 animate-fade-in duration-500 flex flex-col items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-20 h-20 mb-3 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-4">
            <span className="p-3 bg-slate-900 rounded-xl text-sky-400">
              <Library className="w-10 h-10" />
            </span>
          </div>
          <h1 className="font-headline-lg text-3xl font-bold tracking-tight text-[#0b1c30]">CampusStay</h1>
          <p className="font-body-md text-slate-500 mt-1">Hostel Management Simplified</p>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 p-8 shadow-xl transition-all hover:shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-title-md text-xl font-bold text-[#0b1c30]">Welcome Back</h2>
            <p className="font-body-md text-slate-400">Access your campus dashboard</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase" htmlFor="role">
                LOGIN AS
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                  <User className="w-5 h-5" />
                </span>
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all appearance-none cursor-pointer text-slate-700"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="warden">Warden</option>
                  <option value="staff">Staff (Maintenance)</option>
                  <option value="admin">University Admin</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase" htmlFor="email">
                EMAIL ADDRESS
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@university.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 text-slate-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase" htmlFor="password">
                PASSWORD
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading || !role}
              className={`w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 group mt-4 active:scale-[0.98] ${
                !role ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Shortcuts Info */}
          {role && (
            <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
              <p className="text-[11px] text-blue-700 leading-relaxed text-center font-medium">
                🔒 Testing Assistant: Demo credentials have been pre-filled for <strong>{role}</strong>. Just click login!
              </p>
            </div>
          )}

          {/* Forgot Password / Footer Links */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-sky-600 cursor-pointer hover:underline">Forgot Password?</span>
            <span className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer">
              💬 Contact Support
            </span>
          </div>
        </div>

        {/* Simulation Notice */}
        <div className="mt-8 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <ShieldAlert className="w-4 h-4 text-slate-500" />
            <p className="text-[11px] font-semibold text-slate-500">Authentication is simulated for demo purposes.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
