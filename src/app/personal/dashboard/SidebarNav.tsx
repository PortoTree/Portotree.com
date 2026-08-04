"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div className="p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
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
  );
}
