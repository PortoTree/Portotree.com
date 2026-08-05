const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/builder/PortfolioViewer.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import
if (!content.includes('import { motion } from "framer-motion"')) {
    content = content.replace(
        'import { Mail, Phone, MapPin, ExternalLink, Code2, Briefcase, LinkIcon, Wrench, Layout, GraduationCap, Users } from "lucide-react";',
        'import { Mail, Phone, MapPin, ExternalLink, Code2, Briefcase, LinkIcon, Wrench, Layout, GraduationCap, Users } from "lucide-react";\nimport { motion } from "framer-motion";'
    );
}

const animProps = `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }}`;

// Replace all <section> with <motion.section>
content = content.replace(/<section /g, `<motion.section ${animProps} `);
content = content.replace(/<\/section>/g, `</motion.section>`);

// Replace <footer> with <motion.footer>
content = content.replace(/<footer /g, `<motion.footer ${animProps} `);
content = content.replace(/<\/footer>/g, `</motion.footer>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added framer-motion animations to PortfolioViewer.tsx');
