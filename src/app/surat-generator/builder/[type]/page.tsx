"use client";

import { useState } from "react";
import { ArrowLeft, Download, Info, ChevronDown, Save, FileText, User, Briefcase, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUI } from "@/components/ui/UIProvider";
import { SignaturePad } from "@/components/ui/SignaturePad";

export default function SuratBuilderPage({ params }: { params: { type: string } }) {
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [expandedSection, setExpandedSection] = useState('data-diri');
  
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
    tanggalSurat: ''
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

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

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
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all bg-emerald-600 text-white shadow-md"
            title="Isi Data Surat"
          >
            <FileText className="w-5 h-5" />
          </button>
        </aside>

        {/* Middle Sidebar - Active Panel - hidden when printing */}
        <div className={`w-full md:w-[550px] shrink-0 border-r bg-white overflow-y-auto custom-scrollbar print:hidden h-full relative z-10 ${showMobilePreview ? 'hidden md:block' : 'block'}`}>
          <div className="flex flex-col">
            <div className="p-4 border-b bg-gray-50 relative md:sticky md:top-0 z-10">
              <h2 className="font-bold text-sm uppercase text-gray-500">Isi Data Surat</h2>
              <p className="text-xs text-gray-500 mt-1">Lengkapi informasi di bawah ini untuk menyusun surat secara otomatis.</p>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
              
              {/* Section: Data Diri */}
              <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'data-diri' ? 'border-emerald-200' : 'border-slate-200'}`}>
                <button 
                  onClick={() => toggleSection('data-diri')}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'data-diri' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <User className={`w-4 h-4 ${expandedSection === 'data-diri' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`font-bold text-[15px] ${expandedSection === 'data-diri' ? 'text-white' : 'text-slate-700'}`}>Data Diri</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'data-diri' ? 'text-white rotate-180' : 'text-slate-400'}`} />
                </button>
                {expandedSection === 'data-diri' && (
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-slate-600">Nama Lengkap</label>
                      <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Peri Penolong" value={formData.nama} onChange={(e) => handleFormChange('nama', e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Tempat Lahir</label>
                        <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Appiano Gentile" value={formData.tempatLahir} onChange={(e) => handleFormChange('tempatLahir', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Tanggal Lahir</label>
                        <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="3 Maret 1908" value={formData.tanggalLahir} onChange={(e) => handleFormChange('tanggalLahir', e.target.value)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Jenis Kelamin</label>
                        <select value={formData.jenisKelamin} onChange={(e) => handleFormChange('jenisKelamin', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                          <option value="" disabled>Pilih...</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Status Pernikahan</label>
                        <select value={formData.statusPernikahan} onChange={(e) => handleFormChange('statusPernikahan', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                          <option value="" disabled>Pilih...</option>
                          <option value="Belum Kawin">Belum Kawin</option>
                          <option value="Kawin">Kawin</option>
                          <option value="Cerai Hidup">Cerai Hidup</option>
                          <option value="Cerai Mati">Cerai Mati</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Agama</label>
                        <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Islam" value={formData.agama} onChange={(e) => handleFormChange('agama', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Pendidikan Terakhir</label>
                        <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="SMKN 1 Milan" value={formData.pendidikan} onChange={(e) => handleFormChange('pendidikan', e.target.value)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Email</label>
                        <input type="email" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="email@contoh.com" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-slate-600">Nomor Telepon</label>
                        <input type="tel" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="08123456789" value={formData.telepon} onChange={(e) => handleFormChange('telepon', e.target.value)} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-slate-600">Alamat Lengkap</label>
                      <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[80px] resize-none" placeholder="Appiano Gentile, Milan" value={formData.alamat} onChange={(e) => handleFormChange('alamat', e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-[13px] font-medium text-slate-600">Tanda Tangan</label>
                      <SignaturePad onSignatureChange={setSignatureData} />
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Posisi Pekerjaan */}
              <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'posisi' ? 'border-emerald-200' : 'border-slate-200'}`}>
                <button 
                  onClick={() => toggleSection('posisi')}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'posisi' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className={`w-4 h-4 ${expandedSection === 'posisi' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`font-bold text-[15px] ${expandedSection === 'posisi' ? 'text-white' : 'text-slate-700'}`}>Posisi Pekerjaan</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'posisi' ? 'text-white rotate-180' : 'text-slate-400'}`} />
                </button>
                {expandedSection === 'posisi' && (
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-slate-600">
                        Posisi yang Dilamar <span className="text-red-500">*</span>
                      </label>
                      <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="driver" value={formData.posisi} onChange={(e) => handleFormChange('posisi', e.target.value)} />
                    </div>
                  </div>
                )}
              </div>

              {/* Section: Lamaran Berkas */}
              <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'berkas' ? 'border-emerald-200' : 'border-slate-200'}`}>
                <button 
                  onClick={() => toggleSection('berkas')}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'berkas' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-4 h-4 ${expandedSection === 'berkas' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`font-bold text-[15px] ${expandedSection === 'berkas' ? 'text-white' : 'text-slate-700'}`}>Lamaran Berkas</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'berkas' ? 'text-white rotate-180' : 'text-slate-400'}`} />
                </button>
                {expandedSection === 'berkas' && (
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-[13px] font-medium text-slate-600 mb-[-4px]">
                        Nama Berkas <span className="text-red-500">*</span>
                      </label>
                      {berkasList.map((berkas) => (
                        <div key={berkas.id} className="flex items-center gap-2">
                          <input 
                            type="text" 
                            className="flex-1 border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
                            placeholder="Contoh: Ijazah, KTP, KK ..." 
                            value={berkas.name}
                            onChange={(e) => updateBerkas(berkas.id, e.target.value)}
                          />
                          <button 
                            onClick={() => removeBerkas(berkas.id)}
                            className="w-10 h-10 shrink-0 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={addBerkas}
                      className="w-fit flex items-center gap-2 text-emerald-600 border border-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium text-sm transition-colors mt-1"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      Tambah Nama Berkas
                    </button>
                  </div>
                )}
              </div>

              {/* Section: Informasi Surat */}
              <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'informasi' ? 'border-emerald-200' : 'border-slate-200'}`}>
                <button 
                  onClick={() => toggleSection('informasi')}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'informasi' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <Info className={`w-4 h-4 ${expandedSection === 'informasi' ? 'text-white' : 'text-slate-500'}`} />
                    <span className={`font-bold text-[15px] ${expandedSection === 'informasi' ? 'text-white' : 'text-slate-700'}`}>Informasi Surat</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'informasi' ? 'text-white rotate-180' : 'text-slate-400'}`} />
                </button>
                {expandedSection === 'informasi' && (
                  <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-slate-600">
                        Penerima Surat <span className="text-red-500">*</span>
                      </label>
                      <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: HRD PT Maju Jaya" value={formData.penerimaSurat} onChange={(e) => handleFormChange('penerimaSurat', e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-slate-600">
                        Tempat Surat <span className="text-red-500">*</span>
                      </label>
                      <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatSurat} onChange={(e) => handleFormChange('tempatSurat', e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-medium text-slate-600">
                        Tanggal Surat <span className="text-red-500">*</span>
                      </label>
                      <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalSurat} onChange={(e) => handleFormChange('tanggalSurat', e.target.value)} />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Main Canvas Workspace */}
        <main className={`flex-1 h-full overflow-y-auto overflow-x-hidden bg-gray-100/50 print:bg-white print:overflow-visible transition-all duration-300 ${!showMobilePreview ? 'hidden md:block' : 'block'}`}>
          <div className="min-h-full p-4 md:p-8 flex justify-center items-start print:p-0">
            {/* Style Khusus Print A4 untuk memaksa 1 Halaman */}
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page {
                  size: A4 portrait;
                  margin: 0;
                }
                body {
                  margin: 0;
                  padding: 0;
                  background: white;
                }
              }
            `}} />
            
            {/* A4 Paper Template */}
            <div className="w-full max-w-[794px] min-h-[1123px] h-fit md:h-[1123px] bg-white shadow-xl md:rounded-lg print:shadow-none print:rounded-none relative shrink-0 print:w-[210mm] print:h-[297mm] print:overflow-hidden box-border flex flex-col">
              <div className="px-[20mm] py-[12mm] text-[11pt] leading-[1.5] flex flex-col flex-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                
                {/* Header */}
                <h2 className="text-center font-bold text-lg mb-6 tracking-wide uppercase">
                  SURAT LAMARAN PEKERJAAN
                </h2>

                <div className="text-right mb-6">
                  <p>{formData.tempatSurat || 'Tempat'}, {formData.tanggalSurat ? new Date(formData.tanggalSurat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal'}</p>
                </div>

                {/* Recipient */}
                <div className="mb-6 leading-tight">
                  <p>Kepada Yth:</p>
                  <p className="whitespace-pre-wrap">{formData.penerimaSurat || '[Penerima Surat]'}</p>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="mb-1.5">Dengan hormat,</p>
                  <p className="indent-10 text-justify">
                    Berdasarkan informasi yang saya peroleh bahwa perusahaan yang Bapak/Ibu pimpin saat ini memerlukan pegawai sebagai <strong>{formData.posisi || '[Posisi]'}</strong>. Oleh karena itu saya mengajukan permohonan untuk mengisi posisi tersebut dan siap di tempatkan dimana saja.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-1.5">Saya yang bertanda tangan di bawah ini:</p>
                  <table className="w-full ml-4">
                    <tbody>
                      <tr>
                        <td className="w-48 pb-1">Nama</td>
                        <td className="pb-1">: {formData.nama || '[Nama Lengkap]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Tempat/Tanggal Lahir</td>
                        <td className="pb-1">: {formData.tempatLahir || '[Tempat Lahir]'}, {formData.tanggalLahir || '[Tanggal Lahir]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Alamat</td>
                        <td className="pb-1">: {formData.alamat || '[Alamat Lengkap]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Jenis Kelamin</td>
                        <td className="pb-1">: {formData.jenisKelamin || '[Jenis Kelamin]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Status Pernikahan</td>
                        <td className="pb-1">: {formData.statusPernikahan || '[Status Pernikahan]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Agama</td>
                        <td className="pb-1">: {formData.agama || '[Agama]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Lulusan</td>
                        <td className="pb-1">: {formData.pendidikan || '[Pendidikan Terakhir]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">No. Telepon</td>
                        <td className="pb-1">: {formData.telepon || '[Nomor Telepon]'}</td>
                      </tr>
                      <tr>
                        <td className="pb-1">Email</td>
                        <td className="pb-1">: {formData.email || '[Email]'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-6">
                  <p className="mb-1.5">Sebagai bahan pertimbangan bagi Bapak/ Ibu bersama ini turut saya lampirkan:</p>
                  <ol className="list-decimal list-inside ml-4">
                    {berkasList.map((berkas, index) => (
                      <li key={berkas.id} className="pb-1">
                        <span className="inline-block w-52">{berkas.name || '[Nama Berkas]'}</span>
                        {berkas.name && (
                          <span>1 Lembar{index === berkasList.length - 1 ? '.' : ''}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mb-6">
                  <p className="indent-10 text-justify">
                    Demikianlah surat permohonan kerja ini saya buat dengan sebenar-benarnya, besar harapan saya sudilah kiranya Bapak/Ibu dapat menerima saya bekerja di perusahaan yang Bapak/Ibu pimpin.
                  </p>
                  <p className="indent-10 text-justify mt-1">
                    Atas perhatian Bapak/Ibu sebelum dan sesudahnya saya ucapkan terima kasih.
                  </p>
                </div>

                {/* Signature */}
                <div className="flex justify-end pr-8 mt-auto pt-8">
                  <div className="text-center">
                    <p className="mb-4">Hormat Saya,</p>
                    
                    {signatureData ? (
                      <div className="mb-1 w-40 h-24 mx-auto flex items-center justify-center -rotate-2">
                        <img src={signatureData} alt="Tanda Tangan" className="max-w-full max-h-full object-contain scale-110" />
                      </div>
                    ) : (
                      <p className="font-['Brush_Script_MT',cursive] text-4xl mb-4 transform -rotate-2 text-slate-300 opacity-90">
                        TTD
                      </p>
                    )}
                    
                    <p className="underline decoration-1 underline-offset-4">{formData.nama || '[Nama Lengkap]'}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 print:hidden">
        <Button 
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="rounded-full w-14 h-14 shadow-xl bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center border-2 border-white"
        >
          {showMobilePreview ? <FileText className="w-6 h-6 text-white" /> : <Save className="w-6 h-6 text-white" />}
        </Button>
      </div>

    </div>
  );
}
