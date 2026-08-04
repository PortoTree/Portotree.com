"use client";

import { useState } from "react";
import { Globe, Eye, EyeOff, ExternalLink, Plus, Edit3, Trash2 } from "lucide-react";

const mockPortfolios = [
  {
    id: 1,
    title: "Portofolio Utama",
    slug: "johndoe",
    views: 1248,
    isPublic: true,
    lastUpdated: "2 hari lalu",
  },
];

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState(mockPortfolios);

  const togglePublic = (id: number) => {
    setPortfolios((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublic: !p.isPublic } : p))
    );
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portofolio</h1>
          <p className="text-slate-500 mt-1">Kelola halaman portofolio publik Anda.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20">
          <Plus className="w-4 h-4" />
          Buat Portofolio Baru
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {portfolios.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{p.title}</h3>
                  <a
                    href={`https://portotree.com/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    portotree.com/{p.slug}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-400">{p.views.toLocaleString()} tampilan</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs text-slate-400">Diperbarui {p.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Toggle Publik */}
                <button
                  onClick={() => togglePublic(p.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    p.isPublic
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {p.isPublic ? (
                    <><Eye className="w-3.5 h-3.5" /> Publik</>
                  ) : (
                    <><EyeOff className="w-3.5 h-3.5" /> Tersembunyi</>
                  )}
                </button>

                {/* Edit */}
                <a
                  href={`/personal/dashboard/storefront`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </a>

                {/* Hapus */}
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state jika kosong */}
        {portfolios.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <Globe className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-600 mb-1">Belum ada portofolio</h3>
            <p className="text-sm text-slate-400">Buat portofolio pertama Anda sekarang.</p>
          </div>
        )}
      </div>
    </div>
  );
}
