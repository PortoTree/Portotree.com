"use client";

import { useState, useEffect } from "react";
import VisualPageBuilder from "@/components/builder/CanvasArea";
import { UIProvider } from "@/components/ui/UIProvider";

export default function PortfolioBuilderPage() {
  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setForcedLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (forcedLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center">
        <img 
          src="/loading-gif.gif" 
          alt="Loading..."
          className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90"
        />
      </div>
    );
  }

  return (
    <VisualPageBuilder />
  );
}
