"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Briefcase, Layout, FileText, X, Users, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSubdomainUrl, getMainUrl } from '@/lib/url';
import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import useSWR from 'swr';
import { getMyPortfolio } from '@/app/actions/portfolio';
import { removeSession } from '@/app/actions/auth';

const fetcher = async () => {
  const result = await getMyPortfolio();
  if (result.success) return result;
  return null;
};

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showFabTooltip, setShowFabTooltip] = useState(false);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showMobilePortoSub, setShowMobilePortoSub] = useState(false);
  const [isPortofolioDomain, setIsPortofolioDomain] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || '';
  const isSubdomain = pathname.startsWith('/portofolio-subdomain') || pathname.startsWith('/resume-subdomain');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPortofolioDomain(window.location.hostname.includes('portofolio'));
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const { data: swrData } = useSWR(isLoggedIn ? 'my-portfolio-navbar' : null, fetcher, {
    dedupingInterval: 5 * 60 * 1000
  });

  useEffect(() => {
    if (swrData?.data?.personal?.photoUrl) {
      setPhotoUrl(swrData.data.personal.photoUrl);
    }
  }, [swrData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await removeSession();
      setIsLoggedIn(false);
      setPhotoUrl(null);
      router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowFab(true);
      } else {
        setShowFab(false);
        setShowFabTooltip(false);
        setIsFabOpen(false);
      }
    };

    // Pengecekan pertama kali saat render
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let tooltipTimer: NodeJS.Timeout;
    if (showFab && !hasDismissedTooltip) {
      // Tampilkan tooltip 1 detik setelah FAB muncul (jika belum pernah ditutup manual)
      tooltipTimer = setTimeout(() => {
        setShowFabTooltip(true);
      }, 1000);
    }

    return () => {
      if (tooltipTimer) clearTimeout(tooltipTimer);
    };
  }, [showFab, hasDismissedTooltip]);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <header className="w-full max-w-7xl rounded-full border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
          <div className="flex h-14 items-center justify-between px-6 md:px-8">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo-landscape.png" 
                  alt="PortoTree" 
                  width={200} 
                  height={50} 
                  className="h-10 w-auto" 
                  priority 
                />
              </Link>
              {pathname.includes('/personal') && (
                <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent -ml-1">Personal</span>
              )}
              {pathname.includes('/company') && (
                <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent -ml-1">Company</span>
              )}
              {isPortofolioDomain && pathname === '/' && (
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent -ml-1">Portofolio</span>
              )}
              {/* Fallback for local development direct path access */}
              {pathname === '/portofolio-subdomain' && !isPortofolioDomain && (
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent -ml-1">Portofolio</span>
              )}
              {pathname.includes('/blog') && (
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent -ml-1">Blog</span>
              )}
            </div>

            {pathname.includes('/company') ? (
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href={getMainUrl('/job-feed')} className="transition-colors hover:text-blue-600 text-slate-600 font-semibold py-2 flex items-center gap-1">
                  Talent Feed <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-widest">Soon</span>
                </a>
                <a href="#layanan" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Layanan</a>
                <a href="#klien" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Klien</a>
                <a href="#kontak" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Kontak</a>
              </nav>
            ) : pathname.includes('/personal') ? (
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href={getMainUrl('/job-feed')} className="transition-colors hover:text-blue-600 text-slate-600 font-semibold py-2 flex items-center gap-1">
                  Job Feed <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-widest">Soon</span>
                </a>
                <a href={getSubdomainUrl('resume')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 font-semibold">Buat CV</a>
                <Link href="https://www.portotree.com/blog" target="_blank" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Blog</Link>
                <Link href="https://www.portotree.com/about" target="_blank" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Tentang kami</Link>
              </nav>
            ) : (
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <div className="relative group">
                  <button className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1 focus:outline-none py-2">
                    Produk <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white rounded-xl p-2 shadow-xl border border-slate-100 flex flex-col">
                      <a href={getMainUrl('/job-feed')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item">
                        <div className="bg-blue-100/50 p-2.5 rounded-lg text-blue-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                            Job Feed
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Soon</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Cari lowongan kerja terbaru</div>
                        </div>
                      </a>
                      <div className="relative group/sub">
                        <a href={getSubdomainUrl('portofolio')} className="flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors mt-1 cursor-pointer group/item">
                          <div className="flex items-start gap-4">
                            <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <Layout className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800">Buat Portofolio</div>
                              <div className="text-xs text-slate-500 mt-0.5">Pamerkan karya Anda</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover/item:translate-x-1 transition-transform" />
                        </a>
                        
                        {/* Sub-menu on Hover */}
                        <div className="absolute top-0 left-full ml-1 w-64 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 -translate-x-2 group-hover/sub:translate-x-0 z-50">
                          <div className="bg-white rounded-xl p-2 shadow-xl border border-slate-100 flex flex-col">
                            <a href={getSubdomainUrl('portofolio', '/personal')} className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group/item">
                              <div className="bg-green-100/50 p-2.5 rounded-lg text-green-600 shrink-0 transition-transform group-hover/item:scale-110">
                                <Users className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-slate-800">Untuk Personal</div>
                                <div className="text-xs text-slate-500 mt-0.5">Portofolio personal</div>
                              </div>
                            </a>
                            <a href={getSubdomainUrl('portofolio', '/company')} className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors mt-1 group/item">
                              <div className="bg-green-100/50 p-2.5 rounded-lg text-green-600 shrink-0 transition-transform group-hover/item:scale-110">
                                <Building2 className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                  Untuk Perusahaan
                                  <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Soon</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">Company profile B2B</div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <a href={getSubdomainUrl('resume')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors mt-1 group/item">
                        <div className="bg-amber-100/50 p-2.5 rounded-lg text-amber-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                            Buat CV
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Soon</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Bikin CV standar ATS</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <Link href="https://www.portotree.com/blog" target="_blank" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Blog</Link>
                <Link href="https://www.portotree.com/about" target="_blank" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2">Tentang kami</Link>
              </nav>
            )}
            
            <div className="flex items-center gap-4">
              {/* Tombol Utama (Disembunyikan di Mobile) */}
              <Link href={isLoggedIn ? "/personal/dashboard" : "/register"} className="hidden md:block">
                <Button className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-sm font-semibold px-6">
                  {isLoggedIn ? "Dashboard" : "Daftar Sekarang"}
                </Button>
              </Link>

              {/* Icon Profil User */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className={`rounded-full overflow-hidden border-2 transition-all focus:outline-none ${isLoggedIn ? 'border-transparent hover:border-green-500 focus:ring-2 focus:ring-green-500' : 'border-transparent hover:border-gray-300'}`}>
                  {photoUrl ? (
                    <img 
                      src={photoUrl} 
                      alt="Profile" 
                      className={`w-8 h-8 object-cover ${!isLoggedIn ? 'opacity-80 hover:opacity-100 transition-opacity' : ''}`} 
                    />
                  ) : (
                    <Image 
                      src="/user.png" 
                      alt={isLoggedIn ? "Profile" : "User"} 
                      width={32} 
                      height={32} 
                      className={`w-8 h-8 object-cover ${!isLoggedIn ? 'opacity-80 hover:opacity-100 transition-opacity' : ''}`} 
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 mt-2 rounded-xl">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem 
                        onClick={() => router.push('/personal/dashboard')} 
                        className="cursor-pointer font-medium w-full"
                      >
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 w-full mt-1" 
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem 
                        className="cursor-pointer font-medium w-full"
                        onClick={() => router.push('/login')}
                      >
                        Login
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => router.push('/register')} 
                        className="cursor-pointer w-full mt-1"
                      >
                        Daftar
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      </div>

      {/* Floating Navigation FAB for Mobile */}
      <AnimatePresence>
        {showFab && !isSubdomain && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 right-6 md:hidden z-[110]"
          >
            {/* Onboarding Tooltip */}
            <AnimatePresence>
              {showFabTooltip && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute right-[68px] bottom-2 w-max bg-green-600/85 backdrop-blur-md text-white px-3.5 py-2.5 rounded-2xl shadow-xl z-50 border border-green-500/50 origin-right"
                >
                  <div className="flex items-center gap-3 justify-between">
                    <span className="font-semibold text-sm leading-none drop-shadow-sm whitespace-nowrap">Kebutuhan anda disini</span>
                    <button onClick={() => {
                      setShowFabTooltip(false);
                      setHasDismissedTooltip(true);
                    }} className="text-white/80 hover:text-white shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Right tail */}
                  <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-green-600/85 border-b-[6px] border-b-transparent backdrop-blur-md"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <button 
                onClick={() => { setIsFabOpen(!isFabOpen); if (isFabOpen) setShowMobilePortoSub(false); }}
                className={`rounded-full shadow-lg focus:outline-none active:scale-95 transition-all w-14 h-14 flex items-center justify-center relative z-[210] backdrop-blur-md ${
                  isFabOpen 
                    ? 'bg-white/85 shadow-slate-200/50 hover:bg-slate-50/90 border border-slate-200 text-slate-700' 
                    : 'bg-green-600/85 hover:bg-green-700/85 shadow-green-600/30'
                }`}
              >
                {isFabOpen ? (
                  <X className="w-6 h-6 animate-in zoom-in duration-300" strokeWidth={2.5} />
                ) : (
                  <Image src="/nav.png" alt="Navigation" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert opacity-95 animate-in zoom-in duration-300" />
                )}
              </button>

              <AnimatePresence>
                {isFabOpen && (
                  <>
                    {/* Invisible overlay to close when clicking outside */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[190]"
                      onClick={() => setIsFabOpen(false)}
                    />
                    
                    {/* The animated popup menu */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 15 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute bottom-[70px] right-0 w-64 rounded-xl p-2 shadow-2xl border border-slate-100 bg-white z-[200]"
                    >
                      <div className="relative grid">
                        <div className={`col-start-1 row-start-1 flex flex-col transition-opacity duration-300 ${showMobilePortoSub ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                          <button onClick={() => { window.location.href = getMainUrl('/job-feed'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item">
                            <div className="bg-blue-100/50 p-2.5 rounded-lg text-blue-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Job Feed
                                <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Soon</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Cari lowongan kerja terbaru</div>
                            </div>
                          </button>
                          
                          <button onClick={() => setShowMobilePortoSub(true)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors mt-1 group/item">
                            <div className="flex items-start gap-4 text-left">
                              <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                                <Layout className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-slate-800">Buat Portofolio</div>
                                <div className="text-xs text-slate-500 mt-0.5">Pamerkan karya Anda</div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover/item:translate-x-1 transition-transform" />
                          </button>
                          
                          <button onClick={() => { router.push('/resume'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors mt-1 group/item">
                            <div className="bg-amber-100/50 p-2.5 rounded-lg text-amber-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Buat CV
                                <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Soon</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Bikin CV standar ATS</div>
                            </div>
                          </button>
                        </div>
                        
                        {/* Sub Menu */}
                        <div className={`col-start-1 row-start-1 flex flex-col transition-opacity duration-300 ${showMobilePortoSub ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          <button onClick={() => setShowMobilePortoSub(false)} className="w-full text-left flex items-center gap-2 p-3 text-slate-500 hover:text-slate-800 transition-colors border-b border-slate-100 mb-2">
                            <ChevronLeft className="w-4 h-4" />
                            <span className="text-sm font-bold">Kembali</span>
                          </button>
                          
                          <a href={getSubdomainUrl('portofolio', '/personal')} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-green-50 transition-colors group/item">
                            <div className="bg-green-100/50 p-2.5 rounded-lg text-green-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <Users className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800">Untuk Personal</div>
                              <div className="text-xs text-slate-500 mt-0.5">Portofolio personal</div>
                            </div>
                          </a>
                          
                          <a href={getSubdomainUrl('portofolio', '/company')} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-green-50 transition-colors mt-1 group/item">
                            <div className="bg-green-100/50 p-2.5 rounded-lg text-green-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Untuk Perusahaan
                                <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Soon</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Company profile B2B</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
