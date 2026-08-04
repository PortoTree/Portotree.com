import Link from "next/link";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 flex flex-col relative">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <span className="font-bold text-slate-800 text-xl tracking-tight">PortoTree</span>
          </Link>
        </div>
        
        <div className="p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium transition-colors shrink-0">
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden md:inline">Overview</span>
          </Link>
          <a href="#account" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors shrink-0">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">Account</span>
          </a>
          <a href="#settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors shrink-0">
            <Settings className="w-5 h-5" />
            <span className="hidden md:inline">Settings</span>
          </a>
        </div>

        <div className="hidden md:block mt-auto p-4 border-t border-slate-200 bg-white">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 font-medium transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
