export default function ComingSoonPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm min-h-[400px]">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Coming Soon</h2>
      <p className="text-slate-500 text-center max-w-sm">
        Halaman ini di sembunyikan sementara waktu dan akan segera hadir.
      </p>
    </div>
  );
}
