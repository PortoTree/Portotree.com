import React from 'react';
import { CVDataPayload } from '@/lib/cvData';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export function ATSModern({ data }: { data: CVDataPayload }) {
  const { portfolio, config } = data;
  const { personal, experience, education, skills } = portfolio;
  
  const name = personal?.firstName || personal?.lastName 
    ? `${personal?.firstName || ''} ${personal?.lastName || ''}`.trim().toUpperCase()
    : personal?.name 
      ? personal?.name.toUpperCase()
      : "YOUR NAME";
      
  const headline = personal?.headline ? personal?.headline.toUpperCase() : "ATS FRIENDLY RESUME";
  const location = personal?.address || personal?.location || "123 Anywhere St., Any City";
  const phone = personal?.phone || "+123-456-7890";
  const email = personal?.email || "hello@reallygreatsite.com";
  const portfolioUrl = `portotree.com/p/username`;
  
  const bio = personal?.bio ? personal?.bio.replace(/<[^>]+>/g, '') : "Professional and results-driven candidate with a strong background in delivering high-quality work and achieving goals. Skilled in communication, problem-solving, and teamwork. Seeking opportunities to contribute value and grow within a dynamic organization.";

  const visibleExperience = experience?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  const visibleEducation = education?.filter(item => !config.hiddenItems.includes(item.id)) || [];
  
  return (
    <div 
      className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto text-black"
      style={{ 
        fontFamily: config.fontFamily || 'Arial, sans-serif', 
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
          
          {/* CONTACT */}
          <div>
            <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-[9.5pt] text-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><Phone size={12} /></div>
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><Mail size={12} /></div>
                <span className="break-all">{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><MapPin size={12} /></div>
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 text-white p-1 rounded-full"><Globe size={12} /></div>
                <span className="break-all">{portfolioUrl}</span>
              </div>
            </div>
          </div>
          
          <hr className="border-t border-gray-300" />

          {/* SKILLS */}
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
                <>
                  <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Communication</li>
                  <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Problem Solving</li>
                  <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Time Management</li>
                  <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Teamwork</li>
                  <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Adaptability</li>
                  <li className="flex items-center gap-2"><span className="text-gray-400 text-xs">•</span> Attention to Detail</li>
                </>
              )}
            </ul>
          </div>
          
          <hr className="border-t border-gray-300" />

          {/* EDUCATION */}
          <div>
            <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Education</h3>
            <div className="pl-1">
              <div className="border-l-[1px] border-gray-300 pl-4 space-y-5 py-1">
                {visibleEducation.length > 0 ? (
                  visibleEducation.map(edu => (
                    <div key={edu.id} className="relative">
                      <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">{edu.school}</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-0.5">{edu.degree}</div>
                      <div className="text-[9pt] text-gray-500">{edu.startYear} - {edu.current ? 'Present' : edu.endYear}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">BORCELLE SCHOOL</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-0.5">Really Great High School</div>
                      <div className="text-[9pt] text-gray-500">2010 - 2014</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[9.5pt] tracking-wider mb-0.5">LICERIA OF TECHNOLOGY</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-0.5">Really Great University</div>
                      <div className="text-[9pt] text-gray-500">2014 - 2016</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col gap-6 pl-2">
          
          {/* SUMMARY */}
          <div>
            <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Summary</h3>
            <p className="text-[10pt] text-gray-700 leading-relaxed text-justify">
              {bio}
            </p>
          </div>
          
          <hr className="border-t border-gray-300" />

          {/* WORKING EXPERIENCE */}
          <div>
            <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-5">Working Experience</h3>
            <div className="pl-1">
              <div className="border-l-[1px] border-gray-300 pl-5 space-y-6 py-1">
                {visibleExperience.length > 0 ? (
                  visibleExperience.map(exp => (
                    <div key={exp.id} className="relative">
                      <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">{exp.role}</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                        {exp.company} <span className="mx-2 text-gray-300">|</span> {exp.startYear} - {exp.current ? 'Present' : exp.endYear}
                      </div>
                      {exp.description && (
                        <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-relaxed">
                          {exp.description.replace(/<[^>]+>/g, '').split('\n').filter(Boolean).map((line, i) => (
                            <li key={i}>{line.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">MANAGED</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                        Ingoude Company <span className="mx-2 text-gray-300">|</span> 2016 - Present
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-[1.6]">
                        <li>Expert at maintaining relations with corporate clients</li>
                        <li>Responsible for key accounts worth millions</li>
                        <li>Managed multi-platform regional and national campaigns</li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">CREATED</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                        Arowwai Industries <span className="mx-2 text-gray-300">|</span> 2014 - 2016
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-[1.6]">
                        <li>Expert at maintaining relations with corporate clients</li>
                        <li>Responsible for key accounts worth thousands</li>
                        <li>Managed multi-platform regional and national campaigns</li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[24.5px] top-1.5 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="font-bold uppercase text-[10pt] tracking-wider mb-1">IMPROVED</h4>
                      <div className="text-[9.5pt] text-gray-700 mb-2 font-medium">
                        Studio Shodwe <span className="mx-2 text-gray-300">|</span> 2010 - 2014
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-[9.5pt] text-gray-700 leading-[1.6]">
                        <li>Expert at maintaining relations with corporate clients</li>
                        <li>Together with the creative director, manage a team of design and marketing professionals</li>
                        <li>Managed multi-platform regional and national campaigns</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
