import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileSignature, UserCheck, ShieldAlert, FileText, Ban, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Ketentuan Layanan | PortoTree",
  description: "Syarat dan ketentuan penggunaan layanan PortoTree.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-white border-b border-slate-100 overflow-hidden">
        {/* Grid Pattern Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)"
          }}
        >
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: "linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
            <FileSignature className="w-4 h-4" />
            <span>Ketentuan Layanan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Aturan Main di <br className="hidden md:block"/>
            <span className="text-emerald-600">PortoTree</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Silakan baca dengan saksama syarat dan ketentuan berikut sebelum menggunakan layanan kami untuk membangun identitas profesional Anda.
          </p>
          <div className="mt-8 text-sm text-slate-500">
            Pembaruan Terakhir: 8 Agustus 2026
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="pt-10 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-slate prose-emerald md:prose-lg max-w-none">
            
            <p className="lead text-xl text-slate-700 mb-10">
              Dengan mendaftar, mengakses, atau menggunakan layanan PortoTree, Anda menyetujui untuk tunduk pada seluruh Ketentuan Layanan (Terms of Service) ini. Jika Anda tidak menyetujui salah satu poin di bawah ini, mohon untuk tidak melanjutkan penggunaan platform kami.
            </p>

            <div className="space-y-12">
              {/* Point 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">1. Akun dan Keamanan</h2>
                </div>
                <ul className="space-y-3 text-slate-600 ml-14 list-disc">
                  <li>Anda wajib memberikan informasi yang akurat, asli, dan valid saat melakukan pendaftaran.</li>
                  <li>Anda bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi (password) akun Anda.</li>
                  <li>Segala aktivitas yang terjadi di bawah akun Anda, baik yang diotorisasi maupun tidak, adalah tanggung jawab Anda sepenuhnya. Kami sangat menyarankan Anda untuk segera melapor jika mencurigai adanya pembobolan akun.</li>
                </ul>
              </div>

              {/* Point 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">2. Hak Cipta & Konten Pengguna</h2>
                </div>
                <p className="text-slate-600 ml-14 mb-4">
                  PortoTree adalah ruang untuk memamerkan karya Anda, dan kami sangat menghormati kekayaan intelektual:
                </p>
                <ul className="space-y-3 text-slate-600 ml-14 list-disc">
                  <li><strong>Hak Milik Penuh:</strong> Semua teks, gambar, desain, portofolio, dan dokumen yang Anda unggah tetap menjadi hak milik Anda 100%.</li>
                  <li><strong>Pemberian Lisensi:</strong> Dengan mengunggah konten ke platform kami, Anda memberi kami lisensi (izin) global non-eksklusif hanya sebatas untuk <strong>menyimpan dan menampilkan</strong> konten tersebut di halaman profil Anda agar dapat diakses oleh publik.</li>
                  <li><strong>Konten Terlarang:</strong> Anda dilarang keras mengunggah konten yang melanggar hak cipta pihak ketiga, materi pornografi, ujaran kebencian, perjudian, penipuan, atau konten apa pun yang melanggar hukum di yurisdiksi Republik Indonesia.</li>
                </ul>
              </div>

              {/* Point 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Ban className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">3. Penggunaan yang Dilarang</h2>
                </div>
                <p className="text-slate-600 ml-14 mb-4">
                  Untuk menjaga kenyamanan komunitas, pengguna dilarang keras melakukan hal-hal berikut:
                </p>
                <ul className="space-y-3 text-slate-600 ml-14 list-disc">
                  <li>Menyalahgunakan fitur platform untuk menyebarkan <em>spam</em>, <em>phishing</em>, atau tautan berbahaya (malware).</li>
                  <li>Melakukan <em>scraping</em> (pengambilan data otomatis), <em>crawling</em>, atau membebani <em>server</em> PortoTree secara tidak wajar.</li>
                  <li>Mencoba meretas, membobol, atau mengeksploitasi celah keamanan sistem kami.</li>
                  <li>Memalsukan identitas atau berpura-pura menjadi tokoh publik, perusahaan, atau individu lain.</li>
                </ul>
              </div>

              {/* Point 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">4. Penangguhan dan Penghapusan Akun</h2>
                </div>
                <p className="text-slate-600 ml-14">
                  Kami berhak sepenuhnya, atas kebijaksanaan kami sendiri, untuk menangguhkan (suspend) atau menghapus akun Anda secara permanen tanpa pemberitahuan sebelumnya, apabila kami menemukan atau menerima laporan valid mengenai pelanggaran terhadap Ketentuan Layanan ini.
                </p>
              </div>

              {/* Point 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">5. Batasan Tanggung Jawab</h2>
                </div>
                <p className="text-slate-600 ml-14">
                  Layanan PortoTree disediakan secara "apa adanya" (<em>as is</em>). Kami berupaya maksimal untuk memastikan platform beroperasi dengan baik, namun kami tidak menjamin layanan akan selalu 100% tanpa gangguan atau bebas dari <em>bug</em>. Kami tidak bertanggung jawab atas kerugian finansial, kehilangan peluang kerja, atau hilangnya data yang mungkin timbul akibat penggunaan atau ketidakmampuan menggunakan layanan kami.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tanya Jawab Syarat & Ketentuan</h3>
              
              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Apakah PortoTree berhak menghapus profil saya?</h4>
                  <p className="text-slate-600 text-base m-0">Ya, tetapi hanya jika kami menemukan bahwa profil Anda digunakan untuk tindakan penipuan, memuat konten ilegal, atau menyebarkan kebencian. Untuk pengguna normal, profil Anda selamanya aman.</p>
                </div>
                
                {/* FAQ 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Apakah saya masih memiliki hak penuh atas karya desain/portofolio yang saya unggah?</h4>
                  <p className="text-slate-600 text-base m-0">Tentu saja. PortoTree tidak mengklaim kepemilikan atas karya Anda. Kami hanya butuh izin lisensi untuk menampilkan gambar dan teks tersebut di halaman portofolio publik Anda.</p>
                </div>
                
                {/* FAQ 3 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Bagaimana jika ada pelanggaran hak cipta di PortoTree?</h4>
                  <p className="text-slate-600 text-base m-0">Jika Anda menemukan seseorang menyalin karya Anda dan mengakuinya sebagai milik mereka di PortoTree, Anda dapat melaporkannya langsung ke tim kami dan kami akan segera mengambil tindakan (take down).</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
