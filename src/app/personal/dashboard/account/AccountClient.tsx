"use client";

import { useState, useEffect } from "react";
import { User, Mail, ShieldAlert, CheckCircle2, Clock, Crown, KeyRound, ExternalLink, FileText, Pencil, Globe, Camera } from "lucide-react";
import { useUI } from "@/components/ui/UIProvider";
import { sendPasswordReset } from "@/app/actions/auth";
import { updateProfileData } from "@/app/actions/profile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfilePersonalForm, ProfileEducationForm, ProfileExperienceForm } from "./ProfileForms";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function AccountClient({ user, stats, portfolioData }: { user: any, stats: any, portfolioData?: any }) {
  const { showToast, showConfirm } = useUI();
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);
  const [suratFallback, setSuratFallback] = useState<any>({});
  const [localData, setLocalData] = useState<any>(portfolioData || {});
  
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);

  useEffect(() => {
    try {
      const fallback: any = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('suratBuilder_')) {
          const saved = localStorage.getItem(key);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.nama && !fallback.fullName) fallback.fullName = parsed.nama;
            if (parsed.email && !fallback.email) fallback.email = parsed.email;
            if ((parsed.nomorHp || parsed.telepon) && !fallback.phone) fallback.phone = parsed.nomorHp || parsed.telepon;
            if (parsed.alamat && !fallback.address) fallback.address = parsed.alamat;
            if (parsed.jenisKelamin && !fallback.gender) fallback.gender = parsed.jenisKelamin;
            if (parsed.tempatLahir && parsed.tanggalLahir && !fallback.dateOfBirth) fallback.dateOfBirth = `${parsed.tempatLahir}, ${parsed.tanggalLahir}`;
            if (parsed.kewarganegaraan && !fallback.nationality) fallback.nationality = parsed.kewarganegaraan;
          }
        }
      }
      setSuratFallback(fallback);
    } catch(e) {}
  }, []);

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

  const handlePhotoUpload = async (url: string) => {
    const updatedPersonal = { ...localData?.personal, photoUrl: url };
    setLocalData({ ...localData, personal: updatedPersonal });
    
    try {
      const res = await updateProfileData('personal', updatedPersonal);
      if (res.success) {
        showToast("Foto profil berhasil diperbarui!", "success");
        router.refresh();
      } else {
        showToast(res.error || "Gagal memperbarui foto", "error");
      }
    } catch (error) {
      showToast("Terjadi kesalahan sistem", "error");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 md:py-8 px-4 md:px-6 lg:px-8 pb-10 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1.5 md:mb-2">Akun Saya</h1>
        <p className="text-sm md:text-base text-slate-500">Kelola informasi profil, status langganan, dan penggunaan kuota Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-10"></div>
            
            <div className="flex flex-col items-center text-center relative z-10 pt-4">
              
              <ImageUpload 
                onUploadSuccess={handlePhotoUpload} 
                customTrigger={
                  <div className="relative w-24 h-24 rounded-full bg-white shadow-md border-4 border-white mb-4 overflow-hidden group cursor-pointer">
                    {localData?.personal?.photoUrl || user.picture ? (
                      <img src={localData?.personal?.photoUrl || user.picture} alt="Avatar" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center group-hover:opacity-75 transition-opacity">
                        <span className="text-3xl font-bold text-emerald-700">
                          {(localData?.personal?.fullName || user.name || user.email || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                }
              />
              
              <h2 className="text-xl font-bold text-slate-800 truncate w-full px-2">
                {localData?.personal?.fullName || localData?.personal?.name || suratFallback.fullName || user.name || "Tanpa Nama"}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 mt-1 mb-4">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[200px]">{user.email}</span>
                {user.email_verified ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                )}
              </div>
              
              {user.username ? (
                <a href={`/p/${user.username}`} target="_blank" className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2 px-4 rounded-full transition-colors mb-4 w-full">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span className="truncate">portotree.com/p/{user.username}</span>
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-400 bg-slate-50 py-2 px-4 rounded-full mb-4 w-full border border-dashed border-slate-200">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span className="truncate">Belum memiliki portofolio</span>
                </div>
              )}

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
                
                <div className="w-full text-center mt-3 text-xs text-slate-500 font-medium">
                  Bergabung sejak {joinedDateStr || "-"}
                </div>
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
          
          {/* Statistik Penggunaan (Moved from Right Column) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              Statistik Penggunaan
            </h3>
            
            <div className="flex flex-col gap-4">
              
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
        </div>

        {/* Right Column: Profile Information */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col h-full">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 border-b border-slate-100 pb-4">
              <User className="w-6 h-6 text-indigo-500" />
              Informasi Data Diri Lengkap
            </h3>
            
            {/* Data Personal */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-50">
                <h4 className="text-base font-bold text-slate-800">Data Personal</h4>
                {!editingPersonal && (
                  <button onClick={() => setEditingPersonal(true)} className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors" title="Edit Data Personal">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              
              {editingPersonal ? (
                <ProfilePersonalForm 
                  data={localData?.personal || {}} 
                  onSave={(d) => { setLocalData({...localData, personal: d}); setEditingPersonal(false); router.refresh(); }} 
                  onCancel={() => setEditingPersonal(false)} 
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <div className="text-sm font-bold text-slate-700">Nama Lengkap</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.fullName || localData?.personal?.name || suratFallback.fullName || user?.name || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Email</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.email || suratFallback.email || user?.email || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Nomor Telepon</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.phone || suratFallback.phone || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Tanggal Lahir</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.dateOfBirth || suratFallback.dateOfBirth || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Kewarganegaraan</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.nationality || suratFallback.nationality || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">Jenis Kelamin</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.gender || suratFallback.gender || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm font-bold text-slate-700">Alamat</div>
                    <div className="text-slate-600 mt-1.5">{localData?.personal?.address || suratFallback.address || <span className="text-slate-400 italic">(Belum diisi)</span>}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Data Pendidikan */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-50">
                <h4 className="text-base font-bold text-slate-800">Data Pendidikan</h4>
                {!editingEducation && (
                  <button onClick={() => setEditingEducation(true)} className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors" title="Edit Data Pendidikan">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {editingEducation ? (
                <ProfileEducationForm 
                  items={localData?.education || []} 
                  onSave={(d) => { setLocalData({...localData, education: d}); setEditingEducation(false); }} 
                  onCancel={() => setEditingEducation(false)} 
                />
              ) : localData?.education && localData.education.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {localData.education.map((edu: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></div>
                      <div>
                        <div className="font-bold text-slate-800">{edu.school || "Nama Institusi"}</div>
                        <div className="text-sm font-medium text-indigo-600 mt-0.5">{edu.degree || "Gelar/Jurusan"}</div>
                        <div className="text-xs text-slate-500 mt-1 font-medium">
                          {edu.startDate || "Tanggal Mulai"} - {edu.endDate || "Tanggal Selesai"}
                        </div>
                        {edu.description && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{edu.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-sm font-medium">
                  Belum ada data pendidikan
                </div>
              )}
            </div>

            {/* Data Pengalaman Kerja */}
            <div>
              <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-50">
                <h4 className="text-base font-bold text-slate-800">Data Pengalaman Kerja</h4>
                {!editingExperience && (
                  <button onClick={() => setEditingExperience(true)} className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors" title="Edit Data Pengalaman">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {editingExperience ? (
                <ProfileExperienceForm 
                  items={localData?.experience || []} 
                  onSave={(d) => { setLocalData({...localData, experience: d}); setEditingExperience(false); }} 
                  onCancel={() => setEditingExperience(false)} 
                />
              ) : localData?.experience && localData.experience.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {localData.experience.map((exp: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
                      <div>
                        <div className="font-bold text-slate-800">{exp.position || "Posisi"}</div>
                        <div className="text-sm font-medium text-emerald-600 mt-0.5">{exp.company || "Nama Perusahaan"}</div>
                        <div className="text-xs text-slate-500 mt-1 font-medium">
                          {exp.startDate || "Tanggal Mulai"} - {exp.endDate || "Tanggal Selesai"}
                        </div>
                        {exp.description && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{exp.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-sm font-medium">
                  Belum ada data pengalaman kerja
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
