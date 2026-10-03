import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Search, AlertCircle, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export const VerificationDashboard = () => {
  const [batchId, setBatchId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    
    if (isScanning) {
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      
      scanner.render((decodedText) => {
        setBatchId(decodedText);
        setIsScanning(false);
        navigate(`/verify/${decodedText.trim()}`);
      }, () => {
        // Ignore scan errors, as they are thrown continuously when no QR is in view
      });
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [isScanning, navigate]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchId.trim()) {
      navigate(`/verify/${batchId.trim()}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-[var(--color-bis-navy)] text-white p-6 rounded-2xl md:rounded-[24px] shadow-lg mb-8">
         <h1 className="text-2xl font-bold mb-2">Verify a Product</h1>
         <p className="text-[var(--color-sky-mist)] text-sm mb-6">Scan the BIS DataMatrix code or enter the product ID to verify authenticity.</p>
         
         <div className="bg-white rounded-[16px] p-6 text-center shadow-md">
            {!isScanning ? (
              <>
                <div className="w-32 h-32 mx-auto bg-[var(--color-surface-cloud)] rounded-[16px] flex items-center justify-center mb-6 relative border-2 border-dashed border-[var(--color-trust-blue)]">
                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-saffron)] -mt-1 -ml-1"></div>
                   <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-saffron)] -mt-1 -mr-1"></div>
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-saffron)] -mb-1 -ml-1"></div>
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-saffron)] -mb-1 -mr-1"></div>
                   <QrCode className="w-16 h-16 text-[var(--color-trust-blue)]" />
                </div>
                <p className="text-[var(--color-text-slate)] text-sm mb-6">Align the code inside the frame</p>
                <button 
                  onClick={() => setIsScanning(true)}
                  className="w-full h-12 bg-[var(--color-trust-blue)] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md hover:bg-[var(--color-bis-navy)] transition-colors"
                >
                   <QrCode className="w-5 h-5" /> Start Camera
                </button>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsScanning(false)}
                  className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-white border border-[var(--color-border-mist)] text-[var(--color-text-slate)] hover:text-[var(--color-alert-red)] rounded-full flex items-center justify-center shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
                <div id="qr-reader" className="w-full overflow-hidden rounded-[16px] [&>div]:!border-0 [&_video]:!rounded-[16px] [&_button]:btn-primary [&_button]:mt-4 [&_a]:hidden"></div>
              </div>
            )}
         </div>
      </div>

      <div className="card p-6 md:p-8">
        <h3 className="text-lg font-semibold text-[var(--color-bis-navy)] mb-4">Type code instead</h3>
        <form onSubmit={handleScan} className="w-full space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[var(--color-text-slate)]" />
            </div>
            <input
              type="text"
              required
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white border border-[var(--color-border-mist)] rounded-[10px] focus:outline-none focus:border-[var(--color-trust-blue)] focus:ring-1 focus:ring-[var(--color-trust-blue)] transition-all font-mono text-lg text-[var(--color-text-ink)] uppercase placeholder:text-[var(--color-border-mist)]"
              placeholder="e.g. BATCH-123"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[48px] bg-white border border-[var(--color-trust-blue)] text-[var(--color-trust-blue)] rounded-[12px] font-semibold text-lg hover:bg-[var(--color-sky-mist)] transition-colors"
          >
            Verify Code
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-border-mist)] flex flex-col gap-3">
          <p className="text-xs font-semibold text-[var(--color-text-slate)] uppercase">Demo Links</p>
          <button onClick={() => navigate('/verify/BATCH-VALID-01')} className="text-left px-4 py-3 bg-[var(--color-surface-cloud)] hover:bg-[var(--color-sky-mist)] rounded-[10px] text-sm font-medium text-[var(--color-text-ink)] transition-colors flex justify-between items-center border border-[var(--color-border-mist)]">
            <span>Valid Cement Batch</span>
            <span className="text-xs bg-[var(--color-assured-green-tint)] text-[var(--color-assured-green)] px-2 py-1 rounded-[999px] font-bold">Verified</span>
          </button>
          <button onClick={() => navigate('/verify/BATCH-RECALL-02')} className="text-left px-4 py-3 bg-[var(--color-surface-cloud)] hover:bg-[var(--color-alert-red-tint)] rounded-[10px] text-sm font-medium text-[var(--color-text-ink)] transition-colors flex justify-between items-center border border-[var(--color-border-mist)]">
            <span>Recalled Food Product</span>
            <span className="text-xs bg-[var(--color-alert-red-tint)] text-[var(--color-alert-red)] px-2 py-1 rounded-[999px] font-bold">Recalled</span>
          </button>
        </div>
      </div>
      
      <div className="bg-[var(--color-caution-amber-tint)] rounded-[16px] p-5 flex gap-4">
        <AlertCircle className="w-6 h-6 text-[var(--color-caution-amber)] shrink-0" />
        <div>
          <h4 className="font-semibold text-[var(--color-text-ink)] text-sm">How to read the BIS mark</h4>
          <p className="text-[var(--color-text-slate)] text-sm mt-1">Always look for the IS standard number above the mark and the CM/L licence number below it.</p>
        </div>
      </div>
    </div>
  );
};
