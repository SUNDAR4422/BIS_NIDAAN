import { useEffect, useState } from 'react';
import { Package, Layers, Activity, TrendingUp, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import api from '../services/api';

export const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, batches: 0 });
  const [loading, setLoading] = useState(true);
  const [recalls, setRecalls] = useState(0);

  useEffect(() => {
    // mock fetch
    setTimeout(() => {
        setStats({ products: 12450, batches: 84392 });
        setRecalls(5);
        setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-ink)]">Command Center</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Registered Mfg" value="2,451" trend="+12%" positive={true} />
        <StatCard title="Active Certs" value="18,302" trend="+3%" positive={true} />
        <StatCard title="Scans Today" value="94.2k" trend="+18%" positive={true} />
        <StatCard title="Flagged Scans" value="142" trend="+5%" positive={false} />
        <StatCard title="Open Grievances" value="38" trend="-2%" positive={true} />
        <StatCard title="AI Satisfaction" value="96%" trend="+1%" positive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-[16px] border border-[var(--color-border-mist)] p-6 lg:col-span-2 shadow-sm">
          <h2 className="text-base font-bold text-[var(--color-text-ink)] mb-4">India Scan Volume & Flags</h2>
          <div className="h-[400px] bg-[var(--color-surface-cloud)] rounded-xl border border-[var(--color-border-mist)] flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(var(--color-trust-blue) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
             <div className="text-[var(--color-text-slate)] text-sm z-10 flex flex-col items-center">
                 <Activity className="w-8 h-8 mb-2 opacity-50" />
                 <span>Map Visualization Placeholder</span>
                 <p className="text-xs mt-1">High volume in Maharashtra, Delhi. 3 flag clusters.</p>
             </div>
             {/* Mock heat spots */}
             <div className="absolute top-[40%] left-[30%] w-12 h-12 bg-red-500/20 rounded-full blur-xl"></div>
             <div className="absolute top-[60%] left-[40%] w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[16px] border border-[var(--color-border-mist)] shadow-sm flex flex-col">
          <h2 className="text-base font-bold text-[var(--color-text-ink)] mb-4 flex items-center justify-between">
              Priority Queue
              <span className="text-xs font-normal text-[var(--color-text-slate)]">Oldest first</span>
          </h2>
          <div className="flex-1 space-y-3">
              {[
                  { type: 'Recall Approval', text: 'Packaged Water (Batch X)', time: '4h overdue', color: 'red' },
                  { type: 'Flagged Scan', text: 'Cement 53 Grade - Duplicate', time: '1h left', color: 'amber' },
                  { type: 'Grievance', text: 'Adulteration in Milk', time: '2h left', color: 'amber' },
                  { type: 'Mfg KYC', text: 'Shree Industries', time: '1d left', color: 'blue' },
                  { type: 'Flagged Scan', text: 'Gold Hallmark Mismatch', time: '4h left', color: 'amber' }
              ].map((item, i) => (
                  <div key={i} className="p-3 border border-[var(--color-border-mist)] rounded-xl flex flex-col gap-2 hover:bg-[var(--color-surface-cloud)] cursor-pointer">
                      <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-[var(--color-text-slate)] uppercase">{item.type}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.color === 'red' ? 'bg-[var(--color-alert-red-tint)] text-[var(--color-alert-red)]' : item.color === 'amber' ? 'bg-[var(--color-caution-amber-tint)] text-[var(--color-caution-amber)]' : 'bg-[var(--color-sky-mist)] text-[var(--color-trust-blue)]'}`}>{item.time}</span>
                      </div>
                      <p className="text-sm font-medium text-[var(--color-text-ink)]">{item.text}</p>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, positive }: any) => {
  return (
    <div className="bg-white rounded-[16px] border border-[var(--color-border-mist)] p-4 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold text-[var(--color-text-slate)] uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-[var(--color-text-ink)]">{value}</h3>
          <span className={`text-xs font-bold ${positive ? 'text-[var(--color-assured-green)]' : 'text-[var(--color-alert-red)]'}`}>{trend}</span>
      </div>
    </div>
  );
};
