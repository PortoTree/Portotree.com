"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { FileText, Mail, Globe, ArrowRight, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPublishedBlogs } from "@/app/actions/blog";
import Image from "next/image";
import AnnouncementCarousel from "@/components/dashboard/AnnouncementCarousel";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function DashboardMainPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [animationData, setAnimationData] = useState<any>(null);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch('/tree.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
      
    async function fetchArticles() {
      try {
        const res = await getPublishedBlogs();
        if (res.success && res.data) {
          setRecentArticles(res.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Gagal memuat artikel", error);
      }
    }
    fetchArticles();
  }, []);

  const handleEnterFrame = (e: any) => {
    const frame = e.currentTime;
    
    // 3s = frame 180 (Step 1)
    // 4.3s = frame 258 (Step 2)
    // 6.3s = frame 378 (Step 3)
    // 8.3s = frame 498 (Step 4 - Float!)
    
    if (frame < 180) {
      if (activeStep !== 0) setActiveStep(0);
    } else if (frame >= 180 && frame < 258) {
      if (activeStep !== 1) setActiveStep(1);
    } else if (frame >= 258 && frame < 378) {
      if (activeStep !== 2) setActiveStep(2);
    } else if (frame >= 378 && frame < 498) {
      if (activeStep !== 3) setActiveStep(3);
    } else if (frame >= 498) {
      if (activeStep !== 4) setActiveStep(4);
    }

    // Stop and pause the animation precisely at 8.30 seconds (frame 498)
    if (frame >= 498 && lottieRef.current) {
      lottieRef.current.pause();
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-[85vh] flex flex-col lg:flex-row gap-6">
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(1deg); }
          75% { transform: translateY(4px) rotate(-1deg); }
        }
        .anim-float {
          animation: float-gentle 6s ease-in-out infinite;
        }
        .anim-float-delay-1 {
          animation: float-gentle 6s ease-in-out infinite;
          animation-delay: -2s;
        }
        .anim-float-delay-2 {
          animation: float-gentle 6s ease-in-out infinite;
          animation-delay: -4s;
        }
      `}</style>
      
      {/* LEFT COLUMN: Lottie & Instructions */}
      <div className="relative w-full lg:flex-1 h-[600px] md:h-[700px] flex items-center justify-center md:bg-white md:rounded-3xl md:shadow-sm md:border md:border-slate-200 md:overflow-hidden">
        
        {/* Lottie Animation (Center) */}
        <div className="w-full max-w-[320px] md:max-w-sm absolute inset-0 m-auto flex items-center justify-center z-0 opacity-90">
          {animationData && (
            <Lottie 
              lottieRef={lottieRef}
              animationData={animationData} 
              loop={true} 
              onEnterFrame={handleEnterFrame}
            />
          )}
        </div>

        {/* Step 3: Kiri Atas (Top Left) */}
        <div className={`transition-all duration-1000 absolute top-16 left-4 md:top-20 md:left-12 lg:left-16 max-w-[200px] md:max-w-[260px] z-10 ${activeStep >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
          <Link 
            href="/personal/dashboard/portofolio"
            className={`block bg-emerald-50/95 backdrop-blur-sm border border-emerald-200 p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all ${activeStep >= 3 ? 'anim-float-delay-2' : ''}`}
          >
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2.5 md:gap-0">
              <div className="shrink-0 w-8 h-8 md:w-8 md:h-8 bg-emerald-500 rounded-lg flex items-center justify-center md:mb-2 text-white shadow-inner">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h2 className="text-[11px] md:text-base font-bold text-slate-800 md:mb-1 leading-tight">3. Publikasi Portofolio</h2>
                <p className="text-[10px] md:text-xs text-slate-600 md:mb-3 leading-relaxed mt-0.5 md:mt-0">
                  Publikasikan karya dan proyek terbaik Anda secara Online.
                </p>
              </div>
            </div>
            <span className="hidden md:inline-flex mt-2.5 md:mt-0 items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors shadow-sm text-xs">
              Buat Portofolio
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Step 2: Kanan Tengah/Atas (Right Side, Middle) */}
        <div className={`transition-all duration-1000 absolute top-[40%] md:top-[35%] right-2 md:right-8 max-w-[200px] md:max-w-[260px] z-10 ${activeStep >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
          <Link 
            href="/personal/dashboard/surat-generator"
            className={`block bg-blue-50/95 backdrop-blur-sm border border-blue-200 p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all ${activeStep >= 2 ? 'anim-float-delay-1' : ''}`}
          >
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2.5 md:gap-0">
              <div className="shrink-0 w-8 h-8 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center md:mb-2 text-white shadow-inner">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h2 className="text-[11px] md:text-base font-bold text-slate-800 md:mb-1 leading-tight">2. Tulis Surat Lamaran</h2>
                <p className="text-[10px] md:text-xs text-slate-600 md:mb-3 leading-relaxed mt-0.5 md:mt-0">
                  Buat Cover Letter meyakinkan untuk perekrut.
                </p>
              </div>
            </div>
            <span className="hidden md:inline-flex mt-2.5 md:mt-0 items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition-colors shadow-sm text-xs">
              Buat Surat Lamaran
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Step 1: Kiri Bawah (Bottom Left) */}
        <div className={`transition-all duration-1000 absolute bottom-[22%] left-6 md:bottom-[15%] md:left-12 lg:left-24 max-w-[200px] md:max-w-[260px] z-10 ${activeStep >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
          <Link 
            href="/personal/dashboard/resume"
            className={`block bg-amber-50/95 backdrop-blur-sm border border-amber-200 p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all ${activeStep >= 1 ? 'anim-float' : ''}`}
          >
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2.5 md:gap-0">
              <div className="shrink-0 w-8 h-8 md:w-8 md:h-8 bg-amber-500 rounded-lg flex items-center justify-center md:mb-2 text-white shadow-inner">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h2 className="text-[11px] md:text-base font-bold text-slate-800 md:mb-1 leading-tight">1. Buat CV Profesional</h2>
                <p className="text-[10px] md:text-xs text-slate-600 md:mb-3 leading-relaxed mt-0.5 md:mt-0">
                  Persiapkan CV menarik dari template standar industri.
                </p>
              </div>
            </div>
            <span className="hidden md:inline-flex mt-2.5 md:mt-0 items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors shadow-sm text-xs">
              Buat CV Sekarang
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Welcome Text (Only visible before Step 1) */}
        <div className={`transition-all duration-700 absolute top-8 inset-x-0 mx-auto text-center pointer-events-none z-10 ${activeStep === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95'}`}>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-2 drop-shadow-sm">
              Mulai Perjalanan Karir Anda
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-sm md:max-w-md mx-auto">
              Ikuti langkah-langkah di layar ini untuk membangun profil.
            </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Updates & Articles */}
      <div className="w-full lg:w-[320px] xl:w-[380px] flex flex-col gap-6 shrink-0 lg:h-[700px]">
        
        {/* Block 1: Announcement Carousel */}
        <AnnouncementCarousel />

        {/* Block 2: Recent Articles */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-5 shrink-0">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-800">Artikel Terbaru</h3>
            </div>
            <Link href="/blog" className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
              Lihat Semua
            </Link>
          </div>

          <div className="flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden min-h-0 pr-2">
            {recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/blog/${article.slug}`}
                  className="group flex gap-4 items-center p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-emerald-50 overflow-hidden shrink-0 relative border border-slate-200">
                    {article.thumbnailUrl ? (
                      <Image 
                        src={article.thumbnailUrl} 
                        alt={article.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-emerald-500">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-emerald-600 transition-colors mb-1">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6 text-slate-400">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 opacity-50" />
                </div>
                <p className="text-sm">Belum ada artikel terbaru.</p>
              </div>
            )}
          </div>
          
          {recentArticles.length > 0 && (
            <Link 
              href="/blog" 
              className="mt-5 w-full py-2.5 shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              Jelajahi Blog <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
