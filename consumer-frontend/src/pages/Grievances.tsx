import React, { useState } from 'react';
import { HeartPulse, Plus, Search, FileText, X } from 'lucide-react';

const mockComplaints = [
  { id: 'CMP-2024-8A9B', product: 'ISI Marked Portland Cement - 53 Grade', date: '2024-09-10', status: 'Under Investigation' },
  { id: 'CMP-2024-3F2C', product: 'Packaged Drinking Water - 1L', date: '2024-08-05', status: 'Resolved' },
];

export const Grievances = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    batchNumber: '',
    category: 'Quality/Adulteration Issue',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/public/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed');
      setShowForm(false);
      alert('Grievance submitted successfully!');
      setForm({ batchNumber: '', category: 'Quality/Adulteration Issue', description: '' });
    } catch (err) {
      alert('Error submitting grievance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--color-bis-navy)] p-6 rounded-2xl md:rounded-[24px] shadow-lg mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-[var(--color-sky-mist)]" /> My Grievances
          </h1>
          <p className="text-[var(--color-sky-mist)] text-sm mt-1">Track and manage your filed complaints.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          {showForm ? <><X className="w-5 h-5" /> Cancel</> : <><Plus className="w-5 h-5" /> File New</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--color-border-mist)] shadow-md animate-in mb-8">
          <h2 className="text-xl font-bold text-[var(--color-bis-navy)] mb-6">File a New Complaint</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-slate)] mb-1.5">Batch Number (Optional)</label>
                <input 
                  type="text" 
                  value={form.batchNumber}
                  onChange={(e) => setForm({ ...form, batchNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[var(--color-border-mist)] rounded-[10px] focus:outline-none focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all font-mono text-[var(--color-text-ink)] uppercase placeholder:text-[var(--color-border-mist)]" 
                  placeholder="e.g. BATCH-123" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-slate)] mb-1.5">Issue Category</label>
                <select 
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[var(--color-border-mist)] rounded-[10px] focus:outline-none focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all text-[var(--color-text-ink)]"
                >
                  <option>Quality/Adulteration Issue</option>
                  <option>Missing/Fake Certification</option>
                  <option>Health/Safety Hazard</option>
                  <option>Overpricing / MRP Issue</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-slate)] mb-1.5">Description</label>
              <textarea 
                rows={4} 
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[var(--color-border-mist)] rounded-[10px] focus:outline-none focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all text-[var(--color-text-ink)] placeholder:text-[var(--color-border-mist)]" 
                placeholder="Please describe the issue in detail..."
              ></textarea>
            </div>
            <button disabled={submitting} type="submit" className="px-6 py-3 bg-[var(--color-trust-blue)] text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit Grievance'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-[16px] shadow-sm border border-[var(--color-border-mist)] overflow-hidden">
        <div className="p-5 border-b border-[var(--color-border-mist)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[var(--color-surface-cloud)]">
          <h3 className="font-semibold text-[var(--color-bis-navy)]">Recent Complaints</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--color-text-slate)]" />
            <input type="text" placeholder="Track by ID..." className="w-full sm:w-auto pl-9 pr-4 py-2 bg-white border border-[var(--color-border-mist)] rounded-[8px] text-sm text-[var(--color-text-ink)] placeholder:text-[var(--color-text-slate)] focus:outline-none focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all" />
          </div>
        </div>
        <div className="divide-y divide-[var(--color-border-mist)]">
          {mockComplaints.map((c, i) => (
            <div key={i} className="p-5 hover:bg-[var(--color-surface-cloud)] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--color-surface-cloud)] text-[var(--color-trust-blue)] border border-[var(--color-border-mist)] rounded-xl shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-ink)]">{c.id}</h4>
                  <p className="text-[var(--color-text-slate)] text-sm mt-0.5">{c.product}</p>
                  <p className="text-[var(--color-text-slate)] text-xs mt-1">Filed on {c.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-[999px] whitespace-nowrap shadow-sm ${c.status === 'Resolved' ? 'bg-[var(--color-assured-green-tint)] text-[var(--color-assured-green)] border border-[var(--color-assured-green-tint)]' : 'bg-[var(--color-caution-amber-tint)] text-[var(--color-caution-amber)] border border-[var(--color-caution-amber-tint)]'}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
