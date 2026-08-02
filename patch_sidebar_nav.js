const fs = require('fs');

// --- Patch DataSidebarPanel.tsx ---
const dataSidebarPath = 'C:/PortoTree/src/components/builder/panels/DataSidebarPanel.tsx';
let dspText = fs.readFileSync(dataSidebarPath, 'utf8');

const oldElementInputStr = `  if (element.type === 'HEADING' || element.type === 'BADGE' || element.type === 'BUTTON') {
    return (
      <div className="space-y-2 mt-3">
        <Label className="text-xs font-semibold capitalize text-zinc-600">{element.type.toLowerCase()} Text</Label>
        <Input 
          value={element.config?.text || ''} 
          onChange={(e) => updateText(e.target.value)}
          onFocus={onFocus}
          className="h-8 text-sm"
        />
      </div>
    );
  }`;

const newElementInputStr = `  const updateConfig = (key: string, value: any) => {
    const recursivelyUpdate = (els: any[]): any[] => {
      return els.map(e => {
        if (e.id === element.id) return { ...e, config: { ...e.config, [key]: value } };
        if (e.elements) return { ...e, elements: recursivelyUpdate(e.elements) };
        return e;
      });
    };
    setSections(sections.map((s: any) => {
      if (s.id !== section.id) return s;
      return { ...s, elements: recursivelyUpdate(s.elements) };
    }));
  };

  if (element.type === 'HEADING' || element.type === 'BADGE') {
    return (
      <div className="space-y-2 mt-3">
        <Label className="text-xs font-semibold capitalize text-zinc-600">{element.type.toLowerCase()} Text</Label>
        <Input 
          value={element.config?.text || ''} 
          onChange={(e) => updateText(e.target.value)}
          onFocus={onFocus}
          className="h-8 text-sm"
        />
      </div>
    );
  }

  if (element.type === 'BUTTON') {
    return (
      <div className="space-y-4 mt-4 border p-3 rounded bg-zinc-50">
        <div className="space-y-2">
          <Label className="text-xs font-semibold capitalize text-zinc-600">Button Text</Label>
          <Input 
            value={element.config?.text || ''} 
            onChange={(e) => updateConfig('text', e.target.value)}
            onFocus={onFocus}
            className="h-8 text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-zinc-600">Button Option</Label>
          <div className="flex gap-2">
            <button
              onClick={() => updateConfig('actionType', 'whatsapp')}
              className={\`flex-1 py-1 px-2 text-xs rounded border \${element.config?.actionType === 'whatsapp' ? 'bg-green-100 border-green-500 text-green-700 font-medium' : 'bg-white hover:bg-zinc-50'}\`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => updateConfig('actionType', 'gmail')}
              className={\`flex-1 py-1 px-2 text-xs rounded border \${element.config?.actionType === 'gmail' ? 'bg-red-100 border-red-500 text-red-700 font-medium' : 'bg-white hover:bg-zinc-50'}\`}
            >
              Gmail
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-zinc-600">
            {element.config?.actionType === 'gmail' ? 'Alamat Email' : 'Nomor WhatsApp (Contoh: 628123...)'}
          </Label>
          <div className="flex items-center gap-2">
            {element.config?.actionType === 'gmail' && <span className="text-sm font-medium text-zinc-500">@</span>}
            <Input 
              value={element.config?.link || ''} 
              onChange={(e) => updateConfig('link', e.target.value)}
              onFocus={onFocus}
              className="h-8 text-sm"
              placeholder={element.config?.actionType === 'gmail' ? 'email@anda.com' : '628123456789'}
            />
          </div>
        </div>
      </div>
    );
  }

  if (element.type === 'NAVIGATION') {
    return (
      <div className="space-y-2 mt-4 flex items-center justify-between border p-3 rounded bg-zinc-50">
        <Label className="text-xs font-semibold text-zinc-600">Tampilkan Navigasi Menu</Label>
        <Switch 
          checked={element.config?.showNavigation !== false} 
          onCheckedChange={(checked) => updateConfig('showNavigation', checked)} 
        />
      </div>
    );
  }
`;

if (!dspText.includes("if (element.type === 'NAVIGATION')")) {
  dspText = dspText.replace(oldElementInputStr, newElementInputStr);
  fs.writeFileSync(dataSidebarPath, dspText);
  console.log("Updated DataSidebarPanel.tsx");
}

// --- Patch BuilderSection.tsx ---
const builderSectionPath = 'C:/PortoTree/src/components/storefront/sections/BuilderSection.tsx';
let bsText = fs.readFileSync(builderSectionPath, 'utf8');

const oldNavLogic = `    const navLinks = sections
      .filter(s => s.type === 'SECTION' && s.isActive !== false)
      .map(s => {
        let title = s.id;
        // Extract title from first HEADING element
        const findHeading = (elements) => {
          if (!elements) return null;
          for (const el of elements) {
            if (el.type === 'HEADING' && el.config?.text) return el.config.text;
            if (el.children) {
              const childHeading = findHeading(el.children);
              if (childHeading) return childHeading;
            }
            if (el.elements) {
              const subHeading = findHeading(el.elements);
              if (subHeading) return subHeading;
            }
          }
          return null;
        };
        
        const headingText = findHeading(s.elements);
        if (headingText) {
          // Strip HTML if any
          title = headingText.replace(/<[^>]*>?/gm, '');
        } else {
          title = s.id.replace('-section', '').replace('-', ' ');
          title = title.charAt(0).toUpperCase() + title.slice(1);
        }
        return { id: s.id, label: title };
      });`;

const newNavLogic = `    const navLinks = sections
      .filter(s => s.type === 'SECTION' && s.isActive !== false && !s.id.includes('footer'))
      .map((s, index) => {
        let title = s.id;
        
        if (s.id === 'hero-section' || index === 0) {
          return { id: s.id, label: 'Home' };
        }

        // Extract title from first HEADING element
        const findHeading = (elements: any[]) => {
          if (!elements) return null;
          for (const el of elements) {
            if (el.type === 'HEADING' && el.config?.text) return el.config.text;
            if (el.children) {
              const childHeading = findHeading(el.children);
              if (childHeading) return childHeading;
            }
            if (el.elements) {
              const subHeading = findHeading(el.elements);
              if (subHeading) return subHeading;
            }
          }
          return null;
        };
        
        const headingText = findHeading(s.elements);
        if (headingText) {
          // Strip HTML if any
          title = headingText.replace(/<[^>]*>?/gm, '');
        } else {
          title = s.id.replace('-section', '').replace('-', ' ');
          title = title.charAt(0).toUpperCase() + title.slice(1);
        }
        return { id: s.id, label: title };
      });`;

if (!bsText.includes("s.id === 'hero-section' || index === 0")) {
  bsText = bsText.replace(oldNavLogic, newNavLogic);
  fs.writeFileSync(builderSectionPath, bsText);
  console.log("Updated BuilderSection.tsx");
}
