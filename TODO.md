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

## Kategori: Frontend (Builder & Template - Responsive Update)
- **Status:** Selesai
- **Perubahan:**
  - Mengganti URL gambar *placeholder* di section About menjadi `placeholder-person.png`.
  - Mengganti URL gambar *placeholder* di section Hero menjadi `placeholder-person-4x4.png`.
  - Menghapus seluruh komponen Blog dari template bawaan `goribPortfolio.ts` sesuai permintaan pengguna.
  - Menambahkan dukungan logika `mobileDirection` pada komponen COLUMN di *canvas* dan pratinjau.
  - Memperbarui `PreviewSection.tsx` agar menginjeksi *style flex-direction* khusus pada versi *mobile preview* (misalnya `!flex-col-reverse` saat `mobileDirection` bernilai `col-reverse`).
  - Memperbarui mekanisme *layouting flexbox* di `BuilderSection.tsx` agar menghargai susunan baris (*row*) dari `flexbox` dan secara dinamis menerapkan tata letak adaptif (misalnya `flex-col-reverse md:flex-row`) pada layar berukuran kecil.
- **File Terdampak:**
  - `C:\PortoTree\src\components\builder\useBuilderState.tsx`
  - `C:\PortoTree\src\components\builder\PreviewSection.tsx`
  - `C:\PortoTree\src\components\storefront\sections\BuilderSection.tsx`
  - `C:\PortoTree\src\lib\templates\goribPortfolio.ts`

## Kategori: Frontend (UI Cleanup)
- **Status:** Selesai
- **Perubahan:**
  - Menghapus komponen `CanvasSettingsPanel.tsx` beserta referensinya karena panel "Canvas Settings" tidak lagi digunakan.
  - Menghapus tombol *Settings* pada bagian *header* di `CanvasArea.tsx` yang sebelumnya digunakan untuk memicu panel "Canvas Settings".
  - Menghapus opsi `'settings'` pada *state* `activePanel` di `useBuilderState.tsx`.
- **File Terdampak:**
  - `C:\PortoTree\src\components\builder\CanvasArea.tsx`
  - `C:\PortoTree\src\components\builder\panels\CanvasSettingsPanel.tsx` (dihapus)
  - `C:\PortoTree\src\components\builder\useBuilderState.tsx`

## Kategori: Frontend (Aesthetics & Pattern)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan *utility class* `.bg-grid-pattern` di dalam `globals.css` menggunakan `linear-gradient` untuk membuat motif kotak-kotak tipis.
  - Memperbarui komponen `BuilderSection.tsx` pada rendering root element (`<div id="section-{id}">`) agar menyertakan properti `config.customClass` secara dinamis, sehingga _custom class_ bisa berfungsi di *level section*.
  - Menambahkan _class_ `bg-grid-pattern relative` pada properti `customClass` untuk konfigurasi *hero-section* bawaan di dalam template `goribPortfolio.ts`.
- **File Terdampak:**
  - `C:\PortoTree\src\app\globals.css`
  - `C:\PortoTree\src\components\storefront\sections\BuilderSection.tsx`
  - `C:\PortoTree\src\lib\templates\goribPortfolio.ts`

## Kategori: Frontend (Header Layout)
- **Status:** Selesai
- **Perubahan:**
  - Mengubah konfigurasi `goribPortfolio.ts` pada bagian `HEADER`.
  - Membungkus elemen `NAVIGATION` dan `BUTTON` ke dalam sebuah `COLUMN` (kolom baru).
  - Mengatur properti kolom tersebut menjadi `flex-row` dan `justifyContent: "flex-end"` agar Menu Navigasi dan tombol "Hire Me" mengelompok di sebelah kanan.
  - **BUGFIX 2:** Mengembalikan kolom Navigasi ke `sizing: "fit"` agar ukurannya pas dengan konten, DITAMBAH *customClass* `flex-nowrap` untuk memaksa elemen Navigasi dan Button agar tidak turun baris (anti-*wrap*).
  - **BUGFIX 3:** Trik `marginLeft: auto` diganti dengan yang lebih *bulletproof*: Memberikan `flex: 1` pada elemen LOGO. Dengan ini, Logo akan menguasai seluruh ruang kosong di tengah Header, dan secara otomatis mendesak kolom Navigasi & Tombol ke ujung kanan tanpa perlawanan!
  - **BUGFIX 4:** Sesuai permintaan spesifik, mengubah Header menjadi mode **Full Width** (`contentWidth: "full"`, `maxWidth: "100%"`) agar "Nama anda" menempel di pojok kiri layar, dan Navigasi menempel di pojok kanan layar.
  - **BUGFIX 5:** Menghapus `flex-1` dari elemen `nav` dan menambahkan `whitespace-nowrap` agar teks menu ("About Me", "My Services", dll) tidak lagi turun baris/terlipat menjadi dua baris.
- **File Terdampak:**
  - `C:\PortoTree\src\lib\templates\goribPortfolio.ts`
  - `C:\PortoTree\src\components\storefront\sections\BuilderSection.tsx`
  - `C:\PortoTree\src\components\builder\useBuilderState.tsx` (Cache bust ke `v26`)

## Kategori: Frontend (Live Canvas UX)
- **Status:** Selesai
- **Perubahan:**
  - Menghapus komponen `DataSidebarPanel` secara keseluruhan dari antarmuka `CanvasArea.tsx`.
  - Membuat area canvas menjadi mode layar penuh (full screen) karena tidak ada sidebar yang menyita ruang di sebelah kiri/kanan.
  - Menghapus tag `<style>` inline yang sebelumnya menyembunyikan efek visual dari builder.
  - Menambahkan *utility class* Tailwind untuk `hover:outline` dan `outline-2` (aktif/focus mode) pada komponen `PreviewSection`, `PreviewColumn`, dan `PreviewElement` agar pengguna tahu persis elemen apa yang sedang disorot dan diklik.
  - **UPDATE:** Menghapus *padding* kiri/kanan (`px-4`, `lg:px-6`) pada *wrapper* CanvasArea agar tampilan canvas benar-benar *100% full screen*.
  - **UPDATE:** Mengganti efek visual *outline* menjadi `ring-inset` agar garis fokus/sorot digambar *ke arah dalam* elemen, sehingga tidak terpotong (tertimpa) oleh Header.
- **File Terdampak:**
  - `C:\PortoTree\src\components\builder\CanvasArea.tsx`
  - `C:\PortoTree\src\components\builder\PreviewSection.tsx`

## Kategori: Backend (Autentikasi & Email)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan inisialisasi Firebase Client (`src/lib/firebase/client.ts`) dan Firebase Admin (`src/lib/firebase/server.ts`) untuk integrasi autentikasi.
  - Menambahkan helper Resend (`src/lib/resend.ts`) untuk mengirim email verifikasi kustom.
  - Membuat *Server Actions* (`src/app/actions/auth.ts`) untuk pembuatan sesi (Session Cookies) dan pengiriman email verifikasi.
  - Mengupdate halaman Register (`src/app/register/page.tsx`) agar beroperasi sebagai Client Component, melakukan pendaftaran via Firebase Client, dan men-*trigger* email lewat Server Action.
  - Membuat halaman *Verify Email* (`src/app/verify-email/page.tsx`) dengan fitur pengiriman ulang email.
  - Menambahkan *middleware* proteksi sesi (`src/middleware.ts`) agar *user* yang tidak login diarahkan ulang dari halaman `/dashboard` ke `/login`.
- **File Terdampak:**
  - `C:\PortoTree\src\lib\firebase\client.ts`
  - `C:\PortoTree\src\lib\firebase\server.ts`
  - `C:\PortoTree\src\lib\resend.ts`
  - `C:\PortoTree\src\app\actions\auth.ts`
  - `C:\PortoTree\src\app\register\page.tsx`
  - `C:\PortoTree\src\app\verify-email\page.tsx`
- `C:\PortoTree\src\middleware.ts`

## Kategori: Frontend (SEO & Meta Data)
- **Status:** Selesai
- **Perubahan:**
  - Membuat `layout.tsx` khusus untuk subdomain `resume.portotree.com` di dalam `src/app/resume-subdomain/`.
  - Membuat `layout.tsx` khusus untuk subdomain `portofolio.portotree.com` di dalam `src/app/portofolio-subdomain/`.
  - Menetapkan `metadata` (title & description) yang spesifik dan unik untuk masing-masing subdomain agar tidak lagi menggunakan metadata global dari root layout.
- **File Terdampak:**
  - `C:\PortoTree\src\app\resume-subdomain\layout.tsx` [NEW]
  - `C:\PortoTree\src\app\portofolio-subdomain\layout.tsx` [NEW]
