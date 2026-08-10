const fs = require('fs');
let code = fs.readFileSync('src/components/cv-builder/templates/ATSModern.tsx', 'utf8');

// Replace fragments that contain hr and h3 with div className="cv-section"
code = code.replace(/<>\s*<hr className="border-t border-gray-300" \/>\s*<div>\s*<h3/g, '<div className="cv-section">\n              <hr className="border-t border-gray-300" />\n              <div>\n                <h3');

// Replace the closing fragment
code = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/>/g, '</div>\n                </div>\n              </div>\n            </div>');
code = code.replace(/<\/ul>\s*<\/div>\s*<\/>/g, '</ul>\n              </div>\n            </div>');

fs.writeFileSync('src/components/cv-builder/templates/ATSModern.tsx', code);
