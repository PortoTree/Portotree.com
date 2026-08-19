import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, Eye, Database, Bell, Mail, Megaphone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Kebijakan Privasi | PortoTree",
  description: "Kebijakan Privasi PortoTree untuk melindungi data profesional Anda.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4" />
            <span>Kebijakan Privasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Komitmen Kami pada <br className="hidden md:block"/>
            <span className="text-emerald-600">Privasi Anda</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Di PortoTree, kami menganggap privasi dan keamanan data pengguna sebagai prioritas utama. Kebijakan ini menjelaskan bagaimana kami mengumpulkan dan melindungi informasi Anda.
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
              Selamat datang di PortoTree. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan layanan pembuatan portofolio, CV, dan Portofind di platform kami.
            </p>

            <div className="space-y-12">
              {/* Point 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Database className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">1. Informasi yang Kami Kumpulkan</h2>
                </div>
                <ul className="space-y-3 text-slate-600 ml-14 list-disc">
                  <li><strong>Informasi Profil & Akun:</strong> Nama, alamat email, kata sandi, dan foto profil yang Anda berikan saat mendaftar.</li>
                  <li><strong>Data Profesional:</strong> Riwayat pendidikan, pengalaman kerja, keahlian (skills), tautan sosial media, dan file dokumen yang Anda unggah secara sadar untuk keperluan CV/Portofolio.</li>
                  <li><strong>Data Teknis (Otomatis):</strong> Alamat IP, jenis browser, data login, dan aktivitas penggunaan (cookies) untuk keperluan analitik demi meningkatkan layanan kami.</li>
                </ul>
              </div>

              {/* Point 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">2. Penggunaan Informasi</h2>
                </div>
                <p className="text-slate-600 ml-14 mb-4">
                  Informasi yang kami kumpulkan digunakan untuk tujuan berikut:
                </p>
                <ul className="space-y-3 text-slate-600 ml-14 list-disc">
                  <li>Menyediakan, memelihara, dan meningkatkan fitur layanan PortoTree (termasuk halaman Portofolio dan CV Anda).</li>
                  <li>Menampilkan identitas profesional Anda sesuai dengan pengaturan visibilitas yang Anda pilih.</li>
                  <li>Memfasilitasi koneksi dengan perusahaan atau rekruter melalui fitur Portofind (mendatang).</li>
                  <li>Mengirimkan pembaruan layanan, newsletter, atau pemberitahuan terkait keamanan akun.</li>
                </ul>
              </div>

              {/* Point 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">3. Visibilitas & Berbagi Data</h2>
                </div>
                <div className="ml-14 space-y-4 text-slate-600">
                  <p><strong>Profil Publik:</strong> Mengingat PortoTree adalah platform portofolio, informasi yang Anda cantumkan pada halaman Portofolio/CV Anda secara bawaan dapat diakses secara publik di internet melalui tautan unik profil Anda.</p>
                  <p><strong>Pihak Ketiga:</strong> Kami <strong>tidak pernah menjual</strong> atau menyewakan data pribadi Anda ke pihak ketiga. Kami hanya membagikan data kepada layanan infrastruktur tepercaya (seperti penyedia <em>hosting</em> dan analitik) yang beroperasi di bawah kewajiban kerahasiaan yang ketat.</p>
                  <p><strong>Kewajiban Hukum:</strong> Kami berhak mengungkapkan informasi Anda jika diwajibkan oleh hukum atau permintaan resmi dari otoritas yang berwenang.</p>
                </div>
              </div>

              {/* Point 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">4. Keamanan Data</h2>
                </div>
                <p className="text-slate-600 ml-14">
                  Kami mengimplementasikan standar keamanan industri terkini, termasuk enkripsi transmisi data via HTTPS/SSL, enkripsi kata sandi, serta perlindungan basis data dari akses yang tidak sah. Meskipun demikian, tidak ada metode transmisi di internet yang 100% aman, sehingga kami mengimbau Anda untuk tetap menjaga kerahasiaan kata sandi Anda.
                </p>
              </div>

              {/* Point 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Database className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">5. Hak Anda atas Data</h2>
                </div>
                <p className="text-slate-600 ml-14 mb-4">
                  Sebagai pemilik data, Anda memegang kendali penuh atas informasi yang Anda berikan:
                </p>
                <ul className="space-y-3 text-slate-600 ml-14 list-disc">
                  <li><strong>Akses & Perbarui:</strong> Anda dapat mengakses, mengubah, atau memperbarui profil dan CV Anda kapan saja melalui Dashboard PortoTree.</li>
                  <li><strong>Penghapusan:</strong> Anda berhak menghapus akun dan seluruh data profesional Anda dari server kami dengan menggunakan opsi hapus akun atau dengan menghubungi tim <em>support</em> kami.</li>
                </ul>
              </div>

              {/* Point 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">6. Iklan Pihak Ketiga & Cookie</h2>
                </div>
                <div className="ml-14 space-y-4 text-slate-600">
                  <p>Dalam rangka menyediakan layanan secara gratis, kami mungkin menampilkan iklan yang disediakan oleh mitra pihak ketiga, termasuk <strong>Google AdSense</strong>.</p>
                  <ul className="space-y-3 list-disc ml-5">
                    <li>Vendor pihak ketiga, termasuk Google, menggunakan <em>cookie</em> untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke website PortoTree atau website lain di internet.</li>
                    <li>Penggunaan <em>cookie</em> iklan oleh Google memungkinkan Google dan mitranya untuk menayangkan iklan hasil personalisasi kepada pengguna berdasarkan kunjungan mereka ke situs kami dan/atau situs lain di Internet.</li>
                    <li>Anda dapat memilih untuk menyisih (<em>opt-out</em>) dari iklan hasil personalisasi dengan mengunjungi halaman <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:underline">Setelan Iklan Google</a>.</li>
                  </ul>
                </div>
              </div>

              {/* Point 7 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">7. Pembaruan Kebijakan</h2>
                </div>
                <p className="text-slate-600 ml-14">
                  Kami dapat memperbarui Kebijakan Privasi ini secara berkala untuk mencerminkan perubahan pada layanan atau peraturan yang berlaku. Jika terdapat perubahan yang signifikan, kami akan memberitahukan hal tersebut kepada Anda melalui email terdaftar atau notifikasi di dalam platform.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Pertanyaan Umum (FAQ)</h3>
              
              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Apakah profil portofolio saya bisa dicari di Google?</h4>
                  <p className="text-slate-600 text-base m-0">Ya, agar portofolio Anda mudah ditemukan oleh perekrut atau klien, profil publik Anda dapat diindeks oleh mesin pencari seperti Google. Pastikan Anda hanya mencantumkan informasi yang Anda tidak keberatan untuk diketahui publik.</p>
                </div>
                
                {/* FAQ 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Apakah PortoTree membagikan data saya ke perusahaan perekrut?</h4>
                  <p className="text-slate-600 text-base m-0">PortoTree tidak akan pernah menjual atau membagikan data pribadi Anda secara diam-diam. Informasi Anda hanya akan dibagikan ke perusahaan jika Anda secara sadar melamar pekerjaan melalui fitur Portofind kami.</p>
                </div>
                
                {/* FAQ 3 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Bagaimana cara menghapus semua data saya dari PortoTree?</h4>
                  <p className="text-slate-600 text-base m-0">Anda memegang kendali penuh atas data Anda. Anda dapat menghapus akun beserta seluruh data portofolio dan dokumen di dalamnya secara permanen kapan saja melalui menu Pengaturan di Dashboard Anda.</p>
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
