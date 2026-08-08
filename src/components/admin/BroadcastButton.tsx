"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { broadcastLatestBlog } from "@/app/actions/broadcast";

export function BroadcastButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [confirming, setConfirming] = useState(false);

  const handleBroadcast = async () => {
    setConfirming(false);

    setStatus("loading");
    const result = await broadcastLatestBlog();

    if (result.success) {
      setStatus("success");
      setMessage(`Berhasil mengirim ke ${result.count} subscriber!`);
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } else {
      setStatus("error");
      setMessage(result.error || "Gagal mengirim broadcast.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      {message && (
        <div className={`p-2 rounded text-xs font-medium text-center ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}
      {confirming ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-center text-slate-600 font-medium">Yakin kirim ke semua subscriber?</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setConfirming(false)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-2 rounded-xl text-sm transition-all"
            >
              Batal
            </button>
            <button 
              onClick={handleBroadcast}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-2 rounded-xl text-sm transition-all shadow-sm hover:shadow-md"
            >
              Ya, Kirim!
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setConfirming(true)}
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Send className="w-4 h-4" />
          )}
          {status === "loading" ? "Mengirim..." : "Broadcast Artikel Terbaru"}
        </button>
      )}
    </div>
  );
}
