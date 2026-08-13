"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FileText, Search, Clock, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight, MoreVertical, Download, Copy, Pencil } from "lucide-react";
import { SuratCanvasRenderer } from "@/components/surat/SuratCanvasRenderer";
import { SuratViewer } from "@/components/surat/SuratViewer";
import { useUI } from "@/components/ui/UIProvider";

export default function SuratGeneratorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedLetters, setSavedLetters] = useState<any[]>([]);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renameDraft, setRenameDraft] = useState<any>(null);
  const [newTitle, setNewTitle] = useState("");
  const [printDraft, setPrintDraft] = useState<any>(null);
  const { showConfirm } = useUI();

  // Reset builder initialization flag so entering builder always shows loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('surat_builder_initialized');
    }
  }, []);

  const populerTemplates = [
    {
      id: "lamaran-pekerjaan",
      title: "Surat Lamaran Pekerjaan",
      description: "Template lamaran kerja sesuai standar HR",
      slug: "lamaran-pekerjaan",
    },
    {
      id: "daftar-riwayat-hidup",
      title: "Surat Riwayat Hidup",
      description: "Template CV formal untuk administrasi",
      slug: "daftar-riwayat-hidup",
    },
    {
      id: "invoice",
      title: "Invoice",
      description: "Template invoice profesional",
      slug: "invoice",
    },
    {
      id: "izin-kerja",
      title: "Surat Izin Tidak Masuk Kerja",
      description: "Template izin tidak masuk kerja",
      slug: "izin-kerja",
    },
  ];

  const lainnyaTemplates = [
    {
      id: "pengunduran-diri",
      title: "Surat Pengunduran Diri",
      description: "Template resign resmi dan profesional",
      slug: "pengunduran-diri",
    },
    {
      id: "keterangan-sakit",
      title: "Surat Keterangan Sakit",
      description: "Template surat sakit resmi",
      slug: "keterangan-sakit",
    },
    {
      id: "kuasa",
      title: "Surat Kuasa",
      description: "Template surat kuasa hukum resmi",
      slug: "kuasa",
    },
    {
      id: "magang",
      title: "Surat Permohonan Magang Kerja",
      description: "Template permohonan magang mahasiswa",
      slug: "magang",
    },
    {
      id: "kesanggupan",
      title: "Surat Pernyataan Kesanggupan",
      description: "Template pernyataan kesanggupan",
      slug: "kesanggupan",
    },
    {
      id: "izin-kuliah",
      title: "Surat Izin Tidak Masuk Kuliah",
      description: "Template izin tidak masuk kuliah",
      slug: "izin-kuliah",
    },
    {
      id: "izin-sekolah",
      title: "Surat Izin Tidak Masuk Sekolah",
      description: "Template izin tidak masuk sekolah",
      slug: "izin-sekolah",
    },
    {
      id: "pernyataan",
      title: "Surat Pernyataan",
      description: "Template surat pernyataan umum",
      slug: "pernyataan",
    },
    {
      id: "belum-menikah",
      title: "Surat Pernyataan Belum Menikah",
      description: "Template surat pernyataan status belum menikah",
      slug: "belum-menikah",
    },
    {
      id: "cuti",
      title: "Surat Permohonan Izin Cuti Kerja",
      description: "Template surat permohonan izin cuti kerja",
      slug: "cuti",
    },
    {
      id: "izin-ortu",
      title: "Surat Izin Orang Tua",
      description: "Template izin dari orang tua",
      slug: "izin-ortu",
    },
  ];

  const filteredPopuler = populerTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLainnya = lainnyaTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allTemplates = [...populerTemplates, ...lainnyaTemplates];

  useEffect(() => {
    const loadedSaved = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('suratBuilder_')) {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // extract slug and id
            const parts = key.replace('suratBuilder_', '').split('_');
            const slug = parts[0];
            const draftId = parts[1] || null;
            
            const templateInfo = allTemplates.find(t => t.slug === slug);
            if (templateInfo) {
              loadedSaved.push({
                ...templateInfo,
                draftKey: key,
                draftId,
                customTitle: parsed.customTitle,
                title: parsed.customTitle || templateInfo.title, // use customTitle if exists
                lastModified: parsed.lastModified || null,
                data: parsed
              });
            }
          } catch (e) {
            console.error("Error parsing saved surat", e);
          }
        }
      }
    }
    loadedSaved.sort((a, b) => {
      if (!a.lastModified) return 1;
      if (!b.lastModified) return -1;
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    });
    setSavedLetters(loadedSaved);
  }, []);

  const handleDelete = (draftKey: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus draft surat ini?")) {
      localStorage.removeItem(draftKey);
      setSavedLetters(prev => prev.filter(s => s.draftKey !== draftKey));
      setActiveDropdown(null);
    }
  };

  const handleDuplicate = (letter: any) => {
    const newId = Date.now().toString();
    const newKey = `suratBuilder_${letter.slug}_${newId}`;
    const newTitle = `${letter.title} (Copy)`;
    
    const duplicatedData = {
      ...letter.data,
      customTitle: newTitle,
      lastModified: new Date().toISOString()
    };
    
    localStorage.setItem(newKey, JSON.stringify(duplicatedData));
    
    // update state
    setSavedLetters(prev => [{
      ...letter,
      draftKey: newKey,
      draftId: newId,
      title: newTitle,
      customTitle: newTitle,
      lastModified: duplicatedData.lastModified,
      data: duplicatedData
    }, ...prev]);
    
    setActiveDropdown(null);
  };

  const handleRenameSubmit = () => {
    if (!renameDraft || !newTitle.trim()) return;
    
    const updatedData = {
      ...renameDraft.data,
      customTitle: newTitle,
      lastModified: new Date().toISOString()
    };
    
    localStorage.setItem(renameDraft.draftKey, JSON.stringify(updatedData));
    
    setSavedLetters(prev => prev.map(s => {
      if (s.draftKey === renameDraft.draftKey) {
        return {
          ...s,
          title: newTitle,
          customTitle: newTitle,
          lastModified: updatedData.lastModified,
          data: updatedData
        };
      }
      return s;
    }));
    
    setRenameModalOpen(false);
    setActiveDropdown(null);
  };

  const handlePreview = (letter: any) => {
    setPreviewData(letter.data);
    setPreviewSlug(letter.slug);
  };

  useEffect(() => {
    if (printDraft) {
      // Need a longer delay because SuratViewer needs to calculate pagination first
      const timer = setTimeout(() => {
        window.print();
        // Clear after printing dialog is closed/opened
        setTimeout(() => setPrintDraft(null), 1000);
      }, 1500); // 1.5s delay to guarantee pagination completes
      return () => clearTimeout(timer);
    }
  }, [printDraft]);

  const handleDownload = (letter: any) => {
    if (window.innerWidth >= 768) {
      showConfirm({
        title: "Perhatian Sebelum Cetak",
        message: "Jika layar cetak (Preview PDF) terlihat kosong atau terpotong, pastikan Anda mengubah pengaturan 'Margins' menjadi 'None' (Tidak Ada) pada menu pengaturan Print.",
        variant: "primary",
        confirmText: "Mengerti & Cetak",
        cancelText: "Batal",
        onConfirm: () => {
          setPrintDraft(letter);
        }
      });
    } else {
      setPrintDraft(letter);
    }
  };

  const formatDate = (isoString: string | null) => {
    if (!isoString) return "Disimpan sebelumnya";
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const TemplateCard = ({ template, isPopuler = false }: { template: any, isPopuler?: boolean }) => (
    <Link
      href={`/surat-generator/builder/${template.slug}`}
      className={`${isPopuler ? 'bg-emerald-50/80 border-emerald-200 hover:border-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-300'} border hover:shadow-md transition-all rounded-[14px] p-5 flex items-center gap-4 cursor-pointer group`}
    >
      <div className={`w-12 h-12 rounded-xl ${isPopuler ? 'bg-emerald-100/60' : 'bg-emerald-50'} flex items-center justify-center shrink-0 transition-colors`}>
        <FileText className={`w-[22px] h-[22px] ${isPopuler ? 'text-emerald-600' : 'text-emerald-500'}`} />
      </div>
      <div className="flex flex-col">
        <h3 className={`font-semibold text-[15px] mb-1 transition-colors ${isPopuler ? 'text-emerald-900 group-hover:text-emerald-700' : 'text-slate-800 group-hover:text-emerald-700'}`}>{template.title}</h3>
        <p className={`text-[13px] ${isPopuler ? 'text-emerald-700/80' : 'text-slate-500'}`}>{template.description}</p>
      </div>
    </Link>
  );

  return (
    <div className="w-full flex flex-col pt-8 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-800 mb-2">Template Surat</h1>
        <p className="text-[15px] text-slate-500">
          Pilih dan sesuaikan berbagai template surat resmi sesuai dengan kebutuhan Anda dengan mudah.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Cari template surat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-[15px] shadow-sm"
        />
      </div>

      {savedLetters.length > 0 && searchQuery === "" && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Surat yang Sedang Dibuat (Draft)</h2>
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-4 px-6 font-semibold w-[40%]">Nama Surat</th>
                    <th className="py-4 px-6 font-semibold whitespace-nowrap">Terakhir Diubah</th>
                    <th className="py-4 px-6 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {savedLetters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((letter) => (
                    <tr key={letter.draftKey} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 text-sm">{letter.title}</h3>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatDate(letter.lastModified)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 relative">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handlePreview(letter)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors text-[13px] font-medium"
                          >
                            <Eye className="w-4 h-4" /> <span className="hidden lg:inline">Preview</span>
                          </button>
                          <Link 
                            href={`/surat-generator/builder/${letter.slug}${letter.draftId ? `?id=${letter.draftId}` : ''}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-[13px] font-medium border border-emerald-600"
                          >
                            <Edit className="w-4 h-4" /> <span className="hidden lg:inline">Edit</span>
                          </Link>
                          <button 
                            onClick={() => handleDownload(letter)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors text-[13px] font-medium"
                          >
                            <Download className="w-4 h-4" /> <span className="hidden lg:inline">Download</span>
                          </button>
                          
                          {/* Three dots menu */}
                          <div className="relative">
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === letter.draftKey ? null : letter.draftKey)}
                              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors ml-1"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            {activeDropdown === letter.draftKey && (
                              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  onClick={() => {
                                    setRenameDraft(letter);
                                    setNewTitle(letter.title);
                                    setRenameModalOpen(true);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-[13px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <Pencil className="w-4 h-4 text-slate-400" /> Rename
                                </button>
                                <button
                                  onClick={() => handleDuplicate(letter)}
                                  className="w-full text-left px-4 py-2 text-[13px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <Copy className="w-4 h-4 text-slate-400" /> Duplicate
                                </button>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button
                                  onClick={() => handleDelete(letter.draftKey)}
                                  className="w-full text-left px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-3">
            {savedLetters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((letter) => (
              <div key={letter.draftKey} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2 pr-8">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="font-semibold text-slate-800 text-[15px] leading-tight line-clamp-2">{letter.title}</h3>
                  </div>
                  {/* three dots absolute to top right */}
                  <div className="absolute top-3 right-2">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === letter.draftKey ? null : letter.draftKey)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {activeDropdown === letter.draftKey && (
                      <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <button
                          onClick={() => {
                            setRenameDraft(letter);
                            setNewTitle(letter.title);
                            setRenameModalOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4 text-slate-400" /> Rename
                        </button>
                        <button
                          onClick={() => handleDuplicate(letter)}
                          className="w-full text-left px-4 py-2 text-[13px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4 text-slate-400" /> Duplicate
                        </button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button
                          onClick={() => handleDelete(letter.draftKey)}
                          className="w-full text-left px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 ml-6">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(letter.lastModified)}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Link 
                    href={`/surat-generator/builder/${letter.slug}${letter.draftId ? `?id=${letter.draftId}` : ''}`}
                    className="flex justify-center items-center py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-white text-[13px] font-semibold border border-emerald-600"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handlePreview(letter)}
                    className="flex justify-center items-center py-2.5 rounded-lg border border-emerald-500 hover:bg-emerald-50 transition-colors text-emerald-600 text-[13px] font-semibold"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => handleDownload(letter)}
                    className="flex justify-center items-center py-2.5 rounded-lg border border-emerald-500 hover:bg-emerald-50 transition-colors text-emerald-600 text-[13px] font-semibold"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
            
          {savedLetters.length > itemsPerPage && (
            <div className="p-4 mt-2 border border-slate-200 md:border-t-0 flex items-center justify-between bg-white rounded-xl md:rounded-t-none md:rounded-b-xl shadow-sm">
                <span className="text-xs text-slate-500">
                  Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, savedLetters.length)} dari {savedLetters.length} draft
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md border text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-medium text-slate-700 px-2">{currentPage} / {Math.ceil(savedLetters.length / itemsPerPage)}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(savedLetters.length / itemsPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(savedLetters.length / itemsPerPage)}
                    className="p-1.5 rounded-md border text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
        </div>
      )}

      {filteredPopuler.length === 0 && filteredLainnya.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-[15px] font-semibold text-slate-700">Template tidak ditemukan</h3>
          <p className="text-[13px] text-slate-500 mt-1">Coba gunakan kata kunci lain untuk mencari surat.</p>
        </div>
      )}

      {filteredPopuler.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Surat Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPopuler.map((template) => (
              <TemplateCard key={template.id} template={template} isPopuler={true} />
            ))}
          </div>
        </div>
      )}

      {filteredLainnya.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Surat Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLainnya.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      )}

      {/* Preview Fullscreen Overlay */}
      {previewSlug && previewData && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center overflow-y-auto py-12 animate-in fade-in duration-200">
          {/* Floating Close Button */}
          <button 
            onClick={() => { setPreviewSlug(null); setPreviewData(null); }}
            className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors text-white z-[110] shadow-xl"
            title="Tutup Preview"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Canvas Wrapper */}
          <div className="transform scale-[0.55] sm:scale-75 md:scale-100 origin-top shadow-2xl transition-transform bg-white w-[210mm] min-h-[297mm]">
            <SuratCanvasRenderer 
              type={previewSlug}
              formData={previewData?.formData || {}}
              signatureData={previewData?.signatureData || null}
              berkasList={previewData?.berkasList || []}
            />
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Ubah Nama Surat</h3>
              <button 
                onClick={() => setRenameModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Baru
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Misal: Surat Lamaran PT ABC"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                autoFocus
              />
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setRenameModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleRenameSubmit}
                disabled={!newTitle.trim()}
                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Container using Portal to escape Dashboard layout */}
      {printDraft && typeof window !== 'undefined' && createPortal(
        <div className="print-container-wrapper bg-white">
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body > :not(.print-container-wrapper) {
                display: none !important;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                overflow: visible !important;
              }
              .print-container-wrapper {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                position: static !important;
              }
            }
            @media screen {
              .print-container-wrapper {
                /* We want it invisible but still rendered so SuratViewer can calculate pagination */
                opacity: 0;
                position: fixed;
                pointer-events: none;
                top: -9999px;
                left: -9999px;
                z-index: -9999;
                width: 10px;
                height: 10px;
                overflow: hidden;
              }
            }
          `}} />
          <div className="bg-white">
            <SuratViewer showMobilePreview={false} dependency={printDraft.data?.formData}>
              <SuratCanvasRenderer 
                type={printDraft.slug}
                formData={printDraft.data?.formData || {}}
                signatureData={printDraft.data?.signatureData || null}
                berkasList={printDraft.data?.berkasList || []}
              />
            </SuratViewer>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
