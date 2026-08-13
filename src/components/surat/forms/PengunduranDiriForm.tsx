import { useState } from "react";
import { ChevronDown, User, Briefcase, Info, Building } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface PengunduranDiriFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function PengunduranDiriForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: PengunduranDiriFormProps) {
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
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap" value={formData.nama || ''} onChange={(e) => handleFormChange('nama', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama Perusahaan <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Perusahaan" value={formData.perusahaan || ''} onChange={(e) => handleFormChange('perusahaan', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Posisi/Jabatan <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Posisi/Jabatan" value={formData.posisi || ''} onChange={(e) => handleFormChange('posisi', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tanggal Pengunduran Diri <span className="text-red-500">*</span>
              </label>
              <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalPengunduran || ''} onChange={(e) => handleFormChange('tanggalPengunduran', e.target.value)} />
            </div>
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
            <Info className={`w-4 h-4 ${expandedSection === 'informasi' ? 'text-white' : 'text-emerald-500'}`} />
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
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="HRD PT Indomie" value={formData.penerimaSurat || ''} onChange={(e) => handleFormChange('penerimaSurat', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tempat Surat <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatSurat || ''} onChange={(e) => handleFormChange('tempatSurat', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tanggal Surat <span className="text-red-500">*</span>
              </label>
              <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalSurat || ''} onChange={(e) => handleFormChange('tanggalSurat', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-[13px] font-medium text-slate-600">Tanda Tangan</label>
              <SignaturePad onSignatureChange={setSignatureData} />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
