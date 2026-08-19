import os

file_path = r"c:\PortoTree\src\app\contact\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Hero Title
content = content.replace(
    'className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"',
    'className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight"'
)

# 2. Hero subtitle
content = content.replace(
    'className="text-lg text-slate-600 max-w-2xl mx-auto"',
    'className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto"'
)

# 3. Informasi Kontak Title
content = content.replace(
    'className="text-3xl font-bold text-slate-900 mb-4"',
    'className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-4"'
)

# 4. Informasi Kontak subtitle
content = content.replace(
    'className="text-slate-600 text-lg mb-8 leading-relaxed"',
    'className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed"'
)

# 5. Cards padding
content = content.replace(
    'className="flex items-start gap-4 p-6 bg-white border',
    'className="flex items-start gap-4 p-5 md:p-6 bg-white border'
)

# 6. Cards title typography
content = content.replace(
    'className="font-bold text-slate-900 text-lg mb-1"',
    'className="font-bold text-slate-900 text-base md:text-lg mb-1"'
)

# 7. Form container padding
content = content.replace(
    'className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10',
    'className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10'
)

# 8. Form title
content = content.replace(
    'className="text-2xl font-bold text-slate-900 mb-2"',
    'className="text-xl md:text-2xl font-bold text-slate-900 mb-2"'
)

# 9. Form subtitle
content = content.replace(
    'className="text-slate-500 mb-8"',
    'className="text-sm md:text-base text-slate-500 mb-6 md:mb-8"'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Typography updated for mobile successfully")
