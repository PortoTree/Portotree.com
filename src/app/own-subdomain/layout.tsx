import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/server";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Owner Dashboard | PortoTree",
  description: "Dashboard khusus untuk pengelola PortoTree",
};

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect(process.env.NEXT_PUBLIC_SITE_URL + "/login");
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    const adminEmail = process.env.ADMIN_EMAIL;
    
    // Validasi Keamanan: Pastikan yang login adalah admin yang sah
    if (!adminEmail || decodedToken.email !== adminEmail) {
      console.warn(`Akses ditolak untuk email: ${decodedToken.email}. Hanya admin: ${adminEmail} yang diizinkan.`);
      redirect(process.env.NEXT_PUBLIC_SITE_URL + "/"); // Tendang kembali ke beranda utama
    }
  } catch (error) {
    console.error("Gagal memverifikasi sesi admin:", error);
    redirect(process.env.NEXT_PUBLIC_SITE_URL + "/login");
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-cyan-200 selection:text-cyan-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">PortoTree</span> Owner
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">
            <LayoutDashboard className="w-5 h-5 text-slate-400" />
            Dashboard
          </Link>
          <Link href="/blogs" className="flex items-center gap-3 px-3 py-2 bg-cyan-50 text-cyan-700 rounded-lg transition-colors font-medium">
            <FileText className="w-5 h-5 text-cyan-500" />
            Manajemen Blog
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">
            <Settings className="w-5 h-5 text-slate-400" />
            Pengaturan
          </Link>
        </div>
        
        <div className="p-4 border-t border-slate-100 space-y-2">
          <a href={process.env.NEXT_PUBLIC_SITE_URL} className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Ke Beranda Utama
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:hidden">
          <span className="font-extrabold text-lg bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">PortoTree Owner</span>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
