# TODO Tracker

## Kategori: Frontend (CV Builder)
- **Status:** Selesai
- **Perubahan:**
  - Menampilkan input Professional Title (headline) pada menu form Informasi Pribadi di dalam CV Builder yang sebelumnya disembunyikan.
  - Menghapus 4 kolom input (Tempat Lahir, Tanggal Lahir, Jenis Kelamin, Kewarganegaraan) dari form Informasi Pribadi pada CV Builder beserta dengan validasi error-nya.
  - Menggabungkan kolom Nama Depan dan Nama Belakang menjadi 1 kolom saja bernama Fullname di form Informasi Pribadi pada CV Builder.
  - Menyatukan input Fullname dan Professional Title ke dalam 1 baris (2 kolom sejajar) di form Informasi Pribadi pada CV Builder.
  - Mengganti input Lokasi Singkat (Kota, Negara) menjadi Link URL Portofolio pada form Informasi Pribadi CV Builder.
  - Membungkus informasi kontak (Telepon, Email, dan Link Portofolio) menggunakan tag *anchor* HTML (<a>) pada template ATSModern dan ATSClassic agar tautan aktif dan lebih mudah dibaca oleh mesin ATS maupun ditekan saat disimpan sebagai PDF.
  - Menambahkan validasi wajib isi (required) beserta tanda asterisk merah (*) pada input Tanggal Mulai dan Tanggal Selesai di seluruh *modal* riwayat (Pendidikan, Pengalaman, Organisasi, Magang, dan Kursus).
  - Meralat validasi tanggal pada *modal* riwayat: sekarang yang diwajibkan hanya input Tahun, sedangkan *dropdown* Bulan dikembalikan menjadi opsional (tidak memblokir jika tidak diisi).
  - Menambahkan seluruh seksi riwayat CV (Magang, Proyek, Sertifikasi, Prestasi, Organisasi, Kursus, Bahasa, Ekstrakulikuler, dan Hobi) ke dalam template cetak ATSModern (dibagi ke 2 kolom) dan ATSClassic (disusun berurutan ke bawah) agar tidak ada data yang terlewat saat *export* ke PDF.
  - Mengubah input Link URL Portofolio menjadi opsional dan menghapus dari pengecekan error wajib isi.
  - Memperbarui sistem render Canvas CV (ATSModern dan ATSClassic) agar menyembunyikan icon/link portofolio jika datanya kosong.
  - Melakukan sinkronisasi otomatis (*auto-fill*) Link URL Portofolio dengan URL Portofolio user jika user sebelumnya telah meng-klaim username Portofolio.
  - Memasukkan Professional Title sebagai field wajib pada validasi input di CV Builder.
- **File Terdampak:**
  - C:\PortoTree\src\components\cv-builder\CVDataForm.tsx

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

## Kategori: Frontend (Surat Builder)
- **Status:** Selesai
- **Perubahan:**
  - Mengimplementasikan sistem Paginasi multi-halaman pada Surat Builder agar UX rendering persis seperti CV Builder (dipecah menjadi kanvas A4 bertingkat).
  - Membuat komponen `SuratViewer.tsx` yang menggunakan *hook* `usePagination` (mendaur ulang komponen pengukur tinggi elemen tersembunyi `surat-content-measurer`).
  - Mengubah struktur `page.tsx` dari yang awalnya melakukan *render* kanvas tunggal panjang menjadi membungkusnya dalam `<SuratViewer>` yang meniru `CVViewer`.
  - Menambahkan kelas-kelas *CSS* `cv-section` dan `break-inside-avoid` pada setiap elemen grup data (Pendidikan, Pengalaman Kerja, dst) serta baris tabel (`<tr>`) pada `DaftarRiwayatHidupCanvas`, `LamaranKerjaCanvas`, dan `PengunduranDiriCanvas` agar proses pembagian halaman oleh kalkulator halaman tidak memotong teks dan tabel secara paksa.
  - Memperbaiki jarak kosong bagian atas pada setiap judul template agar memiliki proporsi ideal dan tidak mepet.
- **File Terdampak:**
  - `c:\PortoTree\src\components\surat\SuratViewer.tsx`
  - `c:\PortoTree\src\app\surat-generator\builder\[type]\page.tsx`
  - `c:\PortoTree\src\components\surat\templates\DaftarRiwayatHidupCanvas.tsx`
  - `c:\PortoTree\src\components\surat\templates\LamaranKerjaCanvas.tsx`
  - `c:\PortoTree\src\components\surat\templates\PengunduranDiriCanvas.tsx`


## Kategori: Frontend (Fix Build Error)
- **Status:** Selesai
- **Perubahan:**
  - Memperbaiki TypeErrors terkait implicit any pada parameter callback fungsi .map() di seluruh komponen template CV.
  - Menyelesaikan TypeError languagesList is possibly undefined di CreativeBlue.tsx dan template lainnya.
  - Membungkus halaman /resume-builder/page.tsx dengan <Suspense> boundary karena penggunaan hook useSearchParams() untuk mencegah error prerender-error pada Next.js versi production (Turbopack).
  - Build production berhasil dijalankan tanpa error.
- **File Terdampak:**
  - C:\PortoTree\src\components\cv-builder\templates\*.tsx
  - C:\PortoTree\src\app\resume-builder\page.tsx


## Kategori: Frontend (Fix Template Selection Loop)
- **Status:** Selesai
- **Perubahan:**
  - Memperbaiki bug di /resume-builder/page.tsx dimana mengubah template lewat sidebar akan di-override secara paksa oleh searchParams URL (infinite loop URL parameter priority).
  - Menambahkan *state* hasAppliedTemplate untuk melacak apakah URL query sudah diaplikasikan satu kali di awal render.
- **File Terdampak:**
  - C:\PortoTree\src\app\resume-builder\page.tsx
-   f i x :   p e r b a i k a n   s t y l i n g   l i n k   d i   h a l a m a n   d e t a i l   b l o g   a g a r   w a r n a   t e k s   l i n k   m e n j a d i   h i j a u   d a n   u n d e r l i n e  
 ## Kategori: Frontend (Blog Detail Styling)

## Kategori: Frontend (Blog Detail Styling)
- **Status:** Selesai
- **Perubahan:** 
  - Mengganti styling inline dengan arbitrary variants Tailwind CSS v4 untuk mengatasi masalah typography link di halaman detail blog yang tidak berjalan di browser.
  - Mempertegas aturan styling link di dalam `globals.css` menggunakan kode warna Hex absolut `#059669` dengan spesifisitas `!important` untuk warna, *underline*, dan efek *hover* yang dijamin menimpa semua default bawaan.
- **File Terdampak:**
  - `C:\PortoTree\src\app\blog\[slug]\page.tsx`
  - `C:\PortoTree\src\app\globals.css`

## Kategori: Frontend (Blog Link Visibility)
- **Status:** Selesai
- **Perubahan:**
  - Mengubah styling warna teks link di dalam konten artikel `/blog/{slug}` dari warna hijau (emerald) menjadi biru (`#2563eb` atau `blue-600`) dengan underline biru.
  - Perubahan ini mengatasi keluhan visibilitas visual dimana pengguna merasa tautan sebelumnya menyatu dengan teks biasa dan sulit dikenali sebagai link yang dapat diklik.
  - Pembaruan dilakukan pada deklarasi Tailwind `prose-a` di `page.tsx` dan `!important` rule di `globals.css`.
- **File Terdampak:**
  - `C:\PortoTree\src\app\blog\[slug]\page.tsx`
  - `C:\PortoTree\src\app\globals.css`
  
## Kategori: Frontend (Blog Typography Size)
- **Status:** Selesai
- **Perubahan:**
  - Mengurangi ukuran *font base* artikel blog yang sebelumnya dikeluhkan terlalu besar.
  - Menghapus _utility classes_ Tailwind `@tailwindcss/typography` yaitu `md:prose-lg` dan `lg:prose-xl` dari elemen pembungkus artikel.
  - Sekarang konten akan dirender dengan ukuran *default* (`prose`) yang jauh lebih standar dan nyaman untuk dibaca (sekitar 16px).
- **File Terdampak:**
  - `C:\PortoTree\src\app\blog\[slug]\page.tsx`
