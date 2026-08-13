import { useState } from "react";
import { ChevronDown, User, CalendarClock, FileText } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface CutiFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function CutiForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: CutiFormProps) {
  const [expandedSection, setExpandedSection] = useState('data-karyawan');

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
      {/* Section: Data Karyawan */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'data-karyawan' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('data-karyawan')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'data-karyawan' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <User className={`w-4 h-4 ${expandedSection === 'data-karyawan' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'data-karyawan' ? 'text-white' : 'text-slate-700'}`}>Data Karyawan</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'data-karyawan' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'data-karyawan' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap" value={formData.nama || ''} onChange={(e) => handleFormChange('nama', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                NIP / ID Karyawan <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nomor Induk Pegawai / ID" value={formData.nip || ''} onChange={(e) => handleFormChange('nip', e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Jabatan <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Staff IT" value={formData.jabatan || ''} onChange={(e) => handleFormChange('jabatan', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Divisi/Departemen <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Technology" value={formData.divisi || ''} onChange={(e) => handleFormChange('divisi', e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section: Detail Cuti */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'detail-cuti' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('detail-cuti')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'detail-cuti' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <CalendarClock className={`w-4 h-4 ${expandedSection === 'detail-cuti' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'detail-cuti' ? 'text-white' : 'text-slate-700'}`}>Detail Cuti</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'detail-cuti' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'detail-cuti' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Jenis Cuti <span className="text-red-500">*</span>
              </label>
              <select value={formData.jenisCuti || ''} onChange={(e) => handleFormChange('jenisCuti', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                <option value="" disabled>Pilih...</option>
                <option value="Cuti Tahunan">Cuti Tahunan</option>
                <option value="Cuti Sakit">Cuti Sakit</option>
                <option value="Cuti Bersalin/Melahirkan">Cuti Bersalin/Melahirkan</option>
                <option value="Cuti Alasan Penting">Cuti Alasan Penting</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalMulai || ''} onChange={(e) => handleFormChange('tanggalMulai', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Selesai <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalSelesai || ''} onChange={(e) => handleFormChange('tanggalSelesai', e.target.value)} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Durasi (hari kerja) <span className="text-red-500">*</span>
              </label>
              <input type="number" min="1" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: 3" value={formData.durasiCuti || ''} onChange={(e) => handleFormChange('durasiCuti', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alasan <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alasan cuti" value={formData.alasanCuti || ''} onChange={(e) => handleFormChange('alasanCuti', e.target.value)} />
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
