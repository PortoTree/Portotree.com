import { Suspense } from "react";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import PortofindClient from "./PortofindClient";
import Link from "next/link";
import { FileText, Briefcase, Lock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofind | PortoTree",
  description: "Cari kerja dan cari talent dengan mudah melalui Portofind",
};

export default async function PortofindPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-slate-50">
        Harap login terlebih dahulu.
      </div>
    );
  }

  let hasPortfolio = false;
  let hasCv = false;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    const uid = decodedToken.uid;

    const [portfolioDoc, cvConfigDoc] = await Promise.all([
      adminDb.collection('portfolios').doc(uid).get(),
      adminDb.collection('cvConfigs').doc(uid).get()
    ]);

    hasPortfolio = portfolioDoc.exists;
    hasCv = cvConfigDoc.exists;
  } catch (error) {
    console.error("Error verifying auth for portofind:", error);
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-slate-50 text-red-500">
        Terjadi kesalahan autentikasi saat memuat halaman ini.
      </div>
    );
  }

  const hasAccess = hasPortfolio || hasCv;

  if (!hasAccess) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-slate-950 p-4 sm:p-8">
        <div className="w-full max-w-lg flex flex-col items-center justify-center p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700">
            <Lock className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4 text-center tracking-tight">Fitur Terkunci</h2>
          <p className="text-slate-400 text-center mb-8 leading-relaxed">
            Untuk dapat mengakses dan menggunakan fitur <strong className="text-emerald-400">Portofind</strong> (Job Portal), Anda wajib memiliki setidaknya satu <strong className="text-slate-200">Portofolio</strong> atau <strong className="text-slate-200">Resume/CV</strong> di PortoTree.
          </p>
          <div className="flex flex-col w-full gap-3">
            <Link href="/p/portofolio" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-md shadow-emerald-900/20 hover:bg-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-emerald-500">
              <Briefcase className="w-5 h-5" />
              Buat Portofolio Sekarang
            </Link>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-slate-500 text-sm font-medium">ATAU</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>
            <Link href="/p/resume" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent text-blue-400 font-bold rounded-2xl border-2 border-slate-700 hover:border-blue-500 hover:bg-blue-950/30 transition-all">
              <FileText className="w-5 h-5" />
              Buat Resume / CV
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center bg-slate-950 text-emerald-400">
        Memuat Portofind...
      </div>
    }>
      <PortofindClient />
    </Suspense>
  );
}
