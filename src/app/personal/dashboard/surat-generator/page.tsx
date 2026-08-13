"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Search } from "lucide-react";

export default function SuratGeneratorPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const populerTemplates = [
    {
      id: "lamaran-pekerjaan",
      title: "Surat Lamaran Pekerjaan",
      description: "Template lamaran kerja sesuai standar HR",
      slug: "lamaran-pekerjaan",
    },
    {
      id: "pengunduran-diri",
      title: "Surat Pengunduran Diri",
      description: "Template resign resmi dan profesional",
      slug: "pengunduran-diri",
    },
    {
      id: "daftar-riwayat-hidup",
      title: "Surat Riwayat Hidup",
      description: "Template CV formal untuk administrasi",
      slug: "daftar-riwayat-hidup",
    },
    {
      id: "keterangan-sakit",
      title: "Surat Keterangan Sakit",
      description: "Template surat sakit resmi",
      slug: "keterangan-sakit",
    },
    {
      id: "izin-kerja",
      title: "Surat Izin Tidak Masuk Kerja",
      description: "Template izin tidak masuk kerja",
      slug: "izin-kerja",
    },
    {
      id: "kuasa",
      title: "Surat Kuasa",
      description: "Template surat kuasa hukum resmi",
      slug: "kuasa",
    },
  ];

  const lainnyaTemplates = [
    {
      id: "magang",
      title: "Surat Permohonan Magang Kerja",
      description: "Template permohonan magang mahasiswa",
      slug: "magang",
    },
    {
      id: "kesanggupan",
      title: "Surat Pernyataan Kesanggupan",
      description: "Template pernyataan kesanggupan",
      slug: "kesanggupan",
    },
    {
      id: "izin-kuliah",
      title: "Surat Izin Tidak Masuk Kuliah",
      description: "Template izin tidak masuk kuliah",
      slug: "izin-kuliah",
    },
    {
      id: "izin-sekolah",
      title: "Surat Izin Tidak Masuk Sekolah",
      description: "Template izin tidak masuk sekolah",
      slug: "izin-sekolah",
    },
    {
      id: "pernyataan",
      title: "Surat Pernyataan",
      description: "Template surat pernyataan umum",
      slug: "pernyataan",
    },
    {
      id: "belum-menikah",
      title: "Surat Pernyataan Belum Menikah",
      description: "Template surat pernyataan status belum menikah",
      slug: "belum-menikah",
    },
    {
      id: "cuti",
      title: "Surat Permohonan Izin Cuti Kerja",
      description: "Template surat permohonan izin cuti kerja",
      slug: "cuti",
    },
    {
      id: "izin-ortu",
      title: "Surat Izin Orang Tua",
      description: "Template izin dari orang tua",
      slug: "izin-ortu",
    },
    {
      id: "invoice",
      title: "Invoice",
      description: "Template invoice profesional",
      slug: "invoice",
    },
  ];

  const filteredPopuler = populerTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLainnya = lainnyaTemplates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TemplateCard = ({ template }: { template: any }) => (
    <Link 
      href={`/surat-generator/builder/${template.slug}`}
      className="bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all rounded-[14px] p-5 flex items-center gap-4 cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 transition-colors">
        <FileText className="w-[22px] h-[22px] text-emerald-500" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-slate-800 text-[15px] mb-1 group-hover:text-emerald-700 transition-colors">{template.title}</h3>
        <p className="text-[13px] text-slate-500">{template.description}</p>
      </div>
    </Link>
  );

  return (
    <div className="w-full flex flex-col pt-8 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-800 mb-2">Template Surat</h1>
        <p className="text-[15px] text-slate-500">
          Pilih dan sesuaikan berbagai template surat resmi sesuai dengan kebutuhan Anda dengan mudah.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 w-full relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Cari template surat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-[15px] shadow-sm"
        />
      </div>

      {filteredPopuler.length === 0 && filteredLainnya.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-[15px] font-semibold text-slate-700">Template tidak ditemukan</h3>
          <p className="text-[13px] text-slate-500 mt-1">Coba gunakan kata kunci lain untuk mencari surat.</p>
        </div>
      )}

      {filteredPopuler.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Surat Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPopuler.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      )}

      {filteredLainnya.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Surat Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLainnya.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
