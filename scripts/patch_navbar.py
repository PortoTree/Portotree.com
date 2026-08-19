import os
import re

file_path = r"c:\PortoTree\src\components\layout\Navbar.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace desktop navigation for main
desktop_old = """                <Link href={getMainUrl('/about')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Tentang kami
                </Link>
                <Link href={getMainUrl('/privacy-policy')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Kebijakan Privasi
                </Link>
                <Link href={getMainUrl('/terms-and-conditions')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <FileSignature className="w-4 h-4" />
                  Ketentuan Layanan
                </Link>"""

desktop_new = """                <Link href={getMainUrl('/about')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Tentang kami
                </Link>
                <Link href={getMainUrl('/contact')} className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  Kontak
                </Link>"""

content = content.replace(desktop_old, desktop_new)

# Add Kontak to mobile menu
mobile_old = """                    <Link href={getMainUrl('/about')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Info className="w-5 h-5" /> Tentang
                    </Link>"""
mobile_new = """                    <Link href={getMainUrl('/about')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Info className="w-5 h-5" /> Tentang
                    </Link>
                    <Link href={getMainUrl('/contact')} onClick={() => setIsMobileMenuOpen(false)} className="py-4 border-b border-slate-100 hover:text-green-600 flex items-center gap-3">
                      <Phone className="w-5 h-5" /> Kontak
                    </Link>"""

content = content.replace(mobile_old, mobile_new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated navigation successfully")
