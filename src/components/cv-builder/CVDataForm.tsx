"use client";
import React, { useEffect } from "react";
import { useUI } from "@/components/ui/UIProvider";
import { useSearchParams } from "next/navigation";
import { CVPortfolioData } from "@/lib/cvData";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown, User, GraduationCap, Briefcase, Share2, Wrench, Users, FolderGit2, UploadCloud, Crop, ImageIcon, Bold, Italic, List, Link as LinkIcon, AlignLeft, ChevronLeft, ChevronRight, Sparkles, MapPin, Award, Trophy, Building2, Pencil, Calendar, BookOpen, Globe, Activity, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { EducationModal } from "../builder/panels/EducationModal";
import { ExperienceModal } from "../builder/panels/ExperienceModal";
import { InternshipModal } from "./InternshipModal";
import { SocialModal } from "../builder/panels/SocialModal";
import { SkillModal } from "../builder/panels/SkillModal";
import { OrganizationModal } from "../builder/panels/OrganizationModal";
import { ProjectModal } from "../builder/panels/ProjectModal";
import { CVAddSectionModal } from "./CVAddSectionModal";
import { CertificationModal } from "../builder/panels/CertificationModal";
import { PrestasiModal } from "./PrestasiModal";
import { ServiceModal } from "../builder/panels/ServiceModal";
import { KursusModal, KursusFormData } from "./KursusModal";
import { BahasaModal, BahasaFormData } from "./BahasaModal";
import { EkskulModal, EkskulFormData } from "./EkskulModal";
import { HobiModal, HobiFormData } from "./HobiModal";

interface Props {
  data: CVPortfolioData;
  onChange: (newData: CVPortfolioData) => void;
  isCVMode?: boolean;
  activeTemplateId?: string;
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

export function CVDataForm({ data, onChange, isCVMode = false, activeTemplateId }: Props) {
  const currentTemplateId = activeTemplateId || data?.config?.templateId;
  const { showConfirm } = useUI();
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = React.useState<string>('');

  useEffect(() => {
    const sectionParam = searchParams.get('section');
    if (sectionParam) {
      if (['photo', 'name_headline', 'bio', 'contact'].includes(sectionParam)) {
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
  
  const [showIntModal, setShowIntModal] = React.useState(false);
  const [editingIntId, setEditingIntId] = React.useState<string | null>(null);

  const [socModalOpen, setSocModalOpen] = React.useState(false);
  const [editingSocId, setEditingSocId] = React.useState<string | null>(null);

  const [skillModalOpen, setSkillModalOpen] = React.useState(false);

  const [orgModalOpen, setOrgModalOpen] = React.useState(false);
  const [editingOrgId, setEditingOrgId] = React.useState<string | null>(null);

  const [projModalOpen, setProjModalOpen] = React.useState(false);
  const [editingProjId, setEditingProjId] = React.useState<string | null>(null);

  const [addSectionModalOpen, setAddSectionModalOpen] = React.useState(false);
  const [addedSections, setAddedSections] = React.useState<string[]>(
    data.activeSections || ['education', 'experience', 'internship', 'organization', 'projects', 'social', 'skills']
  );

  React.useEffect(() => {
    if (data.activeSections) {
      setAddedSections(data.activeSections);
    }
  }, [data.activeSections]);

  const [certModalOpen, setCertModalOpen] = React.useState(false);
  const [editingCertId, setEditingCertId] = React.useState<string | null>(null);

  const [awardModalOpen, setAwardModalOpen] = React.useState(false);
  const [editingAwardId, setEditingAwardId] = React.useState<string | null>(null);

  const [serviceModalOpen, setServiceModalOpen] = React.useState(false);
  const [editingServiceId, setEditingServiceId] = React.useState<string | null>(null);

  const [kursusModalOpen, setKursusModalOpen] = React.useState(false);
  const [editingKursusId, setEditingKursusId] = React.useState<string | null>(null);

  const [bahasaModalOpen, setBahasaModalOpen] = React.useState(false);
  const [editingBahasaId, setEditingBahasaId] = React.useState<string | null>(null);

  const [ekskulModalOpen, setEkskulModalOpen] = React.useState(false);
  const [editingEkskulId, setEditingEkskulId] = React.useState<string | null>(null);

  const [hobiModalOpen, setHobiModalOpen] = React.useState(false);
  const [editingHobiId, setEditingHobiId] = React.useState<string | null>(null);

  const handleChange = (section: keyof CVPortfolioData, field: string, value: any) => {
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
      if (user?.email && !data?.personal?.email) {
        handleChange('personal', 'email', user.email);
      }
    });
    return () => unsubscribe();
  }, [data?.personal?.email]);

  const handleArrayChange = (section: 'experience' | 'internship' | 'projects' | 'education' | 'organization', index: number, field: string, value: any) => {
    const newArray = [...(data[section] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ ...data, [section]: newArray });
  };

  const addArrayItem = (section: 'experience' | 'internship' | 'projects' | 'education' | 'organization') => {
    const newArray = [...(data[section] || [])];
    if (section === 'experience') {
      newArray.push({ id: `exp-${Date.now()}`, role: "New Role", company: "Company Name", location: "", startMonth: "Januari", startYear: "2023", endMonth: "", endYear: "", current: true, description: "" });
    } else if (section === 'internship') {
      setShowIntModal(true);
      setEditingIntId(null);
      return;
    } else if (section === 'projects') {
      newArray.push({ id: `proj-${Date.now()}`, title: "New Project", description: "", imageUrl: "", techStack: "", link: "" });
    } else if (section === 'education') {
      newArray.push({ id: `edu-${Date.now()}`, level: "S1", school: "Universitas", degree: "Sarjana", location: "", startMonth: "Agustus", startYear: "2018", endMonth: "Agustus", endYear: "2022", current: false, description: "" });
    } else if (section === 'organization') {
      newArray.push({ id: `org-${Date.now()}`, name: "Nama Organisasi", role: "Anggota", location: "", startMonth: "Januari", startYear: "2020", endMonth: "", endYear: "", current: true, description: "" });
    }
    onChange({ ...data, [section]: newArray as any });
  };

  const removeArrayItem = (section: 'experience' | 'internship' | 'projects' | 'education' | 'organization', index: number) => {
    const newArray = [...(data[section] || [])];
    newArray.splice(index, 1);
    onChange({ ...data, [section]: newArray as any });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handleSaveEducation = (eduData: any) => {
    if (editingEduId) {
      onChange({
        ...data,
        education: (data.education || []).map(e => e.id === editingEduId ? { ...eduData, id: editingEduId } : e)
      });
    } else {
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

  const handleSaveInternship = (intData: any) => {
    if (editingIntId) {
      onChange({ 
        ...data, 
        internship: (data.internship || []).map(i => i.id === editingIntId ? { ...intData, id: editingIntId } : i)
      });
    } else {
      onChange({ 
        ...data, 
        internship: [...(data.internship || []), { ...intData, id: `int-${Date.now()}` }]
      });
    }
    setShowIntModal(false);
    setEditingIntId(null);
  };

  const handleDeleteInternship = (index: number) => {
    removeArrayItem('internship', index);
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
    showConfirm({
      title: "Hapus Sertifikasi",
      message: "Yakin ingin menghapus sertifikasi ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedCerts = [...(data.certifications || [])];
        updatedCerts.splice(index, 1);
        onChange({ ...data, certifications: updatedCerts });
      }
    });
  };

  const handleSaveAward = (awardData: any) => {
    let updatedAwards = [...(data.awards || [])];
    if (editingAwardId) {
      updatedAwards = updatedAwards.map(a => a.id === editingAwardId ? { ...awardData, id: editingAwardId } : a);
    } else {
      updatedAwards.push({ ...awardData, id: `award-${Date.now()}` });
    }
    onChange({ ...data, awards: updatedAwards });
  };

  const handleEditKursus = (id: string) => {
    setEditingKursusId(id);
    setKursusModalOpen(true);
  };

  const handleDeleteKursus = (index: number) => {
    showConfirm({
      title: "Hapus Kursus",
      message: "Apakah Anda yakin ingin menghapus kursus ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedCourses = [...(data.courses || [])];
        updatedCourses.splice(index, 1);
        onChange({ ...data, courses: updatedCourses });
      }
    });
  };

  const handleSaveKursus = (kursusData: KursusFormData) => {
    let updatedCourses = [...(data.courses || [])];
    if (editingKursusId) {
      updatedCourses = updatedCourses.map(c => c.id === editingKursusId ? { ...kursusData, id: editingKursusId } as any : c);
    } else {
      updatedCourses.push({ ...kursusData, id: `course-${Date.now()}` } as any);
    }
    onChange({ ...data, courses: updatedCourses });
  };

  const handleEditBahasa = (id: string) => {
    setEditingBahasaId(id);
    setBahasaModalOpen(true);
  };

  const handleDeleteBahasa = (index: number) => {
    showConfirm({
      title: "Hapus Bahasa",
      message: "Apakah Anda yakin ingin menghapus bahasa ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedLanguages = [...(data.languages || [])];
        updatedLanguages.splice(index, 1);
        onChange({ ...data, languages: updatedLanguages });
      }
    });
  };

  const handleSaveBahasa = (bahasaData: BahasaFormData) => {
    let updatedLanguages = [...(data.languages || [])];
    if (editingBahasaId) {
      updatedLanguages = updatedLanguages.map(l => l.id === editingBahasaId ? { ...bahasaData, id: editingBahasaId } as any : l);
    } else {
      updatedLanguages.push({ ...bahasaData, id: `lang-${Date.now()}` } as any);
    }
    onChange({ ...data, languages: updatedLanguages });
  };

  const handleEditEkskul = (id: string) => {
    setEditingEkskulId(id);
    setEkskulModalOpen(true);
  };

  const handleDeleteEkskul = (index: number) => {
    showConfirm({
      title: "Hapus Ekskul",
      message: "Apakah Anda yakin ingin menghapus ekskul ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedEkskuls = [...(data.extracurriculars || [])];
        updatedEkskuls.splice(index, 1);
        onChange({ ...data, extracurriculars: updatedEkskuls });
      }
    });
  };

  const handleSaveEkskul = (ekskulData: EkskulFormData) => {
    let updatedEkskuls = [...(data.extracurriculars || [])];
    if (editingEkskulId) {
      updatedEkskuls = updatedEkskuls.map(e => e.id === editingEkskulId ? { ...ekskulData, id: editingEkskulId } as any : e);
    } else {
      updatedEkskuls.push({ ...ekskulData, id: `ekskul-${Date.now()}` } as any);
    }
    onChange({ ...data, extracurriculars: updatedEkskuls });
  };

  const handleEditHobi = (id: string) => {
    setEditingHobiId(id);
    setHobiModalOpen(true);
  };

  const handleDeleteHobi = (index: number) => {
    showConfirm({
      title: "Hapus Hobi",
      message: "Apakah Anda yakin ingin menghapus hobi ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedHobbies = [...(data.hobbies || [])];
        updatedHobbies.splice(index, 1);
        onChange({ ...data, hobbies: updatedHobbies });
      }
    });
  };

  const handleSaveHobi = (hobiData: HobiFormData) => {
    let updatedHobbies = [...(data.hobbies || [])];
    if (editingHobiId) {
      updatedHobbies = updatedHobbies.map(h => h.id === editingHobiId ? { ...hobiData, id: editingHobiId } as any : h);
    } else {
      updatedHobbies.push({ ...hobiData, id: `hobi-${Date.now()}` } as any);
    }
    onChange({ ...data, hobbies: updatedHobbies });
  };

  const handleEditAward = (id: string) => {
    setEditingAwardId(id);
    setAwardModalOpen(true);
  };

  const handleDeleteAward = (index: number) => {
    showConfirm({
      title: "Hapus Penghargaan",
      message: "Yakin ingin menghapus penghargaan ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedAwards = [...(data.awards || [])];
        updatedAwards.splice(index, 1);
        onChange({ ...data, awards: updatedAwards });
      }
    });
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
    showConfirm({
      title: "Hapus Layanan",
      message: "Yakin ingin menghapus layanan ini?",
      variant: "danger",
      onConfirm: () => {
        const updatedServices = [...(data.services || [])];
        updatedServices.splice(index, 1);
        onChange({ ...data, services: updatedServices });
      }
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white md:border-r">
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3 custom-scrollbar">
        {/* PERSONAL INFO */}
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="personal"
          title="Informasi Pribadi"
          icon={User}
          hasError={!data.personal?.name || !data.personal?.headline || !data.personal?.bio || (!(currentTemplateId?.startsWith('ats-')) && !data.personal?.photoUrl) || !data.personal?.email || !data.personal?.phone || !data.personal?.address || (currentTemplateId === 'creative-blue' && (!data.personal?.gender || !data.personal?.nationality))}
        >
          {(!currentTemplateId || !currentTemplateId.startsWith('ats-')) && (
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Foto Profil <span className="text-red-500">*</span></Label>
              <div className="border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 flex-shrink-0">
                  {data.personal?.photoUrl ? (
                    <img src={data.personal?.photoUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
                    <Button size="sm" variant="outline" onClick={() => handleChange('personal', 'photoUrl', '')} className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 gap-1.5 font-medium">
                      <Trash2 size={14} /> Hapus
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight text-center sm:text-left">Format JPG atau PNG. Maksimum 5MB. Tarik & lepas atau klik untuk unggah.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Fullname <span className="text-red-500">*</span></Label>
              <Input 
                value={data.personal?.name || [data.personal?.firstName, data.personal?.lastName].filter(Boolean).join(' ') || ''} 
                onChange={(e) => {
                  const val = e.target.value;
                  const parts = val.trim().split(' ');
                  const fName = parts[0] || '';
                  const lName = parts.slice(1).join(' ');
                  
                  onChange({
                    ...data,
                    personal: {
                      ...(data.personal || {}),
                      name: val,
                      firstName: fName,
                      lastName: lName
                    }
                  });
                }} 
                className={`h-11 ${!data.personal?.name && !data.personal?.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                placeholder="John Doe" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Professional Title <span className="text-red-500">*</span></Label>
              <Input value={data.personal?.headline} onChange={(e) => handleChange('personal', 'headline', e.target.value)} placeholder="Senior Developer" className={`h-11 ${!data.personal?.headline ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Email <span className="text-red-500">*</span></Label>
              <Input value={data.personal?.email} onChange={(e) => handleChange('personal', 'email', e.target.value)} type="email" placeholder="nama@contoh.com" className={`h-11 ${!data.personal?.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Nomor Telepon / WhatsApp <span className="text-red-500">*</span></Label>
              <Input value={data.personal?.phone} onChange={(e) => handleChange('personal', 'phone', e.target.value)} placeholder="+62 812 3456 7890" className={`h-11 ${!data.personal?.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Alamat Lengkap <span className="text-red-500">*</span></Label>
            <Input value={data.personal?.address || ''} onChange={(e) => handleChange('personal', 'address', e.target.value)} placeholder="Jl. Sudirman No. 1, Jakarta Selatan" className={`h-11 ${!data.personal?.address ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
          </div>

          {currentTemplateId === 'creative-blue' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Jenis Kelamin <span className="text-red-500">*</span></Label>
                  <select
                    className={`w-full h-11 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-sm bg-white ${!data.personal?.gender ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-300'}`}
                    value={data.personal?.gender || ''}
                    onChange={(e) => handleChange('personal', 'gender', e.target.value)}
                  >
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Kebangsaan <span className="text-red-500">*</span></Label>
                  <Input value={data.personal?.nationality || ''} onChange={(e) => handleChange('personal', 'nationality', e.target.value)} placeholder="Indonesia" className={`h-11 ${!data.personal?.nationality ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-slate-700">Status <span className="text-slate-400 font-normal text-xs">(Opsional)</span></Label>
                  <select
                    className="w-full h-11 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-sm bg-white"
                    value={data.personal?.maritalStatus || ''}
                    onChange={(e) => handleChange('personal', 'maritalStatus', e.target.value)}
                  >
                    <option value="">Pilih</option>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Menikah">Menikah</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Link URL Portofolio <span className="text-slate-400 font-normal text-xs">(Opsional)</span></Label>
            <Input value={data.personal?.portfolioUrl || ''} onChange={(e) => handleChange('personal', 'portfolioUrl', e.target.value)} placeholder="portotree.com/p/username" className="h-11" />
          </div>

          {!isCVMode && (
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Tujuan Tombol "Hire Me" <span className="text-red-500">*</span></Label>
              <select
                className="w-full h-11 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm bg-white"
                value={data.personal?.hireMeLink || 'email'}
                onChange={(e) => handleChange('personal', 'hireMeLink', e.target.value)}
              >
                <option value="email">Kirim Email</option>
                <option value="whatsapp">Chat WhatsApp</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-sm text-slate-700">Ringkasan / Bio <span className="text-red-500">*</span></Label>
              <div className={!data.personal?.bio ? 'border border-red-500 rounded-md' : ''}>
                <RichTextEditor 
                  value={data.personal?.bio} 
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

        {/* INTERNSHIP */}
        {addedSections.includes('internship') && (
        <AccordionSection
          openSection={openSection}
          toggleSection={toggleSection}
          id="internship"
          title="Riwayat Magang"
          icon={Briefcase}
          badgeCount={data.internship?.length ?? 0}
        >
          {(data.internship || []).map((int, index) => (
            <div key={int.id} className="group flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="font-semibold text-slate-800 text-sm truncate">{int.role}</h4>
                <p className="text-xs text-slate-500 truncate">{int.company}</p>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => { setEditingIntId(int.id); setShowIntModal(true); }} 
                  className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteInternship(index)} 
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full flex gap-2 h-11 border-dashed border-2 text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 font-medium" onClick={() => addArrayItem('internship')}>
              <Plus size={16} /> Tambah Magang
            </Button>
          </div>

          <InternshipModal 
            isOpen={showIntModal}
            onClose={() => setShowIntModal(false)}
            onSave={handleSaveInternship}
            initialData={editingIntId ? data.internship?.find(i => i.id === editingIntId) : null}
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



        {/* AWARDS */}
        {((data.awards?.length ?? 0) > 0 || addedSections.includes('awards')) && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="awards"
            title="Prestasi"
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
                <Plus size={16} /> Tambah Prestasi
              </Button>
            </div>
            
            <PrestasiModal 
              isOpen={awardModalOpen}
              onClose={() => setAwardModalOpen(false)}
              onSave={handleSaveAward}
              initialData={editingAwardId ? data.awards?.find(a => a.id === editingAwardId) : null}
            />
          </AccordionSection>
        )}


        {/* COURSES */}
        {addedSections.includes('courses') && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="courses"
            title="Kursus & Pelatihan"
            icon={BookOpen}
            badgeCount={data.courses?.length ?? 0}
          >
            {(data.courses || []).map((course, index) => (
              <div key={course.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditKursus(course.id)}>
                <div className="flex justify-between items-start pr-8">
                  <div>
                    <h4 className="font-bold text-slate-800">{course.title}</h4>
                    <p className="text-sm font-medium text-emerald-600">{course.issuer}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-2 text-sm text-slate-500">
                  {course.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{course.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{course.startMonth} {course.startYear} - {course.current ? 'Saat ini' : `${course.endMonth} ${course.endYear}`}</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteKursus(index); }} 
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 bg-white shadow-sm"
                    title="Hapus Kursus"
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
                onClick={() => { setEditingKursusId(null); setKursusModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Kursus
              </Button>
            </div>
            
            <KursusModal 
              isOpen={kursusModalOpen}
              onClose={() => setKursusModalOpen(false)}
              onSave={handleSaveKursus}
              initialData={editingKursusId ? (data.courses?.find(c => c.id === editingKursusId) as any) : null}
            />
          </AccordionSection>
        )}

        {/* LANGUAGES */}
        {addedSections.includes('languages') && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="languages"
            title="Bahasa"
            icon={Globe}
            badgeCount={data.languages?.length ?? 0}
          >
            {(data.languages || []).map((lang, index) => (
              <div key={lang.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditBahasa(lang.id)}>
                <div className="flex justify-between items-start pr-8">
                  <div>
                    <h4 className="font-bold text-slate-800">{lang.name}</h4>
                    {lang.proficiency && (
                      <p className="text-sm font-medium text-emerald-600">{lang.proficiency}</p>
                    )}
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteBahasa(index); }} 
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 bg-white shadow-sm"
                    title="Hapus Bahasa"
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
                onClick={() => { setEditingBahasaId(null); setBahasaModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Bahasa
              </Button>
            </div>
            
            <BahasaModal 
              isOpen={bahasaModalOpen}
              onClose={() => setBahasaModalOpen(false)}
              onSave={handleSaveBahasa}
              initialData={editingBahasaId ? (data.languages?.find(l => l.id === editingBahasaId) as any) : null}
            />
          </AccordionSection>
        )}

        {/* EXTRACURRICULARS */}
        {addedSections.includes('extracurriculars') && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="extracurriculars"
            title="Ekstrakurikuler"
            icon={Activity}
            badgeCount={data.extracurriculars?.length ?? 0}
          >
            {(data.extracurriculars || []).map((ekskul, index) => (
              <div key={ekskul.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditEkskul(ekskul.id)}>
                <div className="flex justify-between items-start pr-8">
                  <div>
                    <h4 className="font-bold text-slate-800">{ekskul.title}</h4>
                    {ekskul.issuer && (
                      <p className="text-sm font-medium text-emerald-600">{ekskul.issuer}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-2 text-sm text-slate-500">
                  {ekskul.year && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" />
                      <span>{ekskul.year}</span>
                    </div>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteEkskul(index); }} 
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 bg-white shadow-sm"
                    title="Hapus Ekskul"
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
                onClick={() => { setEditingEkskulId(null); setEkskulModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Ekstrakurikuler
              </Button>
            </div>
            
            <EkskulModal 
              isOpen={ekskulModalOpen}
              onClose={() => setEkskulModalOpen(false)}
              onSave={handleSaveEkskul}
              initialData={editingEkskulId ? (data.extracurriculars?.find(e => e.id === editingEkskulId) as any) : null}
            />
          </AccordionSection>
        )}

        {/* HOBBIES */}
        {addedSections.includes('hobbies') && (
          <AccordionSection
            openSection={openSection}
            toggleSection={toggleSection}
            id="hobbies"
            title="Hobi & Minat"
            icon={Heart}
            badgeCount={data.hobbies?.length ?? 0}
          >
            {(data.hobbies || []).map((hobi, index) => (
              <div key={hobi.id} className="p-4 border border-slate-200 rounded-xl bg-white mb-3 shadow-sm hover:border-emerald-300 transition-colors flex flex-col gap-2 relative group cursor-pointer" onClick={() => handleEditHobi(hobi.id)}>
                <div className="flex justify-between items-start pr-8">
                  <div>
                    <h4 className="font-bold text-slate-800">{hobi.name}</h4>
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteHobi(index); }} 
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 bg-white shadow-sm"
                    title="Hapus Hobi"
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
                onClick={() => { setEditingHobiId(null); setHobiModalOpen(true); }}
              >
                <Plus size={16} /> Tambah Hobi
              </Button>
            </div>
            
            <HobiModal 
              isOpen={hobiModalOpen}
              onClose={() => setHobiModalOpen(false)}
              onSave={handleSaveHobi}
              initialData={editingHobiId ? (data.hobbies?.find(h => h.id === editingHobiId) as any) : null}
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

        <CVAddSectionModal 
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
