import { getAdminBlogs } from "@/app/actions/blog";
import Link from "next/link";
import { Plus, Search, FileText, Eye, Mail } from "lucide-react";
import { adminDb } from "@/lib/firebase/server";
import { BroadcastButton } from "@/components/admin/BroadcastButton";
import { SubscriberListModal } from "@/components/admin/SubscriberListModal";

export default async function AdminBlogsPage() {
  const blogsResult = await getAdminBlogs();
  const blogs = blogsResult.success ? blogsResult.data || [] : [];

  const publishedCount = blogs.filter(b => b.status === 'published').length;
  const draftCount = blogs.filter(b => b.status === 'draft').length;

  const subDocs = await adminDb.collection('subscribers').get();
  const subscribers = subDocs.docs.map(doc => {
    const data = doc.data();
    // Serialize Firestore Timestamps to ISO strings to pass to Client Component safely
    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      data.createdAt = data.createdAt.toDate().toISOString();
    }
    if (data.subscribedAt && typeof data.subscribedAt.toDate === 'function') {
      data.subscribedAt = data.subscribedAt.toDate().toISOString();
    }
    return {
      id: doc.id,
      ...data
    };
  }) as any[];
  const subscribersCount = subscribers.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Blog</h1>
          <p className="text-slate-500 mt-1">Kelola semua artikel blog PortoTree Anda di sini.</p>
        </div>
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

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">Total Subscriber</div>
              <div className="text-3xl font-black text-slate-900 mt-1">{subscribersCount}</div>
              <div className="text-xs text-slate-400 mt-2">Berlangganan dari Blog</div>
              <SubscriberListModal subscribers={subscribers} />
            </div>
          </div>
          <BroadcastButton />
        </div>
      </div>

      <div>
        
        {/* Article List */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari artikel..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>
          <Link 
            href="/blogs/create" 
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Buat Artikel
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%] md:w-[35%]">Judul Artikel</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell w-[20%] md:w-[15%]">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%] md:w-[15%]">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell w-[20%]">Tanggal Pembuatan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[30%] md:w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-slate-50 rounded-full">
                        <FileText className="w-8 h-8 text-slate-300" />
                      </div>
                      <p>Belum ada artikel yang dibuat.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 overflow-hidden">
                      <div className="font-bold text-slate-900 truncate w-full" title={blog.title}>
                        {blog.title}
                      </div>
                      <div className="text-sm text-slate-500 truncate w-full" title={blog.slug}>
                        {blog.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md truncate max-w-[120px]">
                        {blog.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/blogs/${blog.id}/edit`}
                        className="inline-flex items-center font-medium text-cyan-600 hover:text-cyan-700 px-3 py-1.5 hover:bg-cyan-50 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
    </div>
  );
}
