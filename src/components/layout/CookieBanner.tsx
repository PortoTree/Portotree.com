"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { getMainUrl } from "@/lib/url";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay slightly to not interrupt immediate page load paints
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("portotree_cookie_consent");
      if (!consent) {
        setShow(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("portotree_cookie_consent", "accepted");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999]"
        >
          <div className="bg-white border-t border-slate-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)] relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[500px] h-full bg-emerald-50/50 rounded-l-full blur-3xl pointer-events-none"></div>
            
            {/* Container for max-w and padding */}
            <div className="max-w-7xl mx-auto px-5 py-5 md:py-6 md:px-8 relative z-10">
              
              <button 
                onClick={acceptCookies}
                className="absolute top-4 right-4 md:hidden text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-full transition-all"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-start gap-4 md:gap-5">
                <div className="bg-emerald-100/80 text-emerald-600 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl shrink-0 shadow-sm border border-emerald-100">
                  <Cookie className="w-6 h-6 md:w-6 md:h-6" />
                </div>
                
                <div className="flex-1 pr-6 md:pr-0 pt-0.5 md:pt-0">
                  <h3 className="font-bold text-slate-900 text-base mb-1 md:hidden">Penggunaan Cookies</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed md:leading-relaxed mb-4">
                    <strong className="hidden md:inline text-slate-900 mr-2 font-bold">Penggunaan Cookies:</strong>
                    Kami menggunakan <i>cookies</i> dan teknologi pelacakan serupa untuk mempersonalisasi konten, menyajikan iklan yang disesuaikan dengan minat Anda, menganalisis arus trafik web, serta mengoptimalkan pengalaman navigasi Anda secara keseluruhan. Dengan terus menggunakan situs PortoTree, Anda menyetujui pengumpulan data melalui <i>cookies</i> ini.
                  </p>
                  
                  {/* Buttons directly underneath text, swapped order, centered */}
                  <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 pt-3 md:pt-4 w-full">
                    <a 
                      href={getMainUrl('/privacy-policy')}
                      className="text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 font-semibold py-2 md:py-2.5 px-2 sm:px-4 md:px-8 rounded-xl transition-all shadow-sm text-xs sm:text-sm md:text-base text-center flex-1 leading-tight md:whitespace-nowrap"
                    >
                      Kebijakan Privasi
                    </a>
                    <button 
                      onClick={acceptCookies}
                      className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold py-2 md:py-2.5 px-2 sm:px-4 md:px-8 rounded-xl transition-all shadow-md shadow-emerald-600/20 text-xs sm:text-sm md:text-base text-center flex-1 leading-tight md:whitespace-nowrap"
                    >
                      Saya Mengerti
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
