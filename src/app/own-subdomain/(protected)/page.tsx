import { Users, FileText, Mail, Globe, TrendingUp } from "lucide-react";
import { getDashboardStats } from "@/app/actions/admin";
import { DashboardChart } from "./DashboardChart";

export const dynamic = "force-dynamic";

export default async function OwnerDashboardPage() {
  const res = await getDashboardStats();
  
  if (!res.success || !res.data) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex flex-col gap-2">
          <span className="font-bold">Gagal memuat data statistik:</span>
          <span>{res.error || "Unknown error"}</span>
        </div>
      </div>
    );
  }

  const { totalUsers, totalCv, totalSurat, totalPortfolios, chartData } = res.data;

  const stats = [
    { name: "Total Pengguna", value: totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "CV Dibuat", value: totalCv, icon: FileText, color: "text-indigo-600", bg: "bg-indigo-100" },
    { name: "Surat Dibuat", value: totalSurat, icon: Mail, color: "text-amber-600", bg: "bg-amber-100" },
    { name: "Portofolio Aktif", value: totalPortfolios, icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Ringkasan statistik penggunaan platform PortoTree.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
              <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-slate-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Aktivitas 7 Hari Terakhir</h2>
        </div>
        <div className="h-[400px] w-full">
          <DashboardChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
