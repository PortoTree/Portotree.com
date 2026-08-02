const fs = require('fs');

function cleanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove outline-blue active states (subfocus)
    content = content.replace(/\?\s*'outline outline-2 outline-blue-500\/60[^']+'/g, "? ''");

    // Remove ElementWrapper active/newlyAdded outlines
    content = content.replace(/isNewlyAdded\s*\n\s*\?\s*'outline outline-2 outline-blue-500 rounded-none animate-pulse bg-blue-500\/10'/g, "isNewlyAdded ? ''");
    content = content.replace(/isActive\s*\n\s*\?\s*'outline outline-2 outline-blue-600 outline-offset-2 rounded-none bg-blue-500\/5'/g, "isActive ? ''");

    // Remove section active/hover outlines
    content = content.replace(/\?\s*'after:absolute after:inset-0 after:border-2 after:border-blue-600 after:pointer-events-none after:z-\[50\] after:rounded-\[inherit\]'/g, "? ''");
    content = content.replace(/\?\s*'hover:after:absolute hover:after:inset-0 hover:after:border-2 hover:after:border-blue-500\/30 hover:after:pointer-events-none hover:after:z-\[50\] hover:after:rounded-\[inherit\]'/g, "? ''");
    content = content.replace(/!readOnly && isDragOver \? 'after:absolute after:inset-0 after:border-2 after:border-dashed after:border-blue-500 after:bg-blue-500\/10 after:pointer-events-none after:z-\[50\] after:rounded-\[inherit\] after:animate-pulse' : ''/g, "''");

    // Remove ring-4 ring-blue-500/50
    content = content.replace(/\?\s*'ring-4 ring-blue-500\/50 scale-\[1.02\] shadow-lg'/g, "? ''");
    content = content.replace(/\?\s*'ring-2 ring-blue-500\/50 rounded-lg'\s*:\s*'hover:ring-2 hover:ring-blue-400\/40 hover:bg-blue-50\/10 rounded-lg'/g, "? '' : ''");
    content = content.replace(/\?\s*'ring-2 ring-blue-500\/50'\s*:\s*'hover:bg-blue-50\/10'/g, "? '' : ''");
    content = content.replace(/\?\s*'ring-2 ring-blue-500\/20'\s*:\s*'hover:ring-2 hover:ring-blue-400\/20'/g, "? '' : ''");

    // Remove DragOver outline
    content = content.replace(/!readOnly && isDragOver \? 'outline-dashed outline-2 outline-blue-500 bg-blue-500\/10 animate-pulse rounded-lg' : ''/g, "''");

    // DynamicSections hover outline
    content = content.replace(/const base = "cursor-pointer transition-all hover:outline-dashed hover:outline-2 hover:outline-blue-500\/50 hover:outline-offset-4";/g, "const base = \"cursor-pointer transition-all\";");
    content = content.replace(/const active = activeElementId === id \? "outline outline-2 outline-blue-600 outline-offset-4 bg-blue-500\/10 rounded-lg" : "";/g, "const active = \"\";");

    fs.writeFileSync(filePath, content);
}

cleanFile('C:/PortoTree/src/components/builder/PreviewSection.tsx');
cleanFile('C:/PortoTree/src/components/storefront/sections/DynamicSections.tsx');
console.log("Done cleaning PreviewSection and DynamicSections");
