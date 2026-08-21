"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { CVDataPayload, defaultCVConfig } from "@/lib/cvData";
import { defaultPortfolioData } from "@/lib/portfolioData";
import { getCVData } from "@/app/actions/cv";
import Link from "next/link";

export default function ProgressResume() {
  const [data, setData] = useState<CVDataPayload | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      setIsLoading(true);
      try {
        const res = await getCVData();
        if (res.success && res.data) {
          setData(res.data);
        } else {
          setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
        }
      } catch (e) {
        console.error(e);
        setData({ portfolio: defaultPortfolioData, config: defaultCVConfig });
      } finally {
        setIsLoading(false);
      }
    }
    fetchProgress();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-6"></div>
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-100 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  const { portfolio } = data;

  const checklist = [
    { id: 'name_headline', label: 'Nama lengkap & Profesi', isCompleted: !!(portfolio.personal?.name?.trim()) },
    { id: 'contact', label: 'Email & Telepon', isCompleted: !!(portfolio.personal?.email?.trim() || portfolio.personal?.phone?.trim()) },
    { id: 'bio', label: 'Ringkasan / Bio', isCompleted: !!(portfolio.personal?.bio?.trim()) },
    { id: 'experience', label: 'Riwayat Pekerjaan', isCompleted: Array.isArray(portfolio.experience) && portfolio.experience.length > 0 },
    { id: 'education', label: 'Riwayat Pendidikan', isCompleted: Array.isArray(portfolio.education) && portfolio.education.length > 0 },
    { id: 'organization', label: 'Riwayat Organisasi', isCompleted: Array.isArray(portfolio.organization) && portfolio.organization.length > 0 },
    { id: 'awards', label: 'Prestasi', isCompleted: Array.isArray(portfolio.awards) && portfolio.awards.length > 0 },
    { id: 'skills', label: 'Skills', isCompleted: !!(portfolio.skills?.trim()) },
    { id: 'courses', label: 'Kursus & Pelatihan', isCompleted: Array.isArray(portfolio.courses) && portfolio.courses.length > 0 },
    { id: 'languages', label: 'Bahasa', isCompleted: Array.isArray(portfolio.languages) && portfolio.languages.length > 0 },
    { id: 'extracurriculars', label: 'Ekstrakurikuler', isCompleted: Array.isArray(portfolio.extracurriculars) && portfolio.extracurriculars.length > 0 },
    { id: 'hobbies', label: 'Hobi & Minat', isCompleted: Array.isArray(portfolio.hobbies) && portfolio.hobbies.length > 0 },
  ];

  const completedCount = checklist.filter((item) => item.isCompleted).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-blue-600">Detail Progress</h3>
          <span className="text-sm font-bold text-blue-600">{progressPercent}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${progressPercent === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800 text-sm">Kelengkapan Resume</p>
              <p className="text-xs text-slate-500">{completedCount} dari {checklist.length} bagian terisi</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-2">
            {checklist.map((item) => (
              <div 
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  item.isCompleted 
                    ? 'border-emerald-100 bg-emerald-50/30' 
                    : 'border-slate-100 bg-white hover:border-blue-100'
                }`}
              >
                {item.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <span className={`text-sm ${item.isCompleted ? 'text-slate-700' : 'text-slate-500'}`}>
                  {item.label}
                </span>
                {!item.isCompleted && (
                  <Link 
                    href={`/resume-builder?section=${item.id}`}
                    className="ml-auto text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    Isi data
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
