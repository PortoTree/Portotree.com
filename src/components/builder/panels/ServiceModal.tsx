import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

interface ServiceData {
  id: string;
  title: string;
  link: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServiceData) => void;
  initialData?: ServiceData | null;
}

export function ServiceModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [mounted, setMounted] = useState(false);
  
  const defaultData: ServiceData = {
    id: `service-${Date.now()}`,
    title: '',
    link: '',
    description: '',
  };

  const [formData, setFormData] = useState<ServiceData>(defaultData);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          ...defaultData,
          id: `service-${Date.now()}`
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen || !mounted) return null;

  const handleChange = (field: keyof ServiceData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;
    onSave(formData);
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden" 
        style={{ maxHeight: '85vh', marginTop: '2rem', marginBottom: '2rem' }}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Layanan' : 'Buat Layanan Baru'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white custom-scrollbar">
          <div className="space-y-1.5">
            <Label className="text-slate-700">Nama Layanan <span className="text-red-500">*</span></Label>
            <p className="text-[13px] text-slate-500">Misal: Design Logo, Writing, Web Development, dll.</p>
            <Input 
              placeholder=""
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-11 border-slate-200 mt-1"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-700">Link Kontak</Label>
            <p className="text-[13px] text-slate-500">Misal: https://wa.me/62XXXXXXXXX</p>
            <Input 
              placeholder=""
              value={formData.link}
              onChange={(e) => handleChange('link', e.target.value)}
              className="h-11 border-slate-200 mt-1"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700">Deskripsi</Label>
            <RichTextEditor 
              value={formData.description}
              onChange={(val) => handleChange('description', val)}
              placeholder="Deskripsikan tentang layanan yang kamu tawarkan"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 shrink-0">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-100 font-medium">
            Batal
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.title.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-6 font-medium"
          >
            <Save size={16} /> Simpan
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
