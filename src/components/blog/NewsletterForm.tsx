"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setMessage("Berhasil berlangganan!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error || "Gagal berlangganan.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl border border-emerald-400/50 p-6 text-center shadow-lg">
      <h4 className="font-bold text-white mb-2">Lebih Dekat</h4>
      <p className="text-sm text-emerald-50 mb-4">Dapatkan tips menarik langsung ke emailmu.</p>
      
      {status === "success" ? (
        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm font-medium border border-emerald-100">
          🎉 {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input 
              type="email" 
              placeholder="Alamat Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="w-full px-4 py-2.5 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-emerald-300/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 shadow-inner" 
            />
          </div>
          {status === "error" && (
            <p className="text-xs text-red-500 text-left px-1">{message}</p>
          )}
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-white text-emerald-700 font-bold py-2.5 rounded-lg text-sm hover:bg-emerald-50 shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {status === "loading" ? (
              <span className="w-5 h-5 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin"></span>
            ) : (
              "Berlangganan"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
