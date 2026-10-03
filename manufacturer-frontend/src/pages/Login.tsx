import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('manufacturer_token', 'dummy_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col font-sans justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[600px] bg-[radial-gradient(circle,_rgba(16,185,129,0.12)_0%,_rgba(3,7,18,0)_60%)] pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 relative z-10">
        <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Manufacturer Hub</h2>
        <p className="mt-2 text-sm text-slate-500">Register batches and monitor product scans</p>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0F172A] py-8 px-4 sm:rounded-2xl sm:px-10 border border-[#1E293B]">
          <form onSubmit={handleLogin} className="space-y-5">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 shadow-lg shadow-emerald-600/20"
            >
              Sign In to Manufacturer Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
