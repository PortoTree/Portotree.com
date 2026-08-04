// @ts-nocheck
"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { 
  Plus, Trash2, Settings2, Sliders, Eye, Save, X, Layers, Box, LayoutTemplate, Palette, Settings, Link as LinkIcon, ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Smartphone, Monitor, Type, Image as ImageIcon, Paintbrush, Globe, Upload, Loader2, ShoppingBag, ShieldCheck, Copy, Clipboard, CopyPlus, PlusCircle, Columns, Undo2, Redo2, LayoutGrid, AlignLeft, AlignCenter, AlignRight, AlignJustify, MousePointerClick, SeparatorHorizontal, Award, Pencil, Folder, Sparkles, Link2, RotateCcw, Bold, Italic, Underline, List, ListOrdered, Maximize2, Table, Strikethrough, HelpCircle, Eraser, Quote, Minus 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StorefrontProvider } from "@/components/storefront/StorefrontProvider";
import { BuilderSection, SectionElement, ELEMENT_TYPE_MAP } from "@/components/storefront/sections/BuilderSection";
import HeaderCanvas from "@/components/storefront/sections/HeaderCanvas";
import { MediaLibraryModal } from "@/components/MediaLibraryModal";
import { LottiePanelTrigger } from "@/components/LottiePanelTrigger";

// Import custom hook, sidebar UI, dan template struktur section
import { useBuilderState, SECTION_STRUCTURE_TEMPLATES } from "./useBuilderState";
import { FloatingModal } from "./components/FloatingModal";
import { ThemePopupPanel } from "./panels/ThemePopupPanel";
import { LibraryPanel } from "./panels/LibraryPanel";

import { DataSidebarPanel } from "./panels/DataSidebarPanel";
import { PreviewSection } from "./PreviewSection";

// Mini component agar bisa pakai useRef/ResizeObserver untuk spacer fixed header di canvas preview
function CanvasHeaderPreview({ headerSection, isLeftPanelOpen, isDraggingWidget, panelWidth }: {
  headerSection: any;
  isLeftPanelOpen: boolean;
  isDraggingWidget: boolean;
  panelWidth: number;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const isFixed = headerSection.config?.position === 'fixed';
  const isSticky = headerSection.config?.sticky === true || headerSection.config?.position === 'sticky';
  const zVal = headerSection.config?.zIndex ?? 100;
  const posClass = isFixed
    ? 'fixed top-0 left-0 right-0'
    : isSticky
      ? 'sticky top-0'
      : headerSection.config?.position === 'absolute'
        ? 'absolute top-0 left-0 right-0'
        : 'relative';

  useEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) setHeaderHeight(entry.contentRect.height);
    });
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, [headerRef.current]);

  const headerElements = headerSection.elements || [];
  return (
    <>
      <div
        ref={headerRef}
        className="relative group transition-all duration-300 pointer-events-none [&_*]:pointer-events-none"
        style={{ zIndex: zVal, borderRadius: `${headerSection.config?.borderRadius ?? 0}px` }}
      >
        <BuilderSection
          id={headerSection.id}
          config={headerSection.config}
          elements={headerElements}
          activeElementId={null}
          activeSubFocus={null}
          isActive={false}
          isLeftPanelOpen={isLeftPanelOpen}
          isDraggingWidget={isDraggingWidget}
          panelWidth={panelWidth}
          onElementSelect={() => {}}
          onSectionSelect={() => {}}
        />
      </div>
      {isFixed && headerHeight > 0 && (
        <div style={{ height: headerHeight }} aria-hidden="true" />
      )}
    </>
  );
}

function BuilderContent() {
  const state = useBuilderState();
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const {
    CLICK_SUPPRESS_MS,
    activeDragId,
    activeDropdown,
    activeEditorTab,
    activeElementId,
    activeLibraryTab,
    activePanel,
    activePopover,
    activeSubFocus,
    addingBlockToId,
    allCustomPages,
    bgBorderRadiusLink,
    bgBorderWidthLink,
    borderRadiusLink,
    borderWidthLink,
    btnBorderRadiusLink,
    btnPaddingLink,
    btnStyleMode,
    categories,
    client,
    closeMediaModal,
    contextMenu,
    copiedElementData,
    copiedSection,
    customPage,
    dragIntentRef,
    dragReleaseTimeoutRef,
    draggedWidgetType,
    editingSection,
    editorCollapse,
    expandedSections,
    findChildrenList,
    future,
    handleAddColumnChild,
    handleAddElement,
    handleAddSection,
    handleCanvasAddElementClick,
    handleContainerClickCapture,
    handleCopyElementCtx,
    handleCopySection,
    handleCustomWidgetClick,
    handleDeleteColumnChild,
    handleDeleteElement,
    handleDeleteElementCtx,
    handleDeleteImage,
    handleDeleteSection,
    handleDragEnd,
    handleDragStart,
    handleDropWidget,
    handleDuplicateElementCtx,
    handleDuplicateSection,
    handleGripPointerDown,
    handleInsertFeaturesTemplate,
    handleInsertHeroTemplate,
    handleMediaSelect,
    handleMediaSelectMultiple,
    handlePasteElementCtx,
    handlePasteSection,
    handlePreview,
    handlePublish,
    handleRedo,
    handleResizeStart,
    handleSave,
    handleSaveElementOrder,
    handleSaveOrder,
    handleSelectStructure,
    handleSvgUpload,
    handleUndo,
    handleUpdateColumnChild,
    handleUpdateElement,
    handleUploadImage,
    handleWidgetClick,
    handleWidgetDragEnd,
    handleWidgetDragStart,
    hasChanges,
    hasInitialized,
    imageResolutionMode,
    initialSections,
    isDraggingRef,
    isDraggingWidget,
    isLeftPanelOpen,
    isLoading,
    isMediaModalOpen,
    isResizing,
    isSaving,
    isStructureModalOpen,
    isUploading,
    lastDragTimeRef,
    loadingPage,
    loadingSections,
    marginLink,
    mediaModalCallback,
    mediaModalInitialSelected,
    mediaModalMaxSelect,
    mediaModalMode,
    mediaModalMultiple,
    moveElement,
    moveInArray,
    moveSection,
    newlyAddedElementId,
    openMediaModal,
    openMediaSvgModal,
    paddingLink,
    pageId,
    panelWidth,
    past,
    prevEditingSectionIdRef,
    previewMode,
    products,
    refreshPage,
    refreshSections,
    renderElementTree,
    router,
    saveHistory,
    searchParams,
    sections,
    setActiveDragId,
    setActiveDropdown,
    setActiveEditorTab,
    setActiveElementId,
    setActiveLibraryTab,
    setActivePanel,
    setActivePopover,
    setActiveSubFocus,
    setAddingBlockToId,
    setBgBorderRadiusLink,
    setBgBorderWidthLink,
    setBorderRadiusLink,
    setBorderWidthLink,
    setBtnBorderRadiusLink,
    setBtnPaddingLink,
    setBtnStyleMode,
    setContextMenu,
    setCopiedElementData,
    setCopiedSection,
    setDraggedWidgetType,
    setEditingSection,
    setEditorCollapse,
    setExpandedSections,
    setFuture,
    setHasChanges,
    setImageResolutionMode,
    setIsDraggingWidget,
    setIsLeftPanelOpen,
    setIsMediaModalOpen,
    setIsSaving,
    isTemplateMode,
    setIsStructureModalOpen,
    setIsUploading,
    setMarginLink,
    setMediaModalCallback,
    setMediaModalMode,
    setNewlyAddedElementId,
    setPaddingLink,
    setPanelWidth,
    setPast,
    setPreviewMode,
    setSections,
    setShowImageUrlInput,
    setTempHeight,
    setTempWidth,
    setTheme,
    shouldSuppressClick,
    showConfirm,
    showImageUrlInput,
    showToast,
    swapInArray,
    tempHeight,
    tempWidth,
    theme,
    updateLocalSection
  } = state;

  const [activeCanvas, setActiveCanvas] = useState<'homepage' | 'header' | 'footer'>('homepage');

  if (isLoading && sections.length === 0) {
    return (
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'} flex flex-col items-center justify-center space-y-8 z-[200]`}>
        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-2 px-4 w-full">
          <h2 className={`text-base sm:text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'} uppercase tracking-[0.2em] sm:tracking-[0.4em] animate-pulse`}>Initializing Canvas</h2>
          <p className={`text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest`}>Menyiapkan lingkungan desain visual...</p>
        </div>
      </div>
    );
  }

  const globalSettings = sections.find(s => s.id === 'global-settings');
  const canvasBgColor = globalSettings?.config?.bgColor || '#F3F0EC';
  const canvasBgType = globalSettings?.config?.bgType || 'solid';
  const canvasBgGradient = canvasBgType === 'gradient'
    ? (globalSettings?.config?.bgGradientType === 'radial'
        ? `radial-gradient(circle at ${globalSettings?.config?.bgGradientRadialPos || 'center center'}, ${globalSettings?.config?.bgGradientColor1 || '#ffffff'} ${globalSettings?.config?.bgGradientLoc1 ?? 0}%, ${globalSettings?.config?.bgGradientColor2 || '#e83a65'} ${globalSettings?.config?.bgGradientLoc2 ?? 100}%)`
        : `linear-gradient(${globalSettings?.config?.bgGradientAngle ?? 180}deg, ${globalSettings?.config?.bgGradientColor1 || '#ffffff'} ${globalSettings?.config?.bgGradientLoc1 ?? 0}%, ${globalSettings?.config?.bgGradientColor2 || '#e83a65'} ${globalSettings?.config?.bgGradientLoc2 ?? 100}%)`)
    : undefined;

  // uiContentModified sudah memuat pembungkus return () dan penutup kurung kurawal BuilderContent
  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-slate-100'} flex flex-col overflow-hidden transition-colors duration-500`}>
      {/* BUILDER HEADER */}
      <header className={`h-11 ${theme === 'dark' ? 'bg-zinc-900/90' : 'bg-white/80'} backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-2 md:px-4 shrink-0 z-50 overflow-x-auto no-scrollbar`}>
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          <button onClick={() => {
            if (isTemplateMode) {
              window.location.href = "/";
            } else {
              router.push("/personal/dashboard/storefront");
            }
          }} className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className={`h-5 w-px ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'}`}></div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          {/* Responsive Toggles */}
          <div className={`flex items-center p-0.5 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200'}`}>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'desktop' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-slate-800 shadow-sm') : (theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700')}`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'mobile' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-slate-800 shadow-sm') : (theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-500 hover:text-slate-700')}`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className={`h-5 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'} mx-1`}></div>

          {/* Mobile View Toggle */}
          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className={`md:hidden px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 ${showMobilePreview ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900 border border-slate-200'}`}
          >
            {showMobilePreview ? <Pencil className="w-3 h-3" /> : <Eye className="w-3 h-3" />} 
            <span>{showMobilePreview ? 'Edit Data' : 'Preview'}</span>
          </button>

          <button
            onClick={handlePreview}
            className={`px-2 md:px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'}`}
          >
            <Globe className="w-3 h-3" /> <span className="hidden md:inline">Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-sm ${hasChanges ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20" : (theme === 'dark' ? "bg-white/5 text-gray-500 cursor-not-allowed opacity-50" : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200")}`}
          >
            {isSaving ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Save className="w-3 h-3" />
            )}
            <span className="hidden md:inline">{isSaving ? "Saving..." : "Simpan"}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative bg-zinc-100">

        {/* 2. CANVAS AREA */}
        <div 
          className={`
            ${!showMobilePreview ? 'hidden md:flex' : 'flex'}
            flex-1 overflow-y-auto canvas-scrollbar scrollbar-hide relative
          `}
          style={{ backgroundColor: '#C9C9C9' }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
            
            {/* Responsive Wrapper */}
            <div className={`mx-auto transition-all duration-500 ease-in-out min-h-full pb-48 ${
              previewMode === 'mobile' 
                ? `w-full md:max-w-[400px] md:border-x shadow-2xl ${theme === 'dark' ? 'md:border-zinc-800' : 'md:border-slate-300'} is-mobile-preview` 
                : 'w-full is-desktop-preview'
            }`}
            style={{
              backgroundColor: canvasBgType === 'solid' ? canvasBgColor : undefined,
              backgroundImage: canvasBgType === 'gradient' ? canvasBgGradient : undefined,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed'
            }}
            >
              <div className="min-h-full w-full flex flex-col">
              <StorefrontProvider client={client} products={products || []} categories={categories || []} sections={sections} customPages={(allCustomPages as any)?.pages || []}>
              {(() => {
                const headerSection = sections.find(s => s.type === "HEADER");
                if (!headerSection) return null;
                // In header canvas mode, the HeaderCanvas component renders the header — skip inline preview
                if (activeCanvas === 'header') return null;
                return (
                  <CanvasHeaderPreview
                    headerSection={headerSection}
                    isLeftPanelOpen={isLeftPanelOpen}
                    isDraggingWidget={isDraggingWidget}
                    panelWidth={panelWidth}
                  />
                );
              })()}

              {activeCanvas === 'homepage' && (
              <div className="flex-1 flex flex-col">
                {sections.filter((s: any) => s.type === "SECTION").map((section: any, index: number) => (
                  <div key={section.id}>
                    <PreviewSection
                      section={section}
                      elements={section.elements || []}
                      activeElementId={editingSection?.id === section.id ? activeElementId : null}
                      onElementSelect={(elId: string) => {
                        setEditingSection(section);
                        setActiveElementId(elId);
                        setIsLeftPanelOpen(true);
                        setActivePanel('editor');
                      }}
                      isActive={editingSection?.id === section.id}
                    />
                  </div>
                ))}

                {/* ═══ PEMILIH STRUKTUR LAYOUT INLINE DI CANVAS (WordPress Elementor Style) ═══ */}
                {isStructureModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="w-full bg-[#F8F9FA] rounded-2xl border-2 border-dashed border-[#CED4DA] p-6 my-6 relative transition-all shadow-sm"
                  >
                    {/* Header Controls */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E9ECEF]">
                      {/* Empty placeholder to keep title perfectly centered */}
                      <div className="w-8 h-8" />

                      <span className="text-[#495057] font-semibold text-xs tracking-wider uppercase">
                        Select your structure
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          console.log("[Builder Debug] Tombol Tutup diklik");
                          setIsStructureModalOpen(false);
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 12 Columns Grid Templates Box Selector */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto py-2">
                      {SECTION_STRUCTURE_TEMPLATES.map((tpl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            console.log("[Builder Debug] Memilih struktur layout kolom index:", idx);
                            handleSelectStructure(idx);
                          }}
                          title={tpl.name}
                          className="group bg-[#DDE2E5] hover:bg-[#C9D0D4] active:scale-95 rounded-none overflow-hidden p-0.5 border border-zinc-300 hover:border-zinc-400 transition-all flex flex-col h-12 justify-center shadow-xs cursor-pointer"
                        >
                          {tpl.iconHtml}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ═══ FOOTER (below content) ═══ */}
                {(() => {
                  const footerSection = sections.find(s => s.type === 'FOOTER');
                  if (!footerSection) return null;
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSection(footerSection);
                        setActiveElementId(null);
                        console.log("[Canvas Click] Footer wrapper diklik biasa (hanya sorot, tidak membuka editor panel)");
                      }}
                      className="relative group transition-all cursor-pointer"
                      style={{ borderRadius: `${footerSection.config?.borderRadius ?? 0}px` }}
                    >
                      {(editingSection?.id === footerSection.id && !activeElementId) && (
                        <div className="absolute top-1 left-2 z-[60]">
                          <div className="bg-blue-600 text-white px-2 py-0.5 rounded shadow-lg text-[8px] font-bold uppercase tracking-widest">Footer</div>
                        </div>
                      )}
                      <BuilderSection
                        id={footerSection.id}
                        config={footerSection.config}
                        elements={footerSection.elements || []}
                        activeElementId={editingSection?.id === footerSection.id ? activeElementId : null}
                        activeSubFocus={activeSubFocus}
                        onElementSelect={(elementId, subFocus) => {
                          // Klik langsung elemen non-COLUMN otomatis menyorot dan membuka panel edit
                          setEditingSection(footerSection);
                          setActiveElementId(elementId);
                          setActivePanel('editor');
                          setActiveSubFocus(subFocus || null);
                          console.log("[Builder Debug] Footer Element non-COLUMN terpilih dengan subFocus:", subFocus, "ID:", elementId);
                        }}
                        onElementSelectOnly={(elementId) => {
                          setEditingSection(footerSection);
                          setActiveElementId(elementId);
                          console.log("[Builder Debug] Footer COLUMN tersorot (tanpa membuka panel) untuk ID:", elementId);
                        }}
                        onElementEdit={(elementId) => {
                          // Klik Pensil COLUMN menyorot dan membuka panel edit
                          setEditingSection(footerSection);
                          setActiveElementId(elementId);
                          setIsLeftPanelOpen(true);
                          setActivePanel('editor');
                          console.log("[Builder Debug] Footer COLUMN panel editor dibuka via Pensil untuk ID:", elementId);
                        }}
                        onSectionSelect={() => {
                          // Klik Pensil Section membuka panel editor
                          setEditingSection(footerSection);
                          setIsLeftPanelOpen(true);
                          setActivePanel('editor');
                          setActiveElementId(null);
                          console.log("[Builder Debug] Footer panel editor dibuka via Pensil");
                        }}
                        onSectionSelectOnly={() => {
                          // Klik biasa Section hanya menyorot, tidak membuka panel edit
                          setEditingSection(footerSection);
                          setActiveElementId(null);
                          console.log("[Builder Debug] Footer tersorot saja (tidak membuka editor panel)");
                        }}
                        isActive={editingSection?.id === footerSection.id && !activeElementId}
                        onAddElement={() => { setEditingSection(footerSection); setActivePanel('library'); }}
                        onElementContextMenu={(elementId, x, y) => { setContextMenu({ x, y, section: footerSection, elementId }); }}
                        onAddElementClick={handleCanvasAddElementClick}
                        newlyAddedElementId={newlyAddedElementId}
                        onDropWidget={handleDropWidget}
                        isDraggingWidget={isDraggingWidget}
                        isLeftPanelOpen={isLeftPanelOpen}
                        onOpenEditPanel={(elementId) => {
                          setEditingSection(footerSection);
                          setActiveElementId(elementId);
                          setIsLeftPanelOpen(true);
                          setActivePanel('editor');
                          console.log('[Builder] Pensil badge: Membuka panel edit untuk Footer Element:', elementId);
                        }}
                      />
                    </div>
                  );
                })()}
              </div>
              )}
              {activeCanvas === 'header' && (() => {
                const headerSection = sections.find(s => s.type === "HEADER");
                if (!headerSection) return null;
                return (
                  <HeaderCanvas
                    headerSection={headerSection}
                    editingSection={editingSection}
                    activeElementId={activeElementId}
                    activeSubFocus={activeSubFocus}
                    setEditingSection={setEditingSection}
                    setActiveElementId={setActiveElementId}
                    setActivePanel={setActivePanel}
                    setActiveSubFocus={setActiveSubFocus}
                    setIsLeftPanelOpen={setIsLeftPanelOpen}
                    handleDeleteElement={handleDeleteElement}
                    handleDeleteSection={handleDeleteSection}
                    handleCanvasAddElementClick={handleCanvasAddElementClick}
                    newlyAddedElementId={newlyAddedElementId}
                    handleDropWidget={handleDropWidget}
                    isDraggingWidget={isDraggingWidget}
                    isLeftPanelOpen={isLeftPanelOpen}
                    setContextMenu={setContextMenu}
                    panelWidth={panelWidth}
                  />
                );
              })()}
              {activeCanvas === 'footer' && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-100 flex items-center justify-center">
                      <span className="text-2xl">🦶</span>
                    </div>
                    <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Footer Canvas</h3>
                    <p className="text-[10px] text-zinc-400 font-medium">Editor footer akan segera hadir</p>
                  </div>
                </div>
              )}
            </StorefrontProvider>
          </div>
        </div>
      </div>

        {/* CONTEXT MENU (Right-click) */}
        <AnimatePresence>
          {contextMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="fixed z-[200] bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 min-w-[210px] overflow-hidden"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header label */}
              <div className="px-4 py-1.5 border-b border-slate-100 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {contextMenu.elementId
                    ? (() => {
                      let found: SectionElement | undefined;
                      const findRec = (els: SectionElement[]) => {
                        for (const e of els) {
                          if (e.id === contextMenu.elementId) { found = e; return; }
                          if (e.children) findRec(e.children);
                        }
                      };
                      findRec(contextMenu.section.elements || []);
                      return `Section › ${ELEMENT_TYPE_MAP[found?.type || '']?.label || contextMenu.elementId}`;
                    })()
                    : `Section`}
                </span>
              </div>

              {contextMenu.elementId ? (
                <>
                  {/* ELEMENT-LEVEL CONTEXT MENU */}
                  <button
                    onClick={() => handleCopyElementCtx(contextMenu.section, contextMenu.elementId!)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 font-medium">Salin</span>
                  </button>

                  <button
                    onClick={() => copiedElementData ? handlePasteElementCtx(contextMenu.section, contextMenu.elementId!) : null}
                    disabled={!copiedElementData}
                    className={`w-full flex items-center gap-3 px-4 py-2 transition-colors text-left ${copiedElementData ? 'hover:bg-slate-50 text-slate-700' : 'text-slate-300 cursor-not-allowed'}`}
                  >
                    <Clipboard className={`w-4 h-4 ${copiedElementData ? 'text-slate-500' : 'text-slate-300'}`} />
                    <span className="text-sm font-medium">Tempel</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => handleDuplicateElementCtx(contextMenu.section, contextMenu.elementId!)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left"
                  >
                    <CopyPlus className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 font-medium">Duplikasi</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => handleDeleteElementCtx(contextMenu.section, contextMenu.elementId!)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500 font-medium">Hapus Elemen</span>
                  </button>
                </>
              ) : (
                <>
                  {/* SECTION-LEVEL CONTEXT MENU */}
                  <button
                    onClick={() => handleCopySection(contextMenu.section)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 font-medium">Salin Komponen</span>
                  </button>

                  <button
                    onClick={() => copiedSection ? handlePasteSection(contextMenu.section) : null}
                    disabled={!copiedSection}
                    className={`w-full flex items-center gap-3 px-4 py-2 transition-colors text-left ${copiedSection ? 'hover:bg-slate-50 text-slate-700' : 'text-slate-300 cursor-not-allowed'}`}
                  >
                    <Clipboard className={`w-4 h-4 ${copiedSection ? 'text-slate-500' : 'text-slate-300'}`} />
                    <span className="text-sm font-medium">Tempel Komponen</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => handleDuplicateSection(contextMenu.section)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left"
                  >
                    <CopyPlus className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-700 font-medium">Duplikasi Komponen</span>
                  </button>

                  {contextMenu.section.id !== 'global-header' && (
                    <>
                      <div className="h-px bg-slate-100 my-1" />
                      <button
                        onClick={() => { handleDeleteSection(contextMenu.section.id); setContextMenu(null); }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500 font-medium">Hapus Komponen</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        mode={mediaModalMode}
        onClose={closeMediaModal}
        onSelect={handleMediaSelect}
        multiple={mediaModalMultiple}
        maxSelect={mediaModalMaxSelect}
        initialSelected={mediaModalInitialSelected}
        onSelectMultiple={handleMediaSelectMultiple}
      />
    </div>
  );
}

export default function VisualPageBuilder() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-8 z-[200]">
        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-2 px-4 w-full">
          <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-[0.2em] sm:tracking-[0.4em] animate-pulse">Initializing Canvas</h2>
          <p className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Menyiapkan lingkungan desain visual...</p>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}


