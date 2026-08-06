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

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center">
        <img 
          src="/loading-gif.gif" 
          alt="Loading..."
          className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90"
        />
        <div className="flex flex-col items-center justify-center -mt-2 md:-mt-6">
          <div className="w-48 md:w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
             <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-full w-full animate-[loading_2s_linear_forwards]"
               style={{
                 animation: 'progress 2s linear forwards'
               }}
             ></div>
          </div>
          <style>
            {`
              @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}
          </style>
          <p className="text-slate-500 text-xs md:text-sm mt-3 font-medium tracking-widest uppercase">Mempersiapkan Dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
