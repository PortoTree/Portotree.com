import os
import re

file_path = r"c:\PortoTree\src\app\contact\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace support email
content = content.replace("support@portotree.com", "csportotree@gmail.com")
# Replace business email
content = content.replace("business@portotree.com", "teamportotree@gmail.com")

# Remove "Lokasi Kami" section
# We'll use regex to remove the block for Lokasi Kami.
lokasi_pattern = re.compile(
    r'\s*\{\/\*\s*Address.*?\*\/\}\s*<div className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">\s*<div className="p-3 bg-slate-100 text-slate-600 rounded-xl shrink-0">\s*<MapPin className="w-6 h-6" \/>\s*<\/div>\s*<div>\s*<h3 className="font-bold text-slate-900 text-lg mb-1">Lokasi Kami<\/h3>\s*<p className="text-slate-500 text-sm">\s*Jakarta, Indonesia<br\/>\s*\(Layanan kami beroperasi 100% secara digital\).\s*<\/p>\s*<\/div>\s*<\/div>',
    re.DOTALL
)

content = re.sub(lokasi_pattern, '', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Contact page updated successfully")
