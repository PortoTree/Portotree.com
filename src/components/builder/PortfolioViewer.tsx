"use client";

import React from "react";
import { PortfolioData } from "@/lib/portfolioData";
import { Mail, Phone, MapPin, ExternalLink, Code2, Briefcase, LinkIcon, Wrench, Layout } from "lucide-react";

export function PortfolioViewer({ data, isMobilePreview = false }: { data: PortfolioData; isMobilePreview?: boolean }) {
  const skillsArray = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-800 truncate pr-4">
            {data.personal.name || "Portfolio"}
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-sm font-medium text-slate-600">
            <nav className={`${isMobilePreview ? 'hidden' : 'hidden md:flex'} items-center gap-6`}>
              <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
              <a href="#experience" className="hover:text-emerald-600 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-emerald-600 transition-colors">Projects</a>
            </nav>
            {data.personal.email && (
              <a 
                href={`mailto:${data.personal.email}`}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors flex-shrink-0"
              >
                Hire Me
              </a>
            )}
          </div>
        </div>
      </header>

      <main className={`max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-20 space-y-16 ${isMobilePreview ? 'space-y-16' : 'md:space-y-24'}`}>
        {/* HERO SECTION */}
        <section id="about" className={`flex ${isMobilePreview ? 'flex-col' : 'flex-col md:flex-row'} items-center gap-8 ${isMobilePreview ? '' : 'md:gap-12'} pt-4 ${isMobilePreview ? '' : 'md:pt-8'}`}>
          
          {/* IMAGE FIRST ON MOBILE */}
          {data.personal.photoUrl && (
            <div className={`${isMobilePreview ? 'w-48 h-48' : 'w-40 h-40 md:w-72 md:h-72 md:order-last'} flex-shrink-0`}>
              <img 
                src={data.personal.photoUrl} 
                alt={data.personal.name} 
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
              />
            </div>
          )}

          <div className={`flex-1 space-y-4 ${isMobilePreview ? 'text-center' : 'md:space-y-6 text-center md:text-left'}`}>
            <h1 className={`${isMobilePreview ? 'text-4xl' : 'text-4xl md:text-6xl'} font-extrabold tracking-tight text-slate-900 leading-tight`}>
              Hi, I'm <span className="text-emerald-600">{data.personal.name}</span>
            </h1>
            <h2 className={`${isMobilePreview ? 'text-2xl' : 'text-xl md:text-3xl'} font-medium text-slate-500`}>
              {data.personal.headline}
            </h2>
            <p className={`${isMobilePreview ? 'text-lg mx-auto' : 'text-base md:text-lg mx-auto md:mx-0'} text-slate-600 leading-relaxed max-w-2xl`}>
              {data.personal.bio}
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-4 pt-4">
              {data.personal.location && (
                <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm border w-fit">
                  <MapPin size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium">{data.personal.location}</span>
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
                {data.personal.email && (
                  <a href={`mailto:${data.personal.email}`} className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors">
                    <img src="/gmail.webp" alt="Gmail" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">Email</span>
                  </a>
                )}
                {data.personal.phone && (
                  <a href={`https://wa.me/${data.personal.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors">
                    <img src="/whatsapp.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">WhatsApp</span>
                  </a>
                )}
                {data.social.github && (
                  <a href={data.social.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors">
                    <img src="/github.webp" alt="GitHub" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">GitHub</span>
                  </a>
                )}
                {data.social.linkedin && (
                  <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors">
                    <img src="/linkedin.webp" alt="LinkedIn" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">LinkedIn</span>
                  </a>
                )}
                {data.social.twitter && (
                  <a href={data.social.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-sky-500 transition-colors">
                    <img src="/twiter.webp" alt="Twitter" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">Twitter</span>
                  </a>
                )}
                {data.social.instagram && (
                  <a href={data.social.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-pink-600 transition-colors">
                    <img src="/instagram.webp" alt="Instagram" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">Instagram</span>
                  </a>
                )}
                {data.social.facebook && (
                  <a href={data.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
                    <img src="/facebook.webp" alt="Facebook" className="w-5 h-5 object-contain" />
                    <span className="hidden md:inline text-sm font-medium">Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        {skillsArray.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <Wrench className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillsArray.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {data.experience.length > 0 && (
          <section id="experience" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <Briefcase className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">Experience</h3>
            </div>
            <div className="space-y-8 pl-2">
              {data.experience.map((exp, i) => (
                <div key={exp.id} className="relative border-l-2 border-emerald-200 pl-6 pb-2">
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-2 shadow-[0_0_0_4px_white]"></div>
                  <div className="space-y-2">
                    <div className={`flex flex-col ${isMobilePreview ? '' : 'md:flex-row md:items-center'} justify-between gap-2`}>
                      <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <h5 className="text-lg font-medium text-slate-600">{exp.company}</h5>
                    <p className="text-slate-600 leading-relaxed pt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects.length > 0 && (
          <section id="projects" className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4">
              <Layout className="text-emerald-600" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">Project preview</h3>
            </div>
            <div className={`grid grid-cols-1 ${isMobilePreview ? '' : 'md:grid-cols-3'} gap-8`}>
              {data.projects.map((proj) => (
                <div key={proj.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  {proj.imageUrl && (
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={proj.imageUrl} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-xl font-bold text-slate-900">{proj.title}</h4>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
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
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
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
              {data.social.github && (
                <a href={data.social.github} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title="GitHub">
                  <img src="/github.webp" alt="GitHub" className="w-6 h-6 object-contain" />
                </a>
              )}
              {data.social.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title="LinkedIn">
                  <img src="/linkedin.webp" alt="LinkedIn" className="w-6 h-6 object-contain" />
                </a>
              )}
              {data.social.twitter && (
                <a href={data.social.twitter} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title="Twitter">
                  <img src="/twiter.webp" alt="Twitter" className="w-6 h-6 object-contain" />
                </a>
              )}
              {data.social.instagram && (
                <a href={data.social.instagram} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title="Instagram">
                  <img src="/instagram.webp" alt="Instagram" className="w-6 h-6 object-contain" />
                </a>
              )}
              {data.social.facebook && (
                <a href={data.social.facebook} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" title="Facebook">
                  <img src="/facebook.webp" alt="Facebook" className="w-6 h-6 object-contain" />
                </a>
              )}
          </div>
          <p>© {new Date().getFullYear()} {data.personal.name}. Built with PortoTree.</p>
        </div>
      </footer>
    </div>
  );
}
