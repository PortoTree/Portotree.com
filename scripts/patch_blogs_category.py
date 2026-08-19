import os

file_path = r"c:\PortoTree\src\app\own-subdomain\(protected)\blogs\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace colSpan
content = content.replace("<td colSpan={4}", "<td colSpan={5}")

# Replace table headers
old_thead = """                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%] md:w-[45%]">Judul Artikel</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[35%] md:w-[20%]">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell w-[20%]">Tanggal Pembuatan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[25%] md:w-[15%]">Aksi</th>"""

new_thead = """                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[40%] md:w-[35%]">Judul Artikel</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell w-[20%] md:w-[15%]">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[30%] md:w-[15%]">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell w-[20%]">Tanggal Pembuatan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[30%] md:w-[15%]">Aksi</th>"""

content = content.replace(old_thead, new_thead)

# Replace table body
old_tbody = """                    <td className="px-6 py-4 overflow-hidden">
                      <div className="font-bold text-slate-900 truncate w-full" title={blog.title}>
                        {blog.title}
                      </div>
                      <div className="text-sm text-slate-500 truncate w-full" title={blog.slug}>
                        {blog.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">"""

new_tbody = """                    <td className="px-6 py-4 overflow-hidden">
                      <div className="font-bold text-slate-900 truncate w-full" title={blog.title}>
                        {blog.title}
                      </div>
                      <div className="text-sm text-slate-500 truncate w-full" title={blog.slug}>
                        {blog.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md truncate max-w-[120px]">
                        {blog.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">"""

content = content.replace(old_tbody, new_tbody)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched successfully")
