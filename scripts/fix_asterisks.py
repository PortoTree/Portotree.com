import os

file_path = r"c:\PortoTree\src\app\disclaimer\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace literal asterisks with HTML tags for italics
content = content.replace('*hyperlink*', '<i>hyperlink</i>')
content = content.replace('*cookies*', '<i>cookies</i>')
content = content.replace('*Disclaimer*', '<i>Disclaimer</i>')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed asterisks in disclaimer")
