"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MessageCircle, Lock, Unlock } from "lucide-react";

const DUMMY_CHATS = [
  { id: 1, name: "Budi Santoso", role: "Recruiter - PT Maju Jaya", message: "Apakah Anda tersedia untuk wawancara besok?", time: "10:30", unread: 2, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sarah Wijaya", role: "HR Manager", message: "CV Anda sangat menarik, boleh kita jadwalkan meeting?", time: "Kemarin", unread: 0, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Reza Rahadian", role: "CEO - StartupX", message: "Bisa tolong kirimkan portofolio terbaru?", time: "Kemarin", unread: 0, avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Dina Fitria", role: "Talent Acquisition", message: "Terima kasih atas waktunya. Kami akan segera menghubungi.", time: "2 hr lalu", unread: 0, avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Andi Pratama", role: "Lead Engineer", message: "Apakah bisa menggunakan React Native?", time: "Minggu", unread: 1, avatar: "https://i.pravatar.cc/150?u=5" },
];

export default function DashboardRightSidebarClient() {
  const pathname = usePathname();
  const isPortofind = pathname === "/p/portofind" || pathname.startsWith("/p/portofind/");
  const [isLocked, setIsLocked] = useState(false);

  // Determine if it should act as collapsible
  const shouldCollapse = isPortofind && !isLocked;

  // The wrapper occupies fixed width to push the main content. On Portofind, always 80px.
  const wrapperWidthClass = isPortofind ? "md:w-[80px]" : "md:w-[450px]";
  
  // The inner sidebar is absolute, so it can expand over the content without pushing it
  const innerSidebarClass = isPortofind 
    ? (isLocked 
        ? "md:w-[450px] portofind-mode md:shadow-[-12px_0_48px_rgba(0,0,0,0.12)]" 
        : "md:w-[80px] hover:md:w-[450px] portofind-mode md:shadow-[-4px_0_24px_rgba(0,0,0,0.04)] hover:md:shadow-[-12px_0_48px_rgba(0,0,0,0.12)]")
    : "md:w-[450px] normal-mode";

  // Lock button floating animation classes
  const lockBtnClass = shouldCollapse 
    ? "right-[96px] peer-hover/right-sidebar:right-[466px]" 
    : "right-[466px]";

  // Hide on mobile (hidden md:block wrapper)
  return (
    <div className={`hidden md:block flex-shrink-0 relative z-50 ${wrapperWidthClass}`}>
      <aside className={`peer/right-sidebar group/right-sidebar bg-white border-l border-slate-200 flex flex-col md:h-screen transition-[width,box-shadow,transform] duration-300 ease-in-out md:absolute md:top-0 md:right-0 overflow-hidden ${innerSidebarClass}`}>
        
        {/* Header */}
        <div className={`h-16 flex items-center border-b border-slate-200 shrink-0 overflow-hidden transition-all duration-300 ${shouldCollapse ? 'px-0 justify-center group-hover/right-sidebar:px-5' : 'px-5 justify-start'}`}>
          <div className="flex items-center gap-3 shrink-0">
             <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
               <MessageCircle className="w-5 h-5 text-blue-600" />
             </div>
             <span className={`font-bold text-slate-800 shrink-0 whitespace-nowrap transition-all duration-300 ${shouldCollapse ? 'opacity-0 w-0 group-hover/right-sidebar:opacity-100 group-hover/right-sidebar:w-auto' : 'opacity-100 w-auto'}`}>
               Pesan Masuk
             </span>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto py-2 overflow-x-hidden custom-scrollbar">
          {DUMMY_CHATS.map(chat => (
             <button key={chat.id} className={`w-full flex items-center transition-all p-3 hover:bg-slate-50 text-left relative ${shouldCollapse ? 'justify-center gap-0 group-hover/right-sidebar:justify-start group-hover/right-sidebar:gap-3 group-hover/right-sidebar:px-4' : 'justify-start gap-3 px-4'}`}>
                
                {/* Avatar with unread indicator for collapsed state */}
                <div className="relative shrink-0">
                   <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                     <Image src={chat.avatar} alt={chat.name} width={44} height={44} className="object-cover w-full h-full" />
                   </div>
                   
                   {/* Unread badge shown ONLY when collapsed (on top of avatar) */}
                   {chat.unread > 0 && (
                     <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white transition-all duration-300 ${shouldCollapse ? 'scale-100 opacity-100 group-hover/right-sidebar:scale-0 group-hover/right-sidebar:opacity-0' : 'scale-0 opacity-0 hidden'}`}>
                       {chat.unread}
                     </span>
                   )}
                </div>

                {/* Text Details */}
                <div className={`flex flex-col shrink-0 transition-all duration-300 ${shouldCollapse ? 'opacity-0 w-0 h-0 overflow-hidden group-hover/right-sidebar:opacity-100 group-hover/right-sidebar:w-[360px] group-hover/right-sidebar:h-auto' : 'opacity-100 w-[360px]'}`}>
                  <div className="flex items-center justify-between gap-1 w-full">
                     <span className="text-sm font-bold text-slate-800 truncate pr-1">{chat.name}</span>
                     <span className="text-[10px] font-medium text-slate-400 shrink-0">{chat.time}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{chat.role}</span>
                  
                  <div className="flex items-center justify-between gap-2 mt-1 w-full">
                    <p className={`text-xs truncate ${chat.unread > 0 ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>{chat.message}</p>
                    
                    {/* Expanded Unread Badge */}
                    {chat.unread > 0 && (
                      <span className={`bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 transition-all ${shouldCollapse ? 'opacity-0 scale-50 group-hover/right-sidebar:opacity-100 group-hover/right-sidebar:scale-100' : 'opacity-100 scale-100'}`}>
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>

              </button>
          ))}
        </div>
      </aside>

      {/* Floating Lock Button rendered AFTER aside to utilize peer-hover */}
      {isPortofind && (
        <button 
          onClick={() => setIsLocked(!isLocked)}
          className={`absolute top-4 w-12 h-12 bg-white border border-slate-200 shadow-md rounded-full flex items-center justify-center z-[60] text-slate-400 hover:text-slate-700 transition-all duration-300 ease-in-out ${lockBtnClass}`}
          title={isLocked ? "Buka kuncian" : "Kunci sidebar agar terbuka"}
        >
          {isLocked ? <Lock className="w-5 h-5 text-red-500" /> : <Unlock className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
