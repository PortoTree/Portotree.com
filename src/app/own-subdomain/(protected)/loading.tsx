import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin relative z-10" />
      </div>
      <p className="text-slate-500 font-medium tracking-wide mt-6 animate-pulse">
        Menyiapkan halaman...
      </p>
    </div>
  );
}
