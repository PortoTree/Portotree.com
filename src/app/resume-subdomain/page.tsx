"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Zap, Layout, Download, Type, Heading, Target, Globe2, Briefcase, GraduationCap, Paintbrush, FileSearch, Rocket } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ActionCTA } from "@/components/layout/ActionCTA";

// Templates
import { ATSClassic } from "@/components/cv-builder/templates/ATSClassic";
import { ATSModern } from "@/components/cv-builder/templates/ATSModern";
import { CreativeBlue } from "@/components/cv-builder/templates/CreativeBlue";
import { CreativePro } from "@/components/cv-builder/templates/CreativePro";
import { ProModern } from "@/components/cv-builder/templates/ProModern";

const baseTemplates = [
  { id: 1, title: "ATS Classic", type: "ATS", badgeClass: "bg-slate-900", desc: "Desain Minimalist" },
  { id: 2, title: "Pro Modern", type: "Kreatif", badgeClass: "bg-blue-600", desc: "Desain Korporat" },
  { id: 3, title: "Creative Blue", type: "Kreatif", badgeClass: "bg-blue-600", desc: "Desain Kreatif" },
  { id: 4, title: "ATS Modern", type: "ATS", badgeClass: "bg-slate-900", desc: "Desain Modern Minimal" },
  { id: 5, title: "Creative Pro", type: "Kreatif", badgeClass: "bg-blue-600", desc: "Desain Artistik" },
];

// Duplicate templates to create enough buffer for seamless infinite 3D scrolling
const templates = [...baseTemplates, ...baseTemplates.map(t => ({...t, id: t.id + 10}))];

const emptyData = {
  portfolio: {
    personal: null,
    experience: [],
    education: [],
    skills: "",
    hobbies: [],
    languages: [],
    certifications: [],
    projects: [],
    awards: [],
    organization: [],
    internship: [],
    courses: [],
    extracurriculars: []
  },
  config: {
    templateId: 1,
    color: '#000000',
    primaryColor: '#000000',
    font: 'inter',
    hiddenItems: []
  }
} as any;

const getTemplateRender = (title: string) => {
  const props = { data: emptyData, showPlaceholders: true };
  switch (title) {
    case "ATS Classic": return <ATSClassic {...props} />;
    case "Pro Modern": return <ProModern {...props} />;
    case "Creative Blue": return <CreativeBlue {...props} />;
    case "ATS Modern": return <ATSModern {...props} />;
    case "Creative Pro": return <CreativePro {...props} />;
    default: return null;
  }
};

export default function ResumeSubdomain() {
  const [currentIndex, setCurrentIndex] = useState(0); // Can grow infinitely

  // Calculate the actual active index in the array
  const activeItemIndex = ((currentIndex % templates.length) + templates.length) % templates.length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-[119px] pb-16 md:pt-20 md:pb-24">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-amber-50 rounded-full blur-3xl opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 z-0"></div>
        
        <div className="container relative z-10 px-6 sm:px-8 lg:px-16 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            <div className="flex-1 lg:order-1 lg:py-8 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                </span>
                Versi Beta Tersedia
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Tingkatkan Peluang Karirmu dengan <span className="text-amber-600">CV Standar ATS</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Buat CV profesional yang dioptimalkan untuk lolos seleksi HRD dalam hitungan menit. Sesuaikan dengan gaya dan industri Anda menggunakan PortoTree CV Builder.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
                <Button onClick={() => window.location.href = 'https://portotree.com/register'} className="h-14 px-8 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-base font-bold shadow-lg shadow-amber-600/20 transition-all hover:-translate-y-1 w-full sm:w-auto">
                  Buat CV Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">ATS Friendly</p>
                    <p className="text-xs text-slate-500">Lolos sistem filter HR</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Data Aman</p>
                    <p className="text-xs text-slate-500">Privasi terjaga 100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Hero */}
            <div className="w-full lg:flex-1 lg:order-2 flex justify-center lg:justify-end items-center relative">
              <div className="relative w-full max-w-[400px] aspect-[3/4] bg-white rounded-2xl shadow-2xl border border-slate-200 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* CV Image */}
                <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden">
                  <img src="/resume-modern.jpg" alt="Modern CV Template" className="w-full h-full object-cover object-top" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -left-6 top-20 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Skor ATS: 95%</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container px-6 sm:px-8 lg:px-16 mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kenapa Memilih PortoTree Resume?</h2>
            <p className="text-slate-600">Fokus pada apa yang penting, biarkan sistem kami yang mengurus format dan desain agar sesuai standar industri.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tembus Sistem ATS</h3>
              <p className="text-slate-600 leading-relaxed">
                Template kami dirancang agar mudah dibaca oleh sistem ATS (Applicant Tracking System), memastikan CV Anda masuk ke tahap selanjutnya.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Layout className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Struktur Profesional</h3>
              <p className="text-slate-600 leading-relaxed">
                Bukan sekadar desain cantik, tapi penempatan konten, margin, dan tipografi yang terbukti disukai para rekruter dan HRD.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ekspor Cepat ke PDF</h3>
              <p className="text-slate-600 leading-relaxed">
                Setelah selesai, cukup satu klik untuk mengunduh CV Anda dalam format PDF berkualitas tinggi, siap dikirim untuk melamar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section (3D Carousel Infinite) */}
      <section className="py-12 md:py-20 bg-white relative overflow-hidden">
        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-70"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pilihan Template <br className="md:hidden" /> Tersedia
            </h2>
            <p className="text-slate-600">Gunakan desain yang sudah teruji dan sesuai dengan standar perusahaan modern.</p>
          </div>
          
          <div className="relative h-[420px] w-full flex items-center justify-center max-w-5xl mx-auto" style={{ perspective: 1000 }}>
            {templates.map((template, index) => {
              // Calculate shortest distance in a circle of length 10
              let offset = index - activeItemIndex;
              if (offset > 5) offset -= 10;
              if (offset < -5) offset += 10;
              
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              
              // Only render if it's within the visible range (-2 to +2) or just outside (-3 to +3 for smooth fade)
              if (absOffset > 3) return null;

              return (
                <motion.div
                  key={template.id}
                  className="absolute w-[260px] h-[380px] cursor-pointer"
                  initial={false}
                  animate={{
                    x: `${offset * 70}%`, // Move sideways
                    scale: isCenter ? 1 : 1 - (absOffset * 0.15), // Scale down based on distance
                    zIndex: 30 - absOffset,
                    opacity: absOffset > 1 ? (absOffset > 2 ? 0 : 0.3) : (isCenter ? 1 : 0.7),
                    rotateY: offset * -15, // 3D tilt effect
                    pointerEvents: absOffset > 2 ? 'none' : 'auto'
                  }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.1 }}
                  onClick={() => {
                    // Navigate to the clicked item
                    setCurrentIndex(currentIndex + offset);
                  }}
                >
                  <div className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xl h-full flex flex-col transition-all hover:border-amber-300">
                    <div className="relative aspect-[3/4] bg-slate-100 flex-1 overflow-hidden">
                      <div className="absolute inset-0 origin-top-left pointer-events-none select-none" style={{ width: '794px', height: '1122px', transform: 'scale(0.327)' }}>
                        <div className="w-[210mm] h-[297mm] bg-white overflow-hidden [&_.text-gray-400]:!text-slate-800 [&_.opacity-70]:!opacity-100 [&_.grayscale]:!grayscale-0">
                          {getTemplateRender(template.title)}
                        </div>
                      </div>
                      <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm z-10 ${template.badgeClass}`}>
                        {template.type}
                      </span>
                    </div>
                    <div className="p-4 mt-auto bg-white border-t border-slate-100 text-center">
                      <h4 className="font-bold text-slate-900">{template.title}</h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button 
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shadow-sm"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="flex gap-2">
              {baseTemplates.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${idx === (activeItemIndex % baseTemplates.length) ? 'w-6 bg-amber-500' : 'w-2 bg-slate-200'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors shadow-sm"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* Action Button */}
          <div className="flex justify-center mt-12">
            <Button onClick={() => window.location.href = 'https://portotree.com/resume/template'} className="h-14 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-base font-bold shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1">
              Eksplor Semua Template
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Perbedaan CV dan Resume Section */}
      <section className="py-12 md:py-24 bg-white border-t border-slate-100">
        <div className="container px-6 sm:px-8 lg:px-16 mx-auto max-w-5xl">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Apa Perbedaan CV dan Resume?</h2>
            <p className="text-lg text-slate-600">
              Meskipun sering dianggap serupa, keduanya memiliki karakteristik yang berbeda jika dilihat dari standar secara global:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-600 mb-4">CV (Curriculum Vitae)</h3>
              <p className="text-slate-600 leading-relaxed">
                Cenderung bersifat kronologis dan sangat detail. Isinya mencakup seluruh riwayat hidup secara mendalam, sehingga panjangnya bisa mencapai berlembar-lembar.
              </p>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-emerald-600 mb-4">Resume</h3>
              <p className="text-slate-600 leading-relaxed">
                Merupakan ringkasan singkat (biasanya hanya 1-2 halaman) yang isinya telah disesuaikan dengan posisi yang dilamar. Fokusnya hanya pada informasi yang paling relevan.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex gap-4 items-start shadow-sm">
             <div className="w-1.5 bg-amber-400 self-stretch rounded-full shrink-0"></div>
             <p className="text-slate-700 leading-relaxed">
               <strong className="text-amber-900 font-bold">Fakta Unik di Indonesia:</strong> Di dunia kerja Indonesia, kedua istilah ini sering dianggap sama. Meskipun perusahaan menyebutnya &quot;CV&quot;, biasanya yang mereka harapkan adalah dokumen dalam format resume yang ringkas dan padat informasi.
             </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="container px-6 sm:px-8 lg:px-16 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Buat CV profesional dalam 3 langkah</h2>
            <p className="text-lg text-slate-600">Dari template ke lamaran — cepat, mudah, ATS-friendly</p>
          </div>

          <div className="relative">
            {/* Dashed line connecting steps (desktop only) */}
            <div className="hidden md:block absolute top-5 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-slate-300 z-0"></div>
            {/* Dashed line connecting steps (mobile only) */}
            <div className="md:hidden absolute top-5 bottom-20 left-1/2 -translate-x-1/2 w-[2px] border-l-2 border-dashed border-slate-200 z-0"></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 text-lg font-bold flex items-center justify-center mb-6 relative z-10 shadow-sm ring-4 ring-slate-50">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Pilih Template</h3>
                <p className="text-slate-600 mb-8 min-h-[48px] max-w-[250px] mx-auto">Koleksi template ATS-friendly dirancang oleh ahli.</p>
                
                {/* Mockup Card */}
                <div className="w-full max-w-[300px] mx-auto bg-white rounded-2xl p-4 shadow-sm border border-slate-200 h-64 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3 text-slate-700 font-bold text-sm">
                    <Layout className="w-4 h-4 text-amber-600" /> Galeri Desain
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-3 flex flex-col gap-2 relative overflow-hidden">
                     {/* New Content for Step 1: Template Grid */}
                     <div className="grid grid-cols-2 gap-2 h-full">
                       <div className="bg-white border border-slate-200 rounded shadow-sm p-2 flex flex-col gap-1 hover:border-amber-400">
                         <div className="w-full h-2 bg-slate-200 rounded-full mb-1"></div>
                         <div className="w-3/4 h-1 bg-slate-100 rounded-full"></div>
                         <div className="w-1/2 h-1 bg-slate-100 rounded-full"></div>
                       </div>
                       <div className="bg-white border-2 border-amber-400 rounded shadow-sm p-2 flex flex-col gap-1 relative">
                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 className="w-2 h-2" /></div>
                         <div className="w-full h-2 bg-amber-100 rounded-full mb-1"></div>
                         <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                         <div className="w-2/3 h-1 bg-slate-100 rounded-full"></div>
                       </div>
                       <div className="bg-white border border-slate-200 rounded shadow-sm p-2 flex flex-col gap-1">
                         <div className="w-1/2 h-2 bg-slate-200 rounded-full mb-1"></div>
                         <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                         <div className="w-4/5 h-1 bg-slate-100 rounded-full"></div>
                       </div>
                       <div className="bg-white border border-slate-200 rounded shadow-sm p-2 flex flex-col gap-1">
                         <div className="w-full h-2 bg-slate-200 rounded-full mb-1"></div>
                         <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                         <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 text-lg font-bold flex items-center justify-center mb-6 relative z-10 shadow-sm ring-4 ring-slate-50">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Isi Informasi</h3>
                <p className="text-slate-600 mb-8 min-h-[48px] max-w-[250px] mx-auto">AI bantu tulis konten pengalaman & skill lebih baik.</p>
                
                {/* Mockup Card */}
                <div className="w-full max-w-[300px] mx-auto bg-white rounded-2xl p-4 shadow-sm border border-slate-200 h-64 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3 text-slate-700 font-bold text-sm">
                    <FileText className="w-4 h-4 text-amber-600" /> Profil Karir
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-3 flex flex-col relative">
                     {/* New Content for Step 2: Completion Progress & Skeleton */}
                     <div className="flex items-center justify-between mb-1">
                       <span className="text-[10px] font-bold text-slate-500">Kelengkapan</span>
                       <span className="text-[10px] font-bold text-amber-600">80%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-200 rounded-full mb-4">
                       <div className="h-full bg-amber-500 rounded-full w-4/5"></div>
                     </div>
                     
                     <div className="space-y-2 flex-1">
                       <div className="w-full bg-white p-2 border border-slate-200 rounded shadow-sm flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-slate-400" /></div>
                         <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                       </div>
                       <div className="w-full bg-amber-50 p-2 border border-amber-200 rounded shadow-sm flex flex-col gap-1.5 relative">
                         <div className="absolute top-1 right-1"><Zap className="w-3 h-3 text-amber-500" /></div>
                         <div className="w-1/3 h-2 bg-amber-200 rounded-full"></div>
                         <div className="w-full h-1 bg-amber-100 rounded-full"></div>
                         <div className="w-4/5 h-1 bg-amber-100 rounded-full"></div>
                       </div>
                     </div>
                     
                     <div className="w-full h-8 bg-amber-600 rounded text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm mt-3 hover:bg-amber-700 transition-colors cursor-default">
                        <Zap className="w-3 h-3 fill-current" /> Optimasi
                     </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 text-lg font-bold flex items-center justify-center mb-6 relative z-10 shadow-sm ring-4 ring-slate-50">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Download & Lamar</h3>
                <p className="text-slate-600 mb-8 min-h-[48px] max-w-[250px] mx-auto">Unduh CV profesional dan mulai lamar pekerjaan impian.</p>
                
                {/* Mockup Card */}
                <div className="w-full max-w-[300px] mx-auto bg-white rounded-2xl p-4 shadow-sm border border-slate-200 h-64 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3 text-slate-700 font-bold text-sm">
                    <Download className="w-4 h-4 text-amber-600" /> Siap Dikirim
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-4 flex flex-col items-center justify-center relative">
                     {/* New Content for Step 3: Document Icon with success tag */}
                     <div className="w-14 h-16 bg-white border-2 border-slate-200 rounded-lg shadow-sm mb-4 relative flex flex-col p-2">
                        <div className="w-full h-1.5 bg-amber-100 rounded-full mb-1.5"></div>
                        <div className="w-full h-1 bg-slate-100 rounded-full mb-1"></div>
                        <div className="w-3/4 h-1 bg-slate-100 rounded-full mb-2"></div>
                        <div className="w-full h-1 bg-slate-100 rounded-full mb-1"></div>
                        <div className="w-full h-1 bg-slate-100 rounded-full mb-1"></div>
                        
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                     </div>
                     <div className="text-xs font-bold text-slate-700 mb-1">Resume_Pro.pdf</div>
                     <div className="text-[10px] text-slate-500 mb-4">124 KB • Format ATS</div>
                     
                     <div className="w-full bg-green-50 rounded border border-green-200 py-1.5 px-3 flex items-center justify-center gap-1.5">
                       <CheckCircle2 className="w-3 h-3 text-green-600" />
                       <span className="text-[10px] font-bold text-green-700">Tersimpan</span>
                     </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <section className="py-12 md:py-24 bg-white border-t border-slate-100">
        <div className="container px-6 sm:px-8 lg:px-16 mx-auto max-w-4xl text-slate-700">
          
          {/* Header & Intro */}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Cara Membuat <span className="text-amber-600">CV ATS Friendly</span> & CV Kreatif yang Dilirik HRD
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8"></div>
            <p className="text-lg leading-relaxed text-slate-600 mb-4 text-left">
              Pernahkah kamu merasa sudah mengirim puluhan lamaran kerja tapi tidak kunjung mendapat panggilan wawancara? Bisa jadi, masalahnya bukan pada kualifikasi yang kamu miliki, melainkan pada format CV yang kamu gunakan.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 text-left">
              Di era digital saat ini, memahami perbedaan antara <strong>CV ATS friendly</strong> dan <strong>CV kreatif</strong> adalah kunci utama untuk menembus ketatnya persaingan dunia kerja. Artikel ini akan mengupas tuntas cara membuat CV yang tidak hanya menarik secara visual, tetapi juga &quot;sakti&quot; saat berhadapan dengan sistem seleksi otomatis perusahaan.
            </p>
          </div>

          {/* Apa itu ATS */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Apa Itu CV ATS Friendly dan Mengapa Sangat Penting?</h3>
            <p className="leading-relaxed mb-6">
              ATS atau <em>Applicant Tracking System</em> adalah perangkat lunak yang digunakan oleh recruiter untuk menyaring ribuan lamaran secara otomatis. Sistem ini bekerja dengan cara memindai format CV dan mencari <em>keyword</em> yang relevan dengan deskripsi pekerjaan. Jika CV kamu tidak bisa terbaca oleh sistem ini, lamaranmu akan langsung gugur sebelum sempat dilihat oleh mata manusia.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <FileSearch className="w-5 h-5" /> Cara Cek Skor CV ATS
              </h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                Pastikan kamu menggunakan format teks yang bersih, tanpa tabel yang rumit, dan menggunakan keyword resume yang tepat sesuai bidang pekerjaanmu. Buka file PDF CV, copy-paste ke Notepad — jika teks terbaca dengan urutan benar, CV kamu kemungkinan besar sudah ATS friendly.
              </p>
            </div>
          </div>

          {/* Tutorial ATS */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tutorial Cara Membuat CV ATS Friendly</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Type className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-blue-600 mb-1">LANGKAH 01</div>
                <h4 className="font-bold text-slate-900 mb-2">Pilih Font yang Standar</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Gunakan font yang mudah dibaca oleh mesin seperti Arial, Calibri, atau Times New Roman. Hindari font dekoratif.</p>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Heading className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-600 mb-1">LANGKAH 02</div>
                <h4 className="font-bold text-slate-900 mb-2">Gunakan Struktur Heading yang Jelas</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Bagi bagian CV dengan judul jelas seperti "Pengalaman Kerja", "Pendidikan", dan "Keahlian" untuk membantu robot melakukan klasifikasi data.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-600 mb-1">LANGKAH 03</div>
                <h4 className="font-bold text-slate-900 mb-2">Masukkan Skill yang Spesifik</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Jangan hanya menulis "bisa bekerja di bawah tekanan". Masukkan hard skill spesifik seperti "Google Ads", "TikTok Ads", atau "SEO Copywriting".</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-purple-600 mb-1">LANGKAH 04</div>
                <h4 className="font-bold text-slate-900 mb-2">Gunakan Bahasa yang Konsisten</h4>
                <p className="text-sm text-slate-600 leading-relaxed">Jika mengincar posisi di perusahaan global, pastikan bahasa yang digunakan konsisten — baik full Bahasa Indonesia atau full Bahasa Inggris.</p>
              </div>
            </div>
          </div>

          {/* Perbandingan ATS vs Kreatif */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Perbedaan CV ATS Friendly dan CV Kreatif</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-slate-200 rounded-2xl p-8 bg-white">
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-slate-500" /> CV ATS Friendly
                </h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> Tampilan sederhana, teks dominan</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> Dibaca oleh robot (software ATS)</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> Cocok untuk perusahaan besar, BUMN, Tech Startup</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> Format PDF atau Docx</li>
                </ul>
              </div>
              <div className="border-2 border-amber-200 rounded-2xl p-8 bg-amber-50/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Paintbrush className="w-32 h-32 text-amber-500" /></div>
                <h4 className="text-lg font-bold text-amber-700 flex items-center gap-2 mb-6 relative z-10">
                  <Paintbrush className="w-5 h-5" /> CV Kreatif
                </h4>
                <ul className="space-y-4 text-sm relative z-10">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Visual menonjol, ada elemen grafis/ikon</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Dibaca langsung oleh manusia</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Cocok untuk industri kreatif, startup kecil, agensi</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Umumnya format PDF</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kapan menggunakan CV Kreatif */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-12 md:mb-20 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-20"></div>
            <h3 className="text-2xl font-bold mb-4">CV Kreatif: Kapan Harus Menggunakannya?</h3>
            <p className="text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Berbeda dengan format ATS yang minimalis, CV kreatif lebih mengutamakan estetika dan desain yang tetap profesional. Gunakan CV kreatif saat:
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                <Paintbrush className="w-8 h-8 text-amber-400 mb-3" />
                <p className="text-sm font-medium">Melamar ke agensi periklanan atau media kreatif.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                <Briefcase className="w-8 h-8 text-amber-400 mb-3" />
                <p className="text-sm font-medium">Posisi sebagai Desainer Grafis, Content Creator, atau Social Media Manager.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
                <Target className="w-8 h-8 text-amber-400 mb-3" />
                <p className="text-sm font-medium">Mengirimkan lamaran langsung atau melalui pesan personal ke recruiter.</p>
              </div>
            </div>
          </div>

          {/* Tips Fresh Grad */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tips untuk Fresh Graduate & Mahasiswa Magang</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">CV Kreatif untuk Magang</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Fokus pada proyek kuliah atau portofolio yang pernah kamu buat untuk menunjukkan potensi dan kreativitasmu.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">CV ATS Fresh Graduate</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Tonjolkan <em>transferable skills</em> seperti kepemimpinan organisasi, sertifikasi online, atau pengabdian masyarakat.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rahasia PortoTree */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 mb-12 md:mb-16 text-white shadow-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4" /> Kurang dari 5 Menit
            </div>
            <h3 className="text-3xl font-bold mb-8">Rahasia Membuat CV Profesional dengan PortoTree</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Format Terstandarisasi</strong>
                  <p className="text-amber-100 text-sm leading-relaxed">Template CV ATS friendly yang sudah diuji untuk lolos sistem screening.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Instan & Mudah</strong>
                  <p className="text-amber-100 text-sm leading-relaxed">Cukup isi data diri, pengalaman, dan keahlian. Sistem membuatkan CV profesional secara otomatis.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Fleksibel</strong>
                  <p className="text-amber-100 text-sm leading-relaxed">Beralih dari format ATS ke CV kreatif kapan saja di satu platform.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Optimasi Keyword</strong>
                  <p className="text-amber-100 text-sm leading-relaxed">PortoTree membantu menyusun struktur informasi agar CV lebih berbobot di mata recruiter.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kesimpulan */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Mana yang Kamu Pilih?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Memahami perbedaan CV ATS friendly dan CV kreatif adalah langkah awal menuju kesuksesan karirmu. Jika kamu melamar ke perusahaan korporat besar, gunakanlah format ATS. Namun, jika kamu ingin menunjukkan sisi artistikmu di industri kreatif, CV yang menarik secara visual adalah jawabannya.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium">
              Hal yang terpenting bukan hanya soal desain, tapi bagaimana kamu memasukkan keywords yang tepat dan menunjukkan nilai dirimu kepada perusahaan.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="container px-6 sm:px-8 lg:px-16 mx-auto max-w-5xl">
          <div className="relative bg-amber-600 rounded-[2.5rem] p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            {/* Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-amber-100 mb-6 drop-shadow-md">
                 <Rocket className="w-12 h-12" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Siap Melamar Pekerjaan Impian Anda?</h2>
              
              <p className="text-lg text-amber-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                Bergabunglah dengan ribuan profesional lain yang telah meningkatkan peluang panggilan interview mereka menggunakan CV dari PortoTree.
              </p>
              
              <Button onClick={() => window.location.href = 'https://portotree.com/register'} size="lg" className="bg-white hover:bg-slate-50 text-amber-600 font-bold px-8 h-14 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                Mulai Buat CV Gratis <FileText className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ActionCTA />

      <Footer />
    </div>
  );
}
