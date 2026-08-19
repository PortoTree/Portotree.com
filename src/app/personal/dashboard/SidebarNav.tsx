"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Settings, User, Globe, FileText, CreditCard, Briefcase, Mail, Info } from "lucide-react";

const navItems = [
  { href: "/personal/dashboard", label: "Dashboard", icon: Home, exact: true },
  { href: "/personal/dashboard/statistik", label: "Statistik", icon: BarChart2, exact: true },
  // { href: "/personal/dashboard/portofind", label: "Portofind", icon: Briefcase, badge: "Progress" },
  { href: "/personal/dashboard/portofolio", label: "Portofolio", icon: Globe },
  { href: "/personal/dashboard/resume", label: "CV Builder", icon: FileText },
  { href: "/personal/dashboard/surat-generator", label: "Surat generator", icon: Mail },
  { href: "/personal/dashboard/langganan", label: "Langganan", icon: CreditCard },
  { href: "/personal/dashboard/account", label: "Akun", icon: User },
];

export default function SidebarNav({ isPortofind }: { isPortofind?: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Group classes to hide text/badges if collapsed, but show on hover
  const textVisibilityClass = isPortofind ? 'opacity-0 w-0 overflow-hidden group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto transition-all duration-300' : 'opacity-100 w-auto';

  return (
    <>

      {/* SIDEBAR NAVIGATION ITEMS (DESKTOP) */}
      <div className="hidden md:flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col gap-1 p-4 flex-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <div className={`flex items-center gap-2 ${textVisibilityClass}`}>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            </Link>
          );
        })}
        </div>
        
        {/* DESKTOP FOOTER */}
        <div className={`p-5 mt-auto border-t border-slate-200 bg-slate-50/80 transition-all duration-300 ${isPortofind ? 'opacity-0 hidden group-hover/sidebar:opacity-100 group-hover/sidebar:block' : 'opacity-100 block'}`}>
          <a 
            href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR"
            target="_blank"
            rel="noopener noreferrer"
            className="block group bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors whitespace-nowrap">
              <Info className="w-4 h-4 shrink-0" />
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
              {navItems.map(({ href, label, icon: Icon, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
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
