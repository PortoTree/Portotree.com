"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Building2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function PortofolioHub() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100/50 via-slate-50/50 to-slate-50 z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">PortoTree</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pilih tipe akun Anda untuk mulai membangun identitas digital. Apakah Anda membangun portofolio personal atau profil bisnis?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Card 1: Personal */}
            <Link href="/personal">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all border border-slate-200 hover:border-green-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="w-6 h-6 text-green-500" />
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Users className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Untuk Personal</h3>
                <p className="text-slate-600 mb-6 flex-1">
                  Cocok untuk desainer, programmer, <strong>copywriter</strong>, dan profesional yang ingin memamerkan karya dan CV dalam satu tempat elegan.
                </p>
                
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Galeri Proyek Interaktif
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Integrasi Resume (CV)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Tautan Bio Kustom
                  </li>
                </ul>

                <div className="mt-auto inline-flex items-center font-semibold text-green-600 group-hover:text-green-700">
                  Buat Portofolio Personal <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </motion.div>
            </Link>

            {/* Card 2: Company */}
            <Link href="/company">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all border border-slate-200 hover:border-blue-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="w-6 h-6 text-blue-500" />
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-3">
                  Untuk Perusahaan
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full uppercase tracking-widest leading-none">Soon</span>
                </h3>
                <p className="text-slate-600 mb-6 flex-1">
                  Cocok untuk agensi, B2B, dan <strong>startup</strong> yang ingin membangun <strong>Company Profile</strong> profesional untuk meyakinkan klien & investor.
                </p>
                
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Etalase Layanan B2B
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Testimoni & Klien
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Halaman Struktur Tim
                  </li>
                </ul>

                <div className="mt-auto inline-flex items-center font-semibold text-blue-600 group-hover:text-blue-700">
                  Buat Profil Perusahaan <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </motion.div>
            </Link>
          </div>
          
        </div>
      </main>
    </div>
  );
}
