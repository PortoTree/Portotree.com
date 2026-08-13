import { useState } from "react";
import { ChevronDown, User, Calendar, FileText } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface IzinKerjaFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function IzinKerjaForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: IzinKerjaFormProps) {
  const [expandedSection, setExpandedSection] = useState('data-diri');

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
      {/* Section: Data Diri */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'data-diri' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('data-diri')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'data-diri' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <User className={`w-4 h-4 ${expandedSection === 'data-diri' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'data-diri' ? 'text-white' : 'text-slate-700'}`}>Data Diri</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'data-diri' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'data-diri' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap" value={formData.nama || ''} onChange={(e) => handleFormChange('nama', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Staff IT" value={formData.jabatan || ''} onChange={(e) => handleFormChange('jabatan', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alamat lengkap" value={formData.alamat || ''} onChange={(e) => handleFormChange('alamat', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Detail Izin */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'detail-izin' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('detail-izin')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'detail-izin' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <Calendar className={`w-4 h-4 ${expandedSection === 'detail-izin' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'detail-izin' ? 'text-white' : 'text-slate-700'}`}>Detail Izin</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'detail-izin' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'detail-izin' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalMulaiIzin || ''} onChange={(e) => handleFormChange('tanggalMulaiIzin', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Selesai <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalSelesaiIzin || ''} onChange={(e) => handleFormChange('tanggalSelesaiIzin', e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alasan <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: ada keperluan keluarga" value={formData.alasan || ''} onChange={(e) => handleFormChange('alasan', e.target.value)} />
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
                Tanggal Surat <span className="text-red-500">*</span>
              </label>
              <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalSurat || ''} onChange={(e) => handleFormChange('tanggalSurat', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Kepada Yth. <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: HRD PT Maju Jaya" value={formData.penerimaSurat || ''} onChange={(e) => handleFormChange('penerimaSurat', e.target.value)} />
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
