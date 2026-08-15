"use client";

import { useState } from "react";
import { User, Mail, ShieldAlert, CheckCircle2, Clock, Crown, KeyRound, ExternalLink, CalendarDays, FileText, Check } from "lucide-react";
import { useUI } from "@/components/ui/UIProvider";
import { sendPasswordReset } from "@/app/actions/auth";
import Link from "next/link";

export default function AccountClient({ user, stats }: { user: any, stats: any }) {
  const { showToast, showConfirm } = useUI();
  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = async () => {
    showConfirm({
      title: "Ganti Password",
      message: `Tautan untuk mengubah password akan dikirimkan ke email Anda (${user.email}). Lanjutkan?`,
      confirmText: "Ya, Kirim Email",
      cancelText: "Batal",
      variant: "primary",
      onConfirm: async () => {
        setIsResetting(true);
        showToast("Mengirim email reset password...", "info");
        const res = await sendPasswordReset(user.email);
        setIsResetting(false);
        if (res.success) {
          showToast("Email reset password berhasil dikirim! Silakan periksa inbox Anda.", "success");
        } else {
          showToast(res.error || "Gagal mengirim email reset password", "error");
        }
      }
    });
  };

  const isPremium = stats.isPremium;
  const isSuspended = stats.isSuspended;

  // Format Premium Until
  let premiumDateStr = "";
  if (isPremium && stats.premiumUntil) {
    const d = new Date(stats.premiumUntil);
    premiumDateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Format Member Since
  let joinedDateStr = "";
  if (user.creationTime) {
    const d = new Date(user.creationTime);
    joinedDateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 md:py-8 px-4 md:px-6 lg:px-8 pb-10 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Akun Saya</h1>
        <p className="text-slate-500">Kelola informasi profil, status langganan, dan penggunaan kuota Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-10"></div>
            
            <div className="flex flex-col items-center text-center relative z-10 pt-4">
              <div className="w-24 h-24 rounded-full bg-white shadow-md border-4 border-white flex items-center justify-center mb-4 overflow-hidden">
                {user.picture ? (
                  <img src={user.picture} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-700">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <h2 className="text-xl font-bold text-slate-800 truncate w-full px-2">
                {user.name || "Tanpa Nama"}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 mt-1 mb-4">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[200px]">{user.email}</span>
                {user.email_verified ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Terverifikasi" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" title="Belum Terverifikasi" />
                )}
              </div>

              {/* Status Badge */}
              <div className="w-full mt-2">
                {isPremium ? (
                  <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col items-center justify-center gap-1 shadow-inner">
                    <div className="flex items-center gap-1.5 font-bold text-amber-600 text-sm">
                      <Crown className="w-4 h-4" />
                      PREMIUM MEMBER
                    </div>
                    {premiumDateStr && (
                      <div className="text-[10px] text-amber-600/70 font-medium">
                        Berlaku s/d {premiumDateStr}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-600 text-sm">
                      <Clock className="w-4 h-4" />
                      AKUN REGULER (FREE)
                    </div>
                    <Link href="/personal/dashboard/langganan" className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 mt-1">
                      Upgrade ke Premium
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleResetPassword}
            disabled={isResetting}
            className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 hover:border-slate-300 transition-colors group cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                {isResetting ? (
                   <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                ) : (
                   <KeyRound className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                )}
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-700 group-hover:text-indigo-700">Ganti Password</div>
                <div className="text-xs text-slate-500">Kirim link reset ke email</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </button>
        </div>

        {/* Right Column: Stats & Details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              Statistik Penggunaan
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* CV Card */}
              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                <div className="text-sm font-semibold text-slate-500 mb-1">Download CV</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-slate-800">
                    {isPremium ? "∞" : (stats.freeResumeCount || 0)}
                  </div>
                  {!isPremium && <div className="text-sm font-medium text-slate-400">/ 1</div>}
                </div>
                {!isPremium && (stats.freeResumeCount || 0) >= 1 && (
                  <div className="mt-2 text-xs font-medium text-amber-600 bg-amber-50 py-1 px-2 rounded inline-block">
                    Limit Tercapai
                  </div>
                )}
                {isPremium && (
                  <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 py-1 px-2 rounded inline-block">
                    Unlimited
                  </div>
                )}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <FileText className="w-32 h-32" />
                </div>
              </div>

              {/* Surat Card */}
              <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                <div className="text-sm font-semibold text-slate-500 mb-1">Download Surat</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-slate-800">
                    {isPremium ? "∞" : (stats.freeSuratCount || 0)}
                  </div>
                  {!isPremium && <div className="text-sm font-medium text-slate-400">/ 1</div>}
                </div>
                {!isPremium && (stats.freeSuratCount || 0) >= 1 && (
                  <div className="mt-2 text-xs font-medium text-amber-600 bg-amber-50 py-1 px-2 rounded inline-block">
                    Limit Tercapai
                  </div>
                )}
                {isPremium && (
                  <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 py-1 px-2 rounded inline-block">
                    Unlimited
                  </div>
                )}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Mail className="w-32 h-32" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Detail Akun
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">Tanggal Bergabung</div>
                    <div className="text-xs text-slate-500">Kapan akun ini dibuat</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-800">
                  {joinedDateStr || "-"}
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">Status Verifikasi Email</div>
                    <div className="text-xs text-slate-500">Keamanan akun</div>
                  </div>
                </div>
                <div>
                  {user.email_verified ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Terverifikasi
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Belum Diverifikasi
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">Status Akun</div>
                    <div className="text-xs text-slate-500">Kondisi blokir sistem</div>
                  </div>
                </div>
                <div>
                  {isSuspended ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Ditangguhkan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      Aktif Normal
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
