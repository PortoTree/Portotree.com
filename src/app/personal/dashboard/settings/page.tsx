import { Link as LinkIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Publikasi & Tautan</h1>
        <p className="text-slate-500 mt-1">Atur visibilitas dan tautan publik portofolio Anda.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
          <div>
            <h4 className="font-bold text-slate-800">Status Portofolio</h4>
            <p className="text-sm text-slate-500">Buat portofolio Anda terlihat oleh publik</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Link */}
        <div className="space-y-3">
          <label className="font-bold text-slate-700 text-sm">Tautan Portotree Anda</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
              portotree.com/
            </span>
            <input 
              type="text" 
              defaultValue="johndoe"
              className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-medium text-slate-900"
            />
          </div>
          <button className="text-sm text-emerald-600 font-bold flex items-center gap-1 hover:text-emerald-700">
            <LinkIcon className="w-4 h-4" /> Salin tautan
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button 
            type="button"
            className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
