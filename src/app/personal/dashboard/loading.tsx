export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center">
      <img 
        src="/loading-gif.gif" 
        alt="Loading..."
        className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-90"
      />
    </div>
  );
}
