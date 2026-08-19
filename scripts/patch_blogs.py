import os

file_path = r"c:\PortoTree\src\app\own-subdomain\(protected)\blogs\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add import
if 'SubscriberListModal' not in content:
    content = content.replace(
        'import { BroadcastButton } from "@/components/admin/BroadcastButton";',
        'import { BroadcastButton } from "@/components/admin/BroadcastButton";\nimport { SubscriberListModal } from "@/components/admin/SubscriberListModal";'
    )

# 2. Add SubscriberListModal to Total Subscriber card
old_card_content = """<div className="text-xs text-slate-400 mt-2">Berlangganan dari Blog</div>
            </div>"""
new_card_content = """<div className="text-xs text-slate-400 mt-2">Berlangganan dari Blog</div>
              <SubscriberListModal subscribers={subscribers} />
            </div>"""
content = content.replace(old_card_content, new_card_content)

# 3. Change grid and remove right side
old_grid = """      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Side (60%) - Article List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">"""
new_grid = """      <div>
        
        {/* Article List */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">"""
content = content.replace(old_grid, new_grid)

# Remove Right Side
right_side = """    {/* Right Side (40%) - Subscriber List */}
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Mail className="w-5 h-5 text-purple-500" />
          <h2 className="text-sm font-bold text-slate-900">Daftar Subscriber</h2>
        </div>
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {subscribers.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">Belum ada subscriber.</p>
            </div>
          ) : (
            subscribers.map((sub, idx) => (
              <div key={sub.id || idx} className="p-4 flex flex-col hover:bg-slate-50/50 transition-colors">
                <div className="font-medium text-slate-900 truncate">{sub.email}</div>
                {sub.subscribedAt && (
                  <div className="text-xs text-slate-400 mt-1">
                    {new Date(sub.subscribedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    
  </div>"""
  
new_right_side = """  </div>"""
content = content.replace(right_side, new_right_side)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched successfully")
