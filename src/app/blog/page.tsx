import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog | PortoTree",
  description: "Artikel, cerita, dan panduan karir terbaik dari PortoTree.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-200 selection:text-cyan-900">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">Cerita Kami</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Insight, panduan karir, dan cerita menarik dari para profesional yang telah membangun identitas digital mereka.
            </p>
          </div>
          
          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-16">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Cari artikel..." 
              className="w-full bg-white border border-slate-200 text-slate-900 text-lg rounded-full py-4 pl-12 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>
          
          {/* Empty State for now */}
          <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Belum ada artikel</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Kami sedang menyiapkan tulisan-tulisan terbaik untuk membantu perjalanan karirmu. Pantau terus halaman ini!
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors h-12 px-8 rounded-full"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
