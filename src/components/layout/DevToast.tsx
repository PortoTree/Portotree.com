"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function DevToast() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Hide on public portfolio pages (/p/[username])
  if (pathname?.startsWith('/p/')) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-[calc(50%+30px)] left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-6 md:translate-y-0 z-[100] pl-4 pr-2 py-1.5 rounded-full bg-slate-900/25 md:bg-slate-900/80 backdrop-blur-md text-white text-sm font-medium shadow-2xl border border-white/10 flex items-center gap-3 whitespace-nowrap w-max"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></div>
            Sedang tahap development
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/25 rounded-full p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
