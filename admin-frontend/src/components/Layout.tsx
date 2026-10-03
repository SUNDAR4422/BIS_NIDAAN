import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldAlert, LogOut, FileText, Database, Activity, Inbox, BookOpen, Share2, Shield, Settings, Menu, X, Search, Bell } from 'lucide-react';
import { useState } from 'react';

const navGroups = [
  {
    title: 'OVERVIEW',
    items: [{ name: 'Command Center', path: '/', icon: LayoutDashboard }]
  },
  {
    title: 'ECOSYSTEM',
    items: [
      { name: 'Manufacturers', path: '/manufacturers', icon: Factory },
      { name: 'Products & Batches', path: '/products', icon: Database },
      { name: 'Cert Ledger', path: '/ledger', icon: FileText },
      { name: 'Recalls', path: '/recalls', icon: ShieldAlert }
    ]
  },
  {
    title: 'TRUST & SAFETY',
    items: [
      { name: 'Flagged Activity', path: '/flagged', icon: Shield },
      { name: 'Grievances', path: '/grievances', icon: Inbox }
    ]
  },
  {
    title: 'AI & KNOWLEDGE',
    items: [
      { name: 'Knowledge Base', path: '/kb', icon: BookOpen },
      { name: 'AI Monitor', path: '/ai-monitor', icon: Activity },
      { name: 'Intent Routing', path: '/intent', icon: Share2 }
    ]
  }
];

// Reusing some icons for missing imports
import { Factory } from 'lucide-react';

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-[256px] bg-[#14213D] border-r border-[#14213D] flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <ShieldAlert className="w-6 h-6 text-white mr-3" />
          <h1 className="text-white font-bold tracking-wide">BIS Admin</h1>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
            {navGroups.map((group, idx) => (
                <div key={idx} className="mb-6">
                    <h3 className="px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{group.title}</h3>
                    <div className="space-y-0.5 px-3">
                    {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/'}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                                isActive
                                ? 'bg-[var(--color-trust-blue)] text-white'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                            }`
                            }
                        >
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                        </NavLink>
                        );
                    })}
                    </div>
                </div>
            ))}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-slate-300 hover:bg-white/10 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
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
        <header className="h-16 bg-[var(--color-bis-navy)] text-white flex items-center justify-between px-4 md:px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white hover:text-[var(--color-sky-mist)]">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex relative">
                <Search className="w-4 h-4 absolute left-3 top-2 text-white/50" />
                <input type="text" placeholder="Global search..." className="bg-white/10 border border-white/20 rounded-md py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 w-[300px]" />
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-bold border border-[var(--color-alert-red)] text-[var(--color-alert-red-tint)] px-2 py-0.5 rounded uppercase">Production</span>
            <div className="flex items-center gap-3 text-sm">
                <span>EN</span>
                <div className="relative">
                    <Bell className="w-5 h-5 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-[var(--color-alert-red)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    AD
                </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-[var(--color-surface-cloud)] p-4 md:p-6">
          <div className="page-enter max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
