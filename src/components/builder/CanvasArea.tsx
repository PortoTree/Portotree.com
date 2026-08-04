// @ts-nocheck
"use client";

import { Suspense, useState, useEffect } from "react";
import { ArrowLeft, Monitor, Smartphone, Eye, Pencil, Globe, Save, Loader2 } from "lucide-react";
import { useBuilderState } from "./useBuilderState";
import { StorefrontProvider } from "@/components/storefront/StorefrontProvider";
import { PortfolioDataForm } from "./panels/PortfolioDataForm";
import { PortfolioViewer } from "./PortfolioViewer";
import { PortfolioData, defaultPortfolioData } from "@/lib/portfolioData";
import { useRouter } from "next/navigation";

function BuilderContent() {
  const state = useBuilderState();
  const {
    isLoading,
    isSaving,
    hasChanges,
    sections,
    setSections,
    setHasChanges,
    handleSave,
    theme,
    previewMode,
    setPreviewMode,
  } = state;
  const router = useRouter();

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [localData, setLocalData] = useState<PortfolioData>(defaultPortfolioData);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Parse portfolio data from sections
  useEffect(() => {
    if (!isLoading && sections) {
      const dataSection = sections.find((s) => s.type === "PORTFOLIO_DATA");
      if (dataSection && dataSection.config && Object.keys(dataSection.config).length > 0) {
        setLocalData(dataSection.config as PortfolioData);
      }
      setDataLoaded(true);
    }
  }, [isLoading, sections]);

  const handleDataChange = (newData: PortfolioData) => {
    setLocalData(newData);
    setHasChanges(true);

    const dataSectionIndex = sections.findIndex((s) => s.type === "PORTFOLIO_DATA");
    if (dataSectionIndex >= 0) {
      const newSections = [...sections];
      newSections[dataSectionIndex] = {
        ...newSections[dataSectionIndex],
        config: newData,
      };
      setSections(newSections);
    } else {
      setSections([
        ...sections,
        {
          id: "new-portfolio-data",
          type: "PORTFOLIO_DATA",
          config: newData,
          elements: [],
          order: sections.length,
          isActive: true,
        },
      ]);
    }
  };

  if (isLoading || !dataLoaded) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center space-y-8 z-[200]">
        <div className="w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-2 px-4 w-full">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest animate-pulse">Loading Workspace</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-slate-100 flex flex-col overflow-hidden`}>
      {/* HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/personal/dashboard/storefront")}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <span className="font-bold text-slate-800 hidden sm:block">Portfolio Builder</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'mobile' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => window.open('/', '_blank')}
            className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" /> <span className="hidden md:inline">Preview</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${hasChanges ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"}`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="hidden md:inline">{isSaving ? "Saving..." : "Simpan"}</span>
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - FORM */}
        <div className={`${showMobilePreview ? 'hidden' : 'flex flex-col'} w-full sm:w-80 md:w-96 flex-shrink-0 bg-white border-r border-slate-200 z-10 shadow-lg`}>
          <PortfolioDataForm data={localData} onChange={handleDataChange} />
        </div>

        {/* RIGHT CANVAS - PREVIEW */}
        <div className={`${!showMobilePreview ? 'hidden sm:flex' : 'flex'} flex-1 bg-slate-200 overflow-y-auto relative`}>
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          
          <div className={`mx-auto transition-all duration-300 min-h-full ${previewMode === 'mobile' ? 'w-full sm:max-w-[414px] shadow-2xl bg-white sm:my-8 sm:rounded-[40px] sm:border-8 sm:border-slate-800 sm:h-fit overflow-hidden' : 'w-full bg-white shadow-xl my-4 rounded-xl max-w-6xl'}`}>
            <PortfolioViewer data={localData} isMobilePreview={previewMode === 'mobile'} />
          </div>
        </div>

        {/* FLOATING MOBILE PREVIEW BUTTON */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className={`sm:hidden fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-2xl text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${showMobilePreview ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}
        >
          {showMobilePreview ? <Pencil className="w-5 h-5" /> : <Eye className="w-5 h-5" />} 
          <span>{showMobilePreview ? 'Edit Data' : 'Preview'}</span>
        </button>
      </main>
    </div>
  );
}

export default function VisualPageBuilder() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center space-y-8 z-[200]">
        <div className="w-20 h-20 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-2 px-4 w-full">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest animate-pulse">Loading Workspace</h2>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}


