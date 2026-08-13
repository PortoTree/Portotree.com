import { useState, useEffect } from "react";
import { ChevronDown, User, GraduationCap, Award, Briefcase, Users, Plus, Trash2 } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface DaftarRiwayatHidupFormProps {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function DaftarRiwayatHidupForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: DaftarRiwayatHidupFormProps) {
  const [expandedSection, setExpandedSection] = useState('biodata');

  useEffect(() => {
    const createDefaultItem = () => ({ tahunMulai: '', tahunSelesai: '', institusi: '', deskripsi: '' });
    if (!formData.pendidikanFormal || formData.pendidikanFormal.length === 0) {
      handleFormChange('pendidikanFormal', [createDefaultItem()]);
    }
    if (!formData.pendidikanNonformal || formData.pendidikanNonformal.length === 0) {
      handleFormChange('pendidikanNonformal', [createDefaultItem()]);
    }
    if (!formData.pengalamanKerja || formData.pengalamanKerja.length === 0) {
      handleFormChange('pengalamanKerja', [createDefaultItem()]);
    }
    if (!formData.riwayatOrganisasi || formData.riwayatOrganisasi.length === 0) {
      handleFormChange('riwayatOrganisasi', [createDefaultItem()]);
    }
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  const handleArrayChange = (field: string, index: number, key: string, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = { ...(newArray[index] || {}), [key]: value };
    handleFormChange(field, newArray);
  };

  const addArrayItem = (field: string) => {
    const newArray = [...(formData[field] || []), {}];
    handleFormChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...(formData[field] || [])];
    if (newArray.length <= 1) return; // Prevent deleting the last item
    newArray.splice(index, 1);
    handleFormChange(field, newArray);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
      {/* Section: Biodata Diri */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'biodata' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('biodata')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'biodata' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <User className={`w-4 h-4 ${expandedSection === 'biodata' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'biodata' ? 'text-white' : 'text-slate-700'}`}>Biodata Diri</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'biodata' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'biodata' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Budi Santoso" value={formData.nama || ''} onChange={(e) => handleFormChange('nama', e.target.value)} />
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

            <div className="grid grid-cols-2 gap-4">
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
                  Status <span className="text-red-500">*</span>
                </label>
                <select value={formData.statusPernikahan || ''} onChange={(e) => handleFormChange('statusPernikahan', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
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
                <label className="text-[13px] font-medium text-slate-600">
                  Agama <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Islam" value={formData.agama || ''} onChange={(e) => handleFormChange('agama', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Kewarganegaraan <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Indonesia" value={formData.kewarganegaraan || ''} onChange={(e) => handleFormChange('kewarganegaraan', e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Contoh: Jl. Sudirman No. 1, Jakarta Pusat" value={formData.alamat || ''} onChange={(e) => handleFormChange('alamat', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Pendidikan Terakhir <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: S1 Teknik Informatika" value={formData.pendidikan || ''} onChange={(e) => handleFormChange('pendidikan', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Telepon (HP) <span className="text-red-500">*</span>
                </label>
                <input type="tel" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: 08123456789" value={formData.telepon || ''} onChange={(e) => handleFormChange('telepon', e.target.value.replace(/\D/g, ''))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: budi.santoso@email.com" value={formData.email || ''} onChange={(e) => handleFormChange('email', e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-[13px] font-medium text-slate-600">Tanda Tangan</label>
              <SignaturePad onSignatureChange={setSignatureData} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Pendidikan Formal */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'formal' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('formal')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'formal' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className={`w-4 h-4 ${expandedSection === 'formal' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'formal' ? 'text-white' : 'text-slate-700'}`}>Pendidikan Formal</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'formal' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'formal' && (
          <div className="p-4 flex flex-col gap-4">
            {formData.pendidikanFormal && formData.pendidikanFormal.length > 0 && (
              <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 px-1">
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Mulai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Selesai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Nama Institusi&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700 text-center w-8 sm:w-10">Action</label>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              {(formData.pendidikanFormal || []).map((item: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 items-center">
                  <input type="text" placeholder="Mulai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunMulai || ''} onChange={(e) => handleArrayChange('pendidikanFormal', index, 'tahunMulai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Selesai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunSelesai || ''} onChange={(e) => handleArrayChange('pendidikanFormal', index, 'tahunSelesai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Institusi" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.institusi || ''} onChange={(e) => handleArrayChange('pendidikanFormal', index, 'institusi', e.target.value)} />
                  { (formData.pendidikanFormal || []).length > 1 ? (
                    <button onClick={() => removeArrayItem('pendidikanFormal', index)} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md transition-colors">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>
              ))}
            </div>

            <hr className="border-slate-200 my-2" />
            
            <button onClick={() => addArrayItem('pendidikanFormal')} className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors w-fit">
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
        )}
      </div>

      {/* Section: Pendidikan Nonformal */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'nonformal' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('nonformal')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'nonformal' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <Award className={`w-4 h-4 ${expandedSection === 'nonformal' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'nonformal' ? 'text-white' : 'text-slate-700'}`}>Pendidikan Nonformal</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'nonformal' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'nonformal' && (
          <div className="p-4 flex flex-col gap-4">
            {formData.pendidikanNonformal && formData.pendidikanNonformal.length > 0 && (
              <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 px-1">
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Mulai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Selesai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Nama Institusi&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700 text-center w-8 sm:w-10">Action</label>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              {(formData.pendidikanNonformal || []).map((item: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 items-center">
                  <input type="text" placeholder="Mulai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunMulai || ''} onChange={(e) => handleArrayChange('pendidikanNonformal', index, 'tahunMulai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Selesai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunSelesai || ''} onChange={(e) => handleArrayChange('pendidikanNonformal', index, 'tahunSelesai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Institusi" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.institusi || ''} onChange={(e) => handleArrayChange('pendidikanNonformal', index, 'institusi', e.target.value)} />
                  { (formData.pendidikanNonformal || []).length > 1 ? (
                    <button onClick={() => removeArrayItem('pendidikanNonformal', index)} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md transition-colors">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>
              ))}
            </div>

            <hr className="border-slate-200 my-2" />
            
            <button onClick={() => addArrayItem('pendidikanNonformal')} className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors w-fit">
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
        )}
      </div>

      {/* Section: Pengalaman Kerja */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'pengalaman' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('pengalaman')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'pengalaman' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <Briefcase className={`w-4 h-4 ${expandedSection === 'pengalaman' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'pengalaman' ? 'text-white' : 'text-slate-700'}`}>Pengalaman Kerja</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'pengalaman' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'pengalaman' && (
          <div className="p-4 flex flex-col gap-4">
            {formData.pengalamanKerja && formData.pengalamanKerja.length > 0 && (
              <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 px-1">
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Mulai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Selesai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Nama Perusahaan&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700 text-center w-8 sm:w-10">Action</label>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              {(formData.pengalamanKerja || []).map((item: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 items-center">
                  <input type="text" placeholder="Mulai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunMulai || ''} onChange={(e) => handleArrayChange('pengalamanKerja', index, 'tahunMulai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Selesai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunSelesai || ''} onChange={(e) => handleArrayChange('pengalamanKerja', index, 'tahunSelesai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Perusahaan" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.deskripsi || ''} onChange={(e) => handleArrayChange('pengalamanKerja', index, 'deskripsi', e.target.value)} />
                  { (formData.pengalamanKerja || []).length > 1 ? (
                    <button onClick={() => removeArrayItem('pengalamanKerja', index)} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md transition-colors">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>
              ))}
            </div>

            <hr className="border-slate-200 my-2" />
            
            <button onClick={() => addArrayItem('pengalamanKerja')} className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors w-fit">
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
        )}
      </div>

      {/* Section: Riwayat Organisasi */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'organisasi' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('organisasi')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'organisasi' ? 'bg-emerald-600' : 'hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <Users className={`w-4 h-4 ${expandedSection === 'organisasi' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'organisasi' ? 'text-white' : 'text-slate-700'}`}>Riwayat Organisasi</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'organisasi' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'organisasi' && (
          <div className="p-4 flex flex-col gap-4">
            {formData.riwayatOrganisasi && formData.riwayatOrganisasi.length > 0 && (
              <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 px-1">
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Mulai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Tahun Selesai&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700">Nama Organisasi&nbsp;<span className="text-red-500">*</span></label>
                <label className="text-[11px] sm:text-[13px] leading-tight font-medium text-slate-700 text-center w-8 sm:w-10">Action</label>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              {(formData.riwayatOrganisasi || []).map((item: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 sm:gap-4 items-center">
                  <input type="text" placeholder="Mulai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunMulai || ''} onChange={(e) => handleArrayChange('riwayatOrganisasi', index, 'tahunMulai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Selesai" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.tahunSelesai || ''} onChange={(e) => handleArrayChange('riwayatOrganisasi', index, 'tahunSelesai', e.target.value.replace(/\D/g, ''))} />
                  <input type="text" placeholder="Organisasi" className="w-full border border-slate-300 rounded-md px-2 sm:px-3 py-2 text-[13px] sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={item.deskripsi || ''} onChange={(e) => handleArrayChange('riwayatOrganisasi', index, 'deskripsi', e.target.value)} />
                  { (formData.riwayatOrganisasi || []).length > 1 ? (
                    <button onClick={() => removeArrayItem('riwayatOrganisasi', index)} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md transition-colors">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>
              ))}
            </div>

            <hr className="border-slate-200 my-2" />
            
            <button onClick={() => addArrayItem('riwayatOrganisasi')} className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors w-fit">
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
