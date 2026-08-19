// Utility functions & constants for blog categories
// File ini BUKAN server action — aman dipakai di client maupun server component

export const MASTER_CATEGORIES: { slug: string; label: string; description: string }[] = [
  { slug: "karier",      label: "Karier",            description: "Tips sukses di dunia kerja" },
  { slug: "tips-trik",   label: "Tips & Trik",        description: "Berbagai panduan praktis" },
  { slug: "edukasi",     label: "Edukasi",            description: "Tambah wawasan & ilmu baru" },
  { slug: "info-berita", label: "Info & Berita",      description: "Update dunia profesional" },
  { slug: "dokumen",     label: "Dokumen (CV/Surat)", description: "Panduan bikin berkas penting" },
  { slug: "portofolio",  label: "Portofolio",         description: "Inspirasi karya dan desain" },
];

/** Konversi label DB → URL slug */
export function labelToSlug(label: string): string {
  if (!label) return "";
  const found = MASTER_CATEGORIES.find(
    (c) => c.label.toLowerCase() === label.toLowerCase()
  );
  if (found) return found.slug;
  // Fallback: normalize to slug
  return label
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/[()\/\\]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Konversi URL slug → entry kategori (atau null jika tidak ditemukan) */
export function slugToCategory(slug: string) {
  const found = MASTER_CATEGORIES.find((c) => c.slug === slug);
  if (found) return found;

  // Fallback for custom dynamic categories
  const titleLabel = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    slug,
    label: titleLabel,
    description: "Kumpulan artikel pilihan seputar " + titleLabel
  };
}
