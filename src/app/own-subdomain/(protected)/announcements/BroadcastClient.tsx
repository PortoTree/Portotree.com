"use client";

import { useState } from "react";
import { Sparkles, Megaphone, Gift, AlertCircle, Info, Plus, Trash2, Edit, Power, PowerOff, ArrowRight } from "lucide-react";
import { Announcement, saveAnnouncement, deleteAnnouncement, toggleAnnouncementStatus } from "@/app/actions/announcements";
import { toast } from "sonner";

const getThemeClasses = (style: string) => {
  switch(style) {
    case 'emerald': return { bg: 'from-emerald-900 to-slate-900 border-emerald-900', badgeBg: 'bg-emerald-500/30 border-emerald-500/30 text-emerald-200', btn: 'text-emerald-300' };
    case 'amber': return { bg: 'from-amber-700 to-slate-900 border-amber-900', badgeBg: 'bg-amber-500/30 border-amber-500/30 text-amber-200', btn: 'text-amber-300' };
    case 'rose': return { bg: 'from-rose-900 to-slate-900 border-rose-900', badgeBg: 'bg-rose-500/30 border-rose-500/30 text-rose-200', btn: 'text-rose-300' };
    case 'slate': return { bg: 'from-slate-800 to-slate-900 border-slate-800', badgeBg: 'bg-slate-500/30 border-slate-500/30 text-slate-200', btn: 'text-slate-300' };
    case 'blue': return { bg: 'from-blue-900 to-slate-900 border-blue-900', badgeBg: 'bg-blue-500/30 border-blue-500/30 text-blue-200', btn: 'text-blue-300' };
    default: return { bg: 'from-indigo-900 to-slate-900 border-slate-800', badgeBg: 'bg-indigo-500/30 border-indigo-500/30 text-indigo-200', btn: 'text-indigo-300' };
  }
};

const getIcon = (type: string) => {
  switch(type) {
    case 'Megaphone': return Megaphone;
    case 'Gift': return Gift;
    case 'AlertCircle': return AlertCircle;
    case 'Info': return Info;
    default: return Sparkles;
  }
};

export default function BroadcastClient({ initialData }: { initialData: Announcement[] }) {
  const [data, setData] = useState<Announcement[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Announcement, "id" | "createdAt">>({
    title: "",
    description: "",
    badgeText: "Info",
    linkUrl: "",
    themeStyle: "indigo",
    iconType: "Sparkles",
    isActive: true
  });

  const handleOpenForm = (item?: Announcement) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        description: item.description,
        badgeText: item.badgeText,
        linkUrl: item.linkUrl,
        themeStyle: item.themeStyle,
        iconType: item.iconType,
        isActive: item.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        badgeText: "Fitur Baru",
        linkUrl: "/p/dashboard",
        themeStyle: "indigo",
        iconType: "Sparkles",
        isActive: true
      });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const toastId = toast.loading(editingId ? "Menyimpan perubahan..." : "Menambahkan broadcast...");
    const res = await saveAnnouncement(formData, editingId || undefined);
    
    if (res.success) {
      toast.success("Broadcast berhasil disimpan", { id: toastId });
      setIsOpen(false);
      // Optimistic or real refresh needed, here we just force a hard reload for simplicity or rely on router.refresh if we used it.
      window.location.reload(); 
    } else {
      toast.error(res.error || "Gagal menyimpan", { id: toastId });
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus broadcast ini?")) return;
    
    const toastId = toast.loading("Menghapus...");
    const res = await deleteAnnouncement(id);
    if (res.success) {
      toast.success("Terhapus", { id: toastId });
      setData(data.filter(d => d.id !== id));
    } else {
      toast.error(res.error || "Gagal menghapus", { id: toastId });
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const toastId = toast.loading("Mengubah status...");
    const res = await toggleAnnouncementStatus(id, currentStatus);
    if (res.success) {
      toast.success(currentStatus ? "Dinonaktifkan" : "Diaktifkan", { id: toastId });
      setData(data.map(d => d.id === id ? { ...d, isActive: !currentStatus } : d));
    } else {
      toast.error(res.error || "Gagal mengubah", { id: toastId });
    }
  };

  // Preview computed values
  const theme = getThemeClasses(formData.themeStyle);
  const IconComponent = getIcon(formData.iconType);

  return (
    <div className="space-y-6">
      {!isOpen ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-semibold text-slate-800">Daftar Broadcast</h2>
            <button 
              onClick={() => handleOpenForm()}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Buat Baru
            </button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <div className="p-8 text-center text-slate-500">Belum ada data broadcast.</div>
            ) : (
              data.map((item) => {
                const ItemIcon = getIcon(item.iconType);
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${item.isActive ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-400'}`}>
                        <ItemIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                            {item.isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">{item.badgeText}</span>
                        </div>
                        <h3 className={`font-semibold ${item.isActive ? 'text-slate-900' : 'text-slate-500'}`}>{item.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1 max-w-md">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <button 
                        onClick={() => handleToggle(item.id, item.isActive)}
                        className={`p-2 rounded-lg border transition-colors ${item.isActive ? 'border-amber-200 text-amber-600 hover:bg-amber-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                        title={item.isActive ? 'Matikan' : 'Aktifkan'}
                      >
                        {item.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleOpenForm(item)}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FORM EDITOR */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-bold text-lg text-slate-800 mb-6 border-b pb-4">
              {editingId ? 'Edit Broadcast' : 'Buat Broadcast Baru'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
                  <input 
                    type="text" 
                    required
                    value={formData.badgeText}
                    onChange={(e) => setFormData({...formData, badgeText: e.target.value})}
                    placeholder="Contoh: Fitur Baru"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Link URL</label>
                  <input 
                    type="text" 
                    required
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                    placeholder="Contoh: /p/langganan"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Utama</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Contoh: Pembaruan Sistem v2.0"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Penjelasan singkat tentang fitur atau promo..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Ikon Visual</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'Sparkles', label: 'Fitur', icon: Sparkles },
                      { id: 'Megaphone', label: 'Info', icon: Megaphone },
                      { id: 'Gift', label: 'Promo', icon: Gift },
                      { id: 'AlertCircle', label: 'Alert', icon: AlertCircle },
                      { id: 'Info', label: 'Panduan', icon: Info },
                    ].map((ic) => {
                      const Icon = ic.icon;
                      const isSelected = formData.iconType === ic.id;
                      return (
                        <button
                          key={ic.id}
                          type="button"
                          onClick={() => setFormData({...formData, iconType: ic.id as any})}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
                            isSelected 
                              ? 'bg-cyan-50 border-cyan-500 text-cyan-700 ring-1 ring-cyan-500' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-600' : 'text-slate-400'}`} />
                          {ic.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Tema Warna</label>
                  <select 
                    value={formData.themeStyle}
                    onChange={(e) => setFormData({...formData, themeStyle: e.target.value as any})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none h-[42px]"
                  >
                    <option value="indigo">Indigo (Ungu Biru)</option>
                    <option value="emerald">Emerald (Hijau)</option>
                    <option value="amber">Amber (Kuning Keemasan)</option>
                    <option value="rose">Rose (Merah Muda)</option>
                    <option value="blue">Blue (Biru Terang)</option>
                    <option value="slate">Slate (Abu-abu Gelap)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Langsung Aktifkan (Tampil di User Dashboard)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan & Publish'}
                </button>
              </div>
            </form>
          </div>

          {/* LIVE PREVIEW */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-500 text-sm mb-3 uppercase tracking-wider">Live Preview di Dashboard User</h3>
            
            <div className={`w-full bg-gradient-to-br ${theme.bg} rounded-3xl p-6 shadow-md border text-white relative overflow-hidden h-[220px] flex flex-col justify-center`}>
              {/* Background Watermark */}
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <IconComponent className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 border ${theme.badgeBg}`}>
                  <IconComponent className="w-3.5 h-3.5" /> {formData.badgeText || "Badge"}
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{formData.title || "Judul Utama"}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                  {formData.description || "Deskripsi akan muncul di sini..."}
                </p>
                <div className={`text-sm font-semibold flex items-center gap-1 w-fit ${theme.btn}`}>
                  Pelajari Selengkapnya <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mt-4 border border-blue-100 flex gap-3">
              <Info className="w-5 h-5 shrink-0 text-blue-500" />
              <p>Ini adalah tampilan asli (*1:1 scale*) bagaimana pengumuman akan terlihat oleh pengguna akhir pada kotak Carousel mereka.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
