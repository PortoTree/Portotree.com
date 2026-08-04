"use client";

import { useState, useRef, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendVerification, verifyOTP, createSession, validateTurnstile } from "@/app/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  // States for UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // OTP Verification state
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCountdown, setResendCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerificationMode && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isVerificationMode, resendCountdown]);

  const handleResendCode = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await sendVerification(email);
      if (!result.success) {
        throw new Error(result.error || "Gagal mengirim ulang kode");
      }
      setResendCountdown(60);
      alert("Kode verifikasi telah dikirim ulang ke email Anda.");
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || "Gagal mengirim ulang kode");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 0. Validate Turnstile
      if (!turnstileToken) throw new Error("Captcha belum diselesaikan");
      const tsResult = await validateTurnstile(turnstileToken);
      if (!tsResult.success) throw new Error(tsResult.error || "Verifikasi captcha gagal");

      // 1. Register with Firebase Client
      await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Send custom verification email via Server Action
      const result = await sendVerification(email);
      
      if (!result.success) {
        throw new Error(result.error || "Gagal mengirim email verifikasi");
      }
      
      // 3. Switch to verification mode (OTP UI)
      setIsVerificationMode(true);
    } catch (err: any) {
      console.error("Register error:", err);
      // Firebase specific error handling
      if (err.code === "auth/email-already-in-use") {
        setError("Email sudah terdaftar. Silakan login atau gunakan fitur lupa password.");
      } else {
        setError(err.message || "Terjadi kesalahan saat pendaftaran");
      }
    } finally {
      setLoading(false);
    }
  };

  const executeVerification = async (code: string) => {
    setLoading(true);
    setError("");

    try {
      // 1. Verify OTP on server
      const result = await verifyOTP(email, code);
      if (!result.success) {
        throw new Error(result.error || "Kode verifikasi salah");
      }
      
      // 2. Refresh client token to reflect email_verified: true
      await auth.currentUser?.reload();
      const idToken = await auth.currentUser?.getIdToken(true);
      
      if (!idToken) {
        throw new Error("Gagal mengambil session token. Coba login ulang.");
      }
      
      // 3. Create server session
      const sessionResult = await createSession(idToken);
      if (!sessionResult.success) {
         throw new Error("Gagal membuat sesi login.");
      }
      
      // 4. Redirect to dashboard
      router.push("/personal/dashboard");
    } catch (err: any) {
      console.error("Verify error:", err);
      setError(err.message || "Gagal memverifikasi kode");
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits are filled
    if (value && index === 5) {
      const code = newOtp.join("");
      if (code.length === 6) {
        executeVerification(code);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 0) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(password);
  const isPasswordValid = password.length >= 8 && /\d/.test(password);

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    const pastedNumbers = pastedData.replace(/\D/g, "").slice(0, 6);
    
    if (pastedNumbers) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedNumbers.length; i++) {
        newOtp[i] = pastedNumbers[i];
      }
      setOtp(newOtp);
      
      // Focus on the next empty input or the last one
      const nextIndex = Math.min(pastedNumbers.length, 5);
      inputRefs.current[nextIndex]?.focus();

      if (pastedNumbers.length === 6) {
        executeVerification(pastedNumbers);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isVerificationMode ? "Verifikasi Email" : "Buat akun baru"}
          </h1>
          <p className="text-slate-500 mt-2">
            {isVerificationMode 
              ? `Kami telah mengirim 6 digit kode ke ${email}`
              : "Mulai bangun portofolio Anda secara gratis"
            }
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5 relative">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Alamat Email</label>
            <input 
              type="email" 
              placeholder="kamu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100 disabled:text-slate-500"
              required
              disabled={loading || isVerificationMode}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Kata Sandi</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Buat kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100 disabled:text-slate-500"
                required
                minLength={8}
                disabled={loading || isVerificationMode}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password.length > 0 && !isVerificationMode && (
              <div className="mt-3 space-y-2">
                <div className="flex gap-1.5 w-full h-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        passwordStrength >= level 
                          ? passwordStrength <= 2 ? "bg-amber-400" : "bg-emerald-500" 
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={isPasswordValid ? "text-emerald-600 font-medium" : "text-slate-500"}>
                    {passwordStrength === 0 ? "Lemah" : passwordStrength <= 2 ? "Sedang" : passwordStrength === 3 ? "Kuat" : "Sangat Kuat"}
                  </span>
                  <span className={isPasswordValid ? "text-emerald-600 font-medium" : "text-slate-500"}>
                    Minimal 8 karakter termasuk angka
                  </span>
                </div>
              </div>
            )}
          </div>

          {!isVerificationMode && (
            <div className="flex justify-center py-2">
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAEGITf8AoAJHiMlM'} 
                options={{ action: "turnstile-spin-v2" }}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken(null)}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>
          )}

          {!isVerificationMode && (
            <button 
              type="submit"
              disabled={loading || !turnstileToken || !email || !isPasswordValid}
              className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors mt-2 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Buat Akun"}
            </button>
          )}
        </form>

        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isVerificationMode ? "opacity-100 max-h-64 mt-6" : "opacity-0 max-h-0"
          }`}
        >
          <div className="space-y-6">
            <div className="flex justify-center gap-1.5 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handleOtpPaste}
                  disabled={loading}
                  className="w-9 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold text-slate-900 rounded-lg sm:rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-slate-50 focus:bg-white disabled:opacity-50"
                  required
                />
              ))}
            </div>

            {loading && isVerificationMode && (
              <div className="flex justify-center items-center py-2">
                 <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
              </div>
            )}
            
            <div className="text-center mt-4">
              <button 
                type="button"
                onClick={handleResendCode} 
                className={`text-sm font-medium transition-colors ${
                  resendCountdown > 0 
                    ? "text-slate-400 cursor-not-allowed" 
                    : "text-emerald-600 hover:underline"
                }`}
                disabled={loading || resendCountdown > 0}
              >
                {resendCountdown > 0 
                  ? `Kirim ulang kode (${resendCountdown}s)` 
                  : "Kirim ulang kode"}
              </button>
            </div>
          </div>
        </div>

        {!isVerificationMode && (
          <div className="mt-8 text-center text-sm font-medium text-slate-600">
            Sudah punya akun? <Link href="/login" className="text-slate-900 font-bold hover:underline">Masuk</Link>
          </div>
        )}
      </div>
    </div>
  );
}
