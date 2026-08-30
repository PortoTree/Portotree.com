"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import UserProfileDropdown from "./UserProfileDropdown";
import SidebarNav from "./SidebarNav";

export default function DashboardSidebarClient({
  email,
  name,
  logoutAction
}: {
  email: string;
  name: string;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const isPortofind = pathname === "/p/portofind" || pathname.startsWith("/p/portofind/");

  // The wrapper occupies fixed width to push the main content
  const wrapperWidthClass = isPortofind ? "md:w-[80px]" : "md:w-64";
  
  // The inner sidebar is absolute, so it can expand over the content without pushing it
  const innerSidebarClass = isPortofind 
    ? "md:w-[80px] hover:md:w-64 group/sidebar portofind-mode md:shadow-[4px_0_24px_rgba(0,0,0,0.04)] hover:md:shadow-[12px_0_48px_rgba(0,0,0,0.12)]" 
    : "md:w-64 group/sidebar normal-mode";

  return (
    <div className={`w-full flex-shrink-0 relative z-50 ${wrapperWidthClass}`}>
      <aside className={`w-full bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col md:h-screen transition-[width,box-shadow] duration-300 ease-in-out md:absolute md:top-0 md:left-0 md:overflow-hidden ${innerSidebarClass}`}>
      <div className={`h-16 flex items-center border-b border-slate-200 shrink-0 md:overflow-hidden ${isPortofind ? 'px-0 justify-center group-hover/sidebar:px-6' : 'px-6 justify-between'}`}>
        <Link href="/" className={`flex items-center shrink-0 ${isPortofind ? 'justify-center group-hover/sidebar:justify-start' : 'justify-start'}`}>
          {/* Logo Icon (Visible only when collapsed) */}
          <div className={`relative h-11 w-11 shrink-0 ${isPortofind ? 'block group-hover/sidebar:hidden' : 'hidden'}`}>
             <Image src="/logo-portotree-2.png" alt="PortoTree" fill className="object-contain" priority />
          </div>
          {/* Logo Landscape (Visible when expanded or not in portofind) */}
          <div className={`relative h-9 w-[140px] shrink-0 ${isPortofind ? 'hidden group-hover/sidebar:block' : 'block'}`}>
             <Image src="/logo-landscape.png" alt="PortoTree" fill className="object-contain object-left" priority />
          </div>
        </Link>
        
        {/* Hanya tampil di header untuk mobile */}
        <div className="md:hidden shrink-0">
          <UserProfileDropdown 
            email={email}
            name={name}
            logoutAction={logoutAction}
            variant="header"
          />
        </div>
      </div>
      
      {/* Hanya tampil di sidebar untuk desktop */}
      <div className={`hidden md:block transition-all duration-300`}>
        <UserProfileDropdown 
          email={email}
          name={name}
          logoutAction={logoutAction}
          isPortofind={isPortofind}
        />
      </div>

      <SidebarNav isPortofind={isPortofind} />
      </aside>
    </div>
  );
}
