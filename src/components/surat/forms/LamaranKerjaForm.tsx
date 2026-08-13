import { useState } from "react";
import { ChevronDown, User, Briefcase, FileText, Trash2, Plus, Info } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface LamaranKerjaFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
  berkasList: any[];
  updateBerkas: (id: number, name: string) => void;
  removeBerkas: (id: number) => void;
  addBerkas: () => void;
}

export function LamaranKerjaForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
  berkasList,
  updateBerkas,
  removeBerkas,
  addBerkas
}: LamaranKerjaFormProps) {
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
            <Briefcase className={`w-4 h-4 ${expandedSection === 'posisi' ? 'text-white' : 'text-emerald-500'}`} />
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
            <FileText className={`w-4 h-4 ${expandedSection === 'berkas' ? 'text-white' : 'text-emerald-500'}`} />
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
  );
}
