import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../api';

export const Recalls = () => {
  const [recalls, setRecalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ batchNumber: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchRecalls = () => {
    setLoading(true);
    api.get('/admin/recalls')
      .then(res => setRecalls(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecalls();
  }, []);

  const handleIssueRecall = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/admin/recalls', form);
      setShowForm(false);
      setForm({ batchNumber: '', reason: '' });
      fetchRecalls();
    } catch (err) {
      console.error(err);
      alert('Error issuing recall.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && recalls.length === 0) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;
  }
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recall Management</h1>
          <p className="text-slate-500 mt-1">Issue and track national product recalls.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          {showForm ? 'Cancel' : <><AlertTriangle className="w-5 h-5" /> Issue New Recall</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-red-200 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-red-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Issue Critical Recall
          </h2>
          <form className="space-y-5" onSubmit={handleIssueRecall}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Batch Number</label>
              <input 
                type="text" 
                value={form.batchNumber}
                onChange={(e) => setForm({ ...form, batchNumber: e.target.value })}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
                placeholder="e.g. BATCH-123" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Recall</label>
              <textarea 
                rows={3} 
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
                placeholder="Detail the safety hazard..."
              ></textarea>
            </div>
            <button disabled={submitting} type="submit" className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
              {submitting ? 'Issuing...' : 'Issue Recall Alert'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Recall ID</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Batch / Product</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Reason</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Date Issued</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recalls.map(r => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{r.id.substring(0,8)}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{r.affectedBatches || 'Global'}</div>
                  <div className="text-sm text-slate-500">Product Linked</div>
                </td>
                <td className="px-6 py-4 text-slate-700">{r.message}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(r.issuedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-md ${r.alertType.includes('CRITICAL') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {r.alertType}
                  </span>
                </td>
              </tr>
            ))}
            {recalls.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No recalls active.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
