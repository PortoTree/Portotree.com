"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBlogById, updateBlog, deleteBlog } from "@/app/actions/blog";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Save, ArrowLeft, Loader2, Image as ImageIcon, Trash2, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useUI } from "@/components/ui/UIProvider";
import { use } from "react";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { showConfirm } = useUI();
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Karier",
    content: "",
    coverImage: "",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const result = await getBlogById(id);
        if (result.success && result.data) {
          setFormData({
            title: result.data.title || "",
            slug: result.data.slug || "",
            excerpt: result.data.excerpt || "",
            category: result.data.category || "Karier",
            content: result.data.content || "",
            coverImage: result.data.coverImage || "",
            status: result.data.status || "draft",
          });
        } else {
          toast.error("Blog tidak ditemukan");
          router.push("/blogs");
        }
      } catch (error) {
        toast.error("Gagal mengambil data blog");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({ ...prev, title }));
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!formData.title.trim()) {
      toast.error("Judul artikel tidak boleh kosong");
      return;
    }
    
    if (!formData.content.trim() || formData.content === "<p><br></p>") {
      toast.error("Konten artikel tidak boleh kosong");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dataToSave = {
        ...formData,
        status,
      };
      
      const result = await updateBlog(id, dataToSave);
      
      if (result.success) {
        toast.success(`Artikel berhasil diperbarui dan di-set sebagai ${status}`);
        setFormData(prev => ({ ...prev, status }));
        router.refresh();
      } else {
        toast.error(result.error || "Gagal memperbarui artikel");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    showConfirm({
      title: "Hapus Artikel",
      message: "Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak bisa dibatalkan.",
      variant: "danger",
      onConfirm: async () => {
        setIsDeleting(true);
        try {
          const result = await deleteBlog(id);
          if (result.success) {
            toast.success("Artikel berhasil dihapus");
            router.push("/blogs");
            router.refresh();
          } else {
            toast.error("Gagal menghapus artikel");
          }
        } catch (error) {
          toast.error("Terjadi kesalahan saat menghapus");
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/blogs" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Artikel</h1>
            <p className="text-sm text-slate-500 mt-1">Status: <strong className="uppercase">{formData.status}</strong></p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {formData.status === 'published' && (
            <a 
              href={`https://portotree.com/blog/${formData.slug}`} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-cyan-600 rounded-lg text-sm font-medium transition-colors"
            >
              Lihat Publikasi
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-700 font-bold">Judul Artikel</Label>
              <Input 
                id="title" 
                placeholder="Contoh: 10 Tips Membangun Portofolio..." 
                value={formData.title}
                onChange={handleTitleChange}
                className="text-lg py-6 font-medium focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-700 font-bold">Kategori</Label>
              <div className="flex gap-2 items-center">
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value || "Karier" }))}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Karier">Karier</SelectItem>
                    <SelectItem value="Tips & Trik">Tips & Trik</SelectItem>
                    <SelectItem value="Edukasi">Edukasi</SelectItem>
                    <SelectItem value="Info & Berita">Info & Berita</SelectItem>
                    <SelectItem value="Dokumen (CV/Surat)">Dokumen (CV/Surat)</SelectItem>
                    <SelectItem value="Portofolio">Portofolio</SelectItem>
                    {/* Render existing custom category if selected */}
                    {![
                      "Karier", "Tips & Trik", "Edukasi", "Info & Berita", "Dokumen (CV/Surat)", "Portofolio"
                    ].includes(formData.category) && formData.category && (
                      <SelectItem value={formData.category}>{formData.category}</SelectItem>
                    )}
                  </SelectContent>
                </Select>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button" className="shrink-0 px-3" onClick={() => setNewCategory(formData.category)} title="Custom Kategori">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Kategori Kustom</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Nama Kategori</Label>
                        <Input 
                          placeholder="Masukkan nama kategori baru..."
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" onClick={() => {
                          if (newCategory.trim()) {
                            setFormData(prev => ({ ...prev, category: newCategory.trim() }));
                          }
                        }}>
                          Gunakan Kategori Ini
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-700 font-bold">Isi Artikel</Label>
              <RichTextEditor 
                value={formData.content}
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                placeholder="Tulis artikel Anda di sini..."
                className="min-h-[400px]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Actions Sidebar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Perbarui</h3>
              
              <Button 
                onClick={() => handleSave("published")} 
                disabled={isSubmitting || isDeleting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
              >
                {isSubmitting && formData.status === 'published' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {formData.status === 'published' ? 'Perbarui Publikasi' : 'Publikasikan Sekarang'}
              </Button>
              
              <Button 
                onClick={() => handleSave("draft")} 
                disabled={isSubmitting || isDeleting}
                variant="outline"
                className={`w-full text-slate-600 hover:text-slate-900 ${formData.status === 'draft' ? 'bg-slate-50' : ''}`}
              >
                {isSubmitting && formData.status === 'draft' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Simpan ke Draft
              </Button>

              <div className="pt-4 border-t border-slate-100">
                <Button 
                  onClick={handleDelete} 
                  disabled={isSubmitting || isDeleting}
                  variant="ghost"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                  Hapus Artikel
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Gambar Sampul</h3>
              
              {formData.coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
                  <Image src={formData.coverImage} alt="Cover" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Tidak ada sampul</p>
                    <p className="text-xs text-slate-500 mt-1">Upload gambar untuk menarik perhatian pembaca.</p>
                  </div>
                  <ImageUpload 
                    onUploadSuccess={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">SEO & Meta</h3>
              
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-semibold text-slate-700">URL Slug</Label>
                <Input 
                  id="slug" 
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") }))}
                  className="text-sm focus-visible:ring-cyan-500"
                />
                <p className="text-[11px] text-slate-500 break-all">portotree.com/blog/{formData.slug}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">Kutipan Pendek (Excerpt)</Label>
                <Textarea 
                  id="excerpt" 
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Ringkasan singkat artikel ini..."
                  className="text-sm resize-none h-24 focus-visible:ring-cyan-500"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
