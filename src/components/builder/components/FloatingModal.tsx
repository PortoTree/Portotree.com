import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, GripHorizontal } from 'lucide-react';

interface FloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  activeElementId?: string | null;
  theme?: 'light' | 'dark';
}

export function FloatingModal({ isOpen, onClose, title, children, activeElementId, theme = 'light' }: FloatingModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // If not mobile, try to position next to the active element
    if (isOpen && !isMobile) {
      setTimeout(() => {
        let newX = window.innerWidth - 420;
        let newY = 100;

        if (activeElementId) {
          const el = document.getElementById(`builder-el-${activeElementId}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Try to put it to the right of the element, otherwise left, otherwise center
            newX = rect.right + 20;
            newY = Math.max(80, rect.top);
            
            if (newX + 400 > window.innerWidth) {
              newX = rect.left - 420;
            }
            if (newX < 0) {
              newX = window.innerWidth / 2 - 200;
            }
          }
        }
        setPosition({ x: newX, y: newY });
      }, 100);
    }
  }, [isOpen, activeElementId, isMobile]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile only */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-[99]"
            />
          )}

          <motion.div
            ref={dragRef}
            drag={!isMobile}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, x: position.x, y: position.y }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, x: position.x, y: position.y }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`
              fixed z-[100] flex flex-col shadow-2xl overflow-hidden
              ${isMobile 
                ? 'bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl' 
                : 'w-[400px] h-[80vh] rounded-xl border'
              }
              ${theme === 'dark' 
                ? 'bg-zinc-900 border-zinc-800' 
                : 'bg-white border-slate-200'
              }
            `}
            style={!isMobile ? { position: 'fixed' } : undefined}
          >
            {/* Header / Drag Handle */}
            <div 
              onPointerDown={(e) => {
                if (!isMobile) dragControls.start(e);
              }}
              className={`
              flex items-center justify-between px-4 py-3 border-b shrink-0
              ${!isMobile ? 'cursor-move' : ''}
              ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-slate-200 bg-slate-50'}
            `}>
              <div className="flex items-center gap-2 pointer-events-none">
                {isMobile && <GripHorizontal className="w-5 h-5 text-slate-400 mx-auto absolute left-1/2 -translate-x-1/2" />}
                <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-800'}`}>
                  {title}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className={`p-1.5 rounded-md hover:bg-black/10 transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto canvas-scrollbar p-0">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
