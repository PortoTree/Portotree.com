import Link from "next/link";
import { Eye, MousePointerClick, TrendingUp, Globe, Link as LinkIcon, Edit3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, John!</h1>
          <p className="text-slate-500 mt-1">Here is what's happening with your portfolio today.</p>
        </div>
        <Link 
          href="/dashboard/storefront" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
        >
          <Edit3 className="w-5 h-5" />
          Edit Portfolio
        </Link>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600">Total Views</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900">1,248</div>
          <div className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12% from last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600">Link Clicks</h3>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900">384</div>
          <div className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +5% from last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600">Unique Visitors</h3>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900">892</div>
          <div className="text-sm text-slate-500 font-medium mt-2">
            Across 12 countries
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PUBLICATION SETTINGS */}
        <section id="settings" className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Publication & Links</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <h4 className="font-bold text-slate-800">Portfolio Status</h4>
                <p className="text-sm text-slate-500">Make your portfolio visible to public</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="space-y-3">
              <label className="font-bold text-slate-700 text-sm">Your Portotree Link</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                  portotree.com/
                </span>
                <input 
                  type="text" 
                  defaultValue="johndoe"
                  className="flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-medium text-slate-900"
                />
              </div>
              <button className="text-sm text-emerald-600 font-bold flex items-center gap-1 hover:text-emerald-700">
                <LinkIcon className="w-4 h-4" /> Copy link
              </button>
            </div>
          </div>
        </section>

        {/* ACCOUNT SETTINGS */}
        <section id="account" className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h2>
          
          <form className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 font-medium"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input 
                type="email" 
                defaultValue="john@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 font-medium bg-slate-50"
                disabled
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Current Plan</label>
              <div className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-between">
                <span className="font-bold text-emerald-800">Free Plan</span>
                <button type="button" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Upgrade</button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button 
                type="button"
                className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
