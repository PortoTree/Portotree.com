import { useState } from "react";
import { ChevronDown, User, FileText, CalendarClock, GraduationCap } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface IzinOrtuFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function IzinOrtuForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: IzinOrtuFormProps) {
  const [expandedSection, setExpandedSection] = useState('biodata-ortu');

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
      {/* Section: Biodata Orang Tua */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'biodata-ortu' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('biodata-ortu')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'biodata-ortu' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <User className={`w-4 h-4 ${expandedSection === 'biodata-ortu' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'biodata-ortu' ? 'text-white' : 'text-slate-700'}`}>Biodata Orang Tua</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'biodata-ortu' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'biodata-ortu' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama Orang Tua/Wali <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap" value={formData.namaOrtu || ''} onChange={(e) => handleFormChange('namaOrtu', e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatLahirOrtu || ''} onChange={(e) => handleFormChange('tempatLahirOrtu', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalLahirOrtu || ''} onChange={(e) => handleFormChange('tanggalLahirOrtu', e.target.value)} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Pekerjaan <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Wiraswasta" value={formData.pekerjaanOrtu || ''} onChange={(e) => handleFormChange('pekerjaanOrtu', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alamat lengkap orang tua" value={formData.alamatOrtu || ''} onChange={(e) => handleFormChange('alamatOrtu', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Biodata Anak */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'biodata-anak' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('biodata-anak')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'biodata-anak' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className={`w-4 h-4 ${expandedSection === 'biodata-anak' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'biodata-anak' ? 'text-white' : 'text-slate-700'}`}>Biodata Anak</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'biodata-anak' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'biodata-anak' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama Anak <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap Anak" value={formData.namaAnak || ''} onChange={(e) => handleFormChange('namaAnak', e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatLahirAnak || ''} onChange={(e) => handleFormChange('tempatLahirAnak', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalLahirAnak || ''} onChange={(e) => handleFormChange('tanggalLahirAnak', e.target.value)} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select value={formData.jenisKelaminAnak || ''} onChange={(e) => handleFormChange('jenisKelaminAnak', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                <option value="" disabled>Pilih...</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alamat lengkap anak" value={formData.alamatAnak || ''} onChange={(e) => handleFormChange('alamatAnak', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Perihal Perizinan */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'perihal-izin' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('perihal-izin')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'perihal-izin' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <CalendarClock className={`w-4 h-4 ${expandedSection === 'perihal-izin' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'perihal-izin' ? 'text-white' : 'text-slate-700'}`}>Perihal Perizinan</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'perihal-izin' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'perihal-izin' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Status Izin <span className="text-red-500">*</span>
              </label>
              <select value={formData.statusIzin || ''} onChange={(e) => handleFormChange('statusIzin', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                <option value="" disabled>Pilih Status Izin</option>
                <option value="diizinkan">Diizinkan</option>
                <option value="tidak diizinkan">Tidak Diizinkan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tujuan/Alasan Memberi Izin <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Contoh: mengikuti kegiatan study tour sekolah ke Bali / melamar pekerjaan di PT ABC" value={formData.tujuanIzin || ''} onChange={(e) => handleFormChange('tujuanIzin', e.target.value)} />
              <p className="text-[11px] text-slate-500">Akan mengisi bagian: "Dengan ini [Status Izin] kepada anak saya untuk [tujuan/alasan]."</p>
            </div>
          </div>
        )}
      </div>

      {/* Section: Informasi Surat */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'info-surat' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('info-surat')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'info-surat' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <FileText className={`w-4 h-4 ${expandedSection === 'info-surat' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'info-surat' ? 'text-white' : 'text-slate-700'}`}>Informasi Surat</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'info-surat' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'info-surat' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tempat Surat <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatSurat || ''} onChange={(e) => handleFormChange('tempatSurat', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tanggal Pembuatan Surat <span className="text-red-500">*</span>
              </label>
              <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalSurat || ''} onChange={(e) => handleFormChange('tanggalSurat', e.target.value)} />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[13px] font-medium text-slate-600">
                Tanda Tangan <span className="text-red-500">*</span>
              </label>
              <SignaturePad 
                onSignatureChange={setSignatureData}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
