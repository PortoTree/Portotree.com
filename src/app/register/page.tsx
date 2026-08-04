"use client";

import { useState, useRef, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendVerification, verifyOTP, createSession, validateTurnstile } from "@/app/actions/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  // States for UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // OTP Verification state
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleResendCode = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await sendVerification(email);
      if (!result.success) {
        throw new Error(result.error || "Gagal mengirim ulang kode");
      }
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
      router.push("/dashboard");
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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isVerificationMode ? "Verifikasi Email" : "Create an account"}
          </h1>
          <p className="text-slate-500 mt-2">
            {isVerificationMode 
              ? `Kami telah mengirim 6 digit kode ke ${email}`
              : "Start building your portfolio for free"
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
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100 disabled:text-slate-500"
              required
              disabled={loading || isVerificationMode}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input 
              type="password" 
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100 disabled:text-slate-500"
              required
              minLength={6}
              disabled={loading || isVerificationMode}
            />
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
              disabled={loading || !turnstileToken}
              className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors mt-2 disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Create Account"}
            </button>
          )}
        </form>

        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isVerificationMode ? "opacity-100 max-h-64 mt-6" : "opacity-0 max-h-0"
          }`}
        >
          <div className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  disabled={loading}
                  className="w-12 h-14 text-center text-xl font-bold text-slate-900 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-slate-50 focus:bg-white disabled:opacity-50"
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
                className="text-sm font-medium text-emerald-600 hover:underline"
                disabled={loading}
              >
                Kirim ulang kode
              </button>
            </div>
          </div>
        </div>

        {!isVerificationMode && (
          <div className="mt-8 text-center text-sm font-medium text-slate-600">
            Already have an account? <Link href="/login" className="text-slate-900 font-bold hover:underline">Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
}
