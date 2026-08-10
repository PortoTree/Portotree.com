import React from 'react';
import { CVDataPayload } from '@/lib/cvData';

export function ATSClassic({ data }: { data: CVDataPayload }) {
  const { portfolio, config } = data;
  const { personal, experience, education, skills, projects, certifications, awards, organization, internship, courses, languages, extracurriculars, hobbies } = portfolio;
  
  const name = personal?.firstName || personal?.lastName 
    ? `${personal?.firstName || ''} ${personal?.lastName || ''}`.trim().toUpperCase()
    : personal?.name 
      ? personal?.name.toUpperCase()
      : "JESSICA ANDERSON";
      
  const location = personal?.address || personal?.location || "San Francisco, USA";
  const phone = personal?.phone || "+1 987 654 3210";
  const email = personal?.email || "jessica.anderson@email.com";
  const portfolioUrl = personal?.portfolioUrl || "";
  
  const bio = personal?.bio ? personal?.bio.replace(/<[^>]+>/g, '') : "Creative and detail-oriented Graphic Designer with over 5 years of experience in developing engaging and innovative digital and print designs. Proficient in Adobe Creative Suite, UI/UX design, branding, and visual storytelling. Adept at collaborating with clients and marketing teams to deliver compelling visuals that drive engagement. Passionate about design trends and committed to delivering high-quality creative solutions.";

  const visibleExperience = experience?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleEducation = education?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleProjects = projects?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleCerts = certifications?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleAwards = awards?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleOrg = organization?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleInternship = internship?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleCourses = courses?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleLanguages = languages?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleExtracurriculars = extracurriculars?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleHobbies = hobbies?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  
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
      <div className="mb-6">
        <h1 className="text-[20pt] font-bold mb-3 tracking-wide text-black leading-none">
          {name}
        </h1>
        <div className="flex items-center gap-2 text-black font-medium mb-1">
          <span>{location}</span>
          <span>•</span>
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-inherit no-underline">{phone}</a>
        </div>
        <div className="text-black font-medium">
          <a href={`mailto:${email}`} className="text-inherit no-underline">{email}</a>
          {portfolioUrl && (
            <>
              <span> • </span>
              <a href={`https://${portfolioUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">{portfolioUrl}</a>
            </>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-6">
        <SectionHeader title="SUMMARY" thickTop={true} />
        <p className="text-justify text-black">
          {bio}
        </p>
      </div>

      {/* SKILLS */}
      <div className="mb-6">
        <SectionHeader title="SKILLS" />
        {skills ? (
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
            {skills.split(',').map((skill, i) => (
              <li key={i} className="pl-1 leading-snug break-words">
                {skill.trim()}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-3 gap-x-4 gap-y-2 list-disc pl-5">
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

      {visibleLanguages.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="LANGUAGES" />
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
            {visibleLanguages.map(lang => (
              <li key={lang.id} className="pl-1 leading-snug break-words">
                <span className="font-medium">{lang.name}</span> — <span className="text-gray-700 italic">{lang.proficiency}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* EDUCATION */}
      <div className="mb-6">
        <SectionHeader title="EDUCATION" />
        <div className="space-y-4">
          {visibleEducation.length > 0 ? (
            visibleEducation.map(edu => (
              <div key={edu.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{edu.degree} {edu.level ? `in ${edu.level}` : ''}</div>
                  <div className="font-medium text-[9pt]">{edu.endYear || edu.startYear}</div>
                </div>
                <div className="text-black">{edu.school}</div>
              </div>
            ))
          ) : (
            <div>
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="font-bold">Bachelor's Degree in Graphic Design</div>
                <div className="font-medium text-[9pt]">2017</div>
              </div>
              <div className="text-black">University of California, Berkeley, USA</div>
            </div>
          )}
        </div>
      </div>

      {visibleCourses.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="COURSES" />
          <div className="space-y-4">
            {visibleCourses.map(course => (
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
      <div className="mb-6">
        <SectionHeader title="PROFESSIONAL EXPERIENCE" />
        <div className="space-y-5">
          {visibleExperience.length > 0 ? (
            visibleExperience.map(exp => (
              <div key={exp.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{exp.role}</div>
                  <div className="font-medium text-[9pt]">{exp.startYear} – {exp.current ? 'Present' : exp.endYear}</div>
                </div>
                <div className="text-black mb-1.5 italic">{exp.company} {exp.location ? `(${exp.location})` : ''}</div>
                {exp.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="pl-1">{line.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <>
              <div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">Senior Graphic Designer</div>
                  <div className="font-medium text-[9pt]">2020 – Present</div>
                </div>
                <div className="text-black mb-1.5 italic">Creative Edge Agency (San Francisco, USA)</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="pl-1">Led the design and development of branding materials, increasing brand visibility by 40%.</li>
                  <li className="pl-1">Designed UI/UX layouts for web and mobile applications, improving user engagement.</li>
                  <li className="pl-1">Created compelling marketing materials, including brochures, infographics, and social media visuals.</li>
                  <li className="pl-1">Worked closely with clients to understand their design needs and deliver customized creative solutions.</li>
                  <li className="pl-1">Mentored junior designers and provided creative direction for projects.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">Graphic Designer</div>
                  <div className="font-medium text-[9pt]">2017 – 2020</div>
                </div>
                <div className="text-black mb-1.5 italic">PixelWorks Studio (Los Angeles, USA)</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="pl-1">Developed logo designs and corporate branding for clients, enhancing brand recognition.</li>
                  <li className="pl-1">Designed website layouts and digital graphics, improving website traffic by 30%.</li>
                  <li className="pl-1">Created engaging social media content for advertising campaigns, increasing engagement rates.</li>
                  <li className="pl-1">Assisted in print production for magazines, flyers, and posters.</li>
                  <li className="pl-1">Collaborated with marketing teams to develop visually appealing advertising materials.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {visibleInternship.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="INTERNSHIP EXPERIENCE" />
          <div className="space-y-5">
            {visibleInternship.map(intern => (
              <div key={intern.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{intern.role}</div>
                  <div className="font-medium text-[9pt]">{intern.startYear} – {intern.current ? 'Present' : intern.endYear}</div>
                </div>
                <div className="text-black mb-1.5 italic">{intern.company} {intern.location ? `(${intern.location})` : ''}</div>
                {intern.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {intern.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="pl-1">{line.replace(/^-\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


      {visibleProjects.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="PROJECTS" />
          <div className="space-y-5">
            {visibleProjects.map(proj => (
              <div key={proj.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{proj.title}</div>
                </div>
                <div className="text-blue-600 mb-1.5 italic"><a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{proj.link}</a></div>
                {proj.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {proj.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
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
            {visibleCerts.map(cert => (
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
            {visibleAwards.map(award => (
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
            {visibleOrg.map(org => (
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
            {visibleExtracurriculars.map(extra => (
              <div key={extra.id} className="break-inside-avoid mb-4">
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold">{extra.title}</div>
                  <div className="font-medium text-[9pt]">{extra.year}</div>
                </div>
                <div className="text-black italic">{extra.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleHobbies.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="HOBBIES" />
          <ul className="grid grid-cols-3 gap-x-4 gap-y-1 list-disc pl-5">
            {visibleHobbies.map(hobby => (
              <li key={hobby.id} className="pl-1 leading-snug break-words">
                {hobby.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* REFERENCES */}
      <div className="mb-6">
        <SectionHeader title="REFERENCES" />
        <p className="text-black">
          Available upon request
        </p>
      </div>

    </div>
  );
}
