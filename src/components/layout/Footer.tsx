import Link from 'next/link';
import { getSubdomainUrl, getMainUrl } from '@/lib/url';

export function Footer() {
  return (
    <footer className="relative bg-green-600 text-white py-12 md:py-16 overflow-hidden">
      {/* Background Pattern & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-900/60 rounded-full blur-[70px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <a href={getMainUrl('/')} className="inline-flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
              <img src="/logo-portotree-2.png" alt="PortoTree Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold tracking-tight text-xl text-white">PortoTree</span>
            </a>
            <p className="text-green-50 text-sm max-w-xs mb-6">
              Bangun dan bagikan identitas profesional Anda dalam hitungan menit. Portofolio, resume, dan tautan dinamis di satu tempat.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Produk</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href={getSubdomainUrl('portofolio')} className="hover:text-white transition-colors">Buat Portofolio</a></li>
              <li><a href={getSubdomainUrl('resume')} className="hover:text-white transition-colors">Buat CV</a></li>
              <li><a href={getSubdomainUrl('surat')} className="hover:text-white transition-colors">Buat Surat</a></li>
              {/* <li><a href={getSubdomainUrl('portofind')} className="hover:text-white transition-colors flex items-center gap-2">Portofind <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 text-white px-1.5 py-0.5 rounded-full">Soon</span></a></li>
              <li><a href={getSubdomainUrl('marketsee')} className="hover:text-white transition-colors flex items-center gap-2">Marketsee <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 text-white px-1.5 py-0.5 rounded-full">Soon</span></a></li> */}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><Link href="https://www.portotree.com/about" target="_blank" className="hover:text-white transition-colors">Tentang kami</Link></li>
              <li><Link href="https://www.portotree.com/blog" target="_blank" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href={getMainUrl('/privacy-policy')} className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href={getMainUrl('/terms-and-conditions')} className="hover:text-white transition-colors">Ketentuan Layanan</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-500 pt-8 flex flex-col md:flex-row items-center justify-center md:justify-start text-sm text-green-100">
          <p>© {new Date().getFullYear()} PortoTree. Hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}
