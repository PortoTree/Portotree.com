"use client";

import { useState, useEffect } from "react";

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Tampilkan splash selama 2 detik setiap kali di-refresh / mount
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
