"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import useSWR from "swr";
import { getMyPortfolio } from "@/app/actions/portfolio";
import { auth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";

const fetcher = async () => {
  const result = await getMyPortfolio();
  if (result.success) return result;
  return null;
};

export default function UserProfileDropdown({ 
  email, 
  name, 
  logoutAction,
  variant = "sidebar",
  isPortofind
}: { 
  email?: string;
  name?: string;
  logoutAction: () => Promise<void>;
  variant?: "sidebar" | "header";
  isPortofind?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: swrData } = useSWR('my-portfolio-dashboard', fetcher, {
    dedupingInterval: 5 * 60 * 1000 // 5 menit cache
  });

  const photoUrl = swrData?.data?.personal?.photoUrl;

  const handleClientLogout = async () => {
    try {
      await signOut(auth);
      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (variant === "header") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 text-white shadow-inner overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all hover:opacity-90"
        >
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5" />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
            <div className="px-4 py-2 border-b border-slate-100 flex flex-col">
              <span className="text-slate-800 font-medium truncate leading-tight text-sm">{name || "User"}</span>
              <span className="text-slate-500 text-xs truncate leading-tight mt-0.5">{email}</span>
            </div>
            <button onClick={handleClientLogout} className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 font-medium transition-colors text-sm text-left">
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Handle visibility based on sidebar hover state when in portofind mode
  const textVisibilityClass = isPortofind ? 'opacity-0 w-0 h-0 overflow-hidden group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto group-hover/sidebar:h-auto transition-all duration-300' : 'opacity-100 w-auto h-auto';
  const iconVisibilityClass = isPortofind ? 'opacity-0 w-0 h-0 overflow-hidden group-hover/sidebar:opacity-100 group-hover/sidebar:w-4 group-hover/sidebar:h-4 transition-all duration-300' : 'opacity-100 w-4 h-4';

  return (
    <div className="relative p-3 border-b border-slate-100" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center text-white shrink-0 shadow-inner overflow-hidden">
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 shrink-0" />
            )}
          </div>
          <div className={`flex flex-col pr-2 shrink-0 ${textVisibilityClass}`}>
            <span className="text-slate-800 font-medium truncate leading-tight text-sm">{name || "User"}</span>
            <span className="text-slate-500 text-xs truncate leading-tight">{email}</span>
          </div>
        </div>
        <ChevronDown className={`text-slate-400 shrink-0 transition-all ${isOpen ? 'rotate-180' : ''} ${iconVisibilityClass}`} />
      </button>

      {isOpen && (
        <div className="absolute left-3 right-3 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
          <button
            onClick={handleClientLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 font-medium hover:bg-red-50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Keluar Akun
          </button>
        </div>
      )}
    </div>
  );
}
