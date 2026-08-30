"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createSession } from "@/app/actions/auth";

function ImpersonateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    async function doImpersonate() {
      try {
        const userCred = await signInWithCustomToken(auth, token as string);
        const idToken = await userCred.user.getIdToken();
        const res = await createSession(idToken);
        if (res.success) {
          router.replace("/p/dashboard");
        } else {
          setError(res.error || "Gagal membuat sesi");
        }
      } catch (err: any) {
        setError(err.message || "Gagal verifikasi token");
      }
    }

    doImpersonate();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Mengalihkan Sesi...</h1>
      <p className="text-slate-500 max-w-sm">Sedang mempersiapkan dashboard untuk akun ini. Harap tunggu sebentar.</p>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg max-w-sm w-full font-medium">
          Error: {error}
          <div className="mt-4">
            <button 
              onClick={() => router.replace("/login")}
              className="px-4 py-2 bg-white rounded border border-red-200 text-sm hover:bg-red-100 transition-colors"
            >
              Kembali ke Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImpersonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Mengalihkan Sesi...</h1>
        <p className="text-slate-500 max-w-sm">Sedang mempersiapkan dashboard untuk akun ini. Harap tunggu sebentar.</p>
      </div>
    }>
      <ImpersonateContent />
    </Suspense>
  );
}

