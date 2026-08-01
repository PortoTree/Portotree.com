import re

file_path = r'C:\PortoTree\src\components\builder\useBuilderState.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# bump version
content = content.replace('draft_template_sections_v3', 'draft_template_sections_v4')

# Define HERO section JSON
hero_json = '''{ id: "global-settings", type: "CANVAS_SETTINGS", order: -1, isActive: true, config: { bgType: "solid", bgColor: "#09090b" }, elements: [] },
{
  id: "hero-beranda-01",
  type: "HERO",
  order: 1,
  isActive: true,
  config: {
    bgType: "solid",
    bgColor: "#10b981", // emerald-500
    layout: "grid",
    columns: 2,
    gap: 32,
    paddingTop: 80,
    paddingBottom: 160,
    paddingLeft: 40,
    paddingRight: 40,
    clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
    align: "center"
  },
  elements: [
    {
      id: "hero-col-1",
      type: "COLUMN",
      order: 1,
      config: { align: "start", justify: "center", gap: 24 },
      elements: [
        {
          id: "hero-name",
          type: "HEADING",
          order: 1,
          config: { text: "Hi, Saya [Nama Anda]", tag: "h1", fontSize: 48, textColor: "#ffffff", fontWeight: "bold" }
        },
        {
          id: "hero-profession",
          type: "TEXT",
          order: 2,
          config: { text: "Seorang Profesional di bidang Kreatif. Saya membantu klien mencapai tujuan mereka dengan solusi inovatif dan desain memukau.", fontSize: 18, textColor: "#d1fae5" }
        },
        {
          id: "hero-cta",
          type: "BUTTON",
          order: 3,
          config: { text: "Hubungi Saya", link: "#", bgColor: "#ffffff", textColor: "#10b981", borderRadius: 8, paddingX: 24, paddingY: 12, fontWeight: "bold" }
        }
      ]
    },
    {
      id: "hero-col-2",
      type: "COLUMN",
      order: 2,
      config: { align: "center", justify: "center" },
      elements: [
        {
          id: "hero-image",
          type: "IMAGE",
          order: 1,
          config: { src: "/placeholder-potret.png", alt: "Foto Profil", width: 350, height: 450, borderRadius: 24, objectFit: "cover", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }
        }
      ]
    }
  ]
}'''

# Replace EMPTY_TEMPLATE
old_empty = '{ id: "global-settings", type: "CANVAS_SETTINGS", order: -1, isActive: true, config: { bgType: "solid", bgColor: "#09090b" }, elements: [] }'
content = content.replace(f'const EMPTY_TEMPLATE = [{old_empty}];', f'const EMPTY_TEMPLATE = [{hero_json}];')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated useBuilderState.tsx successfully!")
