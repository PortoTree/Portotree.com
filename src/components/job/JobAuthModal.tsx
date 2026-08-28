"use client";
import { useState } from "react";
import { UserSearch, Building2, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createSession } from "@/app/actions/auth";

export default function JobAuthModal({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [step, setStep] = useState<"role_selection" | "login_worker" | "login_recruiter">("role_selection");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in, don't show the modal
  if (isLoggedIn) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      // 1. Sign in with Firebase Client
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Simpan role yang dipilih ke database
      // Validasi Role Pintu Masuk
      const docSnap = await getDoc(doc(db, "portfolios", userCredential.user.uid));
      const actualRole = docSnap.exists() ? (docSnap.data().jobRole || "pengguna") : "pengguna";
      const intendedRole = step === "login_recruiter" ? "recruiter" : "pengguna";
      
      if (actualRole !== intendedRole) {
        await auth.signOut();
        throw new Error(`Akun ini terdaftar sebagai ${actualRole === 'recruiter' ? 'HRD/Perusahaan' : 'Pekerja'}. Silakan login lewat menu yang benar.`);
      }

      // 2. Get ID token
      const idToken = await userCredential.user.getIdToken();

      // 3. Create server session cookie
      const result = await createSession(idToken);
      if (!result.success) {
        throw new Error("Gagal membuat sesi login.");
      }

      // 4. Reload page to let server components fetch the user data
      window.location.reload();
    } catch (err: any) {
      console.error("Login Error:", err);
      setErrorMsg("Email atau password salah.");
      setIsLoading(false);
    }
  };

  const resetFormAndGoBack = () => {
    setStep("role_selection");
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden relative transition-all border border-slate-100">
        
        <div className="p-5 sm:p-8 relative flex flex-col justify-center">
          
          {/* STEP 1: ROLE SELECTION */}
          {step === "role_selection" && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Bergabung ke Portofind</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">Pilih peran Anda untuk melanjutkan.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Worker Card */}
                <button 
                  onClick={() => setStep("login_worker")}
                  className="group flex flex-col items-center justify-center text-center p-3 sm:p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                    <UserSearch className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Mencari Kerja</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">Pamerkan portofolio, lamar kerja.</p>
                </button>

                {/* Recruiter Card */}
                <button 
                  onClick={() => setStep("login_recruiter")}
                  className="group flex flex-col items-center justify-center text-center p-3 sm:p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Buka Lowongan</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">Posting loker, temukan talenta.</p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: WORKER LOGIN */}
          {step === "login_worker" && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-1">
                  <button type="button" onClick={resetFormAndGoBack} className="text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 p-1.5 rounded-xl shrink-0 border border-slate-200">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Login Pencari Kerja</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">Gunakan akun PortoTree Anda yang sudah ada.</p>
                
                {errorMsg && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="nama@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-3 mt-2 flex justify-center items-center gap-2 transition-colors">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk"}
                  </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-slate-500">
                  Belum punya akun? <a href="https://portotree.com/register?role=pengguna" className="text-emerald-600 font-bold hover:underline">Daftar PortoTree</a>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RECRUITER LOGIN */}
          {step === "login_recruiter" && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-1">
                  <button type="button" onClick={resetFormAndGoBack} className="text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 p-1.5 rounded-xl shrink-0 border border-slate-200">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Login Recruiter</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">Kelola loker dan pelamar di satu tempat.</p>
                
                {errorMsg && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="hrd@recruiter.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 mt-2 flex justify-center items-center gap-2 transition-colors">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk Dashboard"}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                  Belum punya akun? <a href="https://portotree.com/register?role=recruiter" className="text-blue-600 font-bold hover:underline">Daftar Recruiter</a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
