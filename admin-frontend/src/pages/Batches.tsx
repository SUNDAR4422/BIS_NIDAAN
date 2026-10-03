import React, { useEffect, useState } from 'react';
import { Plus, Search, QrCode } from 'lucide-react';
import api from '../services/api';

export const Batches = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    productId: '',
    batchNumber: '',
    unitCount: 100,
  });

  const fetchData = async () => {
    try {
      const [batchesRes, productsRes] = await Promise.all([
        api.get('/admin/batches'),
        api.get('/admin/products')
      ]);
      setBatches(batchesRes.data.batches || []);
      setProducts(productsRes.data.products || []);
      if (productsRes.data.products?.length > 0) {
        setFormData(prev => ({ ...prev, productId: productsRes.data.products[0].id }));
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/batches', formData);
      setShowForm(false);
      setFormData({ ...formData, batchNumber: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to create batch', error);
      alert('Failed to create batch');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Batches & Data Matrix</h1>
          <p className="text-slate-500 mt-1">Generate secure Data Matrix codes for manufacturing batches</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel' : 'Generate Batch'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
            <div className="p-2.5 bg-primary-50 rounded-xl border border-primary-100">
              <QrCode className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Blockchain-Secured Batch</h2>
              <p className="text-sm text-slate-500">This action writes a new Merkle Root to the ledger.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Product</label>
              <select
                required
                value={formData.productId}
                onChange={e => setFormData({...formData, productId: e.target.value})}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white text-slate-900"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.isStandardNumber})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Batch Number</label>
              <input
                required
                type="text"
                value={formData.batchNumber}
                onChange={e => setFormData({...formData, batchNumber: e.target.value})}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-slate-900 uppercase"
                placeholder="e.g. BATCH-2024-002"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Unit Count (Tokens to Generate)</label>
              <input
                required
                type="number"
                min="1"
                value={formData.unitCount}
                onChange={e => setFormData({...formData, unitCount: parseInt(e.target.value)})}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-slate-900"
              />
            </div>
            <div className="pt-2">
              <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 font-medium shadow-sm transition-colors flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                Generate & Record on Ledger
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search batches..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white text-slate-900"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 font-semibold text-xs uppercase tracking-wider">Batch Number</th>
                <th className="px-6 py-3.5 font-semibold text-xs uppercase tracking-wider">Units</th>
                <th className="px-6 py-3.5 font-semibold text-xs uppercase tracking-wider">Merkle Root</th>
                <th className="px-6 py-3.5 font-semibold text-xs uppercase tracking-wider">Generated On</th>
                <th className="px-6 py-3.5 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading batches...</td>
                </tr>
              ) : batches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No batches generated yet.</td>
                </tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{batch.batchNumber}</td>
                    <td className="px-6 py-4">{100}</td>
                    <td className="px-6 py-4">
                      <code className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-xs text-slate-600 font-mono inline-block w-48 truncate">
                        {batch.merkleRoot}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(batch.manufacturingDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary-600 hover:text-primary-800 font-medium text-sm bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-md transition-colors">
                        Download Codes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
