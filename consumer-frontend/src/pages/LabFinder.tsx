import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Building2, CheckCircle2, Loader2 } from 'lucide-react';

export const LabFinder = () => {
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/public/labs');
        if (response.ok) {
          const data = await response.json();
          setLabs(data);
        }
      } catch (error) {
        console.error('Failed to fetch labs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const filteredLabs = labs.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lab.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-[var(--color-bis-navy)] p-6 rounded-2xl md:rounded-[24px] shadow-lg mb-8">
        <h1 className="text-2xl font-bold text-white">BIS Recognized Laboratories</h1>
        <p className="text-[var(--color-sky-mist)] text-sm mt-1 mb-6">Find certified testing facilities near you</p>
        
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-[var(--color-text-slate)]" />
          <input
            type="text"
            placeholder="Search by lab name, city, or state..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--color-border-mist)] rounded-xl focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all text-sm text-[var(--color-text-ink)] placeholder:text-[var(--color-text-slate)] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-[var(--color-text-slate)] gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Loading laboratories...</span>
          </div>
        ) : filteredLabs.length === 0 ? (
          <div className="col-span-full text-center py-16 text-[var(--color-text-slate)]">No laboratories found matching your search.</div>
        ) : (
          filteredLabs.map((lab, i) => (
            <div key={i} className="bg-white p-6 rounded-[16px] border border-[var(--color-border-mist)] hover:border-[var(--color-trust-blue)] transition-all duration-300 shadow-sm hover:shadow-md group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-[var(--color-surface-cloud)] text-[var(--color-trust-blue)] rounded-xl border border-[var(--color-border-mist)]">
                  <Building2 className="w-5 h-5" />
                </div>
                {lab.isActive && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[999px] text-xs font-bold bg-[var(--color-assured-green-tint)] text-[var(--color-assured-green)] border border-[var(--color-assured-green-tint)]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[var(--color-text-ink)] mb-1 group-hover:text-[var(--color-trust-blue)] transition-colors">{lab.name}</h3>
              <p className="text-xs font-mono text-[var(--color-text-slate)] mb-4">Cert: {lab.certificationId}</p>
              
              <div className="space-y-2 text-sm text-[var(--color-text-slate)]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-text-slate)] mt-0.5 shrink-0" />
                  <span>{lab.address}</span>
                </div>
                {lab.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--color-text-slate)] shrink-0" />
                    <span>{lab.contactPhone}</span>
                  </div>
                )}
                {lab.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[var(--color-text-slate)] shrink-0" />
                    <span>{lab.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
