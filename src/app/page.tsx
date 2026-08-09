"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSubdomainUrl } from "@/lib/url";
import { Button } from "@/components/ui/button";
import { PortfolioViewer } from "@/components/builder/PortfolioViewer";
import { placeholderPortfolioData } from "@/lib/portfolioData";
import { 
  ArrowRight, 
  Users, 
  Briefcase, 
  Building2, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Layout, 
  FileText,
  MapPin,
  Clock,
  CheckCircle2,
  Trophy
} from "lucide-react";

export default function Home() {
  const [showPortoOptions, setShowPortoOptions] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-20 md:pt-24">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full min-h-[100dvh] overflow-hidden bg-slate-50 flex items-center pt-20 pb-20">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/20 rounded-full blur-3xl -translate-x-1/2"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2"></div>
          </div>

          <div className="relative px-6 md:px-8 w-full max-w-7xl mx-auto z-10 -mt-12 md:-mt-28">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left z-20 flex flex-col items-start"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-green-200 text-green-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  Platform Identitas Digital
                </div>
                
                <h1 className="text-[2.5rem] leading-[1.15] sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold tracking-tight text-gray-900 mb-5 lg:mb-6 lg:leading-[1.1]">
                  <span className="lg:whitespace-nowrap">Satu Platform untuk</span> <br className="hidden lg:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                    Semua Identitas Digital Anda
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed mb-8 max-w-lg">
                  Mulai bangun identitas profesional Anda lewat portofolio yang menarik, resume ramah ATS, hingga company profile elegan secara gratis dalam satu platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center lg:justify-start items-center">
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-14 px-8 text-base font-bold bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-green-600/30 transition-all hover:-translate-y-1">
                      Mulai Sekarang - Gratis
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="#choose-journey" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base font-bold rounded-full bg-white hover:bg-slate-50 transition-all border-slate-200 text-slate-700 shadow-sm hover:-translate-y-1">
                      Lihat Fitur Kami
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Column: Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end z-10"
              >
                <img 
                  src="/hero-img.png" 
                  alt="PortoTree Dashboard Preview" 
                  className="w-[120%] sm:w-[110%] max-w-none h-auto object-contain drop-shadow-2xl lg:translate-x-12"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"; }}
                />
                
                {/* Floating decorative elements around image */}
                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 bg-green-100/50 rounded-full blur-2xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* 3. CHOOSE YOUR JOURNEY */}
        <section id="choose-journey" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 md:mb-6 leading-tight">Pilih Perjalanan Anda</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                PortoTree dirancang fleksibel. Apakah Anda seorang personal yang ingin menonjolkan karya, atau sebuah perusahaan yang ingin tampil kredibel?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Journey 1: Personal */}
              <a href={getSubdomainUrl('portofolio', '/personal')} className="group block">
                <div className="h-full bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-8">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Untuk Personal & Freelancer</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Buat portofolio profesional, CV yang ramah ATS, dan halaman profil link-in-bio untuk memamerkan keahlian Anda ke perekrut dan klien.
                  </p>
                  <div className="flex items-center text-green-600 font-bold">
                    Jelajahi Fitur Portofolio <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Journey 2: Company */}
              <a href={getSubdomainUrl('portofolio', '/company')} className="group block">
                <div className="h-full bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    Untuk Bisnis & Perusahaan
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full uppercase tracking-widest leading-none">Soon</span>
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Bangun company profile elegan yang menampilkan layanan, portofolio proyek perusahaan, dan tim Anda untuk meyakinkan calon investor.
                  </p>
                  <div className="flex items-center text-blue-600 font-bold">
                    Jelajahi Fitur Perusahaan <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 4. FEATURE SHOWCASE */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 md:mb-6 leading-tight">Fitur Andalan PortoTree</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Semua yang Anda butuhkan untuk membangun identitas digital profesional ada di sini.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: <Layout className="w-6 h-6" />, title: "Live Canvas Editor", desc: "Cukup klik komponen di layar untuk langsung mengedit teks, gaya desain, atau menghapus blok yang tidak diperlukan." },
                { icon: <Globe className="w-6 h-6" />, title: "Link Simple & Profesional", desc: "Dapatkan link cantik yang mudah diingat (contoh: portotree.com/w/nama untuk portofolio pekerja, dan portotree.com/c/nama untuk profil bisnis/perusahaan)." },
                { icon: <FileText className="w-6 h-6" />, title: "ATS Friendly Resume", desc: "Generator CV yang dioptimalkan untuk lolos seleksi sistem ATS HRD." },
                { icon: <Zap className="w-6 h-6" />, title: "Super Cepat", desc: "Infrastruktur modern menjamin halaman Anda dimuat dalam hitungan detik." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Aman & Terpercaya", desc: "Data Anda dienkripsi dan kami menyediakan SSL gratis untuk setiap halaman." },
                { icon: <Users className="w-6 h-6" />, title: "Kolaborasi Tim", desc: "Kelola halaman Company Profile bersama tim secara *real-time*." },
              ].map((feature, i) => (
                <div key={i} className="md:p-8 md:rounded-3xl md:bg-slate-50 md:border md:border-slate-100 md:hover:border-green-200 transition-colors">
                  <div className="flex items-center gap-4 mb-2 md:block md:mb-0">
                    <div className="w-12 h-12 bg-slate-50 md:bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600 shrink-0 md:mb-6">
                      {feature.icon}
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 md:mb-3 leading-tight">{feature.title}</h4>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed ml-16 md:ml-0">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PORTFOLIO PREVIEW */}
        <section className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                  Untuk Personal
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Pamerkan Karya Anda dengan Elegan
                </h2>
                <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                  Tidak perlu pusing memikirkan desain. Pilih template profesional yang sudah kami optimasi untuk menonjolkan estetika karya Anda. Cocok untuk desainer, programmer, penulis, dan fotografer.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-400 w-6 h-6" /> Galeri Proyek Interaktif</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-400 w-6 h-6" /> Integrasi Link Sosial Media</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-400 w-6 h-6" /> SEO Friendly</li>
                </ul>
                <div className="pt-6">
                  <Link href="/register">
                    <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 h-12 font-bold">
                      Coba sekarang
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative">
                {/* Mockup Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 p-2">
                  <div className="flex gap-1.5 px-2 pb-2 pt-1 border-b border-slate-700 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="relative w-full aspect-[16/10] bg-slate-50 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar max-md:[zoom:0.35] md:[zoom:0.5] pointer-events-none">
                      <PortfolioViewer data={placeholderPortfolioData} isMobilePreview={false} showPlaceholders={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. COMPANY PREVIEW */}
        <section className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  Untuk Perusahaan
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
                  Bangun Kepercayaan Klien B2B Anda
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Buat halaman profil perusahaan (Company Profile) yang menawan. Konsepnya semudah membuat portofolio personal, namun dilengkapi dengan blok konten khusus untuk layanan, klien, struktur organisasi, dan testimoni B2B.
                </p>
                <ul className="space-y-4 pt-4 text-gray-700">
                  <li className="flex items-center gap-3"><Trophy className="text-blue-600 w-6 h-6" /> Showcase Produk & Layanan</li>
                  <li className="flex items-center gap-3"><Building2 className="text-blue-600 w-6 h-6" /> Struktur Tim & About Us</li>
                  <li className="flex items-center gap-3"><MapPin className="text-blue-600 w-6 h-6" /> Integrasi Maps & Kontak Bisnis</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 relative">
                {/* Mockup Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-2">
                  <div className="flex gap-1.5 px-2 pb-2 pt-1 border-b border-gray-100 mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                  <img src="/mockup2.webp" alt="Company Preview" className="w-full h-auto rounded-lg object-cover" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"; }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. HOW IT WORKS */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-10 md:mb-16 leading-tight">Tampil Online dalam 3 Langkah</h2>
            
            <div className="grid md:grid-cols-3 gap-10 md:gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-green-200 -z-10"></div>
              
              {[
                { step: "1", title: "Daftar & Pilih Jalur", desc: "Buat akun gratis dan pilih apakah Anda ingin membuat Profil Personal atau Profil Perusahaan." },
                { step: "2", title: "Sesuaikan Desain", desc: "Pilih template dasar lalu klik langsung di layar (live edit) untuk mengubah isi konten, warna, dan desain sesuka Anda." },
                { step: "3", title: "Publikasi ke Dunia", desc: "Copy link yang tersedia atau custom domain anda, lalu bagikan link ke semua orang!" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-black mb-8 shadow-xl shadow-green-600/20 ring-8 ring-green-50">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. ROADMAP */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Roadmap Kami</h2>
              <p className="text-lg text-gray-600">
                Kami terus berkembang. Berikut adalah rencana pembaruan fitur PortoTree di masa mendatang.
              </p>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {[
                { icon: "🌱", title: "Portfolio Builder", status: "LIVE", active: true },
                { icon: "🌿", title: "Company Profile", status: "LIVE", active: true },
                { icon: "🌳", title: "Advanced Analytics", status: "Coming Soon", active: false },
                { icon: "🌲", title: "Premium Templates", status: "Coming Soon", active: false },
                { icon: "🌲", title: "Custom Integrations", status: "Coming Soon", active: false },
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.active ? 'bg-green-100' : 'bg-slate-100'}`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CTA */}
        <section className="pt-16 pb-24 md:pt-20 bg-slate-50 border-t border-border/40">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Apa yang Anda butuhkan saat ini?
              </h2>
              <p className="text-lg md:text-xl text-gray-500">
                Pilih jalur di bawah untuk mulai membangun identitas profesional Anda.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              <div 
                onClick={() => setShowPortoOptions(!showPortoOptions)}
                className={`group grid p-6 sm:py-12 sm:px-8 rounded-3xl border transition-all duration-300 shadow-sm cursor-pointer ${
                  showPortoOptions 
                    ? 'border-green-600 ring-4 ring-green-50 bg-white' 
                    : 'border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white hover:shadow-md'
                }`}
              >
                {/* Unexpanded State */}
                <div 
                  className={`col-start-1 row-start-1 flex items-center justify-start sm:justify-center flex-row sm:flex-col transition-opacity duration-300 ease-in-out ${
                    showPortoOptions ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-100/80 group-hover:bg-white/20 text-green-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                    <Globe className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
                    Buat Portofolio
                  </span>
                </div>

                <div 
                  className={`col-start-1 row-start-1 w-full flex flex-row items-stretch justify-center gap-3 sm:gap-4 transition-opacity duration-300 ease-in-out ${
                    showPortoOptions ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <a href={getSubdomainUrl('portofolio', '/personal')} className="flex-1 bg-slate-50 border border-slate-200 hover:border-green-500 hover:bg-green-50 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center text-center group/item transition-colors" onClick={(e) => e.stopPropagation()}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-sm group-hover/item:scale-110 transition-transform shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-slate-800 leading-tight">Untuk <br className="block sm:hidden" />Personal</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 mt-1">Portofolio <br className="block sm:hidden" />personal</span>
                  </a>
                  <a href={getSubdomainUrl('portofolio', '/company')} className="flex-1 bg-slate-50 border border-slate-200 hover:border-green-500 hover:bg-green-50 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center text-center group/item transition-colors" onClick={(e) => e.stopPropagation()}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-sm group-hover/item:scale-110 transition-transform shrink-0">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-slate-800 leading-tight">Untuk <br className="block sm:hidden" />Perusahaan</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 mt-1">Company profile <br className="block sm:hidden" />B2B</span>
                  </a>
                </div>
              </div>
              
              <a 
                href={getSubdomainUrl('resume')} 
                className="group flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 sm:py-12 sm:px-8 rounded-3xl border border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-100/80 group-hover:bg-white/20 text-blue-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
                </div>
                <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
                  Buat CV
                </span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
