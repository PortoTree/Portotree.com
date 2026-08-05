import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

interface OrganizationFormData {
  id?: string;
  role: string;
  name: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: OrganizationFormData) => void;
  initialData?: OrganizationFormData | null;
}

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function OrganizationModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = React.useState<OrganizationFormData>({
    role: '',
    name: '',
    location: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    current: false,
    description: ''
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    } else if (isOpen) {
      setFormData({
        role: '',
        name: '',
        location: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        current: false,
        description: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen || !mounted) return null;

  const handleChange = (field: keyof OrganizationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.role || !formData.name || !formData.startMonth || !formData.startYear) {
      alert("Mohon lengkapi field yang wajib diisi (*)");
      return;
    }
    onSave(formData);
  };

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden" 
        style={{ maxHeight: '85vh', marginTop: '2rem', marginBottom: '2rem' }}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Riwayat Organisasi' : 'Buat Riwayat Organisasi Baru'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-slate-700">Jabatan <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="Senior Developer"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700">Nama Organisasi <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="Himpunan Mahasiswa Teknik Informatika"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-700">Lokasi</Label>
            <Input 
              placeholder="Jakarta"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-slate-700">Mulai <span className="text-red-500">*</span></Label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 h-9 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                  value={formData.startMonth}
                  onChange={(e) => handleChange('startMonth', e.target.value)}
                >
                  <option value="">Bulan</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <Input 
                  placeholder="Tahun"
                  className="flex-1 h-9"
                  value={formData.startYear}
                  onChange={(e) => handleChange('startYear', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700">Selesai {formData.current ? '' : <span className="text-red-500">*</span>}</Label>
              <div className="flex gap-2">
                <select 
                  disabled={formData.current}
                  className="flex-1 h-9 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm disabled:bg-slate-100 disabled:text-slate-400"
                  value={formData.endMonth}
                  onChange={(e) => handleChange('endMonth', e.target.value)}
                >
                  <option value="">Bulan</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <Input 
                  placeholder="Tahun"
                  disabled={formData.current}
                  className="flex-1 h-9 disabled:bg-slate-100"
                  value={formData.endYear}
                  onChange={(e) => handleChange('endYear', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input 
              type="checkbox" 
              id="exp-current"
              checked={formData.current}
              onChange={(e) => handleChange('current', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
            />
            <label htmlFor="exp-current" className="text-sm text-slate-700 cursor-pointer">
              Masih aktif di organisasi ini
            </label>
          </div>

          <div className="space-y-1.5 pt-2">
            <Label className="text-slate-700">Deskripsi</Label>
            <RichTextEditor 
              value={formData.description}
              onChange={(val) => handleChange('description', val)}
              placeholder="Jelaskan tanggung jawab dan pencapaian Anda di organisasi..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <Button type="button" variant="outline" onClick={onClose} className="min-w-[100px] font-medium">
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} className="min-w-[100px] bg-emerald-600 hover:bg-emerald-700 text-white font-medium border-none shadow-sm">
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
