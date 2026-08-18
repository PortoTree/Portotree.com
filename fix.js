const fs=require('fs');
const p='./src/components/cv-builder/templates';
fs.readdirSync(p).filter(f=>f.endsWith('.tsx')).forEach(f=>{
  const file=p+'/'+f;
  let c=fs.readFileSync(file,'utf8');
  c=c.replace(/\r\n/g,'\n');
  c=c.replace(/institution/g,'school');
  c=c.split('}\n    ];').join('}\n    ] as any;');
  c=c.split('}\n  ];').join('}\n  ] as any;');
  c=c.split('}\n];').join('}\n] as any;');
  c=c.replace(/portfolio\.skills\.split/g, "(portfolio.skills || '').split");
  c=c.replace(/portfolio\.languages\.split/g, "(portfolio.languages || '').split");
  c=c.replace(/portfolio\.skills\?\.split/g, "(portfolio.skills || '').split");
  c=c.replace(/portfolio\.languages\?\.split/g, "(portfolio.languages || '').split");
  
  if(f==='ATSClassic.tsx'){
    c=c.replace('JESSICA ANDERSON','YOUR NAME').replace('jessica.anderson@email.com','your.name@email.com');
  }
  fs.writeFileSync(file,c);
});
