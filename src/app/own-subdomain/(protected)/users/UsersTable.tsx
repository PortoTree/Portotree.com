"use client";

import { useState } from "react";
import { User, Mail, ShieldAlert, CheckCircle2, Clock, MoreVertical, ExternalLink, Ban, Trash2, Globe, FileText, Crown, XCircle } from "lucide-react";
import { useUI } from "@/components/ui/UIProvider";
import { toggleSuspendUser, deleteUserAccount, impersonateUser, updateUserPremiumStatus } from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export function UsersTable({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const { showConfirm, showToast } = useUI();
  const router = useRouter();

  const handleAction = async (uid: string, action: 'view' | 'suspend' | 'unsuspend' | 'delete') => {
    const user = users.find(u => u.uid === uid);
    if (!user) return;

    if (action === 'view') {
      showConfirm({
        title: "Login Sebagai Pengguna Ini?",
        message: `Anda akan login (impersonate) sebagai ${user.displayName || user.username}. Sesi admin Anda saat ini akan digantikan dengan sesi pengguna ini. Anda harus login kembali sebagai admin nanti.`,
        variant: "primary",
        confirmText: "Ya, Login",
        cancelText: "Batal",
        onConfirm: async () => {
          showToast("Mempersiapkan sesi pengguna...", "success");
          const res = await impersonateUser(uid);
          if (res.success && res.customToken) {
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
            window.location.href = `${siteUrl}/impersonate?token=${res.customToken}`;
          } else {
            showToast("Gagal impersonate: " + res.error, "error");
          }
        }
      });
      return;
    }

    if (action === 'suspend' || action === 'unsuspend') {
      const isSuspending = action === 'suspend';
      showConfirm({
        title: isSuspending ? "Blokir Akun Pengguna?" : "Buka Blokir Pengguna?",
        message: isSuspending 
          ? `Apakah Anda yakin ingin memblokir akun ${user.username}? Pengguna ini tidak akan bisa login atau mengakses dashboard.`
          : `Apakah Anda yakin ingin membuka blokir akun ${user.username}?`,
        variant: isSuspending ? "danger" : "primary",
        confirmText: isSuspending ? "Ya, Blokir" : "Buka Blokir",
        cancelText: "Batal",
        onConfirm: async () => {
          const res = await toggleSuspendUser(uid, isSuspending);
          if (res.success) {
            setUsers(users.map(u => u.uid === uid ? { ...u, isSuspended: isSuspending } : u));
            showToast(isSuspending ? "Akun berhasil diblokir" : "Blokir berhasil dibuka", "success");
            router.refresh();
          } else {
            showToast("Gagal mengubah status: " + res.error, "error");
          }
        }
      });
      return;
    }

    if (action === 'delete') {
      showConfirm({
        title: "Hapus Akun Permanen",
        message: `PERINGATAN: Anda akan menghapus secara permanen akun ${user.username}. Semua data portofolio, resume, surat, dan langganan mereka akan hilang. Aksi ini tidak dapat dibatalkan.`,
        variant: "danger",
        confirmText: "Hapus Permanen",
        cancelText: "Batal",
        onConfirm: async () => {
          const res = await deleteUserAccount(uid);
          if (res.success) {
            setUsers(users.filter(u => u.uid !== uid));
            showToast("Akun berhasil dihapus permanen", "success");
            router.refresh();
          } else {
            showToast("Gagal menghapus akun: " + res.error, "error");
          }
        }
      });
      return;
    }
  };

  const handlePremiumAction = async (uid: string, durationMonths: number | null) => {
    const user = users.find(u => u.uid === uid);
    if (!user) return;

    const actionText = durationMonths === null 
      ? "menghapus akses Premium" 
      : `memberikan akses Premium ${durationMonths} Bulan`;

    showConfirm({
      title: "Ubah Status Premium?",
      message: `Apakah Anda yakin ingin ${actionText} kepada ${user.username || user.displayName}?`,
      variant: durationMonths === null ? "danger" : "primary",
      confirmText: "Ya, Ubah",
      cancelText: "Batal",
      onConfirm: async () => {
        showToast("Memproses perubahan...", "info");
        const res = await updateUserPremiumStatus(uid, durationMonths);
        if (res.success) {
          setUsers(users.map(u => 
            u.uid === uid 
              ? { ...u, isPremium: res.isPremium, premiumUntil: res.premiumUntil } 
              : u
          ));
          showToast(`Berhasil ${actionText}`, "success");
          router.refresh();
        } else {
          showToast("Gagal mengubah status: " + res.error, "error");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible relative">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <th className="px-6 py-4 font-medium">Pengguna</th>
              <th className="px-6 py-4 font-medium">Status Langganan</th>
              <th className="px-6 py-4 font-medium">Aset Dibuat</th>
              <th className="px-6 py-4 font-medium">Bergabung Pada</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 relative">
            {users.map((user) => (
              <tr key={user.uid} className={`transition-colors ${user.isSuspended ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-slate-50'}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${user.isSuspended ? 'bg-red-100' : 'bg-cyan-100'}`}>
                      <User className={`w-5 h-5 ${user.isSuspended ? 'text-red-600' : 'text-cyan-600'}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 flex items-center gap-2">
                        {user.username || user.displayName || 'Tanpa Nama'}
                        {user.isSuspended && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 uppercase tracking-wider">Diblokir</span>}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {user.email}
                        {user.emailVerified ? (
                          <span title="Email Terverifikasi"><CheckCircle2 className="w-3 h-3 text-emerald-500 ml-1" /></span>
                        ) : (
                          <span title="Email Belum Terverifikasi"><ShieldAlert className="w-3 h-3 text-amber-500 ml-1" /></span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.isPremium ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      Free
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-5">
                    {user.username && (
                      <a 
                        href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/p/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 hover:scale-110 transition-transform cursor-pointer group" 
                        title={`Lihat Portofolio: @${user.username}`}
                      >
                        <Globe className="w-5 h-5 text-blue-500 group-hover:text-blue-600 drop-shadow-sm" />
                        <span className="text-[10px] font-bold text-blue-600">Live</span>
                      </a>
                    )}
                    
                    {user.freeResumeCount > 0 && (
                      <div className="flex flex-col items-center gap-1" title="Pernah Membuat CV">
                        <FileText className="w-5 h-5 text-indigo-500" />
                        <span className="text-[10px] font-medium text-slate-500">{user.freeResumeCount}/1</span>
                      </div>
                    )}

                    {user.freeSuratCount > 0 && (
                      <div className="flex flex-col items-center gap-1" title="Pernah Membuat Surat">
                        <Mail className="w-5 h-5 text-amber-500" />
                        <span className="text-[10px] font-medium text-slate-500">{user.freeSuratCount}/1</span>
                      </div>
                    )}
                    
                    {!user.username && user.freeResumeCount === 0 && user.freeSuratCount === 0 && (
                      <span className="text-sm text-slate-400 italic">Belum ada aset</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {new Date(user.creationTime).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none">
                      <MoreVertical className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end" className="w-48 p-1">
                      <DropdownMenuItem 
                        onClick={() => handleAction(user.uid, 'view')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0" />
                        <span className="font-medium">Masuk Dashboard</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md cursor-pointer">
                          <Crown className="w-4 h-4 shrink-0 text-amber-500" />
                          <span className="font-medium">Ubah Paket Premium</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-48 p-1">
                          <DropdownMenuItem onClick={() => handlePremiumAction(user.uid, 1)} className="cursor-pointer">
                            <span>Paket 1 Bulan</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePremiumAction(user.uid, 3)} className="cursor-pointer">
                            <span>Paket 3 Bulan</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePremiumAction(user.uid, 6)} className="cursor-pointer">
                            <span>Paket 6 Bulan</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePremiumAction(user.uid, 12)} className="cursor-pointer">
                            <span>Paket 12 Bulan</span>
                          </DropdownMenuItem>
                          {user.isPremium && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handlePremiumAction(user.uid, null)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                <XCircle className="w-4 h-4 mr-2" />
                                <span>Hapus Premium</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      <DropdownMenuSeparator />
                      
                      {user.isSuspended ? (
                        <DropdownMenuItem
                          onClick={() => handleAction(user.uid, 'unsuspend')}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded-md cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Buka Blokir</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleAction(user.uid, 'suspend')}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-md cursor-pointer"
                        >
                          <Ban className="w-4 h-4 text-amber-500" />
                          <span className="font-medium">Blokir Akun</span>
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuItem
                        onClick={() => handleAction(user.uid, 'delete')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                        <span className="font-medium">Delete Akun</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  Belum ada pengguna yang terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
