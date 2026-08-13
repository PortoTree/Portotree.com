import React, { useEffect, useRef, useState } from 'react';
import { useSuratPagination } from './useSuratPagination';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface SuratViewerProps {
  children: React.ReactNode;
  showMobilePreview: boolean;
  dependency: any;
}

export function SuratViewer({ children, showMobilePreview, dependency }: SuratViewerProps) {
  const { pages, forceRepaginate } = useSuratPagination([dependency]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [defaultScale, setDefaultScale] = useState(1);

  const calculateDefaultScale = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 0.43; // Default mobile scale matching resume builder
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

  return (
    <main ref={containerRef} className={`flex-1 h-full overflow-y-auto overflow-x-auto bg-gray-100/50 print:bg-white print:overflow-visible transition-all duration-300 ${!showMobilePreview ? 'hidden md:block' : 'block'}`}>
      
      {/* Zoom Controls */}
      <div className={`fixed bottom-[100px] right-6 md:bottom-8 md:right-8 z-40 bg-white/80 backdrop-blur-md shadow-xl rounded-full p-1.5 flex-col items-center gap-2 print:hidden border border-gray-200/50 ${!showMobilePreview ? 'hidden md:flex' : 'flex'}`}>
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

      {/* MASTER MEASURER */}
      <div 
        className="fixed top-0 left-0 opacity-0 pointer-events-none print:hidden z-[-50]" 
        style={{ width: '210mm' }}
      >
        <div id="cv-content-measurer" className="bg-white min-h-[297mm] flex flex-col" style={{ minWidth: '210mm' }}>
          {children}
        </div>
      </div>

      {/* UI & PRINT PAGES */}
      <div className="w-full flex justify-center py-4 md:py-8 min-w-max print:p-0 print:min-w-0 print:block">
        {/* Style Khusus Print A4 dan Anti Font-Boosting Mobile */}
        <style dangerouslySetInnerHTML={{__html: `
          /* Mencegah mobile browser memperbesar teks secara otomatis (Font Boosting / Text Autosizing) */
          .cv-page, .cv-instance, #cv-content-measurer {
            -webkit-text-size-adjust: 100%;
            text-size-adjust: 100%;
          }
          @media print {
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
        
        {/* Scaled Wrapper */}
        <div 
          style={{ 
            width: `${794 * scale}px`, 
            height: `${1122 * pages * scale + (pages - 1) * 32 * scale}px` 
          }}
          className="relative transition-all duration-200 print:!w-auto print:!h-auto print:!transform-none"
        >
          <div 
            className="flex flex-col gap-8 print:block print:gap-0 absolute top-0 left-0 w-[210mm] print:relative print:mx-auto print:!transform-none"
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
          >
            {Array.from({ length: pages }).map((_, i) => (
              <div 
                key={i} 
                className="cv-page w-[210mm] h-[297mm] bg-white shadow-xl md:rounded-lg overflow-hidden relative print:shadow-none print:m-0 print:rounded-none"
                style={{ pageBreakInside: 'avoid', pageBreakAfter: 'always' }}
              >
                {/* Translate the content up to show the correct slice */}
                <div 
                  className="cv-instance absolute left-0 w-full min-h-[297mm] flex flex-col"
                  style={{ top: `calc(-297mm * ${i})` }}
                >
                  {children}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
