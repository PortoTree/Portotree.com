import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Code2, Palette, Briefcase, GraduationCap, Sparkles, ArrowRight, Quote, Video } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami | PortoTree",
  description: "Lebih dari Sekadar Tautan. Bangun Identitas Digitalmu bersama PortoTree.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO MANIFESTO */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-emerald-400/20 md:bg-emerald-400/10 blur-[80px] md:blur-[120px]"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-teal-400/20 md:bg-teal-400/10 blur-[80px] md:blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-left md:text-center flex flex-col items-start md:items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6 md:mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Tentang PortoTree</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 md:mb-8">
            Lebih dari Sekadar Tautan. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Bangun Identitas Digitalmu.
            </span>
          </h1>
          
          <div className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto space-y-6 text-left">
            <p>Internet telah mengubah cara kita memperkenalkan diri.</p>
            <p>Dulu, kesan pertama seseorang mungkin datang dari sebuah perkenalan langsung, kartu nama, CV, atau percakapan tatap muka. Sekarang, kesan pertama itu bisa datang dari satu tautan, hasil pencarian, profil media sosial, proyek yang pernah kamu buat, atau sesuatu yang kamu bagikan di internet.</p>
            <p className="font-semibold text-slate-800">Kehadiranmu di dunia digital telah menjadi bagian dari identitasmu.</p>
            <p>Namun, bagi banyak orang, identitas tersebut masih tersebar di berbagai tempat.</p>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (Editorial Text) */}
      <section className="py-12 md:py-24 bg-white border-y border-slate-100 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-600">Portofolio mungkin berada di satu website.</p>
            </div>
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-600">CV mungkin masih berupa file PDF.</p>
            </div>
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-600">Proyek mungkin tersimpan di GitHub.</p>
            </div>
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-600">Pencapaian mungkin hanya tertulis di salah satu platform.</p>
            </div>
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-600">Sertifikat mungkin tersimpan di folder pribadi.</p>
            </div>
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-600">Pengalaman profesional mungkin hanya terlihat di platform karier.</p>
            </div>
            <div className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-100 sm:col-span-2">
              <p className="text-slate-600">Dan berbagai akun media sosial mungkin tersebar di banyak tempat.</p>
            </div>
          </div>

          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Ketika seseorang ingin mengenalmu lebih jauh, mereka harus berpindah dari satu platform ke platform lainnya untuk memahami siapa dirimu sebenarnya.</p>
            <div className="border-l-4 border-emerald-500 pl-6 my-10 bg-emerald-50 py-4 pr-4 rounded-r-xl">
              <p className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Kami percaya seharusnya ada cara yang lebih sederhana.
              </p>
              <p className="text-lg md:text-xl text-emerald-800">
                Karena itulah <strong className="font-bold">PortoTree</strong> dibuat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE BELIEF (Dark Section) */}
      <section className="py-16 md:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full bg-emerald-500/20 blur-[100px] md:blur-[150px] rounded-full"></div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-left md:text-center">
          <Quote className="w-12 h-12 md:w-16 md:h-16 text-emerald-500/50 mb-6 md:mx-auto md:mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10 leading-tight">
            Satu Tempat untuk Semua Hal yang Mewakili Dirimu
          </h2>
          
          <div className="text-lg md:text-xl text-slate-300 leading-relaxed space-y-6 text-left">
            <p>PortoTree adalah platform personal branding dan identitas digital yang dirancang untuk membantu kamu mengumpulkan berbagai bagian penting dari perjalananmu ke dalam satu tempat.</p>
            <p>Alih-alih mengarahkan seseorang ke berbagai platform hanya untuk mengenal siapa dirimu, PortoTree memberikan ruang di mana ceritamu dapat hadir sebagai sebuah pengalaman yang utuh.</p>
            <p>Profilmu bisa menjadi lebih dari sekadar nama dan sekumpulan tautan.</p>
            <p className="text-xl md:text-2xl text-white font-semibold">Profilmu bisa menjadi rumah digitalmu.</p>
            <p>Sebuah tempat di mana orang dapat mengenal siapa dirimu, memahami apa yang kamu lakukan, melihat apa yang telah kamu bangun, mengetahui pengalamanmu, menemukan keterampilan yang kamu miliki, melihat pencapaianmu, dan menemukan cara terbaik untuk terhubung denganmu.</p>
            <p>Baik kamu seorang developer, designer, creator, freelancer, pelajar, profesional, maupun seseorang yang sedang membangun personal brand, PortoTree hadir untuk membantumu membangun kehadiran digital yang benar-benar merepresentasikan dirimu.</p>
            <p>Mulai dari portofolio, resume, proyek, pengalaman, pendidikan, keterampilan, sertifikat, hingga berbagai pencapaian—semuanya dapat disusun dalam satu ruang personal dan dibagikan melalui satu tautan.</p>
          </div>
        </div>
      </section>

      {/* 4. MORE STORY - Ceritamu Lebih Besar */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Ceritamu Lebih Besar dari Sekadar CV</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>CV memang penting. Portofolio juga penting. Profil profesional juga penting.</p>
            <p>Namun, tidak satu pun dari semua itu dapat menceritakan keseluruhan perjalananmu.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>CV menunjukkan tempat kamu pernah bekerja dan apa yang pernah kamu lakukan.</li>
              <li>Portofolio menunjukkan apa yang telah kamu buat.</li>
              <li>Profil profesional menjelaskan pengalamanmu.</li>
              <li>Media sosial menunjukkan apa yang kamu bagikan.</li>
            </ul>
            <p className="text-xl font-bold text-slate-900 my-8">Namun, dirimu jauh lebih besar daripada salah satu dari semua itu.</p>
            <p>Perjalananmu terdiri dari berbagai hal. Keterampilan yang kamu pelajari. Proyek yang pernah kamu kerjakan. Pengalaman yang membentuk dirimu. Pendidikan yang kamu tempuh. Sertifikat yang kamu dapatkan. Pencapaian yang kamu raih. Kegagalan yang memberimu pelajaran. Ide yang sedang kamu kembangkan. Dan tujuan yang masih ingin kamu capai.</p>
            <p>PortoTree dibangun berdasarkan pemikiran tersebut. Kami ingin kehadiran digitalmu mampu menunjukkan <strong className="font-bold text-slate-900">gambaran yang lebih lengkap tentang dirimu</strong>, bukan hanya sebuah dokumen atau kumpulan tautan.</p>
          </div>
        </div>
      </section>

      {/* 5. DIBANGUN DI SEKITAR IDENTITASMU */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Dibangun di Sekitar Identitasmu</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Di balik PortoTree terdapat sebuah keyakinan sederhana:</p>
            <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 italic text-xl md:text-2xl text-slate-700 font-medium">
              "Setiap orang memiliki cerita yang layak untuk diperkenalkan."
            </blockquote>
            <p>Kamu tidak harus terkenal. Kamu tidak harus memiliki ribuan pengikut. Kamu tidak harus bekerja di perusahaan besar. Kamu tidak harus memiliki pengalaman bertahun-tahun. Dan kamu tidak harus menjadi seorang ahli dalam membuat website.</p>
            <p>Jika kamu memiliki sesuatu yang sedang dibangun, sesuatu yang sedang dipelajari, sesuatu yang telah kamu capai, atau sekadar sebuah cerita yang ingin kamu bagikan kepada dunia, kamu berhak memiliki tempat untuk menunjukkannya.</p>
            <p>PortoTree memberikanmu alat untuk mengubah informasi tersebut menjadi sebuah identitas digital yang terstruktur dan personal.</p>
            <p>Daripada bertanya: <strong className="font-bold text-slate-900">"Informasi ini harus saya taruh di mana?"</strong><br/>Kamu bisa mulai bertanya: <strong className="font-bold text-slate-900">"Bagaimana saya ingin orang lain mengenal saya?"</strong></p>
          </div>
        </div>
      </section>

      {/* 6. DIBUAT UNTUK MANUSIA */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Dibuat untuk Manusia, Bukan Sekadar Profil</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Kami tidak melihat halaman personal sebagai sekumpulan data. Kami melihatnya sebagai sebuah <strong className="font-bold text-slate-900">perkenalan</strong>.</p>
            <p>Ketika seseorang membuka PortoTree milikmu, mereka seharusnya dapat memahami dirimu secara alami.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-medium flex items-center justify-center min-h-[100px] text-slate-700">Siapa kamu?</div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-medium flex items-center justify-center min-h-[100px] text-slate-700">Apa yang kamu lakukan?</div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-medium flex items-center justify-center min-h-[100px] text-slate-700">Apa yang kamu sukai?</div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-medium flex items-center justify-center min-h-[100px] text-slate-700">Apa yang telah kamu bangun?</div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-medium flex items-center justify-center min-h-[100px] text-slate-700">Apa pencapaianmu?</div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-medium flex items-center justify-center min-h-[100px] text-slate-700">Keterampilanmu?</div>
            </div>
            <p>Dan yang paling penting: <strong className="font-bold text-slate-900">Mengapa orang lain harus mengingatmu?</strong></p>
            <p>Kehadiran digital yang baik bukan hanya memberikan informasi. Ia memberikan konteks. Ia membangun kepercayaan. Ia menciptakan rasa ingin tahu. Dan ia memberikan alasan bagi seseorang untuk terus mengeksplorasi. Itulah yang ingin kami bangun melalui PortoTree.</p>
          </div>
        </div>
      </section>

      {/* 7. DARI TAUTAN YANG TERSEBAR */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Dari Tautan yang Tersebar Menjadi Satu Pengalaman</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Gagasan di balik PortoTree berawal dari sebuah masalah yang sederhana, tetapi semakin sering kita temui.</p>
            <p>Kita memiliki terlalu banyak tempat untuk hadir di internet. Satu platform untuk media sosial. Platform lain untuk dunia profesional. Platform lain untuk kode dan proyek. Platform lain untuk karya desain. Platform lain untuk menulis. Platform lain untuk sertifikat. Platform lain untuk menjual produk atau layanan.</p>
            <p>Dan di tengah semua platform tersebut, kita tetap diharapkan mampu membangun sebuah personal brand yang konsisten. Hal tersebut bisa menjadi rumit.</p>
            <p>PortoTree hadir untuk mendekatkan bagian-bagian tersebut. Daripada memperlakukan kehadiran digital sebagai kumpulan platform yang terpisah, PortoTree membantu mengubahnya menjadi satu tujuan yang saling terhubung.</p>
            <p>Satu tautan dapat menjadi titik awal bagi seseorang untuk menemukan semua hal yang ingin kamu tunjukkan tentang dirimu.</p>
            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center my-12 leading-tight">
              Satu tautan.<br/>
              Satu tempat.<br/>
              Satu identitas.
            </div>
          </div>
        </div>
      </section>

      {/* 8. LEBIH DARI SEKADAR LINK-IN-BIO */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Lebih dari Sekadar Link-in-Bio</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Pada pandangan pertama, PortoTree mungkin terlihat familiar. Ada profil. Ada tautan. Ada halaman personal.</p>
            <p>Namun, itu baru permulaan. Kami tidak percaya bahwa identitas digital seseorang seharusnya berhenti pada sekumpulan tombol. Sebuah tautan hanyalah sebuah pintu. Yang lebih penting adalah <strong className="font-bold text-slate-900">apa yang ada di baliknya</strong>.</p>
            <p>PortoTree dapat berkembang menjadi representasi lengkap dari pekerjaan dan perjalananmu.</p>
            <ul className="list-none space-y-4 my-8 pl-4 border-l-2 border-emerald-200">
              <li><strong>Proyek</strong> menunjukkan apa yang kamu bangun.</li>
              <li><strong>Pengalaman</strong> menunjukkan perjalananmu.</li>
              <li><strong>Pendidikan</strong> menunjukkan apa yang telah kamu pelajari.</li>
              <li><strong>Keterampilan</strong> menunjukkan apa yang bisa kamu lakukan.</li>
              <li><strong>Sertifikat</strong> menunjukkan pencapaianmu.</li>
              <li><strong>Profil</strong> memperkenalkan siapa dirimu.</li>
              <li><strong>Tautan</strong> menghubungkan orang lain dengan berbagai bagian dunia digitalmu.</li>
            </ul>
            <p>Ketika semuanya digabungkan, hasilnya menjadi sesuatu yang lebih bernilai daripada sekadar halaman tautan:</p>
            <p className="text-2xl font-bold text-slate-900"><strong className="text-emerald-600">sebuah identitas digital yang benar-benar merepresentasikan dirimu.</strong></p>
          </div>
        </div>
      </section>

      {/* 9. TARGET AUDIENCE (Bento Grid with Full Text) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 md:mb-16 text-left md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 md:mb-8">Dibuat untuk Setiap Tahap Perjalanan</h2>
            <div className="text-lg text-slate-600 leading-relaxed space-y-4 text-left">
              <p>Kariermu tidak dimulai ketika kamu mendapatkan pekerjaan pertama. Dan personal brand-mu tidak dimulai ketika kamu menjadi seorang ahli. Semuanya bisa dimulai jauh lebih awal.</p>
              <p>Mungkin kamu seorang pelajar yang sedang mengerjakan proyek pertamamu. Belajar coding. Membuat portofolio pertama. Proyek sampingan setelah kerja. Klien pertama sebagai freelancer. Mengembangkan keahlian. Berganti karier. Membangun bisnis. Menciptakan hal baru.</p>
              <p>Di mana pun kamu berada dalam perjalananmu, PortoTree dirancang untuk berkembang bersamamu. Kamu tidak harus memiliki semuanya sejak awal. Halamanmu dapat berkembang seiring perkembangan dirimu. Versi pertamamu mungkin sederhana. Kemudian tambah proyek, pengalaman, sertifikat, keterampilan, pencapaian, dan peluang baru.</p>
              <p className="font-bold text-xl text-slate-900 text-center my-8">Identitas digitalmu tidak harus selesai. Yang penting adalah kamu memiliki tempat untuk memulainya.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Developer */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Untuk Developer</h3>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>Developer sering menghadapi tantangan yang unik. Hal-hal yang mereka bangun bisa sangat mengesankan, tetapi tidak selalu mudah untuk dijelaskan dalam waktu singkat.</p>
                <p>Sebuah repository tidak selalu mampu menceritakan cerita di balik sebuah proyek. CV tidak selalu menunjukkan bagaimana seseorang berpikir. Kumpulan tautan tidak selalu mampu menggambarkan kemampuan seseorang secara keseluruhan.</p>
                <p>PortoTree dapat menjadi penghubung di antara semua hal tersebut. Tampilkan proyekmu. Jelaskan apa yang kamu bangun. Tunjukkan keterampilanmu. Bagikan pengalamanmu. Hubungkan repository-mu. Tampilkan karya yang paling kamu banggakan.</p>
                <p className="font-semibold text-slate-800">Daripada hanya mengatakan bahwa kamu seorang developer, berikan orang lain tempat untuk melihat apa arti menjadi seorang developer menurut versimu sendiri.</p>
              </div>
            </div>

            {/* Designer */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Untuk Designer dan Kreator</h3>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>Karyamu layak untuk dilihat dalam konteks yang tepat. Sekumpulan gambar memang dapat menunjukkan seperti apa hasil sebuah karya, tetapi sebuah halaman personal dapat menjelaskan pemikiran yang ada di baliknya.</p>
                <p>Tampilkan proyekmu. Ceritakan proses kreatifmu. Tunjukkan pengalamanmu. Bagikan keterampilanmu. Hubungkan berbagai platform tempat kamu berkarya. Bangun ruang yang terasa seperti milikmu sendiri.</p>
                <p>PortoTree memberikan designer, photographer, artist, creator, dan berbagai profesional kreatif lainnya ruang yang fleksibel untuk mengubah karya mereka menjadi sebuah identitas digital yang utuh.</p>
              </div>
            </div>

            {/* Freelancer */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Untuk Freelancer dan Profesional Independen</h3>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>Bagi seorang freelancer, kehadiran online dapat memengaruhi keputusan seseorang untuk bekerja sama denganmu.</p>
                <p>Calon klien ingin mengetahui: Siapa kamu? Apa yang bisa kamu lakukan? Apa yang pernah kamu kerjakan? Pengalaman apa yang kamu miliki? Apa yang bisa kamu tawarkan? Bagaimana cara menghubungimu?</p>
                <p>Daripada mengarahkan calon klien ke berbagai platform yang berbeda, PortoTree memberikan satu tempat di mana mereka dapat mengenal identitas profesionalmu.</p>
                <p className="font-semibold text-slate-800">Halamanmu bukan hanya menjadi profil. Halamanmu bisa menjadi bagian dari bisnismu.</p>
              </div>
            </div>

            {/* Student */}
            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Untuk Pelajar dan Pemula</h3>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>Kamu tidak membutuhkan pengalaman puluhan tahun untuk mulai membangun identitas profesional. Bahkan, memulainya lebih awal dapat membuat perjalananmu menjadi jauh lebih mudah.</p>
                <p>Proyek pertamamu berarti. Sertifikat pertamamu berarti. Magang pertamamu berarti. Keterampilan yang sedang kamu pelajari berarti. Komunitas yang kamu ikuti berarti. Hal-hal yang sedang kamu eksperimenkan berarti.</p>
                <p>PortoTree memberikan tempat untuk mulai mendokumentasikan perjalanan tersebut sejak awal. Seiring waktu, hal-hal kecil tersebut akan bertambah. Satu proyek menjadi lima. Satu keterampilan berkembang menjadi sebuah keahlian. Sebuah proyek sampingan berubah menjadi peluang karier.</p>
                <p className="font-semibold text-slate-800">Identitas digitalmu berkembang bersamaan dengan dirimu.</p>
              </div>
            </div>

            {/* Creator (Full Width) */}
            <div className="md:col-span-2 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Untuk Kreator</h3>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>Kreator hidup di banyak platform. Kamu mungkin memiliki audiens di satu platform, konten di platform lain, produk di tempat lain, dan identitas yang berbeda di platform lainnya.</p>
                <p>PortoTree dapat menjadi pusat yang menghubungkan semua dunia tersebut. Audiensmu tidak seharusnya harus mengingat setiap platform tempat kamu berada. Berikan mereka satu tempat untuk memulai.</p>
                <p>Dari sana, mereka dapat menemukan kontenmu, proyekmu, produkmu, komunitasmu, dan berbagai tempat lain di mana kamu hadir secara online.</p>
                <p className="font-semibold text-slate-800">Audiensmu dapat berkembang di berbagai platform, sementara identitasmu tetap terhubung melalui satu ruang utama.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. KEHADIRAN DIGITALMU HARUS MENJADI MILIKMU & PERSONALISASI & SETIAP KARYA... */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-16 md:space-y-24">
            
            {/* Kehadiran Digitalmu Harus Menjadi Milikmu */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Kehadiran Digitalmu Harus Menjadi Milikmu</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Salah satu tantangan terbesar dalam membangun identitas di internet saat ini adalah terlalu banyak hal bergantung pada platform yang tidak kita kendalikan.</p>
                <p>Algoritma berubah. Fitur bisa dihapus. Tampilan platform berubah. Kebijakan berubah. Audiens berpindah. Tren datang dan pergi.</p>
                <p>Namun, identitasmu tidak seharusnya harus dimulai dari nol setiap kali internet berubah.</p>
                <p>PortoTree dibangun dengan gagasan untuk menciptakan sebuah ruang pusat yang merepresentasikan <strong className="font-bold text-slate-900">dirimu</strong>, bukan sekadar platform yang sedang kamu gunakan.</p>
                <p>Akun media sosialmu dapat berubah. Pekerjaanmu dapat berubah. Keterampilanmu dapat berubah. Proyekmu dapat berubah. Tujuanmu dapat berubah. Dan PortoTree dapat berubah bersamamu.</p>
              </div>
            </div>

            {/* Personalisasi Itu Penting */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Personalisasi Itu Penting</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Tidak semua orang menceritakan dirinya dengan cara yang sama.</p>
                <p>Seorang developer mungkin ingin menonjolkan proyek dan keterampilan teknis. Seorang designer mungkin ingin karya visual menjadi bagian paling menonjol. Seorang freelancer mungkin lebih fokus pada layanan dan pengalaman. Seorang pelajar mungkin ingin menampilkan pendidikan, pencapaian, dan proyek. Seorang creator mungkin lebih memprioritaskan konten dan komunitas.</p>
                <p>Tidak seharusnya ada satu template yang memaksa semua orang terlihat sama. Karena itu, PortoTree dibangun dengan mempertimbangkan personalisasi.</p>
                <p>Profilmu harus mencerminkan <strong className="font-bold text-slate-900">apa yang penting bagimu</strong>, bukan apa yang dianggap penting oleh orang lain.</p>
                <p>Kamu menentukan apa yang ingin ditampilkan. Kamu menentukan apa yang ingin dilihat lebih dulu. Kamu menentukan bagaimana ceritamu disusun. Kamu menentukan apa yang ingin kamu bagikan. Dan ketika prioritasmu berubah, identitas digitalmu juga dapat berubah.</p>
              </div>
            </div>

            {/* Setiap Karya Memiliki Cerita */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Setiap Karya Memiliki Cerita</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Sebuah proyek bukan hanya thumbnail. Sebuah sertifikat bukan hanya gambar. Sebuah keterampilan bukan hanya sebuah kata dalam daftar. Sebuah pengalaman bukan hanya jabatan. Semuanya memiliki cerita di baliknya.</p>
                <p>Mengapa kamu membuat proyek tersebut? Masalah apa yang ingin kamu selesaikan? Apa yang kamu pelajari? Apa peranmu? Keterampilan apa yang kamu gunakan? Apa yang terjadi selama prosesnya?</p>
                <p>Detail-detail tersebutlah yang mengubah kumpulan informasi menjadi sebuah cerita.</p>
                <p>PortoTree dirancang untuk memberikan ruang agar kamu dapat menceritakan konteks tersebut. Karena terkadang bagian paling berharga dari sebuah karya bukan hanya <strong className="font-bold text-slate-900">apa yang kamu buat</strong>.</p>
                <p className="font-semibold text-slate-900">Melainkan mengapa kamu membuatnya dan apa yang kamu pelajari dari proses tersebut.</p>
              </div>
            </div>
            
            {/* Sebuah Tempat yang Berkembang Bersamamu */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Sebuah Tempat yang Berkembang Bersamamu</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Kami tidak ingin PortoTree menjadi sesuatu yang kamu buat sekali lalu kamu lupakan. Kami ingin PortoTree menjadi sesuatu yang dapat terus kamu kembangkan.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ketika kamu menyelesaikan proyek baru, tambahkan.</li>
                  <li>Ketika kamu mempelajari keterampilan baru, perbarui.</li>
                  <li>Ketika kamu menyelesaikan sebuah kursus, dokumentasikan.</li>
                  <li>Ketika kamu mendapatkan sertifikat, tampilkan.</li>
                  <li>Ketika kamu memulai pekerjaan baru, perbarui pengalamanmu.</li>
                  <li>Ketika kamu meluncurkan sesuatu yang baru, bagikan.</li>
                  <li>Ketika tujuanmu berubah, ubah profilmu.</li>
                </ul>
                <p className="font-semibold text-slate-900">Identitas digital seharusnya tidak statis. Ia seharusnya berkembang seiring kehidupan dan kariermu.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. VISI & SEDERHANA & KESAN */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-16 md:space-y-24">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Dibangun dengan Visi Jangka Panjang</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Kami tidak hanya ingin menyelesaikan masalah tentang tempat untuk meletakkan tautan. Kami memikirkan sesuatu yang lebih besar.</p>
                <p>Kami membayangkan masa depan di mana seseorang dapat membangun representasi digital yang lengkap tanpa harus menyusunnya dari berbagai layanan yang terpisah.</p>
                <p>Masa depan di mana identitas profesional dapat berjalan berdampingan dengan identitas kreatif. Di mana portofolio dapat berdampingan dengan resume. Di mana proyek dapat berdampingan dengan pencapaian. Di mana keterampilan dapat berdampingan dengan cerita. Di mana semuanya dapat terhubung melalui satu ruang personal.</p>
                <p className="text-xl font-bold text-slate-900 mt-8">Tujuannya sederhana: Membuat orang lebih mudah membangun kehadiran online yang benar-benar merepresentasikan siapa mereka.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Sederhana Tanpa Mengorbankan Kedalaman</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Tools yang powerful tidak harus terasa rumit.</p>
                <p>Kami percaya bahwa produk yang baik adalah produk yang menyembunyikan kompleksitas ketika kompleksitas tersebut tidak diperlukan, tetapi tetap memberikan fleksibilitas ketika pengguna membutuhkannya.</p>
                <p>Membangun kehadiran digital seharusnya tidak mengharuskanmu memahami web development. Kamu tidak seharusnya perlu mendesain seluruh website dari awal. Kamu tidak seharusnya perlu mengelola banyak sistem hanya untuk menjelaskan siapa dirimu.</p>
                <p>Kamu seharusnya dapat fokus pada ceritamu, pekerjaanmu, dan tujuanmu.</p>
                <p className="font-semibold text-slate-900">PortoTree menangani strukturnya sehingga kamu dapat fokus pada hal-hal yang membuat identitasmu unik.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Kesan Pertamamu Harus Terasa Seperti Dirimu</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Tidak ada satu definisi universal tentang seperti apa seseorang yang "profesional". Profesional tidak berarti semua orang harus terlihat sama.</p>
                <p>Kehadiran digitalmu dapat terlihat rapi tanpa menjadi membosankan. Kreatif tanpa menjadi membingungkan. Personal tanpa kehilangan kredibilitas. Profesional tanpa terasa terlalu korporat.</p>
                <p>PortoTree milikmu harus terasa seperti <strong className="font-bold text-slate-900">dirimu sendiri</strong>.</p>
                <p>Karena tujuannya bukan membuat profil generik lainnya. Tujuannya adalah menciptakan ruang di mana seseorang dapat menghabiskan beberapa menit dan meninggalkan halaman tersebut dengan pemahaman yang lebih nyata tentang siapa kamu.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Kami Percaya pada Proses</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Tidak semua orang memulai dengan portofolio yang mengesankan. Tidak semua orang memiliki daftar pencapaian yang panjang. Tidak semua orang tahu dengan pasti ke mana mereka akan pergi. Dan itu tidak masalah.</p>
                <p>Kami percaya bahwa perkembangan layak untuk didokumentasikan.</p>
                <p>Proyek pertamamu penting karena menunjukkan dari mana kamu memulai. Proyek kesepuluhmu penting karena menunjukkan seberapa jauh kamu telah berkembang. Pekerjaan pertamamu penting. Pekerjaan berikutnya juga penting. Keterampilan yang sedang kamu pelajari hari ini mungkin menjadi dasar kariermu di masa depan. Eksperimen yang sedang kamu kerjakan hari ini mungkin menjadi proyek terbesar yang pernah kamu buat.</p>
                <p>Perjalananmu tidak menjadi berharga hanya setelah kamu berhasil.</p>
                <p className="text-xl font-bold text-slate-900">Perjalanan itu sendiri adalah bagian dari ceritamu.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Satu Tautan Dapat Membuka Cerita yang Lebih Besar</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Sebuah tautan mungkin terlihat sederhana. Namun, di baliknya bisa terdapat sesuatu yang berarti.</p>
                <p>Sebuah proyek. Peluang karier. Kolaborasi. Klien. Koneksi baru. Komunitas. Pekerjaan. Pelanggan. Sebuah percakapan. Atau sekadar seseorang yang menemukan karya kamu untuk pertama kalinya.</p>
                <p>Itulah mengapa kami tidak melihat tautan PortoTree sebagai tujuan akhir.</p>
                <p>Kami melihatnya sebagai <strong className="font-bold text-slate-900">titik awal</strong>.</p>
                <p>Sebuah pintu sederhana menuju semua hal yang membuatmu menjadi dirimu sendiri.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. PHILOSOPHY LIST */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-left md:text-center">Filosofi PortoTree</h2>
          <p className="text-lg text-slate-600 mb-12 text-left md:text-center">Pada dasarnya, PortoTree dibangun berdasarkan beberapa keyakinan sederhana.</p>
          
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-slate-900">Identitasmu lebih besar daripada profil media sosialmu.</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-600">Media sosial sangat baik untuk membagikan konten, tetapi identitasmu tidak seharusnya dibatasi oleh apa yang dapat ditampung oleh sebuah platform.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-slate-900">Karyamu layak mendapatkan konteks.</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-600">Proyek, pengalaman, keterampilan, dan pencapaian menjadi jauh lebih bermakna ketika orang lain dapat memahami cerita di baliknya.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-slate-900">Kehadiran digitalmu harus dapat berkembang.</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-600">Kamu terus belajar, membangun, berubah, dan berkembang. Identitas digitalmu seharusnya dapat melakukan hal yang sama.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-slate-900">Setiap orang berhak memiliki tempat untuk memulai.</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-600">Kamu tidak perlu menjadi seorang profesional berpengalaman untuk mulai membangun kehadiran profesional.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-slate-900">Personal branding harus dapat diakses semua orang.</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-600">Membangun identitas online seharusnya tidak membutuhkan biaya besar, tim developer, atau kemampuan teknis tingkat lanjut.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold text-slate-900">Satu tempat dapat menghubungkan semuanya.</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-600">Dunia digitalmu mungkin tersebar di berbagai platform, tetapi identitasmu dapat memiliki satu rumah utama.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. MASA DEPAN & MISI VISI */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-16 md:space-y-24">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Apa yang Sedang Kami Bangun</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>PortoTree akan terus berkembang. Dan itu memang bagian dari rencananya.</p>
                <p>Internet terus berubah. Cara orang bekerja berubah. Cara orang belajar berubah. Cara orang membangun karier berubah. Cara orang menemukan talenta berubah. Cara orang membuat bisnis dan komunitas berubah.</p>
                <p>Kami ingin PortoTree berkembang mengikuti perubahan tersebut.</p>
                <p>Kami terus mencari cara yang lebih baik untuk membantu orang memperkenalkan dirinya, mengatur pekerjaannya, menghubungkan berbagai bagian dari kehadiran digitalnya, dan membangun sesuatu yang benar-benar dapat mereka banggakan.</p>
                <p>Artinya, PortoTree bukan sekadar produk yang dianggap selesai.</p>
                <p className="font-bold text-slate-900">PortoTree adalah platform yang terus kami bangun dan kembangkan.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Dibangun untuk Internet Hari Ini dan Akan Datang</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Internet modern telah membuat hampir semua orang memiliki kesempatan untuk membangun sesuatu.</p>
                <p>Kamu dapat membuat produk dari kamar sendiri. Mempelajari keterampilan baru dari mana saja. Mempublikasikan karya dalam hitungan detik. Membangun audiens tanpa harus bergantung pada media tradisional. Menemukan klien dari berbagai belahan dunia. Berkolaborasi dengan orang yang bahkan belum pernah kamu temui. Membangun karier yang mungkin bahkan belum ada beberapa tahun lalu.</p>
                <p>Namun, kebebasan tersebut menghadirkan tantangan baru:</p>
                <p className="text-2xl font-bold text-slate-900">Bagaimana kamu memperkenalkan dirimu di tengah semua itu?</p>
                <p>PortoTree hadir untuk membantu menjawab pertanyaan tersebut.</p>
                <p>Kami ingin membuat orang lebih mudah mengubah berbagai bagian dari kehidupan digital mereka yang tersebar menjadi sesuatu yang terhubung, mudah dipahami, dan benar-benar memiliki karakter mereka sendiri.</p>
              </div>
            </div>

            <div className="bg-emerald-50 p-8 md:p-12 rounded-3xl border border-emerald-100">
              <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-6">Misi Kami</h2>
              <p className="text-lg text-emerald-800 leading-relaxed mb-6">Misi kami sederhana:</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-8">Membantu setiap orang membangun identitas digital yang dapat mereka banggakan.</h3>
              <div className="space-y-4 text-lg text-emerald-800/80 leading-relaxed">
                <p>Bukan sekadar profil yang dikendalikan algoritma. Bukan hanya kumpulan tautan. Bukan sekadar resume. Bukan hanya portofolio.</p>
                <p>Melainkan sebuah ruang personal yang menghubungkan orang-orang, karya, pengalaman, keterampilan, pencapaian, dan cerita yang membentuk diri mereka.</p>
                <p>Kami ingin membuat personal branding menjadi lebih mudah diakses. Kami ingin membuat portofolio menjadi lebih mudah dibuat. Kami ingin membuat identitas profesional menjadi lebih mudah dibagikan.</p>
                <p className="font-semibold text-emerald-900">Dan yang paling penting, kami ingin memberikan tempat bagi setiap orang untuk menyimpan dan menceritakan perjalanan mereka dalam satu pengalaman yang saling terhubung.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Visi Kami</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Kami membayangkan sebuah dunia di mana setiap orang memiliki ruang digital yang benar-benar merepresentasikan dirinya.</p>
                <p>Sebuah tempat yang dapat berkembang dari sekadar perkenalan sederhana menjadi identitas profesional yang lengkap.</p>
                <p>Sebuah tempat di mana seseorang dapat memulai dari hampir tidak memiliki apa-apa dan perlahan membangun sesuatu yang berarti.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tempat di mana seorang pelajar dapat mulai mendokumentasikan perjalanannya dan suatu hari berkembang menjadi seorang profesional.</li>
                  <li>Tempat di mana seorang developer dapat mengubah proyek menjadi peluang.</li>
                  <li>Tempat di mana seorang designer dapat mengubah kreativitas menjadi karier.</li>
                  <li>Tempat di mana seorang freelancer dapat mengubah keahlian menjadi bisnis.</li>
                  <li>Tempat di mana seorang creator dapat mengubah audiens menjadi komunitas.</li>
                </ul>
                <p className="font-bold text-slate-900">Dan tempat di mana siapa pun, dari mana pun mereka memulai, memiliki alat untuk menceritakan kisah mereka.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 14. BIG CTA (Ceritamu Masih Terus Ditulis) */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-emerald-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-20 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-950"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                Ceritamu Masih <br className="hidden md:block"/> Terus Ditulis.
              </h2>
              <div className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed space-y-4">
                <p>Kamu tidak perlu menunggu sampai berhasil mencapai semuanya. Kamu tidak perlu menunggu sampai portofoliomu sempurna. Kamu tidak perlu menunggu sampai mendapatkan pekerjaan impian. Kamu tidak perlu menunggu sampai mengetahui dengan pasti apa yang akan terjadi selanjutnya.</p>
                <p className="font-bold text-white text-xl md:text-2xl pt-4">Mulai dari tempatmu berada sekarang.</p>
                <p>Tunjukkan apa yang telah kamu bangun. Bagikan apa yang telah kamu pelajari. Dokumentasikan apa yang telah kamu capai. Hubungkan berbagai tempat di mana kamu hadir secara online. Dan biarkan identitas digitalmu berkembang bersamamu.</p>
                <p>Karena ceritamu belum selesai. Ceritamu masih terus ditulis. Dan PortoTree hadir untuk membantumu membagikannya.</p>
              </div>
              
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors w-full sm:w-auto justify-center"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 15. CLOSING BRANDING */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-2 mb-6">
            <p className="text-xl md:text-2xl text-slate-600 font-semibold">Lebih dari sekadar tautan.</p>
            <p className="text-xl md:text-2xl text-slate-600 font-semibold">Lebih dari sekadar profil.</p>
            <p className="text-xl md:text-2xl text-slate-600 font-semibold">Lebih dari sekadar portofolio.</p>
          </div>
          <p className="text-2xl md:text-3xl text-emerald-700 font-bold mb-4">Karyamu. Perjalananmu. Identitasmu.</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">PortoTree <span className="block mt-2 text-2xl md:text-4xl text-emerald-600 font-extrabold">Ruang digitalmu.</span></h1>
        </div>
      </section>

      <Footer />
    </div>
  );
}
