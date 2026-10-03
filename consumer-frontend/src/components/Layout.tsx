import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Search, HeartPulse, MessageCircle, FlaskConical, Menu, X, ShieldCheck, User } from 'lucide-react';
import React, { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/', icon: Search },
  { name: 'Assistant', path: '/chatbot', icon: MessageCircle },
  { name: 'Alerts', path: '/grievances', icon: HeartPulse },
  { name: 'Labs', path: '/labs', icon: FlaskConical },
];

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex flex-col md:flex-row bg-[var(--color-surface-cloud)] min-h-screen font-sans text-[var(--color-text-ink)]">
      {/* Mobile Top App Bar */}
      <header className="md:hidden h-14 bg-[var(--color-bis-navy)] text-white flex items-center justify-between px-4 shrink-0 z-10 shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[var(--color-sky-mist)]" />
          <h2 className="text-base font-semibold">BIS Nidaan</h2>
        </div>
        <div className="flex items-center gap-4">
           <span>🌐 EN</span>
           <div className="relative">
             <HeartPulse className="w-5 h-5 text-white" />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
           </div>
        </div>
      </header>

      {/* Desktop/Tablet Left Rail */}
      <div className="hidden md:flex w-[80px] hover:w-[240px] bg-[var(--color-bis-navy)] text-white flex-col transition-all duration-300 overflow-hidden group border-r border-[#14213D] z-20 shadow-lg">
        <div className="h-16 flex items-center px-6 shrink-0 border-b border-[#14213D]">
          <ShieldCheck className="w-8 h-8 text-[var(--color-sky-mist)] shrink-0" />
          <span className="ml-4 font-bold text-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">BIS Nidaan</span>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--color-trust-blue)] text-white'
                      : 'text-slate-300 hover:bg-white/10'
                  }`
                }
              >
                <Icon className="w-6 h-6 shrink-0" />
                <span className="ml-4 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen overflow-hidden relative">
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 bg-white border-b border-[var(--color-border-mist)] items-center justify-between px-8 shrink-0 z-10">
          <h2 className="text-lg font-semibold text-[var(--color-bis-navy)]">Consumer Portal</h2>
          <div className="flex items-center gap-6 text-[var(--color-text-slate)]">
             <span className="font-medium flex items-center gap-2">🌐 English</span>
             <HeartPulse className="w-5 h-5 cursor-pointer hover:text-[var(--color-trust-blue)]" />
             <div className="w-8 h-8 rounded-full bg-[var(--color-sky-mist)] text-[var(--color-trust-blue)] flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5" />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[var(--color-surface-cloud)] p-4 md:p-8 pb-24 md:pb-8">
          <div className="page-enter max-w-[960px] mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[var(--color-border-mist)] flex justify-around items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-2">
          {navItems.slice(0,2).map(item => (
            <NavLink key={item.name} to={item.path} end={item.path==='/'} className={({isActive}) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[var(--color-trust-blue)]' : 'text-[var(--color-text-slate)]'}`}>
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
          
          <NavLink to="/" className="flex flex-col items-center justify-center -mt-8">
            <div className="w-16 h-16 rounded-full bg-[var(--color-saffron)] text-white flex items-center justify-center shadow-lg border-4 border-[var(--color-surface-cloud)]">
              <Search className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-medium text-[var(--color-text-slate)] mt-1">Scan</span>
          </NavLink>

          {navItems.slice(2).map(item => (
            <NavLink key={item.name} to={item.path} className={({isActive}) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[var(--color-trust-blue)]' : 'text-[var(--color-text-slate)]'}`}>
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
