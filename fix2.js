const fs = require('fs');
let file = 'src/components/cv-builder/templates/ATSClassic.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/<div className="mb-4 mt-2">\s*<h3 className="text-\[13pt\] font-bold uppercase tracking-wider text-gray-800">{title}<\/h3>\s*<\/div>/g, 
  <div className="mb-3">\n      <hr className={\order-black \\} />\n      <h3 className="text-[12pt] font-bold uppercase tracking-wider">{title}</h3>\n    </div>
);

fs.writeFileSync(file, code);
