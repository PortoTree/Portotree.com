import React from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { Phone, Mail, MapPin, MessageSquare, Settings, User, GraduationCap, Briefcase, Award, Globe, Trophy, Users, BookOpen, Heart, Folder, Activity } from 'lucide-react';

export function ProModern({ data, showPlaceholders = true }: { data: CVDataPayload, showPlaceholders?: boolean }) {
  const renderDummy = showPlaceholders;
  const getProficiencyPercentage = (level?: string) => {
    if (!level) return 0;
    const l = level.toLowerCase();
    if (l.includes('mula') || l.includes('begin')) return 20;
    if (l.includes('menengah') || l.includes('inter')) return 40;
    if (l.includes('lanjut') || l.includes('advan')) return 60;
    if (l.includes('fasih') || l.includes('fluent')) return 80;
    if (l.includes('asli') || l.includes('native')) return 100;
    return 50;
  };

  const { portfolio, config } = data;
  const { personal, experience, education, skills, certifications, languages, projects, awards, organization, internship, courses, extracurriculars, hobbies } = portfolio;
  
  const name = personal?.firstName || personal?.lastName 
    ? `${personal?.firstName || ''} ${personal?.lastName || ''}`.trim()
    : personal?.name 
      ? personal?.name
      : (renderDummy ? "Your Name" : "");
      
  const headline = personal?.headline || (renderDummy ? "BACHELOR OF ARTS IN EDUCATION" : "");
  const location = personal?.address || personal?.location || (renderDummy ? "464 Canyon Trail, Charlotte, NC 48210, USA" : "");
  const phone = personal?.phone || (renderDummy ? "(012) 444 6789" : "");
  const email = personal?.email || (renderDummy ? "gmicheal@email.com" : "");
  const portfolioUrl = personal?.portfolioUrl || (renderDummy ? "WWW.HELPSHARED.COM" : "");
  const photoUrl = personal?.photoUrl || (renderDummy ? "/placeholder-potret.png" : "");
  
  const dummyBio = "Motivated entry-level high school English Teacher with experience teaching multiple subject disciplines at all grade levels. Skilled in curriculum development, student performance improvement and classroom management.";
  const bio = personal?.bio ? personal?.bio.replace(/<[^>]+>/g, '') : (renderDummy ? dummyBio : "");

  let visibleExperience = experience?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  if (visibleExperience.length === 0) {
    visibleExperience = [
      {
        id: 'ex1',
        role: 'Special Education Teacher',
        company: 'River Tech High School',
        startMonth: 'May', startYear: '2023',
        endMonth: 'August', endYear: '2024',
        current: false,
        location: '',
        description: '• Prepare 50+ students for the AP English Literature exam\n• Discuss literary works, trends and techniques with students\n• Administer written assignments and provide constructive feedback\n• Create lesson plans and instructional resources for each class',
        isDummy: true
      }
    ];
  }
  
  let visibleEducation = education?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  if (visibleEducation.length === 0) {
    visibleEducation = [
      {
        id: 'ed1',
        degree: 'Bachelor of Arts in Education',
        institution: 'Johnson University',
        startYear: '2019', endYear: '2023',
        location: 'West Charlotte, NC',
        description: '',
        isDummy: true
      }
    ];
  }
  
  let visibleCerts = certifications?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  if (visibleCerts.length === 0) {
    visibleCerts = [
      {
        id: 'c1',
        title: 'Illinois Professional Educator License (PEL)',
        issuer: '',
        year: '2025',
        description: '',
        isDummy: true
      },
      {
        id: 'c2',
        title: 'National Board Certified Teacher (NBCT)',
        issuer: '',
        year: '2025',
        description: '',
        isDummy: true
      }
    ];
  }
  
  let visibleLanguages = languages?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  if (visibleLanguages.length === 0) {
    visibleLanguages = [
      { id: 'l1', name: 'English', proficiency: 'Native', isDummy: true },
      { id: 'l2', name: 'Japanese', proficiency: 'Intermediate', isDummy: true },
      { id: 'l3', name: 'Spanish', proficiency: 'Beginner', isDummy: true }
    ];
  }

  const visibleProjects = projects?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleAwards = awards?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleOrg = organization?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleInternship = internship?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleCourses = courses?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleExtracurriculars = extracurriculars?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleHobbies = hobbies?.filter(item => !config.hiddenItems.includes(item.id)) || [];

  const dummySkills = "Organization, Leadership, Performance improvement plan development, Creative learning techniques, Behavior management";
  const displaySkills = skills || (renderDummy ? dummySkills : "");

  // Colors based on the design
  const primaryColor = config.primaryColor !== '#000000' ? config.primaryColor : '#3f4552'; 
  const sidebarBg = '#e2e5e9';

  const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="text-[14pt] font-bold tracking-widest text-slate-800 uppercase">{title}</h3>
    </div>
  );

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] mx-auto text-black relative flex"
      style={{ 
        fontFamily: config.fontFamily || 'Arial, sans-serif', 
        fontSize: '10pt',
        lineHeight: 1.5 
      }}
    >
      {/* HEADER BANNER */}
      <div 
        className="absolute top-0 right-0 h-[45mm] z-0 flex flex-col justify-center pl-[80mm] pr-[15mm]"
        style={{ width: '100%', backgroundColor: primaryColor }}
      >
        <h1 className="text-[28pt] font-bold text-white leading-tight">{name}</h1>
        <div className="text-[11pt] tracking-[0.2em] text-white/90 uppercase mt-1">
          {headline}
        </div>
      </div>

      {/* LEFT SIDEBAR */}
      <div className="w-[70mm] min-h-[297mm] z-10 flex flex-col relative" style={{ backgroundColor: sidebarBg }}>
        {/* Photo Container (Overlaps header) */}
        {(photoUrl || renderDummy) && (
          <div className={`pt-[15mm] pb-6 px-[10mm] flex justify-center ${!personal?.photoUrl ? 'print:hidden' : ''}`}>
            <div className="w-[45mm] h-[60mm] bg-white rounded-t-full rounded-b-full overflow-hidden border-[5px] border-white/20 shadow-lg relative z-20">
              {photoUrl ? (
                <img src={photoUrl} alt={name} className="w-full h-full object-cover object-top" />
              ) : (
                <img src="/placeholder-potret.png" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" />
              )}
            </div>
          </div>
        )}

        <div className="px-[8mm] flex-1 flex flex-col gap-8 pb-10 mt-2">
          {/* CONTACT */}
          {(location || phone || email) && (
            <div className={!(personal?.address || personal?.location || personal?.phone || personal?.email) ? 'print:hidden' : ''}>
              <SectionHeader title="CONTACT" icon={Phone} />
              <div className="flex flex-col gap-4 text-[9.5pt] font-medium">
                {location && <p className={`leading-relaxed ${!(personal?.address || personal?.location) ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-slate-800'}`}>{location}</p>}
                {phone && <p className={`${!personal?.phone ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-slate-800'}`}>{phone}</p>}
                {email && <p className={`break-all ${!personal?.email ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-slate-800'}`}>{email}</p>}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {(visibleLanguages.length > 0 || renderDummy) && (
            <div className={!languages || languages.length === 0 ? 'print:hidden' : ''}>
              <SectionHeader title="LANGUAGES" icon={MessageSquare} />
              <div className="flex flex-col gap-3">
                {visibleLanguages.map(lang => (
                  <div key={lang.id} className={`flex items-center justify-between text-[9.5pt] ${(lang as any).isDummy ? 'text-gray-400 opacity-70' : 'text-slate-800'}`}>
                    <span className="w-20">{lang.name}</span>
                    <div className="flex-1 h-0.5 bg-slate-300 relative ml-2">
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-slate-800" 
                        style={{ width: `${getProficiencyPercentage(lang.proficiency)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {(skills || renderDummy) && displaySkills && (
            <div className={!skills ? 'print:hidden' : ''}>
              <SectionHeader title="SKILLS" icon={Settings} />
              <ul className="flex flex-col gap-2.5">
                {displaySkills.split(',').map((skill, i) => (
                  <li key={i} className={`flex items-start gap-2 text-[9.5pt] ${!skills ? 'text-gray-400 opacity-70' : 'text-slate-800'}`}>
                    <span className="mt-1" style={{ fontSize: '8pt' }}>✓</span>
                    <span className="leading-snug">{skill.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HOBBIES */}
          {visibleHobbies.length > 0 && (
            <div className={!hobbies || hobbies.length === 0 ? 'print:hidden' : ''}>
              <SectionHeader title="HOBBIES" icon={Heart} />
              <ul className="flex flex-col gap-2.5">
                {visibleHobbies.map(hobby => (
                  <li key={hobby.id} className={`flex items-start gap-2 text-[9.5pt] ${(hobby as any).isDummy ? 'text-gray-400 opacity-70' : 'text-slate-800'}`}>
                    <span className="mt-1" style={{ fontSize: '8pt' }}>✓</span>
                    <span className="leading-snug">{hobby.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* BOTTOM LEFT FOOTER */}
        {portfolioUrl && (
          <div className={`absolute bottom-0 left-0 w-full h-[15mm] flex items-center justify-center gap-1.5 px-4 ${!personal?.portfolioUrl ? 'print:hidden' : ''}`} style={{ backgroundColor: '#d4d7dc' }}>
            <Globe size={11} className="text-slate-500 opacity-80 shrink-0" />
            <span className={`text-[6.5pt] font-bold tracking-normal break-all text-center leading-tight max-h-full overflow-hidden ${!personal?.portfolioUrl ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-slate-700'}`}>{portfolioUrl.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* MAIN CONTENT (RIGHT) */}
      <div className="flex-1 pl-[10mm] pr-[15mm] pt-[55mm] pb-[20mm] flex flex-col gap-8 z-10">
        
        {/* SUMMARY */}
        {(personal?.bio || renderDummy) && (
          <div className={!personal?.bio ? 'print:hidden' : ''}>
            <SectionHeader title="SUMMARY" icon={User} />
            <p className={`text-justify leading-relaxed text-[10pt] ${!personal?.bio ? 'text-gray-400 opacity-70' : 'text-slate-700'}`}>
              {bio}
            </p>
          </div>
        )}

        {/* EDUCATION */}
        {((education && education.length > 0) || renderDummy) && visibleEducation.length > 0 && (
          <div className={!education || education.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="EDUCATION" icon={GraduationCap} />
            <div className="flex flex-col gap-4">
              {visibleEducation.map(edu => (
                <div key={edu.id} className={(edu as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(edu as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {edu.school || edu.institution}{edu.location ? `, ${edu.location}` : ''}
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className={`italic ${(edu as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>{edu.degree}</div>
                    <div className={`text-[9pt] font-medium ${(edu as any).isDummy ? 'text-gray-400' : 'text-slate-500'}`}>
                      {edu.startYear} {edu.endYear ? `– ${edu.endYear}` : (edu.startYear ? '– Present' : '')}
                    </div>
                  </div>
                  {edu.gpa && <div className={`text-[9pt] ${(edu as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>GPA: {edu.gpa}</div>}
                  {edu.description && <p className={`mt-1 text-[9.5pt] ${(edu as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {((experience && experience.length > 0) || renderDummy) && visibleExperience.length > 0 && (
          <div className={!experience || experience.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="EXPERIENCE" icon={Briefcase} />
            <div className="flex flex-col gap-5">
              {visibleExperience.map(exp => (
                <div key={exp.id} className={(exp as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(exp as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {exp.company}{exp.role ? `, ${exp.role}` : ''}
                  </div>
                  <div className={`text-[9pt] mb-2 ${(exp as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>
                    {exp.startMonth} {exp.startYear} – {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                  </div>
                  {exp.description && (
                    <div className={`text-[9.5pt] ml-4 ${(exp as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>
                      {exp.description.split('\n').map((line, i) => {
                        const cleanLine = line.trim();
                        if (!cleanLine) return null;
                        return (
                          <div key={i} className="flex gap-2 mb-1">
                            <span className="select-none text-slate-400">•</span>
                            <span>{cleanLine.replace(/^[-•]\s*/, '')}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {((certifications && certifications.length > 0) || renderDummy) && visibleCerts.length > 0 && (
          <div className={!certifications || certifications.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="CERTIFICATIONS" icon={Award} />
            <div className="flex flex-col gap-2 ml-4">
              {visibleCerts.map(cert => (
                <div key={cert.id} className={`flex gap-2 text-[10pt] ${(cert as any).isDummy ? 'text-gray-400 opacity-70' : 'text-slate-700'}`}>
                  <span className={`select-none text-[12pt] leading-none ${(cert as any).isDummy ? 'text-gray-400' : 'text-slate-800'}`}>▪</span>
                  <span>{cert.title}{cert.year ? `, ${cert.year}` : ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {visibleProjects.length > 0 && (
          <div className={!projects || projects.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="PROJECTS" icon={Folder} />
            <div className="flex flex-col gap-5">
              {visibleProjects.map(proj => (
                <div key={proj.id} className={(proj as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(proj as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {proj.title}
                  </div>
                  {proj.link && (
                    <div className="mb-2">
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`text-[9pt] hover:underline ${(proj as any).isDummy ? 'text-gray-400' : 'text-blue-600'}`}>
                        {proj.link}
                      </a>
                    </div>
                  )}
                  {proj.description && (
                    <div className={`text-[9.5pt] ml-4 ${(proj as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>
                      {proj.description.split('\n').map((line, i) => {
                        const cleanLine = line.trim();
                        if (!cleanLine) return null;
                        return (
                          <div key={i} className="flex gap-2 mb-1">
                            <span className="select-none text-slate-400">•</span>
                            <span>{cleanLine.replace(/^[-•]\s*/, '')}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORGANIZATIONS */}
        {visibleOrg.length > 0 && (
          <div className={!organization || organization.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="ORGANIZATIONS" icon={Users} />
            <div className="flex flex-col gap-5">
              {visibleOrg.map(org => (
                <div key={org.id} className={(org as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(org as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {org.name}{org.role ? `, ${org.role}` : ''}
                  </div>
                  <div className={`text-[9pt] mb-2 ${(org as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>
                    {org.startYear} – {org.current ? 'Present' : org.endYear}
                  </div>
                  {org.description && (
                    <p className={`mt-1 text-[9.5pt] ${(org as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>{org.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP */}
        {visibleInternship.length > 0 && (
          <div className={!internship || internship.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="INTERNSHIP" icon={Briefcase} />
            <div className="flex flex-col gap-5">
              {visibleInternship.map(intern => (
                <div key={intern.id} className={(intern as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(intern as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {intern.company}{intern.role ? `, ${intern.role}` : ''}
                  </div>
                  <div className={`text-[9pt] mb-2 ${(intern as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>
                    {intern.startYear} – {intern.current ? 'Present' : intern.endYear}
                  </div>
                  {intern.description && (
                    <div className={`text-[9.5pt] ml-4 ${(intern as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>
                      {intern.description.split('\n').map((line, i) => {
                        const cleanLine = line.trim();
                        if (!cleanLine) return null;
                        return (
                          <div key={i} className="flex gap-2 mb-1">
                            <span className="select-none text-slate-400">•</span>
                            <span>{cleanLine.replace(/^[-•]\s*/, '')}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COURSES */}
        {visibleCourses.length > 0 && (
          <div className={!courses || courses.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="COURSES" icon={BookOpen} />
            <div className="flex flex-col gap-4">
              {visibleCourses.map(course => (
                <div key={course.id} className={(course as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(course as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {course.title}
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className={`italic ${(course as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>{course.issuer}</div>
                    <div className={`text-[9pt] font-medium ${(course as any).isDummy ? 'text-gray-400' : 'text-slate-500'}`}>
                      {course.startYear} {course.endYear ? `– ${course.endYear}` : (course.startYear ? '– Present' : '')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRESTASI / AWARDS */}
        {visibleAwards.length > 0 && (
          <div className={!awards || awards.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="AWARDS" icon={Trophy} />
            <div className="flex flex-col gap-4">
              {visibleAwards.map(award => (
                <div key={award.id} className={(award as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(award as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {award.title}
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className={`italic ${(award as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>{award.issuer}</div>
                    <div className={`text-[9pt] font-medium ${(award as any).isDummy ? 'text-gray-400' : 'text-slate-500'}`}>
                      {award.year}
                    </div>
                  </div>
                  {award.description && <p className={`mt-1 text-[9.5pt] ${(award as any).isDummy ? 'text-gray-400' : 'text-slate-600'}`}>{award.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXTRACURRICULARS */}
        {visibleExtracurriculars.length > 0 && (
          <div className={!extracurriculars || extracurriculars.length === 0 ? 'print:hidden' : ''}>
            <SectionHeader title="EXTRACURRICULARS" icon={Activity} />
            <div className="flex flex-col gap-4">
              {visibleExtracurriculars.map(extra => (
                <div key={extra.id} className={(extra as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}>
                  <div className={`font-bold text-[11pt] mb-0.5 ${(extra as any).isDummy ? 'text-gray-500' : 'text-slate-900'}`}>
                    {extra.title}
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className={`italic ${(extra as any).isDummy ? 'text-gray-400' : 'text-slate-700'}`}>{extra.issuer}</div>
                    <div className={`text-[9pt] font-medium ${(extra as any).isDummy ? 'text-gray-400' : 'text-slate-500'}`}>
                      {extra.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
