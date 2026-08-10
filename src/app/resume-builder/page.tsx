"use client";

import { useCvBuilderState } from "@/components/cv-builder/useCvBuilderState";
import { CVViewer } from "@/components/cv-builder/CVViewer";
import { CVDataForm } from "@/components/cv-builder/CVDataForm";
import { Navbar } from "@/components/layout/Navbar"; // Assume this exists
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Download, ArrowLeft, Edit, Palette, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CVBuilderPage() {
  const { data, isLoading, updateConfig, updatePortfolio, toggleVisibility } = useCvBuilderState();
  const [sidebarMode, setSidebarMode] = useState<'edit' | 'design'>('edit');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Basic print function
  const handlePrint = () => {
    window.print();
  };

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
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
          <div className="flex md:hidden items-center bg-slate-100 p-1 rounded-xl">
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

          <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-3 md:px-4">
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
            title="Pengaturan Desain"
          >
            <Palette className="w-5 h-5" />
          </button>
        </aside>

        {/* Middle Sidebar - Active Panel - hidden when printing */}
        <div className={`w-full md:w-[550px] shrink-0 border-r bg-white overflow-y-auto custom-scrollbar print:hidden h-full relative z-10 ${showMobilePreview ? 'hidden md:block' : 'block'}`}>
          
          {sidebarMode === 'design' && (
            <div className="flex flex-col">
              <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
                <h2 className="font-bold text-sm uppercase text-gray-500">Pengaturan Desain</h2>
                <p className="text-xs text-gray-500 mt-1">Ubah tampilan visual dan sembunyikan item khusus untuk CV.</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  
                  <div>
                    <label className="text-sm font-medium mb-3 block">Pilih Template ATS</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateConfig({ templateId: 'ats-modern' })}
                        className={`flex flex-col items-center p-3 border rounded-xl transition-all relative ${config.templateId === 'ats-modern' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="w-full aspect-[1/1.4] bg-gray-100 rounded mb-2 border shadow-sm overflow-hidden">
                          <img src="/resume-modern.jpg" alt="Modern Template" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-semibold text-center leading-tight mt-1">Modern<br/><span className="text-[10px] font-normal text-gray-500">(2 Kolom)</span></div>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">Free</div>
                      </button>
                      
                      <button
                        onClick={() => updateConfig({ templateId: 'ats-classic' })}
                        className={`flex flex-col items-center p-3 border rounded-xl transition-all relative ${config.templateId === 'ats-classic' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="w-full aspect-[1/1.4] bg-gray-100 rounded mb-2 border shadow-sm overflow-hidden">
                          <img src="/resume-clasic.jpg" alt="Classic Template" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-semibold text-center leading-tight mt-1">Klasik<br/><span className="text-[10px] font-normal text-gray-500">(1 Kolom)</span></div>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">Free</div>
                      </button>
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
                <CVDataForm data={portfolio} onChange={updatePortfolio} isCVMode={true} />
              </div>
            </div>
          )}

        </div>

        {/* Right Area - Live Preview */}
        <main className={`flex-1 overflow-y-auto custom-scrollbar relative bg-gray-200 print:bg-white print:overflow-visible print:h-auto h-full ${!showMobilePreview ? 'hidden md:block' : 'block'}`}>
          {/* Zoom controls could go here */}
          <CVViewer data={data} />
        </main>
        
        {/* FLOATING MOBILE PREVIEW BUTTON */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className={`md:hidden fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-2xl text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${!showMobilePreview ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}
        >
          {showMobilePreview ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />} 
          <span>{showMobilePreview ? 'Edit Data' : 'Preview'}</span>
        </button>
      </div>
      
      {/* Print Specific CSS overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-print-container, #cv-print-container * {
            visibility: visible;
          }
          #cv-print-container {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0 !important;
            padding: 0 !important;
          }
          .cv-page {
            box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}} />
    </div>
  );
}
