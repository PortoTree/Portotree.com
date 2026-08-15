"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { PortfolioData, defaultPortfolioData } from "@/lib/portfolioData";
import Link from "next/link";
import { getMyPortfolio } from "@/app/actions/portfolio";

export default function ProgressPortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await getMyPortfolio();
        if (res.success && res.data) {
          setData(res.data as PortfolioData);
        } else {
          const localDraft = localStorage.getItem("draft_template_sections");
          if (localDraft) {
            const sections = JSON.parse(localDraft);
            const dataSection = sections.find((s: any) => s.type === "PORTFOLIO_DATA");
            if (dataSection && dataSection.config && Object.keys(dataSection.config).length > 0) {
              setData(dataSection.config as PortfolioData);
            } else {
              setData(defaultPortfolioData);
            }
          } else {
            setData(defaultPortfolioData);
          }
        }
      } catch (e) {
        console.error(e);
        setData(defaultPortfolioData);
      }
    }
    fetchProgress();
  }, []);

  if (!data) return null; // or loading skeleton

  const checklist = [
    { id: 'photo', label: 'Foto Profil', isCompleted: !!(data.personal?.photoUrl && data.personal.photoUrl !== '/default-avatar.png' && data.personal.photoUrl !== 'https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830943/placeholder-person-4x4_mjkcnf.png' && data.personal.photoUrl.trim() !== '') },
    { id: 'name_headline', label: 'Nama lengkap', isCompleted: !!(data.personal?.name?.trim()) },
    { id: 'bio', label: 'Ringkasan / Bio', isCompleted: !!(data.personal?.bio?.trim()) },
    { id: 'experience', label: 'Pengalaman Kerja', isCompleted: Array.isArray(data.experience) && data.experience.length > 0 },
    { id: 'education', label: 'Pendidikan', isCompleted: Array.isArray(data.education) && data.education.length > 0 },
    { id: 'organization', label: 'Riwayat Organisasi', isCompleted: Array.isArray(data.organization) && data.organization.length > 0 },
    { id: 'skills', label: 'Keahlian (Skills)', isCompleted: !!(data.skills?.trim()) },
    { id: 'projects', label: 'Proyek Portofolio', isCompleted: Array.isArray(data.projects) && data.projects.length > 0 },
    { id: 'social', label: 'Link Sosial Media', isCompleted: Array.isArray(data.social) && data.social.length > 0 },
    { id: 'certifications', label: 'Sertifikasi', isCompleted: Array.isArray(data.certifications) && data.certifications.length > 0 },
    { id: 'awards', label: 'Penghargaan', isCompleted: Array.isArray(data.awards) && data.awards.length > 0 },
    { id: 'services', label: 'Layanan', isCompleted: Array.isArray(data.services) && data.services.length > 0 },
  ];

  const completedCount = checklist.filter(item => item.isCompleted).length;
  const progressPercentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800 text-lg">Progress Portfolio</h2>
          </div>
          <div className="font-black text-emerald-600 text-xl">{progressPercentage}%</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
          <div 
            className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Toggle Detail */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 flex items-center justify-between text-sm text-slate-500 hover:text-slate-700 transition-colors border-t border-slate-100"
      >
        <span>Lihat detail</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Checklist Details */}
      {isExpanded && (
        <div className="p-6 pt-2 space-y-4">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                {item.isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center shrink-0">
                    <Circle className="w-4 h-4" />
                  </div>
                )}
                <span className={`text-sm ${item.isCompleted ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </div>
              
              {!item.isCompleted && (
                <Link 
                  href={`/personal/portfolio-builder?mode=template&section=${item.id}`}
                  className="text-sm text-emerald-600 font-medium opacity-100 transition-opacity"
                >
                  Lengkapi
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
