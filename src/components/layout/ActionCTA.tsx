import { Globe, FileText, Mail } from "lucide-react";
import { getSubdomainUrl } from "@/lib/url";

export function ActionCTA() {
  return (
    <section className="pt-16 pb-24 md:pt-20 bg-slate-50 border-t border-border/40">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Apa yang Anda butuhkan saat ini?
          </h2>
          <p className="text-lg md:text-xl text-gray-500">
            Pilih jalur di bawah untuk mulai membangun identitas profesional Anda.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <a 
            href={getSubdomainUrl('portofolio')} 
            className="group flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 sm:py-12 sm:px-8 rounded-3xl border border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-100/80 group-hover:bg-white/20 text-green-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
              <Globe className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
              Buat Portofolio
            </span>
          </a>
          
          <a 
            href={getSubdomainUrl('resume')} 
            className="group flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 sm:py-12 sm:px-8 rounded-3xl border border-amber-600 bg-white text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-amber-100/80 group-hover:bg-white/20 text-amber-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
              Buat CV
            </span>
          </a>

          <a 
            href={getSubdomainUrl('surat')} 
            className="group flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 sm:py-12 sm:px-8 rounded-3xl border border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-100/80 group-hover:bg-white/20 text-blue-600 group-hover:text-white rounded-full flex items-center justify-center mr-4 sm:mr-0 mb-0 sm:mb-6 group-hover:scale-110 transition-all duration-300">
              <Mail className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-left sm:text-center">
              Buat Surat
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
