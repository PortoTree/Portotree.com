import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPublishedBlogs } from "@/app/actions/blog";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog Karir & Tips Kerja - PortoTree",
  description: "Panduan lengkap untuk sukses berkarir. Tips interview, cara menulis CV ATS-friendly, template surat, dan strategi pengembangan karir terbaru.",
};

export const revalidate = 60; // revalidate cache every 60 seconds

export default async function BlogPage() {
  const result = await getPublishedBlogs();
  const blogs = result.data || [];

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
        {blogs.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-[#3a3a3a] mb-2">Belum ada artikel</h2>
            <p className="text-[#6c6c6c] mb-8">
              Kami sedang menyiapkan tulisan-tulisan terbaik. Pantau terus halaman ini!
            </p>
          </div>
        ) : (
          <>
            {/* LATEST SECTION */}
            <section className="py-16 bg-[#f8f9fa]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="lg:col-span-3 order-1">
                      <div className="mb-6 lg:mb-8">
                        <h2 className="text-xl lg:text-2xl font-bold text-[#3a3a3a] mb-2">Artikel Terbaru</h2>
                        <p className="text-sm lg:text-base text-[#6c6c6c]">Baca artikel terbaru untuk sukses berkarir</p>
                      </div>
                      
                      <div className="grid gap-4 lg:gap-6">
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
                                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                                    {blog.category || "Karier"}
                                  </span>
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
                                    <span>PortoTree Contributor</span>
                                  </div>
                                  <span>•</span>
                                  <span>{formatDate(blog.createdAt)}</span>
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
                    </div>

                    {/* Sidebar / Ads Area for layout matching */}
                    <div className="hidden lg:block lg:col-span-1 order-2">
                      <div className="sticky top-24">
                        <div className="bg-white rounded-2xl border border-[#e9ecef] p-6 text-center">
                          <h4 className="font-bold text-[#3a3a3a] mb-2">Lebih Dekat</h4>
                          <p className="text-sm text-[#6c6c6c] mb-4">Dapatkan tips menarik langsung ke emailmu.</p>
                          <input type="email" placeholder="Alamat Email" className="w-full px-4 py-2 border border-[#e9ecef] rounded-lg mb-3 text-sm focus:outline-none focus:border-emerald-600" />
                          <button className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                            Berlangganan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
