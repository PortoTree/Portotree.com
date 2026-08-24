import React from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { Star } from 'lucide-react';

export const CreativeBlue: React.FC<{ data: CVDataPayload, showPlaceholders?: boolean }> = ({ data, showPlaceholders = true }) => {
  const { portfolio } = data;
  const { 
    personal, 
    experience = [], 
    education = [], 
    awards = [], 
    extracurriculars = [],
    internship = [],
    projects = [],
    organization = [],
    courses = [],
    hobbies = []
  } = portfolio || {};

  const isDummy = !personal?.name;
  const renderDummy = showPlaceholders;

  // Helpers
  const dummyPersonal = {
    fullName: "Your name",
    role: "Staff Management",
    email: "melvin123@gmail.com",
    phone: "0812 3456 7890",
    location: "Jl. Padapadasuka No. 49 Cicaheum, Bandung",
    bio: "",
    birthDate: "1994-11-15",
    birthPlace: "Bandung",
    gender: "Laki-laki",
    website: "portotree.com/p/username"
  };

  const name = personal?.name || dummyPersonal.fullName;
  const email = personal?.email || dummyPersonal.email;
  const phone = personal?.phone || dummyPersonal.phone;
  const location = personal?.address || personal?.location || dummyPersonal.location;
  const website = personal?.portfolioUrl || dummyPersonal.website;
  const headline = personal?.headline || dummyPersonal.role;
  
  // Build details list for "DATA PRIBADI"
  const personalDetails = [];

  if (personal?.gender || renderDummy) personalDetails.push({ label: "Jenis Kelamin", value: personal?.gender || "Laki-laki", isDummy: !personal?.gender });
  if (personal?.nationality || renderDummy) personalDetails.push({ label: "Kebangsaan", value: personal?.nationality || "Indonesia", isDummy: !personal?.nationality });
  if (personal?.maritalStatus || renderDummy) personalDetails.push({ label: "Status", value: personal?.maritalStatus || "Menikah", isDummy: !personal?.maritalStatus });
  const actualLocation = personal?.address || personal?.location;
  if (actualLocation || renderDummy) personalDetails.push({ label: "Alamat", value: actualLocation || dummyPersonal.location, isDummy: !actualLocation });

  const allPersonalDummy = personalDetails.length > 0 && personalDetails.every(d => d.isDummy);

  const contactDetails = [];
  if (personal?.phone || renderDummy) contactDetails.push({ label: "Telepon", value: personal?.phone || dummyPersonal.phone, isDummy: !personal?.phone, key: 'phone' });
  if (personal?.email || renderDummy) contactDetails.push({ label: "Email", value: personal?.email || dummyPersonal.email, isDummy: !personal?.email, key: 'email' });
  if (personal?.portfolioUrl || renderDummy) contactDetails.push({ label: "Website", value: personal?.portfolioUrl || dummyPersonal.website, isDummy: !personal?.portfolioUrl, key: 'website' });
  
  const allContactDummy = contactDetails.length > 0 && contactDetails.every(d => d.isDummy);

  const hasSkills = !!portfolio.skills;
  const skillsList = hasSkills ? (portfolio.skills || '').split(',').map((s: any) => s.trim()).filter(Boolean) : ["Microsoft Word", "Microsoft Excel", "Teknologi Informasi", "Photoshop"];
  
  const hasLanguages = portfolio.languages && portfolio.languages.length > 0;
  const languagesList = hasLanguages
    ? portfolio.languages 
    : [
        { id: '1', name: 'Bhs Indonesia', proficiency: 'Native', isDummy: true },
        { id: '2', name: 'Bhs Inggris', proficiency: 'Intermediate', isDummy: true }
      ];

  const mapProficiencyToStars = (prof: string) => {
    const p = prof?.toLowerCase() || '';
    if (p.includes('native') || p.includes('bilingual') || p.includes('penutur asli')) return 5;
    if (p.includes('fluent') || p.includes('fasih')) return 4.5;
    if (p.includes('advanced') || p.includes('lanjut')) return 4;
    if (p.includes('intermediate') || p.includes('menengah')) return 3;
    if (p.includes('beginner') || p.includes('basic') || p.includes('pemula')) return 2;
    return 3.5;
  };

  const visibleExperiences = experience.length > 0 ? experience : [
    {
      id: '1',
      company: 'PT. Wahana Tata',
      role: 'Staff Marketing',
      startYear: '2015',
      endYear: '2016',
      description: 'Sebuah perusahaan financial, terutama bergerak di bidang pelayanan asuransi.',
      isDummy: true
    },
    {
      id: '2',
      company: 'PT. Bank Rakyat Indonesia Tbk',
      role: 'Staff Accounting',
      startYear: '2016',
      endYear: '2018',
      description: 'Lembaga keuangan yang menawarkan berbagai produk dan jasa financial.',
      isDummy: true
    },
    {
      id: '3',
      company: 'PT. FABA Indonesia Konsultan',
      role: 'Staff Management',
      startYear: '2018',
      endYear: '2020',
      description: 'Sebagai perusahaan konsultan bisnis FABA membantu bankir dan investasi perusahaan dalam memperkuat modal dan bisnis.',
      isDummy: true
    }
  ] as any;

  const visibleEducation = education.length > 0 ? education : [
    {
      id: '1',
      school: 'Universitas Pasundan Bandung',
      degree: 'Sarjana Ekonomi',
      startYear: '2007',
      endYear: '2011',
      gpa: '3.55',
      isDummy: true
    },
    {
      id: '2',
      school: 'Universitas Padjajaran Bandung',
      degree: 'Magister Ilmu Managemen',
      startYear: '2012',
      endYear: '2014',
      gpa: '3.52',
      isDummy: true
    }
  ] as any;

  const visibleCerts = awards.length > 0 ? awards : [
    {
      id: '1',
      issuer: 'Universitas Padjajaran Bandung',
      title: 'Wakil Ketua Mahasiswa',
      year: '2012',
      isDummy: true
    },
    {
      id: '2',
      issuer: 'NERA Economic Consulting Inc.',
      title: 'Peserta magang terbaik ke 3',
      year: '2013',
      isDummy: true
    }
  ] as any;

  return (
    <div className="w-full h-full bg-white text-slate-800 font-sans relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* Top Blue Border */}
      <div className="absolute top-4 left-4 right-4 h-2 bg-[#558ed5] z-10 print:!bg-[#558ed5]" />
      
      {/* Bottom Blue Border */}
      <div className="absolute bottom-4 left-4 right-4 h-2 bg-[#558ed5] z-10 print:!bg-[#558ed5]" />
      
      <div className="flex w-full h-full pt-10 pb-10 pl-8 pr-8">
        
        {/* Left Column */}
        <div className="w-[38%] bg-[#f0f2f5] h-full flex flex-col pt-8 pb-8 z-0 border-r border-gray-200 print:!bg-[#f0f2f5]">
          
          {/* Header Name (Ribbon Left) */}
          {(personal?.name || renderDummy) && (
            <div className={`relative bg-[#558ed5] text-white py-2 px-6 ml-[-16px] mb-6 mr-6 flex items-center shadow-sm print:!bg-[#558ed5] ${!personal?.name ? 'print:hidden' : ''}`}>
              <h1 className="text-[14pt] font-bold tracking-wider uppercase leading-tight w-full text-center">
                {name}
              </h1>
              <div className="absolute top-full left-0 w-0 h-0 border-t-[10px] border-l-[16px] border-t-[#2b4f7a] border-l-transparent"></div>
            </div>
          )}
          
          {/* Photo */}
          {(personal?.photoUrl || renderDummy) && (
            <div className={`flex justify-center mb-6 px-6 ${!personal?.photoUrl ? 'print:hidden' : ''}`}>
              <div className="w-[140px] h-[170px] bg-slate-300 border-4 border-white shadow-sm overflow-hidden">
                {personal?.photoUrl ? (
                  <img src={personal.photoUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <img src="/placeholder-potret.png" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" />
                )}
              </div>
            </div>
          )}
          
          {/* DATA PRIBADI */}
          {personalDetails.length > 0 && (
            <div className={`mb-6 ${allPersonalDummy ? 'print:hidden' : ''}`}>
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 ml-[-16px] mb-4 mr-6 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">DATA PRIBADI</h2>
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-l-[16px] border-t-[#2b4f7a] border-l-transparent"></div>
              </div>
              
              <div className="px-6 flex flex-col gap-1.5 text-[8.5pt]">
                {personalDetails.map((detail: any, idx: any) => (
                  <div key={idx} className={`flex gap-2 leading-snug ${detail.isDummy ? 'print:hidden' : ''}`}>
                    <span className="w-[85px] shrink-0 font-bold text-[#333]">{detail.label}</span>
                    <span className="shrink-0 text-[#333]">:</span>
                    <span className={`flex-1 ${detail.isDummy ? 'text-gray-400 opacity-70 grayscale' : 'text-[#333]'}`}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* KONTAK */}
          {contactDetails.length > 0 && (
            <div className={`mb-6 ${allContactDummy ? 'print:hidden' : ''}`}>
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 ml-[-16px] mb-4 mr-6 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">KONTAK</h2>
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-l-[16px] border-t-[#2b4f7a] border-l-transparent"></div>
              </div>
              
              <div className="px-6 flex flex-col gap-1.5 text-[8.5pt]">
                {contactDetails.map((detail: any, idx: any) => (
                  <div key={idx} className={`flex gap-2 leading-snug ${detail.isDummy ? 'print:hidden' : ''}`}>
                    <span className="w-[60px] shrink-0 font-bold text-[#333]">{detail.label}</span>
                    <span className="shrink-0 text-[#333]">:</span>
                    <span className={`break-all ${detail.isDummy ? 'text-gray-400 opacity-70 grayscale' : 'text-[#333]'}`}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* KEMAMPUAN */}
          {(hasSkills || hasLanguages || renderDummy) && (
            <div className={`mb-6 ${(!hasSkills && !hasLanguages) ? 'print:hidden' : ''}`}>
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 ml-[-16px] mb-4 mr-6 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">KEMAMPUAN</h2>
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-l-[16px] border-t-[#2b4f7a] border-l-transparent"></div>
              </div>
              
              <div className="px-6 text-[8.5pt]">
                {(hasSkills || renderDummy) && (
                  <div className={`mb-4 ${!hasSkills ? 'print:hidden' : ''}`}>
                    <div className="font-bold text-[#333] mb-2">Komputerisasi</div>
                    <div className="flex flex-col gap-1.5">
                      {(skillsList || []).map((skill: any, idx: any) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className={`${!hasSkills ? 'text-gray-400 opacity-70 grayscale' : 'text-[#333]'}`}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {(hasLanguages || renderDummy) && (
                  <div className={`${!hasLanguages ? 'print:hidden' : ''}`}>
                    <div className="font-bold text-[#333] mb-2">Kecakapan</div>
                    <div className="flex flex-col gap-1.5">
                      {(languagesList || []).map((lang: any, idx) => (
                        <div key={idx} className={`flex justify-between items-center ${lang.isDummy ? 'print:hidden' : ''}`}>
                          <span className={`${lang.isDummy ? 'text-gray-400 opacity-70 grayscale' : 'text-[#333]'}`}>{lang.name}</span>
                          <StarRating rating={mapProficiencyToStars(lang.proficiency)} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* HOBI */}
          {hobbies.length > 0 && (
            <div className="mb-6">
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 ml-[-16px] mb-4 mr-6 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">HOBI</h2>
                <div className="absolute top-full left-0 w-0 h-0 border-t-[8px] border-l-[16px] border-t-[#2b4f7a] border-l-transparent"></div>
              </div>
              <div className="px-6 text-[8.5pt]">
                <div className="flex flex-col gap-1.5">
                  {hobbies.map((hobi: any, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <span className="text-[10pt] text-[#558ed5]">•</span>
                      <span className="text-[#333]">{hobi.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
        </div>
        
        {/* Right Column */}
        <div className="w-[62%] bg-white h-full pt-8 pb-8 flex flex-col z-0">
          
          {/* Top Title: Professional Title */}
          {(personal?.headline || renderDummy) && (
            <div className={`px-6 mb-8 mt-2 ${!personal?.headline ? 'print:hidden' : ''}`}>
              <h1 className={`text-[28pt] font-bold text-[#558ed5] text-right ${!personal?.headline ? 'opacity-70 grayscale' : ''}`} style={{ 
                textShadow: '0px 1px 1px rgba(0,0,0,0.2)',
                WebkitBoxReflect: 'below -10px linear-gradient(transparent, transparent 40%, rgba(255,255,255,0.4))'
              }}>
                {headline}
              </h1>
            </div>
          )}
          
          {/* PENGALAMAN KERJA */}
          {(experience.length > 0 || renderDummy) && (
            <div className={`mb-6 ${experience.length === 0 ? 'print:hidden' : ''}`}>
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 mr-[-16px] ml-6 mb-4 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">PENGALAMAN KERJA</h2>
                <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[16px] border-t-[#2b4f7a] border-r-transparent"></div>
              </div>
              
              <div className="px-8 flex flex-col gap-4">
                {visibleExperiences.map((exp: any) => (
                  <div key={exp.id} className={`text-[9pt] leading-relaxed ${exp.isDummy ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-[#333]'}`}>
                    <div className={`font-bold text-[10pt] ${exp.isDummy ? 'text-gray-400' : 'text-[#2b4f7a]'}`}>{exp.company}</div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-[12pt] mt-[-2px]">✓</span> Sebagai {exp.role}
                      </div>
                      <div className="font-bold">
                        {exp.startYear} - {exp.endYear || 'Sekarang'}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="pl-5 text-justify">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* PENDIDIKAN */}
          {(education.length > 0 || renderDummy) && (
            <div className={`mb-6 ${education.length === 0 ? 'print:hidden' : ''}`}>
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 mr-[-16px] ml-6 mb-4 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">PENDIDIKAN</h2>
                <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[16px] border-t-[#2b4f7a] border-r-transparent"></div>
              </div>
              
              <div className="px-8 flex flex-col gap-4">
                <div className="font-bold underline text-[9pt] mb-[-8px] text-[#333]">FORMAL</div>
                {visibleEducation.map((edu: any) => (
                  <div key={edu.id} className={`text-[9pt] leading-relaxed ${edu.isDummy ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-[#333]'}`}>
                    <div className={`font-bold text-[10pt] ${edu.isDummy ? 'text-gray-400' : 'text-[#2b4f7a]'}`}>{edu.school || edu.school}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12pt] mt-[-2px]">✓</span> Lulus sebagai {edu.degree}
                      </div>
                      <div className="font-bold">{edu.endYear || edu.startYear}</div>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12pt] mt-[-2px]">✓</span> IPK : {edu.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* MAGANG */}
          {internship.length > 0 && (
            <div className="mb-6">
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 mr-[-16px] ml-6 mb-4 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">MAGANG</h2>
                <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[16px] border-t-[#2b4f7a] border-r-transparent"></div>
              </div>
              
              <div className="px-8 flex flex-col gap-4">
                {internship.map((exp: any) => (
                  <div key={exp.id} className="text-[9pt] leading-relaxed text-[#333]">
                    <div className="font-bold text-[10pt] text-[#2b4f7a]">{exp.company}</div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-[12pt] mt-[-2px]">✓</span> Sebagai {exp.role}
                      </div>
                      <div className="font-bold">
                        {exp.startYear} - {exp.endYear || 'Sekarang'}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="pl-5 text-justify">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROYEK */}
          

          {/* ORGANISASI */}
          {organization.length > 0 && (
            <div className="mb-6">
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 mr-[-16px] ml-6 mb-4 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">PENGALAMAN ORGANISASI</h2>
                <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[16px] border-t-[#2b4f7a] border-r-transparent"></div>
              </div>
              
              <div className="px-8 flex flex-col gap-4">
                {organization.map((org: any) => (
                  <div key={org.id} className="text-[9pt] leading-relaxed text-[#333]">
                    <div className="font-bold text-[10pt] text-[#2b4f7a]">{org.organization}</div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-[12pt] mt-[-2px]">✓</span> Sebagai {org.role}
                      </div>
                      <div className="font-bold">
                        {org.startYear} - {org.endYear || 'Sekarang'}
                      </div>
                    </div>
                    {org.description && (
                      <div className="pl-5 text-justify">
                        {org.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KURSUS / PELATIHAN */}
          {courses.length > 0 && (
            <div className="mb-6">
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 mr-[-16px] ml-6 mb-4 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">KURSUS & PELATIHAN</h2>
                <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[16px] border-t-[#2b4f7a] border-r-transparent"></div>
              </div>
              
              <div className="px-8 flex flex-col gap-4">
                {courses.map((course: any) => (
                  <div key={course.id} className="text-[9pt] leading-relaxed text-[#333]">
                    <div className="font-bold text-[10pt] text-[#2b4f7a]">{course.title}</div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-[12pt] mt-[-2px]">✓</span> Diselenggarakan oleh {course.issuer}
                      </div>
                      <div className="font-bold">
                        {course.startYear} - {course.endYear || 'Sekarang'}
                      </div>
                    </div>
                    {course.description && (
                      <div className="pl-5 text-justify">
                        {course.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* PRESTASI / CERTIFICATIONS */}
          {(awards.length > 0 || renderDummy) && (
            <div className={`mb-4 ${awards.length === 0 ? 'print:hidden' : ''}`}>
              <div className="relative bg-[#558ed5] text-white py-1.5 px-6 mr-[-16px] ml-6 mb-4 shadow-sm print:!bg-[#558ed5]">
                <h2 className="text-[11pt] font-bold uppercase tracking-widest">PRESTASI</h2>
                <div className="absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[16px] border-t-[#2b4f7a] border-r-transparent"></div>
              </div>
              
              <div className="px-8 flex flex-col gap-4">
                {visibleCerts.map((cert: any) => (
                  <div key={cert.id} className={`text-[9pt] leading-relaxed ${cert.isDummy ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-[#333]'}`}>
                    <div className={`font-bold text-[10pt] ${cert.isDummy ? 'text-gray-400' : 'text-[#2b4f7a]'}`}>{cert.issuer}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12pt] mt-[-2px]">✓</span> {cert.title}
                      </div>
                      <div className="font-bold">{cert.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ rating, max = 5 }: { rating: number, max?: number }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_: any, i: any) => (
        <Star 
          key={i} 
          className={`w-[11px] h-[11px] ${i < rating ? 'fill-[#2b4f7a] text-[#2b4f7a]' : 'fill-transparent text-gray-300'}`} 
        />
      ))}
    </div>
  );
}
