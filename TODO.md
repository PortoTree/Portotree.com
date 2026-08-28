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
-   f i x :   p e r b a i k a n   s t y l i n g   l i n k   d i   h a l a m a n   d e t a i l   b l o g   a g a r   w a r n a   t e k s   l i n k   m e n j a d i   h i j a u   d a n   u n d e r l i n e 
 
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

## Kategori: Frontend (RichTextEditor Shortcuts)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan dukungan keyboard shortcuts (jalan pintas) pada komponen `RichTextEditor` agar pengguna bisa memformat teks secara cepat.
  - Menambahkan penanganan khusus via `onKeyDown` untuk mencegat *shortcut*:
    - **Ctrl+B** / **Cmd+B**: Untuk *Bold* (Tebal)
    - **Ctrl+I** / **Cmd+I**: Untuk *Italic* (Miring)
    - **Ctrl+K** / **Cmd+K**: Untuk membuka popup penambahan *Link* (Tautan)
  - Memperbarui teks *title/tooltip* tombol di *toolbar* agar ikut menampilkan info *shortcut* (misal: "Bold (Ctrl+B)").
  - **[UPDATE]** Menambahkan dukungan tombol **Enter** (`onKeyDown`) pada input *Teks Link* maupun *URL* di dalam form *modal Link*, sehingga form tautan kini dapat di-*submit* tanpa perlu mengklik tombol hijau "Tambah Link" secara manual.
  - **[BUGFIX]** Menambahkan `e.preventDefault()` saat tombol Enter ditekan pada modal link. Hal ini memperbaiki masalah di mana event "Enter" yang diteruskan ke browser menyebabkan teks seleksi (yang sedang difokuskan di background) tergantikan oleh spasi baris baru, yang menyebabkan seolah-olah teks menghilang saat link ditambahkan.
- **File Terdampak:**
  - `C:\PortoTree\src\components\ui\RichTextEditor.tsx`

## Kategori: Frontend (Subscriber Modal & Layout)
- **Status:** Selesai
- **Perubahan:**
  - Memisahkan komponen UI "Daftar Subscriber" dari halaman utama Admin Blogs menjadi bentuk *Modal* mandiri untuk menghemat ruang *layout*.
  - Menghapus kolom pembagian layout `grid-cols-5` (60/40) di bagian bawah. Sekarang tabel Artikel menguasai layar secara utuh (*full width*).
  - Menambahkan tombol kecil "Lihat Daftar" di dalam kartu ringkasan "Total Subscriber" yang jika ditekan akan memicu modal (popup) daftar *subscribers* tersebut.
  - **[UPDATE DESIGN]** Menghapus efek `backdrop-blur` pada latar belakang modal karena dirasa mengganggu. Menambahkan properti `min-w` dan `min-h` agar ukuran jendela modal tidak kekecilan.
  - **[UPDATE DESIGN]** Merombak tampilan daftar *subscriber* dari yang sebelumnya hanya tumpukan garis ke bawah (list baris), menjadi wujud lencana/label bergaya kapsul berjejer (*flex-wrap*), lengkap beserta tanggal *subscribe*-nya di sebelahnya.
- **File Terdampak:**
  - `C:\PortoTree\src\components\admin\SubscriberListModal.tsx` [NEW/MODIFIED]
  - `C:\PortoTree\src\app\own-subdomain\(protected)\blogs\page.tsx`

## Kategori: Frontend (Firestore Data Serialization Bugfix)
- **Status:** Selesai
- **Perubahan:**
  - Memperbaiki *Runtime Error: Only plain objects can be passed to Client Components...* yang terjadi karena properti `createdAt` dan `subscribedAt` masih berbentuk objek `Firestore Timestamp` bawaan Firebase.
  - Next.js (RSC) tidak mengizinkan pemindahan objek non-standar (_non-plain objects_) seperti *class/methods* melintasi batas Server Component ke Client Component.
  - Memperbaiki `page.tsx` dengan memodifikasi pemetaan data (map) dari Firestore. Memanggil `toDate().toISOString()` untuk men-serialisasi objek Timestamp menjadi string format ISO statis sebelum mengumpankannya (sebagai `props`) ke dalam komponen client `<SubscriberListModal>`.
- **File Terdampak:**
  - `C:\PortoTree\src\app\own-subdomain\(protected)\blogs\page.tsx`

## Kategori: Frontend (Blog Table Category)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan kolom informasi **Kategori** pada tabel daftar artikel blog di dashboard admin.
  - Menyesuaikan pembagian lebar kolom (lebar persentase CSS Tailwind) agar tidak berdesakan, dan menyembunyikannya secara responsif di layar yang sangat kecil (`sm` ke bawah) agar tabel tetap rapi.
  - Memasukkan fallback *'Uncategorized'* jika artikel tersebut tidak memiliki data kategori.
- **File Terdampak:**
  - `C:\PortoTree\src\app\own-subdomain\(protected)\blogs\page.tsx`

## Kategori: Frontend (RichTextEditor Heading Feature)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan menu *dropdown* pilihan ukuran teks (Heading 1 sampai Heading 6, dan teks Normal) pada *toolbar* komponen `RichTextEditor.tsx`.
  - Mengonfigurasi `execCommand('formatBlock')` untuk memformat blok teks sesuai pilihan dari menu dropdown.
  - Memasukkan aturan spesifik Tailwind (mulai dari `[&_h1]` sampai dengan `[&_h6]`) secara dinamis ke dalam properti kelas di dalam area ketikan (editor div) agar ukuran huruf dari format Heading yang dipilih merender ukurannya secara visual (*WYSIWYG*) sewaktu mengetik konten.
  - **[UPDATE SHORTCUT]** Menambahkan dukungan kombinasi tombol keyboard (jalan pintas) untuk memformat paragraf. Menggunakan `Ctrl+Alt+1` hingga `Ctrl+Alt+6` untuk Heading 1-6, dan `Ctrl+Alt+0` untuk mengembalikan ke paragraf normal (teks biasa).
- **File Terdampak:**
  - `C:\PortoTree\src\components\ui\RichTextEditor.tsx`

## Kategori: Frontend (AdSense Privacy Compliance)
- **Status:** Selesai
- **Perubahan:**
  - Memperbarui halaman Kebijakan Privasi statis dengan menyisipkan seksi baru: "Iklan Pihak Ketiga & Cookie".
  - Menambahkan deklarasi *compliance* wajib dari Google AdSense terkait penggunaan *cookies* pelacakan (iklan hasil personalisasi) dan mencantumkan tautan penyisihan (*opt-out*) ke Setelan Iklan Google. Hal ini diwajibkan untuk lolos *review* monetisasi.
- **File Terdampak:**
  - `C:\PortoTree\src\app\privacy-policy\page.tsx`

## Kategori: Frontend (Contact Page Creation)
- **Status:** Selesai
- **Perubahan:**
  - Membuat halaman `/contact` statis baru menggunakan komponen `Navbar` dan `Footer` bawaan.
  - Halaman ini dilengkapi dengan Formulir Kontak (Nama, Email, Topik, Pesan) dengan desain modern berbasis Tailwind CSS, serta informasi alamat email dukungan (`csportotree@gmail.com` & `teamportotree@gmail.com`). Bagian "Lokasi" telah dihapus sesuai arahan.
  - **[UPDATE KOMUNITAS]** Menambahkan dua blok kontak khusus WhatsApp yang menampilkan "Saluran WhatsApp" dan "Grup Komunitas" lengkap dengan tombol link *invite* resmi yang dibalut dengan warna hijau khas WhatsApp (`#25D366`). *Copywriting* deskripsi pada Saluran WhatsApp telah diperbarui menjadi lebih rinci.
  - **[UPDATE UI & BUGFIX]** Menjadikan panel Contact Form melayang (*sticky*) saat pengguna men-scroll halaman ke bawah di layar berukuran besar (*desktop*). Mengatasi masalah CSS di mana *sticky* tidak bekerja akibat `overflow-x-hidden` di *wrapper* utama (diganti menjadi `overflow-x-clip`) dan menambahkan `lg:items-start` pada *grid container* agar elemen bisa "meluncur" di jalurnya.
  - **[UPDATE TIPOGRAFI MOBILE]** Mengoptimalkan ukuran *font* (`text-sm`, `text-base`), *margin*, dan *padding* di seluruh elemen (Hero, Title, Subtitle, Info Card, dan Form Container) khusus untuk *viewport* berukuran kecil (*mobile*) agar terlihat proporsional dan tidak kebesaran.
  - Halaman ini bertujuan melengkapi syarat E-E-A-T dari Google AdSense yang mewajibkan penyedia situs web untuk mencantumkan profil pengelolaan web yang bisa dihubungi manusia sungguhan.
- **File Terdampak:**
  - `C:\PortoTree\src\app\contact\page.tsx`
  - `C:\PortoTree\src\components\contact\ContactForm.tsx` [NEW]
  - `C:\PortoTree\src\app\actions\contact.ts` [NEW]

## Kategori: Backend (Resend Contact Form Integration)
- **Status:** Selesai
- **Perubahan:**
  - Mengonfigurasi `resend.emails.send` untuk menyalurkan seluruh masukan pengguna langsung ke alamat `csportotree@gmail.com` lengkap beserta detail *replyTo*, *subject* yang dinamis, dan *HTML body* yang di-format secara profesional.
  - Memisahkan elemen *form* statis menjadi *Client Component* mandiri (`ContactForm.tsx`) guna mengontrol *state loading*, menampilkan status "Pesan Terkirim!" (UI *Success*), dan peringatan *error*.
  - **[UPDATE FOOTER & HEADER]** Menyematkan tautan (link) permanen menuju halaman `/contact` pada menu navigasi Footer (di bawah "Perusahaan"). Pada Header Navigation versi *desktop*, tautan Kebijakan Privasi dan Ketentuan Layanan dihapus agar lebih bersih (menyisakan Produk, Blog, Tentang Kami, dan Kontak), namun tautan hukum tersebut tetap dipertahankan di *mobile menu*.
  - **[BUGFIX MOBILE MENU]** Menambahkan tautan "Buat Surat" (Surat Generator) yang sebelumnya tertinggal/hilang di dalam *dropdown* Produk versi *mobile*.
  - **[BUGFIX MOBILE MENU]** Menambahkan tautan "Buat Surat" (Surat Generator) yang sebelumnya tertinggal/hilang di dalam *dropdown* Produk versi *mobile*.
- **File Terdampak:** 
  - `C:\PortoTree\src\components\layout\Footer.tsx`
  - `C:\PortoTree\src\components\layout\Navbar.tsx` [MODIFIED]

## Kategori: Frontend (AdSense Compliance - Disclaimer)
- **Status:** Selesai
- **Perubahan:**
  - Membuat statis *page* baru `/disclaimer` dengan desain UI modern yang koheren dengan halaman *Privacy Policy*.
  - Menulis 6 pasal sanggahan hukum (Persetujuan, Fitur Generator Dokumen, Jaminan Karir, Tautan Eksternal, Iklan AdSense, dan Pembaruan) secara detail untuk melindungi PortoTree dari tuntutan hukum *user*.
  - Menyematkan tautan *Disclaimer* tersebut ke dalam Footer di bawah kategori **Legal** menggunakan utilitas `getMainUrl()` agar tautan tetap kokoh menuju domain induk saat sedang berada di *subdomain*.
  - **[BUGFIX TEXT]** Memperbaiki kesalahan *rendering* format teks Markdown (seperti `*cookies*` dan `*hyperlink*`) di dalam *React JSX* dengan menggantinya menjadi *tag* HTML `<i>` (italic) agar tampil rapi.
  - **[NEW FEATURE: COOKIE BANNER]** Membuat komponen *Client* `CookieBanner.tsx` beranimasi halus (menggunakan *Framer Motion*) yang berfungsi meminta izin privasi penggunaan *cookies* kepada pengunjung. Komponen ini diinjeksi ke dalam global `layout.tsx` sehingga aktif di seluruh rute dan *subdomain*. Jika pengguna menekan tombol "Saya Mengerti", preferensinya akan direkam ke *Local Storage* agar *banner* tidak terus muncul.
  - **[DESIGN TWEAK & BUGFIX]** Mengubah tata letak (*layout*) *Cookie Banner* di versi *desktop* menjadi *full horizontal bar* yang benar-benar menempel ke batas bawah layar (*flush*), tanpa batas sisi (*edge-to-edge background*), namun menahan teks kontennya tetap terpusat seragam (*max-w-7xl*). Ukuran font juga diperbesar (*md:text-base*). Susunan letak tombol diturunkan posisinya dan disejajarkan ke tengah (*justify-center*) dengan urutan tombol ditukar (kiri: Kebijakan Privasi, kanan: Saya Mengerti). Tautan "Kebijakan Privasi" diubah visualnya menjadi tombol *outline* (bergaris) agar seimbang.
  - **[MOBILE UI BUGFIX]** Memperbaiki isu tombol terdorong (terpotong) pada layar *mobile*. Kelas `flex-wrap` dan `whitespace-nowrap` yang kaku dihapus, diganti dengan fondasi `flex-row flex-1` absolut diiringi pengecilan gap (`gap-2`) dan ruang spasi (`px-2`). Teks diizinkan untuk membungkus (*wrap / leading-tight*) secara alami ke bawah bila sangat sempit. Ini memaksa tombol untuk selalu bertahan di formasi 2 kolom sejajar (kiri-kanan) di ukuran layar sedini apapun tanpa meluber ke luar batas.
  - **[CROSS-SUBDOMAIN BUGFIX & FALLBACK]** Menyempurnakan sistem *Cookie Banner*. Sebelumnya, saat dijalankan di `localhost`, peramban (*browser*) sering menolak *set-cookie* jika menggunakan parameter `domain=localhost` secara eksplisit, menyebabkan popup terus muncul. Sekarang, sistem mendeteksi IP lokal/localhost dan menghapus parameter domain sepenuhnya di masa *development*, serta menggabungkannya dengan pertahanan lapis kedua (*fallback*) menggunakan `localStorage` untuk skenario ekstrem saat fitur *cookies* diblokir keras oleh klien.
  - **[NEW FEATURE: CUSTOM BLOG CATEGORY UI]** Merevisi antarmuka pemilihan Kategori di halaman Dasbor Admin (Buat Artikel & Edit Artikel) sesuai preferensi Anda. Komponen `<Select>` standar tetap dipertahankan, namun kini didampingi oleh tombol *Plus* (`+`) yang akan memanggil *Popup/Modal* (`<Dialog>`). Di dalam *popup* ini, Anda bisa mengetikkan nama kategori baru secara bebas. Kategori kustom yang Anda buat akan langsung menjadi opsi aktif yang terpilih pada *dropdown*.
  - **[CORE UPDATE: DYNAMIC SLUG SYNC]** Menulis ulang fungsi `getPublishedCategories` dan `slugToCategory` agar tidak lagi terbelenggu dengan daftar kategori *master* bawaan sistem (*hardcoded*). Kini, setiap Kategori kustom yang diketik *user* akan otomatis disinkronkan, dirubah menjadi format URL yang valid (*slug*), dan dirender sebagai *Dynamic Tab* (pil) di halaman *public* `/blog` lengkap dengan properti deksripsinya secara *real-time*.
  - **[BUGFIX: HYDRATION ERROR]** Memperbaiki *Hydration Error* (`<button> cannot be a descendant of <button>`) yang muncul pada fitur Kategori Kustom. *Error* ini dipicu oleh perubahan arsitektur komponen *Base UI* terbaru pada *Shadcn v4* yang secara *native* sudah merender `DialogTrigger` dan `DialogClose` sebagai elemen `<button>`, sehingga penambahan properti `asChild` yang membungkus komponen `<Button>` akan menghasilkan elemen ganda yang ilegal di HTML. Solusinya, `asChild` dihapus dan gaya tombol langsung disuntikkan (*inject*) ke komponen pemicu menggunakan utilitas `buttonVariants`.
  - **[NEW FEATURE: SMART PASTE AI]** Meng-upgrade metode *Paste* (Ctrl+V) di dalam `RichTextEditor.tsx`. Ketika *user* melakukan *copas* dari *output* AI (ChatGPT, Claude, dll) yang umumnya berupa *Markdown* mentah, editor kini akan mencegat proses tersebut dan menerjemahkannya secara *real-time* ke format visual HTML sungguhan. Karakter seperti `**bold**`, `- list`, `# heading`, hingga struktur `| tabel |` kini langsung ter- *render* rapi seketika tanpa meninggalkan jejak simbol-simbol kotor.
  - **[BUGFIX: EXCESSIVE PARAGRAPH SPACING]** Memperbaiki isu spasi ganda (jarak yang terlalu jauh antar paragraf) di halaman baca artikel (`/blog/[slug]`). Akar masalahnya adalah *parser Smart Paste* yang keliru menyisipkan elemen `<br>` pada setiap baris kosong dari *Markdown* AI, yang mana berbenturan dengan batas margin bawaan elemen `<p>` sehingga menghasilkan spasi ganda yang berlebihan. Kini *parser* akan otomatis membuang baris kosong yang berlebihan dan membiarkan elemen HTML merapikan jaraknya secara proporsional.
  - **[UI/UX UPGRADE: TRUE WYSIWYG EDITOR]** Memperbaiki *bug* di mana teks dengan *style Heading* (H1/H2/H3) di dalam halaman Dasbor Admin Editor terlihat berukuran kecil (seukuran teks normal). Hal ini disebabkan karena kelas kustom bawaan editor gagal dirender oleh mesin *Tailwind v4*. Solusinya, seluruh gaya (*styling*) pada `RichTextEditor.tsx` kini disamakan 100% menggunakan arsitektur `prose` (Tailwind Typography) persis seperti yang dipakai di halaman *public*. Kini, apa yang Anda lihat di dalam editor (tebal, *heading* rapi, list) akan sama persis ukurannya dengan apa yang tayang di halaman publik (*True WYSIWYG*).
  - **[UI/UX UPGRADE: ADMIN WORKSPACE]** Melebarkan ruang kerja (kanvas editor) secara signifikan di halaman Dasbor Admin (Buat & Edit Artikel) dengan mengubah batas kontainer dari `max-w-4xl` menjadi *Full Width* (`max-w-[1600px]`). Sidebar dikanan dikembalikan (*rollback*) agar *scroll* secara natural (tidak *sticky/fixed*) sesuai dengan preferensi yang lebih leluasa.
  - **[DESIGN TWEAK]** Mengubah tata letak konten utama (*hero section*) di halaman `surat.domain.com` menjadi rata kiri (`items-start`, `text-left`) sesuai preferensi visual baru.
  - **[COPYWRITING UPDATE]** Mengubah teks *badge* (label hijau) di bagian *Landing Page* utama, dari yang sebelumnya bertuliskan "Untuk Personal" menjadi "Portofolio personal" agar *wording*-nya lebih spesifik dan elegan.
  - **[REFACTOR & DESIGN UPDATE]** Membuat komponen *reusable* baru `ActionCTA.tsx` yang berisi blok "Apa yang Anda butuhkan saat ini?". Warna identitas tombol ditukar sesuai permintaan (Buat CV menjadi Oranye/Amber, Buat Surat menjadi Biru). Komponen ini kemudian disuntikkan secara seragam ke halaman utama, halaman `portofolio`, halaman `resume`, dan halaman `surat`.
  - **[INTEGRASI]** Menyuntikkan kode verifikasi Google AdSense (`client=ca-pub-9324122345100415`) secara aman menggunakan komponen `next/script` (`strategy="afterInteractive"`) di dalam `<head>` file `layout.tsx`. Hal ini memastikan *script* iklan tidak menghalangi rendering awal situs (*non-blocking*).
- **File Terdampak:**
  - `C:\PortoTree\src\components\layout\ActionCTA.tsx` [NEW]
  - `C:\PortoTree\src\app\page.tsx` [MODIFIED]
  - `C:\PortoTree\src\app\portofolio-subdomain\page.tsx` [MODIFIED]
  - `C:\PortoTree\src\app\resume-subdomain\page.tsx` [MODIFIED]
  - `C:\PortoTree\src\app\surat-subdomain\page.tsx` [MODIFIED]
  - `C:\PortoTree\src\app\disclaimer\page.tsx` [NEW]
  - `C:\PortoTree\src\components\layout\Footer.tsx` [MODIFIED]
  - `C:\PortoTree\src\components\layout\CookieBanner.tsx` [MODIFIED]
  - `C:\PortoTree\src\app\layout.tsx` [MODIFIED]

## Kategori: Frontend (Contact Form Bugfix)
- **Status:** Selesai
- **Perubahan:**
  - Memperbaiki *Runtime Error: Event handlers cannot be passed to Client Component props* yang terjadi karena penempatan fungsi `onSubmit={(e) => ...}` di dalam file *Server Component* (`page.tsx`).
  - Menghapus fungsi *event handler* bawaan pada formulir statis. Karena halaman ini mengekspor obyek `metadata` (SEO), halaman tidak boleh diubah menjadi `"use client"`. Formulir dibiarkan statis untuk saat ini.
- **File Terdampak:**
  - `C:\PortoTree\src\app\contact\page.tsx`
    -   * * [ U I :   F O R M   B U I L D E R ] * *   M e n e r j e m a h k a n   l a b e l   i n p u t   d a r i   B a h a s a   I n g g r i s   k e   B a h a s a   I n d o n e s i a   p a d a   f o r m   p e m b u a t a n   C V   &   P o r t f o l i o :   F u l l n a m e   m e n j a d i   N a m a   L e n g k a p ,   P r o f e s s i o n a l   T i t l e   m e n j a d i   P r o f e s i   /   P o s i s i ,   d a n   p l a c e h o l d e r   T e l l   u s   a b o u t   y o u r s e l f   m e n j a d i   C e r i t a k a n   t e n t a n g   d i r i   A n d a . . .  
     -   * * [ U I :   R E S U M E   B U I L D E R ] * *   M e n g u b a h   t e k s   j u d u l   n a v i g a s i   s i d e b a r   d a r i   ' P E N G A T U R A N   D E S A I N '   m e n j a d i   ' G A L L E R Y   T E M P L A T E   C V ' .  
     -   * * [ U I :   R E S U M E   B U I L D E R ] * *   M e n g h a p u s   b a d g e   l a b e l   ' F r e e '   d a n   ' P r e m i u m '   s e r t a   g a r i s   p e m i s a h   ' P r o   T e m p l a t e s '   d i   p a n e l   s i d e b a r   G a l e r i   T e m p l a t e .   S e l u r u h   l i s t   t e m p l a t e   s e k a r a n g   d i s a t u k a n   k e   d a l a m   s a t u   d e r e t a n   k i s i   ( * g r i d * )   d i   b a w a h   l a b e l   ' P i l i h   T e m p l a t e '   a g a r   t e r l i h a t   l e b i h   s e r a g a m .  
     -   * * [ U I :   R E S U M E   B U I L D E R ] * *   M e r o m b a k   d e s a i n   m o d a l   * T e m p l a t e   U p s e l l *   ( T e m p l a t e   T e r k u n c i )   s a a t   m e m i l i h   t e m p l a t e   p r e m i u m ,   k i n i   l a n g s u n g   m e m u a t   * l a y o u t *   p a k e t   l a n g g a n a n   s e c a r a   p e n u h   d i   d a l a m   m o d a l   d e n g a n   l o g i k a   p e m b e l i a n   y a n g   i d e n t i k   s e p e r t i   d i   h a l a m a n   \ / l a n g g a n a n \ .  
     -   * * [ U I :   R E S U M E   B U I L D E R ] * *   M e m p e r b a i k i   i n t e r a k s i   m o d a l   * T e m p l a t e   T e r k u n c i *   u n t u k   p e n g g u n a   g r a t i s   m e n j a d i   2   t a h a p :   T a h a p   p e r t a m a   m e n a m p i l k a n   p e r i n g a t a n   k e c i l   t a n p a   e f e k   * b l u r *   ( * b g - b l a c k / 2 0 * ) ,   d a n   a p a b i l a   d i - k l i k   * U p g r a d e   k e   P r e m i u m * ,   b a r u l a h   i s i   m o d a l   m e m b e s a r   u n t u k   m e n a m p i l k a n   d a f t a r   p a k e t   l a n g g a n a n   s e c a r a   m e n d e t a i l .  
     -   * * [ U I :   R E S U M E   B U I L D E R ] * *   M e m p e r b a i k i   t o m b o l   _ c l o s e _   ( X )   p a d a   m o d a l   * T e m p l a t e   U p s e l l *   ( t a h a p   * p r i c i n g   p l a n s * )   m e n j a d i   * f i x e d *   d i   a t a s   d a n   m e n y e s u a i k a n   t i p o g r a f i   s e c a r a   k o m p r e h e n s i f   p a d a   l a y a r   * m o b i l e *   ( u k u r a n   t e k s ,   j a r a k ,   d a n   * p a d d i n g *   d i p e r k e c i l   s u p a y a   p r o p o r s i o n a l   d a n   t i d a k   m e n u m p u k ) .  
     -   * * [ S E C U R I T Y   &   O P T I M I Z A T I O N ] * *   M e m v a l i d a s i   k e a m a n a n   * S e r v e r   A c t i o n s *   ( \ g e t P u b l i s h e d B l o g s \ )   y a n g   d i p a n g g i l   d i   * C l i e n t   C o m p o n e n t *   d a s b o r ,   d i p a s t i k a n   a m a n .   M e n g o p t i m a l k a n   e l e m e n   g a m b a r   p r o f i l   d i   \ U s e r P r o f i l e D r o p d o w n . t s x \   m e n g g u n a k a n   k o m p o n e n   \ 
 e x t / i m a g e \   b a w a a n   N e x t . j s   u n t u k   m e n d o n g k r a k   s k o r   S E O / L C P ,   s e r t a   m e n j a l a n k a n   v a l i d a s i   l i n t i n g   l o k a l   t a n p a   e r r o r   k r i t i s .  
     -   * * [ U I :   P O R T F O L I O   B U I L D E R ] * *   M e n g u b a h   u r u t a n   s e k s i   d i   * s i d e b a r *   p a n e l   d a t a   p o r t o f o l i o .   S e k a r a n g   b a g i a n   * * I n f o r m a s i   P r i b a d i * *   d a n   * * M e d i a   S o s i a l * *   d i l e t a k k a n   d i   u r u t a n   p a l i n g   a t a s   a g a r   l e b i h   m u d a h   d i a k s e s .  
     -   * * [ U I :   P O R T F O L I O   B U I L D E R ] * *   M e n a m b a h k a n   f i t u r   D r a g   a n d   D r o p   d i   m e n u   s i d e b a r   m e n g g u n a k a n   \ @ d n d - k i t / c o r e \ .   U s e r   s e k a r a n g   d a p a t   m e n a h a n   * i c o n   s w i p e *   ( G r i p V e r t i c a l )   p a d a   A c c o r d i o n   u n t u k   m e n u k a r   u r u t a n   s e k s i   p o r t o f o l i o .   U r u t a n   t e r s e b u t   o t o m a t i s   t e r s i n k r o n i s a s i   d a n   d i r e n d e r   s e c a r a   d i n a m i s   d i   C a n v a s   P o r t o f o l i o .  
         -   * * [ U I :   P O R T F O L I O   B U I L D E R ] * *   M e n a m b a h k a n   f i t u r   O n b o a r d i n g   T o u r   i n t e r a k t i f   m e n g g u n a k a n   \  e a c t - j o y r i d e \ .   T o u r   i n i   m e m i l i k i   7   l a n g k a h   i n s t r u k s i   ( k l i k   T a m b a h   B a g i a n ,   k l i k   i c o n   t a m b a h / h a p u s   d i   m o d a l ,   i s i   d a t a   c o n t o h ,   d r a g   l a y o u t ,   k l i k   S i m p a n ,   i s i   l i n k   p u b l i k   d i   U s e r n a m e P i c k e r ,   d a n   k l i k   S e l e s a i )   l e n g k a p   d e n g a n   h i g h l i g h t   k e   a r a h   e l e m e n   ( U I   t a r g e t i n g )   d a n   k o n t r o l   m o d a l   y a n g   s i n k r o n   o t o m a t i s   s a a t   b e r p i n d a h   * s t e p * .  
 -   [ x ]   F i x   T o u r   D O M   I D s   I n j e c t i o n   ( B a c k e n d   /   F r o n t e n d   l o g i c   f i x )   -   s o l v e d   m i s s i n g   I D   i n   C a n v a s A r e a   a n d   f o r m   c o m p o n e n t s  
 -   [ x ]   R e v e r t   O n b o a r d i n g   T o u r   ( r e a c t - j o y r i d e )   -   C l e a n e d   u p   t o   s w i t c h   t o   s t a t i c   o v e r l a y   i m a g e s   l o g i c   i n s t e a d  
\ n \ n # #   K a t e g o r i :   B a c k e n d   ( A d s . t x t ) \ n -   * * S t a t u s : * *   S e l e s a i \ n -   * * P e r u b a h a n : * * \ n     -   M e m p e r b a r u i   m a t c h e r   d i   m i d d l e w a r e . t s   a g a r   m e n g e c u a l i k a n   e k s t e n s i   f i l e   . t x t   d a n   . x m l   s e h i n g g a   a d s . t x t   d a n   r o b o t s . t x t   b i s a   d i a k s e s   l a n g s u n g   t a n p a   t e r k e n a   i n t e r c e p t   m i d d l e w a r e . \ n -   * * F i l e   T e r d a m p a k : * * \ n     -   c : / P o r t o T r e e / s r c / m i d d l e w a r e . t s   [ M O D I F I E D ] \ n -   [ x ]   I m p l e m e n t   S t a t i c   I m a g e   C a r o u s e l   M o d a l   f o r   O n b o a r d i n g   T o u r   ( P o r t f o l i o   B u i l d e r )  
 -   [ x ]   U p d a t e   P o r t f o l i o   D e f a u l t   A c t i v e   S e c t i o n s   &   T o u r   F l o w   ( B a c k e n d / F r o n t e n d   l o g i c   f i x )  
 

## Kategori: Frontend (Blog Editor Blockquote & Paste Bugfix)
- **Status:** Selesai
- **Perubahan:**
  - Memperbaiki parser Markdown untuk Blockquote di RichTextEditor pada saat paste text. Menangani baris kosong di tengah blockquote dan mereset isi editor secara bersih jika melakukan Ctrl+A + Paste untuk menghindari *wrapper* blockquote tertinggal.
- **File Terdampak:**
  - src/components/ui/RichTextEditor.tsx

## Kategori: Backend (Dynamic Blog Categories)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan koleksi blogCategories di Firestore untuk menyimpan custom category secara permanen.
  - Membuat fungsi CRUD saveCustomCategory, updateCustomCategory, deleteCustomCategory di server actions.
  - Mengintegrasikan UI Edit dan Hapus kategori langsung ke dalam komponen SelectContent di halaman Create & Edit Blog.
- **File Terdampak:**
  - src/app/actions/blog.ts
  - src/app/own-subdomain/(protected)/blogs/create/page.tsx
  - src/app/own-subdomain/(protected)/blogs/[id]/edit/page.tsx


## Kategori: Backend (Blog Limit Bugfix)
- **Status:** Selesai
- **Perubahan:**
  - Menghapus pembatasan limit(10) pada fungsi getPublishedBlogs() di server action untuk memperbaiki bug dimana in-memory pagination di halaman publik hanya bisa memproses 10 blog saja meskipun di dashboard terdapat lebih dari 10 blog yang sudah ter-publish.
- **File Terdampak:**
  - src/app/actions/blog.ts


## Kategori: Frontend (Navbar Redesign)
- **Status:** Selesai
- **Perubahan:**
  - Mengubah desain Navbar utama dari model floating pill (rounded-full) menjadi model Chunky Rounded Box (rounded-2xl dengan shadow tebal, border-2 slate-200/60, dan background putih transparant/backdrop-blur).
  - Menambahkan px-6 untuk margin pada mobile agar lebih proporsional.
- **File Terdampak:**
  - src/components/layout/Navbar.tsx


## Kategori: Backend (Dynamic Cookie Domain)
- **Status:** Selesai
- **Perubahan:**
  - Menghapus hardcode `.portotree.com` pada konfigurasi cookie session di fungsi `createSession` dan `removeSession` (`src/app/actions/auth.ts`).
  - Menerapkan logika dinamis menggunakan `headers().get("host")` untuk mendeteksi base/root domain saat ini.
  - Menambahkan pengecualian untuk menghindari setting cookie di suffix `.vercel.app` karena ditolak oleh browser.
  - Ini memperbaiki masalah gagal login di custom domain (`own.domain.com`) saat mode production aktif.
- **File Terdampak:**
  - `src/app/actions/auth.ts`


## Kategori: Frontend (Job/Networking Community UI)
- **Status:** Dalam Pengerjaan (Mockup UI Selesai)
- **Perubahan:**
  - Menambahkan routing job.domain.com (serta job.localhost) di src/middleware.ts untuk mengarah ke /job-subdomain.
  - Membuat kerangka UI halaman Job Feed/Komunitas di src/app/job-subdomain/layout.tsx (Sidebar navigasi & grup berbasis lokasi).
  - Membuat *placeholder* komponen Create Post dan kartu postingan simulasi untuk Rekruter (Tombol Lamar & Profil Perusahaan) dan Worker (Tombol Hire & CV) di src/app/job-subdomain/page.tsx.
- **File Terdampak:**
  - src/middleware.ts
  - src/app/job-subdomain/layout.tsx (Baru)
  - src/app/job-subdomain/page.tsx (Baru)


## Kategori: Frontend (Job/Networking Community UI)
- **Status:** Selesai
- **Perubahan:**
  - Memindahkan posisi komponen 'Lengkapi Profil' dari sidebar kanan ke sidebar kiri.
  - Merombak ulang (redesign) komponen tersebut menjadi bergaya User Profile Card (terdapat banner, foto profil, nama, email terverifikasi, dan link portofolio) mirip seperti tampilan pada situs profesional.
  - Progress bar 'Lengkapi Profil' tetap dipertahankan di bagian bawah Profile Card tersebut.
  - Menambahkan *placeholder* 'Top Perusahaan' di sidebar kanan agar layout 3-kolom tetap seimbang.
- **File Terdampak:**
  - src/app/job-subdomain/layout.tsx


## Kategori: Frontend (Sinkronisasi User Data di Job Subdomain)
- **Status:** Selesai
- **Perubahan:**
  - Memodifikasi Profile Card di src/app/job-subdomain/layout.tsx agar tersinkronisasi dinamis dengan akun user (menarik data dari *session cookie*).
  - Menghapus komponen *progress bar* Lengkapi Profil dan tautan portofolio di kartu profil untuk menjadikannya lebih ringkas.
  - Menampilkan nama asli (diambil dari data adminDb), email, dan lokasi.
- **File Terdampak:**
  - src/app/job-subdomain/layout.tsx


## Kategori: Frontend (Auth Modal di Job Subdomain)
- **Status:** Selesai
- **Perubahan:**
  - Membuat komponen JobAuthModal interaktif dengan 2 opsi utama (Mencari Kerja vs Membuka Lowongan).
  - Menerapkan transisi UI perpindahan ke form *login* spesifik masing-masing *role* secara mulus tanpa me-*reload* halaman.
  - Memasukkan komponen modal ini ke dalam src/app/job-subdomain/layout.tsx.
  - Modal hanya akan muncul (dengan overlay *blur*) jika variabel sessionCookie kosong/tidak terdeteksi.
- **File Terdampak:**
  - src/components/job/JobAuthModal.tsx (Baru)
  - src/app/job-subdomain/layout.tsx


## Kategori: Frontend (Penyederhanaan UI Modal Job)
- **Status:** Selesai
- **Perubahan:**
  - Menghapus banner dekorasi hijau (beserta teks promosi) pada komponen JobAuthModal.
  - Mengubah warna latar belakang (*overlay*) modal dari warna gelap (g-slate-900/60) menjadi efek kaca transparan yang terang (g-white/40 backdrop-blur-md).
  - Membuat tampilan pop-up jauh lebih minimalis dan fokus langsung pada 2 opsi *role*.
- **File Terdampak:**
  - src/components/job/JobAuthModal.tsx


## Kategori: Frontend (Revisi Background Modal Job)
- **Status:** Selesai
- **Perubahan:**
  - Menghapus efek ackdrop-blur pada modal *Role Selection* agar *background* halaman utama tetap terlihat jelas (tidak rabun).
  - Mengganti *overlay* transparan cerah menjadi warna gelap g-black/40 sesuai instruksi untuk menjaga kontras dan kenyamanan visual.
- **File Terdampak:**
  - src/components/job/JobAuthModal.tsx


## Kategori: Frontend (Optimasi Mobile UI Modal Job)
- **Status:** Selesai
- **Perubahan:**
  - Menyesuaikan *grid layout* pada opsi *Role Selection* agar tetap mempertahankan format 2 kolom secara horizontal (bersebelahan) di perangkat *mobile* (menghapus sifat *stacking* vertikal sm:grid-cols-2).
  - Memperkecil ukuran *padding*, teks, dan *icon* khusus untuk layar *mobile* (pakai breakpoint *sm:*) agar desain menjadi jauh lebih *compact* dan tidak memakan terlalu banyak ruang layar.
- **File Terdampak:**
  - src/components/job/JobAuthModal.tsx


## Kategori: Frontend (Password Toggle JobAuthModal)
- **Status:** Selesai
- **Perubahan:**
  - Menambahkan *state* internal showPassword pada komponen JobAuthModal.
  - Menyuntikkan interaksi ikon Eye dan EyeOff (dari *lucide-react*) pada input kata sandi pencari kerja dan rekruter.
  - Ikon kini dapat diklik untuk menyembunyikan/menampilkan teks input *password* secara *real-time*.
- **File Terdampak:**
  - src/components/job/JobAuthModal.tsx


## Kategori: Backend (Integrasi Autentikasi Modal Job)
- **Status:** Selesai
- **Perubahan:**
  - Menghubungkan form otentikasi di dalam JobAuthModal dengan SDK Client Firebase (signInWithEmailAndPassword).
  - Memanggil *server action* createSession untuk men-*set* *cookie* sesi secara aman (Server-Side) setelah token ID Firebase didapatkan.
  - Menambahkan *state* penanganan pesan *error* dinamis (jika *password* salah).
  - Jika proses *login* berhasil, halaman otomatis memuat ulang (*reload*) dan modal akan tertutup karena status isLoggedIn menjadi 	rue.
- **File Terdampak:**
  - src/components/job/JobAuthModal.tsx


## Kategori: Frontend (Penyesuaian Lebar Sidebar Job Subdomain)
- **Status:** Selesai
- **Perubahan:**
  - Memperbarui sistem *Grid Layout* di src/app/job-subdomain/layout.tsx.
  - Mengganti alokasi kolom md:grid-cols-4 (dimana *sidebar* mengambil 25%) menjadi sistem ukuran absolut kustom lg:grid-cols-[240px_1fr_280px] agar *sidebar* profil di sisi kiri mengecil menjadi 240px dan bersifat permanen (tidak melar).
  - Menyesuaikan batas kemunculan *sidebar* kanan menjadi mode Desktop/Laptop luas (lg:block) agar tidak berantakan di layar menengah.
- **File Terdampak:**
  - src/app/job-subdomain/layout.tsx
 
 # #   K a t e g o r i :   F r o n t e n d   ( J o b   S u b d o m a i n   R i g h t   S i d e b a r   &   L a y o u t   R e d e s i g n )  
 -   * * S t a t u s : * *   S e l e s a i  
 -   * * P e r u b a h a n : * *  
     -   M e n g u b a h   S i d e b a r   K a n a n   ( T o p   P e r u s a h a a n )   m e n j a d i   d a f t a r   A r t i k e l   K a r i r   T e r b a r u   y a n g   t e r h u b u n g   d i n a m i s   k e   d a t a b a s e   b l o g   C M S   d e n g a n   r e g e x / n o d e   s c r i p t .  
     -   M e n g g a n t i   i c o n   L i n k   m e n j a d i   i c o n   G l o b e   p a d a   a r e a   l a m p i r a n   C r e a t e   P o s t   d i   F e e d C l i e n t .  
     -   M e n a m b a h k a n   t o m b o l   f i t u r   S u r a t   d i   f o r m   C r e a t e   P o s t   ( F e e d C l i e n t ) .  
     -   M e r o m b a k   L e f t   S i d e b a r   m e n j a d i   d a s h b o a r d - s t y l e   ( f i x e d   p o s i t i o n ,   f u l l   h e i g h t ,   m e n y a t u   d e n g a n   k i r i   d a n   t o p   n a v b a r ,   b a c k g r o u n d   a b u - a b u   # F 2 F 2 F 2 ) .  
 -   * * F i l e   T e r d a m p a k : * *  
     -   s r c / a p p / j o b - s u b d o m a i n / l a y o u t . t s x  
     -   s r c / c o m p o n e n t s / j o b / F e e d C l i e n t . t s x  
 