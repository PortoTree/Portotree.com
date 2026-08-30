import React, { useEffect, useRef, useState } from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { getTemplateById } from '@/lib/cvTemplates';
import { usePagination } from './usePagination';
import { ZoomIn, ZoomOut, Maximize, XCircle, Star, Eye, EyeOff } from 'lucide-react';
import { useUI } from '@/components/ui/UIProvider';
import { useRouter } from 'next/navigation';

interface CVViewerProps {
  data: CVDataPayload;
  forceScale?: number;
  hideZoomControls?: boolean;
  isPremium?: boolean;
}

export function CVViewer({ data, forceScale, hideZoomControls, isPremium }: CVViewerProps) {
  const { pages } = usePagination([data]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [defaultScale, setDefaultScale] = useState(1);
  const [showPlaceholders, setShowPlaceholders] = useState(true);
  const { showToast } = useUI();
  const router = useRouter();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const calculateDefaultScale = () => {
    if (forceScale !== undefined) return forceScale;
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 0.43;
    }
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.clientWidth;
    const targetWidth = 794;
    const padding = 32;
    if (containerWidth < targetWidth + padding) {
      return (containerWidth - padding) / targetWidth;
    }
    return 1;
  };

  useEffect(() => {
    const updateDefaultScale = () => {
      setDefaultScale(calculateDefaultScale());
    };
    
    // Initial scale calculation
    const initialScale = calculateDefaultScale();
    setDefaultScale(initialScale);
    setScale(initialScale);

    window.addEventListener('resize', updateDefaultScale);
    return () => window.removeEventListener('resize', updateDefaultScale);
  }, []);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.15, 2));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.15, 0.3));
  const handleResetZoom = () => setScale(defaultScale);
  
  const renderTemplate = () => {
    const template = getTemplateById(data.config.templateId);
    const TemplateComponent = template?.component;
    if (TemplateComponent) {
      // @ts-ignore - All templates support showPlaceholders
      return <TemplateComponent data={data} showPlaceholders={showPlaceholders} />;
    }
    return <div>Template not found</div>;
  };

  return (
    <div ref={containerRef} className="w-full bg-gray-200 py-4 md:py-8 min-h-screen overflow-auto relative print:bg-white print:py-0 print:min-h-0 print:overflow-visible">
      
      {/* Zoom Controls */}
      {!hideZoomControls && (
        <div className="fixed bottom-[100px] right-6 md:bottom-8 md:right-8 z-40 bg-white/80 backdrop-blur-md shadow-xl rounded-full p-1.5 flex flex-col items-center gap-2 print:hidden border border-gray-200/50">
          <button onClick={() => setShowPlaceholders(p => !p)} className={`p-2 rounded-full hover:bg-gray-100/80 transition-colors bg-transparent ${showPlaceholders ? 'text-[#558ed5]' : 'text-gray-400'}`} title={showPlaceholders ? 'Sembunyikan Placeholder' : 'Tampilkan Placeholder'}>
            {showPlaceholders ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
          <div className="w-4 h-px bg-gray-300/60 my-0.5"></div>
          <button onClick={handleZoomIn} className="p-2 rounded-full hover:bg-gray-100/80 text-gray-700 transition-colors bg-transparent">
            <ZoomIn className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold text-gray-700 text-center select-none leading-none w-8">
            {Math.round(scale * 100)}%
          </span>
          <button onClick={handleZoomOut} className="p-2 rounded-full hover:bg-gray-100/80 text-gray-700 transition-colors bg-transparent">
            <ZoomOut className="w-5 h-5" />
          </button>
          <div className="w-4 h-px bg-gray-300/60 my-0.5"></div>
          <button onClick={handleResetZoom} className="p-2 rounded-full hover:bg-gray-100/80 text-gray-700 transition-colors bg-transparent" title="Fit to Screen">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 
        MASTER MEASURER
        Used by usePagination to calculate page breaks.
        Visually hidden but rendered in DOM.
      */}
      <div 
        className="fixed top-0 left-0 opacity-0 pointer-events-none print:hidden z-[-50]" 
        style={{ width: '210mm' }}
      >
        <div id="cv-content-measurer" className="bg-white">
          {renderTemplate()}
        </div>
      </div>

      {/* 
        UI & PRINT PAGES
        Robust scaling wrapper to allow 2D panning without flex-box clipping bugs.
      */}
      <div className="w-full flex justify-center min-w-max pb-16 print:pb-0 print:min-w-0 print:block">
        <div 
          style={{ 
            width: `${794 * scale}px`, 
            height: `${1122 * pages * scale + (pages - 1) * 32 * scale}px` 
          }}
          className="relative transition-all duration-200 print:!w-auto print:!h-auto print:!transform-none"
        >
          <div 
            className="flex flex-col gap-8 print:block print:gap-0 absolute top-0 left-0 w-[210mm] print:relative print:mx-auto print:!transform-none"
            id="cv-print-container"
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
          >
            {Array.from({ length: pages }).map((_, i) => (
              <div 
                key={i} 
                className="cv-page w-[210mm] h-[297mm] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden relative print:shadow-none print:m-0"
                style={{ pageBreakInside: 'avoid', pageBreakAfter: 'always' }}
              >
                {/* Translate the content up to show the correct slice */}
                <div 
                  className="cv-instance absolute left-0 w-full"
                  style={{ top: `calc(-297mm * ${i})` }}
                >
                  {renderTemplate()}
                </div>

                {/* LARGE PREVIEW WATERMARK */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 print:hidden overflow-hidden">
                  <div className="text-[120px] font-black text-gray-300/30 transform -rotate-45 select-none tracking-widest uppercase">
                    Preview
                  </div>
                </div>

                {/* Subtle Watermark with Premium Upsell */}
                {!isPremium && (
                  <div className="absolute bottom-3 right-6 flex items-center gap-1.5 z-10">
                    <button 
                      onClick={() => setShowPremiumModal(true)}
                      className="print:hidden text-red-500 hover:text-red-600 transition-colors bg-white/50 rounded-full backdrop-blur-sm pointer-events-auto"
                      title="Hilangkan Watermark"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[8pt] text-gray-400/60 font-medium pointer-events-none tracking-wide print:text-gray-400">
                      Made with PortoTree.com
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium Upgrade Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6 mt-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 fill-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade ke Premium</h3>
              <p className="text-gray-600 text-sm">
                Dapatkan akses tanpa batas untuk menghapus watermark, mencoba semua template eksklusif, dan menggunakan berbagai fitur pro lainnya.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => router.push('/p/langganan')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Lihat Paket Langganan
              </button>
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        /* Mencegah mobile browser memperbesar teks secara otomatis (Font Boosting / Text Autosizing) */
        .cv-page, .cv-instance, #cv-content-measurer {
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
        }
      `}} />
    </div>
  );
}
