const fs = require('fs');
let text = fs.readFileSync('C:/PortoTree/src/components/storefront/sections/BuilderSection.tsx', 'utf8');

// 1. Ensure Navigation import and useStorefront are available
if (!text.includes('useStorefront')) {
  text = text.replace('import { useUI } from "@/components/ui/UIProvider";', 'import { useUI } from "@/components/ui/UIProvider";\nimport { useStorefront } from "@/components/storefront/StorefrontProvider";');
}

// 2. Add Navigation, Mail, Phone to lucide-react imports if not there
if (!text.includes('Navigation,')) text = text.replace('Minus,', 'Minus, Navigation, Mail, Phone,');

// 3. Replace NavigationElement with dynamic one
const dynamicNav = `
// ── NAVIGATION ELEMENT ──
const NavigationElement = ({ config }: { config: any }) => {
  const storefront = useStorefront();
  const sections = storefront?.sections || [];
  
  if (config.showNavigation === false) return null;

  const navLinks = sections
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
        // Capitalize first letter of each word if it's all caps or messy
        if (title === title.toUpperCase()) {
          title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        }
      } else {
        // Fallback to section ID formatted nicely
        title = s.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      return { id: s.id, title };
    });

  return (
    <nav className="flex items-center gap-6" style={{ fontSize: config.fontSize, fontWeight: config.fontWeight, color: config.textColor }}>
      {navLinks.map(link => (
        <a 
          key={link.id}
          href={\`#section-\${link.id}\`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(\`section-\${link.id}\`)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          {link.title}
        </a>
      ))}
    </nav>
  );
};
`;

text = text.replace(/\/\/ ── NAVIGATION ELEMENT ──[\s\S]*?<\/nav>\s*\);\s*};/, dynamicNav);


// 4. Update ButtonElement to handle actionType
const buttonElementSearch = `  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (config.link) {
      if (config.link.startsWith('#')) {`;

const buttonElementReplace = `  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Handle specific action types
    if (config.actionType === 'whatsapp' && config.link) {
      const waNumber = config.link.replace(/[^0-9]/g, '');
      window.open(\`https://wa.me/\${waNumber}\`, '_blank');
      return;
    }
    
    if (config.actionType === 'gmail' && config.link) {
      window.open(\`mailto:\${config.link}\`, '_blank');
      return;
    }

    if (config.link) {
      if (config.link.startsWith('#')) {`;

text = text.replace(buttonElementSearch, buttonElementReplace);


// Add icons for ButtonElement based on actionType
const buttonContentSearch = `{showCustomIcon && config.customIconSvg && (
          <div 
            className="flex-shrink-0"`;
const buttonContentReplace = `
        {config.actionType === 'whatsapp' && <Phone className="w-[1.2em] h-[1.2em]" />}
        {config.actionType === 'gmail' && <Mail className="w-[1.2em] h-[1.2em]" />}
        {config.actionType !== 'whatsapp' && config.actionType !== 'gmail' && showCustomIcon && config.customIconSvg && (
          <div 
            className="flex-shrink-0"`;

text = text.replace(buttonContentSearch, buttonContentReplace);

fs.writeFileSync('C:/PortoTree/src/components/storefront/sections/BuilderSection.tsx', text);
