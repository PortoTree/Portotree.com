"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PortfolioData } from "@/lib/portfolioData";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown, User, GraduationCap, Briefcase, Share2, Wrench, Users, FolderGit2, UploadCloud, Crop, ImageIcon, Bold, Italic, List, Link as LinkIcon, AlignLeft, ChevronLeft, ChevronRight, Sparkles, MapPin, Award, Trophy, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { EducationModal } from "./EducationModal";
import { ExperienceModal } from "./ExperienceModal";
import { SocialModal } from "./SocialModal";
import { SkillModal } from "./SkillModal";
import { OrganizationModal } from "./OrganizationModal";
import { ProjectModal } from "./ProjectModal";
import { AddSectionModal } from "./AddSectionModal";
import { CertificationModal } from "./CertificationModal";
import { AwardModal } from "./AwardModal";
import { ServiceModal } from "./ServiceModal";

interface Props {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const AccordionSection = ({ 
  id, title, icon: Icon, badgeCount, hasError, children, openSection, toggleSection 
}: { 
  id: string, title: string, icon: any, badgeCount?: number, hasError?: boolean, children: React.ReactNode, openSection: string, toggleSection: (id: string) => void
}) => {
  const isActive = openSection === id;
  return (
    <div className={`border rounded-2xl overflow-hidden shadow-sm transition-colors ${isActive ? 'border-emerald-600 bg-white' : 'border-slate-200 bg-white'}`}>
      <button 
        className={`w-full flex items-center justify-between px-4 py-4 transition-colors ${isActive ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
        onClick={() => toggleSection(id)}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
          <span className={`font-medium text-[15px] ${isActive ? 'text-white' : 'text-slate-700'}`}>{title}</span>
          {hasError && <span className={`text-xs ${isActive ? 'text-white' : 'text-red-500'}`}>*</span>}
        </div>
        <div className="flex items-center gap-3">
          {badgeCount !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}>
              {badgeCount} items
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180 text-white' : 'text-slate-400'}`} />
        </div>
      </button>
      {isActive && (
        <div className="p-5 space-y-5 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export function PortfolioDataForm({ data, onChange }: Props) {
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = React.useState<string>('');

  useEffect(() => {
    const sectionParam = searchParams.get('section');
    if (sectionParam) {
      if (['photo', 'name_headline', 'bio'].includes(sectionParam)) {
        setOpenSection('personal');
      } else {
        setOpenSection(sectionParam);
      }
    }
  }, [searchParams]);

  const [eduModalOpen, setEduModalOpen] = React.useState(false);
  const [editingEduId, setEditingEduId] = React.useState<string | null>(null);
  
  const [expModalOpen, setExpModalOpen] = React.useState(false);
  const [editingExpId, setEditingExpId] = React.useState<string | null>(null);
  
  const [socModalOpen, setSocModalOpen] = React.useState(false);
  const [editingSocId, setEditingSocId] = React.useState<string | null>(null);

  const [skillModalOpen, setSkillModalOpen] = React.useState(false);

  const [orgModalOpen, setOrgModalOpen] = React.useState(false);
  const [editingOrgId, setEditingOrgId] = React.useState<string | null>(null);

  const [projModalOpen, setProjModalOpen] = React.useState(false);
  const [editingProjId, setEditingProjId] = React.useState<string | null>(null);

  const [addSectionModalOpen, setAddSectionModalOpen] = React.useState(false);
  const [addedSections, setAddedSections] = React.useState<string[]>(() => {
    let initial = data.activeSections || ['education', 'experience', 'organization', 'projects', 'social', 'skills', 'certifications', 'awards', 'services'];
    if (data.activeSections && data.activeSections.length === 6 && !data.activeSections.includes('services')) {
      initial = [...data.activeSections, 'certifications', 'awards', 'services'];
    }
    return initial;
  });

  React.useEffect(() => {
    if (data.activeSections) {
      let updated = data.activeSections;
      if (updated.length === 6 && !updated.includes('services')) {
        updated = [...updated, 'certifications', 'awards', 'services'];
      }
      setAddedSections(updated);
    }
  }, [data.activeSections]);

  const [certModalOpen, setCertModalOpen] = React.useState(false);
  const [editingCertId, setEditingCertId] = React.useState<string | null>(null);

  const [awardModalOpen, setAwardModalOpen] = React.useState(false);
  const [editingAwardId, setEditingAwardId] = React.useState<string | null>(null);

  const [serviceModalOpen, setServiceModalOpen] = React.useState(false);
  const [editingServiceId, setEditingServiceId] = React.useState<string | null>(null);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email && !data.personal.email) {
        handleChange('personal', 'email', user.email);
      }
    });
    return () => unsubscribe();
  }, [data.personal.email]);

  const handleArrayChange = (section: 'experience' | 'projects' | 'education' | 'organization', index: number, field: string, value: any) => {
    const newArray = [...(data[section] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [section]: newArray });
  };

  const addArrayItem = (section: 'experience' | 'projects' | 'education' | 'organization') => {
    const newArray = [...(data[section] || [])];
    if (section === 'experience') {
      newArray.push({ id: `exp-${Date.now()}`, role: "New Role", company: "Company Name", location: "", startMonth: "Januari", startYear: "2023", endMonth: "", endYear: "", current: true, description: "" });
    } else if (section === 'projects') {
      newArray.push({ id: `proj-${Date.now()}`, title: "New Project", description: "", imageUrl: "", techStack: "", link: "" });
    } else if (section === 'education') {
      newArray.push({ id: `edu-${Date.now()}`, level: "S1", school: "Universitas", degree: "Sarjana", location: "", startMonth: "Agustus", startYear: "2018", endMonth: "Agustus", endYear: "2022", current: false, description: "" });
    } else if (section === 'organization') {
      newArray.push({ id: `org-${Date.now()}`, name: "Nama Organisasi", role: "Anggota", location: "", startMonth: "Januari", startYear: "2020", endMonth: "", endYear: "", current: true, description: "" });
    }
    onChange({ ...data, [section]: newArray as any });
  };

  const removeArrayItem = (section: 'experience' | 'projects' | 'education' | 'organization', index: number) => {
    const newArray = [...(data[section] || [])];
    newArray.splice(index, 1);
    onChange({ ...data, [section]: newArray as any });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handleSaveEducation = (eduData: any) => {
    if (editingEduId) {
      // Edit existing
      onChange({
        ...data,
        education: (data.education || []).map(e => e.id === editingEduId ? { ...eduData, id: editingEduId } : e)
      });
    } else {
      // Add new
      onChange({
        ...data,
        education: [...(data.education || []), { ...eduData, id: `edu-${Date.now()}` }]
      });
    }
    setEduModalOpen(false);
    setEditingEduId(null);
  };

  const handleEditEducation = (id: string) => {
    setEditingEduId(id);
    setEduModalOpen(true);
  };

  const handleDeleteEducation = (index: number) => {
    removeArrayItem('education', index);
  };

  const handleSaveExperience = (expData: any) => {
    if (editingExpId) {
      onChange({
        ...data,
        experience: (data.experience || []).map(e => e.id === editingExpId ? { ...expData, id: editingExpId } : e)
      });
    } else {
      onChange({
        ...data,
        experience: [...(data.experience || []), { ...expData, id: `exp-${Date.now()}` }]
      });
    }
    setExpModalOpen(false);
    setEditingExpId(null);
  };

  const handleEditExperience = (id: string) => {
    setEditingExpId(id);
    setExpModalOpen(true);
  };

  const handleDeleteExperience = (index: number) => {
    removeArrayItem('experience', index);
  };

  const handleSaveSocial = (socData: any) => {
    if (editingSocId) {
      onChange({
        ...data,
        social: (data.social || []).map(s => s.id === editingSocId ? { ...socData, id: editingSocId } : s)
      });
    } else {
      onChange({
        ...data,
        social: [...(data.social || []), { ...socData, id: `soc-${Date.now()}` }]
      });
    }
    setSocModalOpen(false);
    setEditingSocId(null);
  };

  const handleEditSocial = (id: string) => {
    setEditingSocId(id);
    setSocModalOpen(true);
  };

  const handleDeleteSocial = (index: number) => {
    const newArray = [...(data.social || [])];
    newArray.splice(index, 1);
    onChange({ ...data, social: newArray });
  };

  const handleSaveOrganization = (orgData: any) => {
    if (editingOrgId) {
      onChange({
        ...data,
        organization: (data.organization || []).map(o => o.id === editingOrgId ? { ...orgData, id: editingOrgId } : o)
      });
    } else {
      onChange({
        ...data,
        organization: [...(data.organization || []), { ...orgData, id: `org-${Date.now()}` }]
      });
    }
    setOrgModalOpen(false);
    setEditingOrgId(null);
  };

  const handleEditOrganization = (id: string) => {
    setEditingOrgId(id);
    setOrgModalOpen(true);
  };

  const handleDeleteOrganization = (index: number) => {
    const newArray = [...(data.organization || [])];
    newArray.splice(index, 1);
    onChange({ ...data, organization: newArray });
  };

  const handleSaveProject = (projData: any) => {
    if (editingProjId) {
      onChange({
        ...data,
        projects: (data.projects || []).map(p => p.id === editingProjId ? { ...projData, id: editingProjId } : p)
      });
    } else {
      onChange({
        ...data,
        projects: [...(data.projects || []), { ...projData, id: `proj-${Date.now()}` }]
      });
    }
    setProjModalOpen(false);
    setEditingProjId(null);
  };

  const handleEditProject = (id: string) => {
    setEditingProjId(id);
    setProjModalOpen(true);
  };

  const handleDeleteProject = (index: number) => {
    const newArray = [...(data.projects || [])];
    newArray.splice(index, 1);
    onChange({ ...data, projects: newArray });
  };
  const handleSaveCertification = (certData: any) => {
    let updatedCerts = [...(data.certifications || [])];
    if (editingCertId) {
      updatedCerts = updatedCerts.map(c => c.id === editingCertId ? certData : c);
    } else {
      updatedCerts.push(certData);
    }
    onChange({ ...data, certifications: updatedCerts });
  };

  const handleEditCertification = (id: string) => {
    setEditingCertId(id);
    setCertModalOpen(true);
  };

  const handleDeleteCertification = (index: number) => {
    if (window.confirm("Yakin ingin menghapus sertifikasi ini?")) {
      const updatedCerts = [...(data.certifications || [])];
      updatedCerts.splice(index, 1);
      onChange({ ...data, certifications: updatedCerts });
    }
  };

  const handleSaveAward = (awardData: any) => {
    let updatedAwards = [...(data.awards || [])];
    if (editingAwardId) {
      updatedAwards = updatedAwards.map(a => a.id === editingAwardId ? awardData : a);
    } else {
      updatedAwards.push(awardData);
    }
    onChange({ ...data, awards: updatedAwards });
  };

  const handleEditAward = (id: string) => {
    setEditingAwardId(id);
    setAwardModalOpen(true);
  };

  const handleDeleteAward = (index: number) => {
    if (window.confirm("Yakin ingin menghapus penghargaan ini?")) {
      const updatedAwards = [...(data.awards || [])];
      updatedAwards.splice(index, 1);
      onChange({ ...data, awards: updatedAwards });
    }
  };

  const handleSaveService = (serviceData: any) => {
    let updatedServices = [...(data.services || [])];
    if (editingServiceId) {
      updatedServices = updatedServices.map(s => s.id === editingServiceId ? serviceData : s);
    } else {
      updatedServices.push(serviceData);
    }
    onChange({ ...data, services: updatedServices });
  };

  const handleEditService = (id: string) => {
    setEditingServiceId(id);
    setServiceModalOpen(true);
  };

  const handleDeleteService = (index: number) => {
    if (window.confirm("Yakin ingin menghapus layanan ini?")) {
      const updatedServices = [...(data.services || [])];
      updatedServices.splice(index, 1);
      onChange({ ...data, services: updatedServices });
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white md:border-r">
      <div className="hidden md:block p-4 border-b flex-shrink-0 bg-white">
        <h2 className="text-lg font-bold text-slate-800">Data Portofolio</h2>
        <p className="text-sm text-slate-500">Isi data diri Anda di sini.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3 custom-scrollbar">
        <div className="md:hidden pb-2">
          <h2 className="text-lg font-bold text-slate-800">Data Portofolio</h2>
          <p className="text-sm text-slate-500">Isi data diri Anda di sini.</p>
        </div>
        
        {/* PERSONAL INFO */}
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="personal"
          title="Informasi Pribadi"
          icon={User}
          hasError={!data.personal.name || !data.personal.headline || !data.personal.bio || !data.personal.photoUrl || !data.personal.email || !data.personal.phone}
        >
          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Foto Profil <span className="text-red-500">*</span></Label>
            <div className="border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 flex-shrink-0">
                {data.personal.photoUrl ? (
                  <img src={data.personal.photoUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="absolute -bottom-1 -right-1 bg-white border border-slate-200 rounded-full p-1 shadow-sm">
                    <ImageIcon className="w-3 h-3 text-emerald-600" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full items-center sm:items-start">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <ImageUpload 
                    onUploadSuccess={(url) => handleChange('personal', 'photoUrl', url)}
                    customTrigger={
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 font-medium">
                        <UploadCloud size={14} /> Pilih Foto
                      </Button>
                    }
                  />
                  <Button size="sm" variant="outline" onClick={() => handleChange('personal', 'photoUrl', '/placeholder-person-4x4.png')} className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 gap-1.5 font-medium">
                    <Trash2 size={14} /> Hapus
                  </Button>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight text-center sm:text-left">Format JPG atau PNG. Maksimum 5MB. Tarik & lepas atau klik untuk unggah.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Nama lengkap <span className="text-red-500">*</span></Label>
            <Input value={data.personal.name} onChange={(e) => handleChange('personal', 'name', e.target.value)} className={`h-11 ${!data.personal.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`} placeholder="worldfarm" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Professional Title <span className="text-red-500">*</span></Label>
            <Input value={data.personal.headline} onChange={(e) => handleChange('personal', 'headline', e.target.value)} placeholder="Senior Developer" className={`h-11 ${!data.personal.headline ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Email <span className="text-red-500">*</span></Label>
              <Input value={data.personal.email} onChange={(e) => handleChange('personal', 'email', e.target.value)} type="email" placeholder="nama@contoh.com" className={`h-11 ${!data.personal.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">WhatsApp <span className="text-slate-400 font-normal text-xs">(Optional)</span></Label>
              <Input value={data.personal.phone} onChange={(e) => handleChange('personal', 'phone', e.target.value)} placeholder="+1 234 567 8900" className="h-11" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Lokasi <span className="text-red-500">*</span></Label>
            <Input value={data.personal.location} onChange={(e) => handleChange('personal', 'location', e.target.value)} placeholder="Jakarta, Indonesia" className={`h-11 ${!data.personal.location ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Tujuan Tombol "Hire Me" <span className="text-red-500">*</span></Label>
            <select
              className="w-full h-11 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm bg-white"
              value={data.personal.hireMeLink || 'email'}
              onChange={(e) => handleChange('personal', 'hireMeLink', e.target.value)}
            >
              <option value="email">Kirim Email</option>
              <option value="whatsapp">Chat WhatsApp</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Ringkasan / Bio <span className="text-red-500">*</span></Label>
              <div className={!data.personal.bio ? 'border border-red-500 rounded-md' : ''}>
                <RichTextEditor 
                  value={data.personal.bio} 
                  onChange={(val) => handleChange('personal', 'bio', val)} 
                  placeholder="Tell us about yourself and your professional journey..."
                />
              </div>
            </div>
        </AccordionSection>

        {/* EDUCATION */}
        {addedSections.includes('education') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="education"
          title="Riwayat Pendidikan"
          icon={GraduationCap}
          badgeCount={data.education?.length ?? 0}
        >
          {(data.education || []).map((edu, index) => (
            <div key={edu.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditEducation(edu.id)}>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDeleteEducation(index); }} 
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 rounded transition-colors p-1.5"
                title="Hapus"
              >
                <Trash2 size={16} />
              </button>
              <h4 className="font-bold text-slate-800 pr-10 text-base">{edu.school}</h4>
              <p className="text-sm font-medium text-emerald-600">{edu.degree} {edu.level ? `(${edu.level})` : ''}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{edu.startMonth} {edu.startYear} - {edu.current ? 'Sekarang' : `${edu.endMonth} ${edu.endYear}`}</span>
                {edu.location && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{edu.location}</span>
                  </>
                )}
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium" onClick={() => { setEditingEduId(null); setEduModalOpen(true); }}>
            <Plus size={16} /> Tambah Pendidikan Baru
          </Button>

          <EducationModal 
            isOpen={eduModalOpen}
            onClose={() => setEduModalOpen(false)}
            onSave={handleSaveEducation}
            initialData={editingEduId ? data.education?.find(e => e.id === editingEduId) : null}
          />
        </AccordionSection>
        )}

        {/* EXPERIENCE */}
        {addedSections.includes('experience') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="experience"
          title="Riwayat Pekerjaan"
          icon={Briefcase}
          badgeCount={data.experience?.length ?? 0}
        >
          {(data.experience || []).map((exp, index) => (
            <div key={exp.id} className="group flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="font-semibold text-slate-800 text-sm truncate">{exp.role}</h4>
                <p className="text-xs text-slate-500 truncate">{exp.company}</p>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleEditExperience(exp.id)} 
                  className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
                <button 
                  onClick={() => handleDeleteExperience(index)} 
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium" onClick={() => { setEditingExpId(null); setExpModalOpen(true); }}>
              <Plus size={16} /> Tambah Pekerjaan Baru
            </Button>
          </div>

          <ExperienceModal 
            isOpen={expModalOpen}
            onClose={() => setExpModalOpen(false)}
            onSave={handleSaveExperience}
            initialData={editingExpId ? data.experience?.find(e => e.id === editingExpId) : null}
          />
        </AccordionSection>
        )}

        {/* SOCIAL LINKS */}
        {addedSections.includes('social') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="social"
          title="Media Sosial"
          icon={Share2}
          badgeCount={data.social?.length ?? 0}
        >
          {(data.social || []).map((soc, index) => (
            <div key={soc.id} className="group flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="font-semibold text-slate-800 text-sm truncate">{soc.platform}</h4>
                <p className="text-xs text-slate-500 truncate">{soc.username}</p>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleEditSocial(soc.id)} 
                  className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
                <button 
                  onClick={() => handleDeleteSocial(index)} 
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium" onClick={() => { setEditingSocId(null); setSocModalOpen(true); }}>
              <Plus size={16} /> Tambah Media Sosial Baru
            </Button>
          </div>

          <SocialModal 
            isOpen={socModalOpen}
            onClose={() => setSocModalOpen(false)}
            onSave={handleSaveSocial}
            initialData={editingSocId ? data.social?.find(s => s.id === editingSocId) : null}
          />
        </AccordionSection>
        )}

        {/* SKILLS */}
        {addedSections.includes('skills') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="skills"
          title="Skills"
          icon={Wrench}
          badgeCount={data.skills ? data.skills.split(',').filter(Boolean).length : 0}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {data.skills ? (
                data.skills.split(',').map(s => s.trim()).filter(Boolean).map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200 font-medium">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic w-full text-center py-4">Belum ada skill yang ditambahkan.</p>
              )}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium"
              onClick={() => setSkillModalOpen(true)}
            >
              <Plus size={16} className="mr-2" /> Atur Skill
            </Button>
          </div>

          <SkillModal
            isOpen={skillModalOpen}
            onClose={() => setSkillModalOpen(false)}
            initialSkillsStr={data.skills || ""}
            onSave={(newSkills) => handleChange('skills', '', newSkills)}
          />
        </AccordionSection>
        )}

        {/* ORGANIZATION */}
        {addedSections.includes('organization') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="organization"
          title="Riwayat Organisasi"
          icon={Users}
          badgeCount={data.organization?.length ?? 0}
        >
          {(data.organization || []).map((org, index) => (
            <div key={org.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditOrganization(org.id)}>
              <div className="flex justify-between items-start pr-8">
                <div>
                  <h4 className="font-bold text-slate-800">{org.name}</h4>
                  <p className="text-sm font-medium text-emerald-600">{org.role}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2 text-sm text-slate-500">
                {org.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{org.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-slate-400" />
                  <span>{org.startMonth} {org.startYear} - {org.current ? 'Saat ini' : `${org.endMonth} ${org.endYear}`}</span>
                </div>
              </div>

              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteOrganization(index); }} 
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 bg-white shadow-sm"
                  title="Hapus Organisasi"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium" onClick={() => { setEditingOrgId(null); setOrgModalOpen(true); }}>
              <Plus size={16} /> Tambah Organisasi
            </Button>
          </div>

          <OrganizationModal 
            isOpen={orgModalOpen}
            onClose={() => setOrgModalOpen(false)}
            onSave={handleSaveOrganization}
            initialData={editingOrgId ? data.organization?.find(o => o.id === editingOrgId) : null}
          />
        </AccordionSection>
        )}

        {/* PROJECTS */}
        {addedSections.includes('projects') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="projects"
          title="Projects / Portofolio"
          icon={FolderGit2}
          badgeCount={data.projects?.length ?? 0}
        >
          {(data.projects || []).map((proj, index) => (
            <div key={proj.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditProject(proj.id)}>
              <div className="flex justify-between items-start pr-8">
                <div>
                  <h4 className="font-bold text-slate-800">{proj.title}</h4>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1 mt-1" onClick={(e) => e.stopPropagation()}>
                      <LinkIcon size={12} /> {proj.link}
                    </a>
                  )}
                </div>
              </div>

              {proj.imageUrl && (
                <div className="w-full h-32 mt-2 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 relative">
                  <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                </div>
              )}
              {proj.videoUrl && (
                <div className="w-full mt-2 text-sm text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center gap-2">
                  <UploadCloud size={14} /> Video URL attached
                </div>
              )}

              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteProject(index); }} 
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 bg-white shadow-sm"
                  title="Hapus Projek"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium" onClick={() => { setEditingProjId(null); setProjModalOpen(true); }}>
              <Plus size={16} /> Tambah Projek
            </Button>
          </div>

          <ProjectModal 
            isOpen={projModalOpen}
            onClose={() => setProjModalOpen(false)}
            onSave={handleSaveProject}
            initialData={editingProjId ? data.projects?.find(p => p.id === editingProjId) : null}
          />
        </AccordionSection>
        )}

        {/* CERTIFICATIONS */}
        {((data.certifications?.length ?? 0) > 0 || addedSections.includes('certifications')) && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="certifications"
            title="Sertifikasi"
            icon={Award}
            badgeCount={data.certifications?.length ?? 0}
          >
            {(data.certifications || []).map((cert, index) => (
              <div key={cert.id} className="group flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{cert.title}</h4>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEditCertification(cert.id)} 
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteCertification(index)} 
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium"
                onClick={() => { setEditingCertId(null); setCertModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Sertifikasi
              </Button>
            </div>
            
            <CertificationModal 
              isOpen={certModalOpen}
              onClose={() => setCertModalOpen(false)}
              onSave={handleSaveCertification}
              initialData={editingCertId ? data.certifications?.find(c => c.id === editingCertId) : null}
            />
          </AccordionSection>
        )}

        {/* AWARDS */}
        {((data.awards?.length ?? 0) > 0 || addedSections.includes('awards')) && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="awards"
            title="Penghargaan"
            icon={Trophy}
            badgeCount={data.awards?.length ?? 0}
          >
            {(data.awards || []).map((award, index) => (
              <div key={award.id} className="group flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{award.title}</h4>
                  <p className="text-xs text-slate-500 truncate">{award.year} {award.issuer ? `- ${award.issuer}` : ''}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEditAward(award.id)} 
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteAward(index)} 
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium"
                onClick={() => { setEditingAwardId(null); setAwardModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Penghargaan
              </Button>
            </div>
            
            <AwardModal 
              isOpen={awardModalOpen}
              onClose={() => setAwardModalOpen(false)}
              onSave={handleSaveAward}
              initialData={editingAwardId ? data.awards?.find(a => a.id === editingAwardId) : null}
            />
          </AccordionSection>
        )}

        {/* SERVICES */}
        {((data.services?.length ?? 0) > 0 || addedSections.includes('services')) && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="services"
            title="Layanan"
            icon={Building2}
            badgeCount={data.services?.length || 0}
          >
            {data.services?.map((service, index) => (
              <div key={service.id} className="group flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{service.title}</h4>
                  {service.link && (
                    <p className="text-xs text-blue-600 truncate">{service.link}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEditService(service.id)} 
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteService(index)} 
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium"
                onClick={() => { setEditingServiceId(null); setServiceModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Layanan
              </Button>
            </div>
            
            <ServiceModal 
              isOpen={serviceModalOpen}
              onClose={() => setServiceModalOpen(false)}
              onSave={handleSaveService}
              initialData={editingServiceId ? data.services?.find(s => s.id === editingServiceId) : null}
            />
          </AccordionSection>
        )}

        {/* BOTTOM ADD SECTION BUTTON */}
        <button 
          className="mt-4 w-full border-2 border-dashed border-slate-200 text-slate-500 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-600 transition-all font-medium"
          onClick={() => setAddSectionModalOpen(true)}
        >
          <Plus size={18} /> Tambah Bagian
        </button>

        <AddSectionModal 
          isOpen={addSectionModalOpen}
          onClose={() => setAddSectionModalOpen(false)}
          activeSections={addedSections}
          onAddSection={(sec) => {
            const newAdded = [...addedSections, sec];
            setAddedSections(newAdded);
            setOpenSection(sec);
            if (!(data as any)[sec] && (data as any)[sec] !== "") {
              if (sec === 'skills') {
                onChange({ ...data, skills: "", activeSections: newAdded });
              } else {
                onChange({ ...data, [sec]: [], activeSections: newAdded });
              }
            } else {
              onChange({ ...data, activeSections: newAdded });
            }
          }}
          onRemoveSection={(sec) => {
            const newAdded = addedSections.filter(s => s !== sec);
            setAddedSections(newAdded);
            if (sec === 'skills') {
              onChange({ ...data, skills: undefined, activeSections: newAdded });
            } else if (sec === 'personal') {
              // Cannot remove personal section
            } else {
              onChange({ ...data, [sec]: undefined, activeSections: newAdded });
            }
          }}
        />

      </div>
    </div>
  );
}
