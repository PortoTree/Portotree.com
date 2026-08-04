"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Verify the oobCode on mount
  useEffect(() => {
    if (!oobCode) {
      setError("Tautan reset tidak valid atau sudah kadaluarsa.");
      setVerifying(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then((email) => {
        setResetEmail(email);
        setIsCodeValid(true);
      })
      .catch(() => {
        setError("Tautan reset tidak valid atau sudah kadaluarsa. Silakan minta tautan baru.");
        setIsCodeValid(false);
      })
      .finally(() => setVerifying(false));
  }, [oobCode]);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 0) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  const isPasswordValid = password.length >= 8 && /\d/.test(password);
  const isMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    if (!isMatch) { setError("Kata sandi tidak cocok."); return; }
    if (!oobCode) return;

    setLoading(true);
    setError("");

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      console.error("Confirm reset error:", err);
      if (err.code === "auth/expired-action-code") {
        setError("Tautan sudah kadaluarsa. Silakan minta tautan reset baru.");
      } else if (err.code === "auth/invalid-action-code") {
        setError("Tautan tidak valid. Pastikan Anda menggunakan tautan terbaru dari email.");
      } else if (err.code === "auth/weak-password") {
        setError("Kata sandi terlalu lemah. Gunakan minimal 8 karakter dan 1 angka.");
      } else {
        setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">

        {/* Loading state */}
        {verifying && (
          <div className="text-center py-8">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm">Memverifikasi tautan reset...</p>
          </div>
        )}

        {/* Invalid code state */}
        {!verifying && !isCodeValid && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-9 h-9 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Tautan Tidak Valid</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{error}</p>
            <Link
              href="/forgot-password"
              className="inline-block w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors text-sm text-center"
            >
              Minta Tautan Baru
            </Link>
          </div>
        )}

        {/* Success state */}
        {!verifying && isSuccess && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-9 h-9 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Kata Sandi Berhasil Diubah!</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Anda akan diarahkan ke halaman masuk dalam beberapa detik...
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors text-sm text-center"
            >
              Masuk Sekarang
            </Link>
          </div>
        )}

        {/* Reset form */}
        {!verifying && isCodeValid && !isSuccess && (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <div className="w-5 h-5 border-2 border-white rounded-full"></div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Buat Kata Sandi Baru</h1>
              <p className="text-slate-500 mt-2 text-sm">untuk akun <span className="font-semibold text-slate-700">{resetEmail}</span></p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-5">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Kata Sandi Baru</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100"
                    required
                    disabled={loading}
                    autoFocus
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

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            strength >= level
                              ? strength <= 2 ? "bg-amber-400" : "bg-emerald-500"
                              : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={isPasswordValid ? "text-emerald-600 font-medium" : "text-slate-500"}>
                        {strength <= 1 ? "Lemah" : strength <= 2 ? "Sedang" : strength === 3 ? "Kuat" : "Sangat Kuat"}
                      </span>
                      <span className={isPasswordValid ? "text-emerald-600 font-medium" : "text-slate-500"}>
                        Minimal 8 karakter termasuk angka
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Ulangi kata sandi baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border transition-colors disabled:bg-slate-100 ${
                      confirmPassword.length > 0
                        ? isMatch
                          ? "border-emerald-400 focus:ring-emerald-500 focus:border-emerald-500"
                          : "border-red-400 focus:ring-red-400 focus:border-red-400"
                        : "border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
                    }`}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword.length > 0 && !isMatch && (
                  <p className="text-xs text-red-500 font-medium">Kata sandi tidak cocok</p>
                )}
                {confirmPassword.length > 0 && isMatch && (
                  <p className="text-xs text-emerald-600 font-medium">✓ Kata sandi cocok</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !isPasswordValid || !isMatch}
                className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : "Simpan Kata Sandi Baru"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
