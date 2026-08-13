import Link from "next/link";
import { FileText, Mail, PenTool, Plus } from "lucide-react";

export default function SuratGeneratorPage() {
  const templates = [
    {
      id: 1,
      title: "Surat Lamaran Pekerjaan",
      description: "Surat lamaran kerja profesional",
      slug: "lamaran-pekerjaan",
      icon: <FileText className="w-5 h-5 text-white" />,
    },
    {
      id: 2,
      title: "Surat Pengunduran Diri",
      description: "Surat resign profesional",
      slug: "pengunduran-diri",
      icon: <Mail className="w-5 h-5 text-white" />,
    },
    {
      id: 3,
      title: "Daftar Riwayat Hidup",
      description: "Riwayat hidup dalam format surat",
      slug: "daftar-riwayat-hidup",
      icon: <PenTool className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-12">
      <div className="text-center mb-10">
        <h2 className="text-[22px] font-bold text-slate-800 mb-2.5">Template Surat Populer</h2>
        <p className="text-slate-500 text-[15px]">Buat surat lainnya dengan template yang paling sering digunakan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-10">
        {templates.map((template) => (
          <div key={template.id} className="bg-white border border-slate-200/80 rounded-[14px] p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-[10px] bg-emerald-600 flex items-center justify-center shrink-0">
                {template.icon}
              </div>
              <div className="flex flex-col pt-0.5">
                <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-1">{template.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{template.description}</p>
              </div>
            </div>
            <Link 
              href={`/surat-generator/builder/${template.slug}`}
              className="w-fit bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold py-2 px-5 rounded-lg transition-colors mt-auto"
            >
              Buat Sekarang
            </Link>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 text-emerald-600 border border-emerald-600 hover:bg-emerald-50 px-6 py-2.5 rounded-xl font-semibold text-[14px] transition-colors">
        <Plus className="w-4 h-4 stroke-[2.5]" />
        Lihat Surat Lainnya
      </button>
    </div>
  );
}
