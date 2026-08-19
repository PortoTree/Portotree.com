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
