"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Briefcase } from "lucide-react";
import AnnouncementCarousel from "@/components/dashboard/AnnouncementCarousel";

export default function RightSidebarWrapper({ recentBlogs }: { recentBlogs: any[] }) {
  const pathname = usePathname();

  // Jika URL mengarah ke chat atau notifikasi, jangan render sidebar kanan
  if (pathname.includes("/chat") || pathname.includes("/notifikasi")) {
    return null;
  }

  return (
    <aside className="hidden lg:block space-y-4 w-[320px] shrink-0">
      <AnnouncementCarousel />
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            Artikel Terbaru
          </h2>
          <div className="space-y-4 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog: any) => (
                <Link href={`https://portotree.com/blog/${blog.slug}`} key={blog.id} className="group flex gap-3 items-start hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                  {blog.coverImage ? (
                    <div className="w-16 h-12 bg-slate-100 rounded shrink-0 overflow-hidden relative">
                      <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 bg-emerald-50 text-emerald-500 rounded shrink-0 flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                  )}
                  <div className="overflow-hidden flex-1">
                    <div className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">{blog.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{new Date(blog.createdAt || Date.now()).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-xs text-slate-500 text-center py-4">Belum ada artikel.</div>
            )}
          </div>
          <Link href="https://portotree.com/blog" className="block text-center w-full mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 py-2 rounded-lg transition-colors">Jelajahi blog</Link>
      </div>
    </aside>
  );
}
