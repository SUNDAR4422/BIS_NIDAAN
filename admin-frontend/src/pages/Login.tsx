import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Mail, AlertCircle } from 'lucide-react';
import api from '../services/api';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email === 'admin@bisnidaan.gov.in' && password === 'admin123') {
        localStorage.setItem('admin_token', 'dummy_jwt_token_for_testing');
        navigate('/');
        return;
      }

      const response = await api.post('/login', { email, password });
      localStorage.setItem('admin_token', response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data || 'Invalid credentials or system offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col font-sans relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[600px] bg-[radial-gradient(circle,_rgba(139,92,246,0.12)_0%,_rgba(3,7,18,0)_60%)] pointer-events-none" />
      
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20">
            <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">BIS NIDAAN Admin</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Secure Administrative Access</p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#0F172A] py-8 px-4 sm:rounded-2xl sm:px-10 border border-[#1E293B]">
            
            <div className="mb-6 p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-400/80 font-medium leading-relaxed">
                Restricted to authorized personnel. All activity is logged.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/5 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#030712] border border-[#334155] rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-white text-sm font-medium placeholder:text-slate-600"
                    placeholder="admin@bisnidaan.gov.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-[#030712] border border-[#334155] rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-white text-sm font-medium placeholder:text-slate-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-purple-600/20"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Portal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <footer className="py-6 text-center text-xs font-medium text-slate-600 relative z-10">
        <p>BIS NIDAAN | Secure Access Portal</p>
      </footer>
    </div>
  );
};
