import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/server";
import Link from "next/link";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const metadata = {
  title: "Management | PortoTree",
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
    redirect("/login");
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
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-cyan-200 selection:text-cyan-900">
      {/* Sidebar */}
      <AdminSidebar />

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
