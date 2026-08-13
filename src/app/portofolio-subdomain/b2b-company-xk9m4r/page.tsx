"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Eye, Briefcase, ChevronLeft, ChevronRight, Rocket, CheckCircle2, Building2, Users, FileText, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CompanyLandingPage() {
  const [wordIndex, setWordIndex] = useState(0);
  const targetAudienceRef = useRef<HTMLDivElement>(null);
  const words = ["Kredibilitas", "Klien Baru", "Digitalisasi"];

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
        <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col justify-center pt-32 pb-16 lg:pt-40 lg:pb-20 text-left overflow-hidden bg-slate-50">
          
          {/* Enhanced Background for B2B */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Glowing Gradient Orbs */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-300/20 rounded-full blur-[150px] mix-blend-multiply"></div>
            
            {/* Subtle Magic Pattern Overlay if needed */}
            <div className="absolute inset-0 magicpattern opacity-30 mix-blend-overlay"></div>
          </div>
          
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
            >
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100 text-sm font-medium text-blue-600 w-fit">
                  <Building2 className="w-4 h-4" />
                  <span>Solusi B2B & Agensi</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 flex flex-col">
                  <span>Tingkatkan bisnis B2B dan raih</span>
                  <span className="inline-grid mt-2">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={words[wordIndex % words.length]}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="col-start-1 row-start-1 text-left text-blue-600"
                      >
                        {words[wordIndex % words.length]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h1>
                <p className="text-xl text-slate-600">
                  Buat <strong>Company Profile</strong> digital yang elegan, pamerkan studi kasus, dan yakinkan klien besar dalam hitungan menit. Tanpa ribet, tanpa biaya <strong>server</strong>.
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
                    <div className="w-full h-full bg-blue-500 opacity-75 animate-blob-shape"></div>
                  </div>
                  <Link href="https://portotree.com/register" className="relative z-10 w-32 h-32 p-0 text-lg font-bold animate-blob-shape flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] bg-blue-600 hover:bg-blue-500 text-white border-0 outline-none select-none">
                    <span className="leading-tight">Mulai</span>
                    <span className="leading-tight">Sekarang</span>
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
                  <Globe className="w-8 h-8 text-blue-600" />
                  <p className="text-4xl font-bold text-slate-900">500+</p>
                </div>
                <p className="text-base text-slate-500 font-medium mt-1">Perusahaan Bergabung</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                  <p className="text-4xl font-bold text-slate-900">95%</p>
                </div>
                <p className="text-base text-slate-500 font-medium mt-1">Rasio Kredibilitas</p>
              </div>
            </motion.div>
          </div>
          
          {/* MOCKUP PLACEHOLDERS - Full bleed */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 pt-10 flex flex-row items-center md:items-end justify-start md:justify-center gap-6 md:gap-8 w-full pb-16 overflow-x-auto snap-x snap-mandatory custom-scrollbar"
          >
            {/* Spacer for left alignment */}
            <div className="w-0 sm:w-2 md:w-[calc((100vw-72rem)/2)] shrink-0 max-w-[max(1.5rem,calc((100vw-80rem)/2))]"></div>

            {/* Mobile Mockup */}
            <div className="w-[200px] md:w-[260px] shrink-0 rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-slate-200 bg-slate-100 shadow-2xl overflow-hidden aspect-[9/19] flex items-center justify-center relative snap-center ml-6 md:ml-0">
               {/* Dynamic Island */}
               <div className="absolute top-0 w-full flex justify-center pt-1.5 md:pt-2 z-10">
                  <div className="w-16 h-4 md:w-20 md:h-5 bg-slate-200 rounded-full"></div>
               </div>
               <p className="text-slate-400 text-xs md:text-sm font-medium text-center px-4">Pratinjau Mobile B2B</p>
            </div>

            {/* Desktop Mockup */}
            <div className="w-[92vw] max-w-[500px] shrink-0 md:w-full md:max-w-3xl rounded-xl border border-slate-200 bg-slate-100 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center relative snap-center">
               <div className="absolute top-0 w-full h-8 md:h-10 border-b border-slate-200 bg-white flex items-center px-3 md:px-4 space-x-1.5 md:space-x-2">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400"></div>
               </div>
               <p className="text-slate-400 text-sm md:text-base font-medium mt-8 md:mt-10">Pratinjau Desktop B2B</p>
            </div>

            {/* Spacer for right padding */}
            <div className="w-6 md:w-8 shrink-0"></div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute inset-0 opacity-30" 
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
            ></div>
            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-white opacity-10 rounded-full blur-[100px]"></div>
            <div className="absolute top-1/2 -left-32 w-[25rem] h-[25rem] bg-blue-300 opacity-20 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Kolom Kiri: Teks */}
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-6 text-white leading-tight">
                Mengapa Anda Butuh Profil Perusahaan PortoTree?
              </h2>
              <p className="text-lg text-blue-50/90 leading-relaxed">
                Di era digital, klien B2B mencari bukti nyata sebelum bekerja sama. Modul kami dirancang khusus agar calon klien dapat melihat 
                <span className="relative inline-block ml-1 mx-1">
                  <span className="relative z-10 text-white font-bold">studi kasus dan layanan</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-indigo-300" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M2,15 Q50,0 98,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span> 
                yang perusahaan Anda tawarkan secara profesional dan meyakinkan.
              </p>
            </div>

            {/* Kolom Kanan: Kartu Fitur B2B */}
            <div className="grid gap-6">
              {[
                { 
                  title: "Etalase Layanan B2B", 
                  desc: "Katalog layanan dan solusi yang tertata rapi, membantu klien memahami apa yang Anda tawarkan.", 
                  icon: Briefcase,
                  colorClass: "bg-blue-50 text-blue-600"
                },
                { 
                  title: "Galeri Klien & Studi Kasus", 
                  desc: "Validasi kredibilitas perusahaan dengan memamerkan logo mitra bisnis dan metrik kesuksesan.", 
                  icon: Globe,
                  colorClass: "bg-indigo-50 text-indigo-600"
                },
                { 
                  title: "Profil Tim & Manajemen", 
                  desc: "Tumbuhkan rasa percaya klien dengan menampilkan sosok-sosok profesional di balik perusahaan Anda.", 
                  icon: Users,
                  colorClass: "bg-sky-50 text-sky-600"
                },
                { 
                  title: "Lead Generation", 
                  desc: "Terintegrasi dengan formulir kontak B2B yang langsung masuk ke email sales Anda.", 
                  icon: Mail,
                  colorClass: "bg-amber-50 text-amber-500"
                },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="group relative bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl flex flex-row items-start text-left shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-x-2 transition-all duration-300 overflow-hidden cursor-default"
                >
                  <div className={`shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mr-4 sm:mr-5 ${feature.colorClass} shadow-inner`}>
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-slate-800 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TARGET AUDIENCE SECTION */}
        <section className="pt-24 pb-12 lg:pb-24 bg-slate-50">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
                Cocok Untuk Semua Jenis Bisnis B2B
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Modul <strong>Company Profile</strong> kami memiliki kapabilitas fleksibel untuk berbagai macam skala dan model bisnis Anda.
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
                id: "agensi",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", 
                title: "Agensi Kreatif",
                subtitle: "Pamerkan hasil kampanye dan studi kasus klien dengan gaya visual menarik."
              },
              { 
                id: "software-house",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", 
                title: "Software House",
                subtitle: "Tampilkan detail teknologi, portofolio aplikasi, dan sertifikasi tim Anda."
              },
              { 
                id: "konsultan",
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop", 
                title: "Firma Konsultan",
                subtitle: "Bangun otoritas melalui publikasi klien korporat dan testimoni CEO."
              },
              { 
                id: "startup",
                image: "/b2b.png", 
                title: "Startup B2B",
                subtitle: "Jelaskan produk SaaS Anda dengan halaman yang rapi dan terstruktur."
              }
            ].map((item, i) => (
              <div key={i} className="relative w-[85vw] shrink-0 snap-center md:flex-1 md:w-auto ml-4 md:ml-0 block group cursor-default">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="rounded-b-2xl md:rounded-b-[2rem] rounded-t-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-3 bg-white flex flex-col border border-slate-100 h-full"
                >
                  <div className="w-full aspect-square relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </div>
                  <div className="px-6 py-6 pb-12 md:pb-16 text-center flex-1 flex flex-col justify-start md:justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-sm md:text-base text-slate-500 leading-relaxed">{item.subtitle}</p>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Spacer for right padding on mobile */}
            <div className="w-4 shrink-0 md:hidden"></div>
          </div>

          {/* Navigation Arrows for mobile */}
          <div className="flex justify-center gap-4 -mt-2 md:hidden relative z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm bg-white" 
              onClick={() => scrollTargetAudience('left')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm bg-white" 
              onClick={() => scrollTargetAudience('right')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* ARTIKEL PENGANTAR SECTION */}
        <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-white">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                <span className="text-blue-600 relative inline-block mb-2 md:mb-3">
                  Company Profile Digital
                  <svg className="absolute w-full h-3 -bottom-1 md:-bottom-2 left-0 text-blue-400" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M2 9.5C45.5 3.5 120 -2 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                Profesional <br />
                Tanpa Web Developer
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 md:p-12 text-base md:text-lg text-slate-600 leading-relaxed space-y-6 mb-12">
              <p>
                Menyewa <strong>web developer</strong> atau <strong>agency</strong> untuk membuat website <strong>company profile</strong> bisa memakan waktu berbulan-bulan dan biaya puluhan juta rupiah. PortoTree mengubah hal tersebut. Dengan sistem <strong>builder</strong> kami, perusahaan Anda dapat meluncurkan website portofolio profesional hari ini juga dengan biaya yang sangat terjangkau.
              </p>
            </div>

            {/* FEATURE BOX: PORTOTREE */}
            <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                  <Rocket className="w-4 h-4" />
                  <span>Cepat & Mudah</span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-snug">
                  Keuntungan Membuat Company Profile B2B di{" "}
                  <span className="relative inline-block whitespace-nowrap">
                    PortoTree
                    <svg className="absolute w-full h-3 -bottom-1 md:-bottom-2 left-0 text-yellow-400" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                      <path d="M2 9.5C45.5 3.5 120 -2 198 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h3>
                
                <p className="text-blue-100 text-lg mb-8">
                  Kami mengerti bahwa waktu Anda berharga. Oleh karena itu, modul B2B kami diciptakan agar tim Anda bisa mandiri meluncurkan profil.
                </p>
                
                <div className="space-y-6 text-left">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Modul Khusus B2B</span> — <span className="text-blue-100">Bukan sekadar portofolio biasa. Anda bisa menambahkan halaman klien, testimoni CEO, dan daftar pimpinan proyek (Direksi).</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Custom Domain (Segera)</span> — <span className="text-blue-100">Hubungkan profil yang sudah dibuat dengan domain bisnis Anda sendiri (seperti namaperusahaan.com).</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Terindeks Google (SEO)</span> — <span className="text-blue-100">Company profile Anda dirancang dengan struktur SEO yang baik sehingga mudah ditemukan calon klien di mesin pencari.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="pt-8 md:pt-12 pb-16 md:pb-20 bg-slate-50">
          <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">Pertanyaan Seputar Perusahaan</h2>
              <p className="text-lg text-slate-600">
                Informasi penting yang sering ditanyakan oleh klien B2B kami sebelum bergabung.
              </p>
            </div>
            <Accordion className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-slate-800">Apakah saya bisa mengubah profil Personal menjadi Company?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Ya! Jika Anda sudah membuat profil Personal, Anda bisa meng-<strong>upgrade</strong> tipe akun Anda menjadi Company dari Dashboard untuk mengaktifkan fitur-fitur B2B.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-slate-800">Bisakah saya menambahkan lebih dari 10 anggota tim?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Tentu. Modul Company Profile kami tidak membatasi jumlah anggota tim atau portofolio proyek yang dapat Anda pamerkan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-slate-800">Bagaimana dengan keamanan data klien kami?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Keamanan adalah prioritas kami. Semua data perusahaan dan portofolio Anda disimpan dalam <strong>server cloud</strong> terenkripsi yang memenuhi standar industri.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-slate-800">Apakah ada paket khusus atau langganan?</AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Saat ini, Anda dapat menggunakan modul Company secara gratis. Ke depannya, kami akan menyediakan Paket Enterprise dengan fitur seperti <strong>Custom Domain</strong> dan <strong>White-label</strong>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="pt-16 pb-24 md:pt-20 bg-white border-t border-slate-100">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Siap memenangkan klien besar?
              </h2>
              <p className="text-lg md:text-xl text-slate-500">
                Daftar sekarang dan luncurkan profil perusahaan profesional Anda hari ini.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-md">
                  Mulai Buat Profil Company
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
