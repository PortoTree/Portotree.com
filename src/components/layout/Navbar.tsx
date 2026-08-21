"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ShoppingCart, Briefcase, Layout, FileText, X, Users, Building2, ChevronLeft, ChevronRight, Menu, Lightbulb, BookOpen, Newspaper, Home, Layers, Phone, Package, Info, ShieldCheck, FileSignature } from 'lucide-react';
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

// Icon map untuk kategori blog
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'karier':      <Briefcase className="w-5 h-5" />,
  'tips-trik':   <Lightbulb className="w-5 h-5" />,
  'edukasi':     <BookOpen className="w-5 h-5" />,
  'info-berita': <Newspaper className="w-5 h-5" />,
  'dokumen':     <FileText className="w-5 h-5" />,
  'portofolio':  <Layout className="w-5 h-5" />,
};
const CATEGORY_ICONS_SM: Record<string, React.ReactNode> = {
  'karier':      <Briefcase className="w-4 h-4" />,
  'tips-trik':   <Lightbulb className="w-4 h-4" />,
  'edukasi':     <BookOpen className="w-4 h-4" />,
  'info-berita': <Newspaper className="w-4 h-4" />,
  'dokumen':     <FileText className="w-4 h-4" />,
  'portofolio':  <Layout className="w-4 h-4" />,
};

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showFabTooltip, setShowFabTooltip] = useState(false);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showMobilePortoSub, setShowMobilePortoSub] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProdukOpen, setIsMobileProdukOpen] = useState(false);
  const [isMobileBlogOpen, setIsMobileBlogOpen] = useState(false);
  const [isPortofolioDomain, setIsPortofolioDomain] = useState(false);
  const [isSuratDomain, setIsSuratDomain] = useState(false);
  const [isResumeDomain, setIsResumeDomain] = useState(false);
  // Dynamic blog categories
  const [navCategories, setNavCategories] = useState<{ slug: string; label: string; description: string }[]>([]);
  const router = useRouter();
  const pathname = usePathname() || '';
  const isSubdomain = pathname.startsWith('/portofolio-subdomain') || pathname.startsWith('/resume-subdomain');
  const isBlogPage = pathname.startsWith('/blog') || pathname.startsWith('/tags');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPortofolioDomain(window.location.hostname.includes('portofolio'));
      setIsSuratDomain(window.location.hostname.includes('surat'));
      setIsResumeDomain(window.location.hostname.includes('resume'));
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsAuthLoaded(true);
    });

    // Fetch dynamic blog categories
    fetch('/api/blog/categories')
      .then((r) => r.json())
      .then((json) => {
        if (json.data?.length) {
          console.log('[Navbar] blog categories loaded:', json.data.map((c: any) => c.slug));
          setNavCategories(json.data);
        }
      })
      .catch((e) => console.warn('[Navbar] failed to load blog categories', e));

    return () => unsubscribe();
  }, []);

  // Always fetch session state from server to sync cross-subdomain auth
  const { data: swrData, isLoading: swrLoading } = useSWR('my-portfolio-navbar', fetcher, {
    dedupingInterval: 5 * 60 * 1000
  });

  useEffect(() => {
    if (!swrLoading) {
      setIsAuthLoaded(true);
    }
    if (swrData) {
      if (swrData.success) {
        setIsLoggedIn(true);
        if (swrData.data?.personal?.photoUrl) {
          setPhotoUrl(swrData.data.personal.photoUrl);
        }
      }
    }
  }, [swrData, swrLoading]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await removeSession();
      // Clear all local caches to prevent cross-account data leakage
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
        localStorage.removeItem('draft_template_sections');
        localStorage.removeItem('draft_template_config');
      }
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

  // Lock body scroll when mobile menus are open
  useEffect(() => {
    if (isMobileMenuOpen || isFabOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isFabOpen]);

  const renderMobileBlogAccordion = () => (
    <div className="flex flex-col border-b border-slate-100">
      <button onClick={() => setIsMobileBlogOpen(!isMobileBlogOpen)} className="py-4 hover:text-green-600 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5" /> Blog
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileBlogOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isMobileBlogOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col pl-8 bg-slate-50/50 rounded-lg mb-2">
            <a href={getMainUrl('/blog')} onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-100 hover:text-green-600 flex items-center gap-3 text-sm">
              <Home className="w-4 h-4" /> Semua Artikel
            </a>
            {navCategories.map((cat, i) => (
              <a
                key={cat.slug}
                href={getMainUrl(`/blog/tags/${cat.slug}`)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-3 hover:text-green-600 flex items-center gap-3 text-sm ${
                  i < navCategories.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                {CATEGORY_ICONS_SM[cat.slug] ?? <FileText className="w-4 h-4" />} {cat.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
              {isSuratDomain && (
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent -ml-1">Surat</span>
              )}
              {isResumeDomain && (
                <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent -ml-1">Resume</span>
              )}
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

                <a href="#layanan" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  Layanan
                </a>
                <a href="#klien" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Klien
                </a>
                <a href="#kontak" className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  Kontak
                </a>
              </nav>
            ) : pathname.includes('/personal') ? (
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

                <a href={getSubdomainUrl('resume')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Buat CV
                </a>
                <div className="relative group">
                  <Link href={getMainUrl('/blog')} className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1.5 focus:outline-none py-2">
                    <BookOpen className="w-4 h-4" />
                    Blog <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-200 group-hover:-rotate-180" />
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white rounded-xl p-2 shadow-xl border border-slate-100 grid grid-cols-2 gap-1">
                      <a href={getMainUrl('/blog')} className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group/item col-span-2">
                        <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800">Semua Artikel</div>
                          <div className="text-xs text-slate-500 mt-0.5">Halaman utama blog</div>
                        </div>
                      </a>
                      {navCategories.map((cat) => (
                        <a key={cat.slug} href={getMainUrl(`/blog/tags/${cat.slug}`)} className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group/item">
                          <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                            {CATEGORY_ICONS[cat.slug] ?? <FileText className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-800">{cat.label}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{cat.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={getMainUrl('/about')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Tentang kami
                </Link>
              </nav>
            ) : (
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <div className="relative group">
                  <button className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1.5 focus:outline-none py-2">
                    <Package className="w-4 h-4" />
                    Produk <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-200 group-hover:-rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white rounded-xl p-2 shadow-xl border border-slate-100 flex flex-col">

                      <a href={getSubdomainUrl('portofolio')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-emerald-50 transition-colors mt-1 group/item">
                        <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <Layout className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800">Buat Portofolio</div>
                          <div className="text-xs text-slate-500 mt-0.5">Pamerkan karya Anda</div>
                        </div>
                      </a>
                      <a href={getSubdomainUrl('resume')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors mt-1 group/item">
                        <div className="bg-amber-100/50 p-2.5 rounded-lg text-amber-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                            Buat CV
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Bikin CV standar ATS</div>
                        </div>
                      </a>
                      <a href={getSubdomainUrl('surat')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-indigo-50 transition-colors mt-1 group/item">
                        <div className="bg-indigo-100/50 p-2.5 rounded-lg text-indigo-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <FileSignature className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                            Surat Generator
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Bikin surat resmi dengan mudah</div>
                        </div>
                      </a>
                      {/* <a href={getSubdomainUrl('portofind')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors mt-1 group/item">
                        <div className="bg-blue-100/50 p-2.5 rounded-lg text-blue-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                            Portofind <span className="text-[9px] font-bold uppercase tracking-widest bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">Soon</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Temukan peluang karir</div>
                        </div>
                      </a>
                      <a href={getSubdomainUrl('marketsee')} className="flex items-start gap-4 p-3 rounded-lg hover:bg-purple-50 transition-colors mt-1 group/item">
                        <div className="bg-purple-100/50 p-2.5 rounded-lg text-purple-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                            Marketsee <span className="text-[9px] font-bold uppercase tracking-widest bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Soon</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Jual produk & karya digital</div>
                        </div>
                      </a> */}
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <Link href={getMainUrl('/blog')} className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1.5 focus:outline-none py-2">
                    <BookOpen className="w-4 h-4" />
                    Blog <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-200 group-hover:-rotate-180" />
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white rounded-xl p-2 shadow-xl border border-slate-100 grid grid-cols-2 gap-1">
                      <a href={getMainUrl('/blog')} className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group/item col-span-2">
                        <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-800">Semua Artikel</div>
                          <div className="text-xs text-slate-500 mt-0.5">Halaman utama blog</div>
                        </div>
                      </a>
                      {navCategories.map((cat) => (
                        <a key={cat.slug} href={getMainUrl(`/blog/tags/${cat.slug}`)} className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group/item">
                          <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                            {CATEGORY_ICONS[cat.slug] ?? <FileText className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-800">{cat.label}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{cat.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href={getMainUrl('/about')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Tentang kami
                </Link>
                <Link href={getMainUrl('/contact')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  Kontak
                </Link>
              </nav>
            )}
            
            <div className="flex items-center gap-4">
              {!isAuthLoaded ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:block w-[140px] h-10 bg-slate-200 animate-pulse rounded-full"></div>
                  <div className="w-8 h-8 border-2 border-transparent bg-slate-200 animate-pulse rounded-full"></div>
                </div>
              ) : (
                <>
                  {/* Tombol Utama (Disembunyikan di Mobile) */}
                  <a href={isLoggedIn ? getMainUrl("/personal/dashboard") : getMainUrl("/register")} className="hidden md:block">
                    <Button className="rounded-full px-6 bg-slate-900 hover:bg-slate-800 text-white font-medium border-0">
                      {isLoggedIn ? "Dashboard" : "Daftar Sekarang"}
                    </Button>
                  </a>

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
                        onClick={() => { window.location.href = getMainUrl('/personal/dashboard'); }} 
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
                        onClick={() => window.location.href = getMainUrl('/login')}
                      >
                        Login
                      </DropdownMenuItem>
                      <Button 
                        onClick={() => window.location.href = getMainUrl('/register')} 
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12"
                      >
                        Daftar
                      </Button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Floating Mobile Menu Toggle (Right Edge) */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-white/60 backdrop-blur-sm border border-r-0 border-slate-200 shadow-sm py-3 pl-2 pr-1 rounded-l-full hover:bg-white/90 transition-all duration-300 opacity-60 hover:opacity-100 group"
      >
        <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-600" />
      </button>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[120] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-[130] p-6 shadow-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-xl text-slate-900">Menu</div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-500 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col font-medium text-slate-700 flex-1 overflow-y-auto pb-6">
                {pathname.includes('/company') ? (
                  <>

                    <a href="#layanan" onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Layers className="w-5 h-5" /> Layanan
                    </a>
                    <a href="#klien" onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Users className="w-5 h-5" /> Klien
                    </a>
                    <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-green-600 flex items-center gap-3">
                      <Phone className="w-5 h-5" /> Kontak
                    </a>
                  </>
                ) : pathname.includes('/personal') ? (
                  <>

                    <a href={getSubdomainUrl('resume')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <FileText className="w-5 h-5" /> Buat CV
                    </a>
                    {renderMobileBlogAccordion()}
                    <Link href={getMainUrl('/about')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-green-600 flex items-center gap-3">
                      <Info className="w-5 h-5" /> Tentang
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col border-b border-slate-100">
                      <button onClick={() => setIsMobileProdukOpen(!isMobileProdukOpen)} className="py-4 hover:text-green-600 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5" /> Produk
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileProdukOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isMobileProdukOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col pl-8 bg-slate-50/50 rounded-lg mb-2">

                            <a href={getSubdomainUrl('portofolio')} onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-100 hover:text-green-600 flex items-center gap-3 text-sm">
                              <Layout className="w-4 h-4" /> Buat Portofolio
                            </a>
                            <a href={getSubdomainUrl('resume')} onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-100 hover:text-green-600 flex items-center gap-3 text-sm">
                              <FileText className="w-4 h-4" /> Buat CV
                            </a>
                            <a href={getSubdomainUrl('surat')} onClick={() => setIsMobileMenuOpen(false)} className="py-3 hover:text-green-600 flex items-center gap-3 text-sm">
                              <FileSignature className="w-4 h-4" /> Buat Surat
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {renderMobileBlogAccordion()}
                    <Link href={getMainUrl('/about')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Info className="w-5 h-5" /> Tentang
                    </Link>
                    <Link href={getMainUrl('/contact')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Phone className="w-5 h-5" /> Kontak
                    </Link>
                    <Link href={getMainUrl('/privacy-policy')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5" /> Kebijakan Privasi
                    </Link>
                    <Link href={getMainUrl('/terms-and-conditions')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-green-600 flex items-center gap-3">
                      <FileSignature className="w-5 h-5" /> Ketentuan Layanan
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

                          
                          <button onClick={() => { window.location.href = getSubdomainUrl('portofolio'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors mt-1 group/item">
                            <div className="flex items-start gap-4 text-left">
                              <div className="bg-emerald-100/50 p-2.5 rounded-lg text-emerald-600 shrink-0 transition-transform group-hover/item:scale-110">
                                <Layout className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-sm text-slate-800">Buat Portofolio</div>
                                <div className="text-xs text-slate-500 mt-0.5">Pamerkan karya Anda</div>
                              </div>
                            </div>
                          </button>
                          
                          <button onClick={() => { window.location.href = getSubdomainUrl('resume'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors mt-1 group/item">
                            <div className="bg-amber-100/50 p-2.5 rounded-lg text-amber-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Buat CV
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Bikin CV standar ATS</div>
                            </div>
                          </button>
                          
                          <button onClick={() => { window.location.href = getSubdomainUrl('surat'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-indigo-50 transition-colors mt-1 group/item">
                            <div className="bg-indigo-100/50 p-2.5 rounded-lg text-indigo-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <FileSignature className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Surat Generator
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Bikin surat resmi dengan mudah</div>
                            </div>
                          </button>
                          
                          {/* <button onClick={() => { window.location.href = getSubdomainUrl('portofind'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors mt-1 group/item">
                            <div className="bg-blue-100/50 p-2.5 rounded-lg text-blue-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Portofind <span className="text-[9px] font-bold uppercase tracking-widest bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">Soon</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Temukan peluang karir</div>
                            </div>
                          </button>
                          
                          <button onClick={() => { window.location.href = getSubdomainUrl('marketsee'); setIsFabOpen(false); setShowMobilePortoSub(false); }} className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-purple-50 transition-colors mt-1 group/item">
                            <div className="bg-purple-100/50 p-2.5 rounded-lg text-purple-600 shrink-0 transition-transform group-hover/item:scale-110">
                              <ShoppingCart className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                Marketsee <span className="text-[9px] font-bold uppercase tracking-widest bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Soon</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">Jual produk & karya digital</div>
                            </div>
                          </button> */}
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
