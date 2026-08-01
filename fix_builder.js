const fs = require('fs');
let text = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

// 1. Swap template imports and usages
text = text.replace('import { COMPLETE_PORTFOLIO_TEMPLATE } from \'@/lib/templates/completePortfolio\';', 'import { COMPLETE_PORTFOLIO_TEMPLATE } from \'@/lib/templates/completePortfolio\';\nimport { GORIB_PORTFOLIO_TEMPLATE } from \'@/lib/templates/goribPortfolio\';');
text = text.replace(/setSections\(sanitizeSections\(COMPLETE_PORTFOLIO_TEMPLATE\)\);/g, 'setSections(sanitizeSections(GORIB_PORTFOLIO_TEMPLATE));');

// 2. Insert cache buster at the top of useBuilderState
const cacheBusterCode = `
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('cache_busted_gorib_v5')) {
      sessionStorage.removeItem("storefront_sections");
      localStorage.removeItem("draft_template_sections");
      localStorage.removeItem("draft_template_sections_v10");
      localStorage.removeItem("draft_template_sections_v11");
      localStorage.removeItem("draft_template_sections_v12");
      localStorage.setItem('cache_busted_gorib_v5', 'true');
      window.location.reload();
    }
  }, []);
`;
text = text.replace('export function useBuilderState() {\n', 'export function useBuilderState() {\n' + cacheBusterCode + '\n');

// 3. Re-inject header upgrade logic in sanitizeSections
const headerUpgradeCode = `
    // Auto-upgrade header config for precision and canvas snapping
    if (!headerSection.config._v16_upgraded) {
      headerSection.config = {
        ...headerSection.config,
        layout: "flexbox",
        direction: "row",
        align: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
        gap: 16,
        margin: 0,
        borderRadius: 0,
        contentWidth: 'full',
        _v16_upgraded: true
      };
      
      // Upgrade columns inside header
      if (headerSection.elements) {
        headerSection.elements = headerSection.elements.map(el => {
          if (el.type === 'COLUMN') {
            return {
              ...el,
              config: {
                ...el.config,
                layout: 'flexbox',
                direction: 'row',
                align: 'center',
                gap: el.config?.gap || 16
              }
            };
          }
          return el;
        });
      }
    }
`;
text = text.replace('const headerElements = headerSection.elements || [];', headerUpgradeCode + '\n    const headerElements = headerSection.elements || [];');

fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', text);
