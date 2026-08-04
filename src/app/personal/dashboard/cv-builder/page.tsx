"use client";

import { useState } from "react";
import { FileText, Plus, Edit3, Trash2, Download, Eye } from "lucide-react";

const mockCVs = [
  {
    id: 1,
    title: "CV Software Engineer",
    lastUpdated: "3 hari lalu",
    template: "Modern",
  },
];

const templates = [
  { id: "modern", label: "Modern", color: "bg-emerald-500" },
  { id: "minimal", label: "Minimal", color: "bg-slate-700" },
  { id: "creative", label: "Creative", color: "bg-violet-500" },
];

export default function CVBuilderPage() {
  const [cvList, setCvList] = useState(mockCVs);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    setCvList((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle,
        lastUpdated: "Baru saja",
        template: templates.find((t) => t.id === selectedTemplate)?.label || "Modern",
      },
    ]);
    setNewTitle("");
    setShowNew(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CV Builder</h1>
          <p className="text-slate-500 mt-1">Buat dan kelola CV profesional Anda.</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" />
          Buat CV Baru
        </button>
      </div>

      {/* FORM BUAT CV BARU */}
      {showNew && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-slate-800">CV Baru</h3>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Judul CV</label>
            <input
              type="text"
              placeholder="Contoh: CV Frontend Developer"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Pilih Template</label>
            <div className="flex gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    selectedTemplate === t.id
                      ? "border-emerald-500 bg-white text-emerald-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${t.color}`}></span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              className="px-5 py-2 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Buat CV
            </button>
            <button
              onClick={() => setShowNew(false)}
              className="px-5 py-2 bg-white text-slate-600 font-bold text-sm rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* LIST CV */}
      <div className="space-y-4">
        {cvList.map((cv) => (
          <div key={cv.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{cv.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-medium">
                      {cv.template}
                    </span>
                    <span className="text-xs text-slate-400">Diperbarui {cv.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Unduh PDF
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => setCvList((prev) => prev.filter((c) => c.id !== cv.id))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {cvList.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-600 mb-1">Belum ada CV</h3>
            <p className="text-sm text-slate-400">Buat CV pertama Anda sekarang.</p>
          </div>
        )}
      </div>
    </div>
  );
}
