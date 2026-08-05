import re

with open('src/components/builder/panels/PortfolioDataForm.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Match the AccordionSection definition inside the component
pattern = re.compile(r'  const AccordionSection = \(\{.*?\};\n  };\n', re.DOTALL)
content = re.sub(pattern, '', content)

extracted = """const AccordionSection = ({ 
  id, title, icon: Icon, badgeCount, hasError, children, openSection, toggleSection 
}: { 
  id: string, title: string, icon: any, badgeCount?: number, hasError?: boolean, children: React.ReactNode, openSection: string, toggleSection: (id: string) => void 
}) => {
  const isActive = openSection === id;
  return (
    <div className={`border rounded-2xl overflow-hidden shadow-sm transition-colors ${isActive ? 'border-blue-600 bg-white' : 'border-slate-200 bg-white'}`}>
      <button 
        className={`w-full flex items-center justify-between px-4 py-4 transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
        onClick={() => toggleSection(id)}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
          <span className={`font-medium text-[15px] ${isActive ? 'text-white' : 'text-slate-700'}`}>{title}</span>
          {hasError && <span className={`text-xs ${isActive ? 'text-white' : 'text-red-500'}`}>*</span>}
        </div>
        <div className="flex items-center gap-3">
          {badgeCount !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}>
              {badgeCount} items
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180 text-white' : 'text-slate-400'}`} />
        </div>
      </button>
      {isActive && (
        <div className="p-5 space-y-5 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

"""

# Insert before export function
content = content.replace('export function PortfolioDataForm', extracted + 'export function PortfolioDataForm')

# Add the new props
content = content.replace('<AccordionSection', '<AccordionSection openSection={openSection} toggleSection={toggleSection}')

with open('src/components/builder/panels/PortfolioDataForm.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
