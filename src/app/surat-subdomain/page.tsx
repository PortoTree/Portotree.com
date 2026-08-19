"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Zap, Users, Heart, Clock, Award } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ActionCTA } from "@/components/layout/ActionCTA";

const populerTemplates = [
  { id: 1, title: "Surat Lamaran Pekerjaan", type: "Kerja", icon: <FileText className="w-7 h-7" />, color: "bg-emerald-50 text-emerald-600", desc: "Buat surat lamaran kerja yang rapi, formal, dan sesuai standar HR. Praktis, langsung siap kirim.", slug: "lamaran-pekerjaan" },
  { id: 2, title: "Surat Riwayat Hidup", type: "CV", icon: <FileText className="w-7 h-7" />, color: "bg-teal-50 text-teal-600", desc: "Template CV formal untuk administrasi dan lamaran kerja.", slug: "daftar-riwayat-hidup" },
  { id: 3, title: "Invoice", type: "Keuangan", icon: <FileText className="w-7 h-7" />, color: "bg-cyan-50 text-cyan-600", desc: "Template invoice profesional untuk tagihan bisnis dan freelance.", slug: "invoice" },
  { id: 4, title: "Surat Izin Tidak Masuk Kerja", type: "Izin", icon: <Clock className="w-7 h-7" />, color: "bg-orange-50 text-orange-600", desc: "Surat izin formal untuk absen sehari karena sakit/keluarga dengan template praktis.", slug: "izin-kerja" },
];

const lainnyaTemplates = [
  { id: 5, title: "Surat Pengunduran Diri", type: "Resign", icon: <Users className="w-7 h-7" />, color: "bg-indigo-50 text-indigo-600", desc: "Gunakan template resmi untuk resign yang sesuai aturan HR dan menjaga hubungan profesional.", slug: "pengunduran-diri" },
  { id: 6, title: "Surat Keterangan Sakit", type: "Izin", icon: <Heart className="w-7 h-7" />, color: "bg-rose-50 text-rose-600", desc: "Template surat keterangan sakit resmi untuk keperluan izin tidak masuk kerja atau sekolah.", slug: "keterangan-sakit" },
  { id: 7, title: "Surat Kuasa", type: "Hukum", icon: <ShieldCheck className="w-7 h-7" />, color: "bg-green-50 text-green-600", desc: "Template surat kuasa resmi untuk memberikan wewenang kepada pihak lain dalam urusan hukum dan administrasi.", slug: "kuasa" },
  { id: 8, title: "Surat Permohonan Magang Kerja", type: "Kerja", icon: <FileText className="w-7 h-7" />, color: "bg-emerald-50 text-emerald-600", desc: "Template permohonan magang untuk mahasiswa atau fresh graduate.", slug: "magang" },
  { id: 9, title: "Surat Pernyataan Kesanggupan", type: "Pernyataan", icon: <FileText className="w-7 h-7" />, color: "bg-purple-50 text-purple-600", desc: "Template pernyataan kesanggupan untuk kontrak atau komitmen resmi.", slug: "kesanggupan" },
  { id: 10, title: "Surat Izin Tidak Masuk Kuliah", type: "Izin", icon: <Clock className="w-7 h-7" />, color: "bg-orange-50 text-orange-600", desc: "Template surat izin tidak masuk kuliah karena urusan mendesak atau sakit.", slug: "izin-kuliah" },
  { id: 11, title: "Surat Izin Tidak Masuk Sekolah", type: "Izin", icon: <Clock className="w-7 h-7" />, color: "bg-orange-50 text-orange-600", desc: "Template surat izin tidak masuk sekolah yang bisa digunakan orang tua/wali.", slug: "izin-sekolah" },
  { id: 12, title: "Surat Pernyataan", type: "Pernyataan", icon: <Award className="w-7 h-7" />, color: "bg-purple-50 text-purple-600", desc: "Template surat pernyataan umum untuk segala kebutuhan.", slug: "pernyataan" },
  { id: 13, title: "Surat Pernyataan Belum Menikah", type: "Pernyataan", icon: <Award className="w-7 h-7" />, color: "bg-purple-50 text-purple-600", desc: "Template surat pernyataan status belum menikah untuk administrasi.", slug: "belum-menikah" },
  { id: 14, title: "Surat Permohonan Izin Cuti Kerja", type: "Cuti", icon: <Users className="w-7 h-7" />, color: "bg-indigo-50 text-indigo-600", desc: "Template surat permohonan izin cuti kerja untuk HRD/Atasan.", slug: "cuti" },
  { id: 15, title: "Surat Izin Orang Tua", type: "Izin", icon: <Users className="w-7 h-7" />, color: "bg-rose-50 text-rose-600", desc: "Template izin tertulis resmi dari orang tua/wali untuk suatu kegiatan.", slug: "izin-ortu" },
];

export default function SuratSubdomain() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center pt-32 pb-16 lg:pt-40 lg:pb-20 text-left overflow-hidden bg-slate-50">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl translate-x-1/2"></div>
        
        <div className="container px-6 sm:px-8 lg:px-16 mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start md:items-center justify-start md:justify-center text-left md:text-center max-w-3xl md:max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-emerald-100 text-sm font-medium text-emerald-600 mb-6">
              <FileText className="w-4 h-4" />
              <span>Generator Surat Terlengkap</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Bikin Dokumen & Surat Resmi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Tanpa Ribet, Tanpa Pusing</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
              Tinggalkan cara lama merangkai kata. Cukup pilih template, lengkapi data, dan unduh dokumen siap pakai dalam hitungan detik. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pilih-template" className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
                Pilih Template Sekarang
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            
            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold">Cepat & Praktis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold">Sesuai Standar HR</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold">Siap Download PDF</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Section (Grid Layout) */}
      <section id="pilih-template" className="bg-white py-16 md:py-24 relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-70"></div>
        
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px] relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pilih Template Surat</h2>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">Template surat profesional yang dipercaya untuk mempermudah urusan administrasi Anda.</p>
          </div>

          <div className="md:bg-slate-50/50 md:rounded-[2rem] py-4 md:p-8 lg:p-12 md:border md:border-slate-200/60 md:shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
              Surat <span className="text-emerald-600 border-b-4 border-emerald-300">Populer</span>
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {populerTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 flex flex-col h-full group">
                  <div className="mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${template.color}`}>
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2">{template.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {template.desc}
                  </p>
                  
                  <a href={`https://portotree.com/surat-generator/builder/${template.slug}`} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-auto group-hover:bg-emerald-600">
                    Buat Sekarang
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
              Surat <span className="text-emerald-600 border-b-4 border-emerald-300">Lainnya</span>
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lainnyaTemplates.map((template) => (
                <a key={template.id} href={`https://portotree.com/surat-generator/builder/${template.slug}`} className="group block">
                  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-200/60 hover:border-emerald-300">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${template.color}`}>
                        {template.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">{template.title}</h3>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ActionCTA />

      <Footer />
    </div>
  );
}
