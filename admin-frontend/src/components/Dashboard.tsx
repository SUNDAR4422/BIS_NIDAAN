import { useState } from 'react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'matrix'>('products')

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-[600px] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 bg-slate-50 p-4 hidden md:block">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</h3>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'products' ? 'bg-primary-100 text-primary-900 font-medium' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('matrix')}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'matrix' ? 'bg-primary-100 text-primary-900 font-medium' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Generate Data Matrix
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Products</h2>
              <button className="bg-primary-700 hover:bg-primary-900 text-white px-4 py-2 rounded-md shadow-sm transition-colors">
                + Register New Product
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-8 text-center text-slate-500">
              <p>No products registered yet.</p>
              <p className="text-sm mt-2">Click "Register New Product" to get started.</p>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Generate Data Matrix</h2>
            <div className="max-w-xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Product</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none">
                    <option>-- Select a product --</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Batch Number</label>
                  <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="e.g. BATCH-2024-001" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Units</label>
                  <input type="number" min="1" max="10000" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="100" />
                </div>

                <button type="button" className="bg-primary-700 hover:bg-primary-900 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-colors">
                  Generate Codes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
