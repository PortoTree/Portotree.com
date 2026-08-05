"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutDashboard, Settings, User, Globe, FileText, CreditCard } from "lucide-react";

const navItems = [
  { href: "/personal/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/personal/dashboard/portfolio", label: "Portofolio", icon: Globe },
  { href: "/personal/dashboard/cv-builder", label: "CV Builder", icon: FileText },
  { href: "/personal/dashboard/langganan", label: "Langganan", icon: CreditCard },
  { href: "/personal/dashboard/account", label: "Akun", icon: User },
  { href: "/personal/dashboard/settings", label: "Pengaturan", icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

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

      {/* SIDEBAR NAVIGATION ITEMS */}
      <div className="p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (pathname !== href) {
                  setIsNavigating(true);
                  // Safety fallback: matikan loading setelah 3 detik maksimal (jika routing sangat instan/error)
                  setTimeout(() => setIsNavigating(false), 3000);
                }
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors shrink-0 ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
