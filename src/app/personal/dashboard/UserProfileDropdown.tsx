"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import useSWR from "swr";
import { getMyPortfolio } from "@/app/actions/portfolio";

const fetcher = async () => {
  const result = await getMyPortfolio();
  if (result.success) return result;
  return null;
};

export default function UserProfileDropdown({ 
  email, 
  name, 
  logoutAction 
}: { 
  email?: string;
  name?: string;
  logoutAction: () => Promise<void>;
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
              <User className="w-5 h-5" />
            )}
          </div>
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="text-slate-800 font-medium truncate leading-tight text-sm">{name || "User"}</span>
            <span className="text-slate-500 text-xs truncate leading-tight">{email}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-3 right-3 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 font-medium transition-colors text-sm text-left">
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
