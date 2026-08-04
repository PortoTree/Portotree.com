"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { sendPasswordReset } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await sendPasswordReset(email);
      if (!result.success) {
        throw new Error(result.error || "Gagal mengirim email reset.");
      }
      setIsEmailSent(true);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">

        {/* Back button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke halaman masuk
        </Link>

        {!isEmailSent ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Lupa kata sandi?</h1>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Masukkan alamat email yang terdaftar. Kami akan mengirimkan tautan untuk mereset kata sandi Anda.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Alamat Email</label>
                <input
                  type="email"
                  placeholder="kamu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100"
                  required
                  disabled={loading}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : "Kirim Tautan Reset"}
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-9 h-9 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Email terkirim!</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-2">
              Tautan reset kata sandi telah dikirim ke:
            </p>
            <p className="font-bold text-slate-800 text-sm mb-6">{email}</p>
            <p className="text-slate-400 text-xs mb-8">
              Tidak menerima email? Periksa folder <span className="font-medium">Spam</span> atau coba kirim ulang.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setIsEmailSent(false); setEmail(""); }}
                className="w-full py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
              >
                Kirim ulang ke email lain
              </button>
              <Link
                href="/login"
                className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors text-sm text-center"
              >
                Kembali ke halaman masuk
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
