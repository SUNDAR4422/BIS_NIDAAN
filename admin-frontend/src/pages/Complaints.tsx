import React, { useState, useEffect } from 'react';
import { HeartPulse, Loader2 } from 'lucide-react';
import api from '../api';

export const Complaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;
  }
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Consumer Complaints Triage</h1>
          <p className="text-slate-500 mt-1">Review and manage grievances submitted via the consumer portal.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Complaint ID</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Batch Ref</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Consumer</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Issue Category</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                  <HeartPulse className="w-4 h-4 text-slate-400" /> {c.trackingId || c.id.substring(0, 8)}
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">{c.batchId ? 'Linked' : 'None'}</td>
                <td className="px-6 py-4 text-slate-600">Consumer</td>
                <td className="px-6 py-4 text-slate-700">{c.category}</td>
                <td className="px-6 py-4 text-right">
                  <select 
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-md border-0 cursor-pointer ${c.status === 'OPEN' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}
                    defaultValue={c.status}
                  >
                    <option value="OPEN">Open</option>
                    <option value="INVESTIGATING">Investigating</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
