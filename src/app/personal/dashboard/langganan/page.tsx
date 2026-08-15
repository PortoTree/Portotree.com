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
      price: 12000,
      originalPrice: 20000,
      duration: "Akses 30 Hari",
      popular: false,
      savings: "Hemat Rp 8.000"
    },
    {
      id: "3_MONTHS",
      name: "3 Bulan",
      price: 32000,
      originalPrice: 48000,
      duration: "Akses 90 Hari",
      popular: true,
      savings: "Hemat Rp 16.000"
    },
    {
      id: "6_MONTHS",
      name: "6 Bulan",
      price: 55000,
      originalPrice: 85000,
      duration: "Akses 180 Hari",
      popular: false,
      savings: "Hemat Rp 30.000"
    },
    {
      id: "12_MONTHS",
      name: "12 Bulan",
      price: 90000,
      originalPrice: 149000,
      duration: "Akses 365 Hari",
      popular: false,
      savings: "Hemat Rp 59.000"
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
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    const message = `Halo admin Portotree, saya ingin membeli paket ${plan.name} dengan harga Rp ${plan.price.toLocaleString('id-ID')}`;
    const whatsappUrl = `https://wa.me/6283132987065?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 md:py-8 px-4 md:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-100 mb-3 md:mb-4">
          <Crown className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 md:mb-3">Upgrade ke Premium</h1>
        <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed px-2 md:px-0">
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
        <div className="flex-1 flex flex-col gap-3 md:gap-4">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative border-2 rounded-2xl p-4 md:p-5 cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-md md:scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4 bg-amber-500 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-sm">
                  Paling Populer
                </div>
              )}
              
              <div className="flex items-center gap-3 md:gap-4">
                {/* Radio check visualization */}
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedPlan === plan.id ? 'border-emerald-500' : 'border-slate-300'
                }`}>
                  {selectedPlan === plan.id && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-500 rounded-full" />}
                </div>

                <div className="flex-1 flex items-center justify-between gap-2">
                  <div>
                    <h3 className={`font-bold text-base md:text-lg mb-0.5 md:mb-1 ${selectedPlan === plan.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500">{plan.duration}</p>
                  </div>
                  
                  <div className="text-right">
                    {plan.originalPrice && (
                      <div className="text-[10px] md:text-xs text-slate-400 line-through mb-0.5">
                        Rp {plan.originalPrice.toLocaleString('id-ID')}
                      </div>
                    )}
                    <div className="font-extrabold text-lg md:text-xl text-slate-800 leading-tight">
                      Rp {plan.price.toLocaleString('id-ID')}
                    </div>
                    {plan.savings && (
                      <div className="text-[10px] md:text-xs font-semibold text-emerald-600 mt-0.5 md:mt-1">
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
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi admin
              </>
            )}
          </button>
          
          <div className="text-center mt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
             <span>Harga diatas sudah keseluruhan</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
