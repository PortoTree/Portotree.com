const fs = require('fs');
const p = './src/components/cv-builder/templates';

fs.readdirSync(p).filter(f => f.endsWith('.tsx')).forEach(f => {
  const file = p + '/' + f;
  let c = fs.readFileSync(file, 'utf8');

  // Replace implicit any for single arguments
  // e.g. .map((hobby, idx) => -> .map((hobby: any, idx: any) =>
  c = c.replace(/\.map\(\s*([a-zA-Z0-9_]+)\s*=>/g, '.map(($1: any) =>');
  c = c.replace(/\.map\(\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)\s*=>/g, '.map(($1: any, $2: any) =>');
  c = c.replace(/\.filter\(\s*([a-zA-Z0-9_]+)\s*=>/g, '.filter(($1: any) =>');
  
  fs.writeFileSync(file, c);
});
