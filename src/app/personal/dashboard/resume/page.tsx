"use client";

import { useState, useEffect } from "react";
import { Edit3, Download, Share2, Settings, Clock, Calendar } from "lucide-react";
import { getCVData } from "@/app/actions/cv";
import { CVDataPayload, defaultCVConfig } from "@/lib/cvData";
import { defaultPortfolioData } from "@/lib/portfolioData";
import { CVViewer } from "@/components/cv-builder/CVViewer";
import ProgressResume from "@/components/dashboard/ProgressResume";
import { createPortal } from "react-dom";
import { useUI } from "@/components/ui/UIProvider";
import { useRouter } from "next/navigation";
import { checkDownloadLimit } from "@/app/actions/subscription";

export default function ResumeDashboardPage() {
  const [data, setData] = useState<CVDataPayload | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("-");
  const [createdAt, setCreatedAt] = useState<string>("-");
  
  const { showConfirm, showToast } = useUI();
  const router = useRouter();
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleDownload = async () => {
    if (!data) return;
    
    const limitCheck = await checkDownloadLimit('cv');
    
    if (!limitCheck.success) {
      if (limitCheck.limitReached) {
        setShowPaywall(true);
      } else {
        if (showToast) showToast("Terjadi kesalahan sistem, silakan coba lagi", "error");
      }
      return;
    }

    if (window.innerWidth >= 768) {
      if (showConfirm) {
        showConfirm({
          title: "Perhatian Sebelum Cetak",
          message: "Jika layar cetak (Preview PDF) terlihat kosong atau terpotong, pastikan Anda mengubah pengaturan 'Margins' menjadi 'None' (Tidak Ada) pada menu pengaturan Print.",
          variant: "primary",
          confirmText: "Mengerti & Cetak",
          cancelText: "Batal",
          onConfirm: () => {
            setIsPrinting(true);
            setTimeout(() => {
              window.print();
              setTimeout(() => setIsPrinting(false), 500);
            }, 500);
          }
        });
      } else {
        // Fallback
        setIsPrinting(true);
        setTimeout(() => {
          window.print();
          setTimeout(() => setIsPrinting(false), 500);
        }, 500);
      }
    } else {
      setIsPrinting(true);
      setTimeout(() => {
        window.print();
        setTimeout(() => setIsPrinting(false), 500);
      }, 500);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const CACHE_KEY = 'dashboard_cv_cache';
        const cachedStr = sessionStorage.getItem(CACHE_KEY);
        
        if (cachedStr) {
          try {
            const parsed = JSON.parse(cachedStr);
            // Cache valid for 5 minutes
            if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
              setData(parsed.data);
              setUpdatedAt(new Date(parsed.timestamp).toLocaleDateString('id-ID'));
              setCreatedAt(new Date(parsed.timestamp).toLocaleDateString('id-ID'));
              return;
            }
          } catch (e) {
            // Ignore parse errors and fetch fresh
          }
        }

        const res = await getCVData();
        if (res.success && res.data) {
          setData(res.data);
          const nowStr = new Date().toLocaleDateString('id-ID');
          setUpdatedAt(nowStr);
          setCreatedAt(nowStr);
          
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            data: res.data,
            timestamp: Date.now()
          }));
        } else {
          setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
        }
      } catch (e) {
        console.error(e);
        setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
      }
    }
    loadData();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1.5 md:mb-2">Resume / CV</h1>
        <p className="text-sm md:text-base text-slate-500">Kelola resume professional anda.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* KOLOM KIRI: Preview CV & CTA */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* PREVIEW KARTU */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-100 relative overflow-hidden border-b border-slate-200" style={{ height: '340px' }}>
              {data && (
                <div 
                  className="absolute top-0 left-0 pointer-events-none origin-top-left flex items-start justify-center pt-4"
                  style={{ width: '300%', height: '300%', transform: 'scale(0.333)' }}
                >
                  {/* Wrap with a fixed A4 container to maintain aspect ratio in preview */}
                  <div className="bg-white shadow-xl" style={{ width: '210mm', minHeight: '297mm' }}>
                    <CVViewer data={data} forceScale={1} hideZoomControls={true} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-4">
                <a
                  href="/resume-builder"
                  className="flex items-center justify-center gap-2 py-2 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Resume
                </a>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 py-2 px-6 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-sm shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
            </div>
          </div>

          {/* CTA GANTI TEMPLATE */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between shadow-lg border border-slate-800">
            <div>
              <h3 className="text-xl font-bold mb-1">Ingin Mengganti Desain CV?</h3>
              <p className="text-slate-300 text-sm">Jelajahi galeri template kami dan temukan desain yang paling cocok untuk karir Anda.</p>
            </div>
            <a href="/personal/dashboard/resume/template" className="mt-4 sm:mt-0 whitespace-nowrap bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors shadow-md flex items-center gap-2">
              Lihat Template
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN: Info & Progress */}
        <div className="w-full lg:w-[340px] flex-shrink-0 space-y-6">
          {/* RESUME INFO */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-sm">Resume Info</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> Terakhir Edit
                </span>
                <span className="font-medium text-slate-700">{updatedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> Dibuat
                </span>
                <span className="font-medium text-slate-700">{createdAt}</span>
              </div>
            </div>
          </div>

          {/* PROGRESS RESUME */}
          <div className="w-full">
            <ProgressResume />
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Limit Unduh Gratis Habis!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Anda telah menggunakan jatah 1x unduh gratis untuk Resume/CV. Dapatkan akses cetak <span className="font-semibold text-slate-800">sepuasnya tanpa batas dan tanpa watermark</span> dengan berlangganan Paket Premium.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => router.push('/personal/dashboard/langganan')}
                className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
              >
                Lihat Paket Premium
              </button>
              <button 
                onClick={() => setShowPaywall(false)}
                className="w-full py-3 px-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Container */}
      {isPrinting && typeof window !== 'undefined' && data && createPortal(
        <div className="print-container-wrapper bg-white">
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body > :not(.print-container-wrapper) {
                display: none !important;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                overflow: visible !important;
              }
              .print-container-wrapper {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                position: static !important;
              }
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
                page-break-after: always;
                break-after: page;
              }
              .cv-page:last-child {
                page-break-after: auto;
                break-after: auto;
              }
            }
            @media screen {
              .print-container-wrapper {
                opacity: 0;
                position: fixed;
                pointer-events: none;
                top: -9999px;
                left: -9999px;
                z-index: -9999;
                width: 10px;
                height: 10px;
                overflow: hidden;
              }
            }
          `}} />
          <div className="bg-white">
            <CVViewer data={data} forceScale={1} hideZoomControls={true} />
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
