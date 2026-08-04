"use client";

import { useState } from "react";
import {
  Edit3,
  ExternalLink,
  Share2,
  Link as LinkIcon,
  FileDown,
  Settings,
  Clock,
  Calendar,
  Globe,
  Copy,
  Crown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

  const portfolioLink = "portotree.com/johndoe";
  const doneCount = progressItems.filter((i) => i.done).length;
  const progressPercent = Math.round((doneCount / progressItems.length) * 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${portfolioLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Portofolio Saya</h1>
        <p className="text-slate-500 text-sm mt-1">Kelola dan pantau performa portofolio publik Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* PREVIEW CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Dark preview area */}
            <div className="bg-slate-900 relative h-56 flex items-center justify-center overflow-hidden">
              {/* Vertical text kiri */}
              <div className="absolute left-3 top-0 bottom-0 flex items-center">
                <span className="text-slate-600 text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  PORTOTREE
                </span>
              </div>

              {/* Center content */}
              <div className="text-center px-8">
                <div className="inline-flex items-center gap-1.5 bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full mb-3">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Halo!
                </div>
                <h2 className="text-white text-2xl font-bold mb-4">
                  Saya <span className="text-emerald-400">johndoe</span>,
                </h2>
                <div className="w-28 h-36 bg-slate-700 rounded-t-full mx-auto mb-4 flex items-center justify-center text-slate-500 text-xs border border-slate-600">
                  280 × 340
                </div>
                <div className="flex gap-2 justify-center">
                  <button className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full hover:bg-emerald-600 transition-colors">
                    Tentang Saya
                  </button>
                  <button className="px-4 py-1.5 bg-slate-700 text-slate-200 text-xs font-bold rounded-full hover:bg-slate-600 transition-colors">
                    Lihat Karya
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/personal/dashboard/storefront"
                  className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </a>
                <a
                  href={`https://${portfolioLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Visit
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-xs font-medium">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-xs font-medium">
                  <LinkIcon className="w-3.5 h-3.5" /> Edit Link
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-xs font-medium">
                  <FileDown className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          </div>

          {/* PROGRESS PORTFOLIO */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 text-blue-500">◎</span>
                Progress Portfolio
              </h3>
              <span className="text-blue-600 font-black text-lg">{progressPercent}%</span>
            </div>

            {/* Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <button
              onClick={() => setShowDetail(!showDetail)}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              Lihat detail {showDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetail && (
              <ul className="mt-4 space-y-2">
                {progressItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      item.done ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {item.done ? "✓" : "○"}
                    </span>
                    <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
                    {!item.done && (
                      <span className="ml-auto text-xs text-blue-500 font-medium cursor-pointer hover:underline">Lengkapi</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────── */}
        <div className="space-y-4">

          {/* PERFORMANCE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-1">
              <span className="text-blue-500">📊</span> Performance
            </h3>
            <p className="text-xs text-slate-400 mb-4">Setelah portfolio aktif maka jumlah pengunjung akan muncul disini</p>

            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-200">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">Data Kunjungan</h4>
              <p className="text-xs text-slate-500 mb-4">Aktivasi portfolio untuk melihat statistik pengunjung</p>
              <button className="w-full py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors">
                Aktivasi Portfolio
              </button>
            </div>
          </div>

          {/* PORTFOLIO INFO */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-blue-500" /> Portfolio Info
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4" /> Modified
                </span>
                <span className="font-medium text-slate-700">
                  {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <Calendar className="w-4 h-4" /> Created
                </span>
                <span className="font-medium text-slate-700">8/4/2026</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-2 text-slate-500 flex-shrink-0">
                  <Globe className="w-4 h-4" /> Link
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-blue-600 text-xs font-medium truncate">{portfolioLink}</span>
                  <button onClick={handleCopy} className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copied && <span className="text-emerald-500 text-xs">✓</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed">
                HRD lebih menyukai <span className="font-bold text-slate-700">link yang rapi</span>. Ubah link acak menjadi nama profesional agar profil Anda terlihat lebih meyakinkan!
              </p>
              <button className="mt-3 w-full py-2 border border-blue-200 text-blue-600 font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors">
                Ubah Link Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
