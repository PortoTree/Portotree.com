import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPublishedBlogs, getPublishedCategories } from "@/app/actions/blog";
import { labelToSlug } from "@/lib/blogCategories";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight, Search, Calendar } from "lucide-react";
import { NewsletterForm } from "@/components/blog/NewsletterForm";

export const metadata = {
  title: "Blog Karir & Tips Kerja - PortoTree",
  description: "Panduan lengkap untuk sukses berkarir. Tips interview, cara menulis CV ATS-friendly, template surat, dan strategi pengembangan karir terbaru.",
};

export const revalidate = 3600; // revalidate cache every 1 hour

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [result, catResult] = await Promise.all([
    getPublishedBlogs(),
    getPublishedCategories(),
  ]);
  let blogs = result.data || [];
  const dynamicCategories = catResult.data || [];

  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  if (q) {
    const lowerQ = q.toLowerCase();
    blogs = blogs.filter((blog) => {
      const matchTitle = blog.title?.toLowerCase().includes(lowerQ);
      const matchExcerpt = blog.excerpt?.toLowerCase().includes(lowerQ);
      const matchCategory = blog.category?.toLowerCase().includes(lowerQ);
      return matchTitle || matchExcerpt || matchCategory;
    });
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-500/20 selection:text-emerald-600 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* MAIN CONTENT AREA */}
        <section className="bg-white pb-16 pt-4 md:pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* LEFT COLUMN: Hero + Articles */}
              <div className="lg:col-span-3 min-w-0">
                
                {/* HERO TEXT */}
                <div className="mb-16 text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#3a3a3a] mb-4 md:mb-6 tracking-tight leading-snug">
                    Temukan <span className="text-emerald-600">Inspirasi</span> Karirmu
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-[#6c6c6c] mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 px-2 lg:px-0">
                    Baca artikel terbaru, tips interview, dan panduan dunia kerja untuk memaksimalkan potensi karirmu bersama PortoTree.
                  </p>
                  <div className="max-w-2xl mx-auto lg:mx-0 relative">
                    <form action="/blog" method="GET" className="flex items-center">
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input 
                          type="search" 
                          name="q"
                          defaultValue={q}
                          placeholder="Cari artikel, topik..." 
                          className="w-full pl-10 md:pl-12 pr-24 md:pr-28 py-3 md:py-4 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm text-slate-700 transition-all text-sm md:text-base"
                          required
                        />
                      </div>
                      <button type="submit" className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 bg-emerald-600 text-white px-4 md:px-6 rounded-full font-bold text-sm md:text-base hover:bg-emerald-700 hover:shadow-md transition-all">
                        Cari
                      </button>
                    </form>
                  </div>
                </div>

                {/* ARTICLE LIST HEADER & CATEGORIES */}
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-xl lg:text-2xl font-bold text-[#3a3a3a] mb-2">
                    Artikel Terbaru
                  </h2>
                  <p className="text-sm lg:text-base text-[#6c6c6c]">Baca artikel terbaru untuk sukses berkarir</p>
                  
                  {/* Dynamic Category Tabs */}
                  <div className="flex flex-nowrap lg:flex-wrap items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide w-full">
                    {/* "Semua" selalu muncul */}
                    <Link 
                      href="/blog"
                      className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-emerald-600 text-white shadow-md"
                    >
                      Semua
                    </Link>
                    {dynamicCategories.map((cat) => (
                      <Link 
                        key={cat.slug} 
                        href={`/blog/tags/${cat.slug}`}
                        className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-white border border-[#e9ecef] text-[#6c6c6c] hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {blogs.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#3a3a3a] mb-2">
                      {q ? `Tidak ada hasil untuk "${q}"` : 'Belum ada artikel'}
                    </h3>
                    <p className="text-sm text-[#6c6c6c] mb-6">
                      {q ? 'Coba gunakan kata kunci lain atau periksa ejaan Anda.' : 'Kami sedang menyiapkan tulisan-tulisan terbaik. Pantau terus halaman ini!'}
                    </p>
                    {q && (
                      <Link href="/blog" className="inline-flex items-center justify-center bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
                        Kembali
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                    {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e9ecef] hover:shadow-xl transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-80 h-56 md:h-auto flex-shrink-0 relative overflow-hidden bg-[#e9ecef]">
                          {blog.coverImage ? (
                            <Image 
                              src={blog.coverImage} 
                              alt={blog.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                              <span className="text-4xl">📝</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                          <div className="mb-3">
                            <Link href={`/blog/tags/${labelToSlug(blog.category || 'karier')}`}>
                              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer">
                                {blog.category || 'Karier'}
                              </span>
                            </Link>
                          </div>
                          <Link href={`/blog/${blog.slug}`}>
                            <h3 className="text-xl lg:text-2xl font-bold text-[#3a3a3a] mb-3 hover:text-emerald-600 transition-colors leading-tight">
                              {blog.title}
                            </h3>
                          </Link>
                          <p className="text-sm md:text-base text-[#6c6c6c] mb-6 leading-relaxed line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#6c6c6c] mb-6 font-medium">
                            <div className="flex items-center gap-1.5">
                              <User className="w-4 h-4" />
                              <span>PortoTree Admin</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              <span>1 min read</span>
                            </div>
                          </div>
                          <Link 
                            href={`/blog/${blog.slug}`} 
                            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit text-sm"
                          >
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>

              {/* RIGHT COLUMN: Sticky Sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <NewsletterForm />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
