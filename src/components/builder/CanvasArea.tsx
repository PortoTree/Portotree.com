// @ts-nocheck
"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { ArrowLeft, Monitor, Smartphone, Eye, Pencil, Globe, Save, Loader2 } from "lucide-react";
import { useBuilderState } from "./useBuilderState";
import { StorefrontProvider } from "@/components/storefront/StorefrontProvider";
import { PortfolioDataForm } from "./panels/PortfolioDataForm";
import { PortfolioViewer } from "./PortfolioViewer";
import { PortfolioData, defaultPortfolioData } from "@/lib/portfolioData";
import { useRouter } from "next/navigation";
import UsernamePicker from "./UsernamePicker";
import { getMyPortfolio, savePortfolio } from "@/app/actions/portfolio";

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
  const [myUsername, setMyUsername] = useState<string | null>(null);
  const [showUsernamePicker, setShowUsernamePicker] = useState(false);
  const [firestoreSaving, setFirestoreSaving] = useState(false);

  // Cek apakah user sudah punya username di Firestore (silent check, tanpa popup)
  useEffect(() => {
    async function checkExistingUsername() {
      try {
        const result = await getMyPortfolio();
        if (result.success && result.username) {
          setMyUsername(result.username);
          console.log('[DEBUG] User sudah punya username:', result.username);
        } else {
          console.log('[DEBUG] User belum punya username (popup akan muncul saat pertama kali simpan)');
        }
      } catch (err) {
        console.error('[DEBUG] Error checking username:', err);
      }
    }
    checkExistingUsername();
  }, []);

  // Handler saat username berhasil di-publish
  const handleUsernameComplete = useCallback(async (username: string) => {
    setMyUsername(username);
    setShowUsernamePicker(false);
    console.log('[DEBUG] Username dipilih & published:', username);

    // Setelah publish, langsung simpan portfolio data ke Firestore
    setFirestoreSaving(true);
    try {
      const result = await savePortfolio(localData);
      if (result.success) {
        console.log('[DEBUG] Portfolio berhasil disimpan ke Firestore setelah publish');
      } else {
        console.error('[DEBUG] Gagal simpan ke Firestore:', result.error);
      }
    } catch (err) {
      console.error('[DEBUG] Error saving to Firestore:', err);
    }
    setFirestoreSaving(false);
  }, [localData]);

  // Handler save: jika belum punya username → tampilkan popup, jika sudah → langsung simpan
  const handleFullSave = useCallback(async () => {
    // 1. Simpan sections ke localStorage langsung (bypass API calls dari handleSave)
    try {
      localStorage.setItem('draft_template_sections', JSON.stringify(sections));
      setHasChanges(false);
      console.log('[DEBUG] Sections berhasil disimpan ke localStorage');
    } catch (err) {
      console.error('[DEBUG] Gagal simpan ke localStorage:', err);
    }

    // 2. Jika belum punya username → tampilkan popup publish
    if (!myUsername) {
      console.log('[DEBUG] Belum punya username, tampilkan popup publish');
      setShowUsernamePicker(true);
      return;
    }

    // 3. Sudah punya username → langsung simpan ke Firestore
    setFirestoreSaving(true);
    try {
      const result = await savePortfolio(localData);
      if (result.success) {
        console.log('[DEBUG] Portfolio berhasil disimpan ke Firestore');
      } else {
        console.error('[DEBUG] Gagal simpan ke Firestore:', result.error);
      }
    } catch (err) {
      console.error('[DEBUG] Error saving to Firestore:', err);
    }
    setFirestoreSaving(false);
  }, [sections, setHasChanges, myUsername, localData]);

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
            onClick={() => router.push("/personal/dashboard/portfolio")}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <span className="font-bold text-slate-800 hidden md:block">Portfolio Builder</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200">
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
            onClick={() => {
              if (myUsername) {
                window.open(`https://portotree.com/p/${myUsername}`, '_blank');
              } else {
                setShowUsernamePicker(true);
              }
            }}
            className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" /> <span className="hidden md:inline">Preview</span>
          </button>
          
          <button
            onClick={handleFullSave}
            disabled={!hasChanges || isSaving || firestoreSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${hasChanges ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"}`}
          >
            {(isSaving || firestoreSaving) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="hidden md:inline">{(isSaving || firestoreSaving) ? "Saving..." : "Simpan"}</span>
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - FORM */}
        <div className="w-1/3 min-w-[320px] max-w-[400px] flex-shrink-0 bg-white border-r border-slate-200 z-10 shadow-lg flex flex-col h-full overflow-hidden">
          <PortfolioDataForm data={localData} onChange={handleDataChange} />
        </div>

        {/* RIGHT CANVAS - PREVIEW */}
        <div className="flex-1 bg-slate-200 overflow-y-hidden relative flex flex-col items-center justify-center py-2 px-4 md:py-4 md:px-8 h-full">
          <div 
            style={previewMode === 'mobile' ? { width: '375px' } : {}}
            className={`mx-auto transition-all duration-300 w-full scroll-smooth ${
            previewMode === 'mobile' 
              ? 'h-full max-h-[896px] shadow-2xl bg-white rounded-3xl border-8 border-slate-900 overflow-y-auto scrollbar-hide relative flex-shrink-0 ring-4 ring-slate-800' 
              : 'bg-white shadow-xl rounded-xl max-w-6xl h-full overflow-y-auto custom-scrollbar'
          }`}>
            {/* iPhone Hardware Elements */}
            {previewMode === 'mobile' && (
              <>
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-[100] pointer-events-none">
                  <div className="w-32 h-full bg-slate-900 rounded-b-2xl"></div>
                </div>
                <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-[100] pointer-events-none">
                  <div className="w-32 h-1.5 bg-slate-800/20 backdrop-blur-sm rounded-full"></div>
                </div>
              </>
            )}
            
            <PortfolioViewer data={localData} isMobilePreview={previewMode === 'mobile'} />
          </div>
        </div>

        {/* FLOATING MOBILE PREVIEW BUTTON */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className={`hidden fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-2xl text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${showMobilePreview ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}
        >
          {showMobilePreview ? <Pencil className="w-5 h-5" /> : <Eye className="w-5 h-5" />} 
          <span>{showMobilePreview ? 'Edit Data' : 'Preview'}</span>
        </button>
      </main>

      {/* Username Picker Popup */}
      {showUsernamePicker && (
        <UsernamePicker
          isOpen={showUsernamePicker}
          onComplete={handleUsernameComplete}
          onCancel={() => setShowUsernamePicker(false)}
          suggestedName={localData?.personal?.name}
        />
      )}
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


