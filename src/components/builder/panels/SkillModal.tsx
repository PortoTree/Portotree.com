import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Brain, Code, Laptop, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { softSkills, hardSkills, softwareSkills } from '@/lib/skillsList';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (skills: string) => void;
  initialSkillsStr: string;
}

type Category = 'soft' | 'hard' | 'software';

export function SkillModal({ isOpen, onClose, onSave, initialSkillsStr }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('soft');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const skillsArr = initialSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
      setSelectedSkills(new Set(skillsArr));
      setSearchQuery('');
      setActiveCategory('soft');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialSkillsStr]);

  if (!mounted || !isOpen) return null;

  const handleSave = () => {
    onSave(Array.from(selectedSkills).join(', '));
    onClose();
  };

  const toggleSkill = (skill: string) => {
    const newSet = new Set(selectedSkills);
    if (newSet.has(skill)) {
      newSet.delete(skill);
    } else {
      newSet.add(skill);
    }
    setSelectedSkills(newSet);
  };

  const currentList = 
    activeCategory === 'soft' ? softSkills : 
    activeCategory === 'hard' ? hardSkills : 
    softwareSkills;

  const filteredList = currentList.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  // Allow custom skill if search doesn't match exactly
  const hasExactMatch = currentList.some(s => s.toLowerCase() === searchQuery.toLowerCase());
  const showAddCustom = searchQuery.trim().length > 0 && !hasExactMatch;

  return createPortal(
    <div 
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
    >
      <div 
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-md:animate-slide-up sm:my-8" 
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tambah Banyak Skill</h2>
            <p className="text-sm text-slate-500">Pilih dari daftar atau ketik skill sendiri</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 self-start">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col flex-1 overflow-hidden bg-slate-50/30">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-700 mb-3">Pilih Jenis Skill</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setActiveCategory('soft')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${activeCategory === 'soft' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                <Brain className={`w-6 h-6 ${activeCategory === 'soft' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">Soft Skill</span>
              </button>
              <button
                onClick={() => setActiveCategory('hard')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${activeCategory === 'hard' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                <Code className={`w-6 h-6 ${activeCategory === 'hard' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">Hard Skill</span>
              </button>
              <button
                onClick={() => setActiveCategory('software')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${activeCategory === 'software' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                <Laptop className={`w-6 h-6 ${activeCategory === 'software' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">Software</span>
              </button>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Ketik nama skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white"
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar border border-slate-200 rounded-xl bg-white p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {showAddCustom && (
                <button
                  onClick={() => {
                    toggleSkill(searchQuery.trim());
                    setSearchQuery('');
                  }}
                  className="flex items-center justify-between p-3 border-2 border-emerald-500 bg-emerald-50 text-emerald-700 rounded-lg text-sm text-left hover:bg-emerald-100 transition-colors"
                >
                  <span className="font-medium truncate pr-2">Tambah "{searchQuery}"</span>
                  <Check size={16} className="flex-shrink-0" />
                </button>
              )}
              {filteredList.map(skill => {
                const isSelected = selectedSkills.has(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`flex items-center justify-between p-3 border rounded-lg text-sm text-left transition-colors ${isSelected ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                  >
                    <span className="truncate pr-2">{skill}</span>
                    {isSelected && <Check size={16} className="text-blue-600 flex-shrink-0" />}
                  </button>
                );
              })}
              {filteredList.length === 0 && !showAddCustom && (
                <div className="col-span-full py-8 text-center text-slate-500">
                  Tidak ada skill yang cocok
                </div>
              )}
            </div>
          </div>
          
          {selectedSkills.size > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-xs font-medium text-blue-800 mb-2">{selectedSkills.size} Skill Terpilih:</div>
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedSkills).map(s => (
                  <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-blue-700 text-xs border border-blue-200">
                    {s}
                    <button onClick={() => toggleSkill(s)} className="hover:text-red-500 p-0.5 rounded-full hover:bg-red-50">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex gap-3 justify-end flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
