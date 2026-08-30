"use client";

import { useState, useRef, useEffect, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Info, ChevronDown, Save, FileText, User, Briefcase, Trash2, Plus, LayoutTemplate, Eye, Edit, ZoomIn, ZoomOut, Maximize, Mail, PenTool } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUI } from "@/components/ui/UIProvider";

import { LamaranKerjaForm } from "@/components/surat/forms/LamaranKerjaForm";
import { PengunduranDiriForm } from "@/components/surat/forms/PengunduranDiriForm";
import { DaftarRiwayatHidupForm } from "@/components/surat/forms/DaftarRiwayatHidupForm";
import { KeteranganSakitForm } from "@/components/surat/forms/KeteranganSakitForm";
import { IzinKerjaForm } from "@/components/surat/forms/IzinKerjaForm";
import { KuasaForm } from "@/components/surat/forms/KuasaForm";
import { MagangForm } from "@/components/surat/forms/MagangForm";
import { KesanggupanForm } from "@/components/surat/forms/KesanggupanForm";
import { PernyataanForm } from "@/components/surat/forms/PernyataanForm";
import { IzinKuliahForm } from "@/components/surat/forms/IzinKuliahForm";
import { IzinSekolahForm } from "@/components/surat/forms/IzinSekolahForm";
import { PernyataanBelumMenikahForm } from "@/components/surat/forms/PernyataanBelumMenikahForm";
import { CutiForm } from "@/components/surat/forms/CutiForm";
import { IzinOrtuForm } from "@/components/surat/forms/IzinOrtuForm";
import { InvoiceForm } from "@/components/surat/forms/InvoiceForm";
import { SuratCanvasRenderer } from "@/components/surat/SuratCanvasRenderer";
import { SuratViewer } from "@/components/surat/SuratViewer";
import { checkDownloadLimit } from "@/app/actions/subscription";

const formMapping: Record<string, string> = {
  "lamaran-kerja": "Surat Lamaran Kerja",
  "pengunduran-diri": "Surat Pengunduran Diri",
  "daftar-riwayat-hidup": "Daftar Riwayat Hidup (CV)",
  "keterangan-sakit": "Surat Keterangan Sakit",
  "izin-kerja": "Surat Izin Kerja",
  "kuasa": "Surat Kuasa",
  "keterangan-domisili": "Surat Keterangan Domisili",
  "keterangan-kerja": "Surat Keterangan Kerja",
  "pernyataan": "Surat Pernyataan",
  "perjanjian": "Surat Perjanjian",
  "magang": "Surat Permohonan Magang",
  "kesanggupan": "Surat Pernyataan Kesanggupan",
  "izin-kuliah": "Surat Izin Tidak Masuk Kuliah",
  "izin-sekolah": "Surat Izin Tidak Masuk Sekolah",
  "belum-menikah": "Surat Pernyataan Belum Menikah",
  "cuti": "Surat Permohonan Izin Cuti Kerja",
  "izin-ortu": "Surat Izin Orang Tua",
  "invoice": "Invoice"
};

export default function SuratBuilderPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const type = resolvedParams.type;

  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const router = useRouter();
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'template'>('form');
  const [isChangingTemplate, setIsChangingTemplate] = useState(false);
  const [forcedLoading, setForcedLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsChangingTemplate(false);
  }, [type]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fromDraft = new URLSearchParams(window.location.search).get('from_draft');
      if (fromDraft === '1') return; // Skip loading screen kalau dari redirect dashboard mobile
      const isInitialized = sessionStorage.getItem('surat_builder_initialized');
      if (!isInitialized) {
        setForcedLoading(true);
        const timer = setTimeout(() => {
          setForcedLoading(false);
          sessionStorage.setItem('surat_builder_initialized', 'true');
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Handle redirect dari dashboard mobile: auto buka preview & print
  const searchParamsFromHook = useSearchParams();
  useEffect(() => {
    const fromDraft = searchParamsFromHook.get('from_draft');
    if (fromDraft !== '1') return;
    if (!isLoaded) return; // Tunggu data selesai load dari localStorage
    console.log('[SuratBuilder] from_draft + isLoaded: opening mobile preview for print');
    setShowMobilePreview(true);
    // Beri jeda agar SuratViewer selesai render halaman A4
    const timer = setTimeout(() => {
      window.print();
    }, 2500);
    return () => clearTimeout(timer);
  }, [searchParamsFromHook, isLoaded]);
  
  const populerTemplates = [
    {
      id: "lamaran-pekerjaan",
      title: "Surat Lamaran Pekerjaan",
      description: "Template lamaran kerja sesuai standar HR",
      slug: "lamaran-pekerjaan",
      icon: FileText,
    },
    {
      id: "daftar-riwayat-hidup",
      title: "Surat Riwayat Hidup",
      description: "Template CV formal untuk administrasi",
      slug: "daftar-riwayat-hidup",
      icon: FileText,
    },
    {
      id: "invoice",
      title: "Invoice",
      description: "Template invoice profesional",
      slug: "invoice",
      icon: FileText,
    },
    {
      id: "izin-kerja",
      title: "Surat Izin Tidak Masuk Kerja",
      description: "Template izin tidak masuk kerja",
      slug: "izin-kerja",
      icon: FileText,
    },
  ];

  const lainnyaTemplates = [
    {
      id: "pengunduran-diri",
      title: "Surat Pengunduran Diri",
      description: "Template resign resmi dan profesional",
      slug: "pengunduran-diri",
      icon: FileText,
    },
    {
      id: "keterangan-sakit",
      title: "Surat Keterangan Sakit",
      description: "Template surat sakit resmi",
      slug: "keterangan-sakit",
      icon: FileText,
    },
    {
      id: "kuasa",
      title: "Surat Kuasa",
      description: "Template surat kuasa hukum resmi",
      slug: "kuasa",
      icon: FileText,
    },
    {
      id: "magang",
      title: "Surat Permohonan Magang Kerja",
      description: "Template permohonan magang mahasiswa",
      slug: "magang",
      icon: FileText,
    },
    {
      id: "kesanggupan",
      title: "Surat Pernyataan Kesanggupan",
      description: "Template pernyataan kesanggupan",
      slug: "kesanggupan",
      icon: FileText,
    },
    {
      id: "izin-kuliah",
      title: "Surat Izin Tidak Masuk Kuliah",
      description: "Template izin tidak masuk kuliah",
      slug: "izin-kuliah",
      icon: FileText,
    },
    {
      id: "izin-sekolah",
      title: "Surat Izin Tidak Masuk Sekolah",
      description: "Template izin tidak masuk sekolah",
      slug: "izin-sekolah",
      icon: FileText,
    },
    {
      id: "pernyataan",
      title: "Surat Pernyataan",
      description: "Template surat pernyataan umum",
      slug: "pernyataan",
      icon: FileText,
    },
    {
      id: "belum-menikah",
      title: "Surat Pernyataan Belum Menikah",
      description: "Template surat pernyataan status belum menikah",
      slug: "belum-menikah",
      icon: FileText,
    },
    {
      id: "cuti",
      title: "Surat Permohonan Izin Cuti Kerja",
      description: "Template surat permohonan izin cuti kerja",
      slug: "cuti",
      icon: FileText,
    },
    {
      id: "izin-ortu",
      title: "Surat Izin Orang Tua",
      description: "Template izin dari orang tua",
      slug: "izin-ortu",
      icon: FileText,
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

  const searchParams = useSearchParams();
  const draftId = searchParams.get('id');
  const draftKey = draftId ? `suratBuilder_${type}_${draftId}` : `suratBuilder_${type}`;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.signatureData !== undefined) setSignatureData(parsed.signatureData);
        if (parsed.berkasList) setBerkasList(parsed.berkasList);
      }
    } catch (e) {
      console.error("Failed to load surat builder state", e);
    } finally {
      setIsLoaded(true);
    }
  }, [type]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({
        formData,
        signatureData,
        berkasList,
        lastModified: new Date().toISOString()
      }));
    } catch (e) {
      console.error("Failed to save surat builder state", e);
    }
  }, [formData, signatureData, berkasList, isLoaded, draftKey]);

  const { showConfirm, showToast } = useUI();

  const addBerkas = () => {
    setBerkasList([...berkasList, { id: Date.now(), name: '' }]);
  };

  const removeBerkas = (id: number) => {
    setBerkasList(berkasList.filter(b => b.id !== id));
  };

  const updateBerkas = (id: number, newName: string) => {
    setBerkasList(berkasList.map(b => b.id === id ? { ...b, name: newName } : b));
  };

  const handlePrint = async () => {
    // If auto-printing from iframe (print=true), bypass the warning modal
    if (searchParams.get('print') === 'true') {
      window.print();
      return;
    }

    setIsCheckingLimit(true);
    const limitCheck = await checkDownloadLimit('surat');
    setIsCheckingLimit(false);

    if (!limitCheck.success) {
      if (limitCheck.limitReached) {
        setShowPaywall(true);
      } else {
        showToast("Terjadi kesalahan sistem, silakan coba lagi", "error");
      }
      return;
    }

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
    switch (type) {
      case 'pengunduran-diri':
        return (
          <PengunduranDiriForm 
            formData={formData} 
            handleFormChange={handleFormChange} 
            signatureData={signatureData} 
            setSignatureData={setSignatureData} 
          />
        );
      case 'daftar-riwayat-hidup':
        return (
          <DaftarRiwayatHidupForm
            formData={formData} 
            handleFormChange={handleFormChange} 
            signatureData={signatureData} 
            setSignatureData={setSignatureData} 
          />
        );
      case 'keterangan-sakit':
        return (
          <KeteranganSakitForm
            formData={formData} 
            handleFormChange={handleFormChange} 
            signatureData={signatureData} 
            setSignatureData={setSignatureData} 
          />
        );
      case 'izin-kerja':
        return (
          <IzinKerjaForm
            formData={formData} 
            handleFormChange={handleFormChange} 
            signatureData={signatureData} 
            setSignatureData={setSignatureData} 
          />
        );
      case 'kuasa':
        return (
          <KuasaForm
            formData={formData} 
            handleFormChange={handleFormChange} 
            signatureData={signatureData} 
            setSignatureData={setSignatureData} 
          />
        );
      case "magang":
        return (
          <MagangForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
            berkasList={berkasList}
            addBerkas={addBerkas}
            updateBerkas={updateBerkas}
            removeBerkas={removeBerkas}
          />
        );
      case "pernyataan":
        return (
          <PernyataanForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
            pernyataanList={berkasList}
            addPernyataan={addBerkas}
            updatePernyataan={updateBerkas}
            removePernyataan={removeBerkas}
          />
        );
      case "kesanggupan":
        return (
          <KesanggupanForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
            pernyataanList={berkasList}
            addPernyataan={addBerkas}
            updatePernyataan={updateBerkas}
            removePernyataan={removeBerkas}
          />
        );
      case "izin-kuliah":
        return (
          <IzinKuliahForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
        );
      case "izin-sekolah":
        return (
          <IzinSekolahForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
        );
      case "belum-menikah":
        return (
          <PernyataanBelumMenikahForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
        );
      case "cuti":
        return (
          <CutiForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
        );
      case "izin-ortu":
        return (
          <IzinOrtuForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
        );
      case "invoice":
        return (
          <InvoiceForm
            formData={formData}
            handleFormChange={handleFormChange}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
        );
      default:
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
    }
  };

  const renderCanvasContent = () => {
    return (
      <SuratCanvasRenderer 
        type={type as string} 
        formData={formData} 
        signatureData={signatureData} 
        berkasList={berkasList} 
      />
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 print:bg-white print:h-auto print:overflow-visible">
      
      {/* Loading Overlay when switching template or initial load */}
      {(forcedLoading || isChangingTemplate) && (
        <div className="print:hidden fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-200">
          <img 
            src="/loading-gif.gif" 
            alt="Loading..."
            className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90"
          />
          <div className="flex flex-col items-center justify-center -mt-2 md:-mt-6">
            <div className="w-48 md:w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
              <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-full w-full"
                style={{
                  animation: 'progress 2s linear forwards'
                }}
              ></div>
            </div>
            <style>
              {`
                @keyframes progress {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
              `}
            </style>
            <p className="text-slate-500 text-xs md:text-sm mt-3 font-medium tracking-widest uppercase">
              {isChangingTemplate ? 'Menyiapkan template...' : 'Surat sedang di siapkan...'}
            </p>
          </div>
        </div>
      )}

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="print:hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Limit Unduh Gratis Habis!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Anda telah menggunakan jatah 1x unduh gratis untuk Surat. Dapatkan akses cetak <span className="font-semibold text-slate-800">sepuasnya tanpa batas dan tanpa watermark</span> dengan berlangganan Paket Premium.
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => window.open('https://api.whatsapp.com/send/?phone=6282138137351&text=Halo+min%2C+saya+mau+upgrade+akun+premium+PortoTree.&type=phone_number&app_absent=0', '_blank')}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>🚀 Upgrade ke Premium</span>
              </button>
              <button 
                onClick={() => setShowPaywall(false)}
                className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Nanti Dulu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay for limit check removed to prevent it from ever showing up in window.print() */}{/* Top Navbar - hidden when printing */}
      <div className="print:hidden h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/p/surat-generator" className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-base md:text-lg hidden md:block shrink-0">Builder Surat</h1>
          
          <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1"></div>
          <a 
            href="https://t.me/csportotree"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100 hover:border-red-200 group shrink-0"
            title="Hubungi telegram kami untuk memberikan pesan, kritik, dan saran"
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

          <Button onClick={handlePrint} disabled={isCheckingLimit} className={`bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-3 md:px-4 ${!showMobilePreview ? 'hidden md:flex' : 'flex'}`}>
            {isCheckingLimit ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin md:mr-2" />
            ) : (
              <Download className="w-4 h-4 md:mr-2" />
            )}
            <span className="hidden md:inline">{isCheckingLimit ? 'Mengecek...' : 'Download PDF'}</span>
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
            <div className="flex flex-col pb-32">
              <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
              <h2 className="font-bold text-sm uppercase text-gray-500">
                ISI DATA {(() => {
                  const activeTemplate = [...populerTemplates, ...lainnyaTemplates].find(t => t.slug === type);
                  return activeTemplate ? activeTemplate.title : 'SURAT';
                })()}
              </h2>
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
              <div className="flex-1 overflow-y-auto p-4 pb-32 custom-scrollbar">
                <div className="flex flex-col gap-10">
                  <div>
                    <h3 className="font-bold text-xs uppercase text-slate-500 mb-3 px-1">Surat Populer</h3>
                    <div className="flex flex-col gap-3">
                      {populerTemplates.map((template) => {
                        const IconComponent = template.icon;
                        return (
                          <Link
                            key={template.id}
                            href={`/surat-generator/builder/${template.slug}`}
                            className={`bg-white border rounded-[14px] p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${
                              type === template.slug ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200/80 hover:border-emerald-200'
                            }`}
                            onClick={() => {
                              setActiveTab('form');
                              if (type !== template.slug) setIsChangingTemplate(true);
                            }}
                          >
                            {type === template.slug && (
                              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                AKTIF
                              </div>
                            )}
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
                                type === template.slug ? 'bg-emerald-50' : 'bg-slate-50 group-hover:bg-emerald-50'
                              }`}>
                                <IconComponent className={`w-5 h-5 ${type === template.slug ? 'text-emerald-500' : 'text-slate-700 group-hover:text-emerald-500'}`} />
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

                  <div>
                    <h3 className="font-bold text-xs uppercase text-slate-500 mb-3 px-1">Surat Lainnya</h3>
                    <div className="flex flex-col gap-3">
                      {lainnyaTemplates.map((template) => {
                        const IconComponent = template.icon;
                        return (
                          <Link
                            key={template.id}
                            href={`/surat-generator/builder/${template.slug}`}
                            className={`bg-white border rounded-[14px] p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${
                              type === template.slug ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-200/80 hover:border-emerald-200'
                            }`}
                            onClick={() => {
                              setActiveTab('form');
                              if (type !== template.slug) setIsChangingTemplate(true);
                            }}
                          >
                            {type === template.slug && (
                              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                AKTIF
                              </div>
                            )}
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
                                type === template.slug ? 'bg-emerald-50' : 'bg-slate-50 group-hover:bg-emerald-50'
                              }`}>
                                <IconComponent className={`w-5 h-5 ${type === template.slug ? 'text-emerald-500' : 'text-slate-700 group-hover:text-emerald-500'}`} />
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
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas Workspace using SuratViewer */}
        <SuratViewer showMobilePreview={showMobilePreview} dependency={formData} type={type as string}>
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
