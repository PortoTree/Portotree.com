"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      setSuccess(true);
      setLoading(false);
      // Reset form handled by state conditionally rendering the success message
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-emerald-50 border border-emerald-100 rounded-2xl h-full min-h-[300px]">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Pesan Terkirim!</h3>
        <p className="text-slate-600 mb-6">
          Terima kasih telah menghubungi kami. Tim PortoTree akan segera membalas pesan Anda maksimal dalam 1x24 jam.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Kirim pesan lainnya
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
          <input 
            type="text" 
            id="name"
            name="name"
            placeholder="Cth: Budi Santoso"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">Alamat Email</label>
          <input 
            type="email" 
            id="email"
            name="email"
            placeholder="budi@example.com"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subjek Topik</label>
        <select 
          id="subject"
          name="subject"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 appearance-none"
          disabled={loading}
        >
          <option value="general">Pertanyaan Umum</option>
          <option value="support">Bantuan Teknis / Bug</option>
          <option value="business">Kerjasama / Partnership</option>
          <option value="feedback">Saran & Kritik</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-slate-700">Isi Pesan</label>
        <textarea 
          id="message"
          name="message"
          rows={5}
          placeholder="Tuliskan pesan Anda di sini secara detail..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
          required
          disabled={loading}
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
        {!loading && <Send className="w-5 h-5" />}
      </button>
    </form>
  );
}
