"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function TutorialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const totalSteps = 7;

  useEffect(() => {
    const hideTutorial = localStorage.getItem("hide_porto_builder_tutorial");
    if (!hideTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hide_porto_builder_tutorial", "true");
    }
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
      window.dispatchEvent(new CustomEvent('tour-open-add-section', { detail: true }));
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden h-[85vh] md:h-[80vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            Panduan Builder <span className="text-slate-400 font-normal text-sm ml-2">({currentStep + 1}/{totalSteps})</span>
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Image) */}
        <div className="flex-1 overflow-hidden bg-slate-100 relative w-full">
          <div className="absolute inset-0">
            <Image 
              src={`/intruksi/porto-builder/step${currentStep + 1}.png`} 
              alt={`Tutorial Step ${currentStep + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Footer (Controls) */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
              Jangan tampilkan lagi
            </span>
          </label>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors hidden sm:block"
            >
              Skip
            </button>

            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1 sm:flex-none px-4 py-2 flex items-center justify-center gap-1.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Kembali
              </button>
              
              <button 
                onClick={handleNext}
                className="flex-1 sm:flex-none px-6 py-2 flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
              >
                {currentStep === totalSteps - 1 ? 'Mulai' : 'Lanjut'}
                {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
