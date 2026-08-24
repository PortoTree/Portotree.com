import React from 'react';
import { CVDataPayload } from '@/lib/cvData';

export function ATSClassic({ data, showPlaceholders = true }: { data: CVDataPayload, showPlaceholders?: boolean }) {
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
  const { personal, experience, education, skills, projects, certifications, awards, organization, internship, courses, languages, extracurriculars, hobbies } = portfolio;
  
  const name = personal?.firstName || personal?.lastName 
    ? `${personal?.firstName || ''} ${personal?.lastName || ''}`.trim().toUpperCase()
    : personal?.name 
      ? personal?.name.toUpperCase()
      : (renderDummy ? "YOUR NAME" : "");
      
  const dummyLocation = "San Francisco, USA";
  const dummyPhone = "+1 987 654 3210";
  const dummyEmail = "your.name@email.com";
  
  const location = personal?.address || personal?.location || (renderDummy ? dummyLocation : "");
  const phone = personal?.phone || (renderDummy ? dummyPhone : "");
  const email = personal?.email || (renderDummy ? dummyEmail : "");
  const portfolioUrl = personal?.portfolioUrl || "";
  
  const dummyBio = "Creative and detail-oriented Graphic Designer with over 5 years of experience in developing engaging and innovative digital and print designs. Proficient in Adobe Creative Suite, UI/UX design, branding, and visual storytelling. Adept at collaborating with clients and marketing teams to deliver compelling visuals that drive engagement. Passionate about design trends and committed to delivering high-quality creative solutions.";
  const bio = personal?.bio ? personal?.bio.replace(/<[^>]+>/g, '') : (renderDummy ? dummyBio : "");

  let visibleExperience = experience?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  if (visibleExperience.length === 0) {
    visibleExperience = [
      {
        id: 'exp-dummy-1',
        role: 'Senior Graphic Designer',
        company: 'Creative Design Agency',
        location: 'New York, NY',
        startMonth: 'January', startYear: '2020',
        endMonth: 'Present', endYear: '',
        current: true,
        description: '• Lead a team of 5 designers to create visually compelling marketing materials.\n• Successfully managed and delivered over 50 branding projects for high-profile clients.\n• Spearheaded the redesign of the company website, increasing user engagement by 35%.',
        isDummy: true
      },
      {
        id: 'exp-dummy-2',
        role: 'Graphic Designer',
        company: 'Innovative Tech Solutions',
        location: 'San Francisco, CA',
        startMonth: 'June', startYear: '2016',
        endMonth: 'December', endYear: '2019',
        current: false,
        description: '• Developed user interfaces for web and mobile applications.\n• Collaborated with the marketing team to design promotional campaigns.\n• Created high-quality illustrations and graphics for social media.',
        isDummy: true
      }
    ] as any;
  }

  let visibleEducation = education?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  if (visibleEducation.length === 0) {
    visibleEducation = [
      {
        id: 'edu-dummy-1',
        degree: 'Bachelor of Fine Arts in Graphic Design',
        school: 'University of Arts',
        location: 'Los Angeles, CA',
        startYear: '2012', endYear: '2016',
        description: '',
        isDummy: true
      }
    ] as any;
  }
  
  const visibleCerts = certifications?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  const visibleAwards = awards?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  const visibleOrg = organization?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  const visibleInternship = internship?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  const visibleCourses = courses?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  
  let visibleLanguages = languages?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  if (visibleLanguages.length === 0) {
    visibleLanguages = [
      { id: 'l1', name: 'English', proficiency: 'Native', isDummy: true },
      { id: 'l2', name: 'Japanese', proficiency: 'Intermediate', isDummy: true },
    ];
  }
  
  const visibleExtracurriculars = extracurriculars?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  const visibleHobbies = hobbies?.filter((item: any) => !config.hiddenItems.includes(item.id)) || [];
  
  const SectionHeader = ({ title, thickTop = false }: { title: string, thickTop?: boolean }) => (
    <div className="mb-3">
      <hr className={`border-black ${thickTop ? 'border-t-4 mb-3' : 'border-t-[1px] mb-3'}`} />
      <h3 className="text-[12pt] font-bold uppercase tracking-wider">{title}</h3>
    </div>
  );

  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto text-black"
      style={{ 
        fontFamily: config.fontFamily || 'Arial, sans-serif', 
        fontSize: '9.5pt',
        lineHeight: 1.6 
      }}
    >
      {/* HEADER */}
      {(name || location || phone || email || portfolioUrl) && (
        <div className={`mb-6 ${!(personal?.name || personal?.firstName || personal?.lastName) ? 'print:hidden' : ''}`}>
          {name && (
            <h1 className={`text-[20pt] font-bold mb-3 tracking-wide leading-none ${!(personal?.name || personal?.firstName || personal?.lastName) ? 'text-gray-400 opacity-70 grayscale' : 'text-black'}`}>
              {name}
            </h1>
          )}
          <div className={`flex items-center gap-2 font-medium mb-1 ${!(personal?.address || personal?.location || personal?.phone || personal?.email) ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-black'}`}>
            {location && <span>{location}</span>}
            {location && phone && <span>•</span>}
            {phone && <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-inherit no-underline">{phone}</a>}
          </div>
          <div className={`font-medium ${!(personal?.address || personal?.location || personal?.phone || personal?.email) ? 'text-gray-400 opacity-70 grayscale print:hidden' : 'text-black'}`}>
            {email && <a href={`mailto:${email}`} className="text-inherit no-underline">{email}</a>}
            {email && portfolioUrl && <span> • </span>}
            {portfolioUrl && (
              <a href={`https://${portfolioUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">{portfolioUrl}</a>
            )}
          </div>
        </div>
      )}

      {/* SUMMARY */}
      {(personal?.bio || renderDummy) && bio && (
        <div className={`mb-6 ${!personal?.bio ? 'print:hidden' : ''}`}>
          <SectionHeader title="SUMMARY" thickTop={true} />
          <p className={`text-justify ${!personal?.bio ? 'text-gray-400 opacity-70 grayscale' : 'text-black'}`}>
            {bio}
          </p>
        </div>
      )}

      {/* SKILLS */}
      {(skills || renderDummy) && (
        <div className={`mb-6 ${!skills ? 'print:hidden' : ''}`}>
          <SectionHeader title="SKILLS" />
          {skills ? (
            <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
              {skills.split(',').map((skill: any, i: any) => (
                <li key={i} className="pl-1 leading-snug break-words">
                  {skill.trim()}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-3 gap-x-4 gap-y-2 list-disc pl-5 text-gray-400 opacity-70 grayscale">
              <li className="pl-1 leading-snug">Adobe Creative Suite (Photoshop, Illustrator, InDesign, XD)</li>
              <li className="pl-1 leading-snug">Typography & Layout Design</li>
              <li className="pl-1 leading-snug">Web Design (HTML, CSS, WordPress)</li>
              <li className="pl-1 leading-snug">UI/UX Design & Prototyping</li>
              <li className="pl-1 leading-snug">Social Media Graphics & Marketing Materials</li>
              <li className="pl-1 leading-snug">Creativity & Attention to Detail</li>
              <li className="pl-1 leading-snug">Branding & Visual Identity</li>
              <li className="pl-1 leading-snug">Print & Digital Media</li>
              <li className="pl-1 leading-snug">Communication & Client Collaboration</li>
            </ul>
          )}
        </div>
      )}

      {((languages && languages.length > 0) || renderDummy) && visibleLanguages.length > 0 && (
        <div className={`mb-6 ${!languages || languages.length === 0 ? 'print:hidden' : ''}`}>
          <SectionHeader title="LANGUAGES" />
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
            {visibleLanguages.map((lang: any) => (
              <li key={lang.id} className={`pl-1 mb-2 leading-snug break-words ${(lang as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}`}>
                <div className="flex justify-between items-end mb-1">
                  <span className={`font-medium ${(lang as any).isDummy ? 'text-gray-400' : 'text-black'}`}>{lang.name}</span>
                  <span className="text-gray-500 text-xs italic">{lang.proficiency}</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-slate-700 h-full rounded-full print:bg-black"
                    style={{ width: `${getProficiencyPercentage(lang.proficiency)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* EDUCATION */}
      {((education && education.length > 0) || renderDummy) && visibleEducation.length > 0 && (
        <div className={`mb-6 ${!education || education.length === 0 ? 'print:hidden' : ''}`}>
          <SectionHeader title="EDUCATION" />
          <div className="space-y-4">
            {visibleEducation.map((edu: any) => (
              <div key={edu.id} className={`break-inside-avoid mb-4 ${(edu as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}`}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className={`font-bold ${(edu as any).isDummy ? 'text-gray-400' : ''}`}>{edu.degree} {edu.level ? `in ${edu.level}` : ''}</div>
                  <div className={`font-medium text-[9pt] ${(edu as any).isDummy ? 'text-gray-400' : ''}`}>{edu.endYear || edu.startYear}</div>
                </div>
                <div className={(edu as any).isDummy ? 'text-gray-400' : 'text-black'}>{edu.school || edu.school}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleCourses.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="COURSES" />
          <div className="space-y-4">
            {visibleCourses.map((course: any) => (
              <div key={course.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{course.title}</div>
                  <div className="font-medium text-[9pt]">{course.startYear} – {course.current ? 'Present' : course.endYear}</div>
                </div>
                <div className="text-black italic">{course.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {((experience && experience.length > 0) || renderDummy) && visibleExperience.length > 0 && (
        <div className={`mb-6 ${!experience || experience.length === 0 ? 'print:hidden' : ''}`}>
          <SectionHeader title="PROFESSIONAL EXPERIENCE" />
          <div className="space-y-5">
            {visibleExperience.map((exp: any) => (
              <div key={exp.id} className={`break-inside-avoid mb-4 ${(exp as any).isDummy ? 'text-gray-400 opacity-70 grayscale' : ''}`}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className={`font-bold ${(exp as any).isDummy ? 'text-gray-400' : ''}`}>{exp.role}</div>
                  <div className={`font-medium text-[9pt] ${(exp as any).isDummy ? 'text-gray-400' : ''}`}>{exp.startYear} – {exp.current ? 'Present' : exp.endYear}</div>
                </div>
                <div className={`mb-1.5 italic ${(exp as any).isDummy ? 'text-gray-400' : 'text-black'}`}>{exp.company} {exp.location ? `(${exp.location})` : ''}</div>
                {exp.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line: any, i: any) => (
                      <li key={i} className="pl-1">{line.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleInternship.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="INTERNSHIP EXPERIENCE" />
          <div className="space-y-5">
            {visibleInternship.map((intern: any) => (
              <div key={intern.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{intern.role}</div>
                  <div className="font-medium text-[9pt]">{intern.startYear} – {intern.current ? 'Present' : intern.endYear}</div>
                </div>
                <div className="text-black mb-1.5 italic">{intern.company} {intern.location ? `(${intern.location})` : ''}</div>
                {intern.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {intern.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line: any, i: any) => (
                      <li key={i} className="pl-1">{line.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      

      {visibleCerts.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="CERTIFICATIONS" />
          <div className="space-y-4">
            {visibleCerts.map((cert: any) => (
              <div key={cert.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{cert.title}</div>
                </div>
                {cert.description && <p className="text-justify">{cert.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleAwards.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="PRESTASI" />
          <div className="space-y-3">
            {visibleAwards.map((award: any) => (
              <div key={award.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{award.title}</div>
                  <div className="font-medium text-[9pt]">{award.year}</div>
                </div>
                <div className="text-black italic">{award.issuer}</div>
                {award.description && <p className="text-justify">{award.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleOrg.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="ORGANIZATIONS" />
          <div className="space-y-4">
            {visibleOrg.map((org: any) => (
              <div key={org.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{org.role}</div>
                  <div className="font-medium text-[9pt]">{org.startYear} – {org.current ? 'Present' : org.endYear}</div>
                </div>
                <div className="text-black italic mb-1">{org.name} {org.location ? `(${org.location})` : ''}</div>
                {org.description && <p className="text-justify">{org.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleExtracurriculars.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="EXTRACURRICULARS" />
          <div className="space-y-4">
            {visibleExtracurriculars.map((extra: any) => (
              <div key={extra.id} className={`break-inside-avoid mb-4 ${(extra as any).isDummy ? 'text-gray-400 opacity-70' : ''}`}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className={`font-bold ${(extra as any).isDummy ? 'text-gray-400' : 'text-black'}`}>{extra.title}</div>
                  <div className={`font-medium text-[9pt] ${(extra as any).isDummy ? 'text-gray-400' : 'text-black'}`}>{extra.year}</div>
                </div>
                <div className={`italic ${(extra as any).isDummy ? 'text-gray-400' : 'text-black'}`}>{extra.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleHobbies.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="HOBBIES" />
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
            {visibleHobbies.map((hobby: any) => (
              <li key={hobby.id} className={`pl-1 leading-snug break-words ${(hobby as any).isDummy ? 'text-gray-400 opacity-70' : 'text-black'}`}>
                {hobby.name}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
