"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, ArrowLeft, Users } from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/users", label: "Users", icon: Users },
    { href: "/blogs", label: "Manajemen Blog", icon: FileText },
    { href: "/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/" className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
          <span className="bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">PortoTree</span> Owner
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          // Exact match for /, otherwise check if it starts with href (e.g. /blogs/create matches /blogs)
          const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
          
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                isActive 
                  ? "bg-cyan-50 text-cyan-700" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-cyan-500" : "text-slate-400"}`} />
              {link.label}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-100 space-y-2">
        <a href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"} className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Ke Beranda Utama
        </a>
      </div>
    </aside>
  );
}
