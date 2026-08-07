import { getAdminBlogs } from "@/app/actions/blog";
import { FileText, Eye, Users } from "lucide-react";
import Link from "next/link";

export default async function OwnerDashboardPage() {
  const blogsResult = await getAdminBlogs();
  const blogs = blogsResult.success ? blogsResult.data || [] : [];
  
  const publishedCount = blogs.filter(b => b.status === 'published').length;
  const draftCount = blogs.filter(b => b.status === 'draft').length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Selamat datang kembali. Berikut adalah ringkasan platform Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Artikel</div>
            <div className="text-3xl font-black text-slate-900 mt-1">{blogs.length}</div>
            <div className="text-xs text-slate-400 mt-2">{publishedCount} Published • {draftCount} Draft</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 opacity-70">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Views</div>
            <div className="text-3xl font-black text-slate-900 mt-1">--</div>
            <div className="text-xs text-slate-400 mt-2">Segera hadir</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 opacity-70">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Pengguna</div>
            <div className="text-3xl font-black text-slate-900 mt-1">--</div>
            <div className="text-xs text-slate-400 mt-2">Segera hadir</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Artikel Terbaru</h2>
          <Link href="/blogs" className="text-sm font-medium text-cyan-600 hover:text-cyan-700">Lihat Semua</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {blogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Belum ada artikel yang ditulis.</div>
          ) : (
            blogs.slice(0, 3).map((blog) => (
              <div key={blog.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h3 className="font-bold text-slate-900">{blog.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{blog.excerpt || "Tidak ada kutipan"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {blog.status}
                  </span>
                  <Link href={`/blogs/${blog.id}/edit`} className="text-sm font-medium text-slate-600 hover:text-cyan-600 px-3 py-1.5 bg-slate-100 hover:bg-cyan-50 rounded-lg transition-colors">
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
