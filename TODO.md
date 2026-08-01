# TODO Tracker

## Kategori: Frontend (Builder & Template)
- **Status:** Selesai
- **Perubahan:** 
  - Melakukan *upgrade* struktur `EMPTY_TEMPLATE` di dalam `src/components/builder/useBuilderState.tsx`.
  - Mengubah konfigurasi `layout` untuk *column* yang berisi teks (seperti `hero-col-1` dan `about-col-2`) dari `horizontal` menjadi `flexbox`. Perubahan ini membuat teks ditumpuk secara vertikal (*flex-col*) dan tidak memanjang ke samping (jejer-jejer).
  - Menambahkan konfigurasi `fontSizeMobile` pada seluruh elemen tipografi (judul, sub-judul, deskripsi) pada template dasar, sehingga teks dapat menyesuaikan ukurannya dan tidak berantakan pada *mobile preview*.
  - Melakukan *version bump* *draft key* `localStorage` dari `v14` ke `v15` untuk memastikan browser secara otomatis mereset *canvas* lama menjadi layout terbaru (v15) tanpa user perlu mereset manual.
  - Memperbaiki layout `global-header` agar lebih presisi: mengatur `align: "center"` pada kedua kolom (`header-col-1` dan `header-col-2`) sehingga teks "Gorib." dan link navigasi sejajar secara vertikal (presisi).
  - Mengurangi `paddingTop` dan `paddingBottom` dari `global-header` menjadi `16` agar lebih menempel dengan *canvas*.
  - Melakukan *version bump* *draft key* ke `v16`.
- **File Terdampak:** 
  - `C:\PortoTree\src\components\builder\useBuilderState.tsx`
