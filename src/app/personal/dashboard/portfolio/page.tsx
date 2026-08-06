"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
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
  { label: "Nama lengkap", done: true },
  { label: "Ringkasan / Bio", done: false },
  { label: "Pengalaman Kerja", done: false },
  { label: "Pendidikan", done: true },
  { label: "Keahlian (Skills)", done: false },
  { label: "Proyek Portofolio", done: false },
  { label: "Link Sosial Media", done: false },
  { label: "Sertifikasi", done: false },
  { label: "Kontak & Lokasi", done: false },
];

const fetcher = async () => {
  const result = await getMyPortfolio();
  if (result.success) {
    return result;
  }
  throw new Error(result.error || "Gagal mengambil portofolio");
};

export default function PortfolioPage() {
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // SWR Config: Hemat kuota Firestore Read!
  const { data: swrData } = useSWR('my-portfolio-dashboard', fetcher, {
    revalidateOnFocus: false, // Tidak nge-read ulang setiap pindah tab
    revalidateOnReconnect: true,
    dedupingInterval: 300000, // Caching 5 menit sebelum nge-read Firestore lagi
  });

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [myUsername, setMyUsername] = useState<string>("johndoe");
  const [createdAt, setCreatedAt] = useState<string>("-");
  const [updatedAt, setUpdatedAt] = useState<string>("-");

  useEffect(() => {
    if (swrData) {
      if (swrData.data) {
        const merged = { ...(swrData.data as PortfolioData) };
        const existing = merged.social?.map((s: any) => s.platform) || [];
        const missing = defaultPortfolioData.social.filter(s => !existing.includes(s.platform));
        if (missing.length > 0) {
          merged.social = [...(merged.social || []), ...missing];
        }
        console.log('[DEBUG] Merged Socials:', merged.social);
        setPortfolioData(merged);
        console.log('[DEBUG] Dashboard: portfolio data loaded dari SWR/Cache');
      } else {
        // Fallback ke localStorage jika belum ada data di server
        const saved = localStorage.getItem('draft_template_sections');
        if (saved) {
          try {
            const sections = JSON.parse(saved);
            const dataSection = sections.find((s: any) => s.type === 'PORTFOLIO_DATA');
            if (dataSection?.config) {
              const parsed = { ...dataSection.config };
              const existing = parsed.social?.map((s: any) => s.platform) || [];
              const missing = defaultPortfolioData.social.filter(s => !existing.includes(s.platform));
              if (missing.length > 0) {
                parsed.social = [...(parsed.social || []), ...missing];
              }
              setPortfolioData(parsed);
              console.log('[DEBUG] Dashboard: portfolio data loaded dari localStorage');
            }
          } catch (e) {}
        }
      }
      
      if (swrData.username) {
        setMyUsername(swrData.username);
      }
      
      if (swrData.createdAt) {
        const d = new Date(swrData.createdAt);
        setCreatedAt(`${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`);
      }
      if (swrData.updatedAt) {
        const d = new Date(swrData.updatedAt);
        setUpdatedAt(`${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`);
      }
    }
  }, [swrData]);

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
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="/personal/portfolio-builder?mode=template"
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-xs"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </a>
                <a
                  href={`https://${portfolioLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit
                </a>
                <button
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold rounded-xl hover:from-amber-500 hover:to-yellow-600 transition-all shadow-sm shadow-amber-200 text-xs"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
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
                <span className="font-medium text-slate-700">{updatedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" /> Created
                </span>
                <span className="font-medium text-slate-700">{createdAt}</span>
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
