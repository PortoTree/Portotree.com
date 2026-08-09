import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { toast } from 'sonner';

export interface KursusFormData {
  id?: string;
  title: string;
  issuer: string;
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
  onSave: (data: KursusFormData) => void;
  initialData?: KursusFormData | null;
}

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function KursusModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = React.useState<KursusFormData>({
    title: '',
    issuer: '',
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

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          title: '',
          issuer: '',
          location: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          current: false,
          description: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) {
      toast.error('Nama Kursus dan Penyelenggara wajib diisi');
      return;
    }
    onSave(formData);
    onClose();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

  return createPortal(
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-md:animate-slide-up sm:my-8" 
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Kursus/Pelatihan' : 'Buat Kursus Baru'}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Nama Kursus/Pelatihan <span className="text-red-500">*</span></Label>
              <Input 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Full Stack Web Development"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Penyelenggara <span className="text-red-500">*</span></Label>
              <Input 
                value={formData.issuer}
                onChange={e => setFormData({...formData, issuer: e.target.value})}
                placeholder="Binar Academy"
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Tanggal Mulai</Label>
                <div className="flex gap-2">
                  <select 
                    className="flex-1 h-11 px-3 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-700"
                    value={formData.startMonth}
                    onChange={e => setFormData({...formData, startMonth: e.target.value})}
                  >
                    <option value="">Bulan</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select 
                    className="flex-1 h-11 px-3 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-700"
                    value={formData.startYear}
                    onChange={e => setFormData({...formData, startYear: e.target.value})}
                  >
                    <option value="">Tahun</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Tanggal Selesai</Label>
                <div className="flex gap-2">
                  <select 
                    className="flex-1 h-11 px-3 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    value={formData.endMonth}
                    onChange={e => setFormData({...formData, endMonth: e.target.value})}
                    disabled={formData.current}
                  >
                    <option value="">Bulan</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select 
                    className="flex-1 h-11 px-3 border border-slate-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-slate-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    value={formData.endYear}
                    onChange={e => setFormData({...formData, endYear: e.target.value})}
                    disabled={formData.current}
                  >
                    <option value="">Tahun</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="current-kursus"
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 h-4 w-4"
                checked={formData.current}
                onChange={e => setFormData({
                  ...formData, 
                  current: e.target.checked,
                  endMonth: e.target.checked ? '' : formData.endMonth,
                  endYear: e.target.checked ? '' : formData.endYear
                })}
              />
              <label htmlFor="current-kursus" className="text-sm text-slate-700 cursor-pointer">
                Masih mengikuti kursus ini
              </label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Lokasi</Label>
              <Input 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="Jakarta / Online"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Deskripsi</Label>
              <RichTextEditor 
                content={formData.description}
                onChange={(html) => setFormData({...formData, description: html})}
                placeholder="Topik yang dipelajari, skill yang didapat, atau pencapaian selama kursus..."
              />
            </div>
          </div>
        </div>

        <div className="p-4 sm:px-6 sm:py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto h-11 sm:h-10 bg-white">
            Batal
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 h-11 sm:h-10 text-white shadow-sm">
            Simpan
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
