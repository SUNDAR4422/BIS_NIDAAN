import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Layers, LogOut, ShieldAlert, HeartPulse, Bell, Factory, FlaskConical, Activity, Settings, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Products Registry', path: '/products', icon: Package },
  { name: 'Batch Generation', path: '/batches', icon: Layers },
  { name: 'Certifications', path: '/certifications', icon: ShieldAlert },
  { name: 'Recalls', path: '/recalls', icon: ShieldAlert },
  { name: 'Compliance Navigator', path: '/compliance', icon: HeartPulse },
  { name: 'Analytics', path: '/analytics', icon: Activity },
  { name: 'Customer Feedback', path: '/feedback', icon: HeartPulse },
  { name: 'Team', path: '/team', icon: Settings },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('manufacturer_token');
    navigate('/login');
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[var(--color-bis-navy)] border-r border-[#14213D] flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center px-6 border-b border-[#14213D]">
          <Factory className="w-8 h-8 text-[var(--color-sky-mist)] mr-3" />
          <h1 className="text-white font-bold tracking-wide text-lg leading-tight">BIS Nidaan</h1>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-[999px] transition-all duration-200 font-medium text-sm ${
                    isActive
                      ? 'bg-[var(--color-trust-blue)] text-white'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#14213D]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-300 hover:bg-white/10 text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[var(--color-surface-cloud)] min-h-screen font-sans text-[var(--color-text-ink)]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-[var(--color-border-mist)] flex items-center justify-between px-4 md:px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[var(--color-text-slate)] hover:text-[var(--color-bis-navy)] transition-colors">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex text-sm text-[var(--color-text-slate)] items-center gap-2">
                <span>Dashboard</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
              <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--color-text-slate)]" />
                  <input type="text" placeholder="Search products, batches..." className="w-full bg-[var(--color-surface-cloud)] border border-[var(--color-border-mist)] rounded-lg py-1.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--color-trust-blue)]" />
              </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[var(--color-text-slate)]">EN</span>
            <button className="text-[var(--color-text-slate)] hover:text-[var(--color-bis-navy)] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-alert-red)] rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[var(--color-bis-navy)] text-white flex items-center justify-center font-bold text-xs">
              M
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-[var(--color-surface-cloud)] p-4 md:p-6">
          <div className="max-w-[1440px] mx-auto page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
