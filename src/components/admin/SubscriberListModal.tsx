"use client";

import { useState } from "react";
import { Mail, X, List } from "lucide-react";

interface SubscriberListModalProps {
  subscribers: any[];
}

export function SubscriberListModal({ subscribers }: SubscriberListModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="mt-2 text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 w-fit"
      >
        <List className="w-3 h-3" />
        Lihat Daftar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg min-w-[320px] sm:min-w-[400px] min-h-[350px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-slate-900">Daftar Subscriber</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 flex flex-wrap gap-2 flex-1 max-h-[60vh] overflow-y-auto content-start">
              {subscribers.length === 0 ? (
                <div className="w-full flex-1 flex items-center justify-center text-slate-500">
                  <p className="text-sm">Belum ada subscriber.</p>
                </div>
              ) : (
                subscribers.map((sub, idx) => (
                  <div key={sub.id || idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-default">
                    <span className="font-medium text-sm text-slate-700">{sub.email}</span>
                    {sub.subscribedAt && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {new Date(sub.subscribedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
