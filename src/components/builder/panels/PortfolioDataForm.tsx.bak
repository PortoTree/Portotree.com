"use client";

import React from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface Props {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export function PortfolioDataForm({ data, onChange }: Props) {
  const handleChange = (section: keyof PortfolioData, field: string, value: any) => {
    if (section === 'skills') {
      onChange({ ...data, skills: value });
      return;
    }
    onChange({
      ...data,
      [section]: {
        ...(data[section] as any),
        [field]: value
      }
    });
  };

  const handleArrayChange = (section: 'experience' | 'projects', index: number, field: string, value: any) => {
    const newArray = [...data[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [section]: newArray });
  };

  const addArrayItem = (section: 'experience' | 'projects') => {
    const newArray = [...data[section]];
    if (section === 'experience') {
      newArray.push({
        id: `exp-${Date.now()}`,
        role: "New Role",
        company: "Company Name",
        startDate: "2023",
        endDate: "Present",
        current: true,
        description: ""
      });
    } else {
      newArray.push({
        id: `proj-${Date.now()}`,
        title: "New Project",
        description: "",
        imageUrl: "",
        techStack: "",
        link: ""
      });
    }
    onChange({ ...data, [section]: newArray as any });
  };

  const removeArrayItem = (section: 'experience' | 'projects', index: number) => {
    const newArray = [...data[section]];
    newArray.splice(index, 1);
    onChange({ ...data, [section]: newArray as any });
  };

  const [openSection, setOpenSection] = React.useState<string>('personal');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white border-r">
      <div className="p-4 border-b flex-shrink-0 bg-white">
        <h2 className="text-lg font-bold text-slate-800">Data Portofolio</h2>
        <p className="text-sm text-slate-500">Isi data diri Anda di sini.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* PERSONAL INFO */}
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
          <button 
            className={`w-full flex items-center justify-between px-4 py-3 font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors ${
              (!data.personal.name || !data.personal.bio || !data.personal.photoUrl || !data.personal.location || !data.personal.email) 
              ? 'border-l-4 border-red-500' : ''
            }`}
            onClick={() => toggleSection('personal')}
          >
            <span>
              Data Diri <span className="text-red-500">*</span>
              {(!data.personal.name || !data.personal.bio || !data.personal.photoUrl || !data.personal.location || !data.personal.email) && (
                <span className="ml-2 text-xs text-red-500 font-normal">(Ada kolom wajib yang belum diisi)</span>
              )}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'personal' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'personal' && (
            <div className="p-4 border-t space-y-4 bg-white">
              <div className="space-y-2">
                <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
                <Input 
                  value={data.personal.name} 
                  onChange={(e) => handleChange('personal', 'name', e.target.value)} 
                  className={!data.personal.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {!data.personal.name && <p className="text-xs text-red-500">Kolom ini wajib diisi</p>}
              </div>
              <div className="space-y-2">
                <Label>Headline / Jabatan</Label>
                <Input value={data.personal.headline} onChange={(e) => handleChange('personal', 'headline', e.target.value)} placeholder="e.g. Frontend Developer" />
              </div>
              <div className="space-y-2">
                <Label>Bio Singkat <span className="text-red-500">*</span></Label>
                <Textarea 
                  value={data.personal.bio} 
                  onChange={(e) => handleChange('personal', 'bio', e.target.value)} 
                  rows={3} 
                  className={!data.personal.bio ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {!data.personal.bio && <p className="text-xs text-red-500">Kolom ini wajib diisi</p>}
              </div>
              <div className="space-y-2">
                <Label>URL Foto Profil <span className="text-red-500">*</span></Label>
                <div className="flex flex-col gap-2">
                  <Input 
                    value={data.personal.photoUrl} 
                    onChange={(e) => handleChange('personal', 'photoUrl', e.target.value)} 
                    placeholder="Atau ketik/paste URL gambar di sini..." 
                    className={!data.personal.photoUrl ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {!data.personal.photoUrl && <p className="text-xs text-red-500">Foto profil wajib ada (ketik URL atau upload)</p>}
                  <ImageUpload onUploadSuccess={(url) => handleChange('personal', 'photoUrl', url)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Lokasi <span className="text-red-500">*</span></Label>
                <Input 
                  value={data.personal.location} 
                  onChange={(e) => handleChange('personal', 'location', e.target.value)} 
                  placeholder="Jakarta, Indonesia" 
                  className={!data.personal.location ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {!data.personal.location && <p className="text-xs text-red-500">Kolom ini wajib diisi</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email <span className="text-red-500">*</span></Label>
                  <Input 
                    value={data.personal.email} 
                    onChange={(e) => handleChange('personal', 'email', e.target.value)} 
                    type="email" 
                    className={!data.personal.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {!data.personal.email && <p className="text-xs text-red-500">Kolom ini wajib diisi</p>}
                </div>
                <div className="space-y-2">
                  <Label>Nomor whatsapp</Label>
                  <Input value={data.personal.phone} onChange={(e) => handleChange('personal', 'phone', e.target.value)} placeholder="0812345678" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SOCIAL LINKS */}
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
          <button 
            className="w-full flex items-center justify-between px-4 py-3 font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            onClick={() => toggleSection('social')}
          >
            Sosial Media
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'social' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'social' && (
            <div className="p-4 border-t space-y-4 bg-white">
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={data.social.linkedin} onChange={(e) => handleChange('social', 'linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input value={data.social.github} onChange={(e) => handleChange('social', 'github', e.target.value)} placeholder="https://github.com/username" />
              </div>
              <div className="space-y-2">
                <Label>Twitter / X URL</Label>
                <Input value={data.social.twitter} onChange={(e) => handleChange('social', 'twitter', e.target.value)} placeholder="https://x.com/username" />
              </div>
              <div className="space-y-2">
                <Label>Instagram URL</Label>
                <Input value={data.social.instagram} onChange={(e) => handleChange('social', 'instagram', e.target.value)} placeholder="https://instagram.com/username" />
              </div>
              <div className="space-y-2">
                <Label>Facebook URL</Label>
                <Input value={data.social.facebook} onChange={(e) => handleChange('social', 'facebook', e.target.value)} placeholder="https://facebook.com/username" />
              </div>
            </div>
          )}
        </div>

        {/* EXPERIENCE */}
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
          <button 
            className={`w-full flex items-center justify-between px-4 py-3 font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors ${
              data.experience.length === 0 ? 'border-l-4 border-red-500' : ''
            }`}
            onClick={() => toggleSection('experience')}
          >
            <span>
              Pengalaman <span className="text-red-500">*</span>
              {data.experience.length === 0 && (
                <span className="ml-2 text-xs text-red-500 font-normal">(Minimal 1 pengalaman wajib ditambahkan)</span>
              )}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'experience' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'experience' && (
            <div className="p-4 border-t space-y-4 bg-white">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-3 border rounded-md relative bg-slate-50 mb-3">
                  <button onClick={() => removeArrayItem('experience', index)} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-3 mt-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Posisi / Role</Label>
                      <Input className="h-8" value={exp.role} onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Perusahaan</Label>
                      <Input className="h-8" value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Tahun Mulai</Label>
                        <Input className="h-8" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Tahun Selesai</Label>
                        <Input className="h-8" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} placeholder="Present" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Deskripsi</Label>
                      <Textarea className="text-sm" rows={2} value={exp.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full flex gap-2" onClick={() => addArrayItem('experience')}>
                <Plus size={16} /> Tambah Pengalaman
              </Button>
            </div>
          )}
        </div>

        {/* PROJECTS */}
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
          <button 
            className="w-full flex items-center justify-between px-4 py-3 font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            onClick={() => toggleSection('projects')}
          >
            Proyek
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'projects' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'projects' && (
            <div className="p-4 border-t space-y-4 bg-white">
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="p-3 border rounded-md relative bg-slate-50 mb-3">
                  <button onClick={() => removeArrayItem('projects', index)} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-3 mt-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Nama Proyek</Label>
                      <Input className="h-8" value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">URL Gambar</Label>
                      <div className="flex flex-col gap-2">
                        <Input className="h-8" value={proj.imageUrl} onChange={(e) => handleArrayChange('projects', index, 'imageUrl', e.target.value)} placeholder="Atau ketik/paste URL gambar di sini..." />
                        <ImageUpload onUploadSuccess={(url) => handleArrayChange('projects', index, 'imageUrl', url)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Tech Stack (pisahkan dgn koma)</Label>
                      <Input className="h-8" value={proj.techStack} onChange={(e) => handleArrayChange('projects', index, 'techStack', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Link Proyek / Demo</Label>
                      <Input className="h-8" value={proj.link} onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Deskripsi Singkat</Label>
                      <Textarea className="text-sm" rows={2} value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full flex gap-2" onClick={() => addArrayItem('projects')}>
                <Plus size={16} /> Tambah Proyek
              </Button>
            </div>
          )}
        </div>

        {/* SKILLS */}
        <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
          <button 
            className={`w-full flex items-center justify-between px-4 py-3 font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors ${
              !data.skills ? 'border-l-4 border-red-500' : ''
            }`}
            onClick={() => toggleSection('skills')}
          >
            <span>
              Keahlian (Skills) <span className="text-red-500">*</span>
              {!data.skills && (
                <span className="ml-2 text-xs text-red-500 font-normal">(Keahlian wajib diisi)</span>
              )}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'skills' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'skills' && (
            <div className="p-4 border-t space-y-4 bg-white">
              <div className="space-y-2">
                <Label>Daftar Keahlian (pisahkan dengan koma) <span className="text-red-500">*</span></Label>
                <Textarea 
                  value={data.skills} 
                  onChange={(e) => handleChange('skills', '', e.target.value)} 
                  placeholder="React, Next.js, UI/UX Design..."
                  rows={3} 
                  className={!data.skills ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {!data.skills && <p className="text-xs text-red-500">Kolom ini wajib diisi</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
