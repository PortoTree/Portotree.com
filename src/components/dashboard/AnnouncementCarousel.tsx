"use client";

import { useState, useEffect } from "react";
import { Sparkles, Megaphone, Gift, AlertCircle, Info, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { getActiveAnnouncements, Announcement } from "@/app/actions/announcements";
import Link from "next/link";

const getThemeClasses = (style: string) => {
  switch(style) {
    case 'emerald': return { bg: 'from-emerald-900 to-slate-900 border-emerald-900', badgeBg: 'bg-emerald-500/30 border-emerald-500/30 text-emerald-200', btn: 'text-emerald-300 hover:text-white' };
    case 'amber': return { bg: 'from-amber-700 to-slate-900 border-amber-900', badgeBg: 'bg-amber-500/30 border-amber-500/30 text-amber-200', btn: 'text-amber-300 hover:text-white' };
    case 'rose': return { bg: 'from-rose-900 to-slate-900 border-rose-900', badgeBg: 'bg-rose-500/30 border-rose-500/30 text-rose-200', btn: 'text-rose-300 hover:text-white' };
    case 'slate': return { bg: 'from-slate-800 to-slate-900 border-slate-800', badgeBg: 'bg-slate-500/30 border-slate-500/30 text-slate-200', btn: 'text-slate-300 hover:text-white' };
    case 'blue': return { bg: 'from-blue-900 to-slate-900 border-blue-900', badgeBg: 'bg-blue-500/30 border-blue-500/30 text-blue-200', btn: 'text-blue-300 hover:text-white' };
    default: return { bg: 'from-indigo-900 to-slate-900 border-slate-800', badgeBg: 'bg-indigo-500/30 border-indigo-500/30 text-indigo-200', btn: 'text-indigo-300 hover:text-white' };
  }
};

const getIcon = (type: string) => {
  switch(type) {
    case 'Megaphone': return Megaphone;
    case 'Gift': return Gift;
    case 'AlertCircle': return AlertCircle;
    case 'Info': return Info;
    default: return Sparkles;
  }
};

const defaultAnnouncements: Announcement[] = [
  {
    id: "default-1",
    title: "Pembaruan Sistem v2.0",
    description: "Kami sedang menyiapkan fitur analitik canggih untuk melacak performa CV dan Portofolio Anda secara Real-Time. Nantikan segera!",
    badgeText: "Fitur Baru",
    linkUrl: "#",
    themeStyle: "indigo",
    iconType: "Sparkles",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "default-2",
    title: "Tingkatkan Peluang Karir",
    description: "Dapatkan akses ke 50+ template CV eksklusif standar HR dengan melakukan upgrade akun Anda hari ini.",
    badgeText: "Promo Spesial",
    linkUrl: "/p/langganan",
    themeStyle: "amber",
    iconType: "Gift",
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export default function AnnouncementCarousel() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await getActiveAnnouncements();
        if (res.success && res.data && res.data.length > 0) {
          setAnnouncements(res.data);
        } else {
          setAnnouncements(defaultAnnouncements);
        }
      } catch (error) {
        setAnnouncements(defaultAnnouncements);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  // Auto-slide effect (8s)
  useEffect(() => {
    if (announcements.length <= 1 || isLoading) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [announcements.length, isLoading]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= announcements.length) {
        setIsTransitioning(false);
        return 0;
      }
      setIsTransitioning(true);
      return prev + 1;
    });
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(announcements.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(announcements.length - 1);
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    // Jika slide mencapai duplikat elemen pertama di ujung kanan, snap (lompat) ke awal tanpa animasi
    if (currentIndex === announcements.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-800 text-white min-h-[220px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-slate-400">Memuat info...</span>
        </div>
      </div>
    );
  }

  // Buat array baru dengan menduplikat slide pertama ke posisi paling akhir untuk efek infinite loop ke kanan
  const extendedAnnouncements = announcements.length > 1 
    ? [...announcements, announcements[0]] 
    : announcements;

  // Real active index (untuk dots)
  const activeDotIndex = currentIndex === announcements.length ? 0 : currentIndex;
  console.log("Carousel state:", { currentIndex, activeDotIndex, length: announcements.length, isClient: typeof window !== "undefined" });

  return (
    <div className="relative rounded-3xl shadow-md overflow-hidden group min-h-[220px] bg-slate-900 border border-slate-800">
      
      {/* Track container for sliding effect */}
      <div 
        className={`flex h-full w-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedAnnouncements.map((ann, idx) => {
          const theme = getThemeClasses(ann.themeStyle);
          const IconComponent = getIcon(ann.iconType);
          
          return (
            <div key={idx} className={`w-full h-full flex-shrink-0 bg-gradient-to-br ${theme.bg} relative p-6 flex flex-col justify-center text-white`}>
              {/* Background Watermark */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <IconComponent className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 border ${theme.badgeBg}`}>
                  <IconComponent className="w-3.5 h-3.5" /> {ann.badgeText}
                </div>
                <h3 className="text-xl font-bold mb-2">{ann.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {ann.description}
                </p>
                <Link href={ann.linkUrl?.startsWith("/") ? `https://portotree.com${ann.linkUrl}` : (ann.linkUrl || "#")} className={`text-sm font-semibold transition-colors flex items-center gap-1 w-fit ${theme.btn}`}>
                  Pelajari Selengkapnya <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (Only show if > 1 announcement) */}
      {announcements.length > 1 && (
        <>
          {/* Arrow Buttons (Hover visible) */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 disabled:opacity-50 border border-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 disabled:opacity-50 border border-white/10"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {announcements.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  idx === activeDotIndex ? "w-4 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
