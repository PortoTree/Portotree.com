import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { GraduationCap, Briefcase, FolderGit2, Award, Trophy, Share2, Wrench, Building2, Users, Plus, Minus, BookOpen, Globe, Activity, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (section: string) => void;
  onRemoveSection: (section: string) => void;
  activeSections: string[];
}

export function CVAddSectionModal({ isOpen, onClose, onAddSection, onRemoveSection, activeSections }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const sections = [
    {
      id: 'education',
      title: 'Riwayat Pendidikan',
      description: 'Tambahkan riwayat pendidikan formal dan non-formal Anda',
      icon: GraduationCap
    },
    {
      id: 'experience',
      title: 'Riwayat Pekerjaan',
      description: 'Tambahkan pengalaman kerja dan magang',
      icon: Briefcase
    },
    {
      id: 'organization',
      title: 'Riwayat Organisasi',
      description: 'Tambahkan pengalaman organisasi dan kepanitiaan',
      icon: Users
    },
    {
      id: 'awards',
      title: 'Prestasi',
      description: 'Tampilkan prestasi yang pernah diraih',
      icon: Trophy
    },
    {
      id: 'skills',
      title: 'Skills',
      description: 'Tampilkan keahlian dan skill yang Anda kuasai',
      icon: Wrench
    },
    {
      id: 'courses',
      title: 'Kursus & Pelatihan',
      description: 'Tambahkan kursus, bootcamp, atau pelatihan',
      icon: BookOpen
    },
    {
      id: 'languages',
      title: 'Bahasa',
      description: 'Tampilkan kemampuan bahasa asing',
      icon: Globe
    },
    {
      id: 'extracurriculars',
      title: 'Ekstrakurikuler',
      description: 'Tambahkan kegiatan ekstrakurikuler',
      icon: Activity
    },
    {
      id: 'hobbies',
      title: 'Hobi & Minat',
      description: 'Tampilkan hobi dan minat Anda',
      icon: Heart
    }
  ];

  return createPortal(
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-md:animate-slide-up sm:animate-in sm:fade-in sm:zoom-in-95 duration-200 max-h-[90vh] sm:my-8">
        <div className="px-6 py-5 border-b border-slate-100 shrink-0">
          <h2 className="text-[16px] font-semibold text-slate-700">Pilih Bagian untuk Ditambahkan</h2>
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh] custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map(section => {
              const Icon = section.icon;
              const isActive = activeSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  onClick={() => {
                    if (!isActive) {
                      onAddSection(section.id);
                      onClose();
                    }
                  }}
                  className={`group w-full text-left flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 ${
                    isActive 
                      ? 'border-slate-100 bg-white' 
                      : 'border-slate-300 bg-white shadow-sm hover:border-emerald-400 hover:bg-emerald-50/40 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                  }`}
                >
                  <div className={`self-start mt-0.5 ${isActive ? 'text-slate-400' : 'text-emerald-600'}`}>
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] text-slate-700 font-medium">
                      {section.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  {!isActive ? (
                    <div className="text-emerald-600 transition-transform group-hover:scale-110 self-center">
                      <Plus size={20} strokeWidth={1.75} />
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSection(section.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors self-center border border-transparent hover:border-red-200"
                      title="Hapus bagian ini"
                    >
                      <Minus size={20} strokeWidth={2} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-6 pt-4 border-t border-slate-100 shrink-0">
          <Button 
            variant="outline" 
            className="w-full text-slate-500 border-slate-200 hover:bg-slate-50 font-medium text-sm h-11"
            onClick={onClose}
          >
            Batal
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
