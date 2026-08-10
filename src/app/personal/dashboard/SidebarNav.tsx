"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutDashboard, Settings, User, Globe, FileText, CreditCard, Briefcase, Mail, Info } from "lucide-react";

const navItems = [
  { href: "/personal/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/personal/dashboard/portfolio", label: "Portofolio", icon: Globe },
  { href: "/personal/dashboard/resume", label: "CV Builder", icon: FileText },
  { href: "/personal/dashboard/job-feed", label: "Job Feed", icon: Briefcase, badge: "Progress" },
  { href: "/personal/dashboard/surat-generator", label: "Surat generator", icon: Mail, badge: "Progress" },
  { href: "/personal/dashboard/langganan", label: "Langganan", icon: CreditCard, badge: "Progress" },
  { href: "/personal/dashboard/account", label: "Akun", icon: User, badge: "Progress" },
  { href: "/personal/dashboard/settings", label: "Pengaturan", icon: Settings, badge: "Progress" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Sembunyikan loading otomatis kalau url/pathname sudah berganti (navigasi selesai)
    setIsNavigating(false);
  }, [pathname, searchParams]);

  return (
    <>
      {/* LOADING OVERLAY TRANSTION */}
      {isNavigating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm transition-all duration-300">
          <style>
            {`
              @keyframes slidingBar {
                0% { transform: translateX(-150%); }
                100% { transform: translateX(350%); }
              }
              .animate-sliding-bar {
                animation: slidingBar 1.5s infinite ease-in-out;
              }
            `}
          </style>
          <div className="flex flex-col items-center gap-6 animate-pulse scale-90 md:scale-100">
            <img 
              src="/logo-landscape.png" 
              alt="Loading PortoTree..." 
              className="h-10 object-contain drop-shadow-sm" 
            />
            
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
              <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-emerald-500 rounded-full animate-sliding-bar"></div>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR NAVIGATION ITEMS (DESKTOP) */}
      <div className="hidden md:flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col gap-1 p-4 flex-1">
        {navItems.map(({ href, label, icon: Icon, exact, badge }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (pathname !== href) {
                  setIsNavigating(true);
                  setTimeout(() => setIsNavigating(false), 3000);
                }
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <div className="flex items-center gap-2">
                <span>{label}</span>
                {badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-500 uppercase tracking-wider">{badge}</span>
                )}
              </div>
            </Link>
          );
        })}
        </div>
        
        {/* DESKTOP FOOTER */}
        <div className="p-5 mt-auto border-t border-slate-200 bg-slate-50/80">
          <a 
            href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR"
            target="_blank"
            rel="noopener noreferrer"
            className="block group bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors">
              <Info className="w-4 h-4" />
              <span>Mengalami masalah?</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Join grub whatsapp kami untuk memberikan pesan kritik dan saran
            </p>
          </a>
        </div>
      </div>

      {/* MOBILE TRIGGER BUTTON */}
      <div className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white/70 backdrop-blur-md border border-l-0 border-slate-200/50 shadow-sm py-4 px-1.5 rounded-r-full text-slate-400 hover:text-slate-700 hover:bg-white transition-all group"
        >
          <svg className="transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER (LAYER) */}
      <div 
        className={`md:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer Panel */}
        <div 
          className={`relative w-64 bg-white h-full shadow-xl flex flex-col transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-800">Menu Navigasi</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-1 p-4 overflow-y-auto flex-1">
              {navItems.map(({ href, label, icon: Icon, exact, badge }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (pathname !== href) {
                        setIsNavigating(true);
                        setTimeout(() => setIsNavigating(false), 3000);
                      }
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all shrink-0 ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex items-center gap-2">
                      <span>{label}</span>
                      {badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-500 uppercase tracking-wider">{badge}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* MOBILE FOOTER */}
            <div className="p-5 mt-auto border-t border-slate-200 bg-slate-50/80">
              <a 
                href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR"
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-1.5 text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors">
                  <Info className="w-4 h-4" />
                  <span>Mengalami masalah?</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Join grub whatsapp kami untuk memberikan pesan kritik dan saran
                </p>
              </a>
            </div>
          </div>
        </div>
    </>
  );
}
