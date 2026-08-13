import { useState } from "react";
import { ChevronDown, User, Briefcase, FileText, FileBadge } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface MagangFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
  berkasList: any[];
  addBerkas: () => void;
  updateBerkas: (id: number, name: string) => void;
  removeBerkas: (id: number) => void;
}

export function MagangForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
  berkasList,
  addBerkas,
  updateBerkas,
  removeBerkas,
}: MagangFormProps) {
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatLahir || ''} onChange={(e) => handleFormChange('tempatLahir', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalLahir || ''} onChange={(e) => handleFormChange('tanggalLahir', e.target.value)} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select value={formData.jenisKelamin || ''} onChange={(e) => handleFormChange('jenisKelamin', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                <option value="" disabled>Pilih...</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Pendidikan <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: S1 Teknik Informatika Universitas XYZ" value={formData.pendidikan || ''} onChange={(e) => handleFormChange('pendidikan', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alamat lengkap" value={formData.alamat || ''} onChange={(e) => handleFormChange('alamat', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Telepon (HP) <span className="text-red-500">*</span>
                </label>
                <input type="tel" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: 08123456789" value={formData.telepon || ''} onChange={(e) => handleFormChange('telepon', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: email@contoh.com" value={formData.email || ''} onChange={(e) => handleFormChange('email', e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section: Posisi Magang */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'posisi' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('posisi')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'posisi' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <Briefcase className={`w-4 h-4 ${expandedSection === 'posisi' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'posisi' ? 'text-white' : 'text-slate-700'}`}>Posisi Magang</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'posisi' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'posisi' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Posisi Magang <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: UI/UX Designer / Data Analyst" value={formData.posisiMagang || ''} onChange={(e) => handleFormChange('posisiMagang', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Lampiran Berkas */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'lampiran' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('lampiran')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'lampiran' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <FileBadge className={`w-4 h-4 ${expandedSection === 'lampiran' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'lampiran' ? 'text-white' : 'text-slate-700'}`}>Lampiran Berkas</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'lampiran' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'lampiran' && (
          <div className="p-4 flex flex-col gap-3">
            {berkasList.map((berkas, index) => (
              <div key={berkas.id} className="flex gap-2">
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
                  placeholder={`Lampiran ${index + 1} (contoh: Curriculum Vitae)`} 
                  value={berkas.name} 
                  onChange={(e) => updateBerkas(berkas.id, e.target.value)} 
                />
                {berkasList.length > 1 && (
                  <button 
                    onClick={() => removeBerkas(berkas.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={addBerkas}
              className="mt-2 text-sm text-emerald-600 font-medium p-2 hover:bg-emerald-50 rounded-md transition-colors border border-dashed border-emerald-200"
            >
              + Tambah Lampiran Berkas
            </button>
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
