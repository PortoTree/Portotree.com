// @ts-nocheck
"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { ArrowLeft, Monitor, Smartphone, Eye, Pencil, Globe, Save, Loader2, Info } from "lucide-react";
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

  // Set default preview mode to mobile on small screens
  useEffect(() => {
    if (window.innerWidth < 768) {
      setPreviewMode('mobile');
    }
  }, [setPreviewMode]);

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
        
        // Recover data from Firestore if local draft is John Doe or empty
        if (result.success && result.data) {
          const localDraft = localStorage.getItem('draft_template_sections');
          const isLocalDefault = !localDraft || localDraft.includes('"name":"John Doe"');
          if (isLocalDefault) {
            console.log('[DEBUG] Local draft is default or empty. Restoring from Firestore...');
            
            // Reconstruct sections with restored data
            const restoredSections = [{
              id: "portfolio-data-1",
              type: "PORTFOLIO_DATA",
              order: 999,
              isActive: false, // hidden section
              config: result.data as any,
              elements: []
            }];
            setSections(restoredSections);
            setLocalData(result.data as PortfolioData);
            setDataLoaded(true);
          }
        }
      } catch (err) {
        console.error('[DEBUG] Error checking username or restoring data:', err);
      }
    }
    checkExistingUsername();
  }, [setSections]);

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
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
          <span className="font-bold text-slate-800 hidden md:block shrink-0">Portofolio Builder</span>

          {/* HELP BUTTON */}
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

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200">
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
        <div className={`w-full md:w-1/3 md:min-w-[320px] md:max-w-[400px] flex-shrink-0 bg-white border-r border-slate-200 z-10 shadow-lg flex-col h-full overflow-hidden ${showMobilePreview ? 'hidden md:flex' : 'flex'}`}>
          <PortfolioDataForm data={localData} onChange={handleDataChange} />
        </div>

        {/* RIGHT CANVAS - PREVIEW */}
        <div className={`flex-1 bg-slate-200 overflow-y-hidden relative flex-col items-center justify-center p-0 md:py-4 md:px-8 h-full ${!showMobilePreview ? 'hidden md:flex' : 'flex'}`}>
          <div 
            className={`mx-auto transition-all duration-300 w-full h-full bg-white relative ${
            previewMode === 'mobile' 
              ? 'md:w-[375px] md:max-h-[896px] md:shadow-2xl md:rounded-3xl md:border-8 md:border-slate-900 md:flex-shrink-0 md:ring-4 md:ring-slate-800 overflow-hidden' 
              : 'md:shadow-xl md:rounded-xl max-w-6xl overflow-hidden'
          }`}>
            {/* iPhone Hardware Elements (Hidden on mobile) */}
            {previewMode === 'mobile' && (
              <div className="hidden md:block">
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-[100] pointer-events-none">
                  <div className="w-32 h-full bg-slate-900 rounded-b-2xl"></div>
                </div>
                <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-[100] pointer-events-none">
                  <div className="w-32 h-1.5 bg-slate-800/20 backdrop-blur-sm rounded-full"></div>
                </div>
              </div>
            )}
            
            {/* SCROLLABLE CONTENT */}
            <div className={`w-full h-full scroll-smooth overflow-y-auto max-md:scrollbar-hide ${previewMode === 'mobile' ? 'scrollbar-hide' : 'custom-scrollbar'}`}>
              <PortfolioViewer data={localData} isMobilePreview={previewMode === 'mobile'} showPlaceholders={true} />
            </div>
          </div>
        </div>

        {/* FLOATING MOBILE PREVIEW BUTTON */}
        <button
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className={`md:hidden fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-2xl text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${!showMobilePreview ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}
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


