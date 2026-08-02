const fs = require('fs');
let text = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

text = text.replace(/cache_busted_gorib_v5/g, 'cache_busted_gorib_v6');

fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', text);
