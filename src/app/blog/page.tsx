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
      <main className="pt-32 pb-24 flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="w-24 h-24 bg-cyan-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <span className="text-5xl">🌱</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Sesuatu yang Besar <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">Sedang Disiapkan</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
            Halaman blog ini masih dalam tahap pengembangan. Kami sedang menyiapkan artikel, *insight*, dan panduan karir terbaik khusus untuk Anda.
          </p>
          
          <div className="pt-8">
            <Link 
              href="/"
              className="inline-flex items-center justify-center font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors h-14 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
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
