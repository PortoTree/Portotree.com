"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, Globe, FileSignature, Film, Image as ImageIcon, Briefcase, ChevronDown, X } from "lucide-react";

export default function FeedClient({ userPhoto, userName = "Pengguna", userRole = "pengguna" }: { userPhoto: string | null, userName?: string, userRole?: string }) {
  const [activeTab, setActiveTab] = useState("feed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea in modal
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [postText]);

  const Avatar = () => (
    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0 overflow-hidden border border-slate-200">
      {userPhoto ? (
        <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        userName.charAt(0).toUpperCase()
      )}
    </div>
  );

  return (
    <>
      {/* Create Post Trigger */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-4">
        <div className="flex gap-3 items-center mb-3">
          <Avatar />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-2.5 px-4 text-left text-slate-500 transition-colors text-sm"
          >
            {userRole === "recruiter" ? "Ada loker baru untuk dibagikan? Tulis di sini..." : "Ada loker baru? Atau mau cari kerja? Tulis di sini..."}
          </button>
        </div>
        
        <div className="flex items-center justify-between w-full pt-2 px-1 border-t border-slate-100 mt-2">
          <div className="flex w-full justify-between overflow-x-auto pb-1 no-scrollbar gap-1">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 bg-transparent hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors shrink-0">
              <ImageIcon className="w-5 h-5 text-emerald-500" /> Foto
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 bg-transparent hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors shrink-0">
              <Film className="w-5 h-5 text-rose-500" /> Embed Video
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 bg-transparent hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors shrink-0">
              <Globe className="w-5 h-5 text-blue-500" /> Portofolio
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 bg-transparent hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors shrink-0 hidden sm:flex">
              <FileText className="w-5 h-5 text-orange-500" /> CV
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 bg-transparent hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors shrink-0 hidden sm:flex">
              <FileSignature className="w-5 h-5 text-purple-500" /> Surat
            </button>
          </div>
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">Buat Postingan</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <Avatar />
                <div>
                  <div className="font-bold text-sm text-slate-800">{userName}</div>
                  <div className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5">{userRole === "recruiter" ? "Recruiter / HR" : "Mencari Kerja"}</div>
                </div>
              </div>

              <textarea
                ref={textareaRef}
                autoFocus
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={userRole === "recruiter" ? "Posting lowongan baru dari perusahaan Anda..." : "Apa yang ingin Anda bagikan atau pamerkan?"}
                className="w-full resize-none text-slate-800 text-base placeholder:text-slate-400 focus:outline-none min-h-[120px]"
              />
            </div>

            {/* Attachments & Footer */}
            <div className="p-4 border-t border-slate-100 shrink-0">
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-600">Tambahkan ke postingan</span>
                  <div className="flex gap-1">
                    <button className="group relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-emerald-500 transition-colors">
                      <ImageIcon className="w-5 h-5" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm">Upload Foto</span>
                    </button>
                    <button className="group relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-rose-500 transition-colors">
                      <Film className="w-5 h-5" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm">Embed Video</span>
                    </button>
                    <button className="group relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-blue-500 transition-colors">
                      <Globe className="w-5 h-5" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm">Portofolio</span>
                    </button>
                    <button className="group relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-orange-500 transition-colors">
                      <FileText className="w-5 h-5" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm">Lampirkan CV</span>
                    </button>
                    <button className="group relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 text-purple-500 transition-colors">
                      <FileSignature className="w-5 h-5" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-sm">Lampirkan Surat</span>
                    </button>
                  </div>
                </div>

              <button 
                disabled={!postText.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-2.5 rounded-xl transition-colors"
              >
                Posting
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Feed Filters */}
      <div className="flex gap-4 border-b border-slate-200 pb-2 mb-4">
        <button className="text-sm font-bold text-emerald-600 border-b-2 border-emerald-600 pb-2 px-1">Terbaru</button>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 pb-2 px-1">Loker</button>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 pb-2 px-1">Talent</button>
      </div>

      {/* Post Dummy 1 (Recruiter Posting Job) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">PT</div>
            <div>
              <div className="font-bold text-sm text-slate-800 flex items-center gap-1">
                PT Maju Karya Bangsa <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 rounded-full">Recruiter</span>
              </div>
              <div className="text-xs text-slate-500">2 jam yang lalu • Grup Jakarta</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-700 mb-4 whitespace-pre-wrap">
          Dibutuhkan segera **Frontend Developer (React/Next.js)**! 🚀
          
          Kualifikasi:
          - Pengalaman minimal 2 tahun di React
          - Paham TailwindCSS & TypeScript
          - WFO Jakarta Selatan (Sudirman)
          
          Gaji: 8 - 12 Juta/Bulan. Yg minat langsung apply atau lampirkan CV kalian di bawah!
        </div>
        
        {/* Attachment Card (Company Info) */}
        <div className="border border-slate-100 bg-slate-50 rounded-xl p-3 flex gap-3 items-center mb-4 cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="w-12 h-12 rounded bg-slate-200 shrink-0 flex items-center justify-center"><Briefcase className="w-5 h-5 text-slate-400" /></div>
          <div>
            <div className="text-sm font-bold text-slate-800">Profil Perusahaan: PT Maju Karya Bangsa</div>
            <div className="text-xs text-slate-500">Tech Agency • 50-100 Karyawan</div>
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg text-sm transition-colors">
            Share
          </button>
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
            Lamar Cepat (1-Click)
          </button>
        </div>
      </div>

      {/* Post Dummy 2 (Worker Posting Portfolio) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">AB</div>
            <div>
              <div className="font-bold text-sm text-slate-800 flex items-center gap-1">
                Agus Budi <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 rounded-full">Open to Work</span>
              </div>
              <div className="text-xs text-slate-500">5 jam yang lalu • Grup Online/Remote</div>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-700 mb-4 whitespace-pre-wrap">
          Halo para recruiter! Saya sedang mencari peluang full-time sebagai UI/UX Designer.
          Biasa menggunakan Figma & Framer. Berikut saya lampirkan CV dan Portofolio terbaru saya yang baru saja saya build di PortoTree. 🎨💼
        </div>
        
        {/* Attachment Card (Worker CV & Porto) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="border border-slate-100 bg-emerald-50/50 rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:bg-emerald-50 transition-colors">
            <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600"><Globe className="w-4 h-4" /></div>
            <div>
              <div className="text-xs font-bold text-slate-800">Portofolio Saya</div>
              <div className="text-[10px] text-slate-500 truncate">agus.portotree.com</div>
            </div>
          </div>
          <div className="border border-slate-100 bg-amber-50/50 rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:bg-amber-50 transition-colors">
            <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-600"><FileText className="w-4 h-4" /></div>
            <div>
              <div className="text-xs font-bold text-slate-800">CV ATS (Agus Budi)</div>
              <div className="text-[10px] text-slate-500">PDF Document</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg text-sm transition-colors">
            Share
          </button>
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
            Hire / Hubungi
          </button>
        </div>
      </div>
    </>
  );
}
