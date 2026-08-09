import React from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { ATSClassic } from './templates/ATSClassic';
import { ATSModern } from './templates/ATSModern';

interface CVViewerProps {
  data: CVDataPayload;
}

export function CVViewer({ data }: CVViewerProps) {
  // In the future, we can add more templates and select based on data.config.templateId
  
  return (
    <div className="w-full flex justify-center bg-gray-200 py-8 min-h-screen">
      {/* A4 Paper Container with drop shadow */}
      <div 
        className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 print:shadow-none print:m-0 print:p-0"
        style={{
          width: '210mm',
          minHeight: '297mm',
        }}
        id="cv-print-area"
      >
        {data.config.templateId === 'ats-classic' ? (
          <ATSClassic data={data} />
        ) : (
          <ATSModern data={data} />
        )}
      </div>
    </div>
  );
}
