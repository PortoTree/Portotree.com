import os

file_path = r"c:\PortoTree\src\app\privacy-policy\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update imports
content = content.replace(
    'import { ShieldCheck, Lock, Eye, Database, Bell, Mail } from "lucide-react";',
    'import { ShieldCheck, Lock, Eye, Database, Bell, Mail, Megaphone } from "lucide-react";'
)

# Replace Point 6 and add Point 7
old_point_6 = """              {/* Point 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">6. Pembaruan Kebijakan</h2>
                </div>
                <p className="text-slate-600 ml-14">
                  Kami dapat memperbarui Kebijakan Privasi ini secara berkala untuk mencerminkan perubahan pada layanan atau peraturan yang berlaku. Jika terdapat perubahan yang signifikan, kami akan memberitahukan hal tersebut kepada Anda melalui email terdaftar atau notifikasi di dalam platform.
                </p>
              </div>"""

new_points = """              {/* Point 6 */}
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
              </div>"""

content = content.replace(old_point_6, new_points)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Privacy policy updated successfully")
