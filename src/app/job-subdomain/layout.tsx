import { Mail, BadgeCheck, MapPin, Briefcase, BookOpen, Home, MessageSquare, Bell } from "lucide-react";
import { cookies } from "next/headers";
import NavHeaderIcons from "@/components/job/NavHeaderIcons";
import RightSidebarWrapper from "@/components/job/RightSidebarWrapper";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import Image from "next/image";
import AnnouncementCarousel from "@/components/dashboard/AnnouncementCarousel";
import Link from "next/link";
import { getPublishedBlogs } from "@/app/actions/blog";
import JobAuthModal from "@/components/job/JobAuthModal";

export default async function JobLayout({ children }: { children: React.ReactNode }) {
  const blogsResponse = await getPublishedBlogs();
  const recentBlogs = blogsResponse?.data?.slice(0, 6) || [];

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  
  let userEmail = "";
  let fullName = "Pengguna";
  let photoUrl = "";
  let location = "Indonesia";

  if (sessionCookie) {
    try {
      const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
      userEmail = decodedToken.email || "";
      
      const portfolioDoc = await adminDb.collection("portfolios").doc(decodedToken.uid).get();
      if (portfolioDoc.exists) {
        const pData = portfolioDoc.data();
        const personal = pData?.data?.personal;
        fullName = personal?.fullName || personal?.name || fullName;
        photoUrl = personal?.photoUrl || "";
        location = personal?.location || location;
      }
    } catch (e) {}
  }

  return (
    <>
      <JobAuthModal isLoggedIn={!!sessionCookie} />
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}
      </style>
      <div className="min-h-screen bg-[#E5E1E1] flex">
        
        {/* FULL HEIGHT LEFT SIDEBAR */}
        <aside className="fixed top-0 left-0 z-50 w-[280px] h-screen bg-[#E5E1E1] flex-col hidden md:flex">
          {/* Sidebar Header (Portofind Logo) */}
          <div className="h-14 border-b border-slate-200 flex items-center px-6 shrink-0 bg-white">
            <Link href="/job-subdomain" className="font-bold text-slate-800 text-xl flex items-center">
              <Image src="/logo-landscape.png" alt="Portotree" width={200} height={50} className="h-10 w-auto" priority />
              <span className="text-emerald-600 ml-2 font-bold text-xl">Jobs</span>
            </Link>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Profile Section */}
            <div className="relative border border-slate-200 pb-6 bg-white mx-4 mt-5 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-24 bg-emerald-100/60 w-full relative overflow-hidden"><Image src="/banner-portotree.webp" alt="Banner" fill className="object-cover" priority /></div>
              <div className="px-6">
                <div className="relative flex justify-center -mt-10 mb-3">
                  <div className="w-20 h-20 rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden">
                      {photoUrl ? (
                        <Image src={photoUrl} alt={fullName} width={80} height={80} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-600 text-white font-bold text-2xl">
                          {fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="font-bold text-slate-800 text-lg">{fullName}</h2>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[150px]">{userEmail}</span>
                    <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  {location && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{location}</span>
                    </div>
                  )}
                  <div className="mt-4 flex justify-center gap-2">
                    <Link href="https://portotree.com/p/account" className="px-5 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-800 font-semibold text-xs rounded-full transition-colors flex items-center gap-1.5">
                      Profil
                    </Link>
                    <Link href="https://portotree.com/p" className="px-5 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700 font-semibold text-xs rounded-full transition-colors flex items-center gap-1.5">
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="md:pl-[280px] flex flex-col min-h-screen w-full">
          {/* Top Header */}
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm h-14 flex items-center px-4 md:px-8 w-full gap-4">
            <div className="md:hidden font-bold text-slate-800 text-lg flex items-center shrink-0">
              <Image src="/logo-landscape.png" alt="Portotree" width={180} height={45} className="h-9 w-auto" priority />
              <span className="text-emerald-600 ml-1.5 font-bold">Jobs</span>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Cari lokasi (contoh: Jakarta)..." 
                  className="w-full bg-slate-50 border border-slate-300 text-sm rounded-full pl-9 pr-4 py-1.5 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-700 placeholder:text-slate-400"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Navigation Icons (Center) */}
              <NavHeaderIcons />

              {/* Right Profile */}
              <div className="flex items-center shrink-0 ml-auto">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-emerald-500 overflow-hidden sm:ml-2">
                {photoUrl ? (
                  <Image src={photoUrl} alt="Profile" width={32} height={32} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-600 text-white font-bold text-xs">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </header>
          
          <main className="max-w-[1000px] w-full mx-auto py-6 px-4 md:px-8 flex flex-col lg:flex-row gap-6 items-start">
            {/* Center Feed */}
            <div className="space-y-4">
              {children}
            </div>

            {/* Right Sidebar (Trending) */}
              <RightSidebarWrapper recentBlogs={recentBlogs} />
          </main>
        </div>
      </div>
    </>
  );
}