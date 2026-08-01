const fs = require('fs');

let content = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

const parts = content.split('const EMPTY_TEMPLATE = ');
if (parts.length > 2) {
  const firstArrayMatch = parts[1].match(/\[[\s\S]*?\];/);
  if (firstArrayMatch) {
    const templateArrayStr = firstArrayMatch[0].replace(/;$/, '');
    
    // Parse the JSON array
    let sections;
    try {
        sections = JSON.parse(templateArrayStr);
    } catch(e) {
        console.error("Failed to parse JSON:", e);
        process.exit(1);
    }

    // Helper to traverse and update
    const updateElements = (elements) => {
        if (!elements) return;
        for (const el of elements) {
            if (el.id === 'nav-btn' || el.id === 'hero-btn') {
                el.config.customClass = 'whitespace-nowrap';
                el.config.fontWeight = 'bold';
                el.config.fontFamily = 'var(--font-inter), sans-serif';
            }
            if (el.id === 'hero-subtitle') {
                el.config.fontWeight = '700';
                el.config.fontSize = 18;
                el.config.fontFamily = 'var(--font-inter), sans-serif';
                el.config.textColor = '#1f2937';
            }
            if (el.id === 'hero-title') {
                el.config.fontSize = 42; el.config.fontSizeMobile = 32; el.config.fontSizeMobile = 32;
                el.config.fontWeight = '900';
                el.config.fontFamily = 'var(--font-inter), sans-serif';
                el.config.lineHeight = '1.1';
                el.config.letterSpacing = '-1px';
            }
            if (el.id === 'hero-desc') {
                el.config.fontSize = 16;
                el.config.fontFamily = 'var(--font-inter), sans-serif';
                el.config.lineHeight = '1.6';
            }
            if (el.id === 'about-title') {
                el.config.fontSize = 28;
                el.config.fontWeight = '800';
                el.config.fontFamily = 'var(--font-inter), sans-serif';
            }
            if (el.id === 'about-subtitle') {
                el.config.fontSize = 32;
                el.config.fontWeight = '800';
                el.config.fontFamily = 'var(--font-inter), sans-serif';
            }
            
            // Fix layout squishing for hero-col-1
            if (el.id === 'hero-col-1') {
                el.config.layout = 'flexbox';
            }

            if (el.children) updateElements(el.children);
        }
    }

    for (const section of sections) {
        if (section.elements) updateElements(section.elements);
        // also fix logo
        if (section.id === 'global-header') {
            for (const c of section.elements[0].children) {
                if (c.id === 'nav-logo') {
                    c.config.fontSize = 32;
                    c.config.fontWeight = '900';
                    c.config.fontFamily = 'var(--font-inter), sans-serif';
                }
            }
        }
    }

    const newTemplateArrayStr = JSON.stringify(sections, null, 2) + ';';
    
    parts[1] = parts[1].replace(firstArrayMatch[0], newTemplateArrayStr);
    
    const secondArrayMatch = parts[2].match(/\[[\s\S]*?\];/);
    if (secondArrayMatch) {
        parts[2] = parts[2].replace(secondArrayMatch[0], newTemplateArrayStr);
    }
    content = parts.join('const EMPTY_TEMPLATE = ');
  }
}

content = content.replace(/draft_template_sections_v13/g, 'draft_template_sections_v14');
fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', content, 'utf8');
console.log('Template synced, typography updated, bumped to v14');
