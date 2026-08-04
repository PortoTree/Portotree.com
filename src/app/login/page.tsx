"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createSession } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Sign in with Firebase Client
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 2. Get ID token
      const idToken = await userCredential.user.getIdToken();

      // 3. Create server session cookie
      const result = await createSession(idToken);
      if (!result.success) {
        throw new Error("Gagal membuat sesi login.");
      }

      // 4. Redirect to dashboard
      router.push("/personal/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      const code = err.code;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Email atau password salah. Silakan coba lagi.");
      } else if (code === "auth/too-many-requests") {
        setError("Terlalu banyak percobaan login. Coba lagi beberapa menit kemudian.");
      } else {
        setError(err.message || "Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Selamat datang kembali</h1>
          <p className="text-slate-500 mt-2">Masuk ke akun PortoTree Anda</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Kata Sandi</label>
              <Link href="/forgot-password" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Lupa?</Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100"
                required
                disabled={loading}
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
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors mt-2 disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Masuk"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-600">
          Belum punya akun? <Link href="/register" className="text-emerald-600 font-bold hover:underline">Daftar</Link>
        </div>
      </div>
    </div>
  );
}
