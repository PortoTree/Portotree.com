"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, Check, X, Loader2, Sparkles, Rocket } from "lucide-react";
import { checkUsername, claimUsername } from "@/app/actions/portfolio";

interface UsernamePickerProps {
  isOpen: boolean;
  onComplete: (username: string) => void;
  onCancel: () => void;
  suggestedName?: string;
}

export default function UsernamePicker({ isOpen, onComplete, onCancel, suggestedName }: UsernamePickerProps) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Generate suggestion dari nama lengkap
  useEffect(() => {
    if (suggestedName && !username) {
      const suggestion = suggestedName
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9_-]/g, "");
      if (suggestion.length >= 3) {
        setUsername(suggestion);
      }
    }
  }, [suggestedName]);

  // Debounced availability check
  useEffect(() => {
    if (!username || username.length < 3) {
      setStatus("idle");
      return;
    }

    const timer = setTimeout(async () => {
      setStatus("checking");
      const result = await checkUsername(username);
      if (result.available) {
        setStatus("available");
        setErrorMsg("");
      } else {
        setStatus("taken");
        setErrorMsg(result.error || "Username tidak tersedia");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const handlePublish = useCallback(async () => {
    if (status !== "available" || isPublishing) return;

    setIsPublishing(true);
    const result = await claimUsername(username);

    if (result.success) {
      console.log(`[DEBUG] Username "${username}" berhasil di-publish`);
      onComplete(username);
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Gagal mempublikasikan portfolio");
    }
    setIsPublishing(false);
  }, [username, status, isPublishing, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300 relative">
        {/* Close (X) Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 px-8 py-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Publish Portofoliomu! 🚀</h2>
          <p className="text-emerald-100 text-sm">
            Pilih link unik untuk portofolio publikmu
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-5">
          {/* Preview URL */}
          <div className="bg-slate-50 rounded-xl px-4 py-3 text-center border border-slate-200">
            <span className="text-slate-400 text-sm font-mono">portotree.com/p/</span>
            <span className="text-emerald-600 font-bold text-sm font-mono">
              {username || "username"}
            </span>
          </div>

          {/* Input */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
              Username / Link
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
                  setUsername(val);
                }}
                placeholder="Ketik username..."
                maxLength={30}
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all outline-none ${
                  status === "available"
                    ? "border-emerald-400 bg-emerald-50/50 focus:ring-2 focus:ring-emerald-200"
                    : status === "taken" || status === "error"
                    ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {status === "checking" && <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />}
                {status === "available" && <Check className="w-5 h-5 text-emerald-500" />}
                {(status === "taken" || status === "error") && <X className="w-5 h-5 text-red-500" />}
              </div>
            </div>
          </div>

          {/* Status message */}
          {status === "available" && (
            <p className="text-emerald-600 text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Link tersedia! Siap dipublikasikan.
            </p>
          )}
          {(status === "taken" || status === "error") && (
            <p className="text-red-500 text-xs font-medium">{errorMsg}</p>
          )}
          {status === "idle" && username.length > 0 && username.length < 3 && (
            <p className="text-slate-400 text-xs">Minimal 3 karakter</p>
          )}

          {/* Info */}
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="text-xs text-emerald-700">
              💡 Link ini akan menjadi alamat publik portofoliomu. Kamu bisa mengubahnya nanti di halaman Dashboard Portofolio.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePublish}
              disabled={status !== "available" || isPublishing}
              className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                status === "available" && !isPublishing
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" /> Publish Portofolio
                </>
              )}
            </button>
            <button
              onClick={onCancel}
              className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
