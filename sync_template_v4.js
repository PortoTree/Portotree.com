const fs = require('fs');

let content = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

const parts = content.split('const EMPTY_TEMPLATE = ');
if (parts.length < 3) {
    console.error("Could not find both EMPTY_TEMPLATE instances");
    process.exit(1);
}

const arrStr = parts[1].match(/\[[\s\S]*?\];/)[0].replace(/;$/, '');
let sections = JSON.parse(arrStr);

const header = sections.find(s => s.id === 'global-header');
if (header) {
    header.config.paddingTop = 16;
    header.config.paddingBottom = 16;
    header.config.align = "center";
    
    const col1 = header.elements.find(e => e.id === 'header-col-1');
    if (col1) {
        col1.config.align = "center"; // Center vertically
    }
    
    const col2 = header.elements.find(e => e.id === 'header-col-2');
    if (col2) {
        col2.config.align = "center"; // Center vertically
        col2.config.gap = 32; // Better spacing
    }
}

const newTemplateArrayStr = JSON.stringify(sections, null, 2) + ';';

const firstArrayMatch = parts[1].match(/\[[\s\S]*?\];/);
if (firstArrayMatch) {
    parts[1] = parts[1].replace(firstArrayMatch[0], newTemplateArrayStr);
}

const secondArrayMatch = parts[2].match(/\[[\s\S]*?\];/);
if (secondArrayMatch) {
    parts[2] = parts[2].replace(secondArrayMatch[0], newTemplateArrayStr);
}

content = parts.join('const EMPTY_TEMPLATE = ');
content = content.replace(/draft_template_sections_v15/g, 'draft_template_sections_v16');

fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', content, 'utf8');
console.log("Template updated to v16 successfully.");
