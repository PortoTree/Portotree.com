"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Tampilkan splash setiap kali pindah halaman (pathname berubah)
    setShowSplash(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // 1.5 detik agar tidak terlalu lama saat pindah tab

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center">
          <img 
            src="/loading-gif.gif" 
            alt="Loading..."
            className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90"
          />
        </div>
      )}
      {children}
    </>
  );
}
