export default function AccountPage() {
  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pengaturan Akun</h1>
        <p className="text-slate-500 mt-1">Kelola informasi dan paket langganan Anda.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 font-medium"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Alamat Email</label>
            <input 
              type="email" 
              defaultValue="john@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium bg-slate-50 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-slate-400">Email tidak dapat diubah.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Paket Saat Ini</label>
            <div className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-between">
              <span className="font-bold text-emerald-800">Free Plan</span>
              <button type="button" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Upgrade</button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button 
              type="button"
              className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
