import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LayoutDashboard, LogOut, Settings, User, Globe, FileText, CreditCard } from "lucide-react";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import SidebarNav from "./SidebarNav";
import SplashWrapper from "./SplashWrapper";
import UserProfileDropdown from "./UserProfileDropdown";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ── Session Guard ──────────────────────────────────────────────────
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let decodedToken: any = null;
  let username = "";
  let isSuspended = false;
  try {
    decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    const portfolioDoc = await adminDb.collection("portfolios").doc(decodedToken.uid).get();
    if (portfolioDoc.exists) {
      username = portfolioDoc.data()?.username || "";
    }
    
    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    if (userDoc.exists) {
      isSuspended = userDoc.data()?.isSuspended || false;
    }
  } catch {
    redirect("/login");
  }
  // ──────────────────────────────────────────────────────────────────

  async function handleLogout() {
    "use server";
    const { cookies: nextCookies } = await import("next/headers");
    const cookieStore = await nextCookies();
    cookieStore.delete("session");
    redirect("/login");
  }

  if (isSuspended) {
    return (
      <div className="h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center selection:bg-red-200 selection:text-red-900">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Akun Anda Ditangguhkan</h1>
        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          Akses ke dashboard telah diblokir sementara oleh Administrator karena indikasi pelanggaran kebijakan kami. Silakan hubungi dukungan pelanggan untuk informasi lebih lanjut.
        </p>
        <form action={handleLogout}>
          <button type="submit" className="px-6 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition-all">
            Ganti Akun
          </button>
        </form>
      </div>
    );
  }

  return (
    <SplashWrapper>
      <div className="h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 flex flex-col md:h-screen">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo-landscape.png" 
                alt="PortoTree" 
                width={200} 
                height={50} 
                className="h-10 w-auto object-contain shrink-0" 
                priority
              />
            </Link>
            
            {/* Hanya tampil di header untuk mobile */}
            <div className="md:hidden">
              <UserProfileDropdown 
                email={decodedToken.email}
                name={username || decodedToken.name || decodedToken.email?.split('@')[0]}
                logoutAction={handleLogout}
                variant="header"
              />
            </div>
          </div>
          
          {/* Hanya tampil di sidebar untuk desktop */}
          <div className="hidden md:block">
            <UserProfileDropdown 
              email={decodedToken.email}
              name={username || decodedToken.name || decodedToken.email?.split('@')[0]}
              logoutAction={handleLogout}
            />
          </div>

          <SidebarNav />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto h-full relative">
          {children}
        </main>
      </div>
    </SplashWrapper>
  );
}
