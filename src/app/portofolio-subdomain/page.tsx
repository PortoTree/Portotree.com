"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LayoutTemplate, Link as LinkIcon, QrCode, FileText, Globe, Share2, Eye, Briefcase, ChevronLeft, ChevronRight, Rocket, CheckCircle2, Layout } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { PortfolioViewer } from "@/components/builder/PortfolioViewer";
import { placeholderPortfolioData } from "@/lib/portfolioData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const targetAudienceRef = useRef<HTMLDivElement>(null);
  const words = ["Identitas", "Karier", "Branding"];

  const scrollTargetAudience = (direction: "left" | "right") => {
    if (targetAudienceRef.current) {
      const scrollAmount = direction === "left" ? -window.innerWidth * 0.8 : window.innerWidth * 0.8;
      targetAudienceRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col justify-center pt-32 pb-16 lg:pt-40 lg:pb-20 text-left overflow-hidden">
          <div className="absolute inset-0 magicpattern z-[-1]"></div>
          
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
            >
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background shadow-sm border text-sm font-medium text-green-600 w-fit">
                  <Globe className="w-4 h-4" />
                  <span>Personal Portofolio Online</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground flex flex-col">
                  <span>Bangun portofolio menarikmu untuk</span>
                  <span className="inline-grid mt-2">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={words[wordIndex % words.length]}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="col-start-1 row-start-1 text-left text-green-600"
                      >
                        {words[wordIndex % words.length]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Siapkan personal branding-mu hari ini. Buat portofolio online dalam 10 menit dan bagikan ke recruiter atau klien melalui satu link secara gratis selamanya.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center w-full md:w-auto gap-4 mt-8 md:mt-0 md:-translate-y-6 md:-translate-x-8 lg:-translate-x-16">
                <style>{`
                  @keyframes blob-shape {
                    0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
                    50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
                  }
                  .animate-blob-shape {
                    animation: blob-shape 4s infinite ease-in-out alternate;
                  }
                `}</style>
                <div className="relative group flex items-center justify-center">
                  <div className="absolute inset-0 animate-ping">
                    <div className="w-full h-full bg-green-500 opacity-75 animate-blob-shape"></div>
                  </div>
                  <Link href="https://portotree.com/register" className="relative z-10 w-32 h-32 p-0 text-lg font-bold animate-blob-shape flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(22,163,74,0.5)] hover:shadow-[0_0_50px_rgba(22,163,74,0.7)] bg-green-600 hover:bg-green-500 text-white border-0 outline-none select-none">
                    <span className="leading-tight">Mulai</span>
                    <span className="leading-tight">Gratis</span>
                    <ArrowRight className="mt-1 h-6 w-6 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-24 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-green-600" />
                  <p className="text-4xl font-bold text-foreground">1,000+</p>
                </div>
                <p className="text-base text-muted-foreground font-medium mt-1">Portofolio Dibuat</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <Share2 className="w-8 h-8 text-green-600" />
                  <p className="text-4xl font-bold text-foreground">88%</p>
                </div>
                <p className="text-base text-muted-foreground font-medium mt-1">Rasio Berbagi</p>
              </div>
            </motion.div>
          </div>
          
          {/* MOCKUP PLACEHOLDERS - Moved outside padded container for true full-bleed */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 pt-10 flex flex-row items-center md:items-end justify-start md:justify-center gap-6 md:gap-8 w-full pb-16 overflow-x-auto snap-x snap-mandatory custom-scrollbar"
          >
            {/* Spacer for left alignment */}
            <div className="w-0 sm:w-2 md:w-[calc((100vw-72rem)/2)] shrink-0 max-w-[max(1.5rem,calc((100vw-80rem)/2))]"></div>

            {/* Mobile Mockup */}
            <div className="w-[200px] md:w-[260px] shrink-0 rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-slate-200 bg-white shadow-2xl overflow-hidden aspect-[9/19] flex flex-col relative snap-center ml-6 md:ml-0">
               {/* Dynamic Island */}
               <div className="absolute top-0 w-full flex justify-center pt-1.5 md:pt-2 z-20">
                  <div className="w-16 h-4 md:w-20 md:h-5 bg-slate-200 rounded-full"></div>
               </div>
               <div className="absolute inset-0 overflow-hidden bg-slate-50">
                 <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar max-md:[zoom:0.45] md:[zoom:0.6]">
                   <PortfolioViewer data={placeholderPortfolioData} isMobilePreview={true} showPlaceholders={true} />
                 </div>
               </div>
            </div>

            {/* Desktop Mockup */}
            <div className="w-[92vw] max-w-[500px] shrink-0 md:w-full md:max-w-3xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden aspect-[16/9] flex flex-col relative snap-center">
               <div className="w-full h-8 md:h-10 border-b border-slate-100 bg-slate-50 flex items-center px-3 md:px-4 space-x-1.5 md:space-x-2 shrink-0 z-20">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400"></div>
               </div>
               <div className="flex-1 w-full overflow-hidden bg-slate-50 relative">
                 <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar max-md:[zoom:0.25] md:[zoom:0.5]">
                   <PortfolioViewer data={placeholderPortfolioData} isMobilePreview={false} showPlaceholders={true} />
                 </div>
               </div>
            </div>

            {/* Spacer for right padding */}
            <div className="w-6 md:w-8 shrink-0"></div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="relative bg-gradient-to-br from-green-500 via-green-700 to-emerald-900 py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dot Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-30" 
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
            ></div>
            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-white opacity-10 rounded-full blur-[100px]"></div>
            <div className="absolute top-1/2 -left-32 w-[25rem] h-[25rem] bg-green-300 opacity-20 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Kolom Kiri: Teks */}
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-6 text-white leading-tight">
                Mengapa Kamu Butuh Portofolio Online?
              </h2>
              <p className="text-lg text-green-50/90 leading-relaxed">
                Meskipun portofolio PDF masih umum digunakan, versi website memiliki keunggulan yang tidak
                dimiliki dokumen statis, contohnya kamu bisa update informasi di dalamnya secara instan. Portofolio digital berbasis web memberikan kesan bahwa kamu adalah
                profesional yang update teknologi dan serius dalam membangun 
                <span className="relative inline-block ml-1">
                  <span className="relative z-10 text-white font-bold">personal branding</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-emerald-300" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M2,15 Q50,0 98,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>.
              </p>
            </div>

            {/* Kolom Kanan: Kartu Fitur */}
            <div className="grid gap-6">
              {[
                { 
                  title: "Visual & Interaktif", 
                  desc: "Recruiter bisa melihat informasi secara menarik dan profesional bukan hanya membaca deskripsi.", 
                  icon: Eye,
                  colorClass: "bg-blue-50 text-blue-600"
                },
                { 
                  title: "Akses Kapan Saja", 
                  desc: "Cukup share satu link, portofolio bisa diakses dari mana saja tanpa download.", 
                  icon: Globe,
                  colorClass: "bg-teal-50 text-teal-600"
                },
                { 
                  title: "Kesan Profesional", 
                  desc: "Menunjukkan bahwa kamu serius dan melek teknologi di mata HRD.", 
                  icon: Briefcase,
                  colorClass: "bg-amber-50 text-amber-500"
                },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="group relative bg-background/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl flex flex-row items-start text-left shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-x-2 transition-all duration-300 overflow-hidden cursor-default"
                >
                  <div className={`shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mr-4 sm:mr-5 ${feature.colorClass} shadow-inner`}>
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-green-600 transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TARGET AUDIENCE SECTION */}
        <section className="pt-24 pb-12 lg:pb-24 bg-[#f2f2f2]">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Untuk Siapa Portofolio Ini?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Platform ini didesain khusus untuk membantumu tampil lebih profesional dan menonjol di mata perekrut, apapun latar belakang kariermu.
              </p>
            </div>
          </div>
            
          {/* Slider: Full-bleed horizontal scroll on mobile, centered grid on desktop */}
          <div 
            ref={targetAudienceRef}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 pb-12 pt-6 -mt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full md:max-w-7xl md:mx-auto md:px-8"
          >
            {/* Spacer for left alignment on mobile */}
            <div className="w-2 sm:w-4 shrink-0 md:hidden"></div>

            {[
              { 
                id: "fresh-grad",
                image: "/fresh-graduade.webp", 
                alt: "Fresh Graduate",
                title: "Fresh Graduate",
                subtitle: "Buat kesan pertama profesional untuk menarik perhatian HRD."
              },
              { 
                id: "creative",
                image: "/Profesional-kreatif.webp", 
                alt: "Profesional Kreatif",
                title: "Profesional Kreatif",
                subtitle: "Tampilkan karyamu dengan presentasi visual yang memukau."
              },
              { 
                id: "freelancer",
                image: "/freelance.webp", 
                alt: "Freelance",
                title: "Freelancer",
                subtitle: "Bangun kredibilitas untuk mendapatkan lebih banyak klien."
              },
              { 
                id: "career-switcher",
                image: "/career-switch.webp", 
                alt: "Career Switch",
                title: "Career Switcher",
                subtitle: "Fokus tunjukkan keahlian baru untuk meyakinkan perekrut."
              }
            ].map((item, i) => (
              <Link href={`/untuk-siapa#${item.id}`} key={i} className="relative w-[85vw] shrink-0 snap-center md:flex-1 md:w-auto ml-4 md:ml-0 block group">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="rounded-t-2xl md:rounded-t-[2rem] rounded-b-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-3 bg-background flex flex-col border border-border h-full"
                >
                  <div className="w-full aspect-square relative">
                    <img 
                      src={item.image} 
                      alt={item.alt} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </div>
                  <div className="px-6 py-6 pb-12 md:pb-16 text-center flex-1 flex flex-col justify-start md:justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-green-600 transition-colors">{item.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.subtitle}</p>
                  </div>
                </motion.div>
              </Link>
            ))}

            {/* Spacer for right padding on mobile */}
            <div className="w-4 shrink-0 md:hidden"></div>
          </div>

          {/* Navigation Arrows for mobile */}
          <div className="flex justify-center gap-4 -mt-2 md:hidden relative z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 border-2 border-muted hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-colors shadow-sm" 
              onClick={() => scrollTargetAudience('left')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 border-2 border-muted hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-colors shadow-sm" 
              onClick={() => scrollTargetAudience('right')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* HALFTONE LOGO SECTION */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-[30px] flex justify-center">
          <img 
            src="/logo-halftone.jpg" 
            alt="PortoTree Halftone Logo" 
            className="w-full h-auto" 
          />
        </section>

        {/* BANNER SECTION */}
        <section className="w-full max-w-7xl mx-auto px-0 md:px-8 flex flex-col items-center">
          {/* Desktop Banner */}
          <img 
            src="/banner-portotree.webp" 
            alt="PortoTree Banner" 
            className="hidden md:block w-full h-auto object-cover" 
          />
          {/* Mobile Banner */}
          <img 
            src="/banner-portotree-mobile.webp" 
            alt="PortoTree Mobile Banner" 
            className="block md:hidden w-full h-auto object-cover" 
          />
        </section>

        {/* ARTIKEL PENGANTAR SECTION */}
        <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-white">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                <span className="text-green-600 relative inline-block mb-2 md:mb-3">
                  Web Portofolio Online
                  <svg className="absolute w-full h-3 -bottom-1 md:-bottom-2 left-0 text-green-400" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M2 9.5C45.5 3.5 120 -2 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                Profesional <br />
                Tanpa Coding
              </h2>
            </div>

            <div className="bg-card border border-border/60 shadow-sm rounded-3xl p-6 sm:p-8 md:p-12 text-base md:text-lg text-muted-foreground leading-relaxed space-y-6 mb-12">
              <p>
                Di tengah persaingan dunia kerja yang semakin ketat, mengandalkan CV saja terkadang tidak cukup. Pernahkah kamu merasa kesulitan menjelaskan hasil kerjamu hanya lewat barisan teks? Inilah alasan mengapa kamu butuh <span className="text-green-600 font-medium">web portofolio online</span>. Bayangkan memiliki sebuah "rumah digital" yang bisa memamerkan semua hasil karyamu secara visual, interaktif, dan bisa diakses oleh siapa saja hanya dengan satu klik link.
              </p>
            </div>

            {/* FEATURE BOX: PORTOTREE */}
            <div className="bg-green-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-green-500/30 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                  <Rocket className="w-4 h-4" />
                  <span>Tanpa Coding</span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-snug">
                  Cara Membuat Website Portofolio Tanpa Coding dengan{" "}
                  <span className="relative inline-block whitespace-nowrap">
                    PortoTree
                    <svg className="absolute w-full h-3 -bottom-1 md:-bottom-2 left-0 text-yellow-400" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                      <path d="M2 9.5C45.5 3.5 120 -2 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h3>
                
                <p className="text-green-50 text-lg mb-8">
                  PortoTree hadir sebagai platform yang memudahkan kamu memiliki personal brand website hanya dalam waktu kurang dari 5 menit!
                </p>
                
                <div className="space-y-6 text-left">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Tanpa Ribet</span> — <span className="text-green-50">Tidak perlu membeli hosting atau mengatur server. Cukup isi informasi detail kamu, link web portofolio siap di share.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Tampilan Profesional</span> — <span className="text-green-50">Desain yang ditawarkan sudah dioptimasi agar terlihat elegan di mata recruiter dan HRD.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Link Bio Terintegrasi</span> — <span className="text-green-50">Gunakan URL portofolio di bio media sosial atau cantumkan di CV kreatif milikmu.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Mudah Update</span> — <span className="text-green-50">Setiap kali ada proyek baru, tambahkan dengan cepat tanpa membongkar struktur website.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="pt-8 md:pt-12 pb-16 md:pb-20">
          <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-lg text-muted-foreground">
                Masih penasaran atau punya keraguan? Berikut adalah jawaban dari beberapa pertanyaan yang paling sering ditanyakan kepada kami.
              </p>
            </div>
            <Accordion className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Apakah PortoTree sepenuhnya gratis?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ya, fitur utama kami termasuk pembuatan resume, portofolio dasar, dan link-in-bio sepenuhnya gratis. Kami akan memperkenalkan tema premium nanti.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Bisakah saya mengekspor resume ke PDF?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Tentu saja! Semua resume yang dihasilkan sangat dioptimalkan untuk Sistem Pelacakan Pelamar (ATS) dan dapat diunduh sebagai PDF.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Bisakah saya menghubungkan domain kustom?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Domain kustom akan tersedia sebagai bagian dari paket premium kami mendatang.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Bisa tambah video di portfolio online PortoTree?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Bisa, kamu bisa embed link video (YouTube, Vimeo, atau Google Drive). File video mentah tidak bisa upload langsung — hanya bisa embed via link.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">Apakah portfolio online dioptimalkan untuk mobile?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ya, semua portfolio responsive untuk smartphone, tablet, dan desktop. Portfolio kamu akan kelihatan keren di device apa pun.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">Berapa lama bikin portfolio?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Kamu bisa bikin portfolio dasar dalam 5–10 menit berkat sistem Live Canvas Edit kami. Cukup pilih template dasar, klik di layar, dan langsung ketik isi kontennya. Portfolio yang lebih mendetail biasanya butuh waktu 30–60 menit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="pt-16 pb-24 md:pt-20 bg-white border-t border-border/40">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Apa yang Anda butuhkan saat ini?
              </h2>
              <p className="text-lg md:text-xl text-gray-500">
                Pilih jalur di bawah untuk mulai membangun identitas profesional Anda.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              <Link 
                href="/register" 
                className="group flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 sm:py-12 sm:px-8 rounded-3xl border border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-100/80 group-hover:bg-white/20 text-green-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                  <Globe className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
                  Buat Portofolio
                </span>
              </Link>
              
              <Link 
                href="/register?type=cv" 
                className="group flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 sm:py-12 sm:px-8 rounded-3xl border border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-100/80 group-hover:bg-white/20 text-blue-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
                  Buat CV
                </span>
              </Link>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
