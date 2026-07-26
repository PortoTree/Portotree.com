import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, PlusCircle, LayoutTemplate } from "lucide-react";

export default function BrainDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2 font-bold text-2xl text-purple-600">
          <LayoutDashboard className="w-6 h-6" />
          <span>Brain Admin</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 bg-purple-50 text-purple-700 rounded-md font-medium">
            <LayoutTemplate className="w-5 h-5" />
            Template Manager
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-md font-medium">
            <Users className="w-5 h-5" />
            User Monitor
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-md font-medium">
            <FileText className="w-5 h-5" />
            Active Pages
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Template Manager</h1>
              <p className="text-slate-500 mt-1">Buat dan kelola master template untuk seluruh user.</p>
            </div>
            {/* The button opens the builder in template mode (e.g., using pageId='template-draft' or mode='template') */}
            <Link 
              href="/portfolio-builder?mode=template"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Buat Template Baru
            </Link>
          </header>

          {/* Template Gallery / List (Mock for now) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                [ No Preview Available ]
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">Han Nguyen Theme (Draft)</h3>
                <p className="text-sm text-gray-500">Dibuat secara manual melalui builder.</p>
                <div className="mt-2 flex gap-2">
                  <Link href="/portfolio-builder?mode=template&id=1" className="text-sm text-purple-600 font-medium hover:underline">
                    Edit Template
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 p-8 h-full min-h-[250px] hover:bg-gray-50 hover:border-purple-400 transition-colors">
              <PlusCircle className="w-8 h-8 mb-2 text-gray-400" />
              <p className="font-medium text-gray-600">Buat Template Lainnya</p>
              <p className="text-sm text-center mt-1">Rakitan manual yang kamu save akan muncul di sini.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
