import { Clock } from "lucide-react";

export default function OwnerDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Selamat datang kembali. Ringkasan platform Anda sedang dalam pengembangan.</p>
      </div>

      <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
          <Clock className="w-12 h-12" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Segera Hadir</h2>
        <p className="text-slate-500 max-w-md mt-2">
          Fitur Dashboard Utama saat ini sedang dalam proses pengembangan. 
          Silakan gunakan menu Manajemen Blog di sebelah kiri untuk mengelola konten Anda.
        </p>
      </div>
    </div>
  );
}
