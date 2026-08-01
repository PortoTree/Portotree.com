import re

file_path = r'C:\PortoTree\src\components\builder\useBuilderState.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace version v6 with v7
content = content.replace('draft_template_sections_v6', 'draft_template_sections_v7')

# Find the HERO section in EMPTY_TEMPLATE and modify it
# The bug is that we used "elements:" inside the column, but it should be "children:"
# Let's just do a string replacement for the specific column elements arrays.
content = content.replace('gap: 24, customClass: "pl-4 md:pl-10" },\n      elements: [', 'gap: 24, customClass: "pl-4 md:pl-10" },\n      children: [')
content = content.replace('justify: "center" },\n      elements: [', 'justify: "center" },\n      children: [')

# Also change the green color #059669 to #22c55e
content = content.replace('#059669', '#22c55e')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated useBuilderState.tsx successfully!")
