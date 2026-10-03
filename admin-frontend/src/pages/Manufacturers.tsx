import React from 'react';
import { Factory } from 'lucide-react';

export const Manufacturers = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manufacturers Management</h1>
          <p className="text-slate-500 mt-1">Approve or suspend manufacturer licenses and access.</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <Factory className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-700">Under Construction</h2>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">This module is part of Phase 3 and will allow admins to review manufacturer KYC and issue digital BIS licenses.</p>
      </div>
    </div>
  );
};
