const fs = require('fs');
let c = fs.readFileSync('C:/PortoTree/src/components/builder/panels/EditorPanel.tsx', 'utf-8');
c = c.split("'1.6px').replace(/[0-9.]/g, '') || 'px'").join("'1.6').replace(/[0-9.]/g, '') || ''");
c = c.split("'1.2px').replace(/[0-9.]/g, '') || 'px'").join("'1.2').replace(/[0-9.]/g, '') || ''");
c = c.split("lineHeight: '1.2px'").join("lineHeight: '1.2'");
fs.writeFileSync('C:/PortoTree/src/components/builder/panels/EditorPanel.tsx', c);
console.log("Done");
