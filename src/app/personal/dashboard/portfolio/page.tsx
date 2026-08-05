"use client";

import { useState, useEffect } from "react";
import { getMyPortfolio } from "@/app/actions/portfolio";
import { PortfolioViewer } from "@/components/builder/PortfolioViewer";
import { defaultPortfolioData, PortfolioData } from "@/lib/portfolioData";
import {
  Edit3,
  ExternalLink,
  Share2,
  Link as LinkIcon,
  Settings,
  Clock,
  Calendar,
  Globe,
  Copy,
  Crown,
  ChevronDown,
  ChevronUp,
  BarChart2,
} from "lucide-react";
import ProgressPortfolio from "@/components/dashboard/ProgressPortfolio";

const progressItems = [
  { label: "Foto Profil", done: true },
  { label: "Nama & Headline", done: true },
  { label: "Ringkasan / Bio", done: false },
  { label: "Pengalaman Kerja", done: false },
  { label: "Pendidikan", done: true },
  { label: "Keahlian (Skills)", done: false },
  { label: "Proyek Portofolio", done: false },
  { label: "Link Sosial Media", done: false },
  { label: "Sertifikasi", done: false },
  { label: "Kontak & Lokasi", done: false },
];

export default function PortfolioPage() {
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [myUsername, setMyUsername] = useState<string>("johndoe");

  useEffect(() => {
    // Load dari Firestore
    async function loadData() {
      try {
        const result = await getMyPortfolio();
        if (result.success) {
          if (result.username) {
            setMyUsername(result.username);
            console.log('[DEBUG] Dashboard: username dari Firestore:', result.username);
          }
          if (result.data) {
            setPortfolioData(result.data);
            console.log('[DEBUG] Dashboard: portfolio data loaded dari Firestore');
            return; // Prioritaskan Firestore
          }
        }
      } catch (err) {
        console.error('[DEBUG] Dashboard: error loading from Firestore:', err);
      }

      // Fallback ke localStorage
      const saved = localStorage.getItem('draft_template_sections');
      if (saved) {
        try {
          setPortfolioData(JSON.parse(saved));
          console.log('[DEBUG] Dashboard: portfolio data loaded dari localStorage');
        } catch (e) {}
      }
    }
    loadData();
  }, []);

  const portfolioLink = `portotree.com/p/${myUsername}`;
  const doneCount = progressItems.filter((i) => i.done).length;
  const progressPercent = Math.round((doneCount / progressItems.length) * 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${portfolioLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Portofolio Saya</h1>
        <p className="text-slate-500 text-sm mt-1">Kelola dan pantau performa portofolio publik Anda.</p>
      </div>

      {/* 2-KOLOM: kiri besar, kanan lebih kecil */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* ══ KOLOM KIRI ══════════════════════════════════════ */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* KARTU PREVIEW */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Area gelap preview */}
            <div className="bg-slate-100 relative overflow-hidden border-b border-slate-200" style={{ height: '340px' }}>
              <div 
                className="absolute top-0 left-0 pointer-events-none"
                style={{ 
                  width: '200%', 
                  height: '200%', 
                  transformOrigin: 'top left',
                  transform: 'scale(0.5)' 
                }}
              >
                <PortfolioViewer data={portfolioData} />
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="p-5 space-y-3">
              {/* Edit + Visit */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/personal/portfolio-builder?mode=template"
                  className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </a>
                <a
                  href={`https://${portfolioLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit
                </a>
              </div>

              {/* Share + Edit Link */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Share2, label: "Share" },
                  { icon: LinkIcon, label: "Edit Link" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PROGRESS PORTFOLIO */}
          <ProgressPortfolio />
        </div>

        {/* ══ KOLOM KANAN ═════════════════════════════════════ */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-4">


          {/* PORTFOLIO INFO */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-blue-500" />
              <h3 className="font-bold text-slate-800 text-sm">Portfolio Info</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> Modified
                </span>
                <span className="font-medium text-slate-700">8/5/2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> Created
                </span>
                <span className="font-medium text-slate-700">8/4/2026</span>
              </div>
              <div className="flex items-start justify-between gap-2 pt-1">
                <span className="flex items-center gap-2 text-slate-400 flex-shrink-0">
                  <Globe className="w-3.5 h-3.5" /> Link
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-blue-500 text-xs font-medium truncate">
                    {portfolioLink}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 text-slate-300 hover:text-blue-500 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copied && <span className="text-emerald-500 text-xs">✓</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed">
                HRD lebih menyukai{" "}
                <span className="font-bold text-slate-700">link yang rapi</span>. Ubah link
                acak kamu menjadi nama profesional agar profil Anda terlihat lebih meyakinkan!
              </p>
              <button className="mt-3 w-full py-2 border border-blue-200 text-blue-600 font-semibold text-xs rounded-lg hover:bg-blue-50 transition-colors">
                Ubah Link Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
