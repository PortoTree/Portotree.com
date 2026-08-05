import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, UploadCloud, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

interface AwardData {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  imageUrl: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AwardData) => void;
  initialData?: AwardData | null;
}

export function AwardModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [mounted, setMounted] = useState(false);
  
  const defaultData: AwardData = {
    id: `award-${Date.now()}`,
    title: '',
    issuer: '',
    year: '',
    description: '',
    imageUrl: '',
  };

  const [formData, setFormData] = useState<AwardData>(defaultData);

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
          id: `award-${Date.now()}`
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen || !mounted) return null;

  const handleChange = (field: keyof AwardData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.year.trim()) return;
    onSave(formData);
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-md:animate-slide-up sm:my-8" 
        style={{ maxHeight: '90vh' }}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Penghargaan' : 'Buat Penghargaan Baru'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white custom-scrollbar">
          <div className="space-y-2">
            <Label className="text-slate-700">Nama Penghargaan <span className="text-red-500">*</span></Label>
            <Input 
              placeholder=""
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-11 border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Pemberi Penghargaan</Label>
              <Input 
                placeholder=""
                value={formData.issuer}
                onChange={(e) => handleChange('issuer', e.target.value)}
                className="h-11 border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Tahun Penghargaan <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="2024"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="h-11 border-slate-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700">Deskripsi <span className="text-red-500">*</span></Label>
            <RichTextEditor 
              value={formData.description}
              onChange={(val) => handleChange('description', val)}
              placeholder="Deskripsikan tentang penghargaan yang telah kamu dapatkan!"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-slate-700 font-medium">Upload Foto Kegiatan / Sertifikat Penghargaan</Label>
              <p className="text-[13px] text-slate-500 mt-1 mb-3">Maks. 2 MB (Format JPEG, JPG, PNG)</p>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-white relative group hover:border-emerald-300 transition-colors">
              <ImageUpload
                onUploadSuccess={(url) => handleChange('imageUrl', url)}
                customTrigger={
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center cursor-pointer">
                    {formData.imageUrl ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium flex items-center gap-2">
                            <UploadCloud size={16} /> Ganti Gambar
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={36} className="text-slate-400 mb-4 group-hover:text-emerald-500 transition-colors" strokeWidth={1.5} />
                        <p className="text-[15px] text-slate-600 mb-1.5 font-medium">Klik untuk upload atau drag and drop</p>
                      </>
                    )}
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 shrink-0">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-100 font-medium">
            Batal
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.title.trim() || !formData.year.trim()}
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
