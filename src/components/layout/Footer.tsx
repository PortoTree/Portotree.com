import Link from 'next/link';
import { getSubdomainUrl, getMainUrl } from '@/lib/url';

export function Footer() {
  return (
    <footer className="relative bg-white text-slate-800 py-12 md:py-16 overflow-hidden border-t border-slate-200">
      {/* Background Pattern & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50/80 rounded-full blur-[70px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <a href={getMainUrl('/')} className="inline-flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
              <img src="/logo-portotree.png" alt="PortoTree Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold tracking-tight text-xl text-slate-900">PortoTree</span>
            </a>
            <p className="text-slate-600 text-sm max-w-xs mb-6">
              Bangun dan bagikan identitas profesional Anda dalam hitungan menit. Portofolio, resume, dan tautan dinamis di satu tempat.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Produk</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href={getSubdomainUrl('portofolio')} className="hover:text-emerald-600 transition-colors">Buat Portofolio</a></li>
              <li><a href={getSubdomainUrl('resume')} className="hover:text-emerald-600 transition-colors">Buat CV</a></li>
              <li><a href={getSubdomainUrl('surat')} className="hover:text-emerald-600 transition-colors">Buat Surat</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="https://www.portotree.com/about" target="_blank" className="hover:text-emerald-600 transition-colors">Tentang kami</Link></li>
              <li><Link href="https://www.portotree.com/blog" target="_blank" className="hover:text-emerald-600 transition-colors">Blog</Link></li>
              <li><a href={getMainUrl('/contact')} className="hover:text-emerald-600 transition-colors">Kontak Kami</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href={getMainUrl('/privacy-policy')} className="hover:text-emerald-600 transition-colors">Kebijakan Privasi</a></li>
              <li><a href={getMainUrl('/terms-and-conditions')} className="hover:text-emerald-600 transition-colors">Ketentuan Layanan</a></li>
              <li><a href={getMainUrl('/disclaimer')} className="hover:text-emerald-600 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-center md:justify-start text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PortoTree. Hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}
