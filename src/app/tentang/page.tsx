import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Target, Lightbulb, Users, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Tentang Kami | PortoTree",
  description: "Kenali lebih dekat visi, misi, dan perjalanan PortoTree dalam membantu talenta digital membangun identitas profesional mereka.",
};

export default function TentangPage() {
  const values = [
    {
      title: "Inovasi Tanpa Henti",
      description: "Kami terus berinovasi memberikan kemudahan bagi pengguna untuk membangun profil tanpa harus mengerti kode.",
      icon: <Lightbulb className="w-8 h-8 text-emerald-600" />
    },
    {
      title: "Cepat & Efisien",
      description: "Hanya butuh beberapa menit untuk mewujudkan portofolio atau CV online yang siap dibagikan ke mana saja.",
      icon: <Zap className="w-8 h-8 text-amber-500" />
    },
    {
      title: "Aman & Terpercaya",
      description: "Data portofolio dan informasi pribadi Anda kami simpan dengan standar keamanan terbaik.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Berpusat pada Pengguna",
      description: "Setiap fitur yang kami kembangkan didasarkan pada kebutuhan nyata para pencari kerja dan pekerja lepas.",
      icon: <Users className="w-8 h-8 text-purple-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative px-6 py-20 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-emerald-500/5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Membangun Identitas <span className="text-emerald-600">Digital</span> Anda
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              PortoTree hadir sebagai solusi modern untuk para profesional, mahasiswa, pekerja lepas, dan talenta kreatif yang ingin menampilkan rekam jejak mereka secara memukau tanpa harus dipusingkan oleh urusan teknis seperti coding atau hosting.
            </p>
          </div>
        </section>

        {/* Cerita Kami */}
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Cerita di Balik PortoTree</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Berawal dari keresahan melihat banyaknya talenta brilian yang kesulitan mendapatkan pekerjaan atau klien hanya karena CV mereka tampak biasa saja dan portofolio mereka terpencar di berbagai platform.
                </p>
                <p>
                  Kami menyadari bahwa di era digital ini, kesan pertama sangatlah krusial. Rekruter dan klien sering kali hanya memiliki waktu beberapa detik untuk menilai profil seseorang. Oleh karena itu, sebuah halaman khusus yang terstruktur rapi dan indah secara visual akan memberikan nilai tambah yang luar biasa.
                </p>
                <p>
                  Pada tahun 2024, PortoTree diluncurkan dengan satu tujuan sederhana: <strong>mendokratisasi pembuatan portofolio profesional</strong>. Kami percaya bahwa setiap orang berhak memiliki panggung digitalnya sendiri tanpa perlu merogoh kocek dalam atau mempelajari bahasa pemrograman.
                </p>
              </div>
            </div>
            <div className="bg-emerald-100 rounded-3xl p-8 aspect-square flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
              
              <Target className="w-24 h-24 text-emerald-600 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-emerald-900 mb-2 relative z-10">Visi Kami</h3>
              <p className="text-emerald-800 relative z-10 font-medium">
                "Menjadi platform identitas karir nomor satu yang memberdayakan jutaan talenta untuk meraih peluang impian mereka."
              </p>
            </div>
          </div>
        </section>

        {/* Nilai Utama */}
        <section className="bg-slate-900 px-6 py-20 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nilai Utama Kami</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Prinsip-prinsip yang memandu kami dalam membangun dan mengembangkan PortoTree setiap harinya.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-colors">
                  <div className="bg-slate-700/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{val.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-10 md:p-16 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Siap Menulis Cerita Sukses Anda?
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna lainnya yang telah berhasil meningkatkan profesionalitas profil mereka dan raih peluang karir yang lebih baik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-14 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                <Link href="/register">
                  Mulai Buat Portofolio
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-slate-200 text-slate-700 hover:bg-slate-50">
                <Link href="/untuk-siapa">
                  Pelajari Lebih Lanjut
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
