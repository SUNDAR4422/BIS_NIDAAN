import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, FileText, Activity, Link as LinkIcon, Star, ArrowLeft, MessageCircle, Loader2, ChevronRight, XOctagon } from 'lucide-react';

export const ProductResult = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    fetch(`http://localhost:8080/api/public/verify/${batchId}`)
      .then(res => { if (!res.ok) throw new Error('Not found'); return res.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [batchId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="flex gap-2">
            <div className="w-4 h-4 bg-[var(--color-trust-blue)] rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-[var(--color-trust-blue)] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-4 h-4 bg-[var(--color-trust-blue)] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-[var(--color-border-mist)] p-8">
        <ShieldAlert className="w-16 h-16 text-[var(--color-alert-red)] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[var(--color-text-ink)]">Product Not Found</h2>
        <p className="text-[var(--color-text-slate)] mt-2">This batch number does not exist in the BIS registry.</p>
        <button onClick={() => navigate('/')} className="mt-8 px-6 h-12 bg-white border border-[var(--color-trust-blue)] text-[var(--color-trust-blue)] font-semibold rounded-xl w-full max-w-xs">Go Back</button>
      </div>
    );
  }

  const isRecalled = data.status === 'RECALLED';
  const isSuspicious = data.status === 'SUSPICIOUS';

  let bannerClass = 'bg-[var(--color-assured-green-tint)]';
  let iconClass = 'text-[var(--color-assured-green)]';
  let bannerText = 'This product is genuine and certified.';
  let bannerTitle = 'VERIFIED';
  let Icon = ShieldCheck;

  if (isRecalled || data.status === 'COUNTERFEIT') {
      bannerClass = 'bg-[var(--color-alert-red)] text-white';
      iconClass = 'text-white';
      bannerText = isRecalled ? 'This batch has been recalled. Stop using.' : 'This code does not match our records. Do not use the product.';
      bannerTitle = isRecalled ? 'RECALLED' : 'POSSIBLE COUNTERFEIT';
      Icon = XOctagon;
  } else if (isSuspicious) {
      bannerClass = 'bg-[var(--color-caution-amber-tint)]';
      iconClass = 'text-[var(--color-caution-amber)]';
      bannerText = 'We found something unusual. Please check before you buy or use it.';
      bannerTitle = 'SUSPICIOUS';
      Icon = ShieldAlert;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-24 md:pb-12">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[var(--color-text-slate)] hover:text-[var(--color-bis-navy)] font-medium mb-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-white rounded-xl shadow-sm border border-[var(--color-border-mist)] flex items-center justify-center mb-4">
              <PackagePlaceholder />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-ink)]">{data.productName}</h1>
          <p className="text-[var(--color-text-slate)] mt-1">{data.manufacturer}</p>
      </div>

      {/* Status Banner */}
      <div className={`${bannerClass} p-4 rounded-xl flex items-start gap-4 shadow-sm`}>
         <Icon className={`w-8 h-8 ${iconClass} shrink-0`} />
         <div>
             <h2 className={`font-bold text-lg ${isRecalled || data.status === 'COUNTERFEIT' ? 'text-white' : 'text-[var(--color-text-ink)]'}`}>{bannerTitle}</h2>
             <p className={`text-sm mt-1 ${isRecalled || data.status === 'COUNTERFEIT' ? 'text-white/90' : 'text-[var(--color-text-slate)]'}`}>{bannerText}</p>
         </div>
      </div>

      {/* 5-row checklist */}
      <div className="bg-white rounded-[16px] shadow-sm border border-[var(--color-border-mist)] divide-y divide-[var(--color-border-mist)]">
          <div className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-cloud)] cursor-pointer">
              <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-assured-green)]" />
                  <div>
                      <p className="text-xs text-[var(--color-text-slate)] font-semibold uppercase">Certification</p>
                      <p className="text-sm font-bold text-[var(--color-text-ink)]">{data.isStandard} (Valid)</p>
                  </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-border-mist)]" />
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-cloud)] cursor-pointer">
              <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-assured-green)]" />
                  <div>
                      <p className="text-xs text-[var(--color-text-slate)] font-semibold uppercase">Batch Details</p>
                      <p className="text-sm font-mono text-[var(--color-text-ink)]">{data.batchNumber}</p>
                  </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-border-mist)]" />
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-[var(--color-surface-cloud)] cursor-pointer">
              <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-assured-green)]" />
                  <div>
                      <p className="text-xs text-[var(--color-text-slate)] font-semibold uppercase">Expiry</p>
                      <p className="text-sm font-bold text-[var(--color-text-ink)]">Valid until Oct 2027</p>
                  </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--color-border-mist)]" />
          </div>
          <div className="p-4 flex items-center justify-between bg-[var(--color-surface-cloud)]">
              <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-[var(--color-trust-blue)]" />
                  <p className="text-sm text-[var(--color-text-slate)]">Verified on blockchain: <span className="font-mono text-xs">{data.blockchain.txId.substring(0,8)}...</span></p>
              </div>
              <a href="#" className="text-sm text-[var(--color-trust-blue)] font-medium">View proof</a>
          </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
          <button onClick={() => navigate('/chatbot')} className="btn-primary w-full h-[48px] rounded-[12px] flex justify-center items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Ask AI about this product
          </button>
          <button className={`w-full h-[48px] rounded-[12px] font-semibold text-lg ${isRecalled || isSuspicious ? 'bg-[var(--color-alert-red)] text-white' : 'bg-white border border-[var(--color-trust-blue)] text-[var(--color-trust-blue)]'}`}>
              Report a problem
          </button>
      </div>

    </div>
  );
};

const PackagePlaceholder = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-border-mist)" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
)
