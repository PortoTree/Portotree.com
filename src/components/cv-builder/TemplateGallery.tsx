"use client";

import React from 'react';
import { CV_TEMPLATES } from '@/lib/cvTemplates';
import { ArrowLeft, ArrowRight, CheckCircle2, Crown, Sparkles } from 'lucide-react';

const emptyData = {
  portfolio: {
    personal: null,
    experience: [],
    education: [],
    skills: "",
    hobbies: [],
    languages: [],
    certifications: [],
    projects: [],
    awards: [],
    organization: [],
    internship: [],
    courses: [],
    extracurriculars: []
  },
  config: {
    templateId: 1,
    color: '#000000',
    primaryColor: '#000000',
    font: 'inter',
    hiddenItems: []
  }
} as any;

export function TemplateGallery({ isPublic = false }: { isPublic?: boolean }) {
  const getBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'premium':
        return "bg-amber-500 text-amber-950 font-bold";
      case 'exclusive':
        return "bg-purple-600 text-white font-bold";
      default:
        return "bg-slate-800 text-white";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Crown className="w-3.5 h-3.5 mr-1" />;
      case 'exclusive':
        return <Sparkles className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className={`mx-auto ${isPublic ? 'max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20' : 'w-full pb-10'}`}>
      {isPublic ? (
        <div className="text-center mb-12 md:mb-20 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 leading-snug">
            Galeri Template CV
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pilih template CV yang dirancang secara profesional. Semua template ATS-friendly dan siap membantu Anda mendapatkan pekerjaan impian.
          </p>
        </div>
      ) : (
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4 mb-1.5 md:mb-2">
            <a 
              href="/p/resume" 
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              title="Kembali ke CV Builder"
            >
              <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Pilih Template</h1>
          </div>
          <p className="text-sm md:text-base text-slate-500 ml-[36px] md:ml-[48px]">Gunakan template yang paling sesuai dengan gaya dan industri Anda.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {CV_TEMPLATES.map((template) => {
          const TemplateComponent = template.component;
          
          return (
            <div key={template.id} className="group flex flex-row sm:flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full">
              
              {/* Preview Box */}
              <div className="relative w-[130px] sm:w-full shrink-0 bg-slate-100 overflow-hidden border-r sm:border-r-0 border-b-0 sm:border-b border-slate-100 aspect-[1/1.4] sm:aspect-[1/1.3]">
                <div 
                  className="absolute left-1/2 top-2 pointer-events-none select-none origin-top -translate-x-1/2 scale-[0.16] sm:scale-[0.32]" 
                  style={{ width: '794px', height: '1122px' }}
                >
                  <div className="w-[210mm] h-[297mm] bg-white overflow-hidden shadow-2xl [&_.text-gray-400]:!text-slate-800 [&_.opacity-70]:!opacity-100 [&_.grayscale]:!grayscale-0">
                    <TemplateComponent data={emptyData} showPlaceholders={true} />
                  </div>
                </div>
                
                {/* Tier Badge - Only shown in dashboard */}
                {!isPublic && (
                  <span className={`absolute top-2 left-2 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md flex items-center shadow-md z-10 ${getBadgeStyle(template.tier)}`}>
                    {getTierIcon(template.tier)}
                    {template.tier}
                  </span>
                )}

                {/* Hover Overlay - Only show on desktop/sm up */}
                <div className="hidden sm:flex absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center backdrop-blur-[2px] z-20">
                  <a href={`/resume-builder?template=${template.id}`} className="bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-transform hover:scale-105 shadow-xl flex items-center gap-2">
                    Gunakan
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              {/* Info Box */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col bg-white">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">{template.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 flex-1">
                  {template.description}
                </p>
                
                {/* Status - Only shown in dashboard */}
                {!isPublic && template.tier === 'free' && (
                  <div className="flex items-center text-xs sm:text-sm font-medium text-emerald-600 mt-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0" /> Gratis Sepenuhnya
                  </div>
                )}
                {!isPublic && template.tier === 'premium' && (
                  <div className="flex items-center text-xs sm:text-sm font-medium text-amber-600 mt-auto">
                    <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0" /> Premium Template
                  </div>
                )}
                
                {/* Mobile Action Button - Shown only on mobile */}
                <a 
                  href={`/resume-builder?template=${template.id}`} 
                  className="sm:hidden mt-3 text-center bg-blue-50 text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-xs"
                >
                  Gunakan Template
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
