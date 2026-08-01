const fs = require('fs');
let content = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

// There are multiple declarations of `const EMPTY_TEMPLATE = [`
// The first one was updated properly by my previous script.
// It looks like: const EMPTY_TEMPLATE = [\n  {\n    "id": "global-settings",\n ... \n];

const parts = content.split('const EMPTY_TEMPLATE = ');
if (parts.length > 2) {
  // Extract the well-formatted array from the first one
  const firstArrayMatch = parts[1].match(/\[[\s\S]*?\];/);
  if (firstArrayMatch) {
    const templateArrayStr = firstArrayMatch[0];
    
    // The second occurrence starts with `[{ id: "global-settings"...`
    // Let's replace the second array with the first array.
    const secondArrayMatch = parts[2].match(/\[[\s\S]*?\];/);
    if (secondArrayMatch) {
        parts[2] = parts[2].replace(secondArrayMatch[0], templateArrayStr);
        content = parts.join('const EMPTY_TEMPLATE = ');
    }
  }
}

content = content.replace(/draft_template_sections_v10/g, 'draft_template_sections_v11');
fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', content, 'utf8');
console.log('Template synced and bumped to v11');
