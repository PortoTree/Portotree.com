"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createSession } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Firebase Client Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Client-side Check (Basic guard)
      // We removed the hardcoded email check here. 
      // The ultimate source of truth is the server-side layout and auth checks which validate against process.env.ADMIN_EMAIL.
      // 3. Get token and create session
      const idToken = await user.getIdToken();
      const result = await createSession(idToken);
      
      if (result.success) {
        toast.success("Login berhasil");
        router.push("/");
        router.refresh();
      } else {
        throw new Error(result.error || "Gagal membuat sesi login");
      }
    } catch (err: any) {
      console.error("Admin login error:", err);
      let errorMessage = "Terjadi kesalahan saat login";
      
      if (err.message.includes("Akses ditolak")) {
        errorMessage = err.message;
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        errorMessage = "Email atau password salah";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Terlalu banyak percobaan. Coba lagi nanti.";
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-cyan-900 selection:text-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="https://portotree.com" className="inline-block">
            <h1 className="font-extrabold text-3xl tracking-tight text-white flex items-center justify-center gap-2 mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">PortoTree</span> Owner
            </h1>
          </Link>
          <p className="text-slate-400">Portal Akses Rahasia Administrator</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-900 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Administrator</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@portotree.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-900/50 h-12 rounded-xl mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Otorisasi Akses"
              )}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-slate-600 text-xs mt-8">
          Akses area ini diawasi dan dilacak secara ketat.<br/>
          Tindakan ilegal akan dilaporkan.
        </p>
      </div>
    </div>
  );
}
