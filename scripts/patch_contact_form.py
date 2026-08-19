import os
import re

file_path = r"c:\PortoTree\src\app\contact\page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Import the new ContactForm
content = content.replace(
    'import { Mail, MessageSquare, Send, Users, Globe, MessageCircle } from "lucide-react";',
    'import { Mail, MessageSquare, Users, Globe, MessageCircle } from "lucide-react";\nimport ContactForm from "@/components/contact/ContactForm";'
)

# Extract the static form
form_pattern = re.compile(r'<form className="space-y-6">.*?</form>', re.DOTALL)
content = re.sub(form_pattern, '<ContactForm />', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Contact page updated with Client Component Form successfully")
