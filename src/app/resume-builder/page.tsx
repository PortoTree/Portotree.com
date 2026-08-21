"use client";

import { useCvBuilderState } from "@/components/cv-builder/useCvBuilderState";
import { CVViewer } from "@/components/cv-builder/CVViewer";
import { CVDataForm } from "@/components/cv-builder/CVDataForm";
import { Navbar } from "@/components/layout/Navbar"; // Assume this exists
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Download, ArrowLeft, Edit, Palette, Info, Check, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useUI } from "@/components/ui/UIProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { checkDownloadLimit, getUserSubscriptionStatus } from "@/app/actions/subscription";
import { CV_TEMPLATES } from "@/lib/cvTemplates";

export default function CVBuilderPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center">
        <div className="text-slate-500 font-medium tracking-widest uppercase">Loading Resume Builder...</div>
      </div>
    }>
      <CVBuilderContent />
    </Suspense>
  );
}

function CVBuilderContent() {
  const { data, isLoading, updateConfig, updatePortfolio, toggleVisibility } = useCvBuilderState();
  const [sidebarMode, setSidebarMode] = useState<'edit' | 'design'>('edit');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const { showConfirm, showToast } = useUI();
  const [forcedLoading, setForcedLoading] = useState(true);

  const router = useRouter();
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showTemplateUpsell, setShowTemplateUpsell] = useState<{show: boolean, type: 'premium' | 'exclusive' | null, price?: number}>({show: false, type: null});
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [userStatus, setUserStatus] = useState<{isPremium: boolean, purchasedTemplates: string[]}>({isPremium: false, purchasedTemplates: []});

  // Langganan UI state
  const [selectedPlan, setSelectedPlan] = useState<string>("3_MONTHS");
  const [isProcessing, setIsProcessing] = useState(false);
  const plans = [
    { id: "1_MONTH", name: "1 Bulan", price: 12000, originalPrice: 20000, duration: "Akses 30 Hari", popular: false, savings: "Hemat Rp 8.000" },
    { id: "3_MONTHS", name: "3 Bulan", price: 32000, originalPrice: 48000, duration: "Akses 90 Hari", popular: true, savings: "Hemat Rp 16.000" },
    { id: "6_MONTHS", name: "6 Bulan", price: 55000, originalPrice: 85000, duration: "Akses 180 Hari", popular: false, savings: "Hemat Rp 30.000" },
    { id: "12_MONTHS", name: "12 Bulan", price: 90000, originalPrice: 149000, duration: "Akses 365 Hari", popular: false, savings: "Hemat Rp 59.000" }
  ];
  const features = [
    "Akses & Download Semua Template CV Premium",
    "Unlimited Download CV / Resume",
    "Unlimited Download Semua Jenis Surat",
    "Tanpa Watermark 'Made with PortoTree'",
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

  const searchParams = useSearchParams();
  const templateQuery = searchParams.get('template');

  useEffect(() => {
    const timer = setTimeout(() => setForcedLoading(false), 2000);
    
    // Fetch user status for template validation
    getUserSubscriptionStatus().then(res => {
      if (res.success) {
        setUserStatus({
          isPremium: res.isPremium || false,
          purchasedTemplates: res.purchasedTemplates || []
        });
      }
    });

    return () => clearTimeout(timer);
  }, []);

  // Handle template selection from URL query
  const [hasAppliedTemplate, setHasAppliedTemplate] = useState(false);
  
  useEffect(() => {
    if (data && templateQuery && !hasAppliedTemplate) {
      if (data.config.templateId !== templateQuery) {
        updateConfig({ templateId: templateQuery });
      }
      setHasAppliedTemplate(true);
      // Clean up URL after applying template
      router.replace('/resume-builder', { scroll: false });
    }
  }, [data, templateQuery, hasAppliedTemplate, router]);

  // Basic print function
  const handlePrint = async () => {
    // 1. Template Tier Check
    const activeTemplate = CV_TEMPLATES.find(t => t.id === data?.config.templateId) || CV_TEMPLATES[0];
    
    if (activeTemplate.tier === 'premium' && !userStatus.isPremium) {
      setShowTemplateUpsell({ show: true, type: 'premium' });
      return;
    }
    
    if (activeTemplate.tier === 'exclusive' && !userStatus.purchasedTemplates.includes(activeTemplate.id)) {
      setShowTemplateUpsell({ show: true, type: 'exclusive', price: activeTemplate.price });
      return;
    }

    setIsCheckingLimit(true);
    const limitCheck = await checkDownloadLimit('cv');
    setIsCheckingLimit(false);

    if (!limitCheck.success) {
      if (limitCheck.limitReached) {
        setShowPaywall(true);
      } else {
        showToast("Terjadi kesalahan sistem, silakan coba lagi", "error");
      }
      return;
    }

    if (window.innerWidth >= 768) {
      showConfirm({
        title: "Perhatian Sebelum Cetak",
        message: "Jika layar cetak (Preview PDF) terlihat kosong atau terpotong, pastikan Anda mengubah pengaturan 'Margins' menjadi 'None' (Tidak Ada) pada menu pengaturan Print.",
        variant: "primary",
        confirmText: "Mengerti & Cetak",
        cancelText: "Batal",
        onConfirm: () => {
          setTimeout(() => window.print(), 100);
        }
      });
    } else {
      window.print();
    }
  };

  if (forcedLoading || isLoading || !data) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center">
        <img 
          src="/loading-gif.gif" 
          alt="Loading..."
          className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90"
        />
        <div className="flex flex-col items-center justify-center -mt-2 md:-mt-6">
          <div className="w-48 md:w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
            <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-full w-full"
              style={{
                animation: 'progress 2s linear forwards'
              }}
            ></div>
          </div>
          <style>
            {`
              @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}
          </style>
          <p className="text-slate-500 text-xs md:text-sm mt-3 font-medium tracking-widest uppercase">
            Resume sedang di siapkan...
          </p>
        </div>
      </div>
    );
  }

  const { portfolio, config } = data;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 print:bg-white print:h-auto print:overflow-visible">
      {/* Top Navbar - hidden when printing */}
      <div className="print:hidden h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/personal/dashboard/resume" className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-base md:text-lg hidden md:block shrink-0">CV Builder</h1>
          
          <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1"></div>
          <a 
            href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100 hover:border-red-200 group shrink-0"
            title="Join grub whatsapp kami untuk memberikan pesan kritik dan saran"
          >
            <Info className="w-4 h-4 group-hover:text-red-700 transition-colors shrink-0" />
            <span className="text-[10px] md:text-xs font-bold group-hover:text-red-700 transition-colors whitespace-nowrap">
              Mengalami masalah?
            </span>
          </a>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Navigation Toggles */}
          <div className={`md:hidden items-center bg-slate-100 p-1 rounded-xl ${showMobilePreview ? 'hidden' : 'flex'}`}>
            <button 
              onClick={() => setSidebarMode('edit')} 
              className={`p-2 rounded-lg transition-all ${sidebarMode === 'edit' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSidebarMode('design')} 
              className={`p-2 rounded-lg transition-all ${sidebarMode === 'design' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              <Palette className="w-5 h-5" />
            </button>
          </div>

          <Button onClick={handlePrint} className={`bg-green-600 hover:bg-green-700 text-white rounded-full px-3 md:px-4 ${!showMobilePreview ? 'hidden md:flex' : 'flex'}`}>
            <Download className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Download PDF</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible relative">
        {/* Far Left - Icon Sidebar - hidden when printing */}
        <aside className="print:hidden w-16 shrink-0 bg-white border-r flex-col items-center py-4 space-y-4 z-20 hidden md:flex">
          <button 
            onClick={() => setSidebarMode('edit')} 
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${sidebarMode === 'edit' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Isi Data CV"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setSidebarMode('design')} 
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${sidebarMode === 'design' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Gallery Template CV"
          >
            <Palette className="w-5 h-5" />
          </button>
        </aside>

        {/* Middle Sidebar - Active Panel - hidden when printing */}
        <div className={`w-full md:w-[550px] shrink-0 border-r bg-white overflow-y-auto custom-scrollbar print:hidden h-full relative z-10 ${showMobilePreview ? 'hidden md:block' : 'block'}`}>
          
          {sidebarMode === 'design' && (
            <div className="flex flex-col">
              <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
                <h2 className="font-bold text-sm uppercase text-gray-500">Gallery Template CV</h2>
                <p className="text-xs text-gray-500 mt-1">Ubah tampilan visual dan sembunyikan item khusus untuk CV.</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  
                    <div>
                      <label className="text-sm font-medium mb-3 block">Pilih Template</label>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {CV_TEMPLATES.map((tpl) => (
                          <button
                            key={tpl.id}
                            onClick={() => {
                              updateConfig({ templateId: tpl.id });
                              router.replace(`/resume-builder?template=${tpl.id}`, { scroll: false });
                            }}
                            className={`flex flex-col items-center p-3 border rounded-xl transition-all relative ${config.templateId === tpl.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                          >
                            <div className="w-full aspect-[1/1.4] bg-gray-100 rounded mb-2 border shadow-sm overflow-hidden relative">
                              <svg viewBox="0 0 794 1123" className="w-full h-full pointer-events-none">
                                <foreignObject x="0" y="0" width="794" height="1123">
                                  <div className="w-[794px] h-[1123px] bg-white text-left">
                                    <tpl.component data={{ portfolio, config: { ...config, templateId: tpl.id } }} />
                                  </div>
                                </foreignObject>
                              </svg>
                            </div>
                            <div className="text-xs font-semibold text-center leading-tight mt-1">{tpl.name}</div>
                            
                            {/* Badge Tier */}
                            {tpl.tier === 'exclusive' && (
                              <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">Rp {(tpl.price || 0).toLocaleString('id-ID')}</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                </div>
              </div>


            </div>
          )}

          {sidebarMode === 'edit' && (
            <div className="flex flex-col">
              <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
                <h2 className="font-bold text-sm uppercase text-gray-500">Isi Data CV</h2>
                <p className="text-xs text-gray-500 mt-1">Data yang diisi di sini akan tersinkronisasi otomatis dengan Profil Portofolio Anda.</p>
              </div>
              <div className="flex-1 overflow-hidden flex flex-col">
                <CVDataForm data={data?.portfolio || {}} onChange={updatePortfolio} isCVMode={true} activeTemplateId={data?.config?.templateId} />
              </div>
            </div>
          )}

        </div>

        {/* Right Area - Live Preview */}
        <main className={`flex-1 overflow-y-auto custom-scrollbar relative bg-gray-200 print:bg-white print:overflow-visible print:h-auto h-full ${!showMobilePreview ? 'hidden md:block' : 'block'}`}>
          {/* Zoom controls could go here */}
          <CVViewer data={data} isPremium={userStatus.isPremium} />
        </main>
        
        {/* FLOATING MOBILE PREVIEW BUTTON */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className={`md:hidden fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-2xl text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 print:hidden ${!showMobilePreview ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}
        >
          {showMobilePreview ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />} 
          <span>{showMobilePreview ? 'Edit Data' : 'Preview'}</span>
        </button>
      </div>
      
      {/* Print Specific CSS overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          #cv-print-container {
            transform: none !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            margin: 0 auto !important;
            width: 210mm !important;
            min-width: 210mm !important;
          }
          .cv-page {
            box-shadow: none !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            page-break-after: always;
            page-break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 0 !important;
          }
        }
      `}} />

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 animate-in fade-in duration-200 print:hidden">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Limit Unduh Gratis Habis!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Anda telah menggunakan jatah 1x unduh gratis untuk CV. Dapatkan akses cetak <span className="font-semibold text-slate-800">sepuasnya tanpa batas dan tanpa watermark</span> dengan berlangganan Paket Premium.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => router.push('/personal/dashboard/langganan')}
                className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
              >
                Lihat Paket Langganan
              </button>
              <button 
                onClick={() => setShowPaywall(false)}
                className="w-full py-3 px-4 bg-white text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-95 border border-slate-200"
              >
                Nanti Dulu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Upsell Modal */}
      {showTemplateUpsell.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 animate-in fade-in duration-200 print:hidden overflow-y-auto">
          {showTemplateUpsell.type === 'premium' ? (
            showPricingModal ? (
              <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 relative overflow-hidden">
                
                {/* Fixed Header with Close Button */}
                <div className="flex justify-end p-4 pb-0 shrink-0 relative z-10 bg-white">
                  <button 
                    onClick={() => {
                      setShowTemplateUpsell({show: false, type: null});
                      setShowPricingModal(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="p-5 md:p-8 pt-0 md:pt-2 overflow-y-auto custom-scrollbar">
                  
                  {/* Header Section */}
                  <div className="text-center mb-6 md:mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-100 mb-3 md:mb-4">
                      <Crown className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
                    </div>
                    <h1 className="text-xl md:text-3xl font-extrabold text-slate-800 mb-2 md:mb-3 leading-tight">Upgrade ke Premium</h1>
                    <p className="text-xs md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed px-2 md:px-0">
                      Template ini khusus untuk member Premium. Buka akses tanpa batas ke semua fitur PortoTree, termasuk template ini.
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    
                    {/* Left: Features */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
                      <h2 className="text-base md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-500" />
                        Fitur Paket Premium
                      </h2>
                      
                      <ul className="space-y-3 md:space-y-4">
                        {features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
                            </div>
                            <span className="text-xs md:text-sm text-slate-700 font-medium leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 md:mt-8 p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-[11px] md:text-sm text-blue-800 font-medium leading-relaxed">
                          <strong>Info:</strong> Paket ini adalah langganan berjangka (Sekali Bayar). Tidak otomatis memotong saldo.
                        </p>
                      </div>
                    </div>

                    {/* Right: Pricing Plans */}
                    <div className="flex-1 flex flex-col gap-2.5 md:gap-4">
                      {plans.map((plan) => (
                        <div 
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`relative border-2 rounded-xl md:rounded-2xl p-3.5 md:p-5 cursor-pointer transition-all duration-200 ${
                            selectedPlan === plan.id 
                              ? 'border-emerald-500 bg-emerald-50/50 shadow-md md:scale-[1.02]' 
                              : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-2.5 right-3 bg-amber-500 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-sm">
                              Populer
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3 md:gap-4">
                            {/* Radio check visualization */}
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              selectedPlan === plan.id ? 'border-emerald-500' : 'border-slate-300'
                            }`}>
                              {selectedPlan === plan.id && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-500 rounded-full" />}
                            </div>

                            <div className="flex-1 flex items-center justify-between gap-1.5 md:gap-2">
                              <div>
                                <h3 className={`font-bold text-sm md:text-lg mb-0 md:mb-1 ${selectedPlan === plan.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                                  {plan.name}
                                </h3>
                                <p className="text-[10px] md:text-sm text-slate-500">{plan.duration}</p>
                              </div>
                              
                              <div className="text-right">
                                {plan.originalPrice && (
                                  <div className="text-[9px] md:text-xs text-slate-400 line-through mb-0 md:mb-0.5">
                                    Rp {plan.originalPrice.toLocaleString('id-ID')}
                                  </div>
                                )}
                                <div className="font-extrabold text-sm md:text-xl text-slate-800 leading-tight">
                                  Rp {plan.price.toLocaleString('id-ID')}
                                </div>
                                {plan.savings && (
                                  <div className="text-[9px] md:text-xs font-semibold text-emerald-600 mt-0 md:mt-1">
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
                        className="w-full mt-3 md:mt-4 py-3 md:py-4 px-4 md:px-6 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-md shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-lg"
                      >
                        Beli Paket Premium Sekarang
                      </button>
                      <button 
                        onClick={() => setShowPricingModal(false)}
                        className="w-full py-2.5 md:py-3 px-4 bg-white text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-95 border border-slate-200 text-xs md:text-base"
                      >
                        Kembali
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-amber-100 text-amber-500">
                  <Palette className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Template Terkunci</h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Anda sedang menggunakan <span className="font-semibold text-slate-800">Template Premium</span>. Untuk mengunduh CV dengan desain ini, silakan upgrade ke Paket Premium.
                </p>
                
                <div className="flex flex-col gap-3 w-full">
                  <button 
                    onClick={() => setShowPricingModal(true)}
                    className="w-full py-3 px-4 font-bold rounded-xl text-white transition-all active:scale-95 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-200"
                  >
                    Upgrade ke Premium
                  </button>
                  <button 
                    onClick={() => {
                      setShowTemplateUpsell({show: false, type: null});
                      setShowPricingModal(false);
                    }}
                    className="w-full py-3 px-4 bg-white text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-95 border border-slate-200"
                  >
                    Kembali Edit
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-purple-100 text-purple-600">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Template Terkunci</h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                Anda sedang menggunakan <span className="font-semibold text-slate-800">Template Exclusive</span>. Template ini dapat dibeli secara terpisah seharga <span className="font-bold text-slate-900">Rp {(showTemplateUpsell.price || 0).toLocaleString('id-ID')}</span>.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => {
                    const activeTpl = CV_TEMPLATES.find(t => t.id === data?.config.templateId);
                    const msg = `Halo admin, saya ingin membeli Template CV Exclusive: ${activeTpl?.name} seharga Rp ${(activeTpl?.price || 0).toLocaleString('id-ID')}`;
                    window.open(`https://wa.me/6283132987065?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="w-full py-3 px-4 font-bold rounded-xl text-white transition-all active:scale-95 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"
                >
                  Beli Template Sekarang
                </button>
                <button 
                  onClick={() => {
                    setShowTemplateUpsell({show: false, type: null});
                    setShowPricingModal(false);
                  }}
                  className="w-full py-3 px-4 bg-white text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-95 border border-slate-200"
                >
                  Kembali Edit
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Overlay saat Cek Limit */}
      {isCheckingLimit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md print:hidden">
          <div className="flex flex-col items-center gap-3">
            <img src="/loading-gif.gif" alt="Loading..." className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90" />
          </div>
        </div>
      )}
    </div>
  );
}

