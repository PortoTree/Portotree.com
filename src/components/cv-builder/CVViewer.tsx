import React from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { ATSClassic } from './templates/ATSClassic';
import { ATSModern } from './templates/ATSModern';
import { usePagination } from './usePagination';

interface CVViewerProps {
  data: CVDataPayload;
}

export function CVViewer({ data }: CVViewerProps) {
  const { pages } = usePagination([data]);
  
  const renderTemplate = () => {
    return data.config.templateId === 'ats-classic' ? (
      <ATSClassic data={data} />
    ) : (
      <ATSModern data={data} />
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-200 py-8 min-h-screen gap-8">
      
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
        PRINT CONTAINER
        Hidden on screen, but visible when printing.
        Allows the browser's native window.print() to paginate seamlessly.
      */}
      <div 
        className="hidden print:block cv-instance bg-white"
        style={{ width: '210mm' }}
        id="cv-print-area"
      >
        {renderTemplate()}
      </div>

      {/* 
        UI PREVIEW PAGES
        Slices the continuous CV into multiple visual A4 canvases for the screen.
        Hidden when printing.
      */}
      <div className="print:hidden flex flex-col items-center gap-8 w-full">
        {Array.from({ length: pages }).map((_, i) => (
          <div 
            key={i} 
            className="w-[210mm] h-[297mm] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden relative"
          >
            {/* Translate the content up to show the correct slice */}
            <div 
              className="cv-instance absolute left-0 w-full"
              style={{ top: `calc(-297mm * ${i})` }}
            >
              {renderTemplate()}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
