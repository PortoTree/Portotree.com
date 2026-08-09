import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export interface HobiFormData {
  id?: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: HobiFormData) => void;
  initialData?: HobiFormData | null;
}

export function HobiModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = useState<HobiFormData>({
    name: ''
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
          name: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Nama Hobi wajib diisi');
      return;
    }
    onSave(formData);
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden max-md:animate-slide-up sm:my-8" 
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Hobi' : 'Buat Hobi Baru'}
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
              <Label className="text-sm font-medium text-slate-700">Nama Hobi <span className="text-red-500">*</span></Label>
              <Input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Photography"
                className="h-11"
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
