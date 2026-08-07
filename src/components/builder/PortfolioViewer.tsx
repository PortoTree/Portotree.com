"use client";

import React from "react";
import { PortfolioData, placeholderPortfolioData } from "@/lib/portfolioData";
import { Mail, Phone, MapPin, ExternalLink, Code2, Briefcase, LinkIcon, Wrench, Layout, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

export function PortfolioViewer({ 
  data: rawData, 
  isMobilePreview,
  showPlaceholders = false,
  username
}: { 
  data: PortfolioData; 
  isMobilePreview?: boolean;
  showPlaceholders?: boolean;
  username?: string;
}) {
  const activeSections = rawData.activeSections || ['education', 'experience', 'organization', 'projects', 'social', 'skills'];

  const sortHistory = (arr: any[]) => {
    return [...arr].sort((a, b) => {
      const aEnd = a.current ? 9999 : parseInt(a.endYear || a.startYear || '0', 10);
      const bEnd = b.current ? 9999 : parseInt(b.endYear || b.startYear || '0', 10);
      if (aEnd !== bEnd) return bEnd - aEnd;
      const aStart = parseInt(a.startYear || '0', 10);
      const bStart = parseInt(b.startYear || '0', 10);
      return bStart - aStart;
    });
  };

  const data = {
    personal: {
      name: rawData.personal?.name || (showPlaceholders ? placeholderPortfolioData.personal.name : ""),
      headline: rawData.personal?.headline || (showPlaceholders ? placeholderPortfolioData.personal.headline : ""),
      bio: rawData.personal?.bio || (showPlaceholders ? placeholderPortfolioData.personal.bio : ""),
      email: rawData.personal?.email || (showPlaceholders ? placeholderPortfolioData.personal.email : ""),
      phone: rawData.personal?.phone || (showPlaceholders ? placeholderPortfolioData.personal.phone : ""),
      location: rawData.personal?.location || (showPlaceholders ? placeholderPortfolioData.personal.location : ""),
      photoUrl: rawData.personal?.photoUrl || (showPlaceholders ? placeholderPortfolioData.personal.photoUrl : ""),
      hireMeLink: rawData.personal?.hireMeLink || (showPlaceholders ? placeholderPortfolioData.personal.hireMeLink : ""),
    },
    social: ((rawData.social?.length ?? 0) > 0 ? rawData.social : (showPlaceholders && activeSections.includes('social') ? placeholderPortfolioData.social : [])) || [],
    experience: sortHistory(((rawData.experience?.length ?? 0) > 0 ? rawData.experience : (showPlaceholders && activeSections.includes('experience') ? placeholderPortfolioData.experience : [])) || []),
    education: sortHistory(((rawData.education?.length ?? 0) > 0 ? rawData.education : (showPlaceholders && activeSections.includes('education') ? placeholderPortfolioData.education : [])) || []),
    organization: sortHistory(((rawData.organization?.length ?? 0) > 0 ? rawData.organization : (showPlaceholders && activeSections.includes('organization') ? placeholderPortfolioData.organization : [])) || []),
    projects: ((rawData.projects?.length ?? 0) > 0 ? rawData.projects : (showPlaceholders && activeSections.includes('projects') ? placeholderPortfolioData.projects : [])) || [],
    certifications: ((rawData.certifications?.length ?? 0) > 0 ? rawData.certifications : (showPlaceholders && activeSections.includes('certifications') ? placeholderPortfolioData.certifications : [])) || [],
    awards: ((rawData.awards?.length ?? 0) > 0 ? rawData.awards : (showPlaceholders && activeSections.includes('awards') ? placeholderPortfolioData.awards : [])) || [],
    services: ((rawData.services?.length ?? 0) > 0 ? rawData.services : (showPlaceholders && activeSections.includes('services') ? placeholderPortfolioData.services : [])) || [],
    skills: rawData.skills || (showPlaceholders && activeSections.includes('skills') ? placeholderPortfolioData.skills : ""),
  };

  const skillsArray = (data.skills || "").split(",").map((s) => s.trim()).filter(Boolean);

  const BadgePlaceholder = () => (
    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ml-3 align-middle">
      Placeholder
    </span>
  );

  const isPlaceholder = {
    personal: data.personal.name === placeholderPortfolioData.personal.name,
    social: data.social === placeholderPortfolioData.social,
    experience: data.experience === placeholderPortfolioData.experience,
    education: data.education === placeholderPortfolioData.education,
    organization: data.organization === placeholderPortfolioData.organization,
    projects: data.projects === placeholderPortfolioData.projects,
    certifications: data.certifications === placeholderPortfolioData.certifications,
    awards: data.awards === placeholderPortfolioData.awards,
    services: data.services === placeholderPortfolioData.services,
    skills: data.skills === placeholderPortfolioData.skills,
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    // Only track if username is provided (meaning it's the live public page)
    if (!username) return;

    // Find closest anchor tag
    const target = (e.target as HTMLElement).closest('a');
    
    // Check if it's an external link or a meaningful action link (not an in-page anchor like #experience)
    if (target && target.href && !target.getAttribute('href')?.startsWith('#')) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, type: "click" }),
      }).catch(err => console.error("[Analytics] Failed to track click:", err));
    }
  };

  return (
    <div 
      className={`min-h-screen text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 ${
        isMobilePreview ? "bg-slate-50" : "bg-white"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
      onClick={handleGlobalClick}
    >
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className={`w-full px-4 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'px-8' : 'md:px-8'} h-16 flex items-center justify-between`}>
          <div className="font-bold text-xl tracking-tight text-slate-800 truncate pr-4">
            {data.personal.name || "Portofolio"}
          </div>
          <div className={`flex items-center gap-4 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'gap-6' : 'md:gap-6'} text-sm font-medium text-slate-600`}>
            <nav className={`${isMobilePreview === true ? 'hidden' : isMobilePreview === false ? 'flex' : 'hidden md:flex'} items-center gap-6`}>
              {data.services && data.services.length > 0 && <a href="#services" className="hover:text-emerald-600 transition-colors">Services</a>}
              {data.experience && data.experience.length > 0 && <a href="#experience" className="hover:text-emerald-600 transition-colors">Experience</a>}
              {data.education && data.education.length > 0 && <a href="#education" className="hover:text-emerald-600 transition-colors">Education</a>}
              {data.organization && data.organization.length > 0 && <a href="#organization" className="hover:text-emerald-600 transition-colors">Organization</a>}
              {data.projects && data.projects.length > 0 && <a href="#projects" className="hover:text-emerald-600 transition-colors">Projects</a>}
              {data.certifications && data.certifications.length > 0 && <a href="#certifications" className="hover:text-emerald-600 transition-colors">Certifications</a>}
              {data.awards && data.awards.length > 0 && <a href="#awards" className="hover:text-emerald-600 transition-colors">Awards</a>}
            </nav>
            {(data.personal.hireMeLink === 'whatsapp' ? data.personal.phone : data.personal.email) && (
              <a 
                href={
                  data.personal.hireMeLink === 'whatsapp' 
                    ? `https://wa.me/${data.personal.phone.replace(/\\D/g, '')}`
                    : `mailto:${data.personal.email}`
                }
                target={data.personal.hireMeLink === 'whatsapp' ? "_blank" : undefined}
                rel={data.personal.hireMeLink === 'whatsapp' ? "noopener noreferrer" : undefined}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors flex-shrink-0"
              >
                Hire Me
              </a>
            )}
          </div>
        </div>
      </header>

      {/* FULL WIDTH HERO SECTION */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="about" className="relative z-0 w-full pt-16 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        {/* Clearer Polka dots background with mask fade effect */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)',
            backgroundSize: '32px 32px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }}
        ></div>
        
        <div className={`max-w-5xl mx-auto px-4 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'px-6' : 'md:px-6'} flex ${isMobilePreview === true ? 'flex-col' : isMobilePreview === false ? 'flex-row' : 'flex-col md:flex-row'} ${isMobilePreview === true ? 'items-center' : isMobilePreview === false ? 'items-start' : 'items-center md:items-start'} gap-8 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'gap-12' : 'md:gap-12'}`}>
          
          {/* IMAGE FIRST ON MOBILE */}
          {data.personal.photoUrl && (
            <div className={`${isMobilePreview === true ? 'w-48 h-48' : isMobilePreview === false ? 'w-72 h-72 order-last' : 'w-40 h-40 md:w-72 md:h-72 md:order-last'} flex-shrink-0`}>
              <img 
                src={data.personal.photoUrl} 
                alt={data.personal.name} 
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
              />
            </div>
          )}

          <div className={`flex-1 space-y-4 ${isMobilePreview === true ? 'text-center' : isMobilePreview === false ? 'space-y-6 text-left' : 'md:space-y-6 text-center md:text-left'}`}>
            <h1 className={`${isMobilePreview === true ? 'text-4xl' : isMobilePreview === false ? 'text-6xl' : 'text-4xl md:text-6xl'} font-extrabold tracking-tight text-slate-900 leading-tight`}>
              Hi, I'm <span className="text-emerald-600">{data.personal.name}</span>
            </h1>
            <h2 className={`${isMobilePreview === true ? 'text-2xl' : isMobilePreview === false ? 'text-3xl' : 'text-xl md:text-3xl'} font-medium text-slate-500`}>
              {data.personal.headline}
            </h2>
            <div 
              className={`${isMobilePreview === true ? 'text-lg mx-auto' : isMobilePreview === false ? 'text-lg mx-0' : 'text-base md:text-lg mx-auto md:mx-0'} text-slate-600 leading-relaxed max-w-2xl [&_b]:font-bold [&_i]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-blue-600 [&_a]:underline`}
              dangerouslySetInnerHTML={{ __html: data.personal.bio }}
            />
            
            <div className={`flex flex-col items-center ${isMobilePreview === true ? '' : isMobilePreview === false ? 'items-start' : 'md:items-start'} gap-4 pt-4`}>
              {data.personal.location && (
                <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm border w-fit">
                  <MapPin size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium">{data.personal.location}</span>
                </div>
              )}
              
              <div className={`flex flex-wrap items-center justify-center gap-3 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'justify-start gap-4' : 'md:justify-start md:gap-4'}`}>
                {data.personal.email && (
                  <a href={`mailto:${data.personal.email}`} className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors">
                    <img src="/gmail.webp" alt="Gmail" className="w-5 h-5 object-contain" />
                    <span className={`hidden ${isMobilePreview === true ? '' : isMobilePreview === false ? 'inline' : 'md:inline'} text-sm font-medium`}>Email</span>
                  </a>
                )}
                {data.personal.phone && (
                  <a href={`https://wa.me/${data.personal.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors">
                    <img src="/whatsapp.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
                    <span className={`hidden ${isMobilePreview === true ? '' : isMobilePreview === false ? 'inline' : 'md:inline'} text-sm font-medium`}>WhatsApp</span>
                  </a>
                )}
                {data.social.map(social => {
                  let iconSrc = "/github.webp";
                  let hoverColor = "hover:text-emerald-600";
                  
                  if (social.platform === "GitHub") { iconSrc = "/github.webp"; hoverColor = "hover:text-slate-900"; }
                  else if (social.platform === "LinkedIn") { iconSrc = "/linkedin.webp"; hoverColor = "hover:text-emerald-600"; }
                  else if (social.platform === "Twitter") { iconSrc = "/twiter.webp"; hoverColor = "hover:text-sky-500"; }
                  else if (social.platform === "Instagram") { iconSrc = "/instagram.webp"; hoverColor = "hover:text-pink-600"; }
                  else if (social.platform === "Facebook") { iconSrc = "/facebook.webp"; hoverColor = "hover:text-blue-600"; }
                  else if (social.platform === "WhatsApp") { iconSrc = "/whatsapp.webp"; hoverColor = "hover:text-emerald-500"; }
                  else if (social.platform === "YouTube") { iconSrc = "/youtube.webp"; hoverColor = "hover:text-red-600"; }
                  else if (social.platform === "TikTok") { iconSrc = "/tiktok.webp"; hoverColor = "hover:text-slate-900"; }

                  return (
                    <a key={social.id} href={social.url} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-slate-500 transition-colors ${hoverColor} ${isPlaceholder.social ? 'grayscale opacity-60' : ''}`}>
                      <img src={iconSrc} alt={social.platform} className="w-5 h-5 object-contain" />
                      <span className={`hidden ${isMobilePreview === true ? '' : isMobilePreview === false ? 'inline' : 'md:inline'} text-sm font-medium`}>{social.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <main className={`max-w-5xl mx-auto px-4 py-8 space-y-16 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'px-6 py-20 space-y-24' : 'md:px-6 md:py-20 md:space-y-24'}`}>
        {/* SERVICES */}
        {data.services && data.services.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="services" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Services
                {isPlaceholder.services && <BadgePlaceholder />}
              </h3>
            </div>
            <div className={`grid grid-cols-1 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {data.services.map((service) => (
                <div key={service.id} className="group bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full">
                  <div className="flex-1 space-y-3">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{service.title}</h4>
                    {service.description && (
                      <div 
                        className="text-slate-600 leading-relaxed text-sm prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                    )}
                  </div>
                  {service.link && (
                    <div className="pt-6 mt-auto">
                      <a 
                        href={service.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-colors"
                      >
                        Contact Me <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* SKILLS */}
        {skillsArray.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <Wrench className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">
                Skills
                {isPlaceholder.skills && <BadgePlaceholder />}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillsArray.map((skill, i) => (
                <span 
                  key={i} 
                  className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 rounded-xl text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <span className="block w-2 h-2 min-w-[8px] min-h-[8px] rounded-full bg-emerald-500 group-hover:bg-emerald-600 group-hover:scale-125 transition-transform duration-300 shadow-sm" style={{ backgroundColor: '#10b981' }}></span>
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* EXPERIENCE */}
        {data.experience.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="experience" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <Briefcase className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">
                Experience
                {isPlaceholder.experience && <BadgePlaceholder />}
              </h3>
            </div>
            <div className="space-y-8 pl-2">
              {data.experience.map((exp, i) => (
                <div key={exp.id} className="relative border-l-2 border-emerald-200 pl-6 pb-2">
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-2 shadow-[0_0_0_4px_white]"></div>
                  <div className="space-y-2">
                    <div className={`flex flex-col ${isMobilePreview === true ? '' : isMobilePreview === false ? 'flex-row items-center' : 'md:flex-row md:items-center'} justify-between gap-2`}>
                      <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        {exp.startMonth} {exp.startYear} - {exp.current ? 'Sekarang' : `${exp.endMonth} ${exp.endYear}`}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-slate-600">
                      <h5 className="text-lg font-medium">{exp.company}</h5>
                      {exp.location && (
                        <>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="text-sm">{exp.location}</span>
                        </>
                      )}
                    </div>
                    {exp.description && (
                      <div 
                        className="text-slate-600 leading-relaxed pt-2 prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ORGANIZATION */}
        {data.organization && data.organization.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="organization" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <Users className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">
                Organization
                {isPlaceholder.organization && <BadgePlaceholder />}
              </h3>
            </div>
            <div className="space-y-8 pl-2">
              {data.organization.map((org, i) => (
                <div key={org.id} className="relative border-l-2 border-emerald-200 pl-6 pb-2">
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-2 shadow-[0_0_0_4px_white]"></div>
                  <div className="space-y-2">
                    <div className={`flex flex-col ${isMobilePreview === true ? '' : isMobilePreview === false ? 'flex-row items-center' : 'md:flex-row md:items-center'} justify-between gap-2`}>
                      <h4 className="text-xl font-bold text-slate-900">{org.role}</h4>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        {org.startMonth} {org.startYear} - {org.current ? 'Saat ini' : `${org.endMonth} ${org.endYear}`}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-slate-600">
                      <h5 className="text-lg font-medium">{org.name}</h5>
                      {org.location && (
                        <>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="text-sm">{org.location}</span>
                        </>
                      )}
                    </div>
                    {org.description && (
                      <div 
                        className="text-slate-600 leading-relaxed pt-2 prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: org.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* EDUCATION */}
        {data.education.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="education" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <GraduationCap className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">
                Education
                {isPlaceholder.education && <BadgePlaceholder />}
              </h3>
            </div>
            <div className="space-y-8 pl-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative border-l-2 border-emerald-200 pl-6 pb-2">
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-2 shadow-[0_0_0_4px_white]"></div>
                  <div className="space-y-2">
                    <div className={`flex flex-col ${isMobilePreview === true ? '' : isMobilePreview === false ? 'flex-row items-center' : 'md:flex-row md:items-center'} justify-between gap-2`}>
                      <h4 className="text-xl font-bold text-slate-900">{edu.school}</h4>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        {edu.startMonth} {edu.startYear} - {edu.current ? 'Sekarang' : `${edu.endMonth} ${edu.endYear}`}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-slate-600">
                      <h5 className="text-lg font-medium">{edu.degree} {edu.level ? `(${edu.level})` : ''}</h5>
                      {edu.location && (
                        <>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <span className="text-sm">{edu.location}</span>
                        </>
                      )}
                    </div>
                    {edu.description && (
                      <div 
                        className="text-slate-600 leading-relaxed pt-2 prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: edu.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* PROJECTS */}
        {data.projects.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="projects" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <Layout className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">
                Project preview
                {isPlaceholder.projects && <BadgePlaceholder />}
              </h3>
            </div>
            <div className={`grid grid-cols-1 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-3' : 'md:grid-cols-3'} gap-8`}>
              {data.projects.map((proj) => {
                let youtubeId = null;
                if (proj.videoUrl) {
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                  const match = proj.videoUrl.match(regExp);
                  youtubeId = (match && match[2].length === 11) ? match[2] : null;
                }
                
                return (
                <div key={proj.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {youtubeId ? (
                    <div className="h-48 overflow-hidden bg-slate-100 relative">
                      <iframe 
                        className="w-full h-full absolute inset-0" 
                        src={`https://www.youtube.com/embed/${youtubeId}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : proj.imageUrl ? (
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={proj.imageUrl} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-xl font-bold text-slate-900">{proj.title}</h4>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    <div 
                      className="text-slate-600 line-clamp-3 leading-relaxed prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />
                    {proj.techStack && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {proj.techStack.split(",").map((tech, i) => (
                          <span key={i} className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
              })}
            </div>
          </motion.section>
        )}

        {/* CERTIFICATIONS */}
        {data.certifications && data.certifications.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="certifications" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Certifications
                {isPlaceholder.certifications && <BadgePlaceholder />}
              </h3>
            </div>
            <div className={`grid grid-cols-1 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-2' : 'md:grid-cols-2'} gap-8`}>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {cert.imageUrl && (
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <h4 className="text-xl font-bold text-slate-900">{cert.title}</h4>
                    {cert.description && (
                      <div 
                        className="text-slate-600 line-clamp-3 leading-relaxed prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: cert.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* AWARDS */}
        {data.awards && data.awards.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} id="awards" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Awards
                {isPlaceholder.awards && <BadgePlaceholder />}
              </h3>
            </div>
            <div className={`grid grid-cols-1 ${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-2' : 'md:grid-cols-2'} gap-8`}>
              {data.awards.map((award) => (
                <div key={award.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {award.imageUrl && (
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={award.imageUrl} 
                        alt={award.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-slate-900">{award.title}</h4>
                      <p className="text-sm font-medium text-emerald-600">
                        {award.year} {award.issuer ? `• ${award.issuer}` : ''}
                      </p>
                    </div>
                    {award.description && (
                      <div 
                        className="text-slate-600 leading-relaxed pt-1 prose prose-sm max-w-none prose-emerald [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: award.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* FOOTER */}
      <motion.footer initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-emerald-50 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
          <div className="flex justify-center gap-6 mb-8">
              {data.personal.email && (
                <a href={`mailto:${data.personal.email}`} className="hover:opacity-80 transition-opacity" title="Email">
                  <img src="/gmail.webp" alt="Gmail" className="w-6 h-6 object-contain" />
                </a>
              )}
              {data.personal.phone && (
                <a href={`https://wa.me/${data.personal.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title="WhatsApp">
                  <img src="/whatsapp.webp" alt="WhatsApp" className="w-6 h-6 object-contain" />
                </a>
              )}
              {data.social.map(social => {
                let iconSrc = "/github.webp";
                if (social.platform === "GitHub") iconSrc = "/github.webp";
                else if (social.platform === "LinkedIn") iconSrc = "/linkedin.webp";
                else if (social.platform === "Twitter") iconSrc = "/twiter.webp";
                else if (social.platform === "Instagram") iconSrc = "/instagram.webp";
                else if (social.platform === "Facebook") iconSrc = "/facebook.webp";
                else if (social.platform === "WhatsApp") iconSrc = "/whatsapp.webp";
                else if (social.platform === "YouTube") iconSrc = "/youtube.webp";
                else if (social.platform === "TikTok") iconSrc = "/tiktok.webp";

                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title={social.platform}>
                    <img src={iconSrc} alt={social.platform} className="w-6 h-6 object-contain" />
                  </a>
                );
              })}
          </div>
          <p>© {new Date().getFullYear()} {data.personal.name}. Built with PortoTree.</p>
        </div>
      </motion.footer>
    </div>
  );
}
