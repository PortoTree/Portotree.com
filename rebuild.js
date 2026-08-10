const fs = require('fs');
let file = 'src/components/cv-builder/templates/ATSModern.tsx';
let code = fs.readFileSync(file, 'utf8');

const leftInsert1 = `          {visibleLanguages.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Languages</h3>
                <ul className="flex flex-col gap-1.5 text-[9.5pt] text-gray-700">
                  {visibleLanguages.map(lang => (
                    <li key={lang.id} className="flex justify-between items-center">
                      <span>{lang.name}</span>
                      <span className="text-gray-500 italic">{lang.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {visibleHobbies.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
              <div>
                <h3 className="text-[12pt] font-bold uppercase tracking-widest mb-4">Hobbies</h3>
                <ul className="flex flex-col gap-1.5 text-[9.5pt] text-gray-700">
                  {visibleHobbies.map(hobby => (
                    <li key={hobby.id} className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">•</span> {hobby.name}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

`;

const leftInsert2 = `          {visibleCourses.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
            </>
          )}

          {visibleExtracurriculars.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
            </>
          )}

`;

const rightInsert = `          {visibleInternship.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
                            {intern.description.replace(/<[^>]+>/g, '').split('\\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-\\s*/, '')}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {visibleProjects.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
                            {proj.description.replace(/<[^>]+>/g, '').split('\\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-\\s*/, '')}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {visibleOrganization.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
                            {org.description.replace(/<[^>]+>/g, '').split('\\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^-\\s*/, '')}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {visibleAwards.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
            </>
          )}

          {visibleCertifications.length > 0 && (
            <>
              <hr className="border-t border-gray-300" />
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
            </>
          )}

`;

// Insert variables at top
code = code.replace(/const visibleExperience = experience[^]+?;/, \`const visibleExperience = experience?.filter(item => !config.hiddenItems.includes(item.id)) || [];
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
\`);

// Insert leftInsert1 after Skills
code = code.replace(/<\/ul>\\s*<\/div>/, '</ul>\\n          </div>\\n\\n' + leftInsert1);

// Insert leftInsert2 after Education
code = code.replace(/(2014 - 2016<\/div>\\s*<\/div>\\s*<\/g>\\s*\}?\\s*<\/div>\\s*<\/div>\\s*<\/div>)/, '\$1\\n\\n' + leftInsert2);
// Wait, the regex for education end might be tricky. Let's just use a string replacement:
const eduEnd = \`                  </>
                )}
              </div>
            </div>
          </div>\`;
code = code.replace(eduEnd, eduEnd + '\\n\\n' + leftInsert2);

// Insert rightInsert after Experience
const expEnd = \`                    </div>
                  </>
                )}
              </div>
            </div>
          </div>\`;
code = code.replace(expEnd, expEnd + '\\n\\n' + rightInsert);

// Fix the issue the user mentioned: "hapus yang garis dibawah" 
// There is an <hr> at line 52 (header). But he said "di bawah hero ada 2 garis".
// The checkout restored the file to its original state, which doesn't have the 2 lines. Wait! The original state DOES have 2 lines?
// Let's remove the <hr> below the Contact/Summary if any exist, or remove the one below the header!
code = code.replace(/<hr className="border-t border-gray-300" \/>\\s*<\/div>\\s*\{\/\\* 2-COLUMN LAYOUT \\*\/\}/, '</div>\\n\\n      {/* 2-COLUMN LAYOUT */}');

fs.writeFileSync(file, code);
