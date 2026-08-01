const fs = require('fs');

let content = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

// We have 2 instances of EMPTY_TEMPLATE array in the file.
const parts = content.split('const EMPTY_TEMPLATE = ');
if (parts.length < 3) {
    console.error("Could not find both EMPTY_TEMPLATE instances");
    process.exit(1);
}

// Parse the first instance
const arrStr = parts[1].match(/\[[\s\S]*?\];/)[0].replace(/;$/, '');
let sections = JSON.parse(arrStr);

// Fix layout for text columns so they stack vertically
const heroCol1 = sections.find(s => s.id === 'section-hero').elements.find(e => e.id === 'hero-col-1');
if(heroCol1) heroCol1.config.layout = 'flexbox';

const aboutCol2 = sections.find(s => s.id === 'section-about').elements.find(e => e.id === 'about-col-2');
if(aboutCol2) aboutCol2.config.layout = 'flexbox';

// Fix typography (add fontSizeMobile for responsiveness)
const addMobileFont = (elId, size) => {
  for (const s of sections) {
    for (const el of (s.elements || [])) {
      if (el.id === elId) el.config.fontSizeMobile = size;
      for (const child of (el.children || [])) {
        if (child.id === elId) child.config.fontSizeMobile = size;
        for (const gc of (child.children || [])) {
           if (gc.id === elId) gc.config.fontSizeMobile = size;
        }
      }
    }
  }
};

addMobileFont('hero-title', 32);
addMobileFont('hero-subtitle', 16);
addMobileFont('hero-desc', 14);

addMobileFont('about-title', 24);
addMobileFont('about-subtitle', 16);
addMobileFont('about-desc', 14);

// Convert back to string
const newTemplateArrayStr = JSON.stringify(sections, null, 2) + ';';

// Replace both instances
const firstArrayMatch = parts[1].match(/\[[\s\S]*?\];/);
if (firstArrayMatch) {
    parts[1] = parts[1].replace(firstArrayMatch[0], newTemplateArrayStr);
}

const secondArrayMatch = parts[2].match(/\[[\s\S]*?\];/);
if (secondArrayMatch) {
    parts[2] = parts[2].replace(secondArrayMatch[0], newTemplateArrayStr);
}

content = parts.join('const EMPTY_TEMPLATE = ');

// Bump version to v15 so it forces a reset for the user automatically
content = content.replace(/draft_template_sections_v14/g, 'draft_template_sections_v15');

fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', content, 'utf8');
console.log("Template updated to v15 successfully.");
