import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogBySlug, getPublishedBlogs } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60;

// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await getBlogBySlug(resolvedParams.slug);
  
  if (!result.success || !result.data) {
    return { title: "Artikel Tidak Ditemukan | PortoTree" };
  }
  
  return {
    title: `${result.data.title} | PortoTree Blog`,
    description: result.data.excerpt || "Baca artikel selengkapnya di PortoTree.",
    openGraph: {
      images: result.data.coverImage ? [result.data.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const result = await getBlogBySlug(resolvedParams.slug);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const blog = result.data;
  const date = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : "";

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24">
        {/* Cover Image Header */}
        <div className="w-full max-w-5xl mx-auto px-6 mb-8 pt-8">
          <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-emerald-600 font-medium transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Blog
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
              {blog.category || "Karier"}
            </span>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <time>{date}</time>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug text-balance mb-6">
            {blog.title}
          </h1>
        </div>

        {blog.coverImage && (
          <div className="w-full max-w-6xl mx-auto px-6 mb-16">
            <div className="relative aspect-[2/1] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <Image 
                src={blog.coverImage} 
                alt={blog.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6">
          <article 
            className="prose prose-slate mx-auto blog-content
              prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
              prose-p:leading-relaxed prose-p:text-slate-600
              prose-li:text-slate-600
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              prose-li:marker:text-emerald-500
              prose-a:text-blue-600 prose-a:underline prose-a:decoration-blue-600/30 prose-a:underline-offset-4 prose-a:font-bold hover:prose-a:text-blue-800 hover:prose-a:decoration-blue-800"
          >
            <style>{`
              .blog-content h1 { font-size: 2.25rem !important; line-height: 2.5rem !important; font-weight: 800 !important; margin-top: 2rem !important; margin-bottom: 1rem !important; }
              .blog-content h2 { font-size: 1.875rem !important; line-height: 2.25rem !important; font-weight: 700 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important; }
              .blog-content h3 { font-size: 1.5rem !important; line-height: 2rem !important; font-weight: 700 !important; margin-top: 1.5rem !important; margin-bottom: 0.5rem !important; }
              .blog-content p { margin-top: 1rem !important; margin-bottom: 1rem !important; line-height: 1.75 !important; }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
            <p className="text-slate-500 font-medium text-center">Terima kasih telah membaca.</p>
            <Link 
              href="/blog"
              className="inline-flex items-center justify-center font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors h-12 px-8 rounded-full shadow-md"
            >
              Baca Lainnya
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
