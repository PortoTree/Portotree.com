import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, MessageSquare, Users, Globe, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Hubungi Kami | PortoTree",
  description: "Ada pertanyaan atau butuh bantuan? Tim PortoTree siap membantu Anda membangun identitas digital terbaik.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-x-clip">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-24 bg-white border-b border-slate-100 overflow-hidden">
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
            <MessageSquare className="w-4 h-4" />
            <span>Kontak Kami</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Mari Berbincang <br className="hidden md:block"/>
            <span className="text-emerald-600">dengan Tim Kami</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Ada pertanyaan tentang layanan, laporan bug, atau ingin mengajak kerja sama? Jangan ragu untuk mengirimkan pesan. Kami siap membantu Anda.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 lg:items-start">
            
            {/* Left Column: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-4">Informasi Kontak</h2>
                <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                  Kami selalu terbuka untuk mendengar kritik, saran, maupun pertanyaan dari seluruh pengguna PortoTree. Anda dapat menghubungi kami melalui jalur komunikasi di bawah ini.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-5 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1">Email Support</h3>
                    <p className="text-slate-500 text-sm mb-2">Untuk pertanyaan teknis, bantuan akun, dan pengaduan layanan.</p>
                    <a href="mailto:csportotree@gmail.com" className="text-emerald-600 font-semibold hover:underline">
                      csportotree@gmail.com
                    </a>
                  </div>
                </div>

                {/* Business */}
                <div className="flex items-start gap-4 p-5 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1">Partnership & Bisnis</h3>
                    <p className="text-slate-500 text-sm mb-2">Tertarik bekerja sama atau berkolaborasi dengan platform kami?</p>
                    <a href="mailto:csportotree@gmail.com" className="text-emerald-600 font-semibold hover:underline">
                      csportotree@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp Channel */}
                <div className="flex items-start gap-4 p-5 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1">Saluran WhatsApp</h3>
                    <p className="text-slate-500 text-sm mb-2">Dapatkan info terbaru seputar konten, update fitur, dan tips karir dari kami secara eksklusif.</p>
                    <a href="https://whatsapp.com/channel/0029Vb8PT8y3bbUtzXmEDG2H" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">
                      Gabung Saluran
                    </a>
                  </div>
                </div>

                {/* WhatsApp Group */}
                <div className="flex items-start gap-4 p-5 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1">Grup Komunitas</h3>
                    <p className="text-slate-500 text-sm mb-2">Mari berdiskusi, berbagi portofolio, dan saling mendukung sesama pengguna PortoTree.</p>
                    <a href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">
                      Gabung Komunitas
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden lg:sticky lg:top-28 h-fit">
              {/* Form decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Kirim Pesan Langsung</h3>
                <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8">Isi formulir di bawah ini dan tim kami akan membalas maksimal dalam 1x24 jam.</p>
                
                <ContactForm />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
