import Link from "next/link";
import { Eye, MousePointerClick, TrendingUp, Globe, Edit3 } from "lucide-react";
import TrafficChart from "@/components/dashboard/TrafficChart";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Selamat datang kembali!</h1>
          <p className="text-slate-500 mt-1">Berikut ringkasan portofolio Anda hari ini.</p>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600">Total Dilihat</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-slate-800">1,248</div>
          <div className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12% dari minggu lalu
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600">Klik Tautan</h3>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-slate-800">384</div>
          <div className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +5% dari minggu lalu
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600">Pengunjung Unik</h3>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-slate-800">892</div>
          <div className="text-sm text-slate-500 font-medium mt-2">
            Dari 12 negara
          </div>
        </div>
      </div>

      {/* TRAFFIC CHART */}
      <TrafficChart />
    </div>
  );
}
