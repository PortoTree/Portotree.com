import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2">Log in to your PortoTree account</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Forgot?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <button 
            type="button"
            className="w-full py-3 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors mt-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-600">
          Don't have an account? <Link href="/register" className="text-emerald-600 font-bold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
