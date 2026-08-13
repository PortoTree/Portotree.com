"use client";

import { useState, useRef, useEffect, use } from "react";
import { ArrowLeft, Download, Info, ChevronDown, Save, FileText, User, Briefcase, Trash2, Plus, LayoutTemplate, Eye, Edit, ZoomIn, ZoomOut, Maximize, Mail, PenTool } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUI } from "@/components/ui/UIProvider";

import { LamaranKerjaForm } from "@/components/surat/forms/LamaranKerjaForm";
import { PengunduranDiriForm } from "@/components/surat/forms/PengunduranDiriForm";
import { DaftarRiwayatHidupForm } from "@/components/surat/forms/DaftarRiwayatHidupForm";
import { LamaranKerjaCanvas } from "@/components/surat/templates/LamaranKerjaCanvas";
import { PengunduranDiriCanvas } from "@/components/surat/templates/PengunduranDiriCanvas";
import { DaftarRiwayatHidupCanvas } from "@/components/surat/templates/DaftarRiwayatHidupCanvas";
import { SuratViewer } from "@/components/surat/SuratViewer";

export default function SuratBuilderPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const type = resolvedParams.type;

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'template'>('form');
  
  const templates = [
    {
      id: 1,
      title: "Surat Lamaran Pekerjaan",
      description: "Surat lamaran kerja profesional",
      slug: "lamaran-pekerjaan",
      icon: FileText,
    },
    {
      id: 2,
      title: "Surat Pengunduran Diri",
      description: "Surat resign profesional",
      slug: "pengunduran-diri",
      icon: Mail,
    },
    {
      id: 3,
      title: "Daftar Riwayat Hidup",
      description: "Riwayat hidup dalam format surat",
      slug: "daftar-riwayat-hidup",
      icon: PenTool,
    },
  ];

  
  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    statusPernikahan: '',
    agama: '',
    pendidikan: '',
    email: '',
    telepon: '',
    alamat: '',
    posisi: '',
    penerimaSurat: '',
    tempatSurat: '',
    tanggalSurat: '',
    perusahaan: '',
    tanggalPengunduran: '',
    kewarganegaraan: '',
    pendidikanFormal: [],
    pendidikanNonformal: [],
    pengalamanKerja: [],
    riwayatOrganisasi: []
  });
  const [signatureData, setSignatureData] = useState<string | null>(null);

  // Berkas state
  const [berkasList, setBerkasList] = useState([
    { id: 1, name: '' }
  ]);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const { showConfirm } = useUI();

  const addBerkas = () => {
    setBerkasList([...berkasList, { id: Date.now(), name: '' }]);
  };

  const removeBerkas = (id: number) => {
    setBerkasList(berkasList.filter(b => b.id !== id));
  };

  const updateBerkas = (id: number, newName: string) => {
    setBerkasList(berkasList.map(b => b.id === id ? { ...b, name: newName } : b));
  };

  const handlePrint = () => {
    if (window.innerWidth >= 768) {
      showConfirm({
        title: "Perhatian Sebelum Cetak",
        message: "Jika layar cetak (Preview PDF) terlihat kosong atau terpotong, pastikan Anda mengubah pengaturan 'Margins' menjadi 'None' (Tidak Ada) pada menu pengaturan Print.",
        variant: "primary",
        confirmText: "Mengerti & Cetak",
        cancelText: "Batal",
        onConfirm: () => {
          setTimeout(() => window.print(), 100);
        }
      });
    } else {
      window.print();
    }
  };

  const renderFormContent = () => {
    if (type === 'pengunduran-diri') {
      return (
        <PengunduranDiriForm 
          formData={formData} 
          handleFormChange={handleFormChange} 
          signatureData={signatureData} 
          setSignatureData={setSignatureData} 
        />
      );
    }
    if (type === 'daftar-riwayat-hidup') {
      return (
        <DaftarRiwayatHidupForm
          formData={formData} 
          handleFormChange={handleFormChange} 
          signatureData={signatureData} 
          setSignatureData={setSignatureData} 
        />
      );
    }
    return (
      <LamaranKerjaForm 
        formData={formData} 
        handleFormChange={handleFormChange} 
        signatureData={signatureData} 
        setSignatureData={setSignatureData} 
        berkasList={berkasList} 
        updateBerkas={updateBerkas} 
        removeBerkas={removeBerkas} 
        addBerkas={addBerkas} 
      />
    );
  };

  const renderCanvasContent = () => {
    if (type === 'pengunduran-diri') {
      return (
        <PengunduranDiriCanvas 
          formData={formData} 
          signatureData={signatureData} 
        />
      );
    }
    if (type === 'daftar-riwayat-hidup') {
      return (
        <DaftarRiwayatHidupCanvas
          formData={formData} 
          signatureData={signatureData} 
        />
      );
    }
    return (
      <LamaranKerjaCanvas 
        formData={formData} 
        signatureData={signatureData} 
        berkasList={berkasList} 
      />
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 print:bg-white print:h-auto print:overflow-visible">
      {/* Top Navbar - hidden when printing */}
      <div className="print:hidden h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/personal/dashboard/surat-generator" className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-base md:text-lg hidden md:block shrink-0">Builder Surat</h1>
          
          <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1"></div>
          <a 
            href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100 hover:border-red-200 group shrink-0"
            title="Join grub whatsapp kami untuk memberikan pesan kritik dan saran"
          >
            <Info className="w-4 h-4 group-hover:text-red-700 transition-colors shrink-0" />
            <span className="text-[10px] md:text-xs font-bold group-hover:text-red-700 transition-colors whitespace-nowrap">
              Mengalami masalah?
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Navigation Toggles */}
          <div className="flex md:hidden items-center bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => {
                setActiveTab('form');
                setShowMobilePreview(false);
              }} 
              className={`p-2 rounded-lg transition-all ${activeTab === 'form' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
              title="Isi Data Surat"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setActiveTab('template');
                setShowMobilePreview(false);
              }} 
              className={`p-2 rounded-lg transition-all ${activeTab === 'template' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
              title="Pilih Template Surat"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>

          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-3 md:px-4">
            <Download className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Download PDF</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible relative">
        {/* Far Left - Icon Sidebar - hidden when printing */}
        <aside className="print:hidden w-16 shrink-0 bg-white border-r flex-col items-center py-4 space-y-4 z-20 hidden md:flex">
          <button 
            onClick={() => setActiveTab('form')}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm ${activeTab === 'form' ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-emerald-600'}`}
            title="Isi Data Surat"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setActiveTab('template')}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm ${activeTab === 'template' ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-emerald-600'}`}
            title="Pilih Template Surat"
          >
            <FileText className="w-5 h-5" />
          </button>
        </aside>

        {/* Middle Sidebar - Active Panel - hidden when printing */}
        <div className={`w-full md:w-[550px] shrink-0 border-r bg-white overflow-y-auto custom-scrollbar print:hidden h-full relative z-10 ${showMobilePreview ? 'hidden md:block' : 'block'}`}>
          {activeTab === 'form' ? (
            <div className="flex flex-col">
              <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
              <h2 className="font-bold text-sm uppercase text-gray-500">Isi Data Surat</h2>
              <p className="text-xs text-gray-500 mt-1">Lengkapi informasi di bawah ini untuk menyusun surat secara otomatis.</p>
            </div>
            {renderFormContent()}
          </div>
          ) : (
            <div className="flex flex-col h-full bg-slate-50/30">
              <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
                <h2 className="font-bold text-sm uppercase text-gray-500">Pilih Template</h2>
                <p className="text-xs text-gray-500 mt-1">Pilih desain template surat lamaran yang sesuai dengan kebutuhan Anda.</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="flex flex-col gap-3">
                  {templates.map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <Link
                        key={template.id}
                        href={`/surat-generator/builder/${template.slug}`}
                        className={`bg-white border rounded-[14px] p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${
                          type === template.slug ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200/80 hover:border-emerald-200'
                        }`}
                        onClick={() => setActiveTab('form')}
                      >
                        {type === template.slug && (
                          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                            AKTIF
                          </div>
                        )}
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
                            type === template.slug ? 'bg-emerald-600' : 'bg-slate-100 group-hover:bg-emerald-500'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${type === template.slug ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                          </div>
                          <div className="flex flex-col pt-0.5">
                            <h3 className={`font-bold text-[14px] leading-snug mb-1 ${
                              type === template.slug ? 'text-emerald-700' : 'text-slate-700 group-hover:text-emerald-700'
                            }`}>{template.title}</h3>
                            <p className="text-[12px] text-slate-500 leading-relaxed">{template.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas Workspace using SuratViewer */}
        <SuratViewer showMobilePreview={showMobilePreview} dependency={formData}>
          {renderCanvasContent()}
        </SuratViewer>
      </div>

      {/* Mobile Preview Toggle */}
      <button
        onClick={() => setShowMobilePreview(!showMobilePreview)}
        className={`md:hidden fixed bottom-6 right-6 z-50 px-6 py-3.5 rounded-full shadow-2xl text-[15px] font-bold uppercase tracking-wide transition-all flex items-center gap-2.5 print:hidden ${!showMobilePreview ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}
      >
        {showMobilePreview ? <Edit className="w-5 h-5 stroke-[2.5]" /> : <Eye className="w-5 h-5 stroke-[2.5]" />} 
        <span>{showMobilePreview ? 'Edit Data' : 'Preview'}</span>
      </button>

    </div>
  );
}
