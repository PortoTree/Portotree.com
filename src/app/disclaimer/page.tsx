import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle, Info, Scale, ShieldAlert, Link as LinkIcon, Briefcase } from "lucide-react";

export const metadata = {
  title: "Disclaimer (Sanggahan) | PortoTree",
  description: "Informasi sanggahan hukum mengenai penggunaan layanan, dokumen, dan informasi yang disediakan oleh PortoTree.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-clip">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, #000 50%, transparent 100%)" }}>
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span>Pemberitahuan Hukum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Disclaimer <span className="text-emerald-600">(Sanggahan)</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Harap baca halaman sanggahan ini dengan cermat sebelum menggunakan platform dan fitur generator yang disediakan oleh PortoTree.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm space-y-12">
            
            {/* 1. Persetujuan */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 mb-2">
                <Info className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">1. Persetujuan</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Dengan menggunakan situs web <strong>PortoTree.com</strong> beserta seluruh subdomain dan layanannya, Anda dengan ini menyetujui Disclaimer ini serta menyetujui seluruh ketentuan yang tercantum di dalamnya. Jika Anda tidak setuju dengan sanggahan hukum ini, Anda tidak diperkenankan untuk menggunakan layanan kami.
              </p>
            </div>

            {/* 2. Sanggahan Pembuatan Dokumen (CV, Surat, Portofolio) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 mb-2">
                <Scale className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">2. Fitur Generator Dokumen</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                PortoTree menyediakan fitur generator untuk membantu Anda membuat Curriculum Vitae (CV), Surat Resmi, dan Portofolio Digital. Kami berusaha sebaik mungkin menyediakan templat yang sesuai standar industri (seperti format ATS-friendly). Namun, kami <strong>tidak menjamin</strong> bahwa dokumen yang dihasilkan akan 100% sempurna, bebas dari kesalahan format saat diekspor, atau mutlak sesuai dengan kebijakan spesifik tiap perusahaan atau instansi tujuan Anda. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Tanggung jawab akhir atas kebenaran, keakuratan tata bahasa, dan isi dari dokumen (seperti klaim keahlian atau riwayat pekerjaan) sepenuhnya berada di tangan Anda sebagai pengguna.
              </p>
            </div>

            {/* 3. Tidak Ada Jaminan Hasil Karir */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 mb-2">
                <Briefcase className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">3. Tidak Ada Jaminan Karir</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Meskipun kami memberikan panduan, artikel blog, tips karir, dan templat portofolio terbaik, <strong>PortoTree tidak menjamin</strong> bahwa penggunaan layanan kami akan secara otomatis menghasilkan panggilan wawancara, tawaran pekerjaan, atau kesuksesan karir tertentu. Keputusan perekrutan sepenuhnya merupakan wewenang penuh dari perusahaan, rekruter, atau pihak HRD yang bersangkutan.
              </p>
            </div>

            {/* 4. Tautan ke Situs Eksternal */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 mb-2">
                <LinkIcon className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">4. Tautan Eksternal (Outbound Links)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Dari situs web kami, Anda mungkin mengunjungi situs web lain dengan mengikuti <i>hyperlink</i> ke situs eksternal tersebut. Meskipun kami berupaya menyediakan tautan berkualitas tinggi ke situs web yang bermanfaat dan etis, kami tidak memiliki kendali atas konten dan sifat situs-situs tersebut. 
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Tautan yang mengarah ke situs web lain bukan berarti kami merekomendasikan seluruh konten yang ditemukan di situs tersebut. Pemilik situs dan konten di dalamnya dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, bahkan sebelum kami memiliki kesempatan untuk menghapus tautan yang mungkin telah "rusak" atau tidak valid lagi.
              </p>
            </div>

            {/* 5. Kebijakan Iklan & Layanan Pihak Ketiga */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 mb-2">
                <ShieldAlert className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900">5. Iklan Pihak Ketiga (Google AdSense)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                PortoTree mungkin menampilkan iklan yang disediakan oleh pihak ketiga, seperti Google AdSense. Pihak ketiga ini dapat menggunakan <i>cookies</i> untuk menayangkan iklan yang relevan berdasarkan riwayat kunjungan Anda ke situs kami maupun situs web lain di internet. PortoTree tidak bertanggung jawab atas produk, layanan, atau klaim yang ditawarkan oleh pengiklan pihak ketiga di dalam platform kami. Setiap interaksi bisnis antara Anda dan pengiklan sepenuhnya berada di luar tanggung jawab PortoTree.
              </p>
            </div>

            {/* 6. Pembaruan Dokumen */}
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-2">6. Pembaruan (Update)</h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Halaman <i>Disclaimer</i> ini terakhir diperbarui pada <strong>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>. <br />
                Bila kami memperbarui, mengubah, atau membuat perubahan apa pun pada dokumen ini, perubahan tersebut akan dipublikasikan secara jelas di halaman ini.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base mt-4">
                Jika Anda memerlukan informasi lebih lanjut atau memiliki pertanyaan tentang <i>Disclaimer</i> situs kami, jangan ragu untuk menghubungi kami melalui halaman <a href="/contact" className="text-emerald-600 font-semibold hover:underline">Kontak Kami</a>.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
