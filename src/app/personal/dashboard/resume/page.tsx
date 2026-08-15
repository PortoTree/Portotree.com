"use client";

import { useState, useEffect } from "react";
import { Edit3, Download, Share2, Settings, Clock, Calendar } from "lucide-react";
import { getCVData } from "@/app/actions/cv";
import { CVDataPayload, defaultCVConfig } from "@/lib/cvData";
import { defaultPortfolioData } from "@/lib/portfolioData";
import { CVViewer } from "@/components/cv-builder/CVViewer";
import ProgressResume from "@/components/dashboard/ProgressResume";

export default function ResumeDashboardPage() {
  const [data, setData] = useState<CVDataPayload | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("-");
  const [createdAt, setCreatedAt] = useState<string>("-");

  useEffect(() => {
    async function loadData() {
      try {
        const CACHE_KEY = 'dashboard_cv_cache';
        const cachedStr = sessionStorage.getItem(CACHE_KEY);
        
        if (cachedStr) {
          try {
            const parsed = JSON.parse(cachedStr);
            // Cache valid for 5 minutes
            if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
              setData(parsed.data);
              setUpdatedAt(new Date(parsed.timestamp).toLocaleDateString('id-ID'));
              setCreatedAt(new Date(parsed.timestamp).toLocaleDateString('id-ID'));
              return;
            }
          } catch (e) {
            // Ignore parse errors and fetch fresh
          }
        }

        const res = await getCVData();
        if (res.success && res.data) {
          setData(res.data);
          const nowStr = new Date().toLocaleDateString('id-ID');
          setUpdatedAt(nowStr);
          setCreatedAt(nowStr);
          
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            data: res.data,
            timestamp: Date.now()
          }));
        } else {
          setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
        }
      } catch (e) {
        console.error(e);
        setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
      }
    }
    loadData();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1.5 md:mb-2">Resume / CV</h1>
        <p className="text-sm md:text-base text-slate-500">Kelola resume berstandar ATS Anda.</p>
      </div>

      <div className="space-y-6">
        
        {/* PREVIEW KARTU FULL WIDTH */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-100 relative overflow-hidden border-b border-slate-200" style={{ height: '340px' }}>
              {data && (
                <div 
                  className="absolute top-0 left-0 pointer-events-none origin-top-left flex items-start justify-center pt-4"
                  style={{ width: '300%', height: '300%', transform: 'scale(0.333)' }}
                >
                  {/* Wrap with a fixed A4 container to maintain aspect ratio in preview */}
                  <div className="bg-white shadow-xl" style={{ width: '210mm', minHeight: '297mm' }}>
                    <CVViewer data={data} forceScale={1} hideZoomControls={true} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-4">
                <a
                  href="/resume-builder"
                  className="flex items-center justify-center gap-2 py-2 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Resume
                </a>
                <a
                  href="/resume-builder"
                  className="flex items-center justify-center gap-2 py-2 px-6 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-sm shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
            </div>
          </div>

        {/* ROW BAWAH: Progress Kiri, Info Kanan */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* KOLOM KIRI: PROGRESS RESUME */}
          <div className="flex-1 min-w-0 w-full">
            <ProgressResume />
          </div>

          {/* KOLOM KANAN: RESUME INFO */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-sm">Resume Info</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> Terakhir Edit
                </span>
                <span className="font-medium text-slate-700">{updatedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> Dibuat
                </span>
                <span className="font-medium text-slate-700">{createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
