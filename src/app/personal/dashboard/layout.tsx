import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LayoutDashboard, LogOut, Settings, User, Globe, FileText, CreditCard } from "lucide-react";
import { adminAuth } from "@/lib/firebase/server";
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
  try {
    decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
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

  return (
    <SplashWrapper>
      <div className="h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex-shrink-0 flex flex-col md:h-screen">
          <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
              <span className="font-bold text-slate-800 text-xl tracking-tight">PortoTree</span>
            </Link>
          </div>
          
          <UserProfileDropdown 
            email={decodedToken.email}
            name={decodedToken.name || decodedToken.email?.split('@')[0]}
            logoutAction={handleLogout}
          />

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
