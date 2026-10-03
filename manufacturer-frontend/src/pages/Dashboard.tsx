import React, { useEffect, useState } from 'react';
import { Package, Activity, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState({ products: 12, batches: 8432, scans: 24500, alerts: 1 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-ink)] tracking-tight">Dashboard</h1>
          <p className="text-[var(--color-text-slate)] mt-1">Welcome back. Here's what's happening with your products.</p>
        </div>
        <button className="btn-primary h-[44px]">Add Product</button>
      </div>

      {/* Row of four KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Products" value={stats.products} trend="+2" trendUp={true} />
        <KpiCard title="Scans This Month" value="24.5k" trend="+15%" trendUp={true} />
        <KpiCard title="Verified Rate" value="98.2%" trend="-0.5%" trendUp={false} />
        <KpiCard title="Open Alerts" value={stats.alerts} trend="+1" trendUp={false} isAlert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Line chart (8 columns) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-[16px] border border-[var(--color-border-mist)] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-base font-bold text-[var(--color-text-ink)]">Scans over time</h2>
                  <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs font-semibold bg-[var(--color-sky-mist)] text-[var(--color-trust-blue)] rounded-md">7 Days</button>
                      <button className="px-3 py-1 text-xs font-semibold text-[var(--color-text-slate)] hover:bg-[var(--color-surface-cloud)] rounded-md">30 Days</button>
                  </div>
              </div>
              <div className="h-[300px] w-full flex items-end justify-between px-4 pb-8 relative">
                  {/* Mock chart */}
                  <div className="absolute bottom-8 left-4 right-4 border-b border-[var(--color-border-mist)]"></div>
                  <div className="absolute bottom-1/2 left-4 right-4 border-b border-[var(--color-border-mist)] border-dashed"></div>
                  <div className="absolute top-0 left-4 right-4 border-b border-[var(--color-border-mist)] border-dashed"></div>
                  
                  {[40, 55, 30, 80, 65, 90, 75].map((h, i) => (
                      <div key={i} className="w-8 md:w-16 bg-[var(--color-sky-mist)] rounded-t-md relative group">
                          <div className="absolute bottom-0 w-full bg-[var(--color-trust-blue)] rounded-t-md transition-all duration-500" style={{height: `${h}%`}}></div>
                          <div className="absolute -bottom-6 w-full text-center text-xs text-[var(--color-text-slate)]">Day {i+1}</div>
                      </div>
                  ))}
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--color-trust-blue)]"></span> Verified</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--color-caution-amber)]"></span> Suspicious</div>
              </div>
          </div>

          {/* Needs attention (4 columns) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-[16px] border border-[var(--color-border-mist)] shadow-sm flex flex-col">
             <h2 className="text-base font-bold text-[var(--color-text-ink)] mb-4">Needs Attention</h2>
             <div className="flex-1 space-y-3">
                 <div className="p-4 border border-[var(--color-caution-amber-tint)] bg-[var(--color-caution-amber-tint)]/30 rounded-xl flex items-start gap-3">
                     <AlertTriangle className="w-5 h-5 text-[var(--color-caution-amber)] shrink-0" />
                     <div>
                         <p className="text-sm font-semibold text-[var(--color-text-ink)]">Certificate Expiring</p>
                         <p className="text-xs text-[var(--color-text-slate)] mt-0.5">IS 1011:2002 expires in 45 days.</p>
                         <button className="text-[var(--color-trust-blue)] text-xs font-semibold mt-2 hover:underline">Renew now</button>
                     </div>
                 </div>
                 <div className="p-4 border border-[var(--color-alert-red-tint)] bg-[var(--color-alert-red-tint)]/30 rounded-xl flex items-start gap-3">
                     <AlertTriangle className="w-5 h-5 text-[var(--color-alert-red)] shrink-0" />
                     <div>
                         <p className="text-sm font-semibold text-[var(--color-text-ink)]">Suspicious Scans Spike</p>
                         <p className="text-xs text-[var(--color-text-slate)] mt-0.5">14 identical scans for Batch-88A in Delhi.</p>
                         <button className="text-[var(--color-trust-blue)] text-xs font-semibold mt-2 hover:underline">View alert</button>
                     </div>
                 </div>
                 <div className="p-4 border border-[var(--color-border-mist)] rounded-xl flex items-start gap-3">
                     <Activity className="w-5 h-5 text-[var(--color-text-slate)] shrink-0" />
                     <div>
                         <p className="text-sm font-semibold text-[var(--color-text-ink)]">New Customer Review</p>
                         <p className="text-xs text-[var(--color-text-slate)] mt-0.5">3 star rating on Packaged Water.</p>
                     </div>
                 </div>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[16px] border border-[var(--color-border-mist)] shadow-sm">
              <h2 className="text-base font-bold text-[var(--color-text-ink)] mb-4">Scan Locations</h2>
              <div className="h-[300px] bg-[var(--color-surface-cloud)] rounded-xl border border-[var(--color-border-mist)] flex items-center justify-center">
                  <span className="text-[var(--color-text-slate)] text-sm">Map visualization placeholder</span>
              </div>
          </div>
          <div className="bg-white p-6 rounded-[16px] border border-[var(--color-border-mist)] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-bold text-[var(--color-text-ink)]">Recent Activity</h2>
                  <button className="text-sm font-semibold text-[var(--color-trust-blue)] flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                  {[
                      { title: 'New batch generated', desc: 'Batch B-993 for Cement', time: '2 hours ago' },
                      { title: 'Certificate renewed', desc: 'IS 269 updated on ledger', time: '1 day ago' },
                      { title: 'Product added', desc: 'Packaged Drinking Water 2L', time: '3 days ago' },
                  ].map((item, i) => (
                      <div key={i} className="flex gap-4 relative">
                          {i !== 2 && <div className="absolute left-2 top-6 bottom-[-16px] w-[2px] bg-[var(--color-border-mist)]"></div>}
                          <div className="w-4 h-4 rounded-full bg-[var(--color-sky-mist)] border-2 border-[var(--color-trust-blue)] mt-1 z-10 bg-white"></div>
                          <div>
                              <p className="text-sm font-semibold text-[var(--color-text-ink)]">{item.title}</p>
                              <p className="text-sm text-[var(--color-text-slate)]">{item.desc}</p>
                              <p className="text-xs text-[var(--color-text-slate)] mt-1">{item.time}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, trend, trendUp, isAlert }: any) => {
    const TrendIcon = trendUp ? TrendingUp : TrendingDown;
    const trendColor = trendUp ? 'text-[var(--color-assured-green)]' : 'text-[var(--color-alert-red)]';
    
    return (
        <div className="bg-white rounded-[16px] p-5 border border-[var(--color-border-mist)] shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="text-sm font-medium text-[var(--color-text-slate)] mb-2">{title}</div>
            <div className="flex items-end justify-between">
                <div className={`text-3xl font-bold ${isAlert && value > 0 ? 'text-[var(--color-alert-red)]' : 'text-[var(--color-text-ink)]'}`}>{value}</div>
                <div className={`flex items-center gap-1 text-sm font-bold ${trendColor}`}>
                    <TrendIcon className="w-4 h-4" /> {trend}
                </div>
            </div>
        </div>
    )
}
