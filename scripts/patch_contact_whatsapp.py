import os
import re

file_path = r"c:\PortoTree\src\app\contact\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace imports
content = content.replace(
    'import { Mail, MessageSquare, Send, MapPin, Globe } from "lucide-react";',
    'import { Mail, MessageSquare, Send, Users, Globe, MessageCircle } from "lucide-react";'
)

# Insert the new cards after the Partnership card
old_business_block = """                {/* Business */}
                <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Partnership & Bisnis</h3>
                    <p className="text-slate-500 text-sm mb-2">Tertarik bekerja sama atau berkolaborasi dengan platform kami?</p>
                    <a href="mailto:teamportotree@gmail.com" className="text-emerald-600 font-semibold hover:underline">
                      teamportotree@gmail.com
                    </a>
                  </div>
                </div>"""

new_business_block = """                {/* Business */}
                <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Partnership & Bisnis</h3>
                    <p className="text-slate-500 text-sm mb-2">Tertarik bekerja sama atau berkolaborasi dengan platform kami?</p>
                    <a href="mailto:teamportotree@gmail.com" className="text-emerald-600 font-semibold hover:underline">
                      teamportotree@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp Channel */}
                <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Saluran WhatsApp</h3>
                    <p className="text-slate-500 text-sm mb-2">Dapatkan info terbaru seputar fitur dan tips karir dari kami secara eksklusif.</p>
                    <a href="https://whatsapp.com/channel/0029Vb8PT8y3bbUtzXmEDG2H" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">
                      Gabung Saluran
                    </a>
                  </div>
                </div>

                {/* WhatsApp Group */}
                <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Grup Komunitas</h3>
                    <p className="text-slate-500 text-sm mb-2">Mari berdiskusi, berbagi portofolio, dan saling mendukung sesama pengguna PortoTree.</p>
                    <a href="https://chat.whatsapp.com/EinEUnLQthc3M0wrlyRuhR" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">
                      Gabung Komunitas
                    </a>
                  </div>
                </div>"""

content = content.replace(old_business_block, new_business_block)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Contact page updated successfully")
