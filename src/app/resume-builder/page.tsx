"use client";

import { useCvBuilderState } from "@/components/cv-builder/useCvBuilderState";
import { CVViewer } from "@/components/cv-builder/CVViewer";
import { CVDataForm } from "@/components/cv-builder/CVDataForm";
import { Navbar } from "@/components/layout/Navbar"; // Assume this exists
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Download, ArrowLeft, Edit, Palette, Info, Check, Crown, Sparkles, XCircle, CheckCircle2 } from "lucide-react";
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
  const [showTemplateUpsell, setShowTemplateUpsell] = useState<{show: boolean, type: 'premium' | 'exclusive' | null, price?: number, origin?: 'paywall'}>({show: false, type: null});
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

      
        {/* Unified Modal Wrapper */}
        {(showPaywall || showTemplateUpsell.show) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 animate-in fade-in duration-200 print:hidden overflow-y-auto">
            {showPricingModal ? (
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
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-4 md:p-8 pt-0 overflow-y-auto custom-scrollbar flex-1 relative z-0">
                    <div className="text-center mb-8 relative">
                      <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Crown className="w-8 h-8" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Upgrade ke Premium</h2>
                      <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto">
                        Buka akses tanpa batas ke semua fitur PortoTree.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                          <Sparkles className="w-5 h-5 text-emerald-500" />
                          Fitur Paket Premium
                        </h3>
                        <ul className="space-y-4">
                          {[
                            "Akses & Download Semua Template CV Premium",
                            "Unlimited Download CV / Resume",
                            "Unlimited Download Semua Jenis Surat",
                            "Tanpa Watermark 'Made with PortoTree'",
                            "Unlock Semua Kustomisasi Premium",
                            "Dukungan Pelanggan (Customer Support)"
                          ].map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                              <span className="text-sm text-slate-700 font-medium leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        {[
                          { id: '1_month', label: '1 Bulan', duration: '30 Hari', price: 12000, oldPrice: 20000, save: 8000 },
                          { id: '3_months', label: '3 Bulan', duration: '90 Hari', price: 32000, oldPrice: 48000, save: 16000, popular: true },
                          { id: '6_months', label: '6 Bulan', duration: '180 Hari', price: 55000, oldPrice: 85000, save: 30000 }
                        ].map((pkg) => (
                          <div 
                            key={pkg.id}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                              '3_months' === pkg.id 
                                ? 'border-emerald-500 bg-emerald-50/30' 
                                : 'border-slate-200 hover:border-emerald-200'
                            }`}
                          >
                            {pkg.popular && (
                              <div className="absolute -top-3 right-4 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                POPULER
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  '3_months' === pkg.id ? 'border-emerald-500' : 'border-slate-300'
                                }`}>
                                  {'3_months' === pkg.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800">{pkg.label}</div>
                                  <div className="text-xs text-slate-500">Akses {pkg.duration}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-slate-400 line-through decoration-slate-300">Rp {pkg.oldPrice.toLocaleString('id-ID')}</div>
                                <div className="font-extrabold text-slate-800 text-lg">Rp {pkg.price.toLocaleString('id-ID')}</div>
                                <div className="text-[10px] font-bold text-emerald-600">Hemat Rp {pkg.save.toLocaleString('id-ID')}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => {
                          const msg = `Halo admin, saya ingin berlangganan Paket Premium PortoTree (3 Bulan - Rp 32.000).`;
                          window.open(`https://wa.me/6283132987065?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-sm md:text-base flex items-center justify-center gap-2"
                      >
                        Beli Paket Premium Sekarang
                      </button>
                      <button 
                        onClick={() => {
                            setShowPricingModal(false);
                            if (showPaywall) {
                              setShowTemplateUpsell({show: false, type: null});
                            }
                          }}
                        className="w-full sm:w-auto py-3 px-6 bg-white text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98] border border-slate-200 text-sm md:text-base"
                      >
                        Kembali
                      </button>
                    </div>
                  </div>
                </div>
            ) : showPaywall ? (
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
                    onClick={() => {
                        setShowTemplateUpsell({show: true, type: 'premium'});
                        setShowPricingModal(true);
                      }}
                    className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
                  >Download sekarang</button>
                  <button 
                    onClick={() => setShowPaywall(false)}
                    className="w-full py-3 px-4 bg-white text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-95 border border-slate-200"
                  >
                    Nanti Dulu
                  </button>
                </div>
              </div>
            ) : showTemplateUpsell.type === 'premium' ? (
              <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-amber-100 text-amber-500">
                    <Palette className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Template Terkunci</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Anda sedang menggunakan <span className="font-semibold text-slate-800">Template Premium</span>. Untuk mengunduh CV dengan desain ini, silakan upgrade ke Paket Premium atau pilih template ATS secara <span className="font-bold italic">gratis</span>.
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
\n        {/* Loading Overlay saat Cek Limit */}
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

