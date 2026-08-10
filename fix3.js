const fs = require('fs');
let file = 'src/components/cv-builder/templates/ATSModern.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/(\{\/\* [A-Z ]+ \*\/\}\s*)<div>/g, '<hr className="border-t border-gray-300" />\n\n          \<div>');
// wait, the first one is SKILLS and EDUCATION, etc. Let's just do it.

fs.writeFileSync(file, code);
