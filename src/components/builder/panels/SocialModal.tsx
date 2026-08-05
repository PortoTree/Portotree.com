import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SocialFormData {
  id?: string;
  platform: string;
  username: string;
  url: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SocialFormData) => void;
  initialData?: SocialFormData | null;
}

const platforms = ['LinkedIn', 'GitHub', 'Twitter', 'Instagram', 'Facebook'];

const generateUrl = (platform: string, username: string) => {
  if (!username) return '';
  switch (platform) {
    case 'LinkedIn': return `https://linkedin.com/in/${username}`;
    case 'GitHub': return `https://github.com/${username}`;
    case 'Twitter': return `https://twitter.com/${username}`;
    case 'Instagram': return `https://instagram.com/${username}`;
    case 'Facebook': return `https://facebook.com/${username}`;
    default: return '';
  }
};

export function SocialModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = React.useState<SocialFormData>({
    platform: '',
    username: '',
    url: ''
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
          platform: '',
          username: '',
          url: ''
        });
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialData]);

  const handleChange = (field: keyof SocialFormData, value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      
      // Auto-generate URL if it's empty, or if they haven't manually edited it
      // A simple heuristic: if the current URL is empty, or if it exactly matches the generated URL of the *previous* state
      const previousGeneratedUrl = generateUrl(prev.platform, prev.username);
      const isUrlEmptyOrGenerated = !prev.url || prev.url === previousGeneratedUrl;
      
      if ((field === 'platform' || field === 'username') && isUrlEmptyOrGenerated) {
         next.url = generateUrl(next.platform, next.username);
      }
      return next;
    });
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden max-md:animate-slide-up sm:my-8" 
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Media Sosial' : 'Buat Media Sosial Baru'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white custom-scrollbar">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <Label className="text-slate-700">Platform <span className="text-red-500">*</span></Label>
              <select 
                className="w-full h-10 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                value={formData.platform}
                onChange={(e) => handleChange('platform', e.target.value)}
              >
                <option value="" disabled>Pilih Platform</option>
                {platforms.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700">Username <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="andisetiawan"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="h-10 focus-visible:ring-emerald-600"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700">URL (Opsional)</Label>
              <Input 
                placeholder={
                  formData.platform === 'Instagram' ? 'https://instagram.com/username' : 
                  formData.platform === 'GitHub' ? 'https://github.com/username' : 
                  formData.platform === 'Twitter' ? 'https://twitter.com/username' : 
                  formData.platform === 'Facebook' ? 'https://facebook.com/username' : 
                  'https://linkedin.com/in/username'
                }
                value={formData.url}
                onChange={(e) => setFormData(prev => ({...prev, url: e.target.value}))}
                className="h-10 focus-visible:ring-emerald-600"
              />
              <p className="text-xs text-slate-500">URL akan otomatis dibuat dari platform dan username. Anda bisa mengubahnya jika perlu.</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 justify-end flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 font-medium"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onSave(formData)}
            disabled={!formData.platform || !formData.username}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
