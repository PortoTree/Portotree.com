"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function StaticIcon({ srcData, alt, isActive }: { srcData: string, alt: string, isActive: boolean }) {
  return (
    <div className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}>
      <Image 
        src={srcData} 
        alt={alt} 
        width={24} 
        height={24} 
        className="object-contain"
      />
    </div>
  );
}

export default function NavHeaderIcons() {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "/job-subdomain" || pathname === "/job-subdomain/";
  const isChat = pathname.includes("/chat");
  const isNotif = pathname.includes("/notifikasi");

  return (
    <div className="hidden md:flex items-center justify-center gap-10 text-slate-500 flex-1 h-full">
       <Link href="/" className={`relative group h-full flex flex-col items-center justify-center px-2 transition-colors border-b-2 ${isHome ? 'border-emerald-500' : 'border-transparent hover:border-slate-300'}`}>
          <StaticIcon srcData="/home-nav.png" alt="Home" isActive={isHome} />
       </Link>
       <Link href="/chat" className={`relative group h-full flex flex-col items-center justify-center px-2 transition-colors border-b-2 ${isChat ? 'border-emerald-500' : 'border-transparent hover:border-slate-300'}`}>
          <StaticIcon srcData="/chat-nav.png" alt="Messages" isActive={isChat} />
       </Link>
       <Link href="/notifikasi" className={`relative group h-full flex flex-col items-center justify-center px-2 transition-colors border-b-2 ${isNotif ? 'border-emerald-500' : 'border-transparent hover:border-slate-300'}`}>
          <StaticIcon srcData="/notif-nav.png" alt="Notifications" isActive={isNotif} />
       </Link>
    </div>
  );
}
