import React from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export function ATSModern({ data }: { data: CVDataPayload }) {
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
  const { personal, experience, education, skills, internship, projects, organization, certifications, awards, courses, languages, extracurriculars, hobbies } = portfolio;
  
  const name = personal?.firstName || personal?.lastName 
    ? `${personal?.firstName || ''} ${personal?.lastName || ''}`.trim().toUpperCase()
    : personal?.name 
      ? personal?.name.toUpperCase()
      : "YOUR NAME";
      
  const headline = personal?.headline ? personal?.headline.toUpperCase() : "ATS FRIENDLY RESUME";
  const location = personal?.address || personal?.location || "123 Anywhere St., Any City";
  const phone = personal?.phone || "+123-456-7890";
  const email = personal?.email || "hello@reallygreatsite.com";
  const portfolioUrl = personal?.portfolioUrl ? personal.portfolioUrl : "portotree.com/p/username";
  
  const bio = personal?.bio ? personal?.bio.replace(/<[^>]+>/g, '') : "Professional and results-driven candidate with a strong background in delivering high-quality work and achieving goals. Skilled in communication, problem-solving, and teamwork. Seeking opportunities to contribute value and grow within a dynamic organization.";

  const visibleExperience = experience?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleInternship = internship?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleProjects = projects?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleOrganization = organization?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleCertifications = certifications?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleAwards = awards?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleEducation = education?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleCourses = courses?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleLanguages = languages?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleExtracurriculars = extracurriculars?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleHobbies = hobbies?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  
  return (
    <div 
      className="bg-white w-full h-full p-10 font-sans mx-auto text-gray-800"
      style={{ 
        fontFamily: "'Inter', sans-serif",
        fontSize: '10pt',
        lineHeight: 1.5 
      }}
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-[28pt] font-bold mb-3 tracking-[0.2em] leading-none" style={{ color: config.primaryColor || '#111' }}>
          {name}
        </h1>
        <h2 className="text-[11pt] tracking-[0.3em] text-gray-500 mb-6 uppercase">
          {headline}
        </h2>
        <hr className="border-t border-gray-300" />
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="flex gap-10">
        
        {/* LEFT COLUMN */}
        <div className="w-[35%] flex flex-col gap-6">
          
          <div className="cv-section">
            <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-[9.5pt] text-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><Phone size={12} /></div>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-inherit no-underline">{phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><Mail size={12} /></div>
                <a href={`mailto:${email}`} className="break-all text-inherit no-underline">{email}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><MapPin size={12} /></div>
                <span>{location}</span>
              </div>
              {portfolioUrl && (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 text-white p-1 rounded-full"><Globe size={12} /></div>
                  <a href={`https://${portfolioUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="break-all text-inherit no-underline">{portfolioUrl.replace(/^https?:\/\//, '')}</a>
                </div>
              )}
            </div>
          </div>
          
          <div className="cv-section">
            <hr className="border-t border-gray-300 mb-6" />
            <div>
              <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Skills</h3>
              <h4 className="text-[10pt] uppercase tracking-wider mb-3 font-semibold">Professional</h4>
              <ul className="flex flex-col gap-1.5 text-[9.5pt] text-gray-700">
                {skills ? (
                  skills.split(',').map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">•</span> {skill.trim()}
                    </li>
                  ))
                ) : (
                  <div className="text-gray-400 flex flex-col gap-1.5">
                    <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Communication</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Problem Solving</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Time Management</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Teamwork</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Adaptability</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Attention to Detail</li>
                  </div>
                )}
              </ul>
            </div>
          </div>

          {visibleLanguages.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Languages</h3>
                <ul className="flex flex-col gap-1.5 text-[9.5pt] text-gray-700">
                  {visibleLanguages.map(lang => (
                    <li key={lang.id} className="flex flex-col break-inside-avoid mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800">{lang.name}</span>
                        <span className="text-gray-500 text-xs italic">{lang.proficiency}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full print:bg-slate-700"
                          style={{ width: `${getProficiencyPercentage(lang.proficiency)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {visibleHobbies.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Hobbies</h3>
                <ul className="flex flex-col gap-1.5 text-[9.5pt] text-gray-700">
                  {visibleHobbies.map(hobby => (
                    <li key={hobby.id} className="flex items-center gap-2 break-inside-avoid">
                      <span className="text-gray-400 text-xs">•</span> {hobby.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="cv-section">
            <hr className="border-t border-gray-300 mb-6" />
            <div>
              <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Education</h3>
              <div className="pl-1">
                <div className="border-l-[1px] border-gray-300 pl-4 space-y-5 py-1">
                  {visibleEducation.length > 0 ? (
                    visibleEducation.map(edu => (
                      <div key={edu.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">{edu.school}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-0.5">{edu.degree}</div>
                        <div className="text-[9pt] text-gray-500">{edu.startYear} - {edu.current ? 'Present' : edu.endYear}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">
                      <div className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-400 rounded-full" />
                        <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">BORCELLE SCHOOL</h4>
                        <div className="text-[9.5pt] text-gray-400 mb-0.5">Really Great High School</div>
                        <div className="text-[9pt] text-gray-400">2010 - 2014</div>
                      </div>
                      <div className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-400 rounded-full" />
                        <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">LICERIA OF TECHNOLOGY</h4>
                        <div className="text-[9.5pt] text-gray-400 mb-0.5">Really Great University</div>
                        <div className="text-[9pt] text-gray-400">2014 - 2016</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {visibleCourses.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Courses</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-4 space-y-4 py-1">
                    {visibleCourses.map(course => (
                      <div key={course.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">{course.title}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-0.5">{course.issuer}</div>
                        <div className="text-[9pt] text-gray-500">{course.startYear} - {course.current ? 'Present' : course.endYear}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {visibleExtracurriculars.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Extracurriculars</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-4 space-y-4 py-1">
                    {visibleExtracurriculars.map(extra => (
                      <div key={extra.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">{extra.title}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-0.5">{extra.issuer}</div>
                        <div className="text-[9pt] text-gray-500">{extra.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col gap-6 pl-2">
          
          <div className="cv-section">
            <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Summary</h3>
            <p className={`text-[10pt] leading-relaxed text-justify ${!personal?.bio ? 'text-gray-400' : 'text-gray-700'}`}>
              {bio}
            </p>
          </div>
          
          <div className="cv-section">
            <hr className="border-t border-gray-300 mb-6" />
            <div>
              <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Working Experience</h3>
              <div className="pl-1">
                <div className="border-l-[1px] border-gray-300 pl-5 space-y-6 py-1">
                  {visibleExperience.length > 0 ? (
                    visibleExperience.map(exp => (
                      <div key={exp.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{exp.role}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                          {exp.company} <span className="mx-2 text-gray-300">|</span> {exp.startYear} - {exp.current ? 'Present' : exp.endYear}
                        </div>
                        {exp.description && (
                          <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-relaxed">
                            {exp.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-/, '').trim()}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">
                      <div className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-400 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">MANAGED</h4>
                        <div className="text-[9.5pt] text-gray-400 mb-2 font-medium">
                          Ingoude Company <span className="mx-2 text-gray-300">|</span> 2016 - Present
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-400 leading-[1.6]">
                          <li>Expert at maintaining relations with corporate clients</li>
                          <li>Responsible for key accounts worth millions</li>
                          <li>Managed multi-platform regional and national campaigns</li>
                        </ul>
                      </div>
                      
                      <div className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-400 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">CREATED</h4>
                        <div className="text-[9.5pt] text-gray-400 mb-2 font-medium">
                          Arowwai Industries <span className="mx-2 text-gray-300">|</span> 2014 - 2016
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-400 leading-[1.6]">
                          <li>Expert at maintaining relations with corporate clients</li>
                          <li>Responsible for key accounts worth thousands</li>
                          <li>Managed multi-platform regional and national campaigns</li>
                        </ul>
                      </div>
                      
                      <div className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-400 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">IMPROVED</h4>
                        <div className="text-[9.5pt] text-gray-400 mb-2 font-medium">
                          Studio Shodwe <span className="mx-2 text-gray-300">|</span> 2010 - 2014
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-400 leading-[1.6]">
                          <li>Expert at maintaining relations with corporate clients</li>
                          <li>Together with the creative director, manage a team of design and marketing professionals</li>
                          <li>Managed multi-platform regional and national campaigns</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {visibleInternship.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Internship</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-5 space-y-6 py-1">
                    {visibleInternship.map(intern => (
                      <div key={intern.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{intern.role}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                          {intern.company} <span className="mx-2 text-gray-300">|</span> {intern.startYear} - {intern.current ? 'Present' : intern.endYear}
                        </div>
                        {intern.description && (
                          <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-relaxed">
                            {intern.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-/, '').trim()}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {visibleProjects.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Projects</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-5 space-y-6 py-1">
                    {visibleProjects.map(proj => (
                      <div key={proj.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{proj.title}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{proj.link}</a>
                        </div>
                        {proj.description && (
                          <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-relaxed">
                            {proj.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-/, '').trim()}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {visibleOrganization.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Organizations</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-5 space-y-6 py-1">
                    {visibleOrganization.map(org => (
                      <div key={org.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{org.role}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                          {org.name} <span className="mx-2 text-gray-300">|</span> {org.startYear} - {org.current ? 'Present' : org.endYear}
                        </div>
                        {org.description && (
                          <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-relaxed">
                            {org.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-/, '').trim()}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {visibleAwards.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Awards</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-5 space-y-4 py-1">
                    {visibleAwards.map(award => (
                      <div key={award.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{award.title}</h4>
                        <div className="text-[9.5pt] text-gray-700 mb-0.5">{award.issuer}</div>
                        <div className="text-[9pt] text-gray-500">{award.year}</div>
                        {award.description && <p className="text-[9.5pt] text-gray-700 mt-1">{award.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {visibleCertifications.length > 0 && (
            <div className="cv-section">
              <hr className="border-t border-gray-300 mb-6" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Certifications</h3>
                <div className="pl-1">
                  <div className="border-l-[1px] border-gray-300 pl-5 space-y-4 py-1">
                    {visibleCertifications.map(cert => (
                      <div key={cert.id} className="relative break-inside-avoid mb-4">
                        <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                        <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{cert.title}</h4>
                        {cert.description && <p className="text-[9.5pt] text-gray-700 mt-1">{cert.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
