const fs = require('fs');

function restoreATSModern() {
  let file = 'src/components/cv-builder/templates/ATSModern.tsx';
  let code = fs.readFileSync(file, 'utf8');

  // Add HR after header
  code = code.replace(/<\/h2>\s*<\/div>/g, '</h2>\n        <hr className="border-t border-gray-300" />\n      </div>');
  
  // Add HR between sections
  code = code.replace(/(<\/>\s*)}?\s*<div/g, '\\n          <hr className="border-t border-gray-300" />\n          <div');
  code = code.replace(/(<\/div>\s*)<div\s*>\s*<h3/g, '\<hr className="border-t border-gray-300" />\n          <div>\n            <h3');

  // Restore border-l for timelines
  code = code.replace(/className="pl-4 space-y-5 py-1"/g, 'className="border-l-[1px] border-gray-300 pl-4 space-y-5 py-1"');
  code = code.replace(/className="pl-4 space-y-4 py-1"/g, 'className="border-l-[1px] border-gray-300 pl-4 space-y-4 py-1"');
  code = code.replace(/className="pl-5 space-y-6 py-1"/g, 'className="border-l-[1px] border-gray-300 pl-5 space-y-6 py-1"');
  code = code.replace(/className="pl-5 space-y-4 py-1"/g, 'className="border-l-[1px] border-gray-300 pl-5 space-y-4 py-1"');

  fs.writeFileSync(file, code);
}

restoreATSModern();
