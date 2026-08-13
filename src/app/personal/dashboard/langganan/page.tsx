"use client";

import { useState } from "react";
import { Check, Crown, ArrowRight, Sparkles } from "lucide-react";
import { useUI } from "@/components/ui/UIProvider";

export default function LanggananPage() {
  const { showToast } = useUI();
  const [selectedPlan, setSelectedPlan] = useState<string>("3_MONTHS");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: "1_MONTH",
      name: "1 Bulan",
      price: 20000,
      duration: "Akses 30 Hari",
      popular: false,
      savings: null
    },
    {
      id: "3_MONTHS",
      name: "3 Bulan",
      price: 50000,
      duration: "Akses 90 Hari",
      popular: true,
      savings: "Hemat Rp 10.000"
    },
    {
      id: "6_MONTHS",
      name: "6 Bulan",
      price: 90000,
      duration: "Akses 180 Hari",
      popular: false,
      savings: "Hemat Rp 30.000"
    },
    {
      id: "12_MONTHS",
      name: "12 Bulan",
      price: 150000,
      duration: "Akses 365 Hari",
      popular: false,
      savings: "Hemat Rp 90.000"
    }
  ];

  const features = [
    "Unlimited Download CV / Resume",
    "Unlimited Download Semua Jenis Surat",
    "Tanpa Watermark 'Made with PortoTree'",
    "Akses Prioritas ke Template Baru",
    "Unlock Semua Kustomisasi Premium",
    "Dukungan Pelanggan (Customer Support)"
  ];

  const handleCheckout = async () => {
    setIsProcessing(true);
    // TODO: Connect to backend logic to hit Payment Gateway API (Duitku/Mayar)
    // For now we simulate the delay and show an upcoming warning
    setTimeout(() => {
      setIsProcessing(false);
      showToast("Sistem pembayaran sedang dalam tahap integrasi akhir. Silakan coba lagi nanti.", "warning");
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
          <Crown className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">Upgrade ke Premium</h1>
        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
          Buka akses tanpa batas ke semua fitur PortoTree. Bebas bikin dan unduh CV atau Surat kapan saja, tanpa batasan, tanpa watermark.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Features */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            Fitur Paket Premium
          </h2>
          
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-slate-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-medium leading-relaxed">
              <strong>Info:</strong> Paket ini adalah langganan berjangka (Sekali Bayar). Tidak akan ada potongan saldo otomatis di bulan/tahun berikutnya.
            </p>
          </div>
        </div>

        {/* Right: Pricing Plans */}
        <div className="flex-1 flex flex-col gap-4">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-md scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Paling Populer
                </div>
              )}
              
              <div className="flex items-center gap-4">
                {/* Radio check visualization */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedPlan === plan.id ? 'border-emerald-500' : 'border-slate-300'
                }`}>
                  {selectedPlan === plan.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                </div>

                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${selectedPlan === plan.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-500">{plan.duration}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-extrabold text-xl text-slate-800">
                      Rp {plan.price.toLocaleString('id-ID')}
                    </div>
                    {plan.savings && (
                      <div className="text-xs font-semibold text-emerald-600 mt-1">
                        {plan.savings}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Checkout Button */}
          <button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full mt-4 py-4 px-6 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              <>
                Lanjut Pembayaran
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          <div className="text-center mt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
             <span>Pembayaran aman & instan via QRIS / E-Wallet</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
