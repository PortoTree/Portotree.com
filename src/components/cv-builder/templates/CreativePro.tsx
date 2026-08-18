import React from 'react';
import { CVDataPayload } from '@/lib/cvData';

export const CreativePro: React.FC<{ data: CVDataPayload, showPlaceholders?: boolean }> = ({ data, showPlaceholders = true }) => {
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
    role: "Graphic Designer",
    email: "ameliahartley@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA, US",
    bio: "A passionate and creative Graphic Designer with over 5 years of experience in crafting visually compelling designs for print, digital media, and branding. Proficient in Adobe Creative Suite and other industry-standard design tools, with a strong eye for detail, color, and typography.",
    birthDate: "April 15, 1994",
    website: "ameliahartleydesign.com"
  };

  const name = personal?.name || dummyPersonal.fullName;
  const email = personal?.email || dummyPersonal.email;
  const phone = personal?.phone || dummyPersonal.phone;
  const location = personal?.address || personal?.location || dummyPersonal.location;
  const website = personal?.portfolioUrl || dummyPersonal.website;
  const headline = personal?.headline || dummyPersonal.role;
  const bio = personal?.bio || dummyPersonal.bio;
  const dateOfBirth = personal?.dateOfBirth || dummyPersonal.birthDate;
  
  const hasSkills = !!portfolio.skills;
  const skillsList = hasSkills ? (portfolio.skills || '').split(',').map((s: any) => s.trim()).filter(Boolean) : ["Design Software", "Design Specialties", "Technical Skills", "Soft Skills"];
  
  const hasLanguages = portfolio.languages && portfolio.languages.length > 0;
  const dummyLanguages = [
    { id: '1', name: 'English', proficiency: 'Native', isDummy: true },
    { id: '2', name: 'French', proficiency: 'Intermediate', isDummy: true }
  ] as any;
  const languagesList = hasLanguages ? portfolio.languages : dummyLanguages;

  const mapProficiencyToPercentage = (prof: string) => {
    const p = prof?.toLowerCase() || '';
    if (p.includes('native') || p.includes('bilingual') || p.includes('penutur asli')) return 100;
    if (p.includes('fluent') || p.includes('fasih')) return 90;
    if (p.includes('advanced') || p.includes('lanjut')) return 80;
    if (p.includes('intermediate') || p.includes('menengah')) return 60;
    if (p.includes('beginner') || p.includes('basic') || p.includes('pemula')) return 40;
    return 75;
  };

  const visibleExperiences = experience.length > 0 ? experience : [
    {
      id: '1',
      company: 'CreativeSpark Agency | Los Angeles, CA',
      role: 'Senior Graphic Designer',
      startMonth: 'July',
      startYear: '2021',
      endMonth: 'Present',
      endYear: '',
      current: true,
      description: 'Lead the design and development of brand identities, promotional materials, and digital assets for a range of high-profile clients.',
      isDummy: true
    },
    {
      id: '2',
      company: 'Bright Horizon Publishing | San Francisco, CA',
      role: 'Graphic Designer',
      startMonth: 'August',
      startYear: '2018',
      endMonth: 'June',
      endYear: '2021',
      current: false,
      description: 'Designed custom book covers, illustrations, and marketing materials for print and digital platforms.',
      isDummy: true
    },
    {
      id: '3',
      company: 'PixelNest Studios | Los Angeles, CA',
      role: 'Junior Graphic Designer',
      startMonth: 'June',
      startYear: '2016',
      endMonth: 'July',
      endYear: '2018',
      current: false,
      description: 'Assisted senior designers in creating logo designs, brand guidelines, and packaging for various clients.',
      isDummy: true
    }
  ] as any;

  const visibleEducation = education.length > 0 ? education : [
    {
      id: '1',
      school: 'University of Southern California',
      degree: 'Bachelor of Fine Arts in Graphic Design',
      startYear: '2012',
      endYear: '2016',
      description: 'Graduated: May 2016',
      isDummy: true
    }
  ] as any;

  const visibleCertifications = awards.length > 0 ? awards : [
    {
      id: '1',
      title: 'Adobe Certified Expert (ACE) in Photoshop',
      issuer: 'Adobe',
      year: '2021',
      description: '',
      isDummy: true
    },
    {
      id: '2',
      title: 'Google UX Design Professional Certificate',
      issuer: 'Google',
      year: '2020',
      description: '',
      isDummy: true
    },
    {
      id: '3',
      title: 'UI/UX Design Specialization (Coursera)',
      issuer: 'Coursera',
      year: '2019',
      description: '',
      isDummy: true
    }
  ] as any;

  const visibleHobbies = hobbies.length > 0 ? hobbies : [
    { id: '1', name: 'Illustration & Digital Art', isDummy: true },
    { id: '2', name: 'Photography', isDummy: true },
    { id: '3', name: 'Typography Exploration', isDummy: true },
    { id: '4', name: 'Sustainability in Design', isDummy: true }
  ] as any;

  // Helper formatting functions
  const formatDateRange = (startM: string, startY: string, endM: string, endY: string, current: boolean) => {
    const start = [startM, startY].filter(Boolean).join(' ');
    const end = current ? 'Present' : [endM, endY].filter(Boolean).join(' ');
    if (start && end) return `${start} - ${end}`;
    return start || end;
  };

  return (
    <div className="w-[794px] h-[1122px] bg-white flex relative overflow-hidden font-sans text-slate-800">
      
      {/* ABSOLUTE PROFILE PHOTO */}
      {(personal?.photoUrl || renderDummy) && (
        <div className={`absolute top-[35px] left-[28%] -translate-x-1/2 w-[210px] h-[210px] rounded-full overflow-hidden border-[12px] border-white z-30 shadow-sm ${!personal?.photoUrl ? 'print:hidden' : ''}`}>
          <img 
            src={personal?.photoUrl || "/placeholder-potret.png"} 
            alt="Profile" 
            className="w-full h-full object-cover"
            style={{ objectPosition: personal?.photoUrl ? 'center top' : 'center center' }}
          />
        </div>
      )}

      {/* LEFT SIDEBAR (Dark Blue) */}
      <div className="w-[32%] bg-[#0A1128] text-white flex flex-col h-full relative z-10">
        
        <div className="pt-[280px] px-8 pb-10 flex-1 flex flex-col gap-8 text-[11.5px] font-light">
          
          {/* PROFILE INFO */}
          <div className="space-y-4">
            <h2 className="text-[20px] font-medium border-b border-white/30 pb-2 mb-4 tracking-wide">Profile</h2>
            
            <div className={`flex flex-col gap-1`}>
              {(personal?.name || renderDummy) && <div className={`flex gap-2 ${!personal?.name ? 'print:hidden' : ''}`}><strong className="font-semibold w-20 shrink-0 text-white">Name:</strong> <span className={`flex-1 break-words min-w-0 ${!personal?.name ? 'text-white/50' : 'text-white'}`}>{name}</span></div>}
              {(personal?.dateOfBirth || renderDummy) && <div className={`flex gap-2 ${!personal?.dateOfBirth ? 'print:hidden' : ''}`}><strong className="font-semibold w-20 shrink-0 text-white">Date of Birth:</strong> <span className={`flex-1 break-words min-w-0 ${!personal?.dateOfBirth ? 'text-white/50' : 'text-white'}`}>{dateOfBirth}</span></div>}
              {(personal?.address || personal?.location || renderDummy) && <div className={`flex gap-2 ${!(personal?.address || personal?.location) ? 'print:hidden' : ''}`}><strong className="font-semibold w-20 shrink-0 text-white">Location:</strong> <span className={`flex-1 break-words min-w-0 ${!(personal?.address || personal?.location) ? 'text-white/50' : 'text-white'}`}>{location}</span></div>}
              {(personal?.phone || renderDummy) && <div className={`flex gap-2 ${!personal?.phone ? 'print:hidden' : ''}`}><strong className="font-semibold w-20 shrink-0 text-white">Phone:</strong> <span className={`flex-1 break-words min-w-0 ${!personal?.phone ? 'text-white/50' : 'text-white'}`}>{phone}</span></div>}
              {(personal?.email || renderDummy) && <div className={`flex gap-2 ${!personal?.email ? 'print:hidden' : ''}`}><strong className="font-semibold w-20 shrink-0 text-white">Email:</strong> <span className={`flex-1 break-all min-w-0 ${!personal?.email ? 'text-white/50' : 'text-white'}`}>{email}</span></div>}
              {(personal?.portfolioUrl || renderDummy) && <div className={`flex gap-2 ${!personal?.portfolioUrl ? 'print:hidden' : ''}`}><strong className="font-semibold w-20 shrink-0 text-white">Portfolio:</strong> <span className={`flex-1 break-all min-w-0 ${!personal?.portfolioUrl ? 'text-white/50' : 'text-white'}`}>{website}</span></div>}
            </div>
          </div>

          {/* SKILLS */}
          {(hasSkills || renderDummy) && (
            <div className={`space-y-4 ${!hasSkills ? 'print:hidden' : ''}`}>
              <h2 className="text-[20px] font-medium border-b border-white/30 pb-2 mb-4 tracking-wide text-white">Skills</h2>
              <ul className="space-y-2.5">
                {(skillsList || []).map((skill: any, index: any) => (
                  <li key={index} className="font-bold text-[11.5px] tracking-wide">{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* INTERESTS (Hobbies) */}
          {(hobbies.length > 0 || renderDummy) && (
            <div className={`space-y-4 ${hobbies.length === 0 ? 'print:hidden' : ''}`}>
              <h2 className="text-[20px] font-medium border-b border-white/30 pb-2 mb-4 tracking-wide">Hoby</h2>
              <ul className="space-y-2.5">
                {visibleHobbies.map((hobby: any, idx: any) => (
                  <li key={idx} className={`font-bold tracking-wide ${(hobby as any).isDummy ? 'text-white/50 print:hidden' : ''}`}>
                    {hobby.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* LANGUAGES */}
          {(hasLanguages || renderDummy) && (
            <div className={`space-y-4 ${!hasLanguages ? 'print:hidden' : ''}`}>
              <h2 className="text-[20px] font-medium border-b border-white/30 pb-2 mb-4 tracking-wide">Language</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-6">
                {(languagesList || []).map((lang: any, idx: number) => {
                  const percentage = mapProficiencyToPercentage(lang.proficiency);
                  const radius = 20;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (percentage / 100) * circumference;
                  return (
                    <div key={idx} className={`flex flex-col items-center gap-2 ${(lang as any).isDummy ? 'opacity-50 print:hidden' : ''}`}>
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
                          <circle 
                            cx="24" cy="24" r={radius} 
                            stroke="rgba(255,255,255,0.2)" 
                            strokeWidth="2.5" 
                            fill="transparent" 
                          />
                          <circle 
                            cx="24" cy="24" r={radius} 
                            stroke="white" 
                            strokeWidth="2.5" 
                            fill="transparent" 
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-[9px] font-bold">{percentage}%</span>
                      </div>
                      <span className="font-bold text-[11px] tracking-wide text-center">{lang.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>


      {/* RIGHT MAIN CONTENT (White) */}
      <div className="w-[68%] bg-white flex flex-col h-full relative z-0">
        
        {/* TOP HEADER */}
        {(personal?.name || renderDummy) && (
          <div className={`mt-[70px] ml-4 bg-[#0A1128] rounded-l-[40px] pt-10 pb-10 pl-[80px] pr-12 flex flex-col justify-center min-h-[170px] shadow-sm ${!personal?.name && !personal?.headline ? 'print:hidden' : ''}`}>
            <h1 className={`${name.length > 15 ? 'text-[38px]' : 'text-[46px]'} font-black leading-[1.1] tracking-tight uppercase ${!personal?.name ? 'text-white/50 print:hidden' : 'text-white'}`} style={{ textTransform: 'none' }}>
              {name}
            </h1>
            <div className={`flex items-center gap-4 mt-3 w-full ${!personal?.headline ? 'print:hidden' : ''}`}>
              <h2 className={`text-[20px] font-medium tracking-wide whitespace-nowrap ${!personal?.headline ? 'text-white/50' : 'text-white'}`}>{headline}</h2>
              <div className={`h-px flex-1 min-w-[50px] max-w-full ${!personal?.headline ? 'bg-white/30' : 'bg-white'}`}></div>
            </div>
          </div>
        )}

        <div className="pr-12 pl-14 py-10 flex-1 flex flex-col gap-8 text-[11px] leading-[1.6]">
          
          {/* BIO */}
          {(personal?.bio || renderDummy) && (
            <div className={`font-bold ${!personal?.bio ? 'text-slate-400 print:hidden' : 'text-slate-800'}`}>
              <div dangerouslySetInnerHTML={{ __html: bio }} />
            </div>
          )}

          {/* EXPERIENCE */}
          {(experience.length > 0 || renderDummy) && (
            <div className={`space-y-4 ${experience.length === 0 ? 'print:hidden' : ''}`}>
              <div className="flex items-center gap-4 border-b border-slate-300 pb-1 mb-5">
                <h2 className="bg-[#0A1128] text-white px-5 py-1 text-[13px] font-semibold tracking-wide" style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)', paddingRight: '20px' }}>Experience</h2>
                <div className="h-px bg-slate-300 flex-1"></div>
              </div>

              <div className="relative border-l-2 border-slate-400 ml-[88px] space-y-6">
                {visibleExperiences.map((exp: any, idx: any) => (
                  <div key={idx} className={`relative pl-6 ${(exp as any).isDummy ? 'opacity-50 print:hidden' : ''}`}>
                    {/* Timeline dot */}
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-slate-600 border-[3px] border-white box-content"></div>
                    
                    <div className="flex flex-row justify-between mb-1.5 items-start">
                      <div className="font-bold text-[11px] absolute -left-[95px] top-0 text-slate-800 leading-[1.3] w-[75px] text-right break-words">
                        {formatDateRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[14px] text-[#0A1128] leading-snug">{exp.role}</div>
                        <div className="font-bold text-[11px] text-slate-700">{exp.company}</div>
                      </div>
                    </div>
                    {exp.description && (
                      <div 
                        className="text-[10px] text-slate-800 mt-2 font-semibold leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {(education.length > 0 || renderDummy) && (
            <div className={`space-y-4 ${education.length === 0 ? 'print:hidden' : ''}`}>
              <div className="flex items-center gap-4 border-b border-slate-300 pb-1 mb-5">
                <h2 className="bg-[#0A1128] text-white px-5 py-1 text-[13px] font-semibold tracking-wide" style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)', paddingRight: '20px' }}>Education</h2>
                <div className="h-px bg-slate-300 flex-1"></div>
              </div>

              <div className="space-y-5 ml-[95px]">
                {visibleEducation.map((edu: any, idx: any) => (
                  <div key={idx} className={`relative pl-5 ${(edu as any).isDummy ? 'opacity-50 print:hidden' : ''}`}>
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <div className="font-bold text-[12px] text-[#0A1128] leading-snug">{edu.degree}</div>
                    <div className="font-bold text-[11px] text-slate-700 italic mb-1">{edu.school}</div>
                    {edu.description && (
                      <div 
                        className="text-[10px] text-slate-800 font-semibold"
                        dangerouslySetInnerHTML={{ __html: edu.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {(awards.length > 0 || renderDummy) && (
            <div className={`space-y-4 ${awards.length === 0 ? 'print:hidden' : ''}`}>
              <div className="flex items-center gap-4 border-b border-slate-300 pb-1 mb-5">
                <h2 className="bg-[#0A1128] text-white px-5 py-1 text-[13px] font-semibold tracking-wide" style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)', paddingRight: '20px' }}>Certifications</h2>
                <div className="h-px bg-slate-300 flex-1"></div>
              </div>

              <div className="space-y-2 ml-[95px]">
                {visibleCertifications.map((cert: any, idx: any) => (
                  <div key={idx} className={`pl-0 font-bold text-[11px] ${(cert as any).isDummy ? 'text-slate-400 print:hidden' : 'text-slate-800'}`}>
                    {cert.title} {cert.issuer && <span className="font-normal text-slate-600">- {cert.issuer}</span>}
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
