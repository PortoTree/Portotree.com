import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon, Video, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { ImageUpload } from '@/components/ui/ImageUpload';

interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  techStack: string;
  link: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  initialData?: ProjectFormData | null;
}

export function ProjectModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = React.useState<ProjectFormData>({
    title: '',
    description: '',
    imageUrl: '',
    videoUrl: '',
    techStack: '',
    link: ''
  });
  
  const [activeMediaTab, setActiveMediaTab] = useState<'image' | 'video'>('image');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
      setActiveMediaTab(initialData.videoUrl ? 'video' : 'image');
    } else if (isOpen) {
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        videoUrl: '',
        techStack: '',
        link: ''
      });
      setActiveMediaTab('image');
    }
  }, [initialData, isOpen]);

  if (!isOpen || !mounted) return null;

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      alert("Mohon lengkapi field yang wajib diisi (*)");
      return;
    }
    
    // Clean up irrelevant media fields if user toggled
    const finalData = { ...formData };
    if (activeMediaTab === 'image') finalData.videoUrl = '';
    if (activeMediaTab === 'video') finalData.imageUrl = '';
    
    onSave(finalData);
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
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Projek' : 'Buat Projek Baru'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white custom-scrollbar">
          <div className="space-y-1.5">
            <Label className="text-slate-700">Nama Projek <span className="text-red-500">*</span></Label>
            <Input 
              placeholder="e.g. Website E-Commerce"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-700">Deskripsi <span className="text-red-500">*</span></Label>
            <RichTextEditor 
              value={formData.description}
              onChange={(val) => handleChange('description', val)}
              placeholder="Deskripsikan tentang projek yang pernah kamu kerjakan!"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-700">Bahasa Pemrograman</Label>
            <Input 
              placeholder="HTML, CSS, dll"
              value={formData.techStack}
              onChange={(e) => handleChange('techStack', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-700">Link</Label>
            <p className="text-xs text-slate-500 mb-1">Cantumkan link agar orang bisa melihat lebih banyak projek kamu!</p>
            <Input 
              placeholder="https://example.com"
              value={formData.link}
              onChange={(e) => handleChange('link', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-slate-700">Upload Gambar / Link Video</Label>
              <p className="text-xs text-slate-500 mb-2">Gambar Maks. 2 MB (Format JPEG, JPG, PNG)</p>
            </div>

            <div className="flex rounded-lg overflow-hidden border border-slate-200 p-1 bg-slate-50">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${activeMediaTab === 'image' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                onClick={() => setActiveMediaTab('image')}
              >
                <ImageIcon size={16} /> Upload Gambar
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${activeMediaTab === 'video' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                onClick={() => setActiveMediaTab('video')}
              >
                <Video size={16} /> YouTube URL
              </button>
            </div>

            <div className="mt-4">
              {activeMediaTab === 'image' && (
                <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 relative group">
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
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-slate-200 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                              <ImageIcon size={24} />
                            </div>
                            <p className="text-sm font-medium text-slate-700 mb-1">Klik untuk upload atau drag and drop</p>
                            <p className="text-xs text-slate-500">PNG, JPG, GIF maksimal 2MB</p>
                          </>
                        )}
                      </div>
                    }
                  />
                </div>
              )}
              {activeMediaTab === 'video' && (
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <Label className="text-xs font-medium text-slate-700 mb-2 block">Masukkan URL YouTube</Label>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.videoUrl}
                    onChange={(e) => handleChange('videoUrl', e.target.value)}
                    className="bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <Button type="button" variant="outline" onClick={onClose} className="min-w-[100px] font-medium">
            Batal
          </Button>
          <Button type="button" onClick={handleSave} className="min-w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-medium border-none shadow-sm">
            Simpan
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
