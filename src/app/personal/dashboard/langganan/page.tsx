"use client";

import { Check, Zap, Crown } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "Gratis",
    period: "",
    icon: null,
    color: "border-slate-200",
    badge: null,
    features: [
      "1 halaman portofolio",
      "1 CV",
      "Subdomain portotree.com/username",
      "Tampilan profil dasar",
      "Statistik kunjungan dasar",
    ],
    disabled: ["Custom domain", "Hapus branding PortoTree", "Prioritas dukungan"],
    cta: "Paket Saat Ini",
    ctaStyle: "bg-slate-100 text-slate-500 cursor-default",
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 49.000",
    period: "/ bulan",
    icon: Zap,
    color: "border-emerald-400 ring-2 ring-emerald-400",
    badge: "Terpopuler",
    badgeColor: "bg-emerald-500",
    features: [
      "Portofolio tak terbatas",
      "CV tak terbatas",
      "Subdomain portotree.com/username",
      "Custom domain (domain sendiri)",
      "Hapus branding PortoTree",
      "Statistik kunjungan lengkap",
      "Semua template premium",
    ],
    disabled: ["Prioritas dukungan"],
    cta: "Upgrade ke Pro",
    ctaStyle: "bg-emerald-600 text-white hover:bg-emerald-700",
    current: false,
  },
  {
    id: "business",
    name: "Business",
    price: "Rp 129.000",
    period: "/ bulan",
    icon: Crown,
    color: "border-violet-300",
    badge: null,
    features: [
      "Semua fitur Pro",
      "Hingga 5 anggota tim",
      "Analytics lanjutan",
      "Integrasi API",
      "Prioritas dukungan 24/7",
      "Onboarding personal",
    ],
    disabled: [],
    cta: "Upgrade ke Business",
    ctaStyle: "bg-violet-600 text-white hover:bg-violet-700",
    current: false,
  },
];

export default function LanggananPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Langganan</h1>
        <p className="text-slate-500 mt-1">Pilih paket yang sesuai dengan kebutuhan Anda.</p>
      </div>

      {/* STATUS SAAT INI */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-700">Paket Aktif Anda</p>
          <p className="text-2xl font-black text-emerald-900 mt-0.5">Free Plan</p>
          <p className="text-sm text-emerald-600 mt-1">Aktif sejak 4 Agustus 2026 · Tidak ada masa berlaku</p>
        </div>
        <div className="text-sm text-emerald-700 font-medium bg-white border border-emerald-200 px-4 py-2 rounded-xl">
          ✓ Akun aktif
        </div>
      </div>

      {/* PLAN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl border-2 p-6 flex flex-col relative ${plan.color}`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white px-3 py-1 rounded-full ${plan.badgeColor}`}>
                {plan.badge}
              </span>
            )}

            {/* Plan name */}
            <div className="flex items-center gap-2 mb-4">
              {plan.icon && <plan.icon className="w-5 h-5 text-emerald-600" />}
              <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900">{plan.price}</span>
              {plan.period && <span className="text-slate-500 text-sm ml-1">{plan.period}</span>}
            </div>

            {/* Features */}
            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
              {plan.disabled.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-400 line-through">
                  <Check className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              disabled={plan.current}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${plan.ctaStyle}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ singkat */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-bold text-slate-900">Pertanyaan Umum</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-slate-700">Bisakah saya ganti paket kapan saja?</p>
            <p className="text-slate-500 mt-0.5">Ya, Anda bisa upgrade atau downgrade paket kapan saja tanpa penalti.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Metode pembayaran apa yang tersedia?</p>
            <p className="text-slate-500 mt-0.5">Kami menerima transfer bank, QRIS, GoPay, OVO, dan kartu kredit.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Apakah ada garansi uang kembali?</p>
            <p className="text-slate-500 mt-0.5">Ya, kami memberikan garansi uang kembali 7 hari tanpa syarat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
