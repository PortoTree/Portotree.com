"use client";

import React from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown, User, GraduationCap, Briefcase, Share2, Wrench, Users, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface Props {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export function PortfolioDataForm({ data, onChange }: Props) {
  const [openSection, setOpenSection] = React.useState<string>('personal');

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

  const handleArrayChange = (section: 'experience' | 'projects' | 'education' | 'organization', index: number, field: string, value: any) => {
    const newArray = [...data[section]];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [section]: newArray });
  };

  const addArrayItem = (section: 'experience' | 'projects' | 'education' | 'organization') => {
    const newArray = [...data[section]];
    if (section === 'experience') {
      newArray.push({ id: `exp-${Date.now()}`, role: "New Role", company: "Company Name", startDate: "2023", endDate: "Present", current: true, description: "" });
    } else if (section === 'projects') {
      newArray.push({ id: `proj-${Date.now()}`, title: "New Project", description: "", imageUrl: "", techStack: "", link: "" });
    } else if (section === 'education') {
      newArray.push({ id: `edu-${Date.now()}`, school: "Universitas", degree: "Sarjana", startDate: "2018", endDate: "2022", description: "" });
    } else if (section === 'organization') {
      newArray.push({ id: `org-${Date.now()}`, name: "Nama Organisasi", role: "Anggota", startDate: "2020", endDate: "2021", description: "" });
    }
    onChange({ ...data, [section]: newArray as any });
  };

  const removeArrayItem = (section: 'experience' | 'projects' | 'education' | 'organization', index: number) => {
    const newArray = [...data[section]];
    newArray.splice(index, 1);
    onChange({ ...data, [section]: newArray as any });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const AccordionSection = ({ 
    id, title, icon: Icon, badgeCount, hasError, children 
  }: { 
    id: string, title: string, icon: any, badgeCount?: number, hasError?: boolean, children: React.ReactNode 
  }) => (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
      <button 
        className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-slate-50 transition-colors"
        onClick={() => toggleSection(id)}
      >
        <div className="flex items-center gap-3">
          <Icon className="text-blue-600 w-5 h-5" />
          <span className="font-medium text-slate-700 text-[15px]">{title}</span>
          {hasError && <span className="text-red-500 text-xs">*</span>}
        </div>
        <div className="flex items-center gap-3">
          {badgeCount !== undefined && (
            <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded-full text-xs font-medium">
              {badgeCount} items
            </span>
          )}
          <ChevronDown className={`text-slate-400 w-4 h-4 transition-transform ${openSection === id ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {openSection === id && (
        <div className="p-4 border-t border-slate-100 space-y-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-white border-r">
      <div className="p-4 border-b flex-shrink-0 bg-white">
        <h2 className="text-lg font-bold text-slate-800">Data Portofolio</h2>
        <p className="text-sm text-slate-500">Isi data diri Anda di sini.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {/* PERSONAL INFO */}
        <AccordionSection
          id="personal"
          title="Informasi Pribadi"
          icon={User}
          hasError={!data.personal.name || !data.personal.bio || !data.personal.photoUrl || !data.personal.location || !data.personal.email}
        >
          <div className="space-y-2">
            <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
            <Input value={data.personal.name} onChange={(e) => handleChange('personal', 'name', e.target.value)} className={!data.personal.name ? 'border-red-500 focus-visible:ring-red-500' : ''} />
          </div>
          <div className="space-y-2">
            <Label>Headline / Jabatan</Label>
            <Input value={data.personal.headline} onChange={(e) => handleChange('personal', 'headline', e.target.value)} placeholder="e.g. Frontend Developer" />
          </div>
          <div className="space-y-2">
            <Label>Bio Singkat <span className="text-red-500">*</span></Label>
            <Textarea value={data.personal.bio} onChange={(e) => handleChange('personal', 'bio', e.target.value)} rows={3} className={!data.personal.bio ? 'border-red-500 focus-visible:ring-red-500' : ''} />
          </div>
          <div className="space-y-2">
            <Label>URL Foto Profil <span className="text-red-500">*</span></Label>
            <div className="flex flex-col gap-2">
              <Input value={data.personal.photoUrl} onChange={(e) => handleChange('personal', 'photoUrl', e.target.value)} placeholder="Atau ketik/paste URL gambar di sini..." className={!data.personal.photoUrl ? 'border-red-500 focus-visible:ring-red-500' : ''} />
              <ImageUpload onUploadSuccess={(url) => handleChange('personal', 'photoUrl', url)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Lokasi <span className="text-red-500">*</span></Label>
            <Input value={data.personal.location} onChange={(e) => handleChange('personal', 'location', e.target.value)} placeholder="Jakarta, Indonesia" className={!data.personal.location ? 'border-red-500 focus-visible:ring-red-500' : ''} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email <span className="text-red-500">*</span></Label>
              <Input value={data.personal.email} onChange={(e) => handleChange('personal', 'email', e.target.value)} type="email" className={!data.personal.email ? 'border-red-500 focus-visible:ring-red-500' : ''} />
            </div>
            <div className="space-y-2">
              <Label>Nomor whatsapp</Label>
              <Input value={data.personal.phone} onChange={(e) => handleChange('personal', 'phone', e.target.value)} placeholder="0812345678" />
            </div>
          </div>
        </AccordionSection>

        {/* EDUCATION */}
        <AccordionSection
          id="education"
          title="Riwayat Pendidikan"
          icon={GraduationCap}
          badgeCount={data.education?.length || 0}
        >
          {(data.education || []).map((edu, index) => (
            <div key={edu.id} className="p-3 border rounded-md relative bg-slate-50 mb-3">
              <button onClick={() => removeArrayItem('education', index)} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded">
                <Trash2 size={16} />
              </button>
              <div className="space-y-3 mt-4">
                <div className="space-y-1">
                  <Label className="text-xs">Institusi</Label>
                  <Input className="h-8" value={edu.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Gelar / Jurusan</Label>
                  <Input className="h-8" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Tahun Mulai</Label>
                    <Input className="h-8" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Tahun Selesai</Label>
                    <Input className="h-8" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} placeholder="Present" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Deskripsi</Label>
                  <Textarea className="text-sm" rows={2} value={edu.description} onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full flex gap-2" onClick={() => addArrayItem('education')}>
            <Plus size={16} /> Tambah Pendidikan
          </Button>
        </AccordionSection>

        {/* EXPERIENCE */}
        <AccordionSection
          id="experience"
          title="Riwayat Pekerjaan"
          icon={Briefcase}
          badgeCount={data.experience?.length || 0}
        >
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
            <Plus size={16} /> Tambah Pekerjaan
          </Button>
        </AccordionSection>

        {/* SOCIAL LINKS */}
        <AccordionSection
          id="social"
          title="Media Sosial"
          icon={Share2}
          badgeCount={Object.values(data.social || {}).filter(Boolean).length}
        >
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
        </AccordionSection>

        {/* SKILLS */}
        <AccordionSection
          id="skills"
          title="Skills"
          icon={Wrench}
          badgeCount={data.skills ? data.skills.split(',').filter(Boolean).length : 0}
          hasError={!data.skills}
        >
          <div className="space-y-2">
            <Label>Keahlian (Pisahkan dengan koma) <span className="text-red-500">*</span></Label>
            <Textarea 
              value={data.skills} 
              onChange={(e) => handleChange('skills', '', e.target.value)} 
              rows={3} 
              placeholder="React, Next.js, TypeScript, Figma..."
              className={!data.skills ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {!data.skills && <p className="text-xs text-red-500">Kolom ini wajib diisi</p>}
          </div>
        </AccordionSection>

        {/* ORGANIZATION */}
        <AccordionSection
          id="organization"
          title="Riwayat Organisasi"
          icon={Users}
          badgeCount={data.organization?.length || 0}
        >
          {(data.organization || []).map((org, index) => (
            <div key={org.id} className="p-3 border rounded-md relative bg-slate-50 mb-3">
              <button onClick={() => removeArrayItem('organization', index)} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded">
                <Trash2 size={16} />
              </button>
              <div className="space-y-3 mt-4">
                <div className="space-y-1">
                  <Label className="text-xs">Nama Organisasi</Label>
                  <Input className="h-8" value={org.name} onChange={(e) => handleArrayChange('organization', index, 'name', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Peran / Jabatan</Label>
                  <Input className="h-8" value={org.role} onChange={(e) => handleArrayChange('organization', index, 'role', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Tahun Mulai</Label>
                    <Input className="h-8" value={org.startDate} onChange={(e) => handleArrayChange('organization', index, 'startDate', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Tahun Selesai</Label>
                    <Input className="h-8" value={org.endDate} onChange={(e) => handleArrayChange('organization', index, 'endDate', e.target.value)} placeholder="Present" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Deskripsi</Label>
                  <Textarea className="text-sm" rows={2} value={org.description} onChange={(e) => handleArrayChange('organization', index, 'description', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full flex gap-2" onClick={() => addArrayItem('organization')}>
            <Plus size={16} /> Tambah Organisasi
          </Button>
        </AccordionSection>

        {/* PROJECTS */}
        <AccordionSection
          id="projects"
          title="Projects / Portofolio"
          icon={FolderGit2}
          badgeCount={data.projects?.length || 0}
        >
          {(data.projects || []).map((proj, index) => (
            <div key={proj.id} className="p-3 border rounded-md relative bg-slate-50 mb-3">
              <button onClick={() => removeArrayItem('projects', index)} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded">
                <Trash2 size={16} />
              </button>
              <div className="space-y-3 mt-4">
                <div className="space-y-1">
                  <Label className="text-xs">Judul Proyek</Label>
                  <Input className="h-8" value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">URL Gambar</Label>
                  <div className="flex flex-col gap-2">
                    <Input className="h-8" value={proj.imageUrl} onChange={(e) => handleArrayChange('projects', index, 'imageUrl', e.target.value)} />
                    <ImageUpload onUploadSuccess={(url) => handleArrayChange('projects', index, 'imageUrl', url)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tech Stack (pisahkan dengan koma)</Label>
                  <Input className="h-8" value={proj.techStack} onChange={(e) => handleArrayChange('projects', index, 'techStack', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Link Proyek</Label>
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
        </AccordionSection>

        {/* BOTTOM ADD SECTION BUTTON */}
        <button 
          className="mt-4 w-full border-2 border-dashed border-slate-200 text-slate-500 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-600 transition-all font-medium"
          onClick={() => {}}
        >
          <Plus size={18} /> Tambah Bagian
        </button>

      </div>
    </div>
  );
}
