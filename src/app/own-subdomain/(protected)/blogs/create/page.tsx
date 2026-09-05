"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog, getCustomCategories, saveCustomCategory, updateCustomCategory, deleteCustomCategory } from "@/app/actions/blog";
import { Pencil } from "lucide-react";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Save, ArrowLeft, Loader2, Image as ImageIcon, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [customCats, setCustomCats] = useState<{id: string, label: string}[]>([]);
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  require("react").useEffect(() => {
    getCustomCategories().then(res => {
      if (res.success && res.data) setCustomCats(res.data);
    });
  }, []);
  
  const handleSaveCategory = async () => {
    if (!newCategory.trim()) return;
    
    if (editingCatId) {
      const res = await updateCustomCategory(editingCatId, newCategory);
      if (res.success) {
        setCustomCats(prev => prev.map(c => c.id === editingCatId ? { ...c, label: newCategory.trim() } : c));
        if (formData.category === customCats.find(c => c.id === editingCatId)?.label) {
          setFormData(prev => ({ ...prev, category: newCategory.trim() }));
        }
        toast.success("Kategori berhasil diubah");
      } else {
        toast.error(res.error || "Gagal mengubah kategori");
      }
    } else {
      const res = await saveCustomCategory(newCategory);
      if (res.success && res.id) {
        setCustomCats(prev => [...prev, { id: res.id!, label: newCategory.trim() }]);
        setFormData(prev => ({ ...prev, category: newCategory.trim() }));
        toast.success("Kategori berhasil ditambahkan");
      } else {
        toast.error(res.error || "Gagal menambah kategori");
      }
    }
    setIsCatDialogOpen(false);
  };
  
  const handleDeleteCat = async (id: string, label: string) => {
    if (!confirm("Hapus kategori ini?")) return;
    const res = await deleteCustomCategory(id);
    if (res.success) {
      setCustomCats(prev => prev.filter(c => c.id !== id));
      if (formData.category === label) {
        setFormData(prev => ({ ...prev, category: "Karier" }));
      }
      toast.success("Kategori dihapus");
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Karier",
    content: "",
    coverImage: "",
    status: "draft" as "draft" | "published",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto generate slug from title if slug is empty or user hasn't typed in slug manually
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
      
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug === "" || prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") === prev.slug ? slug : prev.slug
    }));
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
      
      const result = await createBlog(dataToSave);
      
      if (result.success) {
        toast.success(`Artikel berhasil ${status === 'published' ? 'dipublikasikan' : 'disimpan sebagai draft'}`);
        router.push("/blogs");
        router.refresh();
      } else {
        toast.error(result.error || "Gagal menyimpan artikel");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/blogs" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tulis Artikel Baru</h1>
          <p className="text-sm text-slate-500 mt-1">Bagikan pemikiran dan cerita Anda ke dunia.</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 w-full space-y-6 min-w-0">
          {/* Main Content Area */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 min-h-[calc(100vh-140px)] flex flex-col">
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-800 mb-4 border-b border-slate-100 pb-4">Kanvas Artikel</h2>
              <RichTextEditor 
                value={formData.content}
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                placeholder="Tulis artikel Anda di sini..."
                className="min-h-[400px] flex-1"
              />
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[380px] shrink-0 space-y-6 xl:sticky xl:top-6 xl:h-[calc(100vh-48px)] xl:overflow-y-auto no-scrollbar pb-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Informasi Utama</h3>
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

                <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
                  <DialogTrigger 
                    className={buttonVariants({ variant: "outline", className: "shrink-0 px-3" })}
                    onClick={() => { setEditingCatId(null); setNewCategory(""); }} 
                    title="Custom Kategori"
                  >
                    <Plus className="w-4 h-4" />
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
                      <DialogClose 
                        className={buttonVariants({ variant: "default" })}
                        onClick={handleSaveCategory}
                      >
                        Gunakan Kategori Ini
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            
            </div>
          </div>

          {/* Sidebar Area */}
          

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

            {/* Pengaturan Publikasi dipindah ke bawah */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Pengaturan Publikasi</h3>
              
              <Button 
                onClick={() => handleSave("published")} 
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Publikasikan Sekarang
              </Button>
              
              <Button 
                onClick={() => handleSave("draft")} 
                disabled={isSubmitting}
                variant="outline"
                className="w-full text-slate-600 hover:text-slate-900"
              >
                Simpan sebagai Draft
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
