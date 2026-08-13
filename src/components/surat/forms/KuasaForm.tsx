import { useState } from "react";
import { ChevronDown, User, UserCheck, Briefcase, FileText } from "lucide-react";
import { SignaturePad } from "@/components/ui/SignaturePad";

interface KuasaFormProps {
  formData: any;
  handleFormChange: (field: string, value: string) => void;
  signatureData: string | null;
  setSignatureData: (data: string | null) => void;
}

export function KuasaForm({
  formData,
  handleFormChange,
  signatureData,
  setSignatureData,
}: KuasaFormProps) {
  const [expandedSection, setExpandedSection] = useState('pemberi');

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? '' : section);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
      {/* Section: Biodata Pemberi Kuasa */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'pemberi' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('pemberi')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'pemberi' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <User className={`w-4 h-4 ${expandedSection === 'pemberi' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'pemberi' ? 'text-white' : 'text-slate-700'}`}>Biodata Pemberi Kuasa</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'pemberi' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'pemberi' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap Pemberi Kuasa" value={formData.namaPemberi || ''} onChange={(e) => handleFormChange('namaPemberi', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Jakarta" value={formData.tempatLahirPemberi || ''} onChange={(e) => handleFormChange('tempatLahirPemberi', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalLahirPemberi || ''} onChange={(e) => handleFormChange('tanggalLahirPemberi', e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select value={formData.jenisKelaminPemberi || ''} onChange={(e) => handleFormChange('jenisKelaminPemberi', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                <option value="" disabled>Pilih...</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nomor Tanda Pengenal (KTP) <span className="text-red-500">*</span>
              </label>
              <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: 123456789" value={formData.tandaPengenalPemberi || ''} onChange={(e) => handleFormChange('tandaPengenalPemberi', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alamat lengkap" value={formData.alamatPemberi || ''} onChange={(e) => handleFormChange('alamatPemberi', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Biodata Penerima Kuasa */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'penerima' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('penerima')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'penerima' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <UserCheck className={`w-4 h-4 ${expandedSection === 'penerima' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'penerima' ? 'text-white' : 'text-slate-700'}`}>Biodata Penerima Kuasa</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'penerima' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'penerima' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nama <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Nama Lengkap Penerima Kuasa" value={formData.namaPenerima || ''} onChange={(e) => handleFormChange('namaPenerima', e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: Bandung" value={formData.tempatLahirPenerima || ''} onChange={(e) => handleFormChange('tempatLahirPenerima', e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-slate-600">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" value={formData.tanggalLahirPenerima || ''} onChange={(e) => handleFormChange('tanggalLahirPenerima', e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select value={formData.jenisKelaminPenerima || ''} onChange={(e) => handleFormChange('jenisKelaminPenerima', e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white">
                <option value="" disabled>Pilih...</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Nomor Tanda Pengenal (KTP) <span className="text-red-500">*</span>
              </label>
              <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Contoh: 987654321" value={formData.tandaPengenalPenerima || ''} onChange={(e) => handleFormChange('tandaPengenalPenerima', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Alamat lengkap" value={formData.alamatPenerima || ''} onChange={(e) => handleFormChange('alamatPenerima', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Section: Perihal Kuasa */}
      <div className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-colors duration-200 ${expandedSection === 'perihal' ? 'border-emerald-200' : 'border-slate-200'}`}>
        <button 
          onClick={() => toggleSection('perihal')}
          className={`w-full flex items-center justify-between p-4 transition-colors ${expandedSection === 'perihal' ? 'bg-emerald-600' : 'bg-slate-50/50 hover:bg-slate-50 border-b border-slate-100'}`}
        >
          <div className="flex items-center gap-3">
            <Briefcase className={`w-4 h-4 ${expandedSection === 'perihal' ? 'text-white' : 'text-emerald-500'}`} />
            <span className={`font-bold text-[15px] ${expandedSection === 'perihal' ? 'text-white' : 'text-slate-700'}`}>Perihal Kuasa</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'perihal' ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>
        {expandedSection === 'perihal' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Tujuan Kuasa <span className="text-red-500">*</span>
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-none" placeholder="Contoh: Pembayaran Pajak Kendaraan..." value={formData.tujuanKuasa || ''} onChange={(e) => handleFormChange('tujuanKuasa', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-600">
                Rincian (Opsional)
              </label>
              <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[100px] resize-none" placeholder={"Contoh:\n- Atas Nama : Dedi\n- No. Polisi : BE 6512"} value={formData.rincianKuasa || ''} onChange={(e) => handleFormChange('rincianKuasa', e.target.value)} />
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

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[13px] font-medium text-slate-600">
                Tanda Tangan Pemberi Kuasa <span className="text-red-500">*</span>
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
